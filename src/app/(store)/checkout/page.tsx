'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SafeImage } from '@/components/ui/safe-image'
import { motion } from 'framer-motion'
import { ShoppingBag, Trash2, ArrowLeft, Lock, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/store/cart-store'
import { useToast } from '@/hooks/use-toast'
import { formatPrice } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const { items, removeItem, getTotal, clearCart } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const total = getTotal()

  const getExternalPurchaseLink = () => {
    const match = items.find((item) => item.product.externalPurchaseLink?.trim())
    return match?.product.externalPurchaseLink?.trim() || null
  }

  const handleExternalPurchase = () => {
    if (items.length === 0) {
      toast({
        title: t('checkout.cartEmpty'),
        description: t('checkout.addProducts'),
        variant: 'destructive',
      })
      return
    }

    const purchaseLink = getExternalPurchaseLink()
    if (!purchaseLink) {
      toast({
        title: t('checkout.failed'),
        description: t('checkout.missingLink'),
        variant: 'destructive',
      })
      return
    }

    window.location.href = purchaseLink
  }

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: t('checkout.cartEmpty'),
        description: t('checkout.addProducts'),
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t('checkout.failed'))
      }

      // Redirect to Stripe checkout
      window.location.href = data.url
    } catch (error) {
      toast({
        title: t('checkout.failed'),
        description: error instanceof Error ? error.message : t('checkout.failed'),
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{t('checkout.empty')}</h1>
          <p className="text-muted-foreground mb-6">
            {t('checkout.emptyDesc')}
          </p>
          <Button asChild variant="gradient">
            <Link href="/products">{t('cart.browse')}</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/products">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{t('checkout.title')}</h1>
            <p className="text-muted-foreground">{t('checkout.desc')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                        {item.product.images?.[0] ? (
                          <SafeImage
                            src={item.product.images[0].url}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            fallbackIcon={<ShoppingBag className="w-8 h-8 text-muted-foreground" />}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-semibold hover:text-primary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.product.category.name}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(item.product.price)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.productId)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            {t('checkout.remove')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('common.subtotal')}</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('common.tax')}</span>
                    <span>$0.00</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>{t('common.total')}</span>
                  <span className="gradient-text">{formatPrice(total)}</span>
                </div>

                <Button
                  onClick={handleExternalPurchase}
                  className="w-full"
                  variant="gradient"
                  size="lg"
                  loading={isLoading}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {t('checkout.payStripe')}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="w-3 h-3" />
                  <span>{t('checkout.secure')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
