'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff, Folder } from 'lucide-react'
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
import { formatDate } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'
import { useToast } from '@/hooks/use-toast'
import type { Category } from '@prisma/client'

type CategoryWithCount = Category & {
  _count: { products: number }
}

interface CategoriesTableProps {
  categories: CategoryWithCount[]
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(search.toLowerCase()) ||
      category.slug.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (categoryId: string, categoryName: string, productCount: number) => {
    if (productCount > 0) {
      toast({
        title: t('admin.error') || 'Error',
        description: `Cannot delete category "${categoryName}". It has ${productCount} product(s) associated with it.`,
        variant: 'destructive',
      })
      return
    }

    if (!confirm(t('admin.confirmDelete') || `Are you sure you want to delete "${categoryName}"?`)) {
      return
    }

    setDeletingId(categoryId)
    try {
      const response = await fetch(`/api/admin/categories?id=${categoryId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete category')
      }

      toast({
        title: t('admin.categoryDeleted') || 'Category Deleted',
        description: t('admin.categoryDeletedDesc') || 'Category has been deleted successfully',
      })

      router.refresh()
    } catch (error) {
      toast({
        title: t('admin.error') || 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete category',
        variant: 'destructive',
      })
    } finally {
      setDeletingId(null)
    }
  }

  const handleEdit = (categoryId: string) => {
    router.push(`/admin/categories/${categoryId}/edit`)
  }

  const handleToggleVisibility = async (categoryId: string, currentVisible: boolean) => {
    setTogglingId(categoryId)
    try {
      const category = categories.find((c) => c.id === categoryId)
      if (!category) return

      const response = await fetch(`/api/admin/categories?id=${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: category.name,
          slug: category.slug,
          description: category.description,
          image: category.image,
          order: category.order,
          visible: !currentVisible,
          metaTitle: category.metaTitle,
          metaDescription: category.metaDescription,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update category')
      }

      toast({
        title: currentVisible
          ? (t('admin.categoryHidden') || 'Category Hidden')
          : (t('admin.categoryShown') || 'Category Shown'),
        description: currentVisible
          ? (t('admin.categoryHiddenDesc') || 'Category is now hidden from store')
          : (t('admin.categoryShownDesc') || 'Category is now visible in store'),
      })

      router.refresh()
    } catch (error) {
      toast({
        title: t('admin.error') || 'Error',
        description: error instanceof Error ? error.message : 'Failed to update category',
        variant: 'destructive',
      })
    } finally {
      setTogglingId(null)
    }
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder={t('admin.searchCategories') || 'Search categories...'}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('admin.name') || 'Name'}</TableHead>
              <TableHead>{t('admin.slug') || 'Slug'}</TableHead>
              <TableHead>{t('admin.products') || 'Products'}</TableHead>
              <TableHead>{t('admin.visibility') || 'Visibility'}</TableHead>
              <TableHead>{t('admin.order') || 'Order'}</TableHead>
              <TableHead>{t('admin.created') || 'Created'}</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  {t('admin.noCategories') || 'No categories found'}
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Folder className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">{category.name}</div>
                        {category.description && (
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {category.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-secondary px-2 py-1 rounded">
                      {category.slug}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{category._count.products}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={category.visible ? 'success' : 'secondary'}>
                      {category.visible
                        ? (t('admin.visible') || 'Visible')
                        : (t('admin.hidden') || 'Hidden')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{category.order}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(category.createdAt)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(category.id)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          {t('admin.edit') || 'Edit'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleVisibility(category.id, category.visible)}
                          disabled={togglingId === category.id}
                        >
                          {category.visible ? (
                            <>
                              <EyeOff className="w-4 h-4 mr-2" />
                              {togglingId === category.id
                                ? (t('admin.hiding') || 'Hiding...')
                                : (t('admin.hide') || 'Hide')}
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4 mr-2" />
                              {togglingId === category.id
                                ? (t('admin.showing') || 'Showing...')
                                : (t('admin.show') || 'Show')}
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleDelete(category.id, category.name, category._count.products)
                          }
                          disabled={deletingId === category.id || category._count.products > 0}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          {deletingId === category.id
                            ? (t('admin.deleting') || 'Deleting...')
                            : (t('admin.delete') || 'Delete')}
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
