import { Suspense } from 'react'
import { Metadata } from 'next'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { CouponsContent } from './coupons-content'

export const metadata: Metadata = {
  title: 'Coupons',
  description: 'Manage discount coupons',
}

async function getCoupons() {
  return db.coupon.findMany({
    include: {
      _count: {
        select: { orders: true },
      },
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

export default async function AdminCouponsPage() {
  const coupons = await getCoupons()

  return (
    <Suspense fallback={<TableSkeleton />}>
      <CouponsContent coupons={coupons} />
    </Suspense>
  )
}
