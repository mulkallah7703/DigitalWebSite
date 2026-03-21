'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/providers/language-provider'

export function CompanyCTA() {
  const { t } = useLanguage()

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 p-8 sm:p-12 lg:p-16 text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            {t('company.ctaTitle')}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t('company.ctaDesc')}
          </p>
          <Button asChild size="xl" variant="gradient" className="group">
            <Link href="/store">
              {t('company.ctaButton')}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
