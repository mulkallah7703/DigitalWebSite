'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { useLanguage } from '@/components/providers/language-provider'
import { cn } from '@/lib/utils'

/** Main site links, in the order the brand wants them shown. */
export function useSiteLinks() {
  const { t } = useLanguage()
  return [
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/store', label: t('nav.store') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ]
}

export function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { language } = useLanguage()
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="relative shrink-0"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={language === 'ar' ? 'تبديل المظهر' : 'Toggle theme'}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}

export function SiteNav() {
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()
  const links = useSiteLinks()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const brand = language === 'ar' ? 'السعدي الرقمية' : 'Alsadi Digital'
  const menuLabel = language === 'ar' ? 'القائمة' : 'Menu'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-all duration-300',
        scrolled ? 'glass border-border/60 shadow-lg' : 'border-border/50 bg-background/75 backdrop-blur-xl',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={brand}>
          <Image src="/mylogo.jpg" alt="" width={36} height={36} className="rounded-xl object-contain" />
          <span className="text-base font-bold gradient-text sm:text-lg">{brand}</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-x-6 lg:flex" aria-label={menuLabel}>
          {links.map((link) => {
            const active = isActivePath(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group relative whitespace-nowrap py-1 text-sm font-medium transition-colors',
                  active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-0.5 start-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300',
                    active ? 'w-full' : 'w-0 group-hover:w-full',
                  )}
                />
              </Link>
            )
          })}
        </nav>

        <div className="ms-auto flex shrink-0 items-center gap-1.5">
          <Button asChild variant="gradient" size="sm" className="hidden h-9 sm:inline-flex">
            <Link href="/store">{t('nav.store')}</Link>
          </Button>
          <div className="hidden items-center lg:flex">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuLabel}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass max-h-[calc(100dvh-4rem)] overflow-y-auto border-t lg:hidden"
          >
            <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3" aria-label={menuLabel}>
              {[{ href: '/', label: t('nav.home') }, ...links].map((link) => {
                const active = isActivePath(pathname, link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'rounded-lg px-4 py-2.5 text-start text-sm font-medium transition-colors',
                      active ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-accent',
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="mt-2 flex flex-col gap-3 border-t pt-3">
                <div className="grid grid-cols-2 gap-2">
                  <Button type="button" variant={language === 'en' ? 'default' : 'outline'} onClick={() => setLanguage('en')}>
                    {t('lang.english')}
                  </Button>
                  <Button type="button" variant={language === 'ar' ? 'default' : 'outline'} onClick={() => setLanguage('ar')}>
                    {t('lang.arabic')}
                  </Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border px-3 py-1">
                  <span className="text-sm font-medium">{language === 'ar' ? 'المظهر' : 'Theme'}</span>
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
