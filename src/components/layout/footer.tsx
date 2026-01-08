'use client'

import Link from 'next/link'
import { Sparkles, Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useLanguage } from '@/components/providers/language-provider'

export function Footer() {
  const { t } = useLanguage()

  const footerLinks = {
    products: [
      { label: t('footer.allProducts'), href: '/products' },
      { label: t('nav.categories'), href: '/categories' },
      { label: t('footer.newArrivals'), href: '/products?sort=newest' },
      { label: t('footer.bestSellers'), href: '/products?sort=popular' },
      { label: t('nav.deals'), href: '/deals' },
    ],
    company: [
      { label: t('footer.aboutUs'), href: '/about' },
      { label: t('footer.contact'), href: '/contact' },
      { label: t('footer.careers'), href: '/careers' },
      { label: t('footer.blog'), href: '/blog' },
    ],
    support: [
      { label: t('footer.helpCenter'), href: '/help' },
      { label: t('footer.faqs'), href: '/faqs' },
      { label: t('footer.refundPolicy'), href: '/refund-policy' },
      { label: t('footer.license'), href: '/license' },
    ],
    legal: [
      { label: t('footer.privacyPolicy'), href: '/privacy' },
      { label: t('footer.termsOfService'), href: '/terms' },
      { label: t('footer.cookiePolicy'), href: '/cookies' },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@nexus.store', label: 'Email' },
  ]
  return (
    <footer className="bg-secondary/30 border-t">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Nexus</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.products')}</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Nexus Digital Store. {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              {t('footer.poweredBy')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
