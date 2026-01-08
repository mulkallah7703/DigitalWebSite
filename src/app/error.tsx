'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useLanguage } from '@/components/providers/language-provider'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { t } = useLanguage()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold mb-2">{t('error.somethingWrong')}</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          {t('error.unexpected')}
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button onClick={reset} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            {t('error.tryAgain')}
          </Button>
          <Button asChild variant="gradient">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              {t('error.home')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
