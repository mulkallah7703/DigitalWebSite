'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SafeImage } from '@/components/ui/safe-image'
import { MoreHorizontal, Pencil, Trash2, Eye, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatPrice, formatDate } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'
import { useToast } from '@/hooks/use-toast'
import type { Product, Category, ProductImage } from '@prisma/client'

type ProductWithRelations = Product & {
  category: Category
  images: ProductImage[]
  _count: { orderItems: number }
}

interface ProductsTableProps {
  products: ProductWithRelations[]
}

const statusColors: Record<string, 'default' | 'secondary' | 'success' | 'warning'> = {
  DRAFT: 'secondary',
  PUBLISHED: 'success',
  ARCHIVED: 'warning',
}

export function ProductsTable({ products }: ProductsTableProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (productId: string) => {
    if (!confirm(t('admin.confirmDelete') || 'Are you sure you want to delete this product?')) {
      return
    }

    setDeletingId(productId)
    try {
      const response = await fetch(`/api/admin/products?id=${productId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete product')
      }

      toast({
        title: t('admin.productDeleted') || 'Product Deleted',
        description: t('admin.productDeletedDesc') || 'Product has been deleted successfully',
      })

      router.refresh()
    } catch (error) {
      toast({
        title: t('admin.error') || 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete product',
        variant: 'destructive',
      })
    } finally {
      setDeletingId(null)
    }
  }

  const handleEdit = (productId: string) => {
    router.push(`/admin/products/new?edit=${productId}`)
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder={t('admin.searchProducts')}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('admin.product')}</TableHead>
              <TableHead>{t('admin.category')}</TableHead>
              <TableHead>{t('admin.price')}</TableHead>
              <TableHead>{t('admin.status')}</TableHead>
              <TableHead>{t('common.sales')}</TableHead>
              <TableHead>{t('admin.created')}</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  {t('admin.noProducts')}
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-secondary">
                        {product.images[0] ? (
                          <SafeImage
                            src={product.images[0].url}
                            alt={product.name}
                            fill
                            className="object-cover"
                            fallbackIcon={<Package className="w-6 h-6 text-muted-foreground" />}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.slug}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{formatPrice(Number(product.price))}</p>
                      {product.comparePrice && (
                        <p className="text-xs text-muted-foreground line-through">
                          {formatPrice(Number(product.comparePrice))}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[product.status]}>{product.status}</Badge>
                  </TableCell>
                  <TableCell>{product._count.orderItems}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDate(product.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/products/${product.slug}`} target="_blank">
                            <Eye className="w-4 h-4 mr-2" />
                            {t('admin.view')}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEdit(product.id)}
                          disabled={deletingId === product.id}
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          {t('admin.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(product.id)}
                          disabled={deletingId === product.id}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          {deletingId === product.id ? t('admin.deleting') || 'Deleting...' : t('admin.delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
