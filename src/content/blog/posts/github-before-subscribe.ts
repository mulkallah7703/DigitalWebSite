import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'github-repos-before-you-subscribe',
  date: '2026-11-11',
  cover: '/blog/github-repos-before-you-subscribe.webp?v=7',
  coverAlt: {
    ar: 'غلاف مقال: ابحث في GitHub قبل أن تدفع اشتراكًا جديدًا',
    en: 'Cover: search GitHub before you pay for a new subscription',
  },
  tags: ['GitHub', 'Open Source', 'Tools'],
  ar: {
    title:
      'ابحث في GitHub قبل أن تدفع اشتراكًا: 10 مستودعات عملية، وكيف تختار منها، وقائمة أمان قبل التثبيت',
    excerpt:
      'ليست قائمة "أفضل 10" للحفظ ثم النسيان. هذا دليل للتفريق بين قوائم الموارد والأدوات القابلة للتشغيل، مع رابط كل مستودع، رخصته، عدد نجومه التقريبي في 11 نوفمبر 2026، وأمر البدء من ملف README الرسمي، وما الذي قد يغني عنه — وما الذي لن يغني.',
    hook:
      'بعد هذا الدليل ستعرف أيًا من هذه المستودعات قائمة للتصفح وأيها برنامج تثبّته، وكيف تبدأ بأمر واحد من الوثائق الرسمية، وما الذي تتحقق منه قبل تشغيل أي كود على جهازك.',
    sections: [
      {
        paragraphs: [
          'دفع اشتراك شهري أسهل من قراءة رخصة أو تجربة أداة محلية. لذلك نشتري أحيانًا خدمة لم نختبر بديلها المفتوح، أو نجمع قوائم روابط ولا نفتح منها شيئًا. هذا المقال يعالج المشكلتين معًا: عشرة مستودعات معروفة على GitHub، لكل منها استخدام واضح وحدود واضحة.',
          'أرقام النجوم أدناه تقريبية حسب GitHub API في 11 نوفمبر 2026. النجوم ليست مقياس جودة وحدها، والرخصة والاستخدام المسموح يحدده ملف كل مشروع. لا أكرر وعودًا مثل "ستستغني عن كل الاشتراكات"، لأن القوائم ليست منتجات، واستضافة أداة بنفسك لها تكلفة كهرباء ووقت وصيانة، وبعض النماذج أو الواجهات تبقى مدفوعة حتى مع أداة مجانية.',
        ],
      },
      {
        heading: 'أولًا: فرّق بين القائمة والأداة',
        paragraphs: [
          'خمسة من هذه المستودعات قوائم منسّقة (Awesome أو أدلة). تفتحها في المتصفح وتختار عنصرًا، ولا تحتاج تثبيتها كبرنامج. الخمسة الأخرى أدوات أو منصات تشغّلها محليًا (أو من ملفاتها الجاهزة). إذا خلطت النوعين، ستظن أنك "ثبّتّ 10 أدوات" بينما معظمها مرجع.',
        ],
        list: [
          'قوائم للتصفح: public-apis، awesome-mcp-servers، awesome-llm-apps، awesome، free-for-dev.',
          'أدوات تشغيل: Open Design، Scrapling، Ollama، Langflow، OpenHands.',
        ],
      },
      {
        heading: '1) public-apis/public-apis — دليل واجهات برمجية مجانية',
        paragraphs: [
          'مستودع يجمع قائمة يدوية لواجهات برمجية عامة مجانية حسب المجال (طقس، مالية، صور، ألعاب وغيرها). الرخصة MIT، وحوالي 498 ألف نجمة. العنوان: https://github.com/public-apis/public-apis',
          'لمن؟ مطور أو طالب يريد تجربة فكرة بسرعة قبل الاشتراك في واجهة مدفوعة. لا يغني عن واجهة إنتاج بحدود أعلى أو اتفاقية مستوى خدمة؛ كثير من العناصر في القائمة لها حدود استخدام أو مفاتيح خاصة. البدء: افتح README وابحث عن التصنيف، ثم اقرأ صفحة الواجهة نفسها قبل كتابة أي كود.',
        ],
        prompts: [
          {
            title: 'اختَر 3 واجهات لمشروعي',
            when: 'عندما يكون لديك فكرة تطبيق ولا تريد دفع واجهة فورية.',
            expect: 'ثلاثة خيارات مع سبب الرفض أو القبول، وما يجب أن تتحقق منه في صفحة كل واجهة.',
            text: `فكرة مشروعي: [وصف قصير]
قيودي: اللغة [JS/Python]، بدون ميزانية لهذا الأسبوع، والمنطقة [مثلًا السعودية].

سأستخدم قائمة https://github.com/public-apis/public-apis كمرجع فقط.
اقترح 3 واجهات مناسبة من فئات القائمة، ولكل واحدة:
1) ماذا تغطي؟
2) ما الذي يجب أن أقرأه في صفحتها الرسمية (حدود، مفتاح، رخصة الاستخدام)؟
3) ما البديل إن كانت غير مناسبة للإنتاج؟
لا تخترع اسم واجهة غير موجود؛ إن لم تكن متأكدًا قل لي أبحث في القائمة.`,
          },
        ],
      },
      {
        heading: '2) punkpeye/awesome-mcp-servers — دليل خوادم MCP',
        paragraphs: [
          'قائمة منسّقة لخوادم Model Context Protocol التي تربط وكلاء الذكاء الاصطناعي بأدوات ومصادر بيانات. الرخصة MIT، وحوالي 98 ألف نجمة. العنوان: https://github.com/punkpeye/awesome-mcp-servers',
          'لمن؟ من يستخدم Claude أو أدوات وكيلة ويدرس ربطها بالملفات أو GitHub أو قواعد البيانات بدل شراء "سوق وكلاء" مغلق من أول يوم. هذا دليل وليس خادمًا جاهزًا: كل خادم له مستودعه ورخصته ومخاطره. لا تربط خادمًا غير موثوق بحساباتك أو ملفاتك.',
        ],
      },
      {
        heading: '3) nexu-io/open-design — مساحة تصميم بوكلاء الذكاء الاصطناعي',
        paragraphs: [
          'تطبيق محلي أولًا يحوّل وكيل البرمجة إلى مساعد تصميم (نماذج أولية، لوحات، عروض، وأنظمة تصميم). الرخصة Apache-2.0، وحوالي 107 آلاف نجمة، وآخر تحديث نشط. العنوان: https://github.com/nexu-io/open-design',
          'لمن؟ مصمم أو مطور يريد مسودة تصميم دون الاشتراك فورًا في أداة تصميم ذكية مغلقة. قد يقلل الحاجة لبعض أدوات التصميم المدعومة بالذكاء الاصطناعي في مرحلة الاستكشاف، لكنه لا يلغي مراجعة مصمم بشري، وقد تحتاج مفاتيح نماذج مدفوعة. الوثائق الرسمية توصي بتحميل تطبيق سطح المكتب من الموقع أو GitHub Releases (macOS وWindows). Linux لا يملك ملفًا جاهزًا منشورًا وقت التحقق؛ التشغيل من المصدر حسب README:',
        ],
        list: [
          'git clone https://github.com/nexu-io/open-design.git',
          'cd open-design && corepack enable && pnpm install',
          'pnpm tools-dev run web',
          'يتطلب Node نحو 24 وpnpm 10.33.x حسب الوثائق.',
        ],
      },
      {
        heading: '4) Shubhamsaboo/awesome-llm-apps — تطبيقات وكلاء وRAG جاهزة للتعلم',
        paragraphs: [
          'مجموعة أكثر من 100 مثال لوكلاء وتطبيقات RAG ومهارات، بكود مفتوح يمكن نسخه وتطويره. الرخصة Apache-2.0، وحوالي 144 ألف نجمة. العنوان: https://github.com/Shubhamsaboo/awesome-llm-apps',
          'لمن؟ من يريد أن يتعلم بالتشغيل لا بالقراءة فقط. لا يستبدل منتجًا سحابيًا جاهزًا؛ أنت تشغّل المثال محليًا وقد تدفع لمزوّد النموذج إن لم تستخدم نموذجًا محليًا. مثال البدء من README:',
        ],
        list: [
          'git clone https://github.com/Shubhamsaboo/awesome-llm-apps.git',
          'cd awesome-llm-apps/starter_ai_agents/ai_travel_agent',
          'pip install -r requirements.txt',
          'streamlit run travel_agent.py',
        ],
      },
      {
        heading: '5) sindresorhus/awesome — قائمة القوائم',
        paragraphs: [
          'فهرس كبير لـ "قوائم Awesome" في معظم المجالات التقنية. الرخصة CC0-1.0، وحوالي 535 ألف نجمة. العنوان: https://github.com/sindresorhus/awesome',
          'لمن؟ أي شخص يبدأ موضوعًا جديدًا ويريد بوابة واحدة. ملاحظة من المستودع نفسه: طلبات السحب معطّلة مؤقتًا حتى يلحق المسؤول بالمراجعات، وآخر دفع ظاهر وقت التحقق كان في سبتمبر 2026. استخدمه كنقطة انطلاق، ثم انتقل إلى القائمة الفرعية الرسمية للموضوع.',
        ],
      },
      {
        heading: '6) D4Vinci/Scrapling — إطار استخراج صفحات لمن يحق له جمعها',
        paragraphs: [
          'مكتبة Python لجلب الصفحات واستخراج بياناتها (طلبات عادية أو عبر متصفح). الرخصة BSD-3-Clause، وحوالي 101 ألف نجمة. العنوان: https://github.com/D4Vinci/Scrapling',
          'لمن؟ مطور يجمع بيانات من مواقع يملكها أو مصرّح له بجمعها، وقد يغني في هذه الحالة عن بعض خدمات الاستخراج المدفوعة. لا تستخدمه لتجاوز حماية موقع أو تجاهل شروطه. وثّقت هنا أمر التثبيت الرسمي ومثالًا على موقع تعليمي مخصص للتجربة فقط (quotes.toscrape.com) كما في README:',
        ],
        list: [
          'pip install scrapling',
          'إن احتجت الجوالب (fetchers) وليس المحلل فقط: pip install "scrapling[fetchers]" ثم scrapling install',
          'اختبر على quotes.toscrape.com فقط حتى تتأكد أن البيئة تعمل، ثم استخدمه على مصادر مسموحة لك.',
        ],
      },
      {
        heading: '7) ripienaar/free-for-dev — دليل الخطط المجانية للمطورين',
        paragraphs: [
          'قائمة لخدمات SaaS وPaaS وIaaS ذات شرائح مجانية تهم العاملين على البنية والتطوير. الموقع المقروء هو نسخة من المستودع. حوالي 142 ألف نجمة، وآخر تحديث في نوفمبر 2026. العنوان: https://github.com/ripienaar/free-for-dev',
          'لمن؟ من يبني مشروعًا جانبيًا أو بيئة تعلم ويريد تجنب الخطة المدفوعة في البداية. القائمة ليست "كل شيء مجاني إلى الأبد": كل خدمة لها حدودها. حتى 11 نوفمبر 2026 لم أجد ملف رخصة SPDX في جذر المستودع؛ تعامل مع المحتوى كمرجع، وتحقق من شروط كل خدمة قبل الاعتماد عليها.',
        ],
      },
      {
        heading: '8) ollama/ollama — تشغيل نماذج لغوية على جهازك',
        paragraphs: [
          'برنامج لتشغيل نماذج مفتوحة (مثل عائلات Llama وMistral وDeepSeek وغيرها حسب الكتالوج الحالي) محليًا أو في إعداد خاص. الرخصة MIT، وحوالي 187 ألف نجمة. العنوان: https://github.com/ollama/ollama',
          'لمن؟ من يريد تجربة خاصة أو دون إنترنت، وقد يقلل فاتورة واجهات النماذج المدفوعة للمهام اليومية البسيطة. لا يساوي جودة أو سرعة أحدث النماذج السحابية بالضرورة، ويحتاج مساحة قرص وذاكرة كافية. أوامر التثبيت من README الرسمي:',
        ],
        list: [
          'macOS / Linux: curl -fsSL https://ollama.com/install.sh | sh',
          'Windows (PowerShell): irm https://ollama.com/install.ps1 | iex',
          'أو حمّل الملف من صفحة التنزيل الرسمية. بعد التثبيت: ollama run llama3.2 (أو اسم النموذج الذي تختاره من المكتبة).',
        ],
        prompts: [
          {
            title: 'استخدم نموذجي المحلي كمراجع كود',
            when: 'بعد تشغيل Ollama ونموذج واحد على الأقل.',
            expect: 'مراجعة محدودة بدون اختراع مكتبات، مع ذكر ما يحتاج تحققًا بشريًا.',
            text: `أنت مراجع كود تعمل على جهاز محلي. اللغة: [Python/TypeScript].
هذا المقطع:
[الصق الدالة]

1) اشرح ما تفعله بجملتين.
2) أشر إلى خطأ أو حالة حدية واحدة إن وُجدت.
3) لا تقترح حزمًا لم أذكرها.
إن لم تكن متأكدًا قل "غير متأكد".`,
          },
        ],
      },
      {
        heading: '9) langflow-ai/langflow — بناء وكلاء ومسارات بالسحب',
        paragraphs: [
          'منصة مفتوحة لبناء وكلاء ومسارات عمل بالواجهة الرسومية، مع تشغيل محلي ونشر لاحق كواجهة أو MCP. الرخصة MIT، وحوالي 157 ألف نجمة. العنوان: https://github.com/langflow-ai/langflow',
          'لمن؟ من يريد تجريب مسار RAG أو وكيل بصريًا قبل الالتزام بمنصة تنسيق مدفوعة. الاستضافة الذاتية تحتاج صيانة، والنماذج قد تكون مدفوعة. البدء حسب الوثائق (Python 3.10–3.14 وواجهة uv):',
        ],
        list: [
          'uv pip install langflow -U',
          'عيّن LANGFLOW_SUPERUSER_PASSWORD قبل التشغيل في حزم الإصدار الرسمية، ثم: uv run langflow run',
          'يفتح عادة على http://127.0.0.1:7860 — تسجيل الدخول باسم langflow ما لم تغيّر الإعداد.',
        ],
      },
      {
        heading: '10) OpenHands/OpenHands — وكيل برمجة يمكن استضافته',
        paragraphs: [
          'منصة وكيل برمجي (Agent Canvas) لكتابة الكود وتشغيل الاختبارات وأتمتة مهام التطوير، مع خيار الاستضافة الذاتية. الرخصة MIT، وحوالي 93 ألف نجمة. المستودع انتقل من All-Hands-AI/OpenHands إلى https://github.com/OpenHands/OpenHands (الرابط القديم يحوّل إلى الحالي).',
          'لمن؟ فريق أو مطور يريد وكيلًا برمجيًا تحت سيطرته بدل الاعتماد كليًا على وكيل سحابي مدفوع. هذا ليس بديلًا مطابقًا لأي منتج تجاري محدد، ويحتاج حذرًا أمنيًا: الوثائق تحذّر أن التشغيل بلا عزل يمنح الوكيل وصولًا واسعًا إلى ملفات الجهاز. الطريقة الأوضح للبداية من README هي تشغيل الصورة مع عزل Docker (بعد إنشاء مجلد مشاريع):',
        ],
        list: [
          'export PROJECTS_PATH="$HOME/projects" && mkdir -p "$PROJECTS_PATH"',
          'docker run -it --rm -p 127.0.0.1:8000:8000 -e AGENT_CANVAS_ALLOW_LAN_SESSION_KEY=true -v openhands-state:/home/openhands/.openhands -v "${PROJECTS_PATH}:/projects" ghcr.io/openhands/agent-canvas:1.38.0',
          'ثم افتح http://localhost:8000/canvas — ثبت رقم الإصدار من صفحة الإصدارات قبل النسخ، فقد يتغير.',
        ],
      },
      {
        heading: 'جدول مقارنة سريع',
        paragraphs: ['كل صف: النوع، ماذا قد يستغني عنه في مرحلة التجربة، وأبرز قيد. النجوم تقريبية في 11 نوفمبر 2026.'],
        list: [
          'public-apis — قائمة — البحث عن واجهة مجانية للتجربة — تحقق من حدود كل واجهة. ~498 ألف نجمة، MIT.',
          'awesome-mcp-servers — قائمة — اكتشاف خوادم MCP بدل سوق مغلق — راجع أمان كل خادم. ~98 ألف، MIT.',
          'open-design — أداة سطح مكتب/مصدر — مسودات تصميم بمساعدة وكيل — قد تحتاج مفاتيح نماذج. ~107 آلاف، Apache-2.0.',
          'awesome-llm-apps — أمثلة جاهزة — تعلم البناء بالتشغيل — ليست خدمة مستضافة. ~144 ألف، Apache-2.0.',
          'awesome — فهرس قوائم — بدء البحث في موضوع جديد — ليست أداة تشغيل. ~535 ألف، CC0-1.0.',
          'Scrapling — مكتبة Python — جمع بيانات من مصادر مصرّح بها — التزم بالقانون وشروط الموقع. ~101 ألف، BSD-3-Clause.',
          'free-for-dev — قائمة خطط مجانية — تأجيل الاشتراك في مرحلة التعلم — اقرأ حد كل خدمة. ~142 ألف، بلا ملف رخصة SPDX في الجذر وقت التحقق.',
          'Ollama — تطبيق محلي — تقليل بعض استخدام واجهات النماذج للمهام الخاصة — يحتاج RAM وقرصًا. ~187 ألف، MIT.',
          'Langflow — منصة مسارات — تجربة وكيل بصري قبل منصة مدفوعة — استضافة وصيانة. ~157 ألف، MIT.',
          'OpenHands — وكيل برمجة — فئة وكلاء التطوير القابلة للاستضافة — استخدم عزل Docker. ~93 ألف، MIT.',
        ],
      },
      {
        heading: 'كيف تختار؟',
        paragraphs: ['لا تثبّت العشرة. اختر واحدًا حسب سؤالك هذا الأسبوع:'],
        list: [
          'أريد فكرة أو مصدرًا: ابدأ بـ awesome أو public-apis أو free-for-dev.',
          'أريد نموذجًا محليًا خاصًا: Ollama، ثم مثالًا من awesome-llm-apps يعمل مع نموذجك.',
          'أريد تصميم مسودة: Open Design بعد قراءة متطلبات النموذج.',
          'أريد مسار وكيل بصري: Langflow.',
          'أريد وكيلًا يلمس شفرتي: OpenHands داخل Docker فقط في البداية.',
          'أريد ربط وكيل بأدوات: دليل MCP، مع مراجعة كل خادم قبل التوصيل.',
        ],
      },
      {
        heading: 'قائمة أمان قبل تثبيت أي مستودع مفتوح',
        paragraphs: [],
        list: [
          'اقرأ الرخصة (MIT / Apache-2.0 / BSD / CC0 / أو غيابها) وهل يناسب استخدامك التجاري.',
          'تأكد أن الرابط هو المستودع الرسمي (صاحب الحساب، وعدد النجوم، وآخر تحديث)، واحذر النسخ المزيّفة.',
          'لا تشغّل سكربت تثبيت من الإنترنت (مثل pip أو sh) بصلاحيات مدير النظام إلا إذا فهمت ما يفعله.',
          'ثبّت إصدارات pinned حين تستطيع، وراجع أوامر curl | sh قبل تنفيذها.',
          'مفاتيح الـ API في متغيرات بيئة، لا في المستودع ولا في لقطات الشاشة.',
          'لا تربط خادم MCP أو وكيلًا بمجلد فيه أسرار حتى تعزل الصلاحيات.',
          'وكلاء الكتابة على الملفات: استخدم حاوية أو مجلد مشروع منفصل، كما توصي وثائق OpenHands.',
          'جمع البيانات من الويب: فقط حيث لديك إذن، مع احترام الشروط والقانون المحلي.',
          'احسب تكلفة الجهاز (RAM، GPU، الكهرباء، وقت الصيانة)؛ أحيانًا الاشتراك أرخص لمهمتك.',
        ],
      },
      {
        heading: 'أخطاء شائعة',
        paragraphs: [],
        list: [
          'حفظ القوائم العشر دون تشغيل أداة واحدة هذا الأسبوع.',
          'معاملة قائمة Awesome كمنتج نهائي.',
          'تشغيل وكيل برمجة على مجلد المنزل كاملًا بلا عزل.',
          'افتراض أن "مفتوح المصدر" يعني "بلا تكلفة للنموذج أو للاستضافة".',
        ],
      },
    ],
  },
  en: {
    title:
      'Search GitHub Before You Pay for a Subscription: 10 Practical Repositories, How to Choose Among Them, and a Safety Checklist Before You Install',
    excerpt:
      'Not a “top 10” list to save and forget. This guide separates resource lists from software you actually run, with each repo’s URL, licence, approximate stars as of 11 November 2026, the official README quick start, and what it might replace — and what it will not.',
    hook:
      'After this guide you will know which of these repositories is a list you browse and which is software you install, how to start from the official docs, and what to check before you run any of this code on your machine.',
    sections: [
      {
        paragraphs: [
          'Paying a monthly subscription is easier than reading a licence or trying a local tool. So we sometimes buy a service without testing an open alternative, or we bookmark lists and never open them. This article deals with both: ten well-known GitHub repositories, each with a clear use and clear limits.',
          'Star counts below are approximate from the GitHub API on 11 November 2026. Stars are not a quality score on their own, and the licence and allowed use come from each project. I will not repeat claims that these repos will replace every subscription: lists are not products, self-hosting has electricity, time and maintenance costs, and some models or APIs stay paid even when the tool is free.',
        ],
      },
      {
        heading: 'First: tell a list from a tool',
        paragraphs: [
          'Five of these repositories are curated lists (Awesome-style or directories). You open them in the browser and pick an entry; you do not install them as an app. The other five are tools or platforms you run locally (or from their release files). If you mix the two, you will think you “installed 10 tools” when most of them are references.',
        ],
        list: [
          'Lists to browse: public-apis, awesome-mcp-servers, awesome-llm-apps, awesome, free-for-dev.',
          'Runnable tools: Open Design, Scrapling, Ollama, Langflow, OpenHands.',
        ],
      },
      {
        heading: '1) public-apis/public-apis — a directory of free APIs',
        paragraphs: [
          'A manually curated list of free public APIs by category (weather, finance, images, games and more). Licence MIT, about 498,000 stars. URL: https://github.com/public-apis/public-apis',
          'Who is it for? A developer or student who wants to try an idea before paying for an API. It does not replace a production API with higher limits or an SLA; many entries have their own quotas or keys. Start: open the README, jump to a category, then read that API’s own page before writing code.',
        ],
        prompts: [
          {
            title: 'Pick 3 APIs for my project',
            when: 'When you have an app idea and do not want to pay for an API this week.',
            expect: 'Three options with a reason to accept or reject each, and what to verify on the official page.',
            text: `My project idea: [short description]
Constraints: language [JS/Python], no budget this week, region [e.g. Saudi Arabia].

Use https://github.com/public-apis/public-apis as a reference only.
Suggest 3 suitable APIs from the list's categories, and for each:
1) What does it cover?
2) What must I read on its official page (limits, API key, terms)?
3) What is the fallback if it is not fit for production?
Do not invent an API name; if you are unsure, tell me to search the list.`,
          },
        ],
      },
      {
        heading: '2) punkpeye/awesome-mcp-servers — a directory of MCP servers',
        paragraphs: [
          'A curated list of Model Context Protocol servers that connect AI agents to tools and data sources. Licence MIT, about 98,000 stars. URL: https://github.com/punkpeye/awesome-mcp-servers',
          'Who is it for? Anyone using Claude or other agents who wants to connect them to files, GitHub or databases before buying a closed “agent marketplace”. This is a directory, not a server: each entry has its own repo, licence and risk. Do not connect an untrusted server to your accounts or files.',
        ],
      },
      {
        heading: '3) nexu-io/open-design — an AI design-agent workspace',
        paragraphs: [
          'A local-first app that turns a coding agent into a design assistant (prototypes, boards, decks and design systems). Licence Apache-2.0, about 107,000 stars, actively updated. URL: https://github.com/nexu-io/open-design',
          'Who is it for? A designer or developer who wants a draft without immediately subscribing to a closed AI design tool. It may reduce the need for some AI-assisted design products during exploration, but it does not replace a human design review, and you may still need paid model keys. Official docs recommend the desktop app from the website or GitHub Releases (macOS and Windows). Linux had no prebuilt artefact at the time of checking; run from source as in the README:',
        ],
        list: [
          'git clone https://github.com/nexu-io/open-design.git',
          'cd open-design && corepack enable && pnpm install',
          'pnpm tools-dev run web',
          'Requires Node around 24 and pnpm 10.33.x according to the docs.',
        ],
      },
      {
        heading: '4) Shubhamsaboo/awesome-llm-apps — ready-to-run agent and RAG examples',
        paragraphs: [
          'A collection of 100+ example agents, RAG apps and skills, with open code you can copy and extend. Licence Apache-2.0, about 144,000 stars. URL: https://github.com/Shubhamsaboo/awesome-llm-apps',
          'Who is it for? Anyone who wants to learn by running something, not only by reading. It is not a hosted product; you run the example locally and may pay a model provider unless you use a local model. README quick start:',
        ],
        list: [
          'git clone https://github.com/Shubhamsaboo/awesome-llm-apps.git',
          'cd awesome-llm-apps/starter_ai_agents/ai_travel_agent',
          'pip install -r requirements.txt',
          'streamlit run travel_agent.py',
        ],
      },
      {
        heading: '5) sindresorhus/awesome — the list of lists',
        paragraphs: [
          'A large index of “Awesome” lists across most technical topics. Licence CC0-1.0, about 535,000 stars. URL: https://github.com/sindresorhus/awesome',
          'Who is it for? Anyone starting a new topic and wanting a single doorway. A note from the repo itself: pull requests are temporarily disabled until the maintainer catches up, and the last visible push at the time of checking was in September 2026. Use it as a starting point, then go to the official sub-list for your topic.',
        ],
      },
      {
        heading: '6) D4Vinci/Scrapling — a page-extraction framework for sources you may collect',
        paragraphs: [
          'A Python library for fetching pages and extracting their data (plain requests or via a browser). Licence BSD-3-Clause, about 101,000 stars. URL: https://github.com/D4Vinci/Scrapling',
          'Who is it for? A developer collecting data from sites they own or are allowed to collect, which in that case may replace some paid extraction services. Do not use it to bypass a site’s protections or ignore its terms. I document only the official install command and a test against the educational site quotes.toscrape.com, as in the README:',
        ],
        list: [
          'pip install scrapling',
          'If you need fetchers, not only the parser: pip install "scrapling[fetchers]" then scrapling install',
          'Test on quotes.toscrape.com only until the environment works, then use it on sources you are allowed to collect.',
        ],
      },
      {
        heading: '7) ripienaar/free-for-dev — a directory of free developer tiers',
        paragraphs: [
          'A list of SaaS, PaaS and IaaS offerings with free tiers that matter to infrastructure and product developers. The readable site is generated from the repo. About 142,000 stars, last updated in November 2026. URL: https://github.com/ripienaar/free-for-dev',
          'Who is it for? Anyone building a side project or a learning environment who wants to postpone a paid plan. The list is not “everything free forever”: each service has limits. As of 11 November 2026 I found no SPDX licence file at the repo root; treat the content as a reference and check each service’s own terms.',
        ],
      },
      {
        heading: '8) ollama/ollama — run language models on your machine',
        paragraphs: [
          'Software for running open models (families such as Llama, Mistral, DeepSeek and others in the current catalogue) locally or in a private setup. Licence MIT, about 187,000 stars. URL: https://github.com/ollama/ollama',
          'Who is it for? Anyone who wants a private or offline trial, and who may cut some paid model-API spend on everyday tasks. It will not necessarily match the quality or speed of the latest cloud models, and it needs enough disk and RAM. Official README install:',
        ],
        list: [
          'macOS / Linux: curl -fsSL https://ollama.com/install.sh | sh',
          'Windows (PowerShell): irm https://ollama.com/install.ps1 | iex',
          'Or download from the official download page. After install: ollama run llama3.2 (or another name from the library).',
        ],
        prompts: [
          {
            title: 'Use my local model as a code reviewer',
            when: 'After Ollama and at least one model are running.',
            expect: 'A limited review with no invented libraries, and a note of what a human should still check.',
            text: `You are a code reviewer running locally. Language: [Python/TypeScript].
This snippet:
[paste the function]

1) Explain what it does in two sentences.
2) Point out one bug or edge case if you see one.
3) Do not suggest packages I did not mention.
If you are not sure, say "not sure".`,
          },
        ],
      },
      {
        heading: '9) langflow-ai/langflow — build agents and flows by dragging blocks',
        paragraphs: [
          'An open platform for building agents and workflows in a visual editor, with local running and later publishing as an API or MCP server. Licence MIT, about 157,000 stars. URL: https://github.com/langflow-ai/langflow',
          'Who is it for? Anyone who wants to try a RAG path or an agent visually before committing to a paid orchestration product. Self-hosting needs maintenance, and models may still be paid. Official start (Python 3.10–3.14 and uv):',
        ],
        list: [
          'uv pip install langflow -U',
          'Set LANGFLOW_SUPERUSER_PASSWORD before starting official release packages, then: uv run langflow run',
          'It usually opens at http://127.0.0.1:7860 — sign in as langflow unless you changed the setting.',
        ],
      },
      {
        heading: '10) OpenHands/OpenHands — a coding agent you can self-host',
        paragraphs: [
          'A software-agent platform (Agent Canvas) for writing code, running tests and automating development tasks, with a self-hosting option. Licence MIT, about 93,000 stars. The repository moved from All-Hands-AI/OpenHands to https://github.com/OpenHands/OpenHands (the old URL redirects).',
          'Who is it for? A team or developer who wants a coding agent under their control instead of relying entirely on a paid cloud agent. This is not a drop-in replacement for any one commercial product, and it needs security care: the docs warn that running without a sandbox gives the agent broad access to the machine. The clearest official start is the Docker image (after creating a projects folder):',
        ],
        list: [
          'export PROJECTS_PATH="$HOME/projects" && mkdir -p "$PROJECTS_PATH"',
          'docker run -it --rm -p 127.0.0.1:8000:8000 -e AGENT_CANVAS_ALLOW_LAN_SESSION_KEY=true -v openhands-state:/home/openhands/.openhands -v "${PROJECTS_PATH}:/projects" ghcr.io/openhands/agent-canvas:1.38.0',
          'Then open http://localhost:8000/canvas — confirm the image tag on the releases page before you copy it; it can change.',
        ],
      },
      {
        heading: 'A short comparison',
        paragraphs: ['Each row: type, what it might replace during a trial, and the main caveat. Stars are approximate as of 11 November 2026.'],
        list: [
          'public-apis — list — finding a free API to try — check each API’s limits. ~498k stars, MIT.',
          'awesome-mcp-servers — list — discovering MCP servers instead of a closed marketplace — review each server’s security. ~98k, MIT.',
          'open-design — desktop/source tool — AI-assisted design drafts — you may still need model keys. ~107k, Apache-2.0.',
          'awesome-llm-apps — example apps — learning by running code — not a hosted service. ~144k, Apache-2.0.',
          'awesome — list of lists — starting research on a new topic — not runnable software. ~535k, CC0-1.0.',
          'Scrapling — Python library — collecting data from sources you may use — stay within the law and the site’s terms. ~101k, BSD-3-Clause.',
          'free-for-dev — list of free tiers — postponing a paid plan while learning — read each service’s limits. ~142k, no SPDX licence file at the root when checked.',
          'Ollama — local app — reducing some paid model-API use for private tasks — needs RAM and disk. ~187k, MIT.',
          'Langflow — flow platform — trying a visual agent before a paid orchestrator — hosting and upkeep. ~157k, MIT.',
          'OpenHands — coding agent — the self-hosted coding-agent category — use a Docker sandbox. ~93k, MIT.',
        ],
      },
      {
        heading: 'How to pick',
        paragraphs: ['Do not install all ten. Pick one for this week’s question:'],
        list: [
          'I need a source or an idea: start with awesome, public-apis or free-for-dev.',
          'I want a private local model: Ollama, then an example from awesome-llm-apps that works with your model.',
          'I want a design draft: Open Design, after reading the model requirements.',
          'I want a visual agent flow: Langflow.',
          'I want an agent that touches my code: OpenHands inside Docker at first.',
          'I want to connect an agent to tools: the MCP directory, reviewing each server before you connect it.',
        ],
      },
      {
        heading: 'A safety checklist before you install an open-source tool',
        paragraphs: [],
        list: [
          'Read the licence (MIT / Apache-2.0 / BSD / CC0 / or none) and whether it fits your commercial use.',
          'Confirm the URL is the official repo (owner, stars, last update) and watch out for copycat forks.',
          'Do not run an install script from the internet (pip or sh) as an administrator unless you understand what it does.',
          'Pin versions when you can, and read curl | sh commands before you run them.',
          'Keep API keys in environment variables, not in the repo or in screenshots.',
          'Do not connect an MCP server or an agent to a folder of secrets until you have limited its permissions.',
          'For agents that write files: use a container or a separate project folder, as the OpenHands docs recommend.',
          'For collecting web data: only where you have permission, and respect the terms and local law.',
          'Count the machine cost (RAM, GPU, electricity, maintenance time); a subscription is sometimes cheaper for your task.',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [],
        list: [
          'Saving all ten lists and running none of the tools this week.',
          'Treating an Awesome list as a finished product.',
          'Running a coding agent on your whole home folder with no sandbox.',
          'Assuming “open source” means “no cost for the model or the hosting”.',
        ],
      },
    ],
  },
}
