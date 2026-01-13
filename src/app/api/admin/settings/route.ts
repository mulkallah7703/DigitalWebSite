export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { Prisma } from '@prisma/client'

export async function GET(req: Request) {
  return getHandler(req)
}

export async function PATCH(req: Request) {
  return updateHandler(req)
}

async function getHandler(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')

    await requireAdmin()

    // Get all settings
    const settings = await db.setting.findMany({
      orderBy: { key: 'asc' },
    })

    // Convert to key-value object
    const settingsMap: Record<string, unknown> = {}
    settings.forEach((setting) => {
      settingsMap[setting.key] = setting.value
    })

    // Helper to safely get values with defaults
    const get = (key: string, defaultValue: unknown) => {
      const value = settingsMap[key]
      return value !== undefined && value !== null ? value : defaultValue
    }

    // Return with comprehensive defaults
    return NextResponse.json({
      data: {
        // 1. Store Identity Settings
        storeName: get('store.name', 'Alsadi Digital Store') as string,
        storeLogo: get('store.logo', '') as string,
        storeFavicon: get('store.favicon', '') as string,
        storeDescription: get('store.description', '') as string,
        defaultLanguage: get('store.language', 'en') as string,
        defaultCurrency: get('store.currency', 'USD') as string,
        timezone: get('store.timezone', 'UTC') as string,

        // 2. Store Visibility & Status
        storeStatus: get('store.status', 'active') as string,
        maintenanceMessage: get('store.maintenanceMessage', '') as string,
        hidePrices: get('store.hidePrices', false) as boolean,
        hideOutOfStock: get('store.hideOutOfStock', false) as boolean,

        // 3. SEO & Metadata Settings
        defaultMetaTitle: get('seo.metaTitle', '') as string,
        defaultMetaDescription: get('seo.metaDescription', '') as string,
        openGraphImage: get('seo.openGraphImage', '') as string,
        allowIndexing: get('seo.allowIndexing', true) as boolean,
        canonicalUrl: get('seo.canonicalUrl', '') as string,

        // 4. Admin & Access Control
        adminEmail: get('admin.email', '') as string,
        allowUserRegistration: get('admin.allowRegistration', true) as boolean,
        defaultUserRole: get('admin.defaultRole', 'USER') as string,
        sessionTimeout: get('admin.sessionTimeout', 3600) as number,
        adminNotifications: get('admin.notifications', true) as boolean,

        // 5. Payments & Orders
        checkoutEnabled: get('checkout.enabled', true) as boolean,
        taxRate: get('checkout.taxRate', 0) as number,
        currencyFormat: get('checkout.currencyFormat', 'symbol') as string,
        orderPrefix: get('checkout.orderPrefix', 'ORD') as string,
        refundPolicyText: get('checkout.refundPolicy', '') as string,

        // 6. Media & Uploads
        maxUploadSize: get('media.maxUploadSize', 52428800) as number, // 50MB in bytes
        allowedFileTypes: get('media.allowedTypes', ['image/jpeg', 'image/png', 'image/webp', 'video/mp4']) as string[],
        imageCompression: get('media.imageCompression', true) as boolean,
        videoUploadEnabled: get('media.videoUpload', true) as boolean,

        // 7. Analytics & Tracking
        googleAnalyticsId: get('analytics.googleId', '') as string,
        facebookPixelId: get('analytics.facebookPixel', '') as string,
        trackingEnabled: get('analytics.enabled', true) as boolean,
        consentMode: get('analytics.consentMode', false) as boolean,

        // 8. Email & Notifications
        smtpHost: get('email.smtpHost', '') as string,
        smtpPort: get('email.smtpPort', 587) as number,
        smtpUser: get('email.smtpUser', '') as string,
        smtpPassword: get('email.smtpPassword', '') as string,
        smtpSecure: get('email.smtpSecure', false) as boolean,
        fromEmail: get('email.fromEmail', '') as string,
        orderNotifications: get('email.orderNotifications', true) as boolean,
        adminAlerts: get('email.adminAlerts', true) as boolean,
        userEmailTemplates: get('email.userTemplates', true) as boolean,

        // 9. Advanced System Settings
        cacheEnabled: get('system.cacheEnabled', true) as boolean,
        revalidationInterval: get('system.revalidationInterval', 300) as number,
        apiRateLimit: get('system.apiRateLimit', 100) as number,
        featureFlags: get('system.featureFlags', {}) as Record<string, boolean>,
      },
    })
  } catch (error) {
    console.error('Settings fetch error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

async function updateHandler(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { z } = await import('zod')
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')

    await requireAdmin()

    const settingsSchema = z.object({
      // 1. Store Identity Settings
      storeName: z.string().min(1).optional(),
      storeLogo: z.string().optional(),
      storeFavicon: z.string().optional(),
      storeDescription: z.string().optional(),
      defaultLanguage: z.string().optional(),
      defaultCurrency: z.string().optional(),
      timezone: z.string().optional(),

      // 2. Store Visibility & Status
      storeStatus: z.enum(['active', 'maintenance']).optional(),
      maintenanceMessage: z.string().optional(),
      hidePrices: z.boolean().optional(),
      hideOutOfStock: z.boolean().optional(),

      // 3. SEO & Metadata Settings
      defaultMetaTitle: z.string().optional(),
      defaultMetaDescription: z.string().optional(),
      openGraphImage: z.string().optional(),
      allowIndexing: z.boolean().optional(),
      canonicalUrl: z.string().url().optional().or(z.literal('')),

      // 4. Admin & Access Control
      adminEmail: z.string().email().optional().or(z.literal('')),
      allowUserRegistration: z.boolean().optional(),
      defaultUserRole: z.enum(['USER', 'ADMIN', 'SUPER_ADMIN']).optional(),
      sessionTimeout: z.number().int().positive().optional(),
      adminNotifications: z.boolean().optional(),

      // 5. Payments & Orders
      checkoutEnabled: z.boolean().optional(),
      taxRate: z.number().min(0).max(100).optional(),
      currencyFormat: z.enum(['symbol', 'code', 'name']).optional(),
      orderPrefix: z.string().optional(),
      refundPolicyText: z.string().optional(),

      // 6. Media & Uploads
      maxUploadSize: z.number().int().positive().optional(),
      allowedFileTypes: z.array(z.string()).optional(),
      imageCompression: z.boolean().optional(),
      videoUploadEnabled: z.boolean().optional(),

      // 7. Analytics & Tracking
      googleAnalyticsId: z.string().optional(),
      facebookPixelId: z.string().optional(),
      trackingEnabled: z.boolean().optional(),
      consentMode: z.boolean().optional(),

      // 8. Email & Notifications
      smtpHost: z.string().optional(),
      smtpPort: z.number().int().min(1).max(65535).optional(),
      smtpUser: z.string().optional(),
      smtpPassword: z.string().optional(),
      smtpSecure: z.boolean().optional(),
      fromEmail: z.string().email().optional().or(z.literal('')),
      orderNotifications: z.boolean().optional(),
      adminAlerts: z.boolean().optional(),
      userEmailTemplates: z.boolean().optional(),

      // 9. Advanced System Settings
      cacheEnabled: z.boolean().optional(),
      revalidationInterval: z.number().int().positive().optional(),
      apiRateLimit: z.number().int().positive().optional(),
      featureFlags: z.record(z.boolean()).optional(),
    })

    const body = await req.json()
    const data = settingsSchema.parse(body)

    // Map to settings keys
    const settingsToUpdate: Array<{ key: string; value: unknown }> = []

    // Helper to add setting if defined
    const addSetting = (key: string, value: unknown) => {
      if (value !== undefined) {
        settingsToUpdate.push({ key, value })
      }
    }

    // 1. Store Identity Settings
    addSetting('store.name', data.storeName)
    addSetting('store.logo', data.storeLogo)
    addSetting('store.favicon', data.storeFavicon)
    addSetting('store.description', data.storeDescription)
    addSetting('store.language', data.defaultLanguage)
    addSetting('store.currency', data.defaultCurrency)
    addSetting('store.timezone', data.timezone)

    // 2. Store Visibility & Status
    addSetting('store.status', data.storeStatus)
    addSetting('store.maintenanceMessage', data.maintenanceMessage)
    addSetting('store.hidePrices', data.hidePrices)
    addSetting('store.hideOutOfStock', data.hideOutOfStock)

    // 3. SEO & Metadata Settings
    addSetting('seo.metaTitle', data.defaultMetaTitle)
    addSetting('seo.metaDescription', data.defaultMetaDescription)
    addSetting('seo.openGraphImage', data.openGraphImage)
    addSetting('seo.allowIndexing', data.allowIndexing)
    addSetting('seo.canonicalUrl', data.canonicalUrl)

    // 4. Admin & Access Control
    addSetting('admin.email', data.adminEmail)
    addSetting('admin.allowRegistration', data.allowUserRegistration)
    addSetting('admin.defaultRole', data.defaultUserRole)
    addSetting('admin.sessionTimeout', data.sessionTimeout)
    addSetting('admin.notifications', data.adminNotifications)

    // 5. Payments & Orders
    addSetting('checkout.enabled', data.checkoutEnabled)
    addSetting('checkout.taxRate', data.taxRate)
    addSetting('checkout.currencyFormat', data.currencyFormat)
    addSetting('checkout.orderPrefix', data.orderPrefix)
    addSetting('checkout.refundPolicy', data.refundPolicyText)

    // 6. Media & Uploads
    addSetting('media.maxUploadSize', data.maxUploadSize)
    addSetting('media.allowedTypes', data.allowedFileTypes)
    addSetting('media.imageCompression', data.imageCompression)
    addSetting('media.videoUpload', data.videoUploadEnabled)

    // 7. Analytics & Tracking
    addSetting('analytics.googleId', data.googleAnalyticsId)
    addSetting('analytics.facebookPixel', data.facebookPixelId)
    addSetting('analytics.enabled', data.trackingEnabled)
    addSetting('analytics.consentMode', data.consentMode)

    // 8. Email & Notifications
    addSetting('email.smtpHost', data.smtpHost)
    addSetting('email.smtpPort', data.smtpPort)
    addSetting('email.smtpUser', data.smtpUser)
    addSetting('email.smtpPassword', data.smtpPassword)
    addSetting('email.smtpSecure', data.smtpSecure)
    addSetting('email.fromEmail', data.fromEmail)
    addSetting('email.orderNotifications', data.orderNotifications)
    addSetting('email.adminAlerts', data.adminAlerts)
    addSetting('email.userTemplates', data.userEmailTemplates)

    // 9. Advanced System Settings
    addSetting('system.cacheEnabled', data.cacheEnabled)
    addSetting('system.revalidationInterval', data.revalidationInterval)
    addSetting('system.apiRateLimit', data.apiRateLimit)
    addSetting('system.featureFlags', data.featureFlags)

    // Update settings using upsert
    await Promise.all(
      settingsToUpdate.map((setting) => {
        const normalizedValue = setting.value as Prisma.InputJsonValue
        return db.setting.upsert({
          where: { key: setting.key },
          update: { value: normalizedValue },
          create: {
            key: setting.key,
            value: normalizedValue,
          },
        })
      })
    )

    revalidateTag('settings')

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
    })
  } catch (error) {
    console.error('Settings update error:', error)

    const { z } = await import('zod')
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update settings' },
      { status: 500 }
    )
  }
}
