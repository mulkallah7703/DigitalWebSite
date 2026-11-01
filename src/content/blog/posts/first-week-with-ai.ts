import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'your-first-week-with-ai',
  date: '2026-10-24',
  cover: '/blog/your-first-week-with-ai.png',
  coverLines: ['Your First Week', 'with AI'],
  coverAlt: { ar: 'غلاف مقال أسبوعك الأول مع الذكاء الاصطناعي', en: 'Cover: your first week with AI' },
  tags: ['Beginners', 'AI', 'Habits'],
  ar: {
    title: 'أسبوعك الأول مع الذكاء الاصطناعي: دليل المبتدئ خطوة بخطوة، بلا تعقيد ولا مبالغة',
    excerpt:
      'إذا كنت تسمع عن الذكاء الاصطناعي كل يوم ولم تبدأ بعد، فهذا الدليل لك. سبعة أيام، لكل يوم هدف واحد وتمرين عملي، لتنتقل من الفضول إلى عادة يومية مفيدة وآمنة.',
    sections: [
      {
        paragraphs: [
          'يتحدث الجميع عن الذكاء الاصطناعي، وتمتلئ وسائل التواصل بوعود كبيرة عن أدوات "ستغير حياتك". هذا الضجيج يجعل كثيرًا من الناس إما يبالغون في توقعاتهم، أو يشعرون أن الموضوع معقد ولا يناسبهم. وأنا أرى أن الحقيقة في المنتصف: هذه الأدوات مفيدة جدًا في مهام محددة، ولها حدود واضحة، ويمكن لأي شخص أن يتعلم استخدامها بشكل جيد في وقت قصير إذا بدأ بطريقة صحيحة.',
          'هذا الدليل مصمم لأسبوع واحد. لكل يوم هدف واحد وتمرين عملي لا يأخذ أكثر من نصف ساعة. لا تحتاج إلى أي خلفية تقنية، فقط حساب مجاني في أداة مثل Claude أو ChatGPT أو Gemini.',
          'نصيحتي قبل أن تبدأ: احتفظ بملف ملاحظات بسيط طوال الأسبوع، تكتب فيه كل يوم التمرين الذي جربته، وما الذي نجح، وما الذي فاجأك أو خيب ظنك. هذه الملاحظات ستكون في نهاية الأسبوع دليلك الشخصي، وستساعدك على معرفة أين يمكن أن تفيدك هذه الأدوات فعلًا في حياتك، بعيدًا عن الضجيج والوعود العامة.',
        ],
      },
      {
        heading: 'اليوم الأول: تعرّف على الأداة كما هي',
        paragraphs: [
          'الهدف: أن تفهم ما هي هذه الأدوات. النماذج اللغوية تولد النص بناء على أنماط تعلمتها من كميات هائلة من البيانات. هي ممتازة في الصياغة والتلخيص والشرح والعصف الذهني، لكنها قد تخطئ في الحقائق والأرقام وتقدم الخطأ بثقة. تذكر هذا من اليوم الأول.',
        ],
        list: [
          'التمرين: اسأل الأداة عن موضوع تعرفه جيدًا، كتخصصك أو هوايتك، ولاحظ أين أصابت وأين أخطأت أو عممت. هذا أفضل درس في حدودها.',
        ],
      },
      {
        heading: 'اليوم الثاني: الفرق بين طلب ضعيف وطلب جيد',
        paragraphs: ['الهدف: أن تتعلم مكونات الطلب الجيد. أبسط إطار أنصح به هو أربعة أسئلة قبل أن تكتب:'],
        list: [
          'ما المهمة بالضبط؟',
          'ما السياق الذي تحتاج الأداة معرفته عني وعن الموقف؟',
          'لمن الناتج، وما مستواه؟',
          'ما الشكل المطلوب: قائمة، أو جدول، أو فقرة، أو رسالة، وبأي طول؟',
          'التمرين: اكتب طلبًا لمهمة حقيقية بطريقتك المعتادة، ثم أعد كتابته بالإجابة عن الأسئلة الأربعة، وقارن النتيجتين.',
        ],
      },
      {
        heading: 'اليوم الثالث: المحادثة لا السؤال الواحد',
        paragraphs: [
          'الهدف: أن تتعلم التحسين التدريجي. كثير من المبتدئين يكتبون طلبًا واحدًا، وإذا لم تعجبهم النتيجة يستنتجون أن الأداة لا تفيد. الحقيقة أن أفضل النتائج تأتي من الحوار: اطلب، ثم وجّه، ثم حسّن.',
        ],
        list: [
          'التمرين: اطلب خطة لتنظيم أسبوعك، ثم عدّلها بثلاث رسائل متتالية: "اجعلها أبسط"، و"أضف وقتًا للرياضة"، و"اعرضها كجدول". لاحظ كيف تتحسن النتيجة مع كل توجيه.',
        ],
      },
      {
        heading: 'اليوم الرابع: العمل مع الملفات',
        paragraphs: [
          'الهدف: أن تستخدم الأداة مع محتوى حقيقي. معظم الأدوات تسمح برفع ملفات PDF والصور والمستندات. هذا يجعلها مفيدة في فهم المقالات الطويلة، والتعليمات المعقدة، والعقود، والتقارير.',
        ],
        list: [
          'التمرين: ارفع مستندًا عامًا غير سري، كمقال طويل أو دليل استخدام، واطلب ملخصًا من خمس نقاط، ثم ثلاثة أسئلة تختبر فهمك، ثم اسأل عن جزء محدد لم تفهمه.',
          'تنبيه: لا ترفع مستندات فيها بيانات شخصية أو مالية أو سرية.',
        ],
      },
      {
        heading: 'اليوم الخامس: اجعلها مساعدًا في عملك أو دراستك',
        paragraphs: ['الهدف: أن تجد مهمة متكررة توفر عليك وقتًا حقيقيًا. أمثلة:'],
        list: [
          'للطالب: شرح مفهوم صعب بأمثلة، أو توليد أسئلة مراجعة من ملاحظاتك.',
          'للموظف: صياغة رسالة متابعة، أو ترتيب ملاحظات اجتماع.',
          'لصاحب المشروع: كتابة وصف منتج، أو أفكار لمنشورات.',
          'التمرين: اختر مهمة واحدة وأنجزها بالأداة، وقدّر الوقت الذي وفرته.',
        ],
      },
      {
        heading: 'اليوم السادس: التحقق والأمان',
        paragraphs: ['الهدف: أن تبني عادات تحميك. هذه القواعد التي أعتبرها أساسية:'],
        list: [
          'تحقق من كل معلومة مهمة من مصدر موثوق، خاصة في الصحة والقانون والمال.',
          'اطلب من الأداة ذكر ما هي غير متأكدة منه.',
          'لا تشارك كلمات المرور أو البيانات البنكية أو الشخصية الحساسة.',
          'التزم بسياسات جامعتك أو جهة عملك في استخدام هذه الأدوات.',
          'التمرين: اطلب معلومة فيها أرقام أو تواريخ، ثم تحقق منها بنفسك من مصدر رسمي.',
        ],
      },
      {
        heading: 'اليوم السابع: ابنِ عادتك',
        paragraphs: [
          'الهدف: أن تحول التجربة إلى عادة. راجع الأسبوع: ما المهام التي نجحت؟ وما التي لم تنجح؟ احفظ أفضل ثلاثة طلبات في ملف خاص، وحدد مهمة واحدة ستستخدم فيها الأداة كل يوم في الأسبوع القادم. العادة الصغيرة المستمرة أقوى من الحماس الكبير الذي يختفي بعد أيام.',
        ],
      },
      {
        heading: 'ماذا بعد الأسبوع الأول؟',
        paragraphs: [
          'بعد أن تبني الأساس، يمكنك التعمق حسب اهتمامك: تعلم استخدام الأدوات في البحث والمذاكرة، أو في العمل المكتبي، أو في الكتابة، أو إن كنت مبرمجًا في بناء تطبيقات بها. وقد كتبت في هذه المدونة مقالات مفصلة عن كل مسار من هذه المسارات، فاختر منها ما يناسب هدفك التالي.',
        ],
      },
      {
        heading: "أسئلة شائعة من المبتدئين",
        paragraphs: [
        ],
        list: [
          "هل أحتاج إلى نسخة مدفوعة؟ ليس في البداية. النسخ المجانية كافية لتعلم الأساسيات، وقرر لاحقًا بناء على احتياجك الفعلي.",
          "أي أداة أختار؟ اختر واحدة فقط لهذا الأسبوع. المهارات التي ستتعلمها قابلة للنقل إلى أي أداة أخرى.",
          "هل سيأخذ الذكاء الاصطناعي وظيفتي؟ الأقرب للواقع أن من يتقن استخدام هذه الأدوات في عمله سيكون في موقع أقوى ممن يتجاهلها.",
          "هل استخدامها في الدراسة غش؟ يعتمد على طريقة الاستخدام وسياسة جهتك التعليمية. استخدامها للفهم والمراجعة يختلف تمامًا عن تسليم عمل لم تكتبه.",
        ],
      },
      {
        heading: 'الخلاصة',
        paragraphs: [
          'لا تحتاج إلى أن تفهم كل شيء عن الذكاء الاصطناعي لتبدأ. سبعة أيام، ونصف ساعة يوميًا، وتمارين على مهام حقيقية، تكفي لتنتقل من الفضول إلى الاستخدام الواعي. ابدأ اليوم بالتمرين الأول، وتعامل مع الأداة كمساعد ذكي يحتاج إلى توجيهك ومراجعتك، وستكتشف بنفسك كم يمكن أن تختصر عليك.',
        ],
      },
    ],
  },
  en: {
    title: 'Your First Week with AI: A Step-by-Step Beginner’s Guide, Without Complexity or Hype',
    excerpt:
      'If you hear about AI every day but have not started, this guide is for you. Seven days, one goal and one practical exercise per day, to go from curiosity to a useful, safe daily habit.',
    sections: [
      {
        paragraphs: [
          'Everyone talks about AI, and social media is full of big promises about tools that will “change your life”. The noise makes people either overestimate these tools or feel they are too complicated. I think the truth is in the middle: these tools are very useful for specific tasks, have clear limits, and anyone can learn to use them well quickly with the right start.',
          'This guide is designed for one week: one goal and one exercise per day, each under thirty minutes. You need no technical background, just a free account on a tool such as Claude, ChatGPT or Gemini.',
        ],
      },
      {
        heading: 'Day 1: understand the tool as it is',
        paragraphs: [
          'Goal: know what these tools are. Language models generate text from patterns learned from vast amounts of data. They are excellent at wording, summarising, explaining and brainstorming, but they can get facts and numbers wrong and state errors confidently. Remember that from day one.',
        ],
        list: ['Exercise: ask about a topic you know well, such as your field or a hobby, and note where it is right and where it is wrong or vague. It is the best lesson in its limits.'],
      },
      {
        heading: 'Day 2: a weak request versus a good one',
        paragraphs: ['Goal: learn what makes a good request. The simplest framework is four questions before you write:'],
        list: [
          'What exactly is the task?',
          'What context does the tool need about me and the situation?',
          'Who is the output for, and at what level?',
          'What format: list, table, paragraph or message, and how long?',
          'Exercise: write a request for a real task your usual way, rewrite it answering the four questions, and compare.',
        ],
      },
      {
        heading: 'Day 3: a conversation, not one question',
        paragraphs: [
          'Goal: learn iterative improvement. Many beginners write one request and conclude the tool is useless if they dislike the result. The best results come from dialogue: ask, steer, refine.',
        ],
        list: ['Exercise: ask for a plan to organise your week, then refine it in three messages: “make it simpler”, “add time for exercise”, “show it as a table”. Notice how each instruction improves it.'],
      },
      {
        heading: 'Day 4: working with files',
        paragraphs: [
          'Goal: use the tool on real content. Most tools accept PDFs, images and documents, which makes them useful for long articles, complex instructions, contracts and reports.',
        ],
        list: [
          'Exercise: upload a public, non-confidential document such as a long article or a user manual; ask for a five-point summary, then three questions testing your understanding, then ask about a specific part you did not understand.',
          'Warning: do not upload documents with personal, financial or confidential data.',
        ],
      },
      {
        heading: 'Day 5: make it an assistant at work or study',
        paragraphs: ['Goal: find a recurring task that saves real time:'],
        list: [
          'Students: explaining a hard concept with examples, or generating review questions from notes.',
          'Employees: drafting a follow-up email, or organising meeting notes.',
          'Business owners: product descriptions or post ideas.',
          'Exercise: pick one task, do it with the tool, and estimate the time saved.',
        ],
      },
      {
        heading: 'Day 6: verification and safety',
        paragraphs: ['Goal: build protective habits. The rules I consider essential:'],
        list: [
          'Verify every important fact from a reliable source, especially in health, law and money.',
          'Ask the tool to state what it is unsure about.',
          'Never share passwords, bank details or sensitive personal data.',
          'Follow your university’s or employer’s rules on using these tools.',
          'Exercise: ask for information containing numbers or dates and verify it yourself from an official source.',
        ],
      },
      {
        heading: 'Day 7: build your habit',
        paragraphs: [
          'Goal: turn the experiment into a habit. Review the week: what worked and what did not? Save your three best prompts in a file and choose one task to do with the tool every day next week. A small consistent habit beats big enthusiasm that fades in days.',
        ],
      },
      {
        heading: 'After the first week',
        paragraphs: [
          'With the basics in place, go deeper based on your interest: research and studying, office work, writing, or, if you code, building applications. I have written detailed articles on each of these paths in this blog, so pick the one that fits your next goal.',
        ],
      },
      {
        heading: "Common beginner questions",
        paragraphs: [
        ],
        list: [
          "Do I need a paid plan? Not at first. Free versions are enough to learn the basics; decide later based on real needs.",
          "Which tool should I choose? Just one for this week. The skills you learn transfer to any other tool.",
          "Will AI take my job? More realistically, people who use these tools well at work will be in a stronger position than those who ignore them.",
          "Is using it for study cheating? It depends on how you use it and your institution’s policy. Using it to understand and review is very different from submitting work you did not write.",
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'You do not need to understand everything about AI to start. Seven days, thirty minutes a day and exercises on real tasks are enough to move from curiosity to conscious use. Start today with the first exercise, treat the tool as a smart assistant that needs your direction and review, and see for yourself how much time it can save.',
        ],
      },
    ],
  },
}
