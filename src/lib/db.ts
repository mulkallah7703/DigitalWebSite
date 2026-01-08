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

// Helper to serialize Prisma Decimal values to plain numbers
export function serializeProduct<T extends { price?: unknown; comparePrice?: unknown; rating?: unknown }>(
  product: T
): T {
  return {
    ...product,
    price: product.price ? Number(product.price) : undefined,
    comparePrice: product.comparePrice ? Number(product.comparePrice) : undefined,
    rating: product.rating ? Number(product.rating) : undefined,
  } as T
}

export function serializeProducts<T extends { price?: unknown; comparePrice?: unknown; rating?: unknown }>(
  products: T[]
): T[] {
  return products.map(serializeProduct)
}
