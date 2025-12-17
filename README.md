# السعدي ديجيتال — موقع متجر رقمي ثابت

هيكل المشروع: صفحات HTML ثابتة مصمّمة لتكون قاعدة قابلة للنشر على أي استضافة ثابتة (Netlify, Vercel, GitHub Pages).

ملفّات رئيسية:
- `index.html` — الصفحة الرئيسية
- `products/index.html` — قائمة المنتجات
- `products/product1.html` ... `product5.html` — صفحات المنتجات
- `about.html`, `privacy-policy.html`, `terms.html`, `refund-policy.html`, `contact.html`
- `blog/index.html`, `blog/sample-article.html`
- `assets/styles.css`, `assets/logo.svg`
- `sitemap.xml`, `robots.txt`

خطوات النشر السريعة:
1. رفع المجلد إلى مستودع GitHub.
2. تفعيل GitHub Pages أو نشر على Netlify/Vercel.
3. تحديث `sitemap.xml` و`robots.txt` ليتضمنا رابط النطاق الفعلي.

ملاحظات AdSense وقبول الموقع:
- لا تضع أكواد إعلانية حتى تكون صفحاتك مكتملة وواضحة (محتوى أصلي كافٍ في كل صفحة).
- أضف رمز AdSense في مكان منطقي بعد قبول الحساب، أفضل المواقع للإعلانات: أعلى الشريط الجانبي، منتصف المقال (داخل المدونة)، وفي التذييل. لا تضيف عددًا مبالغًا به.
- تأكد من وجود صفحات: سياسة الخصوصية، الشروط والأحكام، صفحة تواصل، وصف واضح للمنتجات.

تحسين SEO أساسي:
- راجع عناوين الصفحات و`meta description` لكل صفحة.
- أنشئ مدونة منتظمة بمحتوى أصلي (3-5 مقالات مبدئياً).
- استخدم خرائط الموقع وGSC (Google Search Console) لإرسال sitemap.

كيفية إضافة Google Analytics/AdSense:
- ضع كود Google Analytics في `<head>`.
- ضع كود AdSense بعد الموافقة في أماكن الإعلانات وأبقِ الكمية معتدلة.

للمساعدة في ربط بوابة دفع أو نظام تحميل مؤمن أو إنشاء صفحات ديناميكية (مثل نظام حساب/تنزيل)، أستطيع تحويل المشروع إلى تطبيق بسيط باستخدام Node.js/Express أو نظام CMS مثل WordPress حسب تفضيلك.

