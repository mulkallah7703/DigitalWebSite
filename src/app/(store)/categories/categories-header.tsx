'use client'

import { useLanguage } from '@/components/providers/language-provider'

export function CategoriesHeader() {
  const { t } = useLanguage()

  return (
    <div className="mb-8">
      <h1 className="text-3xl lg:text-4xl font-bold mb-2">{t('pages.categories')}</h1>
      <p className="text-muted-foreground">
        {t('pages.categoriesDesc')}
      </p>
    </div>
  )
}
