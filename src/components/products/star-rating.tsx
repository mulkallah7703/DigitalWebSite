'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

function starFill(value: number, index: number) {
  return Math.min(1, Math.max(0, value - index))
}

function StarGlyph({ fill, className }: { fill: number; className: string }) {
  return (
    <span className={cn('relative inline-block shrink-0', className)}>
      <Star className={cn(className, 'text-muted-foreground/40')} />
      <span className="absolute left-0 top-0 h-full overflow-hidden" style={{ width: `${fill * 100}%` }}>
        <Star className={cn(className, 'fill-yellow-400 text-yellow-400')} />
      </span>
    </span>
  )
}

export function StarRating({
  value,
  size = 'md',
  className,
}: {
  value: number
  size?: 'sm' | 'md'
  className?: string
}) {
  const rating = Number.isFinite(value) ? Math.min(5, Math.max(0, value)) : 0
  const glyph = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  return (
    <span dir="ltr" className={cn('inline-flex items-center', className)} aria-label={`${rating.toFixed(1)} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <StarGlyph key={index} fill={starFill(rating, index)} className={glyph} />
      ))}
    </span>
  )
}

export function StarPicker({
  value,
  onChange,
}: {
  value: number
  onChange: (value: number) => void
}) {
  const rating = Number.isFinite(value) ? Math.min(5, Math.max(0, value)) : 0
  return (
    <span dir="ltr" className="inline-flex items-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className="relative inline-flex">
          <button
            type="button"
            className="absolute inset-y-0 left-0 z-10 w-1/2"
            aria-label={`${index + 0.5}`}
            onClick={() => onChange(index + 0.5)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 z-10 w-1/2"
            aria-label={`${index + 1}`}
            onClick={() => onChange(index + 1)}
          />
          <StarGlyph fill={starFill(rating, index)} className="w-5 h-5" />
        </span>
      ))}
    </span>
  )
}
