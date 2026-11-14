import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'harvard-free-ai-lectures',
  date: '2026-11-14',
  cover: '/blog/harvard-free-ai-lectures.webp?v=1',
  coverAlt: {
    ar: 'غلاف مقال محاضرات هارفارد المجانية المؤرشفة في الذكاء الاصطناعي وCS50',
    en: 'Cover: Harvard’s free archived AI lectures and CS50’s AI week',
  },
  tags: ['Harvard', 'Generative AI', 'CS50'],
  ar: {
    title:
      'محاضرات هارفارد المجانية في الذكاء الاصطناعي: كيف تدرس الدورة المؤرشفة في Kennedy School (11 جلسة)، ثم أسبوع CS50، وتمارس ببرومبتات جاهزة',
    excerpt:
      'هارفارد كينيدي سكول أتاحت نسخة مؤرشفة مجانية من دورة ربيع 2024 «علم الذكاء الاصطناعي التوليدي وانعكاساته»: 11 جلسة بفيديوهات وشرائح وتمارين. هذا دليل عملي لمسار أربعة أسابيع، مع برومبتات جاهزة بعد جلسات التلقين وRAG، ومسار مكمل من أسبوع الذكاء الاصطناعي في CS50 — من دون الخلط بين المحاضرات المجانية والدرجة أو البرنامج التنفيذي المدفوع.',
    hook:
      'بنهاية هذا الدليل ستعرف كيف تفتح النسخة المجانية المؤرشفة من دورة Harvard Kennedy School من الموقع الرسمي، وكيف تتابع الجلسات الإحدى عشرة بترتيب الوحدات، وكيف تتمرس ببرومبتات جاهزة للنسخ بعد دروس التلقين ونظام الأوامر وRAG، وكيف تضيف أسبوع الذكاء الاصطناعي في CS50 إن أردت مسارًا أعمق، مع طريقة صادقة للحديث عمّا أنجزته.',
    sections: [
      {
        paragraphs: [
          'المنشورات التي تقول «هارفارد صارت مجانية» تختصر أكثر مما ينبغي. ما هو مجاني رسميًا شيء محدد: نسخة مؤرشفة من دورة حضورية لربيع 2024 في Harvard Kennedy School، بالإضافة إلى مواد مفتوحة أخرى مثل أسبوع الذكاء الاصطناعي في CS50. أما الدرجة الجامعية، وبرنامج التعليم التنفيذي، وشهادة CS50 الكاملة، فلكل منها شروط مختلفة، وبعضها مدفوع.',
          'هذا المقال طريقة عمل. كل حقيقة هنا منسوبة إلى مواقع هارفارد الرسمية أو قنواتها الرسمية. لن تجد ادعاء أن هذه المواد تعادل أغلى درجة في العالم، ولن تجد وعدًا بأن المشاهدة وحدها تجعلك «خريج هارفارد».',
        ],
      },
      {
        heading: 'ماذا أتاحت هارفارد رسميًا بالمجان؟',
        paragraphs: [
          'على الموقع الرسمي https://generative-ai-course.hks.harvard.edu/ يوضح أساتذة Harvard Kennedy School — شاراد غويل، ودان ليفي، وتيدي سفورونوس — أن لديهم عدة عروض حول الذكاء الاصطناعي التوليدي والسياسة العامة. وللمعلّمين والمتعلمين يذكرون صراحة: «نسخة مؤرشفة مجانية من دورتنا الحضورية لعام 2024».',
          'صفحة الأرشيف هي https://generative-ai-course.hks.harvard.edu/spring-2024 وعنوان الدورة الرسمي: The Science and Implications of Generative AI — Spring 2024. وتوضح الصفحة أن المواد من دورة ربيع 2024، وأنها مجموعة فيديوهات ومحتوى تهدف إلى فهم كيف يعمل الذكاء الاصطناعي التوليدي، وكيف يُستخدم، وما الفرص والتحديات التي يطرحها على المجتمع. المحتوى مرخّص، إلا حيث يُذكر خلاف ذلك، برخصة Creative Commons Attribution 4.0. وتوفر الصفحة قائمة تشغيل رسمية لكل فيديوهات الدورة على يوتيوب: https://www.youtube.com/playlist?list=PL9scSybOWDNHyvVr0RGYgnjzmqKUBCj8r',
          'الدورة مقسمة إلى ثلاث وحدات و11 جلسة، مع مدة رسمية مذكورة لكل جلسة، وعمل تحضيري وفيديوهات وأنشطة داخل الصفحة. الوحدات هي: كيف يعمل الذكاء الاصطناعي التوليدي (العلم)، وكيف يُستخدم (الأفراد والمنظمات)، وانعكاساته (المجتمع).',
          'هذا الأرشيف مختلف عن برنامج Harvard Kennedy School التنفيذي المدفوع. على الصفحة الرسمية للتعليم التنفيذي، يوجد برنامج عبر الإنترنت من ستة أسابيع بعنوان Generative AI: How to Use It and Why It Matters، ويُذكر فيه رسم تسجيل 1995 دولارًا للجلسة المعلنة في يناير–فبراير 2027: https://www.hks.harvard.edu/educational-programs/executive-education/generative-ai-how-use-it-and-why-it-matters لا تخلط بين الأرشيف المجاني وهذا البرنامج.',
        ],
      },
      {
        heading: 'المثال الذي سنتبعه: يوسف، موظف، وأربع أمسيات في الأسبوع',
        paragraphs: [
          'يوسف يعمل في جهة إدارية، ويستخدم أدوات الذكاء الاصطناعي يوميًا بشكل عشوائي: يكتب طلبًا سريعًا، وينسخ النتيجة، ثم يصلحها يدويًا. يريد في أربعة أسابيع أن يفهم الأساس، وأن يحسّن طريقة الطلب، وأن يعرف متى لا يستخدم الأداة أصلًا. لا يريد أن يعلن أنه «درس في هارفارد».',
          'هدفه واضح: إكمال الوحدات الثلاث من الأرشيف الرسمي بالترتيب، وتطبيق تمرين قصير بعد كل جلسة عملية، ثم مشاهدة أسبوع الذكاء الاصطناعي في CS50 إن بقي وقت. إن كان وقتك أضيق، أبقِ الأسبوع الرابع للجلسات 8 إلى 11 (المخاطر، وحقوق النشر، والعمل، والتضليل)، لأنها تكمل الجانب الذي تتجاوزه معظم القوائم السريعة.',
        ],
      },
      {
        heading: 'الجلسات الإحدى عشرة كما سمّتها هارفارد',
        paragraphs: [
          'ابدأ من صفحة الأرشيف، لا من روابط مختصرة. المدد بين الأقواس هي المدد الرسمية المذكورة في الصفحة، وقد تشمل أنشطة لا الفيديو وحده. الروابط التالية هي صفحات الجلسات الرسمية:',
        ],
        list: [
          'الوحدة 1 — الجلسة 1: Introduction to Generative AI [90 دقيقة]. https://generative-ai-course.hks.harvard.edu/1-how-genai-works/class-1',
          'الجلسة 2: Deep Neural Networks [60 دقيقة]. https://generative-ai-course.hks.harvard.edu/1-how-genai-works/class-2',
          'الجلسة 3: The Alignment Problem [70 دقيقة]. https://generative-ai-course.hks.harvard.edu/1-how-genai-works/class-3',
          'الوحدة 2 — الجلسة 4: Prompt Engineering [90 دقيقة]. التشريح الرسمي للطلب في هذه الجلسة: المهمة، والتعليمات، والسياق (TIC)، ثم سلسلة التفكير، والأمثلة القليلة، والشخصيات. https://generative-ai-course.hks.harvard.edu/2-using-genai/class-4',
          'الجلسة 5: Beyond Chatbots [70 دقيقة]. أوامر النظام، وRAG، والضبوط الدقيق (fine-tuning). تنبيه رسمي: أحد تمارين هذه الجلسة يذكر الحاجة إلى اشتراك ChatGPT Plus. المحاضرة نفسها مجانية؛ التمرين المدفوع اختياري. https://generative-ai-course.hks.harvard.edu/2-using-genai/class-5',
          'الجلسة 6: When and How to Use Generative AI [60 دقيقة]. https://generative-ai-course.hks.harvard.edu/2-using-genai/class-6',
          'الجلسة 7: Using AI Tools in Practice: A Case Study [120 دقيقة]. دراسة حالة عن استخدام الأدوات في الحملات السياسية. https://generative-ai-course.hks.harvard.edu/2-using-genai/class-7',
          'الوحدة 3 — الجلسة 8: Risks of Generative AI [90 دقيقة]. https://generative-ai-course.hks.harvard.edu/society/class-8',
          'الجلسة 9: Generative AI and Copyright [80 دقيقة]. https://generative-ai-course.hks.harvard.edu/society/class-9',
          'الجلسة 10: Generative AI and the Future of Work [110 دقيقة]. https://generative-ai-course.hks.harvard.edu/society/class-10',
          'الجلسة 11: Mis/Disinformation [90 دقيقة]. https://generative-ai-course.hks.harvard.edu/society/class-11',
        ],
      },
      {
        heading: 'كيف تبدأ في خمس خطوات',
        paragraphs: [],
        list: [
          'افتح الموقع الرسمي فقط: https://generative-ai-course.hks.harvard.edu/ ثم صفحة الأرشيف Spring 2024. لا تعتمد على صور منشورات أو روابط مختصرة.',
          'اقرأ وصف الدورة والترخيص، ثم ابدأ بالجلسة 1 بالترتيب. لا تقفز مباشرة إلى التلقين قبل مقدمة النماذج ومحاذاة الأهداف.',
          'قبل كل جلسة، نفّذ التمرين التحضيري إن وُجد في الصفحة، وأنزل الشرائح من الرابط الرسمي داخل الجلسة.',
          'بعد الجلسات 4 و5 و6، طبّق برومبتًا واحدًا من القائمة أدناه على مهمة حقيقية من عملك أو دراستك، ثم احفظ النتيجة ونسختك المعدّلة.',
          'إن أردت مسارًا تقنيًا مكملًا بعد الوحدة 2 أو في نهاية الأسبوع الرابع، انتقل إلى أسبوع الذكاء الاصطناعي الرسمي في CS50x: https://cs50.harvard.edu/x/weeks/ai/ (الصفحة الحالية هي CS50x 2026).',
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
            when: 'بعد الجلسة 1، حين تظن أنك «فهمت الفكرة» وتريد تثبيتًا.',
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
            when: 'بعد الجزء الأول من الجلسة 4 عن تشريح الطلب (TIC).',
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
            when: 'بعد جزء الجلسة 4 عن Chain of Thought وFew-Shot.',
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
            when: 'بعد جزء الشخصيات (Personas) في الجلسة 4.',
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
            when: 'بعد جزء أوامر النظام في الجلسة 5، إن كنت تستخدم أي مساعد يتيح تعليمات ثابتة.',
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
            when: 'بعد شرح RAG في الجلسة 5، من دون الالتزام بتمرين المنصة الذي قد يتطلب اشتراكًا مدفوعًا.',
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
            when: 'بعد الجلسة 6 عن متى وكيف تستخدم الذكاء الاصطناعي التوليدي.',
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
            title: 'صيغة صادقة بعد إكمال الأرشيف أو محاضرة CS50',
            when: 'حين تنتهي من وحدات الأرشيف أو من أسبوع CS50 وتريد أن تذكر ذلك في ملف مهني.',
            expect: 'فقرة قصيرة تفرّق بين مشاهدة مواد مفتوحة وبين درجة أو شهادة رسمية.',
            text: `أكملت: [11 جلسة الأرشيف المجاني لدورة Harvard Kennedy School لربيع 2024 / أسبوع الذكاء الاصطناعي في CS50x / الاثنين].
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
          'الأسبوع 1 (الوحدة 1): الجلسات 1 إلى 3 من الموقع الرسمي، مع التمارين التحضيرية والشرائح. بعد الجلسة 1 استخدم برومبت اختبار الفهم على فقرة من عملك. لا تنتقل إلى التلقين قبل أن تنتهي هذه الوحدة.',
          'الأسبوع 2 (بداية الوحدة 2): الجلسة 4 كاملة ثم تمارين TIC وسلسلة التفكير والشخصية على مهمة حقيقية واحدة. إن بقي وقت، ابدأ الجلسة 5 واكتب أمر نظام قصيرًا.',
          'الأسبوع 3: أكمل الجلسة 5 (مع تمرين الاسترجاع البسيط من مستند، من دون اشتراك مدفوع إن لم تكن تحتاج تمرين المنصة)، ثم الجلستين 6 و7. اكتب قرارًا مكتوبًا: مهمة واحدة ستستخدم فيها الأداة، ومهمة لن تستخدمها.',
          'الأسبوع 4 (الوحدة 3): الجلسات 8 إلى 11 عن المخاطر وحقوق النشر ومستقبل العمل والتضليل. إن بقي متسع، شاهد أسبوع الذكاء الاصطناعي في CS50x من الصفحة الرسمية، ثم صغ فقرة صادقة عمّا أنجزته. لا تضف «خريج هارفارد» في أي مكان.',
        ],
      },
      {
        heading: 'مسار مكمل: أسبوع CS50 والأحاديث الرسمية',
        paragraphs: [
          'CS50x هي مقدمة هارفارد الشهيرة لعلوم الحاسوب، ومتاحة مجانًا عبر OpenCourseWare. أسبوع الذكاء الاصطناعي الحالي على https://cs50.harvard.edu/x/weeks/ai/ (CS50x 2026 وقت كتابة هذا الدليل). الصفحة تجمع المحاضرة والشرائح والنصوص، وتغطي مفاهيم منها التلقين، وأمر النظام وأمر المستخدم، والتعلم الآلي، والشبكات العصبية، والنماذج اللغوية الكبيرة، والهلوسة. أرشيف 2025 ما زال موجودًا على https://cs50.harvard.edu/x/2025/weeks/ai/ إن أردت النسخة السابقة.',
          'مشاهدة هذا الأسبوع وحده لا تساوي شهادة CS50. حسب الموقع الرسمي، يمكنك دراسة المقرر مجانًا. وهناك شهادة CS50 مجانية إن استوفيت شروط التمارين والمشروع النهائي، وشهادة موثّقة مدفوعة عبر edX إن رغبت. لا تخلط بين مشاهدة محاضرة الأسبوع والحصول على الشهادة.',
          'على قناة CS50 الرسمية على يوتيوب أحاديث تقنية إضافية، منها: «GPT-4 - How does it work, and how do I build apps with it? - CS50 Tech Talk» على https://www.youtube.com/watch?v=vw-KWfKwvTQ و«Large Language Models and The End of Programming - CS50 Tech Talk with Dr. Matt Welsh» على https://www.youtube.com/watch?v=JhCl-GeT4jw العنوان الثاني رأي محاضر في حديث، لا خلاصة علمية ملزمة، فاسمعه نقديًا بعد أن تبني الأساس من الأرشيف.',
          'إن كنت معلّمًا، توجد قائمة تشغيل رسمية بعنوان Generative AI in Teaching & Learning على قناة Harvard - Office of the VPAL: https://www.youtube.com/playlist?list=PL_kRkvxqHjkqjnhAdSdejAkyQf1TnPkNM كما أن موقع HKS SLATE يجمع روابطًا إرشادية بما فيها الدورة المؤرشفة: https://sites.google.com/g.harvard.edu/hksslate-genai/the-basics-of-generative-ai هذا موقع موارد، لا محاضرة سادسة مستقلة.',
        ],
      },
      {
        heading: 'بعد المشاهدة: كيف تتحدث عن ذلك بصدق',
        paragraphs: [
          'صياغة جيدة: «أكملت النسخة المجانية المؤرشفة من دورة Harvard Kennedy School «علم الذكاء الاصطناعي التوليدي وانعكاساته» (ربيع 2024، 11 جلسة)، وطبّقت تمارين تلقين واسترجاع على مهام من عملي». إن شاهدت أسبوع CS50 فأضف ذلك باسمه، لا أكثر.',
          'صياغة مضلّلة: «حصلت على درجة هارفارد في الذكاء الاصطناعي»، أو «أتممت أغلى برنامج في العالم مجانًا»، أو «أنا خريج CS50» بعد مشاهدة محاضرة واحدة. لا تستخدم هذا الأسلوب.',
          'الأرشيف مفيد لأنه رسمي ومفتوح، لا لأنه بديل عن القبول الجامعي أو عن البرنامج التنفيذي المدفوع أو عن متطلبات شهادة CS50.',
        ],
      },
      {
        heading: 'أخطاء شائعة',
        paragraphs: [],
        list: [
          'البدء من صورة منشور تقول إن «درجة هارفارد صارت مجانية». المواد المجانية محاضرات ونسخة مؤرشفة، لا درجة.',
          'القفز إلى جلسة التلقين أو RAG دون الوحدة الأولى.',
          'معاملة قائمة تشغيل قصيرة على وسائل التواصل باعتبارها الكتالوج الرسمي، بينما الأرشيف يضم 11 جلسة معلنة.',
          'الخلط بين الأرشيف المجاني وبرنامج التعليم التنفيذي المدفوع في Kennedy School.',
          'افتراض أن كل تمرين داخل الجلسة 5 يعمل من دون اشتراك؛ الصفحة نفسها تنبّه إلى أن أحد التمارين قد يحتاج ChatGPT Plus.',
          'ذكر CS50 وكأن مشاهدة أسبوع الذكاء الاصطناعي تمنح الشهادة.',
          'اعتماد عنوان حديث «نهاية البرمجة» كحقيقة مسلّمة بدل سماعه كرأي في محاضرة.',
          'كتابة الإنجاز في السيرة بصيغة توحي بقبول أو تخرج من هارفارد.',
        ],
      },
      {
        heading: 'قائمة تحقق سريعة',
        paragraphs: [],
        list: [
          'فتحت https://generative-ai-course.hks.harvard.edu/spring-2024 وبدأت من الجلسة 1 لا من رابط مختصر.',
          'عرفت أن الأرشيف مجاني ومختلف عن برنامج التعليم التنفيذي المدفوع.',
          'أكملّت الوحدات الثلاث، أو حددت بوضوح ما أجّلته ولماذا.',
          'طبّقت على الأقل ثلاثة برومبتات على مهمة حقيقية (TIC، وشخصية أو سلسلة تفكير، واسترجاع من مستند أو أمر نظام).',
          'إن شاهدت CS50، استخدمّت الصفحة الرسمية لأسبوع الذكاء الاصطناعي، وفرّقت بين المحاضرة والشهادة.',
          'كتبت فقرة صادقة خالية من ادّعاء الدرجة أو التخرج.',
        ],
      },
    ],
  },
  en: {
    title:
      'Harvard’s Free AI Lectures: How to Work Through the Archived Kennedy School Course (11 Sessions), Then CS50’s AI Week, With Ready-to-Copy Practice Prompts',
    excerpt:
      'Harvard Kennedy School has released a free archived version of its Spring 2024 course “The Science and Implications of Generative AI”: 11 sessions with videos, slides, and exercises. This is a practical four-week path, with ready-to-copy prompts after the prompting and RAG sessions, plus a complementary route through CS50’s AI week — without confusing free lectures with a degree or the paid executive program.',
    hook:
      'By the end of this guide you will know how to open the free archived Harvard Kennedy School course on the official site, how to work through all 11 sessions in unit order, how to practice with ready-to-copy prompts after the prompting, system-prompt, and RAG classes, and how to add CS50’s AI week if you want a deeper technical path — plus an honest way to describe what you completed.',
    sections: [
      {
        paragraphs: [
          'Posts that say “Harvard is now free” leave out the important part. What is officially free is specific: an archived version of a Spring 2024 in-person course at Harvard Kennedy School, plus other open materials such as CS50’s AI week. A university degree, the executive-education program, and a full CS50 certificate each have different conditions, and some of them are paid.',
          'This article is a working method. Every factual claim here is attributed to official Harvard sites or official Harvard channels. You will not find a claim that these materials equal the world’s most expensive degree, or a promise that watching videos makes you a Harvard graduate.',
        ],
      },
      {
        heading: 'What Harvard has officially made free',
        paragraphs: [
          'On the official site https://generative-ai-course.hks.harvard.edu/ Harvard Kennedy School faculty Sharad Goel, Dan Levy, and Teddy Svoronos describe several offerings on generative AI and public policy. For educators and learners they state, explicitly, that there is “a free, archived version of our 2024 in-person course.”',
          'The archive page is https://generative-ai-course.hks.harvard.edu/spring-2024 and the official title is The Science and Implications of Generative AI — Spring 2024. The page states that the materials come from the Spring 2024 iteration, and that the collection of videos and course content is meant to introduce how generative AI works, how to use it, and the opportunities and challenges it poses for society. Except where otherwise noted, the content is licensed under Creative Commons Attribution 4.0. The page also links an official YouTube playlist of the course videos: https://www.youtube.com/playlist?list=PL9scSybOWDNHyvVr0RGYgnjzmqKUBCj8r',
          'The course is organized into three units and 11 sessions, with an official running time listed for each session, plus pre-class work, videos, and in-class activities on each session page. The units are: how generative AI works (science); how to use it (individuals and organizations); and its implications (society).',
          'This archive is not the paid Harvard Kennedy School executive program. The official executive-education page lists a six-week online program, Generative AI: How to Use It and Why It Matters, with a listed program fee of $1,995 for the January–February 2027 session: https://www.hks.harvard.edu/educational-programs/executive-education/generative-ai-how-use-it-and-why-it-matters Do not confuse the free archive with that program.',
        ],
      },
      {
        heading: 'The worked example: Yusuf, an office role, and four evening sessions a week',
        paragraphs: [
          'Yusuf works in an administrative role and already uses AI tools in a messy way: he types a quick request, pastes the result, then fixes it by hand. In four weeks he wants a solid foundation, better prompts, and a clear sense of when not to use the tool. He does not want to announce that he “studied at Harvard.”',
          'His goal is precise: finish the three official archive units in order, run a short exercise after each practical session, then watch CS50’s AI week if time remains. If your week is tighter, keep week four for sessions 8 to 11 (risks, copyright, work, and misinformation). That is the part most short social lists skip.',
        ],
      },
      {
        heading: 'The 11 sessions, as Harvard names them',
        paragraphs: [
          'Start from the archive page, not from shortened links. Times in brackets are the official lengths listed on that page, and may include activities, not only video. These are the official session pages:',
        ],
        list: [
          'Unit 1 — Session 1: Introduction to Generative AI [90 min]. https://generative-ai-course.hks.harvard.edu/1-how-genai-works/class-1',
          'Session 2: Deep Neural Networks [60 min]. https://generative-ai-course.hks.harvard.edu/1-how-genai-works/class-2',
          'Session 3: The Alignment Problem [70 min]. https://generative-ai-course.hks.harvard.edu/1-how-genai-works/class-3',
          'Unit 2 — Session 4: Prompt Engineering [90 min]. This session’s official prompt anatomy is Task, Instructions, and Context (TIC), then chain of thought, few-shot prompting, and personas. https://generative-ai-course.hks.harvard.edu/2-using-genai/class-4',
          'Session 5: Beyond Chatbots [70 min]. System prompts, RAG, and fine-tuning. Official note: one exercise on this page says you will need a ChatGPT Plus account. The lecture itself is free; the paid exercise is optional. https://generative-ai-course.hks.harvard.edu/2-using-genai/class-5',
          'Session 6: When and How to Use Generative AI [60 min]. https://generative-ai-course.hks.harvard.edu/2-using-genai/class-6',
          'Session 7: Using AI Tools in Practice: A Case Study [120 min]. A case study on using AI tools in political campaigns. https://generative-ai-course.hks.harvard.edu/2-using-genai/class-7',
          'Unit 3 — Session 8: Risks of Generative AI [90 min]. https://generative-ai-course.hks.harvard.edu/society/class-8',
          'Session 9: Generative AI and Copyright [80 min]. https://generative-ai-course.hks.harvard.edu/society/class-9',
          'Session 10: Generative AI and the Future of Work [110 min]. https://generative-ai-course.hks.harvard.edu/society/class-10',
          'Session 11: Mis/Disinformation [90 min]. https://generative-ai-course.hks.harvard.edu/society/class-11',
        ],
      },
      {
        heading: 'How to start in five steps',
        paragraphs: [],
        list: [
          'Open the official site only: https://generative-ai-course.hks.harvard.edu/ and then the Spring 2024 archive. Do not start from a social-media image or a shortened link.',
          'Read the course description and the license, then begin with session 1 in order. Do not jump straight to prompting before the introduction to models and alignment.',
          'Before each session, do the pre-class exercise if the page has one, and download the slides from the official link on that session page.',
          'After sessions 4, 5, and 6, run one prompt from the list below on a real task from your work or studies, then save both the model’s output and your edited version.',
          'If you want a complementary technical path after unit 2 or at the end of week four, go to the official CS50x AI week: https://cs50.harvard.edu/x/weeks/ai/ (the current page is CS50x 2026).',
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
            when: 'After session 1, when you think you “get the idea” and want it to stick.',
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
            when: 'After the first part of session 4, on the anatomy of a prompt (TIC).',
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
            when: 'After the session 4 segment on chain of thought and few-shot prompting.',
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
            when: 'After the personas segment in session 4.',
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
            when: 'After the system-prompt segment in session 5, if you use any assistant that accepts standing instructions.',
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
            when: 'After the RAG explanation in session 5, without depending on the course exercise that may require a paid subscription.',
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
            when: 'After session 6, on when and how to use generative AI.',
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
            title: 'An honest write-up after the archive or a CS50 lecture',
            when: 'When you have finished the archive units or CS50’s AI week and want to mention it on a professional profile.',
            expect: 'A short paragraph that separates open-course study from a degree or an official certificate.',
            text: `I completed: [the 11 sessions of the free archived Harvard Kennedy School Spring 2024 course / CS50x’s AI week / both].
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
          'Week 1 (unit 1): sessions 1 to 3 on the official site, including pre-class exercises and slides. After session 1, run the comprehension prompt on a paragraph from your work. Do not move to prompting before this unit is done.',
          'Week 2 (start of unit 2): all of session 4, then the TIC, chain-of-thought, and persona drills on one real task. If time remains, start session 5 and write a short system prompt.',
          'Week 3: finish session 5 (use the simple document-retrieval drill, and skip any platform exercise that requires a paid plan if you do not have one), then sessions 6 and 7. Write down one task you will use the tool for, and one you will not.',
          'Week 4 (unit 3): sessions 8 to 11 on risks, copyright, the future of work, and misinformation. If you still have room, watch CS50x’s AI week from the official page, then write an honest paragraph about what you did. Do not add “Harvard graduate” anywhere.',
        ],
      },
      {
        heading: 'A complementary path: CS50’s AI week and official talks',
        paragraphs: [
          'CS50x is Harvard’s well-known introduction to computer science, and it is free to take via OpenCourseWare. The current AI week is at https://cs50.harvard.edu/x/weeks/ai/ (CS50x 2026 at the time of this guide). The page collects the lecture, slides, and transcripts, and covers topics including prompting, system and user prompts, machine learning, neural networks, large language models, and hallucinations. The 2025 archive remains at https://cs50.harvard.edu/x/2025/weeks/ai/ if you want that year’s version.',
          'Watching this week alone is not a CS50 certificate. According to the official site, you may take the course for free. There is also a free CS50 Certificate if you meet the problem-set and final-project requirements, and a paid verified certificate through edX if you want one. Do not confuse watching the week’s lecture with earning the certificate.',
          'The official CS50 YouTube channel also hosts additional tech talks, including “GPT-4 - How does it work, and how do I build apps with it? - CS50 Tech Talk” at https://www.youtube.com/watch?v=vw-KWfKwvTQ and “Large Language Models and The End of Programming - CS50 Tech Talk with Dr. Matt Welsh” at https://www.youtube.com/watch?v=JhCl-GeT4jw The second title is a speaker’s framing in a talk, not a binding scientific conclusion, so watch it critically after you have the foundation from the archive.',
          'If you teach, there is an official playlist titled Generative AI in Teaching & Learning on the Harvard - Office of the VPAL channel: https://www.youtube.com/playlist?list=PL_kRkvxqHjkqjnhAdSdejAkyQf1TnPkNM HKS SLATE also maintains a resource page that points to the archived course and related guidance: https://sites.google.com/g.harvard.edu/hksslate-genai/the-basics-of-generative-ai That site is a resource hub, not a separate sixth lecture.',
        ],
      },
      {
        heading: 'After you watch: how to talk about it honestly',
        paragraphs: [
          'A sound line: “I completed the free archived version of Harvard Kennedy School’s course The Science and Implications of Generative AI (Spring 2024, 11 sessions), and I practiced prompting and retrieval exercises on tasks from my work.” If you also watched CS50’s AI week, add it by name, and nothing more.',
          'A misleading line: “I earned a Harvard degree in AI,” or “I finished the world’s most expensive program for free,” or “I am a CS50 graduate” after watching one lecture. Do not use that kind of wording.',
          'The archive is valuable because it is official and open, not because it replaces university admission, the paid executive program, or the requirements for a CS50 certificate.',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [],
        list: [
          'Starting from a social post that says “a Harvard degree is now free.” The free materials are lectures and an archived course, not a degree.',
          'Jumping to the prompting or RAG session before finishing unit 1.',
          'Treating a short social-media list as the official catalog, when the archive announces 11 sessions.',
          'Confusing the free archive with Kennedy School’s paid executive-education program.',
          'Assuming every exercise in session 5 works without a subscription; the page itself notes that one exercise may require ChatGPT Plus.',
          'Talking about CS50 as if watching the AI week grants the certificate.',
          'Taking the talk title “the end of programming” as settled fact, instead of hearing it as a view in a lecture.',
          'Writing the achievement on a resume in a way that suggests Harvard admission or graduation.',
        ],
      },
      {
        heading: 'Quick checklist',
        paragraphs: [],
        list: [
          'You opened https://generative-ai-course.hks.harvard.edu/spring-2024 and started at session 1, not from a shortened link.',
          'You know the archive is free and is separate from the paid executive program.',
          'You finished the three units, or you have clearly noted what you deferred and why.',
          'You ran at least three prompts on a real task (TIC, a persona or chain-of-thought drill, and either document retrieval or a system prompt).',
          'If you watched CS50, you used the official AI-week page and distinguished the lecture from the certificate.',
          'You wrote an honest paragraph that does not claim a degree or graduation.',
        ],
      },
    ],
  },
}
