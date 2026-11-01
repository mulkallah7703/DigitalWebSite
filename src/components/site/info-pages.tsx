'use client'

import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/providers/language-provider'
import { CONTACT_EMAIL } from '@/components/site/company-home'

function PageHero({ title, lead }: { title: string; lead: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border/50">
      <div className="pointer-events-none absolute -top-24 start-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl">
          <span className="gradient-text">{title}</span>
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">{lead}</p>
      </div>
    </section>
  )
}

const about = {
  ar: {
    title: 'من نحن',
    lead: 'السعدي الرقمية منصة عربية مستقلة تجمع المتجر الرقمي والخدمات التقنية والمحتوى التعليمي في مكان واحد.',
    sections: [
      {
        heading: 'قصتنا',
        body: 'انطلقت المنصة من ملاحظة بسيطة: كثير من الأدوات التقنية الحديثة، وخاصة أدوات الذكاء الاصطناعي، تبدو صعبة لمن لم يجربها، والشرح العربي الجيد لها ما زال قليلًا. أردنا مكانًا يجد فيه القارئ شرحًا واضحًا، ويجد فيه المتعلم منتجات مفيدة، ويجد فيه صاحب الفكرة من يساعده على تنفيذها تقنيًا.',
      },
      {
        heading: 'المؤسس',
        body: 'أسس المنصة ملك الله السعدي، طالب هندسة برمجيات ومطوّر full-stack، شغوف ببناء تقنيات ذكاء اصطناعي تخدم الرعاية الصحية والتعليم وتُحدث أثرًا حقيقيًا في حياة الناس. يمكنك التعرف على خبراته ومشاريعه وأبحاثه بالتفصيل في صفحة البورتفوليو.',
      },
      {
        heading: 'ماذا نقدم',
        body: 'متجرًا رقميًا للمنتجات والدورات والملفات التي تساعد على التعلم والعمل، وخدمات برمجية تشمل تطوير المواقع وتطبيقات الويب والحلول المعتمدة على الذكاء الاصطناعي، ومدونة تنشر أدلة عملية مجانية عن الأدوات الحديثة والإنتاجية.',
      },
      {
        heading: 'كيف نعمل',
        body: 'نحرص على الوضوح والصدق: لا نعد بنتائج مبالغ فيها، وننسب الأفكار إلى أصحابها، ونراجع ما ننشره قبل نشره. وإذا كان لديك ملاحظة أو تصحيح، يسعدنا أن تراسلنا.',
      },
    ],
    portfolio: 'بورتفوليو المؤسس',
    contact: 'تواصل معنا',
  },
  en: {
    title: 'About us',
    lead: 'Alsadi Digital is an independent Arabic platform that brings a digital store, tech services and educational content together in one place.',
    sections: [
      {
        heading: 'Our story',
        body: 'The platform began with a simple observation: many modern tools, especially AI tools, look difficult until you try them, and good explanations in Arabic are still scarce. We wanted a place where readers find clear explanations, learners find useful products, and people with an idea find help building it.',
      },
      {
        heading: 'The founder',
        body: 'Alsadi Digital was founded by Mulk Allah Al-Sadi, a software engineering student and full-stack developer passionate about building AI technology that serves healthcare and education and makes a real difference in people’s lives. His experience, projects and research are on the portfolio page.',
      },
      {
        heading: 'What we offer',
        body: 'A digital store of products, courses and files for learning and work; software services including websites, web apps and AI-powered solutions; and a blog with free, practical guides to modern tools and productivity.',
      },
      {
        heading: 'How we work',
        body: 'We value clarity and honesty: no exaggerated promises, credit to the original authors of ideas, and a review of everything before it is published. If you have a note or a correction, we would love to hear from you.',
      },
    ],
    portfolio: 'Founder portfolio',
    contact: 'Contact us',
  },
}

export function AboutContent() {
  const { language } = useLanguage()
  const c = about[language]
  return (
    <>
      <PageHero title={c.title} lead={c.lead} />
      <section className="mx-auto max-w-3xl space-y-10 px-4 py-16">
        {c.sections.map((s) => (
          <div key={s.heading}>
            <h2 className="mb-3 text-2xl font-bold">{s.heading}</h2>
            <p className="text-lg leading-loose text-muted-foreground">{s.body}</p>
          </div>
        ))}
        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <Button asChild variant="gradient">
            <Link href="/portfolio">
              {c.portfolio}
              <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">{c.contact}</Link>
          </Button>
        </div>
      </section>
    </>
  )
}

const contact = {
  ar: {
    title: 'تواصل معنا',
    lead: 'يسعدنا سماعك، سواء كان لديك سؤال أو فكرة مشروع أو ملاحظة.',
    emailTitle: 'البريد الإلكتروني',
    emailBody: 'أسرع طريقة للتواصل معنا هي البريد الإلكتروني. اكتب لنا رسالتك وسنرد عليك في أقرب وقت ممكن.',
    reasonsTitle: 'يمكنك مراسلتنا بخصوص',
    reasons: [
      'استفسار عن منتج في المتجر الرقمي أو عن طلب قمت به.',
      'طلب خدمة برمجية: موقع، أو تطبيق ويب، أو حل يعتمد على الذكاء الاصطناعي.',
      'اقتراح موضوع لمقال جديد في المدونة، أو تصحيح لمعلومة منشورة.',
      'فرص التعاون والشراكة.',
    ],
    tipTitle: 'لرد أسرع',
    tip: 'اذكر في رسالتك موضوعها بوضوح، وإن كان الأمر متعلقًا بطلب في المتجر فأرفق رقم الطلب والبريد الذي استخدمته عند الشراء.',
  },
  en: {
    title: 'Contact us',
    lead: 'We would love to hear from you, whether you have a question, a project idea or feedback.',
    emailTitle: 'Email',
    emailBody: 'Email is the fastest way to reach us. Send us your message and we will reply as soon as we can.',
    reasonsTitle: 'You can write to us about',
    reasons: [
      'A product in the Digital Store or an order you placed.',
      'A software service: a website, a web app or an AI-powered solution.',
      'A topic for a new blog article, or a correction to something we published.',
      'Collaboration and partnership opportunities.',
    ],
    tipTitle: 'For a faster reply',
    tip: 'State the subject clearly, and for store orders include your order number and the email you used at checkout.',
  },
}

export function ContactContent() {
  const { language } = useLanguage()
  const c = contact[language]
  return (
    <>
      <PageHero title={c.title} lead={c.lead} />
      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-16 md:grid-cols-2">
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-8">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="mb-3 text-2xl font-bold">{c.emailTitle}</h2>
          <p className="mb-6 leading-relaxed text-muted-foreground">{c.emailBody}</p>
          <Button asChild variant="gradient" size="lg" className="w-full sm:w-auto">
            <a href={`mailto:${CONTACT_EMAIL}`} dir="ltr">
              {CONTACT_EMAIL}
            </a>
          </Button>
        </div>
        <div className="space-y-6 rounded-2xl border border-border/60 bg-card/60 p-8">
          <div>
            <h2 className="mb-3 text-xl font-bold">{c.reasonsTitle}</h2>
            <ul className="list-disc space-y-2 ps-5 text-muted-foreground">
              {c.reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">{c.tipTitle}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{c.tip}</p>
          </div>
        </div>
      </section>
    </>
  )
}
