import { unstable_cache } from 'next/cache'
import { db, serializeProducts } from './db'

// Cache tags for revalidation
export const CACHE_TAGS = {
  products: 'products',
  featuredProducts: 'featured-products',
  categories: 'categories',
  product: (slug: string) => `product-${slug}`,
} as const

// Cached query for featured products (revalidate every 5 minutes)
export const getFeaturedProducts = unstable_cache(
  async () => {
    const products = await db.product.findMany({
      where: {
        status: 'PUBLISHED',
        isFeatured: true,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        comparePrice: true,
        rating: true,
        reviewCount: true,
        featured: true,
        isFeatured: true,
        externalPurchaseLink: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
            alt: true,
          },
          orderBy: { order: 'asc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 8,
    })
    return serializeProducts(products)
  },
  ['featured-products'],
  {
    revalidate: 300, // 5 minutes
    tags: [CACHE_TAGS.featuredProducts, CACHE_TAGS.products],
  }
)

// Cached query for categories (revalidate every 10 minutes)
export const getCategories = unstable_cache(
  async () => {
    return db.category.findMany({
      where: { 
        parentId: null,
        visible: true,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        image: true,
        _count: {
          select: { products: { where: { status: 'PUBLISHED' } } },
        },
      },
      orderBy: [
        { order: 'asc' },
        { name: 'asc' },
      ],
    })
  },
  ['categories'],
  {
    revalidate: 600, // 10 minutes
    tags: [CACHE_TAGS.categories],
  }
)

// Cached query for categories list (lighter version for filters)
export const getCategoriesForFilter = unstable_cache(
  async () => {
    return db.category.findMany({
      where: { 
        parentId: null,
        visible: true,
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
      orderBy: [
        { order: 'asc' },
        { name: 'asc' },
      ],
    })
  },
  ['categories-filter'],
  {
    revalidate: 600,
    tags: [CACHE_TAGS.categories],
  }
)

// Cached query for single product
export const getProductBySlug = unstable_cache(
  async (slug: string) => {
    const product = await db.product.findUnique({
      where: { slug, status: 'PUBLISHED' },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
        files: {
          select: {
            id: true,
            name: true,
            size: true,
            type: true,
          },
        },
        reviews: {
          include: {
            user: {
              select: { id: true, name: true, image: true },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        tags: {
          include: { tag: true },
        },
      },
    })
    
    if (!product) return null
    
    // Explicitly include videoUrl and all fields
    return {
      ...product,
      videoUrl: product.videoUrl, // Explicitly include videoUrl
      externalPurchaseLink: product.externalPurchaseLink ?? null,
      price: Number(product.price),
      comparePrice: product.comparePrice ? Number(product.comparePrice) : null,
      rating: Number(product.rating),
    }
  },
  ['product'],
  {
    revalidate: 300,
    tags: [CACHE_TAGS.products],
  }
)

// Cached query for related products
export const getRelatedProducts = unstable_cache(
  async (categoryId: string, excludeProductId: string) => {
    const products = await db.product.findMany({
      where: {
        categoryId,
        status: 'PUBLISHED',
        id: { not: excludeProductId },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        comparePrice: true,
        rating: true,
        reviewCount: true,
        featured: true,
        externalPurchaseLink: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
            alt: true,
          },
          orderBy: { order: 'asc' },
          take: 1,
        },
      },
      take: 4,
    })
    return serializeProducts(products)
  },
  ['related-products'],
  {
    revalidate: 300,
    tags: [CACHE_TAGS.products],
  }
)

// Increment view count without blocking (fire and forget)
export async function incrementViewCount(productId: string) {
  try {
    await db.product.update({
      where: { id: productId },
      data: { viewCount: { increment: 1 } },
    })
  } catch {
    // Silently fail - view count is not critical
  }
}
