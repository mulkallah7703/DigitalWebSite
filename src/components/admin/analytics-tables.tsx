'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'

interface AnalyticsTablesProps {
  bestSellingProducts: Array<{
    productId: string
    productName: string
    productSlug: string
    quantity: number
    revenue: number
    orderCount: number
  }>
  topCustomers: Array<{
    userId: string
    userName: string | null
    userEmail: string | null
    totalSpent: number
    orderCount: number
  }>
  mostViewedProducts: Array<{
    id: string
    name: string
    slug: string
    viewCount: number
    salesCount: number
    price: number
  }>
  featuredProducts: Array<{
    id: string
    name: string
    slug: string
    salesCount: number
    viewCount: number
    revenue: number
  }>
}

export function AnalyticsTables({
  bestSellingProducts,
  topCustomers,
  mostViewedProducts,
  featuredProducts,
}: AnalyticsTablesProps) {
  const { t } = useLanguage()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Best Selling Products */}
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.bestSellingProducts') || 'Best Selling Products'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.product') || 'Product'}</TableHead>
                <TableHead>{t('admin.quantity') || 'Qty'}</TableHead>
                <TableHead className="text-right">{t('admin.revenue') || 'Revenue'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bestSellingProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    {t('admin.noData') || 'No data available'}
                  </TableCell>
                </TableRow>
              ) : (
                bestSellingProducts.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>
                      <Link
                        href={`/products/${item.productSlug}`}
                        className="hover:underline font-medium"
                      >
                        {item.productName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.quantity}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatPrice(item.revenue)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Top Customers */}
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.topCustomers') || 'Top Customers'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.customer') || 'Customer'}</TableHead>
                <TableHead>{t('admin.orders') || 'Orders'}</TableHead>
                <TableHead className="text-right">{t('admin.totalSpent') || 'Total Spent'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    {t('admin.noData') || 'No data available'}
                  </TableCell>
                </TableRow>
              ) : (
                topCustomers.map((customer) => (
                  <TableRow key={customer.userId}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.userName || 'N/A'}</div>
                        <div className="text-xs text-muted-foreground">{customer.userEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{customer.orderCount}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatPrice(customer.totalSpent)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Most Viewed Products */}
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.mostViewedProducts') || 'Most Viewed Products'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.product') || 'Product'}</TableHead>
                <TableHead className="text-right">{t('admin.views') || 'Views'}</TableHead>
                <TableHead className="text-right">{t('admin.sales') || 'Sales'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mostViewedProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    {t('admin.noData') || 'No data available'}
                  </TableCell>
                </TableRow>
              ) : (
                mostViewedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Link
                        href={`/products/${product.slug}`}
                        className="hover:underline font-medium"
                      >
                        {product.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{product.viewCount}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="success">{product.salesCount}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Featured Products Performance */}
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.featuredProductsPerformance') || 'Featured Products Performance'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.product') || 'Product'}</TableHead>
                <TableHead className="text-right">{t('admin.sales') || 'Sales'}</TableHead>
                <TableHead className="text-right">{t('admin.revenue') || 'Revenue'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {featuredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    {t('admin.noFeaturedProducts') || 'No featured products'}
                  </TableCell>
                </TableRow>
              ) : (
                featuredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Link
                        href={`/products/${product.slug}`}
                        className="hover:underline font-medium"
                      >
                        {product.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{product.salesCount}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatPrice(product.revenue)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
