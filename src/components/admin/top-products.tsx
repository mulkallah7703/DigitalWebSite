'use client'

import Link from 'next/link'
import { SafeImage } from '@/components/ui/safe-image'
import { ArrowRight, Package } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'

// Minimal product type for top products display
interface TopProductData {
  id: string
  name: string
  price: number | { toNumber(): number }
  salesCount: number
  images: { url: string }[]
  category: { name: string }
}

interface TopProductsProps {
  products: TopProductData[]
}

export function TopProducts({ products }: TopProductsProps) {
  const { t } = useLanguage()
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('admin.topProducts')}</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/products">
            {t('admin.viewAll')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">{t('admin.noProductsYet')}</p>
          ) : (
            products.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50"
              >
                <span className="text-lg font-bold text-muted-foreground w-6">
                  #{index + 1}
                </span>
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-secondary">
                  {product.images[0] ? (
                    <SafeImage
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      fallbackIcon={<Package className="w-6 h-6 text-muted-foreground" />}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.category.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(Number(product.price))}</p>
                  <p className="text-xs text-muted-foreground">{product.salesCount} {t('common.sales')}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
