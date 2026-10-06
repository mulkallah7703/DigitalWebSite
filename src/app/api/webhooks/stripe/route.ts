export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'
import type Stripe from 'stripe'

export async function POST(req: Request) {
  return handler(req);
}

async function handler(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ received: false, error: 'Service unavailable during build' }, { status: 503 })
  }

  const { headers } = await import('next/headers')
  const { stripe } = await import('@/lib/stripe')
  const { db } = await import('@/lib/db')
  const { generateOrderNumber } = await import('@/lib/utils')

  const body = await req.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.metadata?.userId
    const itemsJson = session.metadata?.items

    if (!userId || !itemsJson) {
      console.error('Missing metadata in checkout session')
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    const items = JSON.parse(itemsJson) as {
      productId: string
      quantity: number
      price?: number
      originalPrice?: number
      couponId?: string | null
    }[]

    const { priceOrderLines } = await import('@/lib/product-discount')
    const priced = await priceOrderLines(items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })))

    const lines = items.map((item) => {
      const fresh = priced?.lines.find((line) => line.productId === item.productId)
      const unitPrice = typeof item.price === 'number' ? item.price : fresh?.unitPrice
      const originalPrice = typeof item.originalPrice === 'number' ? item.originalPrice : fresh?.originalPrice ?? unitPrice
      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: unitPrice ?? 0,
        originalPrice: originalPrice ?? unitPrice ?? 0,
        couponId: item.couponId ?? fresh?.couponId ?? null,
      }
    })

    const subtotal = lines.reduce((sum, line) => sum + line.originalPrice * line.quantity, 0)
    const total = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0)
    const couponIds = Array.from(new Set(lines.map((line) => line.couponId).filter((id): id is string => Boolean(id))))

    const order = await db.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId,
        status: 'COMPLETED',
        paymentStatus: 'PAID',
        paymentMethod: 'stripe',
        paymentIntentId: session.payment_intent as string,
        subtotal,
        discount: Math.max(0, subtotal - total),
        total,
        couponId: couponIds[0] || null,
        customerEmail: session.customer_email || '',
        customerName: session.customer_details?.name || '',
        items: {
          create: lines.map((line) => ({
            productId: line.productId,
            quantity: line.quantity,
            price: line.unitPrice,
            total: line.unitPrice * line.quantity,
          })),
        },
      },
    })

    for (const couponId of couponIds) {
      await db.coupon.update({
        where: { id: couponId },
        data: { usageCount: { increment: 1 } },
      })
    }

    for (const item of items) {
      await db.product.update({
        where: { id: item.productId },
        data: { salesCount: { increment: item.quantity } },
      })
    }

    await db.notification.create({
      data: {
        userId,
        type: 'ORDER_COMPLETED',
        title: 'Order Completed',
        message: `Your order ${order.orderNumber} has been completed. You can now download your products.`,
        data: { orderId: order.id },
      },
    })

    console.log('Order created:', order.orderNumber)
  }

  return NextResponse.json({ received: true })
}
