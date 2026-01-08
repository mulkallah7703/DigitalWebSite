import { db } from '@/lib/db'
import { ProductCard } from './product-card'
import { ProductsGridEmpty } from './products-grid-empty'
import { ProductsGridHeader } from './products-grid-header'
import { Pagination } from '@/components/ui/pagination'
import { Prisma } from '@prisma/client'

interface ProductsGridProps {
  searchParams: {
    page?: string
    category?: string
    search?: string
    sortBy?: string
    minPrice?: string
    maxPrice?: string
  }
}

export async function ProductsGrid({ searchParams }: ProductsGridProps) {
  const page = parseInt(searchParams.page || '1')
  const limit = 12
  const skip = (page - 1) * limit

  // Build where clause
  const where: Prisma.ProductWhereInput = {
    status: 'PUBLISHED',
  }

  if (searchParams.category) {
    where.category = { slug: searchParams.category }
  }

  if (searchParams.search) {
    where.OR = [
      { name: { contains: searchParams.search, mode: 'insensitive' } },
      { description: { contains: searchParams.search, mode: 'insensitive' } },
    ]
  }

  if (searchParams.minPrice || searchParams.maxPrice) {
    where.price = {}
    if (searchParams.minPrice) where.price.gte = parseFloat(searchParams.minPrice)
    if (searchParams.maxPrice) where.price.lte = parseFloat(searchParams.maxPrice)
  }

  // Build orderBy
  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' }
  
  switch (searchParams.sortBy) {
    case 'price-asc':
      orderBy = { price: 'asc' }
      break
    case 'price-desc':
      orderBy = { price: 'desc' }
      break
    case 'popular':
      orderBy = { salesCount: 'desc' }
      break
    case 'rating':
      orderBy = { rating: 'desc' }
      break
  }

  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      include: {
        category: true,
        images: {
          orderBy: { order: 'asc' },
          take: 1,
        },
      },
      orderBy,
      skip,
      take: limit,
    }),
    db.product.count({ where }),
  ])

  const totalPages = Math.ceil(total / limit)

  if (products.length === 0) {
    return <ProductsGridEmpty />
  }

  return (
    <div>
      {/* Results Count */}
      <ProductsGridHeader skip={skip} limit={limit} total={total} />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}
