'use client'

import Link from 'next/link'
import { Code, FileText, Video, BookOpen, Image as ImageIcon, Music, Package } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/components/providers/language-provider'

interface CategoryCardProps {
  category: {
    id: string
    name: string
    description: string | null
    slug: string
    _count: { products: number }
  }
}

const categoryIcons: Record<string, React.ElementType> = {
  software: Code,
  templates: FileText,
  courses: Video,
  ebooks: BookOpen,
  graphics: ImageIcon,
  audio: Music,
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { t } = useLanguage()
  const Icon = categoryIcons[category.slug] || Package

  return (
    <Link href={`/products?category=${category.slug}`}>
      <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                {category.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-2">
                {category.description}
              </p>
              <span className="text-xs text-primary font-medium">
                {category._count.products} {t('common.products')}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
