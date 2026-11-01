import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'anthropic-academy-free-courses',
  date: '2026-10-26',
  cover: '/blog/anthropic-academy-free-courses.png',
  coverLines: ['Anthropic Academy', 'Free Courses'],
  coverAlt: { ar: 'غلاف مقال دورات Anthropic Academy المجانية', en: 'Cover: Anthropic Academy free courses' },
  tags: ['Claude', 'Courses', 'Anthropic'],
  ar: {
    title: 'دورات Anthropic المجانية: أي دورة تناسبك، وبأي ترتيب تدرسها، وثمانية برومبتات تحوّل كل درس إلى مهارة ومشروع',
    excerpt:
      'تقدم Anthropic مجموعة دورات مجانية عن Claude والذكاء الاصطناعي، من الأساسيات إلى الـ API وClaude Code وMCP. هذا دليل عملي لاختيار المسار المناسب لك، وثمانية برومبتات تجعلك تخرج من كل دورة بمهارة ومشروع لا بشهادة فقط.',
    hook:
      'بعد هذا الدليل ستعرف أي دورات Anthropic المجانية تبدأ بها حسب هدفك، وبأي ترتيب، وكيف تحول كل درس إلى تطبيق عملي واختبار ومشروع صغير، ثم إلى منشور يوثق ما تعلمته بصدق.',
    sections: [
      {
        paragraphs: [
          'أكبر مشكلة مع الدورات المجانية ليست في جودتها، بل في طريقة دراستها: نشاهد الدروس بسرعة، ونحصل على الشهادة، ثم ننسى أغلب ما تعلمناه خلال أسبوع. الحل أن تكون لكل دورة مخرج عملي تبنيه أثناء الدراسة.',
        ],
      },
      {
        heading: 'أين توجد الدورات وما الذي تقدمه؟',
        paragraphs: [
          'تستضيف Anthropic دوراتها على منصة anthropic.skilljar.com، والصفحة anthropic.com/learn تحولك إلى بوابة التعلم الخاصة بها. الدورات مجانية وتحتاج إنشاء حساب على المنصة، وتعرض عدة دورات "شهادة إتمام" عند انتهائها. تحقق من صفحة كل دورة قبل البدء، لأن المحتوى والقائمة تتحدث باستمرار.',
          'هذه أبرز الدورات في الكتالوج وقت كتابة المقال، مقسمة حسب الهدف:',
        ],
        list: [
          'للجميع والمبتدئين: Claude 101، وAI Fluency: Framework & Foundations، وAI Capabilities and Limitations.',
          'للطلاب والمعلمين: AI Fluency for students، وAI Fluency for educators.',
          'لأصحاب الأعمال والمجالات المتخصصة: AI Fluency for small businesses، وللعمل الإبداعي، وللمنظمات غير الربحية.',
          'للمطورين: Building with the Claude API، وClaude Platform 101، وClaude Code 101، وClaude Code in Action.',
          'لبناء أدوات ووكلاء: Introduction to Model Context Protocol ثم Model Context Protocol: Advanced Topics، وIntroduction to agent skills، وIntroduction to subagents.',
        ],
      },
      {
        heading: 'ترتيب مقترح',
        paragraphs: [
          'غير المبرمجين: ابدأ بـ Claude 101 ثم AI Fluency: Framework & Foundations ثم الدورة المتخصصة لمجالك. المطورون: Claude 101 سريعًا، ثم Building with the Claude API، ثم Claude Code 101 وClaude Code in Action، ثم MCP والمهارات. لا تسجل في أكثر من دورتين في نفس الوقت.',
        ],
      },
      {
        heading: 'البرومبتات الثمانية',
        paragraphs: [],
        prompts: [
          {
            title: 'مستشار اختيار المسار',
            when: 'قبل التسجيل في أي دورة.',
            expect: 'مسار من 3 إلى 4 دورات مرتبة مع سبب كل اختيار، ومشروع نهائي يجمعها، وما يمكنك تأجيله.',
            text: `هذه قائمة دورات Anthropic Academy المجانية التي أفكر فيها:
[الصق أسماء الدورات من الكتالوج]

عني:
- خلفيتي: [طالب/موظف/مطور... ومستوى البرمجة]
- هدفي خلال 3 أشهر: [مثلًا: أستخدم Claude في عملي / أبني تطبيقًا بالـ API]
- الوقت المتاح أسبوعيًا: [ساعات]

1. اختر لي 3 إلى 4 دورات بالترتيب مع سبب كل اختيار.
2. ما الدورات التي أؤجلها ولماذا؟
3. اقترح مشروعًا نهائيًا واحدًا يجمع ما سأتعلمه.
اعتمد على أسماء الدورات في القائمة فقط، وإن احتجت معلومة عن محتوى دورة قل لي أن أتحقق منها.`,
          },
          {
            title: 'خطة أسبوعية واقعية',
            when: 'بعد اختيار المسار، لتنهيه فعلًا.',
            expect: 'جدول أسبوعي بالجلسات والمخرج المطلوب في نهاية كل أسبوع، مع خطة احتياطية للأسابيع المزدحمة.',
            text: `سأدرس هذه الدورات بالترتيب: [القائمة]. لدي [عدد] ساعات أسبوعيًا موزعة على [الأيام].
أنشئ خطة لـ [عدد] أسابيع:
- لكل أسبوع: الدروس، والتطبيق العملي، والمخرج الملموس في نهايته.
- خصص 40% على الأقل من الوقت للتطبيق لا للمشاهدة.
- أضف يوم مراجعة كل أسبوعين.
- خطة بديلة إذا فاتني أسبوع، دون أن ينهار الجدول.`,
          },
          {
            title: 'من الدرس إلى التطبيق',
            when: 'مباشرة بعد كل درس، خلال نفس الجلسة.',
            expect: 'تلخيص قصير بكلماتك يصححه، ثلاثة تمارين متدرجة على عملك أو دراستك، ومعيار واضح لتعرف أنك أتقنت الفكرة.',
            text: `أنهيت درسًا بعنوان [عنوان الدرس] في دورة [اسم الدورة]. هذه ملاحظاتي:
[الصق ملاحظاتك]

1. صحح فهمي: ما الدقيق وما الناقص في ملاحظاتي؟ (قل إذا لم تكن متأكدًا من محتوى الدورة نفسها.)
2. أعطني 3 تمارين متدرجة أطبق فيها الفكرة على [مجالي: عملي / مادة دراسية / مشروع].
3. ما المعيار الذي يثبت أنني أتقنت هذه الفكرة؟
4. ما الخطأ الذي يقع فيه المبتدئون عادة في هذا الموضوع؟`,
          },
          {
            title: 'اختبار قبل الانتقال',
            when: 'في نهاية كل وحدة، قبل الانتقال إلى التالية.',
            expect: 'سؤال في كل مرة يركز على الفهم والتطبيق، ثم تقرير بما يجب مراجعته.',
            text: `اختبرني في [موضوع الوحدة] من دورة [اسم الدورة] اعتمادًا على ملاحظاتي هذه:
[الصق الملاحظات]

- 6 أسئلة، سؤال في كل مرة، وانتظر إجابتي.
- سؤالان عن المفاهيم، وسؤالان عن التطبيق، وسؤالان "ماذا تفعل لو...".
- بعد كل إجابة: صحح باختصار.
- في النهاية: ما الذي يجب أن أعيده قبل الانتقال؟`,
          },
          {
            title: 'مرشد أول تطبيق بالـ API',
            when: 'أثناء دورة Building with the Claude API أو بعدها.',
            expect: 'خطة صغيرة لتطبيق حقيقي، وهيكل ملفات، وخطوات مرحلية تكتب فيها الكود بنفسك مع المراجعة، وتنبيهات أمان حول مفتاح الـ API.',
            text: `أنهيت أجزاء من دورة Building with the Claude API، وأريد بناء أول تطبيق حقيقي.
لغتي: [Python/TypeScript]. فكرة التطبيق: [مثلًا: أداة تلخص ملاحظات الاجتماعات وتستخرج المهام].

كن مرشدًا لا كاتب كود:
1. قسّم المشروع إلى 5 مراحل صغيرة يمكن اختبار كل منها.
2. لكل مرحلة: ما المطلوب، والمفاهيم من الدورة التي سأستخدمها، وكيف أختبرها.
3. سأكتب الكود بنفسي وألصقه لك؛ راجعه وأشر إلى الأخطاء دون إعادة كتابته كاملًا.
4. نبهني لممارسات الأمان: حفظ مفتاح الـ API في متغيرات البيئة وعدم رفعه إلى GitHub، والتحكم في التكلفة.
ابدأ بالمرحلة الأولى فقط.`,
          },
          {
            title: 'MCP بلغة بسيطة ومشروع صغير',
            when: 'قبل أو أثناء دورة Introduction to Model Context Protocol.',
            expect: 'شرح بالتشبيه ثم بالمصطلحات الصحيحة، وفكرة خادم MCP صغير مناسب لمستواك، مع قائمة بما تحتاج قراءته في الوثائق الرسمية.',
            text: `أنا [مستواي في البرمجة] وسأبدأ دورة Introduction to Model Context Protocol.
1. اشرح MCP بتشبيه بسيط، ثم بالمصطلحات الصحيحة (العميل، والخادم، والأدوات، والموارد).
2. ما المشكلة التي يحلها، ومتى لا أحتاجه؟
3. اقترح 3 أفكار لخادم MCP صغير يناسب مستواي ويخدم [مجالي]، ورتبها من الأسهل.
4. ما الأجزاء التي يجب أن أتحقق منها في الوثائق الرسمية لأنها قد تتغير؟
لا تخترع أسماء دوال أو حزم؛ إن لم تكن متأكدًا قل ذلك.`,
          },
          {
            title: 'مشروع ختامي لكل دورة',
            when: 'في آخر أسبوع من كل دورة.',
            expect: 'ثلاث أفكار مشاريع بنطاق محدد، ومعايير قبول، وخطة تنفيذ قصيرة، وما تعرضه في معرض أعمالك.',
            text: `أنهيت دورة [اسم الدورة]. أهم ما تعلمته: [قائمة].
مجالي أو اهتمامي: [...]. الوقت المتاح: [عدد] ساعات.

1. اقترح 3 مشاريع صغيرة تثبت ما تعلمته، لكل منها: المشكلة، والمخرج، ولماذا يناسب الدورة.
2. للمشروع الذي أختاره: معايير قبول واضحة (متى أعتبره منتهيًا)، وخطة تنفيذ بالساعات.
3. ماذا أعرض في GitHub أو معرض أعمالي: ملف README، ولقطات، ووصف قصير.`,
          },
          {
            title: 'منشور يوثق التعلم بصدق',
            when: 'بعد إنهاء الدورة والمشروع، لا قبلهما.',
            expect: 'منشور قصير بصوتك يركز على ما بنيته وتعلمته فعلًا، بلا مبالغة، مع نسختين بنبرتين مختلفتين.',
            text: `أنهيت دورة [اسم الدورة] من Anthropic Academy وبنيت [وصف المشروع].
3 أشياء تعلمتها فعلًا: [...]
تحدٍّ واجهته وكيف حللته: [...]
رابط المشروع: [...]

اكتب منشور LinkedIn من 120 إلى 180 كلمة بضمير المتكلم:
- ابدأ بما بنيته أو تعلمته، لا بـ "يسعدني أن أعلن".
- اذكر الدورة كمصدر للتعلم دون مبالغة في قيمة الشهادة.
- اختم بسؤال للقراء.
اكتب نسختين: مهنية هادئة، وأكثر حماسًا. لا تضف أي إنجاز غير مذكور.`,
          },
        ],
      },
      {
        heading: 'رسائل متابعة مفيدة',
        paragraphs: [],
        list: [
          '"أعد صياغة هذا المفهوم بمثال من [مجالي]."',
          '"ما الفرق بين ما تعلمته في هذه الدورة وما سأتعلمه في الدورة التالية في مساري؟"',
          '"راجع README لمشروعي كمسؤول توظيف تقني."',
          '"أنشئ بطاقات مراجعة من ملاحظاتي لهذه الوحدة."',
        ],
      },
      {
        heading: 'أخطاء شائعة',
        paragraphs: [],
        list: [
          'التسجيل في كل الدورات دفعة واحدة ثم عدم إنهاء أي منها.',
          'مشاهدة الدروس دون تطبيق في نفس اليوم.',
          'الاعتماد على Claude لوصف محتوى دورة لم تدرسها؛ قد يخطئ في التفاصيل.',
          'جعل الشهادة هي الهدف بدل المشروع والمهارة.',
          'رفع مفتاح الـ API إلى مستودع عام أثناء التجربة.',
        ],
      },
      {
        heading: 'قائمة سير العمل السريعة',
        paragraphs: [],
        list: [
          'افتح anthropic.skilljar.com وأنشئ حسابًا.',
          'اختر المسار (1) والخطة الأسبوعية (2).',
          'بعد كل درس: التطبيق (3)، وبعد كل وحدة: الاختبار (4).',
          'للمطورين: أول تطبيق بالـ API (5) وفهم MCP (6).',
          'مشروع ختامي لكل دورة (7).',
          'منشور يوثق التعلم (8) بعد المشروع.',
        ],
      },
    ],
  },
  en: {
    title: 'Anthropic’s Free Courses: Which One Fits You, What Order to Take Them In, and Eight Prompts That Turn Every Lesson Into a Skill and a Project',
    excerpt:
      'Anthropic offers a set of free courses on Claude and AI, from the basics to the API, Claude Code and MCP. This is a practical guide to choosing your path, plus eight prompts that make you leave each course with a skill and a project, not just a certificate.',
    hook:
      'After this guide you will know which free Anthropic courses to start with for your goal, in what order, and how to turn every lesson into practice, a quiz and a small project, then into a post that honestly documents what you learned.',
    sections: [
      {
        paragraphs: [
          'The biggest problem with free courses is not their quality but how we study them: we rush through the videos, get the certificate, and forget most of it within a week. The fix is to give every course a practical output you build while studying.',
        ],
      },
      {
        heading: 'Where the courses are and what they offer',
        paragraphs: [
          'Anthropic hosts its courses at anthropic.skilljar.com, and anthropic.com/learn redirects to its learning portal. The courses are free and need an account on the platform, and several show a “certificate of completion” when you finish. Check each course page before starting, because the content and the list are updated regularly.',
          'These are the main courses in the catalogue at the time of writing, grouped by goal:',
        ],
        list: [
          'For everyone and beginners: Claude 101, AI Fluency: Framework & Foundations, AI Capabilities and Limitations.',
          'For students and teachers: AI Fluency for students, AI Fluency for educators.',
          'For business owners and specialised fields: AI Fluency for small businesses, for creative work and for nonprofits.',
          'For developers: Building with the Claude API, Claude Platform 101, Claude Code 101, Claude Code in Action.',
          'For building tools and agents: Introduction to Model Context Protocol, then Model Context Protocol: Advanced Topics, Introduction to agent skills, Introduction to subagents.',
        ],
      },
      {
        heading: 'A suggested order',
        paragraphs: [
          'Non-programmers: start with Claude 101, then AI Fluency: Framework & Foundations, then the specialised course for your field. Developers: Claude 101 quickly, then Building with the Claude API, then Claude Code 101 and Claude Code in Action, then MCP and skills. Do not enrol in more than two courses at a time.',
        ],
      },
      {
        heading: 'The eight prompts',
        paragraphs: [],
        prompts: [
          {
            title: 'Path advisor',
            when: 'Before enrolling in any course.',
            expect: 'A path of 3-4 courses in order with a reason for each, a final project that ties them together, and what you can postpone.',
            text: `This is the list of free Anthropic Academy courses I am considering:
[paste course names from the catalogue]

About me:
- Background: [student/employee/developer... and programming level]
- Goal within 3 months: [e.g. use Claude at work / build an app with the API]
- Time per week: [hours]

1. Pick 3-4 courses for me, in order, with a reason for each.
2. Which courses should I postpone, and why?
3. Suggest one final project that combines what I will learn.
Rely only on the course names in the list, and if you need details about a course’s content, tell me to check it.`,
          },
          {
            title: 'A realistic weekly plan',
            when: 'After choosing your path, so you actually finish it.',
            expect: 'A weekly schedule of sessions with a concrete output at the end of each week, plus a fallback for busy weeks.',
            text: `I will take these courses in order: [list]. I have [number] hours a week across [days].
Create a plan for [number] weeks:
- For each week: the lessons, the hands-on practice, and a tangible output at the end.
- Spend at least 40% of the time practising, not watching.
- Add a review day every two weeks.
- A fallback if I miss a week, without the schedule collapsing.`,
          },
          {
            title: 'From lesson to practice',
            when: 'Right after each lesson, in the same session.',
            expect: 'Corrections to your own short summary, three graded exercises on your work or studies, and a clear criterion for knowing you have mastered the idea.',
            text: `I finished a lesson called [lesson title] in [course name]. These are my notes:
[paste notes]

1. Correct my understanding: what is accurate and what is missing? (Tell me if you are unsure about the course’s actual content.)
2. Give me 3 graded exercises applying the idea to [my field: work / a course / a project].
3. What criterion would prove I have mastered this idea?
4. What mistake do beginners usually make on this topic?`,
          },
          {
            title: 'Quiz before moving on',
            when: 'At the end of each module, before starting the next.',
            expect: 'One question at a time focused on understanding and application, then a report of what to review.',
            text: `Quiz me on [module topic] from [course name], based on these notes:
[paste notes]

- 6 questions, one at a time, waiting for my answer.
- Two on concepts, two on application, two "what would you do if...".
- After each answer: a brief correction.
- At the end: what should I redo before moving on?`,
          },
          {
            title: 'First API app mentor',
            when: 'During or after Building with the Claude API.',
            expect: 'A small plan for a real app, a file structure, and staged steps where you write the code yourself with review, plus security warnings about your API key.',
            text: `I have done parts of Building with the Claude API and want to build my first real app.
Language: [Python/TypeScript]. App idea: [e.g. a tool that summarises meeting notes and extracts tasks].

Be a mentor, not a code writer:
1. Split the project into 5 small stages, each testable.
2. For each stage: what is needed, which concepts from the course I will use, and how to test it.
3. I will write the code myself and paste it; review it and point out mistakes without rewriting it all.
4. Warn me about security practices: keep the API key in environment variables, never push it to GitHub, and control cost.
Start with stage one only.`,
          },
          {
            title: 'MCP in plain language plus a small project',
            when: 'Before or during Introduction to Model Context Protocol.',
            expect: 'An analogy first, then the correct terms, a small MCP server idea that fits your level, and a list of what to check in the official docs.',
            text: `I am [my programming level] and about to start Introduction to Model Context Protocol.
1. Explain MCP with a simple analogy, then with the correct terms (client, server, tools, resources).
2. What problem does it solve, and when do I not need it?
3. Suggest 3 ideas for a small MCP server that fits my level and serves [my field], ordered from easiest.
4. Which parts should I verify in the official docs because they may change?
Do not invent function or package names; if you are unsure, say so.`,
          },
          {
            title: 'A capstone project for each course',
            when: 'In the last week of each course.',
            expect: 'Three scoped project ideas, acceptance criteria, a short build plan, and what to show in your portfolio.',
            text: `I finished [course name]. Key things I learned: [list].
My field or interest: [...]. Time available: [number] hours.

1. Suggest 3 small projects that prove what I learned, each with: the problem, the output, and why it fits the course.
2. For the one I choose: clear acceptance criteria (when it counts as done) and a build plan in hours.
3. What to show on GitHub or my portfolio: README, screenshots, a short description.`,
          },
          {
            title: 'A post that documents learning honestly',
            when: 'After finishing the course and the project, not before.',
            expect: 'A short post in your voice focused on what you actually built and learned, without hype, in two tones.',
            text: `I finished [course name] from Anthropic Academy and built [project description].
3 things I really learned: [...]
A challenge I hit and how I solved it: [...]
Project link: [...]

Write a 120-180 word first-person LinkedIn post:
- Open with what I built or learned, not "I am thrilled to announce".
- Mention the course as the source of learning without overstating the certificate.
- End with a question for readers.
Write two versions: calm and professional, and more enthusiastic. Do not add any achievement I did not mention.`,
          },
        ],
      },
      {
        heading: 'Useful follow-ups',
        paragraphs: [],
        list: [
          '"Rephrase this concept with an example from [my field]."',
          '"How does what I learned here differ from the next course in my path?"',
          '"Review my project README as a technical recruiter."',
          '"Create review flashcards from my notes for this module."',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [],
        list: [
          'Enrolling in every course at once and finishing none.',
          'Watching lessons without practising the same day.',
          'Relying on Claude to describe a course you have not taken; it may get details wrong.',
          'Making the certificate the goal instead of the project and the skill.',
          'Pushing your API key to a public repository while experimenting.',
        ],
      },
      {
        heading: 'Quick workflow checklist',
        paragraphs: [],
        list: [
          'Open anthropic.skilljar.com and create an account.',
          'Choose your path (1) and weekly plan (2).',
          'After each lesson: practice (3); after each module: quiz (4).',
          'Developers: first API app (5) and understanding MCP (6).',
          'A capstone project per course (7).',
          'A post documenting your learning (8) after the project.',
        ],
      },
    ],
  },
}
