export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0
export const maxDuration = 60

import { NextResponse } from 'next/server'

/**
 * Completes an order for products delivered by email (no Payhip link) whose
 * server-side price is $0 (free or a coupon brings it to $0), then emails the
 * files to the signed-in customer. Paid or Payhip products are rejected here.
 */
export async function POST(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  const { z } = await import('zod')
  const schema = z.object({
    items: z
      .array(z.object({ productId: z.string().min(1), quantity: z.number().int().min(1).max(10) }))
      .min(1)
      .max(50),
  })

  let session
  try {
    const { requireAuth } = await import('@/lib/auth')
    session = await requireAuth()
  } catch {
    return NextResponse.json({ error: 'Please sign in to continue', code: 'UNAUTHORIZED' }, { status: 401 })
  }

  let items: { productId: string; quantity: number }[]
  try {
    items = schema.parse(await req.json()).items
  } catch {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
  }

  try {
    const { db } = await import('@/lib/db')
    const { priceOrderLines } = await import('@/lib/product-discount')
    const { deliversByEmail, hasPayhipLink } = await import('@/lib/product-delivery')
    const { generateOrderNumber } = await import('@/lib/utils')
    const { sendOrderFilesEmail } = await import('@/lib/order-delivery')
    const { mailConfigured } = await import('@/lib/mailer')

    // Merge duplicate lines so pricing and quantities are consistent.
    const merged = Array.from(
      items.reduce((map, item) => map.set(item.productId, (map.get(item.productId) || 0) + item.quantity), new Map<string, number>()),
    ).map(([productId, quantity]) => ({ productId, quantity }))

    const products = await db.product.findMany({
      where: { id: { in: merged.map((item) => item.productId) }, status: 'PUBLISHED' },
      select: {
        id: true,
        externalPurchaseLink: true,
        videoUrl: true,
        files: { select: { id: true, name: true, size: true, type: true } },
      },
    })
    if (products.length !== merged.length) {
      return NextResponse.json({ error: 'Some products are not available' }, { status: 400 })
    }
    if (products.some(hasPayhipLink)) {
      return NextResponse.json({ error: 'This product is purchased on Payhip', code: 'PAYHIP' }, { status: 400 })
    }
    if (!products.every(deliversByEmail)) {
      return NextResponse.json({ error: 'Some products have no files to deliver', code: 'NO_FILES' }, { status: 400 })
    }

    const priced = await priceOrderLines(merged)
    if (!priced) {
      return NextResponse.json({ error: 'Some products are not available' }, { status: 400 })
    }
    if (priced.total > 0) {
      return NextResponse.json(
        { error: 'Online payment is not available for this product yet', code: 'PAYMENT_REQUIRED' },
        { status: 402 },
      )
    }

    if (!mailConfigured()) {
      console.error('[checkout/free] email is not configured (SMTP_* or RESEND_API_KEY)')
      return NextResponse.json(
        { error: 'Email delivery is temporarily unavailable. Please try again later.', code: 'EMAIL_UNAVAILABLE' },
        { status: 503 },
      )
    }

    const email = session.user.email
    if (!email) {
      return NextResponse.json({ error: 'Your account has no email address' }, { status: 400 })
    }

    const order = await db.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: session.user.id,
        status: 'COMPLETED',
        paymentStatus: 'PAID',
        paymentMethod: 'free',
        subtotal: priced.subtotal,
        discount: priced.discount,
        total: priced.total,
        couponId: priced.couponId,
        customerEmail: email,
        customerName: session.user.name || '',
        items: {
          create: priced.lines.map((line) => ({
            productId: line.productId,
            quantity: line.quantity,
            price: line.unitPrice,
            total: line.unitPrice * line.quantity,
          })),
        },
      },
    })

    await Promise.all([
      ...priced.couponIds.map((id) => db.coupon.update({ where: { id }, data: { usageCount: { increment: 1 } } })),
      ...priced.lines.map((line) =>
        db.product.update({ where: { id: line.productId }, data: { salesCount: { increment: line.quantity } } }),
      ),
    ]).catch((error) => console.error('[checkout/free] counters', error))

    const delivery = await sendOrderFilesEmail(order.id)

    await db.notification
      .create({
        data: {
          userId: session.user.id,
          type: 'ORDER_COMPLETED',
          title: 'Order Completed',
          message: delivery.ok
            ? `Your order ${order.orderNumber} is complete. The files were sent to ${email}.`
            : `Your order ${order.orderNumber} is complete. We could not email the files yet; we will send them shortly.`,
          data: { orderId: order.id },
        },
      })
      .catch((error) => console.error('[checkout/free] notification', error))

    if (!delivery.ok) {
      console.error('[checkout/free] delivery failed', order.orderNumber, delivery.reason)
      return NextResponse.json(
        { ok: false, orderNumber: order.orderNumber, error: 'Order saved, but the email could not be sent. Please contact us.', code: 'EMAIL_FAILED' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true, orderNumber: order.orderNumber, email, mode: delivery.mode })
  } catch (error) {
    console.error('[checkout/free]', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
