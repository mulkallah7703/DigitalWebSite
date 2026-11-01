import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'ai-research-assistant-workflow',
  date: '2026-10-30',
  cover: '/blog/ai-research-assistant-workflow.png?v=3',
  coverLines: ['Claude for', 'Academic Research'],
  coverAlt: { ar: 'غلاف مقال Claude في البحث العلمي', en: 'Cover: Claude for academic research' },
  tags: ['Research', 'Claude', 'Prompts'],
  ar: {
    title: 'Claude في البحث العلمي: ثمانية برومبتات تحوّل عشرات الأوراق إلى مصفوفة مراجعة وفجوات بحثية جاهزة',
    excerpt:
      'سير عمل بحثي كامل مع Claude: من بناء استراتيجية البحث، إلى تشريح كل ورقة، وبناء مصفوفة المراجعة الأدبية، واكتشاف الفجوات، ونقد المنهج، مع ثمانية برومبتات دقيقة تمنع الاختلاق.',
    hook:
      'ستخرج من هذا الدليل بسير عمل يحوّل مجموعة أوراق بحثية إلى مصفوفة مقارنة منظمة وقائمة فجوات وأسئلة بحث مقترحة، مع برومبتات تُلزم Claude بالاستشهاد بالصفحة وتمنعه من اختراع المراجع.',
    sections: [
      {
        paragraphs: [
          'اهتمامي بتوظيف الذكاء الاصطناعي في الرعاية الصحية والتعليم يعني قراءة كثير من الأبحاث، والجزء الأصعب دائمًا ليس العثور على الأوراق، بل تنظيمها: ماذا تقول كل ورقة؟ أين تتفق وأين تختلف؟ وما الذي لم يدرسه أحد بعد؟ هنا يصبح Claude مساعدًا قويًا جدًا، بشرط واحد: أن تعطيه الأوراق بنفسك، وأن تُلزمه بالاستشهاد بمواضعها.',
          'القاعدة التي أبني عليها كل البرومبتات التالية: Claude يقرأ وينظم ويحلل ما ترفعه، لكنه ليس قاعدة بيانات للمراجع. لا تطلب منه قائمة مصادر من ذاكرته، لأنه قد يولد عناوين ومؤلفين غير موجودين.',
        ],
      },
      {
        heading: 'الإعداد: Project واحد لكل مراجعة',
        paragraphs: [
          'أنشئ Project في Claude باسم موضوع المراجعة، وارفع إليه الأوراق بصيغة PDF، وضع في تعليمات المشروع: سؤالك البحثي، ومعايير الإدراج والاستبعاد، وقاعدة "استشهد بالملف والصفحة بعد كل معلومة، ولا تستخدم معرفة خارجية دون أن تنبهني". بهذا لا تعيد الشرح في كل محادثة، وتبقى كل التحليلات مبنية على المصادر نفسها.',
        ],
      },
      {
        heading: 'البرومبتات الثمانية',
        paragraphs: [],
        prompts: [
          {
            title: 'باني استراتيجية البحث في قواعد البيانات',
            when: 'قبل أن تجمع أي ورقة، لتبحث في Google Scholar أو PubMed أو IEEE Xplore بكلمات دقيقة بدل التخمين.',
            expect: 'مفاهيم سؤالك، ومرادفات لكل مفهوم، وجمل بحث منطقية جاهزة (AND/OR) لكل قاعدة، مع اقتراحات لتضييق النتائج. النتائج نفسها تأتي من القاعدة لا من Claude.',
            text: `أنت أمين مكتبة بحثي متخصص في [المجال].

سؤالي البحثي: [السؤال]
الفترة الزمنية: [مثلًا: آخر 5 سنوات]
اللغة: [العربية/الإنجليزية]

المطلوب:
1. قسّم السؤال إلى مفاهيم رئيسية (2 إلى 4 مفاهيم).
2. لكل مفهوم: المرادفات والمصطلحات الإنجليزية والاختصارات الشائعة.
3. اكتب جملة بحث منطقية باستخدام AND وOR وعلامات التنصيص، مكيفة لكل من: Google Scholar وPubMed و[قاعدة أخرى].
4. اقترح 3 طرق لتضييق النتائج إن كانت كثيرة، و3 طرق لتوسيعها إن كانت قليلة.

لا تقترح أي أوراق أو مراجع بعينها؛ أريد استراتيجية البحث فقط.`,
          },
          {
            title: 'مشرّح الورقة الواحدة',
            when: 'عند قراءة كل ورقة مهمة، لتحصل على استخراج موحد بدل ملخص عام.',
            expect: 'بطاقة منظمة للورقة: السؤال، والمنهج، والعينة، والنتائج، والقيود، مع رقم الصفحة لكل بند، وتمييز ما لم تذكره الورقة.',
            text: `اقرأ الورقة المرفقة [اسم الملف] واستخرج بطاقة بهذا الشكل بالضبط:

- المرجع: العنوان، والمؤلفون، والسنة كما هي في الورقة.
- سؤال الدراسة وهدفها.
- نوع الدراسة والمنهج.
- العينة: الحجم، والخصائص، ومكان جمع البيانات.
- الأدوات والمقاييس المستخدمة.
- أهم النتائج بالأرقام كما وردت.
- القيود التي ذكرها المؤلفون.
- قيود إضافية تلاحظها أنت (اكتبها في بند منفصل باسم "ملاحظات المراجع").

بعد كل بند اكتب (ص [رقم]). إذا لم تذكر الورقة شيئًا فاكتب "غير مذكور". لا تكمل الفراغات من معرفتك العامة.`,
          },
          {
            title: 'مصفوفة المراجعة الأدبية',
            when: 'بعد رفع 5 أوراق أو أكثر، لتحويلها إلى جدول مقارنة هو قلب أي مراجعة أدبية.',
            expect: 'جدول بصف لكل ورقة وأعمدة ثابتة، ثم تحليل للاتجاهات والتناقضات. انتبه: مع عدد كبير من الأوراق قسّمها على دفعات.',
            text: `أنشئ مصفوفة مراجعة أدبية للأوراق المرفوعة في هذا المشروع.

الأعمدة: المرجع (مؤلف، سنة) | البلد/السياق | المنهج | حجم العينة | المتغيرات | النتيجة الرئيسية | القيد الأهم.

بعد الجدول:
1. ثلاثة اتجاهات تتكرر في الأوراق، مع ذكر الأوراق الداعمة لكل اتجاه.
2. أي تناقض بين النتائج، وتفسيرات محتملة له (اختلاف العينة، أو المنهج، أو السياق).
3. المناهج الغالبة والمناهج الغائبة.

استشهد بـ (المؤلف، السنة، ص) لكل ادعاء. إذا كان عدد الأوراق كبيرًا، ابدأ بأول [5] أوراق وانتظر أمري للمتابعة.`,
          },
          {
            title: 'كاشف الفجوات وصانع أسئلة البحث',
            when: 'بعد بناء المصفوفة، عندما تبحث عن مساهمة أصيلة لبحثك أو رسالتك.',
            expect: 'فجوات مصنفة (سياق، منهج، فئة، متغير) مع الدليل من المصفوفة، ثم أسئلة بحث قابلة للتنفيذ لكل فجوة.',
            text: `اعتمادًا على مصفوفة المراجعة السابقة فقط:

1. حدد الفجوات البحثية وصنفها إلى: فجوة سياق (بلد أو بيئة لم تُدرس)، وفجوة فئة، وفجوة منهج، وفجوة متغير أو نتيجة.
2. لكل فجوة: الدليل من المصفوفة (أي الأوراق ولماذا).
3. اقترح لكل فجوة سؤال بحث واحدًا بصياغة دقيقة، مع المنهج المناسب لدراسته.
4. قيّم كل سؤال من حيث: الأصالة، وقابلية التنفيذ لطالب [بكالوريوس/ماجستير] خلال [المدة]، والموارد المطلوبة.

نبّهني صراحة إذا كانت الفجوة قد تكون مدروسة في أوراق لم أرفعها، واقترح كيف أتحقق من ذلك.`,
          },
          {
            title: 'ناقد المنهجية',
            when: 'عندما تريد أن تعرف هل نتائج ورقة ما موثوقة فعلًا قبل أن تبني عليها.',
            expect: 'تقييم منظم للصدق الداخلي والخارجي والتحيزات المحتملة، مع درجة ثقة إجمالية وأسباب واضحة.',
            text: `تصرف كمحكّم علمي متخصص في مناهج البحث في [المجال].

قيّم منهجية الورقة [اسم الملف] من حيث:
1. ملاءمة التصميم لسؤال البحث.
2. العينة: الحجم، وطريقة الاختيار، وإمكانية التعميم.
3. الصدق الداخلي: المتغيرات الدخيلة، والتحيزات المحتملة.
4. أدوات القياس: هل ذكرت الورقة صدقها وثباتها؟
5. التحليل الإحصائي: هل يناسب البيانات؟ وهل النتائج المعلنة تدعمها الأرقام؟
6. تضارب المصالح والتمويل إن ذُكر.

في النهاية: درجة ثقة (عالية/متوسطة/منخفضة) مع ثلاثة أسباب، وما الذي يجب أن أذكره كقيد إذا استشهدت بهذه الورقة. استشهد بالصفحة لكل ملاحظة.`,
          },
          {
            title: 'المشرف الذي يشرح الإحصاء والمنهج',
            when: 'عندما تواجه في ورقة اختبارًا إحصائيًا أو مصطلحًا منهجيًا لا تفهمه.',
            expect: 'شرح متدرج بلغة بسيطة، مرتبط بالأرقام الموجودة في الورقة نفسها، مع سؤال للتأكد من فهمك.',
            text: `أنا طالب [المستوى] في [التخصص]. في الورقة [اسم الملف] صفحة [رقم] ورد: "[الصق الجملة أو الجدول]".

اشرح لي:
1. ما هذا الاختبار أو المفهوم ولماذا استُخدم هنا تحديدًا؟
2. ماذا تعني الأرقام المذكورة في هذه الحالة بلغة بسيطة؟
3. ما الذي لا تعنيه هذه النتيجة (أخطاء التفسير الشائعة)؟
4. مثال من الحياة اليومية يقرّب الفكرة.

ثم اسألني سؤالًا واحدًا لتتأكد أنني فهمت.`,
          },
          {
            title: 'محوّل المصفوفة إلى مسودة مراجعة',
            when: 'بعد أن تكتب أنت أفكارك الرئيسية، وتحتاج مسودة فقرات مرتبة حسب المحاور لا حسب الأوراق.',
            expect: 'فقرات منظمة حسب المحاور تربط بين الدراسات، بالاستشهادات من المصفوفة فقط. هي مسودة تعيد صياغتها بصوتك.',
            text: `اكتب مسودة قسم المراجعة الأدبية اعتمادًا على المصفوفة السابقة وعلى محاوري التالية:
<outline>
المحور 1: [...]
المحور 2: [...]
المحور 3: [...]
رأيي في الأدبيات: [اكتب استنتاجك أنت]
</outline>

قواعد:
- رتّب حسب المحاور لا حسب الأوراق، واربط بين الدراسات (تتفق مع، تختلف عن، تمتد إلى).
- استشهد فقط بالأوراق الموجودة في المصفوفة بصيغة (المؤلف، السنة).
- لا تضف أي دراسة أو رقم غير موجود في المصفوفة.
- اختم كل محور بجملة تمهد للفجوة التي يعالجها بحثي.
- الطول: [عدد] كلمة تقريبًا، بأسلوب أكاديمي واضح.`,
          },
          {
            title: 'المحكّم الثاني لمسودتك',
            when: 'قبل تسليم مسودتك للمشرف أو المجلة.',
            expect: 'ملاحظات كما يكتبها محكّم صارم: مشكلات جوهرية وثانوية، وأسئلة، وقرار مقترح. استخدمها لتتوقع النقد قبل وقوعه.',
            text: `تصرف كمحكّم صارم في مجلة محكمة في [المجال]. هذه مسودتي:
<draft>
[الصق المسودة أو ارفعها]
</draft>

اكتب تقرير تحكيم يتضمن:
1. ملخص لما تدعيه الورقة في 3 أسطر (لأتأكد أن رسالتي واضحة).
2. مشكلات جوهرية (المنطق، والمنهج، والأدلة) مرقمة.
3. مشكلات ثانوية (الوضوح، والتنظيم، واللغة).
4. ادعاءات تحتاج دليلًا أو مرجعًا.
5. القرار المقترح (قبول، أو تعديل بسيط، أو تعديل جوهري، أو رفض) مع السبب.

كن محددًا: اذكر الفقرة أو السطر لكل ملاحظة.`,
          },
        ],
      },
      {
        heading: 'رسائل متابعة ترفع الجودة',
        paragraphs: [],
        list: [
          '"تحقق من كل استشهاد في إجابتك السابقة: هل الصفحة المذكورة تحتوي المعلومة فعلًا؟ صحّح أي خطأ."',
          '"ما النقاط في تحليلك التي اعتمدت فيها على معرفة عامة لا على الملفات؟"',
          '"أعد بناء الجدول مع إضافة عمود [المتغير الذي تحتاجه]."',
          '"لخّص الفجوة الأهم في فقرة واحدة أستطيع عرضها على مشرفي."',
        ],
      },
      {
        heading: 'أخطاء شائعة',
        paragraphs: [],
        list: [
          'طلب مراجع من ذاكرة Claude بدل البحث في قواعد البيانات.',
          'رفع عدد كبير جدًا من الأوراق في رسالة واحدة وطلب "تحليل شامل".',
          'الاستشهاد بورقة بناء على ملخص Claude دون فتحها والتأكد.',
          'نسخ المسودة كما هي؛ يجب أن يكون التفسير والصياغة النهائية بصوتك.',
          'رفع بيانات مشاركين أو مرضى إلى أدوات عامة، ومخالفة سياسة الجامعة أو المجلة في استخدام الذكاء الاصطناعي.',
        ],
      },
      {
        heading: 'قائمة سير العمل السريعة',
        paragraphs: [],
        list: [
          'استراتيجية البحث (البرومبت 1) ثم البحث بنفسك في قواعد البيانات.',
          'Project للمراجعة يحتوي السؤال والمعايير وقاعدة الاستشهاد.',
          'بطاقة لكل ورقة (2)، ثم المصفوفة (3)، ثم الفجوات (4).',
          'نقد المنهج للأوراق الأساسية (5)، وشرح أي مفهوم غامض (6).',
          'اكتب محاورك ورأيك، ثم المسودة (7)، ثم التحكيم (8).',
          'تحقق يدوي من كل استشهاد، وإفصاح عن استخدام الذكاء الاصطناعي إن طُلب.',
        ],
      },
    ],
  },
  en: {
    title: 'Claude for Academic Research: Eight Prompts That Turn Dozens of Papers into a Review Matrix and Clear Research Gaps',
    excerpt:
      'A complete research workflow with Claude: building a search strategy, dissecting each paper, building the literature matrix, finding gaps and critiquing methods, with eight precise prompts that prevent fabrication.',
    hook:
      'You will leave with a workflow that turns a set of papers into an organised comparison matrix, a list of gaps and proposed research questions, using prompts that force Claude to cite the page and stop it from inventing references.',
    sections: [
      {
        paragraphs: [
          'My interest in AI for healthcare and education means reading a lot of research, and the hardest part is never finding papers but organising them: what does each say, where do they agree or disagree, and what has nobody studied yet? Claude is a very strong assistant here, on one condition: you give it the papers yourself and force it to cite where each point comes from.',
          'The rule behind every prompt below: Claude reads, organises and analyses what you upload, but it is not a reference database. Never ask it for sources from memory; it may produce titles and authors that do not exist.',
        ],
      },
      {
        heading: 'Setup: one Project per review',
        paragraphs: [
          'Create a Claude Project named after your review topic, upload the papers as PDFs, and put in the project instructions: your research question, inclusion and exclusion criteria, and the rule “cite the file and page after every point, and flag any outside knowledge”. You stop re-explaining in every chat, and every analysis stays grounded in the same sources.',
        ],
      },
      {
        heading: 'The eight prompts',
        paragraphs: [],
        prompts: [
          {
            title: 'Database search strategy builder',
            when: 'Before collecting any paper, so you search Google Scholar, PubMed or IEEE Xplore with precise terms instead of guessing.',
            expect: 'Your question’s concepts, synonyms for each, and ready boolean strings (AND/OR) per database, plus ways to narrow or widen. The results themselves come from the database, not from Claude.',
            text: `You are a research librarian specialising in [field].

My research question: [question]
Time range: [e.g. last 5 years]
Language: [language]

Deliver:
1. Split the question into 2-4 key concepts.
2. For each concept: synonyms, related terms and common abbreviations.
3. A boolean search string using AND, OR and quotation marks, adapted for Google Scholar, PubMed and [another database].
4. Three ways to narrow results if there are too many, and three ways to widen them if there are too few.

Do not suggest specific papers or references; I want the search strategy only.`,
          },
          {
            title: 'Single-paper dissector',
            when: 'For every important paper, to get a consistent extraction instead of a generic summary.',
            expect: 'A structured card: question, method, sample, findings and limitations, with a page number for each item and clear gaps where the paper says nothing.',
            text: `Read the attached paper [file name] and extract a card in exactly this format:

- Reference: title, authors, year as printed in the paper.
- Study question and aim.
- Study type and method.
- Sample: size, characteristics, where data was collected.
- Instruments and measures used.
- Key findings with numbers as reported.
- Limitations stated by the authors.
- Additional limitations you notice (in a separate item called "Reviewer notes").

After each item write (p. [number]). If the paper does not say something, write "not reported". Do not fill gaps from general knowledge.`,
          },
          {
            title: 'Literature review matrix',
            when: 'After uploading five or more papers, to build the comparison table at the heart of any literature review.',
            expect: 'A table with a row per paper and fixed columns, then an analysis of trends and contradictions. With many papers, work in batches.',
            text: `Build a literature review matrix for the papers uploaded to this project.

Columns: Reference (author, year) | Country/context | Method | Sample size | Variables | Main finding | Key limitation.

After the table:
1. Three recurring trends, naming the supporting papers for each.
2. Any contradictions between findings, with possible explanations (sample, method or context differences).
3. Dominant methods and missing methods.

Cite (author, year, p.) for every claim. If there are many papers, start with the first [5] and wait for my go-ahead.`,
          },
          {
            title: 'Gap finder and research question generator',
            when: 'After building the matrix, when you are looking for an original contribution for your project or thesis.',
            expect: 'Gaps classified by context, population, method and variable, with evidence from the matrix, then actionable research questions for each.',
            text: `Using only the review matrix above:

1. Identify research gaps and classify them as: context gap (country or setting not studied), population gap, method gap, variable or outcome gap.
2. For each gap: the evidence from the matrix (which papers and why).
3. For each gap, propose one precisely worded research question and a suitable method.
4. Rate each question for originality, feasibility for a [bachelor's/master's] student within [time frame], and required resources.

Warn me explicitly if a gap may be covered by papers I have not uploaded, and suggest how to check.`,
          },
          {
            title: 'Methodology critic',
            when: 'When you need to know whether a paper’s results are trustworthy before building on them.',
            expect: 'A structured assessment of internal and external validity and possible biases, with an overall confidence rating and clear reasons.',
            text: `Act as a peer reviewer specialising in research methods in [field].

Assess the methodology of [file name] for:
1. Fit between design and research question.
2. Sample: size, selection method, generalisability.
3. Internal validity: confounders and possible biases.
4. Instruments: does the paper report their validity and reliability?
5. Statistical analysis: does it suit the data, and do the numbers support the stated conclusions?
6. Conflicts of interest and funding, if reported.

Finish with a confidence rating (high/medium/low) with three reasons, and what I should state as a limitation if I cite this paper. Cite the page for each note.`,
          },
          {
            title: 'The supervisor who explains statistics and methods',
            when: 'When a paper uses a statistical test or methodological term you do not understand.',
            expect: 'A step-by-step plain-language explanation tied to the numbers in that paper, plus a question to check your understanding.',
            text: `I am a [level] student in [field]. In [file name], page [number], it says: "[paste the sentence or table]".

Explain:
1. What this test or concept is and why it was used here specifically.
2. What the reported numbers mean in this case, in plain language.
3. What this result does NOT mean (common misinterpretations).
4. An everyday example that makes the idea concrete.

Then ask me one question to check I understood.`,
          },
          {
            title: 'Matrix-to-draft converter',
            when: 'After you have written your own main points and need draft paragraphs organised by theme, not paper by paper.',
            expect: 'Paragraphs organised by theme that connect studies, citing only the matrix. Treat it as a draft to rewrite in your voice.',
            text: `Draft the literature review section using the matrix above and my outline:
<outline>
Theme 1: [...]
Theme 2: [...]
Theme 3: [...]
My view of the literature: [your own conclusion]
</outline>

Rules:
- Organise by theme, not by paper, and connect studies (consistent with, contrasts with, extends).
- Cite only papers in the matrix as (author, year).
- Add no study or number that is not in the matrix.
- End each theme with a sentence leading to the gap my research addresses.
- Length: about [number] words, clear academic style.`,
          },
          {
            title: 'Reviewer 2 for your draft',
            when: 'Before sending your draft to your supervisor or a journal.',
            expect: 'Comments as a strict reviewer would write them: major and minor issues, questions and a recommended decision, so you anticipate criticism.',
            text: `Act as a strict reviewer for a peer-reviewed journal in [field]. This is my draft:
<draft>
[paste or upload the draft]
</draft>

Write a review report with:
1. A 3-line summary of what the paper claims (so I can check my message is clear).
2. Numbered major issues (logic, method, evidence).
3. Minor issues (clarity, organisation, language).
4. Claims that need evidence or a citation.
5. A recommended decision (accept, minor revision, major revision, reject) with the reason.

Be specific: name the paragraph or line for every comment.`,
          },
        ],
      },
      {
        heading: 'Follow-ups that raise quality',
        paragraphs: [],
        list: [
          '"Check every citation in your previous answer: does the stated page actually contain the information? Fix any error."',
          '"Which points in your analysis relied on general knowledge rather than the files?"',
          '"Rebuild the table with an extra column for [the variable you need]."',
          '"Summarise the most important gap in one paragraph I can show my supervisor."',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [],
        list: [
          'Asking Claude for references from memory instead of searching databases.',
          'Uploading a huge number of papers in one message and asking for a “comprehensive analysis”.',
          'Citing a paper based on Claude’s summary without opening it.',
          'Copying the draft as is; interpretation and final wording must be yours.',
          'Uploading participant or patient data to public tools, or ignoring your university’s or journal’s AI policy.',
        ],
      },
      {
        heading: 'Quick workflow checklist',
        paragraphs: [],
        list: [
          'Search strategy (prompt 1), then search the databases yourself.',
          'A review Project with the question, criteria and citation rule.',
          'A card per paper (2), then the matrix (3), then the gaps (4).',
          'Method critique for key papers (5) and explanations for anything unclear (6).',
          'Write your themes and view, then the draft (7), then the review (8).',
          'Manually verify every citation and disclose AI use where required.',
        ],
      },
    ],
  },
}
