import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'ai-learning-path-for-developers',
  date: '2026-10-26',
  cover: '/blog/ai-learning-path-for-developers.png',
  coverLines: ['From AI User', 'to AI Builder'],
  coverAlt: { ar: 'غلاف مقال من مستخدم إلى مطور في الذكاء الاصطناعي', en: 'Cover: from AI user to AI builder' },
  tags: ['Developers', 'AI', 'Learning Path'],
  ar: {
    title: 'من مستخدم إلى مطوّر: مسار تعلّم عملي لبناء تطبيقات الذكاء الاصطناعي لطلاب البرمجة',
    excerpt:
      'استخدام ChatGPT وClaude شيء، وبناء تطبيق يعتمد على النماذج اللغوية شيء آخر. هذا مسار من ست مراحل لطلاب البرمجة، يبدأ من الأساسيات وينتهي بتطبيق مسؤول قابل للنشر.',
    sections: [
      {
        paragraphs: [
          'كطالب هندسة برمجيات ومطوّر full-stack مهتم ببناء تقنيات ذكاء اصطناعي تخدم الرعاية الصحية والتعليم، أرى أن أمام طلاب البرمجة اليوم فرصة كبيرة: لم يعد بناء تطبيق ذكي حكرًا على فرق البحث في الشركات الكبرى. يمكن لطالب يعرف أساسيات البرمجة والواجهات البرمجية أن يبني أدوات مفيدة فعلًا باستخدام النماذج اللغوية المتاحة.',
          'لكن الطريق مليء بالمصطلحات والأطر التي تتغير بسرعة. لذلك أقترح هنا مسارًا مرتبًا يركز على المفاهيم الثابتة قبل الأدوات المتغيرة، مع مشروع صغير في كل مرحلة.',
          'هذا المسار لا يفترض أنك خبير، لكنه يفترض أنك مستعد للبناء والتجربة والخطأ. لا تحاول إنهاءه بسرعة؛ قيمة كل مرحلة في المشروع الذي تبنيه في نهايتها، وفي الأسئلة التي تواجهها أثناء ذلك. وكلما ربطت مشاريعك بمشكلة حقيقية تهمك، سواء في الدراسة أو الصحة أو التعليم أو مجتمعك، أصبح التعلم أعمق والنتيجة أكثر فائدة.',
        ],
      },
      {
        heading: 'المرحلة الأولى: أساس برمجي متين',
        paragraphs: [
          'قبل الذكاء الاصطناعي، تأكد من أنك تتقن لغة واحدة على الأقل، وPython وTypeScript خياران ممتازان لأن معظم أدوات النماذج اللغوية تدعمهما. تحتاج أيضًا إلى فهم HTTP والواجهات البرمجية REST وصيغة JSON، والتعامل مع متغيرات البيئة لحفظ المفاتيح السرية، وأساسيات Git. هذه ليست تفاصيل جانبية؛ معظم مشكلات المبتدئين في تطبيقات الذكاء الاصطناعي هي في الحقيقة مشكلات برمجية عادية.',
        ],
      },
      {
        heading: 'المرحلة الثانية: فهم كيف تعمل النماذج اللغوية',
        paragraphs: ['لا تحتاج إلى الرياضيات العميقة في البداية، لكن تحتاج إلى فهم المفاهيم التي تؤثر في تصميم تطبيقك:'],
        list: [
          'الرموز (Tokens) ولماذا تحدد التكلفة وحجم ما يمكن إرساله.',
          'نافذة السياق: النموذج لا يتذكر شيئًا خارج ما ترسله له في كل طلب.',
          'التعليمات النظامية (System prompt) ودورها في ضبط السلوك.',
          'درجة العشوائية (Temperature) ومتى تحتاج إجابات ثابتة.',
          'الهلوسة: النموذج قد يولد معلومات خاطئة بثقة، وتصميمك يجب أن يأخذ ذلك في الحسبان.',
        ],
      },
      {
        heading: 'المرحلة الثالثة: أول اتصال بالواجهة البرمجية',
        paragraphs: [
          'اختر مزودًا واحدًا، مثل Anthropic أو OpenAI أو Google، واقرأ وثائقه الرسمية؛ فهي أدق وأحدث مصدر، وكثير من المزودين يقدمون أيضًا مواد تعليمية مجانية على مواقعهم. أرسل أول طلب من الكود، ثم أضف تعليمات نظامية، ثم حوّله إلى محادثة متعددة الرسائل، ثم جرّب طلب مخرجات منظمة بصيغة JSON.',
        ],
        list: [
          'مشروع المرحلة: أداة سطر أوامر تلخص ملفًا نصيًا وتستخرج منه قائمة مهام بصيغة JSON.',
          'قاعدة أمان: لا تضع المفتاح السري في الكود أبدًا، ولا ترفعه إلى GitHub، واستخدم متغيرات البيئة.',
        ],
      },
      {
        heading: 'المرحلة الرابعة: الاسترجاع المعزز (RAG)',
        paragraphs: [
          'أغلب التطبيقات المفيدة تحتاج أن يجيب النموذج من بيانات محددة: وثائق شركة، أو مقرر دراسي، أو أدلة إرشادية. هنا يأتي نمط الاسترجاع المعزز: تقسيم المستندات إلى أجزاء، وتحويلها إلى متجهات (Embeddings)، وتخزينها في قاعدة بيانات متجهية، ثم استرجاع الأجزاء الأقرب لسؤال المستخدم وإرسالها مع السؤال إلى النموذج.',
          'ابدأ ببساطة: يمكنك استخدام PostgreSQL مع إضافة pgvector بدل تعلم قاعدة بيانات جديدة. والأهم من الأدوات هو أن تجعل التطبيق يعرض المصادر التي اعتمد عليها، حتى يستطيع المستخدم التحقق.',
        ],
        list: ['مشروع المرحلة: مساعد يجيب عن أسئلة من ملفات مقرر دراسي، ويعرض مع كل إجابة الفقرة التي استند إليها.'],
      },
      {
        heading: 'المرحلة الخامسة: الأدوات والوكلاء',
        paragraphs: [
          'النماذج الحديثة تستطيع استدعاء دوال تعرّفها لها (Tool use / Function calling): البحث في قاعدة بيانات، أو إجراء حساب، أو استدعاء واجهة خارجية. هذا هو أساس ما يسمى "الوكلاء". ابدأ بأداة واحدة بسيطة، وافهم دورة العمل كاملة: النموذج يطلب الأداة، وكودك ينفذها، ثم يعيد النتيجة للنموذج. ولا تمنح النموذج صلاحيات تنفيذ أفعال مؤثرة دون تأكيد من المستخدم.',
        ],
      },
      {
        heading: 'المرحلة السادسة: التقييم والمسؤولية والنشر',
        paragraphs: [
          'الفرق بين نموذج أولي وتطبيق حقيقي هو التقييم. أنشئ مجموعة أسئلة اختبار مع الإجابات المتوقعة، وقِس أداء تطبيقك عليها بعد كل تعديل. وراقب التكلفة وزمن الاستجابة، وتعامل مع الأخطاء وحدود الاستخدام بشكل لائق.',
          'وفي المجالات الحساسة مثل الصحة والتعليم، المسؤولية ليست خيارًا: لا تجعل التطبيق يقدم تشخيصًا أو قرارًا نهائيًا، ووضح للمستخدم حدوده، واحمِ البيانات الشخصية، واجعل الإنسان صاحب القرار الأخير. ثم انشر تطبيقك على منصة استضافة مناسبة واجعل له رابطًا يمكن تجربته.',
        ],
      },
      {
        heading: 'نصائح للطريق',
        paragraphs: [],
        list: [
          'تعلم المفهوم قبل الإطار؛ الأطر تتغير والمفاهيم تبقى.',
          'ابنِ مشاريع تحل مشكلة تعرفها، فهذا يجعل التقييم أسهل والدافع أقوى.',
          'اقرأ الوثائق الرسمية وسجلات التغيير، فهذا المجال يتطور بسرعة.',
          'انشر مشاريعك على GitHub مع شرح واضح لما يفعله التطبيق وحدوده.',
        ],
      },
      {
        heading: "مثال مشروع متكامل: مساعد مذاكرة لمقرر جامعي",
        paragraphs: [
          "لنجمع المراحل في مشروع واحد. الهدف: تطبيق ويب بسيط يرفع فيه الطالب ملفات مقرر، ثم يسأل عنها. في الواجهة الخلفية تقسم الملفات إلى أجزاء وتحولها إلى متجهات وتخزنها في PostgreSQL مع pgvector. عند السؤال تسترجع أقرب الأجزاء، وترسلها مع تعليمات نظامية تطلب الإجابة من هذه الأجزاء فقط، وذكر رقم الجزء المعتمد، وقول \"لا أعرف\" إذا لم تجد الإجابة.",
          "ثم تضيف أداة واحدة: توليد اختبار قصير من فصل محدد. وتكتب عشرين سؤالًا تقييميًا تعرف إجاباتها، وتشغلها بعد كل تعديل لتتأكد أن التحسين في جزء لم يفسد جزءًا آخر. هذا المشروع وحده يغطي معظم المفاهيم الأساسية، ويصلح أن يكون مشروعًا بارزًا في ملف إنجازاتك.",
        ],
      },
      {
        heading: 'الخلاصة',
        paragraphs: [
          'الانتقال من مستخدم لأدوات الذكاء الاصطناعي إلى مطوّر يبني بها ليس قفزة واحدة، بل ست خطوات واضحة: أساس برمجي، وفهم للنماذج، واتصال بالواجهة، واسترجاع من البيانات، واستخدام للأدوات، ثم تقييم ونشر مسؤول. خذها مرحلة مرحلة، واختم كل مرحلة بمشروع، وستجد نفسك خلال وقت قصير قادرًا على بناء أدوات تحل مشكلات حقيقية للناس.',
        ],
      },
    ],
  },
  en: {
    title: 'From User to Builder: A Practical Learning Path for Programming Students Building AI Applications',
    excerpt:
      'Using ChatGPT and Claude is one thing; building an application on language models is another. A six-stage path for programming students, from fundamentals to a responsible, deployable app.',
    sections: [
      {
        paragraphs: [
          'As a software engineering student and full-stack developer interested in AI for healthcare and education, I think programming students today have a big opportunity: building smart applications is no longer reserved for research teams at large companies. A student who knows programming basics and APIs can build genuinely useful tools on top of available language models.',
          'The road is full of fast-changing jargon and frameworks, so here is an ordered path that focuses on lasting concepts before changing tools, with a small project at every stage.',
        ],
      },
      {
        heading: 'Stage 1: a solid programming base',
        paragraphs: [
          'Master at least one language first; Python and TypeScript are excellent because most LLM tooling supports them. You also need HTTP, REST APIs and JSON, environment variables for secrets, and Git basics. These are not side details; most beginner problems in AI apps are ordinary programming problems.',
        ],
      },
      {
        heading: 'Stage 2: how language models work',
        paragraphs: ['You do not need deep maths at first, but you do need the concepts that shape your design:'],
        list: [
          'Tokens, and why they determine cost and how much you can send.',
          'The context window: the model remembers nothing beyond what you send in each request.',
          'System prompts and how they steer behaviour.',
          'Temperature, and when you need consistent answers.',
          'Hallucination: models can produce wrong information confidently, and your design must account for it.',
        ],
      },
      {
        heading: 'Stage 3: your first API call',
        paragraphs: [
          'Pick one provider, such as Anthropic, OpenAI or Google, and read its official documentation, the most accurate and current source; many providers also publish free learning material on their sites. Send a first request from code, add a system prompt, turn it into a multi-turn conversation, then request structured JSON output.',
        ],
        list: [
          'Stage project: a command-line tool that summarises a text file and extracts a task list as JSON.',
          'Security rule: never put the API key in code or push it to GitHub; use environment variables.',
        ],
      },
      {
        heading: 'Stage 4: retrieval-augmented generation (RAG)',
        paragraphs: [
          'Most useful apps need answers from specific data: company docs, a course, guidelines. RAG means splitting documents into chunks, turning them into embeddings, storing them in a vector database, then retrieving the chunks closest to the user’s question and sending them with it to the model.',
          'Start simple: PostgreSQL with the pgvector extension saves learning a new database. More important than tools is showing the sources the answer used, so users can verify.',
        ],
        list: ['Stage project: an assistant that answers questions from course files and shows the supporting passage with every answer.'],
      },
      {
        heading: 'Stage 5: tools and agents',
        paragraphs: [
          'Modern models can call functions you define (tool use / function calling): query a database, run a calculation, call an external API. That is the foundation of “agents”. Start with one simple tool and understand the full loop: the model requests the tool, your code runs it, and returns the result. Never give the model power to take consequential actions without user confirmation.',
        ],
      },
      {
        heading: 'Stage 6: evaluation, responsibility and deployment',
        paragraphs: [
          'Evaluation is what separates a prototype from a real application. Build a set of test questions with expected answers and measure your app against it after every change. Monitor cost and latency, and handle errors and rate limits gracefully.',
          'In sensitive fields like health and education, responsibility is not optional: do not let the app give a diagnosis or final decision, explain its limits, protect personal data, and keep a human as the final decision-maker. Then deploy it on a suitable hosting platform with a link people can try.',
        ],
      },
      {
        heading: 'Tips for the road',
        paragraphs: [],
        list: [
          'Learn the concept before the framework; frameworks change, concepts stay.',
          'Build projects that solve a problem you know, which makes evaluation easier and motivation stronger.',
          'Read official docs and changelogs; this field moves fast.',
          'Publish projects on GitHub with a clear explanation of what the app does and its limits.',
        ],
      },
      {
        heading: "A complete project: a study assistant for a university course",
        paragraphs: [
          "Let us combine the stages. Goal: a simple web app where a student uploads course files and asks questions about them. On the back end, split files into chunks, embed them and store them in PostgreSQL with pgvector. On each question, retrieve the closest chunks and send them with a system prompt that says to answer only from them, cite the chunk used, and say “I don’t know” if the answer is not there.",
          "Then add one tool: generating a short quiz from a chosen chapter. Write twenty evaluation questions with known answers and run them after every change, so improving one part does not break another. This single project covers most core concepts and makes a strong portfolio piece.",
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'Moving from AI user to AI builder is not one leap but six clear steps: a programming base, understanding models, calling the API, retrieving from data, using tools, then responsible evaluation and deployment. Take them one at a time, finish each with a project, and you will soon be able to build tools that solve real problems for people.',
        ],
      },
    ],
  },
}
