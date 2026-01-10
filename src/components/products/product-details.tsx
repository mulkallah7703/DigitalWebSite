'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SafeImage } from '@/components/ui/safe-image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Download,
  Shield,
  Clock,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCartStore, type CartProduct } from '@/store/cart-store'
import { formatPrice, calculateDiscount, formatDate } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'

// Serialized product type (with numbers instead of Decimals)
interface SerializedProduct {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string | null
  price: number
  comparePrice: number | null
  categoryId: string
  featured: boolean
  rating: number
  reviewCount: number
  salesCount: number
  viewCount: number
  videoUrl: string | null
  category: {
    id: string
    name: string
    slug: string
    description: string | null
    image: string | null
    createdAt: Date
    updatedAt: Date
    parentId: string | null
  }
  images: {
    id: string
    url: string
    alt: string | null
    order: number
    productId: string
  }[]
  files: {
    id: string
    name: string
    size: number
    type: string
  }[]
  reviews: {
    id: string
    rating: number
    title: string | null
    content: string | null
    verified: boolean
    createdAt: Date
    user: {
      id: string
      name: string | null
      image: string | null
    }
  }[]
  tags: {
    tag: {
      name: string
      slug: string
    }
  }[]
}

interface ProductDetailsProps {
  product: SerializedProduct
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem, openCart } = useCartStore()
  const { t } = useLanguage()
  const price = Number(product.price)
  const comparePrice = product.comparePrice ? Number(product.comparePrice) : null
  const discount = calculateDiscount(price, comparePrice || 0)

  const features = [
    { icon: Download, label: t('product.instantDownload') },
    { icon: Shield, label: t('product.securePayment') },
    { icon: Clock, label: t('product.lifetimeAccess') },
    { icon: RefreshCw, label: t('product.freeUpdates') },
  ]

  const handleAddToCart = () => {
    // Convert to CartProduct format with numeric prices
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price,
      comparePrice,
      images: product.images.map(img => ({
        id: img.id,
        url: img.url,
        alt: img.alt,
      })),
      category: {
        id: product.category.id,
        name: product.category.name,
        slug: product.category.slug,
      },
    }
    addItem(cartProduct)
    openCart()
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Image Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
          <AnimatePresence mode="wait">
            {product.images && product.images.length > 0 && product.images[selectedImage] && product.images[selectedImage].url ? (
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-full"
              >
                <SafeImage
                  src={product.images[selectedImage].url}
                  alt={product.images[selectedImage].alt || product.name}
                  fill
                  className="object-cover"
                  priority
                  fallbackIcon={<ShoppingCart className="w-24 h-24 text-muted-foreground" />}
                />
              </motion.div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingCart className="w-24 h-24 text-muted-foreground" />
              </div>
            )}
          </AnimatePresence>

          {/* Navigation Arrows */}
          {product.images && product.images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={prevImage}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={nextImage}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.featured && <Badge variant="gradient">{t('product.featured')}</Badge>}
            {discount > 0 && <Badge variant="destructive">-{discount}% {t('product.off')}</Badge>}
          </div>
        </div>

        {/* Thumbnails */}
        {product.images && product.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              image.url ? (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <SafeImage
                    src={image.url}
                    alt={image.alt || `${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ) : null
            ))}
          </div>
        )}

        {/* Video */}
        {product.videoUrl && product.videoUrl.trim().length > 0 && (
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-secondary">
            <video
              src={product.videoUrl}
              controls
              className="w-full h-full object-contain"
              preload="metadata"
              playsInline
            >
              <source src={product.videoUrl} type="video/mp4" />
              <source src={product.videoUrl} type="video/webm" />
              <source src={product.videoUrl} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
          {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/products" className="hover:text-foreground transition-colors">
            {t('nav.products')}
          </Link>
          <span>/</span>
          <Link
            href={`/products?category=${product.category.slug}`}
            className="hover:text-foreground transition-colors"
          >
            {product.category.name}
          </Link>
        </nav>

        {/* Title */}
        <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>

        {/* Rating & Stats */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(Number(product.rating))
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
            <span className="ml-2 font-medium">{Number(product.rating).toFixed(1)}</span>
            <span className="text-muted-foreground">({product.reviewCount} {t('common.reviews')})</span>
          </div>
          <Separator orientation="vertical" className="h-5" />
          <span className="text-sm text-muted-foreground">{product.salesCount} {t('common.sales')}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold gradient-text">{formatPrice(price)}</span>
          {comparePrice && comparePrice > price && (
            <span className="text-xl text-muted-foreground line-through">
              {formatPrice(comparePrice)}
            </span>
          )}
        </div>

        {/* Short Description */}
        {product.shortDescription && (
          <p className="text-muted-foreground">{product.shortDescription}</p>
        )}

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map(({ tag }) => (
              <Badge key={tag.slug} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={handleAddToCart} size="lg" variant="gradient" className="flex-1">
            <ShoppingCart className="w-5 h-5 mr-2" />
            {t('cart.add')}
          </Button>
          <Button size="lg" variant="outline">
            <Heart className="w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-secondary/50">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium">{feature.label}</span>
            </div>
          ))}
        </div>

        <Separator />

        {/* Tabs */}
          <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="description" className="flex-1">
              {t('product.description')}
            </TabsTrigger>
            <TabsTrigger value="files" className="flex-1">
              {t('product.files')} ({product.files.length})
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">
              {t('product.reviews')} ({product.reviewCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-4">
            <div
              className="prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </TabsContent>

          <TabsContent value="files" className="mt-4">
            <div className="space-y-3">
              {product.files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Download className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {file.type} • {Math.round(file.size / 1024)} KB
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            {product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div key={review.id} className="p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {review.user.image ? (
                          <SafeImage
                            src={review.user.image}
                            alt={review.user.name || ''}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          <span className="text-sm font-medium">
                            {review.user.name?.[0] || 'U'}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{review.user.name}</p>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                            {review.verified && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              <Check className="w-3 h-3 mr-1" />
                              {t('product.verified')}
                            </Badge>
                          )}
                        </div>
                        {review.title && <p className="font-medium mt-2">{review.title}</p>}
                        {review.content && (
                          <p className="text-sm text-muted-foreground mt-1">{review.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">{t('product.noReviews')}</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
