'use client'

import { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import { Package } from 'lucide-react'

interface SafeImageProps extends Omit<ImageProps, 'onError' | 'onLoadingComplete'> {
  fallbackIcon?: React.ReactNode
}

// Check if URL is external and might not be in Next.js allowlist
function isExternalUrl(url: string): boolean {
  if (!url) return false
  // Local paths (starting with /) should not be unoptimized
  if (url.startsWith('/')) return false
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
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
  const shouldUnoptimize = unoptimized !== undefined ? unoptimized : isExternalUrl(String(imageSrc))

  return (
    <Image
      {...props}
      fill={fill}
      src={imageSrc}
      alt={alt}
      className={className}
      unoptimized={shouldUnoptimize}
      onError={handleError}
      onLoadingComplete={handleLoadingComplete}
    />
  )
}
