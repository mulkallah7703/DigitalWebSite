'use client'

import { motion } from 'framer-motion'
import { DollarSign, ShoppingCart, Users, TrendingUp, Target, CreditCard } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'

interface AnalyticsOverviewProps {
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
}

export function AnalyticsOverview({ overview }: AnalyticsOverviewProps) {
  const { t } = useLanguage()

  const statCards = [
    {
      title: t('admin.totalRevenue') || 'Total Revenue',
      value: formatPrice(overview.totalRevenue),
      subtitle: `Today: ${formatPrice(overview.revenueToday)}`,
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: t('admin.totalOrders') || 'Total Orders',
      value: overview.totalOrders.toString(),
      subtitle: `Today: ${overview.ordersToday}`,
      icon: ShoppingCart,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: t('admin.totalCustomers') || 'Total Customers',
      value: overview.totalCustomers.toString(),
      subtitle: `${overview.activeUsers} active`,
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: t('admin.conversionRate') || 'Conversion Rate',
      value: `${overview.conversionRate.toFixed(1)}%`,
      subtitle: `${overview.totalUsers} total users`,
      icon: Target,
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      title: t('admin.averageOrderValue') || 'Average Order Value',
      value: formatPrice(overview.averageOrderValue),
      subtitle: `This month: ${formatPrice(overview.revenueThisMonth)}`,
      icon: CreditCard,
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      title: t('admin.newUsers') || 'New Users',
      value: overview.newUsersInPeriod.toString(),
      subtitle: `Active: ${overview.activeUsers}`,
      icon: TrendingUp,
      gradient: 'from-teal-500 to-cyan-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  {stat.subtitle && (
                    <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                  )}
                </div>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
