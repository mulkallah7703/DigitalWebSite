import { db } from '@/lib/db'
import { AddProductForm } from './add-product-form'

export const dynamic = 'force-dynamic'

async function getCategories() {
  return db.category.findMany({
    orderBy: { name: 'asc' },
  })
}

export default async function NewProductPage() {
  const categories = await getCategories()

  return <AddProductForm categories={categories} />
}
