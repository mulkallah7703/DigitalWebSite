import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'from-idea-to-pptx-xlsx-with-claude',
  date: '2026-11-09',
  cover: '/blog/from-idea-to-pptx-xlsx-with-claude.webp?v=4',
  coverAlt: {
    ar: 'غلاف مقال: من فكرة إلى عرض تقديمي وملف Excel مع Claude',
    en: 'Cover: from an idea to a PowerPoint deck and Excel file with Claude',
  },
  tags: ['Claude', 'PowerPoint', 'Excel'],
  ar: {
    title:
      'من فكرة إلى عرض تقديمي وملف Excel جاهزين: سير عمل بـ 12 برومبتًا مع Claude ينتهي بملفين قابلين للتحميل',
    excerpt:
      'بدل قوائم برومبتات عامة، هذا سير عمل متسلسل: مقابلة قصيرة، ثم مخطط العرض، ثم بناء .pptx، ثم ملف .xlsx بالمعادلات ولوحة الملخص، ثم مراجعة تربط الأرقام بين الاثنين. اثنتا عشرة برومبتًا قوية مع مثال عملي ومعايير تحقق.',
    hook:
      'بنهاية هذا الدليل ستكون قد اتبعت سلسلة برومبتات واحدة من الفكرة إلى ملف عرض تقديمي (.pptx) وملف جداول (.xlsx) قابلين للتحميل، مع قائمة مراجعة تمنع أخطاء الأرقام والشرائح المكتظة.',
    sections: [
      {
        paragraphs: [
          'معظم قوائم "برومبتات العروض" أو "برومبتات Excel" تعطيك جملة عامة مثل "أنشئ عرضًا عن…" ثم تتركك مع نص طويل تلصقه يدويًا. المهارة المفيدة مختلفة: أن تعرف كيف تقود Claude في سلسلة قصيرة تنتهي بملفين حقيقيين تراجعهما قبل أن تعرضهما على أحد.',
          'هذا المقال يعلّمك سير عمل واحد قابل للتكرار: مقابلة أولًا (لا بناء فوري)، ثم مخطط العرض وقصته، ثم بناء ملف PowerPoint، ثم بناء ملف Excel بنفس الأرقام، ثم مراجعة تربط الاثنين. البرومبتات مكتوبة بدور، ومتغيرات سياق، وقيود، وشكل مخرجات، ومعايير جودة.',
        ],
      },
      {
        heading: 'ماذا يستطيع Claude فعله رسميًا اليوم؟',
        paragraphs: [
          'وفق مركز مساعدة Claude ومقال Anthropic عن إنشاء الملفات، يستطيع Claude تنفيذ كود داخل بيئة معزولة لإنشاء ملفات Excel (.xlsx) وعروض PowerPoint (.pptx) ومستندات Word (.docx) وPDF، ويمكنك تنزيلها أو حفظها في Google Drive. الحد الأقصى المذكور للملف الواحد رفعًا وتنزيلًا هو 30 ميغابايت. القدرة متاحة على الويب وتطبيق سطح المكتب والجوال، وتغطي خطط Free وPro وMax وUltra وTeam وEnterprise (مع إعدادات شبكة يتحكم بها أصحاب خطط Team/Enterprise).',
          'إضافة إلى ذلك، تعرض صفحة Claude for Microsoft 365 أن إضافات Claude لـ Excel وPowerPoint وWord متاحة عمومًا على الخطط المدفوعة، بحيث تعمل داخل التطبيق نفسه. إن لم تكن الإضافة متاحة لحسابك، يكفي مسار إنشاء الملفات داخل claude.ai الموضّح أعلاه. لا تعتمد على وعود مثل "عرض كامل في 120 ثانية": الجودة تأتي من المقابلة والمراجعة، لا من السرعة.',
        ],
      },
      {
        heading: 'المثال العملي الذي سنبنيه',
        paragraphs: [
          'لتتعلم المهارة لا النظرية، اخترنا مثالًا صغيرًا واضحًا يمكنك استبداله بموضوعك:',
        ],
        list: [
          'الموضوع: تقرير ربع سنوي لمبادرة طلابية (أو مشروع جانبي) بعنوان "نادي القراءة الجامعي — الربع الأول".',
          'الجمهور: مشرف النشاط + زملاء الفريق (10 دقائق عرض + دقيقة أسئلة).',
          'القرار المطلوب: الموافقة على ميزانية 2,500 ر.س لربعٍ ثانٍ.',
          'أرقام أساسية (تخيّلية للتدريب): 48 عضوًا، 6 لقاءات، متوسط حضور 31، مصروف فعلي 1,180 ر.س، رضا 4.2/5 من 40 ردًا.',
        ],
      },
      {
        heading: 'كيف تستخدم السلسلة',
        paragraphs: [
          'افتح محادثة جديدة في Claude. نفّذ البرومبتات بالترتيب داخل نفس المحادثة حتى يحتفظ بالسياق. عندما يطلب منك أسئلة (البرومبت 1 و7) أجب بجمل قصيرة قبل أن تسمح له بالبناء. بعد كل ملف: نزّله، افتحه في PowerPoint أو Excel (أو Google Drive)، ونفّذ قائمة المراجعة قبل أن تعرضه.',
        ],
      },
      {
        heading: 'البرومبتات الاثنتا عشرة',
        paragraphs: [],
        prompts: [
          {
            title: '1) مقابلة ما قبل البناء',
            when: 'أول رسالة في المحادثة، قبل أي مخطط أو ملف.',
            expect:
              'قائمة أسئلة مرقمة فقط، بلا مخطط وبلا شرائح. بعد إجاباتك يلخّص "بطاقة المشروع" في نصف صفحة.',
            text: `أنت مستشار عروض وبيانات، لا منفّذًا أعمى.
أريد في نهاية هذه المحادثة ملفين قابلين للتحميل:
1) عرض PowerPoint (.pptx)
2) ملف Excel (.xlsx) يدعم الأرقام نفسها

قبل أي بناء أو مخطط، اسألني كل ما يلزم في رسالة واحدة مرقمة (لا تتجاوز 12 سؤالًا). غطِّ:
- الهدف من العرض والقرار المطلوب من الجمهور
- الجمهور، مدته، وأسلوب اللغة (عربي/إنجليزي/مزيج)
- عدد الشرائح الأقصى، وما يجب تجنّبه (مثل الشعارات أو الأرقام غير المؤكدة)
- مصادر الأرقام المتاحة لديّ الآن (وما هو تقديري)
- هل أحتاج ورقة ملخص (Dashboard) في Excel؟
- قيود الهوية البصرية (ألوان، شعار، اتجاه RTL)

لا تقترح هيكلًا ولا تنشئ ملفات الآن. بعد إجاباتي فقط: لخّص "بطاقة مشروع" من 8 أسطر ثم انتظر تأكيدي.`,
          },
          {
            title: '2) مخطط العرض وقصة الرحلة',
            when: 'بعد تأكيد بطاقة المشروع.',
            expect:
              'جدول شرائح بعدد محدد، لكل شريحة: العنوان، الوظيفة في القصة، فكرة واحدة، ودليل بصري مقترح.',
            text: `اعتمادًا على بطاقة المشروع المؤكدة فقط (لا تختلق أرقامًا جديدة):

أنشئ مخطط عرض بصيغة جدول Markdown بالأعمدة:
# | عنوان الشريحة | وظيفتها في القصة (Hook / مشكلة / دليل / حل / طلب) | الفكرة الواحدة | عنصر بصري مقترح | ملاحظات للمتحدث (جملة)

قيود:
- حد أقصى [عدد] شرائح، منها شريحة عنوان وشريحة قرار/CTA.
- كل شريحة فكرة واحدة فقط.
- لا فقرات؛ عناوين قصيرة.
- إن نقص رقم ضروري فاكتب [يحتاج مصدرًا] بدل اختلاقه.
- اقترح قوسًا سرديًا واضحًا: افتتاح يشد الانتباه → فجوة/مشكلة → دليل بأرقام → ما فعلناه → الطلب الواضح.

في النهاية: اكتب بجملتين "ما الذي يجب أن يتذكره الجمهور بعد 24 ساعة؟".
لا تنشئ ملف .pptx بعد.`,
          },
          {
            title: '3) محتوى الشرائح بصيغة جاهزة للبناء',
            when: 'بعد اعتماد المخطط.',
            expect:
              'لكل شريحة عنوان ونقاط قصيرة وعبارة متحدث، مع الالتزام بحد الكلمات.',
            text: `حوّل المخطط المعتمد إلى محتوى نهائي للشرائح.

لكل شريحة أخرج بالضبط:
SLIDE N — [العنوان]
On-slide (حد أقصى 5 نقاط، كل نقطة ≤ 10 كلمات):
- ...
Speaker note (≤ 25 كلمة): ...
Visual: [نوع العنصر] — [ماذا يعرض]

قواعد:
- اللغة: [العربية]
- ممنوع الفقرات على الشريحة.
- الأرقام تُكتب بالصيغة التي أعطيتك إياها فقط.
- لا تضف مصادر أو إحصاءات غير موجودة في بطاقة المشروع.
- شريحة القرار الأخيرة يجب أن تحتوي طلبًا واحدًا واضحًا + الخطوة التالية + تاريخًا إن وُجد.

بعد القائمة، اقترح 3 بدائل لافتتاح الشريحة 1 (سؤال / رقم صادم من بياناتي / جملة فجوة) لأختار واحدًا.`,
          },
          {
            title: '4) موجز بصري موحّد قبل الملف',
            when: 'قبل طلب إنشاء .pptx.',
            expect:
              'نظام تصميم مختصر: ألوان، طباعة، قواعد شبكة، وما يُمنع.',
            text: `قبل إنشاء ملف PowerPoint، اكتب موجز تصميم من صفحة واحدة:

1) الألوان: أساسي، ثانوي، تأكيد (بسُود HEX). افترض خلفية فاتحة ونصًا داكنًا ما لم أطلب غير ذلك.
2) الخطوط: عنوان / جسم (أو ما يعادلها داخل PPTX).
3) الشبكة: هوامش، حد أقصى للعناصر في الشريحة، متى نستخدم عمودين.
4) قواعد البيانات: متى عمود، ومتى خط، ومتى رقم كبير واحد فقط.
5) ممنوع: خلفيات مزخرفة، أكثر من خطين مختلفين، قصصص Clipart، أكثر من لون تأكيد واحد لكل شريحة.
6) لكل نوع شريحة (عنوان، مقارنة، رقم كبير، جدول صغير، CTA) صف تخطيطًا بجملة.

لا تنشئ الملف بعد. انتظر موافقتي على الموجز.`,
          },
          {
            title: '5) أنشئ ملف .pptx جاهزًا للتحميل',
            when: 'بعد الموافقة على المحتوى والموجز البصري.',
            expect:
              'ملف .pptx قابل للتنزيل + قائمة تحقق ذاتية بما نُفّذ.',
            text: `أنشئ الآن ملف PowerPoint (.pptx) قابلًا للتحميل اعتمادًا على:
- بطاقة المشروع
- المخطط والمحتوى المعتمدين
- موجز التصميم

متطلبات تقنية للمحتوى:
- طبّق فكرة واحدة لكل شريحة، والنقاط القصيرة كما اتفقنا.
- اجعل شريحة العنوان تحمل العنوان الفرعي والجمهور/التاريخ إن وُجدا.
- ضع الأرقام الكبيرة في شريحة مستقلة بدل دفنها في نقاط.
- أضف ملاحظات المتحدث في Notes إن أمكن.
- استخدم تخطيطًا نظيفًا؛ إن تعذّر تطابق لوني دقيق فاقترب واذكر ذلك.

بعد الإنشاء:
1) أعطني رابط/زر التنزيل.
2) لخّص في نقاط: عدد الشرائح، أين تقع شريحة القرار، وأي شريحة تحتاج صورتي الخاصة لاحقًا.
3) لا تختلق بيانات جديدة أثناء البناء.`,
          },
          {
            title: '6) مراجعة العرض كناقد قاسٍ',
            when: 'بعد تنزيل .pptx وقبل بنائه النهائي للجمهور.',
            expect:
              'تقرير عيوب مرتّب حسب الخطورة مع إصلاحات محددة لكل شريحة ضعيفة.',
            text: `راجع محتوى العرض الحالي (كما هو في المحادثة / الملف) كأنك مدير يكره الشرائح المكتظة.

أخرج جدولًا:
الشريحة | المشكلة | الخطورة (عالية/متوسطة/منخفضة) | إصلاح محدد بجملة

افحص خصوصًا:
- أكثر من فكرة في شريحة واحدة
- نقاط أطول من اللازم
- رقم بلا سياق (مقارنة أو هدف)
- انتقال مفقود بين المشكلة والحل
- CTA غامض أو طلبان في شريحة القرار
- أي رقم يبدو مخترعًا أو متعارضًا

ثم أعد صياغة أسوأ شاشتين بالكامل بصيغة SLIDE جاهزة.
لا تعِد بناء الملف إلا إذا طلبت ذلك صراحة.`,
          },
          {
            title: '7) مقابلة ملف Excel قبل أي ورقة',
            when: 'بعد استقرار أرقام العرض، أو بالتوازي إن كانت الأرقام جاهزة.',
            expect:
              'أسئلة فقط ثم مخطط أوراق الأعمدة، بلا ملف بعد.',
            text: `أنت محلل يبني مصنفات Excel قابلة للصيانة، لا جداول عشوائية.
سنبني ملف .xlsx يغذي أرقام العرض نفسه.

قبل الإنشاء اسألني (≤ 10 أسئلة) عن:
- الكيانات (أعضاء، لقاءات، مصروفات، استبيان…)
- الحقول التي أملكها فعلًا مقابل ما أقدّره
- الحسابات التي أحتاج رؤيتها في نظرة واحدة (KPI)
- هل أحتاج بيانات عيّنة واقعية لأجرب الصيغ؟ كم صفًا؟
- هل يُسمح بـ VBA/ماكرو؟ (افترض لا)
- لغة رؤوس الأعمدة

بعد إجاباتي: اقترح هيكل الأوراق:
ورقة RawData / ورقة Calculations / ورقة Dashboard
مع قائمة أعمدة كل ورقة، ومفتاح العلاقات إن وُجد.
لا تنشئ الملف قبل تأكيدي.`,
          },
          {
            title: '8) ابنِ .xlsx بالمعادلات ومواقع الخلايا',
            when: 'بعد اعتماد هيكل الأوراق.',
            expect:
              'ملف .xlsx + قائمة بكل معادلة وموقعها ومعناها، وبيانات عيّنة.',
            text: `أنشئ ملف Excel (.xlsx) قابلًا للتحميل حسب الهيكل المعتمد، مع الالتزام بأرقام بطاقة المشروع.

متطلبات:
1) ورقة بيانات خام بعناوين واضحة و[عدد] صفوف عيّنة واقعية إن وافقتُ على العيّنة.
2) كل الحسابات بصيغ Excel حقيقية (لا قيم ثابتة مكان المجموع/المتوسط إلا إن كانت مدخلًا).
3) بعد بناء الملف، أخرج جدولًا:
الورقة | الخلية | الصيغة | ماذا تحسب | اعتماداتها
4) سمِّ الخلايا المهمة أو استخدم جدولًا (Table) إن كان أوضح.
5) لا تخفِ أخطاءً؛ إن تعذّر حساب مؤشر فاكتب ذلك صراحة في الخلية المجاورة بتعليق نصي.
6) ورقة Dashboard منفصلة: مؤشرات كبيرة (أعضاء، حضور متوسط، مصروف، رضا، المتبقي من الميزانية) مع إشارة إلى خلايا المصدر.

في الرسالة: اشرح كيف أختبر الملف خلال 3 دقائق (أي خلايا أغيّرها وما الذي يجب أن يتغير).`,
          },
          {
            title: '9) لوحة ملخص قابلة للشرح في دقيقة',
            when: 'إذا كانت ورقة Dashboard ضعيفة أو تحتاج إعادة تصميم.',
            expect:
              'إعادة ترتيب لوحة الملخص + نص يشرح كل مؤشر لجمهور غير تقني.',
            text: `حسّن ورقة Dashboard في الملف الحالي (أو صِف تحسينًا ثم حدّث الملف إن قدرت):

- صف أعلى: 4 إلى 6 بطاقات KPI فقط، كل بطاقة = رقم + تسمية + مقارنة بسيطة (هدف/سابق) إن توفّر.
- صف وسط: جدول صغير Top/Risk (مثل أقل اللقاءات حضورًا أو أكبر بند مصروف).
- تجنّب الرسوم المزخرفة؛ إن لزم مخطط فواحد فقط يوضح اتجاهًا زمنيًا.
- أضف يسار/يمين كل KPI جملة "ماذا يعني هذا لصاحب القرار؟" في خلية ملاحظات أو في ردك.

ثم أعطني سكربت 60 ثانية أقرأ به اللوحة أمام مشرف غير تقني.`,
          },
          {
            title: '10) طابقة أرقام العرض مع Excel',
            when: 'بعد وجود الملفين، قبل الإرسال أو العرض.',
            expect:
              'جدول تطابق رقمًا رقمًا، مع إصلاحات للشرائح أو الخلايا المتعارضة.',
            text: `لدينا عرض .pptx وملف .xlsx لنفس المشروع. مهمتك ضمان أن كل رقم يظهر في العرض له مصدر في Excel.

أخرج جدولًا:
الرقم كما في العرض | الشريحة | خلية المصدر في Excel | متطابق؟ (نعم/لا) | إن لا: التصحيح المقترح

قواعد:
- إن وُجد رقم في العرض بلا مصدر، اقترح إزالته أو إضافة حسابه في Excel.
- إن وُجد مؤشر مهم في Dashboard غير مذكور في العرض، اقترح شريحة واحدة أو ملاحظة متحدث لا شريحة جديدة إلا للضرورة.
- لا تغيّر الملفات حتى أختار التصحيحات؛ بعدها حدّث الملف المتأثر فقط.`,
          },
          {
            title: '11) قائمة مراجعة نهائية قبل التسليم',
            when: 'آخر خطوة قبل إرسال الملفين لشخص آخر.',
            expect:
              'قائمة فحص بنتائج Pass/Fail مع أوامر إصلاح سريعة.',
            text: `اختبر الملفين الحاليين بهذه القائمة، وأجب Pass/Fail مع دليل قصير:

العرض:
1) كل شريحة فكرة واحدة؟
2) الشريحة الأولى تجيب "لماذا نهتم؟" خلال 5 ثوانٍ؟
3) شريحة القرار تطلب شيئًا واحدًا واضحًا؟
4) لا توجد فقرة طويلة على شريحة؟
5) الأرقام متطابقة مع Excel؟

Excel:
6) المجاميع بالمعادلات لا بأرقام ثابتة؟
7) تغيير صف عيّنة يحدّث Dashboard؟
8) لا توجد #REF! أو #DIV/0! ظاهرة؟
9) أسماء الأوراق والأعمدة مفهومة لشخص جديد؟
10) لا مفاتيح ولا بيانات حسّاسة داخل الملف؟

لأي Fail: اكتب أمر إصلاح جاهزًا ألصقه لك في الرسالة التالية.`,
          },
          {
            title: '12) حزمة التسليم: ملخص تنفيذي + رسالة إرسال',
            when: 'بعد نجاح قائمة المراجعة.',
            expect:
              'ملخص تنفيذي من نصف صفحة، ونص رسالة قصير لإرفاق الملفين، بلا مبالغة.',
            text: `جهّز حزمة تسليم بالعربية الفصحى الواضحة:

A) ملخص تنفيذي ≤ 120 كلمة: الهدف، أهم رقمين، الطلب من الجمهور، والخطوة التالية.
B) نص رسالة إيميل/واتساب لإرفاق الملفين (≤ 80 كلمة) يذكر اسم الملفين وما يراجعه المستلم أولًا (شريحة القرار + لوحة Dashboard).
C) ثلاثة أسئلة متوقعة من الجمهور مع إجابة من جملة واحدة لكل سؤال، مربوطة بخلايا/شرائح محددة.

ممنوع: وعود زمنية مبالغ فيها، وادّعاء أن الملف "جاهز بلا مراجعة بشرية".`,
          },
        ],
      },
      {
        heading: 'عينة من المخرج المتوقع (بطاقة مشروع مختصرة)',
        paragraphs: [
          'بعد البرومبت 1 وإجابات المثال، يفترض أن ترى ملخصًا قريبًا من هذا قبل أي بناء:',
        ],
        list: [
          'الهدف: الحصول على موافقة ميزانية 2,500 ر.س للربع الثاني.',
          'الجمهور: مشرف النشاط + 4 أعضاء لجنة؛ المدة 10 دقائق.',
          'الرسالة: النادي أثبت حضورًا ثابتًا بتكلفة منخفضة ويستحق توسعة محدودة.',
          'الشرائح: 8 كحد أقصى، عربية، بدون شعارات خارجية.',
          'Excel: ورقة بيانات لقاءات + مصروفات، وDashboard بـ 5 مؤشرات.',
          'أرقام معتمدة: 48 عضوًا، متوسط حضور 31، مصروف 1,180، رضا 4.2/5.',
        ],
      },
      {
        heading: 'نصائح للحصول على ملف قابل للتحميل فعلًا',
        paragraphs: [],
        list: [
          'اطلب الملف بصيغة صريحة: «أنشئ ملف .pptx قابلًا للتحميل» أو «أنشئ ملف .xlsx».',
          'إن أجاب Claude بنص فقط، ذكّره: «استخدم بيئة إنشاء الملفات وأخرج الملف للتنزيل».',
          'بعد التنزيل افتح الملف محليًا؛ لا تعتمد على المعاينة داخل الدردشة وحدها.',
          'إن كنت على خطة مدفوعة وتفضّل التعديل داخل Excel/PowerPoint مباشرة، وثّقت Anthropic إضافات Claude لـ Excel وPowerPoint وWord على الخطط المدفوعة عبر Claude for Microsoft 365 — راجع صفحة المنتج الرسمية لإصدار حسابك.',
          'لا ترفع بيانات حسّاسة إلى جلسة فيها وصول شبكة إن كانت سياسات جهتك تمنع ذلك؛ أصحاب Team/Enterprise يمكنهم ضبط الشبكة من لوحة التحكم كما يوضح مركز المساعدة.',
        ],
      },
      {
        heading: 'أخطاء شائعة',
        paragraphs: [],
        list: [
          'طلب «أنشئ عرضًا كاملًا» من أول رسالة بلا مقابلة: ينتج شرائح عامة بلا قرار.',
          'تلصيق أرقام في الشرائح قبل بنائها في Excel: تظهر تعارضات محرجة أمام الجمهور.',
          'تحويل الشريحة إلى مقال: أكثر من فكرة أو أكثر من 5 نقاط.',
          'قبول أي معادلة دون اختبار: غيّر رقمًا في صف عيّنة وتأكد أن Dashboard يتحدث.',
          'تكرار وعود مثل «خلال دقيقتين» أو «وداعًا لـ PowerPoint»: المهارة هي السلسلة والمراجعة لا الشعار.',
        ],
      },
      {
        heading: 'قائمة سير العمل السريعة',
        paragraphs: [],
        list: [
          'مقابلة العرض (1) → مخطط وقصة (2) → محتوى (3) → موجز بصري (4).',
          'بناء .pptx (5) → نقد قاسٍ (6).',
          'مقابلة Excel (7) → بناء .xlsx مع الصيغ (8) → تحسين Dashboard (9).',
          'مطابقة الأرقام (10) → مراجعة Pass/Fail (11) → حزمة التسليم (12).',
        ],
      },
    ],
  },
  en: {
    title:
      'From an Idea to a Ready PowerPoint Deck and Excel File: a 12-Prompt Claude Workflow That Ends With Two Downloadable Files',
    excerpt:
      'Instead of generic prompt lists, this is a chained workflow: a short interview, then a deck outline, then a real .pptx, then a matching .xlsx with formulas and a dashboard, then a review that ties the numbers together. Twelve strong prompts, a worked example, and a pre-delivery checklist.',
    hook:
      'By the end of this guide you will have followed one prompt chain from a rough idea to a downloadable PowerPoint (.pptx) and spreadsheet (.xlsx), with a checklist that catches crowded slides and mismatched numbers.',
    sections: [
      {
        paragraphs: [
          'Most “presentation prompts” or “Excel prompts” lists hand you a vague line like “create a deck about…” and leave you with a wall of text to paste by hand. The useful skill is different: knowing how to steer Claude through a short chain that ends with two real files you review before anyone else sees them.',
          'This article teaches one repeatable workflow: interview first (no instant building), then the deck outline and story, then the PowerPoint file, then an Excel file with the same numbers, then a review that links both. Each prompt has a role, context variables, constraints, an output shape, and quality checks.',
        ],
      },
      {
        heading: 'What Claude can officially do today',
        paragraphs: [
          'According to the Claude Help Center and Anthropic’s file-creation announcement, Claude can run code in a sandboxed environment to create Excel spreadsheets (.xlsx), PowerPoint presentations (.pptx), Word documents (.docx) and PDFs, which you can download or save to Google Drive. The stated size limit is 30MB per file for uploads and downloads. The capability is available on web, desktop and mobile across Free, Pro, Max, Ultra, Team and Enterprise plans (with network controls for Team/Enterprise owners).',
          'Separately, Claude for Microsoft 365 documents that the Claude add-ins for Excel, PowerPoint and Word are generally available on paid plans, so Claude can work inside those apps. If the add-in is not on your account, the claude.ai file-creation path above is enough. Do not rely on hype like “a full deck in 120 seconds”: quality comes from the interview and the review, not from speed.',
        ],
      },
      {
        heading: 'The worked example we will build',
        paragraphs: [
          'To learn the skill rather than the theory, we use a small clear example you can swap for your own topic:',
        ],
        list: [
          'Topic: a quarterly update for a student initiative (or side project) titled “University Reading Club — Q1”.',
          'Audience: the activity supervisor + teammates (10-minute talk + one minute for questions).',
          'Decision needed: approve a SAR 2,500 budget for Q2.',
          'Base figures (fictional, for practice): 48 members, 6 meetups, average attendance 31, actual spend SAR 1,180, satisfaction 4.2/5 from 40 replies.',
        ],
      },
      {
        heading: 'How to run the chain',
        paragraphs: [
          'Open a new Claude chat. Run the prompts in order in the same thread so context carries. When it asks questions (prompts 1 and 7), answer in short lines before you allow it to build. After each file: download it, open it in PowerPoint or Excel (or Google Drive), and run the checklist before you present.',
        ],
      },
      {
        heading: 'The twelve prompts',
        paragraphs: [],
        prompts: [
          {
            title: '1) Pre-build interview',
            when: 'The first message in the chat, before any outline or file.',
            expect:
              'A numbered question list only — no outline, no slides. After your answers it summarises an 8-line project card and waits.',
            text: `You are a presentation and data advisor, not a blind builder.
By the end of this chat I want two downloadable files:
1) a PowerPoint deck (.pptx)
2) an Excel workbook (.xlsx) that backs the same numbers

Before any outline or file, ask everything you need in one numbered message (max 12 questions). Cover:
- the goal of the talk and the decision I need from the audience
- audience, length, and language (Arabic / English / mixed)
- maximum slide count, and what to avoid (logos, unverified figures, etc.)
- which numbers I already have (and which are estimates)
- whether I need an Excel Dashboard sheet
- visual constraints (colours, logo, RTL)

Do not propose a structure or create files yet. Only after my answers: summarise an 8-line project card and wait for my confirmation.`,
          },
          {
            title: '2) Deck outline and story arc',
            when: 'After the project card is confirmed.',
            expect:
              'A slide table with a set count; each row has a title, story role, one idea, and a visual cue.',
            text: `Using only the confirmed project card (do not invent new numbers):

Build a deck outline as a Markdown table with columns:
# | Slide title | Story role (Hook / Problem / Evidence / Solution / Ask) | Single idea | Suggested visual | Speaker note (one sentence)

Constraints:
- Max [N] slides, including a title slide and a decision/CTA slide.
- One idea per slide.
- No paragraphs; short titles.
- If a needed number is missing, write [needs a source] instead of inventing it.
- Propose a clear arc: attention-opening → gap/problem → evidence with numbers → what we did → a clear ask.

End with two sentences: “What should the audience still remember after 24 hours?”
Do not create a .pptx yet.`,
          },
          {
            title: '3) Slide content ready to build',
            when: 'After the outline is approved.',
            expect:
              'Per slide: a title, short bullets, a speaker line, within word limits.',
            text: `Turn the approved outline into final slide content.

For every slide output exactly:
SLIDE N — [title]
On-slide (max 5 bullets, ≤ 10 words each):
- ...
Speaker note (≤ 25 words): ...
Visual: [type] — [what it shows]

Rules:
- Language: [English]
- No paragraphs on the slide.
- Numbers only in the form I already gave you.
- Do not add sources or stats that are not in the project card.
- The final decision slide must contain one clear ask + next step + a date if we have one.

After the list, suggest 3 openings for slide 1 (a question / a striking number from my data / a gap sentence) so I can pick one.`,
          },
          {
            title: '4) Visual brief before the file',
            when: 'Before asking for the .pptx.',
            expect:
              'A one-page design system: colours, type, grid rules, and what is banned.',
            text: `Before creating the PowerPoint file, write a one-page design brief:

1) Colours: primary, secondary, accent (HEX). Assume a light background and dark text unless I said otherwise.
2) Type: title / body (or the closest equivalents inside PPTX).
3) Grid: margins, max elements per slide, when to use two columns.
4) Data rules: when a column chart, when a line, when a single big number.
5) Banned: busy backgrounds, more than two typefaces, clip art, more than one accent colour per slide.
6) For each slide type (title, comparison, big number, small table, CTA) describe a layout in one sentence.

Do not create the file yet. Wait for my OK on the brief.`,
          },
          {
            title: '5) Create a downloadable .pptx',
            when: 'After the content and visual brief are approved.',
            expect:
              'A downloadable .pptx plus a short self-check of what was built.',
            text: `Create a downloadable PowerPoint (.pptx) now, based on:
- the project card
- the approved outline and content
- the design brief

Content requirements:
- One idea per slide, with the short bullets we agreed.
- Title slide includes subtitle and audience/date when present.
- Put big numbers on their own slide instead of burying them in bullets.
- Add speaker notes in Notes when possible.
- Keep the layout clean; if an exact colour match is impossible, get close and say so.

After creating it:
1) Give me the download link/button.
2) Summarise in bullets: slide count, where the decision slide is, and which slide still needs my own image later.
3) Do not invent new data while building.`,
          },
          {
            title: '6) Harsh deck review',
            when: 'After downloading the .pptx, before showing it to anyone.',
            expect:
              'A severity-ordered defect table with a concrete fix per weak slide.',
            text: `Review the current deck content (as in this chat / file) like a manager who hates crowded slides.

Output a table:
Slide | Issue | Severity (High/Med/Low) | Specific one-sentence fix

Check especially for:
- more than one idea on a slide
- bullets that are too long
- a number with no context (comparison or target)
- a missing bridge from problem to solution
- a vague CTA or two asks on the decision slide
- any number that looks invented or conflicting

Then fully rewrite the two worst slides in SLIDE format.
Do not rebuild the file unless I explicitly ask.`,
          },
          {
            title: '7) Excel interview before any sheet',
            when: 'After the deck numbers are stable, or in parallel if the figures are ready.',
            expect:
              'Questions only, then a sheet/column plan — no file yet.',
            text: `You are an analyst who builds maintainable Excel workbooks, not random tables.
We will build an .xlsx that feeds the same numbers as the deck.

Before creating anything, ask me (≤ 10 questions) about:
- entities (members, meetups, expenses, survey…)
- fields I actually have vs estimates
- KPIs I need at a glance
- whether I want realistic sample rows to test formulas — how many?
- VBA/macros allowed? (assume no)
- language of column headers

After my answers: propose the sheet structure
RawData / Calculations / Dashboard
with column lists per sheet and relationship keys if any.
Do not create the file until I confirm.`,
          },
          {
            title: '8) Build the .xlsx with formulas and cell locations',
            when: 'After the sheet plan is approved.',
            expect:
              'A downloadable .xlsx plus a table of every formula, its cell and meaning, with sample rows.',
            text: `Create a downloadable Excel (.xlsx) from the approved structure, sticking to the project-card numbers.

Requirements:
1) A raw data sheet with clear headers and [N] realistic sample rows if I approved samples.
2) All calculations as real Excel formulas (no hardcoded totals/averages unless an input).
3) After building, output a table:
Sheet | Cell | Formula | What it calculates | Depends on
4) Name key cells or use a Table when clearer.
5) Do not hide failures; if a metric cannot be calculated, say so in an adjacent note cell.
6) A separate Dashboard sheet: big KPIs (members, average attendance, spend, satisfaction, budget remaining) referencing source cells.

In your message: explain a 3-minute test (which cells I change and what must update).`,
          },
          {
            title: '9) A dashboard you can explain in one minute',
            when: 'If the Dashboard sheet is weak or needs a redesign.',
            expect:
              'A clearer dashboard layout plus plain-language meaning for each KPI.',
            text: `Improve the Dashboard sheet in the current workbook (describe the improvement, then update the file if you can):

- Top row: only 4–6 KPI cards, each = number + label + a simple comparison (target/previous) when available.
- Middle: a small Top/Risk table (e.g. lowest-attendance meetup or largest expense line).
- Avoid decorative charts; if needed, one chart that shows a time trend.
- Beside each KPI, add one sentence “what this means for the decision-maker” in a note cell or in your reply.

Then give me a 60-second script to walk a non-technical supervisor through the dashboard.`,
          },
          {
            title: '10) Match deck numbers to Excel',
            when: 'After both files exist, before sending or presenting.',
            expect:
              'A number-by-number match table, with fixes for conflicts.',
            text: `We have a .pptx and an .xlsx for the same project. Your job is to ensure every number on the deck has a source in Excel.

Output a table:
Number as on the deck | Slide | Excel source cell | Match? (Yes/No) | If no: proposed fix

Rules:
- If a deck number has no source, suggest removing it or adding the calculation in Excel.
- If an important Dashboard metric is missing from the deck, suggest one slide or a speaker note — a new slide only if necessary.
- Do not change the files until I pick the fixes; then update only the affected file.`,
          },
          {
            title: '11) Final pre-delivery checklist',
            when: 'Last step before sending the files to someone else.',
            expect:
              'A Pass/Fail checklist with ready repair prompts for any Fail.',
            text: `Test the current files against this list. Answer Pass/Fail with a short evidence note:

Deck:
1) One idea per slide?
2) Does slide 1 answer “why care?” in five seconds?
3) Does the decision slide ask for exactly one clear thing?
4) No long paragraph on a slide?
5) Numbers match Excel?

Excel:
6) Totals are formulas, not typed values?
7) Changing a sample row updates the Dashboard?
8) No visible #REF! or #DIV/0!?
9) Sheet and column names clear to a newcomer?
10) No secrets or sensitive data inside the file?

For every Fail: write a ready repair instruction I can paste back to you next.`,
          },
          {
            title: '12) Delivery pack: executive summary + send note',
            when: 'After the checklist passes.',
            expect:
              'A half-page executive summary and a short message to attach both files, without hype.',
            text: `Prepare a delivery pack in clear language:

A) Executive summary ≤ 120 words: goal, two key numbers, the ask, and the next step.
B) An email/WhatsApp note to attach both files (≤ 80 words) naming the files and what to review first (decision slide + Dashboard).
C) Three likely audience questions with a one-sentence answer each, tied to specific cells/slides.

Banned: exaggerated time claims, and any claim that the files are “ready with no human review”.`,
          },
        ],
      },
      {
        heading: 'Sample of the expected output (short project card)',
        paragraphs: [
          'After prompt 1 and the example answers, you should see a summary close to this before any building:',
        ],
        list: [
          'Goal: get approval for a SAR 2,500 Q2 budget.',
          'Audience: activity supervisor + 4 committee members; 10 minutes.',
          'Message: the club showed steady attendance at low cost and deserves a limited expansion.',
          'Slides: max 8, Arabic, no external logos.',
          'Excel: meetup + expense data sheets, and a Dashboard with 5 KPIs.',
          'Approved figures: 48 members, average attendance 31, spend 1,180, satisfaction 4.2/5.',
        ],
      },
      {
        heading: 'Tips for actually getting a downloadable file',
        paragraphs: [],
        list: [
          'Ask for the file in explicit form: “Create a downloadable .pptx” or “Create an .xlsx file”.',
          'If Claude replies with text only, remind it: “Use file creation and output the file for download”.',
          'After download, open the file locally; do not rely on the in-chat preview alone.',
          'On a paid plan, if you prefer editing inside Excel/PowerPoint themselves, Anthropic documents Claude add-ins for Excel, PowerPoint and Word on paid plans via Claude for Microsoft 365 — check the official product page for your account.',
          'Do not upload sensitive data to a session with network access if your organisation forbids it; Team/Enterprise owners can configure network access as described in the Help Center.',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [],
        list: [
          'Asking for “a full deck” in the first message with no interview: you get generic slides with no decision.',
          'Pasting numbers onto slides before they live in Excel: conflicts show up in front of the audience.',
          'Turning a slide into an article: more than one idea or more than five bullets.',
          'Accepting any formula without a test: change a sample row and confirm the Dashboard updates.',
          'Repeating hype like “in two minutes” or “goodbye PowerPoint”: the skill is the chain and the review, not the slogan.',
        ],
      },
      {
        heading: 'Quick workflow checklist',
        paragraphs: [],
        list: [
          'Deck interview (1) → outline & story (2) → content (3) → visual brief (4).',
          'Build .pptx (5) → harsh review (6).',
          'Excel interview (7) → build .xlsx with formulas (8) → improve Dashboard (9).',
          'Match the numbers (10) → Pass/Fail review (11) → delivery pack (12).',
        ],
      },
    ],
  },
}
