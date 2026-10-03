import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Singleton pattern - prevents multiple instances but allows lazy initialization
// Client is only created when db is first accessed (runtime, not build time)
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}

function decimalToNumber(value: unknown): number | null | undefined {
  if (value === null || value === undefined) return value as null | undefined
  const n = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(n) ? n : 0
}

// Helper to serialize Prisma Decimal values to plain numbers.
// A price or rating of 0 must stay 0; treating it as missing drops the field.
export function serializeProduct<T extends {
  price?: unknown
  comparePrice?: unknown
  rating?: unknown
  aiRecommendScore?: unknown
}>(
  product: T
): T {
  return {
    ...product,
    price: decimalToNumber(product.price) ?? 0,
    comparePrice: product.comparePrice == null ? null : decimalToNumber(product.comparePrice),
    rating: decimalToNumber(product.rating) ?? 0,
    aiRecommendScore: product.aiRecommendScore == null ? product.aiRecommendScore : decimalToNumber(product.aiRecommendScore),
  } as T
}

// Pages should render an empty catalog when Postgres is down or the query fails.
export async function safeDb<T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    console.error(`[${label}]`, error)
    return fallback
  }
}

export function serializeProducts<T extends { price?: unknown; comparePrice?: unknown; rating?: unknown }>(
  products: T[]
): T[] {
  return products.map(serializeProduct)
}
