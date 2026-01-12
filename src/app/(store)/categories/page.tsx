import { Metadata } from 'next'
import { CategoryCard } from './category-card'
import { CategoriesHeader } from './categories-header'
import { db } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse our digital product categories',
}

async function getCategories() {
  return db.category.findMany({
    where: { 
      parentId: null,
      visible: true,
    },
    include: {
      _count: {
        select: { products: { where: { status: 'PUBLISHED' } } },
      },
    },
    orderBy: [
      { order: 'asc' },
      { name: 'asc' },
    ],
  })
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoriesHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}
