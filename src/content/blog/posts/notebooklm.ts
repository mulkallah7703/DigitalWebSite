import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'active-study-with-notebooklm',
  date: '2026-10-27',
  cover: '/blog/active-study-with-notebooklm.png?v=3',
  coverLines: ['NotebookLM', 'Study System'],
  coverAlt: { ar: 'غلاف مقال نظام المذاكرة مع NotebookLM', en: 'Cover: a study system with NotebookLM' },
  tags: ['NotebookLM', 'Study', 'AI'],
  ar: {
    title: 'NotebookLM ليس للتلخيص: نظام مذاكرة كامل بثمانية برومبتات تختبرك وتكشف ما لم تفهمه قبل الامتحان',
    excerpt:
      'أغلب الطلاب يرفعون ملفاتهم إلى NotebookLM ويطلبون ملخصًا، ثم يكتشفون في الامتحان أنهم لم يفهموا. هذا نظام مذاكرة نشط بثمانية برومبتات: خريطة المادة، وأسئلة سقراطية، والشرح بكلماتك، وتحليل الامتحانات السابقة، وأدوات Studio.',
    hook:
      'بعد هذا الدليل ستحوّل ملفات أي مادة إلى نظام مذاكرة نشط: خريطة واضحة للمادة، واختبارات تكشف نقاط ضعفك، وتصحيح لشرحك بكلماتك، وتحليل لأنماط الامتحانات السابقة، وبطاقات وملخص صوتي مخصص، وكل إجابة مرتبطة بمصدرها في ملفاتك.',
    sections: [
      {
        paragraphs: [
          'الملخص يعطيك شعورًا بالفهم، لكن الامتحان يقيس قدرتك على الاسترجاع والتطبيق. لذلك الطريقة الأقوى في المذاكرة هي أن تُختبَر وتشرح بنفسك، لا أن تقرأ ملخصًا آخر. وهنا تتميز أداة NotebookLM من Google: إجاباتها مبنية على المصادر التي ترفعها أنت، مع إشارات مرجعية تنقلك إلى المقطع الأصلي، فتقل فرصة الإجابات المختلقة.',
        ],
      },
      {
        heading: 'ما تحتاج معرفته قبل البدء',
        paragraphs: [
          'تعمل الأداة من المتصفح عبر notebooklm.google.com، وتسميها Google في صفحات المساعدة الحديثة Gemini Notebook. أنشئ دفترًا لكل مادة وارفع إليه المحاضرات وملفات PDF والملاحظات والشرائح وروابط الفيديو. حسب صفحة المساعدة، تسمح الخطة المجانية حاليًا بـ 50 مصدرًا في الدفتر، وبحدود يومية للملخصات الصوتية والبطاقات والاختبارات، وقد تتغير هذه الحدود.',
          'في لوحة Studio ستجد: الملخص الصوتي (Audio Overview) بصيغ مثل Deep Dive وThe Brief وThe Critique وThe Debate، وخرائط ذهنية، وتقارير مثل دليل المذاكرة والأسئلة الشائعة، وبطاقات واختبارات يمكنك تخصيص صعوبتها وكتابة تعليمات لها. والبرومبتات التالية تُكتب في المحادثة أو في خانة التخصيص.',
        ],
      },
      {
        heading: 'البرومبتات الثمانية',
        paragraphs: [],
        prompts: [
          {
            title: 'خريطة المادة وأولويات المذاكرة',
            when: 'أول جلسة بعد رفع كل ملفات المادة.',
            expect: 'قائمة بالمحاور الرئيسية والمفاهيم تحت كل محور، مع العلاقات بينها والمتطلبات المسبقة، وإشارات إلى مواضعها في ملفاتك.',
            text: `اعتمادًا على المصادر فقط، أنشئ خريطة لمادة [اسم المادة]:
1. المحاور الرئيسية بالترتيب المنطقي للتعلم.
2. تحت كل محور: المفاهيم الأساسية، وما يجب فهمه قبله.
3. المفاهيم التي تتكرر عبر أكثر من محاضرة (غالبًا هي الأهم).
4. صنّف كل محور: أساسي / متوسط / تفصيلي.
5. اقترح ترتيب مذاكرة لـ [عدد] أيام قبل الامتحان.
اذكر المصدر لكل محور، وإن لم تجد معلومة في المصادر قل ذلك.`,
          },
          {
            title: 'المعلّم السقراطي',
            when: 'بعد قراءة أول لمحور، لتعرف هل فهمت فعلًا.',
            expect: 'سؤال واحد في كل مرة يتدرج من الفهم إلى التطبيق، مع تقييم إجابتك وتلميح بدل الحل المباشر، وتوجيه إلى الجزء الذي يجب مراجعته.',
            text: `كن معلمًا سقراطيًا في موضوع [المحور] اعتمادًا على المصادر فقط.
- اسألني سؤالًا واحدًا في كل مرة وانتظر إجابتي.
- ابدأ بسؤال فهم، ثم تطبيق، ثم تحليل، ثم مقارنة.
- إذا أخطأت: لا تعطني الإجابة، أعطني تلميحًا وأشر إلى المصدر الذي أراجعه.
- إذا أصبت: اطلب مني التبرير بمثال.
- بعد 8 أسئلة: لخّص نقاط قوتي وضعفي وما يجب أن أعيده.`,
          },
          {
            title: 'اشرح بكلماتك ثم قارن',
            when: 'لاختبار فهمك العميق لمفهوم صعب، وهي من أقوى طرق التثبيت.',
            expect: 'مقارنة بين شرحك وما في المصادر: ما الصحيح، وما الناقص، وما الخاطئ، مع الاقتباس من المصدر.',
            text: `سأشرح مفهوم [المفهوم] بكلماتي دون النظر إلى الملفات:
"[اكتب شرحك هنا]"

قارن شرحي بما في المصادر:
1. ما الصحيح في شرحي.
2. ما الناقص المهم، مع الإشارة إلى مكانه في المصادر.
3. ما الخاطئ أو غير الدقيق ولماذا.
4. سؤال واحد يختبر هل أصلحت الفهم.
لا تعِد كتابة الشرح كاملًا؛ أريد أن أصححه بنفسي.`,
          },
          {
            title: 'تحليل الامتحانات السابقة',
            when: 'إذا كانت لديك امتحانات أو اختبارات سابقة، ارفعها كمصادر في نفس الدفتر.',
            expect: 'جدول بأنماط الأسئلة وأوزان المحاور وأنواع الأسئلة المتكررة، مع أسئلة تدريبية جديدة على نفس النمط.',
            text: `رفعت امتحانات سابقة لمادة [المادة] مع ملفات المحاضرات.
1. أنشئ جدولًا: المحور | عدد الأسئلة عنه في الامتحانات | نوع السؤال (تعريف، مسألة، مقارنة، تحليل حالة) | السنوات.
2. ما المحاور الأكثر تكرارًا، وما المحاور في المحاضرات التي لم تظهر في الامتحانات؟
3. ما أنماط الصياغة المتكررة؟
4. اكتب 5 أسئلة جديدة على نفس النمط من المحاور الأكثر وزنًا، دون الإجابات.
تنبيه: هذا تحليل للماضي ولا يضمن أسئلة الامتحان القادم.`,
          },
          {
            title: 'دليل مذاكرة مخصص لنقاط ضعفك',
            when: 'بعد جلستي الأسئلة والشرح، لتركز على ما ينقصك فقط.',
            expect: 'دليل مختصر يركز على المفاهيم التي أخطأت فيها، مع أمثلة من المصادر وأسئلة مراجعة قصيرة.',
            text: `نقاط ضعفي في هذه المادة حسب جلسات المراجعة: [اذكرها].
أنشئ دليل مذاكرة يركز عليها فقط:
1. لكل نقطة: شرح مختصر من المصادر بلغة بسيطة.
2. مثال واحد محلول من المصادر أو مبني عليها.
3. الخطأ الشائع في هذا المفهوم وكيف أتجنبه.
4. سؤالان سريعان للتأكد.
5. جدول مراجعة متباعدة: متى أراجع كل نقطة خلال [عدد] أيام.`,
          },
          {
            title: 'مقارنة المصادر وكشف التعارض',
            when: 'حين تجمع بين كتاب ومحاضرة ومراجع إضافية قد تختلف في التعريفات أو الطرق.',
            expect: 'جدول بالمواضيع التي تختلف فيها المصادر وكيف يعرضها كل مصدر، مع تنبيه إلى ما يعتمده أستاذك.',
            text: `قارن المصادر في هذا الدفتر حول [الموضوع]:
1. جدول: المفهوم | كيف يعرضه كل مصدر | هل هناك اختلاف في التعريف أو الرموز أو الطريقة؟
2. ما الذي يتفق عليه الجميع؟
3. أين يختلفون، وما سبب الاختلاف المحتمل (مستوى، أو اصطلاح، أو تبسيط)؟
4. إذا اختلفت المحاضرة عن الكتاب، ميّز بوضوح ما تقوله المحاضرة لأن الامتحان غالبًا يتبعها.
استشهد بالمصدر في كل خانة.`,
          },
          {
            title: 'طبّق على حالة جديدة',
            when: 'في المواد التطبيقية، لتنتقل من الحفظ إلى استخدام المفهوم.',
            expect: 'سيناريو جديد يحتاج المفاهيم من المصادر، وتقييم لحلك خطوة بخطوة، وتوضيح للمبدأ الذي فاتك.',
            text: `أنشئ سيناريو واقعيًا جديدًا يتطلب تطبيق [المفاهيم] من المصادر، بمستوى صعوبة [سهل/متوسط/صعب].
- اعرض السيناريو والمطلوب فقط، وانتظر حلي.
- بعد حلي: قيّم كل خطوة، وأشر إلى المبدأ في المصادر الذي يبرر الصواب أو الخطأ.
- ثم أعطني سيناريو أصعب قليلًا يستهدف الخطأ الذي وقعت فيه.`,
          },
          {
            title: 'تخصيص الملخص الصوتي للمراجعة',
            when: 'للمراجعة أثناء المشي أو التنقل. اكتب هذا في خانة التخصيص قبل إنشاء Audio Overview.',
            expect: 'حلقة صوتية تركز على ما طلبته بالمستوى الذي حددته. الأصوات والمحتوى مولدة بالذكاء الاصطناعي وقد تحتوي أخطاء، لذا راجع أي نقطة مهمة في المصدر.',
            text: `المستمع طالب في [السنة/المستوى] يراجع لامتحان [المادة] بعد [عدد] أيام.
ركّز فقط على: [المحاور أو نقاط الضعف].
- اشرح كل مفهوم بمثال عملي واحد.
- اذكر الأخطاء الشائعة والفروق بين المفاهيم المتشابهة.
- توقف بعد كل محور واطرح سؤالًا يفكر فيه المستمع قبل الإجابة.
- تجنب التفاصيل الجانبية والمقدمات الطويلة.`,
          },
        ],
      },
      {
        heading: 'رسائل متابعة واستخدام Studio',
        paragraphs: [],
        list: [
          'أنشئ البطاقات (Flashcards) بصعوبة "صعبة" واطلب في التخصيص: "ركّز على التعريفات والفروق بين المفاهيم المتشابهة"، ثم راجع البطاقات التي أخطأت فيها فقط.',
          'أنشئ اختبارًا (Quiz) قبل الامتحان بيومين ودوّن الأسئلة الخاطئة لتعود بها إلى البرومبت 3.',
          'استخدم صيغة The Debate في الملخص الصوتي للمواضيع التي فيها وجهات نظر متعددة.',
          '"أي سؤال من الامتحانات السابقة يشبه هذا السيناريو؟ وما الفرق؟"',
        ],
      },
      {
        heading: 'أخطاء شائعة',
        paragraphs: [],
        list: [
          'الاكتفاء بالملخصات والملخص الصوتي دون اختبار نفسك.',
          'رفع ملفات غير مرتبطة في نفس الدفتر فتتداخل الإجابات؛ دفتر واحد لكل مادة.',
          'عدم الضغط على الإشارات المرجعية للتحقق من النقاط المهمة.',
          'طلب الإجابة مباشرة في جلسة الأسئلة السقراطية.',
          'رفع مواد محمية لا تملك حق مشاركتها في دفتر مشترك.',
        ],
      },
      {
        heading: 'قائمة سير العمل السريعة',
        paragraphs: [],
        list: [
          'دفتر لكل مادة، وارفع المحاضرات والملاحظات والامتحانات السابقة.',
          'الخريطة والأولويات (1).',
          'لكل محور: أسئلة سقراطية (2) ثم الشرح بكلماتك (3).',
          'حلل الامتحانات السابقة (4) وطبّق على حالات (7).',
          'دليل لنقاط الضعف (5) وقارن المصادر عند الاختلاف (6).',
          'بطاقات واختبار وملخص صوتي مخصص (8) في الأيام الأخيرة.',
        ],
      },
    ],
  },
  en: {
    title: 'NotebookLM Is Not for Summaries: A Complete Study System in Eight Prompts That Test You and Expose What You Have Not Understood',
    excerpt:
      'Most students upload their files to NotebookLM, ask for a summary, then discover in the exam that they did not understand. This is an active study system in eight prompts: a course map, Socratic questions, explaining in your own words, past-exam analysis and the Studio tools.',
    hook:
      'After this guide you will turn any course’s files into an active study system: a clear course map, quizzes that expose your weak spots, corrections to your own explanations, past-exam pattern analysis, plus flashcards and a customised Audio Overview, with every answer linked to its source in your files.',
    sections: [
      {
        paragraphs: [
          'A summary gives you the feeling of understanding, but exams measure your ability to recall and apply. That is why the strongest way to study is to be tested and to explain things yourself, not to read another summary. This is where Google’s NotebookLM stands out: its answers are grounded in the sources you upload, with citations that jump to the original passage, which reduces made-up answers.',
        ],
      },
      {
        heading: 'What to know before you start',
        paragraphs: [
          'The tool runs in the browser at notebooklm.google.com, and Google’s newer Help pages call it Gemini Notebook. Create one notebook per course and upload lectures, PDFs, notes, slides and video links. According to the Help pages, the free plan currently allows 50 sources per notebook, with daily limits on Audio Overviews, flashcards and quizzes, and these limits may change.',
          'In the Studio panel you will find Audio Overviews in formats such as Deep Dive, The Brief, The Critique and The Debate, mind maps, reports such as a study guide and FAQ, and flashcards and quizzes whose difficulty you can set and which accept your own instructions. The prompts below go in the chat or in the customisation box.',
        ],
      },
      {
        heading: 'The eight prompts',
        paragraphs: [],
        prompts: [
          {
            title: 'Course map and study priorities',
            when: 'Your first session after uploading all the course files.',
            expect: 'The main topics and the concepts under each, how they connect and what comes first, with citations to where they appear in your files.',
            text: `Using only the sources, create a map of [course name]:
1. The main topics in a logical learning order.
2. Under each topic: the core concepts and what must be understood first.
3. Concepts that recur across several lectures (usually the most important).
4. Label each topic: core / intermediate / detail.
5. Suggest a study order for the [number] days before the exam.
Cite the source for each topic, and if something is not in the sources, say so.`,
          },
          {
            title: 'The Socratic tutor',
            when: 'After a first read of a topic, to find out whether you really understood it.',
            expect: 'One question at a time, moving from understanding to application, with feedback on your answer and a hint instead of the solution, pointing to what to review.',
            text: `Be a Socratic tutor on [topic], using only the sources.
- Ask me one question at a time and wait for my answer.
- Start with comprehension, then application, then analysis, then comparison.
- If I am wrong: do not give the answer; give a hint and point to the source to review.
- If I am right: ask me to justify it with an example.
- After 8 questions: summarise my strengths, weaknesses and what to redo.`,
          },
          {
            title: 'Explain it in your words, then compare',
            when: 'To test deep understanding of a hard concept; one of the strongest ways to make it stick.',
            expect: 'A comparison of your explanation with the sources: what is right, what is missing and what is wrong, quoting the source.',
            text: `I will explain [concept] in my own words without looking at the files:
"[write your explanation here]"

Compare my explanation with the sources:
1. What is correct.
2. What important parts are missing, and where they are in the sources.
3. What is wrong or imprecise, and why.
4. One question to check that I fixed my understanding.
Do not rewrite the explanation for me; I want to correct it myself.`,
          },
          {
            title: 'Past-exam analysis',
            when: 'If you have past exams or quizzes, upload them as sources in the same notebook.',
            expect: 'A table of question patterns, topic weights and recurring question types, plus new practice questions in the same style.',
            text: `I uploaded past exams for [course] alongside the lecture files.
1. Create a table: topic | number of exam questions on it | question type (definition, problem, comparison, case analysis) | years.
2. Which topics recur most, and which lecture topics never appeared in exams?
3. What phrasing patterns recur?
4. Write 5 new questions in the same style on the heaviest topics, without answers.
Note: this analyses the past and does not guarantee the next exam’s questions.`,
          },
          {
            title: 'A study guide for your weak spots',
            when: 'After the question and explanation sessions, to focus only on what you are missing.',
            expect: 'A short guide focused on the concepts you got wrong, with examples from the sources and quick review questions.',
            text: `My weak spots in this course, from my review sessions: [list them].
Create a study guide focused only on these:
1. For each: a short, plain explanation from the sources.
2. One worked example from or based on the sources.
3. The common mistake with this concept and how to avoid it.
4. Two quick check questions.
5. A spaced-review schedule: when to revisit each point over [number] days.`,
          },
          {
            title: 'Compare sources and catch conflicts',
            when: 'When you combine a textbook, lectures and extra references that may differ in definitions or methods.',
            expect: 'A table of topics where the sources differ and how each presents them, flagging what your instructor uses.',
            text: `Compare the sources in this notebook on [topic]:
1. A table: concept | how each source presents it | any difference in definition, notation or method?
2. What do they all agree on?
3. Where do they differ, and what is the likely reason (level, convention, simplification)?
4. If the lecture differs from the textbook, clearly mark what the lecture says, since exams usually follow it.
Cite the source in every cell.`,
          },
          {
            title: 'Apply it to a new case',
            when: 'In applied courses, to move from memorising to using the concept.',
            expect: 'A new scenario that needs the concepts from your sources, step-by-step feedback on your solution, and the principle you missed.',
            text: `Create a new, realistic scenario that requires applying [concepts] from the sources, at [easy/medium/hard] difficulty.
- Show only the scenario and the task, then wait for my solution.
- After I answer: assess each step and point to the principle in the sources that makes it right or wrong.
- Then give me a slightly harder scenario that targets the mistake I made.`,
          },
          {
            title: 'Customise the Audio Overview for revision',
            when: 'For revision while walking or commuting. Paste this into the customisation box before generating an Audio Overview.',
            expect: 'An episode focused on what you asked for, at the level you set. Voices and content are AI-generated and can contain errors, so check any key point in the source.',
            text: `The listener is a [year/level] student revising for a [course] exam in [number] days.
Focus only on: [topics or weak spots].
- Explain each concept with one practical example.
- Cover common mistakes and the differences between similar concepts.
- Pause after each topic and pose a question for the listener to think about before answering it.
- Skip side details and long introductions.`,
          },
        ],
      },
      {
        heading: 'Follow-ups and using Studio',
        paragraphs: [],
        list: [
          'Generate Flashcards on "hard" and add the instruction "focus on definitions and differences between similar concepts", then review only the cards you missed.',
          'Generate a Quiz two days before the exam and note the wrong answers to take back to prompt 3.',
          'Use The Debate format for Audio Overviews on topics with multiple viewpoints.',
          '"Which past-exam question resembles this scenario, and how is it different?"',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [],
        list: [
          'Relying on summaries and Audio Overviews without testing yourself.',
          'Mixing unrelated files in one notebook so answers blur; one notebook per course.',
          'Not clicking citations to verify important points.',
          'Asking for the answer straight away during Socratic sessions.',
          'Uploading protected material you have no right to share into a shared notebook.',
        ],
      },
      {
        heading: 'Quick workflow checklist',
        paragraphs: [],
        list: [
          'One notebook per course; upload lectures, notes and past exams.',
          'Map and priorities (1).',
          'For each topic: Socratic questions (2), then explain in your words (3).',
          'Analyse past exams (4) and apply to cases (7).',
          'A guide for weak spots (5); compare sources when they differ (6).',
          'Flashcards, a quiz and a customised Audio Overview (8) in the final days.',
        ],
      },
    ],
  },
}
