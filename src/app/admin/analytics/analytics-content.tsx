'use client'

import { useState, useEffect } from 'react'
import { AnalyticsOverview } from '@/components/admin/analytics-overview'
import { AnalyticsCharts } from '@/components/admin/analytics-charts'
import { AnalyticsTables } from '@/components/admin/analytics-tables'
import { AnalyticsOrders } from '@/components/admin/analytics-orders'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLanguage } from '@/components/providers/language-provider'

interface AnalyticsData {
  overview: {
    totalRevenue: number
    totalOrders: number
    totalCustomers: number
    totalUsers: number
    revenueToday: number
    revenueThisMonth: number
    ordersToday: number
    ordersThisMonth: number
    averageOrderValue: number
    conversionRate: number
    newUsersInPeriod: number
    activeUsers: number
    inactiveUsers: number
  }
  orders: {
    completed: number
    pending: number
    cancelled: number
    paid: number
    failed: number
    paymentSuccessRate: number
  }
  timeSeries: Array<{ date: string; revenue: number; orders: number }>
  bestSellingProducts: Array<{
    productId: string
    productName: string
    productSlug: string
    quantity: number
    revenue: number
    orderCount: number
  }>
  revenueByCategory: Array<{ name: string; revenue: number }>
  topCustomers: Array<{
    userId: string
    userName: string | null
    userEmail: string | null
    totalSpent: number
    orderCount: number
  }>
  mostViewedProducts: Array<{
    id: string
    name: string
    slug: string
    viewCount: number
    salesCount: number
    price: number
  }>
  zeroSalesProducts: number
  featuredProducts: Array<{
    id: string
    name: string
    slug: string
    salesCount: number
    viewCount: number
    revenue: number
  }>
  couponUsage: Array<{
    couponId: string | null
    couponCode: string
    usageCount: number
    totalDiscount: number
  }>
}

export function AnalyticsContent() {
  const { t } = useLanguage()
  const [period, setPeriod] = useState('30')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/admin/analytics?period=${period}`)
        if (!response.ok) {
          throw new Error('Failed to fetch analytics')
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [period])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">View store analytics and insights</p>
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {error || 'Failed to load analytics data'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">View store analytics and insights</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">{t('admin.last7Days') || 'Last 7 Days'}</SelectItem>
            <SelectItem value="30">{t('admin.last30Days') || 'Last 30 Days'}</SelectItem>
            <SelectItem value="90">{t('admin.last90Days') || 'Last 90 Days'}</SelectItem>
            <SelectItem value="365">{t('admin.lastYear') || 'Last Year'}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AnalyticsOverview overview={data.overview} />
      <AnalyticsCharts timeSeries={data.timeSeries} revenueByCategory={data.revenueByCategory} />
      <AnalyticsOrders
        orders={data.orders}
        couponUsage={data.couponUsage}
        zeroSalesProducts={data.zeroSalesProducts}
      />
      <AnalyticsTables
        bestSellingProducts={data.bestSellingProducts}
        topCustomers={data.topCustomers}
        mostViewedProducts={data.mostViewedProducts}
        featuredProducts={data.featuredProducts}
      />
    </div>
  )
}
