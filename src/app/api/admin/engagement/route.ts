export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { revalidateStore } from '@/lib/revalidate-store'
import { clampRating } from '@/lib/display-stats'

function errorResponse(error: unknown, fallback: string) {
  const message = error instanceof Error ? error.message : fallback
  const status = message === 'Unauthorized' ? 401 : message === 'Forbidden' ? 403 : 500
  return NextResponse.json({ error: message }, { status })
}

function plainProduct(product: {
  id: string
  name: string
  slug: string
  rating: unknown
  reviewCount: number
  salesCount: number
  displayRating: unknown
  displayReviewCount: number | null
  displaySalesCount: number | null
  useManualStats: boolean
  images: { url: string; alt: string | null }[]
}) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    imageUrl: product.images[0]?.url || null,
    imageAlt: product.images[0]?.alt || product.name,
    rating: Number(product.rating) || 0,
    reviewCount: product.reviewCount,
    salesCount: product.salesCount,
    displayRating: product.displayRating == null ? null : Number(product.displayRating),
    displayReviewCount: product.displayReviewCount,
    displaySalesCount: product.displaySalesCount,
    useManualStats: product.useManualStats,
  }
}

const productSelect = {
  id: true,
  name: true,
  slug: true,
  rating: true,
  reviewCount: true,
  salesCount: true,
  displayRating: true,
  displayReviewCount: true,
  displaySalesCount: true,
  useManualStats: true,
  images: {
    orderBy: { order: 'asc' as const },
    take: 1,
    select: { url: true, alt: true },
  },
}

export async function GET() {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }
  try {
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')
    await requireAdmin()
    const products = await db.product.findMany({
      select: productSelect,
      orderBy: { name: 'asc' },
    })
    return NextResponse.json({ data: products.map(plainProduct) })
  } catch (error) {
    console.error('[engagement] list', error)
    return errorResponse(error, 'Failed to load products')
  }
}

export async function PATCH(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }
  try {
    const { z } = await import('zod')
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')
    await requireAdmin()

    const schema = z.object({
      productId: z.string().min(1),
      useManualStats: z.boolean(),
      displayRating: z.number().min(0).max(5).nullable(),
      displayReviewCount: z.number().int().min(0).nullable(),
      displaySalesCount: z.number().int().min(0).nullable(),
    })
    const data = schema.parse(await req.json())
    const existing = await db.product.findUnique({
      where: { id: data.productId },
      select: { id: true, slug: true },
    })
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const product = await db.product.update({
      where: { id: data.productId },
      data: {
        useManualStats: data.useManualStats,
        displayRating: data.displayRating == null ? null : clampRating(data.displayRating),
        displayReviewCount: data.displayReviewCount,
        displaySalesCount: data.displaySalesCount,
      },
      select: productSelect,
    })
    revalidateStore([existing.slug])
    return NextResponse.json({ data: plainProduct(product) })
  } catch (error) {
    console.error('[engagement] save', error)
    const { z } = await import('zod')
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message || 'Invalid data' }, { status: 400 })
    }
    return errorResponse(error, 'Failed to save engagement stats')
  }
}
