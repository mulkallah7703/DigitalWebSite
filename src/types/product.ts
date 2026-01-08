import { Decimal } from "@prisma/client/runtime/library"

export type FeaturedProduct = {
  id: string
  name: string
  slug: string
  price: Decimal
  comparePrice: Decimal | null
  featured: boolean
  rating: Decimal
  reviewCount: number
  images: {
    id: string
    url: string
    alt: string | null
  }[]
  category: {
    id: string
    name: string
    slug: string
  }
}
