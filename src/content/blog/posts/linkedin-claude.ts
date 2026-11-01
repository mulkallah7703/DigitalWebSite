import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'linkedin-profile-review-with-claude',
  date: '2026-10-28',
  cover: '/blog/linkedin-profile-review-with-claude.png?v=3',
  coverLines: ['LinkedIn Profile', 'Review with Claude'],
  coverAlt: { ar: 'غلاف مقال مراجعة ملف LinkedIn مع Claude', en: 'Cover: LinkedIn profile review with Claude' },
  tags: ['LinkedIn', 'Claude', 'Career'],
  ar: {
    title: 'هل يعمل ملفك على LinkedIn ضدك؟ تسعة برومبتات تجعل Claude يراجعه بعين مسؤول التوظيف ويعيد صياغته قسمًا بقسم',
    excerpt:
      'عنوان ضعيف، ونبذة عامة، وخبرات مكتوبة كقائمة مهام: هذا ما يجعل مسؤول التوظيف يغلق الملف. تسعة برومبتات عملية لتدقيق ملفك، وسد فجوة الكلمات المفتاحية، وإعادة كتابة العنوان والنبذة والخبرات، وكتابة رسائل التواصل.',
    hook:
      'بعد تطبيق هذا الدليل سيكون لديك ملف LinkedIn يفهمه مسؤول التوظيف في ثوانٍ: عنوان واضح، ونبذة تبدأ بقيمتك، وخبرات مكتوبة كإنجازات، وكلمات مفتاحية تطابق الوظائف التي تريدها، ورسائل تواصل جاهزة، دون أي مبالغة أو ادعاء غير صحيح.',
    sections: [
      {
        paragraphs: [
          'مسؤول التوظيف لا يقرأ ملفك كاملًا في البداية؛ ينظر إلى الصورة والعنوان وأول سطور النبذة وآخر خبرة، ثم يقرر هل يكمل. وحسب صفحة المساعدة في LinkedIn، يظهر العنوان في نتائج البحث، كما أن ما يظهر من النبذة قبل "عرض المزيد" هو بضعة أسطر فقط. لذلك كل كلمة في هذه الأماكن مهمة.',
          'بصفتي طالب هندسة برمجيات، أرى أن مراجعة الملف مع Claude من أكثر الاستخدامات فائدة وأسرعها أثرًا، بشرط أن تعطيه معلومات حقيقية وتمنعه من التجميل الزائف. قبل البدء: انسخ نص ملفك (العنوان، والنبذة، والخبرات، والمشاريع، والمهارات) في ملف نصي، واحذف رقم هاتفك وعنوانك وأي بيانات شخصية لا داعي لها.',
        ],
      },
      {
        heading: 'البرومبتات التسعة',
        paragraphs: [],
        prompts: [
          {
            title: 'تدقيق شامل بعين مسؤول التوظيف',
            when: 'الخطوة الأولى دائمًا، قبل تعديل أي شيء.',
            expect: 'انطباع الثواني الأولى، وتقييم لكل قسم من 10 مع السبب، وأهم 5 تعديلات مرتبة حسب الأثر. سيكون صريحًا، وهذا ما تحتاجه.',
            text: `تصرف كمسؤول توظيف خبير في [المجال] يراجع عشرات الملفات يوميًا لوظيفة [المسمى الذي أستهدفه].

<profile>
[الصق نص ملفك: العنوان، والنبذة، والخبرات، والتعليم، والمشاريع، والمهارات]
</profile>

1. انطباعك في أول 10 ثوانٍ: ماذا فهمت عني؟ وهل ستكمل القراءة؟
2. قيّم كل قسم من 10 مع سبب في سطر.
3. أهم 5 تعديلات مرتبة حسب أثرها على فرصي.
4. ما المعلومات الناقصة التي تتوقع وجودها لهذه الوظيفة؟

كن صريحًا ومحددًا، ولا تقترح إضافة أي مهارة أو خبرة لا تظهر في النص.`,
          },
          {
            title: 'سد فجوة الكلمات المفتاحية',
            when: 'لتظهر في بحث مسؤولي التوظيف عن الوظيفة التي تريدها.',
            expect: 'جدول بالكلمات المتكررة في الإعلانات، وهل هي موجودة في ملفك، وأين تضيفها بصدق، مع تمييز المهارات التي لا تملكها لتتعلمها لا لتدعيها.',
            text: `هذه 3 إعلانات وظائف أستهدفها:
<job1>[الصق الإعلان]</job1>
<job2>[الصق الإعلان]</job2>
<job3>[الصق الإعلان]</job3>

وهذا ملفي:
<profile>[الصق ملفك]</profile>

1. استخرج المهارات والكلمات المفتاحية المتكررة في الإعلانات مرتبة حسب التكرار.
2. جدول: الكلمة | موجودة في ملفي؟ | هل لدي دليل عليها في النص؟ | أين أضيفها (العنوان، النبذة، خبرة محددة، المهارات).
3. قائمة منفصلة: مهارات مطلوبة لا يظهر أنني أملكها، مع اقتراح طريقة سريعة لتعلم كل منها.
لا تقترح إضافة مهارة إلى ملفي إلا إذا كان لها دليل في النص.`,
          },
          {
            title: 'مولّد العناوين بخمس صيغ',
            when: 'بعد التدقيق، لاختيار عنوان يوضح من أنت وماذا تقدم.',
            expect: 'خمس صيغ مختلفة مبنية على معلوماتك، مع وضع أهم كلمة في البداية لأن بداية العنوان هي ما يظهر غالبًا في البحث والتعليقات.',
            text: `اكتب 5 عناوين LinkedIn مختلفة لي، اعتمادًا على هذه المعلومات فقط:
- وضعي الحالي: [طالب/خريج/موظف في...]
- التخصص والمهارات الأساسية: [...]
- المجال الذي يهمني: [...]
- دليل مميز (مشروع، جائزة، نتيجة حقيقية): [...]
- الوظيفة التي أستهدفها: [...]

الصيغ:
1. المسمى | المهارات | المجال.
2. ماذا أبني أو أحل ولمن.
3. مبنية على إنجاز حقيقي.
4. للطلاب: التخصص + ما أتقنه + ما أبحث عنه.
5. صيغة مختصرة جدًا.

ضع أهم كلمات البحث في أول العنوان، ولا تستخدم كلمات مثل "شغوف" أو "طموح" بلا دليل. بعد كل عنوان: لمن يناسب في سطر.`,
          },
          {
            title: 'إعادة كتابة النبذة (About)',
            when: 'بعد اختيار العنوان، لأن النبذة تكمل قصته.',
            expect: 'نبذة تبدأ بقيمتك في أول سطرين، ثم دليل، ثم ما تبحث عنه، بصيغة المتكلم، مع نسختين بطولين مختلفين لتختار.',
            text: `اكتب نبذة LinkedIn بضمير المتكلم اعتمادًا على معلوماتي فقط:
<info>
- من أنا وماذا أفعل: [...]
- ما الذي يحفزني في مجالي: [...]
- أهم 3 مهارات مع دليل لكل منها: [...]
- مشروعان أو إنجازان حقيقيان: [...]
- ما أبحث عنه وكيف يتواصل الناس معي: [...]
</info>

الهيكل:
1. أول سطرين (يظهران قبل "عرض المزيد"): قيمتي بوضوح، بلا مقدمة عامة.
2. فقرة الدليل: المشاريع والمهارات بأمثلة.
3. فقرة ما أبحث عنه ودعوة للتواصل.
4. سطر كلمات مفتاحية طبيعية في النهاية.

اكتب نسختين: قصيرة (حوالي 120 كلمة) ومتوسطة (حوالي 220 كلمة). لا مبالغة، ولا إنجازات غير مذكورة.`,
          },
          {
            title: 'محوّل المهام إلى إنجازات',
            when: 'لقسم الخبرات والتطوع والمشاريع الجامعية.',
            expect: 'كل بند يتحول إلى صيغة إنجاز. وحين يحتاج البند رقمًا لا تعرفه، سيسألك بدل أن يخترعه.',
            text: `هذه خبراتي مكتوبة كقائمة مهام:
<experience>
[المسمى، الجهة، المدة، ثم المهام كما هي]
</experience>

حوّل كل مهمة إلى بند إنجاز بصيغة: فعل قوي + ماذا فعلت + بأي أداة أو طريقة + النتيجة أو الأثر.
قواعد صارمة:
- إذا كانت النتيجة تحتاج رقمًا لا أعرفه، اكتب البند مع [رقم؟] واسألني عنه بعد القائمة. لا تخترع أرقامًا.
- 3 إلى 5 بنود لكل خبرة، مرتبة من الأهم.
- أضف في النهاية سطر "المهارات المستخدمة" لكل خبرة.
ثم اطرح عليّ الأسئلة اللازمة لاستكمال الأرقام.`,
          },
          {
            title: 'بناء قسمي المشاريع والمميز',
            when: 'إذا كانت خبرتك العملية قليلة، فالمشاريع هي دليلك الأقوى.',
            expect: 'وصف مختصر لكل مشروع بصيغة المشكلة والحل والتقنيات والنتيجة، مع اقتراح أفضل 3 عناصر لقسم Featured وطريقة عرضها.',
            text: `هذه مشاريعي:
<projects>
[لكل مشروع: الاسم، المشكلة، ما بنيته، التقنيات، الرابط، أي نتيجة حقيقية]
</projects>

الوظيفة التي أستهدفها: [...]

1. اكتب لكل مشروع وصفًا لقسم Projects من 3 إلى 4 أسطر: المشكلة، والحل، والتقنيات، والنتيجة.
2. رتّب المشاريع حسب صلتها بالوظيفة المستهدفة.
3. اقترح أفضل 3 عناصر لقسم Featured (مشروع، أو مقال، أو عرض) مع عنوان ووصف قصير لكل عنصر.
4. ما المشروع الذي ينقصني لهذه الوظيفة؟ اقترح فكرة صغيرة قابلة للتنفيذ.`,
          },
          {
            title: 'طلب توصية وكتابة توصية',
            when: 'عندما تريد توصية من أستاذ أو مدير أو زميل.',
            expect: 'رسالة طلب مهذبة ومحددة توضح النقاط التي تتمنى التركيز عليها، ومسودة اختيارية يمكن للشخص تعديلها إن طلبها منك.',
            text: `أريد طلب توصية على LinkedIn من [الاسم]، وعلاقتي به: [مثلًا: أشرف على مشروع تخرجي / مديري في التدريب].
ما عملنا عليه معًا: [...]
النقاط التي أتمنى أن تركز عليها التوصية: [مهارتان أو ثلاث مع موقف حقيقي لكل منها]

اكتب:
1. رسالة طلب قصيرة ومهذبة (80 كلمة تقريبًا) تذكّره بالعمل المشترك وتقترح النقاط بلطف، وتعطيه حرية الرفض.
2. مسودة توصية من 100 كلمة تقريبًا يمكنني إرسالها فقط إذا طلب مني ذلك، مكتوبة بصوته ومبنية على المواقف المذكورة فقط.`,
          },
          {
            title: 'رسائل التواصل التي يُرد عليها',
            when: 'للتواصل مع مسؤول توظيف، أو خريج من جامعتك، أو شخص يعمل في شركة تستهدفها.',
            expect: 'ثلاث رسائل مخصصة قصيرة. ملاحظة: حسب مساعدة LinkedIn، ملاحظة طلب التواصل في الحساب المجاني محدودة بـ 200 حرف، لذا ستأتي النسخة الأولى قصيرة جدًا.',
            text: `أريد التواصل مع [الاسم والمسمى والشركة].
ما يجمعنا أو سبب التواصل: [جامعة مشتركة، منشور كتبه، وظيفة معلنة، اهتمام مشترك]
ما أريده تحديدًا: [نصيحة، معلومة عن الوظيفة، مكالمة 15 دقيقة]
عني في سطر: [...]

اكتب:
1. ملاحظة طلب تواصل لا تتجاوز 200 حرف.
2. رسالة متابعة بعد قبول الطلب (70 إلى 100 كلمة) بطلب واحد واضح وسهل.
3. رسالة متابعة مهذبة إذا لم يرد خلال أسبوع.
قواعد: ابدأ به لا بي، ولا تطلب وظيفة مباشرة في الرسالة الأولى، وتجنب العبارات المنسوخة.`,
          },
          {
            title: 'خطة محتوى لأربعة أسابيع من رحلتك',
            when: 'بعد تحسين الملف، لتبني حضورًا يجعل الناس يرونه.',
            expect: 'ثمانية أفكار منشورات مبنية على ما تتعلمه وتبنيه فعلًا، مع افتتاحية لكل منشور وتنوع في الصيغ، دون اختلاق قصص.',
            text: `أريد النشر على LinkedIn مرتين أسبوعيًا لمدة 4 أسابيع.
مجالي: [...]
ما أتعلمه أو أبنيه حاليًا: [...]
تجارب وملاحظات حقيقية يمكنني الكتابة عنها: [...]
جمهوري: [مسؤولو توظيف في... / زملاء / مبتدئون في المجال]

أنشئ جدولًا من 8 منشورات: الأسبوع | الفكرة | الصيغة (درس تعلمته، مشروع، خطأ وكيف أصلحته، أداة، سؤال للنقاش) | سطر افتتاحي | ما أحتاج تجهيزه (صورة، رابط، لقطة شاشة).
استخدم موادي فقط، ولا تقترح قصصًا لم تحدث.`,
          },
        ],
      },
      {
        heading: 'رسائل متابعة تحسّن النتيجة',
        paragraphs: [],
        list: [
          '"اقرأ النبذة الجديدة كمسؤول توظيف: ماذا فهمت في أول سطرين؟"',
          '"اختصر كل بند خبرة إلى سطر ونصف كحد أقصى."',
          '"ما الكلمات المكررة في ملفي كله؟ واقترح بدائل."',
          '"قارن ملفي القديم بالجديد في جدول: ما الذي تحسن وما الذي ما زال ضعيفًا؟"',
        ],
      },
      {
        heading: 'أخطاء شائعة',
        paragraphs: [],
        list: [
          'قبول اقتراحات تضيف مهارات أو أرقامًا غير حقيقية؛ ستنكشف في أول مقابلة.',
          'نسخ نفس النبذة المولدة التي يستخدمها الآلاف؛ ابدأ دائمًا من معلوماتك.',
          'إهمال قسم المشاريع إذا لم تكن لديك خبرة عملية.',
          'لصق بيانات شخصية حساسة في أدوات الذكاء الاصطناعي دون حاجة.',
          'تحسين الملف مرة واحدة ثم تركه؛ حدّثه مع كل مشروع أو مهارة جديدة.',
        ],
      },
      {
        heading: 'قائمة سير العمل السريعة',
        paragraphs: [],
        list: [
          'انسخ نص ملفك واحذف البيانات الحساسة.',
          'التدقيق (1) ثم فجوة الكلمات المفتاحية مع 3 إعلانات (2).',
          'العنوان (3) ثم النبذة (4).',
          'الخبرات كإنجازات (5) والمشاريع والمميز (6).',
          'اطلب توصية (7) وابدأ التواصل (8).',
          'خطة محتوى (9)، وراجع الملف كل شهر.',
        ],
      },
    ],
  },
  en: {
    title: 'Is Your LinkedIn Profile Working Against You? Nine Prompts That Make Claude Review It Like a Recruiter and Rewrite It Section by Section',
    excerpt:
      'A weak headline, a generic About and experience written as a task list: that is what makes recruiters close a profile. Nine practical prompts to audit your profile, close the keyword gap, rewrite your headline, About and experience, and write outreach messages.',
    hook:
      'After this guide you will have a LinkedIn profile a recruiter understands in seconds: a clear headline, an About that leads with your value, experience written as achievements, keywords matching the roles you want, and ready outreach messages, with no exaggeration or false claims.',
    sections: [
      {
        paragraphs: [
          'Recruiters do not read your whole profile at first; they look at the photo, headline, the first lines of About and your latest role, then decide whether to continue. LinkedIn’s Help pages note that your headline appears in search results, and only a few lines of About show before “see more”. Every word in those places matters.',
          'As a software engineering student, I find reviewing a profile with Claude one of the most useful and fastest-impact uses of AI, as long as you give it real information and stop it from embellishing. Before you start, copy your profile text (headline, About, experience, projects, skills) into a text file and remove your phone number, address and any unnecessary personal data.',
        ],
      },
      {
        heading: 'The nine prompts',
        paragraphs: [],
        prompts: [
          {
            title: 'Full audit through a recruiter’s eyes',
            when: 'Always the first step, before changing anything.',
            expect: 'Your first-seconds impression, a score out of 10 per section with reasons, and the top 5 changes ranked by impact. It will be blunt, which is what you need.',
            text: `Act as an experienced recruiter in [field] who reviews dozens of profiles a day for a [target job title] role.

<profile>
[paste your profile text: headline, About, experience, education, projects, skills]
</profile>

1. Your impression in the first 10 seconds: what did you understand about me, and would you keep reading?
2. Score each section out of 10 with a one-line reason.
3. The top 5 changes ranked by impact on my chances.
4. What information you would expect for this role that is missing.

Be blunt and specific, and do not suggest adding any skill or experience that is not in the text.`,
          },
          {
            title: 'Close the keyword gap',
            when: 'To show up when recruiters search for the role you want.',
            expect: 'A table of the keywords that recur in the ads, whether they are in your profile, and where to add them honestly, with skills you lack marked for learning, not claiming.',
            text: `These are 3 job ads I am targeting:
<job1>[paste ad]</job1>
<job2>[paste ad]</job2>
<job3>[paste ad]</job3>

And this is my profile:
<profile>[paste profile]</profile>

1. Extract the recurring skills and keywords from the ads, ranked by frequency.
2. A table: keyword | in my profile? | evidence for it in the text? | where to add it (headline, About, a specific role, Skills).
3. A separate list: required skills I show no evidence of, with a quick way to learn each.
Do not suggest adding a skill to my profile unless the text supports it.`,
          },
          {
            title: 'Headline generator in five formulas',
            when: 'After the audit, to choose a headline that says who you are and what you offer.',
            expect: 'Five different options built on your information, with the most important keywords first, since the start of the headline is usually what shows in search and comments.',
            text: `Write 5 different LinkedIn headlines for me, using only this information:
- Current status: [student/graduate/working at...]
- Specialty and core skills: [...]
- Field I care about: [...]
- A standout proof point (project, award, real result): [...]
- Target role: [...]

Formulas:
1. Title | skills | field.
2. What I build or solve, and for whom.
3. Built around a real achievement.
4. For students: major + what I am good at + what I am looking for.
5. A very short version.

Put the key search terms at the start, and avoid words like "passionate" or "ambitious" without proof. After each headline, one line on who it suits.`,
          },
          {
            title: 'Rewrite your About section',
            when: 'After choosing your headline, since About continues its story.',
            expect: 'An About that leads with your value in the first two lines, then proof, then what you are looking for, in the first person, in two lengths to choose from.',
            text: `Write a first-person LinkedIn About section using only my information:
<info>
- Who I am and what I do: [...]
- What drives me in my field: [...]
- Top 3 skills with evidence for each: [...]
- Two real projects or achievements: [...]
- What I am looking for and how people can reach me: [...]
</info>

Structure:
1. First two lines (shown before "see more"): my value, clearly, no generic intro.
2. Proof paragraph: projects and skills with examples.
3. What I am looking for, with a call to connect.
4. A closing line of natural keywords.

Write two versions: short (about 120 words) and medium (about 220 words). No exaggeration and no achievements I did not mention.`,
          },
          {
            title: 'Duties-to-achievements converter',
            when: 'For experience, volunteering and university projects.',
            expect: 'Each item rewritten as an achievement. When an item needs a number you do not know, it asks you instead of inventing one.',
            text: `This is my experience written as a task list:
<experience>
[title, organisation, dates, then the duties as they are]
</experience>

Rewrite each duty as an achievement: strong verb + what I did + tool or method + result or impact.
Strict rules:
- If a result needs a number I have not given, write the bullet with [number?] and ask me after the list. Never invent numbers.
- 3-5 bullets per role, most important first.
- End each role with a "Skills used" line.
Then ask me the questions needed to complete the numbers.`,
          },
          {
            title: 'Build your Projects and Featured sections',
            when: 'If your work experience is limited, projects are your strongest proof.',
            expect: 'A short problem-solution-stack-result description per project, plus the best 3 items for Featured and how to present them.',
            text: `These are my projects:
<projects>
[for each: name, problem, what I built, stack, link, any real result]
</projects>

Target role: [...]

1. For each project, write a 3-4 line description for the Projects section: problem, solution, stack, result.
2. Rank the projects by relevance to the target role.
3. Suggest the best 3 items for Featured (project, article or presentation) with a title and short description each.
4. Which project am I missing for this role? Suggest a small, doable idea.`,
          },
          {
            title: 'Request and draft a recommendation',
            when: 'When you want a recommendation from a professor, manager or colleague.',
            expect: 'A polite, specific request that suggests what to focus on, plus an optional draft the person can edit if they ask you for one.',
            text: `I want to ask [name] for a LinkedIn recommendation. Our relationship: [e.g. supervised my graduation project / my internship manager].
What we worked on together: [...]
Points I hope the recommendation covers: [two or three skills, each with a real situation]

Write:
1. A short, polite request (about 80 words) that reminds them of our work, gently suggests the points, and makes it easy to say no.
2. A recommendation draft of about 100 words that I would send only if they ask for one, written in their voice and based only on the situations above.`,
          },
          {
            title: 'Outreach messages that get replies',
            when: 'To contact a recruiter, an alumnus of your university, or someone at a company you are targeting.',
            expect: 'Three short personalised messages. Note: LinkedIn Help says a connection-request note on a free account is limited to 200 characters, so the first one will be very short.',
            text: `I want to contact [name, title, company].
What connects us or why I am reaching out: [same university, a post they wrote, an open role, shared interest]
What I want specifically: [advice, information about the role, a 15-minute call]
About me in one line: [...]

Write:
1. A connection-request note of at most 200 characters.
2. A follow-up after they accept (70-100 words) with one clear, easy ask.
3. A polite follow-up if there is no reply within a week.
Rules: start with them, not me; do not ask for a job in the first message; avoid templated phrases.`,
          },
          {
            title: 'A four-week content plan from your journey',
            when: 'After improving your profile, to build presence that gets it seen.',
            expect: 'Eight post ideas based on what you are actually learning and building, each with an opening line and a varied format, with no invented stories.',
            text: `I want to post on LinkedIn twice a week for 4 weeks.
My field: [...]
What I am learning or building now: [...]
Real experiences and observations I can write about: [...]
My audience: [recruiters in... / peers / beginners in the field]

Create a table of 8 posts: week | idea | format (lesson learned, project, mistake and fix, tool, discussion question) | opening line | what to prepare (image, link, screenshot).
Use only my material and do not suggest stories that did not happen.`,
          },
        ],
      },
      {
        heading: 'Follow-ups that improve the result',
        paragraphs: [],
        list: [
          '"Read the new About as a recruiter: what did you understand from the first two lines?"',
          '"Shorten every experience bullet to at most one and a half lines."',
          '"Which words repeat across my whole profile? Suggest alternatives."',
          '"Compare my old and new profile in a table: what improved and what is still weak?"',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [],
        list: [
          'Accepting suggestions that add skills or numbers that are not true; they surface in the first interview.',
          'Copying the same generated About thousands use; always start from your information.',
          'Neglecting Projects when you lack work experience.',
          'Pasting sensitive personal data into AI tools without need.',
          'Optimising once and forgetting; update with every new project or skill.',
        ],
      },
      {
        heading: 'Quick workflow checklist',
        paragraphs: [],
        list: [
          'Copy your profile text and remove sensitive data.',
          'Audit (1), then the keyword gap against 3 ads (2).',
          'Headline (3), then About (4).',
          'Experience as achievements (5), Projects and Featured (6).',
          'Request a recommendation (7) and start outreach (8).',
          'Content plan (9), and review the profile monthly.',
        ],
      },
    ],
  },
}
