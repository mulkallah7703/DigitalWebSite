'use client'

import { useState } from 'react'
import { Check, Copy, Lightbulb, Target } from 'lucide-react'
import type { BlogPrompt } from '@/content/blog'

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(area)
    return ok
  }
}

export function CopyPrompt({ prompt, index, language }: { prompt: BlogPrompt; index: number; language: 'ar' | 'en' }) {
  const [copied, setCopied] = useState(false)
  const ar = language === 'ar'

  const onCopy = async () => {
    if (await copyText(prompt.text)) {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-primary/25 bg-card/70 shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-primary/20 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 px-4 py-3">
        <figcaption className="flex min-w-0 items-center gap-2.5 text-sm font-bold sm:text-base">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-xs text-white">
            {index}
          </span>
          <span className="leading-snug">{prompt.title}</span>
        </figcaption>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-primary/30 bg-background/80 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          aria-label={ar ? 'نسخ البرومبت' : 'Copy prompt'}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? (ar ? 'تم النسخ' : 'Copied') : ar ? 'نسخ' : 'Copy'}
        </button>
      </div>
      <pre
        dir={ar ? 'rtl' : 'ltr'}
        className="max-h-[28rem] overflow-auto whitespace-pre-wrap break-words bg-slate-950 px-5 py-4 font-mono text-[0.9rem] leading-7 text-slate-100 dark:bg-black/60"
      >
        <code>{prompt.text}</code>
      </pre>
      <div className="grid gap-3 border-t border-border/60 px-4 py-4 text-sm leading-relaxed sm:grid-cols-2">
        <div className="flex gap-2.5">
          <Target className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />
          <p>
            <span className="font-semibold">{ar ? 'متى تستخدمه: ' : 'When to use it: '}</span>
            <span className="text-muted-foreground">{prompt.when}</span>
          </p>
        </div>
        <div className="flex gap-2.5">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
          <p>
            <span className="font-semibold">{ar ? 'ماذا تتوقع: ' : 'What to expect: '}</span>
            <span className="text-muted-foreground">{prompt.expect}</span>
          </p>
        </div>
      </div>
    </figure>
  )
}
