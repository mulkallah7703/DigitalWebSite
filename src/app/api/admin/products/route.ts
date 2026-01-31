export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(req: Request) {
  return handler(req)
}

export async function PUT(req: Request) {
  return updateHandler(req)
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
      externalPurchaseLink: z.string().optional().nullable(),
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
        externalPurchaseLink: data.externalPurchaseLink && data.externalPurchaseLink.trim().length > 0
          ? data.externalPurchaseLink.trim()
          : null,
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

async function updateHandler(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { z } = await import('zod')
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')
    const { slugify } = await import('@/lib/utils')

    await requireAdmin()

    const { searchParams } = new URL(req.url)
    const productId = searchParams.get('id')

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    const productSchema = z.object({
      name: z.string().min(1, 'Product name is required'),
      nameAr: z.string().optional().nullable(),
      description: z.string().min(1, 'Product description is required'),
      descriptionAr: z.string().optional().nullable(),
      price: z.union([z.number(), z.string()]).transform((val) => {
        const num = typeof val === 'string' ? parseFloat(val) : val
        if (!Number.isFinite(num) || isNaN(num)) {
          throw new z.ZodError([{
            code: 'custom',
            path: ['price'],
            message: 'Price must be a valid number'
          }])
        }
        return num
      }),
      comparePrice: z.union([z.number(), z.string(), z.null()]).optional().nullable().transform((val) => {
        if (val === null || val === undefined || val === '') {
          return null
        }
        const num = typeof val === 'string' ? parseFloat(val) : val
        if (!Number.isFinite(num) || isNaN(num)) {
          return null
        }
        return num
      }),
      externalPurchaseLink: z.string().optional().nullable(),
      categoryId: z.string().min(1, 'Category is required'),
      productType: z.enum(['course', 'video', 'audio', 'ebook']),
      status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
      isFeatured: z.boolean().optional().default(false),
      videoUrl: z.string().optional().nullable(),
      imageUrls: z.array(z.string()).optional().nullable(),
    })

    const body = await req.json()
    const data = productSchema.parse(body)

    // Validate and normalize price (Decimal(10,2) = max 99,999,999.99)
    const MAX_DECIMAL_VALUE = 99999999.99

    // Normalize price (Zod already converted string to number, but ensure it's finite)
    let normalizedPrice: number = typeof data.price === 'number' ? data.price : parseFloat(String(data.price))

    if (!Number.isFinite(normalizedPrice) || isNaN(normalizedPrice)) {
      return NextResponse.json(
        { error: 'Price must be a valid finite number' },
        { status: 400 }
      )
    }

    if (normalizedPrice <= 0) {
      return NextResponse.json(
        { error: 'Price must be greater than 0' },
        { status: 400 }
      )
    }

    if (Math.abs(normalizedPrice) > MAX_DECIMAL_VALUE) {
      return NextResponse.json(
        { error: `Price cannot exceed ${MAX_DECIMAL_VALUE.toLocaleString()}` },
        { status: 400 }
      )
    }

    // Round to 2 decimal places
    normalizedPrice = Math.round(normalizedPrice * 100) / 100

    // Normalize comparePrice (optional, nullable)
    // Zod transform already converts string to number or null, so data.comparePrice is number | null
    let normalizedComparePrice: number | null = null
    if (data.comparePrice !== null && data.comparePrice !== undefined && typeof data.comparePrice === 'number') {
      const comparePriceValue = data.comparePrice

      if (Number.isFinite(comparePriceValue) && !isNaN(comparePriceValue)) {
        if (comparePriceValue <= 0) {
          return NextResponse.json(
            { error: 'Compare price must be greater than 0 if provided' },
            { status: 400 }
          )
        }

        if (Math.abs(comparePriceValue) > MAX_DECIMAL_VALUE) {
          return NextResponse.json(
            { error: `Compare price cannot exceed ${MAX_DECIMAL_VALUE.toLocaleString()}` },
            { status: 400 }
          )
        }

        // Round to 2 decimal places
        normalizedComparePrice = Math.round(comparePriceValue * 100) / 100
      }
    }

    // Check if product exists
    const existingProduct = await db.product.findUnique({
      where: { id: productId },
    })

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Check if category exists
    const category = await db.category.findUnique({
      where: { id: data.categoryId },
    })

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 400 })
    }

    // Generate slug from name if name changed
    let slug = existingProduct.slug
    if (data.name !== existingProduct.name) {
      const baseSlug = slugify(data.name)
      slug = baseSlug
      let slugCounter = 1
      while (
        await db.product.findFirst({
          where: {
            AND: [
              { slug },
              { id: { not: productId } }
            ]
          }
        })
      ) {
        slug = `${baseSlug}-${slugCounter}`
        slugCounter++
      }
    }

    // Update product
    const product = await db.product.update({
      where: { id: productId },
      data: {
        name: data.name,
        nameAr: data.nameAr || null,
        slug,
        description: data.description,
        descriptionAr: data.descriptionAr || null,
        price: normalizedPrice,
        comparePrice: normalizedComparePrice,
        externalPurchaseLink: data.externalPurchaseLink && data.externalPurchaseLink.trim().length > 0
          ? data.externalPurchaseLink.trim()
          : null,
        categoryId: data.categoryId,
        status: data.status,
        isFeatured: data.isFeatured ?? false,
        videoUrl: data.videoUrl && data.videoUrl.trim().length > 0 ? data.videoUrl.trim() : null,
        aiTags: [data.productType],
      },
    })

    // Update images if provided
    if (data.imageUrls && data.imageUrls.length > 0) {
      // Delete existing images
      await db.productImage.deleteMany({
        where: { productId: product.id },
      })

      // Create new images
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

    // Revalidate cache
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
    console.error('Product update error:', error)

    const { z } = await import('zod')
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update product' },
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
