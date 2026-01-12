import { Suspense } from 'react'
import { Metadata } from 'next'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { UsersContent } from './users-content'

export const metadata: Metadata = {
  title: 'Users',
  description: 'Manage users',
}

async function getUsers() {
  return db.user.findMany({
    include: {
      _count: {
        select: { orders: true },
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

export default async function AdminUsersPage() {
  const users = await getUsers()
  const total = await db.user.count()

  return (
    <Suspense fallback={<TableSkeleton />}>
      <UsersContent
        users={users}
        pagination={{
          page: 1,
          limit: 100,
          total,
          totalPages: Math.ceil(total / 100),
        }}
      />
    </Suspense>
  )
}
