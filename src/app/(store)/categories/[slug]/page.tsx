import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { ProductsGrid } from '@/components/products/products-grid'
import { ProductsFilter } from '@/components/products/products-filter'
import { getCategoriesForFilter } from '@/lib/cache'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: {
    page?: string
    search?: string
    sortBy?: string
    minPrice?: string
    maxPrice?: string
  }
}

// Generate static params for visible categories
export async function generateStaticParams() {
  const categories = await db.category.findMany({
    where: { 
      visible: true,
      parentId: null,
    },
    select: { slug: true },
    take: 100,
  })
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

// ISR with 5 minute revalidation
export const revalidate = 300

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await db.category.findUnique({
    where: { slug, visible: true },
    select: {
      name: true,
      description: true,
      metaTitle: true,
      metaDescription: true,
    },
  })

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: category.metaTitle || category.name,
    description: category.metaDescription || category.description || `Browse ${category.name} products`,
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params
  const categories = await getCategoriesForFilter()

  // Fetch category
  const category = await db.category.findUnique({
    where: { slug, visible: true },
    select: {
      id: true,
      name: true,
      description: true,
      metaTitle: true,
      metaDescription: true,
    },
  })

  if (!category) {
    notFound()
  }

  // Merge category filter with existing search params
  const mergedSearchParams = {
    ...searchParams,
    category: slug,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-muted-foreground text-lg">
            {category.description}
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <ProductsFilter categories={categories} />
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <ProductsGrid searchParams={mergedSearchParams} />
        </div>
      </div>
    </div>
  )
}
