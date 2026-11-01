import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'ai-for-everyday-office-work',
  date: '2026-10-27',
  cover: '/blog/ai-for-everyday-office-work.png?v=3',
  coverLines: ['Claude for Excel,', 'Word & PowerPoint'],
  coverAlt: { ar: 'غلاف مقال Claude لأعمال Excel وWord وPowerPoint', en: 'Cover: Claude for Excel, Word and PowerPoint' },
  tags: ['Claude', 'Excel', 'Productivity'],
  ar: {
    title: 'Claude في Excel وWord وPowerPoint: ثمانية برومبتات توفر عليك ساعات المعادلات والتقارير والعروض كل أسبوع',
    excerpt:
      'معادلات Excel التي تبحث عنها نصف ساعة، وتقرير Word الذي لا يعرف من أين يبدأ، وعرض PowerPoint في الليلة الأخيرة. ثمانية برومبتات جاهزة تجعل Claude يبني الملف أو يشرحه أو يرتبه، مع طريقة للتحقق من النتيجة.',
    hook:
      'بنهاية هذا الدليل ستكون لديك ثمانية برومبتات جاهزة لأكثر مهام المكتب تكرارًا: بناء معادلة وشرحها، وتنظيف البيانات، وتحليلها برسوم، وتصميم جدول محوري، وإعادة هيكلة تقرير، ومحضر اجتماع، وعرض تقديمي كامل، مع عادة تحقق بسيطة تحميك من الأخطاء.',
    sections: [
      {
        paragraphs: [
          'أغلب وقت العمل المكتبي لا يذهب إلى التفكير، بل إلى أشياء ميكانيكية: تذكر صيغة معادلة، وتوحيد تنسيق تواريخ، وتحويل ملاحظات مبعثرة إلى تقرير، وتحويل تقرير إلى شرائح. هذه بالضبط المهام التي يتقنها Claude حين تعطيه سياقًا واضحًا.',
        ],
      },
      {
        heading: 'ما الذي يستطيع Claude فعله بالملفات اليوم؟',
        paragraphs: [
          'حسب مركز مساعدة Claude، يمكنه تنفيذ الكود لإنشاء ملفات Excel (.xlsx) وWord (.docx) وPowerPoint (.pptx) وPDF وتعديلها داخل المحادثة، بما في ذلك جداول بمعادلات تعمل ورسوم بيانية، ثم تنزيلها أو حفظها في Google Drive. الميزة متاحة لكل الخطط بما فيها المجانية، ويمكن تفعيلها من الإعدادات ضمن القدرات (Capabilities)، وحد حجم الملف 30 ميغابايت للرفع والتنزيل.',
          'وحسب صفحة الأسعار، تتوفر إضافات Claude داخل تطبيقات Microsoft 365 مثل Excel وWord وPowerPoint في الخطط المدفوعة. لكن كل البرومبتات التالية تعمل في المحادثة العادية أيضًا: ترفع الملف أو تلصق جزءًا منه، وتحصل على الملف الجديد أو المعادلة أو النص.',
          'قاعدة مهمة قبل البدء: لا ترفع بيانات سرية أو شخصية لعملائك أو جهة عملك دون إذن. استخدم عينة أو بيانات مجهولة الهوية عند الحاجة.',
        ],
      },
      {
        heading: 'البرومبتات الثمانية',
        paragraphs: [],
        prompts: [
          {
            title: 'باني المعادلات مع اختبار',
            when: 'حين تعرف ما تريد حسابه ولا تعرف المعادلة.',
            expect: 'معادلة جاهزة للصق، وشرح لكل جزء، ونسخة بديلة لإصدارات Excel الأقدم، وحالات اختبار تتحقق بها يدويًا.',
            text: `أنت خبير Excel. أعمدة جدولي:
[A: التاريخ، B: اسم الموظف، C: القسم، D: المبلغ ...]
البيانات من الصف 2 إلى [الصف الأخير]. إصدار Excel: [365 / 2019 / Google Sheets].

أريد معادلة في [الخلية] تحسب: [وصف دقيق، مثلًا: مجموع المبالغ لقسم المبيعات في الشهر المحدد في F1].

أعطني:
1. المعادلة جاهزة للصق.
2. شرح كل جزء في سطر.
3. بديل يعمل في الإصدارات الأقدم إن كانت المعادلة تعتمد على دوال حديثة.
4. 3 حالات اختبار صغيرة بقيم وهمية والنتيجة المتوقعة لكل منها.
5. الأخطاء المحتملة (خلايا فارغة، نص بدل رقم) وكيف أعالجها.`,
          },
          {
            title: 'شارح المعادلات المعقدة',
            when: 'حين ترث ملفًا من زميل فيه معادلات لا تفهمها.',
            expect: 'شرح خطوة بخطوة بلغة بسيطة، ومثال بالأرقام، ونقاط الضعف في المعادلة، ونسخة أبسط إن أمكن.',
            text: `اشرح لي هذه المعادلة كأنني أعرف أساسيات Excel فقط:
[الصق المعادلة]

سياقها: [ماذا يفترض أن تحسب، وما الأعمدة التي تشير إليها]

1. ماذا تفعل إجمالًا في جملة واحدة.
2. فككها من الداخل إلى الخارج خطوة بخطوة.
3. مثال بالأرقام يوضح كيف تصل إلى النتيجة.
4. هل فيها مخاطر (مراجع ثابتة خاطئة، نطاقات لا تتوسع، أخطاء مخفية بـ IFERROR)؟
5. اقترح نسخة أبسط أو أوضح إن وجدت، واشرح الفرق.`,
          },
          {
            title: 'خطة تنظيف البيانات',
            when: 'قبل أي تحليل لبيانات مستوردة أو مجمعة من أكثر من مصدر.',
            expect: 'قائمة بمشكلات البيانات المكتشفة، وخطة تنظيف مرتبة، وملف منظف إن رفعت الملف وكانت ميزة إنشاء الملفات مفعلة، مع سجل بكل تغيير.',
            text: `أرفقت ملف [اسم الملف] (أو هذه عينة من 20 صفًا: [الصق]).
الغرض من البيانات: [مثلًا: تقرير مبيعات شهري].

1. افحص البيانات واذكر كل المشكلات: تكرارات، وقيم مفقودة، وتنسيقات تواريخ وأرقام مختلفة، ومسافات زائدة، وأسماء مكتوبة بأكثر من شكل، وقيم شاذة.
2. اقترح خطة تنظيف مرتبة، وما القرار المطلوب مني في كل حالة غامضة.
3. لا تحذف أي صف قبل أن توضح لي السبب والعدد.
4. بعد موافقتي: أنشئ ملفًا منظفًا وورقة "سجل التغييرات" توثق كل تعديل.`,
          },
          {
            title: 'تحليل مع رسوم واستنتاجات',
            when: 'حين تحتاج أن تفهم ما تقوله البيانات وتعرضه على مديرك.',
            expect: 'أسئلة تحليل مقترحة أولًا، ثم أرقام ورسوم مع تفسير، وتمييز واضح بين ما تثبته البيانات وما هو مجرد احتمال.',
            text: `أرفقت بيانات [الوصف]. جمهور التحليل: [مدير القسم / فريق المبيعات].
القرار الذي يجب أن يدعمه التحليل: [...]

1. اقترح 5 أسئلة تحليل مفيدة لهذا القرار، وانتظر اختياري.
2. بعد الاختيار: احسب النتائج، وأنشئ رسمًا مناسبًا لكل سؤال مع سبب اختيار نوع الرسم.
3. اكتب 3 إلى 5 استنتاجات، وميّز لكل منها: هل تثبته البيانات أم هو تفسير محتمل يحتاج تحقق؟
4. اذكر حدود البيانات (فترة قصيرة، عينة صغيرة، بيانات ناقصة).
5. ضع كل ذلك في ملف Excel بورقة للبيانات وورقة للملخص والرسوم.`,
          },
          {
            title: 'مصمم الجداول المحورية ولوحة الملخص',
            when: 'حين تريد تقريرًا متكررًا يتحدث تلقائيًا كل شهر.',
            expect: 'تصميم واضح للحقول (الصفوف والأعمدة والقيم والفلاتر) وخطوات إنشائه يدويًا، أو ملف جاهز إن طلبته.',
            text: `أعمدة بياناتي: [...]. التقرير الذي أحتاجه كل [أسبوع/شهر]: [وصف].

1. صمم جدولًا محوريًا أو أكثر: ما الحقول في الصفوف والأعمدة والقيم والفلاتر، ونوع التجميع (مجموع، متوسط، عدد).
2. اكتب خطوات إنشائه في Excel بالترتيب.
3. اقترح كيف أجعل البيانات تتحدث تلقائيًا (تحويلها إلى Table، ونطاق ديناميكي).
4. اقترح لوحة ملخص من 3 إلى 4 مؤشرات ورسمين.
5. إن رفعت الملف: أنشئ نسخة فيها هذا التصميم جاهزًا.`,
          },
          {
            title: 'إعادة هيكلة تقرير Word',
            when: 'حين لديك مسودة طويلة أو ملاحظات مبعثرة وتحتاج تقريرًا رسميًا.',
            expect: 'هيكل مقترح للموافقة أولًا، ثم تقرير منظم بعناوين وملخص تنفيذي، مع قائمة بالمعلومات الناقصة بدل حشوها.',
            text: `أرفقت مسودة/ملاحظات تقرير عن [الموضوع]. القارئ: [الإدارة العليا / عميل / أستاذ].
الهدف من التقرير: [إقناع بقرار / توثيق / عرض نتائج].

1. اقترح هيكلًا بالعناوين قبل الكتابة وانتظر موافقتي.
2. بعد الموافقة: اكتب ملخصًا تنفيذيًا من 5 أسطر في البداية، ثم الأقسام.
3. حافظ على كل المعلومات والأرقام كما هي، ولا تضف معلومات من عندك.
4. ضع قائمة في النهاية: "معلومات ناقصة أحتاجها منك".
5. أنشئ ملف Word بتنسيق رسمي: عناوين بمستويات، وجداول عند الحاجة، وترقيم صفحات.`,
          },
          {
            title: 'من ملاحظات الاجتماع إلى محضر ومهام',
            when: 'بعد أي اجتماع، خلال دقائق من انتهائه.',
            expect: 'محضر مختصر فيه القرارات والمهام بمسؤول وموعد، وأسئلة مفتوحة، ورسالة متابعة جاهزة، مع تمييز ما لم يُذكر صاحبه.',
            text: `هذه ملاحظاتي الخام من اجتماع [الموضوع] بتاريخ [...]، والحضور: [...]:
[الصق الملاحظات]

أنشئ:
1. ملخص في 3 أسطر.
2. القرارات المتخذة.
3. جدول مهام: المهمة | المسؤول | الموعد. إذا لم يُذكر المسؤول أو الموعد اكتب "غير محدد" ولا تخمّن.
4. أسئلة مفتوحة تحتاج متابعة.
5. رسالة بريد قصيرة للحضور تلخص كل ذلك بنبرة مهنية.`,
          },
          {
            title: 'عرض PowerPoint من مستند',
            when: 'حين يكون لديك تقرير وتحتاج عرضًا تقديميًا منه بسرعة.',
            expect: 'مخطط شرائح بعنوان يحمل الرسالة لكل شريحة، وملاحظات للمتحدث، ثم ملف عرض قابل للتنزيل والتعديل.',
            text: `أرفقت [التقرير/المستند]. سأقدّمه لـ [الجمهور] في [المدة] دقيقة.
الرسالة الأساسية التي أريد أن يخرجوا بها: [...]

1. اقترح مخططًا من [عدد] شرائح: لكل شريحة عنوان على شكل رسالة (جملة تقول الاستنتاج، لا مجرد موضوع)، و3 نقاط كحد أقصى، واقتراح رسم أو صورة.
2. انتظر موافقتي على المخطط.
3. بعدها أنشئ ملف PowerPoint بتصميم بسيط ومتسق، وأضف ملاحظات المتحدث لكل شريحة.
4. استخدم الأرقام من المستند فقط، وأضف شريحة أخيرة بالخطوات التالية المطلوبة.`,
          },
        ],
      },
      {
        heading: 'عادة التحقق: لا تسلّم دون هذه الخطوات',
        paragraphs: [
          'Claude يخطئ أحيانًا، خاصة في نطاقات الخلايا والأرقام. قبل إرسال أي ملف: جرّب المعادلة على صفوف تعرف نتيجتها، وقارن مجموعًا واحدًا على الأقل يدويًا، واقرأ التقرير كاملًا بنفسك.',
        ],
        list: [
          '"راجع الملف الذي أنشأته: هل هناك معادلات تشير إلى نطاقات خاطئة أو خلايا فارغة؟"',
          '"أعطني ثلاثة أرقام من الملخص وكيف أتحقق منها يدويًا."',
          '"اجعل التقرير أقصر بـ 30% دون حذف أي رقم أو قرار."',
          '"حوّل هذا التحليل إلى رسالة بريد من 120 كلمة لمديري."',
        ],
      },
      {
        heading: 'أخطاء شائعة',
        paragraphs: [],
        list: [
          'وصف الجدول بشكل غامض؛ اذكر أسماء الأعمدة ونطاق الصفوف والإصدار دائمًا.',
          'رفع بيانات سرية دون إذن جهة العمل.',
          'قبول الاستنتاجات كحقائق دون التمييز بين ما تثبته البيانات وما هو تفسير.',
          'طلب العرض التقديمي مباشرة دون الموافقة على المخطط أولًا.',
          'نسخ المعادلة دون اختبارها على حالات معروفة.',
        ],
      },
      {
        heading: 'قائمة سير العمل السريعة',
        paragraphs: [],
        list: [
          'فعّل إنشاء الملفات وتعديلها من إعدادات Claude.',
          'نظّف البيانات أولًا (3) ثم حلّل (4) وصمم الملخص (5).',
          'للمعادلات: ابنِ (1) أو اشرح (2) ثم اختبر.',
          'حوّل الملاحظات إلى تقرير (6) أو محضر (7).',
          'حوّل التقرير إلى عرض (8) بعد الموافقة على المخطط.',
          'طبّق عادة التحقق قبل الإرسال.',
        ],
      },
    ],
  },
  en: {
    title: 'Claude in Excel, Word and PowerPoint: Eight Prompts That Save You Hours of Formulas, Reports and Slides Every Week',
    excerpt:
      'The Excel formula you hunt for half an hour, the Word report you cannot start, the deck you build the night before. Eight ready prompts that make Claude build, explain or organise the file, plus a way to verify the result.',
    hook:
      'By the end of this guide you will have eight ready prompts for the most repetitive office tasks: building and explaining formulas, cleaning data, analysing it with charts, designing a pivot table, restructuring a report, writing meeting minutes and producing a full deck, plus a simple verification habit that protects you from errors.',
    sections: [
      {
        paragraphs: [
          'Most office time does not go into thinking but into mechanical work: remembering a formula, unifying date formats, turning scattered notes into a report, turning a report into slides. These are exactly the tasks Claude handles well when you give it clear context.',
        ],
      },
      {
        heading: 'What can Claude do with files today?',
        paragraphs: [
          'According to the Claude Help Center, Claude can run code to create and edit Excel (.xlsx), Word (.docx), PowerPoint (.pptx) and PDF files in the conversation, including spreadsheets with working formulas and charts, which you can download or save to Google Drive. It is available on all plans including Free, can be turned on in Settings under Capabilities, and the file size limit is 30 MB for uploads and downloads.',
          'According to the pricing page, the Claude add-ins inside Microsoft 365 apps such as Excel, Word and PowerPoint are on paid plans. Every prompt below also works in a normal chat: upload the file or paste part of it, and get back the new file, formula or text.',
          'One rule before you start: do not upload confidential or personal data from your clients or employer without permission. Use a sample or anonymised data when needed.',
        ],
      },
      {
        heading: 'The eight prompts',
        paragraphs: [],
        prompts: [
          {
            title: 'Formula builder with tests',
            when: 'When you know what to calculate but not the formula.',
            expect: 'A paste-ready formula, a one-line explanation per part, an alternative for older Excel versions, and test cases you can check by hand.',
            text: `You are an Excel expert. My table columns:
[A: date, B: employee name, C: department, D: amount ...]
Data runs from row 2 to [last row]. Version: [Excel 365 / 2019 / Google Sheets].

I need a formula in [cell] that calculates: [precise description, e.g. the sum of amounts for Sales in the month given in F1].

Give me:
1. The formula, ready to paste.
2. A one-line explanation of each part.
3. An alternative for older versions if it relies on newer functions.
4. 3 small test cases with dummy values and the expected result for each.
5. Likely errors (blank cells, text instead of numbers) and how to handle them.`,
          },
          {
            title: 'Complex formula explainer',
            when: 'When you inherit a file with formulas you do not understand.',
            expect: 'A plain-language step-by-step breakdown, a worked numeric example, weak spots in the formula and a simpler version where possible.',
            text: `Explain this formula as if I only know Excel basics:
[paste formula]

Context: [what it should calculate and which columns it references]

1. What it does overall, in one sentence.
2. Break it down from the inside out, step by step.
3. A numeric example showing how it reaches the result.
4. Any risks (wrong absolute references, ranges that do not expand, errors hidden by IFERROR)?
5. Suggest a simpler or clearer version if one exists, and explain the difference.`,
          },
          {
            title: 'Data cleaning plan',
            when: 'Before any analysis of imported data or data combined from several sources.',
            expect: 'A list of detected data issues, an ordered cleaning plan, and, if you upload the file with file creation on, a cleaned file with a log of every change.',
            text: `I attached [file name] (or here is a 20-row sample: [paste]).
Purpose of the data: [e.g. a monthly sales report].

1. Inspect the data and list every issue: duplicates, missing values, inconsistent date and number formats, extra spaces, names written several ways, outliers.
2. Propose an ordered cleaning plan and the decision you need from me for each ambiguous case.
3. Do not delete any row before telling me why and how many.
4. After I approve: create a cleaned file plus a "Change log" sheet documenting every edit.`,
          },
          {
            title: 'Analysis with charts and conclusions',
            when: 'When you need to understand what the data says and present it to your manager.',
            expect: 'Suggested analysis questions first, then numbers and charts with interpretation, clearly separating what the data proves from what is only plausible.',
            text: `I attached data about [description]. Audience: [department head / sales team].
The decision this analysis should support: [...]

1. Suggest 5 useful analysis questions for this decision, then wait for my choice.
2. After I choose: compute the results and create a suitable chart for each question, explaining the chart type.
3. Write 3-5 conclusions and mark each one: proven by the data, or a possible explanation that needs checking?
4. State the data's limits (short period, small sample, missing data).
5. Put it all in an Excel file with a data sheet and a summary-and-charts sheet.`,
          },
          {
            title: 'Pivot table and summary dashboard designer',
            when: 'When you want a recurring report that updates itself every month.',
            expect: 'A clear field design (rows, columns, values, filters) with manual steps to build it, or a ready file if you ask.',
            text: `My data columns: [...]. The report I need every [week/month]: [description].

1. Design one or more pivot tables: which fields go in rows, columns, values and filters, and the aggregation (sum, average, count).
2. Write the steps to build it in Excel, in order.
3. Suggest how to make the data update automatically (convert to a Table, dynamic range).
4. Suggest a summary dashboard with 3-4 KPIs and two charts.
5. If I upload the file: create a copy with this design built in.`,
          },
          {
            title: 'Restructure a Word report',
            when: 'When you have a long draft or scattered notes and need a formal report.',
            expect: 'A proposed structure for approval first, then an organised report with headings and an executive summary, plus a list of missing information instead of filler.',
            text: `I attached a draft/notes for a report on [topic]. Reader: [senior management / a client / a professor].
Goal of the report: [persuade toward a decision / document / present results].

1. Propose a heading structure before writing and wait for my approval.
2. After approval: write a 5-line executive summary at the top, then the sections.
3. Keep all information and numbers as they are, and add nothing of your own.
4. End with a list: "Missing information I need from you".
5. Create a Word file with formal formatting: heading levels, tables where useful, page numbers.`,
          },
          {
            title: 'From meeting notes to minutes and tasks',
            when: 'After any meeting, within minutes of it ending.',
            expect: 'Short minutes with decisions and tasks with an owner and due date, open questions and a ready follow-up email, marking anything without a named owner.',
            text: `These are my raw notes from a meeting on [topic] on [date]. Attendees: [...]:
[paste notes]

Create:
1. A 3-line summary.
2. Decisions made.
3. A task table: task | owner | due date. If the owner or date was not stated, write "not set" and do not guess.
4. Open questions that need follow-up.
5. A short professional email to the attendees summarising all of this.`,
          },
          {
            title: 'PowerPoint deck from a document',
            when: 'When you have a report and need a presentation from it fast.',
            expect: 'A slide outline where each title carries the message, speaker notes, then a downloadable, editable deck file.',
            text: `I attached [report/document]. I will present it to [audience] in [length] minutes.
The key message I want them to leave with: [...]

1. Propose an outline of [number] slides: each with an action title (a sentence stating the takeaway, not just a topic), at most 3 bullets, and a suggested chart or image.
2. Wait for my approval of the outline.
3. Then create a PowerPoint file with a simple, consistent design and speaker notes on every slide.
4. Use numbers from the document only, and add a final slide with the next steps required.`,
          },
        ],
      },
      {
        heading: 'The verification habit: never deliver without it',
        paragraphs: [
          'Claude sometimes makes mistakes, especially with cell ranges and numbers. Before sending any file, test the formula on rows whose answer you know, check at least one total by hand, and read the whole report yourself.',
        ],
        list: [
          '"Review the file you created: do any formulas reference wrong ranges or blank cells?"',
          '"Give me three numbers from the summary and how to verify each by hand."',
          '"Make the report 30% shorter without removing any number or decision."',
          '"Turn this analysis into a 120-word email to my manager."',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [],
        list: [
          'Describing the table vaguely; always give column names, row range and version.',
          'Uploading confidential data without your employer’s permission.',
          'Treating conclusions as facts without separating what the data proves from interpretation.',
          'Asking for the deck directly without approving the outline first.',
          'Copying a formula without testing it on known cases.',
        ],
      },
      {
        heading: 'Quick workflow checklist',
        paragraphs: [],
        list: [
          'Turn on file creation and editing in Claude’s settings.',
          'Clean the data first (3), then analyse (4) and design the summary (5).',
          'For formulas: build (1) or explain (2), then test.',
          'Turn notes into a report (6) or minutes (7).',
          'Turn the report into a deck (8) after approving the outline.',
          'Apply the verification habit before sending.',
        ],
      },
    ],
  },
}
