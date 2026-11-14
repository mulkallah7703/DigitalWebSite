import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'harvard-free-ai-lectures',
  date: '2026-11-14',
  cover: '/blog/harvard-free-ai-lectures.webp?v=2',
  coverAlt: {
    ar: 'غلاف المقال: محاضرات هارفارد المجانية في الذكاء الاصطناعي — ليست درجة مجانية',
    en: 'Cover: Harvard’s free AI lectures — free lectures, not a free degree',
  },
  tags: ['Harvard', 'Generative AI', 'CS50'],
  ar: {
    title:
      'محاضرات هارفارد المجانية في الذكاء الاصطناعي: عشر موارد رسمية للبدء — من المقدمة إلى أوامر النظام وRAG وCS50',
    excerpt:
      'هارفارد أتاحت محاضرات وموارد مفتوحة في الذكاء الاصطناعي مجانًا. المشكلة ليست الوصول، بل معرفة من أين تبدأ. هذا دليل عملي بالعشر موارد بالترتيب: من مقدمة التوليد والتلقين وأوامر النظام وRAG، إلى موارد التعليم وCS50، مع روابط رسمية وبرومبتات جاهزة وخطة أربعة أسابيع — مع توضيح أن المجاني هو المحاضرات، لا درجة هارفارد.',
    hook:
      'بنهاية هذا الدليل ستكون لديك عشر موارد رسمية من هارفارد للبدء، بنفس الترتيب العملي: ست محاضرات وموارد للانطلاق، ثم أربعة محاور أعمق من CS50. ستعرف أين تبدأ إن كان وقتك ضيقًا، وكيف تتمرس ببرومبتات جاهزة، وكيف تذكر ما أنجزته بصدق من دون الخلط بين محاضرة مجانية ودرجة جامعية.',
    sections: [
      {
        paragraphs: [
          'المحاضرات المجانية من هارفارد موجودة. المشكلة ليست الوصول إليها، بل معرفة من أين تبدأ. بينما يدفع بعض الناس مقابل دورات باهظة، يمكن البدء من مواد رسمية مفتوحة: نسخة مؤرشفة من دورة Harvard Kennedy School، وموارد تعليمية، وأسبوع الذكاء الاصطناعي في CS50.',
          'الصورة المتداولة تقول إن «أغلى درجة ذكاء اصطناعي في العالم» صارت مجانية. هذا هو الخطّاف، لا الواقع. المجاني رسميًا هو محاضرات ومواد مفتوحة، لا درجة هارفارد ولا البرنامج التنفيذي المدفوع. هذا الدليل يتبع عشر موارد للبدء، بالترتيب، مع الرابط الرسمي لكل واحدة، ثم تمارين وخطة عمل.',
        ],
      },
      {
        heading: 'ست موارد للبدء',
        paragraphs: [
          'ابدأ من هذه الست، بالترتيب. الروابط هي الصفحات الرسمية بعد فكّ الاختصارات، لا روابط منشورات. إن كنت جديدًا تمامًا، يمكنك أن تبدأ من المورد السادس (الأساسيات) ثم تعود إلى الأول.',
        ],
        list: [
          '1. Introduction to Generative AI — كيف يعمل التوليد من الداخل. هذه هي الجلسة 1 من النسخة المجانية المؤرشفة لدورة Harvard Kennedy School «The Science and Implications of Generative AI» (ربيع 2024): https://generative-ai-course.hks.harvard.edu/1-how-genai-works/class-1',
          '2. Prompt Engineering — أساليب عملية لتحسين ناتج أي نموذج لغوي كبير. الجلسة 4 من الأرشيف نفسه، وفيها تشريح الطلب: المهمة والتعليمات والسياق (TIC)، ثم سلسلة التفكير والأمثلة القليلة والشخصيات: https://generative-ai-course.hks.harvard.edu/2-using-genai/class-4',
          '3. Beyond Chatbots: System Prompts, RAG — أوامر النظام، والاسترجاع المعزّز (RAG)، والضبوط الدقيق. الجلسة 5 من الأرشيف: https://generative-ai-course.hks.harvard.edu/2-using-genai/class-5 تنبيه رسمي في الصفحة: أحد التمارين قد يحتاج اشتراك ChatGPT Plus. المحاضرة نفسها مجانية. إن كان وقتك ضيقًا، ابدأ من هنا بعد مقدمة سريعة، لأن هذا الموضع هو الانتقال من «أسأل الشات» إلى «أبني مساعدًا بسياق ثابت».',
          '4. Generative AI in Teaching & Learning — كيف يتعامل المعلّمون مع الذكاء الاصطناعي في التعليم. قائمة تشغيل رسمية على قناة Harvard - Office of the VPAL: https://www.youtube.com/playlist?list=PL_kRkvxqHjkqjnhAdSdejAkyQf1TnPkNM',
          '5. Teaching with AI in the Classroom — تدريب للمعلّمين على موقع Harvard Business Impact Education: https://www.hbsp.harvard.edu/educator-training/teaching-with-ai هذا مورد رسمي للمربين، لكن لا تعاملّه كمحاضرة عامة مفتوحة مثل الأرشيف. الندوات المعروضة هناك برامج تسجيل للمعلّمين، وبعضها مدفوع، وبعض تسجيلات الندوات قد تتطلب حساب معلّم مجاني. تحقق من الصفحة قبل أن تخطّط لها.',
          '6. The Basics of Generative AI — صفحة موارد مبسّطة من HKS SLATE، مفيدة إن كنت جديدًا. هي مركز روابط وإرشادات، لا محاضرة مستقلة، وتشير إلى الأرشيف نفسه وإلى سياسات هارفارد: https://sites.google.com/g.harvard.edu/hksslate-genai/the-basics-of-generative-ai',
        ],
      },
      {
        heading: 'أربعة محاور أعمق (CS50)',
        paragraphs: [
          'بعد الأساس، هذه أربع مواد رسمية من عائلة CS50. الأوليان محاضرة الأسبوع في المقرر، والأخريان حديثان تقنيان على قناة CS50 الرسمية.',
        ],
        list: [
          '7. CS50x: محاضرة الذكاء الاصطناعي — النماذج اللغوية، والشبكات العصبية، وتطبيقات عملية. الصفحة التي حملت عنوان 2025 ما زالت على https://cs50.harvard.edu/x/2025/weeks/ai/ والصفحة الرسمية الحالية هي CS50x 2026: https://cs50.harvard.edu/x/weeks/ai/',
          '8. CS50 في Harvard Extension School — أسبوع الذكاء الاصطناعي (ربيع 2025، الأسبوع 10). هذه محاضرة الأسبوع في ذلك المقرر، وتشمل التلقين وأمر النظام والمفاهيم نفسها في عائلة CS50، لا دورة منفصلة بعنوان مختلف: https://cs50.harvard.edu/extension/2025/spring/weeks/10/',
          '9. GPT-4: How It Works and How to Build With It — حديث تقني رسمي من CS50: «GPT-4 - How does it work, and how do I build apps with it? - CS50 Tech Talk»: https://www.youtube.com/watch?v=vw-KWfKwvTQ',
          '10. LLMs and the End of Programming — حديث تقني رسمي: «Large Language Models and The End of Programming - CS50 Tech Talk with Dr. Matt Welsh»: https://www.youtube.com/watch?v=JhCl-GeT4jw العنوان رأي في محاضرة، لا خلاصة ملزمة. اسمعه نقديًا بعد أن تبني الأساس من الأرشيف.',
        ],
      },
      {
        heading: 'إن كان وقتك ضيقًا: ابدأ من المورد الثالث',
        paragraphs: [
          'إن لم تستطع إكمال القائمة دفعة واحدة، ابدأ بالمورد 3 (أوامر النظام وRAG) بعد أن تمرّ بسرعة على المقدمة. هذا هو موضع الانتقال بين من يستخدم الأداة بسؤال عام، ومن يبني لها سياقًا ثابتًا ومصادرًا. ثم عد إلى الجلستين 1 و4 كي لا يبقى الفهم ناقصًا.',
          'ولمن يريد الصورة الكاملة: الموارد 1 و2 و3 جزء من أرشيف مجاني أوسع في Kennedy School يضم 11 جلسة في ثلاث وحدات، على https://generative-ai-course.hks.harvard.edu/spring-2024 هذا الأرشيف مختلف عن برنامج التعليم التنفيذي المدفوع في المدرسة، المذكور على صفحته الرسمية برسم 1995 دولارًا للجلسة المعلنة في يناير–فبراير 2027.',
        ],
      },
      {
        heading: 'المثال الذي سنتبعه: يوسف، موظف، وأربع أمسيات في الأسبوع',
        paragraphs: [
          'يوسف يعمل في جهة إدارية، ويستخدم الأدوات بشكل عشوائي: يكتب طلبًا سريعًا، وينسخ النتيجة، ثم يصلحها يدويًا. في أربعة أسابيع يريد أن يبدأ من الموارد الرسمية بالترتيب، وأن يحسّن التلقين، وأن يتمرّن على أمر نظام واسترجاع من مستند. لا يريد أن يعلن أنه «درس في هارفارد».',
        ],
      },
      {
        heading: 'كيف تبدأ في خمس خطوات',
        paragraphs: [],
        list: [
          'افتح الروابط الرسمية أدناه مباشرة، لا صور المنشورات ولا الاختصارات.',
          'إن كنت جديدًا: المورد 6 ثم 1 ثم 2. إن كان وقتك ضيقًا: مقدّمة سريعة ثم المورد 3، وبعدها عد إلى 1 و4.',
          'بعد كل جلسة عملية (2 و3)، نفّذ برومبتًا واحدًا من القائمة على مهمة حقيقية، واحفظ الناتج ونسختك المعدّلة.',
          'أضف محاضرة CS50 (المورد 7) في الأسبوع الأخير أو بعد الوحدة العملية. مشاهدة الأسبوع وحده لا تساوي شهادة CS50.',
          'إن كنت معلّمًا، أضف قائمة VPAL (المورد 4). أما صفحة Business Impact (المورد 5) فتحقّق من نوع التسجيل والتكلفة قبل أن تعتمد عليها.',
        ],
      },
      {
        heading: 'ثماني برومبتات جاهزة للتمرين بعد المحاضرات',
        paragraphs: [
          'هذه البرومبتات ليست نص الدورة، بل تمارين تطبيق بعد أن تشاهد الجلسة الرسمية. انسخ النص، واستبدل ما بين القوسين، ثم قارن النتيجة بما فهمته من المحاضرة لا العكس.',
        ],
        prompts: [
          {
            title: 'اختبار فهمك بعد مقدمة النماذج',
            when: 'بعد المورد 1، حين تظن أنك «فهمت الفكرة» وتريد تثبيتًا.',
            expect: 'تمييز واضح بين ما يفعله النموذج فعلًا وما يبدو أنه يفهمه، مع مثال من عملك.',
            text: `شاهدت مقدمة عن الذكاء الاصطناعي التوليدي والنماذج اللغوية الكبيرة.
اشرح لي في عشرة أسطر، بلغة غير مختص، كيف يصل النموذج إلى الكلمة التالية، ولماذا قد يبدو واثقًا وهو مخطئ.
بعد الشرح: خذ هذه المسودة من عملي: [الصق فقرة قصيرة كتبتها أو كتبتها الأداة].
1. ما العلامات التي تجعلك تشك أنها مكتوبة آليًا؟
2. ما الذي لا يمكن الحكم عليه من الفقرة وحدها؟
3. اكتب نسخة أدق من الفقرة، مع الإشارة إلى أي ادّعاء يحتاج مصدرًا.`,
          },
          {
            title: 'بناء طلب بأسلوب المهمة والتعليمات والسياق',
            when: 'بعد الجزء الأول من المورد 2 عن تشريح الطلب (TIC).',
            expect: 'طلب جاهز للصق، مقسوم إلى مهمة وتعليمات وسياق، ونسخة أضعف للمقارنة.',
            text: `أريد طلبًا لنموذج لغوي وفق أسلوب المهمة / التعليمات / السياق.
المهمة: [مثلًا: تلخيص تقرير اجتماع في نصف صفحة لصانع قرار].
السياق: [من حضر، وما القرار المطلوب، وما يجب ألّا يُحذف].
التعليمات: اللغة العربية الفصحى الواضحة، وعناوين قصيرة، وتمييز بين قرار ومعلومة ومسألة معلّقة، ومنع أي توصية غير مذكورة في النص.
النص المصدر: [الصق الملاحظات].
أعطني:
1. الطلب جاهزًا للصق.
2. نسخة أضعف من الطلب (جملة واحدة عامة) حتى أقارن الناتج.
3. ثلاثة فحوصات أجريها يدويًا على النتيجة.`,
          },
          {
            title: 'سلسلة تفكير وأمثلة قليلة لمهمة متشابكة',
            when: 'بعد جزء المورد 2 عن Chain of Thought وFew-Shot.',
            expect: 'طلب واحد يستخدم المثال وخطوات التفكير، مع حدود واضحة لما لا يُستنتج.',
            text: `المهمة: [مثلًا: تصنيف رسائل العملاء إلى شكوى / طلب تعديل / استفسار / غير واضح].
إليك مثالين صحيحين:
مثال 1: [الرسالة] → التصنيف: [...] لأن [...].
مثال 2: [الرسالة] → التصنيف: [...] لأن [...].
الآن صنّف هذه الرسائل: [الصق 5 رسائل].
المطلوب داخل الرد:
- فكّر خطوة بخطوة في سبب كل تصنيف.
- إن نقصت معلومة، ضع التصنيف «غير واضح» ولا تخمّن.
- لا تقترح ردًا على العميل في هذه المرحلة.`,
          },
          {
            title: 'شخصية ناقد أو معلّم لتجويد عملك',
            when: 'بعد جزء الشخصيات (Personas) في المورد 2.',
            expect: 'نقاش قصير يراجع عملك، لا مدحًا عامًا ولا إعادة كتابة كاملة من دون سبب.',
            text: `تصرّف كمحرّر صريح لجهة [نوع الجهة]. هدفك أن تكشف الثغرات، لا أن تجمّل النص.
هذا مسودة [تقرير / بريد / خطة أسبوع]: [الصق النص].
الجمهور: [من سيقرأه]. القيد: [مثلًا: لا أرقام غير موجودة في المسودة].
قم بالترتيب:
1. ثلاث ثغرات محددة (غموض، أو ادّعاء بلا دليل، أو ترتيب ضعيف).
2. سؤالان يجب أن أجيب عنهما قبل اعتماد النص.
3. اقتراح تعديل لجملة واحدة فقط كنموذج، واترك الباقي لي.`,
          },
          {
            title: 'أمر نظام لمساعد متكرر من دون اشتراك مدفوع',
            when: 'بعد جزء أوامر النظام في المورد 3، إن كنت تستخدم أي مساعد يتيح تعليمات ثابتة.',
            expect: 'تعليمات نظام قصيرة ومستقرة، تصلح للنسخ في الحقل المخصّص للتعليمات أو في أول كل محادثة.',
            text: `اكتب أمر نظام (system prompt) لمساعد أستخدمه كل أسبوع في عملي: [صف عملك].
المهام المتكررة: [مثلًا: تلخيص اجتماع، وصياغة بريد، واستخراج مهام].
القواعد الثابتة:
- اسألني إن نقص السياق قبل أن تخترع تفاصيل.
- ميّز بين حقيقة مذكورة في مدخلاتي وبين اقتراحك.
- لا تقدّم مشورة قانونية أو طبية.
- إن طلبت صياغة نهائية، أعطني نسخة واحدة قصيرة ثم نقاط التعديل.
اجعل الأمر في أقل من 180 كلمة، ثم أعطني نسخة أقصر من 80 كلمة للتجربة.`,
          },
          {
            title: 'استرجاع بسيط من مستند أمامك',
            when: 'بعد شرح RAG في المورد 3، من دون الالتزام بتمرين قد يتطلب اشتراكًا مدفوعًا.',
            expect: 'إجابات مربوطة بجمل من المستند، مع الاعتراف الصريح بما ليس فيه.',
            text: `سألصق أدناه مستندًا قصيرًا. أجب فقط مما ورد فيه.
المستند: [الصق سياسة داخلية أو مقطع دليل أو ملاحظات اجتماع].
الأسئلة:
1. [سؤال مباشر جوابه داخل النص].
2. [سؤال يحتاج جمع جملتين].
3. [سؤال تعلم أنه غير مذكور].
لكل جواب: اقتبس الجملة الداعمة أو اكتب «غير مذكور في المستند».
لا تكمل النقص من معرفتك العامة.`,
          },
          {
            title: 'قرار: هل أستخدم الأداة في هذه المهمة؟',
            when: 'بعد أن تبدأ ببناء مساعد، وقبل أن توسّع الاستخدام إلى كل مهامك.',
            expect: 'توصية بالاستخدام أو التأجيل أو الرفض، مع سبب مرتبط بمهمتك لا بشعارات عامة.',
            text: `المهمة التي أفكر أن أنفّذها بأداة توليد: [صف المهمة].
الحساسية: [بيانات داخلية / أسماء عملاء / لا شيء حساس].
معيار النجاح: [كيف أعرف أن الناتج صالح].
الوقت المتاح للمراجعة: [مثلًا: 15 دقيقة].
ساعدني أقرر:
1. هل الاستخدام مناسب، أم مشروط بمراجعة بشرية، أم غير مناسب؟
2. ما الخطر الأرجح إن اعتمدت الناتج كما هو؟
3. إن كان الاستخدام مناسبًا: ما أصغر خطوة أبدأ بها اليوم، وما الذي أبقّيه بشريًا وجوبًا؟`,
          },
          {
            title: 'صيغة صادقة بعد إكمال الموارد أو محاضرة CS50',
            when: 'حين تنتهي من موارد الأرشيف أو من أسبوع CS50 وتريد أن تذكر ذلك في ملف مهني.',
            expect: 'فقرة قصيرة تفرّق بين مشاهدة مواد مفتوحة وبين درجة أو شهادة رسمية.',
            text: `أكملت: [جلسات الأرشيف المجاني لدورة Harvard Kennedy School لربيع 2024 / أسبوع الذكاء الاصطناعي في CS50x / الاثنين].
ما طبقته فعلًا: [مثلًا: أمر نظام لمساعد أسبوعي، ومراجعة مستند بأسلوب استرجاع].
ما لم أحصل عليه: لا درجة من هارفارد، ولا شهادة CS50 الكاملة (لأنني لم أقدّم كل التمارين المطلوبة).
اكتب لي:
1. فقرة من ثلاثة أسطر لملف مهني.
2. جملة واحدة تحت قسم التعليم أو التطوير المهني.
3. جملة أتجنّبها لأنها توحي بأنني خريج هارفارد أو حاصل على شهادتها الجامعية.`,
          },
        ],
      },
      {
        heading: 'خطة يوسف لأربعة أسابيع',
        paragraphs: [
          'الأسبوع 1: المورد 6 إن كنت جديدًا، ثم المورد 1 (مقدمة التوليد) والمورد 2 (التلقين). طبّق برومبت TIC وسلسلة التفكير أو الشخصية على مهمة واحدة من عملك.',
          'الأسبوع 2: المورد 3 (أوامر النظام وRAG). اكتب أمر نظام قصيرًا، وجرّب الاسترجاع البسيط من مستند أمامك، من دون اشتراك مدفوع إن لم تكن تحتاج تمرين المنصة.',
          'الأسبوع 3: إن كنت معلّمًا، أضف المورد 4، وتحقّق من صفحة المورد 5 قبل أن تعتمدها. إن لم تكن معلّمًا، انتقل إلى محاضرة CS50 (المورد 7) وابدأ حديثًا تقنيًا واحدًا (9 أو 10).',
          'الأسبوع 4: أكمل محاور CS50 التي تناسبك (7 و8 و9 و10)، ثم اكتب فقرة صادقة عمّا أنجزته. إن أردت الاستكمال، انتقل إلى بقية جلسات أرشيف Kennedy School الإحدى عشرة. لا تضف «خريج هارفارد» في أي مكان.',
        ],
      },
      {
        heading: 'بعد المشاهدة: كيف تتحدث عن ذلك بصدق',
        paragraphs: [
          'صياغة جيدة: «أكملت محاضرات ومواد مفتوحة من هارفارد في الذكاء الاصطناعي التوليدي (من أرشيف دورة Harvard Kennedy School لربيع 2024، ومحاضرة أسبوع CS50)، وطبّقت تمارين تلقين واسترجاع على مهام من عملي».',
          'صياغة مضلّلة: «حصلت على درجة هارفارد في الذكاء الاصطناعي»، أو «أتممت أغلى برنامج في العالم مجانًا»، أو «أنا خريج CS50» بعد مشاهدة محاضرة واحدة. لا تستخدم هذا الأسلوب.',
          'المواد مفيدة لأنها رسمية ومفتوحة، لا لأنها بديل عن القبول الجامعي أو عن البرنامج التنفيذي المدفوع أو عن متطلبات شهادة CS50. حسب موقع CS50 الرسمي، المقرر مجاني للمشاهدة، وشهادة CS50 المجانية لها شروط تمارين ومشروع، والشهادة الموثّقة عبر edX مدفوعة.',
        ],
      },
      {
        heading: 'أخطاء شائعة',
        paragraphs: [],
        list: [
          'قراءة غلاف «أغلى درجة في العالم… صارت مجانية» وكأنه قبول أو تخرج. المجاني محاضرات ومواد مفتوحة، لا درجة.',
          'البدء من رابط مختصر أو صورة منشور بدل الصفحة الرسمية لكل مورد.',
          'القفز إلى أوامر النظام وRAG من دون أي مقدمة، ثم التوقف وعدم العودة إلى جلستي الأساس والتلقين.',
          'معاملة صفحة SLATE أو تدريب Business Impact كأنها محاضرة مفتوحة مماثلة للأرشيف من دون قراءة شروط الوصول.',
          'افتراض أن كل تمرين في جلسة RAG يعمل من دون اشتراك؛ الصفحة نفسها تنبّه إلى أن أحد التمارين قد يحتاج ChatGPT Plus.',
          'ذكر CS50 وكأن مشاهدة أسبوع الذكاء الاصطناعي تمنح الشهادة.',
          'اعتماد عنوان حديث «نهاية البرمجة» كحقيقة مسلّمة بدل سماعه كرأي في محاضرة.',
          'كتابة الإنجاز في السيرة بصيغة توحي بقبول أو تخرج من هارفارد.',
        ],
      },
      {
        heading: 'قائمة تحقق سريعة',
        paragraphs: [],
        list: [
          'فتحت الروابط الرسمية للعشر موارد، وبدأت من الصفحة الرسمية لا من اختصار.',
          'عرفت أن المجاني هو المحاضرات والمواد المفتوحة، لا درجة هارفارد ولا البرنامج التنفيذي المدفوع.',
          'إن كان وقتك ضيقًا: بدأت من المورد 3 بعد مقدمة قصيرة، وحددت موعدًا للعودة إلى 1 و2.',
          'طبّقت على الأقل ثلاثة برومبتات على مهمة حقيقية (TIC، وشخصية أو سلسلة تفكير، واسترجاع من مستند أو أمر نظام).',
          'إن شاهدت CS50، استخدمّت الصفحة الرسمية لأسبوع الذكاء الاصطناعي، وفرّقت بين المحاضرة والشهادة.',
          'كتبت فقرة صادقة خالية من ادّعاء الدرجة أو التخرج.',
        ],
      },
    ],
  },
  en: {
    title:
      'Harvard’s Free AI Lectures: Ten Official Resources to Start With — From the Introduction to System Prompts, RAG, and CS50',
    excerpt:
      'Harvard has released free, official lectures and open AI resources. The hard part is not access; it is knowing where to start. This is a practical guide to ten resources, in order: from the generative-AI introduction, prompting, system prompts, and RAG, through teaching resources and CS50, with official links, ready-to-copy prompts, and a four-week plan — and a clear line between free lectures and a Harvard degree.',
    hook:
      'By the end of this guide you will have ten official Harvard resources to start with, in a practical order: six lectures and resources to begin, then four deeper CS50 dives. You will know where to start if you are short on time, how to practice with ready-to-copy prompts, and how to describe what you completed honestly, without confusing a free lecture with a university degree.',
    sections: [
      {
        paragraphs: [
          'The free Harvard lectures are already there. The problem is not access; it is knowing where to start. While some people pay for expensive courses, you can begin from official open materials: a free archived Harvard Kennedy School course, teaching resources, and CS50’s AI week.',
          'The familiar graphic says “the most expensive AI degree in the world” is now free. That is the hook, not the fact. What is officially free is lectures and open materials, not a Harvard degree and not the paid executive program. This guide follows ten resources, in order, with the official link for each, then practice prompts and a working plan.',
        ],
      },
      {
        heading: 'Six resources to start with',
        paragraphs: [
          'Begin with these six, in this order. The links are the official pages after the short URLs were resolved, not social-post shortcuts. If you are completely new, you can start with resource 6 (the basics) and then return to resource 1.',
        ],
        list: [
          '1. Introduction to Generative AI — how generative AI works under the hood. This is session 1 of the free archived Harvard Kennedy School course The Science and Implications of Generative AI (Spring 2024): https://generative-ai-course.hks.harvard.edu/1-how-genai-works/class-1',
          '2. Prompt Engineering — practical techniques for better output from a large language model. Session 4 of the same archive, including the official prompt anatomy of Task, Instructions, and Context (TIC), then chain of thought, few-shot prompting, and personas: https://generative-ai-course.hks.harvard.edu/2-using-genai/class-4',
          '3. Beyond Chatbots: System Prompts, RAG — system prompts, retrieval-augmented generation, and fine-tuning. Session 5 of the archive: https://generative-ai-course.hks.harvard.edu/2-using-genai/class-5 Official note on the page: one exercise may require a ChatGPT Plus account. The lecture itself is free. If you are short on time, start here after a quick introduction, because this is the step from “asking a chatbot” to “building an assistant with standing context.”',
          '4. Generative AI in Teaching & Learning — how educators are working with AI in teaching. An official playlist on the Harvard - Office of the VPAL channel: https://www.youtube.com/playlist?list=PL_kRkvxqHjkqjnhAdSdejAkyQf1TnPkNM',
          '5. Teaching with AI in the Classroom — educator training on the Harvard Business Impact Education site: https://www.hbsp.harvard.edu/educator-training/teaching-with-ai This is an official resource for instructors, but do not treat it as a free public lecture in the same sense as the archive. The seminars listed there are registration-based programs for educators, some of them paid, and some webinar recordings may require a free educator account. Check the page before you plan around it.',
          '6. The Basics of Generative AI — a plain-language resource page from HKS SLATE, useful if you are new. It is a hub of links and guidance, not a separate lecture, and it points to the same archive and to Harvard policies: https://sites.google.com/g.harvard.edu/hksslate-genai/the-basics-of-generative-ai',
        ],
      },
      {
        heading: 'Four deeper dives (CS50)',
        paragraphs: [
          'After the foundation, these four official materials come from the CS50 family. The first two are the course’s AI week; the last two are tech talks on the official CS50 channel.',
        ],
        list: [
          '7. CS50x: the AI lecture — large language models, neural nets, and practical applications. The 2025 page is still at https://cs50.harvard.edu/x/2025/weeks/ai/ and the current official page is CS50x 2026: https://cs50.harvard.edu/x/weeks/ai/',
          '8. CS50 at Harvard Extension School — the Artificial Intelligence week (Spring 2025, week 10). This is that offering’s AI week, covering prompting, system prompts, and the same CS50 family of ideas; it is not a separate course under a different title: https://cs50.harvard.edu/extension/2025/spring/weeks/10/',
          '9. GPT-4: How It Works and How to Build With It — an official CS50 tech talk, “GPT-4 - How does it work, and how do I build apps with it? - CS50 Tech Talk”: https://www.youtube.com/watch?v=vw-KWfKwvTQ',
          '10. LLMs and the End of Programming — an official tech talk, “Large Language Models and The End of Programming - CS50 Tech Talk with Dr. Matt Welsh”: https://www.youtube.com/watch?v=JhCl-GeT4jw The title is a speaker’s framing in a talk, not a binding conclusion. Watch it critically after you have the foundation from the archive.',
        ],
      },
      {
        heading: 'If you are short on time: start with resource 3',
        paragraphs: [
          'If you cannot work through the full list at once, start with resource 3 (system prompts and RAG) after a quick pass at the introduction. That is the shift from asking a tool a generic question to giving it standing context and sources. Then come back to resources 1 and 2 so the foundation is not missing.',
          'If you want the complete picture: resources 1, 2, and 3 are part of a larger free Kennedy School archive of 11 sessions in three units, at https://generative-ai-course.hks.harvard.edu/spring-2024 That archive is separate from the School’s paid executive-education program, which the official page lists at $1,995 for the announced January–February 2027 session.',
        ],
      },
      {
        heading: 'The worked example: Yusuf, an office role, and four evening sessions a week',
        paragraphs: [
          'Yusuf works in an administrative role and already uses the tools in a messy way: he types a quick request, pastes the result, then fixes it by hand. In four weeks he wants to start from the official resources in order, improve his prompting, and practice a system prompt and document retrieval. He does not want to announce that he “studied at Harvard.”',
        ],
      },
      {
        heading: 'How to start in five steps',
        paragraphs: [],
        list: [
          'Open the official links below directly, not a social image or a shortened URL.',
          'If you are new: resource 6, then 1, then 2. If you are short on time: a quick introduction, then resource 3, and later return to 1 and 2.',
          'After each practical session (2 and 3), run one prompt from the list on a real task, and save both the model’s output and your edited version.',
          'Add the CS50 lecture (resource 7) in the final week, or after the practical unit. Watching the week alone is not a CS50 certificate.',
          'If you teach, add the VPAL playlist (resource 4). For the Business Impact page (resource 5), check the registration type and cost before you rely on it.',
        ],
      },
      {
        heading: 'Eight ready-to-copy prompts to practice after the lectures',
        paragraphs: [
          'These prompts are not the course text. They are practice drills to run after you have watched the official session. Copy the text, replace the bracketed parts, and compare the result with what you learned in the lecture — not the other way around.',
        ],
        prompts: [
          {
            title: 'A comprehension check after the models introduction',
            when: 'After resource 1, when you think you “get the idea” and want it to stick.',
            expect: 'A clear distinction between what the model actually does and what it only appears to understand, with an example from your work.',
            text: `I have just watched an introduction to generative AI and large language models.
In ten short lines, in non-specialist language, explain how the model arrives at the next word, and why it can sound confident when it is wrong.
Then take this draft from my work: [paste a short paragraph you wrote, or that a tool wrote].
1. What signs would make you suspect it was written by a model?
2. What can you not judge from the paragraph alone?
3. Write a more precise version, and flag any claim that needs a source.`,
          },
          {
            title: 'Build a prompt with task, instructions, and context',
            when: 'After the first part of resource 2, on the anatomy of a prompt (TIC).',
            expect: 'A ready-to-paste prompt split into task, instructions, and context, plus a weaker version for comparison.',
            text: `I want a language-model prompt in the task / instructions / context style.
Task: [for example: summarize a meeting report in half a page for a decision-maker].
Context: [who attended, what decision is needed, and what must not be dropped].
Instructions: clear language, short headings, a distinction between a decision, a fact, and an open issue, and no recommendation that is not in the source text.
Source text: [paste the notes].
Give me:
1. The prompt, ready to paste.
2. A weaker version of the prompt (one generic sentence) so I can compare outputs.
3. Three checks I should do by hand on the result.`,
          },
          {
            title: 'Chain of thought and few-shot examples for a messy task',
            when: 'After the resource 2 segment on chain of thought and few-shot prompting.',
            expect: 'One prompt that uses examples and reasoning steps, with a clear limit on what must not be inferred.',
            text: `Task: [for example: classify customer messages as complaint / change request / question / unclear].
Here are two correct examples:
Example 1: [message] → label: [...] because [...].
Example 2: [message] → label: [...] because [...].
Now classify these messages: [paste five messages].
In your reply:
- Think step by step about why each label applies.
- If information is missing, use “unclear” and do not guess.
- Do not draft a reply to the customer at this stage.`,
          },
          {
            title: 'A critic or tutor persona to improve your draft',
            when: 'After the personas segment in resource 2.',
            expect: 'A short review that finds gaps, not generic praise and not a full rewrite without a reason.',
            text: `Act as a blunt editor for a [type of organization]. Your job is to find holes, not to polish the prose.
This is a draft [report / email / weekly plan]: [paste the text].
Audience: [who will read it]. Constraint: [for example: no figures that are not already in the draft].
Do this in order:
1. Three specific weaknesses (ambiguity, a claim without evidence, or a weak structure).
2. Two questions I must answer before the text is approved.
3. A suggested rewrite of one sentence only, as a model, and leave the rest to me.`,
          },
          {
            title: 'A system prompt for a recurring assistant, with no paid plan required',
            when: 'After the system-prompt segment in resource 3, if you use any assistant that accepts standing instructions.',
            expect: 'Short, stable system instructions you can paste into a custom-instructions field or at the start of each chat.',
            text: `Write a system prompt for an assistant I use every week in my job: [describe your work].
Recurring tasks: [for example: meeting summaries, email drafts, and action-item extraction].
Standing rules:
- Ask me if context is missing before you invent details.
- Separate facts that appear in my input from your own suggestions.
- Do not give legal or medical advice.
- If I ask for a final draft, give me one short version and then a list of edits.
Keep the prompt under 180 words, then give me a shorter 80-word version to test.`,
          },
          {
            title: 'Simple retrieval from a document in front of you',
            when: 'After the RAG explanation in resource 3, without depending on an exercise that may require a paid subscription.',
            expect: 'Answers tied to sentences in the document, with an explicit admission of what is not there.',
            text: `I will paste a short document below. Answer only from what it contains.
Document: [paste an internal policy, a handbook excerpt, or meeting notes].
Questions:
1. [A direct question whose answer is in the text].
2. [A question that requires combining two sentences].
3. [A question you know is not answered there].
For each answer: quote the supporting sentence, or write “not stated in the document.”
Do not fill gaps from your general knowledge.`,
          },
          {
            title: 'A decision: should I use the tool for this task?',
            when: 'After you start building an assistant, and before you apply it to every task.',
            expect: 'A recommendation to use, delay, or avoid the tool, with a reason tied to your task, not to generic slogans.',
            text: `The task I am considering doing with a generative tool: [describe the task].
Sensitivity: [internal data / client names / nothing sensitive].
Success test: [how I will know the output is usable].
Time I have to review it: [for example: 15 minutes].
Help me decide:
1. Is use appropriate, appropriate only with human review, or not appropriate?
2. What is the most likely harm if I accept the output as-is?
3. If use is appropriate: what is the smallest step I should try today, and what must stay human?`,
          },
          {
            title: 'An honest write-up after the resources or a CS50 lecture',
            when: 'When you have finished the archive resources or CS50’s AI week and want to mention it on a professional profile.',
            expect: 'A short paragraph that separates open-course study from a degree or an official certificate.',
            text: `I completed: [sessions from the free archived Harvard Kennedy School Spring 2024 course / CS50x’s AI week / both].
What I actually applied: [for example: a system prompt for a weekly assistant, and a retrieval-style review of a document].
What I did not receive: no Harvard degree, and no full CS50 certificate (because I did not submit every required assignment).
Write for me:
1. A three-line paragraph for a professional profile.
2. One sentence under education or professional development.
3. A sentence I should avoid because it implies I am a Harvard graduate or hold the university’s degree.`,
          },
        ],
      },
      {
        heading: 'Yusuf’s four-week plan',
        paragraphs: [
          'Week 1: resource 6 if you are new, then resource 1 (the generative-AI introduction) and resource 2 (prompting). Run the TIC prompt and either the chain-of-thought or persona drill on one real task from your work.',
          'Week 2: resource 3 (system prompts and RAG). Write a short system prompt, and try simple retrieval from a document in front of you, without a paid plan if you do not need the platform exercise.',
          'Week 3: if you teach, add resource 4, and check the resource 5 page before you rely on it. If you do not teach, go to the CS50 lecture (resource 7) and start one tech talk (9 or 10).',
          'Week 4: finish the CS50 dives that fit you (7, 8, 9, and 10), then write an honest paragraph about what you did. If you want to go further, continue with the rest of the 11-session Kennedy School archive. Do not add “Harvard graduate” anywhere.',
        ],
      },
      {
        heading: 'After you watch: how to talk about it honestly',
        paragraphs: [
          'A sound line: “I completed open Harvard materials on generative AI (from the archived Harvard Kennedy School Spring 2024 course, and CS50’s AI-week lecture), and I practiced prompting and retrieval exercises on tasks from my work.”',
          'A misleading line: “I earned a Harvard degree in AI,” or “I finished the world’s most expensive program for free,” or “I am a CS50 graduate” after watching one lecture. Do not use that kind of wording.',
          'The materials are valuable because they are official and open, not because they replace university admission, the paid executive program, or the requirements for a CS50 certificate. According to the official CS50 site, the course is free to take, the free CS50 Certificate has problem-set and project requirements, and the verified edX certificate is paid.',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [],
        list: [
          'Reading a cover that says “the most expensive degree in the world is now free” as admission or graduation. What is free is lectures and open materials, not a degree.',
          'Starting from a shortened link or a social image instead of the official page for each resource.',
          'Jumping to system prompts and RAG with no introduction, then stopping and never returning to the foundation and prompting sessions.',
          'Treating the SLATE page or Business Impact training as an open lecture in the same sense as the archive, without checking access conditions.',
          'Assuming every exercise in the RAG session works without a subscription; the page itself notes that one exercise may require ChatGPT Plus.',
          'Talking about CS50 as if watching the AI week grants the certificate.',
          'Taking the talk title “the end of programming” as settled fact, instead of hearing it as a view in a lecture.',
          'Writing the achievement on a resume in a way that suggests Harvard admission or graduation.',
        ],
      },
      {
        heading: 'Quick checklist',
        paragraphs: [],
        list: [
          'You opened the official links for the ten resources, and started from the official page, not from a short URL.',
          'You know that what is free is the lectures and open materials, not a Harvard degree and not the paid executive program.',
          'If you were short on time: you started with resource 3 after a short introduction, and you set a time to return to 1 and 2.',
          'You ran at least three prompts on a real task (TIC, a persona or chain-of-thought drill, and either document retrieval or a system prompt).',
          'If you watched CS50, you used the official AI-week page and distinguished the lecture from the certificate.',
          'You wrote an honest paragraph that does not claim a degree or graduation.',
        ],
      },
    ],
  },
}
