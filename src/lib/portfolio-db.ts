import type { Prisma, PrismaClient } from '@prisma/client'
import { db } from '@/lib/db'
import {
  getPortfolio,
  portraitUrl,
  resumeUrl,
  type PortfolioContent,
} from '@/content/portfolio'

export type Lang = 'ar' | 'en'

export interface PortfolioProfileData {
  photoUrl: string
  cvUrl: string
  email: string
  phone: string
  nameAr: string
  nameEn: string
  photoAltAr: string
  photoAltEn: string
  roleBadgeAr: string
  roleBadgeEn: string
  heroLeadAr: string
  heroLeadEn: string
  contactCtaAr: string
  contactCtaEn: string
  downloadCvAr: string
  downloadCvEn: string
  cvLabelAr: string
  cvLabelEn: string
  myProductsAr: string
  myProductsEn: string
  myProductsHintAr: string
  myProductsHintEn: string
  aboutEyebrowAr: string
  aboutEyebrowEn: string
  aboutTitleAr: string
  aboutTitleEn: string
  aboutBodyAr: string
  aboutBodyEn: string
  skillsEyebrowAr: string
  skillsEyebrowEn: string
  skillsTitleAr: string
  skillsTitleEn: string
  experienceEyebrowAr: string
  experienceEyebrowEn: string
  experienceTitleAr: string
  experienceTitleEn: string
  innovationEyebrowAr: string
  innovationEyebrowEn: string
  innovationTitleAr: string
  innovationTitleEn: string
  projectsEyebrowAr: string
  projectsEyebrowEn: string
  projectsTitleAr: string
  projectsTitleEn: string
  liveDemoAr: string
  liveDemoEn: string
  educationEyebrowAr: string
  educationEyebrowEn: string
  educationTitleAr: string
  educationTitleEn: string
  certsEyebrowAr: string
  certsEyebrowEn: string
  certsTitleAr: string
  certsTitleEn: string
  researchEyebrowAr: string
  researchEyebrowEn: string
  researchTitleAr: string
  researchTitleEn: string
  languagesEyebrowAr: string
  languagesEyebrowEn: string
  languagesTitleAr: string
  languagesTitleEn: string
  contactTitleAr: string
  contactTitleEn: string
  contactBodyAr: string
  contactBodyEn: string
  emailCtaAr: string
  emailCtaEn: string
  copyrightAr: string
  copyrightEn: string
}

export interface PortfolioBundle {
  profile: PortfolioProfileData
  nav: { href: string; labelAr: string; labelEn: string }[]
  stats: { value: string; labelAr: string; labelEn: string }[]
  skillGroups: { titleAr: string; titleEn: string; items: { textAr: string; textEn: string }[] }[]
  jobs: {
    datesAr: string
    datesEn: string
    titleAr: string
    titleEn: string
    companyAr: string
    companyEn: string
    bullets: { textAr: string; textEn: string }[]
  }[]
  innovations: { badgeAr: string; badgeEn: string; nameAr: string; nameEn: string; bodyAr: string; bodyEn: string }[]
  projects: {
    nameAr: string
    nameEn: string
    descAr: string
    descEn: string
    tags: string
    demoUrl: string
    imageUrl: string
  }[]
  education: { datesAr: string; datesEn: string; degreeAr: string; degreeEn: string; schoolAr: string; schoolEn: string }[]
  certificates: { textAr: string; textEn: string }[]
  research: { nameAr: string; nameEn: string; bodyAr: string; bodyEn: string }[]
  spokenLanguages: { nameAr: string; nameEn: string; levelAr: string; levelEn: string }[]
  socials: {
    label: string
    url: string
    followersAr: string
    followersEn: string
    showInHero: boolean
    heroOrder: number
  }[]
}

export interface PortfolioView extends PortfolioContent {
  photoUrl: string
  cvUrl: string
  innovations: { badge: string; name: string; body: string }[]
  researchItems: { name: string; body: string }[]
}

const PROFILE_KEYS: (keyof PortfolioProfileData)[] = [
  'photoUrl', 'cvUrl', 'email', 'phone',
  'nameAr', 'nameEn', 'photoAltAr', 'photoAltEn',
  'roleBadgeAr', 'roleBadgeEn', 'heroLeadAr', 'heroLeadEn',
  'contactCtaAr', 'contactCtaEn', 'downloadCvAr', 'downloadCvEn',
  'cvLabelAr', 'cvLabelEn', 'myProductsAr', 'myProductsEn',
  'myProductsHintAr', 'myProductsHintEn',
  'aboutEyebrowAr', 'aboutEyebrowEn', 'aboutTitleAr', 'aboutTitleEn', 'aboutBodyAr', 'aboutBodyEn',
  'skillsEyebrowAr', 'skillsEyebrowEn', 'skillsTitleAr', 'skillsTitleEn',
  'experienceEyebrowAr', 'experienceEyebrowEn', 'experienceTitleAr', 'experienceTitleEn',
  'innovationEyebrowAr', 'innovationEyebrowEn', 'innovationTitleAr', 'innovationTitleEn',
  'projectsEyebrowAr', 'projectsEyebrowEn', 'projectsTitleAr', 'projectsTitleEn', 'liveDemoAr', 'liveDemoEn',
  'educationEyebrowAr', 'educationEyebrowEn', 'educationTitleAr', 'educationTitleEn',
  'certsEyebrowAr', 'certsEyebrowEn', 'certsTitleAr', 'certsTitleEn',
  'researchEyebrowAr', 'researchEyebrowEn', 'researchTitleAr', 'researchTitleEn',
  'languagesEyebrowAr', 'languagesEyebrowEn', 'languagesTitleAr', 'languagesTitleEn',
  'contactTitleAr', 'contactTitleEn', 'contactBodyAr', 'contactBodyEn', 'emailCtaAr', 'emailCtaEn',
  'copyrightAr', 'copyrightEn',
]

function str(value: unknown) {
  return typeof value === 'string' ? value : value == null ? '' : String(value)
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
}

function asArray(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.map(asRecord) : []
}

export function buildDefaultBundle(): PortfolioBundle {
  const ar = getPortfolio('ar')
  const en = getPortfolio('en')
  const heroOrder = new Map(ar.heroSocialLabels.map((label, index) => [label, index]))

  const profile = {} as PortfolioProfileData
  Object.assign(profile, {
    photoUrl: portraitUrl,
    cvUrl: resumeUrl,
    email: ar.email,
    phone: ar.phone,
    nameAr: ar.name,
    nameEn: en.name,
    photoAltAr: ar.photoAlt,
    photoAltEn: en.photoAlt,
    roleBadgeAr: ar.roleBadge,
    roleBadgeEn: en.roleBadge,
    heroLeadAr: ar.heroLead,
    heroLeadEn: en.heroLead,
    contactCtaAr: ar.contactCta,
    contactCtaEn: en.contactCta,
    downloadCvAr: ar.downloadCv,
    downloadCvEn: en.downloadCv,
    cvLabelAr: ar.cvLabel,
    cvLabelEn: en.cvLabel,
    myProductsAr: ar.myProducts,
    myProductsEn: en.myProducts,
    myProductsHintAr: ar.myProductsHint,
    myProductsHintEn: en.myProductsHint,
    aboutEyebrowAr: ar.aboutEyebrow,
    aboutEyebrowEn: en.aboutEyebrow,
    aboutTitleAr: ar.aboutTitle,
    aboutTitleEn: en.aboutTitle,
    aboutBodyAr: ar.aboutBody,
    aboutBodyEn: en.aboutBody,
    skillsEyebrowAr: ar.skillsEyebrow,
    skillsEyebrowEn: en.skillsEyebrow,
    skillsTitleAr: ar.skillsTitle,
    skillsTitleEn: en.skillsTitle,
    experienceEyebrowAr: ar.experienceEyebrow,
    experienceEyebrowEn: en.experienceEyebrow,
    experienceTitleAr: ar.experienceTitle,
    experienceTitleEn: en.experienceTitle,
    innovationEyebrowAr: ar.innovationEyebrow,
    innovationEyebrowEn: en.innovationEyebrow,
    innovationTitleAr: ar.innovationTitle,
    innovationTitleEn: en.innovationTitle,
    projectsEyebrowAr: ar.projectsEyebrow,
    projectsEyebrowEn: en.projectsEyebrow,
    projectsTitleAr: ar.projectsTitle,
    projectsTitleEn: en.projectsTitle,
    liveDemoAr: ar.liveDemo,
    liveDemoEn: en.liveDemo,
    educationEyebrowAr: ar.educationEyebrow,
    educationEyebrowEn: en.educationEyebrow,
    educationTitleAr: ar.educationTitle,
    educationTitleEn: en.educationTitle,
    certsEyebrowAr: ar.certsEyebrow,
    certsEyebrowEn: en.certsEyebrow,
    certsTitleAr: ar.certsTitle,
    certsTitleEn: en.certsTitle,
    researchEyebrowAr: ar.researchEyebrow,
    researchEyebrowEn: en.researchEyebrow,
    researchTitleAr: ar.researchTitle,
    researchTitleEn: en.researchTitle,
    languagesEyebrowAr: ar.languagesEyebrow,
    languagesEyebrowEn: en.languagesEyebrow,
    languagesTitleAr: ar.languagesTitle,
    languagesTitleEn: en.languagesTitle,
    contactTitleAr: ar.contactTitle,
    contactTitleEn: en.contactTitle,
    contactBodyAr: ar.contactBody,
    contactBodyEn: en.contactBody,
    emailCtaAr: ar.emailCta,
    emailCtaEn: en.emailCta,
    copyrightAr: ar.copyright,
    copyrightEn: en.copyright,
  } satisfies PortfolioProfileData)

  return {
    profile,
    nav: ar.nav.map((item, index) => ({
      href: item.href,
      labelAr: item.label,
      labelEn: en.nav[index]?.label || item.label,
    })),
    stats: ar.stats.map((item, index) => ({
      value: item.value,
      labelAr: item.label,
      labelEn: en.stats[index]?.label || item.label,
    })),
    skillGroups: ar.skillGroups.map((group, index) => ({
      titleAr: group.title,
      titleEn: en.skillGroups[index]?.title || group.title,
      items: group.items.map((item, itemIndex) => ({
        textAr: item,
        textEn: en.skillGroups[index]?.items[itemIndex] || item,
      })),
    })),
    jobs: ar.experience.map((job, index) => ({
      datesAr: job.dates,
      datesEn: en.experience[index]?.dates || job.dates,
      titleAr: job.title,
      titleEn: en.experience[index]?.title || job.title,
      companyAr: job.company,
      companyEn: en.experience[index]?.company || job.company,
      bullets: job.bullets.map((bullet, bulletIndex) => ({
        textAr: bullet,
        textEn: en.experience[index]?.bullets[bulletIndex] || bullet,
      })),
    })),
    innovations: [
      {
        badgeAr: ar.innovationBadge,
        badgeEn: en.innovationBadge,
        nameAr: ar.innovationName,
        nameEn: en.innovationName,
        bodyAr: ar.innovationBody,
        bodyEn: en.innovationBody,
      },
    ],
    projects: ar.projects.map((project, index) => ({
      nameAr: project.name,
      nameEn: en.projects[index]?.name || project.name,
      descAr: project.desc,
      descEn: en.projects[index]?.desc || project.desc,
      tags: project.tags.join(', '),
      demoUrl: project.demoUrl || '',
      imageUrl: '',
    })),
    education: ar.education.map((item, index) => ({
      datesAr: item.dates,
      datesEn: en.education[index]?.dates || item.dates,
      degreeAr: item.degree,
      degreeEn: en.education[index]?.degree || item.degree,
      schoolAr: item.school,
      schoolEn: en.education[index]?.school || item.school,
    })),
    certificates: ar.certifications.map((text, index) => ({
      textAr: text,
      textEn: en.certifications[index] || text,
    })),
    research: [
      {
        nameAr: ar.researchName,
        nameEn: en.researchName,
        bodyAr: ar.researchBody,
        bodyEn: en.researchBody,
      },
    ],
    spokenLanguages: ar.languages.map((item, index) => ({
      nameAr: item.name,
      nameEn: en.languages[index]?.name || item.name,
      levelAr: item.level,
      levelEn: en.languages[index]?.level || item.level,
    })),
    socials: ar.socials.map((social, index) => ({
      label: social.label,
      url: social.url,
      followersAr: social.followers,
      followersEn: en.socials[index]?.followers || social.followers,
      showInHero: heroOrder.has(social.label),
      heroOrder: heroOrder.get(social.label) ?? 0,
    })),
  }
}

function staticViews(): Record<Lang, PortfolioView> {
  const bundle = buildDefaultBundle()
  return {
    ar: viewFromBundle(bundle, 'ar'),
    en: viewFromBundle(bundle, 'en'),
  }
}

export function viewFromBundle(bundle: PortfolioBundle, lang: Lang): PortfolioView {
  const p = bundle.profile
  const pick = (ar: string, en: string) => (lang === 'en' ? en : ar)
  const tags = (value: string) =>
    value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  const heroSocials = bundle.socials
    .filter((social) => social.showInHero)
    .sort((a, b) => a.heroOrder - b.heroOrder)

  const base: PortfolioContent = {
    name: pick(p.nameAr, p.nameEn),
    photoAlt: pick(p.photoAltAr, p.photoAltEn),
    roleBadge: pick(p.roleBadgeAr, p.roleBadgeEn),
    heroLead: pick(p.heroLeadAr, p.heroLeadEn),
    contactCta: pick(p.contactCtaAr, p.contactCtaEn),
    downloadCv: pick(p.downloadCvAr, p.downloadCvEn),
    cvLabel: pick(p.cvLabelAr, p.cvLabelEn),
    myProducts: pick(p.myProductsAr, p.myProductsEn),
    myProductsHint: pick(p.myProductsHintAr, p.myProductsHintEn),
    nav: bundle.nav.map((item) => ({ href: item.href, label: pick(item.labelAr, item.labelEn) })),
    stats: bundle.stats.map((item) => ({ value: item.value, label: pick(item.labelAr, item.labelEn) })),
    aboutEyebrow: pick(p.aboutEyebrowAr, p.aboutEyebrowEn),
    aboutTitle: pick(p.aboutTitleAr, p.aboutTitleEn),
    aboutBody: pick(p.aboutBodyAr, p.aboutBodyEn),
    skillsEyebrow: pick(p.skillsEyebrowAr, p.skillsEyebrowEn),
    skillsTitle: pick(p.skillsTitleAr, p.skillsTitleEn),
    skillGroups: bundle.skillGroups.map((group) => ({
      title: pick(group.titleAr, group.titleEn),
      items: group.items.map((item) => pick(item.textAr, item.textEn)),
    })),
    experienceEyebrow: pick(p.experienceEyebrowAr, p.experienceEyebrowEn),
    experienceTitle: pick(p.experienceTitleAr, p.experienceTitleEn),
    experience: bundle.jobs.map((job) => ({
      dates: pick(job.datesAr, job.datesEn),
      title: pick(job.titleAr, job.titleEn),
      company: pick(job.companyAr, job.companyEn),
      bullets: job.bullets.map((bullet) => pick(bullet.textAr, bullet.textEn)),
    })),
    innovationEyebrow: pick(p.innovationEyebrowAr, p.innovationEyebrowEn),
    innovationTitle: pick(p.innovationTitleAr, p.innovationTitleEn),
    innovationBadge: pick(bundle.innovations[0]?.badgeAr || '', bundle.innovations[0]?.badgeEn || ''),
    innovationName: pick(bundle.innovations[0]?.nameAr || '', bundle.innovations[0]?.nameEn || ''),
    innovationBody: pick(bundle.innovations[0]?.bodyAr || '', bundle.innovations[0]?.bodyEn || ''),
    projectsEyebrow: pick(p.projectsEyebrowAr, p.projectsEyebrowEn),
    projectsTitle: pick(p.projectsTitleAr, p.projectsTitleEn),
    liveDemo: pick(p.liveDemoAr, p.liveDemoEn),
    projects: bundle.projects.map((project) => ({
      name: pick(project.nameAr, project.nameEn),
      desc: pick(project.descAr, project.descEn),
      tags: tags(project.tags),
      demoUrl: project.demoUrl || undefined,
      imageUrl: project.imageUrl || undefined,
    })),
    educationEyebrow: pick(p.educationEyebrowAr, p.educationEyebrowEn),
    educationTitle: pick(p.educationTitleAr, p.educationTitleEn),
    education: bundle.education.map((item) => ({
      dates: pick(item.datesAr, item.datesEn),
      degree: pick(item.degreeAr, item.degreeEn),
      school: pick(item.schoolAr, item.schoolEn),
    })),
    certsEyebrow: pick(p.certsEyebrowAr, p.certsEyebrowEn),
    certsTitle: pick(p.certsTitleAr, p.certsTitleEn),
    certifications: bundle.certificates.map((item) => pick(item.textAr, item.textEn)),
    researchEyebrow: pick(p.researchEyebrowAr, p.researchEyebrowEn),
    researchTitle: pick(p.researchTitleAr, p.researchTitleEn),
    researchName: pick(bundle.research[0]?.nameAr || '', bundle.research[0]?.nameEn || ''),
    researchBody: pick(bundle.research[0]?.bodyAr || '', bundle.research[0]?.bodyEn || ''),
    languagesEyebrow: pick(p.languagesEyebrowAr, p.languagesEyebrowEn),
    languagesTitle: pick(p.languagesTitleAr, p.languagesTitleEn),
    languages: bundle.spokenLanguages.map((item) => ({
      name: pick(item.nameAr, item.nameEn),
      level: pick(item.levelAr, item.levelEn),
    })),
    contactTitle: pick(p.contactTitleAr, p.contactTitleEn),
    contactBody: pick(p.contactBodyAr, p.contactBodyEn),
    emailCta: pick(p.emailCtaAr, p.emailCtaEn),
    email: p.email,
    phone: p.phone,
    socials: bundle.socials.map((social) => ({
      label: social.label,
      url: social.url,
      followers: pick(social.followersAr, social.followersEn),
    })),
    heroSocialLabels: heroSocials.map((social) => social.label),
    copyright: pick(p.copyrightAr, p.copyrightEn),
  }

  return {
    ...base,
    photoUrl: p.photoUrl || portraitUrl,
    cvUrl: p.cvUrl || resumeUrl,
    innovations: bundle.innovations.map((item) => ({
      badge: pick(item.badgeAr, item.badgeEn),
      name: pick(item.nameAr, item.nameEn),
      body: pick(item.bodyAr, item.bodyEn),
    })),
    researchItems: bundle.research.map((item) => ({
      name: pick(item.nameAr, item.nameEn),
      body: pick(item.bodyAr, item.bodyEn),
    })),
    projects: bundle.projects.map((project) => ({
      name: pick(project.nameAr, project.nameEn),
      desc: pick(project.descAr, project.descEn),
      tags: tags(project.tags),
      demoUrl: project.demoUrl || undefined,
      imageUrl: project.imageUrl || undefined,
    })),
  }
}

type DbClient = PrismaClient | Prisma.TransactionClient

async function readBundle(client: DbClient): Promise<PortfolioBundle | null> {
  const profile = await client.portfolioProfile.findUnique({ where: { id: 'default' } })
  if (!profile) return null

  const [nav, stats, skillGroups, jobs, innovations, projects, education, certificates, research, spokenLanguages, socials] =
    await Promise.all([
      client.portfolioNavLink.findMany({ orderBy: { sortOrder: 'asc' } }),
      client.portfolioStat.findMany({ orderBy: { sortOrder: 'asc' } }),
      client.portfolioSkillGroup.findMany({ orderBy: { sortOrder: 'asc' }, include: { items: { orderBy: { sortOrder: 'asc' } } } }),
      client.portfolioJob.findMany({ orderBy: { sortOrder: 'asc' }, include: { bullets: { orderBy: { sortOrder: 'asc' } } } }),
      client.portfolioInnovation.findMany({ orderBy: { sortOrder: 'asc' } }),
      client.portfolioProject.findMany({ orderBy: { sortOrder: 'asc' } }),
      client.portfolioEducation.findMany({ orderBy: { sortOrder: 'asc' } }),
      client.portfolioCertificate.findMany({ orderBy: { sortOrder: 'asc' } }),
      client.portfolioResearchItem.findMany({ orderBy: { sortOrder: 'asc' } }),
      client.portfolioSpokenLanguage.findMany({ orderBy: { sortOrder: 'asc' } }),
      client.portfolioSocial.findMany({ orderBy: { sortOrder: 'asc' } }),
    ])

  const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...profileData } = profile
  return {
    profile: profileData,
    nav: nav.map(({ href, labelAr, labelEn }) => ({ href, labelAr, labelEn })),
    stats: stats.map(({ value, labelAr, labelEn }) => ({ value, labelAr, labelEn })),
    skillGroups: skillGroups.map((group) => ({
      titleAr: group.titleAr,
      titleEn: group.titleEn,
      items: group.items.map((item) => ({ textAr: item.textAr, textEn: item.textEn })),
    })),
    jobs: jobs.map((job) => ({
      datesAr: job.datesAr,
      datesEn: job.datesEn,
      titleAr: job.titleAr,
      titleEn: job.titleEn,
      companyAr: job.companyAr,
      companyEn: job.companyEn,
      bullets: job.bullets.map((bullet) => ({ textAr: bullet.textAr, textEn: bullet.textEn })),
    })),
    innovations: innovations.map(({ badgeAr, badgeEn, nameAr, nameEn, bodyAr, bodyEn }) => ({
      badgeAr, badgeEn, nameAr, nameEn, bodyAr, bodyEn,
    })),
    projects: projects.map(({ nameAr, nameEn, descAr, descEn, tags, demoUrl, imageUrl }) => ({
      nameAr, nameEn, descAr, descEn, tags, demoUrl, imageUrl,
    })),
    education: education.map(({ datesAr, datesEn, degreeAr, degreeEn, schoolAr, schoolEn }) => ({
      datesAr, datesEn, degreeAr, degreeEn, schoolAr, schoolEn,
    })),
    certificates: certificates.map(({ textAr, textEn }) => ({ textAr, textEn })),
    research: research.map(({ nameAr, nameEn, bodyAr, bodyEn }) => ({ nameAr, nameEn, bodyAr, bodyEn })),
    spokenLanguages: spokenLanguages.map(({ nameAr, nameEn, levelAr, levelEn }) => ({ nameAr, nameEn, levelAr, levelEn })),
    socials: socials.map(({ label, url, followersAr, followersEn, showInHero, heroOrder }) => ({
      label, url, followersAr, followersEn, showInHero, heroOrder,
    })),
  }
}

export async function loadPortfolioViews(client: PrismaClient = db): Promise<Record<Lang, PortfolioView>> {
  try {
    const bundle = await readBundle(client)
    if (!bundle) return staticViews()
    return { ar: viewFromBundle(bundle, 'ar'), en: viewFromBundle(bundle, 'en') }
  } catch (error) {
    console.error('[portfolio]', error)
    return staticViews()
  }
}

export async function loadPortfolioBundle(client: PrismaClient = db): Promise<PortfolioBundle> {
  try {
    const bundle = await readBundle(client)
    if (bundle) return bundle
  } catch (error) {
    console.error('[portfolio]', error)
  }
  return buildDefaultBundle()
}

async function writeBundle(client: PrismaClient, bundle: PortfolioBundle) {
  const profile = normalizeProfile(bundle.profile)
  await client.$transaction(async (tx) => {
    await tx.portfolioProfile.upsert({
      where: { id: 'default' },
      create: { id: 'default', ...profile },
      update: profile,
    })
    await replaceCollections(tx, bundle)
  })
}

export async function seedPortfolioIfEmpty(client: PrismaClient = db) {
  const existing = await client.portfolioProfile.findUnique({ where: { id: 'default' } })
  if (existing) {
    console.log('Portfolio already present, skipping')
    return false
  }
  await writeBundle(client, buildDefaultBundle())
  console.log('Portfolio content seeded')
  return true
}

function normalizeProfile(input: unknown): PortfolioProfileData {
  const source = asRecord(input)
  const data = {} as PortfolioProfileData
  for (const key of PROFILE_KEYS) {
    data[key] = str(source[key])
  }
  if (!data.photoUrl) data.photoUrl = portraitUrl
  if (!data.cvUrl) data.cvUrl = resumeUrl
  return data
}

async function replaceCollections(tx: Prisma.TransactionClient, bundle: Partial<PortfolioBundle>) {
  if (bundle.nav) {
    await tx.portfolioNavLink.deleteMany()
    if (bundle.nav.length) {
      await tx.portfolioNavLink.createMany({
        data: asArray(bundle.nav).map((item, index) => ({
          href: str(item.href) || '#',
          labelAr: str(item.labelAr),
          labelEn: str(item.labelEn),
          sortOrder: index,
        })),
      })
    }
  }
  if (bundle.stats) {
    await tx.portfolioStat.deleteMany()
    if (bundle.stats.length) {
      await tx.portfolioStat.createMany({
        data: asArray(bundle.stats).map((item, index) => ({
          value: str(item.value),
          labelAr: str(item.labelAr),
          labelEn: str(item.labelEn),
          sortOrder: index,
        })),
      })
    }
  }
  if (bundle.skillGroups) {
    await tx.portfolioSkillGroup.deleteMany()
    const groups = asArray(bundle.skillGroups)
    for (let index = 0; index < groups.length; index++) {
      const group = groups[index]
      await tx.portfolioSkillGroup.create({
        data: {
          titleAr: str(group.titleAr),
          titleEn: str(group.titleEn),
          sortOrder: index,
          items: {
            create: asArray(group.items).map((item, itemIndex) => ({
              textAr: str(item.textAr),
              textEn: str(item.textEn),
              sortOrder: itemIndex,
            })),
          },
        },
      })
    }
  }
  if (bundle.jobs) {
    await tx.portfolioJob.deleteMany()
    const jobs = asArray(bundle.jobs)
    for (let index = 0; index < jobs.length; index++) {
      const job = jobs[index]
      await tx.portfolioJob.create({
        data: {
          datesAr: str(job.datesAr),
          datesEn: str(job.datesEn),
          titleAr: str(job.titleAr),
          titleEn: str(job.titleEn),
          companyAr: str(job.companyAr),
          companyEn: str(job.companyEn),
          sortOrder: index,
          bullets: {
            create: asArray(job.bullets).map((bullet, bulletIndex) => ({
              textAr: str(bullet.textAr),
              textEn: str(bullet.textEn),
              sortOrder: bulletIndex,
            })),
          },
        },
      })
    }
  }
  if (bundle.innovations) {
    await tx.portfolioInnovation.deleteMany()
    if (bundle.innovations.length) {
      await tx.portfolioInnovation.createMany({
        data: asArray(bundle.innovations).map((item, index) => ({
          badgeAr: str(item.badgeAr),
          badgeEn: str(item.badgeEn),
          nameAr: str(item.nameAr),
          nameEn: str(item.nameEn),
          bodyAr: str(item.bodyAr),
          bodyEn: str(item.bodyEn),
          sortOrder: index,
        })),
      })
    }
  }
  if (bundle.projects) {
    await tx.portfolioProject.deleteMany()
    if (bundle.projects.length) {
      await tx.portfolioProject.createMany({
        data: asArray(bundle.projects).map((item, index) => ({
          nameAr: str(item.nameAr),
          nameEn: str(item.nameEn),
          descAr: str(item.descAr),
          descEn: str(item.descEn),
          tags: str(item.tags),
          demoUrl: str(item.demoUrl),
          imageUrl: str(item.imageUrl),
          sortOrder: index,
        })),
      })
    }
  }
  if (bundle.education) {
    await tx.portfolioEducation.deleteMany()
    if (bundle.education.length) {
      await tx.portfolioEducation.createMany({
        data: asArray(bundle.education).map((item, index) => ({
          datesAr: str(item.datesAr),
          datesEn: str(item.datesEn),
          degreeAr: str(item.degreeAr),
          degreeEn: str(item.degreeEn),
          schoolAr: str(item.schoolAr),
          schoolEn: str(item.schoolEn),
          sortOrder: index,
        })),
      })
    }
  }
  if (bundle.certificates) {
    await tx.portfolioCertificate.deleteMany()
    if (bundle.certificates.length) {
      await tx.portfolioCertificate.createMany({
        data: asArray(bundle.certificates).map((item, index) => ({
          textAr: str(item.textAr),
          textEn: str(item.textEn),
          sortOrder: index,
        })),
      })
    }
  }
  if (bundle.research) {
    await tx.portfolioResearchItem.deleteMany()
    if (bundle.research.length) {
      await tx.portfolioResearchItem.createMany({
        data: asArray(bundle.research).map((item, index) => ({
          nameAr: str(item.nameAr),
          nameEn: str(item.nameEn),
          bodyAr: str(item.bodyAr),
          bodyEn: str(item.bodyEn),
          sortOrder: index,
        })),
      })
    }
  }
  if (bundle.spokenLanguages) {
    await tx.portfolioSpokenLanguage.deleteMany()
    if (bundle.spokenLanguages.length) {
      await tx.portfolioSpokenLanguage.createMany({
        data: asArray(bundle.spokenLanguages).map((item, index) => ({
          nameAr: str(item.nameAr),
          nameEn: str(item.nameEn),
          levelAr: str(item.levelAr),
          levelEn: str(item.levelEn),
          sortOrder: index,
        })),
      })
    }
  }
  if (bundle.socials) {
    await tx.portfolioSocial.deleteMany()
    if (bundle.socials.length) {
      await tx.portfolioSocial.createMany({
        data: asArray(bundle.socials).map((item, index) => ({
          label: str(item.label),
          url: str(item.url),
          followersAr: str(item.followersAr),
          followersEn: str(item.followersEn),
          showInHero: item.showInHero === true,
          heroOrder: Number.isFinite(Number(item.heroOrder)) ? Number(item.heroOrder) : index,
          sortOrder: index,
        })),
      })
    }
  }
}

const SECTIONS = [
  'profile',
  'nav',
  'stats',
  'skillGroups',
  'jobs',
  'innovations',
  'projects',
  'education',
  'certificates',
  'research',
  'spokenLanguages',
  'socials',
] as const

export type PortfolioSection = (typeof SECTIONS)[number]

export function isPortfolioSection(value: string): value is PortfolioSection {
  return (SECTIONS as readonly string[]).includes(value)
}

export async function savePortfolioSection(section: PortfolioSection, data: unknown) {
  if (section === 'profile') {
    const profile = normalizeProfile(data)
    await db.portfolioProfile.upsert({
      where: { id: 'default' },
      create: { id: 'default', ...profile },
      update: profile,
    })
  } else {
    await db.$transaction(async (tx) => {
      const partial = { [section]: data } as Partial<PortfolioBundle>
      await replaceCollections(tx, partial)
    })
  }
  const { revalidatePath } = await import('next/cache')
  revalidatePath('/')
  revalidatePath('/admin/portfolio')
  return loadPortfolioBundle()
}
