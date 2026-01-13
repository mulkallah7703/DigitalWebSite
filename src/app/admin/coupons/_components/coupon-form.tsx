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
import type { Coupon, DiscountType } from '@prisma/client'

const couponSchema = z.object({
  code: z.string().min(1, 'Coupon code is required'),
  description: z.string().optional(),
  discountType: z.enum(['PERCENTAGE', 'FIXED']),
  discountValue: z.string().refine((val) => {
    const num = parseFloat(val)
    return !isNaN(num) && num > 0
  }, 'Discount value must be a valid number greater than 0'),
  minPurchase: z.string().optional().refine((val) => {
    if (!val) return true
    const num = parseFloat(val)
    return !isNaN(num) && num >= 0
  }, 'Minimum purchase must be a valid number >= 0'),
  maxDiscount: z.string().optional().refine((val) => {
    if (!val) return true
    const num = parseFloat(val)
    return !isNaN(num) && num >= 0
  }, 'Maximum discount must be a valid number >= 0'),
  usageLimit: z.string().optional().refine((val) => {
    if (!val) return true
    const num = parseInt(val)
    return !isNaN(num) && num > 0
  }, 'Usage limit must be a valid positive integer'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  active: z.boolean().default(true),
})

type CouponForm = z.infer<typeof couponSchema>

interface CouponFormProps {
  coupon?: Coupon | null
}

export function CouponForm({ coupon }: CouponFormProps) {
  const isEditMode = !!coupon
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
  } = useForm<CouponForm>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: '',
      description: '',
      discountType: 'PERCENTAGE',
      discountValue: '',
      minPurchase: '',
      maxDiscount: '',
      usageLimit: '',
      startDate: '',
      endDate: '',
      active: true,
    },
  })

  const discountType = watch('discountType')
  const discountValue = watch('discountValue')
  const active = watch('active')

  // Load coupon data into form when in edit mode
  useEffect(() => {
    if (coupon) {
      reset({
        code: coupon.code,
        description: coupon.description || '',
        discountType: coupon.discountType,
        discountValue: Number(coupon.discountValue).toString(),
        minPurchase: coupon.minPurchase ? Number(coupon.minPurchase).toString() : '',
        maxDiscount: coupon.maxDiscount ? Number(coupon.maxDiscount).toString() : '',
        usageLimit: coupon.usageLimit ? coupon.usageLimit.toString() : '',
        startDate: coupon.startDate
          ? new Date(coupon.startDate).toISOString().split('T')[0]
          : '',
        endDate: coupon.endDate ? new Date(coupon.endDate).toISOString().split('T')[0] : '',
        active: coupon.active,
      })
    }
  }, [coupon, reset])

  // Auto-uppercase code
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const upperValue = e.target.value.toUpperCase()
    setValue('code', upperValue)
  }

  // Validate percentage discount
  useEffect(() => {
    if (discountType === 'PERCENTAGE' && discountValue) {
      const num = parseFloat(discountValue)
      if (!isNaN(num) && num > 100) {
        setValue('discountValue', '100')
      }
    }
  }, [discountType, discountValue, setValue])

  const onSubmit = async (data: CouponForm) => {
    setIsLoading(true)
    try {
      const url = isEditMode
        ? `/api/admin/coupons/${coupon?.id}`
        : '/api/admin/coupons'
      const method = isEditMode ? 'PATCH' : 'POST'

      const payload: any = {
        code: data.code.toUpperCase().trim(),
        description: data.description || null,
        discountType: data.discountType,
        discountValue: parseFloat(data.discountValue),
        minPurchase: data.minPurchase ? parseFloat(data.minPurchase) : null,
        maxDiscount: data.maxDiscount ? parseFloat(data.maxDiscount) : null,
        usageLimit: data.usageLimit ? parseInt(data.usageLimit) : null,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        active: data.active,
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || `Failed to ${isEditMode ? 'update' : 'create'} coupon`)
      }

      toast({
        title: isEditMode
          ? (t('admin.couponUpdated') || 'Coupon Updated')
          : (t('admin.couponCreated') || 'Coupon Created'),
        description: isEditMode
          ? (t('admin.couponUpdatedDesc') || 'Coupon has been updated successfully')
          : (t('admin.couponCreatedDesc') || 'Coupon has been created successfully'),
      })

      router.push('/admin/coupons')
      router.refresh()
    } catch (error) {
      toast({
        title: t('admin.error') || 'Error',
        description: error instanceof Error ? error.message : `Failed to ${isEditMode ? 'update' : 'create'} coupon`,
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
          <Link href="/admin/coupons">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {isEditMode
              ? (t('admin.editCoupon') || 'Edit Coupon')
              : (t('admin.addCoupon') || 'Add Coupon')}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode
              ? (t('admin.editCouponDesc') || 'Update coupon information')
              : (t('admin.createCouponDesc') || 'Create a new discount coupon')}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Code */}
        <div className="space-y-2">
          <Label htmlFor="code">
            {t('admin.couponCode') || 'Coupon Code'} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="code"
            type="text"
            placeholder="SAVE20"
            error={errors.code?.message}
            {...register('code')}
            onChange={handleCodeChange}
            className="uppercase"
          />
          <p className="text-xs text-muted-foreground">
            {t('admin.codeHint') || 'Code will be automatically converted to uppercase'}
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">
            {t('admin.description') || 'Description'}
          </Label>
          <textarea
            id="description"
            rows={3}
            className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
            placeholder="Optional description for this coupon"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Discount Type */}
          <div className="space-y-2">
            <Label htmlFor="discountType">
              {t('admin.discountType') || 'Discount Type'} <span className="text-destructive">*</span>
            </Label>
            <Select
              value={discountType}
              onValueChange={(value) => setValue('discountType', value as DiscountType)}
            >
              <SelectTrigger id="discountType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PERCENTAGE">{t('admin.percentage') || 'Percentage'}</SelectItem>
                <SelectItem value="FIXED">{t('admin.fixed') || 'Fixed Amount'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Discount Value */}
          <div className="space-y-2">
            <Label htmlFor="discountValue">
              {t('admin.discountValue') || 'Discount Value'} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="discountValue"
              type="number"
              step="0.01"
              min="0"
              max={discountType === 'PERCENTAGE' ? '100' : undefined}
              placeholder={discountType === 'PERCENTAGE' ? '20' : '10.00'}
              error={errors.discountValue?.message}
              {...register('discountValue')}
            />
            <p className="text-xs text-muted-foreground">
              {discountType === 'PERCENTAGE'
                ? (t('admin.percentageHint') || 'Enter percentage (0-100)')
                : (t('admin.fixedHint') || 'Enter fixed amount')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Minimum Purchase */}
          <div className="space-y-2">
            <Label htmlFor="minPurchase">
              {t('admin.minPurchase') || 'Minimum Purchase'}
            </Label>
            <Input
              id="minPurchase"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              error={errors.minPurchase?.message}
              {...register('minPurchase')}
            />
            <p className="text-xs text-muted-foreground">
              {t('admin.minPurchaseHint') || 'Minimum order amount to use this coupon (optional)'}
            </p>
          </div>

          {/* Maximum Discount */}
          <div className="space-y-2">
            <Label htmlFor="maxDiscount">
              {t('admin.maxDiscount') || 'Maximum Discount'}
            </Label>
            <Input
              id="maxDiscount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              error={errors.maxDiscount?.message}
              {...register('maxDiscount')}
            />
            <p className="text-xs text-muted-foreground">
              {t('admin.maxDiscountHint') || 'Maximum discount amount (optional, for percentage discounts)'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Usage Limit */}
          <div className="space-y-2">
            <Label htmlFor="usageLimit">
              {t('admin.usageLimit') || 'Usage Limit'}
            </Label>
            <Input
              id="usageLimit"
              type="number"
              min="1"
              placeholder="Unlimited"
              error={errors.usageLimit?.message}
              {...register('usageLimit')}
            />
            <p className="text-xs text-muted-foreground">
              {t('admin.usageLimitHint') || 'Maximum number of times this coupon can be used (optional)'}
            </p>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="startDate">
              {t('admin.startDate') || 'Start Date'}
            </Label>
            <Input
              id="startDate"
              type="date"
              error={errors.startDate?.message}
              {...register('startDate')}
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label htmlFor="endDate">
              {t('admin.endDate') || 'End Date'}
            </Label>
            <Input
              id="endDate"
              type="date"
              error={errors.endDate?.message}
              {...register('endDate')}
            />
          </div>
        </div>

        {/* Active Toggle */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="active"
            checked={active}
            onChange={(e) => setValue('active', e.target.checked)}
            className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
          />
          <Label htmlFor="active" className="cursor-pointer font-normal">
            {t('admin.active') || 'Active'}
          </Label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/coupons')}
          >
            {t('admin.cancel') || 'Cancel'}
          </Button>
          <Button type="submit" variant="gradient" loading={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isEditMode
              ? (t('admin.saveChanges') || 'Save Changes')
              : (t('admin.createCoupon') || 'Create Coupon')}
          </Button>
        </div>
      </form>
    </div>
  )
}
