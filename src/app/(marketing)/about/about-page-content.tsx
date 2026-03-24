'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/language-provider'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { teamData } from '@/data/team'

const IMAGE_SIZE = 256
const IMAGE_ASPECT = 'aspect-square'

function getImageUrl(member: { name: string; image: string }): string {
  if (member.image?.trim()) return member.image
  const encoded = encodeURIComponent(member.name)
  return `https://ui-avatars.com/api/?name=${encoded}&size=${IMAGE_SIZE}&background=6366f1&color=fff`
}

function FounderCard({
  member,
  roleLabel,
}: {
  member: (typeof teamData)[0]
  roleLabel: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex justify-center mb-12"
    >
      <Card className="w-full max-w-2xl p-8 rounded-2xl border bg-card text-center overflow-hidden transition-all duration-200">
        <div className="flex flex-col items-center space-y-6">
          <div
            className={`w-48 h-48 rounded-2xl overflow-hidden bg-secondary flex-shrink-0 ${IMAGE_ASPECT}`}
          >
            <img
              src={getImageUrl(member)}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader className="p-0 space-y-1">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              {member.name}
            </h3>
            <p className="text-sm text-muted-foreground font-medium">
              {roleLabel}
            </p>
          </CardHeader>
          <CardContent className="p-0 space-y-1">
            <p className="text-muted-foreground">{member.specialization}</p>
            <p className="text-sm text-muted-foreground/80">{member.college}</p>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}

function TeamCard({ member }: { member: (typeof teamData)[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full rounded-2xl border bg-card overflow-hidden transition-all duration-200 p-6 flex flex-col items-center text-center">
        <div
          className={`w-32 h-32 rounded-xl overflow-hidden bg-secondary flex-shrink-0 mb-4 ${IMAGE_ASPECT}`}
        >
          <img
            src={getImageUrl(member)}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader className="p-0 space-y-1 flex-1">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            {member.name}
          </h3>
        </CardHeader>
        <CardContent className="p-0 space-y-1 flex-1">
          <p className="text-sm text-muted-foreground">{member.specialization}</p>
          <p className="text-xs text-muted-foreground/80">{member.college}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function AboutPageContent() {
  const { t } = useLanguage()
  const founders = teamData.filter((m) => m.role === 'Founder')
  const members = teamData.filter((m) => m.role === 'Member')
  const founderRoleLabel = t('about.founderRole')

  return (
    <>
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl font-bold mb-6"
            >
              {t('about.heroTitle')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-12"
            >
              {t('about.heroDesc')}
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-12 text-center"
          >
            {t('about.teamTitle')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {founders.map((founder) => (
              <FounderCard
                key={founder.name}
                member={founder}
                roleLabel={founderRoleLabel}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {members.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
