import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { AddProductForm } from '../../new/add-product-form'

async function getCategories() {
  return db.category.findMany({
    orderBy: { name: 'asc' },
  })
}

async function getProduct(productId: string) {
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      category: true,
      images: {
        orderBy: { order: 'asc' },
      },
    },
  })

  if (!product) {
    return null
  }

  return product
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params
  const [categories, product] = await Promise.all([
    getCategories(),
    getProduct(productId),
  ])

  if (!product) {
    redirect('/admin/products')
  }

  return <AddProductForm categories={categories} product={product} />
}
