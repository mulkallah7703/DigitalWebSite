'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/components/providers/language-provider'
import { slugify } from '@/lib/utils'
import type { Category } from '@prisma/client'

const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  image: z.string().optional(),
  order: z.string().refine((val) => {
    const num = parseInt(val)
    return !isNaN(num) && num >= 0
  }, 'Order must be a valid number >= 0'),
  visible: z.boolean().default(true),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
})

type CategoryForm = z.infer<typeof categorySchema>

interface CategoryFormProps {
  category?: Category | null
}

export function CategoryForm({ category }: CategoryFormProps) {
  const isEditMode = !!category
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      image: '',
      order: '0',
      visible: true,
      metaTitle: '',
      metaDescription: '',
    },
  })

  const name = watch('name')
  const slug = watch('slug')
  const visible = watch('visible')
  const order = watch('order')

  // Auto-generate slug from name
  useEffect(() => {
    if (!isEditMode && name && !slug) {
      const generatedSlug = slugify(name)
      setValue('slug', generatedSlug)
    }
  }, [name, slug, isEditMode, setValue])

  // Load category data into form when in edit mode
  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        image: category.image || '',
        order: category.order.toString(),
        visible: category.visible,
        metaTitle: category.metaTitle || '',
        metaDescription: category.metaDescription || '',
      })
    }
  }, [category, reset])

  const onSubmit = async (data: CategoryForm) => {
    setIsLoading(true)
    try {
      const url = isEditMode
        ? `/api/admin/categories?id=${category?.id}`
        : '/api/admin/categories'
      const method = isEditMode ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          slug: data.slug,
          description: data.description || null,
          image: data.image || null,
          order: parseInt(data.order),
          visible: data.visible,
          metaTitle: data.metaTitle || null,
          metaDescription: data.metaDescription || null,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || `Failed to ${isEditMode ? 'update' : 'create'} category`)
      }

      toast({
        title: isEditMode
          ? (t('admin.categoryUpdated') || 'Category Updated')
          : (t('admin.categoryCreated') || 'Category Created'),
        description: isEditMode
          ? (t('admin.categoryUpdatedDesc') || 'Category has been updated successfully')
          : (t('admin.categoryCreatedDesc') || 'Category has been created successfully'),
      })

      router.push('/admin/categories')
      router.refresh()
    } catch (error) {
      toast({
        title: t('admin.error') || 'Error',
        description: error instanceof Error ? error.message : `Failed to ${isEditMode ? 'update' : 'create'} category`,
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/categories">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {isEditMode
              ? (t('admin.editCategory') || 'Edit Category')
              : (t('admin.addCategory') || 'Add Category')}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode
              ? (t('admin.editCategoryDesc') || 'Update category information')
              : (t('admin.createCategoryDesc') || 'Create a new product category')}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">
            {t('admin.categoryName') || 'Category Name'} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter category name"
            error={errors.name?.message}
            {...register('name')}
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug">
            {t('admin.slug') || 'Slug'} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="slug"
            type="text"
            placeholder="category-slug"
            error={errors.slug?.message}
            {...register('slug')}
          />
          <p className="text-xs text-muted-foreground">
            {t('admin.slugHint') || 'URL-friendly identifier (auto-generated from name)'}
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">
            {t('admin.description') || 'Description'}
          </Label>
          <textarea
            id="description"
            rows={4}
            className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
            placeholder="Enter category description"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <Label htmlFor="image">
            {t('admin.imageUrl') || 'Image URL'}
          </Label>
          <Input
            id="image"
            type="text"
            placeholder="https://example.com/image.jpg"
            error={errors.image?.message}
            {...register('image')}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order */}
          <div className="space-y-2">
            <Label htmlFor="order">
              {t('admin.order') || 'Sort Order'}
            </Label>
            <Input
              id="order"
              type="number"
              min="0"
              placeholder="0"
              error={errors.order?.message}
              {...register('order')}
            />
            <p className="text-xs text-muted-foreground">
              {t('admin.orderHint') || 'Lower numbers appear first'}
            </p>
          </div>

          {/* Visibility */}
          <div className="space-y-2">
            <Label>{t('admin.visibility') || 'Visibility'}</Label>
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="visible"
                checked={visible}
                onChange={(e) => setValue('visible', e.target.checked)}
                className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
              />
              <Label htmlFor="visible" className="cursor-pointer font-normal">
                {t('admin.visibleInStore') || 'Visible in store'}
              </Label>
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-semibold">{t('admin.seoSettings') || 'SEO Settings'}</h3>

          {/* Meta Title */}
          <div className="space-y-2">
            <Label htmlFor="metaTitle">
              {t('admin.metaTitle') || 'Meta Title'}
            </Label>
            <Input
              id="metaTitle"
              type="text"
              placeholder="Category meta title for SEO"
              error={errors.metaTitle?.message}
              {...register('metaTitle')}
            />
            <p className="text-xs text-muted-foreground">
              {t('admin.metaTitleHint') || 'Leave empty to use category name'}
            </p>
          </div>

          {/* Meta Description */}
          <div className="space-y-2">
            <Label htmlFor="metaDescription">
              {t('admin.metaDescription') || 'Meta Description'}
            </Label>
            <textarea
              id="metaDescription"
              rows={3}
              className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
              placeholder="Category meta description for SEO"
              {...register('metaDescription')}
            />
            {errors.metaDescription && (
              <p className="text-xs text-destructive">{errors.metaDescription.message}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/categories')}
          >
            {t('admin.cancel') || 'Cancel'}
          </Button>
          <Button type="submit" variant="gradient" loading={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isEditMode
              ? (t('admin.saveChanges') || 'Save Changes')
              : (t('admin.createCategory') || 'Create Category')}
          </Button>
        </div>
      </form>
    </div>
  )
}
