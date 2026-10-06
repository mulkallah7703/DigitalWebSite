function finiteNumber(value: unknown): number | null {
  if (value == null || value === '') return null
  const n = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(n) ? n : null
}

export function clampRating(value: number) {
  return Math.min(5, Math.max(0, Math.round(value * 10) / 10))
}

type StatsFields = {
  rating?: unknown
  reviewCount?: number | null
  salesCount?: number | null
  displayRating?: unknown
  displayReviewCount?: number | null
  displaySalesCount?: number | null
  useManualStats?: boolean | null
}

export function displayedStats(product: StatsFields) {
  const rating = finiteNumber(product.rating) ?? 0
  const reviewCount = finiteNumber(product.reviewCount) ?? 0
  const salesCount = finiteNumber(product.salesCount) ?? 0
  if (!product.useManualStats) {
    return { rating, reviewCount: Math.round(reviewCount), salesCount: Math.round(salesCount) }
  }
  const displayRating = finiteNumber(product.displayRating)
  const displayReviewCount = finiteNumber(product.displayReviewCount)
  const displaySalesCount = finiteNumber(product.displaySalesCount)
  return {
    rating: displayRating == null ? rating : clampRating(displayRating),
    reviewCount: displayReviewCount == null ? Math.round(reviewCount) : Math.max(0, Math.round(displayReviewCount)),
    salesCount: displaySalesCount == null ? Math.round(salesCount) : Math.max(0, Math.round(displaySalesCount)),
  }
}

export function withDisplayedStats<T extends StatsFields>(product: T): T {
  const stats = displayedStats(product)
  const displayRating = finiteNumber(product.displayRating)
  return {
    ...product,
    rating: stats.rating,
    reviewCount: stats.reviewCount,
    salesCount: stats.salesCount,
    displayRating,
    useManualStats: Boolean(product.useManualStats),
  }
}
