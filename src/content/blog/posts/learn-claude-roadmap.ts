import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'learn-claude-the-right-way',
  date: '2026-10-31',
  cover: '/blog/learn-claude-the-right-way.png',
  coverAlt: { ar: 'غلاف مقال خريطة طريق تعلم Claude', en: 'Cover for the Claude learning roadmap article' },
  tags: ['Claude', 'AI', 'Learning'],
  source: { url: 'https://lnkd.in/p/dViEZU7f', author: 'Sherif El-Beshlawy', authorAr: 'شريف البشلاوي' },
  ar: {
    title: 'تعلّم Claude بالطريقة الصحيحة: خريطة طريق عملية بدل التجارب العشوائية',
    excerpt:
      'كثيرون يقضون أسابيع في تجربة أدوات الذكاء الاصطناعي بلا خطة. في هذا المقال نرتّب لك مسارًا واضحًا لتعلّم Claude خطوة بخطوة، من الأساسيات حتى العمل الاحترافي.',
    sections: [
      {
        paragraphs: [
          'أغلب من يبدأ مع مساعدات الذكاء الاصطناعي مثل Claude يبدأ بالطريقة نفسها: يفتح المحادثة، يكتب سؤالًا عامًا، ثم يحكم على الأداة كلها من إجابة واحدة. بعد أسابيع من هذه التجارب العشوائية يكتشف أنه لم يتقدّم كثيرًا، وأن هناك من يستخدم الأداة نفسها فيحصل على نتائج أعمق وأسرع.',
          'الفرق في الغالب ليس في الأداة، بل في الطريقة. لهذا انتشرت مؤخرًا فكرة "خريطة الطريق": مسار مرتّب من الدورات القصيرة والتمارين ينقلك من الصفر إلى الاستخدام العملي دون أن تضيع وقتك. وقد أشار المنشور الأصلي الذي انطلق منه هذا المقال إلى خريطة من 11 دورة قصيرة ومجانية تناسب المبتدئين والمطورين، يمكن إنهاؤها في وقت قصير. هنا نشرح كيف تبني لنفسك هذا المسار وتستفيد منه فعلًا.',
        ],
      },
      {
        heading: 'لماذا تفشل التجارب العشوائية؟',
        paragraphs: [
          'التجربة العشوائية تعطيك انطباعات لا مهارات. أنت تكتشف شيئًا بالصدفة اليوم، ثم تنساه غدًا لأنك لم تفهم لماذا نجح. كما أنك غالبًا تكرر الأسلوب نفسه في كل محادثة: سؤال قصير بلا سياق، فتحصل على إجابة عامة، فتستنتج أن الأداة "عادية".',
          'التعلّم المنظّم يعالج هذا عبر ثلاثة أشياء: ترتيب المفاهيم من الأبسط إلى الأعمق، وتمارين تطبيقية بعد كل مفهوم، ومراجعة لما تعلمته على مهامك الحقيقية.',
        ],
      },
      {
        heading: 'المرحلة الأولى: افهم الأداة قبل أن تطلب منها',
        paragraphs: [
          'ابدأ بفهم ما يجيده Claude وما لا يجيده. هو نموذج لغوي قوي في القراءة والكتابة والتحليل والتلخيص والبرمجة، ويمكنه التعامل مع نصوص وملفات طويلة. لكنه قد يخطئ في المعلومات، وقد يجيب بثقة عن شيء لا يعرفه، لذلك تبقى المراجعة البشرية جزءًا من أي عمل جاد.',
          'في هذه المرحلة تعرّف على الواجهة: بدء محادثة جديدة لكل موضوع، رفع الملفات، والاستفادة من ميزة المشاريع لحفظ تعليمات وملفات تتكرر في عملك.',
        ],
      },
      {
        heading: 'المرحلة الثانية: اكتب طلبات واضحة',
        paragraphs: [
          'هذه أهم مهارة على الإطلاق. الطلب الجيد يجيب عن أسئلة بسيطة: ما المهمة؟ لمن الناتج؟ ما السياق؟ ما الشكل المطلوب؟ وما الذي يجب تجنبه؟',
        ],
        list: [
          'حدّد الدور: "تصرّف كمراجع لغوي لمقال موجّه لطلاب الجامعة".',
          'أعطِ السياق: الهدف من العمل، ومستوى القارئ، وأي معلومات أساسية.',
          'اطلب شكلًا محددًا: جدول، نقاط، خطة من خمس خطوات، أو فقرة من 150 كلمة.',
          'أرفق مثالًا لما تريده إن وُجد، فالأمثلة تختصر كثيرًا من الشرح.',
          'اطلب منه أن يسألك قبل البدء إذا كانت المعلومات ناقصة.',
        ],
      },
      {
        heading: 'المرحلة الثالثة: العمل مع الملفات والمستندات الطويلة',
        paragraphs: [
          'من أقوى استخدامات Claude قراءة المستندات: تقارير، أبحاث، عقود، أو ملاحظات محاضرات. تدرّب على رفع ملف وطلب ملخص منظم، ثم استخراج النقاط الرئيسية، ثم طرح أسئلة محددة عن أجزاء معينة. اطلب دائمًا الإشارة إلى الموضع الذي استند إليه في الملف حتى تتحقق بنفسك.',
        ],
      },
      {
        heading: 'المرحلة الرابعة: اجعله فريقًا من الخبراء',
        paragraphs: [
          'من الأفكار التي أشار إليها المنشور الأصلي استخدام مجموعة طلبات تجعل Claude يعمل كفريق كامل من الباحثين والمحللين والخبراء. الفكرة ببساطة أن تقسّم المهمة الكبيرة إلى أدوار: باحث يجمع النقاط، ومحلل يقارن، وناقد يبحث عن الثغرات، ومحرّر يصوغ النتيجة النهائية. اطلب كل دور في خطوة مستقلة، وستلاحظ أن الجودة ترتفع لأن كل خطوة تركّز على شيء واحد.',
        ],
      },
      {
        heading: 'المرحلة الخامسة للمطورين: الواجهة البرمجية والأدوات',
        paragraphs: [
          'إذا كنت مطورًا فالخطوة التالية هي التعامل مع Claude عبر الواجهة البرمجية (API): إرسال الطلبات من تطبيقك، والتحكم في التعليمات النظامية، وربط النموذج بأدوات وبيانات خارجية. ابدأ بمشروع صغير مثل أداة تلخيص لملفاتك أو مساعد يجيب عن أسئلة من وثائق مشروعك، ثم توسّع تدريجيًا.',
        ],
      },
      {
        heading: 'كيف تنجز المسار في وقت قصير؟',
        paragraphs: [
          'لا تحاول حفظ كل شيء. اجعل لكل مرحلة تمرينًا واحدًا على مهمة حقيقية من عملك أو دراستك، ودوّن الطلبات التي نجحت معك في ملف خاص لتعود إليها. بهذا تتحول الدورات القصيرة إلى مهارة يومية، وتصبح النتائج أفضل مع كل استخدام.',
          'الخلاصة: الأداة نفسها متاحة للجميع، لكن من يتعلمها بخطة واضحة يختصر على نفسه شهورًا من التجربة العشوائية.',
        ],
      },
    ],
  },
  en: {
    title: 'Learn Claude the Right Way: A Practical Roadmap Instead of Random Trial and Error',
    excerpt:
      'Many people spend weeks poking at AI tools with no plan. This article lays out a clear, step-by-step path for learning Claude, from the basics to professional use.',
    sections: [
      {
        paragraphs: [
          'Most people start with AI assistants like Claude the same way: open a chat, type a vague question, and judge the whole tool from a single answer. Weeks of random experiments later, they realise they have not progressed much, while others get deeper and faster results from the very same tool.',
          'The difference is usually the method, not the tool. That is why the idea of a learning roadmap has become popular: an ordered set of short courses and exercises that takes you from zero to practical use without wasting time. The LinkedIn post behind this article pointed to a roadmap of 11 short, free courses suited to both beginners and developers. Here is how to build that path for yourself and actually benefit from it.',
        ],
      },
      {
        heading: 'Why random experimenting fails',
        paragraphs: [
          'Random experiments give you impressions, not skills. You stumble on something that works today and forget it tomorrow because you never understood why it worked. You also tend to repeat the same habit in every chat: a short question with no context, a generic answer, and the conclusion that the tool is "average".',
          'Structured learning fixes this with three things: concepts ordered from simple to advanced, a hands-on exercise after each concept, and applying what you learned to your real tasks.',
        ],
      },
      {
        heading: 'Stage 1: Understand the tool before you ask it',
        paragraphs: [
          'Learn what Claude does well and where it can fail. It is strong at reading, writing, analysing, summarising and coding, and it can work with long texts and files. It can also be wrong, sometimes confidently, so human review stays part of any serious work. Get comfortable with the interface: a new chat per topic, uploading files, and using Projects to keep recurring instructions and files in one place.',
        ],
      },
      {
        heading: 'Stage 2: Write clear requests',
        paragraphs: ['This is the single most important skill. A good request answers simple questions: what is the task, who is it for, what is the context, what format do you want, and what should be avoided?'],
        list: [
          'Set a role: "Act as an editor reviewing an article for university students."',
          'Give context: the goal, the reader’s level and any essential background.',
          'Ask for a format: a table, bullet points, a five-step plan or a 150-word paragraph.',
          'Include an example of what you want when you have one.',
          'Ask it to question you first if information is missing.',
        ],
      },
      {
        heading: 'Stage 3: Work with files and long documents',
        paragraphs: [
          'Reading documents is one of Claude’s strongest uses: reports, papers, contracts or lecture notes. Practise uploading a file and asking for a structured summary, then the key points, then specific questions about particular parts. Ask it to point to where in the file each answer comes from so you can check.',
        ],
      },
      {
        heading: 'Stage 4: Turn it into a team of experts',
        paragraphs: [
          'The original post mentioned prompts that make Claude work like a whole team of researchers, analysts and experts. The idea is to split a big task into roles: a researcher who gathers points, an analyst who compares, a critic who looks for gaps and an editor who writes the final result. Run each role as its own step and quality goes up, because each step focuses on one thing.',
        ],
      },
      {
        heading: 'Stage 5 for developers: the API and tools',
        paragraphs: [
          'Developers should move on to the API: sending requests from an app, controlling system instructions and connecting the model to external tools and data. Start small, for example a summariser for your own files or an assistant that answers questions from your project docs, then grow from there.',
        ],
      },
      {
        heading: 'Finishing the path quickly',
        paragraphs: [
          'Do not try to memorise everything. Give each stage one exercise on a real task from your work or studies, and keep the prompts that worked in a personal file. Short courses then turn into a daily skill. The tool is available to everyone; those who learn it with a plan save themselves months of trial and error.',
        ],
      },
    ],
  },
}
