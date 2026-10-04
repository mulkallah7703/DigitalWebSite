'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLanguage } from '@/components/providers/language-provider'
import type { PortfolioBundle, PortfolioProfileData, PortfolioSection } from '@/lib/portfolio-db'

const copy = {
  en: {
    title: 'Portfolio Management',
    subtitle: 'Edits are saved to the database and show on the public portfolio immediately.',
    view: 'View portfolio',
    save: 'Save',
    saving: 'Saving…',
    saved: 'Saved. The live portfolio is updated.',
    add: 'Add',
    remove: 'Remove',
    up: 'Move up',
    down: 'Move down',
    arabic: 'Arabic',
    english: 'English',
    photo: 'Profile photo',
    cv: 'CV file',
    upload: 'Upload',
    uploading: 'Uploading…',
    headings: 'Section headings',
    email: 'Email',
    phone: 'Phone',
    followers: 'Followers',
    tags: 'Tags (comma separated)',
    demo: 'Demo URL',
    image: 'Project image',
    bullets: 'Bullets',
    items: 'Skills',
    showInHero: 'Show in hero',
    heroOrder: 'Hero order',
    url: 'URL',
    href: 'Link',
    value: 'Count',
    profile: 'Profile',
    stats: 'Stats',
    skills: 'Skills',
    experience: 'Experience',
    innovation: 'Innovation',
    projects: 'Projects',
    education: 'Education',
    certificates: 'Certificates',
    research: 'Research',
    languages: 'Languages',
    social: 'Social',
    nav: 'Navigation',
  },
  ar: {
    title: 'إدارة البورتفوليو',
    subtitle: 'يُحفظ التعديل في قاعدة البيانات ويظهر فورًا في صفحة البورتفوليو.',
    view: 'عرض البورتفوليو',
    save: 'حفظ',
    saving: 'جارٍ الحفظ…',
    saved: 'تم الحفظ. صفحة البورتفوليو محدّثة.',
    add: 'إضافة',
    remove: 'حذف',
    up: 'تحريك لأعلى',
    down: 'تحريك لأسفل',
    arabic: 'العربية',
    english: 'English',
    photo: 'الصورة الشخصية',
    cv: 'ملف السيرة',
    upload: 'رفع',
    uploading: 'جارٍ الرفع…',
    headings: 'عناوين القسم',
    email: 'البريد',
    phone: 'الهاتف',
    followers: 'المتابعون',
    tags: 'الوسوم (مفصولة بفاصلة)',
    demo: 'رابط العرض',
    image: 'صورة المشروع',
    bullets: 'النقاط',
    items: 'المهارات',
    showInHero: 'إظهار في المقدمة',
    heroOrder: 'ترتيب المقدمة',
    url: 'الرابط',
    href: 'الرابط',
    value: 'العدد',
    profile: 'الملف',
    stats: 'الإحصاءات',
    skills: 'المهارات',
    experience: 'الخبرة',
    innovation: 'الابتكار',
    projects: 'المشاريع',
    education: 'التعليم',
    certificates: 'الشهادات',
    research: 'البحث',
    languages: 'اللغات',
    social: 'التواصل',
    nav: 'التنقل',
  },
} as const

type Ui = { [K in keyof (typeof copy)['en']]: string }

function moveItem<T>(items: T[], index: number, dir: -1 | 1) {
  const nextIndex = index + dir
  if (nextIndex < 0 || nextIndex >= items.length) return items
  const next = items.slice()
  const [item] = next.splice(index, 1)
  next.splice(nextIndex, 0, item)
  return next
}

function Field({
  label,
  value,
  onChange,
  multiline,
  dir,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
  dir?: 'rtl' | 'ltr'
}) {
  const className =
    'flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {multiline ? (
        <textarea className={`${className} min-h-[88px]`} dir={dir} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <Input dir={dir} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </div>
  )
}

function Pair({
  ui,
  label,
  ar,
  en,
  onAr,
  onEn,
  multiline,
}: {
  ui: Ui
  label: string
  ar: string
  en: string
  onAr: (value: string) => void
  onEn: (value: string) => void
  multiline?: boolean
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="grid md:grid-cols-2 gap-3">
        <Field label={ui.arabic} value={ar} onChange={onAr} multiline={multiline} dir="rtl" />
        <Field label={ui.english} value={en} onChange={onEn} multiline={multiline} dir="ltr" />
      </div>
    </div>
  )
}

function RowActions({
  ui,
  index,
  total,
  onUp,
  onDown,
  onRemove,
}: {
  ui: Ui
  index: number
  total: number
  onUp: () => void
  onDown: () => void
  onRemove: () => void
}) {
  return (
    <div className="flex items-center gap-1">
      <Button type="button" variant="outline" size="icon" onClick={onUp} disabled={index === 0} aria-label={ui.up}>
        <ChevronUp className="w-4 h-4" />
      </Button>
      <Button type="button" variant="outline" size="icon" onClick={onDown} disabled={index === total - 1} aria-label={ui.down}>
        <ChevronDown className="w-4 h-4" />
      </Button>
      <Button type="button" variant="outline" size="icon" onClick={onRemove} aria-label={ui.remove}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}

export function PortfolioEditor({ initial }: { initial: PortfolioBundle }) {
  const { language } = useLanguage()
  const ui = language === 'ar' ? copy.ar : copy.en
  const [bundle, setBundle] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [status, setStatus] = useState('')

  function setProfile(key: keyof PortfolioProfileData, value: string) {
    setBundle((prev) => ({ ...prev, profile: { ...prev.profile, [key]: value } }))
  }

  async function upload(file: File) {
    setUploading(true)
    setStatus('')
    try {
      const body = new FormData()
      body.append('file', file)
      const res = await fetch('/api/admin/portfolio/upload', { method: 'POST', body })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Upload failed')
      return json.url as string
    } finally {
      setUploading(false)
    }
  }

  async function save(section: PortfolioSection, data: unknown, withProfile = false) {
    setSaving(true)
    setStatus('')
    try {
      if (withProfile) {
        const profileRes = await fetch('/api/admin/portfolio', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ section: 'profile', data: bundle.profile }),
        })
        const profileJson = await profileRes.json()
        if (!profileRes.ok) throw new Error(profileJson.error || 'Save failed')
      }
      const res = await fetch('/api/admin/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Save failed')
      setBundle(json.bundle)
      setStatus(ui.saved)
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const profile = bundle.profile

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{ui.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{ui.subtitle}</p>
        </div>
        <Button asChild variant="outline">
          <a href="/" target="_blank" rel="noopener noreferrer">{ui.view}</a>
        </Button>
      </div>
      {status ? <p className="text-sm rounded-lg border bg-card px-3 py-2" role="status">{status}</p> : null}

      <Tabs defaultValue="profile">
        <TabsList className="flex h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="profile">{ui.profile}</TabsTrigger>
          <TabsTrigger value="stats">{ui.stats}</TabsTrigger>
          <TabsTrigger value="skills">{ui.skills}</TabsTrigger>
          <TabsTrigger value="experience">{ui.experience}</TabsTrigger>
          <TabsTrigger value="innovation">{ui.innovation}</TabsTrigger>
          <TabsTrigger value="projects">{ui.projects}</TabsTrigger>
          <TabsTrigger value="education">{ui.education}</TabsTrigger>
          <TabsTrigger value="certificates">{ui.certificates}</TabsTrigger>
          <TabsTrigger value="research">{ui.research}</TabsTrigger>
          <TabsTrigger value="languages">{ui.languages}</TabsTrigger>
          <TabsTrigger value="social">{ui.social}</TabsTrigger>
          <TabsTrigger value="nav">{ui.nav}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-[160px_1fr] gap-4 items-start rounded-xl border bg-card p-4">
            <img src={profile.photoUrl} alt="" className="w-36 h-36 rounded-full object-cover border" />
            <div className="space-y-3">
              <Field label={ui.photo} value={profile.photoUrl} onChange={(value) => setProfile('photoUrl', value)} />
              <Label className="inline-flex">
                <input
                  type="file"
                  accept="image/*"
                  className="text-sm"
                  disabled={uploading}
                  onChange={async (event) => {
                    const file = event.target.files?.[0]
                    event.target.value = ''
                    if (!file) return
                    try {
                      setProfile('photoUrl', await upload(file))
                    } catch (error) {
                      setStatus(error instanceof Error ? error.message : 'Upload failed')
                    }
                  }}
                />
              </Label>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-4 space-y-3">
            <Field label={ui.cv} value={profile.cvUrl} onChange={(value) => setProfile('cvUrl', value)} />
            <Label className="inline-flex">
              <input
                type="file"
                accept="application/pdf,.pdf"
                className="text-sm"
                disabled={uploading}
                onChange={async (event) => {
                  const file = event.target.files?.[0]
                  event.target.value = ''
                  if (!file) return
                  try {
                    setProfile('cvUrl', await upload(file))
                  } catch (error) {
                    setStatus(error instanceof Error ? error.message : 'Upload failed')
                  }
                }}
              />
            </Label>
            {uploading ? <p className="text-xs text-muted-foreground">{ui.uploading}</p> : null}
          </div>
          <div className="rounded-xl border bg-card p-4 space-y-4">
            <div className="grid md:grid-cols-2 gap-3">
              <Field label={ui.email} value={profile.email} onChange={(value) => setProfile('email', value)} />
              <Field label={ui.phone} value={profile.phone} onChange={(value) => setProfile('phone', value)} />
            </div>
            <Pair ui={ui} label="Name" ar={profile.nameAr} en={profile.nameEn} onAr={(v) => setProfile('nameAr', v)} onEn={(v) => setProfile('nameEn', v)} />
            <Pair ui={ui} label="Photo alt" ar={profile.photoAltAr} en={profile.photoAltEn} onAr={(v) => setProfile('photoAltAr', v)} onEn={(v) => setProfile('photoAltEn', v)} />
            <Pair ui={ui} label="Role" ar={profile.roleBadgeAr} en={profile.roleBadgeEn} onAr={(v) => setProfile('roleBadgeAr', v)} onEn={(v) => setProfile('roleBadgeEn', v)} />
            <Pair ui={ui} label="Intro" ar={profile.heroLeadAr} en={profile.heroLeadEn} onAr={(v) => setProfile('heroLeadAr', v)} onEn={(v) => setProfile('heroLeadEn', v)} multiline />
            <Pair ui={ui} label="About" ar={profile.aboutBodyAr} en={profile.aboutBodyEn} onAr={(v) => setProfile('aboutBodyAr', v)} onEn={(v) => setProfile('aboutBodyEn', v)} multiline />
            <Pair ui={ui} label="About eyebrow" ar={profile.aboutEyebrowAr} en={profile.aboutEyebrowEn} onAr={(v) => setProfile('aboutEyebrowAr', v)} onEn={(v) => setProfile('aboutEyebrowEn', v)} />
            <Pair ui={ui} label="About title" ar={profile.aboutTitleAr} en={profile.aboutTitleEn} onAr={(v) => setProfile('aboutTitleAr', v)} onEn={(v) => setProfile('aboutTitleEn', v)} />
            <Pair ui={ui} label="Contact button" ar={profile.contactCtaAr} en={profile.contactCtaEn} onAr={(v) => setProfile('contactCtaAr', v)} onEn={(v) => setProfile('contactCtaEn', v)} />
            <Pair ui={ui} label="Download CV" ar={profile.downloadCvAr} en={profile.downloadCvEn} onAr={(v) => setProfile('downloadCvAr', v)} onEn={(v) => setProfile('downloadCvEn', v)} />
            <Pair ui={ui} label="CV label" ar={profile.cvLabelAr} en={profile.cvLabelEn} onAr={(v) => setProfile('cvLabelAr', v)} onEn={(v) => setProfile('cvLabelEn', v)} />
            <Pair ui={ui} label="My products" ar={profile.myProductsAr} en={profile.myProductsEn} onAr={(v) => setProfile('myProductsAr', v)} onEn={(v) => setProfile('myProductsEn', v)} />
            <Pair ui={ui} label="Products hint" ar={profile.myProductsHintAr} en={profile.myProductsHintEn} onAr={(v) => setProfile('myProductsHintAr', v)} onEn={(v) => setProfile('myProductsHintEn', v)} />
            <Pair ui={ui} label="Contact title" ar={profile.contactTitleAr} en={profile.contactTitleEn} onAr={(v) => setProfile('contactTitleAr', v)} onEn={(v) => setProfile('contactTitleEn', v)} />
            <Pair ui={ui} label="Contact text" ar={profile.contactBodyAr} en={profile.contactBodyEn} onAr={(v) => setProfile('contactBodyAr', v)} onEn={(v) => setProfile('contactBodyEn', v)} multiline />
            <Pair ui={ui} label="Email button" ar={profile.emailCtaAr} en={profile.emailCtaEn} onAr={(v) => setProfile('emailCtaAr', v)} onEn={(v) => setProfile('emailCtaEn', v)} />
            <Pair ui={ui} label="Copyright" ar={profile.copyrightAr} en={profile.copyrightEn} onAr={(v) => setProfile('copyrightAr', v)} onEn={(v) => setProfile('copyrightEn', v)} />
          </div>
          <Button type="button" onClick={() => save('profile', bundle.profile)} disabled={saving}>
            {saving ? ui.saving : ui.save}
          </Button>
        </TabsContent>

        <TabsContent value="stats" className="space-y-3 mt-4">
          {bundle.stats.map((item, index) => (
            <div key={index} className="rounded-xl border bg-card p-4 space-y-3">
              <div className="flex justify-end">
                <RowActions
                  ui={ui}
                  index={index}
                  total={bundle.stats.length}
                  onUp={() => setBundle((prev) => ({ ...prev, stats: moveItem(prev.stats, index, -1) }))}
                  onDown={() => setBundle((prev) => ({ ...prev, stats: moveItem(prev.stats, index, 1) }))}
                  onRemove={() => setBundle((prev) => ({ ...prev, stats: prev.stats.filter((_, i) => i !== index) }))}
                />
              </div>
              <Field label={ui.value} value={item.value} onChange={(value) => setBundle((prev) => ({ ...prev, stats: prev.stats.map((row, i) => i === index ? { ...row, value } : row) }))} />
              <Pair ui={ui} label="Label" ar={item.labelAr} en={item.labelEn} onAr={(labelAr) => setBundle((prev) => ({ ...prev, stats: prev.stats.map((row, i) => i === index ? { ...row, labelAr } : row) }))} onEn={(labelEn) => setBundle((prev) => ({ ...prev, stats: prev.stats.map((row, i) => i === index ? { ...row, labelEn } : row) }))} />
            </div>
          ))}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setBundle((prev) => ({ ...prev, stats: [...prev.stats, { value: '', labelAr: '', labelEn: '' }] }))}>
              <Plus className="w-4 h-4 me-1" /> {ui.add}
            </Button>
            <Button type="button" onClick={() => save('stats', bundle.stats)} disabled={saving}>{saving ? ui.saving : ui.save}</Button>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-3 mt-4">
          <HeadingPair ui={ui} title="Skills" arKey="skillsEyebrowAr" enKey="skillsEyebrowEn" ar2="skillsTitleAr" en2="skillsTitleEn" profile={profile} setProfile={setProfile} />
          {bundle.skillGroups.map((group, index) => (
            <div key={index} className="rounded-xl border bg-card p-4 space-y-3">
              <div className="flex justify-end">
                <RowActions ui={ui} index={index} total={bundle.skillGroups.length} onUp={() => setBundle((prev) => ({ ...prev, skillGroups: moveItem(prev.skillGroups, index, -1) }))} onDown={() => setBundle((prev) => ({ ...prev, skillGroups: moveItem(prev.skillGroups, index, 1) }))} onRemove={() => setBundle((prev) => ({ ...prev, skillGroups: prev.skillGroups.filter((_, i) => i !== index) }))} />
              </div>
              <Pair ui={ui} label="Group" ar={group.titleAr} en={group.titleEn} onAr={(titleAr) => setBundle((prev) => ({ ...prev, skillGroups: prev.skillGroups.map((row, i) => i === index ? { ...row, titleAr } : row) }))} onEn={(titleEn) => setBundle((prev) => ({ ...prev, skillGroups: prev.skillGroups.map((row, i) => i === index ? { ...row, titleEn } : row) }))} />
              <p className="text-sm font-medium">{ui.items}</p>
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex} className="grid md:grid-cols-[1fr_1fr_auto] gap-2 items-end">
                  <Field label={ui.arabic} value={item.textAr} onChange={(textAr) => setBundle((prev) => ({ ...prev, skillGroups: prev.skillGroups.map((row, i) => i === index ? { ...row, items: row.items.map((skill, j) => j === itemIndex ? { ...skill, textAr } : skill) } : row) }))} dir="rtl" />
                  <Field label={ui.english} value={item.textEn} onChange={(textEn) => setBundle((prev) => ({ ...prev, skillGroups: prev.skillGroups.map((row, i) => i === index ? { ...row, items: row.items.map((skill, j) => j === itemIndex ? { ...skill, textEn } : skill) } : row) }))} dir="ltr" />
                  <Button type="button" variant="outline" size="icon" aria-label={ui.remove} onClick={() => setBundle((prev) => ({ ...prev, skillGroups: prev.skillGroups.map((row, i) => i === index ? { ...row, items: row.items.filter((_, j) => j !== itemIndex) } : row) }))}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => setBundle((prev) => ({ ...prev, skillGroups: prev.skillGroups.map((row, i) => i === index ? { ...row, items: [...row.items, { textAr: '', textEn: '' }] } : row) }))}>
                <Plus className="w-4 h-4 me-1" /> {ui.add}
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setBundle((prev) => ({ ...prev, skillGroups: [...prev.skillGroups, { titleAr: '', titleEn: '', items: [{ textAr: '', textEn: '' }] }] }))}>
              <Plus className="w-4 h-4 me-1" /> {ui.add}
            </Button>
            <Button type="button" onClick={() => save('skillGroups', bundle.skillGroups, true)} disabled={saving}>{saving ? ui.saving : ui.save}</Button>
          </div>
        </TabsContent>

        <TabsContent value="experience" className="space-y-3 mt-4">
          <HeadingPair ui={ui} title="Experience" arKey="experienceEyebrowAr" enKey="experienceEyebrowEn" ar2="experienceTitleAr" en2="experienceTitleEn" profile={profile} setProfile={setProfile} />
          {bundle.jobs.map((job, index) => (
            <div key={index} className="rounded-xl border bg-card p-4 space-y-3">
              <div className="flex justify-end">
                <RowActions ui={ui} index={index} total={bundle.jobs.length} onUp={() => setBundle((prev) => ({ ...prev, jobs: moveItem(prev.jobs, index, -1) }))} onDown={() => setBundle((prev) => ({ ...prev, jobs: moveItem(prev.jobs, index, 1) }))} onRemove={() => setBundle((prev) => ({ ...prev, jobs: prev.jobs.filter((_, i) => i !== index) }))} />
              </div>
              <Pair ui={ui} label="Dates" ar={job.datesAr} en={job.datesEn} onAr={(datesAr) => setBundle((prev) => ({ ...prev, jobs: prev.jobs.map((row, i) => i === index ? { ...row, datesAr } : row) }))} onEn={(datesEn) => setBundle((prev) => ({ ...prev, jobs: prev.jobs.map((row, i) => i === index ? { ...row, datesEn } : row) }))} />
              <Pair ui={ui} label="Title" ar={job.titleAr} en={job.titleEn} onAr={(titleAr) => setBundle((prev) => ({ ...prev, jobs: prev.jobs.map((row, i) => i === index ? { ...row, titleAr } : row) }))} onEn={(titleEn) => setBundle((prev) => ({ ...prev, jobs: prev.jobs.map((row, i) => i === index ? { ...row, titleEn } : row) }))} />
              <Pair ui={ui} label="Company" ar={job.companyAr} en={job.companyEn} onAr={(companyAr) => setBundle((prev) => ({ ...prev, jobs: prev.jobs.map((row, i) => i === index ? { ...row, companyAr } : row) }))} onEn={(companyEn) => setBundle((prev) => ({ ...prev, jobs: prev.jobs.map((row, i) => i === index ? { ...row, companyEn } : row) }))} />
              <p className="text-sm font-medium">{ui.bullets}</p>
              {job.bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="grid md:grid-cols-[1fr_1fr_auto] gap-2 items-end">
                  <Field label={ui.arabic} value={bullet.textAr} onChange={(textAr) => setBundle((prev) => ({ ...prev, jobs: prev.jobs.map((row, i) => i === index ? { ...row, bullets: row.bullets.map((item, j) => j === bulletIndex ? { ...item, textAr } : item) } : row) }))} multiline dir="rtl" />
                  <Field label={ui.english} value={bullet.textEn} onChange={(textEn) => setBundle((prev) => ({ ...prev, jobs: prev.jobs.map((row, i) => i === index ? { ...row, bullets: row.bullets.map((item, j) => j === bulletIndex ? { ...item, textEn } : item) } : row) }))} multiline dir="ltr" />
                  <Button type="button" variant="outline" size="icon" aria-label={ui.remove} onClick={() => setBundle((prev) => ({ ...prev, jobs: prev.jobs.map((row, i) => i === index ? { ...row, bullets: row.bullets.filter((_, j) => j !== bulletIndex) } : row) }))}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => setBundle((prev) => ({ ...prev, jobs: prev.jobs.map((row, i) => i === index ? { ...row, bullets: [...row.bullets, { textAr: '', textEn: '' }] } : row) }))}>
                <Plus className="w-4 h-4 me-1" /> {ui.add}
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setBundle((prev) => ({ ...prev, jobs: [...prev.jobs, { datesAr: '', datesEn: '', titleAr: '', titleEn: '', companyAr: '', companyEn: '', bullets: [{ textAr: '', textEn: '' }] }] }))}>
              <Plus className="w-4 h-4 me-1" /> {ui.add}
            </Button>
            <Button type="button" onClick={() => save('jobs', bundle.jobs, true)} disabled={saving}>{saving ? ui.saving : ui.save}</Button>
          </div>
        </TabsContent>

        <TabsContent value="innovation" className="space-y-3 mt-4">
          <HeadingPair ui={ui} title="Innovation" arKey="innovationEyebrowAr" enKey="innovationEyebrowEn" ar2="innovationTitleAr" en2="innovationTitleEn" profile={profile} setProfile={setProfile} />
          {bundle.innovations.map((item, index) => (
            <div key={index} className="rounded-xl border bg-card p-4 space-y-3">
              <div className="flex justify-end">
                <RowActions ui={ui} index={index} total={bundle.innovations.length} onUp={() => setBundle((prev) => ({ ...prev, innovations: moveItem(prev.innovations, index, -1) }))} onDown={() => setBundle((prev) => ({ ...prev, innovations: moveItem(prev.innovations, index, 1) }))} onRemove={() => setBundle((prev) => ({ ...prev, innovations: prev.innovations.filter((_, i) => i !== index) }))} />
              </div>
              <Pair ui={ui} label="Badge" ar={item.badgeAr} en={item.badgeEn} onAr={(badgeAr) => setBundle((prev) => ({ ...prev, innovations: prev.innovations.map((row, i) => i === index ? { ...row, badgeAr } : row) }))} onEn={(badgeEn) => setBundle((prev) => ({ ...prev, innovations: prev.innovations.map((row, i) => i === index ? { ...row, badgeEn } : row) }))} />
              <Pair ui={ui} label="Name" ar={item.nameAr} en={item.nameEn} onAr={(nameAr) => setBundle((prev) => ({ ...prev, innovations: prev.innovations.map((row, i) => i === index ? { ...row, nameAr } : row) }))} onEn={(nameEn) => setBundle((prev) => ({ ...prev, innovations: prev.innovations.map((row, i) => i === index ? { ...row, nameEn } : row) }))} />
              <Pair ui={ui} label="Body" ar={item.bodyAr} en={item.bodyEn} onAr={(bodyAr) => setBundle((prev) => ({ ...prev, innovations: prev.innovations.map((row, i) => i === index ? { ...row, bodyAr } : row) }))} onEn={(bodyEn) => setBundle((prev) => ({ ...prev, innovations: prev.innovations.map((row, i) => i === index ? { ...row, bodyEn } : row) }))} multiline />
            </div>
          ))}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setBundle((prev) => ({ ...prev, innovations: [...prev.innovations, { badgeAr: '', badgeEn: '', nameAr: '', nameEn: '', bodyAr: '', bodyEn: '' }] }))}>
              <Plus className="w-4 h-4 me-1" /> {ui.add}
            </Button>
            <Button type="button" onClick={() => save('innovations', bundle.innovations, true)} disabled={saving}>{saving ? ui.saving : ui.save}</Button>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-3 mt-4">
          <HeadingPair ui={ui} title="Projects" arKey="projectsEyebrowAr" enKey="projectsEyebrowEn" ar2="projectsTitleAr" en2="projectsTitleEn" profile={profile} setProfile={setProfile} />
          <div className="rounded-xl border bg-card p-4">
            <Pair ui={ui} label="Live demo label" ar={profile.liveDemoAr} en={profile.liveDemoEn} onAr={(v) => setProfile('liveDemoAr', v)} onEn={(v) => setProfile('liveDemoEn', v)} />
          </div>
          {bundle.projects.map((project, index) => (
            <div key={index} className="rounded-xl border bg-card p-4 space-y-3">
              <div className="flex justify-end">
                <RowActions ui={ui} index={index} total={bundle.projects.length} onUp={() => setBundle((prev) => ({ ...prev, projects: moveItem(prev.projects, index, -1) }))} onDown={() => setBundle((prev) => ({ ...prev, projects: moveItem(prev.projects, index, 1) }))} onRemove={() => setBundle((prev) => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }))} />
              </div>
              {project.imageUrl ? <img src={project.imageUrl} alt="" className="w-full max-w-sm h-40 object-cover rounded-lg border" /> : null}
              <Field label={ui.image} value={project.imageUrl} onChange={(imageUrl) => setBundle((prev) => ({ ...prev, projects: prev.projects.map((row, i) => i === index ? { ...row, imageUrl } : row) }))} />
              <input
                type="file"
                accept="image/*"
                className="text-sm"
                disabled={uploading}
                onChange={async (event) => {
                  const file = event.target.files?.[0]
                  event.target.value = ''
                  if (!file) return
                  try {
                    const imageUrl = await upload(file)
                    setBundle((prev) => ({ ...prev, projects: prev.projects.map((row, i) => i === index ? { ...row, imageUrl } : row) }))
                  } catch (error) {
                    setStatus(error instanceof Error ? error.message : 'Upload failed')
                  }
                }}
              />
              <Pair ui={ui} label="Name" ar={project.nameAr} en={project.nameEn} onAr={(nameAr) => setBundle((prev) => ({ ...prev, projects: prev.projects.map((row, i) => i === index ? { ...row, nameAr } : row) }))} onEn={(nameEn) => setBundle((prev) => ({ ...prev, projects: prev.projects.map((row, i) => i === index ? { ...row, nameEn } : row) }))} />
              <Pair ui={ui} label="Description" ar={project.descAr} en={project.descEn} onAr={(descAr) => setBundle((prev) => ({ ...prev, projects: prev.projects.map((row, i) => i === index ? { ...row, descAr } : row) }))} onEn={(descEn) => setBundle((prev) => ({ ...prev, projects: prev.projects.map((row, i) => i === index ? { ...row, descEn } : row) }))} multiline />
              <Field label={ui.tags} value={project.tags} onChange={(tags) => setBundle((prev) => ({ ...prev, projects: prev.projects.map((row, i) => i === index ? { ...row, tags } : row) }))} />
              <Field label={ui.demo} value={project.demoUrl} onChange={(demoUrl) => setBundle((prev) => ({ ...prev, projects: prev.projects.map((row, i) => i === index ? { ...row, demoUrl } : row) }))} />
            </div>
          ))}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setBundle((prev) => ({ ...prev, projects: [...prev.projects, { nameAr: '', nameEn: '', descAr: '', descEn: '', tags: '', demoUrl: '', imageUrl: '' }] }))}>
              <Plus className="w-4 h-4 me-1" /> {ui.add}
            </Button>
            <Button type="button" onClick={() => save('projects', bundle.projects, true)} disabled={saving}>{saving ? ui.saving : ui.save}</Button>
          </div>
        </TabsContent>

        <TabsContent value="education" className="space-y-3 mt-4">
          <HeadingPair ui={ui} title="Education" arKey="educationEyebrowAr" enKey="educationEyebrowEn" ar2="educationTitleAr" en2="educationTitleEn" profile={profile} setProfile={setProfile} />
          {bundle.education.map((item, index) => (
            <div key={index} className="rounded-xl border bg-card p-4 space-y-3">
              <div className="flex justify-end">
                <RowActions ui={ui} index={index} total={bundle.education.length} onUp={() => setBundle((prev) => ({ ...prev, education: moveItem(prev.education, index, -1) }))} onDown={() => setBundle((prev) => ({ ...prev, education: moveItem(prev.education, index, 1) }))} onRemove={() => setBundle((prev) => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }))} />
              </div>
              <Pair ui={ui} label="Dates" ar={item.datesAr} en={item.datesEn} onAr={(datesAr) => setBundle((prev) => ({ ...prev, education: prev.education.map((row, i) => i === index ? { ...row, datesAr } : row) }))} onEn={(datesEn) => setBundle((prev) => ({ ...prev, education: prev.education.map((row, i) => i === index ? { ...row, datesEn } : row) }))} />
              <Pair ui={ui} label="Degree" ar={item.degreeAr} en={item.degreeEn} onAr={(degreeAr) => setBundle((prev) => ({ ...prev, education: prev.education.map((row, i) => i === index ? { ...row, degreeAr } : row) }))} onEn={(degreeEn) => setBundle((prev) => ({ ...prev, education: prev.education.map((row, i) => i === index ? { ...row, degreeEn } : row) }))} />
              <Pair ui={ui} label="School" ar={item.schoolAr} en={item.schoolEn} onAr={(schoolAr) => setBundle((prev) => ({ ...prev, education: prev.education.map((row, i) => i === index ? { ...row, schoolAr } : row) }))} onEn={(schoolEn) => setBundle((prev) => ({ ...prev, education: prev.education.map((row, i) => i === index ? { ...row, schoolEn } : row) }))} />
            </div>
          ))}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setBundle((prev) => ({ ...prev, education: [...prev.education, { datesAr: '', datesEn: '', degreeAr: '', degreeEn: '', schoolAr: '', schoolEn: '' }] }))}>
              <Plus className="w-4 h-4 me-1" /> {ui.add}
            </Button>
            <Button type="button" onClick={() => save('education', bundle.education, true)} disabled={saving}>{saving ? ui.saving : ui.save}</Button>
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-3 mt-4">
          <HeadingPair ui={ui} title="Certificates" arKey="certsEyebrowAr" enKey="certsEyebrowEn" ar2="certsTitleAr" en2="certsTitleEn" profile={profile} setProfile={setProfile} />
          {bundle.certificates.map((item, index) => (
            <div key={index} className="rounded-xl border bg-card p-4 space-y-3">
              <div className="flex justify-end">
                <RowActions ui={ui} index={index} total={bundle.certificates.length} onUp={() => setBundle((prev) => ({ ...prev, certificates: moveItem(prev.certificates, index, -1) }))} onDown={() => setBundle((prev) => ({ ...prev, certificates: moveItem(prev.certificates, index, 1) }))} onRemove={() => setBundle((prev) => ({ ...prev, certificates: prev.certificates.filter((_, i) => i !== index) }))} />
              </div>
              <Pair ui={ui} label="Certificate" ar={item.textAr} en={item.textEn} onAr={(textAr) => setBundle((prev) => ({ ...prev, certificates: prev.certificates.map((row, i) => i === index ? { ...row, textAr } : row) }))} onEn={(textEn) => setBundle((prev) => ({ ...prev, certificates: prev.certificates.map((row, i) => i === index ? { ...row, textEn } : row) }))} />
            </div>
          ))}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setBundle((prev) => ({ ...prev, certificates: [...prev.certificates, { textAr: '', textEn: '' }] }))}>
              <Plus className="w-4 h-4 me-1" /> {ui.add}
            </Button>
            <Button type="button" onClick={() => save('certificates', bundle.certificates, true)} disabled={saving}>{saving ? ui.saving : ui.save}</Button>
          </div>
        </TabsContent>

        <TabsContent value="research" className="space-y-3 mt-4">
          <HeadingPair ui={ui} title="Research" arKey="researchEyebrowAr" enKey="researchEyebrowEn" ar2="researchTitleAr" en2="researchTitleEn" profile={profile} setProfile={setProfile} />
          {bundle.research.map((item, index) => (
            <div key={index} className="rounded-xl border bg-card p-4 space-y-3">
              <div className="flex justify-end">
                <RowActions ui={ui} index={index} total={bundle.research.length} onUp={() => setBundle((prev) => ({ ...prev, research: moveItem(prev.research, index, -1) }))} onDown={() => setBundle((prev) => ({ ...prev, research: moveItem(prev.research, index, 1) }))} onRemove={() => setBundle((prev) => ({ ...prev, research: prev.research.filter((_, i) => i !== index) }))} />
              </div>
              <Pair ui={ui} label="Name" ar={item.nameAr} en={item.nameEn} onAr={(nameAr) => setBundle((prev) => ({ ...prev, research: prev.research.map((row, i) => i === index ? { ...row, nameAr } : row) }))} onEn={(nameEn) => setBundle((prev) => ({ ...prev, research: prev.research.map((row, i) => i === index ? { ...row, nameEn } : row) }))} />
              <Pair ui={ui} label="Body" ar={item.bodyAr} en={item.bodyEn} onAr={(bodyAr) => setBundle((prev) => ({ ...prev, research: prev.research.map((row, i) => i === index ? { ...row, bodyAr } : row) }))} onEn={(bodyEn) => setBundle((prev) => ({ ...prev, research: prev.research.map((row, i) => i === index ? { ...row, bodyEn } : row) }))} multiline />
            </div>
          ))}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setBundle((prev) => ({ ...prev, research: [...prev.research, { nameAr: '', nameEn: '', bodyAr: '', bodyEn: '' }] }))}>
              <Plus className="w-4 h-4 me-1" /> {ui.add}
            </Button>
            <Button type="button" onClick={() => save('research', bundle.research, true)} disabled={saving}>{saving ? ui.saving : ui.save}</Button>
          </div>
        </TabsContent>

        <TabsContent value="languages" className="space-y-3 mt-4">
          <HeadingPair ui={ui} title="Languages" arKey="languagesEyebrowAr" enKey="languagesEyebrowEn" ar2="languagesTitleAr" en2="languagesTitleEn" profile={profile} setProfile={setProfile} />
          {bundle.spokenLanguages.map((item, index) => (
            <div key={index} className="rounded-xl border bg-card p-4 space-y-3">
              <div className="flex justify-end">
                <RowActions ui={ui} index={index} total={bundle.spokenLanguages.length} onUp={() => setBundle((prev) => ({ ...prev, spokenLanguages: moveItem(prev.spokenLanguages, index, -1) }))} onDown={() => setBundle((prev) => ({ ...prev, spokenLanguages: moveItem(prev.spokenLanguages, index, 1) }))} onRemove={() => setBundle((prev) => ({ ...prev, spokenLanguages: prev.spokenLanguages.filter((_, i) => i !== index) }))} />
              </div>
              <Pair ui={ui} label="Language" ar={item.nameAr} en={item.nameEn} onAr={(nameAr) => setBundle((prev) => ({ ...prev, spokenLanguages: prev.spokenLanguages.map((row, i) => i === index ? { ...row, nameAr } : row) }))} onEn={(nameEn) => setBundle((prev) => ({ ...prev, spokenLanguages: prev.spokenLanguages.map((row, i) => i === index ? { ...row, nameEn } : row) }))} />
              <Pair ui={ui} label="Level" ar={item.levelAr} en={item.levelEn} onAr={(levelAr) => setBundle((prev) => ({ ...prev, spokenLanguages: prev.spokenLanguages.map((row, i) => i === index ? { ...row, levelAr } : row) }))} onEn={(levelEn) => setBundle((prev) => ({ ...prev, spokenLanguages: prev.spokenLanguages.map((row, i) => i === index ? { ...row, levelEn } : row) }))} />
            </div>
          ))}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setBundle((prev) => ({ ...prev, spokenLanguages: [...prev.spokenLanguages, { nameAr: '', nameEn: '', levelAr: '', levelEn: '' }] }))}>
              <Plus className="w-4 h-4 me-1" /> {ui.add}
            </Button>
            <Button type="button" onClick={() => save('spokenLanguages', bundle.spokenLanguages, true)} disabled={saving}>{saving ? ui.saving : ui.save}</Button>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-3 mt-4">
          {bundle.socials.map((item, index) => (
            <div key={index} className="rounded-xl border bg-card p-4 space-y-3">
              <div className="flex justify-end">
                <RowActions ui={ui} index={index} total={bundle.socials.length} onUp={() => setBundle((prev) => ({ ...prev, socials: moveItem(prev.socials, index, -1) }))} onDown={() => setBundle((prev) => ({ ...prev, socials: moveItem(prev.socials, index, 1) }))} onRemove={() => setBundle((prev) => ({ ...prev, socials: prev.socials.filter((_, i) => i !== index) }))} />
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Label" value={item.label} onChange={(label) => setBundle((prev) => ({ ...prev, socials: prev.socials.map((row, i) => i === index ? { ...row, label } : row) }))} />
                <Field label={ui.url} value={item.url} onChange={(url) => setBundle((prev) => ({ ...prev, socials: prev.socials.map((row, i) => i === index ? { ...row, url } : row) }))} />
              </div>
              <Pair ui={ui} label={ui.followers} ar={item.followersAr} en={item.followersEn} onAr={(followersAr) => setBundle((prev) => ({ ...prev, socials: prev.socials.map((row, i) => i === index ? { ...row, followersAr } : row) }))} onEn={(followersEn) => setBundle((prev) => ({ ...prev, socials: prev.socials.map((row, i) => i === index ? { ...row, followersEn } : row) }))} />
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={item.showInHero}
                    onChange={(event) => setBundle((prev) => ({ ...prev, socials: prev.socials.map((row, i) => i === index ? { ...row, showInHero: event.target.checked } : row) }))}
                  />
                  {ui.showInHero}
                </label>
                <div className="w-32">
                  <Field label={ui.heroOrder} value={String(item.heroOrder)} onChange={(value) => setBundle((prev) => ({ ...prev, socials: prev.socials.map((row, i) => i === index ? { ...row, heroOrder: Number(value) || 0 } : row) }))} />
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setBundle((prev) => ({ ...prev, socials: [...prev.socials, { label: '', url: '', followersAr: '', followersEn: '', showInHero: false, heroOrder: prev.socials.length }] }))}>
              <Plus className="w-4 h-4 me-1" /> {ui.add}
            </Button>
            <Button type="button" onClick={() => save('socials', bundle.socials)} disabled={saving}>{saving ? ui.saving : ui.save}</Button>
          </div>
        </TabsContent>

        <TabsContent value="nav" className="space-y-3 mt-4">
          {bundle.nav.map((item, index) => (
            <div key={index} className="rounded-xl border bg-card p-4 space-y-3">
              <div className="flex justify-end">
                <RowActions ui={ui} index={index} total={bundle.nav.length} onUp={() => setBundle((prev) => ({ ...prev, nav: moveItem(prev.nav, index, -1) }))} onDown={() => setBundle((prev) => ({ ...prev, nav: moveItem(prev.nav, index, 1) }))} onRemove={() => setBundle((prev) => ({ ...prev, nav: prev.nav.filter((_, i) => i !== index) }))} />
              </div>
              <Field label={ui.href} value={item.href} onChange={(href) => setBundle((prev) => ({ ...prev, nav: prev.nav.map((row, i) => i === index ? { ...row, href } : row) }))} />
              <Pair ui={ui} label="Label" ar={item.labelAr} en={item.labelEn} onAr={(labelAr) => setBundle((prev) => ({ ...prev, nav: prev.nav.map((row, i) => i === index ? { ...row, labelAr } : row) }))} onEn={(labelEn) => setBundle((prev) => ({ ...prev, nav: prev.nav.map((row, i) => i === index ? { ...row, labelEn } : row) }))} />
            </div>
          ))}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setBundle((prev) => ({ ...prev, nav: [...prev.nav, { href: '#', labelAr: '', labelEn: '' }] }))}>
              <Plus className="w-4 h-4 me-1" /> {ui.add}
            </Button>
            <Button type="button" onClick={() => save('nav', bundle.nav)} disabled={saving}>{saving ? ui.saving : ui.save}</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function HeadingPair({
  ui,
  title,
  arKey,
  enKey,
  ar2,
  en2,
  profile,
  setProfile,
}: {
  ui: Ui
  title: string
  arKey: keyof PortfolioProfileData
  enKey: keyof PortfolioProfileData
  ar2: keyof PortfolioProfileData
  en2: keyof PortfolioProfileData
  profile: PortfolioProfileData
  setProfile: (key: keyof PortfolioProfileData, value: string) => void
}) {
  return (
    <div className="rounded-xl border bg-card p-4 space-y-3">
      <p className="text-sm font-medium">{ui.headings}</p>
      <Pair ui={ui} label={`${title} eyebrow`} ar={profile[arKey]} en={profile[enKey]} onAr={(value) => setProfile(arKey, value)} onEn={(value) => setProfile(enKey, value)} />
      <Pair ui={ui} label={`${title} title`} ar={profile[ar2]} en={profile[en2]} onAr={(value) => setProfile(ar2, value)} onEn={(value) => setProfile(en2, value)} />
    </div>
  )
}
