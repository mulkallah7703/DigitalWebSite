'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState, useCallback } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { debounce } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'

// Minimal category type for filter
interface FilterCategory {
  id: string
  name: string
  slug: string
}

interface ProductsFilterProps {
  categories: FilterCategory[]
}

export function ProductsFilter({ categories }: ProductsFilterProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sortOptions = [
    { value: 'newest', label: t('filter.newest') },
    { value: 'popular', label: t('filter.mostPopular') },
    { value: 'rating', label: t('filter.highestRated') },
    { value: 'price-asc', label: t('filter.priceLowHigh') },
    { value: 'price-desc', label: t('filter.priceHighLow') },
  ]

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString())
      
      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === '') {
          newParams.delete(key)
        } else {
          newParams.set(key, value)
        }
      })

      // Reset to page 1 when filters change
      if (!params.page) {
        newParams.delete('page')
      }

      return newParams.toString()
    },
    [searchParams]
  )

  const updateFilter = (key: string, value: string | null) => {
    router.push(`${pathname}?${createQueryString({ [key]: value })}`)
  }

  const debouncedSearch = debounce((value: string) => {
    updateFilter('search', value || null)
  }, 500)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    debouncedSearch(value)
  }

  const applyPriceFilter = () => {
    router.push(
      `${pathname}?${createQueryString({
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
      })}`
    )
  }

  const clearFilters = () => {
    setSearch('')
    setMinPrice('')
    setMaxPrice('')
    router.push(pathname)
  }

  const hasActiveFilters =
    searchParams.get('search') ||
    searchParams.get('category') ||
    searchParams.get('minPrice') ||
    searchParams.get('maxPrice') ||
    searchParams.get('sortBy')

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Input
          placeholder={t('common.search')}
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          icon={<Search className="w-4 h-4" />}
        />
      </div>

      {/* Sort */}
      <div>
        <Label className="text-sm font-medium mb-2 block">{t('filter.sortBy')}</Label>
        <Select
          value={searchParams.get('sortBy') || 'newest'}
          onValueChange={(value) => updateFilter('sortBy', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Filters Accordion */}
      <Accordion type="multiple" defaultValue={['categories', 'price']} className="w-full">
        {/* Categories */}
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-medium">{t('filter.categories')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Button
                variant={!searchParams.get('category') ? 'secondary' : 'ghost'}
                size="sm"
                className="w-full justify-start"
                onClick={() => updateFilter('category', null)}
              >
                {t('filter.allCategories')}
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={searchParams.get('category') === category.slug ? 'secondary' : 'ghost'}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => updateFilter('category', category.slug)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">{t('filter.priceRange')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">{t('filter.min')}</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">{t('filter.max')}</Label>
                  <Input
                    type="number"
                    placeholder="999"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
              <Button size="sm" className="w-full" onClick={applyPriceFilter}>
                {t('filter.apply')}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <>
          <Separator />
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={clearFilters}
          >
            <X className="w-4 h-4 mr-2" />
            {t('filter.clearFilters')}
          </Button>
        </>
      )}
    </div>
  )
}
