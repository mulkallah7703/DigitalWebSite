'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { SafeImage } from '@/components/ui/safe-image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/components/providers/language-provider'
import { getInitials } from '@/lib/utils'

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: z.string().url().optional().or(z.literal('')),
})

type ProfileForm = z.infer<typeof profileSchema>

interface AccountProfileProps {
  user: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  }
  preferences: {
    language: string
  }
  onUpdate: () => void
}

export function AccountProfile({ user, preferences, onUpdate }: AccountProfileProps) {
  const { t, setLanguage, language } = useLanguage()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || '',
      image: user.image || '',
    },
  })

  const profileImage = watch('image')

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
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
      setValue('image', result.url)
    } catch (error) {
      toast({
        title: t('admin.uploadError') || 'Upload Error',
        description: error instanceof Error ? error.message : 'Failed to upload image',
        variant: 'destructive',
      })
    } finally {
      setUploadingImage(false)
    }
  }

  const onSubmit = async (data: ProfileForm) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/account', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          image: data.image || null,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update profile')
      }

      toast({
        title: t('account.accountUpdated') || 'Account Updated',
        description: t('account.accountUpdated') || 'Your profile has been updated successfully',
      })

      onUpdate()
    } catch (error) {
      toast({
        title: t('account.updateFailed') || 'Update Failed',
        description: error instanceof Error ? error.message : 'Failed to update profile',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLanguageChange = async (newLanguage: 'en' | 'ar') => {
    setLanguage(newLanguage)
    try {
      await fetch('/api/account', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: newLanguage,
        }),
      })
      onUpdate()
    } catch (error) {
      console.error('Failed to update language:', error)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('account.profileInfo')}</CardTitle>
          <CardDescription>{t('account.profileDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Image */}
            <div className="flex items-center gap-6">
              <div className="relative">
                {profileImage ? (
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profileImage} alt={user.name || 'User'} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-2xl">
                      {getInitials(user.name || 'U')}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-2xl">
                      {getInitials(user.name || 'U')}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="image-upload">{t('account.profileImage')}</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Input
                    id="image"
                    type="url"
                    placeholder="/uploads/images/profile.jpg"
                    {...register('image')}
                    className="flex-1"
                  />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                    <Button type="button" variant="outline" size="sm" disabled={uploadingImage}>
                      <Upload className="w-4 h-4 mr-2" />
                      {uploadingImage ? t('account.saving') : t('account.uploadImage')}
                    </Button>
                  </label>
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                {t('account.fullName')} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                error={errors.name?.message}
                {...register('name')}
              />
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-2">
              <Label htmlFor="email">{t('account.email')}</Label>
              <Input
                id="email"
                type="email"
                value={user.email || ''}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">{t('account.emailReadOnly')}</p>
            </div>

            {/* Language Preference */}
            <div className="space-y-2">
              <Label>{t('account.language')}</Label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleLanguageChange('en')}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    language === 'en'
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background hover:bg-accent'
                  }`}
                >
                  {t('account.english')}
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('ar')}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    language === 'ar'
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background hover:bg-accent'
                  }`}
                >
                  {t('account.arabic')}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">{t('account.languageDesc')}</p>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button type="submit" variant="gradient" loading={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {t('account.saveChanges')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
