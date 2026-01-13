'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AccountProfile } from './_components/account-profile'
import { AccountSecurity } from './_components/account-security'
import { AccountOrders } from './_components/account-orders'
import { AccountPreferences } from './_components/account-preferences'
import { useLanguage } from '@/components/providers/language-provider'

interface AccountData {
  user: {
    id: string
    name: string | null
    email: string | null
    image: string | null
    createdAt: Date
    updatedAt: Date
  }
  orders: Array<{
    id: string
    orderNumber: string
    total: number
    status: string
    paymentStatus: string
    createdAt: Date
    items: Array<{
      product: {
        id: string
        name: string
        slug: string
        images: Array<{ url: string }>
      }
    }>
  }>
  preferences: {
    language: string
    emailNotifications: boolean
    marketing: boolean
  }
}

export function AccountContent() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<AccountData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && ['profile', 'security', 'orders', 'preferences'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  useEffect(() => {
    const fetchAccount = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/account')
        if (!response.ok) {
          throw new Error('Failed to fetch account data')
        }
        const result = await response.json()
        setData(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load account')
      } finally {
        setLoading(false)
      }
    }

    fetchAccount()
  }, [])

  const handleUpdate = async () => {
    // Refetch account data after update
    try {
      const response = await fetch('/api/account')
      if (response.ok) {
        const result = await response.json()
        setData(result.data)
      }
    } catch (err) {
      console.error('Failed to refresh account data:', err)
    }
  }

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

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center py-12">
          <p className="text-muted-foreground">{error || 'Failed to load account'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t('account.title')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('account.profileDesc')}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">{t('account.profile')}</TabsTrigger>
          <TabsTrigger value="security">{t('account.security')}</TabsTrigger>
          <TabsTrigger value="orders">{t('account.orders')}</TabsTrigger>
          <TabsTrigger value="preferences">{t('account.preferences')}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <AccountProfile user={data.user} preferences={data.preferences} onUpdate={handleUpdate} />
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <AccountSecurity />
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <AccountOrders orders={data.orders} />
        </TabsContent>

        <TabsContent value="preferences" className="mt-6">
          <AccountPreferences preferences={data.preferences} onUpdate={handleUpdate} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
