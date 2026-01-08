import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { db } from '@/lib/db'
import { getProductBySlug, getRelatedProducts, incrementViewCount } from '@/lib/cache'
import { ProductDetails } from '@/components/products/product-details'
import { Skeleton } from '@/components/ui/skeleton'

// Lazy load related products
const RelatedProducts = dynamic(
  () => import('@/components/products/related-products').then(mod => ({ default: mod.RelatedProducts })),
  {
    loading: () => (
      <div className="mt-16">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] rounded-2xl" />
          ))}
        </div>
      </div>
    ),
  }
)

interface ProductPageProps {
  params: { slug: string }
}

// Generate static params for popular products
export async function generateStaticParams() {
  const products = await db.product.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true },
    orderBy: { salesCount: 'desc' },
    take: 50, // Pre-render top 50 products
  })
  
  return products.map((product) => ({
    slug: product.slug,
  }))
}

// ISR with 5 minute revalidation
export const revalidate = 300

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.metaTitle || product.name,
    description: product.metaDescription || product.shortDescription || product.description.slice(0, 160),
    keywords: product.metaKeywords || product.aiTags.join(', '),
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description.slice(0, 160),
      images: product.images[0]?.url ? [product.images[0].url] : [],
      type: 'website',
    },
  }
}

async function RelatedProductsSection({ categoryId, productId }: { categoryId: string; productId: string }) {
  const relatedProducts = await getRelatedProducts(categoryId, productId)
  
  if (relatedProducts.length === 0) return null
  
  return <RelatedProducts products={relatedProducts} />
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  // Fire and forget - don't block render
  incrementViewCount(product.id)

  // JSON-LD Schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((img) => img.url),
    offers: {
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: product.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: product.reviewCount,
    } : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
        <Suspense fallback={null}>
          <RelatedProductsSection categoryId={product.categoryId} productId={product.id} />
        </Suspense>
      </div>
    </>
  )
}
