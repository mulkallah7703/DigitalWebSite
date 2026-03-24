'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/components/providers/language-provider'
import { useToast } from '@/hooks/use-toast'

export function CompanyContact() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    if (!name || !email || !message) {
      toast({
        title: t('contact.error') || 'Error',
        description: t('contact.errorRequired') || 'Please fill in all required fields',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone: phone || undefined, message }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send')
      }

      toast({
        title: t('contact.success') || 'Message Sent',
        description: t('contact.successDesc') || 'Thank you! We will get back to you soon.',
      })
      formRef.current.reset()
    } catch {
      toast({
        title: t('contact.error') || 'Error',
        description: t('contact.errorDesc') || 'Failed to send your message. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              {t('contact.title')}
            </h2>
            <p className="text-muted-foreground">
              {t('contact.subtitle')}
            </p>
          </motion.div>
          <motion.form
            ref={formRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="rounded-2xl border bg-card p-6 sm:p-8 space-y-6"
          >
            <p className="text-sm font-medium text-center text-muted-foreground">
              {t('contact.formInstruction')}
            </p>
            <div className="space-y-2">
              <Label htmlFor="contact-name">{t('contact.formName')}</Label>
              <Input
                id="contact-name"
                name="name"
                type="text"
                required
                icon={<User className="w-4 h-4" />}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contact-email">
                  {t('contact.formEmail')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  icon={<Mail className="w-4 h-4" />}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">{t('contact.formPhone')}</Label>
                <Input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  icon={<Phone className="w-4 h-4" />}
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">
                {t('contact.formMessage')} <span className="text-destructive">*</span>
              </Label>
              <textarea
                id="contact-message"
                name="message"
                required
                placeholder={t('contact.formMessagePlaceholder')}
                rows={5}
                className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
              />
            </div>
            <Button
              type="submit"
              variant="gradient"
              className="w-full"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {t('contact.formSubmit')}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
