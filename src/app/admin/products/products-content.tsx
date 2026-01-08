'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductsTable } from '@/components/admin/products-table'
import { useLanguage } from '@/components/providers/language-provider'
import type { Product, Category, ProductImage } from '@prisma/client'

type ProductWithRelations = Product & {
  category: Category
  images: ProductImage[]
  _count: { orderItems: number }
}

interface AdminProductsContentProps {
  products: ProductWithRelations[]
}

export function AdminProductsContent({ products }: AdminProductsContentProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('admin.products')}</h1>
          <p className="text-muted-foreground">{t('admin.manageProducts')}</p>
        </div>
        <Button asChild variant="gradient">
          <Link href="/admin/products/new">
            <Plus className="w-4 h-4 mr-2" />
            {t('admin.addProduct')}
          </Link>
        </Button>
      </div>

      <ProductsTable products={products} />
    </div>
  )
}
