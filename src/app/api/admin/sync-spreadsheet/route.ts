export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

import { NextResponse } from 'next/server';

export async function POST() {
  return handler();
}

async function handler() {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json(
      { skipped: true, message: 'Skipped during build' },
      { status: 200 }
    );
  }

  try {
    const { requireAdmin } = await import('@/lib/auth');
    const { syncProductsFromSpreadsheet } = await import('@/lib/spreadsheet');

    await requireAdmin();

    const result = await syncProductsFromSpreadsheet();

    return NextResponse.json({
      message: 'Sync completed successfully',
      ...result,
    });
  } catch (error) {
    console.error('Spreadsheet sync error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Sync failed',
      },
      { status: 500 }
    );
  }
}
