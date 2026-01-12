import { Suspense } from 'react'
import { Metadata } from 'next'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { OrdersContent } from './orders-content'

export const metadata: Metadata = {
  title: 'Orders',
  description: 'View and manage orders',
}

async function getOrders() {
  return db.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      _count: {
        select: { items: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
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

export default async function AdminOrdersPage() {
  const orders = await getOrders()

  return (
    <Suspense fallback={<TableSkeleton />}>
      <OrdersContent orders={orders} />
    </Suspense>
  )
}
