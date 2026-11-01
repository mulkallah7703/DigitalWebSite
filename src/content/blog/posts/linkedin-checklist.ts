import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'linkedin-profile-checklist-for-tech-students',
  date: '2026-10-28',
  cover: '/blog/linkedin-profile-checklist-for-tech-students.png',
  coverLines: ['LinkedIn Profile', 'Checklist'],
  coverAlt: { ar: 'غلاف مقال قائمة تحسين ملف LinkedIn', en: 'Cover: LinkedIn profile checklist' },
  tags: ['LinkedIn', 'Career', 'Students'],
  ar: {
    title: 'ملف LinkedIn لطلاب التقنية والخريجين الجدد: قائمة تحقق عملية قسمًا بقسم، مع طريقة ذكية لمراجعته بالذكاء الاصطناعي',
    excerpt:
      'ملفك على LinkedIn غالبًا أول ما يراه من يبحث عنك. هذه قائمة تحقق مفصلة لكل قسم، مع أمثلة لصياغة العنوان والنبذة والخبرات، وطريقة لاستخدام الذكاء الاصطناعي كمراجع لا ككاتب.',
    sections: [
      {
        paragraphs: [
          'كطالب هندسة برمجيات، أرى أن كثيرًا من الطلاب يؤجلون الاهتمام بملفهم على LinkedIn إلى ما بعد التخرج، مع أن أفضل وقت لبنائه هو أثناء الدراسة، حين تبني المشاريع وتتعلم المهارات وتتعرف على الناس. الملف الجيد لا يحتاج إلى سنوات خبرة، بل إلى عرض واضح وصادق لما تعرفه وما بنيته وما تريده.',
          'في هذا المقال قائمة تحقق عملية أقترحها لكل قسم، ثم طريقة لاستخدام أدوات الذكاء الاصطناعي في مراجعة الملف بشكل يحافظ على صدقه وصوتك.',
        ],
      },
      {
        heading: 'الصورة والخلفية',
        paragraphs: [],
        list: [
          'صورة واضحة حديثة، الوجه فيها ظاهر والإضاءة جيدة والخلفية بسيطة.',
          'صورة غلاف تعكس مجالك: تصميم بسيط فيه تخصصك، أو صورة من مشروع أو فعالية مهنية.',
          'تجنب الصور الجماعية أو المقصوصة من مناسبات اجتماعية.',
        ],
      },
      {
        heading: 'العنوان المهني (Headline)',
        paragraphs: [
          'العنوان أهم سطر في ملفك، لأنه يظهر بجانب اسمك في كل مكان: نتائج البحث والتعليقات وطلبات التواصل. لا تكتفِ بكلمة "طالب". الصيغة التي أقترحها: من أنت + ماذا تبني أو تتقن + المجال الذي يهمك.',
        ],
        list: [
          'ضعيف: "طالب في الجامعة".',
          'أفضل: "طالب هندسة برمجيات | مطور full-stack | مهتم بتطبيقات الذكاء الاصطناعي في الصحة والتعليم".',
          'استخدم الكلمات التي يبحث بها مسؤولو التوظيف في مجالك، دون حشو.',
        ],
      },
      {
        heading: 'النبذة (About)',
        paragraphs: [
          'النبذة مساحة لتروي قصتك المهنية بإيجاز. اكتبها بضمير المتكلم، وفي فقرات قصيرة. هيكل مقترح من أربعة أجزاء:',
        ],
        list: [
          'افتتاحية تجيب: ما الذي يحفزك في مجالك؟',
          'ما الذي تعمل عليه أو تتعلمه الآن، وأبرز مهاراتك التقنية.',
          'مثال أو مشروعان يدلان على ذلك، مع النتيجة إن وجدت.',
          'ما الذي تبحث عنه: تدريب، أو وظيفة، أو تعاون، وكيف يمكن التواصل معك.',
        ],
      },
      {
        heading: 'الخبرات والمشاريع',
        paragraphs: [
          'إذا لم تكن لديك خبرة وظيفية بعد، فلا مشكلة. المشاريع الجامعية والشخصية، والتطوع، والمشاركة في المسابقات والهاكاثونات، كلها خبرات حقيقية تستحق العرض. اكتب كل بند بصيغة: فعل + ما الذي فعلته + الأداة أو التقنية + النتيجة.',
        ],
        list: [
          'ضعيف: "عملت على مشروع موقع".',
          'أفضل: "طورت متجرًا إلكترونيًا باستخدام Next.js وقاعدة بيانات PostgreSQL، يتضمن نظام دفع وحسابات مستخدمين ولوحة تحكم".',
          'أضف روابط: GitHub، أو الموقع المنشور، أو عرض توضيحي.',
        ],
      },
      {
        heading: 'المهارات والشهادات والتوصيات',
        paragraphs: [],
        list: [
          'رتّب المهارات بحيث تكون الأهم لهدفك في الأعلى، واحذف المهارات التي لا علاقة لها بمسارك.',
          'أضف الشهادات المرتبطة بمجالك، واربطها بمشاريع طبقتها فيها إن أمكن.',
          'اطلب توصية من أستاذ أشرف على مشروعك، أو زميل عملت معه، وحدد له ما تريد أن تركز عليه التوصية.',
        ],
      },
      {
        heading: 'قسم "المميز" والنشاط',
        paragraphs: [
          'قسم المميز (Featured) هو واجهة عرض لأفضل أعمالك: مشروع منشور، أو مقال كتبته، أو عرض تقديمي. ضع فيه ثلاثة عناصر كحد أقصى تمثلك جيدًا. أما النشاط، فلا يشترط أن تنشر يوميًا؛ منشور واحد كل أسبوع أو أسبوعين تشارك فيه ما تعلمته أو بنيته، وتعليقات مفيدة على منشورات المختصين، يكفي لبناء حضور حقيقي مع الوقت.',
        ],
      },
      {
        heading: 'كيف تراجع ملفك بالذكاء الاصطناعي بطريقة صحيحة؟',
        paragraphs: [
          'يمكنك نسخ نصوص ملفك (العنوان والنبذة والخبرات) إلى أداة مثل Claude أو ChatGPT، مع إعلان وظيفة أو اثنين من النوع الذي تستهدفه، ثم تطلب مراجعة محددة. انتبه لعدم مشاركة معلومات شخصية حساسة كرقم الهاتف أو العنوان. أمثلة على طلبات مفيدة:',
        ],
        list: [
          '"قارن ملفي بهذين الإعلانين، وما المهارات المطلوبة التي أملكها ولم أبرزها؟"',
          '"أعطني ثلاث صيغ للعنوان المهني بناء على المعلومات الموجودة فقط، دون إضافة أي مهارة لم أذكرها."',
          '"ما البنود الغامضة في قسم الخبرات، وما السؤال الذي يجب أن أجيب عنه في كل بند لأجعله أوضح؟"',
          '"اقرأ النبذة كأنك مسؤول توظيف لديه ثلاثون ثانية: ما الذي فهمته عني؟ وما الذي لم يتضح؟"',
        ],
      },
      {
        heading: 'تحذير مهم: الصدق أولًا',
        paragraphs: [
          'أدوات الذكاء الاصطناعي قد تقترح صياغات تبالغ في وصف إنجازاتك أو تضيف مهارات لا تملكها. ارفض ذلك دائمًا. أي معلومة غير دقيقة في ملفك ستظهر في أول مقابلة، وتضر بثقة الناس بك أكثر مما تنفعك. استخدم الأداة لتوضيح الحقيقة وعرضها بشكل أفضل، لا لتجميلها.',
        ],
      },
      {
        heading: "مثال على نبذة قبل التحسين وبعده",
        paragraphs: [
          "نبذة ضعيفة: \"طالب مجتهد وطموح، أحب التعلم والعمل الجماعي، وأبحث عن فرصة لتطوير مهاراتي\". كل كلمة فيها صحيحة، لكنها تنطبق على أي طالب في أي تخصص، ولا تعطي القارئ سببًا للتواصل.",
          "نبذة أفضل: \"أدرس هندسة البرمجيات، وأبني تطبيقات ويب متكاملة من الواجهة إلى قاعدة البيانات. أهتم بشكل خاص بتوظيف الذكاء الاصطناعي في حلول للتعليم والرعاية الصحية. أعمل حاليًا على ... ويمكنكم الاطلاع على مشاريعي في الرابط المميز أدناه. أرحب بفرص التدريب والتعاون في هذا المجال\". لاحظ أن كل جملة تضيف معلومة محددة، وأن النهاية تخبر القارئ ماذا يفعل.",
        ],
      },
      {
        heading: "روتين صيانة شهري للملف",
        paragraphs: [
        ],
        list: [
          "أضف أي مشروع أو شهادة أو مهارة جديدة اكتسبتها خلال الشهر.",
          "راجع العنوان: هل ما زال يعكس ما تفعله وما تبحث عنه الآن؟",
          "حدّث قسم المميز بأحدث وأفضل عمل لديك.",
          "تواصل مع شخصين أو ثلاثة في مجالك برسالة قصيرة شخصية، لا برسالة عامة.",
          "راجع إعدادات الخصوصية وبيانات التواصل.",
        ],
      },
      {
        heading: 'الخلاصة',
        paragraphs: [
          'ملف LinkedIn الجيد يجيب بسرعة عن ثلاثة أسئلة: من أنت، وماذا تستطيع أن تفعل، وما الدليل على ذلك. ابدأ بالعنوان والنبذة، واعرض مشاريعك بصيغة واضحة مع روابط، واختر مهاراتك وشهاداتك بعناية، ثم راجع كل شيء بالذكاء الاصطناعي كمحرر ناقد. وحدّث ملفك كلما أنهيت مشروعًا أو تعلمت مهارة، فهو سجل حي لمسيرتك المهنية.',
        ],
      },
    ],
  },
  en: {
    title: 'A LinkedIn Profile for Tech Students and New Graduates: A Section-by-Section Checklist, Reviewed the Smart Way with AI',
    excerpt:
      'Your LinkedIn profile is often the first thing people see when they look you up. A detailed checklist for every section, with examples for the headline, About and experience, and a way to use AI as a reviewer, not a writer.',
    sections: [
      {
        paragraphs: [
          'As a software engineering student, I see many students postpone their LinkedIn profile until after graduation, even though the best time to build it is during university, while you build projects, learn skills and meet people. A good profile does not need years of experience; it needs a clear, honest picture of what you know, what you built and what you want.',
          'Here is the checklist I suggest for each section, followed by a way to use AI tools to review the profile while keeping it honest and in your voice.',
        ],
      },
      {
        heading: 'Photo and banner',
        paragraphs: [],
        list: [
          'A clear, recent photo with your face visible, good lighting and a simple background.',
          'A banner that reflects your field: a simple design with your specialty, or a photo from a project or professional event.',
          'Avoid group photos or crops from social occasions.',
        ],
      },
      {
        heading: 'Headline',
        paragraphs: ['Your headline is the most important line because it appears next to your name everywhere. Do not settle for “Student”. Use: who you are + what you build or master + the field you care about.'],
        list: [
          'Weak: “University student”.',
          'Better: “Software Engineering Student | Full-Stack Developer | Interested in AI for healthcare and education”.',
          'Use the terms recruiters in your field search for, without stuffing.',
        ],
      },
      {
        heading: 'About',
        paragraphs: ['Tell your professional story briefly, in the first person and short paragraphs:'],
        list: [
          'An opening: what drives you in your field?',
          'What you are working on or learning now, and your main technical skills.',
          'One or two examples or projects that show it, with results where available.',
          'What you are looking for (internship, job, collaboration) and how to reach you.',
        ],
      },
      {
        heading: 'Experience and projects',
        paragraphs: ['No work experience yet? University and personal projects, volunteering, competitions and hackathons are real experience. Write each item as: verb + what you did + tool or technology + result.'],
        list: [
          'Weak: “Worked on a website project”.',
          'Better: “Built an online store with Next.js and PostgreSQL, including payments, user accounts and an admin dashboard”.',
          'Add links: GitHub, the live site or a demo.',
        ],
      },
      {
        heading: 'Skills, certifications and recommendations',
        paragraphs: [],
        list: [
          'Order skills so the most relevant to your goal come first, and remove unrelated ones.',
          'Add certifications relevant to your field, linked to projects where you applied them.',
          'Ask a professor who supervised your project or a teammate for a recommendation, and tell them what to focus on.',
        ],
      },
      {
        heading: 'Featured and activity',
        paragraphs: [
          'Featured is a showcase for your best work: a live project, an article you wrote, a presentation. Keep it to three items that represent you well. You do not need to post daily; a post every week or two about what you learned or built, plus useful comments on experts’ posts, builds real presence over time.',
        ],
      },
      {
        heading: 'Reviewing your profile with AI, the right way',
        paragraphs: ['Paste your headline, About and experience into Claude or ChatGPT along with one or two target job ads, and ask for specific review. Do not share sensitive personal details like your phone number or address. Useful prompts:'],
        list: [
          '“Compare my profile with these two ads: which required skills do I have but have not highlighted?”',
          '“Give me three headline options using only the information here, without adding any skill I did not mention.”',
          '“Which experience items are vague, and what question should I answer in each to make it clearer?”',
          '“Read my About as a recruiter with thirty seconds: what did you understand about me, and what was unclear?”',
        ],
      },
      {
        heading: 'Important: honesty first',
        paragraphs: [
          'AI tools may suggest wording that exaggerates your achievements or adds skills you do not have. Always reject it. Any inaccuracy will surface in your first interview and damage trust far more than it helps. Use the tool to clarify and present the truth better, not to embellish it.',
        ],
      },
      {
        heading: "An About section, before and after",
        paragraphs: [
          "Weak: “A hard-working, ambitious student who loves learning and teamwork, looking for an opportunity to develop my skills.” Every word is true, but it fits any student in any field and gives no reason to reach out.",
          "Better: “I study software engineering and build full-stack web apps from the interface to the database. I am especially interested in applying AI to education and healthcare. I am currently working on … and you can see my projects in Featured below. I welcome internship and collaboration opportunities in this area.” Every sentence adds something specific, and the ending tells the reader what to do.",
        ],
      },
      {
        heading: "A monthly maintenance routine",
        paragraphs: [
        ],
        list: [
          "Add any new project, certificate or skill from the month.",
          "Review the headline: does it still reflect what you do and want now?",
          "Update Featured with your latest, best work.",
          "Reach out to two or three people in your field with a short, personal message, not a generic one.",
          "Review privacy settings and contact details.",
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'A good LinkedIn profile quickly answers three questions: who you are, what you can do, and what proves it. Start with the headline and About, present projects clearly with links, choose skills and certifications carefully, and review everything with AI as a critical editor. Update it whenever you finish a project or learn a skill; it is a living record of your career.',
        ],
      },
    ],
  },
}
