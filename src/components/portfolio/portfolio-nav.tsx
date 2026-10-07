'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, Moon, Sun, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { useLanguage } from '@/components/providers/language-provider'
import { cn } from '@/lib/utils'
import type { PortfolioView } from '@/lib/portfolio-db'

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

function sectionId(href: string) {
  return href.startsWith('#') ? href.slice(1) : ''
}

function sectionLinks(nav: { href: string; label: string }[], language: string) {
  const links = nav.filter((link) => link.href.startsWith('#'))
  const extras = [
    { href: '#certifications', label: language === 'ar' ? 'الشهادات' : 'Certificates' },
    { href: '#research', label: language === 'ar' ? 'البحث' : 'Research' },
    { href: '#languages', label: language === 'ar' ? 'اللغات' : 'Languages' },
  ].filter((link) => !links.some((item) => item.href === link.href))
  if (!extras.length) return links
  const contactIndex = links.findIndex((link) => link.href === '#contact')
  if (contactIndex === -1) return [...links, ...extras]
  return [...links.slice(0, contactIndex), ...extras, ...links.slice(contactIndex)]
}

export function PortfolioNav({ content }: { content: PortfolioView }) {
  const { language, setLanguage, t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHref, setActiveHref] = useState('')
  const links = sectionLinks(content.nav, language)
  const linkKey = links.map((link) => `${link.href}:${link.label}`).join('|')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const marker = window.scrollY + 128
      let current = ''
      for (const link of links) {
        const id = sectionId(link.href)
        const el = id ? document.getElementById(id) : null
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= marker) current = link.href
      }
      setActiveHref(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [linkKey])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const menuLabel = language === 'ar' ? 'القائمة' : 'Menu'

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-all duration-300',
        scrolled
          ? 'glass border-border/60 shadow-lg'
          : 'border-border/50 bg-background/75 backdrop-blur-xl',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-2 px-3 sm:gap-3 sm:px-4">
        <a
          href="#hero"
          className="min-w-0 max-w-[42vw] shrink truncate text-sm font-bold gradient-text sm:max-w-[14rem] sm:shrink-0 sm:text-base lg:max-w-none"
          title={content.name}
        >
          {content.name}
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-x-3 lg:flex xl:gap-x-4" aria-label={menuLabel}>
          {links.map((link) => {
            const active = link.href === activeHref
            const wideOnly = link.href === '#research' || link.href === '#languages'
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? 'true' : undefined}
                onClick={() => setActiveHref(link.href)}
                className={cn(
                  'group relative whitespace-nowrap py-1 text-sm font-medium transition-colors',
                  wideOnly && 'hidden xl:inline',
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
              </a>
            )
          })}
        </nav>

        <div className="ms-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button asChild variant="gradient" size="sm" className="h-9 shrink-0 px-2.5 sm:px-3">
            <Link href="/store">
              <span className="whitespace-nowrap text-xs sm:text-sm">{content.myProducts}</span>
              <ArrowRight className="ms-1 h-4 w-4 shrink-0 rtl:rotate-180" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="hidden h-9 xl:inline-flex">
            <a href={content.cvUrl} target="_blank" rel="noopener noreferrer">
              {content.cvLabel}
            </a>
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
            <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-3 py-3 sm:px-4" aria-label={menuLabel}>
              {links.map((link) => {
                const active = link.href === activeHref
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'true' : undefined}
                    onClick={() => {
                      setActiveHref(link.href)
                      closeMenu()
                    }}
                    className={cn(
                      'rounded-lg px-4 py-2.5 text-start text-sm font-medium transition-colors',
                      active ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-accent',
                    )}
                  >
                    {link.label}
                  </a>
                )
              })}

              <div className="mt-2 flex flex-col gap-3 border-t pt-3">
                <Button asChild variant="gradient" className="w-full">
                  <Link href="/store" onClick={closeMenu}>
                    {content.myProducts}
                    <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href={content.cvUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                    {content.cvLabel}
                  </a>
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={language === 'en' ? 'default' : 'outline'}
                    onClick={() => setLanguage('en')}
                  >
                    {t('lang.english')}
                  </Button>
                  <Button
                    type="button"
                    variant={language === 'ar' ? 'default' : 'outline'}
                    onClick={() => setLanguage('ar')}
                  >
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
