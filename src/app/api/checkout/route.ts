export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  return handler(req);
}

async function handler(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { z } = await import('zod')
    const { requireAuth } = await import('@/lib/auth')
    const { createCheckoutSession } = await import('@/lib/stripe')
    const { db } = await import('@/lib/db')

    const checkoutSchema = z.object({
      items: z.array(
        z.object({
          productId: z.string(),
          quantity: z.number().min(1),
        })
      ),
    })
    
    const session = await requireAuth()
    const body = await req.json()
    const { items } = checkoutSchema.parse(body)

    const productIds = items.map((item) => item.productId)
    const products = await db.product.findMany({
      where: { id: { in: productIds }, status: 'PUBLISHED' },
    })

    if (products.length !== items.length) {
      return NextResponse.json(
        { error: 'Some products are not available' },
        { status: 400 }
      )
    }

    const lineItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!
      return {
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        quantity: item.quantity,
      }
    })

    const checkoutSession = await createCheckoutSession({
      items: lineItems,
      userId: session.user.id,
      customerEmail: session.user.email!,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Checkout error:', error)
    const { z } = await import('zod')
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
