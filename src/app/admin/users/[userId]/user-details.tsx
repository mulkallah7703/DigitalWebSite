'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Calendar, Mail, Shield, ShoppingCart, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SafeImage } from '@/components/ui/safe-image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice, formatDate, getInitials } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'
import { useToast } from '@/hooks/use-toast'
import type { User, UserRole, Order, OrderStatus, PaymentStatus } from '@prisma/client'

type UserWithDetails = User & {
  _count: {
    orders: number
    reviews: number
    wishlist: number
  }
  orders: Pick<Order, 'id' | 'orderNumber' | 'total' | 'status' | 'paymentStatus' | 'createdAt'>[]
  totalSpent: number
}

interface UserDetailsProps {
  user: UserWithDetails
}

const roleColors: Record<UserRole, 'default' | 'secondary' | 'success' | 'warning'> = {
  USER: 'secondary',
  ADMIN: 'success',
  SUPER_ADMIN: 'warning',
}

const orderStatusColors: Record<OrderStatus, 'default' | 'secondary' | 'success' | 'warning' | 'destructive'> = {
  PENDING: 'secondary',
  PROCESSING: 'default',
  COMPLETED: 'success',
  CANCELLED: 'warning',
  REFUNDED: 'destructive',
}

const paymentStatusColors: Record<PaymentStatus, 'default' | 'secondary' | 'success' | 'warning' | 'destructive'> = {
  PENDING: 'secondary',
  PAID: 'success',
  FAILED: 'destructive',
  REFUNDED: 'warning',
}

export function UserDetails({ user: initialUser }: UserDetailsProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState(initialUser)
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState<UserRole>(user.role)

  const handleRoleUpdate = async () => {
    if (role === user.role) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update user')
      }

      setUser(result.data)
      toast({
        title: t('admin.userUpdated') || 'User Updated',
        description: t('admin.userUpdatedDesc') || 'User role has been updated successfully',
      })

      router.refresh()
    } catch (error) {
      toast({
        title: t('admin.error') || 'Error',
        description: error instanceof Error ? error.message : 'Failed to update user',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/users">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
              <AvatarFallback>
                <span className="text-sm">{getInitials(user.name || user.email || 'U')}</span>
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{user.name || 'N/A'}</h1>
              <p className="text-muted-foreground">{user.email || 'N/A'}</p>
            </div>
            <Badge variant={roleColors[user.role]}>{user.role}</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                {t('admin.recentOrders') || 'Recent Orders'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.orders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  {t('admin.noOrders') || 'No orders found'}
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('admin.orderNumber') || 'Order #'}</TableHead>
                      <TableHead>{t('admin.total') || 'Total'}</TableHead>
                      <TableHead>{t('admin.status') || 'Status'}</TableHead>
                      <TableHead>{t('admin.paymentStatus') || 'Payment'}</TableHead>
                      <TableHead>{t('admin.date') || 'Date'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <code className="text-xs bg-secondary px-2 py-1 rounded font-mono">
                            {order.orderNumber}
                          </code>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {formatPrice(Number(order.total))}
                        </TableCell>
                        <TableCell>
                          <Badge variant={orderStatusColors[order.status]}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={paymentStatusColors[order.paymentStatus]}>
                            {order.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(order.createdAt)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Info */}
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.userInfo') || 'User Information'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t('admin.email') || 'Email'}:</span>
                <span>{user.email || 'N/A'}</span>
              </div>
              {user.emailVerified && (
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="success" className="text-xs">
                    {t('admin.emailVerified') || 'Email Verified'}
                  </Badge>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t('admin.memberSince') || 'Member Since'}:</span>
                <span>{formatDate(user.createdAt)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.statistics') || 'Statistics'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t('admin.totalOrders') || 'Total Orders'}:</span>
                </div>
                <span className="font-semibold">{user._count.orders}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{t('admin.totalSpent') || 'Total Spent'}:</span>
                </div>
                <span className="font-semibold">{formatPrice(user.totalSpent)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t('admin.reviews') || 'Reviews'}:</span>
                </div>
                <span className="font-semibold">{user._count.reviews}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t('admin.wishlist') || 'Wishlist'}:</span>
                </div>
                <span className="font-semibold">{user._count.wishlist}</span>
              </div>
            </CardContent>
          </Card>

          {/* Role Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t('admin.roleManagement') || 'Role Management'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">{t('admin.role') || 'Role'}</Label>
                <Select
                  value={role}
                  onValueChange={(value) => setRole(value as UserRole)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">{t('admin.user') || 'User'}</SelectItem>
                    <SelectItem value="ADMIN">{t('admin.admin') || 'Admin'}</SelectItem>
                    <SelectItem value="SUPER_ADMIN">{t('admin.superAdmin') || 'Super Admin'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleRoleUpdate}
                disabled={isLoading || role === user.role}
                className="w-full"
                variant="gradient"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading
                  ? (t('admin.saving') || 'Saving...')
                  : (t('admin.saveChanges') || 'Save Changes')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
