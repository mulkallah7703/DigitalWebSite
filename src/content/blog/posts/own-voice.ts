import type { BlogPost } from '../types'

export const post: BlogPost = {
  slug: 'write-in-your-own-voice-with-ai',
  date: '2026-10-29',
  cover: '/blog/write-in-your-own-voice-with-ai.png?v=3',
  coverLines: ['Natural Writing', 'with AI'],
  coverAlt: { ar: 'غلاف مقال الكتابة الطبيعية مع الذكاء الاصطناعي', en: 'Cover: natural writing with AI' },
  tags: ['Writing', 'ChatGPT', 'Claude'],
  ar: {
    title: 'أكبر خطأ مع ChatGPT وClaude هو النسخ واللصق: ثمانية برومبتات تجعل النص طبيعيًا وبصوتك أنت',
    excerpt:
      'النص الآلي أصبح مكشوفًا: مقدمات عامة، وعبارات مكررة، وإيقاع رتيب. هذه ثمانية برومبتات عملية تبني ملف أسلوبك، وتكشف الأنماط الآلية وتصلحها، وتحول ملاحظاتك إلى نص طبيعي يشبهك.',
    hook:
      'بعد هذا الدليل سيكون لديك "ملف صوت" يصف أسلوبك يمكنك إعادة استخدامه مع أي أداة، وسلسلة من البرومبتات تحوّل أي مسودة آلية إلى نص طبيعي محدد وواضح يقرأه الناس كأنه منك، لأنه فعلًا منك.',
    sections: [
      {
        paragraphs: [
          'من يقرأ كثيرًا على LinkedIn أو في التقارير الجامعية صار يلتقط النص المولد بالكامل في ثوانٍ: افتتاحية مثل "في عالمنا المتسارع"، وقوائم من ثلاث صفات، وكلمات رنانة بلا مضمون، وخاتمة تكرر المقدمة. المشكلة ليست في استخدام الأداة، بل في نسخ أول ناتج كما هو.',
          'أريد أن أكون واضحًا في نقطة: الهدف هنا ليس خداع أدوات الكشف أو نسب جهد ليس لك. الهدف أن يكون النص جيدًا وصادقًا ويحمل أفكارك وصوتك، وأن تستخدم الذكاء الاصطناعي كمحرر يرفع الجودة. وهذا بالمناسبة ما يجعل النص طبيعيًا تلقائيًا.',
        ],
      },
      {
        heading: 'لماذا يبدو النص آليًا؟',
        paragraphs: ['خمسة أنماط تتكرر في النصوص المولدة، وستستهدفها البرومبتات التالية:'],
        list: [
          'العمومية: ادعاءات تصلح لأي موضوع بلا مثال أو تفصيل.',
          'الإيقاع الرتيب: جمل بطول متقارب وتركيب متكرر.',
          'المفردات الرنانة: "ثوري"، و"لا غنى عنه"، و"رحلة"، و"عالم متسارع".',
          'البنية المتوقعة: مقدمة عامة ثم ثلاث نقاط ثم خاتمة تعيد المقدمة.',
          'غياب الموقف: لا رأي، ولا تجربة، ولا "أنا".',
        ],
      },
      {
        heading: 'البرومبتات الثمانية',
        paragraphs: [],
        prompts: [
          {
            title: 'مستخرج ملف الصوت من كتاباتك',
            when: 'مرة واحدة في البداية، ثم احفظ الناتج في التعليمات الدائمة أو في Project.',
            expect: 'وصف دقيق لأسلوبك: طول الجمل، والنبرة، والمفردات المفضلة، وطريقة الافتتاح والختام، مع قواعد قابلة للاستخدام في أي برومبت لاحق.',
            text: `أنت محلل أسلوب كتابة. هذه 3 نماذج من كتاباتي الحقيقية التي أرضى عنها:

<sample1>[الصق النموذج الأول]</sample1>
<sample2>[الصق النموذج الثاني]</sample2>
<sample3>[الصق النموذج الثالث]</sample3>

حلل أسلوبي واكتب "ملف صوت" في نقاط:
1. متوسط طول الجملة ومدى تنوعه.
2. النبرة (رسمية، ودية، مباشرة، ساخرة...) مع أمثلة من النصوص.
3. كلمات وتعابير أستخدمها كثيرًا.
4. كيف أفتتح وكيف أختم.
5. ما الذي لا أفعله أبدًا (مثل المبالغة أو الرموز التعبيرية).
6. عشر قواعد مختصرة تبدأ بـ "اكتب" أو "تجنب" يمكنني لصقها في أي برومبت.

لا تمدح أسلوبي؛ صِفه بدقة.`,
          },
          {
            title: 'من ملاحظاتي الخام إلى نص بصوتي',
            when: 'عندما تريد نصًا جديدًا (منشور، مقال، رسالة) وعندك الأفكار لكن ليس الوقت للصياغة.',
            expect: 'مسودة تستخدم أفكارك وعباراتك فقط وتتبع ملف صوتك. ستحتاج غالبًا تعديلات بسيطة، وهذا طبيعي.',
            text: `<voice>
[الصق ملف الصوت هنا]
</voice>

<notes>
[ملاحظاتك الخام: الفكرة، ورأيك، ومثال حقيقي من تجربتك، والنصيحة التي تريد إيصالها]
</notes>

اكتب [نوع النص] لـ [الجمهور] بطول [عدد] كلمة تقريبًا.

قواعد:
- استخدم أفكاري فقط، وحافظ على عباراتي حيث أمكن.
- لا تضف أمثلة أو أرقامًا أو تجارب لم أذكرها. إذا احتجت مثالًا فاكتب [مثال من عندك هنا].
- ابدأ مباشرة بالفكرة أو بالمثال، لا بمقدمة عامة.
- نوّع طول الجمل، وتجنب القوائم إلا إذا كانت ضرورية.
- لا تختم بتكرار المقدمة.`,
          },
          {
            title: 'كاشف الأنماط الآلية ومصلحها',
            when: 'عندما لديك نص مولد أو مسودة تشعر أنها "بلاستيكية" ولا تعرف لماذا.',
            expect: 'جدول بكل نمط آلي في النص: الجملة، والنمط، والبديل المقترح. ثم نسخة معدلة تحافظ على المعنى.',
            text: `أنت محرر محترف متخصص في تحويل النصوص الآلية إلى نصوص بشرية طبيعية.

<text>
[الصق النص]
</text>

1. استخرج في جدول كل جملة فيها نمط آلي: (الجملة | النمط: عمومية، أو مفردات رنانة، أو تكرار، أو إيقاع رتيب، أو حشو، أو مبالغة | البديل المقترح).
2. أشر إلى أي ادعاء يحتاج مثالًا أو رقمًا حقيقيًا، واكتب بجانبه [يحتاج تفصيلًا منك] بدل اختراع تفصيل.
3. اكتب نسخة معدلة: احذف الحشو، ونوّع طول الجمل، واستبدل الكلمات الرنانة بكلمات بسيطة دقيقة.

لا تضف أفكارًا جديدة، ولا تطل النص؛ النسخة المعدلة يجب أن تكون أقصر أو مساوية.`,
          },
          {
            title: 'تمريرة التحديد: من العام إلى الملموس',
            when: 'عندما يكون النص صحيحًا لكنه عام ولا يترك أثرًا.',
            expect: 'أسئلة محددة لك عن كل نقطة عامة (متى؟ أين؟ مثال؟ رقم؟)، ثم دمج إجاباتك في النص. هذا ما يصنع الفرق الأكبر.',
            text: `هذا نصي:
<text>
[الصق النص]
</text>

مهمتك أن تجعله ملموسًا دون أن تخترع شيئًا:
1. حدد كل جملة عامة أو مجردة.
2. لكل جملة اسألني سؤالًا واحدًا محددًا يستخرج تفصيلًا حقيقيًا (مثال، موقف، رقم أعرفه، اسم أداة، نتيجة).
3. انتظر إجاباتي.
4. بعد إجاباتي، أعد كتابة الجمل مستخدمًا تفاصيلي فقط، واحذف الجمل التي لم أجد لها تفصيلًا إذا كانت لا تضيف شيئًا.`,
          },
          {
            title: 'محرر القراءة بصوت مسموع',
            when: 'المراجعة الأخيرة قبل النشر.',
            expect: 'ملاحظات على الجمل الثقيلة أو الطويلة أو المتعثرة في النطق، واقتراحات لتقسيمها، مع تحسين الإيقاع دون تغيير الأسلوب.',
            text: `اقرأ هذا النص كأنك تقرؤه بصوت مسموع أمام جمهور:
<text>
[الصق النص]
</text>

1. ضع علامة على كل جملة يتعثر فيها القارئ أو يحتاج لإعادة قراءتها، واذكر السبب.
2. اقترح تقسيم الجمل الطويلة، ودمج الجمل القصيرة المتقطعة.
3. تأكد من أن كل فقرة فيها فكرة واحدة.
4. أعطني النسخة النهائية مع الحفاظ على أسلوبي وكلماتي قدر الإمكان.`,
          },
          {
            title: 'ضابط النبرة حسب الجمهور',
            when: 'عندما تكتب الرسالة نفسها لجماهير مختلفة: مدير، وعميل، وزميل، ومتابعين.',
            expect: 'نسخ متعددة للمضمون نفسه بنبرات مختلفة، مع شرح ما تغير في كل نسخة لتتعلم ضبط النبرة بنفسك.',
            text: `هذه رسالتي الأساسية:
<message>
[الصق الرسالة أو النقاط]
</message>

اكتب منها 3 نسخ:
1. لـ [مدير أو جهة رسمية]: مختصرة ومهنية.
2. لـ [عميل]: ودية وواضحة، مع خطوة تالية محددة.
3. لـ [متابعين على LinkedIn]: شخصية، تبدأ بموقف أو ملاحظة.

بعد كل نسخة اكتب في سطرين: ما الذي غيّرته في النبرة ولماذا.
قيود: نفس المعلومات في كل النسخ، لا مبالغة، ولا عبارات جاهزة.`,
          },
          {
            title: 'مزيل أثر الترجمة الحرفية',
            when: 'عندما يكون النص العربي مترجمًا أو مكتوبًا بتأثير الإنجليزية، فيبدو ثقيلًا وغير طبيعي.',
            expect: 'نص عربي سلس بتراكيب عربية طبيعية، مع قائمة بالتراكيب المترجمة التي أُصلحت لتتجنبها مستقبلًا.',
            text: `أنت محرر لغة عربية متمكن، تكتب بعربية فصيحة معاصرة وسلسة.

<text>
[الصق النص العربي]
</text>

1. حدد التراكيب المترجمة حرفيًا من الإنجليزية (مثل الإفراط في "يتم" و"قام بـ"، والمبني للمجهول، و"على الرغم من حقيقة أن"، وترتيب الجملة الإنجليزي).
2. أعد كتابة النص بتراكيب عربية طبيعية مع الحفاظ على المعنى والمصطلحات التقنية كما هي.
3. أعطني جدولًا: التركيب الأصلي | البديل الطبيعي، لأتعلم منه.

لا تستخدم كلمات معجمية نادرة؛ أريد عربية واضحة يفهمها الجميع.`,
          },
          {
            title: 'المراجع الصادق قبل النشر',
            when: 'آخر خطوة قبل نشر أي نص استعنت فيه بالذكاء الاصطناعي.',
            expect: 'فحص للدقة والصدق: ادعاءات تحتاج تحققًا، وتجارب قد تكون غير دقيقة، وأي عبارة لا تعبر عنك، مع قرار واضح.',
            text: `راجع هذا النص قبل نشره باسمي:
<text>
[الصق النص]
</text>

افحص:
1. كل رقم أو حقيقة أو اسم: ضعه في قائمة "يجب التحقق منه".
2. أي جملة تنسب لي تجربة أو إنجازًا: اسألني هل هذا صحيح.
3. أي وعد أو مبالغة قد تضر بمصداقيتي.
4. هل الفكرة الأساسية واضحة في أول سطرين؟
5. سطر واحد: هل النص جاهز للنشر أم يحتاج تعديلًا، ولماذا.`,
          },
        ],
      },
      {
        heading: 'كيف تكرر حتى تصل إلى نص ممتاز',
        paragraphs: [],
        list: [
          '"اجعله أقصر بـ 30% دون حذف أي فكرة."',
          '"اكتب ثلاث افتتاحيات مختلفة: بسؤال، وبموقف، وبرأي صريح."',
          '"ما الجملة الأضعف في النص؟ أعد كتابتها بثلاث طرق."',
          '"قارن نسختك بملف صوتي: أين ابتعدت عن أسلوبي؟"',
        ],
      },
      {
        heading: 'أخطاء شائعة',
        paragraphs: [],
        list: [
          'طلب "اجعله بشريًا" دون إعطاء الأداة أفكارك أو أسلوبك.',
          'البحث عن أمر سحري يتجاوز أدوات الكشف بدل تحسين جودة النص فعلًا.',
          'ترك الأداة تضيف تجارب أو أرقامًا لم تحدث.',
          'استخدام النص في عمل أكاديمي دون الالتزام بسياسة الجامعة.',
        ],
      },
      {
        heading: 'قائمة سير العمل السريعة',
        paragraphs: [],
        list: [
          'أنشئ ملف صوتك مرة واحدة (البرومبت 1) واحفظه.',
          'ابدأ دائمًا من ملاحظاتك (2)، لا من طلب عام.',
          'اكشف الأنماط الآلية (3)، ثم اجعل النص ملموسًا (4).',
          'اضبط النبرة للجمهور (6)، وأزل أثر الترجمة إن وجد (7).',
          'اقرأ بصوت مسموع (5)، ثم المراجعة الصادقة (8) قبل النشر.',
        ],
      },
    ],
  },
  en: {
    title: 'The Biggest Mistake with ChatGPT and Claude Is Copy-Paste: Eight Prompts for Natural Writing in Your Own Voice',
    excerpt:
      'Machine-sounding text is easy to spot: generic openings, repeated phrases, flat rhythm. Eight practical prompts that build your voice profile, detect and fix robotic patterns, and turn your notes into natural text that sounds like you.',
    hook:
      'After this guide you will have a reusable "voice profile" that describes your style for any tool, and a chain of prompts that turns any robotic draft into natural, specific, clear writing people read as yours, because it is.',
    sections: [
      {
        paragraphs: [
          'People who read a lot on LinkedIn or in university reports now spot fully generated text in seconds: “in today’s fast-paced world”, lists of three adjectives, buzzwords without substance, and a conclusion that repeats the introduction. The problem is not using the tool but copying its first output as is.',
          'To be clear: the goal is not to fool detectors or claim effort that is not yours. The goal is writing that is good, honest and carries your ideas and voice, with AI as an editor that raises quality. That, incidentally, is what makes text sound natural.',
        ],
      },
      {
        heading: 'Why text sounds robotic',
        paragraphs: ['Five patterns recur in generated text, and the prompts below target them:'],
        list: [
          'Generic claims that fit any topic, with no example or detail.',
          'Flat rhythm: sentences of similar length and structure.',
          'Buzzwords: “revolutionary”, “essential”, “journey”, “fast-paced world”.',
          'Predictable structure: generic intro, three points, a conclusion that repeats the intro.',
          'No stance: no opinion, no experience, no “I”.',
        ],
      },
      {
        heading: 'The eight prompts',
        paragraphs: [],
        prompts: [
          {
            title: 'Voice profile extractor',
            when: 'Once at the start; then save the output in custom instructions or a Project.',
            expect: 'A precise description of your style: sentence length, tone, favourite words, how you open and close, plus rules you can reuse in any prompt.',
            text: `You are a writing-style analyst. Here are 3 samples of my real writing that I am happy with:

<sample1>[paste sample one]</sample1>
<sample2>[paste sample two]</sample2>
<sample3>[paste sample three]</sample3>

Analyse my style and write a "voice profile" as bullet points:
1. Average sentence length and how much it varies.
2. Tone (formal, friendly, direct, wry...) with examples from the texts.
3. Words and expressions I use often.
4. How I open and how I close.
5. What I never do (e.g. hype or emojis).
6. Ten short rules starting with "Write" or "Avoid" that I can paste into any prompt.

Do not praise my style; describe it precisely.`,
          },
          {
            title: 'From my raw notes to text in my voice',
            when: 'When you need new text (post, article, email) and have the ideas but not the time to word them.',
            expect: 'A draft using only your ideas and phrases, following your voice profile. It usually needs light edits, which is normal.',
            text: `<voice>
[paste your voice profile]
</voice>

<notes>
[your raw notes: the idea, your opinion, a real example from your experience, the takeaway]
</notes>

Write a [type of text] for [audience], about [number] words.

Rules:
- Use only my ideas and keep my phrasing where possible.
- Add no examples, numbers or experiences I did not mention. If an example is needed, write [your example here].
- Open directly with the idea or the example, not a generic intro.
- Vary sentence length and avoid lists unless necessary.
- Do not end by repeating the introduction.`,
          },
          {
            title: 'Robotic-pattern detector and fixer',
            when: 'When you have generated text or a draft that feels “plastic” and you cannot say why.',
            expect: 'A table of every robotic pattern: sentence, pattern, suggested alternative. Then a revised version that keeps the meaning.',
            text: `You are a professional editor who turns machine-sounding text into natural human writing.

<text>
[paste the text]
</text>

1. In a table, list every sentence with a robotic pattern: (sentence | pattern: generic, buzzword, repetition, flat rhythm, filler, exaggeration | suggested alternative).
2. Flag any claim that needs a real example or number and mark it [needs your detail] instead of inventing one.
3. Write a revised version: cut filler, vary sentence length, replace buzzwords with simple precise words.

Add no new ideas and do not lengthen the text; the revision must be the same length or shorter.`,
          },
          {
            title: 'Specificity pass: from generic to concrete',
            when: 'When the text is correct but generic and leaves no impression.',
            expect: 'Specific questions about each generic point (when, where, example, number), then your answers woven in. This makes the biggest difference.',
            text: `This is my text:
<text>
[paste the text]
</text>

Make it concrete without inventing anything:
1. Identify every generic or abstract sentence.
2. For each, ask me one specific question that draws out a real detail (an example, a situation, a number I know, a tool name, a result).
3. Wait for my answers.
4. Then rewrite those sentences using only my details, and drop any sentence I could not support if it adds nothing.`,
          },
          {
            title: 'Read-aloud editor',
            when: 'The final review before publishing.',
            expect: 'Notes on heavy, long or awkward sentences with suggestions to split them, improving rhythm without changing your style.',
            text: `Read this text as if reading it aloud to an audience:
<text>
[paste the text]
</text>

1. Mark every sentence where a reader would stumble or need to reread, and say why.
2. Suggest splitting long sentences and merging choppy short ones.
3. Make sure each paragraph carries one idea.
4. Give me the final version, keeping my style and words as much as possible.`,
          },
          {
            title: 'Tone tuner by audience',
            when: 'When you send the same message to different audiences: a manager, a client, a colleague, followers.',
            expect: 'Several versions of the same content in different tones, with an explanation of what changed so you learn to tune tone yourself.',
            text: `This is my core message:
<message>
[paste the message or points]
</message>

Write 3 versions:
1. For [a manager or official body]: short and professional.
2. For [a client]: friendly and clear, with a specific next step.
3. For [LinkedIn followers]: personal, opening with a situation or observation.

After each version, explain in two lines what you changed in tone and why.
Constraints: same information in all versions, no hype, no stock phrases.`,
          },
          {
            title: 'Translation-smell remover',
            when: 'When you write in English as a second language or translate from Arabic, and the text reads stiff or unnatural.',
            expect: 'Fluent, idiomatic English with natural structures, plus a list of the translated patterns fixed so you avoid them next time.',
            text: `You are an experienced English editor who writes clear, modern, natural English.

<text>
[paste the English text]
</text>

1. Identify structures that read as translated (overuse of passive voice, "it is worth mentioning that", word-for-word idioms, overly long noun phrases, unnatural word order).
2. Rewrite the text in natural English, keeping the meaning and technical terms unchanged.
3. Give me a table: original phrasing | natural alternative, so I can learn from it.

Avoid fancy vocabulary; I want plain English anyone understands.`,
          },
          {
            title: 'The honest pre-publish reviewer',
            when: 'The last step before publishing anything you wrote with AI help.',
            expect: 'An accuracy and honesty check: claims to verify, experiences that may be inaccurate, any line that does not represent you, and a clear verdict.',
            text: `Review this text before I publish it under my name:
<text>
[paste the text]
</text>

Check:
1. Every number, fact or name: put it on a "must verify" list.
2. Any sentence attributing an experience or achievement to me: ask me whether it is true.
3. Any promise or exaggeration that could hurt my credibility.
4. Is the main idea clear in the first two lines?
5. One line: is it ready to publish or does it need changes, and why.`,
          },
        ],
      },
      {
        heading: 'How to iterate to an excellent text',
        paragraphs: [],
        list: [
          '"Make it 30% shorter without dropping any idea."',
          '"Write three different openings: a question, a situation, a blunt opinion."',
          '"Which sentence is weakest? Rewrite it three ways."',
          '"Compare your version with my voice profile: where did you drift from my style?"',
        ],
      },
      {
        heading: 'Common mistakes',
        paragraphs: [],
        list: [
          'Asking to “make it human” without giving the tool your ideas or style.',
          'Hunting for a magic prompt to beat detectors instead of actually improving the text.',
          'Letting the tool add experiences or numbers that never happened.',
          'Using generated text in academic work without following university policy.',
        ],
      },
      {
        heading: 'Quick workflow checklist',
        paragraphs: [],
        list: [
          'Create your voice profile once (prompt 1) and save it.',
          'Always start from your notes (2), never a generic request.',
          'Detect robotic patterns (3), then make it concrete (4).',
          'Tune tone for the audience (6) and remove translation smell if needed (7).',
          'Read aloud (5), then the honest review (8) before publishing.',
        ],
      },
    ],
  },
}
