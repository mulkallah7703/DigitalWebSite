'use client'

import { useLanguage } from '@/components/providers/language-provider'

interface ProductsGridHeaderProps {
  skip: number
  limit: number
  total: number
}

export function ProductsGridHeader({ skip, limit, total }: ProductsGridHeaderProps) {
  const { t } = useLanguage()

  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-sm text-muted-foreground">
        {t('products.showing')} {skip + 1}-{Math.min(skip + limit, total)} {t('products.of')} {total} {t('common.products')}
      </p>
    </div>
  )
}
