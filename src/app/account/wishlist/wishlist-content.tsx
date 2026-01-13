'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, ShoppingCart, Trash2, Eye, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { SafeImage } from '@/components/ui/safe-image'
import { formatPrice, formatDate, calculateDiscount } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'
import { useToast } from '@/hooks/use-toast'
import { useCartStore, type CartProduct } from '@/store/cart-store'
import type { ProductStatus } from '@prisma/client'

interface WishlistItem {
  id: string
  createdAt: Date
  product: {
    id: string
    name: string
    slug: string
    price: number
    comparePrice: number | null
    status: ProductStatus
    images: Array<{ id: string; url: string; alt?: string | null }>
    category: {
      id: string
      name: string
      slug: string
    }
  }
}

const productStatusLabels: Record<ProductStatus, string> = {
  DRAFT: 'Draft',
  PUBLISHED: 'Active',
  ARCHIVED: 'Unpublished',
}

const productStatusColors: Record<ProductStatus, 'default' | 'secondary' | 'success' | 'warning' | 'destructive'> = {
  DRAFT: 'secondary',
  PUBLISHED: 'success',
  ARCHIVED: 'warning',
}

export function WishlistPageContent() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const { addItem, openCart } = useCartStore()
  const [loading, setLoading] = useState(true)
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/account/wishlist')
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist')
        }
        const result = await response.json()
        
        // Normalize images: transform { url: string }[] to { id: string; url: string; alt?: string | null }[]
        // This ensures compatibility with CartProduct which requires images with id fields
        const normalizedItems: WishlistItem[] = result.data.map((item: {
          id: string
          createdAt: string
          product: {
            id: string
            name: string
            slug: string
            price: number
            comparePrice: number | null
            status: ProductStatus
            images: Array<{ url: string }>
            category: {
              id: string
              name: string
              slug: string
            }
          }
        }) => ({
          id: item.id,
          createdAt: new Date(item.createdAt),
          product: {
            ...item.product,
            images: item.product.images.map((img: { url: string }, index: number) => ({
              id: `${item.product.id}-img-${index}`,
              url: img.url,
              alt: null,
            })),
          },
        }))
        
        setWishlistItems(normalizedItems)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load wishlist')
      } finally {
        setLoading(false)
      }
    }

    fetchWishlist()
  }, [])

  const handleRemoveFromWishlist = async (itemId: string, productName: string) => {
    setRemovingIds((prev) => new Set(prev).add(itemId))
    try {
      const response = await fetch(`/api/account/wishlist/${itemId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to remove from wishlist')
      }
      setWishlistItems((prev) => prev.filter((item) => item.id !== itemId))
      toast({
        title: t('wishlist.removed') || 'Removed from Wishlist',
        description: `${productName} ${t('wishlist.removedDesc') || 'has been removed from your wishlist'}`,
      })
    } catch (err) {
      toast({
        title: t('wishlist.error') || 'Error',
        description: err instanceof Error ? err.message : 'Failed to remove item',
        variant: 'destructive',
      })
    } finally {
      setRemovingIds((prev) => {
        const next = new Set(prev)
        next.delete(itemId)
        return next
      })
    }
  }

  const handleAddToCart = (product: WishlistItem['product']) => {
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      comparePrice: product.comparePrice,
      images: product.images,
      category: product.category,
    }
    addItem(cartProduct)
    openCart()
    toast({
      title: t('cart.added') || 'Added to Cart',
      description: `${product.name} ${t('cart.addedDesc') || 'has been added to your cart'}`,
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button asChild variant="outline">
            <Link href="/account">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('account.backToAccount') || 'Back to Account'}
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/account">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{t('wishlist.title') || 'My Wishlist'}</h1>
            <p className="text-muted-foreground mt-1">
              {t('wishlist.description') || 'Your saved favorite products'}
            </p>
          </div>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <Card>
          <CardContent className="pt-12 pb-12">
            <div className="text-center">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">{t('wishlist.empty') || 'Your wishlist is empty'}</p>
              <p className="text-sm text-muted-foreground mb-6">
                {t('wishlist.emptyDesc') || 'Start adding products to your wishlist to save them for later'}
              </p>
              <Button asChild variant="gradient">
                <Link href="/products">{t('cart.browse') || 'Browse Products'}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                {t('wishlist.title') || 'My Wishlist'}
                <Badge variant="secondary" className="ml-2">
                  {wishlistItems.length} {t('common.items') || 'items'}
                </Badge>
              </CardTitle>
              <CardDescription>{t('wishlist.description') || 'Your saved favorite products'}</CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => {
              const discount = calculateDiscount(item.product.price, item.product.comparePrice || 0)
              const isRemoving = removingIds.has(item.id)

              return (
                <Card key={item.id} className="group relative overflow-hidden">
                  <Link href={`/products/${item.product.slug}`}>
                    <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                      {item.product.images[0] ? (
                        <SafeImage
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <Badge variant={productStatusColors[item.product.status]}>
                          {productStatusLabels[item.product.status]}
                        </Badge>
                        {discount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            -{discount}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Link>

                  <CardContent className="p-4">
                    {/* Category */}
                    <p className="text-xs text-muted-foreground mb-1">{item.product.category.name}</p>

                    {/* Title */}
                    <Link href={`/products/${item.product.slug}`}>
                      <h3 className="font-semibold line-clamp-2 mb-2 hover:text-primary transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(item.product.price)}
                      </span>
                      {item.product.comparePrice && item.product.comparePrice > item.product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(item.product.comparePrice)}
                        </span>
                      )}
                    </div>

                    {/* Date Added */}
                    <p className="text-xs text-muted-foreground mb-4">
                      {t('wishlist.addedOn') || 'Added on'} {formatDate(item.createdAt)}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          handleAddToCart(item.product)
                        }}
                        size="sm"
                        variant="default"
                        className="flex-1"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {t('cart.add')}
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          handleRemoveFromWishlist(item.id, item.product.name)
                        }}
                        size="sm"
                        variant="outline"
                        disabled={isRemoving}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button asChild size="sm" variant="ghost">
                        <Link href={`/products/${item.product.slug}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
