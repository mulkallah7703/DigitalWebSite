import { db, safeDb, serializeProducts } from '@/lib/db'
import { ProductCard } from './product-card'
import { ProductsGridEmpty } from './products-grid-empty'
import { ProductsGridHeader } from './products-grid-header'
import { Pagination } from '@/components/ui/pagination'
import type { Prisma } from '@prisma/client'

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

function finiteNumber(value: string | undefined): number | undefined {
  if (!value) return undefined
  const n = Number(value)
  return Number.isFinite(n) ? n : undefined
}

export async function ProductsGrid({ searchParams }: ProductsGridProps) {
  const parsedPage = parseInt(searchParams.page || '1', 10)
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1
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

  const minPrice = finiteNumber(searchParams.minPrice)
  const maxPrice = finiteNumber(searchParams.maxPrice)
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {}
    if (minPrice !== undefined) where.price.gte = minPrice
    if (maxPrice !== undefined) where.price.lte = maxPrice
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

  const [products, total] = await safeDb('products-grid', () => Promise.all([
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
  ]), [[], 0] as const)

  const plainProducts = serializeProducts(products)

  const totalPages = Math.ceil(total / limit)

  if (plainProducts.length === 0) {
    return <ProductsGridEmpty />
  }

  return (
    <div>
      {/* Results Count */}
      <ProductsGridHeader skip={skip} limit={limit} total={total} />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plainProducts.map((product) => (
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
