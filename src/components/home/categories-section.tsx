'use client'

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SafeImage } from '@/components/ui/safe-image'
import { ArrowRight, Code, FileText, Video, Music, Image as ImageIcon, Package } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'

const categoryIcons: Record<string, React.ElementType> = {
  software: Code,
  templates: FileText,
  courses: Video,
  audio: Music,
  graphics: ImageIcon,
  default: Package,
}

// Minimal category type for display
interface CategoryData {
  id: string
  name: string
  slug: string
  description?: string | null
  image?: string | null
  _count?: { products: number }
}

interface CategoriesSectionProps {
  categories: CategoryData[]
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  const { t } = useLanguage()

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('home.browseCategory')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('home.categoryDesc')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category.slug] || categoryIcons.default
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={`/products?category=${category.slug}`}
                  className="group block p-6 rounded-2xl bg-background border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    {category.image ? (
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden mb-4">
                        <SafeImage
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover"
                          fallbackIcon={<Icon className="w-8 h-8 text-primary" />}
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    )}
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {category._count?.products || 0} {t('common.products')}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            {t('home.viewAllCategories')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
