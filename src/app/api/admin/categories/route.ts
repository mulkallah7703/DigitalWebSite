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

export async function PUT(req: Request) {
  return updateHandler(req)
}

export async function DELETE(req: Request) {
  return deleteHandler(req)
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
    const includeHidden = searchParams.get('includeHidden') === 'true'

    const categories = await db.category.findMany({
      where: includeHidden ? {} : { visible: true },
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: [
        { order: 'asc' },
        { name: 'asc' },
      ],
    })

    return NextResponse.json({ data: categories })
  } catch (error) {
    console.error('Categories fetch error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch categories' },
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
    const { slugify } = await import('@/lib/utils')

    await requireAdmin()

    const categorySchema = z.object({
      name: z.string().min(1, 'Category name is required'),
      slug: z.string().optional(),
      description: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      order: z.number().int().optional().default(0),
      visible: z.boolean().optional().default(true),
      metaTitle: z.string().optional().nullable(),
      metaDescription: z.string().optional().nullable(),
    })

    const body = await req.json()
    const data = categorySchema.parse(body)

    // Generate slug from name if not provided
    let slug = data.slug || slugify(data.name)
    
    // Ensure slug is unique
    let slugCounter = 1
    const baseSlug = slug
    while (await db.category.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${slugCounter}`
      slugCounter++
    }

    // Get max order value and set new category order
    const maxOrder = await db.category.aggregate({
      _max: { order: true },
    })
    const order = data.order ?? ((maxOrder._max.order ?? 0) + 1)

    // Create category
    const category = await db.category.create({
      data: {
        name: data.name,
        slug,
        description: data.description || null,
        image: data.image || null,
        order,
        visible: data.visible ?? true,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    })

    // Revalidate cache
    revalidateTag('categories')

    return NextResponse.json({
      success: true,
      category,
    })
  } catch (error) {
    console.error('Category creation error:', error)

    const { z } = await import('zod')
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create category' },
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
    const categoryId = searchParams.get('id')

    if (!categoryId) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 })
    }

    const categorySchema = z.object({
      name: z.string().min(1, 'Category name is required'),
      slug: z.string().optional(),
      description: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      order: z.number().int().optional(),
      visible: z.boolean().optional(),
      metaTitle: z.string().optional().nullable(),
      metaDescription: z.string().optional().nullable(),
    })

    const body = await req.json()
    const data = categorySchema.parse(body)

    // Check if category exists
    const existingCategory = await db.category.findUnique({
      where: { id: categoryId },
    })

    if (!existingCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    // Generate slug from name if not provided or if name changed
    let slug = data.slug || existingCategory.slug
    if (data.name !== existingCategory.name && !data.slug) {
      slug = slugify(data.name)
    }

    // Ensure slug is unique (excluding current category)
    if (slug !== existingCategory.slug) {
      let slugCounter = 1
      const baseSlug = slug
      while (
        await db.category.findFirst({
          where: {
            AND: [
              { slug },
              { id: { not: categoryId } }
            ]
          }
        })
      ) {
        slug = `${baseSlug}-${slugCounter}`
        slugCounter++
      }
    }

    // Update category
    const category = await db.category.update({
      where: { id: categoryId },
      data: {
        name: data.name,
        slug,
        description: data.description !== undefined ? (data.description || null) : undefined,
        image: data.image !== undefined ? (data.image || null) : undefined,
        order: data.order !== undefined ? data.order : undefined,
        visible: data.visible !== undefined ? data.visible : undefined,
        metaTitle: data.metaTitle !== undefined ? (data.metaTitle || null) : undefined,
        metaDescription: data.metaDescription !== undefined ? (data.metaDescription || null) : undefined,
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    })

    // Revalidate cache
    revalidateTag('categories')

    return NextResponse.json({
      success: true,
      category,
    })
  } catch (error) {
    console.error('Category update error:', error)

    const { z } = await import('zod')
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update category' },
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
    const categoryId = searchParams.get('id')

    if (!categoryId) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 })
    }

    // Check if category exists
    const category = await db.category.findUnique({
      where: { id: categoryId },
      include: {
        _count: {
          select: { products: true },
        },
      },
    })

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    // Check if category has products
    if (category._count.products > 0) {
      return NextResponse.json(
        { 
          error: `Cannot delete category. It has ${category._count.products} product(s) associated with it. Please remove or reassign products first.` 
        },
        { status: 400 }
      )
    }

    // Delete category
    await db.category.delete({
      where: { id: categoryId },
    })

    // Revalidate cache
    revalidateTag('categories')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Category deletion error:', error)

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete category' },
      { status: 500 }
    )
  }
}
