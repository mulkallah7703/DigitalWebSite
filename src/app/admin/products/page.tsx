import { Suspense } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductsTable } from '@/components/admin/products-table'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { AdminProductsContent } from './products-content'

async function getProducts() {
  return db.product.findMany({
    include: {
      category: true,
      images: { take: 1 },
      _count: { select: { orderItems: true } },
    },
    orderBy: { createdAt: 'desc' },
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

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <Suspense fallback={<TableSkeleton />}>
      <AdminProductsContent products={products} />
    </Suspense>
  )
}
