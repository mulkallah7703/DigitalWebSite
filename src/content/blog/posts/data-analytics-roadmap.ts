import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'data-analytics-roadmap-for-beginners',
  date: '2026-10-30',
  cover: '/blog/data-analytics-roadmap-for-beginners.png',
  coverLines: ['Data Analytics', 'Roadmap'],
  coverAlt: { ar: 'غلاف مقال خارطة طريق تحليل البيانات', en: 'Cover: data analytics roadmap' },
  tags: ['Data', 'Career', 'Python'],
  ar: {
    title: 'خارطة طريق تحليل البيانات للمبتدئين: من جداول Excel إلى SQL وPython ومشروعك الأول',
    excerpt:
      'تحليل البيانات من أكثر المهارات طلبًا، لكن البداية قد تكون مربكة بسبب كثرة الأدوات. هذه خارطة طريق مرتبة على خمس مراحل، مع مشروع تطبيقي لكل مرحلة ونصائح لاستخدام الذكاء الاصطناعي كمعلم لا كبديل.',
    sections: [
      {
        paragraphs: [
          'من الأسئلة التي تتكرر كثيرًا بين طلاب التقنية وغيرهم: من أين أبدأ في تحليل البيانات؟ وأرى أن المشكلة ليست قلة المصادر، بل كثرتها. هناك عشرات الأدوات واللغات والدورات، والمبتدئ يقفز بينها دون أن يبني أساسًا متينًا. لذلك أقترح هنا ترتيبًا واضحًا، يبدأ من الأدوات التي ربما تستخدمها اليوم، وينتهي بمشروع حقيقي تضعه في ملف إنجازاتك.',
          'تذكّر أن تحليل البيانات في جوهره ليس أدوات، بل طريقة تفكير: أن تطرح سؤالًا جيدًا، وتجد البيانات التي تجيب عنه، وتنظفها، وتحللها، ثم تعرض النتيجة بطريقة يفهمها من يتخذ القرار. الأدوات تتغير، أما هذه الدورة فثابتة.',
        ],
      },
      {
        heading: 'المرحلة الأولى: التفكير التحليلي والإحصاء الأساسي',
        paragraphs: [
          'قبل أي أداة، تحتاج إلى فهم بعض المفاهيم: المتوسط والوسيط ومتى يكون أحدهما مضللًا، والتباين والانحراف المعياري، والفرق بين الارتباط والسببية، ومعنى العينة ولماذا قد لا تمثل المجتمع. هذه المفاهيم هي ما يحميك من الاستنتاجات الخاطئة، وهي أكثر ما يميز المحلل الجيد عن مستخدم الأدوات.',
          'هنا يكون الذكاء الاصطناعي معلمًا ممتازًا: اطلب من Claude أو ChatGPT أن يشرح كل مفهوم بمثال من حياتك اليومية، ثم أن يعطيك سؤالًا تطبيقيًا ويصحح إجابتك. لا تنتقل إلى المرحلة التالية قبل أن تستطيع شرح كل مفهوم بكلماتك.',
        ],
      },
      {
        heading: 'المرحلة الثانية: الجداول الإلكترونية بإتقان',
        paragraphs: [
          'Excel وGoogle Sheets ليسا أدوات للمبتدئين فقط؛ كثير من التحليلات في الشركات تتم فيهما. ركز على: تنظيم البيانات في جدول صحيح (صف لكل سجل وعمود لكل متغير)، والدوال الأساسية مثل SUMIFS وCOUNTIFS وXLOOKUP، والجداول المحورية، والتنسيق الشرطي، والرسوم البيانية المناسبة لكل نوع من البيانات.',
        ],
        list: [
          'مشروع المرحلة: حمّل ملف بيانات عامًا، مثل بيانات مبيعات تجريبية، وأجب عن خمسة أسئلة: ما أعلى منتج مبيعًا؟ كيف تتغير المبيعات شهريًا؟ أي منطقة تنمو أسرع؟ وهكذا.',
          'اعرض الإجابات في لوحة بسيطة من صفحة واحدة.',
        ],
      },
      {
        heading: 'المرحلة الثالثة: SQL لغة البيانات',
        paragraphs: [
          'عندما تكبر البيانات وتُخزن في قواعد بيانات، تصبح SQL ضرورية. بصفتي مطور full-stack أتعامل مع قواعد البيانات باستمرار، وأنصح كل من يدخل مجال البيانات أن يعتبر SQL مهارة أساسية لا اختيارية. تعلم بالترتيب: SELECT وWHERE، ثم ORDER BY وLIMIT، ثم GROUP BY مع دوال التجميع، ثم أنواع JOIN، ثم الاستعلامات الفرعية، وأخيرًا دوال النوافذ.',
          'تدرب على قاعدة بيانات تجريبية مثل SQLite على جهازك. وعند الخطأ، الصق الاستعلام ورسالة الخطأ في أداة الذكاء الاصطناعي واطلب شرح السبب، لا التصحيح فقط.',
        ],
        list: ['مشروع المرحلة: أعد إجابة أسئلة المرحلة السابقة نفسها لكن باستعلامات SQL، وقارن النتائج بما حصلت عليه في الجداول.'],
      },
      {
        heading: 'المرحلة الرابعة: Python للتحليل',
        paragraphs: [
          'Python تفتح لك أبواب الأتمتة والتحليل المتقدم. لا تحتاج إلى أن تصبح مبرمجًا محترفًا؛ يكفي في البداية أن تتقن أساسيات اللغة، ثم مكتبة pandas للتعامل مع الجداول، وmatplotlib أو seaborn للرسوم، وأن تعمل داخل Jupyter Notebook أو Google Colab حتى ترى النتائج خطوة بخطوة.',
          'نصيحتي هنا: لا تجعل الذكاء الاصطناعي يكتب الكود كاملًا ثم تنسخه. اكتب أنت أولًا، ثم اطلب مراجعة الكود واقتراح طريقة أبسط وشرح كل سطر لم تفهمه. ستتعلم أضعاف ما تتعلمه من النسخ.',
        ],
        list: ['مشروع المرحلة: نظّف ملف بيانات حقيقي فيه قيم مفقودة وتكرارات وتنسيقات تواريخ مختلفة، ثم وثّق كل خطوة تنظيف في الدفتر.'],
      },
      {
        heading: 'المرحلة الخامسة: التصوير وسرد القصة بالبيانات',
        paragraphs: [
          'التحليل الذي لا يفهمه صاحب القرار لا قيمة له. تعلم أداة لوحات معلومات مثل Power BI أو Looker Studio أو Tableau، والأهم أن تتعلم مبادئ العرض: رسالة واحدة لكل رسم، وعنوان يقول الاستنتاج لا اسم المتغير، وتقليل الألوان والعناصر غير الضرورية.',
        ],
      },
      {
        heading: 'المشروع الختامي: من السؤال إلى التوصية',
        paragraphs: ['اختر مجالًا يهمك، وأنا شخصيًا أميل إلى بيانات الصحة والتعليم العامة، ثم نفّذ دورة كاملة:'],
        list: [
          'صغ سؤالًا واضحًا يمكن الإجابة عنه بالبيانات.',
          'اعثر على مجموعة بيانات عامة موثوقة من بوابات البيانات المفتوحة أو منصات مثل Kaggle.',
          'نظّف البيانات ووثّق قراراتك.',
          'حلل باستخدام SQL أو Python.',
          'اعرض النتائج في لوحة واحدة وتقرير قصير يتضمن التوصيات والقيود.',
          'انشر المشروع على GitHub مع ملف README يشرح السؤال والمنهج والنتائج.',
        ],
      },
      {
        heading: 'أين تأتي الشهادات؟',
        paragraphs: [
          'الدورات المجانية والمدفوعة من جهات معروفة مفيدة لتنظيم التعلم، وبعضها يمنح شهادات. لكنني أرى أن الشهادة وحدها لا تقنع صاحب العمل بقدر ما يقنعه مشروع منشور يستطيع أن يفتحه ويرى طريقة تفكيرك فيه. استخدم الدورة كهيكل، والمشروع كدليل.',
        ],
      },
      {
        heading: "أخطاء المبتدئين التي أنصحك بتجنبها",
        paragraphs: [
        ],
        list: [
          "البدء بأداة متقدمة مثل التعلم الآلي قبل إتقان الأساسيات.",
          "التحليل دون سؤال واضح، فتنتج رسومًا كثيرة بلا استنتاج.",
          "تجاهل تنظيف البيانات، مع أنه يأخذ في الواقع جزءًا كبيرًا من وقت المحلل.",
          "عرض الأرقام دون سياق: هل هذا الرقم كبير أم صغير؟ مقارنة بماذا؟",
          "نسخ مشاريع جاهزة من الإنترنت ونشرها كما هي.",
        ],
      },
      {
        heading: "جدول زمني مقترح",
        paragraphs: [
          "إذا خصصت ساعة يوميًا تقريبًا، فيمكن أن يكون التوزيع كالتالي: أسبوعان للإحصاء الأساسي، وثلاثة أسابيع للجداول الإلكترونية، وأربعة أسابيع لـ SQL، وستة أسابيع لـ Python، وأسبوعان للعرض والتصوير، ثم ثلاثة أسابيع للمشروع الختامي. هذا تقدير مرن وليس قاعدة؛ المهم أن تنتقل للمرحلة التالية عندما تنجز مشروع المرحلة الحالية بثقة، لا عندما ينتهي الوقت.",
        ],
      },
      {
        heading: 'الخلاصة',
        paragraphs: [
          'ابدأ بالتفكير الإحصائي، ثم أتقن الجداول، ثم SQL، ثم Python، ثم العرض، واختم كل مرحلة بمشروع صغير. لا تستعجل، فالمحلل الذي يفهم بياناته جيدًا بأداة بسيطة أفضل من محلل يعرف عشر أدوات ولا يعرف ماذا يسأل. واجعل الذكاء الاصطناعي معلمًا يشرح ويصحح، لا آلة تنجز عنك ما يجب أن تتعلمه.',
        ],
      },
    ],
  },
  en: {
    title: 'A Data Analytics Roadmap for Beginners: From Excel to SQL, Python and Your First Project',
    excerpt:
      'Data analytics is one of the most in-demand skills, but the number of tools makes starting confusing. A five-stage roadmap with a hands-on project per stage, and tips for using AI as a tutor rather than a shortcut.',
    sections: [
      {
        paragraphs: [
          '“Where do I start with data analytics?” is one of the most common questions among tech students and career changers. The problem is not a lack of resources but too many of them: dozens of tools, languages and courses, and beginners jump between them without a solid base. Here is a clear order that starts with tools you may already use and ends with a real project for your portfolio.',
          'At its core, data analytics is a way of thinking, not a set of tools: ask a good question, find data that answers it, clean it, analyse it, and present the result so a decision-maker understands it. Tools change; that cycle does not.',
        ],
      },
      {
        heading: 'Stage 1: analytical thinking and basic statistics',
        paragraphs: [
          'Before any tool, learn the concepts: mean and median and when one misleads, variance and standard deviation, correlation versus causation, and why a sample may not represent a population. These protect you from wrong conclusions and separate a good analyst from a tool operator.',
          'AI is an excellent tutor here: ask Claude or ChatGPT to explain each concept with an everyday example, then give you a practice question and grade your answer. Do not move on until you can explain each concept in your own words.',
        ],
      },
      {
        heading: 'Stage 2: spreadsheets, properly',
        paragraphs: [
          'Excel and Google Sheets are not just for beginners; much real business analysis happens in them. Focus on tidy tables (a row per record, a column per variable), SUMIFS, COUNTIFS and XLOOKUP, pivot tables, conditional formatting, and choosing the right chart for each kind of data.',
        ],
        list: [
          'Stage project: take a public sample dataset, such as demo sales data, and answer five questions: best-selling product, monthly trend, fastest-growing region, and so on.',
          'Present the answers on a simple one-page dashboard.',
        ],
      },
      {
        heading: 'Stage 3: SQL, the language of data',
        paragraphs: [
          'Once data lives in databases, SQL becomes essential. As a full-stack developer I work with databases constantly, and I advise anyone entering data to treat SQL as core, not optional. Learn in order: SELECT and WHERE, ORDER BY and LIMIT, GROUP BY with aggregates, JOIN types, subqueries, then window functions.',
          'Practise on a local database such as SQLite. When you hit an error, paste the query and the message into an AI tool and ask why it failed, not just for a fix.',
        ],
        list: ['Stage project: answer the same questions from stage 2 with SQL and compare the results.'],
      },
      {
        heading: 'Stage 4: Python for analysis',
        paragraphs: [
          'Python opens the door to automation and deeper analysis. You do not need to become a professional programmer; start with language basics, then pandas for tables, matplotlib or seaborn for charts, working in Jupyter Notebook or Google Colab to see results step by step.',
          'My advice: do not let AI write the whole script for you to copy. Write it yourself first, then ask for a review, a simpler approach and an explanation of any line you do not understand. You will learn far more than by copying.',
        ],
        list: ['Stage project: clean a real dataset with missing values, duplicates and mixed date formats, documenting every cleaning step in the notebook.'],
      },
      {
        heading: 'Stage 5: visualisation and data storytelling',
        paragraphs: [
          'Analysis a decision-maker cannot understand has no value. Learn one dashboard tool such as Power BI, Looker Studio or Tableau, and above all the principles: one message per chart, a title that states the conclusion rather than the variable name, and fewer colours and unnecessary elements.',
        ],
      },
      {
        heading: 'Capstone: from question to recommendation',
        paragraphs: ['Pick a field you care about; I lean towards public health and education data. Then run the full cycle:'],
        list: [
          'Write a clear question that data can answer.',
          'Find a reliable public dataset from open-data portals or platforms like Kaggle.',
          'Clean the data and document your decisions.',
          'Analyse with SQL or Python.',
          'Present results in one dashboard and a short report with recommendations and limitations.',
          'Publish it on GitHub with a README explaining the question, method and findings.',
        ],
      },
      {
        heading: 'Where do certificates fit?',
        paragraphs: [
          'Free and paid courses from well-known providers help structure learning, and some grant certificates. But a certificate alone convinces an employer less than a published project they can open to see how you think. Use the course as structure and the project as proof.',
        ],
      },
      {
        heading: "Beginner mistakes to avoid",
        paragraphs: [
        ],
        list: [
          "Starting with advanced topics like machine learning before the fundamentals.",
          "Analysing without a clear question, producing many charts and no conclusion.",
          "Skipping data cleaning, which in practice takes a large share of an analyst’s time.",
          "Showing numbers without context: is this big or small, compared to what?",
          "Copying ready-made projects from the internet and publishing them as is.",
        ],
      },
      {
        heading: "A suggested timeline",
        paragraphs: [
          "At roughly an hour a day: two weeks of basic statistics, three of spreadsheets, four of SQL, six of Python, two of visualisation, then three for the capstone. It is a flexible estimate, not a rule; move on when you can complete the current stage’s project confidently, not when the time runs out.",
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'Start with statistical thinking, then spreadsheets, SQL, Python and presentation, closing each stage with a small project. Do not rush: an analyst who understands their data with a simple tool beats one who knows ten tools but not what to ask. Let AI be a tutor that explains and corrects, not a machine that does the learning for you.',
        ],
      },
    ],
  },
}
