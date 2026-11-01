'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Code2, Mail, ShoppingBag, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/providers/language-provider'
import { BlogCard } from '@/components/blog/blog-card'
import { BLOG_POSTS } from '@/content/blog'
import { LegacyPortfolioHash } from '@/components/site/legacy-portfolio-hash'

export const CONTACT_EMAIL = 'mulkallah7@gmail.com'

const copy = {
  ar: {
    badge: 'منصة السعدي الرقمية',
    title: 'منصة رقمية تجمع المعرفة والتقنية والمنتجات في مكان واحد',
    lead:
      'السعدي الرقمية منصة عربية مستقلة أسسها ملك الله السعدي، طالب هندسة البرمجيات ومطوّر الـ full-stack، لتكون بيتًا واحدًا لثلاثة أشياء: متجر للمنتجات والدورات الرقمية، وخدمات برمجية وتقنية، ومحتوى تعليمي مجاني عن الذكاء الاصطناعي والإنتاجية.',
    ctaStore: 'تصفّح المتجر الرقمي',
    ctaPortfolio: 'تعرّف على المؤسس',
    servicesTitle: 'ماذا تقدّم المنصة؟',
    servicesLead: 'ثلاثة مسارات واضحة، لكل منها صفحته الخاصة، وكلها تنطلق من الفكرة نفسها: تقنية مفيدة يفهمها الجميع.',
    services: [
      {
        icon: 'store',
        title: 'المتجر الرقمي',
        body: 'منتجات ودورات وملفات رقمية مختارة تساعدك على التعلّم والعمل بشكل أذكى. الشراء آمن، وتصلك الملفات مباشرة بعد إتمام الطلب.',
        href: '/store',
        link: 'ادخل المتجر',
      },
      {
        icon: 'code',
        title: 'خدمات برمجية وتقنية',
        body: 'تطوير مواقع وتطبيقات ويب متكاملة، وحلول تعتمد على الذكاء الاصطناعي، واستشارات تقنية للأفراد والمشاريع الصغيرة التي تريد أن تبدأ بشكل صحيح.',
        href: '/contact',
        link: 'اطلب خدمة',
      },
      {
        icon: 'user',
        title: 'بورتفوليو المؤسس',
        body: 'تعرّف على ملك الله السعدي: خبراته ومشاريعه وأبحاثه وشهاداته وابتكاراته في توظيف الذكاء الاصطناعي لخدمة الرعاية الصحية والتعليم.',
        href: '/portfolio',
        link: 'شاهد البورتفوليو',
      },
      {
        icon: 'blog',
        title: 'المدونة',
        body: 'مقالات عربية مفصّلة وعملية عن أدوات الذكاء الاصطناعي مثل Claude وNotebookLM، والدورات المجانية، وطرق رفع الإنتاجية في الدراسة والعمل.',
        href: '/blog',
        link: 'اقرأ المدونة',
      },
    ],
    aboutTitle: 'عن السعدي الرقمية',
    aboutBody: [
      'بدأت السعدي الرقمية من قناعة بسيطة: المحتوى التقني الجيد باللغة العربية ما زال قليلًا، وكثير من الأدوات الحديثة تبدو معقدة لمن لم يجرّبها بعد. لذلك نحاول أن نقدم الشرح بلغة واضحة، والمنتج بجودة نثق بها، والخدمة بأسلوب يحترم وقت صاحبها.',
      'خلف المنصة مؤسسها ملك الله السعدي، طالب هندسة برمجيات ومطوّر full-stack، شغوف ببناء تقنيات ذكاء اصطناعي تُحدث أثرًا حقيقيًا في حياة الناس. كل ما تراه هنا، من المتجر إلى المدونة، مبني ومُدار بشكل مستقل.',
    ],
    aboutLink: 'اقرأ المزيد عنّا',
    blogTitle: 'أحدث المقالات',
    blogLead: 'أدلة عملية مكتوبة بعناية، تساعدك على استخدام أدوات الذكاء الاصطناعي بفعالية.',
    blogAll: 'كل المقالات',
    contactTitle: 'لنتحدث',
    contactBody:
      'عندك سؤال عن منتج، أو فكرة مشروع تحتاج من ينفذها، أو اقتراح لمقال جديد؟ راسلنا مباشرة على البريد الإلكتروني وسنرد عليك في أقرب وقت.',
    contactCta: 'صفحة التواصل',
  },
  en: {
    badge: 'Alsadi Digital Platform',
    title: 'One digital platform for knowledge, technology and products',
    lead:
      'Alsadi Digital is an independent Arabic platform founded by Mulk Allah Al-Sadi, a software engineering student and full-stack developer, to bring three things under one roof: a store for digital products and courses, software and tech services, and free educational content about AI and productivity.',
    ctaStore: 'Browse the Digital Store',
    ctaPortfolio: 'Meet the founder',
    servicesTitle: 'What the platform offers',
    servicesLead: 'Clear tracks, each with its own page, all built on the same idea: useful technology that everyone can understand.',
    services: [
      {
        icon: 'store',
        title: 'Digital Store',
        body: 'Selected digital products, courses and files that help you learn and work smarter. Checkout is secure and files are delivered right after your order.',
        href: '/store',
        link: 'Visit the store',
      },
      {
        icon: 'code',
        title: 'Software & tech services',
        body: 'Full-stack websites and web apps, AI-powered solutions, and technical advice for individuals and small projects that want to start the right way.',
        href: '/contact',
        link: 'Request a service',
      },
      {
        icon: 'user',
        title: 'Founder portfolio',
        body: 'Get to know Mulk Allah Al-Sadi: experience, projects, research, certificates and innovation in applying AI to healthcare and education.',
        href: '/portfolio',
        link: 'View the portfolio',
      },
      {
        icon: 'blog',
        title: 'Blog',
        body: 'Detailed, practical articles about AI tools such as Claude and NotebookLM, free courses, and ways to be more productive at study and work.',
        href: '/blog',
        link: 'Read the blog',
      },
    ],
    aboutTitle: 'About Alsadi Digital',
    aboutBody: [
      'Alsadi Digital started from a simple belief: good technical content in Arabic is still scarce, and many modern tools look complicated until someone explains them. So we aim for clear explanations, products we trust, and services that respect our clients’ time.',
      'Behind the platform is its founder, Mulk Allah Al-Sadi, a software engineering student and full-stack developer passionate about building AI technology that makes a real difference in people’s lives. Everything here, from the store to the blog, is built and run independently.',
    ],
    aboutLink: 'Read more about us',
    blogTitle: 'Latest articles',
    blogLead: 'Carefully written practical guides to help you use AI tools effectively.',
    blogAll: 'All articles',
    contactTitle: 'Let’s talk',
    contactBody:
      'Have a question about a product, a project idea that needs building, or a suggestion for a new article? Email us directly and we will get back to you as soon as we can.',
    contactCta: 'Contact page',
  },
}

const icons = { store: ShoppingBag, code: Code2, user: UserRound, blog: BookOpen }

export function CompanyHome() {
  const { language } = useLanguage()
  const c = copy[language]
  const latest = BLOG_POSTS.slice(0, 3)

  return (
    <>
      <LegacyPortfolioHash />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 start-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute bottom-0 end-0 h-72 w-72 rounded-full bg-pink-500/15 blur-3xl" />
          <div className="absolute bottom-10 start-0 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />
        </div>
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:py-28">
          <span className="mb-6 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            {c.badge}
          </span>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="gradient-text">{c.title}</span>
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-muted-foreground">{c.lead}</p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="gradient" size="lg">
              <Link href="/store">
                {c.ctaStore}
                <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio">{c.ctaPortfolio}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 border-t border-border/50 bg-secondary/20 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{c.servicesTitle}</h2>
            <p className="text-muted-foreground">{c.servicesLead}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.services.map((service) => {
              const Icon = icons[service.icon as keyof typeof icons]
              return (
                <div
                  key={service.href + service.title}
                  className="group flex flex-col rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-purple-500/10"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{service.title}</h3>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
                  <Link href={service.href} className="inline-flex items-center text-sm font-semibold text-primary">
                    {service.link}
                    <ArrowRight className="ms-1 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="platform-about" className="scroll-mt-20 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="gradient-text">{c.aboutTitle}</span>
            </h2>
          </div>
          <div className="space-y-5 lg:col-span-3">
            {c.aboutBody.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            <Link href="/about" className="inline-flex items-center font-semibold text-primary">
              {c.aboutLink}
              <ArrowRight className="ms-1 h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 bg-secondary/20 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="mb-2 text-3xl font-bold sm:text-4xl">{c.blogTitle}</h2>
              <p className="text-muted-foreground">{c.blogLead}</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/blog">
                {c.blogAll}
                <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section id="platform-contact" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-8 text-center sm:p-12">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{c.contactTitle}</h2>
            <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-muted-foreground">{c.contactBody}</p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="gradient" size="lg">
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  <Mail className="me-2 h-4 w-4" />
                  {CONTACT_EMAIL}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">{c.contactCta}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
