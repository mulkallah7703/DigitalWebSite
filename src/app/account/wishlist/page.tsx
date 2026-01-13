import { redirect } from 'next/navigation'
import { getAuth } from '@/lib/auth'
import { WishlistPageContent } from './wishlist-content'

export default async function WishlistPage() {
  const session = await getAuth()

  if (!session?.user) {
    redirect('/auth/login?callbackUrl=/account/wishlist')
  }

  return <WishlistPageContent />
}
