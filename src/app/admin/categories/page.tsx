import { Suspense } from 'react'
import { Metadata } from 'next'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { CategoriesContent } from './categories-content'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Manage product categories',
}

async function getCategories() {
  return db.category.findMany({
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
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  )
}

export default async function AdminCategoriesPage() {
  const categories = await getCategories()

  return (
    <Suspense fallback={<TableSkeleton />}>
      <CategoriesContent categories={categories} />
    </Suspense>
  )
}
