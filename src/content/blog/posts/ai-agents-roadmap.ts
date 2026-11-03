import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'ai-agents-learning-roadmap',
  date: '2026-11-03',
  cover: '/blog/ai-agents-learning-roadmap.webp?v=4',
  coverAlt: { ar: 'غلاف مقال خارطة تعلم وكلاء الذكاء الاصطناعي', en: 'Cover: a roadmap for learning AI agents' },
  tags: ['AI Agents', 'MCP', 'Roadmap'],
  ar: {
    title: 'لا تجمع قوائم المصادر: خارطة من 4 أسابيع لتعلم وكلاء الذكاء الاصطناعي من مصادر رسمية مجانية، وثمانية برومبتات تبني بها أول وكيل',
    excerpt:
      'قوائم "أفضل 50 مصدرًا" عن وكلاء الذكاء الاصطناعي تُحفظ ولا تُقرأ. هذا دليل يختار لك أربعة مصادر رسمية مجانية فقط، ويرتبها في خطة من أربعة أسابيع تنتهي بوكيل صغير يعمل، مع ثمانية برومبتات جاهزة للنسخ.',
    hook:
      'بعد هذا الدليل ستعرف الفرق بين "سير العمل" و"الوكيل"، وستدرس من أربعة مصادر رسمية بترتيب واضح، وتخرج بعد أربعة أسابيع بوكيل صغير موثق على GitHub بدل مجلد مليء بالروابط المحفوظة.',
    sections: [
      {
        paragraphs: [
          'كلنا حفظنا منشورًا فيه عشرات الروابط عن الوكلاء ثم لم نفتح منه شيئًا. المشكلة ليست قلة المصادر بل كثرتها: كل رابط يعدك بالفهم، ولا يوجد ترتيب يقول لك من أين تبدأ ومتى تتوقف عن القراءة وتبدأ البناء.',
          'القاعدة في هذا الدليل بسيطة: مصدر واحد لكل أسبوع، ومخرج عملي واحد في نهاية كل أسبوع، ولا تضيف مصدرًا جديدًا قبل أن تنهي الحالي.',
        ],
      },
      {
        heading: 'ما هو الوكيل أصلًا؟',
        paragraphs: [
          'الوكيل (Agent) نظام يستخدم فيه النموذج اللغوي الأدوات ويقرر خطواته بنفسه في حلقة: يفكر، ثم ينفذ أداة، ثم يقرأ النتيجة، ثم يقرر الخطوة التالية حتى ينهي المهمة. أما "سير العمل" (Workflow) فخطواته محددة مسبقًا في الكود والنموذج ينفذ كل خطوة فقط.',
          'تنصح Anthropic في مقالها الهندسي "Building effective agents" بالبدء بأبسط حل ممكن وعدم زيادة التعقيد إلا عند الحاجة، لأن الأنظمة الوكيلة تقايض السرعة والتكلفة بأداء أفضل. كثير من المشاريع لا تحتاج وكيلًا أصلًا، وهذا أول درس يستحق أن تحفظه.',
        ],
      },
      {
        heading: 'المصادر الأربعة والخطة',
        paragraphs: ['كل المصادر التالية رسمية ومجانية وقت كتابة المقال. تحقق من صفحاتها لأن محتواها يتحدث باستمرار.'],
        list: [
          'الأسبوع 1 — المفاهيم: مقال "Building effective agents" على anthropic.com/engineering. يشرح أنماط سير العمل: سلسلة البرومبتات (Prompt chaining)، والتوجيه (Routing)، والتوازي (Parallelization)، والمنسق والعمال (Orchestrator-workers)، والمقيّم والمحسّن (Evaluator-optimizer)، ثم الوكلاء. المخرج: جدول بالأنماط ومثال من مجالك لكل نمط.',
          'الأسبوع 2 — الأساس النظري: ورقة ReAct (arxiv.org/abs/2210.03629) التي جمعت بين التفكير والتنفيذ بالأدوات في حلقة واحدة، وهي فكرة أغلب الوكلاء اليوم. المخرج: شرح الحلقة بكلماتك ورسم بسيط لها.',
          'الأسبوع 3 — التطبيق بالكود: مستودع AI Agents for Beginners من Microsoft على GitHub (دروس مستقلة بنص وكود)، أو دورة Agents Course من Hugging Face (huggingface.co/learn/agents-course) التي تتيح مسار المتابعة الحرة أو مسار الشهادة عبر إنجاز المهام. اختر واحدًا فقط. المخرج: وكيل يستخدم أداتين.',
          'الأسبوع 4 — ربط الأدوات: دورة Introduction to Model Context Protocol المجانية على anthropic.skilljar.com، مع الوثائق الرسمية في modelcontextprotocol.io. MCP معيار مفتوح لربط النماذج بالأدوات ومصادر البيانات. المخرج: خادم MCP صغير أو ربط وكيلك بخادم موجود، وREADME يوثق المشروع.',
        ],
      },
      {
        heading: 'البرومبتات الثمانية',
        paragraphs: [],
        prompts: [
          {
            title: 'هل أحتاج وكيلًا أصلًا؟',
            when: 'قبل أن تبدأ أي مشروع.',
            expect: 'حكم واضح: برومبت واحد، أو سير عمل، أو وكيل، مع السبب وأبسط تصميم يحل المشكلة.',
            text: `أريد أتمتة هذه المهمة: [وصف المهمة بالتفصيل]
المدخلات: [...]  المخرج المطلوب: [...]  كم مرة تتكرر: [...]

حللها كمهندس يفضل أبسط حل:
1. هل يكفي برومبت واحد جيد؟ أم سير عمل بخطوات ثابتة؟ أم أحتاج وكيلًا يقرر خطواته؟ ولماذا؟
2. إن كان سير عمل: أي نمط يناسب (سلسلة، توجيه، توازٍ، منسق وعمال، مقيّم ومحسّن)؟
3. ارسم الخطوات كقائمة مرقمة، وحدد أين يمكن أن يخطئ النموذج وكيف أتحقق.
4. ما التكلفة والمخاطر لو استخدمت وكيلًا بدل الحل الأبسط؟`,
          },
          {
            title: 'خطتي للأسابيع الأربعة',
            when: 'في اليوم الأول.',
            expect: 'جدول يومي واقعي حسب وقتك، بمخرج ملموس لكل أسبوع.',
            text: `سأتعلم وكلاء الذكاء الاصطناعي خلال 4 أسابيع بهذه المصادر بالترتيب:
1) مقال Building effective agents من Anthropic
2) ورقة ReAct
3) [مستودع AI Agents for Beginners من Microsoft / دورة Agents Course من Hugging Face]
4) دورة Introduction to Model Context Protocol

مستواي في البرمجة: [...]  لغتي: [Python/TypeScript]  وقتي: [ساعات] أسبوعيًا في [الأيام].
وزّع الخطة على الأيام، واجعل 50% على الأقل للتطبيق. لكل أسبوع مخرج ملموس ومعيار "انتهيت". أضف خطة بديلة إن فاتني أسبوع.`,
          },
          {
            title: 'اشرح لي الأنماط بأمثلة من مجالي',
            when: 'أثناء قراءة مقال الأسبوع الأول.',
            expect: 'جدول بالأنماط الخمسة، لكل نمط مثال من مجالك ومتى لا تستخدمه.',
            text: `أقرأ عن أنماط سير العمل: Prompt chaining، Routing، Parallelization، Orchestrator-workers، Evaluator-optimizer.
مجالي: [مثلًا: التعليم / الرعاية الصحية / التسويق].

اصنع جدولًا: النمط | فكرته بجملة | مثال من مجالي | متى لا أستخدمه.
ثم اسألني 3 أسئلة لأتأكد أنني أميز بينها. لا تنسب للمقال تفاصيل لست متأكدًا منها.`,
          },
          {
            title: 'حلقة ReAct على الورق',
            when: 'الأسبوع الثاني، قبل كتابة أي كود.',
            expect: 'محاكاة خطوة بخطوة لوكيل يحل مهمة، تريك أين يحتاج أدوات وأين يتوقف.',
            text: `حاكِ وكيلًا بنمط ReAct يحل هذه المهمة: [مثلًا: ما متوسط درجات الحرارة في الرياض هذا الأسبوع مقارنة بالأسبوع الماضي؟]
الأدوات المتاحة له: [مثلًا: search(query)، calculator(expr)].

اكتب الحلقة: Thought → Action → Observation، حتى الإجابة النهائية (اخترع نتائج الأدوات وقل إنها افتراضية).
ثم اشرح: متى يتوقف الوكيل؟ ما الذي قد يجعله يدور في حلقة لا تنتهي؟ وكيف أضع حدًا لعدد الخطوات؟`,
          },
          {
            title: 'مرشد أول وكيل بالكود',
            when: 'الأسبوع الثالث.',
            expect: 'مراحل صغيرة تكتب فيها الكود بنفسك مع مراجعة، لا كود جاهز تنسخه.',
            text: `أتعلم من [اسم المصدر]، وأريد بناء أول وكيل بلغة [Python/TypeScript].
الفكرة: [مثلًا: وكيل يقرأ ملف CSV ويجيب عن أسئلة عنه ويرسم مخططًا].

كن مرشدًا لا كاتب كود:
1. قسّم المشروع إلى 5 مراحل، كل مرحلة قابلة للاختبار.
2. لكل مرحلة: المطلوب، والمفهوم من المصدر، وطريقة الاختبار.
3. سألصق كودي؛ راجعه وأشر إلى الأخطاء دون إعادة كتابته كاملًا.
4. نبهني: مفاتيح الـ API في متغيرات البيئة لا في الكود، وحد أقصى لعدد الخطوات والتكلفة.
لا تخترع أسماء مكتبات أو دوال؛ إن لم تكن متأكدًا قل لي أتحقق من الوثائق. ابدأ بالمرحلة الأولى فقط.`,
          },
          {
            title: 'صمم أدوات وكيلك جيدًا',
            when: 'عند إضافة أي أداة للوكيل.',
            expect: 'اسم ووصف ومعاملات واضحة للأداة، وحالات خطأ، لأن جودة الأدوات تحدد جودة الوكيل.',
            text: `هذه أداة أريد إعطاءها لوكيلي:
الاسم: [...]  ماذا تفعل: [...]  المعاملات: [...]  ماذا تُرجع: [...]

راجعها كأنك النموذج الذي سيستخدمها لأول مرة:
1. هل الوصف كافٍ لأعرف متى أستخدمها ومتى لا؟ أعد كتابته.
2. هل أسماء المعاملات وأنواعها واضحة؟ أضف أمثلة.
3. ما الأخطاء المتوقعة، وماذا يجب أن تُرجع الأداة عند الخطأ ليفهمه الوكيل؟
4. هل هناك أداة يجب تقسيمها إلى اثنتين، أو أداتان يجب دمجهما؟`,
          },
          {
            title: 'MCP بلغة بسيطة ومشروع صغير',
            when: 'الأسبوع الرابع.',
            expect: 'فهم العميل والخادم والأدوات والموارد، وفكرة خادم MCP يناسب مستواك.',
            text: `أنا [مستواي] وسأدرس Model Context Protocol.
1. اشرحه بتشبيه، ثم بالمصطلحات الصحيحة: Host، Client، Server، Tools، Resources، Prompts.
2. ما الفرق بين إضافة أداة مباشرة لوكيلي وبين تقديمها عبر خادم MCP؟ ومتى لا أحتاج MCP؟
3. اقترح 3 أفكار لخادم MCP صغير يخدم [مجالي]، مرتبة من الأسهل.
4. ما الذي يجب أن أتحقق منه في modelcontextprotocol.io لأنه قد يتغير؟ لا تخترع أسماء حزم.`,
          },
          {
            title: 'اختبر وكيلك قبل أن تعرضه',
            when: 'في نهاية المشروع.',
            expect: 'مجموعة حالات اختبار تشمل الحالات الصعبة، وREADME صادق يذكر الحدود.',
            text: `هذا وصف وكيلي: [ماذا يفعل، وأدواته، ومثال مدخل ومخرج]

1. اكتب 12 حالة اختبار: 6 عادية، و3 حدية، و3 يجب أن يرفضها الوكيل أو يطلب توضيحًا.
2. لكل حالة: المدخل، والسلوك المتوقع، وكيف أحكم أنه نجح.
3. ما المخاطر الأمنية (مثلًا: تعليمات مخفية في البيانات التي يقرؤها) وكيف أخففها؟
4. اكتب مسودة README: المشكلة، وطريقة التشغيل، والأمثلة، والحدود المعروفة بصراحة.`,
          },
        ],
      },
      {
        heading: 'أخطاء شائعة',
        paragraphs: [],
        list: [
          'حفظ عشرات المصادر وفتح ثلاثة منها في نفس الوقت.',
          'البدء بإطار عمل معقد قبل فهم الحلقة الأساسية.',
          'بناء وكيل لمهمة يكفيها برومبت واحد أو سير عمل ثابت.',
          'ترك الوكيل بلا حد لعدد الخطوات أو التكلفة.',
          'وضع مفتاح الـ API في الكود ورفعه إلى مستودع عام.',
        ],
      },
      {
        heading: 'قائمة سير العمل السريعة',
        paragraphs: [],
        list: [
          'قرر أولًا: هل تحتاج وكيلًا؟ (1)',
          'ضع خطة الأسابيع الأربعة (2).',
          'الأسبوع 1: الأنماط (3). الأسبوع 2: حلقة ReAct (4).',
          'الأسبوع 3: أول وكيل (5) وأدواته (6).',
          'الأسبوع 4: MCP (7)، ثم الاختبار والـ README (8).',
        ],
      },
    ],
  },
  en: {
    title: 'Stop Collecting Resource Lists: A 4-Week Roadmap to Learn AI Agents from Free Official Sources, Plus Eight Prompts to Build Your First Agent',
    excerpt:
      '“Top 50 resources” lists about AI agents get saved and never read. This guide picks just four free official sources, orders them into a four-week plan that ends with a small working agent, and gives you eight ready-to-copy prompts.',
    hook:
      'After this guide you will know the difference between a workflow and an agent, study four official sources in a clear order, and finish four weeks with a small agent documented on GitHub instead of a folder of saved links.',
    sections: [
      {
        paragraphs: [
          'We have all saved a post with dozens of links about agents and never opened any of them. The problem is not too few resources but too many: every link promises understanding, and nothing tells you where to start or when to stop reading and start building.',
          'The rule in this guide is simple: one source per week, one practical output at the end of each week, and no new source until you finish the current one.',
        ],
      },
      {
        heading: 'What is an agent, really?',
        paragraphs: [
          'An agent is a system where the language model uses tools and decides its own steps in a loop: it reasons, calls a tool, reads the result, and decides the next step until the task is done. A workflow, by contrast, has its steps fixed in code, and the model just executes each one.',
          'In its engineering article “Building effective agents”, Anthropic recommends starting with the simplest possible solution and adding complexity only when needed, because agentic systems trade latency and cost for better performance. Many projects do not need an agent at all, and that is the first lesson worth remembering.',
        ],
      },
      {
        heading: 'The four sources and the plan',
        paragraphs: ['All sources below are official and free at the time of writing. Check their pages, as the content is updated regularly.'],
        list: [
          'Week 1 — Concepts: “Building effective agents” on anthropic.com/engineering. It covers workflow patterns: prompt chaining, routing, parallelization, orchestrator-workers and evaluator-optimizer, then agents. Output: a table of the patterns with an example from your field for each.',
          'Week 2 — The theory: the ReAct paper (arxiv.org/abs/2210.03629), which combined reasoning and tool-based acting in one loop, the idea behind most agents today. Output: the loop explained in your own words, plus a simple diagram.',
          'Week 3 — Hands-on code: Microsoft’s AI Agents for Beginners repository on GitHub (standalone lessons with text and code), or Hugging Face’s Agents Course (huggingface.co/learn/agents-course), which offers an audit path or a certificate path by completing assignments. Pick only one. Output: an agent that uses two tools.',
          'Week 4 — Connecting tools: the free Introduction to Model Context Protocol course on anthropic.skilljar.com, with the official docs at modelcontextprotocol.io. MCP is an open standard for connecting models to tools and data sources. Output: a small MCP server, or your agent connected to an existing one, plus a README documenting the project.',
        ],
      },
      {
        heading: 'The eight prompts',
        paragraphs: [],
        prompts: [
          {
            title: 'Do I even need an agent?',
            when: 'Before starting any project.',
            expect: 'A clear verdict: a single prompt, a workflow or an agent, with the reason and the simplest design that solves the problem.',
            text: `I want to automate this task: [describe the task in detail]
Inputs: [...]  Required output: [...]  How often it repeats: [...]

Analyse it like an engineer who prefers the simplest solution:
1. Is one good prompt enough? A workflow with fixed steps? Or do I need an agent that decides its own steps? Why?
2. If it is a workflow: which pattern fits (chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer)?
3. List the steps, and mark where the model could go wrong and how I would check it.
4. What are the cost and risks of using an agent instead of the simpler option?`,
          },
          {
            title: 'My four-week plan',
            when: 'On day one.',
            expect: 'A realistic day-by-day schedule for your time, with a concrete output each week.',
            text: `I will learn AI agents in 4 weeks using these sources in order:
1) Anthropic's "Building effective agents" article
2) The ReAct paper
3) [Microsoft's AI Agents for Beginners repo / Hugging Face's Agents Course]
4) The Introduction to Model Context Protocol course

My coding level: [...]  Language: [Python/TypeScript]  Time: [hours] per week on [days].
Spread the plan over the days, with at least 50% hands-on practice. Give each week a concrete output and a "done" criterion. Add a fallback plan if I miss a week.`,
          },
          {
            title: 'Explain the patterns with examples from my field',
            when: 'While reading the week-one article.',
            expect: 'A table of the five patterns, each with an example from your field and when not to use it.',
            text: `I am reading about workflow patterns: prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer.
My field: [e.g. education / healthcare / marketing].

Make a table: Pattern | One-sentence idea | Example from my field | When not to use it.
Then ask me 3 questions to check I can tell them apart. Do not attribute details to the article that you are unsure of.`,
          },
          {
            title: 'The ReAct loop on paper',
            when: 'Week two, before writing any code.',
            expect: 'A step-by-step simulation of an agent solving a task, showing where it needs tools and where it stops.',
            text: `Simulate a ReAct-style agent solving this task: [e.g. What is the average temperature in Riyadh this week compared with last week?]
Its tools: [e.g. search(query), calculator(expr)].

Write the loop: Thought → Action → Observation, through to the final answer (invent the tool results and label them as made up).
Then explain: when does the agent stop? What could make it loop forever? How do I cap the number of steps?`,
          },
          {
            title: 'A mentor for my first coded agent',
            when: 'Week three.',
            expect: 'Small stages where you write the code yourself and get reviews, not finished code to copy.',
            text: `I am learning from [source name] and want to build my first agent in [Python/TypeScript].
The idea: [e.g. an agent that reads a CSV file, answers questions about it and draws a chart].

Be a mentor, not a code writer:
1. Split the project into 5 testable stages.
2. For each stage: what is needed, the concept from the source, and how to test it.
3. I will paste my code; review it and point out mistakes without rewriting it all.
4. Remind me: API keys go in environment variables, not code; set a maximum number of steps and a cost limit.
Do not invent library or function names; if unsure, tell me to check the docs. Start with stage one only.`,
          },
          {
            title: 'Design your agent’s tools well',
            when: 'Whenever you add a tool to the agent.',
            expect: 'A clear name, description and parameters for the tool, plus error cases, because tool quality drives agent quality.',
            text: `Here is a tool I want to give my agent:
Name: [...]  What it does: [...]  Parameters: [...]  Returns: [...]

Review it as if you were the model using it for the first time:
1. Is the description enough to know when to use it and when not to? Rewrite it.
2. Are the parameter names and types clear? Add examples.
3. What errors are likely, and what should the tool return on error so the agent understands?
4. Should any tool be split in two, or two tools merged?`,
          },
          {
            title: 'MCP in plain words, plus a small project',
            when: 'Week four.',
            expect: 'An understanding of host, client, server, tools and resources, and an MCP server idea that fits your level.',
            text: `I am [my level] and about to study the Model Context Protocol.
1. Explain it with an analogy, then with the correct terms: host, client, server, tools, resources, prompts.
2. What is the difference between adding a tool directly to my agent and exposing it through an MCP server? When do I not need MCP?
3. Suggest 3 ideas for a small MCP server serving [my field], easiest first.
4. What should I check on modelcontextprotocol.io because it may change? Do not invent package names.`,
          },
          {
            title: 'Test your agent before you show it',
            when: 'At the end of the project.',
            expect: 'A set of test cases including the hard ones, and an honest README that states the limits.',
            text: `Here is my agent: [what it does, its tools, an example input and output]

1. Write 12 test cases: 6 normal, 3 edge cases and 3 the agent should refuse or ask to clarify.
2. For each: the input, the expected behaviour, and how I judge success.
3. What are the security risks (e.g. hidden instructions in data it reads) and how do I reduce them?
4. Draft a README: the problem, how to run it, examples, and the known limits, stated plainly.`,
          },
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [],
        list: [
          'Saving dozens of sources and opening three at once.',
          'Starting with a complex framework before understanding the basic loop.',
          'Building an agent for a task that one prompt or a fixed workflow could handle.',
          'Leaving the agent without a step or cost limit.',
          'Putting an API key in the code and pushing it to a public repo.',
        ],
      },
      {
        heading: 'Quick workflow checklist',
        paragraphs: [],
        list: [
          'Decide first: do you need an agent? (1)',
          'Set the four-week plan (2).',
          'Week 1: the patterns (3). Week 2: the ReAct loop (4).',
          'Week 3: your first agent (5) and its tools (6).',
          'Week 4: MCP (7), then testing and the README (8).',
        ],
      },
    ],
  },
}
