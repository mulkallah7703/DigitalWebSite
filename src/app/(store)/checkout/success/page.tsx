'use client'

import Link from 'next/link'
import { CheckCircle, Download, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/components/providers/language-provider'

export default function CheckoutSuccessPage() {
  const { t } = useLanguage()
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <Card>
          <CardContent className="pt-8 pb-6">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">{t('success.payment')}</h1>
            <p className="text-muted-foreground mb-6">
              {t('success.thankYou')}
            </p>

            <div className="space-y-3">
              <Button asChild className="w-full" variant="gradient">
                <Link href="/admin">
                  <Download className="w-4 h-4 mr-2" />
                  {t('success.downloads')}
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link href="/products">
                  {t('success.continue')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
