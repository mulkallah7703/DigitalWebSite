'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CategoriesTable } from '@/components/admin/categories-table'
import type { Category } from '@prisma/client'

type CategoryWithCount = Category & {
  _count: { products: number }
}

interface CategoriesContentProps {
  categories: CategoryWithCount[]
}

export function CategoriesContent({ categories }: CategoriesContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground">Manage your product categories</p>
        </div>
        <Button asChild variant="gradient">
          <Link href="/admin/categories/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Link>
        </Button>
      </div>

      <CategoriesTable categories={categories} />
    </div>
  )
}
