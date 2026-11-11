import Link from 'next/link'
import { cookies } from 'next/headers'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

const copy = {
  ar: {
    title: 'الصفحة غير موجودة',
    description: 'عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. قد تكون تم نقلها أو لا وجود لها.',
    back: 'العودة',
    home: 'الرئيسية',
  },
  en: {
    title: 'Page Not Found',
    description: "Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.",
    back: 'Go Back',
    home: 'Home',
  },
}

export default function NotFound() {
  const language = cookies().get('language')?.value === 'en' ? 'en' : 'ar'
  const t = copy[language]

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">{t.title}</h2>
        <p className="text-muted-foreground mb-8 max-w-md">{t.description}</p>
        <div className="flex items-center justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="javascript:history.back()">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.back}
            </Link>
          </Button>
          <Button asChild variant="gradient">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              {t.home}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
