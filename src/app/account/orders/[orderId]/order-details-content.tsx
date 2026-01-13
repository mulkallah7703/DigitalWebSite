'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, Package, CreditCard, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { SafeImage } from '@/components/ui/safe-image'
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

interface OrderDetailsContentProps {
  orderId: string
}

interface OrderDetails {
  id: string
  orderNumber: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: string | null
  paymentIntentId: string | null
  subtotal: number
  discount: number
  tax: number
  total: number
  customerEmail: string
  customerName: string | null
  createdAt: Date
  updatedAt: Date
  user: {
    id: string
    name: string | null
    email: string | null
  }
  items: Array<{
    id: string
    quantity: number
    price: number
    total: number
    product: {
      id: string
      name: string
      slug: string
      price: number
      images: Array<{ url: string }>
      files: Array<{
        id: string
        name: string
        url: string
        size: number
        type: string
      }>
    }
  }>
  coupon: {
    id: string
    code: string
    discountType: string
    discountValue: number
  } | null
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

export function OrderDetailsContent({ orderId }: OrderDetailsContentProps) {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/account/orders/${orderId}`)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Order not found')
          }
          if (response.status === 403) {
            throw new Error('You do not have permission to view this order')
          }
          throw new Error('Failed to fetch order')
        }
        const result = await response.json()
        setOrder(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load order')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-96" />
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">{error || 'Order not found'}</p>
          <Button asChild variant="outline">
            <Link href="/account/orders">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const canDownload = order.paymentStatus === 'PAID' || order.paymentStatus === 'REFUNDED'
  const hasFiles = order.items.some((item) => item.product.files.length > 0)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="ghost" size="icon">
          <Link href="/account/orders">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{t('account.orderNumber')}: {order.orderNumber}</h1>
            <Badge variant={orderStatusColors[order.status]}>{order.status}</Badge>
            <Badge variant={paymentStatusColors[order.paymentStatus]}>
              {order.paymentStatus}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            {formatDate(order.createdAt)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                {t('admin.orderItems') || 'Order Items'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('admin.product') || 'Product'}</TableHead>
                    <TableHead>{t('admin.quantity') || 'Quantity'}</TableHead>
                    <TableHead className="text-right">{t('admin.price') || 'Price'}</TableHead>
                    <TableHead className="text-right">{t('admin.total') || 'Total'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {item.product.images[0] && (
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-secondary">
                              <SafeImage
                                src={item.product.images[0].url}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <Link
                              href={`/products/${item.product.slug}`}
                              className="font-medium hover:underline"
                            >
                              {item.product.name}
                            </Link>
                            {canDownload && item.product.files.length > 0 && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {item.product.files.length} {t('product.files') || 'file(s)'} available
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="text-right">
                        {formatPrice(Number(item.price))}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatPrice(Number(item.total))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Download Section */}
          {canDownload && hasFiles && (
            <Card id="downloads">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  {t('account.downloads') || 'Downloads'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item) =>
                  item.product.files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{file.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.product.name} • {(file.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <a href={file.url} download target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-2" />
                          {t('account.download')}
                        </a>
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.orderSummary') || 'Order Summary'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t('admin.subtotal') || 'Subtotal'}</span>
                <span>{formatPrice(Number(order.subtotal))}</span>
              </div>
              {Number(order.discount) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('admin.discount') || 'Discount'}</span>
                  <span className="text-green-600">-{formatPrice(Number(order.discount))}</span>
                </div>
              )}
              {order.coupon && (
                <div className="text-xs text-muted-foreground">
                  {t('admin.coupon') || 'Coupon'}: {order.coupon.code}
                </div>
              )}
              {Number(order.tax) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('admin.tax') || 'Tax'}</span>
                  <span>{formatPrice(Number(order.tax))}</span>
                </div>
              )}
              <div className="border-t pt-3 flex justify-between font-semibold">
                <span>{t('admin.total') || 'Total'}</span>
                <span>{formatPrice(Number(order.total))}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.paymentInfo') || 'Payment Information'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t('admin.paymentMethod') || 'Method'}:</span>
                <span>{order.paymentMethod || 'N/A'}</span>
              </div>
              {order.paymentIntentId && (
                <div className="text-xs text-muted-foreground">
                  {t('admin.paymentIntent') || 'Payment Intent'}: {order.paymentIntentId.substring(0, 20)}...
                </div>
              )}
            </CardContent>
          </Card>

          {/* Billing Info */}
          <Card>
            <CardHeader>
              <CardTitle>{t('account.billingInfo') || 'Billing Information'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Email:</span>
                <span className="ml-2">{order.customerEmail}</span>
              </div>
              {order.customerName && (
                <div>
                  <span className="text-muted-foreground">Name:</span>
                  <span className="ml-2">{order.customerName}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.timestamps') || 'Timestamps'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t('admin.created') || 'Created'}:</span>
                <span>{formatDate(order.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t('admin.updated') || 'Updated'}:</span>
                <span>{formatDate(order.updatedAt)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
