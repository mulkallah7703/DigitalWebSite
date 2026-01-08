'use client'

import { motion } from 'framer-motion'
import { Sparkles, Zap, Shield, Clock, RefreshCw, Headphones } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Sparkles,
      title: t('home.aiRecommendations'),
      description: t('home.aiRecommendationsDesc'),
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Zap,
      title: t('home.instantDelivery'),
      description: t('home.instantDeliveryDesc'),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Shield,
      title: t('home.secureTransactions'),
      description: t('home.secureTransactionsDesc'),
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Clock,
      title: t('home.lifetimeAccess'),
      description: t('home.lifetimeAccessDesc'),
      gradient: 'from-rose-500 to-orange-500',
    },
    {
      icon: RefreshCw,
      title: t('product.freeUpdates'),
      description: t('home.freeUpdatesDesc'),
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      icon: Headphones,
      title: t('home.support247'),
      description: t('home.support247Desc'),
      gradient: 'from-amber-500 to-yellow-500',
    },
  ]
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('home.whyChoose')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('home.commitment')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group p-6 rounded-2xl border bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
