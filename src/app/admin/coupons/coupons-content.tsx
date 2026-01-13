'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CouponsTable } from '@/components/admin/coupons-table'
import type { Coupon } from '@prisma/client'

type CouponWithCount = Coupon & {
  _count: { orders: number }
}

interface CouponsContentProps {
  coupons: CouponWithCount[]
}

export function CouponsContent({ coupons }: CouponsContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Coupons</h1>
          <p className="text-muted-foreground">Manage discount coupons and promotions</p>
        </div>
        <Button asChild variant="gradient">
          <Link href="/admin/coupons/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Coupon
          </Link>
        </Button>
      </div>

      <CouponsTable coupons={coupons} />
    </div>
  )
}
