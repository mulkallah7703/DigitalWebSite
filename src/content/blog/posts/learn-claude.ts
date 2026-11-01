import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'learn-claude-step-by-step',
  date: '2026-10-31',
  cover: '/blog/learn-claude-step-by-step.png?v=3',
  coverLines: ['Learn Claude', 'Step by Step'],
  coverAlt: { ar: 'غلاف مقال تعلم Claude خطوة بخطوة', en: 'Cover: learn Claude step by step' },
  tags: ['Claude', 'Prompts', 'Roadmap'],
  ar: {
    title: 'تعلّم Claude بالطريقة الصحيحة: خريطة من أربعة مستويات وثمانية برومبتات تحوّله إلى فريق خبراء يعمل معك',
    excerpt:
      'بدل التجارب العشوائية: خريطة واضحة لما تتعلمه في كل مستوى من Claude، مع ثمانية برومبتات جاهزة للنسخ تجعله يعمل كباحث ومحلل ومستشار وناقد ومعلّم.',
    hook:
      'بنهاية هذا الدليل ستعرف بالضبط ما الذي تتقنه في كل مستوى، وستكون معك ثمانية برومبتات مهندَسة بعناية تحوّل Claude من روبوت دردشة إلى فريق خبراء يراجع قراراتك ويحلل ملفاتك ويعلّمك أي مهارة.',
    sections: [
      {
        paragraphs: [
          'أغلب من يستخدم Claude يكتب سؤالًا قصيرًا، ويأخذ أول إجابة، ثم يحكم على الأداة كلها من هذه التجربة. المشكلة ليست في Claude، بل في غياب خريطة واضحة. بصفتي طالب هندسة برمجيات ومطوّر full-stack، أتعامل مع Claude كما أتعامل مع أي أداة هندسية: أفهم مستوياتها، وأتعلمها بالترتيب، وأبني لنفسي أدوات قابلة لإعادة الاستخدام.',
          'في هذا الدليل أقسّم التعلم إلى أربعة مستويات، ثم أعطيك ثمانية برومبتات أعتبرها الحد الأدنى الذي يجب أن يكون في مكتبة أي شخص جاد في استخدام Claude.',
        ],
      },
      {
        heading: 'الخريطة: أربعة مستويات',
        paragraphs: [],
        list: [
          'المستوى الأول (الأساسيات): كتابة طلب واضح، والتحكم في طول الإجابة وشكلها، وفهم أن Claude قد يخطئ في الحقائق فيجب التحقق.',
          'المستوى الثاني (السياق): رفع الملفات والصور، واستخدام Projects لحفظ تعليمات وملفات ثابتة، وتحديد الدور والجمهور والمعايير في كل طلب.',
          'المستوى الثالث (سير العمل): تقسيم المهمة الكبيرة إلى خطوات متسلسلة، وطلب النقد الذاتي، واستخدام Artifacts، وإنشاء ملفات مثل الجداول والمستندات حين تتوفر الميزة في خطتك.',
          'المستوى الرابع (البناء، للمطورين): الواجهة البرمجية، وMCP لربط Claude بأدواتك، وAgent Skills وClaude Code.',
        ],
      },
      {
        paragraphs: [
          'إن أردت مسارًا رسميًا لكل مستوى، فأكاديمية Anthropic على anthropic.skilljar.com تقدم دورات مجانية، منها Claude 101 للمبتدئين، وAI Fluency: Framework & Foundations لفهم طريقة العمل مع الذكاء الاصطناعي، وBuilding with the Claude API وIntroduction to Model Context Protocol للمطورين. كثير منها يمنح شهادة إتمام، وتفاصيل كل دورة مكتوبة في صفحتها.',
        ],
      },
      {
        heading: 'تشريح البرومبت القوي',
        paragraphs: [
          'كل البرومبتات التالية مبنية على خمسة عناصر: الدور (من يكون Claude)، والسياق (ما الذي يجب أن يعرفه)، والمهمة (ماذا يفعل بالضبط)، والقيود (ما الممنوع وما المعايير)، وشكل المخرجات. وتوصي وثائق Anthropic الرسمية باستخدام وسوم مثل <context> و<task> لفصل أجزاء الطلب، لأنها تقلل الخلط بين التعليمات والمحتوى. استبدل كل ما بين [أقواس] بمعلوماتك.',
        ],
      },
      {
        heading: 'البرومبتات الثمانية',
        paragraphs: [],
        prompts: [
          {
            title: 'لجنة الخبراء: قرار من خمس زوايا',
            when: 'عندما تتخذ قرارًا مهمًا: تخصص، أو عرض عمل، أو إطلاق مشروع، وتريد رؤية لا ترى فيها رأيك فقط.',
            expect: 'خمسة آراء مختلفة فعلًا، ونقاط اتفاق واختلاف، ثم توصية مشروطة بأسئلة يجب أن تجيب عنها. لن يقرر عنك، وهذا مقصود.',
            text: `أنت تدير لجنة من خمسة خبراء: [خبير مالي]، و[خبير في المجال]، و[شخص متشكك يبحث عن المخاطر]، و[ممثل للعميل أو المستخدم]، و[مرشد مهني خبير].

<context>
القرار الذي أفكر فيه: [اكتب القرار]
وضعي الحالي: [الموارد، والوقت، والقيود]
ما يهمني أكثر: [الأولويات بالترتيب]
</context>

<task>
1. اجعل كل خبير يقدّم رأيه في 4 أسطر كحد أقصى، بصوته وأولوياته.
2. اعرض نقاط الاتفاق ونقاط الخلاف في جدول.
3. اذكر 3 افتراضات خفية بنيت عليها قراري.
4. أعطني توصية مشروطة: "إذا كان [كذا] فافعل [كذا]".
</task>

قيود: لا تجامل، ولا تخترع أرقامًا أو حقائق عن وضعي، وإذا نقصتك معلومة مهمة فاسألني عنها أولًا.`,
          },
          {
            title: 'المحلل البحثي لملفاتك',
            when: 'بعد رفع عدة ملفات (تقارير، أوراق، محاضرات) تريد فهم ما بينها لا تلخيص كل واحد منها.',
            expect: 'جدول مقارنة، وأنماط متكررة، وتناقضات، وفجوات، مع الإشارة إلى الملف والقسم لكل نقطة حتى تتحقق بنفسك.',
            text: `تصرف كمحلل بحثي دقيق. رفعت لك [عدد] ملفات عن [الموضوع].

المطلوب:
1. جدول: لكل ملف (الهدف، المنهج، أهم 3 نتائج، القيود).
2. الأنماط التي تتكرر في أكثر من ملف.
3. التناقضات بين الملفات وسبب كل تناقض إن أمكن.
4. الأسئلة التي لم يجب عنها أي ملف.
5. ملخص تنفيذي في 6 أسطر.

قواعد صارمة:
- اعتمد على محتوى الملفات فقط، وبعد كل نقطة اكتب [اسم الملف - القسم أو الصفحة].
- إذا لم تجد دليلًا على شيء فاكتب "غير مذكور في الملفات" ولا تستنتج.`,
          },
          {
            title: 'المعلّم السقراطي: تعلّم أي مهارة بالأسئلة',
            when: 'عندما تريد أن تفهم مفهومًا فعلًا، لا أن تقرأ شرحًا وتنساه.',
            expect: 'حوار تفاعلي: سؤال واحد كل مرة، يتدرج حسب إجاباتك، مع تصحيح وتلميحات بدل إعطاء الإجابة مباشرة.',
            text: `أريد أن أتعلم [المفهوم أو المهارة]. مستواي الحالي: [مبتدئ/متوسط]، وهدفي: [مثلًا: أن أطبقه في مشروع/اختبار].

كن معلمًا سقراطيًا:
- اسألني سؤالًا واحدًا فقط في كل رسالة، وانتظر إجابتي.
- ابدأ بسؤال يكشف ما أعرفه أصلًا.
- إذا أخطأت، لا تعطني الإجابة؛ أعطني تلميحًا أو مثالًا مضادًا.
- كل 5 أسئلة لخّص ما أتقنته وما زال ضعيفًا.
- في النهاية أعطني تمرينًا تطبيقيًا واحدًا من الواقع.

ابدأ الآن بالسؤال الأول.`,
          },
          {
            title: 'الناقد القاسي (Red Team) لعملك',
            when: 'قبل تسليم بحث، أو نشر مقال، أو إرسال عرض لعميل، أو التقديم على وظيفة.',
            expect: 'قائمة مرتبة بالمشكلات من الأخطر للأقل، مع سبب كل مشكلة واقتراح محدد لإصلاحها، دون إعادة كتابة العمل كله.',
            text: `أنت مراجع صارم ومتخصص في [المجال]، ومهمتك أن تجد نقاط الضعف قبل أن يجدها [الأستاذ/العميل/مسؤول التوظيف].

سأعطيك: [نوع العمل]، وهدفه: [الهدف]، وجمهوره: [الجمهور].

<work>
[الصق العمل هنا]
</work>

المطلوب:
1. أخطر 5 مشكلات (منطق، أدلة، وضوح، بنية، نبرة) مرتبة حسب الخطورة.
2. لكل مشكلة: أين بالضبط، ولماذا هي مشكلة، واقتراح إصلاح محدد في سطرين.
3. ثلاثة أسئلة صعبة سيطرحها [الجمهور] ولم يجب عنها العمل.
4. تقييم من 10 مع سبب واضح.

لا تعيد كتابة العمل، ولا تبدأ بالمديح.`,
          },
          {
            title: 'مخطط المشاريع: من هدف إلى خطة أسبوعية',
            when: 'عندما يكون لديك هدف كبير (تعلم مهارة، بناء مشروع، تحضير اختبار) ولا تعرف من أين تبدأ.',
            expect: 'خطة مقسمة إلى مراحل ومهام صغيرة بزمن تقديري ومعيار إنجاز لكل مهمة، مع المخاطر وخطة بديلة.',
            text: `تصرف كمدير مشاريع عملي.

هدفي: [الهدف]
الموعد النهائي: [التاريخ]
الوقت المتاح أسبوعيًا: [عدد الساعات]
ما لدي من مهارات وأدوات: [...]

أنشئ:
1. 3 إلى 5 مراحل، لكل مرحلة نتيجة ملموسة.
2. جدولًا أسبوعيًا: المهمة، والوقت التقديري، و"كيف أعرف أنني أنجزتها".
3. أكبر 3 مخاطر وخطة بديلة لكل منها.
4. أول مهمة أبدأ بها اليوم في أقل من 30 دقيقة.

اجعل الخطة واقعية حسب الوقت المتاح، وإذا كان الهدف غير واقعي في هذه المدة فقل ذلك صراحة واقترح نطاقًا أصغر.`,
          },
          {
            title: 'محوّل الأفكار إلى محتوى بعدة صيغ',
            when: 'عندما تكون لديك فكرة أو ملاحظات خام وتريد نشرها على أكثر من منصة دون أن تكتب كل نسخة من الصفر.',
            expect: 'منشور LinkedIn، وسلسلة قصيرة، ونص فيديو قصير، كلها مبنية على أفكارك أنت دون إضافة ادعاءات جديدة.',
            text: `هذه ملاحظاتي الخام عن [الموضوع]:
<notes>
[الصق ملاحظاتك]
</notes>

جمهوري: [من هم]. نبرتي: [مثلًا: مباشرة، ودودة، بلا مبالغة].

حوّلها إلى:
1. منشور LinkedIn (120 إلى 180 كلمة) يبدأ بسطر يجذب الانتباه دون مبالغة، وينتهي بسؤال للنقاش.
2. سلسلة من 5 تغريدات مرقمة.
3. نص فيديو قصير مدته 45 ثانية مقسم إلى: افتتاحية، و3 نقاط، وخاتمة.

قيود: استخدم أفكاري فقط، ولا تضف أرقامًا أو تجارب لم أذكرها، وتجنب العبارات الجاهزة مثل "في عالمنا المتسارع".`,
          },
          {
            title: 'المحلل الذي يشرح منطقه',
            when: 'عندما تحتاج تحليلًا (بيانات، خيارات، مشكلة في العمل) وتريد أن تفهم كيف وصل إلى النتيجة لتثق بها.',
            expect: 'تحليل منظم يفصل بين الحقائق والافتراضات والاستنتاجات، مع درجة ثقة لكل استنتاج وما الذي قد يغيّره.',
            text: `أريد تحليلًا لـ [المشكلة أو البيانات أو الخيارات].

المعطيات:
[الصق المعطيات]

قدّم الإجابة في هذا الشكل:
- الحقائق: ما هو مؤكد من المعطيات فقط.
- الافتراضات: ما تفترضه ولماذا.
- التحليل: خطوات تفكيرك بإيجاز.
- الاستنتاجات: لكل استنتاج درجة ثقة (عالية/متوسطة/منخفضة) وسببها.
- ما الذي قد يغيّر النتيجة: معلومات لو عرفتها لتغير رأيك.
- الخطوة التالية العملية.

إذا كانت المعطيات غير كافية لاستنتاج ما، فقل ذلك ولا تخمّن.`,
          },
          {
            title: 'مهندس البرومبتات: اجعل Claude يحسّن طلبك',
            when: 'عندما تكتب طلبًا مهمًا ستكرره كثيرًا، أو عندما تكون النتائج متوسطة ولا تعرف السبب.',
            expect: 'أسئلة توضيحية أولًا، ثم نسخة محسنة من برومبتك بعناصر واضحة، مع شرح لكل تعديل لتتعلم منه.',
            text: `أنت خبير في كتابة البرومبتات لنماذج اللغة.

هذا البرومبت الذي أستخدمه:
<prompt>
[الصق برومبتك]
</prompt>

الهدف منه: [ماذا تريد أن تحصل عليه]
مشكلتي مع النتائج الحالية: [مثلًا: عامة جدًا، طويلة، تخترع معلومات]

الخطوات:
1. اسألني حتى 3 أسئلة توضيحية إن احتجت، ثم توقف.
2. بعد إجابتي اكتب نسخة محسنة تحتوي: الدور، والسياق، والمهمة، والقيود، وشكل المخرجات، ومتغيرات بين [أقواس].
3. اشرح كل تعديل في سطر واحد.
4. اقترح طريقة لاختبار البرومبت الجديد على حالتين مختلفتين.`,
          },
        ],
      },
      {
        heading: 'كيف تحسّن النتيجة في الرسالة الثانية',
        paragraphs: ['الإجابة الأولى مسودة. هذه رسائل متابعة أستخدمها بعد أي برومبت:'],
        list: [
          '"ما الافتراضات التي بنيت عليها إجابتك؟ وأيها أضعف؟"',
          '"قيّم إجابتك من 10 وفق المعايير التي أعطيتك إياها، ثم أعد كتابتها لتصل إلى 9."',
          '"اختصرها إلى النصف دون أن تحذف أي معلومة عملية."',
          '"أعطني مثالًا تطبيقيًا من [مجالي] لكل نقطة."',
          '"ما الذي قد يكون خاطئًا في إجابتك؟ وكيف أتحقق منه؟"',
        ],
      },
      {
        heading: 'أخطاء شائعة',
        paragraphs: [],
        list: [
          'نسخ البرومبت دون استبدال ما بين الأقواس، فيعمل Claude على معلومات عامة.',
          'كتابة كل شيء في رسالة واحدة ضخمة بدل تقسيم المهمة.',
          'الاعتماد على الأرقام والمراجع دون تحقق؛ Claude قد يخطئ بثقة.',
          'بدء محادثة جديدة كل مرة وإعادة الشرح، بدل حفظ التعليمات والملفات في Project.',
          'رفع بيانات شخصية أو سرية دون مراجعة سياسة الخصوصية وسياسة جهة العمل.',
        ],
      },
      {
        heading: 'قائمة سير العمل السريعة',
        paragraphs: [],
        list: [
          'حدد المستوى الذي أنت فيه، وتعلّم مهارة واحدة منه هذا الأسبوع.',
          'أنشئ Project لكل مجال تعمل فيه، وضع فيه تعليماتك الثابتة.',
          'احفظ البرومبتات الثمانية في ملف، وعدّل أقواسها لحالاتك المتكررة.',
          'بعد كل إجابة مهمة: رسالة متابعة واحدة على الأقل للنقد والتحسين.',
          'تحقق من الحقائق والأرقام قبل الاستخدام.',
          'إذا أردت مسارًا رسميًا، ابدأ بدورة Claude 101 من أكاديمية Anthropic.',
        ],
      },
    ],
  },
  en: {
    title: 'Learn Claude the Right Way: A Four-Level Map and Eight Prompts That Turn It into a Team of Experts',
    excerpt:
      'Skip the random experiments: a clear map of what to learn at each level of Claude, plus eight copy-ready prompts that make it work as your researcher, analyst, advisor, critic and tutor.',
    hook:
      'By the end of this guide you will know exactly what to master at each level, and you will have eight carefully engineered prompts that turn Claude from a chatbot into a team of experts that reviews your decisions, analyses your files and teaches you any skill.',
    sections: [
      {
        paragraphs: [
          'Most people type a short question into Claude, take the first answer, and judge the whole tool by it. The problem is not Claude but the lack of a map. As a software engineering student and full-stack developer, I treat Claude like any engineering tool: understand its levels, learn them in order, and build reusable tools for myself.',
          'In this guide I split learning into four levels, then give you eight prompts I consider the minimum library for anyone serious about using Claude.',
        ],
      },
      {
        heading: 'The map: four levels',
        paragraphs: [],
        list: [
          'Level 1 (basics): writing a clear request, controlling length and format, and knowing Claude can get facts wrong, so you verify.',
          'Level 2 (context): uploading files and images, using Projects to keep standing instructions and files, and stating role, audience and criteria in every request.',
          'Level 3 (workflows): splitting big tasks into chained steps, asking for self-critique, using Artifacts, and creating files such as spreadsheets and documents where your plan supports it.',
          'Level 4 (building, for developers): the API, MCP to connect Claude to your tools, Agent Skills and Claude Code.',
        ],
      },
      {
        paragraphs: [
          'For an official path at each level, Anthropic’s academy at anthropic.skilljar.com offers free courses, including Claude 101 for beginners, AI Fluency: Framework & Foundations for working well with AI, and Building with the Claude API and Introduction to Model Context Protocol for developers. Many offer a certificate of completion; each course page lists the details.',
        ],
      },
      {
        heading: 'Anatomy of a strong prompt',
        paragraphs: [
          'Every prompt below has five parts: role (who Claude is), context (what it must know), task (exactly what to do), constraints (what is off-limits and the criteria), and output format. Anthropic’s official docs recommend tags like <context> and <task> to separate parts of a request, because they reduce confusion between instructions and content. Replace everything in [brackets] with your details.',
        ],
      },
      {
        heading: 'The eight prompts',
        paragraphs: [],
        prompts: [
          {
            title: 'Expert panel: a decision from five angles',
            when: 'When you face an important decision (a major, a job offer, launching a project) and want more than your own view.',
            expect: 'Five genuinely different opinions, agreements and disagreements, then a conditional recommendation with questions you must answer. It will not decide for you, by design.',
            text: `You are running a panel of five experts: [a financial expert], [a domain expert], [a sceptic who hunts for risks], [a customer or user representative], and [an experienced career mentor].

<context>
The decision I am considering: [describe it]
My current situation: [resources, time, constraints]
What matters most to me: [priorities in order]
</context>

<task>
1. Have each expert give their view in at most 4 lines, in their own voice and priorities.
2. Show agreements and disagreements in a table.
3. Name 3 hidden assumptions behind my decision.
4. Give a conditional recommendation: "If [X], then do [Y]".
</task>

Constraints: no flattery, do not invent numbers or facts about my situation, and if important information is missing, ask me first.`,
          },
          {
            title: 'Research analyst for your files',
            when: 'After uploading several files (reports, papers, lectures) when you need what connects them, not a summary of each.',
            expect: 'A comparison table, recurring patterns, contradictions and gaps, each point tagged with the file and section so you can verify it.',
            text: `Act as a meticulous research analyst. I uploaded [number] files about [topic].

Deliver:
1. A table: for each file (aim, method, top 3 findings, limitations).
2. Patterns that appear in more than one file.
3. Contradictions between files and, where possible, why.
4. Questions none of the files answer.
5. A 6-line executive summary.

Strict rules:
- Use only the files' content, and after each point write [file name - section or page].
- If there is no evidence for something, write "not stated in the files" instead of inferring.`,
          },
          {
            title: 'Socratic tutor: learn any skill through questions',
            when: 'When you want to truly understand a concept, not read an explanation and forget it.',
            expect: 'An interactive dialogue: one question at a time, adapting to your answers, with hints and corrections instead of handing you the answer.',
            text: `I want to learn [concept or skill]. My current level: [beginner/intermediate]. My goal: [e.g. apply it in a project/exam].

Be a Socratic tutor:
- Ask exactly one question per message and wait for my answer.
- Start with a question that reveals what I already know.
- If I am wrong, do not give the answer; give a hint or a counter-example.
- Every 5 questions, summarise what I have mastered and what is still weak.
- Finish with one real-world practice exercise.

Start now with the first question.`,
          },
          {
            title: 'Red-team critic for your work',
            when: 'Before submitting research, publishing an article, sending a client proposal or applying for a job.',
            expect: 'A ranked list of problems from most to least serious, each with the reason and a specific fix, without rewriting the whole piece.',
            text: `You are a strict reviewer specialising in [field]. Your job is to find the weaknesses before [the professor/client/recruiter] does.

Type of work: [type]. Goal: [goal]. Audience: [audience].

<work>
[paste the work here]
</work>

Deliver:
1. The 5 most serious problems (logic, evidence, clarity, structure, tone), ranked by severity.
2. For each: exactly where, why it is a problem, and a specific two-line fix.
3. Three hard questions [the audience] will ask that the work does not answer.
4. A score out of 10 with a clear reason.

Do not rewrite the work and do not open with praise.`,
          },
          {
            title: 'Project planner: from goal to weekly plan',
            when: 'When you have a big goal (learn a skill, build a project, prepare for an exam) and do not know where to start.',
            expect: 'A plan in phases and small tasks with time estimates and a definition of done for each, plus risks and a fallback.',
            text: `Act as a practical project manager.

My goal: [goal]
Deadline: [date]
Time available per week: [hours]
Skills and tools I have: [...]

Create:
1. 3 to 5 phases, each with a tangible outcome.
2. A weekly table: task, estimated time, and "how I know it is done".
3. The 3 biggest risks and a fallback for each.
4. The first task I can start today in under 30 minutes.

Keep it realistic for the time available; if the goal is unrealistic in this period, say so plainly and propose a smaller scope.`,
          },
          {
            title: 'Ideas-to-content converter',
            when: 'When you have an idea or raw notes and want to publish on several platforms without writing each version from scratch.',
            expect: 'A LinkedIn post, a short thread and a short video script, all built on your ideas without new claims.',
            text: `These are my raw notes on [topic]:
<notes>
[paste your notes]
</notes>

My audience: [who]. My tone: [e.g. direct, friendly, no hype].

Turn them into:
1. A LinkedIn post (120-180 words) that opens with an attention-grabbing line without exaggeration and ends with a discussion question.
2. A numbered thread of 5 posts.
3. A 45-second video script: hook, 3 points, close.

Constraints: use only my ideas, add no numbers or experiences I did not mention, and avoid stock phrases like "in today's fast-paced world".`,
          },
          {
            title: 'The analyst who shows its reasoning',
            when: 'When you need an analysis (data, options, a work problem) and want to understand how it reached the result so you can trust it.',
            expect: 'A structured analysis separating facts, assumptions and conclusions, with a confidence level for each conclusion and what could change it.',
            text: `I need an analysis of [problem, data or options].

Inputs:
[paste the inputs]

Answer in this format:
- Facts: only what the inputs confirm.
- Assumptions: what you assume and why.
- Analysis: your reasoning steps, briefly.
- Conclusions: each with a confidence level (high/medium/low) and why.
- What could change the result: information that would change your view.
- The next practical step.

If the inputs are insufficient for a conclusion, say so instead of guessing.`,
          },
          {
            title: 'Prompt engineer: let Claude improve your prompt',
            when: 'When you write an important prompt you will reuse, or your results are mediocre and you do not know why.',
            expect: 'Clarifying questions first, then an improved version of your prompt with clear parts, plus a one-line explanation of each change.',
            text: `You are an expert at writing prompts for language models.

This is the prompt I use:
<prompt>
[paste your prompt]
</prompt>

Its purpose: [what you want to get]
My problem with current results: [e.g. too generic, too long, invents information]

Steps:
1. Ask me up to 3 clarifying questions if needed, then stop.
2. After my answers, write an improved version with: role, context, task, constraints, output format, and variables in [brackets].
3. Explain each change in one line.
4. Suggest how to test the new prompt on two different cases.`,
          },
        ],
      },
      {
        heading: 'How to improve the result in your second message',
        paragraphs: ['The first answer is a draft. Follow-ups I use after any prompt:'],
        list: [
          '"What assumptions did you base your answer on, and which is weakest?"',
          '"Score your answer out of 10 against the criteria I gave, then rewrite it to reach 9."',
          '"Cut it in half without dropping any practical information."',
          '"Give me a practical example from [my field] for each point."',
          '"What might be wrong in your answer, and how can I check it?"',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [],
        list: [
          'Copying a prompt without replacing the brackets, so Claude works with generic information.',
          'Putting everything in one huge message instead of splitting the task.',
          'Relying on numbers and references without checking; Claude can be confidently wrong.',
          'Starting a fresh chat and re-explaining every time instead of saving instructions and files in a Project.',
          'Uploading personal or confidential data without checking privacy and workplace policies.',
        ],
      },
      {
        heading: 'Quick workflow checklist',
        paragraphs: [],
        list: [
          'Identify your level and learn one skill from it this week.',
          'Create a Project per area you work in, with your standing instructions.',
          'Save the eight prompts in a file and adapt the brackets to your recurring cases.',
          'After every important answer, send at least one follow-up for critique and improvement.',
          'Verify facts and numbers before using them.',
          'For an official path, start with Claude 101 from Anthropic’s academy.',
        ],
      },
    ],
  },
}
