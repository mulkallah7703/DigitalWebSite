import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'ai-for-everyday-office-work',
  date: '2026-10-27',
  cover: '/blog/ai-for-everyday-office-work.png',
  coverLines: ['AI for Everyday', 'Office Work'],
  coverAlt: { ar: 'غلاف مقال الذكاء الاصطناعي في العمل المكتبي', en: 'Cover: AI for everyday office work' },
  tags: ['Productivity', 'Excel', 'Office'],
  ar: {
    title: 'الذكاء الاصطناعي في العمل المكتبي اليومي: ثماني مهام في الجداول والمستندات والعروض تبدأ بها اليوم',
    excerpt:
      'بدل الحديث العام عن "الإنتاجية"، إليك ثماني مهام محددة في Excel وWord وPowerPoint يمكن للذكاء الاصطناعي أن يختصرها، مع صيغة طلب لكل مهمة، وطريقة للتحقق من النتيجة، وقواعد لحماية بيانات العمل.',
    sections: [
      {
        paragraphs: [
          'معظم وقت العمل المكتبي لا يذهب في القرارات الكبيرة، بل في مهام صغيرة متكررة: تنظيف جدول، وكتابة معادلة، وتنسيق تقرير، وتحويل ملاحظات إلى عرض تقديمي. هذه المهام بالتحديد هي المكان الذي يقدم فيه الذكاء الاصطناعي أكبر فائدة، لأنها واضحة ويمكن التحقق من نتيجتها بسهولة.',
          'بصفتي مطورًا، أنظر إلى هذه المهام بعقلية الأتمتة: ما الذي يتكرر؟ وما الذي يمكن وصفه بخطوات واضحة؟ وفي هذا المقال أشارك ثماني مهام عملية، مع طلب نموذجي لكل منها، يمكنك تجربتها مع Claude أو ChatGPT أو Copilot أو Gemini، حسب ما هو متاح لك في عملك.',
        ],
      },
      {
        heading: 'قبل أن تبدأ: قواعد البيانات الحساسة',
        paragraphs: [
          'قبل رفع أي ملف عمل إلى أداة ذكاء اصطناعي، اعرف سياسة جهة عملك. كثير من الشركات تسمح بأدوات معينة فقط، أو بنسخ مؤسسية تحمي البيانات. وإذا لم تكن متأكدًا، فاستبدل البيانات الحقيقية ببيانات تجريبية لها البنية نفسها: نفس الأعمدة ونفس أنواع القيم، لكن بأسماء وأرقام وهمية. ستحصل على المعادلة أو الطريقة نفسها، ثم تطبقها على الملف الحقيقي بنفسك.',
        ],
      },
      {
        heading: 'المهمة الأولى: كتابة معادلة معقدة في Excel',
        paragraphs: [
          'صف ما تريد بالكلام، مع أسماء الأعمدة ومثال على النتيجة المتوقعة: "في العمود A أسماء الموظفين، وفي B الأقسام، وفي C المبيعات. أريد في خلية واحدة مجموع مبيعات قسم التسويق في الربع الأول فقط، والتواريخ في العمود D". اطلب المعادلة مع شرح كل جزء منها، ثم اختبرها على صفوف قليلة تعرف نتيجتها مسبقًا.',
        ],
      },
      {
        heading: 'المهمة الثانية: فهم معادلة ورثتها',
        paragraphs: [
          'كلنا واجهنا ملفًا فيه معادلة طويلة كتبها شخص آخر. الصقها واطلب: "اشرح هذه المعادلة خطوة بخطوة بلغة بسيطة، وما الحالات التي قد تعطي فيها نتيجة خاطئة؟ وهل هناك طريقة أبسط لكتابتها؟". السؤال الأخير مهم، لأن تبسيط المعادلات يقلل الأخطاء مستقبلًا.',
        ],
      },
      {
        heading: 'المهمة الثالثة: تنظيف البيانات',
        paragraphs: [
          'صف المشكلات التي تراها: مسافات زائدة، وأسماء مكتوبة بأشكال مختلفة، وتواريخ بصيغ متعددة، وصفوف مكررة. اطلب خطة تنظيف مرتبة، مع الدوال أو الأدوات المناسبة لكل خطوة، مثل TRIM وPower Query وإزالة التكرارات. ونصيحتي: احتفظ دائمًا بنسخة أصلية من البيانات، ونفّذ التنظيف على نسخة.',
        ],
      },
      {
        heading: 'المهمة الرابعة: تحليل سريع واقتراح رسوم',
        paragraphs: [
          'ارفع جدولًا (أو نسخة تجريبية منه) واطلب: "ما أهم ثلاث ملاحظات في هذه البيانات؟ وما الرسم البياني الأنسب لعرض كل ملاحظة؟ ولماذا؟". ثم تحقق من كل ملاحظة بنفسك باستخدام جدول محوري. ستجد أحيانًا أن الأداة لاحظت شيئًا فاتك، وأحيانًا أنها أخطأت في قراءة عمود، والتحقق هو ما يفرق بين الحالتين.',
        ],
      },
      {
        heading: 'المهمة الخامسة: تحويل ملاحظات اجتماع إلى محضر ومهام',
        paragraphs: [
          'الصق ملاحظاتك الخام واطلب: "حوّلها إلى محضر من ثلاثة أقسام: القرارات، والمهام مع المسؤول والموعد، والنقاط المعلقة. لا تضف أي مهمة لم تُذكر، وإذا كان المسؤول أو الموعد غير واضح فاكتب: غير محدد". هذه التعليمة الأخيرة تمنع الأداة من التخمين، وتبين لك ما يجب توضيحه مع الفريق.',
        ],
      },
      {
        heading: 'المهمة السادسة: إعادة هيكلة تقرير في Word',
        paragraphs: [
          'إذا كان لديك تقرير طويل غير مرتب، اطلب أولًا اقتراح هيكل فقط: العناوين الرئيسية والفرعية وترتيبها المنطقي، مع ملخص تنفيذي في البداية. وافق على الهيكل أو عدّله، ثم انقل المحتوى إليه قسمًا بقسم. العمل على مراحل يعطيك تحكمًا أكبر بكثير من طلب "حسّن التقرير" دفعة واحدة.',
        ],
      },
      {
        heading: 'المهمة السابعة: صياغة رسائل العمل الصعبة',
        paragraphs: [
          'رسالة اعتذار عن تأخير، أو رفض مهذب لطلب، أو متابعة مع عميل لم يرد. اكتب النقاط التي تريد قولها والنبرة المطلوبة، واطلب نسختين: واحدة مختصرة وأخرى مفصلة. ثم عدّل الأقرب لأسلوبك. والأهم: اقرأ الرسالة كأنك المستلم قبل أن ترسلها.',
        ],
      },
      {
        heading: 'المهمة الثامنة: من مستند إلى عرض تقديمي',
        paragraphs: [
          'أعطِ الأداة المستند أو ملخصه، وحدد الجمهور والوقت المتاح والرسالة الأساسية، واطلب مخطط عرض: عدد محدد من الشرائح، لكل شريحة عنوان يعبر عن فكرة كاملة، وثلاث نقاط كحد أقصى، واقتراح لعنصر بصري، وملاحظات للمتحدث. بعض الأدوات تستطيع إنشاء ملف العرض مباشرة، لكن حتى لو أنشأته بنفسك، فالمخطط الجيد يوفر معظم الوقت.',
        ],
      },
      {
        heading: 'كيف تتحقق من النتائج؟',
        paragraphs: [],
        list: [
          'اختبر كل معادلة على عينة صغيرة تعرف نتيجتها.',
          'قارن المجاميع والأعداد بعد التنظيف بما قبله، لتتأكد أنك لم تحذف بيانات بالخطأ.',
          'راجع كل رقم أو اسم في التقارير والعروض مقابل المصدر.',
          'اطلب من الأداة أن تشرح طريقتها، فإن لم تستطع شرحها بوضوح فلا تعتمد النتيجة.',
        ],
      },
      {
        heading: "ابنِ مكتبة طلبات لفريقك",
        paragraphs: [
          "إذا كنت تعمل ضمن فريق، فلا تحتفظ بالطلبات الناجحة لنفسك. أنشئ مستندًا مشتركًا بسيطًا مقسمًا حسب نوع المهمة: الجداول، والتقارير، والرسائل، والعروض. لكل طلب اكتب: الغرض منه، والنص الكامل مع فراغات للأجزاء المتغيرة، ومثالًا على مخرجاته، وتنبيهًا بما يجب التحقق منه. بهذه الطريقة يستفيد الجميع، ويصبح أسلوب الفريق موحدًا، ويتعلم الأعضاء الجدد بسرعة.",
          "ومع الوقت ستلاحظ أن بعض المهام تتكرر بالشكل نفسه تمامًا، وهذه هي المرشحة للأتمتة الكاملة باستخدام أدوات مثل Power Automate أو سكربتات بسيطة، بدل كتابة الطلب يدويًا في كل مرة.",
        ],
      },
      {
        heading: 'الخلاصة',
        paragraphs: [
          'لا تحتاج إلى أن تصبح خبيرًا في الذكاء الاصطناعي لتستفيد منه في عملك المكتبي. اختر مهمة واحدة من هذه المهام الثماني، وجربها هذا الأسبوع، واحفظ الطلب الذي نجح معك. ومع الوقت ستبني مجموعة من الأدوات الصغيرة التي توفر عليك وقتًا حقيقيًا كل يوم، مع الحفاظ على دقة عملك وسرية بياناتك.',
        ],
      },
    ],
  },
  en: {
    title: 'AI for Everyday Office Work: Eight Spreadsheet, Document and Presentation Tasks to Start With Today',
    excerpt:
      'Instead of vague talk about “productivity”, here are eight specific Excel, Word and PowerPoint tasks AI can shorten, with a prompt for each, a way to verify the result, and rules to protect work data.',
    sections: [
      {
        paragraphs: [
          'Most office time does not go into big decisions but into small repeated tasks: cleaning a table, writing a formula, formatting a report, turning notes into slides. These are exactly where AI helps most, because they are clear and easy to verify.',
          'As a developer I look at these tasks with an automation mindset: what repeats, and what can be described in clear steps? Here are eight practical tasks with a sample prompt for each, to try with Claude, ChatGPT, Copilot or Gemini, whichever is available at your workplace.',
        ],
      },
      {
        heading: 'Before you start: sensitive data',
        paragraphs: [
          'Before uploading any work file, know your employer’s policy. Many companies allow only certain tools or enterprise versions that protect data. If unsure, replace real data with dummy data in the same structure: same columns and value types, fake names and numbers. You get the same formula or method and apply it to the real file yourself.',
        ],
      },
      {
        heading: '1. Writing a complex Excel formula',
        paragraphs: [
          'Describe what you want with column names and an expected result: “Column A has employee names, B departments, C sales, D dates. In one cell I want total marketing sales for Q1 only.” Ask for the formula with an explanation of each part, then test it on a few rows whose answer you already know.',
        ],
      },
      {
        heading: '2. Understanding an inherited formula',
        paragraphs: [
          'Paste the long formula someone else wrote and ask: “Explain this step by step in plain language. In which cases could it give a wrong result? Is there a simpler way to write it?” The last question matters: simpler formulas mean fewer future errors.',
        ],
      },
      {
        heading: '3. Cleaning data',
        paragraphs: [
          'Describe the problems: extra spaces, names written different ways, mixed date formats, duplicate rows. Ask for an ordered cleaning plan with the right function or tool for each step, such as TRIM, Power Query or Remove Duplicates. Always keep an untouched original and clean a copy.',
        ],
      },
      {
        heading: '4. Quick analysis and chart suggestions',
        paragraphs: [
          'Upload a table (or a dummy copy) and ask: “What are the three most important observations here, which chart best shows each, and why?” Then verify each observation with a pivot table. Sometimes the tool spots something you missed; sometimes it misread a column. Verification tells you which.',
        ],
      },
      {
        heading: '5. Meeting notes into minutes and tasks',
        paragraphs: [
          'Paste raw notes and ask: “Turn these into minutes with three sections: decisions, tasks with owner and due date, and open points. Do not add tasks that were not mentioned; if an owner or date is unclear, write ‘not specified’.” That last instruction prevents guessing and shows what to clarify with the team.',
        ],
      },
      {
        heading: '6. Restructuring a Word report',
        paragraphs: [
          'For a long, messy report, first ask for a structure only: main headings, subheadings, logical order and an executive summary up front. Approve or adjust it, then move content in section by section. Working in stages gives far more control than “improve this report” in one go.',
        ],
      },
      {
        heading: '7. Drafting difficult work emails',
        paragraphs: [
          'An apology for a delay, a polite refusal, a follow-up with a client who has gone quiet. Write the points and the tone you want, ask for a short and a detailed version, and edit the one closest to your style. Read it as the recipient before sending.',
        ],
      },
      {
        heading: '8. From document to presentation',
        paragraphs: [
          'Give the tool the document or its summary, define the audience, time slot and core message, and ask for a deck outline: a set number of slides, each with a title stating a complete idea, at most three bullets, a visual suggestion and speaker notes. Some tools can create the file directly, but even if you build it yourself, a good outline saves most of the time.',
        ],
      },
      {
        heading: 'How to verify results',
        paragraphs: [],
        list: [
          'Test every formula on a small sample with a known answer.',
          'Compare totals and counts before and after cleaning to make sure nothing was dropped.',
          'Check every number or name in reports and slides against the source.',
          'Ask the tool to explain its method; if it cannot explain it clearly, do not rely on the result.',
        ],
      },
      {
        heading: "Build a prompt library for your team",
        paragraphs: [
          "If you work in a team, do not keep successful prompts to yourself. Create a simple shared document organised by task type: spreadsheets, reports, emails, presentations. For each prompt write its purpose, the full text with blanks for the variable parts, a sample output, and a note on what to verify. Everyone benefits, the team’s style becomes consistent, and new members learn quickly.",
          "Over time some tasks will repeat in exactly the same form; those are candidates for full automation with tools like Power Automate or simple scripts instead of typing the prompt each time.",
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'You do not need to become an AI expert to benefit at work. Pick one of these eight tasks, try it this week, and save the prompt that worked. Over time you will build a set of small tools that save real time every day while keeping your work accurate and your data safe.',
        ],
      },
    ],
  },
}
