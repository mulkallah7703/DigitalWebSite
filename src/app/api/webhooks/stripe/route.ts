export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function POST(req: Request) {
  // Prevent execution during build phase
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ received: false, error: 'Service unavailable during build' }, { status: 503 })
  }

  const { stripe } = await import('@/lib/stripe')
  const { db } = await import('@/lib/db')
  const { generateOrderNumber } = await import('@/lib/utils')
  const Stripe = (await import('stripe')).default

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

    const items = JSON.parse(itemsJson) as { productId: string; quantity: number }[]

    // Get product details
    const products = await db.product.findMany({
      where: { id: { in: items.map((i) => i.productId) } },
    })

    // Calculate totals
    const subtotal = items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId)
      return sum + (product ? Number(product.price) * item.quantity : 0)
    }, 0)

    // Create order
    const order = await db.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId,
        status: 'COMPLETED',
        paymentStatus: 'PAID',
        paymentMethod: 'stripe',
        paymentIntentId: session.payment_intent as string,
        subtotal,
        total: subtotal,
        customerEmail: session.customer_email || '',
        customerName: session.customer_details?.name || '',
        items: {
          create: items.map((item) => {
            const product = products.find((p) => p.id === item.productId)!
            return {
              productId: item.productId,
              quantity: item.quantity,
              price: product.price,
              total: Number(product.price) * item.quantity,
            }
          }),
        },
      },
    })

    // Update product sales count
    for (const item of items) {
      await db.product.update({
        where: { id: item.productId },
        data: { salesCount: { increment: item.quantity } },
      })
    }

    // Create notification
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
