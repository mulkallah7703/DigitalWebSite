import { redirect } from 'next/navigation'
import { getAuth } from '@/lib/auth'
import { OrdersPageContent } from './orders-content'

export default async function OrdersPage() {
  const session = await getAuth()

  if (!session?.user) {
    redirect('/auth/login?callbackUrl=/account/orders')
  }

  return <OrdersPageContent />
}
