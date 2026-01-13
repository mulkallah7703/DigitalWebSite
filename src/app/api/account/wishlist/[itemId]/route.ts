export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function DELETE(
  req: Request,
  context: { params: { itemId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { itemId } = context.params

    // First, verify the wishlist item belongs to the current user
    const wishlistItem = await db.wishlistItem.findUnique({
      where: { id: itemId },
      select: { userId: true },
    })

    if (!wishlistItem) {
      return NextResponse.json({ error: 'Wishlist item not found' }, { status: 404 })
    }

    // Security check: ensure the item belongs to the current user
    if (wishlistItem.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Delete the wishlist item
    await db.wishlistItem.delete({
      where: { id: itemId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Wishlist delete error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to remove from wishlist' },
      { status: 500 }
    )
  }
}
