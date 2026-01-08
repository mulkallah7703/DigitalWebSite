import { Suspense } from 'react'
import { Metadata } from 'next'
import { ProductsGrid } from '@/components/products/products-grid'
import { ProductsFilter } from '@/components/products/products-filter'
import { ProductsHeader } from './products-header'
import { Skeleton } from '@/components/ui/skeleton'
import { getCategoriesForFilter } from '@/lib/cache'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our collection of premium digital products',
}

// Dynamic page with search params
export const dynamic = 'force-dynamic'

interface ProductsPageProps {
  searchParams: {
    page?: string
    category?: string
    search?: string
    sortBy?: string
    minPrice?: string
    maxPrice?: string
  }
}

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="rounded-2xl border bg-card overflow-hidden">
          <Skeleton className="aspect-[4/3]" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Use cached categories for filter
  const categories = await getCategoriesForFilter()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <ProductsHeader />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <ProductsFilter categories={categories} />
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <Suspense fallback={<ProductsSkeleton />}>
            <ProductsGrid searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
