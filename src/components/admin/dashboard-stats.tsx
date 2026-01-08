'use client'

import { motion } from 'framer-motion'
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'

interface DashboardStatsProps {
  stats: {
    totalRevenue: number
    totalOrders: number
    totalProducts: number
    totalUsers: number
    revenueChange: number
    ordersChange: number
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const { t } = useLanguage()
  
  const statCards = [
    {
      title: t('admin.stats.totalRevenue'),
      value: formatPrice(stats.totalRevenue),
      change: stats.revenueChange,
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: t('admin.stats.orders'),
      value: stats.totalOrders.toString(),
      change: stats.ordersChange,
      icon: ShoppingCart,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: t('admin.stats.products'),
      value: stats.totalProducts.toString(),
      icon: Package,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: t('admin.stats.users'),
      value: stats.totalUsers.toString(),
      icon: Users,
      gradient: 'from-orange-500 to-amber-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  {stat.change !== undefined && (
                    <div className="flex items-center gap-1 mt-2">
                      {stat.change >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          stat.change >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {stat.change >= 0 ? '+' : ''}
                        {stat.change.toFixed(1)}%
                      </span>
                      <span className="text-xs text-muted-foreground">{t('admin.vsLastMonth')}</span>
                    </div>
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
