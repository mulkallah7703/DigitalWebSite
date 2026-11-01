import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'ai-research-assistant-workflow',
  date: '2026-10-30',
  cover: '/blog/ai-research-assistant-workflow.png',
  coverLines: ['AI as a Research', 'Assistant'],
  coverAlt: { ar: 'غلاف مقال الذكاء الاصطناعي كمساعد بحثي', en: 'Cover: AI as a research assistant' },
  tags: ['Research', 'AI', 'Academia'],
  ar: {
    title: 'الذكاء الاصطناعي مساعدًا في البحث العلمي: سير عمل مسؤول من اختيار السؤال حتى كتابة المراجعة',
    excerpt:
      'الذكاء الاصطناعي يمكن أن يختصر عليك ساعات في قراءة الأوراق وتنظيمها، لكنه قد يضللك إذا استخدمته بلا منهج. هذا سير عمل من ست خطوات يجعل الأداة مساعدًا لا بديلًا عن تفكيرك.',
    sections: [
      {
        paragraphs: [
          'اهتمامي ببناء تقنيات ذكاء اصطناعي تخدم الرعاية الصحية والتعليم جعلني أقرأ كثيرًا من الأوراق البحثية، وأدركت أن التحدي الأكبر ليس الوصول إلى المصادر، بل تنظيمها وفهم العلاقة بينها. هنا يمكن لأدوات مثل Claude وChatGPT وNotebookLM أن تساعد كثيرًا، بشرط أن نعرف حدودها.',
          'أهم قاعدة أؤمن بها: الذكاء الاصطناعي في البحث مساعد يسرّع القراءة والتنظيم، وليس مصدرًا للمعلومة. المصدر هو الورقة البحثية نفسها، ومسؤولية الفهم والاستنتاج تبقى عليك.',
        ],
      },
      {
        heading: 'الخطوة الأولى: صياغة سؤال بحثي دقيق',
        paragraphs: [
          'قبل أن تجمع أي ورقة، استخدم الأداة كشريك نقاش لتضييق سؤالك. اكتب فكرتك العامة واطلب منها أن تقترح عليك عدة صياغات أدق، وأن توضح لكل صياغة: ما المتغيرات، وما الفئة المستهدفة، وما نوع الدراسات التي تجيب عنها. السؤال الواسع مثل "الذكاء الاصطناعي في التعليم" لا يقود إلى مراجعة مفيدة، أما "أثر أدوات التغذية الراجعة الآلية على مهارات الكتابة لدى طلاب الجامعة" فيقود إلى بحث واضح.',
        ],
      },
      {
        heading: 'الخطوة الثانية: البحث في قواعد البيانات الحقيقية',
        paragraphs: [
          'لا تطلب من نموذج لغوي عام أن يعطيك قائمة مراجع؛ فقد يولّد عناوين أو مؤلفين غير موجودين. ابحث بنفسك في المصادر المعروفة مثل Google Scholar وPubMed للمجالات الطبية وIEEE Xplore للمجالات الهندسية، أو في مكتبة جامعتك. يمكنك أن تستعين بالأداة في اقتراح الكلمات المفتاحية والمرادفات وصياغة جمل البحث المنطقية، لكن النتائج يجب أن تأتي من قاعدة البيانات نفسها.',
        ],
      },
      {
        heading: 'الخطوة الثالثة: الفرز الأولي بمعايير مكتوبة',
        paragraphs: [
          'اكتب معايير الإدراج والاستبعاد قبل القراءة: سنوات النشر، ونوع الدراسة، والفئة، واللغة. بعد ذلك يمكنك أن تعطي الأداة الملخصات وتطلب تصنيف كل ورقة وفق معاييرك مع ذكر السبب. هذا يوفّر وقتًا كبيرًا، لكن راجع الحالات الحدية بنفسك، ولا تستبعد ورقة مهمة لأن الأداة أساءت فهم ملخصها.',
        ],
      },
      {
        heading: 'الخطوة الرابعة: استخراج منظم من كل ورقة',
        paragraphs: ['بدل طلب "لخص هذه الورقة"، استخدم قالب استخراج ثابتًا يطبق على كل الأوراق، مثل:'],
        list: [
          'سؤال الدراسة وهدفها.',
          'المنهج: نوع الدراسة وحجم العينة وطريقة جمع البيانات.',
          'أهم النتائج كما وردت في الورقة.',
          'القيود التي ذكرها الباحثون أنفسهم.',
          'رقم الصفحة أو القسم الذي يدعم كل نقطة.',
        ],
      },
      {
        heading: 'الخطوة الخامسة: التوليف وبناء مصفوفة المراجعة',
        paragraphs: [
          'بعد استخراج البيانات، ضعها في جدول واحد: صف لكل ورقة وعمود لكل عنصر. ثم اطلب من الأداة تحليل الجدول: أين تتفق النتائج، وأين تتعارض، وما المناهج الغالبة، وما الفجوات التي لم تدرسها أي ورقة. هذه المصفوفة هي قلب المراجعة الأدبية، وهي ما يحول مجموعة أوراق متفرقة إلى قصة بحثية متماسكة.',
          'أدوات مثل NotebookLM مفيدة هنا لأنها تجيب اعتمادًا على المصادر التي رفعتها وتعرض مواضع الاستشهاد، فتستطيع التحقق مباشرة من أن كل استنتاج مبني على نص حقيقي.',
        ],
      },
      {
        heading: 'الخطوة السادسة: الكتابة بصوتك أنت',
        paragraphs: [
          'اكتب المسودة بنفسك اعتمادًا على المصفوفة، ثم استعن بالأداة في المراجعة: وضوح الحجة، وترابط الفقرات، والتكرار، والأخطاء اللغوية. لا تجعلها تكتب الاستنتاجات نيابة عنك؛ فالقيمة الحقيقية لأي بحث في تفسير الباحث ورأيه النقدي.',
        ],
      },
      {
        heading: 'مثال على طلب فرز جيد',
        paragraphs: [
          'إليك صياغة أستخدمها كنموذج عند فرز الملخصات: "أنت مساعد بحثي. سأعطيك ملخصات دراسات، ومعايير الإدراج هي: دراسات منشورة في آخر خمس سنوات، على طلاب جامعيين، تقيس أثرًا قابلًا للقياس. معايير الاستبعاد: المقالات الرأيية، والدراسات على أطفال المدارس. صنّف كل ملخص إلى: مُدرج، أو مستبعد، أو يحتاج مراجعة، واذكر في سطر واحد المعيار الذي اعتمدت عليه. لا تفترض أي معلومة غير موجودة في الملخص، وإذا كان الملخص لا يكفي للحكم فصنّفه يحتاج مراجعة."',
          'لاحظ أن الطلب يحدد الدور، والمعايير بوضوح، وشكل الإجابة، ويمنع الأداة من التخمين، ويعطيها خيارًا ثالثًا للحالات غير الواضحة. هذا الخيار الثالث مهم جدًا، لأنه يقلل احتمال أن تحسم الأداة حالة غامضة بشكل خاطئ دون أن تنتبه.',
        ],
      },
      {
        heading: 'أخطاء شائعة رأيتها تتكرر',
        paragraphs: [],
        list: [
          'رفع عشرات الأوراق دفعة واحدة وطلب "ملخص شامل"، فتضيع التفاصيل المهمة وتختلط النتائج.',
          'الاعتماد على ملخص الأداة دون قراءة قسم المنهج، مع أن جودة المنهج هي ما يحدد قيمة النتيجة.',
          'الخلط بين ما قالته الورقة وما استنتجته الأداة منها.',
          'نسخ صياغة الأداة في البحث النهائي، فيفقد النص صوت الباحث ويصبح عامًا.',
        ],
      },
      {
        heading: 'قواعد النزاهة الأكاديمية',
        paragraphs: [],
        list: [
          'تحقق من كل مرجع بفتحه بنفسك قبل الاستشهاد به.',
          'لا تنسب للورقة ما لم تقله؛ ارجع إلى النص الأصلي عند كل رقم أو نتيجة.',
          'اطّلع على سياسة جامعتك أو المجلة التي تنشر فيها بشأن استخدام الذكاء الاصطناعي، وأفصح عن استخدامه إن كان ذلك مطلوبًا.',
          'لا ترفع بيانات مرضى أو مشاركين أو أي بيانات حساسة إلى أدوات عامة.',
          'احتفظ بسجل لما استخدمت فيه الأداة، فهذا يحميك ويساعدك على التكرار.',
        ],
      },
      {
        heading: "أدوات مناسبة لكل مرحلة",
        paragraphs: [
        ],
        list: [
          "صياغة السؤال والكلمات المفتاحية: مساعد عام مثل Claude أو ChatGPT.",
          "البحث عن المصادر: Google Scholar وPubMed وIEEE Xplore ومكتبة الجامعة.",
          "إدارة المراجع: أدوات مثل Zotero أو Mendeley لتنظيم المصادر والاستشهادات.",
          "القراءة والاستخراج من مصادرك: NotebookLM أو رفع الملفات إلى مساعد عام مع قالب استخراج ثابت.",
          "المراجعة اللغوية للمسودة: أي مساعد عام، مع الاحتفاظ بصياغتك وأفكارك.",
        ],
      },
      {
        heading: 'الخلاصة',
        paragraphs: [
          'الفرق بين من يستفيد من الذكاء الاصطناعي في البحث ومن يتضرر منه هو المنهج. اجعل الأداة تساعدك في صياغة السؤال، والفرز، والاستخراج، والتنظيم، والمراجعة اللغوية، واحتفظ لنفسك بالبحث في المصادر الحقيقية والتحقق والتفسير. بهذه الطريقة تحصل على السرعة دون أن تخسر الدقة، وهذا ما يجعل البحث مفيدًا فعلًا، خاصة في مجالات حساسة مثل الصحة والتعليم.',
        ],
      },
    ],
  },
  en: {
    title: 'AI as a Research Assistant: A Responsible Workflow from Research Question to Literature Review',
    excerpt:
      'AI can save you hours reading and organising papers, but it can also mislead you without a method. A six-step workflow that keeps the tool an assistant, not a replacement for your thinking.',
    sections: [
      {
        paragraphs: [
          'My interest in building AI technology for healthcare and education means reading many research papers, and I have realised that the biggest challenge is not finding sources but organising them and understanding how they relate. Tools such as Claude, ChatGPT and NotebookLM can help a great deal, as long as we know their limits.',
          'The rule I hold to: in research, AI is an assistant that speeds up reading and organising, not a source of information. The source is the paper itself, and the responsibility for understanding and conclusions stays with you.',
        ],
      },
      {
        heading: 'Step 1: sharpen the research question',
        paragraphs: [
          'Before collecting any paper, use the tool as a discussion partner. Describe your general idea and ask for several more precise formulations, each with its variables, target population and the kind of studies that would answer it. “AI in education” leads nowhere useful; “the effect of automated feedback tools on university students’ writing skills” leads to a clear review.',
        ],
      },
      {
        heading: 'Step 2: search real databases',
        paragraphs: [
          'Do not ask a general language model for a reference list; it may produce titles or authors that do not exist. Search known sources yourself, such as Google Scholar, PubMed for medical topics, IEEE Xplore for engineering, or your university library. The tool can suggest keywords, synonyms and boolean search strings, but results must come from the database.',
        ],
      },
      {
        heading: 'Step 3: screen with written criteria',
        paragraphs: [
          'Write inclusion and exclusion criteria before reading: publication years, study type, population and language. Then give the tool the abstracts and ask it to classify each paper against your criteria with a reason. It saves a lot of time, but review the borderline cases yourself so an important paper is not dropped because an abstract was misread.',
        ],
      },
      {
        heading: 'Step 4: structured extraction from each paper',
        paragraphs: ['Instead of “summarise this paper”, apply one fixed extraction template to every paper:'],
        list: [
          'The study question and aim.',
          'Method: study type, sample size and data collection.',
          'Key findings as stated in the paper.',
          'Limitations reported by the authors.',
          'The page or section supporting each point.',
        ],
      },
      {
        heading: 'Step 5: synthesis and the review matrix',
        paragraphs: [
          'Put the extracted data into one table, a row per paper and a column per item. Then ask the tool to analyse it: where findings agree or conflict, which methods dominate, and which gaps no paper addresses. This matrix is the heart of a literature review; it turns scattered papers into a coherent research story.',
          'NotebookLM is useful here because it answers from the sources you uploaded and shows citations, so you can check that every conclusion rests on real text.',
        ],
      },
      {
        heading: 'Step 6: write in your own voice',
        paragraphs: [
          'Write the draft yourself from the matrix, then use the tool for review: clarity of argument, flow between paragraphs, repetition and language errors. Do not let it write your conclusions; the real value of research lies in the researcher’s interpretation and critical view.',
        ],
      },
      {
        heading: 'An example of a good screening prompt',
        paragraphs: [
          'A template I use: “You are a research assistant. I will give you study abstracts. Inclusion: published in the last five years, on university students, measuring a quantifiable effect. Exclusion: opinion pieces and studies on school children. Classify each abstract as included, excluded or needs review, and state in one line which criterion you used. Do not assume anything not in the abstract; if it is not enough to decide, mark it needs review.”',
          'The prompt defines the role, the criteria, the output format, forbids guessing, and gives a third option for unclear cases. That third option matters: it stops the tool from silently resolving an ambiguous case the wrong way.',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [],
        list: [
          'Uploading dozens of papers at once and asking for a “comprehensive summary”, so details get lost and findings blur together.',
          'Relying on the tool’s summary without reading the methods section, even though method quality determines a finding’s value.',
          'Confusing what the paper said with what the tool inferred from it.',
          'Copying the tool’s wording into the final paper, which strips out the researcher’s voice.',
        ],
      },
      {
        heading: 'Academic integrity rules',
        paragraphs: [],
        list: [
          'Verify every reference by opening it yourself before citing it.',
          'Never attribute to a paper what it did not say; check the original text for every number or finding.',
          'Read your university’s or journal’s policy on AI use and disclose it where required.',
          'Never upload patient, participant or other sensitive data to public tools.',
          'Keep a log of what you used the tool for; it protects you and helps you repeat the process.',
        ],
      },
      {
        heading: "Suitable tools for each stage",
        paragraphs: [
        ],
        list: [
          "Framing the question and keywords: a general assistant such as Claude or ChatGPT.",
          "Finding sources: Google Scholar, PubMed, IEEE Xplore and your university library.",
          "Reference management: tools like Zotero or Mendeley to organise sources and citations.",
          "Reading and extracting from your sources: NotebookLM, or uploading files to a general assistant with a fixed extraction template.",
          "Language review of the draft: any general assistant, while keeping your own wording and ideas.",
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'The difference between benefiting from AI in research and being harmed by it is method. Let the tool help with framing the question, screening, extraction, organisation and language review, and keep the real database search, verification and interpretation for yourself. You get the speed without losing accuracy, which is what makes research genuinely useful, especially in sensitive fields like health and education.',
        ],
      },
    ],
  },
}
