export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  context: { params: { userId: string } }
) {
  return getHandler(req, context)
}

export async function PATCH(
  req: Request,
  context: { params: { userId: string } }
) {
  return updateHandler(req, context)
}

export async function DELETE(
  req: Request,
  context: { params: { userId: string } }
) {
  return deleteHandler(req, context)
}

async function getHandler(
  req: Request,
  context: { params: { userId: string } }
) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')

    await requireAdmin()

    const { userId } = context.params

    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            orders: true,
            reviews: true,
            wishlist: true,
          },
        },
        orders: {
          select: {
            id: true,
            orderNumber: true,
            total: true,
            status: true,
            paymentStatus: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calculate total spent
    const totalSpentResult = await db.order.aggregate({
      where: {
        userId: user.id,
        paymentStatus: 'PAID',
      },
      _sum: {
        total: true,
      },
    })

    const totalSpent = Number(totalSpentResult._sum.total || 0)

    return NextResponse.json({
      data: {
        ...user,
        totalSpent,
      },
    })
  } catch (error) {
    console.error('User fetch error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

async function updateHandler(
  req: Request,
  context: { params: { userId: string } }
) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { z } = await import('zod')
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')

    await requireAdmin()

    const { userId } = context.params

    const updateSchema = z.object({
      role: z.enum(['USER', 'ADMIN', 'SUPER_ADMIN']).optional(),
      name: z.string().optional(),
    })

    const body = await req.json()
    const data = updateSchema.parse(body)

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { id: userId },
    })

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Prevent self-role change for safety
    const session = await requireAdmin()
    if (session.user.id === userId && data.role && data.role !== existingUser.role) {
      return NextResponse.json(
        { error: 'You cannot change your own role' },
        { status: 400 }
      )
    }

    // Update user
    const user = await db.user.update({
      where: { id: userId },
      data: {
        role: data.role,
        name: data.name,
      },
      include: {
        _count: {
          select: {
            orders: true,
            reviews: true,
            wishlist: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error('User update error:', error)

    const { z } = await import('zod')
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update user' },
      { status: 500 }
    )
  }
}

async function deleteHandler(
  req: Request,
  context: { params: { userId: string } }
) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')

    const session = await requireAdmin()

    const { userId } = context.params

    // Prevent self-deletion
    if (session.user.id === userId) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user has orders
    if (user._count.orders > 0) {
      return NextResponse.json(
        { error: `Cannot delete user. User has ${user._count.orders} order(s). Please handle orders first.` },
        { status: 400 }
      )
    }

    // Delete user
    await db.user.delete({
      where: { id: userId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('User deletion error:', error)

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete user' },
      { status: 500 }
    )
  }
}
