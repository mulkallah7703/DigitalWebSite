'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Target, Eye, Zap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/providers/language-provider'

export function CompanyAbout() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <CompanyAboutContent />
      </div>
    </section>
  )
}

function CompanyAboutContent() {
  const { t } = useLanguage()

  const pillars = [
    { icon: Target, key: 'company.aboutPillar1' },
    { icon: Eye, key: 'company.aboutPillar2' },
    { icon: Zap, key: 'company.aboutPillar3' },
  ]

  return (
    <div className="max-w-4xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold mb-6"
      >
        {t('company.aboutTitle')}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg text-muted-foreground mb-12"
      >
        {t('company.aboutDesc')}
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="p-6 rounded-2xl border bg-card"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4 mx-auto">
              <pillar.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-muted-foreground">{t(pillar.key)}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 flex justify-center"
      >
        <Button asChild size="xl" variant="gradient" className="group">
          <Link href="/about">
            {t('company.aboutCta')}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
