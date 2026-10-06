'use client'

import { useMemo, useState } from 'react'
import { Package } from 'lucide-react'
import { SafeImage } from '@/components/ui/safe-image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StarPicker, StarRating } from '@/components/products/star-rating'
import { useLanguage } from '@/components/providers/language-provider'
import { useToast } from '@/hooks/use-toast'
import { clampRating, displayedStats } from '@/lib/display-stats'

export type EngagementProduct = {
  id: string
  name: string
  slug: string
  imageUrl: string | null
  imageAlt: string
  rating: number
  reviewCount: number
  salesCount: number
  displayRating: number | null
  displayReviewCount: number | null
  displaySalesCount: number | null
  useManualStats: boolean
}

type Draft = {
  useManualStats: boolean
  displayRating: string
  displayReviewCount: string
  displaySalesCount: string
}

function draftFrom(product: EngagementProduct): Draft {
  return {
    useManualStats: product.useManualStats,
    displayRating: (product.displayRating ?? product.rating).toFixed(1),
    displayReviewCount: String(product.displayReviewCount ?? product.reviewCount),
    displaySalesCount: String(product.displaySalesCount ?? product.salesCount),
  }
}

function parseOptionalInt(value: string) {
  if (value.trim() === '') return null
  const n = Number(value)
  if (!Number.isInteger(n) || n < 0) return undefined
  return n
}

export function EngagementEditor({ products }: { products: EngagementProduct[] }) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [query, setQuery] = useState('')
  const [rows, setRows] = useState<Record<string, Draft>>(() =>
    Object.fromEntries(products.map((product) => [product.id, draftFrom(product)])),
  )
  const [savingId, setSavingId] = useState<string | null>(null)

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return products
    return products.filter((product) => product.name.toLowerCase().includes(needle) || product.slug.toLowerCase().includes(needle))
  }, [products, query])

  const update = (id: string, patch: Partial<Draft>) => {
    setRows((current) => ({ ...current, [id]: { ...current[id], ...patch } }))
  }

  const save = async (product: EngagementProduct) => {
    const draft = rows[product.id]
    const ratingNumber = draft.displayRating.trim() === '' ? null : Number(draft.displayRating)
    const reviewCount = parseOptionalInt(draft.displayReviewCount)
    const salesCount = parseOptionalInt(draft.displaySalesCount)
    if (ratingNumber != null && (!Number.isFinite(ratingNumber) || ratingNumber < 0 || ratingNumber > 5)) {
      toast({ title: t('admin.error'), description: t('admin.engagementRatingInvalid'), variant: 'destructive' })
      return
    }
    if (reviewCount === undefined || salesCount === undefined) {
      toast({ title: t('admin.error'), description: t('admin.engagementCountInvalid'), variant: 'destructive' })
      return
    }

    setSavingId(product.id)
    try {
      const response = await fetch('/api/admin/engagement', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          useManualStats: draft.useManualStats,
          displayRating: ratingNumber == null ? null : clampRating(ratingNumber),
          displayReviewCount: reviewCount,
          displaySalesCount: salesCount,
        }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Save failed')
      const saved = result.data as EngagementProduct
      setRows((current) => ({ ...current, [product.id]: draftFrom(saved) }))
      toast({ title: t('admin.engagementSaved'), description: t('admin.engagementSavedDesc') })
    } catch (error) {
      toast({
        title: t('admin.error'),
        description: error instanceof Error ? error.message : t('admin.engagementSaveFailed'),
        variant: 'destructive',
      })
    } finally {
      setSavingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('admin.engagement')}</h1>
        <p className="text-muted-foreground mt-1">{t('admin.engagementDesc')}</p>
      </div>

      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t('admin.engagementSearch')}
        className="max-w-sm"
      />

      {visible.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t('admin.engagementEmpty')}</p>
      ) : (
        <div className="space-y-4">
          {visible.map((product) => {
            const draft = rows[product.id] || draftFrom(product)
            const ratingValue = draft.displayRating.trim() === '' ? 0 : Number(draft.displayRating)
            const preview = displayedStats({
              rating: product.rating,
              reviewCount: product.reviewCount,
              salesCount: product.salesCount,
              useManualStats: draft.useManualStats,
              displayRating: Number.isFinite(ratingValue) ? ratingValue : null,
              displayReviewCount: parseOptionalInt(draft.displayReviewCount) ?? null,
              displaySalesCount: parseOptionalInt(draft.displaySalesCount) ?? null,
            })
            return (
              <div key={product.id} className="rounded-xl border bg-card p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="flex min-w-0 items-center gap-3 lg:w-64">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                      {product.imageUrl ? (
                        <SafeImage src={product.imageUrl} alt={product.imageAlt} fill className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t('admin.engagementReal')}: {product.rating.toFixed(1)} · {product.reviewCount} · {product.salesCount}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">{t('admin.engagementRating')}</p>
                      <div className="flex items-center gap-2">
                        <StarPicker
                          value={Number.isFinite(ratingValue) ? ratingValue : 0}
                          onChange={(next) => update(product.id, { displayRating: next.toFixed(1), useManualStats: true })}
                        />
                        <Input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={draft.displayRating}
                          onChange={(event) => update(product.id, { displayRating: event.target.value, useManualStats: true })}
                          className="h-9 w-20"
                          aria-label={t('admin.engagementRating')}
                        />
                      </div>
                    </div>
                    <label className="space-y-1 text-xs text-muted-foreground">
                      {t('admin.engagementReviews')}
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        value={draft.displayReviewCount}
                        onChange={(event) => update(product.id, { displayReviewCount: event.target.value, useManualStats: true })}
                        className="h-9 w-24"
                      />
                    </label>
                    <label className="space-y-1 text-xs text-muted-foreground">
                      {t('admin.engagementSales')}
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        value={draft.displaySalesCount}
                        onChange={(event) => update(product.id, { displaySalesCount: event.target.value, useManualStats: true })}
                        className="h-9 w-24"
                      />
                    </label>
                    <label className="flex items-center gap-2 text-sm pb-2">
                      <input
                        type="checkbox"
                        checked={draft.useManualStats}
                        onChange={(event) => update(product.id, { useManualStats: event.target.checked })}
                        className="h-4 w-4 rounded border-input"
                      />
                      {t('admin.engagementUseManual')}
                    </label>
                  </div>

                  <div className="flex items-center justify-between gap-4 lg:w-64">
                    <div className="text-sm">
                      <div className="flex items-center gap-2">
                        <StarRating value={preview.rating} size="sm" />
                        <span className="font-medium">{preview.rating.toFixed(1)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        ({preview.reviewCount} {t('common.reviews')}) | {preview.salesCount} {t('common.sales')}
                      </p>
                    </div>
                    <Button type="button" onClick={() => save(product)} loading={savingId === product.id}>
                      {t('admin.engagementSave')}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
