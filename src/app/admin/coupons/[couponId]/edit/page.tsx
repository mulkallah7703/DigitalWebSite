import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { CouponForm } from '../../_components/coupon-form'

async function getCoupon(couponId: string) {
  const coupon = await db.coupon.findUnique({
    where: { id: couponId },
    include: { products: { select: { productId: true } } },
  })

  if (!coupon) {
    return null
  }

  return coupon
}

export default async function EditCouponPage({
  params,
}: {
  params: Promise<{ couponId: string }>
}) {
  const { couponId } = await params
  const coupon = await getCoupon(couponId)

  if (!coupon) {
    redirect('/admin/coupons')
  }

  const products = await db.product.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })

  return <CouponForm coupon={coupon} products={products} />
}
