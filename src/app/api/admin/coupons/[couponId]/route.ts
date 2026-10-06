export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { revalidateStore } from '@/lib/revalidate-store'

export async function GET(
  req: Request,
  context: { params: { couponId: string } }
) {
  return getHandler(req, context)
}

export async function PATCH(
  req: Request,
  context: { params: { couponId: string } }
) {
  return updateHandler(req, context)
}

export async function DELETE(
  req: Request,
  context: { params: { couponId: string } }
) {
  return deleteHandler(req, context)
}

async function getHandler(
  req: Request,
  context: { params: { couponId: string } }
) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')

    await requireAdmin()

    const { couponId } = context.params

    const coupon = await db.coupon.findUnique({
      where: { id: couponId },
      include: {
        _count: {
          select: { orders: true },
        },
      },
    })

    if (!coupon) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 })
    }

    return NextResponse.json({ data: coupon })
  } catch (error) {
    console.error('Coupon fetch error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch coupon' },
      { status: 500 }
    )
  }
}

async function updateHandler(
  req: Request,
  context: { params: { couponId: string } }
) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { z } = await import('zod')
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')

    await requireAdmin()

    const { couponId } = context.params

    const updateSchema = z.object({
      code: z.string().min(1).transform((val) => val.toUpperCase().trim()).optional(),
      description: z.string().optional().nullable(),
      discountType: z.enum(['PERCENTAGE', 'FIXED']).optional(),
      discountValue: z.number().positive().optional(),
      minPurchase: z.number().optional().nullable(),
      maxDiscount: z.number().optional().nullable(),
      usageLimit: z.number().int().positive().optional().nullable(),
      startDate: z.string().optional().nullable().transform((val) => val ? new Date(val) : null),
      endDate: z.string().optional().nullable().transform((val) => val ? new Date(val) : null),
      active: z.boolean().optional(),
      productIds: z.array(z.string()).optional(),
    })

    const body = await req.json()
    const data = updateSchema.parse(body)

    // Check if coupon exists
    const existingCoupon = await db.coupon.findUnique({
      where: { id: couponId },
    })

    if (!existingCoupon) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 })
    }

    // Check code uniqueness if code is being changed
    if (data.code && data.code !== existingCoupon.code) {
      const codeExists = await db.coupon.findUnique({
        where: { code: data.code },
      })

      if (codeExists) {
        return NextResponse.json(
          { error: 'Coupon code already exists' },
          { status: 400 }
        )
      }
    }

    // Validate date range
    const startDate = data.startDate !== undefined ? data.startDate : existingCoupon.startDate
    const endDate = data.endDate !== undefined ? data.endDate : existingCoupon.endDate
    if (startDate && endDate && startDate >= endDate) {
      return NextResponse.json(
        { error: 'Start date must be before end date' },
        { status: 400 }
      )
    }

    // Validate discount value
    const discountValue = data.discountValue !== undefined ? data.discountValue : Number(existingCoupon.discountValue)
    const discountType = data.discountType || existingCoupon.discountType
    if (discountType === 'PERCENTAGE' && discountValue > 100) {
      return NextResponse.json(
        { error: 'Percentage discount cannot exceed 100%' },
        { status: 400 }
      )
    }

    const productIds = data.productIds ? Array.from(new Set(data.productIds)) : undefined
    if (productIds && productIds.length > 0) {
      const found = await db.product.count({ where: { id: { in: productIds } } })
      if (found !== productIds.length) {
        return NextResponse.json({ error: 'One or more products were not found' }, { status: 400 })
      }
    }

    const previousLinks = await db.couponProduct.findMany({
      where: { couponId },
      select: { productId: true },
    })
    const affectedIds = Array.from(new Set([
      ...previousLinks.map((link) => link.productId),
      ...(productIds || []),
    ]))

    // Update coupon
    const coupon = await db.coupon.update({
      where: { id: couponId },
      data: {
        code: data.code,
        description: data.description !== undefined ? (data.description || null) : undefined,
        discountType: data.discountType,
        discountValue: data.discountValue,
        minPurchase: data.minPurchase !== undefined ? (data.minPurchase || null) : undefined,
        maxDiscount: data.maxDiscount !== undefined ? (data.maxDiscount || null) : undefined,
        usageLimit: data.usageLimit !== undefined ? (data.usageLimit || null) : undefined,
        startDate: data.startDate !== undefined ? data.startDate : undefined,
        endDate: data.endDate !== undefined ? data.endDate : undefined,
        active: data.active !== undefined ? data.active : undefined,
        ...(productIds
          ? {
              products: {
                deleteMany: {},
                create: productIds.map((productId) => ({ productId })),
              },
            }
          : {}),
      },
      include: {
        _count: {
          select: { orders: true },
        },
      },
    })

    const targeted = affectedIds.length
      ? await db.product.findMany({
          where: { id: { in: affectedIds } },
          select: { slug: true },
        })
      : []
    revalidateStore(targeted.map((product) => product.slug))

    return NextResponse.json({
      success: true,
      data: coupon,
    })
  } catch (error) {
    console.error('Coupon update error:', error)

    const { z } = await import('zod')
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update coupon' },
      { status: 500 }
    )
  }
}

async function deleteHandler(
  req: Request,
  context: { params: { couponId: string } }
) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')

    await requireAdmin()

    const { couponId } = context.params

    // Check if coupon exists
    const coupon = await db.coupon.findUnique({
      where: { id: couponId },
      include: {
        _count: {
          select: { orders: true },
        },
      },
    })

    if (!coupon) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 })
    }

    const targeted = await db.couponProduct.findMany({
      where: { couponId },
      select: { product: { select: { slug: true } } },
    })

    // Check if coupon has been used
    if (coupon._count.orders > 0) {
      return NextResponse.json(
        { error: `Cannot delete coupon. It has been used ${coupon._count.orders} time(s).` },
        { status: 400 }
      )
    }

    // Delete coupon
    await db.coupon.delete({
      where: { id: couponId },
    })

    revalidateStore(targeted.map((link) => link.product.slug))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Coupon deletion error:', error)

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete coupon' },
      { status: 500 }
    )
  }
}
