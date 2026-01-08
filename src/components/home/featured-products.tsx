'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/product-card'
import { FeaturedProduct } from "@/types/product"
import { useLanguage } from '@/components/providers/language-provider'


type FeaturedProductsProps = {
  products: FeaturedProduct[]
}


export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { t } = useLanguage()
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">{t('home.aiRecommended')}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold">{t('home.featuredProducts')}</h2>
            <p className="text-muted-foreground mt-2">
              {t('home.handpicked')}
            </p>
          </div>
          <Button asChild variant="outline" className="group">
            <Link href="/products?featured=true">
              {t('home.viewAll')}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
