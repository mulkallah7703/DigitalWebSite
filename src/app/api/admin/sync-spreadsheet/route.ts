export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { syncProductsFromSpreadsheet } from '@/lib/spreadsheet'

export async function POST() {
  // Prevent execution during build phase
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ message: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    await requireAdmin()

    const result = await syncProductsFromSpreadsheet()

    return NextResponse.json({
      message: 'Sync completed successfully',
      ...result,
    })
  } catch (error) {
    console.error('Spreadsheet sync error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Sync failed',
      },
      { status: 500 }
    )
  }
}
