import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'master-ai-tools-by-building',
  date: '2026-10-31',
  cover: '/blog/master-ai-tools-by-building.png',
  coverLines: ['Master AI Tools', 'by Building'],
  coverAlt: { ar: 'غلاف مقال إتقان أدوات الذكاء الاصطناعي بالمشاريع', en: 'Cover: master AI tools by building' },
  tags: ['AI', 'Learning', 'Claude'],
  ar: {
    title: 'لا تتعلم أدوات الذكاء الاصطناعي بالمشاهدة: منهجيتي في إتقانها عبر المشاريع الصغيرة',
    excerpt:
      'مشاهدة الشروحات تعطيك إحساسًا بالفهم، لكن المهارة الحقيقية تأتي من البناء. هذه منهجية عملية من أربع مراحل لإتقان أي أداة ذكاء اصطناعي، مع أمثلة مشاريع وقائمة مراجعة أسبوعية.',
    sections: [
      {
        paragraphs: [
          'بصفتي طالب هندسة برمجيات ومطوّر full-stack، تعلمت أن أسرع طريقة لفهم أي تقنية جديدة ليست قراءة كل ما كُتب عنها، بل بناء شيء صغير بها في أقرب وقت. وأرى أن هذه القاعدة تنطبق تمامًا على أدوات الذكاء الاصطناعي مثل Claude وChatGPT وGemini. كثيرون يقضون ساعات في مشاهدة مقاطع "أفضل الأوامر" ثم يعودون لاستخدام الأداة بالطريقة نفسها التي بدأوا بها، لأن المعرفة لم تتحول إلى عادة.',
          'في هذا المقال أشارك المنهجية التي أنصح بها لكل من يريد أن ينتقل من الاستخدام العشوائي إلى الإتقان: التعلم عبر مشاريع صغيرة مرتبطة بحياتك الحقيقية، مع مراجعة منتظمة لما تعلمته.',
        ],
      },
      {
        heading: 'لماذا تفشل طريقة "جمع الأوامر"؟',
        paragraphs: [
          'قوائم الأوامر الجاهزة مفيدة كبداية، لكنها مكتوبة لسياق شخص آخر. حين تنسخ أمرًا لا تفهم لماذا صيغ بهذه الطريقة، فإنك لا تستطيع تعديله عندما يختلف موقفك. المهارة الحقيقية هي أن تفهم المبادئ التي تجعل الطلب جيدًا: وضوح الهدف، وكفاية السياق، وتحديد الشكل المطلوب، ثم القدرة على تقييم الناتج وتحسينه.',
          'المشاريع تجبرك على ممارسة هذه المبادئ كلها، لأنك تريد نتيجة محددة تحتاجها فعلًا، ولن تقبل بإجابة عامة.',
        ],
      },
      {
        heading: 'المرحلة الأولى: اختر مشكلة حقيقية صغيرة',
        paragraphs: [
          'ابدأ بمهمة تتكرر في أسبوعك وتستهلك وقتك. المهم أن تكون صغيرة بما يكفي لتنجزها في جلسة أو جلستين، وحقيقية بما يكفي لتهتم بنتيجتها. أمثلة مناسبة:',
        ],
        list: [
          'للطالب: تحويل محاضرة مسجلة أو ملف PDF إلى ملخص وأسئلة مراجعة.',
          'للموظف: صياغة رد احترافي على رسائل متكررة، أو تحويل ملاحظات اجتماع إلى قائمة مهام.',
          'للمطور: شرح جزء من كود قديم، أو كتابة اختبارات لدالة موجودة.',
          'لصاحب مشروع صغير: كتابة وصف لمنتج، أو تحليل تعليقات العملاء وتصنيفها.',
        ],
      },
      {
        heading: 'المرحلة الثانية: ابنِ الحل على ثلاث جولات',
        paragraphs: [
          'لا تتوقع أن ينجح الطلب الأول. اعتبر العمل ثلاث جولات واضحة، ودوّن ما تغيّر في كل جولة:',
        ],
        list: [
          'الجولة الأولى: اكتب طلبك بالطريقة التي تكتبها عادة، واحفظ الناتج كما هو.',
          'الجولة الثانية: أضف السياق الناقص: من أنت، ولمن الناتج، وما المعايير التي تحكم عليه بها، وما الشكل النهائي المطلوب.',
          'الجولة الثالثة: اطلب من الأداة أن تنتقد ناتجها بنفسها وفق معاييرك، ثم تعيد كتابته. قارن الجولات الثلاث، وستلاحظ بوضوح أي تعديل صنع الفرق الأكبر.',
        ],
      },
      {
        heading: 'المرحلة الثالثة: حوّل ما نجح إلى قالب',
        paragraphs: [
          'عندما تصل إلى نتيجة ممتازة، لا تكتفِ بها. استخرج من المحادثة "القالب" الذي يمكنك إعادة استخدامه: الدور، والسياق الثابت، والخطوات، وشكل المخرجات، مع ترك فراغات للأجزاء المتغيرة. احفظ هذه القوالب في ملف واحد منظم حسب نوع المهمة. ومع الوقت تصبح لديك مكتبة شخصية مبنية على تجربتك أنت، وهي أثمن من أي قائمة جاهزة.',
          'وإذا كانت الأداة تدعم المشاريع أو التعليمات الدائمة، مثل ميزة Projects في Claude أو التعليمات المخصصة في ChatGPT، فضع فيها القواعد التي تكررها في كل مرة، حتى لا تبدأ من الصفر في كل محادثة.',
        ],
      },
      {
        heading: 'المرحلة الرابعة: وسّع المشروع خطوة واحدة',
        paragraphs: [
          'بعد أن تتقن المهمة الأساسية، أضف تحديًا جديدًا واحدًا فقط: ارفع ملفًا بدل النص، أو اطلب جدولًا بدل الفقرات، أو اربط مهمتين معًا في سلسلة، مثل تلخيص ثم استخراج مهام ثم صياغة رسالة متابعة. هذه الخطوة الإضافية هي ما ينقلك من مستخدم يطرح أسئلة إلى شخص يبني سير عمل كاملًا.',
          'وإن كنت مطورًا، فالامتداد الطبيعي هو تجربة الواجهة البرمجية للأداة وبناء أداة صغيرة تخدمك أنت، مثل سكربت يلخص ملفات مجلد معين. لا تحتاج إلى مشروع ضخم؛ عشرات الأسطر تكفي لتفهم الفرق بين الاستخدام من الواجهة والاستخدام من الكود.',
        ],
      },
      {
        heading: 'مثال تطبيقي: من ملاحظات فوضوية إلى سير عمل جاهز',
        paragraphs: [
          'لنفترض أنك طالب تكتب ملاحظات سريعة وغير مرتبة أثناء المحاضرات. في الجولة الأولى تكتب: "رتب هذه الملاحظات"، فتحصل على نص منسق لكنه عام، وربما حذف تفاصيل تهمك. في الجولة الثانية تضيف: "أنا طالب هندسة برمجيات، هذه ملاحظات محاضرة عن قواعد البيانات، أريد ملخصًا من صفحة واحدة بعناوين فرعية، مع قائمة بالمصطلحات وتعريف كل منها في سطر، ولا تحذف أي مثال ذكره المحاضر". النتيجة هنا أقرب كثيرًا لما تحتاجه.',
          'في الجولة الثالثة تطلب: "راجع الملخص وتأكد أنه يغطي كل نقطة في الملاحظات الأصلية، واذكر أي نقطة غامضة تحتاج أن أراجعها في المرجع". الآن لم تحصل على ملخص فقط، بل على قائمة بما يجب أن تتأكد منه. احفظ هذا الطلب كقالب باسم "ملخص محاضرة"، وفي الأسبوع التالي أضف خطوة: توليد خمسة أسئلة مراجعة من الملخص. بعد شهر سيكون لديك نظام مذاكرة كامل بنيته بنفسك، وتفهم سبب كل جزء فيه.',
        ],
      },
      {
        heading: 'قائمة المراجعة الأسبوعية',
        paragraphs: ['خصص ربع ساعة في نهاية كل أسبوع لهذه الأسئلة:'],
        list: [
          'ما المهمة التي وفّرت عليّ أكبر وقت هذا الأسبوع؟',
          'ما الطلب الذي فشل، وما المعلومة التي كانت ناقصة فيه؟',
          'هل أضفت قالبًا جديدًا إلى مكتبتي أو حسّنت قالبًا قديمًا؟',
          'هل راجعت كل معلومة وأرقام قبل استخدامها؟',
          'ما المشروع الصغير التالي الذي سأجربه؟',
        ],
      },
      {
        heading: 'أخطاء أنصحك بتجنبها',
        paragraphs: [],
        list: [
          'التنقل بين أدوات كثيرة في وقت واحد قبل إتقان واحدة منها.',
          'الثقة الكاملة في الناتج دون مراجعة، خاصة في الحقائق والأرقام والمراجع.',
          'إدخال بيانات شخصية أو سرية دون التأكد من سياسة الخصوصية وسياسة جهة عملك أو دراستك.',
          'الحكم على الأداة من تجربة واحدة سيئة بدل تحليل سبب ضعف النتيجة.',
        ],
      },
      {
        heading: 'الخلاصة',
        paragraphs: [
          'إتقان أدوات الذكاء الاصطناعي لا يحتاج إلى موهبة خاصة، بل إلى طريقة. اختر مشكلة حقيقية صغيرة، وابنِ حلها على جولات، واحفظ ما نجح كقالب، ثم وسّع خطوة واحدة في كل مرة. بهذه الطريقة يصبح كل أسبوع مشروعًا صغيرًا، وكل مشروع إضافة دائمة إلى مهاراتك. وأنا مقتنع بأن من يتعامل مع هذه الأدوات كمهارة هندسية تُبنى بالممارسة، سيكون في موقع مختلف تمامًا خلال أشهر قليلة.',
        ],
      },
    ],
  },
  en: {
    title: 'Don’t Learn AI Tools by Watching: My Method for Mastering Them Through Small Projects',
    excerpt:
      'Watching tutorials feels like understanding, but real skill comes from building. A practical four-stage method for mastering any AI tool, with project ideas and a weekly review checklist.',
    sections: [
      {
        paragraphs: [
          'As a software engineering student and full-stack developer, I have learned that the fastest way to understand a new technology is not to read everything about it, but to build something small with it as soon as possible. I believe the same rule applies to AI tools such as Claude, ChatGPT and Gemini. Many people spend hours watching “best prompts” videos and then go back to using the tool exactly as before, because the knowledge never became a habit.',
          'In this article I share the method I recommend to anyone who wants to move from random use to real mastery: learning through small projects tied to your actual life, with a regular review of what you learned.',
        ],
      },
      {
        heading: 'Why collecting prompts fails',
        paragraphs: [
          'Ready-made prompt lists are a fine start, but they were written for someone else’s context. If you copy a prompt without understanding why it is phrased that way, you cannot adapt it when your situation changes. The real skill is understanding what makes a request good: a clear goal, enough context, a defined output format, and the ability to evaluate and improve the result. Projects force you to practise all of these, because you need a specific outcome and will not settle for a generic answer.',
        ],
      },
      {
        heading: 'Stage 1: pick a small, real problem',
        paragraphs: ['Start with a task that repeats every week and eats your time. It should be small enough to finish in one or two sessions and real enough that you care about the result:'],
        list: [
          'Students: turn a recorded lecture or a PDF into a summary and review questions.',
          'Employees: draft professional replies to recurring emails, or turn meeting notes into a task list.',
          'Developers: explain a piece of legacy code, or write tests for an existing function.',
          'Small business owners: write a product description, or analyse and categorise customer feedback.',
        ],
      },
      {
        heading: 'Stage 2: build the solution in three rounds',
        paragraphs: ['Do not expect the first request to work. Treat the work as three clear rounds and note what changed each time:'],
        list: [
          'Round one: write the request the way you normally would and save the output as is.',
          'Round two: add the missing context: who you are, who the output is for, the criteria you will judge it by, and the final format.',
          'Round three: ask the tool to critique its own output against your criteria and rewrite it. Compare all three rounds and you will see which change made the biggest difference.',
        ],
      },
      {
        heading: 'Stage 3: turn what worked into a template',
        paragraphs: [
          'When you get an excellent result, extract the reusable template from the conversation: the role, the fixed context, the steps and the output format, with blanks for the parts that change. Keep these templates in one file organised by task type. Over time you will own a personal library built on your own experience, which is worth more than any ready-made list.',
          'If the tool supports projects or persistent instructions, such as Projects in Claude or custom instructions in ChatGPT, put the rules you repeat every time there so you never start from zero.',
        ],
      },
      {
        heading: 'Stage 4: extend the project by one step',
        paragraphs: [
          'Once the core task is solid, add exactly one new challenge: upload a file instead of pasting text, ask for a table instead of paragraphs, or chain two tasks together, such as summarise, then extract tasks, then draft a follow-up message. That extra step is what moves you from asking questions to building complete workflows.',
          'If you are a developer, the natural next step is the tool’s API: build a tiny utility for yourself, such as a script that summarises the files in a folder. A few dozen lines are enough to understand the difference between using the chat interface and using the model from code.',
        ],
      },
      {
        heading: 'Worked example: from messy notes to a ready workflow',
        paragraphs: [
          'Say you are a student who takes quick, messy notes in lectures. Round one: “organise these notes” gives you tidy but generic text that may drop details you care about. Round two: “I am a software engineering student; these are notes from a database lecture; I want a one-page summary with subheadings, a glossary with a one-line definition per term, and keep every example the lecturer gave.” The result is far closer to what you need.',
          'Round three: “check that the summary covers every point in the original notes and list anything unclear that I should verify in the textbook.” Now you have a summary and a list of what to check. Save this as a “lecture summary” template, and next week add one step: generate five review questions from the summary. After a month you will have a complete study system that you built yourself and understand in every detail.',
        ],
      },
      {
        heading: 'Weekly review checklist',
        paragraphs: ['Spend fifteen minutes at the end of each week on these questions:'],
        list: [
          'Which task saved me the most time this week?',
          'Which request failed, and what information was missing?',
          'Did I add a new template to my library or improve an old one?',
          'Did I verify every fact and number before using it?',
          'What is the next small project I will try?',
        ],
      },
      {
        heading: 'Mistakes to avoid',
        paragraphs: [],
        list: [
          'Jumping between many tools before mastering one.',
          'Trusting output without review, especially facts, numbers and references.',
          'Sharing personal or confidential data without checking the privacy policy and your workplace or university rules.',
          'Judging a tool on one bad result instead of analysing why the result was weak.',
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'Mastering AI tools does not require special talent, it requires a method. Pick a small real problem, build the solution in rounds, save what works as a template, and extend one step at a time. Every week becomes a small project, and every project becomes a permanent addition to your skills. I am convinced that people who treat these tools as an engineering skill built through practice will be in a very different place within a few months.',
        ],
      },
    ],
  },
}
