'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatPrice, formatRelativeDate, getInitials } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'
import type { OrderWithRelations } from '@/types'

interface RecentOrdersProps {
  orders: OrderWithRelations[]
}

const statusColors: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'destructive'> = {
  PENDING: 'warning',
  PROCESSING: 'secondary',
  COMPLETED: 'success',
  CANCELLED: 'destructive',
  REFUNDED: 'destructive',
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const { t } = useLanguage()
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('admin.recentOrders')}</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/orders">
            {t('admin.viewAll')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">{t('admin.noOrders')}</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={order.user.image || ''} />
                    <AvatarFallback>{getInitials(order.user.name || 'U')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.user.name || order.customerEmail}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(Number(order.total))}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={statusColors[order.status]}>{order.status}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatRelativeDate(order.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
