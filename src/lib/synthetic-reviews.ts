export type SyntheticReview = {
  id: string
  rating: number
  content: string
  relativeDate: string
  place: string
  user: { name: string }
}

type DialectId = 'gulf' | 'syrian' | 'egyptian' | 'iraqi' | 'moroccan' | 'tunisian'

type DialectPack = {
  id: DialectId
  places: string[]
  leads: string[]
  lines: string[]
  tails: string[]
}

const FIRST_NAMES = [
  'أحمد', 'محمد', 'عبدالله', 'عبدالرحمن', 'خالد', 'فهد', 'سلطان', 'ناصر', 'سعد', 'تركي',
  'بندر', 'ماجد', 'وليد', 'يوسف', 'إبراهيم', 'عمر', 'علي', 'حسن', 'حسين', 'طارق',
  'كريم', 'ياسر', 'رامي', 'سامر', 'مازن', 'حسام', 'وائل', 'طه', 'مصطفى', 'محمود',
  'سيف', 'حمد', 'راشد', 'زايد', 'جاسم', 'مشعل', 'نايف', 'فيصل', 'سلمان', 'عبدالعزيز',
  'نورة', 'سارة', 'فاطمة', 'مريم', 'هند', 'لمى', 'ريم', 'دانة', 'جود', 'لين',
  'ميرا', 'عائشة', 'خديجة', 'آمنة', 'هدى', 'منى', 'ليلى', 'سلمى', 'رنا', 'دينا',
  'ياسمين', 'نور', 'هبة', 'شيماء', 'أميرة', 'ملك', 'لانا', 'تالا', 'جنى', 'غادة',
  'سمر', 'رغد', 'أروى', 'شهد', 'العنود', 'موضي', 'لطيفة', 'أمين', 'مهدي', 'أنس',
  'إلياس', 'آدم', 'نبيل', 'سمير', 'فؤاد', 'رشيد', 'كمال', 'زهرة', 'إيمان', 'هاجر',
  'مروة', 'آية', 'حنان', 'نسرين', 'إكرام', 'بدر', 'أنور', 'جمال', 'عادل', 'حمزة',
  'زياد', 'لؤي', 'باسل', 'غسان', 'فراس', 'شادي', 'تامر', 'باسم', 'حازم', 'ولاء',
  'بتول', 'رقية', 'صفاء', 'مها', 'نجلاء', 'عبير', 'ريما', 'لينا', 'هيا', 'جواهر',
]

const FAMILY_INITIALS = ['أ', 'ب', 'ت', 'ج', 'ح', 'خ', 'د', 'ر', 'ز', 'س', 'ش', 'ص', 'ع', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي']

const NOTES = [
  'أنصح بها بصراحة.',
  'التجربة كانت مريحة.',
  'ما ندمت على الشراء.',
  'تفيد حتى لو الوقت ضيق.',
  'الشرح يوصل المعلومة بسرعة.',
  'حسيتها مرتبة وواضحة.',
  'ناسبتني من أول يوم.',
  'صرت أفهم الموضوع أحسن.',
  'الجودة ثابتة حتى النهاية.',
  'تختصر طريقًا طويلًا.',
  'الأمثلة عملية وواقعية.',
  'رجعت لها أكثر من مرة.',
  'تستحق التقييم العالي.',
  'قرار صحيح أنني أخذتها.',
  'المحتوى يثق به الواحد.',
  'أنهيتها وأنا مقتنع.',
  'تفرق في العمل فعلًا.',
  'أسلوبها هادئ ومباشر.',
  'ما وجدت شيئًا ناقصًا.',
  'أنصح بها لأي مبتدئ.',
  'الإيقاع مريح والخطوات واضحة.',
  'المتابعة سهلة من غير تشتت.',
]

const BRIDGES = [
  'والفرق باين من أول تجربة.',
  'وهذا اللي خلاني أكمّل للنهاية.',
  'والنتيجة كانت أوضح مما توقعت.',
  'وحسيت إن الوقت ما ضاع.',
  'والأسلوب مرتب من غير تعقيد.',
  'وهذا سبب تقييمي العالي.',
  'والمحتوى يمشي معاك بهدوء.',
  'والتطبيق بعد الشرح سهل.',
  'وكنت محتاج هالتفاصيل.',
  'والأمثلة قريبة من الشغل الحقيقي.',
  'وصرت أرجع لها لما أحتاج.',
  'والترتيب ساعدني أثبّت المعلومة.',
  'وما لقيت حشو يضيّع التركيز.',
  'واللغة سهلة والشرح مباشر.',
  'وأنتجت معي نتيجة أقدر أستخدمها.',
  'والجودة ثابتة من البداية للآخر.',
  'وناسبتني حتى مع وقتي الضيق.',
  'وصرت أوثق بالموضوع أكثر.',
]

const CLOSERS = [
  'سأنصح بها من حولي.',
  'سأرجع للتفاصيل عند الحاجة.',
  'النتيجة ظهرت بسرعة.',
  'هذا ما كنت أبحث عنه.',
  'المستوى مناسب للبداية الجادة.',
  'استفدت منها في عملي مباشرة.',
  'الترتيب ساعدني على التركيز.',
  'ما شعرت أن الوقت ضاع.',
  'أسلوبها يناسب من يتعلم بهدوء.',
  'الخلاصة واضحة بعد كل جزء.',
  'صرت أطبق الفكرة بثقة.',
  'جودة ثابتة من أولها لآخرها.',
  'تجربة إيجابية من غير مبالغة.',
  'استحقّت الوقت الذي أعطيته لها.',
  'سأكمل أي جزء لاحق إن وُجد.',
  'الخيار كان موفقًا.',
  'المعلومة تثبت بعد التطبيق.',
  'أنصح بإكمالها حتى النهاية.',
  'مناسبة لمن يريد أساسًا صحيحًا.',
  'خرجت منها بنتيجة أستخدمها.',
  'الشرح يكفي من غير بحث إضافي.',
  'راضٍ عن التجربة كاملة.',
  'ستفيد من يبدأ الآن.',
  'أسلوبها واضح وبعيد عن التعقيد.',
]

const RELATIVE_DATES = [
  'منذ ساعة',
  'منذ ساعتين',
  'أمس',
  'منذ يومين',
  'منذ ٣ أيام',
  'منذ ٥ أيام',
  'منذ أسبوع',
  'منذ أسبوعين',
  'منذ ٣ أسابيع',
  'منذ شهر',
  'منذ شهرين',
  'منذ ٣ أشهر',
  'منذ ٤ أشهر',
  'الشهر الماضي',
  'منذ ٦ أيام',
  'منذ ١٠ أيام',
]

const DIALECTS: DialectPack[] = [
  {
    id: 'gulf',
    places: ['الرياض · السعودية', 'جدة · السعودية', 'الدمام · السعودية', 'مكة · السعودية', 'الكويت', 'الدوحة · قطر', 'أبوظبي · الإمارات', 'مسقط · عُمان'],
    leads: [
      'والله يا جماعة',
      'صراحة',
      'من تجربة شخصية،',
      'أنصح فيها و',
      'توني مخلّصها و',
      'يا أخوان',
      'صدق',
      'باختصار،',
      'شريتها قبل فترة و',
      'لو أحد يسألني،',
      'تجربتي كانت حلوة،',
      'ما قصرت،',
    ],
    lines: [
      '{product} تستاهل، الشرح واضح ومرتب.',
      '{product} فادتني مرة، خصوصًا بموضوع {topic}.',
      'أي أحد يبي {category} يبدأ بـ{product} وما راح يندم.',
      '{product} تمشي معك خطوة بخطوة والمحتوى مرتب.',
      '{product} غير شكل، والأمثلة عملية.',
      '{product} طلعت من أفضل مشترياتي بقسم {category}.',
      '{product} رتبت لي أفكار {topic} بطريقة سهلة.',
      '{product} مستواها ممتاز وتستاهل الإشادة.',
      '{product} توصلك لنتيجة سريعة بـ{category}.',
      'التجربة مع {product} كانت سلسة من البداية للنهاية.',
      'طريقة الطرح في {product} عجبتني، مو معقدة.',
      '{product} اختصرت علي وقت كثير بموضوع {topic}.',
      'بعد {product} صرت أفهم {category} أحسن.',
      '{product} مرتبة ونظيفة وتستاهل التقييم.',
      '{product} واضحة حتى للمبتدئ بـ{category}.',
      '{product} غطت {topic} تغطية زينة ومفيدة.',
    ],
    tails: [
      'أنصحكم فيها وبقوة.',
      'ما ندمت أبد.',
      'بتكرر التجربة لو فيه جزء ثاني.',
      'تستاهل كل ريال.',
      'خذوها وأنتم مطمئنين.',
      'الشرح واضح والوتيرة مريحة.',
      'مناسبة للي يبي يبدأ صح.',
      'جودة المحتوى أعلى من المتوقع.',
      'خلّصت وأنا راضي.',
      'بتفيدكم بالشغل فعلًا.',
      'ما فيها حشو زايد.',
      'من أفضل القرارات اللي أخذتها هالفترة.',
    ],
  },
  {
    id: 'syrian',
    places: ['دمشق · سوريا', 'حلب · سوريا', 'حمص · سوريا', 'اللاذقية · سوريا', 'عمّان · الأردن'],
    leads: [
      'والله',
      'عن جد',
      'بصراحة',
      'من تجربتي،',
      'إذا بدكن رأيي،',
      'يا جماعة',
      'خلصتها وهلّأ',
      'ما توقعتها هيك،',
      'نصيحة',
      'بلشت وأنا متردد و',
      'المعلومات كانت',
      'بالنسبة إلي،',
    ],
    lines: [
      '{product} كتير منيحة وبتستاهل.',
      '{product} نفعتني، خصوصًا بـ{topic}.',
      'إذا بدكن {category}، بلّشوا بـ{product}.',
      '{product} مرتبة والشرح سهل من أولها لآخرها.',
      '{product} حلوة والأمثلة عملية.',
      '{product} فاجأتني بجودتها بقسم {category}.',
      'المعلومات بـ{product} واضحة وبتفيد.',
      '{product} ما رح تندموا إذا جربتوها.',
      '{topic} انشرح بطريقة كتير مفهومة جوات {product}.',
      '{product} من أحسن الخيارات بـ{category}.',
      'استفدت من {product} خلال كم يوم بس.',
      '{product} ما فيها حشو والطرح خفيف.',
      '{product} عجبتني من أول درس لآخر درس.',
      '{product} ساعدتني أرتب معلوماتي عن {category}.',
      'الشرح بـ{product} هادي ومفهوم بموضوع {topic}.',
      '{product} عطتني ثقة أكبر بـ{topic}.',
    ],
    tails: [
      'بتستاهل التجربة.',
      'أنا كتير مبسوط بالنتيجة.',
      'رح رشحها للصحاب.',
      'الوتيرة مريحة ومرتبة.',
      'مناسبة حتى للمبتدئ.',
      'اختصرت علي الطريق.',
      'المحتوى قوي ومباشر.',
      'طلعت أحسن من توقعي.',
      'ما ضيعت وقتي فيها.',
      'بتعطي أساس منيح.',
      'تجربة ناجحة بصراحة.',
      'كملوها للآخر، بتفرق.',
    ],
  },
  {
    id: 'egyptian',
    places: ['القاهرة · مصر', 'الإسكندرية · مصر', 'الجيزة · مصر', 'المنصورة · مصر', 'طنطا · مصر'],
    leads: [
      'بجد',
      'والله يا جماعة',
      'من غير مبالغة،',
      'أنا خلّصتها و',
      'لو بتسألوني،',
      'بصراحة',
      'من أول ما بدأت و',
      'تجربتي كانت حلوة،',
      'أنصح بيها و',
      'ما كنتش متوقع،',
      'يا رب الناس تستفيد،',
      'قولتي هجرب و',
    ],
    lines: [
      '{product} تحفة وتستاهل.',
      'استفدت جدًا من {product}، و{topic} اتشرح كويس.',
      'لو بتدور على {category}، {product} اختيار ممتاز.',
      '{product} أمثلتها عملية وواضحة.',
      '{product} سهلة ومن غير تعقيد.',
      '{product} من أحسن حاجة اشتريتها في {category}.',
      'الواحد بيمشي مع {product} براحته والشرح خفيف.',
      '{topic} جوا {product} مفهوم حتى لو لسه بتبدأ.',
      '{product} هتفيدك فعلًا في {category}.',
      '{product} وفرت عليا وقت والمحتوى منظم.',
      '{product} طلعت أحسن من المتوقع.',
      'عايز أساس كويس في {category}؟ ابدأ بـ{product}.',
      'طريقة الشرح في {product} مريحة ومش مستعجلة.',
      'استفدت من {topic} في {product} واستخدمته على طول.',
      '{product} قيمتها عالية وتستاهل.',
      '{product} رتبت لي المعلومة في دماغي.',
    ],
    tails: [
      'رشحتها لصحابي خلاص.',
      'هتكمّلها للآخر.',
      'تستاهل الفلوس وزيادة.',
      'مفيش حشو، كله مفيد.',
      'الأمثلة من الواقع وده اللي مميّزها.',
      'حسيت إني فاهم من بدري.',
      'تجربة حلوة أوي.',
      'مناسبة للمذاكرة والشغل.',
      'مبسوط إني اخترتها.',
      'الشرح واضح وصريح.',
      'هتفيد أي حد بادئ.',
      'من غير تردد، كملوها.',
    ],
  },
  {
    id: 'iraqi',
    places: ['بغداد · العراق', 'البصرة · العراق', 'أربيل · العراق', 'النجف · العراق', 'الموصل · العراق'],
    leads: [
      'والله',
      'صدق',
      'صراحة',
      'من تجربتي،',
      'إذا تريدون رأيي،',
      'يا جماعة',
      'كملتها و',
      'ما متوقع،',
      'أنصح و',
      'بديت وأنا متردد و',
      'باختصار،',
      'هواية عجبتني،',
    ],
    lines: [
      '{product} هواية زينة وتستاهل.',
      'استفدت من {product}، و{topic} واضح.',
      'إذا تريد {category}، ابدي بـ{product}.',
      '{product} شرحها يمشي بسهولة ومرتبة.',
      '{product} أمثلتها عملية ومفهومة.',
      '{product} فاجأتني بجودتها بقسم {category}.',
      '{product} كلش مفيدة وأنصح بيها.',
      '{topic} انشرح بطريقة مفهومة داخل {product}.',
      '{product} تختصر الوقت بـ{category}.',
      '{product} طلعت أحسن قرار.',
      '{product} بيها فائدة حقيقية والمحتوى نظيف.',
      '{product} تناسب المبتدئ والشرح هادي.',
      'بعد {product} صرت أفهم {category} أحسن.',
      '{product} تستاهل التقييم، زينة ومرتبة.',
      '{product} ما بيها حشو والأمثلة تقنع.',
      '{product} فادتني بالشغل بموضوع {topic}.',
    ],
    tails: [
      'ما ندمت أبد.',
      'أنصح الجميع يجربها.',
      'جودة أعلى من المتوقع.',
      'الوتيرة مريحة.',
      'مناسبة للي يبدي من الصفر.',
      'خلّصتها وأنا راضي.',
      'بتفيدكم هواية.',
      'تستاهل السعر.',
      'مرتبة من أولها لآخرها.',
      'ما ضيّعت وقتي.',
      'تجربة زينة صراحة.',
      'كملوها، بتفرق وياكم.',
    ],
  },
  {
    id: 'moroccan',
    places: ['الدار البيضاء · المغرب', 'الرباط · المغرب', 'فاس · المغرب', 'مراكش · المغرب', 'طنجة · المغرب'],
    leads: [
      'والله',
      'صراحة',
      'من تجربتي،',
      'إلا بغيتي رأيي،',
      'يا جماعة',
      'ساليتها و',
      'ما كنتش متوقع،',
      'ننصح و',
      'بديت وأنا متردد و',
      'باختصار،',
      'عجباتني بزاف،',
      'بالنسبة ليا،',
    ],
    lines: [
      '{product} زوينة بزاف وتستاهل.',
      '{product} نفعتنى، و{topic} وضح ليا.',
      'إلا بغيتي {category}، بدا بـ{product}.',
      '{product} منظمة والشرح واضح.',
      '{product} الأمثلة ديالها عملية.',
      '{product} عجباتني بمستواها فقسم {category}.',
      '{product} غادي تفيدك وننصح بها.',
      '{topic} تشرح بطريقة ساهلة فـ{product}.',
      '{product} وفّرات ليا الوقت فـ{category}.',
      '{product} طلعات مزيانة أكثر مما توقعت.',
      '{product} ما فيهاش الحشو والمحتوى مفيد.',
      '{product} صالحة حتى للمبتدئ.',
      'من بعد {product} ولات {category} واضحة.',
      '{product} قيمتها عالية وتستاهل الثمن.',
      'الأمثلة من الواقع وهادشي اللي عجبني فـ{product}.',
      '{product} عطاتني ثقة فـ{topic}.',
    ],
    tails: [
      'ما ندمتش عليها.',
      'غنرشحها للصحاب.',
      'تجربة مزيانة بزاف.',
      'الوتيرة مريحة ومنظمة.',
      'كويسة للي بادئ.',
      'سالية وأنا فرحان.',
      'غادي تنفعك فالخدمة.',
      'تستاهل كل درهم.',
      'واضحة من الأول للآخر.',
      'ما ضيّعتش الوقت.',
      'اختيار مزيان صراحة.',
      'كمّلها، غادي تفرق معاك.',
    ],
  },
  {
    id: 'tunisian',
    places: ['تونس', 'صفاقس · تونس', 'سوسة · تونس', 'القيروان · تونس', 'نابل · تونس'],
    leads: [
      'والله',
      'صراحة',
      'من تجربتي،',
      'كان تحب رأيي،',
      'يا جماعة',
      'كملتها و',
      'ما كنتش متوقع،',
      'ننصح و',
      'بديت وأنا متردد و',
      'باختصار،',
      'عجبتني ياسر،',
      'بالنسبة ليا،',
    ],
    lines: [
      '{product} بنينة برشا وتستاهل.',
      '{product} نفعتني، و{topic} وضحلي.',
      'كان تحب {category}، ابدا بـ{product}.',
      '{product} منظمة والشرح واضح.',
      '{product} الأمثلة متاعها عملية.',
      '{product} عجبتني بالجودة في {category}.',
      '{product} مفيدة برشا وننصحكم بيها.',
      '{topic} تشرح بطريقة سهلة في {product}.',
      '{product} ربحتني وقت في {category}.',
      '{product} طلعت باهية أكثر مما توقعت.',
      '{product} ما فماش حشو والمحتوى مفيد.',
      '{product} تنجم تعاون حتى المبتدئ.',
      'بعد {product} ولات {category} واضحة ليا.',
      '{product} قيمتها عالية وتستاهل.',
      'الأمثلة من الواقع وهذا اللي عجبني في {product}.',
      '{product} عطاتني ثقة في {topic}.',
    ],
    tails: [
      'ما ندمتش عليها.',
      'بش نرشحها للصحاب.',
      'تجربة باهية برشا.',
      'الوتيرة مريحة ومنظمة.',
      'باهية للي يبدا تو.',
      'كملتها وأنا مبسوط.',
      'تنفع في الخدمة.',
      'تستاهل الثمن.',
      'واضحة من الأول للخر.',
      'ما ضيّعتش وقت.',
      'اختيار باهي صراحة.',
      'كمّلها، بش تفرق معاك.',
    ],
  },
]

function hash32(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  let x = h >>> 0
  x = Math.imul(x ^ (x >>> 16), 0x7feb352d)
  x = Math.imul(x ^ (x >>> 15), 0x846ca68b)
  return (x ^ (x >>> 16)) >>> 0
}

function plainTopic(description: string, category: string, productName: string) {
  const plain = description
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const words = plain.split(' ').filter(Boolean).slice(0, 6).join(' ')
  if (words.length >= 8) return words
  return category || productName
}

function fill(template: string, productName: string, category: string, topic: string) {
  return template
    .split('{product}').join(productName)
    .split('{category}').join(category || productName)
    .split('{topic}').join(topic)
}

const NAME_SPACE =
  FIRST_NAMES.length *
  FAMILY_INITIALS.length *
  (FAMILY_INITIALS.length - 1) *
  (FAMILY_INITIALS.length - 2)

function nameAt(n: number) {
  const first = FIRST_NAMES[n % FIRST_NAMES.length]
  let x = Math.floor(n / FIRST_NAMES.length)
  const a = x % FAMILY_INITIALS.length
  x = Math.floor(x / FAMILY_INITIALS.length)
  const b = x % (FAMILY_INITIALS.length - 1)
  x = Math.floor(x / (FAMILY_INITIALS.length - 1))
  const c = x % (FAMILY_INITIALS.length - 2)
  const initialA = FAMILY_INITIALS[a]
  const restB = FAMILY_INITIALS.filter((letter) => letter !== initialA)
  const initialB = restB[b]
  const restC = FAMILY_INITIALS.filter((letter) => letter !== initialA && letter !== initialB)
  return `${first} ${initialA}.${initialB}.${restC[c]}`
}

function textSpace() {
  const lines = DIALECTS[0].lines.length
  const tails = DIALECTS[0].tails.length
  return DIALECTS.length * lines * tails * NOTES.length * BRIDGES.length * CLOSERS.length
}

function reviewAt(n: number, productName: string, category: string, topic: string) {
  const lineCount = DIALECTS[0].lines.length
  const tailCount = DIALECTS[0].tails.length
  let x = n
  const dialect = DIALECTS[x % DIALECTS.length]
  x = Math.floor(x / DIALECTS.length)
  const line = dialect.lines[x % lineCount]
  x = Math.floor(x / lineCount)
  const tail = dialect.tails[x % tailCount]
  x = Math.floor(x / tailCount)
  const note = NOTES[x % NOTES.length]
  x = Math.floor(x / NOTES.length)
  const bridge = BRIDGES[x % BRIDGES.length]
  x = Math.floor(x / BRIDGES.length)
  const closer = CLOSERS[x % CLOSERS.length]
  const content = `${fill(line, productName, category, topic)} ${note.replace(/\.$/, '')}، ${bridge} ${closer} ${tail}`
  return { dialect, content }
}

function starPlan(target: number, count: number, seed: number) {
  const safe = Math.min(5, Math.max(0, target))
  let total = Math.round(safe * count)
  total = Math.min(count * 5, Math.max(count, total))
  const stars = new Array<number>(count).fill(1)
  let remaining = total - count
  if (count === 0 || remaining <= 0) return stars
  let cursor = seed % count
  let guard = 0
  while (remaining > 0 && guard < count * 6) {
    if (stars[cursor] < 5) {
      stars[cursor] += 1
      remaining -= 1
    }
    cursor = (cursor + 1) % count
    guard += 1
  }
  return stars
}

export function syntheticReviews(input: {
  productId: string
  name: string
  description?: string | null
  category?: string | null
  rating: number
  count: number
}): SyntheticReview[] {
  const count = Math.max(0, Math.round(input.count))
  if (!input.productId || count === 0) return []

  const productName = input.name?.trim() || 'المنتج'
  const category = input.category?.trim() || productName
  const topic = plainTopic(input.description || '', category, productName)
  const seed = hash32(input.productId)
  const stars = starPlan(input.rating, count, seed)
  const names = NAME_SPACE
  const texts = textSpace()
  const nameBase = hash32(`${input.productId}|name`) % names
  const textBase = hash32(`${input.productId}|text`) % texts
  const textStride = 482801
  const reviews: SyntheticReview[] = []

  for (let index = 0; index < count; index++) {
    const name = nameAt((nameBase + index) % names)
    const picked = reviewAt((textBase + index * textStride) % texts, productName, category, topic)
    const dateSeed = hash32(`${input.productId}|date|${index}`)
    reviews.push({
      id: `synthetic-${input.productId}-${index}`,
      rating: stars[index],
      content: picked.content,
      relativeDate: RELATIVE_DATES[dateSeed % RELATIVE_DATES.length],
      place: picked.dialect.places[hash32(`${input.productId}|place|${index}`) % picked.dialect.places.length],
      user: { name },
    })
  }

  return reviews
}
