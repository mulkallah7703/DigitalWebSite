'use client'

import { DashboardStats } from '@/components/admin/dashboard-stats'
import { RecentOrders } from '@/components/admin/recent-orders'
import { TopProducts } from '@/components/admin/top-products'
import { SalesChart } from '@/components/admin/sales-chart'
import { useLanguage } from '@/components/providers/language-provider'

interface AdminDashboardContentProps {
  stats: {
    totalRevenue: number
    totalOrders: number
    totalProducts: number
    totalUsers: number
    revenueChange: number
    ordersChange: number
    recentOrders: any[]
    topProducts: any[]
  }
}

export function AdminDashboardContent({ stats }: AdminDashboardContentProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('admin.dashboard')}</h1>
        <p className="text-muted-foreground">{t('admin.welcome')}</p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <TopProducts products={stats.topProducts} />
      </div>

      <RecentOrders orders={stats.recentOrders} />
    </div>
  )
}
