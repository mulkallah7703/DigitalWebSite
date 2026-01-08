import { Suspense } from 'react'
import { DashboardStats } from '@/components/admin/dashboard-stats'
import { RecentOrders } from '@/components/admin/recent-orders'
import { TopProducts } from '@/components/admin/top-products'
import { SalesChart } from '@/components/admin/sales-chart'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { AdminDashboardContent } from './dashboard-content'

async function getStats() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

  const [
    totalRevenue,
    lastMonthRevenue,
    totalOrders,
    lastMonthOrders,
    totalProducts,
    totalUsers,
    recentOrders,
    topProducts,
  ] = await Promise.all([
    db.order.aggregate({
      where: { paymentStatus: 'PAID', createdAt: { gte: startOfMonth } },
      _sum: { total: true },
    }),
    db.order.aggregate({
      where: {
        paymentStatus: 'PAID',
        createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
      },
      _sum: { total: true },
    }),
    db.order.count({ where: { createdAt: { gte: startOfMonth } } }),
    db.order.count({
      where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
    }),
    db.product.count({ where: { status: 'PUBLISHED' } }),
    db.user.count(),
    db.order.findMany({
      include: {
        user: true,
        items: { include: { product: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    db.product.findMany({
      include: {
        category: true,
        images: { take: 1 },
      },
      orderBy: { salesCount: 'desc' },
      take: 5,
    }),
  ])

  const currentRevenue = Number(totalRevenue._sum.total || 0)
  const previousRevenue = Number(lastMonthRevenue._sum.total || 0)
  const revenueChange = previousRevenue > 0
    ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
    : 0

  const ordersChange = lastMonthOrders > 0
    ? ((totalOrders - lastMonthOrders) / lastMonthOrders) * 100
    : 0

  return {
    totalRevenue: currentRevenue,
    totalOrders,
    totalProducts,
    totalUsers,
    revenueChange,
    ordersChange,
    recentOrders,
    topProducts,
  }
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-32 rounded-xl" />
      ))}
    </div>
  )
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <Suspense fallback={<StatsSkeleton />}>
      <AdminDashboardContent stats={stats} />
    </Suspense>
  )
}
