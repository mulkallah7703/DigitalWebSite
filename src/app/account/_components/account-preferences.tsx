'use client'

import { useState } from 'react'
import { Save, Bell, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/components/providers/language-provider'

interface AccountPreferencesProps {
  preferences: {
    emailNotifications: boolean
    marketing: boolean
  }
  onUpdate: () => void
}

export function AccountPreferences({ preferences, onUpdate }: AccountPreferencesProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(preferences.emailNotifications)
  const [marketing, setMarketing] = useState(preferences.marketing)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/account', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailNotifications,
          marketing,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update preferences')
      }

      toast({
        title: t('account.accountUpdated') || 'Preferences Updated',
        description: t('account.accountUpdated') || 'Your preferences have been updated successfully',
      })

      onUpdate()
    } catch (error) {
      toast({
        title: t('account.updateFailed') || 'Update Failed',
        description: error instanceof Error ? error.message : 'Failed to update preferences',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('account.preferences')}</CardTitle>
        <CardDescription>{t('account.preferencesDesc')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailNotifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                {t('account.emailNotifications')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('account.emailNotificationsDesc')}
              </p>
            </div>
            <input
              type="checkbox"
              id="emailNotifications"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {t('account.marketing')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('account.marketingDesc')}
              </p>
            </div>
            <input
              type="checkbox"
              id="marketing"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={handleSave} variant="gradient" loading={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {t('account.saveChanges')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
