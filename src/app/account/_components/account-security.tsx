'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Lock, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/components/providers/language-provider'
import { signOut } from 'next-auth/react'

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type PasswordForm = z.infer<typeof passwordSchema>

export function AccountSecurity() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  })

  const onSubmit = async (data: PasswordForm) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/account/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update password')
      }

      toast({
        title: t('account.passwordUpdated') || 'Password Updated',
        description: t('account.passwordUpdated') || 'Your password has been updated successfully',
      })

      reset()
    } catch (error) {
      toast({
        title: t('account.updateFailed') || 'Update Failed',
        description: error instanceof Error ? error.message : 'Failed to update password',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogoutAll = async () => {
    if (!confirm(t('account.logoutAllConfirm') || 'Are you sure you want to logout from all devices?')) {
      return
    }

    try {
      await signOut({ callbackUrl: '/', redirect: true })
    } catch (error) {
      toast({
        title: t('account.updateFailed') || 'Error',
        description: 'Failed to logout from all devices',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            {t('account.changePassword')}
          </CardTitle>
          <CardDescription>
            {t('account.changePassword')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">
                {t('account.currentPassword')} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="currentPassword"
                type="password"
                error={errors.currentPassword?.message}
                {...register('currentPassword')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">
                {t('account.newPassword')} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="newPassword"
                type="password"
                error={errors.newPassword?.message}
                {...register('newPassword')}
              />
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters long
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t('account.confirmPassword')} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="gradient" loading={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {t('account.saveChanges')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('account.activeSessions')}</CardTitle>
          <CardDescription>
            {t('account.activeSessions')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={handleLogoutAll}
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {t('account.logoutAll')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
