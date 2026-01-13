'use client'

import { useState, useEffect } from 'react'
import { SettingsForm } from '@/components/admin/settings-form'
import { Skeleton } from '@/components/ui/skeleton'

interface SettingsData {
  storeName: string
  storeLogo: string
  storeFavicon: string
  storeDescription: string
  defaultLanguage: string
  defaultCurrency: string
  timezone: string
  storeStatus: string
  maintenanceMessage: string
  hidePrices: boolean
  hideOutOfStock: boolean
  defaultMetaTitle: string
  defaultMetaDescription: string
  openGraphImage: string
  allowIndexing: boolean
  canonicalUrl: string
  adminEmail: string
  allowUserRegistration: boolean
  defaultUserRole: string
  sessionTimeout: number
  adminNotifications: boolean
  checkoutEnabled: boolean
  taxRate: number
  currencyFormat: string
  orderPrefix: string
  refundPolicyText: string
  maxUploadSize: number
  allowedFileTypes: string[]
  imageCompression: boolean
  videoUploadEnabled: boolean
  googleAnalyticsId: string
  facebookPixelId: string
  trackingEnabled: boolean
  consentMode: boolean
  smtpHost: string
  smtpPort: number
  smtpUser: string
  smtpPassword: string
  smtpSecure: boolean
  fromEmail: string
  orderNotifications: boolean
  adminAlerts: boolean
  userEmailTemplates: boolean
  cacheEnabled: boolean
  revalidationInterval: number
  apiRateLimit: number
  featureFlags: Record<string, boolean>
}

export function SettingsContent() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<SettingsData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/admin/settings')
        if (!response.ok) {
          throw new Error('Failed to fetch settings')
        }
        const result = await response.json()
        setData(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load settings')
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage admin and store settings</p>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {error || 'Failed to load settings'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage admin and store settings</p>
      </div>

      <SettingsForm initialData={data} />
    </div>
  )
}
