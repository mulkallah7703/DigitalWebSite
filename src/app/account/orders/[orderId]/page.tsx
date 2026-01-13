import { redirect } from 'next/navigation'
import { getAuth } from '@/lib/auth'
import { OrderDetailsContent } from './order-details-content'

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const session = await getAuth()

  if (!session?.user) {
    redirect('/auth/login?callbackUrl=/account/orders')
  }

  const { orderId } = await params

  return <OrderDetailsContent orderId={orderId} />
}
