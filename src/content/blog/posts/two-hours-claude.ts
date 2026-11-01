import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'two-hours-to-learn-claude',
  date: '2026-10-24',
  cover: '/blog/two-hours-to-learn-claude.webp?v=4',
  coverAlt: { ar: 'غلاف مقال ساعتان لتعلم Claude عمليًا', en: 'Cover: two hours to learn Claude hands-on' },
  tags: ['Claude', 'Prompting', 'Hands-on'],
  ar: {
    title: 'ساعتان فقط لتتقن Claude عمليًا: مختبر مقسّم بالدقائق مع برومبت جاهز لكل مرحلة',
    excerpt:
      'بدل مشاهدة عشرات الفيديوهات، خصص ساعتين لمختبر عملي واحد: تجهيز مشروع وتعليمات، وتحسين البرومبت، والعمل على الملفات، وبناء أداة تفاعلية، والنقد الذاتي، ومكتبة برومبتات خاصة بك. ثمانية برومبتات جاهزة، واحد لكل مرحلة.',
    hook:
      'بعد ساعتين من هذا المختبر سيكون لديك: مشروع في Claude بتعليمات تناسبك، وطريقة ثابتة لكتابة برومبت قوي، وخبرة في استجواب ملفاتك، وأداة تفاعلية صغيرة بنيتها بنفسك، وعادة للتحقق من الإجابات، ومكتبة برومبتات تعيد استخدامها كل يوم.',
    sections: [
      {
        paragraphs: [
          'معظم الناس يستخدمون Claude كمحرك بحث: سؤال قصير وإجابة عامة. الفرق بين هذا الاستخدام والاستخدام الاحترافي ليس في معرفة "حيل سرية"، بل في بضع عادات: سياق واضح، ومهمة محددة، وصيغة مخرجات، ومراجعة. وأسرع طريقة لاكتسابها هي التطبيق المركز على مهمة حقيقية من عملك أو دراستك.',
          'قبل البدء: اختر مهمة حقيقية واحدة ستعمل عليها طوال المختبر (تقرير، أو مشروع جامعي، أو خطة عمل)، وجهّز ملفًا أو ملفين متعلقين بها. حسب صفحة أسعار Claude، الخطة المجانية تتيح المشاريع (حتى 5) وArtifacts ورفع الملفات، مع حدود استخدام، لذلك يمكنك تنفيذ المختبر كاملًا دون اشتراك.',
        ],
      },
      {
        heading: 'المختبر: ثماني مراحل وثمانية برومبتات',
        paragraphs: [
          'التوقيت تقريبي؛ المهم أن تنهي كل مرحلة بمخرج ملموس قبل الانتقال.',
        ],
        prompts: [
          {
            title: '0:00 إلى 0:15، تعليمات المشروع',
            when: 'أنشئ مشروعًا (Project) جديدًا باسم مهمتك، ثم استخدم هذا البرومبت لكتابة تعليماته.',
            expect: 'نص تعليمات جاهز للصق في إعدادات المشروع: من أنت، وما المهمة، والأسلوب، والقواعد. ستلاحظ بعده أن كل محادثة داخل المشروع تبدأ وهي تعرف السياق.',
            text: `ساعدني في كتابة تعليمات (Project instructions) لمشروع في Claude.
عني: [الدور، المجال، المستوى]
المهمة التي سأعمل عليها في هذا المشروع: [...]
الجمهور النهائي للمخرجات: [...]
الأسلوب الذي أفضله: [مختصر/مفصل، رسمي/ودي، اللغة]
أشياء أكرهها في الإجابات: [مثلًا: المقدمات الطويلة، المبالغة]

اكتب تعليمات من 150 كلمة تقريبًا تتضمن: السياق، والأولويات، وصيغة الإجابة الافتراضية، وقاعدة "اسألني إذا كانت المعلومة ناقصة بدل التخمين".`,
          },
          {
            title: '0:15 إلى 0:30، ترقية البرومبت',
            when: 'خذ أي برومبت قصير كنت تكتبه عادة وحسّنه.',
            expect: 'تحليل لما ينقص برومبتك، ونسخة محسنة بهيكل واضح، وشرح لسبب كل تحسين تتعلم منه القاعدة.',
            text: `هذا برومبت أكتبه عادة: "[البرومبت القصير]"

1. ما المعلومات التي تنقصه لتعطيني أفضل إجابة؟ (الدور، والسياق، والهدف، والقيود، وصيغة المخرجات، والأمثلة)
2. أعد كتابته بهيكل واضح، وضع المدخلات المتغيرة بين [أقواس].
3. اشرح باختصار لماذا يحسن كل جزء النتيجة.
4. أعطني نسخة قصيرة من 3 أسطر للاستخدام السريع.`,
          },
          {
            title: '0:30 إلى 0:40، المقابلة قبل التنفيذ',
            when: 'للمهام الغامضة أو الكبيرة، بدل أن تكتب كل التفاصيل بنفسك.',
            expect: 'أسئلة قليلة ومركزة قبل أي كتابة، ثم ملخص لفهمه للمطلوب لتؤكده، وبعدها التنفيذ.',
            text: `أريد [وصف المهمة باختصار].
قبل أن تبدأ: اسألني حتى 7 أسئلة تحتاجها لتنفيذ هذا بأفضل شكل، سؤالًا واحدًا في كل مرة، مرتبة من الأهم.
بعد الأسئلة: لخّص فهمك للمطلوب في 5 نقاط وانتظر تأكيدي، ثم نفّذ.`,
          },
          {
            title: '0:40 إلى 1:00، استجواب ملفاتك',
            when: 'ارفع ملفًا متعلقًا بمهمتك: تقرير، أو بحث، أو محاضرة، أو عقد.',
            expect: 'إجابات مع اقتباسات من الملف، وتمييز واضح بين ما في الملف وما هو استنتاج، وقائمة بما لا يغطيه الملف.',
            text: `أرفقت [وصف الملف]. هدفي منه: [...]

<task>
1. لخّص الملف في 5 نقاط مع اقتباس قصير يدعم كل نقطة.
2. أجب عن أسئلتي التالية من الملف فقط: [سؤال 1]، [سؤال 2]، [سؤال 3].
3. لكل إجابة: هل هي موجودة نصًا في الملف أم استنتاج منك؟
4. ما الأسئلة المهمة لهدفي التي لا يجيب عنها الملف؟
</task>
إذا لم تجد المعلومة في الملف قل ذلك بوضوح.`,
          },
          {
            title: '1:00 إلى 1:20، بناء أداة تفاعلية (Artifact)',
            when: 'لترى كيف يتحول وصف بالكلام إلى أداة تعمل في المتصفح.',
            expect: 'أداة صغيرة تعمل داخل نافذة Artifact، ثم تحسينها عبر طلبات متتالية. ابدأ بسيطًا ثم أضف الميزات.',
            text: `أنشئ Artifact: أداة ويب تفاعلية بسيطة تساعدني في [مهمتي]، مثلًا: [متتبع مهام لمشروعي / حاسبة ميزانية / بطاقات مراجعة لمادتي].

المتطلبات:
- واجهة [عربية من اليمين لليسار / إنجليزية]، وتصميم نظيف يعمل على الجوال.
- الوظائف الأساسية فقط: [2 إلى 3 وظائف].
- بيانات تجريبية واضحة أنها تجريبية.
ابدأ بنسخة أولى بسيطة، ثم اقترح 3 تحسينات أختار منها.`,
          },
          {
            title: '1:20 إلى 1:35، النقد الذاتي والتحقق',
            when: 'على أي مخرج مهم أنتجته في المختبر قبل اعتماده.',
            expect: 'مراجعة صريحة لنقاط الضعف والادعاءات التي تحتاج تحققًا، ثم نسخة محسنة. ما زال عليك التحقق من الحقائق المهمة بنفسك.',
            text: `راجع إجابتك السابقة كمراجع صارم من [الجمهور المستهدف]:
1. ما أضعف 3 نقاط فيها؟
2. اذكر كل ادعاء أو رقم أو اسم يحتاج تحققًا، وكيف أتحقق منه.
3. ما الذي افترضته دون أن أخبرك به؟
4. أعد كتابتها مع إصلاح ما سبق، وضع [تحقق] بجانب أي معلومة غير مؤكدة.`,
          },
          {
            title: '1:35 إلى 1:50، صيغة واحدة إلى ثلاث',
            when: 'لتتعلم التحكم في صيغة المخرجات، وهي من أكثر المهارات توفيرًا للوقت.',
            expect: 'نفس المحتوى في ثلاث صيغ مختلفة جاهزة للاستخدام، مع الحفاظ على الحقائق نفسها.',
            text: `خذ المحتوى النهائي لمهمتي:
[الصق المحتوى أو أشر إليه في المحادثة]

حوّله إلى:
1. رسالة بريد إلى [الشخص] في 120 كلمة مع طلب واضح.
2. جدول مقارنة أو خطة بأعمدة: [حددها].
3. 5 شرائح: لكل شريحة عنوان يقول الاستنتاج و3 نقاط.
لا تضف معلومات جديدة، ولا تحذف أي رقم مهم.`,
          },
          {
            title: '1:50 إلى 2:00، مكتبة برومبتاتك',
            when: 'في آخر عشر دقائق، لتحفظ ما نجح وتعيد استخدامه.',
            expect: 'قوالب قابلة لإعادة الاستخدام مستخرجة من محادثتك، لكل منها اسم ومتى يستخدم ومتغيرات بين أقواس. احفظها في ملف ملاحظات أو في تعليمات المشروع.',
            text: `راجع هذه المحادثة كلها، واستخرج منها مكتبة برومبتات قابلة لإعادة الاستخدام:
- 5 قوالب من الطلبات التي أعطت أفضل النتائج.
- لكل قالب: اسم قصير، ومتى أستخدمه، والنص مع المتغيرات بين [أقواس].
- أضف قالبًا عامًا لأي مهمة جديدة يتضمن: الدور، والسياق، والمهمة، والقيود، وصيغة المخرجات.
- رتّبها في جدول يمكن نسخه إلى ملف ملاحظاتي.`,
          },
        ],
      },
      {
        heading: 'بعد المختبر: كيف تحافظ على المهارة؟',
        paragraphs: [
          'المختبر يعطيك الأساس، لكن المهارة تثبت بالتكرار. القاعدة التي تجمع كل المراحل بسيطة: سياق واضح، ومهمة محددة، وقيود، وصيغة مخرجات، ثم مراجعة. كلما شعرت أن الإجابة عامة، ارجع إلى هذه العناصر واسأل نفسك أيها ناقص.',
        ],
        list: [
          'استخدم مكتبتك يوميًا لمدة أسبوع، وعدّل القوالب التي لا تعطي نتيجة جيدة.',
          'أنشئ مشروعًا منفصلًا لكل مجال (دراسة، عمل، مشروع شخصي) بتعليمات مختلفة.',
          'جرّب كل أسبوع ميزة واحدة جديدة: البحث على الويب، أو إنشاء الملفات، أو الربط بتطبيقاتك.',
          'إذا أردت التعمق، ادرس دورة Claude 101 المجانية من Anthropic Academy.',
        ],
      },
      {
        heading: 'أخطاء شائعة',
        paragraphs: [],
        list: [
          'التدرب على أمثلة وهمية بدل مهمة حقيقية تهمك.',
          'قبول أول إجابة دون طلب النقد والتحسين.',
          'بناء Artifact معقد من أول طلب بدل البدء بنسخة بسيطة.',
          'نسيان حفظ البرومبتات الناجحة، فتعيد كتابتها من الصفر كل مرة.',
          'رفع ملفات حساسة دون حاجة.',
        ],
      },
      {
        heading: 'قائمة سير العمل السريعة',
        paragraphs: [],
        list: [
          'اختر مهمة حقيقية وجهّز ملفاتها.',
          'المشروع والتعليمات (1)، وترقية البرومبت (2).',
          'المقابلة قبل التنفيذ (3)، واستجواب الملفات (4).',
          'الأداة التفاعلية (5)، والنقد والتحقق (6).',
          'تحويل الصيغ (7)، ومكتبة البرومبتات (8).',
          'استخدم المكتبة يوميًا لأسبوع.',
        ],
      },
    ],
  },
  en: {
    title: 'Just Two Hours to Get Hands-On With Claude: A Minute-by-Minute Lab With a Ready Prompt for Every Stage',
    excerpt:
      'Instead of watching dozens of videos, set aside two hours for one hands-on lab: set up a project and instructions, upgrade your prompts, work with files, build an interactive tool, self-critique, and build your own prompt library. Eight ready prompts, one per stage.',
    hook:
      'After two hours in this lab you will have a Claude project with instructions that fit you, a repeatable way to write a strong prompt, practice interrogating your files, a small interactive tool you built yourself, a habit of verifying answers, and a prompt library you reuse every day.',
    sections: [
      {
        paragraphs: [
          'Most people use Claude like a search engine: a short question and a generic answer. The difference between that and professional use is not “secret tricks” but a few habits: clear context, a specific task, an output format, and review. The fastest way to build them is focused practice on a real task from your work or studies.',
          'Before you start, pick one real task to work on for the whole lab (a report, a university project, a business plan) and prepare one or two related files. According to Claude’s pricing page, the Free plan includes Projects (up to 5), Artifacts and file uploads, with usage limits, so you can do the whole lab without a subscription.',
        ],
      },
      {
        heading: 'The lab: eight stages, eight prompts',
        paragraphs: [
          'Timings are approximate; what matters is finishing each stage with a tangible output before moving on.',
        ],
        prompts: [
          {
            title: '0:00 to 0:15, project instructions',
            when: 'Create a new Project named after your task, then use this prompt to write its instructions.',
            expect: 'Instruction text ready to paste into the project settings: who you are, the task, the style and the rules. After that, every chat in the project starts with the context.',
            text: `Help me write Project instructions for a Claude project.
About me: [role, field, level]
The task I will work on in this project: [...]
The final audience for the output: [...]
My preferred style: [concise/detailed, formal/friendly, language]
Things I dislike in answers: [e.g. long intros, hype]

Write instructions of about 150 words covering: context, priorities, the default answer format, and the rule "ask me when information is missing instead of guessing".`,
          },
          {
            title: '0:15 to 0:30, upgrade a prompt',
            when: 'Take any short prompt you usually write and improve it.',
            expect: 'An analysis of what your prompt lacks, an improved version with clear structure, and the reason behind each change so you learn the rule.',
            text: `This is a prompt I usually write: "[your short prompt]"

1. What information is missing for you to give your best answer? (role, context, goal, constraints, output format, examples)
2. Rewrite it with a clear structure, putting variable inputs in [brackets].
3. Briefly explain why each part improves the result.
4. Give me a 3-line short version for quick use.`,
          },
          {
            title: '0:30 to 0:40, interview before executing',
            when: 'For vague or large tasks, instead of writing every detail yourself.',
            expect: 'A few focused questions before any writing, then a summary of its understanding for you to confirm, then the work.',
            text: `I want [short description of the task].
Before you start: ask me up to 7 questions you need to do this well, one at a time, most important first.
After the questions: summarise your understanding in 5 points and wait for my confirmation, then do it.`,
          },
          {
            title: '0:40 to 1:00, interrogate your files',
            when: 'Upload a file related to your task: a report, paper, lecture or contract.',
            expect: 'Answers with quotes from the file, a clear split between what is in the file and what is inference, and a list of what the file does not cover.',
            text: `I attached [file description]. My goal with it: [...]

<task>
1. Summarise the file in 5 points with a short supporting quote for each.
2. Answer these questions from the file only: [question 1], [question 2], [question 3].
3. For each answer: is it stated in the file or your inference?
4. Which questions important to my goal does the file not answer?
</task>
If the information is not in the file, say so clearly.`,
          },
          {
            title: '1:00 to 1:20, build an interactive tool (Artifact)',
            when: 'To see how a plain description becomes a working tool in the browser.',
            expect: 'A small tool running in an Artifact window, then improved through follow-up requests. Start simple, then add features.',
            text: `Create an Artifact: a simple interactive web tool that helps me with [my task], e.g. [a project task tracker / a budget calculator / review flashcards for my course].

Requirements:
- [English / Arabic right-to-left] interface, clean design that works on mobile.
- Core functions only: [2-3 functions].
- Sample data clearly labelled as sample.
Start with a simple first version, then suggest 3 improvements for me to choose from.`,
          },
          {
            title: '1:20 to 1:35, self-critique and verification',
            when: 'On any important output from the lab, before you rely on it.',
            expect: 'A blunt review of weak points and claims that need checking, then an improved version. You still need to verify key facts yourself.',
            text: `Review your previous answer as a strict reviewer from [target audience]:
1. What are its 3 weakest points?
2. List every claim, number or name that needs verification, and how I can verify it.
3. What did you assume that I did not tell you?
4. Rewrite it fixing the above, and put [verify] next to any unconfirmed information.`,
          },
          {
            title: '1:35 to 1:50, one piece into three formats',
            when: 'To learn to control output format, one of the biggest time-savers.',
            expect: 'The same content in three ready-to-use formats, keeping the same facts.',
            text: `Take the final content of my task:
[paste it or refer to it in the chat]

Turn it into:
1. A 120-word email to [person] with a clear ask.
2. A comparison table or plan with columns: [define them].
3. 5 slides: each with a title stating the takeaway and 3 bullets.
Add no new information and drop no important number.`,
          },
          {
            title: '1:50 to 2:00, your prompt library',
            when: 'In the final ten minutes, to save what worked and reuse it.',
            expect: 'Reusable templates extracted from your chat, each with a name, when to use it and bracketed variables. Save them in a notes file or the project instructions.',
            text: `Review this whole conversation and extract a reusable prompt library:
- 5 templates from the requests that gave the best results.
- For each: a short name, when to use it, and the text with variables in [brackets].
- Add a general template for any new task covering: role, context, task, constraints, output format.
- Arrange them in a table I can copy into my notes.`,
          },
        ],
      },
      {
        heading: 'After the lab: keeping the skill',
        paragraphs: [
          'The lab gives you the foundation, but the skill sticks through repetition. The rule behind every stage is simple: clear context, a specific task, constraints, an output format, then review. Whenever an answer feels generic, go back to these elements and ask which one is missing.',
        ],
        list: [
          'Use your library daily for a week, and edit templates that do not perform well.',
          'Create a separate project for each area (study, work, side project) with different instructions.',
          'Try one new feature each week: web search, file creation, or connecting your apps.',
          'To go deeper, take the free Claude 101 course from Anthropic Academy.',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [],
        list: [
          'Practising on made-up examples instead of a real task you care about.',
          'Accepting the first answer without asking for critique and improvement.',
          'Building a complex Artifact in one request instead of starting simple.',
          'Not saving prompts that worked, so you rewrite them from scratch every time.',
          'Uploading sensitive files without need.',
        ],
      },
      {
        heading: 'Quick workflow checklist',
        paragraphs: [],
        list: [
          'Pick a real task and prepare its files.',
          'Project and instructions (1), upgrade a prompt (2).',
          'Interview first (3), interrogate files (4).',
          'Interactive tool (5), critique and verify (6).',
          'Reformat (7), prompt library (8).',
          'Use the library daily for a week.',
        ],
      },
    ],
  },
}
