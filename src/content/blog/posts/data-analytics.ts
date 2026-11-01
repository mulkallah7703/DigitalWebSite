import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'data-analytics-roadmap-for-beginners',
  date: '2026-10-30',
  cover: '/blog/data-analytics-roadmap-for-beginners.png?v=3',
  coverLines: ['Data Analytics', 'Essentials + AI'],
  coverAlt: { ar: 'غلاف مقال تعلم تحليل البيانات مع دورة Cisco والذكاء الاصطناعي', en: 'Cover: data analytics with Cisco and AI' },
  tags: ['Data', 'Cisco', 'SQL'],
  ar: {
    title: 'ابدأ تحليل البيانات من الصفر: دورة Cisco Data Analytics Essentials المجانية وثمانية برومبتات تجعل الذكاء الاصطناعي مدرّبك الخاص',
    excerpt:
      'دليل عملي لإكمال دورة Cisco المجانية في تحليل البيانات (Excel وSQL وTableau) بفهم حقيقي، مع ثمانية برومبتات للمذاكرة وحل التمارين وبناء مشروع منشور على GitHub والتحضير للمقابلات.',
    hook:
      'بنهاية هذا الدليل ستكون لديك خطة لإنهاء الدورة، ومدرّب ذكي يشرح لك Excel وSQL وTableau دون أن يحل عنك، ومشروع تحليل بيانات منشور بملف README احترافي تضعه في سيرتك الذاتية.',
    sections: [
      {
        paragraphs: [
          'من أفضل نقاط البداية المجانية في تحليل البيانات اليوم دورة Data Analytics Essentials من Cisco Networking Academy على netacad.com. حسب صفحتها الرسمية، الدورة مجانية، وذاتية الوتيرة، ومستواها مبتدئ، ومدتها التقديرية 30 ساعة مع 29 نشاطًا عمليًا، ومتاحة بعدة لغات منها العربية. وتغطي تحويل البيانات وتنظيمها وتصويرها في Excel، والاستعلام من قواعد البيانات العلائقية بـ SQL، وبناء لوحات المعلومات في Tableau، إضافة إلى أخلاقيات البيانات والتحيز، وتنتهي بملف إنجازات يتضمن تحليلًا لمجموعة بيانات أفلام شهيرة.',
          'وعند الإكمال يمكنك الحصول على شارة رقمية من Cisco؛ وتذكر صفحة الشارة على Credly أن شرط الحصول عليها هو اجتياز الاختبار الشامل بنسبة 70%. لكن الشارة ليست الهدف. الهدف أن تخرج قادرًا على تحليل بيانات حقيقية. وهنا يأتي دور Claude أو ChatGPT كمدرّب يشرح ويختبر ويراجع، لا كأداة تحل التمارين عنك.',
        ],
      },
      {
        heading: 'قاعدة ذهبية قبل البرومبتات',
        paragraphs: [
          'اطلب من الذكاء الاصطناعي الشرح والتلميح والمراجعة، ولا تطلب الحل الجاهز لتمارين الدورة أو أسئلة الاختبار. الأولى تبني مهارة، والثانية تعطيك شارة بلا قدرة، وقد تخالف سياسات النزاهة في المنصة.',
        ],
      },
      {
        heading: 'البرومبتات الثمانية',
        paragraphs: [],
        prompts: [
          {
            title: 'خطة إنهاء الدورة حسب وقتك',
            when: 'في اليوم الأول، قبل أن تبدأ الوحدة الأولى.',
            expect: 'جدول أسبوعي يوزع الوحدات العشر على وقتك، مع أيام مراجعة ومشروع صغير بعد كل أداة. عدّل الأرقام إن اختلف تقديرك.',
            text: `أنا مبتدئ في تحليل البيانات وسجلت في دورة Cisco Data Analytics Essentials (مدتها التقديرية 30 ساعة، وتغطي Excel ثم SQL ثم Tableau ومشروعًا ختاميًا).

وقتي المتاح: [عدد] ساعات أسبوعيًا، وأريد الإنهاء خلال [عدد] أسابيع.
خلفيتي: [مثلًا: أستخدم Excel بشكل بسيط، لا أعرف SQL].

أنشئ خطة أسبوعية في جدول: الأسبوع | الوحدات | الساعات | تمرين إضافي خارج الدورة | كيف أعرف أنني أتقنت.
أضف يوم مراجعة كل أسبوعين، واقترح مشروعًا صغيرًا بعد إنهاء كل أداة (Excel ثم SQL ثم Tableau).
إذا كانت المدة غير واقعية لوقتي فقل ذلك واقترح مدة مناسبة.`,
          },
          {
            title: 'مدرّب Excel: افهم الدالة لا تنسخها',
            when: 'عندما تقف أمام دالة أو مهمة في معمل Excel ولا تعرف كيف تبدأ.',
            expect: 'شرح للمنطق وأي الدوال تناسب، مع مثال على بيانات مختلفة عن بيانات المعمل، ثم تحدٍّ صغير تحله أنت.',
            text: `أنت مدرّب Excel صبور. لا تعطني الحل النهائي للتمرين.

ما أحاول فعله: [صف المهمة، مثلًا: استخراج السنة من عمود التاريخ ثم حساب متوسط التقييم لكل سنة]
أعمدة جدولي: [أسماء الأعمدة ونوع كل منها]
ما جربته: [المعادلة أو الخطوة التي جربتها والخطأ الذي ظهر]

المطلوب:
1. اشرح المنطق خطوة بخطوة بالكلام.
2. ما الدوال أو الأدوات المناسبة (مثل XLOOKUP أو SUMIFS أو PivotTable) ولماذا.
3. مثال تطبيقي على بيانات مختلفة صغيرة تصنعها أنت.
4. تحدٍّ مشابه أحله أنا، ثم صحح إجابتي عندما أرسلها.`,
          },
          {
            title: 'قائمة تنظيف البيانات لأي ملف',
            when: 'قبل تحليل أي مجموعة بيانات، في الدورة أو في مشروعك الخاص.',
            expect: 'قائمة فحوصات مرتبة مخصصة لأعمدتك (القيم المفقودة، والتكرار، والصيغ، والقيم الشاذة) مع طريقة تنفيذ كل فحص في Excel.',
            text: `أنت محلل بيانات خبير في جودة البيانات.

مجموعة البيانات: [وصفها]
الأعمدة: [اسم العمود: نوعه: مثال على قيمة] لكل عمود
عدد الصفوف تقريبًا: [عدد]
هدف التحليل: [السؤال الذي أريد الإجابة عنه]

أنشئ قائمة تنظيف مرتبة:
1. الفحص (مثل: قيم مفقودة، تكرار، صيغ تواريخ مختلفة، مسافات زائدة، قيم شاذة، تصنيفات مكتوبة بأشكال مختلفة).
2. الأعمدة المعنية تحديدًا.
3. كيف أكتشفه في Excel (دالة أو أداة).
4. كيف أعالجه، ومتى يكون الحذف خطأ.
5. ما الذي أوثّقه في سجل التنظيف.

ذكّرني بالاحتفاظ بنسخة أصلية من البيانات.`,
          },
          {
            title: 'مدرّب SQL: من السؤال إلى الاستعلام',
            when: 'عند تعلم SQL، أو عندما يفشل استعلامك ولا تعرف السبب.',
            expect: 'تفكيك السؤال إلى خطوات، وبناء الاستعلام جزءًا جزءًا مع شرح كل جزء، وتفسير رسالة الخطأ إن وجدت.',
            text: `أنت مدرّب SQL. اشرح ولا تختصر.

هيكل الجداول:
[اسم الجدول (الأعمدة)] لكل جدول، والعلاقة بينها: [مثلًا: movies.id = ratings.movie_id]

السؤال الذي أريد الإجابة عنه: [مثلًا: أعلى 10 أفلام تقييمًا بعد عام 2010 لها أكثر من 1000 تقييم]
استعلامي الحالي (إن وجد):
[الصق الاستعلام]
رسالة الخطأ: [إن وجدت]

المطلوب:
1. حوّل السؤال إلى خطوات منطقية (أي جدول، أي شرط، أي تجميع، أي ترتيب).
2. ابنِ الاستعلام تدريجيًا مع شرح كل جزء (SELECT، JOIN، WHERE، GROUP BY، HAVING، ORDER BY).
3. إذا كان لدي خطأ: ما سببه بالضبط وكيف أتجنبه مستقبلًا.
4. سؤال متابعة أصعب قليلًا أتدرب عليه.`,
          },
          {
            title: 'مولّد تمارين SQL على بياناتك',
            when: 'بعد إنهاء وحدات SQL، لتثبيت المهارة على هيكل جداول تعرفه.',
            expect: 'عشرة تمارين متدرجة الصعوبة مع إخفاء الحلول حتى تطلبها، ثم تصحيح استعلاماتك وشرح الأخطاء.',
            text: `هذا هيكل قاعدة بيانات أتدرب عليها:
[الجداول والأعمدة والعلاقات]

أنشئ 10 تمارين SQL متدرجة:
- 1 إلى 3: SELECT وWHERE وORDER BY.
- 4 إلى 6: GROUP BY والدوال التجميعية وHAVING.
- 7 إلى 8: JOIN بين جدولين أو أكثر.
- 9 إلى 10: استعلامات فرعية أو دوال النوافذ.

لكل تمرين: سؤال عملي بلغة الأعمال (لا بلغة SQL)، ومستوى الصعوبة.
لا تكتب الحلول. سأرسل استعلامي لكل تمرين، فصححه واشرح أي خطأ واقترح صيغة أنظف.`,
          },
          {
            title: 'مخطط لوحة Tableau قبل أن تفتح البرنامج',
            when: 'قبل بناء لوحة المعلومات في وحدة Tableau أو في مشروعك.',
            expect: 'أسئلة اللوحة، والرسم المناسب لكل سؤال وسبب اختياره، وترتيب العناصر، والفلاتر، مع أخطاء تصميم يجب تجنبها.',
            text: `أنت مصمم لوحات معلومات خبير في سرد القصة بالبيانات.

البيانات: [وصف الأعمدة]
الجمهور: [من سيستخدم اللوحة وما القرار الذي يتخذه]
الرسالة الأساسية التي أريد إيصالها: [...]

صمم اللوحة على الورق:
1. 3 إلى 5 أسئلة تجيب عنها اللوحة.
2. لكل سؤال: نوع الرسم المناسب، ولماذا هو أفضل من البدائل، والحقول المستخدمة.
3. ترتيب العناصر على الشاشة (من الأهم إلى الأقل) والفلاتر التفاعلية.
4. عنوان لكل رسم يقول الاستنتاج لا اسم المتغير.
5. خمسة أخطاء تصميم شائعة يجب أن أتجنبها في هذه اللوحة تحديدًا.`,
          },
          {
            title: 'كاتب README لمشروعك على GitHub',
            when: 'بعد إنهاء المشروع الختامي أو أي مشروع تحليل، وقبل نشره.',
            expect: 'ملف README منظم: السؤال، والبيانات، والمنهج، والنتائج، والأدوات، والقيود، مكتوب من معلوماتك فقط ومناسب لمسؤولي التوظيف.',
            text: `اكتب ملف README.md احترافي لمشروع تحليل بيانات على GitHub، اعتمادًا على هذه المعلومات فقط:

- عنوان المشروع: [...]
- السؤال التحليلي: [...]
- مصدر البيانات وحجمها: [...]
- خطوات التنظيف التي قمت بها: [...]
- الأدوات: [Excel / SQL / Tableau]
- أهم 3 نتائج (بالأرقام التي توصلت إليها): [...]
- رابط لوحة Tableau Public إن وجد: [...]
- القيود: [...]

الأقسام: نظرة عامة، والسؤال، والبيانات، والمنهج، والنتائج الرئيسية، وكيف تعيد تنفيذ التحليل، والقيود والخطوات التالية.
اكتب بالإنجليزية بلغة واضحة لمسؤول توظيف لديه دقيقتان، ولا تضف أي نتيجة لم أذكرها.`,
          },
          {
            title: 'مقابلة تجريبية لوظيفة محلل بيانات',
            when: 'بعد إنهاء الدورة والمشروع، وقبل التقديم على تدريب أو وظيفة.',
            expect: 'مقابلة تفاعلية سؤالًا بسؤال تغطي Excel وSQL والتصوير ومشروعك، مع تقييم كل إجابة وكيف تحسنها.',
            text: `تصرف كمسؤول توظيف لوظيفة [محلل بيانات مبتدئ / متدرب].

مهاراتي: Excel، وSQL أساسي، وTableau، ومشروع تحليل عن [الموضوع].

أجرِ معي مقابلة تجريبية:
- سؤال واحد في كل رسالة، وانتظر إجابتي.
- نوّع بين: سؤال سلوكي، وسؤال SQL عملي، وسؤال عن اختيار الرسم المناسب، وسؤال عن مشروعي، وسؤال عن التعامل مع بيانات غير نظيفة.
- بعد كل إجابة: قيّمها من 5، وما الذي كان جيدًا، وكيف أجعلها أقوى.
- بعد 8 أسئلة: ملخص لنقاط قوتي وما أحتاج تحسينه قبل المقابلة الحقيقية.`,
          },
        ],
      },
      {
        heading: 'نصائح لتستفيد أكثر',
        paragraphs: [],
        list: [
          'بعد كل وحدة، طبّق ما تعلمته على مجموعة بيانات عامة مختلفة عن بيانات الدورة.',
          'دوّن أخطاءك في SQL ورسائلها؛ هذا السجل أفضل مرجع لك لاحقًا.',
          'انشر لوحاتك على Tableau Public واربطها بمشروعك على GitHub.',
          'رسالة متابعة مفيدة: "اشرح لي الخطأ الذي وقعت فيه كأنك تشرحه لطالب آخر، ثم أعطني تمرينًا يختبر هذه النقطة تحديدًا".',
        ],
      },
      {
        heading: 'أخطاء شائعة',
        paragraphs: [],
        list: [
          'نسخ حلول التمارين من الذكاء الاصطناعي، ثم التعثر في الاختبار الشامل أو في أول مهمة حقيقية.',
          'الاعتماد على أرقام قديمة عن الدورة من مصادر غير رسمية؛ تحقق دائمًا من صفحة الدورة على netacad.com.',
          'رفع بيانات حقيقية سرية إلى أدوات الذكاء الاصطناعي؛ استخدم وصف الأعمدة أو عينة وهمية.',
          'التوقف عند الشارة دون مشروع منشور يثبت المهارة.',
        ],
      },
      {
        heading: 'قائمة سير العمل السريعة',
        paragraphs: [],
        list: [
          'سجّل في الدورة من netacad.com، واختر اللغة التي تناسبك.',
          'اطلب خطة حسب وقتك (البرومبت 1).',
          'Excel: مدرّب الدوال (2) وقائمة التنظيف (3).',
          'SQL: مدرّب الاستعلامات (4) ثم التمارين (5).',
          'Tableau: خطط اللوحة على الورق أولًا (6).',
          'انشر المشروع مع README (7)، ثم تدرّب على المقابلة (8).',
        ],
      },
    ],
  },
  en: {
    title: 'Start Data Analytics from Zero: Cisco’s Free Data Analytics Essentials Course and Eight Prompts That Make AI Your Personal Coach',
    excerpt:
      'A practical guide to completing Cisco’s free data analytics course (Excel, SQL and Tableau) with real understanding, plus eight prompts for studying, practising, publishing a GitHub project and preparing for interviews.',
    hook:
      'By the end of this guide you will have a plan to finish the course, an AI coach that explains Excel, SQL and Tableau without doing the work for you, and a published analytics project with a professional README for your CV.',
    sections: [
      {
        paragraphs: [
          'One of the best free starting points in data analytics today is Data Analytics Essentials from Cisco Networking Academy at netacad.com. According to its official page, it is free, self-paced and beginner level, estimated at 30 hours with 29 hands-on labs, and available in several languages including Arabic. It covers transforming, organising and visualising data in Excel, querying relational databases with SQL, building dashboards in Tableau, plus data ethics and bias, and ends with a portfolio including an analysis of a popular movies dataset.',
          'On completion you can earn a Cisco digital badge; its Credly page lists a 70% passing score on the comprehensive exam as the requirement. But the badge is not the goal; the goal is being able to analyse real data. That is where Claude or ChatGPT come in, as a coach that explains, tests and reviews, not a tool that solves exercises for you.',
        ],
      },
      {
        heading: 'A golden rule before the prompts',
        paragraphs: [
          'Ask AI for explanations, hints and reviews, never ready-made answers to course labs or exam questions. The first builds skill; the second gets you a badge without ability and may break the platform’s integrity rules.',
        ],
      },
      {
        heading: 'The eight prompts',
        paragraphs: [],
        prompts: [
          {
            title: 'A course plan that fits your time',
            when: 'On day one, before module one.',
            expect: 'A weekly table spreading the ten modules over your time, with review days and a mini project after each tool. Adjust if your pace differs.',
            text: `I am a data analytics beginner enrolled in Cisco Data Analytics Essentials (estimated 30 hours, covering Excel, then SQL, then Tableau and a final project).

My time: [number] hours per week, and I want to finish in [number] weeks.
My background: [e.g. basic Excel, no SQL].

Create a weekly plan as a table: week | modules | hours | extra exercise outside the course | how I know I have mastered it.
Add a review day every two weeks and suggest a mini project after finishing each tool (Excel, SQL, Tableau).
If the timeline is unrealistic for my time, say so and suggest a better one.`,
          },
          {
            title: 'Excel coach: understand the function, don’t copy it',
            when: 'When you are stuck on a function or task in an Excel lab.',
            expect: 'The logic and the right functions, an example on different data than the lab’s, then a small challenge for you to solve.',
            text: `You are a patient Excel coach. Do not give me the final answer to the exercise.

What I am trying to do: [describe the task, e.g. extract the year from a date column and average the rating per year]
My columns: [column names and type of each]
What I tried: [the formula or step and the error]

Deliver:
1. The logic step by step in words.
2. Which functions or tools fit (e.g. XLOOKUP, SUMIFS, PivotTable) and why.
3. A worked example on small, different data you create.
4. A similar challenge for me to solve; then correct my answer when I send it.`,
          },
          {
            title: 'A cleaning checklist for any dataset',
            when: 'Before analysing any dataset, in the course or your own project.',
            expect: 'An ordered checklist tailored to your columns (missing values, duplicates, formats, outliers) with how to run each check in Excel.',
            text: `You are a data analyst specialising in data quality.

Dataset: [description]
Columns: [name: type: example value] for each column
Approximate rows: [number]
Analysis goal: [the question I want to answer]

Create an ordered cleaning checklist:
1. The check (missing values, duplicates, mixed date formats, extra spaces, outliers, inconsistent categories).
2. Which columns specifically.
3. How to detect it in Excel (function or tool).
4. How to fix it, and when deleting would be a mistake.
5. What to record in my cleaning log.

Remind me to keep an untouched original copy.`,
          },
          {
            title: 'SQL coach: from question to query',
            when: 'While learning SQL, or when a query fails and you do not know why.',
            expect: 'The question broken into steps, the query built piece by piece with explanations, and a clear reading of any error message.',
            text: `You are a SQL coach. Explain; do not shortcut.

Schema:
[table (columns)] for each table, and relationships: [e.g. movies.id = ratings.movie_id]

The question: [e.g. top 10 highest-rated films after 2010 with more than 1000 ratings]
My current query (if any):
[paste]
Error message: [if any]

Deliver:
1. Turn the question into logical steps (which table, filter, grouping, ordering).
2. Build the query gradually, explaining each part (SELECT, JOIN, WHERE, GROUP BY, HAVING, ORDER BY).
3. If I have an error: its exact cause and how to avoid it.
4. A slightly harder follow-up question to practise.`,
          },
          {
            title: 'SQL exercise generator for your schema',
            when: 'After the SQL modules, to lock in the skill on a schema you know.',
            expect: 'Ten graded exercises with solutions hidden until you ask, then corrections of your queries with explanations.',
            text: `This is the schema I practise on:
[tables, columns and relationships]

Create 10 graded SQL exercises:
- 1-3: SELECT, WHERE, ORDER BY.
- 4-6: GROUP BY, aggregates, HAVING.
- 7-8: JOINs across two or more tables.
- 9-10: subqueries or window functions.

For each: a practical business question (not SQL wording) and a difficulty level.
Do not write the solutions. I will send my query for each; correct it, explain any mistake and suggest a cleaner version.`,
          },
          {
            title: 'Plan your Tableau dashboard before opening Tableau',
            when: 'Before building the dashboard in the Tableau module or your project.',
            expect: 'The dashboard’s questions, the right chart for each and why, the layout and filters, plus design mistakes to avoid.',
            text: `You are a dashboard designer skilled in data storytelling.

Data: [column descriptions]
Audience: [who uses it and what decision they make]
Core message: [...]

Design the dashboard on paper:
1. 3-5 questions the dashboard answers.
2. For each: the right chart type, why it beats alternatives, and the fields used.
3. Layout order (most to least important) and interactive filters.
4. A title for each chart that states the insight, not the variable name.
5. Five common design mistakes to avoid in this specific dashboard.`,
          },
          {
            title: 'README writer for your GitHub project',
            when: 'After finishing the final project or any analysis, before publishing it.',
            expect: 'A structured README: question, data, method, findings, tools and limitations, written only from your information and suited to recruiters.',
            text: `Write a professional README.md for a data analytics project on GitHub, using only this information:

- Project title: [...]
- Analytical question: [...]
- Data source and size: [...]
- Cleaning steps I did: [...]
- Tools: [Excel / SQL / Tableau]
- Top 3 findings (with the numbers I found): [...]
- Tableau Public link, if any: [...]
- Limitations: [...]

Sections: Overview, Question, Data, Method, Key findings, How to reproduce, Limitations and next steps.
Write clearly for a recruiter with two minutes, and add no finding I did not provide.`,
          },
          {
            title: 'Mock interview for a data analyst role',
            when: 'After the course and project, before applying for an internship or job.',
            expect: 'An interactive interview, one question at a time, covering Excel, SQL, visualisation and your project, with a score and improvement tips per answer.',
            text: `Act as a recruiter for a [junior data analyst / intern] role.

My skills: Excel, basic SQL, Tableau, and an analysis project on [topic].

Run a mock interview:
- One question per message; wait for my answer.
- Mix: a behavioural question, a practical SQL question, a chart-choice question, a question about my project, and one about handling messy data.
- After each answer: a score out of 5, what was good, and how to make it stronger.
- After 8 questions: a summary of my strengths and what to improve before the real interview.`,
          },
        ],
      },
      {
        heading: 'Tips to get more out of it',
        paragraphs: [],
        list: [
          'After each module, apply what you learned to a different public dataset.',
          'Log your SQL errors and their messages; it becomes your best reference.',
          'Publish dashboards on Tableau Public and link them from your GitHub project.',
          'A useful follow-up: "Explain my mistake as if teaching another student, then give me an exercise that tests exactly this point."',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [],
        list: [
          'Copying lab solutions from AI, then struggling in the final exam or the first real task.',
          'Relying on outdated course details from unofficial sources; always check the course page on netacad.com.',
          'Uploading confidential real data to AI tools; use column descriptions or a dummy sample.',
          'Stopping at the badge without a published project that proves the skill.',
        ],
      },
      {
        heading: 'Quick workflow checklist',
        paragraphs: [],
        list: [
          'Enrol on netacad.com and pick your language.',
          'Get a plan that fits your time (prompt 1).',
          'Excel: function coach (2) and cleaning checklist (3).',
          'SQL: query coach (4), then exercises (5).',
          'Tableau: plan the dashboard on paper first (6).',
          'Publish the project with a README (7), then practise the interview (8).',
        ],
      },
    ],
  },
}
