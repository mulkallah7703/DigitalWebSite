import { db } from './db'

export type AutomaticCoupon = {
  id: string
  discountType: 'PERCENTAGE' | 'FIXED'
  discountValue: number
  minPurchase: number | null
  maxDiscount: number | null
  usageLimit: number | null
  usageCount: number
  startDate: Date | string | null
  endDate: Date | string | null
  active: boolean
  productIds: string[]
}

export type PricedLine = {
  productId: string
  name: string
  quantity: number
  originalPrice: number
  unitPrice: number
  discountAmount: number
  discountPercent: number
  couponId: string | null
}

export function roundMoney(value: number) {
  return Math.round(value * 100) / 100
}

export function isCouponCurrentlyValid(coupon: AutomaticCoupon, now = new Date()) {
  if (!coupon.active) return false
  if (coupon.productIds.length === 0) return false
  if (coupon.usageLimit != null && coupon.usageCount >= coupon.usageLimit) return false
  if (coupon.startDate && new Date(coupon.startDate) > now) return false
  if (coupon.endDate && new Date(coupon.endDate) < now) return false
  return true
}

export function couponDiscountAmount(price: number, coupon: AutomaticCoupon) {
  if (!Number.isFinite(price) || price <= 0) return 0
  if (coupon.minPurchase != null && price < Number(coupon.minPurchase)) return 0

  let amount = 0
  if (coupon.discountType === 'PERCENTAGE') {
    amount = price * (Number(coupon.discountValue) / 100)
    if (coupon.maxDiscount != null && amount > Number(coupon.maxDiscount)) {
      amount = Number(coupon.maxDiscount)
    }
  } else {
    amount = Number(coupon.discountValue)
  }

  if (!Number.isFinite(amount) || amount <= 0) return 0
  return roundMoney(Math.min(amount, price))
}

export function bestProductPrice(price: number, productId: string, coupons: AutomaticCoupon[], now = new Date()) {
  const listPrice = Number.isFinite(price) ? roundMoney(price) : 0
  let salePrice = listPrice
  let couponId: string | null = null
  let discountAmount = 0

  for (const coupon of coupons) {
    if (!coupon.productIds.includes(productId)) continue
    if (!isCouponCurrentlyValid(coupon, now)) continue
    const discount = couponDiscountAmount(listPrice, coupon)
    const next = roundMoney(listPrice - discount)
    if (discount > 0 && next < salePrice) {
      salePrice = next
      couponId = coupon.id
      discountAmount = discount
    }
  }

  const discountPercent = listPrice > 0 && discountAmount > 0
    ? Math.round((discountAmount / listPrice) * 100)
    : 0

  return { salePrice, discountAmount, discountPercent, couponId }
}

export async function loadAutomaticCoupons(now = new Date()): Promise<AutomaticCoupon[]> {
  const rows = await db.coupon.findMany({
    where: {
      active: true,
      products: { some: {} },
    },
    include: {
      products: { select: { productId: true } },
    },
  })

  return rows
    .map((row) => ({
      id: row.id,
      discountType: row.discountType,
      discountValue: Number(row.discountValue),
      minPurchase: row.minPurchase == null ? null : Number(row.minPurchase),
      maxDiscount: row.maxDiscount == null ? null : Number(row.maxDiscount),
      usageLimit: row.usageLimit,
      usageCount: row.usageCount,
      startDate: row.startDate,
      endDate: row.endDate,
      active: row.active,
      productIds: row.products.map((link) => link.productId),
    }))
    .filter((coupon) => isCouponCurrentlyValid(coupon, now))
}

export async function withAutomaticPrices<T extends { id: string; price?: unknown }>(products: T[]) {
  if (products.length === 0) return products.map((product) => ({ ...product, salePrice: null as number | null, discountPercent: 0 }))
  try {
    const coupons = await loadAutomaticCoupons()
    return products.map((product) => {
      const price = Number(product.price)
      const deal = bestProductPrice(price, product.id, coupons)
      const discounted = deal.discountAmount > 0 && deal.salePrice < price
      return {
        ...product,
        salePrice: discounted ? deal.salePrice : null,
        discountPercent: discounted ? deal.discountPercent : 0,
      }
    })
  } catch (error) {
    console.error('[product-discount]', error)
    return products.map((product) => ({ ...product, salePrice: null as number | null, discountPercent: 0 }))
  }
}

export async function priceOrderLines(items: { productId: string; quantity: number }[]) {
  const productIds = items.map((item) => item.productId)
  const products = await db.product.findMany({
    where: { id: { in: productIds }, status: 'PUBLISHED' },
  })

  if (products.length !== new Set(productIds).size) {
    return null
  }

  const coupons = await loadAutomaticCoupons().catch((error) => {
    console.error('[product-discount]', error)
    return [] as AutomaticCoupon[]
  })

  const lines: PricedLine[] = items.map((item) => {
    const product = products.find((row) => row.id === item.productId)!
    const originalPrice = roundMoney(Number(product.price))
    const deal = bestProductPrice(originalPrice, product.id, coupons)
    return {
      productId: product.id,
      name: product.name,
      quantity: item.quantity,
      originalPrice,
      unitPrice: deal.salePrice,
      discountAmount: roundMoney(deal.discountAmount * item.quantity),
      discountPercent: deal.discountPercent,
      couponId: deal.couponId,
    }
  })

  const subtotal = roundMoney(lines.reduce((sum, line) => sum + line.originalPrice * line.quantity, 0))
  const total = roundMoney(lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0))
  const discount = roundMoney(subtotal - total)
  const couponTotals = new Map<string, number>()
  for (const line of lines) {
    if (!line.couponId || line.discountAmount <= 0) continue
    couponTotals.set(line.couponId, (couponTotals.get(line.couponId) || 0) + line.discountAmount)
  }
  const couponId = Array.from(couponTotals.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] || null

  return { lines, subtotal, total, discount, couponId, couponIds: Array.from(couponTotals.keys()) }
}
