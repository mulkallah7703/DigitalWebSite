import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'claude-for-excel-word-powerpoint',
  date: '2026-10-27',
  cover: '/blog/claude-for-excel-word-powerpoint.png',
  coverAlt: { ar: 'غلاف مقال Claude مع Excel وWord وPowerPoint', en: 'Cover for the Claude with Office article' },
  tags: ['Claude', 'Excel', 'Productivity'],
  source: { url: 'https://lnkd.in/p/dkWu_vf2', author: 'Sherif El-Beshlawy', authorAr: 'شريف البشلاوي' },
  ar: {
    title: 'Claude مع Excel وWord وPowerPoint: كيف تنجز أعمالك المكتبية بالكلام؟',
    excerpt:
      'تقارير وجداول وعروض تقديمية وتنسيق وتعديلات… كثير من العمل المكتبي يمكن تسريعه بوصف ما تريد بوضوح. دليل عملي لاستخدام Claude مع أدوات Office الثلاث.',
    sections: [
      {
        paragraphs: [
          'يدعوك المنشور الذي انطلق منه هذا المقال إلى أن تتخيل Claude ينجز عنك أعمال Excel وWord وPowerPoint: تقارير وجداول وعروض تقديمية وتنسيق وتعديلات، كل ذلك بمجرد وصف ما تريد. ويرى أن هذا يمكن أن ينقل المبتدئ إلى مستوى أقرب للمحترف.',
          'الواقع أن Claude يستطيع قراءة الملفات التي ترفعها، وشرح محتواها، واقتراح المعادلات والهياكل، وفي تطبيقاته يمكنه أيضًا إنشاء ملفات وتعديلها. لكن النتيجة الجيدة تعتمد على طريقتك في الطلب، وعلى مراجعتك قبل الاعتماد. إليك كيف تستخدمه مع كل أداة.',
        ],
      },
      {
        heading: 'Excel: من المعادلات إلى التحليل',
        paragraphs: ['Excel هو المكان الذي يوفّر فيه Claude أكبر قدر من الوقت لمعظم الناس:'],
        list: [
          'شرح المعادلات: الصق معادلة معقدة واطلب شرحها خطوة بخطوة، أو اطلب معادلة لمهمة تصفها بالكلام.',
          'تنظيف البيانات: صف المشكلة (تكرار، تواريخ بصيغ مختلفة، مسافات زائدة) واطلب خطوات المعالجة أو المعادلات المناسبة.',
          'التحليل: ارفع جدولًا واطلب أهم الملاحظات، والاتجاهات، والقيم الشاذة، واقتراح رسوم بيانية مناسبة.',
          'الجداول المحورية: اطلب منه اقتراح الأسئلة التي تجيب عنها البيانات، ثم طريقة بناء الجدول المحوري لكل سؤال.',
        ],
      },
      {
        heading: 'Word: مستندات أوضح وأكثر احترافية',
        paragraphs: [
          'في المستندات، قيمة Claude في الهيكلة والصياغة. ارفع مسودة تقرير واطلب: تقسيمًا منطقيًا بعناوين واضحة، وملخصًا تنفيذيًا في بدايته، وتوحيدًا للمصطلحات، وتصحيحًا لغويًا. ويمكنك أن تطلب نسختين من فقرة صعبة: واحدة رسمية وأخرى مبسطة، ثم تختار. وإذا كان لديك محضر اجتماع طويل، اطلب تحويله إلى قرارات ومهام بأسماء المسؤولين ومواعيدها.',
        ],
      },
      {
        heading: 'PowerPoint: من الفكرة إلى العرض',
        paragraphs: [
          'أصعب ما في العرض التقديمي هو البداية. صف لـ Claude جمهورك، والوقت المتاح، والرسالة الأساسية، واطلب هيكل عرض من عدد محدد من الشرائح، لكل شريحة عنوان ونقاط مختصرة وملاحظات للمتحدث. بعدها اطلب تقليل النص في كل شريحة، واقتراح رسم أو صورة توضيحية مناسبة بدل الفقرات الطويلة.',
        ],
      },
      {
        heading: 'كيف تكتب طلبًا مكتبيًا فعالًا؟',
        list: [
          'ابدأ بالهدف: "أريد تقريرًا شهريًا للمبيعات يقرأه المدير في دقيقتين".',
          'صف البيانات: الأعمدة ومعانيها، والفترة الزمنية، والوحدة المستخدمة.',
          'حدد الشكل النهائي: جدول، أو رسم، أو صفحة واحدة، أو عشر شرائح.',
          'اطلب الخطوات لا النتيجة فقط، حتى تتعلم وتستطيع التكرار وحدك.',
        ],
        paragraphs: [],
      },
      {
        heading: 'تنبيهات مهمة',
        paragraphs: [
          'راجع الأرقام دائمًا؛ تحقق من نتيجة أي معادلة على عينة صغيرة تعرف نتيجتها. ولا ترفع بيانات العملاء أو البيانات المالية الحساسة إلا إذا كانت سياسة جهة عملك تسمح بذلك، ويمكنك استبدالها ببيانات تجريبية بالبنية نفسها.',
          'أشار المنشور كذلك إلى برومبتات مخصصة لـ Excel وتحليل البيانات وتحويل ملفات Word إلى مستندات احترافية. الفكرة المشتركة: صف ما تريد بدقة، وسيتحول Claude من أداة دردشة إلى مساعد مكتبي حقيقي يوفّر عليك ساعات كل أسبوع.',
        ],
      },
    ],
  },
  en: {
    title: 'Claude with Excel, Word and PowerPoint: Getting Office Work Done by Describing It',
    excerpt:
      'Reports, tables, presentations, formatting and edits: much office work can be sped up by describing what you want clearly. A practical guide to using Claude with all three Office tools.',
    sections: [
      {
        paragraphs: [
          'The post behind this article asks you to imagine Claude doing your Excel, Word and PowerPoint work: reports, tables, slides, formatting and edits, just by describing them, lifting a beginner closer to professional level. In practice, Claude can read the files you upload, explain them, suggest formulas and structures, and in its apps it can also create and edit files. Good results still depend on how you ask and on your review before you rely on them.',
        ],
      },
      {
        heading: 'Excel: from formulas to analysis',
        paragraphs: [],
        list: [
          'Explain formulas step by step, or request a formula for a task you describe.',
          'Clean data: describe duplicates, mixed date formats or extra spaces and ask for the fix.',
          'Analyse: upload a table and ask for key observations, trends, outliers and suitable charts.',
          'Pivot tables: ask which questions the data can answer and how to build a pivot for each.',
        ],
      },
      {
        heading: 'Word: clearer, more professional documents',
        paragraphs: [
          'In documents, Claude helps with structure and wording. Upload a draft and ask for logical sections with clear headings, an executive summary, consistent terminology and proofreading. Ask for a formal and a simplified version of a hard paragraph, or turn long meeting notes into decisions and tasks with owners and dates.',
        ],
      },
      {
        heading: 'PowerPoint: from idea to deck',
        paragraphs: [
          'Describe your audience, time slot and core message, and ask for a deck outline with a set number of slides: a title, short bullets and speaker notes for each. Then ask it to cut the text on every slide and suggest a visual instead of long paragraphs.',
        ],
      },
      {
        heading: 'Writing an effective office request',
        paragraphs: [],
        list: [
          'Start with the goal: "a monthly sales report my manager can read in two minutes".',
          'Describe the data: columns and their meaning, time period and units.',
          'Specify the output: a table, a chart, one page or ten slides.',
          'Ask for the steps, not just the result, so you learn to repeat it yourself.',
        ],
      },
      {
        heading: 'Important cautions',
        paragraphs: [
          'Always check the numbers by testing formulas on a small sample with a known answer. Do not upload sensitive customer or financial data unless your workplace allows it; use dummy data with the same structure instead. Describe precisely what you want and Claude turns from a chat tool into a real office assistant that saves you hours each week.',
        ],
      },
    ],
  },
}
