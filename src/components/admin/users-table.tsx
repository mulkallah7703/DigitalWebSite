'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MoreHorizontal, Eye, Edit, Trash2, Shield, User as UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SafeImage } from '@/components/ui/safe-image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDate } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'
import { useToast } from '@/hooks/use-toast'
import { getInitials } from '@/lib/utils'
import type { User, UserRole } from '@prisma/client'

type UserWithCount = User & {
  _count: { orders: number }
}

interface UsersTableProps {
  users: UserWithCount[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const roleColors: Record<UserRole, 'default' | 'secondary' | 'success' | 'warning'> = {
  USER: 'secondary',
  ADMIN: 'success',
  SUPER_ADMIN: 'warning',
}

export function UsersTable({ users: initialUsers, pagination: initialPagination }: UsersTableProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('newest')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filteredUsers = initialUsers.filter((user) => {
    const matchesSearch =
      (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(search.toLowerCase()))

    const matchesRole = roleFilter === 'all' || user.role === roleFilter

    return matchesSearch && matchesRole
  })

  const handleViewUser = (userId: string) => {
    router.push(`/admin/users/${userId}`)
  }

  const handleDeleteUser = async (userId: string, userName: string | null, orderCount: number) => {
    if (orderCount > 0) {
      toast({
        title: t('admin.error') || 'Error',
        description: `Cannot delete user "${userName || 'Unknown'}". User has ${orderCount} order(s).`,
        variant: 'destructive',
      })
      return
    }

    if (!confirm(t('admin.confirmDelete') || `Are you sure you want to delete "${userName || 'this user'}"?`)) {
      return
    }

    setDeletingId(userId)
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete user')
      }

      toast({
        title: t('admin.userDeleted') || 'User Deleted',
        description: t('admin.userDeletedDesc') || 'User has been deleted successfully',
      })

      router.refresh()
    } catch (error) {
      toast({
        title: t('admin.error') || 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete user',
        variant: 'destructive',
      })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder={t('admin.searchUsers') || 'Search by name or email...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('admin.role') || 'Role'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('admin.allRoles') || 'All Roles'}</SelectItem>
            <SelectItem value="USER">{t('admin.user') || 'User'}</SelectItem>
            <SelectItem value="ADMIN">{t('admin.admin') || 'Admin'}</SelectItem>
            <SelectItem value="SUPER_ADMIN">{t('admin.superAdmin') || 'Super Admin'}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('admin.sortBy') || 'Sort By'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{t('admin.newest') || 'Newest'}</SelectItem>
            <SelectItem value="oldest">{t('admin.oldest') || 'Oldest'}</SelectItem>
            <SelectItem value="role">{t('admin.role') || 'Role'}</SelectItem>
            <SelectItem value="orders">{t('admin.orders') || 'Orders'}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('admin.user') || 'User'}</TableHead>
              <TableHead>{t('admin.email') || 'Email'}</TableHead>
              <TableHead>{t('admin.role') || 'Role'}</TableHead>
              <TableHead>{t('admin.orders') || 'Orders'}</TableHead>
              <TableHead>{t('admin.created') || 'Created'}</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {t('admin.noUsers') || 'No users found'}
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
                        <AvatarFallback>
                          {user.image ? (
                            <UserIcon className="w-5 h-5" />
                          ) : (
                            <span className="text-xs">{getInitials(user.name || user.email || 'U')}</span>
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name || 'N/A'}</div>
                        {user.emailVerified && (
                          <div className="text-xs text-muted-foreground">
                            {t('admin.verified') || 'Verified'}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.email || 'N/A'}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={roleColors[user.role]}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user._count.orders}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewUser(user.id)}>
                          <Eye className="w-4 h-4 mr-2" />
                          {t('admin.view') || 'View Details'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(user.id, user.name, user._count.orders)}
                          disabled={deletingId === user.id || user._count.orders > 0}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          {deletingId === user.id
                            ? (t('admin.deleting') || 'Deleting...')
                            : (t('admin.delete') || 'Delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {initialPagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((initialPagination.page - 1) * initialPagination.limit) + 1} to{' '}
            {Math.min(initialPagination.page * initialPagination.limit, initialPagination.total)} of{' '}
            {initialPagination.total} users
          </div>
        </div>
      )}
    </div>
  )
}
