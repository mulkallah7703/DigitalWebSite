export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  context: { params: { orderId: string } }
) {
  return getHandler(req, context)
}

export async function PATCH(
  req: Request,
  context: { params: { orderId: string } }
) {
  return updateHandler(req, context)
}

async function getHandler(
  req: Request,
  context: { params: { orderId: string } }
) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')

    await requireAdmin()

    const { orderId } = context.params

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                price: true,
                images: {
                  select: {
                    url: true,
                  },
                  take: 1,
                  orderBy: { order: 'asc' },
                },
              },
            },
          },
        },
        coupon: {
          select: {
            id: true,
            code: true,
            discountType: true,
            discountValue: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({ data: order })
  } catch (error) {
    console.error('Order fetch error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

async function updateHandler(
  req: Request,
  context: { params: { orderId: string } }
) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { z } = await import('zod')
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')

    await requireAdmin()

    const { orderId } = context.params

    const updateSchema = z.object({
      status: z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED', 'REFUNDED']).optional(),
      paymentStatus: z.enum(['PENDING', 'PAID', 'FAILED', 'REFUNDED']).optional(),
      notes: z.string().optional().nullable(),
    })

    const body = await req.json()
    const data = updateSchema.parse(body)

    // Check if order exists
    const existingOrder = await db.order.findUnique({
      where: { id: orderId },
    })

    if (!existingOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Validate state transitions
    if (data.status) {
      const validTransitions: Record<string, string[]> = {
        PENDING: ['PROCESSING', 'CANCELLED'],
        PROCESSING: ['COMPLETED', 'CANCELLED'],
        COMPLETED: ['REFUNDED'],
        CANCELLED: [],
        REFUNDED: [],
      }

      const allowedNextStatuses = validTransitions[existingOrder.status] || []
      if (!allowedNextStatuses.includes(data.status) && data.status !== existingOrder.status) {
        return NextResponse.json(
          { error: `Invalid status transition from ${existingOrder.status} to ${data.status}` },
          { status: 400 }
        )
      }
    }

    // Update order
    const order = await db.order.update({
      where: { id: orderId },
      data: {
        status: data.status,
        paymentStatus: data.paymentStatus,
        notes: data.notes !== undefined ? (data.notes || null) : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                price: true,
                images: {
                  select: {
                    url: true,
                  },
                  take: 1,
                  orderBy: { order: 'asc' },
                },
              },
            },
          },
        },
        coupon: {
          select: {
            id: true,
            code: true,
            discountType: true,
            discountValue: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error('Order update error:', error)

    const { z } = await import('zod')
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update order' },
      { status: 500 }
    )
  }
}
