'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { ArrowRight, Menu, Moon, Sun, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { useLanguage } from '@/components/providers/language-provider'
import type { PortfolioView } from '@/lib/portfolio-db'

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  )
}

export function PortfolioPage({ contentByLang }: { contentByLang: { ar: PortfolioView; en: PortfolioView } }) {
  const { language } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const content = language === 'en' ? contentByLang.en : contentByLang.ar
  const heroSocials = content.heroSocialLabels
    .map((label) => content.socials.find((social) => social.label === label))
    .filter((social): social is NonNullable<typeof social> => Boolean(social))

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <a href="#hero" className="font-bold text-base sm:text-lg shrink-0 gradient-text">
            {content.name}
          </a>

          <nav className="hidden xl:flex items-center gap-5">
            {content.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="gradient" size="sm" className="shrink-0">
              <Link href="/store">
                {content.myProducts}
                <ArrowRight className="w-4 h-4 ms-1.5 rtl:rotate-180" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
              <a href={content.cvUrl} target="_blank" rel="noopener noreferrer">
                {content.cvLabel}
              </a>
            </Button>
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {menuOpen && (
          <nav className="xl:hidden border-t bg-background">
            <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {content.nav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="px-3 py-2 rounded-lg text-sm hover:bg-accent"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={content.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="px-3 py-2 rounded-lg text-sm hover:bg-accent md:hidden"
              >
                {content.cvLabel}
              </a>
            </div>
          </nav>
        )}
      </header>

      <main className="pt-16">
        <section id="hero" className="relative overflow-hidden scroll-mt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 dark:from-indigo-500/5 dark:via-purple-500/5 dark:to-pink-500/5" />
          <div className="absolute top-1/4 start-1/4 w-80 h-80 bg-indigo-500/25 rounded-full blur-3xl" />
          <div className="absolute bottom-0 end-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="container relative mx-auto px-4 py-16 lg:py-24 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 text-center lg:text-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                {content.roleBadge}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
                <span className="gradient-text">{content.name}</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8">{content.heroLead}</p>
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3">
                <Button asChild size="lg" variant="gradient">
                  <Link href="/store">
                    {content.myProducts}
                    <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#contact">{content.contactCta}</a>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <a href={content.cvUrl} target="_blank" rel="noopener noreferrer">
                    {content.downloadCv}
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-6">
                {heroSocials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  >
                    <span className="font-semibold text-foreground">{social.label}</span>
                    <span>{social.followers}</span>
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-8 pt-6 border-t">
                {content.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1 max-w-[12rem]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-1.5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-xl shadow-indigo-500/25">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-card">
                  <img
                    src={content.photoUrl}
                    alt={content.photoAlt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="container mx-auto px-4 py-16 lg:py-20 scroll-mt-24">
          <div className="grid lg:grid-cols-[220px_1fr] gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">{content.aboutEyebrow}</p>
              <h2 className="text-3xl font-bold">{content.aboutTitle}</h2>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">{content.aboutBody}</p>
          </div>
        </section>

        <section id="skills" className="container mx-auto px-4 py-16 scroll-mt-24">
          <SectionHeading eyebrow={content.skillsEyebrow} title={content.skillsTitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {content.skillGroups.map((group) => (
              <div key={group.title} className="rounded-2xl border bg-card p-5">
                <h3 className="font-semibold mb-3">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="text-xs rounded-md bg-primary/10 text-primary px-2.5 py-1">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="container mx-auto px-4 py-16 scroll-mt-24">
          <SectionHeading eyebrow={content.experienceEyebrow} title={content.experienceTitle} />
          <div className="divide-y border-y">
            {content.experience.map((job) => (
              <div key={`${job.company}-${job.title}`} className="grid md:grid-cols-[140px_1fr] gap-3 md:gap-8 py-6">
                <div className="text-sm text-muted-foreground">{job.dates}</div>
                <div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-sm text-primary mb-3">{job.company}</p>
                  <ul className="list-disc ps-5 space-y-1.5 text-muted-foreground">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="innovation" className="container mx-auto px-4 py-16 scroll-mt-24">
          <SectionHeading eyebrow={content.innovationEyebrow} title={content.innovationTitle} />
          <div className="space-y-5">
            {content.innovations.map((item) => (
              <div key={`${item.badge}-${item.name}`} className="rounded-2xl border bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-pink-500/10 p-6 sm:p-10">
                <span className="inline-flex text-xs font-medium rounded-md bg-background/70 border px-3 py-1 mb-4">
                  {item.badge}
                </span>
                <h3 className="text-2xl font-semibold mb-3 max-w-3xl">{item.name}</h3>
                <p className="text-muted-foreground max-w-3xl leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="container mx-auto px-4 py-16 scroll-mt-24">
          <SectionHeading eyebrow={content.projectsEyebrow} title={content.projectsTitle} />
          <div className="grid md:grid-cols-2 gap-5">
            {content.projects.map((project, index) => (
              <article key={`${project.name}-${index}`} className="rounded-2xl border bg-card p-6 flex flex-col">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.name} className="w-full h-40 object-cover rounded-xl mb-4" />
                ) : null}
                <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs rounded-md border border-primary/40 text-primary px-2.5 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.demoUrl && (
                  <Button asChild variant="outline" size="sm" className="mt-4 self-start">
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      {content.liveDemo}
                    </a>
                  </Button>
                )}
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px]">
            <div className="rounded-2xl bg-card px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-start">
                <h3 className="text-2xl font-bold gradient-text">{content.myProducts}</h3>
                <p className="text-sm text-muted-foreground mt-1">{content.myProductsHint}</p>
              </div>
              <Button asChild size="lg" variant="gradient">
                <Link href="/store">
                  {content.myProducts}
                  <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="education" className="container mx-auto px-4 py-16 scroll-mt-24">
          <SectionHeading eyebrow={content.educationEyebrow} title={content.educationTitle} />
          <div className="divide-y border-y">
            {content.education.map((item) => (
              <div key={`${item.dates}-${item.degree}`} className="grid md:grid-cols-[140px_1fr] gap-2 md:gap-8 py-5">
                <div className="text-sm text-muted-foreground">{item.dates}</div>
                <div>
                  <div className="font-semibold">{item.degree}</div>
                  {item.school ? <div className="text-sm text-muted-foreground mt-1">{item.school}</div> : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="certifications" className="container mx-auto px-4 py-16 scroll-mt-24">
          <SectionHeading eyebrow={content.certsEyebrow} title={content.certsTitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {content.certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span className="text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="research" className="container mx-auto px-4 py-16 scroll-mt-24">
          <SectionHeading eyebrow={content.researchEyebrow} title={content.researchTitle} />
          <div className="space-y-4 max-w-3xl">
            {content.researchItems.map((item) => (
              <div key={item.name} className="rounded-2xl border bg-card p-6 sm:p-8">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="languages" className="container mx-auto px-4 py-16 scroll-mt-24">
          <SectionHeading eyebrow={content.languagesEyebrow} title={content.languagesTitle} />
          <div className="grid sm:grid-cols-3 gap-4">
            {content.languages.map((item) => (
              <div key={item.name} className="rounded-2xl border bg-card p-5">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-primary mt-1">{item.level}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="container mx-auto px-4 py-16 pb-20 scroll-mt-24">
          <div className="rounded-2xl border bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-background px-6 py-12 text-center">
            <h2 className="text-3xl font-bold mb-3">{content.contactTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">{content.contactBody}</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Button asChild variant="gradient">
                <a href={`mailto:${content.email}`}>{content.emailCta}</a>
              </Button>
              <Button asChild variant="outline">
                <a href={`tel:${content.phone}`}>{content.phone}</a>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/store">{content.myProducts}</Link>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {content.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-28 rounded-xl border bg-background/70 px-4 py-2 text-center hover:border-primary hover:text-primary transition-colors"
                >
                  <div className="text-sm font-semibold">{social.label}</div>
                  <div className="text-xs text-muted-foreground">{social.followers}</div>
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-10">{content.copyright}</p>
          </div>
        </section>
      </main>
    </div>
  )
}
