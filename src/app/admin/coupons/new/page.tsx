import { db } from '@/lib/db'
import { CouponForm } from '../_components/coupon-form'

export default async function NewCouponPage() {
  const products = await db.product.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })

  return <CouponForm products={products} />
}
