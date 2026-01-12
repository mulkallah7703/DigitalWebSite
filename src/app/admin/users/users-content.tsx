'use client'

import { UsersTable } from '@/components/admin/users-table'
import type { User, UserRole } from '@prisma/client'

type UserWithCount = User & {
  _count: { orders: number }
}

interface UsersContentProps {
  users: UserWithCount[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export function UsersContent({ users, pagination }: UsersContentProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage user accounts</p>
      </div>

      <UsersTable users={users} pagination={pagination} />
    </div>
  )
}
