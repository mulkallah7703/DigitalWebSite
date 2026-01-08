'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const { t } = useLanguage()
  const searchParams = useSearchParams()

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    return `?${params.toString()}`
  }

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const showEllipsisStart = currentPage > 3
    const showEllipsisEnd = currentPage < totalPages - 2

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    pages.push(1)

    if (showEllipsisStart) {
      pages.push('ellipsis')
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i)
      }
    }

    if (showEllipsisEnd) {
      pages.push('ellipsis')
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages)
    }

    return pages
  }

  const pages = getPageNumbers()

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      <Button
        variant="outline"
        size="icon"
        asChild
        disabled={currentPage <= 1}
        className={cn(currentPage <= 1 && 'pointer-events-none opacity-50')}
      >
        <Link href={createPageUrl(currentPage - 1)}>
          <ChevronLeft className="w-4 h-4" />
          <span className="sr-only">{t('pagination.previous')}</span>
        </Link>
      </Button>

      {pages.map((page, index) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="px-2">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </span>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            size="icon"
            asChild
          >
            <Link href={createPageUrl(page)}>{page}</Link>
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="icon"
        asChild
        disabled={currentPage >= totalPages}
        className={cn(currentPage >= totalPages && 'pointer-events-none opacity-50')}
      >
        <Link href={createPageUrl(currentPage + 1)}>
          <ChevronRight className="w-4 h-4" />
          <span className="sr-only">{t('pagination.next')}</span>
        </Link>
      </Button>
    </nav>
  )
}
