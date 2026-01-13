export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function GET(req: Request) {
  return getHandler(req)
}

export async function POST(req: Request) {
  return createHandler(req)
}

async function getHandler(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')

    await requireAdmin()

    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'newest'

    const where: any = {}
    if (search) {
      where.code = { contains: search, mode: 'insensitive' }
    }

    let orderBy: any = { createdAt: 'desc' }
    switch (sortBy) {
      case 'expiring':
        orderBy = { endDate: 'asc' }
        break
      case 'usage':
        orderBy = { usageCount: 'desc' }
        break
      case 'value':
        orderBy = { discountValue: 'desc' }
        break
      default:
        orderBy = { createdAt: 'desc' }
    }

    const coupons = await db.coupon.findMany({
      where,
      include: {
        _count: {
          select: { orders: true },
        },
      },
      orderBy,
    })

    return NextResponse.json({ data: coupons })
  } catch (error) {
    console.error('Coupons fetch error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch coupons' },
      { status: 500 }
    )
  }
}

async function createHandler(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { z } = await import('zod')
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')

    await requireAdmin()

    const couponSchema = z.object({
      code: z.string().min(1, 'Coupon code is required').transform((val) => val.toUpperCase().trim()),
      description: z.string().optional().nullable(),
      discountType: z.enum(['PERCENTAGE', 'FIXED']),
      discountValue: z.number().positive('Discount value must be greater than 0'),
      minPurchase: z.number().optional().nullable(),
      maxDiscount: z.number().optional().nullable(),
      usageLimit: z.number().int().positive().optional().nullable(),
      startDate: z.string().optional().nullable().transform((val) => val ? new Date(val) : null),
      endDate: z.string().optional().nullable().transform((val) => val ? new Date(val) : null),
      active: z.boolean().optional().default(true),
    })

    const body = await req.json()
    const data = couponSchema.parse(body)

    // Validate date range
    if (data.startDate && data.endDate && data.startDate >= data.endDate) {
      return NextResponse.json(
        { error: 'Start date must be before end date' },
        { status: 400 }
      )
    }

    // Check if code already exists
    const existingCoupon = await db.coupon.findUnique({
      where: { code: data.code },
    })

    if (existingCoupon) {
      return NextResponse.json(
        { error: 'Coupon code already exists' },
        { status: 400 }
      )
    }

    // Validate discount value based on type
    if (data.discountType === 'PERCENTAGE' && data.discountValue > 100) {
      return NextResponse.json(
        { error: 'Percentage discount cannot exceed 100%' },
        { status: 400 }
      )
    }

    // Create coupon
    const coupon = await db.coupon.create({
      data: {
        code: data.code,
        description: data.description || null,
        discountType: data.discountType,
        discountValue: data.discountValue,
        minPurchase: data.minPurchase || null,
        maxDiscount: data.maxDiscount || null,
        usageLimit: data.usageLimit || null,
        startDate: data.startDate,
        endDate: data.endDate,
        active: data.active ?? true,
      },
      include: {
        _count: {
          select: { orders: true },
        },
      },
    })

    revalidateTag('coupons')

    return NextResponse.json({
      success: true,
      data: coupon,
    })
  } catch (error) {
    console.error('Coupon creation error:', error)

    const { z } = await import('zod')
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create coupon' },
      { status: 500 }
    )
  }
}
