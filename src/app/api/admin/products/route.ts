export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(req: Request) {
  return handler(req)
}

export async function DELETE(req: Request) {
  return deleteHandler(req)
}

async function handler(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { z } = await import('zod')
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')
    const { slugify } = await import('@/lib/utils')

    await requireAdmin()

    const productSchema = z.object({
      name: z.string().min(1, 'Product name is required'),
      nameAr: z.string().optional().nullable(),
      description: z.string().min(1, 'Product description is required'),
      descriptionAr: z.string().optional().nullable(),
      price: z.number().positive('Price must be greater than 0'),
      categoryId: z.string().min(1, 'Category is required'),
      productType: z.enum(['course', 'video', 'audio', 'ebook']),
      status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
      isFeatured: z.boolean().optional().default(false),
      videoUrl: z.string().optional().nullable(), // Can be local path or URL
      imageUrls: z.array(z.string()).optional().nullable(),
    })

    const body = await req.json()
    const data = productSchema.parse(body)

    // Check if category exists
    const category = await db.category.findUnique({
      where: { id: data.categoryId },
    })

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 400 })
    }

    // Generate slug from name
    const baseSlug = slugify(data.name)
    let slug = baseSlug
    let slugCounter = 1

    // Ensure slug is unique
    while (await db.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${slugCounter}`
      slugCounter++
    }

    // Create product
    const product = await db.product.create({
      data: {
        name: data.name,
        nameAr: data.nameAr || null,
        slug,
        description: data.description,
        descriptionAr: data.descriptionAr || null,
        price: data.price,
        categoryId: data.categoryId,
        status: data.status,
        isFeatured: data.isFeatured ?? false,
        videoUrl: data.videoUrl && data.videoUrl.trim().length > 0 ? data.videoUrl.trim() : null,
        aiTags: [data.productType], // Store product type in aiTags
      },
    })

    // Add images if provided
    if (data.imageUrls && data.imageUrls.length > 0) {
      // Filter out empty or invalid URLs
      const validImageUrls = data.imageUrls.filter((url) => url && url.trim().length > 0)
      
      if (validImageUrls.length > 0) {
        await db.productImage.createMany({
          data: validImageUrls.map((url, index) => ({
            url: url.trim(),
            productId: product.id,
            order: index,
          })),
        })
      }
    }

    // Revalidate cache so product appears immediately in store
    revalidateTag('products')
    revalidateTag('featured-products')
    if (data.status === 'PUBLISHED') {
      revalidateTag(`product-${product.slug}`)
    }

    return NextResponse.json({
      success: true,
      product: {
        id: product.id,
        slug: product.slug,
        name: product.name,
      },
    })
  } catch (error) {
    console.error('Product creation error:', error)

    const { z } = await import('zod')
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create product' },
      { status: 500 }
    )
  }
}

async function deleteHandler(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')

    await requireAdmin()

    const { searchParams } = new URL(req.url)
    const productId = searchParams.get('id')

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    // Delete product (cascade will handle related records)
    await db.product.delete({
      where: { id: productId },
    })

    // Revalidate cache
    revalidateTag('products')
    revalidateTag('featured-products')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Product deletion error:', error)

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete product' },
      { status: 500 }
    )
  }
}
