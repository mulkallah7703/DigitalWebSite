'use client'

import { useState } from 'react'
import { DashboardStats } from '@/components/admin/dashboard-stats'
import { RecentOrders } from '@/components/admin/recent-orders'
import { TopProducts } from '@/components/admin/top-products'
import { SalesChart } from '@/components/admin/sales-chart'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/components/providers/language-provider'
import { FileSpreadsheet, RefreshCw } from 'lucide-react'
import Link from 'next/link'

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
  const { toast } = useToast()
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      const response = await fetch('/api/admin/sync-spreadsheet', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Sync failed')
      }

      toast({
        title: t('spreadsheet.syncCompleted') || 'Sync Completed',
        description: `${data.rowsProcessed || 0} rows processed. ${data.rowsCreated || 0} created, ${data.rowsUpdated || 0} updated.`,
      })

      // Refresh the page to show updated stats
      window.location.reload()
    } catch (error) {
      toast({
        title: t('spreadsheet.syncFailedTitle') || 'Sync Failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      })
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('admin.dashboard')}</h1>
          <p className="text-muted-foreground">{t('admin.welcome')}</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleSync}
            variant="outline"
            disabled={isSyncing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? (t('spreadsheet.syncing') || 'Syncing...') : (t('spreadsheet.syncNow') || 'Sync Products from Excel')}
          </Button>
          <Button asChild variant="gradient">
            <Link href="/admin/spreadsheet">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              {t('admin.spreadsheet') || 'Spreadsheet Settings'}
            </Link>
          </Button>
        </div>
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
