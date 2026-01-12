'use client'

import { OrdersTable } from '@/components/admin/orders-table'
import type { Order, OrderItem, User, Product, PaymentStatus, OrderStatus } from '@prisma/client'

type OrderWithRelations = Order & {
  user: Pick<User, 'id' | 'name' | 'email'>
  items: (OrderItem & {
    product: Pick<Product, 'id' | 'name' | 'slug'>
  })[]
  _count: { items: number }
}

interface OrdersContentProps {
  orders: OrderWithRelations[]
}

export function OrdersContent({ orders }: OrdersContentProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">View and manage customer orders</p>
      </div>

      <OrdersTable orders={orders} />
    </div>
  )
}
