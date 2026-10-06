import { revalidatePath, revalidateTag } from 'next/cache'

export function revalidateStore(slugs: string[] = []) {
  revalidateTag('products')
  revalidateTag('featured-products')
  revalidateTag('coupons')
  revalidatePath('/products')
  revalidatePath('/store')
  revalidatePath('/categories')
  revalidatePath('/')
  for (const slug of slugs) {
    if (!slug) continue
    revalidateTag(`product-${slug}`)
    revalidatePath(`/products/${slug}`)
  }
}
