import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { db } from '@/lib/db'
import { UserDetails } from './user-details'

export const metadata: Metadata = {
  title: 'User Details',
  description: 'View and manage user details',
}

async function getUser(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      _count: {
        select: {
          orders: true,
          reviews: true,
          wishlist: true,
        },
      },
      orders: {
        select: {
          id: true,
          orderNumber: true,
          total: true,
          status: true,
          paymentStatus: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  })

  if (!user) {
    return null
  }

  // Calculate total spent
  const totalSpentResult = await db.order.aggregate({
    where: {
      userId: user.id,
      paymentStatus: 'PAID',
    },
    _sum: {
      total: true,
    },
  })

  const totalSpent = Number(totalSpentResult._sum.total || 0)

  return {
    ...user,
    totalSpent,
  }
}

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
  const user = await getUser(userId)

  if (!user) {
    notFound()
  }

  return <UserDetails user={user} />
}
