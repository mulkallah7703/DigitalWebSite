'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Package, Download, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
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

interface Order {
  id: string
  orderNumber: string
  total: number
  status: string
  paymentStatus: string
  paymentMethod: string | null
  createdAt: Date
  items: Array<{
    id: string
    quantity: number
    product: {
      id: string
      name: string
      slug: string
      images: Array<{ url: string }>
    }
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

export function OrdersPageContent() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/account/orders')
        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }
        const result = await response.json()
        setOrders(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load orders')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-96" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center py-12">
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/account">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{t('account.myOrders')}</h1>
            <p className="text-muted-foreground mt-1">{t('account.ordersDesc')}</p>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="pt-12 pb-12">
            <div className="text-center">
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">{t('account.noOrders')}</p>
              <p className="text-sm text-muted-foreground mb-6">{t('account.noOrdersDesc')}</p>
              <Button asChild variant="gradient">
                <Link href="/products">{t('cart.browse') || 'Browse Products'}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
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
                  <TableHead>Items</TableHead>
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
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} {t('common.items') || 'items'}
                      </span>
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
                            <Link href={`/account/orders/${order.id}#downloads`}>
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
      )}
    </div>
  )
}
