import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'linkedin-profile-review-with-claude',
  date: '2026-10-28',
  cover: '/blog/linkedin-profile-review-with-claude.png',
  coverAlt: { ar: 'غلاف مقال تحسين ملف LinkedIn باستخدام Claude', en: 'Cover for the LinkedIn profile article' },
  tags: ['LinkedIn', 'Claude', 'Career'],
  source: { url: 'https://lnkd.in/p/dwTt9nPj', author: 'Sherif El-Beshlawy', authorAr: 'شريف البشلاوي' },
  ar: {
    title: 'هل يعمل ملفك على LinkedIn ضدك؟ راجعه مع Claude خطوة بخطوة',
    excerpt:
      'عنوان ضعيف، ونبذة عامة، وخبرات مكتوبة كسيرة ذاتية مملة: ثلاثة أسباب تجعل مسؤول التوظيف يغادر ملفك. إليك طريقة عملية لمراجعته وإعادة صياغته مع Claude.',
    sections: [
      {
        paragraphs: [
          'يطرح المنشور الذي انطلق منه هذا المقال فكرة مزعجة لكنها صحيحة: ملفك على LinkedIn قد يكون يعمل ضدك وأنت لا تدري. عنوان ضعيف، ونبذة (About) عامة، وخبرات مكتوبة كأنها سيرة ذاتية مملة، فيغلق مسؤول التوظيف الصفحة ويمضي.',
          'والنصيحة التي قدمها المنشور عملية: استخدم Claude ليراجع ملفك ويعيد صياغته بشكل أوضح وأكثر احترافية. ومن غير وعود وهمية، الهدف ملف يفهمه مسؤول التوظيف بسرعة ويرى قيمتك من النظرة الأولى. إليك كيف تفعل ذلك قسمًا بقسم.',
        ],
      },
      {
        heading: 'قبل أن تبدأ: احمِ بياناتك',
        paragraphs: [
          'انسخ أقسام ملفك إلى ملف نصي، واحذف منها أي بيانات لا داعي لمشاركتها مثل رقم الهاتف أو العنوان. ثم أعطِ Claude سياقك: الوظيفة أو المجال الذي تستهدفه، ومستوى خبرتك، والبلد أو السوق الذي تتقدم فيه. المراجعة بلا هدف واضح تنتج نصًا جميلًا لكنه لا يخدمك.',
        ],
      },
      {
        heading: '1. العنوان (Headline)',
        paragraphs: [
          'العنوان أول ما يراه الناس في نتائج البحث. "طالب" أو "باحث عن عمل" لا يخبر أحدًا بقيمتك. اطلب من Claude خمسة بدائل تجمع بين التخصص والمهارات الأساسية ونوع المشكلات التي تحلها، ثم اختر الأقرب لك وعدّله بكلماتك. مثال على البنية: التخصص | أهم مهارتين | المجال الذي تريد العمل فيه.',
        ],
      },
      {
        heading: '2. النبذة (About)',
        paragraphs: [
          'النبذة ليست سيرة ذاتية مختصرة، بل قصة قصيرة: من أنت، وما الذي تجيده، وما الذي أنجزته، وما الذي تبحث عنه. اطلب من Claude أن يعيد كتابة نبذتك في أربع فقرات قصيرة بهذا الترتيب، بلغة بشرية بسيطة دون مبالغات، وأن يقترح عليك أين تضيف مثالًا حقيقيًا من تجربتك.',
        ],
      },
      {
        heading: '3. الخبرات: من مهام إلى إنجازات',
        paragraphs: [
          'أغلب الملفات تصف المهام: "مسؤول عن إعداد التقارير". مسؤول التوظيف يريد أن يعرف النتيجة: ماذا تغيّر بسبب عملك؟ أعطِ Claude وصف خبرتك واطلب منه تحويل كل نقطة إلى صيغة "فعل + ما قمت به + الأثر". وإذا لم يكن لديك رقم دقيق للأثر، فلا تخترعه؛ صف النتيجة بصدق.',
        ],
      },
      {
        heading: '4. المهارات والقسم المميز',
        paragraphs: ['اطلب من Claude مقارنة مهاراتك المكتوبة بإعلانات وظائف حقيقية في مجالك (انسخ له نصوصها)، ليقترح المهارات الناقصة أو المكتوبة بصيغة غير شائعة. واستخدم قسم Featured لعرض مشروع أو شهادة أو مقال يثبت ما تقوله.'],
      },
      {
        heading: 'طلبات جاهزة تبدأ بها',
        paragraphs: ['أشار المنشور إلى مجموعة من ثمانية أوامر لتحسين الملف. هذه أمثلة بصياغتنا يمكنك البدء بها:'],
        list: [
          '"راجع عنوان ملفي كمسؤول توظيف في مجال [المجال]، وأعطني 5 بدائل أوضح."',
          '"أعد كتابة نبذتي بلغة بسيطة وصادقة في 4 فقرات قصيرة، دون عبارات مبالغ فيها."',
          '"حوّل وصف خبراتي إلى نقاط تبدأ بفعل وتوضح الأثر، ولا تضف أرقامًا غير موجودة."',
          '"قارن مهاراتي بإعلانات الوظائف هذه، وما المهارات التي تنقصني أو أحتاج لإبرازها؟"',
          '"ما أول ثلاثة أشياء سيلاحظها مسؤول التوظيف سلبًا في ملفي؟"',
        ],
      },
      {
        heading: 'والسيرة الذاتية أيضًا',
        paragraphs: [
          'تحدث المنشور كذلك عن استخدام Claude لتحويل سيرة ذاتية عادية إلى سيرة تجذب المقابلات. المبادئ نفسها تنطبق: هدف واضح، وإنجازات بدل مهام، ولغة بسيطة، وصدق كامل في المعلومات. ملفك هو واجهتك المهنية؛ ساعة واحدة من المراجعة المركزة قد تغيّر الطريقة التي يراك بها الآخرون.',
        ],
      },
    ],
  },
  en: {
    title: 'Is Your LinkedIn Profile Working Against You? Review It with Claude, Step by Step',
    excerpt:
      'A weak headline, a generic About section and experience written like a dull CV: three reasons recruiters leave your profile. Here is a practical way to review and rewrite it with Claude.',
    sections: [
      {
        paragraphs: [
          'The post behind this article raises an uncomfortable but accurate point: your LinkedIn profile may be working against you without you noticing. A weak headline, a generic About and experience written like a boring CV, and the recruiter closes the page. Its advice is practical: ask Claude to review and rephrase your profile more clearly and professionally. No empty promises, just a profile a recruiter understands quickly.',
        ],
      },
      {
        heading: 'Before you start: protect your data',
        paragraphs: [
          'Copy your profile sections into a text file and remove details you do not need to share, such as your phone number. Then give Claude your context: target role, experience level and job market. A review without a goal produces nice text that does not serve you.',
        ],
      },
      {
        heading: 'Headline, About and Experience',
        paragraphs: [
          'Headline: "student" or "looking for work" says nothing about your value. Ask for five alternatives combining your field, your top skills and the problems you solve, then pick and adjust one.',
          'About: not a mini CV but a short story of who you are, what you are good at, what you have done and what you are looking for. Ask for four short paragraphs in plain language, with suggestions for where to add a real example.',
          'Experience: most profiles list duties. Recruiters want outcomes. Ask Claude to turn each point into "verb + what you did + impact". If you do not have a real number, do not invent one; describe the result honestly.',
        ],
      },
      {
        heading: 'Skills and Featured',
        paragraphs: ['Paste real job ads from your field and ask Claude to compare them with your listed skills. Use the Featured section to show a project, certificate or article that backs up what you claim.'],
      },
      {
        heading: 'Prompts to start with',
        paragraphs: ['The post referred to a set of eight prompts. Here are examples in our own words:'],
        list: [
          '"Review my headline as a recruiter in [field] and give me 5 clearer alternatives."',
          '"Rewrite my About in 4 short, honest paragraphs with no hype."',
          '"Turn my experience into action-led bullet points showing impact; do not add numbers that are not there."',
          '"Compare my skills with these job ads. What is missing or under-emphasised?"',
          '"What are the first three things a recruiter would see as negatives in my profile?"',
        ],
      },
      {
        heading: 'Your CV too',
        paragraphs: [
          'The post also mentioned using Claude to turn an ordinary CV into one that attracts interviews. The same principles apply: a clear goal, achievements rather than duties, simple language and complete honesty. One focused hour of review can change how people see you.',
        ],
      },
    ],
  },
}
