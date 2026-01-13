'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/components/providers/language-provider'
import { ShoppingCart, CheckCircle, Clock, XCircle, CreditCard, AlertCircle } from 'lucide-react'

interface AnalyticsOrdersProps {
  orders: {
    completed: number
    pending: number
    cancelled: number
    paid: number
    failed: number
    paymentSuccessRate: number
  }
  couponUsage: Array<{
    couponId: string | null
    couponCode: string
    usageCount: number
    totalDiscount: number
  }>
  zeroSalesProducts: number
}

export function AnalyticsOrders({ orders, couponUsage, zeroSalesProducts }: AnalyticsOrdersProps) {
  const { t } = useLanguage()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Order Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            {t('admin.orderStatus') || 'Order Status'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">{t('admin.completed') || 'Completed'}</span>
            </div>
            <Badge variant="success">{orders.completed}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">{t('admin.pending') || 'Pending'}</span>
            </div>
            <Badge variant="secondary">{orders.pending}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm">{t('admin.cancelled') || 'Cancelled'}</span>
            </div>
            <Badge variant="warning">{orders.cancelled}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Payment Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            {t('admin.paymentStatus') || 'Payment Status'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">{t('admin.paid') || 'Paid'}</span>
            <Badge variant="success">{orders.paid}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">{t('admin.failed') || 'Failed'}</span>
            <Badge variant="destructive">{orders.failed}</Badge>
          </div>
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('admin.successRate') || 'Success Rate'}</span>
              <span className="text-lg font-semibold">{orders.paymentSuccessRate.toFixed(1)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {t('admin.additionalMetrics') || 'Additional Metrics'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">{t('admin.couponsUsed') || 'Coupons Used'}</span>
            <Badge variant="secondary">{couponUsage.length}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">{t('admin.zeroSalesProducts') || 'Zero Sales Products'}</span>
            <Badge variant="warning">{zeroSalesProducts}</Badge>
          </div>
          {couponUsage.length > 0 && (
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground mb-2">{t('admin.topCoupon') || 'Top Coupon'}</p>
              <div className="flex items-center justify-between">
                <code className="text-xs bg-secondary px-2 py-1 rounded">
                  {couponUsage[0]?.couponCode || 'N/A'}
                </code>
                <span className="text-xs text-muted-foreground">
                  {couponUsage[0]?.usageCount || 0} {t('admin.uses') || 'uses'}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
