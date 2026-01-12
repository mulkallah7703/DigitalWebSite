'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Calendar, Mail, User as UserIcon, CreditCard } from 'lucide-react'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice, formatDate } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'
import { useToast } from '@/hooks/use-toast'
import type { Order, OrderItem, User, Product, ProductImage, Coupon, OrderStatus, PaymentStatus } from '@prisma/client'

type OrderWithRelations = Order & {
  user: Pick<User, 'id' | 'name' | 'email' | 'image'>
  items: (OrderItem & {
    product: Pick<Product, 'id' | 'name' | 'slug' | 'price'> & {
      images: Pick<ProductImage, 'url'>[]
    }
  })[]
  coupon: Pick<Coupon, 'id' | 'code' | 'discountType' | 'discountValue'> | null
}

interface OrderDetailsProps {
  order: OrderWithRelations
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

export function OrderDetails({ order: initialOrder }: OrderDetailsProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const [order, setOrder] = useState(initialOrder)
  const [isLoading, setIsLoading] = useState(false)
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(order.status)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(order.paymentStatus)

  const handleStatusUpdate = async () => {
    if (orderStatus === order.status && paymentStatus === order.paymentStatus) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/orders/${order.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: orderStatus,
          paymentStatus: paymentStatus,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update order')
      }

      setOrder(result.data)
      toast({
        title: t('admin.orderUpdated') || 'Order Updated',
        description: t('admin.orderUpdatedDesc') || 'Order has been updated successfully',
      })

      router.refresh()
    } catch (error) {
      toast({
        title: t('admin.error') || 'Error',
        description: error instanceof Error ? error.message : 'Failed to update order',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getValidNextStatuses = (currentStatus: OrderStatus): OrderStatus[] => {
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      PENDING: ['PROCESSING', 'CANCELLED'],
      PROCESSING: ['COMPLETED', 'CANCELLED'],
      COMPLETED: ['REFUNDED'],
      CANCELLED: [],
      REFUNDED: [],
    }
    return [currentStatus, ...(validTransitions[currentStatus] || [])]
  }

  const validStatuses = getValidNextStatuses(order.status)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/orders">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Order {order.orderNumber}</h1>
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
              <CardTitle>{t('admin.orderItems') || 'Order Items'}</CardTitle>
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
                            <div className="font-medium">{item.product.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {formatPrice(Number(item.price))} each
                            </div>
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
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.customer') || 'Customer'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                {order.user.image ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <SafeImage
                      src={order.user.image}
                      alt={order.user.name || 'Customer'}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <div className="font-medium">
                    {order.customerName || order.user.name || 'N/A'}
                  </div>
                  <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                </div>
              </div>
            </CardContent>
          </Card>

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
                  {t('admin.paymentIntent') || 'Payment Intent'}: {order.paymentIntentId}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Status Update */}
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.updateStatus') || 'Update Status'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orderStatus">{t('admin.orderStatus') || 'Order Status'}</Label>
                <Select
                  value={orderStatus}
                  onValueChange={(value) => setOrderStatus(value as OrderStatus)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="orderStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {validStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentStatus">{t('admin.paymentStatus') || 'Payment Status'}</Label>
                <Select
                  value={paymentStatus}
                  onValueChange={(value) => setPaymentStatus(value as PaymentStatus)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="paymentStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">{t('admin.pending') || 'Pending'}</SelectItem>
                    <SelectItem value="PAID">{t('admin.paid') || 'Paid'}</SelectItem>
                    <SelectItem value="FAILED">{t('admin.failed') || 'Failed'}</SelectItem>
                    <SelectItem value="REFUNDED">{t('admin.refunded') || 'Refunded'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleStatusUpdate}
                disabled={isLoading || (orderStatus === order.status && paymentStatus === order.paymentStatus)}
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
