'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Save,
  Store,
  Shield,
  Search,
  ShoppingCart,
  Image as ImageIcon,
  BarChart3,
  Mail,
  Settings as SettingsIcon,
  Eye,
  EyeOff,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SafeImage } from '@/components/ui/safe-image'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/components/providers/language-provider'

const settingsSchema = z.object({
  // 1. Store Identity
  storeName: z.string().min(1, 'Store name is required'),
  storeLogo: z.string().optional(),
  storeFavicon: z.string().optional(),
  storeDescription: z.string().optional(),
  defaultLanguage: z.string().min(1),
  defaultCurrency: z.string().min(1),
  timezone: z.string().min(1),

  // 2. Store Visibility
  storeStatus: z.enum(['active', 'maintenance']),
  maintenanceMessage: z.string().optional(),
  hidePrices: z.boolean(),
  hideOutOfStock: z.boolean(),

  // 3. SEO
  defaultMetaTitle: z.string().optional(),
  defaultMetaDescription: z.string().optional(),
  openGraphImage: z.string().optional(),
  allowIndexing: z.boolean(),
  canonicalUrl: z.string().optional(),

  // 4. Admin & Access
  adminEmail: z.string().email().optional().or(z.literal('')),
  allowUserRegistration: z.boolean(),
  defaultUserRole: z.enum(['USER', 'ADMIN', 'SUPER_ADMIN']),
  sessionTimeout: z.string().refine((val) => {
    const num = parseInt(val)
    return !isNaN(num) && num > 0
  }),
  adminNotifications: z.boolean(),

  // 5. Payments & Orders
  checkoutEnabled: z.boolean(),
  taxRate: z.string().refine((val) => {
    const num = parseFloat(val)
    return !isNaN(num) && num >= 0 && num <= 100
  }),
  currencyFormat: z.enum(['symbol', 'code', 'name']),
  orderPrefix: z.string().optional(),
  refundPolicyText: z.string().optional(),

  // 6. Media & Uploads
  maxUploadSize: z.string().refine((val) => {
    const num = parseInt(val)
    return !isNaN(num) && num > 0
  }),
  allowedFileTypes: z.string().optional(), // Comma-separated
  imageCompression: z.boolean(),
  videoUploadEnabled: z.boolean(),

  // 7. Analytics
  googleAnalyticsId: z.string().optional(),
  facebookPixelId: z.string().optional(),
  trackingEnabled: z.boolean(),
  consentMode: z.boolean(),

  // 8. Email
  smtpHost: z.string().optional(),
  smtpPort: z.string().refine((val) => {
    if (!val) return true
    const num = parseInt(val)
    return !isNaN(num) && num >= 1 && num <= 65535
  }).optional(),
  smtpUser: z.string().optional(),
  smtpPassword: z.string().optional(),
  smtpSecure: z.boolean(),
  fromEmail: z.string().email().optional().or(z.literal('')),
  orderNotifications: z.boolean(),
  adminAlerts: z.boolean(),
  userEmailTemplates: z.boolean(),

  // 9. Advanced
  cacheEnabled: z.boolean(),
  revalidationInterval: z.string().refine((val) => {
    const num = parseInt(val)
    return !isNaN(num) && num > 0
  }),
  apiRateLimit: z.string().refine((val) => {
    const num = parseInt(val)
    return !isNaN(num) && num > 0
  }),
})

type SettingsForm = z.infer<typeof settingsSchema>

interface SettingsFormProps {
  initialData: {
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
}

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'AED', 'SAR', 'EGP']
const languages = ['en', 'ar', 'fr', 'es', 'de', 'it', 'pt', 'ru', 'zh', 'ja']
const timezones = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Dubai',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Australia/Sydney',
]

export function SettingsForm({ initialData }: SettingsFormProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [uploadingFavicon, setUploadingFavicon] = useState(false)
  const [uploadingOG, setUploadingOG] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      storeName: initialData.storeName,
      storeLogo: initialData.storeLogo,
      storeFavicon: initialData.storeFavicon,
      storeDescription: initialData.storeDescription,
      defaultLanguage: initialData.defaultLanguage,
      defaultCurrency: initialData.defaultCurrency,
      timezone: initialData.timezone,
      storeStatus: initialData.storeStatus as 'active' | 'maintenance',
      maintenanceMessage: initialData.maintenanceMessage,
      hidePrices: initialData.hidePrices,
      hideOutOfStock: initialData.hideOutOfStock,
      defaultMetaTitle: initialData.defaultMetaTitle,
      defaultMetaDescription: initialData.defaultMetaDescription,
      openGraphImage: initialData.openGraphImage,
      allowIndexing: initialData.allowIndexing,
      canonicalUrl: initialData.canonicalUrl,
      adminEmail: initialData.adminEmail,
      allowUserRegistration: initialData.allowUserRegistration,
      defaultUserRole: initialData.defaultUserRole as 'USER' | 'ADMIN' | 'SUPER_ADMIN',
      sessionTimeout: initialData.sessionTimeout.toString(),
      adminNotifications: initialData.adminNotifications,
      checkoutEnabled: initialData.checkoutEnabled,
      taxRate: initialData.taxRate.toString(),
      currencyFormat: initialData.currencyFormat as 'symbol' | 'code' | 'name',
      orderPrefix: initialData.orderPrefix,
      refundPolicyText: initialData.refundPolicyText,
      maxUploadSize: (initialData.maxUploadSize / 1024 / 1024).toString(), // Convert to MB
      allowedFileTypes: initialData.allowedFileTypes.join(', '),
      imageCompression: initialData.imageCompression,
      videoUploadEnabled: initialData.videoUploadEnabled,
      googleAnalyticsId: initialData.googleAnalyticsId,
      facebookPixelId: initialData.facebookPixelId,
      trackingEnabled: initialData.trackingEnabled,
      consentMode: initialData.consentMode,
      smtpHost: initialData.smtpHost,
      smtpPort: initialData.smtpPort.toString(),
      smtpUser: initialData.smtpUser,
      smtpPassword: initialData.smtpPassword,
      smtpSecure: initialData.smtpSecure,
      fromEmail: initialData.fromEmail,
      orderNotifications: initialData.orderNotifications,
      adminAlerts: initialData.adminAlerts,
      userEmailTemplates: initialData.userEmailTemplates,
      cacheEnabled: initialData.cacheEnabled,
      revalidationInterval: initialData.revalidationInterval.toString(),
      apiRateLimit: initialData.apiRateLimit.toString(),
    },
  })

  useEffect(() => {
    reset({
      storeName: initialData.storeName,
      storeLogo: initialData.storeLogo,
      storeFavicon: initialData.storeFavicon,
      storeDescription: initialData.storeDescription,
      defaultLanguage: initialData.defaultLanguage,
      defaultCurrency: initialData.defaultCurrency,
      timezone: initialData.timezone,
      storeStatus: initialData.storeStatus as 'active' | 'maintenance',
      maintenanceMessage: initialData.maintenanceMessage,
      hidePrices: initialData.hidePrices,
      hideOutOfStock: initialData.hideOutOfStock,
      defaultMetaTitle: initialData.defaultMetaTitle,
      defaultMetaDescription: initialData.defaultMetaDescription,
      openGraphImage: initialData.openGraphImage,
      allowIndexing: initialData.allowIndexing,
      canonicalUrl: initialData.canonicalUrl,
      adminEmail: initialData.adminEmail,
      allowUserRegistration: initialData.allowUserRegistration,
      defaultUserRole: initialData.defaultUserRole as 'USER' | 'ADMIN' | 'SUPER_ADMIN',
      sessionTimeout: initialData.sessionTimeout.toString(),
      adminNotifications: initialData.adminNotifications,
      checkoutEnabled: initialData.checkoutEnabled,
      taxRate: initialData.taxRate.toString(),
      currencyFormat: initialData.currencyFormat as 'symbol' | 'code' | 'name',
      orderPrefix: initialData.orderPrefix,
      refundPolicyText: initialData.refundPolicyText,
      maxUploadSize: (initialData.maxUploadSize / 1024 / 1024).toString(),
      allowedFileTypes: initialData.allowedFileTypes.join(', '),
      imageCompression: initialData.imageCompression,
      videoUploadEnabled: initialData.videoUploadEnabled,
      googleAnalyticsId: initialData.googleAnalyticsId,
      facebookPixelId: initialData.facebookPixelId,
      trackingEnabled: initialData.trackingEnabled,
      consentMode: initialData.consentMode,
      smtpHost: initialData.smtpHost,
      smtpPort: initialData.smtpPort.toString(),
      smtpUser: initialData.smtpUser,
      smtpPassword: initialData.smtpPassword,
      smtpSecure: initialData.smtpSecure,
      fromEmail: initialData.fromEmail,
      orderNotifications: initialData.orderNotifications,
      adminAlerts: initialData.adminAlerts,
      userEmailTemplates: initialData.userEmailTemplates,
      cacheEnabled: initialData.cacheEnabled,
      revalidationInterval: initialData.revalidationInterval.toString(),
      apiRateLimit: initialData.apiRateLimit.toString(),
    })
  }, [initialData, reset])

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'logo' | 'favicon' | 'og'
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    const setUploading = type === 'logo' ? setUploadingLogo : type === 'favicon' ? setUploadingFavicon : setUploadingOG
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Upload failed')
      }

      const result = await response.json()
      const fieldName = type === 'logo' ? 'storeLogo' : type === 'favicon' ? 'storeFavicon' : 'openGraphImage'
      setValue(fieldName, result.url)
    } catch (error) {
      toast({
        title: t('admin.uploadError') || 'Upload Error',
        description: error instanceof Error ? error.message : 'Failed to upload image',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (data: SettingsForm) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeName: data.storeName,
          storeLogo: data.storeLogo || null,
          storeFavicon: data.storeFavicon || null,
          storeDescription: data.storeDescription || null,
          defaultLanguage: data.defaultLanguage,
          defaultCurrency: data.defaultCurrency,
          timezone: data.timezone,
          storeStatus: data.storeStatus,
          maintenanceMessage: data.maintenanceMessage || null,
          hidePrices: data.hidePrices,
          hideOutOfStock: data.hideOutOfStock,
          defaultMetaTitle: data.defaultMetaTitle || null,
          defaultMetaDescription: data.defaultMetaDescription || null,
          openGraphImage: data.openGraphImage || null,
          allowIndexing: data.allowIndexing,
          canonicalUrl: data.canonicalUrl || null,
          adminEmail: data.adminEmail || null,
          allowUserRegistration: data.allowUserRegistration,
          defaultUserRole: data.defaultUserRole,
          sessionTimeout: parseInt(data.sessionTimeout),
          adminNotifications: data.adminNotifications,
          checkoutEnabled: data.checkoutEnabled,
          taxRate: parseFloat(data.taxRate),
          currencyFormat: data.currencyFormat,
          orderPrefix: data.orderPrefix || null,
          refundPolicyText: data.refundPolicyText || null,
          maxUploadSize: parseInt(data.maxUploadSize) * 1024 * 1024, // Convert MB to bytes
          allowedFileTypes: data.allowedFileTypes
            ? data.allowedFileTypes.split(',').map((t) => t.trim()).filter(Boolean)
            : null,
          imageCompression: data.imageCompression,
          videoUploadEnabled: data.videoUploadEnabled,
          googleAnalyticsId: data.googleAnalyticsId || null,
          facebookPixelId: data.facebookPixelId || null,
          trackingEnabled: data.trackingEnabled,
          consentMode: data.consentMode,
          smtpHost: data.smtpHost || null,
          smtpPort: data.smtpPort ? parseInt(data.smtpPort) : null,
          smtpUser: data.smtpUser || null,
          smtpPassword: data.smtpPassword || null,
          smtpSecure: data.smtpSecure,
          fromEmail: data.fromEmail || null,
          orderNotifications: data.orderNotifications,
          adminAlerts: data.adminAlerts,
          userEmailTemplates: data.userEmailTemplates,
          cacheEnabled: data.cacheEnabled,
          revalidationInterval: parseInt(data.revalidationInterval),
          apiRateLimit: parseInt(data.apiRateLimit),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update settings')
      }

      toast({
        title: t('admin.settingsUpdated') || 'Settings Updated',
        description: t('admin.settingsUpdatedDesc') || 'Settings have been saved successfully',
      })
    } catch (error) {
      toast({
        title: t('admin.error') || 'Error',
        description: error instanceof Error ? error.message : 'Failed to update settings',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="identity" className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-9">
          <TabsTrigger value="identity">Identity</TabsTrigger>
          <TabsTrigger value="visibility">Visibility</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* 1. Store Identity */}
        <TabsContent value="identity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                Store Identity
              </CardTitle>
              <CardDescription>Configure your store name, branding, and basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">
                  Store Name <span className="text-destructive">*</span>
                </Label>
                <Input id="storeName" error={errors.storeName?.message} {...register('storeName')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeDescription">Store Description</Label>
                <textarea
                  id="storeDescription"
                  rows={3}
                  className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
                  {...register('storeDescription')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeLogo">Store Logo</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="storeLogo"
                      type="url"
                      placeholder="/uploads/images/logo.png"
                      {...register('storeLogo')}
                    />
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'logo')}
                        disabled={uploadingLogo}
                      />
                      <Button type="button" variant="outline" size="sm" disabled={uploadingLogo}>
                        {uploadingLogo ? 'Uploading...' : 'Upload'}
                      </Button>
                    </label>
                  </div>
                  {watch('storeLogo') && (
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                      <SafeImage src={watch('storeLogo') || ''} alt="Logo" fill className="object-contain" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeFavicon">Store Favicon</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="storeFavicon"
                      type="url"
                      placeholder="/uploads/images/favicon.ico"
                      {...register('storeFavicon')}
                    />
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'favicon')}
                        disabled={uploadingFavicon}
                      />
                      <Button type="button" variant="outline" size="sm" disabled={uploadingFavicon}>
                        {uploadingFavicon ? 'Uploading...' : 'Upload'}
                      </Button>
                    </label>
                  </div>
                  {watch('storeFavicon') && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border">
                      <SafeImage src={watch('storeFavicon') || ''} alt="Favicon" fill className="object-contain" />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">
                    Default Language <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={watch('defaultLanguage')}
                    onValueChange={(value) => setValue('defaultLanguage', value)}
                  >
                    <SelectTrigger id="defaultLanguage">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultCurrency">
                    Default Currency <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={watch('defaultCurrency')}
                    onValueChange={(value) => setValue('defaultCurrency', value)}
                  >
                    <SelectTrigger id="defaultCurrency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">
                    Timezone <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={watch('timezone')}
                    onValueChange={(value) => setValue('timezone', value)}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. Store Visibility & Status */}
        <TabsContent value="visibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Store Visibility & Status
              </CardTitle>
              <CardDescription>Control store visibility and maintenance mode</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storeStatus">
                  Store Status <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={watch('storeStatus')}
                  onValueChange={(value) => setValue('storeStatus', value as 'active' | 'maintenance')}
                >
                  <SelectTrigger id="storeStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance Mode</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {watch('storeStatus') === 'maintenance' && (
                <div className="space-y-2">
                  <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                  <textarea
                    id="maintenanceMessage"
                    rows={4}
                    className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
                    placeholder="We're currently performing maintenance. Please check back soon."
                    {...register('maintenanceMessage')}
                  />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hidePrices"
                    checked={watch('hidePrices')}
                    onChange={(e) => setValue('hidePrices', e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                  />
                  <Label htmlFor="hidePrices" className="cursor-pointer font-normal">
                    Hide prices from customers
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hideOutOfStock"
                    checked={watch('hideOutOfStock')}
                    onChange={(e) => setValue('hideOutOfStock', e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                  />
                  <Label htmlFor="hideOutOfStock" className="cursor-pointer font-normal">
                    Hide out-of-stock products
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. SEO & Metadata */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                SEO & Metadata Settings
              </CardTitle>
              <CardDescription>Configure SEO settings and metadata for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultMetaTitle">Default Meta Title</Label>
                <Input id="defaultMetaTitle" placeholder="My Digital Store" {...register('defaultMetaTitle')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultMetaDescription">Default Meta Description</Label>
                <textarea
                  id="defaultMetaDescription"
                  rows={3}
                  className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
                  placeholder="Store description for search engines"
                  {...register('defaultMetaDescription')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="openGraphImage">OpenGraph Image URL</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="openGraphImage"
                    type="url"
                    placeholder="/uploads/images/og-image.png"
                    {...register('openGraphImage')}
                  />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'og')}
                      disabled={uploadingOG}
                    />
                    <Button type="button" variant="outline" size="sm" disabled={uploadingOG}>
                      {uploadingOG ? 'Uploading...' : 'Upload'}
                    </Button>
                  </label>
                </div>
                {watch('openGraphImage') && (
                  <div className="relative w-64 h-32 rounded-lg overflow-hidden border">
                    <SafeImage src={watch('openGraphImage') || ''} alt="OG Image" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="canonicalUrl">Canonical URL</Label>
                <Input
                  id="canonicalUrl"
                  type="url"
                  placeholder="https://example.com"
                  {...register('canonicalUrl')}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="allowIndexing"
                  checked={watch('allowIndexing')}
                  onChange={(e) => setValue('allowIndexing', e.target.checked)}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                />
                <Label htmlFor="allowIndexing" className="cursor-pointer font-normal">
                  Allow search engines to index this site
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4. Admin & Access Control */}
        <TabsContent value="admin" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Admin & Access Control
              </CardTitle>
              <CardDescription>Configure admin settings and user access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="admin@example.com"
                  error={errors.adminEmail?.message}
                  {...register('adminEmail')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (seconds)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  min="60"
                  placeholder="3600"
                  error={errors.sessionTimeout?.message}
                  {...register('sessionTimeout')}
                />
                <p className="text-xs text-muted-foreground">
                  Session will expire after this many seconds of inactivity
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultUserRole">Default User Role</Label>
                <Select
                  value={watch('defaultUserRole')}
                  onValueChange={(value) => setValue('defaultUserRole', value as 'USER' | 'ADMIN' | 'SUPER_ADMIN')}
                >
                  <SelectTrigger id="defaultUserRole">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">USER</SelectItem>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                    <SelectItem value="SUPER_ADMIN">SUPER_ADMIN</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="allowUserRegistration"
                    checked={watch('allowUserRegistration')}
                    onChange={(e) => setValue('allowUserRegistration', e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                  />
                  <Label htmlFor="allowUserRegistration" className="cursor-pointer font-normal">
                    Allow user registration
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="adminNotifications"
                    checked={watch('adminNotifications')}
                    onChange={(e) => setValue('adminNotifications', e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                  />
                  <Label htmlFor="adminNotifications" className="cursor-pointer font-normal">
                    Enable admin notifications
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 5. Payments & Orders */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Payments & Orders
              </CardTitle>
              <CardDescription>Configure checkout, payments, and order settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="checkoutEnabled"
                  checked={watch('checkoutEnabled')}
                  onChange={(e) => setValue('checkoutEnabled', e.target.checked)}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                />
                <Label htmlFor="checkoutEnabled" className="cursor-pointer font-normal">
                  Enable Checkout
                </Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="0.00"
                    error={errors.taxRate?.message}
                    {...register('taxRate')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currencyFormat">Currency Format</Label>
                  <Select
                    value={watch('currencyFormat')}
                    onValueChange={(value) => setValue('currencyFormat', value as 'symbol' | 'code' | 'name')}
                  >
                    <SelectTrigger id="currencyFormat">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="symbol">Symbol ($)</SelectItem>
                      <SelectItem value="code">Code (USD)</SelectItem>
                      <SelectItem value="name">Name (US Dollar)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="orderPrefix">Order Prefix</Label>
                <Input
                  id="orderPrefix"
                  placeholder="ORD"
                  {...register('orderPrefix')}
                />
                <p className="text-xs text-muted-foreground">
                  Prefix for order numbers (e.g., ORD-12345)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="refundPolicyText">Refund Policy Text</Label>
                <textarea
                  id="refundPolicyText"
                  rows={5}
                  className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
                  placeholder="Enter your refund policy here..."
                  {...register('refundPolicyText')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 6. Media & Uploads */}
        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Media & Uploads
              </CardTitle>
              <CardDescription>Configure file upload settings and media handling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxUploadSize">Max Upload Size (MB)</Label>
                <Input
                  id="maxUploadSize"
                  type="number"
                  min="1"
                  placeholder="50"
                  error={errors.maxUploadSize?.message}
                  {...register('maxUploadSize')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allowedFileTypes">Allowed File Types (comma-separated)</Label>
                <Input
                  id="allowedFileTypes"
                  placeholder="image/jpeg, image/png, image/webp, video/mp4"
                  {...register('allowedFileTypes')}
                />
                <p className="text-xs text-muted-foreground">
                  MIME types separated by commas
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="imageCompression"
                    checked={watch('imageCompression')}
                    onChange={(e) => setValue('imageCompression', e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                  />
                  <Label htmlFor="imageCompression" className="cursor-pointer font-normal">
                    Enable image compression
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="videoUploadEnabled"
                    checked={watch('videoUploadEnabled')}
                    onChange={(e) => setValue('videoUploadEnabled', e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                  />
                  <Label htmlFor="videoUploadEnabled" className="cursor-pointer font-normal">
                    Enable video uploads
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 7. Analytics & Tracking */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Analytics & Tracking
              </CardTitle>
              <CardDescription>Configure analytics and tracking services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                <Input
                  id="googleAnalyticsId"
                  placeholder="G-XXXXXXXXXX"
                  {...register('googleAnalyticsId')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                <Input
                  id="facebookPixelId"
                  placeholder="123456789012345"
                  {...register('facebookPixelId')}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="trackingEnabled"
                    checked={watch('trackingEnabled')}
                    onChange={(e) => setValue('trackingEnabled', e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                  />
                  <Label htmlFor="trackingEnabled" className="cursor-pointer font-normal">
                    Enable tracking
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="consentMode"
                    checked={watch('consentMode')}
                    onChange={(e) => setValue('consentMode', e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                  />
                  <Label htmlFor="consentMode" className="cursor-pointer font-normal">
                    Enable consent mode (GDPR compliance)
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 8. Email & Notifications */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email & Notifications
              </CardTitle>
              <CardDescription>Configure SMTP settings and email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input id="smtpHost" placeholder="smtp.example.com" {...register('smtpHost')} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    min="1"
                    max="65535"
                    placeholder="587"
                    error={errors.smtpPort?.message}
                    {...register('smtpPort')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">SMTP Username</Label>
                  <Input id="smtpUser" placeholder="user@example.com" {...register('smtpUser')} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    placeholder="••••••••"
                    {...register('smtpPassword')}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fromEmail">From Email</Label>
                <Input
                  id="fromEmail"
                  type="email"
                  placeholder="noreply@example.com"
                  error={errors.fromEmail?.message}
                  {...register('fromEmail')}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="smtpSecure"
                  checked={watch('smtpSecure')}
                  onChange={(e) => setValue('smtpSecure', e.target.checked)}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                />
                <Label htmlFor="smtpSecure" className="cursor-pointer font-normal">
                  Use secure connection (TLS/SSL)
                </Label>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="orderNotifications"
                    checked={watch('orderNotifications')}
                    onChange={(e) => setValue('orderNotifications', e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                  />
                  <Label htmlFor="orderNotifications" className="cursor-pointer font-normal">
                    Send order notifications
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="adminAlerts"
                    checked={watch('adminAlerts')}
                    onChange={(e) => setValue('adminAlerts', e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                  />
                  <Label htmlFor="adminAlerts" className="cursor-pointer font-normal">
                    Send admin alerts
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="userEmailTemplates"
                    checked={watch('userEmailTemplates')}
                    onChange={(e) => setValue('userEmailTemplates', e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                  />
                  <Label htmlFor="userEmailTemplates" className="cursor-pointer font-normal">
                    Enable user email templates
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 9. Advanced System Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Advanced System Settings
              </CardTitle>
              <CardDescription>Configure system-level settings and performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="cacheEnabled"
                  checked={watch('cacheEnabled')}
                  onChange={(e) => setValue('cacheEnabled', e.target.checked)}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                />
                <Label htmlFor="cacheEnabled" className="cursor-pointer font-normal">
                  Enable caching
                </Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="revalidationInterval">Revalidation Interval (seconds)</Label>
                  <Input
                    id="revalidationInterval"
                    type="number"
                    min="1"
                    placeholder="300"
                    error={errors.revalidationInterval?.message}
                    {...register('revalidationInterval')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiRateLimit">API Rate Limit (requests per minute)</Label>
                  <Input
                    id="apiRateLimit"
                    type="number"
                    min="1"
                    placeholder="100"
                    error={errors.apiRateLimit?.message}
                    {...register('apiRateLimit')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t sticky bottom-0 bg-background z-10 pb-4">
        <Button type="submit" variant="gradient" loading={isLoading} size="lg">
          <Save className="w-4 h-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </form>
  )
}
