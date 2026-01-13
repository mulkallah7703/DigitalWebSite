import { redirect } from 'next/navigation'
import { getAuth } from '@/lib/auth'
import { AccountContent } from './account-content'

export default async function AccountPage() {
  const session = await getAuth()

  if (!session?.user) {
    redirect('/auth/login?callbackUrl=/account')
  }

  return <AccountContent />
}
