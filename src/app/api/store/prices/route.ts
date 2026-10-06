export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withAutomaticPrices } from '@/lib/product-discount'

export async function GET(req: Request) {
  const ids = new URL(req.url).searchParams.get('ids')?.split(',').map((id) => id.trim()).filter(Boolean) || []
  if (ids.length === 0 || ids.length > 50) {
    return NextResponse.json({ prices: [] })
  }

  try {
    const products = await db.product.findMany({
      where: { id: { in: ids }, status: 'PUBLISHED' },
      select: { id: true, price: true },
    })
    const priced = await withAutomaticPrices(products.map((product) => ({
      id: product.id,
      price: Number(product.price),
    })))
    return NextResponse.json({
      prices: priced.map((product) => ({
        id: product.id,
        price: Number(product.price),
        salePrice: product.salePrice,
        discountPercent: product.discountPercent,
      })),
    })
  } catch (error) {
    console.error('[store prices]', error)
    return NextResponse.json({ prices: [] })
  }
}
