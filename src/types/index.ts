import { Product, Category, ProductImage, ProductFile, Review, User, Order, OrderItem } from '@prisma/client'

export type ProductWithRelations = Product & {
  category: Category
  images: ProductImage[]
  files: ProductFile[]
  reviews?: Review[]
}

export type OrderWithRelations = Order & {
  user: User
  items: (OrderItem & {
    product: Product
  })[]
}

export type CategoryWithProducts = Category & {
  products: Product[]
  _count?: {
    products: number
  }
}

export type ReviewWithUser = Review & {
  user: Pick<User, 'id' | 'name' | 'image'>
}

export interface CartItemType {
  id: string
  productId: string
  quantity: number
  product: ProductWithRelations
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface SearchFilters {
  query?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular' | 'rating'
  tags?: string[]
}

export interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalUsers: number
  revenueChange: number
  ordersChange: number
  recentOrders: OrderWithRelations[]
  topProducts: ProductWithRelations[]
  salesByCategory: { name: string; value: number }[]
  revenueByMonth: { month: string; revenue: number }[]
}

export interface AIRecommendation {
  productId: string
  score: number
  reason: string
}

export interface SpreadsheetProduct {
  rowId: string
  name: string
  description: string
  price: number
  comparePrice?: number
  category: string
  tags: string[]
  images: string[]
  fileUrl: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
}
