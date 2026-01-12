import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { CategoryForm } from '../../_components/category-form'

async function getCategory(categoryId: string) {
  const category = await db.category.findUnique({
    where: { id: categoryId },
  })

  if (!category) {
    return null
  }

  return category
}

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>
}) {
  const { categoryId } = await params
  const category = await getCategory(categoryId)

  if (!category) {
    redirect('/admin/categories')
  }

  return <CategoryForm category={category} />
}
