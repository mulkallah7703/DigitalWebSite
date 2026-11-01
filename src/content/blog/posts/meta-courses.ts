import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'meta-courses-and-certificates-guide',
  date: '2026-10-29',
  cover: '/blog/meta-courses-and-certificates-guide.png',
  coverLines: ['Meta Courses', '& Certificates'],
  coverAlt: { ar: 'غلاف مقال دورات Meta وشهاداتها', en: 'Cover: Meta courses and certificates' },
  tags: ['Meta', 'Coursera', 'Career'],
  ar: {
    title: 'دورات Meta بشهادات احترافية: كيف تدرسها مجانًا أو بمساعدة مالية، وثمانية برومبتات تحوّلها إلى وظيفة ومشاريع حقيقية',
    excerpt:
      'دليل دقيق لشهادات Meta الاحترافية على Coursera (تطوير الواجهات، والخلفية، وتحليل البيانات، والتسويق عبر وسائل التواصل): ما المجاني فعلًا، وكيف تطلب المساعدة المالية، وثمانية برومبتات لاختيار المسار والمذاكرة وبناء ملف إنجازات.',
    hook:
      'ستعرف من هذا الدليل بالضبط ما يمكنك دراسته مجانًا وما يتطلب اشتراكًا أو مساعدة مالية، وستخرج بخطة دراسة، وطلب مساعدة مالية صادق ومنظم، ومشروع مميز يتجاوز مشروع الدورة، ومنشور LinkedIn يعرض إنجازك باحتراف.',
    sections: [
      {
        paragraphs: [
          'تنتشر كثيرًا عبارة "دورات Meta مجانية بالكامل مع شهادة"، والحقيقة أدق من ذلك، ومعرفتها توفر عليك وقتًا ومالًا. تقدم Meta مجموعة من الشهادات الاحترافية على منصة Coursera، تجدها مجمعة في صفحة coursera.org/meta-professional-certificates، ومنها: Meta Front-End Developer، وMeta Back-End Developer، وMeta Data Analyst، وMeta Social Media Marketing.',
          'حسب صفحات Coursera الرسمية: يمكنك "تدقيق" (Audit) مقررات البرنامج مجانًا، أي مشاهدة المحتوى دون تقييم الواجبات ودون الحصول على الشهادة. أما الشهادة فتتطلب الاشتراك المدفوع (عادة بعد فترة تجربة مجانية قصيرة)، أو الحصول على مساعدة مالية (Financial Aid) تُطلب لكل مقرر على حدة من صفحته، وقد تستغرق مراجعتها حتى 16 يومًا، وتُلغى إذا بدأت فترة تجربة الاشتراك أثناء المراجعة. وتعرض كل صفحة المدة التقديرية وعدد المقررات، فمثلًا تذكر صفحة شهادة Front-End أنها سلسلة من 9 مقررات.',
          'وإذا كان اهتمامك التسويق تحديدًا، فمنصة Meta Blueprint على facebookblueprint.com تقدم دورات تعليمية مجانية عن التسويق عبر منصات Meta. وفي كل الحالات، المرجع النهائي للأسعار والشروط هو الصفحة الرسمية لأنها قد تتغير.',
        ],
      },
      {
        heading: 'البرومبتات الثمانية',
        paragraphs: [],
        prompts: [
          {
            title: 'مستشار اختيار المسار',
            when: 'قبل التسجيل، إذا كنت مترددًا بين أكثر من شهادة.',
            expect: 'أسئلة عن خلفيتك وأهدافك، ثم مقارنة بين المسارات المناسبة لك، وتوصية مع أسبابها ومخاطرها. لا تعتمد على أرقام الرواتب إن ذكرها؛ تحقق منها من مصادر محلية.',
            text: `أنت مستشار مهني متخصص في مسارات التقنية للمبتدئين.

أفكر في إحدى شهادات Meta الاحترافية على Coursera: [Front-End Developer / Back-End Developer / Data Analyst / Social Media Marketing].

معلوماتي:
- خلفيتي الدراسية والعملية: [...]
- ما أستمتع به: [مثلًا: التصميم، المنطق، الأرقام، الكتابة]
- الوقت المتاح أسبوعيًا: [عدد الساعات]
- هدفي خلال سنة: [وظيفة، عمل حر، ترقية، مشروع خاص]
- بلدي وسوق العمل الذي أستهدفه: [...]

1. اسألني حتى 3 أسئلة إضافية إن احتجت، ثم توقف.
2. بعد إجابتي: قارن بين المسارين الأنسب لي في جدول (المهارات، ونوع العمل اليومي، وصعوبة البداية، وما يجب أن أبنيه بعد الشهادة).
3. أوصِ بمسار واحد مع 3 أسباب و3 مخاطر.
لا تذكر أرقام رواتب أو نسب توظيف.`,
          },
          {
            title: 'كاتب طلب المساعدة المالية بصدق ووضوح',
            when: 'إذا كانت تكلفة الشهادة عائقًا وتريد التقديم على المساعدة المالية من Coursera لمقرر معين.',
            expect: 'مسودة منظمة لإجاباتك مبنية على ظروفك الحقيقية فقط، بطول مناسب لمتطلبات النموذج. راجعها وعدّلها بصوتك؛ لا تقدّم معلومات غير صحيحة.',
            text: `ساعدني في كتابة إجابات طلب المساعدة المالية على Coursera لمقرر [اسم المقرر] من شهادة [اسم الشهادة].

معلوماتي الحقيقية:
- وضعي الدراسي أو المهني: [...]
- وضعي المادي باختصار ولماذا لا أستطيع الدفع الآن: [...]
- لماذا هذا المقرر تحديدًا وكيف يرتبط بهدفي: [...]
- كيف سأستخدم ما أتعلمه: [مشروع، وظيفة، مساعدة أسرتي أو مجتمعي]
- التزامي بالوقت: [عدد الساعات أسبوعيًا]

اكتب إجابتين منفصلتين: (1) سبب طلب المساعدة، (2) كيف سيساعدني المقرر في تحقيق أهدافي.
لكل إجابة 150 إلى 250 كلمة، بلغة إنجليزية بسيطة وصادقة.
قواعد: استخدم معلوماتي فقط، ولا تبالغ، ولا تضف ظروفًا لم أذكرها.`,
          },
          {
            title: 'خطة الدراسة: التدقيق المجاني أولًا ثم الشهادة',
            when: 'بعد اختيار المسار، لتقلل التكلفة: تدرس ما يمكن مجانًا، ثم تشترك أو تستخدم المساعدة المالية حين تكون جاهزًا.',
            expect: 'خطة أسبوعية لمقررات الشهادة حسب وقتك، تحدد ما تدرسه في وضع التدقيق وما تؤجله للنسخة المدفوعة (الواجبات المقيمة والمشاريع)، مع مراحل مراجعة.',
            text: `سأدرس شهادة [اسم الشهادة] على Coursera. عدد المقررات حسب الصفحة: [عدد]، والمدة التقديرية: [المدة].
وقتي: [عدد] ساعات أسبوعيًا.
استراتيجيتي: أدقق المقررات مجانًا أولًا لأفهم المحتوى، ثم أشترك أو أستخدم المساعدة المالية لإنجاز الواجبات المقيمة والحصول على الشهادة بأسرع وقت.

أنشئ خطة:
1. جدول أسبوعي: المقرر، والوحدات، والساعات، ووضع الدراسة (تدقيق/مدفوع)، والمخرَج العملي.
2. متى أبدأ الاشتراك أو أطلب المساعدة المالية حتى لا أدفع شهورًا أكثر من اللازم.
3. مشروع جانبي صغير بعد كل مقررين.
4. علامات تحذير تعني أنني متأخر وماذا أفعل.`,
          },
          {
            title: 'محول الدرس إلى ملاحظات واختبار ذاتي',
            when: 'بعد كل فيديو أو قراءة، بلصق ملاحظاتك أو نص الدرس المتاح لك.',
            expect: 'ملخص مختصر، ومصطلحات، وأسئلة استرجاع متدرجة دون إجابات، ثم تصحيح إجاباتك. هذا يثبت المعلومة أكثر من إعادة المشاهدة.',
            text: `هذه ملاحظاتي (أو نص الدرس) من مقرر [اسم المقرر]، درس [العنوان]:
<lesson>
[الصق]
</lesson>

1. لخّص الدرس في 5 نقاط.
2. جدول مصطلحات: المصطلح | تعريف في سطر | مثال.
3. 6 أسئلة استرجاع: 2 تذكر، و2 فهم، و2 تطبيق على موقف عملي. لا تكتب الإجابات.
4. انتظر إجاباتي ثم صححها واذكر ما أحتاج مراجعته.`,
          },
          {
            title: 'رافع مستوى مشروع الدورة',
            when: 'عند الوصول لمشروع تطبيقي أو ختامي، لتصنع نسخة مميزة لا تشبه آلاف النسخ.',
            expect: 'أفكار لتحويل المشروع إلى حل لمشكلة حقيقية، مع ميزات إضافية مرتبة حسب الصعوبة، وخطة تنفيذ، وطريقة لعرضه.',
            text: `أنا أعمل على مشروع [وصف مشروع الدورة] ضمن شهادة [اسم الشهادة].
مهاراتي الحالية: [...]. وقتي للمشروع: [عدد] ساعات.

ساعدني أجعله مميزًا:
1. 3 أفكار لربط المشروع بمشكلة حقيقية في [مجال يهمني أو مجتمعي].
2. للفكرة الأفضل: 5 ميزات إضافية مرتبة من الأسهل للأصعب، وما المهارة التي تثبتها كل ميزة.
3. خطة تنفيذ أسبوعية.
4. كيف أعرضه: عنوان، ووصف من 3 أسطر، وما أضعه في README، ولقطات الشاشة المطلوبة.
تأكد أن الأفكار لا تخالف شروط المشروع في الدورة.`,
          },
          {
            title: 'مراجع الكود لمسار تطوير الواجهات',
            when: 'لمتعلمي Front-End أو Back-End: بعد كتابة كود تمرين أو مشروع وقبل تسليمه.',
            expect: 'مراجعة كما يفعلها مطور خبير: أخطاء، وقابلية الوصول، والأداء، وأفضل الممارسات، مع شرح سبب كل ملاحظة دون إعادة كتابة كل شيء.',
            text: `أنت مطور [Front-End / Back-End] خبير تراجع كود متعلم.

السياق: تمرين [وصف] من شهادة [اسم الشهادة]. التقنيات: [HTML/CSS/JavaScript/React أو Python/Django...].

<code>
[الصق الكود]
</code>

راجع حسب الأولوية:
1. الأخطاء التي تكسر الوظيفة.
2. الأمان والتعامل مع المدخلات.
3. قابلية الوصول (Accessibility) أو تصميم الواجهة البرمجية حسب المسار.
4. القراءة والتنظيم والتسمية.
5. الأداء.

لكل ملاحظة: السطر، والمشكلة، ولماذا تهم، وتلميح للحل. لا تعد كتابة الملف كاملًا؛ أريد أن أصلحه بنفسي.`,
          },
          {
            title: 'خطة تسويق حقيقية لمسار التسويق',
            when: 'لمتعلمي Social Media Marketing أو Blueprint: لتطبيق ما تتعلمه على مشروع صغير حقيقي.',
            expect: 'خطة شهرية واقعية: الجمهور، والرسائل، وأنواع المحتوى، وجدول نشر، ومؤشرات قياس، دون وعود بأرقام نتائج.',
            text: `أنت مسوق رقمي يعلّم متدربًا.

المشروع: [نوع النشاط، المدينة، المنتج أو الخدمة]
الجمهور المحتمل: [...]
الميزانية: [مجانية / مبلغ محدود]
المنصات: [Instagram / Facebook / WhatsApp Business ...]

أنشئ خطة لمدة 4 أسابيع:
1. شخصية العميل (Persona) في 6 نقاط.
2. 3 رسائل أساسية للعلامة.
3. أعمدة المحتوى (3 إلى 4) ومثال منشور لكل عمود.
4. جدول نشر أسبوعي.
5. مؤشرات القياس ومتى أراجعها.
6. ما الذي أختبره (A/B) في الأسبوع الثالث.
لا تذكر نتائج متوقعة بالأرقام؛ أريد خطة قابلة للقياس.`,
          },
          {
            title: 'إعلان الشهادة على LinkedIn وفي السيرة الذاتية',
            when: 'بعد الحصول على الشهادة وإنهاء مشروعك.',
            expect: 'منشور LinkedIn يركز على ما بنيته وتعلمته لا على الشهادة فقط، وبندان للسيرة الذاتية بصيغة الإنجاز، كلها من معلوماتك.',
            text: `أنهيت شهادة [اسم الشهادة] من Meta على Coursera.

ما تعلمته فعلًا: [3 مهارات]
المشروع الذي بنيته: [وصف ورابط]
أصعب شيء واجهته وكيف تجاوزته: [...]
ما أبحث عنه الآن: [تدريب/وظيفة/عمل حر]

اكتب:
1. منشور LinkedIn من 120 إلى 170 كلمة: يبدأ بالمشروع أو التحدي لا بعبارة "يسعدني أن أعلن"، ويذكر الشهادة كجزء من القصة، وينتهي بما أبحث عنه.
2. بندين للسيرة الذاتية بصيغة: فعل + ماذا + بأي أداة + النتيجة.
3. 5 مهارات أضيفها في قسم Skills.
استخدم معلوماتي فقط ولا تبالغ.`,
          },
        ],
      },
      {
        heading: 'رسائل متابعة مفيدة',
        paragraphs: [],
        list: [
          '"ما المقررات في هذه الشهادة التي تتداخل مع ما أعرفه أصلًا، وكيف أسرّع فيها؟"',
          '"حوّل خطة الدراسة إلى قائمة مهام يومية لهذا الأسبوع فقط."',
          '"اقترح 3 أسئلة أطرحها على شخص يعمل في هذا المجال قبل أن أكمل."',
        ],
      },
      {
        heading: 'أخطاء شائعة',
        paragraphs: [],
        list: [
          'افتراض أن الشهادة مجانية ثم الاكتشاف بعد فترة التجربة أن الاشتراك بدأ.',
          'بدء فترة التجربة أثناء انتظار قرار المساعدة المالية، فيُلغى الطلب.',
          'كتابة طلب مساعدة مالية مبالغ فيه أو غير صادق.',
          'إنهاء الشهادة دون مشروع خاص يميزك عن غيرك.',
          'الاعتماد على معلومات قديمة من منشورات؛ ارجع دائمًا لصفحة Coursera الرسمية.',
        ],
      },
      {
        heading: 'قائمة سير العمل السريعة',
        paragraphs: [],
        list: [
          'افتح coursera.org/meta-professional-certificates واقرأ صفحة الشهادة التي تهمك.',
          'اختر المسار (البرومبت 1) وضع خطة دراسة (3).',
          'دقّق المحتوى مجانًا، واطلب المساعدة المالية إن احتجت (2) دون بدء تجربة.',
          'ثبّت كل درس بالاختبار الذاتي (4).',
          'طوّر مشروعًا مميزًا (5) وراجعه (6) أو طبّق خطة تسويق حقيقية (7).',
          'اعرض الإنجاز على LinkedIn وفي سيرتك (8).',
        ],
      },
    ],
  },
  en: {
    title: 'Meta Professional Certificates: How to Study Them Free or with Financial Aid, and Eight Prompts That Turn Them into Real Projects and Jobs',
    excerpt:
      'An accurate guide to Meta’s professional certificates on Coursera (Front-End, Back-End, Data Analyst, Social Media Marketing): what is actually free, how to request financial aid, and eight prompts for choosing a track, studying and building a portfolio.',
    hook:
      'You will learn exactly what you can study for free and what needs a subscription or financial aid, and leave with a study plan, an honest and well-structured financial aid application, a standout project beyond the course project, and a LinkedIn post that presents your achievement professionally.',
    sections: [
      {
        paragraphs: [
          'You often see “Meta courses are completely free with a certificate”. The truth is more precise, and knowing it saves time and money. Meta offers several professional certificates on Coursera, gathered at coursera.org/meta-professional-certificates, including Meta Front-End Developer, Meta Back-End Developer, Meta Data Analyst and Meta Social Media Marketing.',
          'According to Coursera’s official pages, you can audit the program’s courses for free: you see the content, but graded work and the certificate are not included. The certificate requires a paid subscription (usually after a short free trial) or Financial Aid, which you request per course from its page; review can take up to 16 days, and the application is cancelled if you start a subscription trial while it is pending. Each page lists the estimated duration and number of courses; the Front-End page, for example, describes a 9-course series.',
          'If marketing is your focus, Meta Blueprint at facebookblueprint.com offers free learning courses on marketing across Meta’s platforms. In every case, the official page is the final word on prices and terms, as they can change.',
        ],
      },
      {
        heading: 'The eight prompts',
        paragraphs: [],
        prompts: [
          {
            title: 'Track selection advisor',
            when: 'Before enrolling, if you are torn between certificates.',
            expect: 'Questions about your background and goals, then a comparison of the best-fit tracks and a recommendation with reasons and risks. Do not trust salary figures if it gives any; check local sources.',
            text: `You are a career advisor specialising in tech paths for beginners.

I am considering one of Meta's professional certificates on Coursera: [Front-End Developer / Back-End Developer / Data Analyst / Social Media Marketing].

About me:
- Education and work background: [...]
- What I enjoy: [e.g. design, logic, numbers, writing]
- Weekly time available: [hours]
- My goal within a year: [job, freelancing, promotion, own project]
- My country and target job market: [...]

1. Ask me up to 3 more questions if needed, then stop.
2. After my answers, compare the two best-fit tracks in a table (skills, daily work, difficulty to start, what I must build after the certificate).
3. Recommend one track with 3 reasons and 3 risks.
Do not mention salary figures or employment rates.`,
          },
          {
            title: 'Honest, clear financial aid application writer',
            when: 'If cost is a barrier and you want to apply for Coursera Financial Aid for a specific course.',
            expect: 'A structured draft of your answers based only on your real circumstances, at a length that suits the form. Review and edit it in your own voice; never submit untrue information.',
            text: `Help me write my Coursera Financial Aid answers for the course [course name] in the [certificate name] certificate.

My real information:
- My study or work situation: [...]
- My financial situation briefly and why I cannot pay now: [...]
- Why this course specifically and how it connects to my goal: [...]
- How I will use what I learn: [project, job, supporting my family or community]
- My time commitment: [hours per week]

Write two separate answers: (1) why I am applying for aid, (2) how the course will help me reach my goals.
Each 150-250 words, in simple, sincere English.
Rules: use only my information, do not exaggerate, and add no circumstances I did not mention.`,
          },
          {
            title: 'Study plan: free audit first, then the certificate',
            when: 'After choosing a track, to minimise cost: study what you can for free, then subscribe or use financial aid when ready.',
            expect: 'A weekly plan for the certificate’s courses that marks what to study in audit mode and what to save for the paid version (graded work and projects), with review checkpoints.',
            text: `I will study the [certificate name] certificate on Coursera. Number of courses per the page: [number]; estimated duration: [duration].
My time: [number] hours per week.
My strategy: audit the courses free first to learn the content, then subscribe or use financial aid to complete graded work and earn the certificate as quickly as possible.

Create a plan:
1. A weekly table: course, modules, hours, mode (audit/paid), practical output.
2. When to start the subscription or request aid so I do not pay for more months than needed.
3. A small side project after every two courses.
4. Warning signs that I am falling behind and what to do.`,
          },
          {
            title: 'Lesson-to-notes and self-test converter',
            when: 'After each video or reading, pasting your notes or the lesson text available to you.',
            expect: 'A short summary, key terms and graded recall questions without answers, then corrections of your answers. It cements learning better than rewatching.',
            text: `These are my notes (or the lesson text) from [course name], lesson [title]:
<lesson>
[paste]
</lesson>

1. Summarise the lesson in 5 points.
2. A terms table: term | one-line definition | example.
3. 6 recall questions: 2 recall, 2 understanding, 2 applying to a practical situation. Do not write the answers.
4. Wait for my answers, then correct them and tell me what to review.`,
          },
          {
            title: 'Course project upgrader',
            when: 'When you reach a hands-on or capstone project, to make a standout version unlike thousands of identical ones.',
            expect: 'Ideas to turn the project into a solution for a real problem, extra features ranked by difficulty, an implementation plan and how to present it.',
            text: `I am working on [course project description] in the [certificate name] certificate.
My current skills: [...]. Time for the project: [hours].

Help me make it stand out:
1. 3 ideas to connect the project to a real problem in [a field or community I care about].
2. For the best idea: 5 extra features from easiest to hardest, and which skill each proves.
3. A weekly implementation plan.
4. How to present it: title, 3-line description, what goes in the README, and which screenshots to take.
Make sure the ideas do not break the course project's requirements.`,
          },
          {
            title: 'Code reviewer for the developer tracks',
            when: 'For Front-End or Back-End learners: after writing exercise or project code, before submitting.',
            expect: 'A review like an experienced developer’s: bugs, accessibility, performance and best practices, with the reason for each note, without rewriting everything.',
            text: `You are an experienced [Front-End / Back-End] developer reviewing a learner's code.

Context: exercise [description] from the [certificate name] certificate. Stack: [HTML/CSS/JavaScript/React or Python/Django...].

<code>
[paste the code]
</code>

Review by priority:
1. Bugs that break functionality.
2. Security and input handling.
3. Accessibility, or API design, depending on the track.
4. Readability, organisation and naming.
5. Performance.

For each note: the line, the problem, why it matters, and a hint toward the fix. Do not rewrite the whole file; I want to fix it myself.`,
          },
          {
            title: 'A real marketing plan for the marketing track',
            when: 'For Social Media Marketing or Blueprint learners: applying what you learn to a small real business.',
            expect: 'A realistic monthly plan: audience, messages, content types, posting schedule and metrics, without promised result numbers.',
            text: `You are a digital marketer teaching a trainee.

Business: [type, city, product or service]
Likely audience: [...]
Budget: [free / small amount]
Platforms: [Instagram / Facebook / WhatsApp Business ...]

Create a 4-week plan:
1. A customer persona in 6 points.
2. 3 core brand messages.
3. 3-4 content pillars with a sample post for each.
4. A weekly posting schedule.
5. Metrics to track and when to review them.
6. What to A/B test in week three.
Do not state expected results as numbers; I want a measurable plan.`,
          },
          {
            title: 'Announcing the certificate on LinkedIn and your CV',
            when: 'After earning the certificate and finishing your project.',
            expect: 'A LinkedIn post centred on what you built and learned rather than the certificate alone, plus two achievement-style CV bullets, all from your information.',
            text: `I completed the Meta [certificate name] certificate on Coursera.

What I actually learned: [3 skills]
The project I built: [description and link]
The hardest challenge and how I solved it: [...]
What I am looking for now: [internship/job/freelance]

Write:
1. A LinkedIn post of 120-170 words that opens with the project or challenge, not "I'm happy to announce", mentions the certificate as part of the story, and ends with what I am looking for.
2. Two CV bullets in the form: verb + what + tool + result.
3. 5 skills to add to my Skills section.
Use only my information and do not exaggerate.`,
          },
        ],
      },
      {
        heading: 'Useful follow-ups',
        paragraphs: [],
        list: [
          '"Which courses in this certificate overlap with what I already know, and how can I move faster through them?"',
          '"Turn the study plan into a daily task list for this week only."',
          '"Suggest 3 questions to ask someone working in this field before I continue."',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [],
        list: [
          'Assuming the certificate is free, then finding the subscription started after the trial.',
          'Starting a trial while waiting for a financial aid decision, which cancels the application.',
          'Writing an exaggerated or dishonest financial aid application.',
          'Finishing the certificate without a personal project that sets you apart.',
          'Relying on outdated details from social posts; always check Coursera’s official page.',
        ],
      },
      {
        heading: 'Quick workflow checklist',
        paragraphs: [],
        list: [
          'Open coursera.org/meta-professional-certificates and read the page for your certificate.',
          'Choose a track (prompt 1) and make a study plan (3).',
          'Audit for free, and request financial aid if needed (2) without starting a trial.',
          'Lock in each lesson with a self-test (4).',
          'Build a standout project (5) and review it (6), or run a real marketing plan (7).',
          'Present the achievement on LinkedIn and your CV (8).',
        ],
      },
    ],
  },
}
