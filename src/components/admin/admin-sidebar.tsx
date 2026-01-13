'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  FileSpreadsheet,
  BarChart3,
  Tag,
  Sparkles,
  FolderTree,
  Ticket,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/components/providers/language-provider'

export function AdminSidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: t('admin.dashboard') },
    { href: '/admin/products', icon: Package, label: t('admin.products') },
    { href: '/admin/categories', icon: FolderTree, label: t('admin.categories') },
    { href: '/admin/orders', icon: ShoppingCart, label: t('admin.orders') },
    { href: '/admin/users', icon: Users, label: t('admin.users') },
    { href: '/admin/coupons', icon: Ticket, label: t('admin.coupons') },
    { href: '/admin/analytics', icon: BarChart3, label: t('admin.analytics') },
    { href: '/admin/spreadsheet', icon: FileSpreadsheet, label: t('admin.spreadsheet') },
    { href: '/admin/settings', icon: Settings, label: t('admin.settings') },
  ]

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-background border-r hidden lg:block">
      {/* Logo */}
      <div className="h-16 flex items-center gap-2 px-6 border-b">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold gradient-text">{t('store.name')} {t('admin.dashboard')}</span>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
