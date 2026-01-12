'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, Sparkles, Github, Chrome } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/components/providers/language-provider'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        // Handle authentication errors gracefully
        const errorMessage = result.error === 'CredentialsSignin' 
          ? t('auth.invalidCredentials') || 'Invalid email or password'
          : t('auth.invalidEmail') || 'Authentication failed'
        
        toast({
          title: t('auth.error') || 'Error',
          description: errorMessage,
          variant: 'destructive',
        })
      } else if (result?.ok) {
        // Successful login - redirect to homepage
        router.push('/')
        router.refresh()
      }
    } catch {
      toast({
        title: t('auth.error'),
        description: t('auth.somethingWrong'),
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignIn = (provider: string) => {
    signIn(provider, { callbackUrl })
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Nexus</span>
          </Link>

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">{t('auth.welcomeBack')}</h1>
            <p className="text-muted-foreground mt-2">
              {t('auth.signInContinue')}
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn('google')}
              disabled={isLoading}
            >
              <Chrome className="w-4 h-4 mr-2" />
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn('github')}
              disabled={isLoading}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </div>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              {t('auth.orContinueEmail')}
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                icon={<Mail className="w-4 h-4" />}
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  {t('auth.forgotPassword')}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            <Button type="submit" className="w-full" variant="gradient" loading={isLoading}>
              {t('auth.signIn')}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground">
            {t('auth.dontHaveAccount')}{' '}
            <Link href="/auth/register" className="text-primary hover:underline font-medium">
              {t('auth.signUp')}
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 items-center justify-center p-8">
        <div className="max-w-md text-white text-center">
          <h2 className="text-3xl font-bold mb-4">{t('auth.startJourney')}</h2>
          <p className="text-white/80">
            {t('auth.accessThousands')}
          </p>
        </div>
      </div>
    </div>
  )
}
