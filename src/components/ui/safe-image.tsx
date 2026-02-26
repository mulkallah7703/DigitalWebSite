'use client'

import { useState, useEffect } from 'react'
import type { ImageProps } from 'next/image'
import { Package } from 'lucide-react'

interface SafeImageProps extends Omit<ImageProps, 'onError' | 'onLoadingComplete'> {
  fallbackIcon?: React.ReactNode
}



export function SafeImage({ src, alt, fallbackIcon, className, fill, unoptimized, ...props }: SafeImageProps) {
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  useEffect(() => {
    setImageSrc(src)
    setHasError(false)
  }, [src])

  const handleError = () => {
    // Silently handle image errors without throwing or logging
    try {
      setHasError(true)
    } catch {
      // Silently fail - prevent errors from propagating
    }
  }

  const handleLoadingComplete = (result: { naturalWidth: number; naturalHeight: number }) => {
    // Silently check if image loaded successfully
    try {
      if (result.naturalWidth === 0 || result.naturalHeight === 0) {
        setHasError(true)
      }
    } catch {
      // Silently fail - prevent errors from propagating
      setHasError(true)
    }
  }

  if (hasError) {
    const fallbackClasses = fill
      ? `absolute inset-0 flex items-center justify-center bg-secondary ${className || ''}`
      : `w-full h-full flex items-center justify-center bg-secondary ${className || ''}`

    return (
      <div className={fallbackClasses}>
        {fallbackIcon || <Package className="w-12 h-12 text-muted-foreground" />}
      </div>
    )
  }

  // Use unoptimized for external URLs to avoid domain allowlist issues


  return (
    <img
      src={String(imageSrc)}
      alt={alt}
      className={className}
      onError={handleError}
      style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } : undefined}
    />
  )
}
