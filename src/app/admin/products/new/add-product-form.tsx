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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/components/providers/language-provider'
import type { Category, Product, ProductImage } from '@prisma/client'

const productSchema = z.object({
  name: z.string().min(1, 'Product title (EN) is required'),
  nameAr: z.string().optional(),
  description: z.string().min(1, 'Product description (EN) is required'),
  descriptionAr: z.string().optional(),
  price: z.string().refine((val) => {
    const num = parseFloat(val)
    return !isNaN(num) && num > 0
  }, 'Price must be a valid number greater than 0'),
  externalPurchaseLink: z.string().optional().nullable(),
  categoryId: z.string().min(1, 'Category is required'),
  productType: z.enum(['course', 'video', 'audio', 'ebook']),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  isFeatured: z.boolean().default(false),
  videoUrl: z.string().optional().nullable(),
  imageUrls: z.array(z.string()).optional(),
})

type ProductForm = z.infer<typeof productSchema>

type ProductWithImages = Product & {
  images: ProductImage[]
  category: Category
}

interface AddProductFormProps {
  categories: Category[]
  product?: ProductWithImages | null
}

export function AddProductForm({ categories, product }: AddProductFormProps) {
  const isEditMode = !!product
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      status: 'DRAFT',
      productType: 'course',
      isFeatured: false,
      videoUrl: null,
      imageUrls: [],
    },
  })

  // Load product data into form when in edit mode
  useEffect(() => {
    if (product) {
      const productType = (product.aiTags && product.aiTags[0]) || 'course'
      reset({
        name: product.name,
        nameAr: product.nameAr || '',
        description: product.description,
        descriptionAr: product.descriptionAr || '',
        price: Number(product.price).toString(),
        externalPurchaseLink: product.externalPurchaseLink || '',
        categoryId: product.categoryId,
        productType: productType as 'course' | 'video' | 'audio' | 'ebook',
        status: product.status,
        isFeatured: product.isFeatured,
        videoUrl: product.videoUrl,
        imageUrls: product.images.map((img) => img.url),
      })
      setImageUrls(product.images.map((img) => img.url))
      setVideoUrl(product.videoUrl)
    }
  }, [product, reset])

  const categoryId = watch('categoryId')
  const status = watch('status')
  const productType = watch('productType')
  const isFeatured = watch('isFeatured')

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingImages(true)
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Upload failed')
        }

        const result = await response.json()
        return result.url
      })

      const urls = await Promise.all(uploadPromises)
      const newUrls = [...imageUrls, ...urls]
      setImageUrls(newUrls)
      setValue('imageUrls', newUrls)
    } catch (error) {
      toast({
        title: t('admin.uploadError') || 'Upload Error',
        description: error instanceof Error ? error.message : 'Failed to upload images',
        variant: 'destructive',
      })
    } finally {
      setUploadingImages(false)
    }
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingVideo(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Upload failed')
      }

      const result = await response.json()
      setVideoUrl(result.url)
      setValue('videoUrl', result.url)
    } catch (error) {
      toast({
        title: t('admin.uploadError') || 'Upload Error',
        description: error instanceof Error ? error.message : 'Failed to upload video',
        variant: 'destructive',
      })
    } finally {
      setUploadingVideo(false)
    }
  }

  const removeImage = (index: number) => {
    const newUrls = imageUrls.filter((_, i) => i !== index)
    setImageUrls(newUrls)
    setValue('imageUrls', newUrls)
  }

  const onSubmit = async (data: ProductForm) => {
    setIsLoading(true)
    try {
      const url = isEditMode 
        ? `/api/admin/products?id=${product?.id}`
        : '/api/admin/products'
      const method = isEditMode ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          price: parseFloat(data.price),
          externalPurchaseLink: data.externalPurchaseLink?.trim() || null,
          videoUrl: videoUrl || null,
          imageUrls: imageUrls.length > 0 ? imageUrls : null,
          productType: data.productType,
          isFeatured: data.isFeatured,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || `Failed to ${isEditMode ? 'update' : 'create'} product`)
      }

      toast({
        title: isEditMode 
          ? (t('admin.productUpdated') || 'Product Updated')
          : (t('admin.productCreated') || 'Product Created'),
        description: isEditMode
          ? (t('admin.productUpdatedDesc') || 'Product has been updated successfully')
          : (t('admin.productCreatedDesc') || 'Product has been created successfully'),
      })

      router.push('/admin/products')
      router.refresh()
    } catch (error) {
      toast({
        title: t('admin.error') || 'Error',
        description: error instanceof Error ? error.message : `Failed to ${isEditMode ? 'update' : 'create'} product`,
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
          <Link href="/admin/products">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {isEditMode 
              ? (t('admin.editProduct') || 'Edit Product')
              : (t('admin.addProduct') || 'Add Product')
            }
          </h1>
          <p className="text-muted-foreground">
            {isEditMode
              ? (t('admin.editProductDesc') || 'Update product information')
              : (t('admin.createNewProduct') || 'Create a new digital product')
            }
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Title (EN) */}
          <div className="space-y-2">
            <Label htmlFor="name">
              {t('admin.productTitleEn') || 'Product Title (EN)'} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter product title in English"
              error={errors.name?.message}
              {...register('name')}
            />
          </div>

          {/* Product Title (AR) */}
          <div className="space-y-2">
            <Label htmlFor="nameAr">
              {t('admin.productTitleAr') || 'Product Title (AR)'}
            </Label>
            <Input
              id="nameAr"
              type="text"
              placeholder="Enter product title in Arabic"
              error={errors.nameAr?.message}
              {...register('nameAr')}
            />
          </div>
        </div>

        {/* Description (EN) */}
        <div className="space-y-2">
          <Label htmlFor="description">
            {t('admin.productDescriptionEn') || 'Product Description (EN)'} <span className="text-destructive">*</span>
          </Label>
          <textarea
            id="description"
            rows={6}
            className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
            placeholder="Enter product description in English"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description.message}</p>
          )}
        </div>

        {/* Description (AR) */}
        <div className="space-y-2">
          <Label htmlFor="descriptionAr">
            {t('admin.productDescriptionAr') || 'Product Description (AR)'}
          </Label>
          <textarea
            id="descriptionAr"
            rows={6}
            className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
            placeholder="Enter product description in Arabic"
            {...register('descriptionAr')}
          />
          {errors.descriptionAr && (
            <p className="text-xs text-destructive">{errors.descriptionAr.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">
              {t('admin.price') || 'Price'} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              error={errors.price?.message}
              {...register('price')}
            />
          </div>

          {/* Product Type */}
          <div className="space-y-2">
            <Label htmlFor="productType">
              {t('admin.productType') || 'Product Type'} <span className="text-destructive">*</span>
            </Label>
            <Select
              value={productType}
              onValueChange={(value) => setValue('productType', value as 'course' | 'video' | 'audio' | 'ebook')}
            >
              <SelectTrigger id="productType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="course">{t('admin.typeCourse') || 'Course'}</SelectItem>
                <SelectItem value="video">{t('admin.typeVideo') || 'Video'}</SelectItem>
                <SelectItem value="audio">{t('admin.typeAudio') || 'Audio'}</SelectItem>
                <SelectItem value="ebook">{t('admin.typeEbook') || 'Ebook'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* External Purchase Link */}
        <div className="space-y-2">
          <Label htmlFor="externalPurchaseLink">
            {t('admin.externalPurchaseLink') || 'External Purchase Link'}
          </Label>
          <Input
            id="externalPurchaseLink"
            type="url"
            placeholder="https://payhip.com/..."
            error={errors.externalPurchaseLink?.message}
            {...register('externalPurchaseLink')}
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="categoryId">
            {t('admin.category') || 'Category'} <span className="text-destructive">*</span>
          </Label>
          <Select
            value={categoryId}
            onValueChange={(value) => setValue('categoryId', value)}
          >
            <SelectTrigger id="categoryId" className={errors.categoryId ? 'border-destructive' : ''}>
              <SelectValue placeholder={t('admin.selectCategory') || 'Select a category'} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categoryId && (
            <p className="text-xs text-destructive">{errors.categoryId.message}</p>
          )}
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">
            {t('admin.status') || 'Status'} <span className="text-destructive">*</span>
          </Label>
          <Select
            value={status}
            onValueChange={(value) => setValue('status', value as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED')}
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">{t('admin.draft') || 'Draft'}</SelectItem>
              <SelectItem value="PUBLISHED">{t('admin.published') || 'Published'}</SelectItem>
              <SelectItem value="ARCHIVED">{t('admin.archived') || 'Archived'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Featured Product */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isFeatured"
            checked={isFeatured}
            onChange={(e) => setValue('isFeatured', e.target.checked)}
            className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
          />
          <Label htmlFor="isFeatured" className="cursor-pointer font-normal">
            {t('admin.featuredProduct') || 'Featured Product'}
          </Label>
        </div>

        {/* Product Images */}
        <div className="space-y-2">
          <Label htmlFor="images">
            {t('admin.productImages') || 'Product Images'} (optional)
          </Label>
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            disabled={uploadingImages}
            className="cursor-pointer"
          />
          {uploadingImages && (
            <p className="text-sm text-muted-foreground">{t('admin.uploading') || 'Uploading...'}</p>
          )}
          {imageUrls.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Video */}
        <div className="space-y-2">
          <Label htmlFor="video">
            {t('admin.productVideo') || 'Product Video'} (optional)
          </Label>
          <Input
            id="video"
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            disabled={uploadingVideo}
            className="cursor-pointer"
          />
          {uploadingVideo && (
            <p className="text-sm text-muted-foreground">{t('admin.uploading') || 'Uploading...'}</p>
          )}
          {videoUrl && (
            <div className="mt-4">
              <video
                src={videoUrl}
                controls
                className="w-full max-w-md rounded-lg border"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
              <button
                type="button"
                onClick={() => {
                  setVideoUrl(null)
                  setValue('videoUrl', null)
                }}
                className="mt-2 text-sm text-destructive hover:underline"
              >
                {t('admin.removeVideo') || 'Remove video'}
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/products')}
          >
            {t('admin.cancel') || 'Cancel'}
          </Button>
          <Button type="submit" variant="gradient" loading={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isEditMode
              ? (t('admin.saveChanges') || 'Save Changes')
              : (t('admin.saveProduct') || 'Save Product')
            }
          </Button>
        </div>
      </form>
    </div>
  )
}
