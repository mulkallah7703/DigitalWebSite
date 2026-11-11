'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/providers/language-provider'
import { CONTACT_EMAIL } from '@/components/site/company-home'

const UPDATED = { ar: '11 نوفمبر 2026', en: 'November 11, 2026' }

type Section = { heading: string; paragraphs?: string[]; list?: string[] }

function PolicyLayout({
  title,
  lead,
  sections,
}: {
  title: string
  lead: string
  sections: Section[]
}) {
  const { language } = useLanguage()
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl lg:text-4xl font-bold mb-8">{title}</h1>
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-6">
          {language === 'ar' ? `آخر تحديث: ${UPDATED.ar}` : `Last updated: ${UPDATED.en}`}
        </p>
        {lead ? <p className="text-muted-foreground mb-8">{lead}</p> : null}
        {sections.map((section) => (
          <section key={section.heading} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
            {section.paragraphs?.map((p) => (
              <p key={p} className="text-muted-foreground mb-4">
                {p}
              </p>
            ))}
            {section.list ? (
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
        <p className="text-muted-foreground">
          {language === 'ar' ? 'للاستفسار راسلنا على ' : 'Questions? Email us at '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline" dir="ltr">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </div>
  )
}

const refund = {
  ar: {
    title: 'سياسة الاسترجاع',
    lead: 'تصف هذه الصفحة كيف نتعامل مع طلبات الاسترجاع للمنتجات الرقمية المباعة عبر متجر السعدي.',
    sections: [
      {
        heading: 'منتجات رقمية',
        paragraphs: [
          'كل ما يُباع في هذا المتجر منتجات رقمية (ملفات، دورات، أو مواد مشابهة). بسبب طبيعتها، تكون المبيعات نهائية في العادة بعد إتمام الطلب أو بدء التحميل.',
        ],
      },
      {
        heading: 'متى يمكن طلب مراجعة',
        paragraphs: [
          'قد نوافق على استرجاع أو على حل بديل في حالات فردية، إذا كان المنتج يختلف اختلافًا جوهريًا عن وصفه في صفحة المنتج، أو إذا كان به عيب كبير يمنع استخدامه للغرض المعلن. يجب إرسال الطلب خلال 14 يومًا من الشراء، مع رقم الطلب والبريد الإلكتروني المستخدم عند الشراء ووصف واضح للمشكلة.',
        ],
      },
      {
        heading: 'أين تم الشراء',
        paragraphs: [
          'إذا أتممت الشراء على هذا الموقع (عبر الحساب في المتجر، وقد يشمل الدفع عبر Stripe)، راسلنا على البريد أدناه وسنراجع الطلب.',
          'إذا أُعيد توجيهك لإتمام الشراء على Payhip، فإن الدفع والتسليم يخضعان أيضًا لصفحات Payhip الخاصة بذلك المنتج. يمكنك التواصل معنا أو مع Payhip حسب الحالة، وسنساعدك في توجيه الطلب.',
        ],
      },
      {
        heading: 'ما الذي قد نقدمه',
        paragraphs: [
          'بعد المراجعة قد نوفّر ملفًا بديلًا أو محدّثًا، أو استردادًا جزئيًا أو كاملًا، حسب تفاصيل الطلب. لا نعد بنتيجة محددة قبل المراجعة.',
        ],
      },
    ],
  },
  en: {
    title: 'Refund Policy',
    lead: 'This page explains how we handle refund requests for digital products sold through the Alsadi store.',
    sections: [
      {
        heading: 'Digital products',
        paragraphs: [
          'Everything sold in this store is a digital product (files, courses, or similar materials). Because of that, sales are generally final once an order is completed or a download has begun.',
        ],
      },
      {
        heading: 'When we may review a request',
        paragraphs: [
          'We may offer a refund or another remedy on a case-by-case basis if the product is significantly different from its description on the product page, or if it has a major defect that prevents it from being used as described. Requests must be made within 14 days of purchase, and should include your order number, the email address used at checkout, and a clear description of the problem.',
        ],
      },
      {
        heading: 'Where you purchased',
        paragraphs: [
          'If you completed the purchase on this website (through a store account, which may include payment via Stripe), email us at the address below and we will review the request.',
          'If you were sent to Payhip to complete the purchase, payment and delivery also follow Payhip’s pages for that product. You can contact us or Payhip as appropriate, and we will help route the request.',
        ],
      },
      {
        heading: 'Possible outcomes',
        paragraphs: [
          'After review we may provide a replacement or updated file, or a partial or full refund, depending on the order. We do not promise a particular outcome before that review.',
        ],
      },
    ],
  },
}

const cookies = {
  ar: {
    title: 'سياسة ملفات الارتباط',
    lead: 'نشرح هنا أنواع ملفات الارتباط والتقنيات المشابهة التي قد يستخدمها الموقع ولماذا.',
    sections: [
      {
        heading: 'ما هي ملفات الارتباط',
        paragraphs: [
          'ملفات الارتباط (Cookies) قطع صغيرة من البيانات يخزّنها المتصفح عند زيارة الموقع. بعضها لازم لعمل الصفحات، وبعضها يساعدنا على تذكر تفضيلاتك أو قياس الزيارات أو عرض الإعلانات.',
        ],
      },
      {
        heading: 'ما الذي نستخدمه',
        list: [
          'ملفات ضرورية لتشغيل الموقع، بما في ذلك جلسة تسجيل الدخول وحماية النماذج.',
          'تفضيلات مثل اللغة والمظهر حتى لا تُعاد كل زيارة.',
          'قد تُستخدم أدوات تحليل أو قياس بسيطة لفهم الصفحات الأكثر زيارة.',
          'نعرض إعلانات عبر Google AdSense. قد تضع Google ملفات ارتباط لعرض الإعلانات وقياسها وفق سياساتها.',
        ],
      },
      {
        heading: 'كيف تتحكم بها',
        paragraphs: [
          'يمكنك حظر ملفات الارتباط أو حذفها من إعدادات المتصفح. إن عطّلت الملفات الضرورية فقد لا يعمل تسجيل الدخول أو السلة أو إتمام الطلب بشكل صحيح.',
          'لإعلانات Google، يمكنك الاطلاع على إعدادات الإعلانات في حساب Google أو على صفحات سياسة الإعلانات لدى Google.',
        ],
      },
    ],
  },
  en: {
    title: 'Cookie Policy',
    lead: 'This page describes the cookies and similar technologies this site may use, and why.',
    sections: [
      {
        heading: 'What cookies are',
        paragraphs: [
          'Cookies are small pieces of data stored by your browser when you visit the site. Some are needed for the pages to work; others remember your preferences, help us understand traffic, or support advertising.',
        ],
      },
      {
        heading: 'What we use',
        list: [
          'Essential cookies that run the site, including your sign-in session and form protection.',
          'Preference cookies such as language and theme, so those choices persist between visits.',
          'We may use simple analytics or measurement tools to understand which pages are visited.',
          'We show ads through Google AdSense. Google may set cookies to serve and measure ads under its own policies.',
        ],
      },
      {
        heading: 'How to control cookies',
        paragraphs: [
          'You can block or delete cookies in your browser settings. If you disable essential cookies, sign-in, the cart, or checkout may not work correctly.',
          'For Google ads, you can review ad settings in your Google account or Google’s advertising policy pages.',
        ],
      },
    ],
  },
}

const licenseCopy = {
  ar: {
    title: 'الترخيص',
    lead: 'ما لم يُذكر خلاف ذلك في صفحة المنتج، يسري الترخيص التالي على المنتجات الرقمية المشتراة من هذا المتجر.',
    sections: [
      {
        heading: 'ما الذي يُسمح به',
        paragraphs: [
          'شراء المنتج يمنحك ترخيصًا لاستخدام الملفات، وليس نقل ملكيتها. ما لم تنص صفحة المنتج على شروط أضيق أو أوسع، يمكنك:',
        ],
        list: [
          'الاستخدام الشخصي والتجاري للملفات التي اشتريتها.',
          'استخدامها في عدد غير محدود من مشاريعك.',
          'تعديلها وتكييفها لمشاريعك.',
        ],
      },
      {
        heading: 'ما الذي لا يُسمح به',
        list: [
          'إعادة توزيع ملفات المنتج الأصلية أو إعادة بيعها كما هي.',
          'مشاركة حسابك أو روابط التحميل مع الآخرين.',
          'استخدام المنتجات في أعمال غير قانونية أو ضارة.',
        ],
      },
      {
        heading: 'التحديثات والحساب',
        paragraphs: [
          'الوصول إلى الملفات التي اشتريتها يتم عبر حسابك في المتجر أو عبر رسالة البريد التي نرسلها بعد الطلب، أو عبر صفحة Payhip إذا تم الشراء هناك. لا تشارك روابط التحميل؛ فقد تكون خاصة ومحدودة المدة.',
        ],
      },
    ],
  },
  en: {
    title: 'License',
    lead: 'Unless a product page says otherwise, the following license applies to digital products purchased from this store.',
    sections: [
      {
        heading: 'What is allowed',
        paragraphs: [
          'Buying a product grants you a license to use the files; it does not transfer ownership of them. Unless the product page states narrower or broader terms, you may:',
        ],
        list: [
          'Use the files you purchased for personal and commercial work.',
          'Use them in an unlimited number of your own projects.',
          'Modify and adapt them for your projects.',
        ],
      },
      {
        heading: 'What is not allowed',
        list: [
          'Redistributing or reselling the original product files as-is.',
          'Sharing your account or download links with others.',
          'Using the products in illegal or harmful work.',
        ],
      },
      {
        heading: 'Updates and your account',
        paragraphs: [
          'Access to the files you bought is through your store account, the email we send after the order, or the Payhip page if you purchased there. Do not share download links; they may be private and time-limited.',
        ],
      },
    ],
  },
}

const faqs = {
  ar: {
    title: 'الأسئلة الشائعة',
    lead: 'إجابات مختصرة عن الشراء والحساب والتحميل في متجر السعدي.',
    sections: [
      {
        heading: 'هل أحتاج إلى حساب؟',
        paragraphs: [
          'نعم لإتمام الطلب على هذا الموقع. يمكنك إنشاء حساب بالبريد الإلكتروني وكلمة المرور، أو تسجيل الدخول بحساب Google عند تفعيل هذه الخاصية. بعض المنتجات تُفتح على Payhip لإتمام الشراء، وهناك قد يُطلب منك حساب Payhip.',
        ],
      },
      {
        heading: 'كيف يصلني المنتج؟',
        paragraphs: [
          'كل المنتجات رقمية. إذا اشتريت من هذا الموقع، تُرسل الملفات إلى بريد الحساب أو تظهر في صفحة الطلبات مع روابط تحميل خاصة. إذا اشتريت عبر Payhip، يتم التسليم حسب صفحة ذلك المنتج على Payhip.',
        ],
      },
      {
        heading: 'كيف أدفع؟',
        paragraphs: [
          'حسب المنتج: بعض المنتجات تُدفع عبر Stripe من صفحة الدفع في هذا الموقع، وبعضها عبر رابط Payhip، وبعض المنتجات المجانية تُسلَّم بالبريد بعد تأكيد الطلب وأنت مسجّل الدخول.',
        ],
      },
      {
        heading: 'لم يصلني الملف',
        paragraphs: [
          'تحقق من مجلد الرسائل غير المرغوب فيها، ثم من صفحة الطلبات في حسابك. إن لم تجد شيئًا، راسلنا مع رقم الطلب والبريد المستخدم عند الشراء.',
        ],
      },
      {
        heading: 'هل يمكنني استرجاع المبلغ؟',
        paragraphs: [
          'المبيعات الرقمية نهائية في العادة. نراجع الطلبات خلال 14 يومًا إذا كان المنتج يختلف جوهريًا عن وصفه أو به عيب كبير. التفاصيل في صفحة سياسة الاسترجاع.',
        ],
      },
    ],
  },
  en: {
    title: 'Frequently Asked Questions',
    lead: 'Short answers about buying, accounts, and downloads in the Alsadi store.',
    sections: [
      {
        heading: 'Do I need an account?',
        paragraphs: [
          'Yes, to complete an order on this website. You can create an account with an email and password, or sign in with Google when that option is enabled. Some products send you to Payhip to finish the purchase, and Payhip may require its own account.',
        ],
      },
      {
        heading: 'How do I receive the product?',
        paragraphs: [
          'All products are digital. If you buy on this site, files are emailed to the account address or appear on your orders page with private download links. If you buy through Payhip, delivery follows that product’s Payhip page.',
        ],
      },
      {
        heading: 'How do I pay?',
        paragraphs: [
          'It depends on the product: some are paid through Stripe on this site’s checkout, some through a Payhip link, and free products are emailed after you confirm the order while signed in.',
        ],
      },
      {
        heading: 'I did not receive the file',
        paragraphs: [
          'Check your spam folder, then the orders page in your account. If you still cannot find it, email us with your order number and the address used at checkout.',
        ],
      },
      {
        heading: 'Can I get a refund?',
        paragraphs: [
          'Digital sales are generally final. We review requests made within 14 days if the product is significantly different from its description or has a major defect. See the refund policy for details.',
        ],
      },
    ],
  },
}

const help = {
  ar: {
    title: 'مركز المساعدة',
    lead: 'كيف تستخدم المتجر: الحساب، الشراء، واستلام الملفات الرقمية.',
    sections: [
      {
        heading: 'بدء الاستخدام',
        paragraphs: [
          'تصفح المنتجات من المتجر أو من صفحة المنتجات. لإتمام طلب على هذا الموقع أنشئ حسابًا أو سجّل الدخول (بالبريد أو عبر Google إن كان متاحًا)، ثم تابع الدفع.',
        ],
        list: [
          'حساب المتجر: صفحة تسجيل الدخول.',
          'طلباتك وتحميلاتك: صفحة الحساب والطلبات بعد تسجيل الدخول.',
          'تواصل معنا لأي مشكلة لم تُحل من هذه الصفحة.',
        ],
      },
      {
        heading: 'الشراء والتسليم',
        paragraphs: [
          'بعض المنتجات تُدفع في هذا الموقع (عبر Stripe عند الحاجة) ثم تُرسل الملفات بالبريد أو تُتاح من حسابك. وبعضها يفتح رابط Payhip لإتمام الشراء والتسليم هناك. اقرأ وصف المنتج قبل الدفع لتعرف الطريقة المستخدمة.',
        ],
      },
      {
        heading: 'روابط مفيدة',
        list: [
          'الأسئلة الشائعة',
          'سياسة الاسترجاع',
          'الترخيص',
          'سياسة الخصوصية',
          'سياسة ملفات الارتباط',
        ],
      },
    ],
  },
  en: {
    title: 'Help Center',
    lead: 'How to use the store: your account, buying, and receiving digital files.',
    sections: [
      {
        heading: 'Getting started',
        paragraphs: [
          'Browse products from the store or the products page. To complete an order on this site, create an account or sign in (with email or with Google when that option is available), then continue to checkout.',
        ],
        list: [
          'Store account: the sign-in page.',
          'Your orders and downloads: the account and orders pages after you sign in.',
          'Contact us if something is not resolved on this page.',
        ],
      },
      {
        heading: 'Buying and delivery',
        paragraphs: [
          'Some products are paid for on this site (via Stripe when payment is required) and then emailed or made available in your account. Others open a Payhip link to complete purchase and delivery there. Read the product description before you pay so you know which path applies.',
        ],
      },
      {
        heading: 'Useful links',
        list: [
          'Frequently asked questions',
          'Refund policy',
          'License',
          'Privacy policy',
          'Cookie policy',
        ],
      },
    ],
  },
}

const helpLinks: Record<string, string> = {
  'الأسئلة الشائعة': '/faqs',
  'سياسة الاسترجاع': '/refund-policy',
  الترخيص: '/license',
  'سياسة الخصوصية': '/privacy',
  'سياسة ملفات الارتباط': '/cookies',
  'Frequently asked questions': '/faqs',
  'Refund policy': '/refund-policy',
  License: '/license',
  'Privacy policy': '/privacy',
  'Cookie policy': '/cookies',
  'حساب المتجر: صفحة تسجيل الدخول.': '/auth/login',
  'Store account: the sign-in page.': '/auth/login',
  'طلباتك وتحميلاتك: صفحة الحساب والطلبات بعد تسجيل الدخول.': '/account/orders',
  'Your orders and downloads: the account and orders pages after you sign in.': '/account/orders',
  'تواصل معنا لأي مشكلة لم تُحل من هذه الصفحة.': '/contact',
  'Contact us if something is not resolved on this page.': '/contact',
}

export function RefundPolicyContent() {
  const { language } = useLanguage()
  const c = refund[language]
  return <PolicyLayout title={c.title} lead={c.lead} sections={c.sections} />
}

export function CookiePolicyContent() {
  const { language } = useLanguage()
  const c = cookies[language]
  return <PolicyLayout title={c.title} lead={c.lead} sections={c.sections} />
}

export function LicenseContent() {
  const { language } = useLanguage()
  const c = licenseCopy[language]
  return <PolicyLayout title={c.title} lead={c.lead} sections={c.sections} />
}

export function FaqsContent() {
  const { language } = useLanguage()
  const c = faqs[language]
  return <PolicyLayout title={c.title} lead={c.lead} sections={c.sections} />
}

export function HelpContent() {
  const { language } = useLanguage()
  const c = help[language]
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl lg:text-4xl font-bold mb-8">{c.title}</h1>
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-6">
          {language === 'ar' ? `آخر تحديث: ${UPDATED.ar}` : `Last updated: ${UPDATED.en}`}
        </p>
        <p className="text-muted-foreground mb-8">{c.lead}</p>
        {c.sections.map((section) => (
          <section key={section.heading} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
            {section.paragraphs?.map((p) => (
              <p key={p} className="text-muted-foreground mb-4">
                {p}
              </p>
            ))}
            {section.list ? (
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                {section.list.map((item) => {
                  const href = helpLinks[item]
                  return (
                    <li key={item}>
                      {href ? (
                        <Link href={href} className="text-primary hover:underline">
                          {item}
                        </Link>
                      ) : (
                        item
                      )}
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </section>
        ))}
        <p className="text-muted-foreground">
          {language === 'ar' ? 'للاستفسار راسلنا على ' : 'Questions? Email us at '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline" dir="ltr">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </div>
  )
}
