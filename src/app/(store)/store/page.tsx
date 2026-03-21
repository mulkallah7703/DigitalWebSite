import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturedProducts } from '@/components/home/featured-products'
import { CategoriesSection } from '@/components/home/categories-section'
import { Skeleton } from '@/components/ui/skeleton'
import { getFeaturedProducts, getCategories } from '@/lib/cache'

const FeaturesSection = dynamic(() => import('@/components/home/features-section').then(mod => ({ default: mod.FeaturesSection })), {
  loading: () => <div className="py-16 lg:py-24" />,
})

const CTASection = dynamic(() => import('@/components/home/cta-section').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-16 lg:py-24" />,
})

export const revalidate = 300

function ProductsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-2xl border bg-card overflow-hidden">
            <Skeleton className="aspect-[4/3]" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function StoreHomePage() {
  const [products, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ])

  return (
    <>
      <HeroSection />
      <Suspense fallback={<ProductsSkeleton />}>
        <FeaturedProducts products={products} />
      </Suspense>
      <CategoriesSection categories={categories} />
      <FeaturesSection />
      <CTASection />
    </>
  )
}
