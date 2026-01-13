'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff, Tag } from 'lucide-react'
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
import { formatDate, formatPrice } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'
import { useToast } from '@/hooks/use-toast'
import type { Coupon, DiscountType } from '@prisma/client'

type CouponWithCount = Coupon & {
  _count: { orders: number }
}

interface CouponsTableProps {
  coupons: CouponWithCount[]
}

const getCouponStatus = (coupon: CouponWithCount): 'active' | 'expired' | 'disabled' => {
  if (!coupon.active) return 'disabled'
  const now = new Date()
  if (coupon.endDate && new Date(coupon.endDate) < now) return 'expired'
  if (coupon.startDate && new Date(coupon.startDate) > now) return 'disabled'
  if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) return 'disabled'
  return 'active'
}

export function CouponsTable({ coupons }: CouponsTableProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<string>('newest')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(search.toLowerCase())
  )

  const sortedCoupons = [...filteredCoupons].sort((a, b) => {
    switch (sortBy) {
      case 'expiring':
        if (!a.endDate && !b.endDate) return 0
        if (!a.endDate) return 1
        if (!b.endDate) return -1
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      case 'usage':
        return b.usageCount - a.usageCount
      case 'value':
        return Number(b.discountValue) - Number(a.discountValue)
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const handleEdit = (couponId: string) => {
    router.push(`/admin/coupons/${couponId}/edit`)
  }

  const handleDelete = async (couponId: string, couponCode: string, usageCount: number) => {
    if (usageCount > 0) {
      toast({
        title: t('admin.error') || 'Error',
        description: `Cannot delete coupon "${couponCode}". It has been used ${usageCount} time(s).`,
        variant: 'destructive',
      })
      return
    }

    if (!confirm(t('admin.confirmDelete') || `Are you sure you want to delete "${couponCode}"?`)) {
      return
    }

    setDeletingId(couponId)
    try {
      const response = await fetch(`/api/admin/coupons/${couponId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete coupon')
      }

      toast({
        title: t('admin.couponDeleted') || 'Coupon Deleted',
        description: t('admin.couponDeletedDesc') || 'Coupon has been deleted successfully',
      })

      router.refresh()
    } catch (error) {
      toast({
        title: t('admin.error') || 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete coupon',
        variant: 'destructive',
      })
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggleActive = async (couponId: string, currentActive: boolean) => {
    setTogglingId(couponId)
    try {
      const coupon = coupons.find((c) => c.id === couponId)
      if (!coupon) return

      const response = await fetch(`/api/admin/coupons/${couponId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: coupon.code,
          description: coupon.description,
          discountType: coupon.discountType,
          discountValue: Number(coupon.discountValue),
          minPurchase: coupon.minPurchase ? Number(coupon.minPurchase) : null,
          maxDiscount: coupon.maxDiscount ? Number(coupon.maxDiscount) : null,
          usageLimit: coupon.usageLimit,
          startDate: coupon.startDate ? new Date(coupon.startDate).toISOString().split('T')[0] : null,
          endDate: coupon.endDate ? new Date(coupon.endDate).toISOString().split('T')[0] : null,
          active: !currentActive,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update coupon')
      }

      toast({
        title: currentActive
          ? (t('admin.couponDisabled') || 'Coupon Disabled')
          : (t('admin.couponEnabled') || 'Coupon Enabled'),
        description: currentActive
          ? (t('admin.couponDisabledDesc') || 'Coupon is now disabled')
          : (t('admin.couponEnabledDesc') || 'Coupon is now enabled'),
      })

      router.refresh()
    } catch (error) {
      toast({
        title: t('admin.error') || 'Error',
        description: error instanceof Error ? error.message : 'Failed to update coupon',
        variant: 'destructive',
      })
    } finally {
      setTogglingId(null)
    }
  }

  const formatDiscount = (coupon: CouponWithCount): string => {
    if (coupon.discountType === 'PERCENTAGE') {
      return `${Number(coupon.discountValue)}%`
    }
    return formatPrice(Number(coupon.discountValue))
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder={t('admin.searchCoupons') || 'Search by code...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('admin.sortBy') || 'Sort By'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{t('admin.newest') || 'Newest'}</SelectItem>
            <SelectItem value="expiring">{t('admin.expiringSoon') || 'Expiring Soon'}</SelectItem>
            <SelectItem value="usage">{t('admin.mostUsed') || 'Most Used'}</SelectItem>
            <SelectItem value="value">{t('admin.discountValue') || 'Discount Value'}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Coupons Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('admin.code') || 'Code'}</TableHead>
              <TableHead>{t('admin.discountType') || 'Type'}</TableHead>
              <TableHead>{t('admin.discountValue') || 'Value'}</TableHead>
              <TableHead>{t('admin.usage') || 'Usage'}</TableHead>
              <TableHead>{t('admin.status') || 'Status'}</TableHead>
              <TableHead>{t('admin.startDate') || 'Start Date'}</TableHead>
              <TableHead>{t('admin.endDate') || 'End Date'}</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCoupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  {t('admin.noCoupons') || 'No coupons found'}
                </TableCell>
              </TableRow>
            ) : (
              sortedCoupons.map((coupon) => {
                const status = getCouponStatus(coupon)
                return (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-muted-foreground" />
                        <code className="text-xs bg-secondary px-2 py-1 rounded font-mono font-semibold">
                          {coupon.code}
                        </code>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {coupon.discountType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{formatDiscount(coupon)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {coupon.usageCount} / {coupon.usageLimit || '∞'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          status === 'active'
                            ? 'success'
                            : status === 'expired'
                            ? 'warning'
                            : 'secondary'
                        }
                      >
                        {status === 'active'
                          ? (t('admin.active') || 'Active')
                          : status === 'expired'
                          ? (t('admin.expired') || 'Expired')
                          : (t('admin.disabled') || 'Disabled')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {coupon.startDate ? formatDate(coupon.startDate) : 'N/A'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {coupon.endDate ? formatDate(coupon.endDate) : 'N/A'}
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
                          <DropdownMenuItem onClick={() => handleEdit(coupon.id)}>
                            <Pencil className="w-4 h-4 mr-2" />
                            {t('admin.edit') || 'Edit'}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleActive(coupon.id, coupon.active)}
                            disabled={togglingId === coupon.id}
                          >
                            {coupon.active ? (
                              <>
                                <EyeOff className="w-4 h-4 mr-2" />
                                {togglingId === coupon.id
                                  ? (t('admin.disabling') || 'Disabling...')
                                  : (t('admin.disable') || 'Disable')}
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4 mr-2" />
                                {togglingId === coupon.id
                                  ? (t('admin.enabling') || 'Enabling...')
                                  : (t('admin.enable') || 'Enable')}
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(coupon.id, coupon.code, coupon._count.orders)}
                            disabled={deletingId === coupon.id || coupon._count.orders > 0}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {deletingId === coupon.id
                              ? (t('admin.deleting') || 'Deleting...')
                              : (t('admin.delete') || 'Delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
