'use client'

import { useLanguage } from '@/components/providers/language-provider'

export function ProductsGridEmpty() {
  const { t } = useLanguage()

  return (
    <div className="text-center py-16">
      <h3 className="text-lg font-medium mb-2">{t('products.noProductsFound')}</h3>
      <p className="text-muted-foreground">
        {t('products.tryAdjusting')}
      </p>
    </div>
  )
}
