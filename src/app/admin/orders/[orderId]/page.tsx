import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { db } from '@/lib/db'
import { OrderDetails } from './order-details'

export const metadata: Metadata = {
  title: 'Order Details',
  description: 'View and manage order details',
}

async function getOrder(orderId: string) {
  const order = await db.order.findUnique({
    where: { id: orderId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              price: true,
              images: {
                select: {
                  url: true,
                },
                take: 1,
                orderBy: { order: 'asc' },
              },
            },
          },
        },
      },
      coupon: {
        select: {
          id: true,
          code: true,
          discountType: true,
          discountValue: true,
        },
      },
    },
  })

  return order
}

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const { orderId } = await params
  const order = await getOrder(orderId)

  if (!order) {
    notFound()
  }

  return <OrderDetails order={order} />
}
