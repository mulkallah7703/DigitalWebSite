'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/providers/language-provider'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">{t('error.notFound')}</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          {t('error.notFoundDesc')}
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="javascript:history.back()">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('error.goBack')}
            </Link>
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
