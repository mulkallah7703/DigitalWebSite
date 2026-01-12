'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MoreHorizontal, Eye, Calendar } from 'lucide-react'
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
import { formatPrice, formatDate } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'
import type { Order, OrderItem, User, Product, PaymentStatus, OrderStatus } from '@prisma/client'

type OrderWithRelations = Order & {
  user: Pick<User, 'id' | 'name' | 'email'>
  items: (OrderItem & {
    product: Pick<Product, 'id' | 'name' | 'slug'>
  })[]
  _count: { items: number }
}

interface OrdersTableProps {
  orders: OrderWithRelations[]
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

export function OrdersTable({ orders }: OrdersTableProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('all')

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      (order.customerName && order.customerName.toLowerCase().includes(search.toLowerCase()))

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesPaymentStatus =
      paymentStatusFilter === 'all' || order.paymentStatus === paymentStatusFilter

    return matchesSearch && matchesStatus && matchesPaymentStatus
  })

  const handleViewOrder = (orderId: string) => {
    router.push(`/admin/orders/${orderId}`)
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder={t('admin.searchOrders') || 'Search by order ID, email, or name...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('admin.orderStatus') || 'Order Status'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('admin.allStatuses') || 'All Statuses'}</SelectItem>
            <SelectItem value="PENDING">{t('admin.pending') || 'Pending'}</SelectItem>
            <SelectItem value="PROCESSING">{t('admin.processing') || 'Processing'}</SelectItem>
            <SelectItem value="COMPLETED">{t('admin.completed') || 'Completed'}</SelectItem>
            <SelectItem value="CANCELLED">{t('admin.cancelled') || 'Cancelled'}</SelectItem>
            <SelectItem value="REFUNDED">{t('admin.refunded') || 'Refunded'}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('admin.paymentStatus') || 'Payment Status'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('admin.allPayments') || 'All Payments'}</SelectItem>
            <SelectItem value="PENDING">{t('admin.pending') || 'Pending'}</SelectItem>
            <SelectItem value="PAID">{t('admin.paid') || 'Paid'}</SelectItem>
            <SelectItem value="FAILED">{t('admin.failed') || 'Failed'}</SelectItem>
            <SelectItem value="REFUNDED">{t('admin.refunded') || 'Refunded'}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('admin.orderNumber') || 'Order #'}</TableHead>
              <TableHead>{t('admin.customer') || 'Customer'}</TableHead>
              <TableHead>{t('admin.items') || 'Items'}</TableHead>
              <TableHead>{t('admin.total') || 'Total'}</TableHead>
              <TableHead>{t('admin.orderStatus') || 'Order Status'}</TableHead>
              <TableHead>{t('admin.paymentStatus') || 'Payment Status'}</TableHead>
              <TableHead>{t('admin.date') || 'Date'}</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  {t('admin.noOrders') || 'No orders found'}
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <code className="text-xs bg-secondary px-2 py-1 rounded font-mono">
                      {order.orderNumber}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {order.customerName || order.user.name || 'N/A'}
                      </div>
                      <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{order._count.items}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{formatPrice(Number(order.total))}</span>
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
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewOrder(order.id)}>
                          <Eye className="w-4 h-4 mr-2" />
                          {t('admin.view') || 'View Details'}
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
    </div>
  )
}
