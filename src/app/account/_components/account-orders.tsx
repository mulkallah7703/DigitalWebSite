'use client'

import Link from 'next/link'
import { Package, Download, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatPrice, formatDate } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'
import type { OrderStatus, PaymentStatus } from '@prisma/client'

interface AccountOrdersProps {
  orders: Array<{
    id: string
    orderNumber: string
    total: number
    status: string
    paymentStatus: string
    createdAt: Date
    items: Array<{
      product: {
        id: string
        name: string
        slug: string
        images: Array<{ url: string }>
      }
    }>
  }>
}

const orderStatusColors: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'destructive'> = {
  PENDING: 'secondary',
  PROCESSING: 'default',
  COMPLETED: 'success',
  CANCELLED: 'warning',
  REFUNDED: 'destructive',
}

const paymentStatusColors: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'destructive'> = {
  PENDING: 'secondary',
  PAID: 'success',
  FAILED: 'destructive',
  REFUNDED: 'warning',
}

export function AccountOrders({ orders }: AccountOrdersProps) {
  const { t } = useLanguage()

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            {t('account.myOrders')}
          </CardTitle>
          <CardDescription>{t('account.ordersDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">{t('account.noOrders')}</p>
            <p className="text-sm text-muted-foreground">{t('account.noOrdersDesc')}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          {t('account.myOrders')}
        </CardTitle>
        <CardDescription>{t('account.ordersDesc')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('account.orderNumber')}</TableHead>
              <TableHead>{t('account.orderDate')}</TableHead>
              <TableHead>{t('account.orderTotal')}</TableHead>
              <TableHead>{t('account.orderStatus')}</TableHead>
              <TableHead>{t('account.paymentStatus')}</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <code className="text-xs bg-secondary px-2 py-1 rounded font-mono">
                    {order.orderNumber}
                  </code>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </span>
                </TableCell>
                <TableCell className="font-semibold">
                  {formatPrice(Number(order.total))}
                </TableCell>
                <TableCell>
                  <Badge variant={orderStatusColors[order.status] || 'default'}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={paymentStatusColors[order.paymentStatus] || 'default'}>
                    {order.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/account/orders/${order.id}`}>
                        <Eye className="w-4 h-4 mr-1" />
                        {t('account.viewOrder')}
                      </Link>
                    </Button>
                    {order.paymentStatus === 'PAID' && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/account/orders/${order.id}/download`}>
                          <Download className="w-4 h-4 mr-1" />
                          {t('account.download')}
                        </Link>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
