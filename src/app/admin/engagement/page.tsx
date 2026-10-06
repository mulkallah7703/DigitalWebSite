import { db } from '@/lib/db'
import { EngagementEditor, type EngagementProduct } from '@/components/admin/engagement-editor'

export const dynamic = 'force-dynamic'

export default async function EngagementPage() {
  const products = await db.product.findMany({
    select: {
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
        orderBy: { order: 'asc' },
        take: 1,
        select: { url: true, alt: true },
      },
    },
    orderBy: { name: 'asc' },
  })

  const rows: EngagementProduct[] = products.map((product) => ({
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
  }))

  return <EngagementEditor products={rows} />
}
