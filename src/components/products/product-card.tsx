'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { SafeImage } from '@/components/ui/safe-image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore, type CartProduct } from '@/store/cart-store'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'
import type { Decimal } from '@prisma/client/runtime/library'

// Minimal product type for card display
export interface ProductCardData {
  id: string
  name: string
  slug: string
  price: Decimal | number
  comparePrice?: Decimal | number | null
  featured?: boolean
  rating: Decimal | number
  reviewCount: number
  externalPurchaseLink?: string | null
  images: { id: string; url: string; alt?: string | null }[]
  category: { id: string; name: string; slug: string }
}

interface ProductCardProps {
  product: ProductCardData
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore()
  const { t } = useLanguage()
  const price = Number(product.price)
  const comparePrice = product.comparePrice ? Number(product.comparePrice) : null
  const discount = calculateDiscount(price, comparePrice || 0)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Convert to CartProduct format with numeric prices
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price,
      comparePrice,
      externalPurchaseLink: product.externalPurchaseLink ?? null,
      images: product.images,
      category: product.category,
    }
    addItem(cartProduct)
    openCart()
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
    >
      <Link href={`/products/${product.slug}`}>
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          {product.images?.[0]?.url ? (
            <SafeImage
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              fallbackIcon={<ShoppingCart className="w-12 h-12 text-muted-foreground" />}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <Badge variant="gradient" className="text-xs">
                {t('product.featured')}
              </Badge>
            )}
            {discount > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>

          {/* Add to Cart Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={handleAddToCart}
              className="w-full"
              size="sm"
              variant="secondary"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {t('cart.add')}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-muted-foreground mb-1">{product.category.name}</p>

          {/* Title */}
          <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{Number(product.rating).toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(price)}
            </span>
            {comparePrice && comparePrice > price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(comparePrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
