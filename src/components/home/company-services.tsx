'use client'

import { motion } from 'framer-motion'
import {
  Palette,
  Video,
  Mic2,
  FlaskConical,
  Code2,
  Paintbrush,
  Users,
  Bot,
} from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'
import { Card, CardContent } from '@/components/ui/card'

const serviceKeys = [
  'company.service1',
  'company.service2',
  'company.service3',
  'company.service4',
  'company.service5',
  'company.service6',
  'company.service7',
  'company.service8',
]

const serviceIcons = [
  Palette,
  Video,
  Mic2,
  FlaskConical,
  Code2,
  Paintbrush,
  Users,
  Bot,
]

export function CompanyServices() {
  const { t } = useLanguage()

  return (
    <section id="services" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-4"
        >
          {t('company.servicesTitle')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          {t('company.servicesDesc')}
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[i] || Bot
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
              >
                <Card className="h-full border hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="font-medium">{t(key)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
