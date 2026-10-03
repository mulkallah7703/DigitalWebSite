export type PortfolioLang = 'en' | 'ar'

export interface PortfolioProject {
  name: string
  desc: string
  tags: string[]
  demoUrl?: string
}

export interface PortfolioJob {
  dates: string
  title: string
  company: string
  bullets: string[]
}

export interface PortfolioContent {
  name: string
  photoAlt: string
  roleBadge: string
  heroLead: string
  contactCta: string
  downloadCv: string
  cvLabel: string
  myProducts: string
  myProductsHint: string
  nav: { href: string; label: string }[]
  stats: { value: string; label: string }[]
  aboutEyebrow: string
  aboutTitle: string
  aboutBody: string
  skillsEyebrow: string
  skillsTitle: string
  skillGroups: { title: string; items: string[] }[]
  experienceEyebrow: string
  experienceTitle: string
  experience: PortfolioJob[]
  innovationEyebrow: string
  innovationTitle: string
  innovationBadge: string
  innovationName: string
  innovationBody: string
  projectsEyebrow: string
  projectsTitle: string
  liveDemo: string
  projects: PortfolioProject[]
  educationEyebrow: string
  educationTitle: string
  education: { dates: string; degree: string; school: string }[]
  certsEyebrow: string
  certsTitle: string
  certifications: string[]
  researchEyebrow: string
  researchTitle: string
  researchName: string
  researchBody: string
  languagesEyebrow: string
  languagesTitle: string
  languages: { name: string; level: string }[]
  contactTitle: string
  contactBody: string
  emailCta: string
  email: string
  phone: string
  socials: { label: string; url: string; followers: string }[]
  heroSocialLabels: string[]
  copyright: string
}

const sharedProjects = {
  pulse: {
    demoUrl:
      'https://expo.dev/accounts/noaf.ai/projects/smartrescuer/builds/7ae80b63-de6c-4f0f-80da-4b624a4098ce',
    tags: ['AI', 'Computer Vision', 'Healthcare'],
  },
  aviation: {
    demoUrl: 'https://aviationsminute.com/',
    tags: ['React', 'Node.js', 'MongoDB', 'LMS'],
  },
  llms: {
    demoUrl: 'https://medai2030.com/login',
    tags: ['AI', 'LLM', 'LMS'],
  },
  masarak: {
    demoUrl: 'https://masarak-platform.vercel.app/',
    tags: ['AI', 'LegalTech'],
  },
} as const

const socialUrls = {
  youtube: 'https://youtube.com/@mulkallah-s8w?si=DPoWg62AZ2kuzlab',
  tiktok: 'https://www.tiktok.com/@mulkallah6?_r=1&_t=ZS-97wudfti9we',
  snapchat: 'https://www.snapchat.com/add/mulk_allah?share_id=ddzK1coAawU&locale=en-GB',
  instagram: 'https://www.instagram.com/mulkallah77?igsh=Y2tkbnE3b2x5ajJ5',
  linkedin:
    'https://www.linkedin.com/in/mulk-allah-al-sadi-677103339?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  facebook: 'https://www.facebook.com/share/1Ggft9s5rP/',
  github: 'https://github.com/mulkallah7703',
} as const

const ar: PortfolioContent = {
  name: 'ملك الله السعدي',
  photoAlt: 'ملك الله السعدي',
  roleBadge: 'مبتكر حائز على جائزة ابتكار',
  heroLead:
    'طالب هندسة برمجيات، ومطوّر full-stack، ومبتكر حائز على جائزة — شغوف ببناء تقنيات ذكاء اصطناعي تخدم الرعاية الصحية والتعليم وتُحدث أثرًا حقيقيًا في حياة الناس.',
  contactCta: 'تواصل معي',
  downloadCv: 'تحميل السيرة الذاتية',
  cvLabel: 'السيرة الذاتية',
  myProducts: 'منتجاتي',
  myProductsHint: 'المتجر الرقمي',
  nav: [
    { href: '#about', label: 'نبذة عني' },
    { href: '#skills', label: 'المهارات' },
    { href: '#experience', label: 'الخبرات' },
    { href: '#innovation', label: 'الابتكار' },
    { href: '#projects', label: 'المشاريع' },
    { href: '#education', label: 'التعليم' },
    { href: '#contact', label: 'تواصل' },
  ],
  stats: [
    { value: '15M+', label: 'مشاهدة على السوشيال ميديا — اغسطس' },
    { value: '3M+', label: 'تفاعل — اغسطس' },
  ],
  aboutEyebrow: 'نبذة عني',
  aboutTitle: 'من أنا',
  aboutBody:
    'طالب هندسة برمجيات ومطوّر full-stack ومهتم بالابتكار، لديّ شغف حقيقي بابتكار تقنيات ذات أثر ملموس. مبتكر حائز على جائزة ابتكار، أسعى لتحويل الأفكار الطموحة إلى حلول عملية تُحسّن حياة الناس. لديّ خبرة في بناء تطبيقات مدعومة بالذكاء الاصطناعي ومنصات ويب قابلة للتوسّع باستخدام React وNode.js وJava وSQL ورؤية الحاسوب (Computer Vision)، إلى جانب قيادة مشاريع تقنية وبناء أنظمة ذكاء اصطناعي لمنصات التعلّم الإلكتروني وتقنيات الرعاية الصحية.',
  skillsEyebrow: 'المهارات',
  skillsTitle: 'المهارات التقنية',
  skillGroups: [
    { title: 'لغات البرمجة', items: ['JavaScript', 'Java', 'SQL', 'HTML5', 'CSS3'] },
    { title: 'تطوير الواجهات الأمامية', items: ['React', 'Next.js', 'Bootstrap', 'jQuery'] },
    { title: 'تطوير الخلفية (Backend)', items: ['Node.js', 'Express.js', 'REST APIs'] },
    { title: 'قواعد البيانات', items: ['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite'] },
    { title: 'الأدوات والمنصات', items: ['Git', 'GitHub', 'Linux', 'Agile', 'AWS Basics'] },
    { title: 'مهارات أخرى', items: ['حل المشكلات', 'العمل الجماعي', 'التكيّف', 'إدارة المشاريع'] },
  ],
  experienceEyebrow: 'المسيرة',
  experienceTitle: 'الخبرات العملية',
  experience: [
    {
      dates: '2025 – حتى الآن',
      title: 'مستشار تقني وقائد تطوير برمجيات',
      company: 'AviationsMinute',
      bullets: [
        'قيادة تطوير التقنيات وحلول المنصات المدعومة بالذكاء الاصطناعي.',
        'المساهمة في بنية منصات LMS وويب قابلة للتوسّع.',
        'التعاون في تحسينات UI/UX وتخطيط البرمجيات.',
        'دعم دمج الذكاء الاصطناعي وسير عمل تطوير الويب الحديث.',
      ],
    },
    {
      dates: '2025 – حتى الآن',
      title: 'متدرب تطوير Full-Stack',
      company: 'CodeAlpha',
      bullets: [
        'تطوير تطبيقات ويب متجاوبة full-stack باستخدام React وNode.js.',
        'بناء REST APIs ودمج قواعد بيانات MongoDB.',
        'تحسين أداء الموقع وتجربة المستخدم.',
        'التعاون مع فرق عن بُعد باستخدام Git وAgile.',
      ],
    },
    {
      dates: '2025 – حتى الآن',
      title: 'متدرب تطوير ويب',
      company: 'Arch Technologies',
      bullets: [
        'المساعدة في تطوير تطبيقات ويب حديثة ومكونات واجهة.',
        'العمل مع تقنيات React وJavaScript.',
        'دعم تنفيذ التصميم المتجاوب وإصلاح الأخطاء.',
        'التعاون مع المطورين في مهام تطوير البرمجيات.',
      ],
    },
    {
      dates: '2024 – 2025',
      title: 'مطوّر واجهات أمامية',
      company: 'مشاريع عملاء مستقلة',
      bullets: [
        'تطوير واجهات أمامية متجاوبة باستخدام React وBootstrap.',
        'بناء تصاميم واجهة حديثة تركّز على تجربة المستخدم والأداء.',
        'تخصيص المواقع حسب متطلبات العملاء.',
        'تحسين التجاوب عبر أجهزة متعددة.',
      ],
    },
  ],
  innovationEyebrow: 'الابتكار',
  innovationTitle: 'الابتكار وبراءة الاختراع',
  innovationBadge: 'براءة اختراع · ابتكار حائز على جائزة',
  innovationName:
    'نظام صحي ذكي للتنبؤ المبكر بمخاطر القلب والسكتة الدماغية والاستجابة للطوارئ',
  innovationBody:
    'نظام مدعوم بالذكاء الاصطناعي مصمم للتنبؤ بالحالات الطبية الحرجة في مرحلة مبكرة، من خلال المراقبة الذكية والتحليلات التنبؤية وتقنيات الاستجابة الفورية للطوارئ — يجمع بين رؤية الحاسوب والأجهزة القابلة للارتداء لإنقاذ الوقت الأثمن في الحالات الحرجة.',
  projectsEyebrow: 'الأعمال',
  projectsTitle: 'المشاريع',
  liveDemo: 'لايف ديمو',
  projects: [
    {
      name: 'Pulse Ring',
      demoUrl: sharedProjects.pulse.demoUrl,
      desc: 'نظام رعاية صحية واستجابة طوارئ مدعوم بالذكاء الاصطناعي، للكشف المبكر عن الحالات الحرجة باستخدام رؤية الحاسوب والمراقبة الذكية.',
      tags: [...sharedProjects.pulse.tags],
    },
    {
      name: 'Aviation Minutes Platform',
      demoUrl: sharedProjects.aviation.demoUrl,
      desc: 'الموقع الرسمي لشركة دقيقة طيران الاعلامية',
      tags: [...sharedProjects.aviation.tags],
    },
    {
      name: 'LLMs Platform',
      demoUrl: sharedProjects.llms.demoUrl,
      desc: 'منصة ذكاء اصطناعي مدعومة بنماذج اللغة الكبيرة (LLMs) لتقديم تجارب تعلّم وتفاعل ذكية.',
      tags: [...sharedProjects.llms.tags],
    },
    {
      name: 'Masarak Platform',
      demoUrl: sharedProjects.masarak.demoUrl,
      desc: 'منصة إرشاد قانوني مدعومة بالذكاء الاصطناعي لتبسيط الإجراءات القضائية وتحسين الوصول للمعلومات القانونية.',
      tags: [...sharedProjects.masarak.tags],
    },
  ],
  educationEyebrow: 'الدراسة',
  educationTitle: 'التعليم',
  education: [
    { dates: '2023 – 2027', degree: 'بكالوريوس هندسة البرمجيات', school: 'جامعة حفر الباطن، السعودية' },
    { dates: '2020 – 2021', degree: 'دبلوم أساسيات التمريض', school: '' },
    { dates: '2020', degree: 'دبلوم سكرتارية (حاسب آلي)', school: '' },
    { dates: '2018 – 2021', degree: 'دبلوم اللغة الإنجليزية', school: 'المعهد البريطاني الأكاديمي' },
  ],
  certsEyebrow: 'التطوّر المستمر',
  certsTitle: 'الشهادات والدورات',
  certifications: [
    'شهادة Google لإدارة المشاريع الاحترافية',
    'شهادة Microsoft لإدارة المشاريع الاحترافية',
    'تطوير الويب Full-Stack',
    'تطوير React.js',
    'أساسيات DevOps',
    'البرمجة بلغة Java',
    'أساسيات تصميم UI/UX',
    'مقدمة في تطوير البرمجيات',
    'شهادة TOEFL في إتقان اللغة الإنجليزية',
  ],
  researchEyebrow: 'النشر العلمي',
  researchTitle: 'الأبحاث',
  researchName: 'Pulse Ring',
  researchBody:
    'نظام لابس مدعوم بالذكاء الاصطناعي للكشف المبكر والاستجابة للطوارئ، باستخدام المراقبة الذكية وتقنيات رؤية الحاسوب.',
  languagesEyebrow: 'التواصل',
  languagesTitle: 'اللغات',
  languages: [
    { name: 'العربية', level: 'اللغة الأم' },
    { name: 'الإنجليزية', level: 'متقدّم — معتمد TOEFL' },
    { name: 'الألمانية', level: 'مبتدئ' },
  ],
  contactTitle: 'لنبنِ شيئًا مؤثرًا معًا',
  contactBody:
    'منفتح على فرص العمل والتعاون والشراكات في مجالات الذكاء الاصطناعي وتطوير البرمجيات والرعاية الصحية.',
  emailCta: 'راسلني عبر البريد',
  email: 'malakallahalsadi6@gmail.com',
  phone: '0549255730',
  socials: [
    { label: 'YouTube', url: socialUrls.youtube, followers: '1.49K متابع' },
    { label: 'TikTok', url: socialUrls.tiktok, followers: '1.56K متابع' },
    { label: 'Snapchat', url: socialUrls.snapchat, followers: '98 متابع' },
    { label: 'Instagram', url: socialUrls.instagram, followers: '4.68K متابع' },
    { label: 'LinkedIn', url: socialUrls.linkedin, followers: '4.35K متابع' },
    { label: 'Facebook', url: socialUrls.facebook, followers: '29.58K متابع' },
    { label: 'GitHub', url: socialUrls.github, followers: '1 متابع' },
  ],
  heroSocialLabels: ['Facebook', 'LinkedIn', 'Instagram'],
  copyright: '© 2026 Malak Allah Alsadi',
}

const en: PortfolioContent = {
  name: 'Malak Allah Alsadi',
  photoAlt: 'Malak Allah Alsadi',
  roleBadge: 'Award-winning innovator',
  heroLead:
    'Software engineering student, full-stack developer, and award-winning innovator — passionate about building AI technologies that serve healthcare and education and make a real difference in people’s lives.',
  contactCta: 'Contact me',
  downloadCv: 'Download CV',
  cvLabel: 'CV',
  myProducts: 'My Products',
  myProductsHint: 'Digital store',
  nav: [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#innovation', label: 'Innovation' },
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ],
  stats: [
    { value: '15M+', label: 'Social media views — August' },
    { value: '3M+', label: 'Engagement — August' },
  ],
  aboutEyebrow: 'About me',
  aboutTitle: 'Who I am',
  aboutBody:
    'Software engineering student, full-stack developer, and someone who cares about innovation, with a real passion for creating technologies that have a tangible impact. An award-winning innovator, I work to turn ambitious ideas into practical solutions that improve people’s lives. I have experience building AI-powered applications and scalable web platforms with React, Node.js, Java, SQL, and computer vision, along with leading technical projects and building AI systems for e-learning platforms and healthcare technologies.',
  skillsEyebrow: 'Skills',
  skillsTitle: 'Technical skills',
  skillGroups: [
    { title: 'Programming languages', items: ['JavaScript', 'Java', 'SQL', 'HTML5', 'CSS3'] },
    { title: 'Frontend development', items: ['React', 'Next.js', 'Bootstrap', 'jQuery'] },
    { title: 'Backend development', items: ['Node.js', 'Express.js', 'REST APIs'] },
    { title: 'Databases', items: ['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite'] },
    { title: 'Tools and platforms', items: ['Git', 'GitHub', 'Linux', 'Agile', 'AWS Basics'] },
    { title: 'Other skills', items: ['Problem solving', 'Teamwork', 'Adaptability', 'Project management'] },
  ],
  experienceEyebrow: 'Career',
  experienceTitle: 'Experience',
  experience: [
    {
      dates: '2025 – Present',
      title: 'Technical consultant and software development lead',
      company: 'AviationsMinute',
      bullets: [
        'Leading technology development and AI-powered platform solutions.',
        'Contributing to the architecture of scalable LMS and web platforms.',
        'Collaborating on UI/UX improvements and software planning.',
        'Supporting AI integration and modern web development workflows.',
      ],
    },
    {
      dates: '2025 – Present',
      title: 'Full-stack development intern',
      company: 'CodeAlpha',
      bullets: [
        'Developing responsive full-stack web applications with React and Node.js.',
        'Building REST APIs and integrating MongoDB databases.',
        'Improving site performance and user experience.',
        'Collaborating with remote teams using Git and Agile.',
      ],
    },
    {
      dates: '2025 – Present',
      title: 'Web development intern',
      company: 'Arch Technologies',
      bullets: [
        'Helping develop modern web applications and interface components.',
        'Working with React and JavaScript.',
        'Supporting responsive design implementation and bug fixes.',
        'Collaborating with developers on software development tasks.',
      ],
    },
    {
      dates: '2024 – 2025',
      title: 'Frontend developer',
      company: 'Independent client projects',
      bullets: [
        'Developing responsive frontends with React and Bootstrap.',
        'Building modern interfaces focused on user experience and performance.',
        'Customizing sites to client requirements.',
        'Improving responsiveness across devices.',
      ],
    },
  ],
  innovationEyebrow: 'Innovation',
  innovationTitle: 'Innovation and patent',
  innovationBadge: 'Patent · Award-winning innovation',
  innovationName:
    'A smart health system for early prediction of heart and stroke risk and emergency response',
  innovationBody:
    'An AI-powered system designed to predict critical medical conditions at an early stage, through smart monitoring, predictive analytics, and immediate emergency-response technologies — combining computer vision and wearable devices to save the most valuable time in critical cases.',
  projectsEyebrow: 'Work',
  projectsTitle: 'Projects',
  liveDemo: 'Live demo',
  projects: [
    {
      name: 'Pulse Ring',
      demoUrl: sharedProjects.pulse.demoUrl,
      desc: 'An AI-powered healthcare and emergency-response system for early detection of critical conditions using computer vision and smart monitoring.',
      tags: [...sharedProjects.pulse.tags],
    },
    {
      name: 'Aviation Minutes Platform',
      demoUrl: sharedProjects.aviation.demoUrl,
      desc: 'The official website of Aviation Minute media company',
      tags: [...sharedProjects.aviation.tags],
    },
    {
      name: 'LLMs Platform',
      demoUrl: sharedProjects.llms.demoUrl,
      desc: 'An AI platform powered by large language models (LLMs) for smart learning and interaction experiences.',
      tags: [...sharedProjects.llms.tags],
    },
    {
      name: 'Masarak Platform',
      demoUrl: sharedProjects.masarak.demoUrl,
      desc: 'An AI-powered legal guidance platform that simplifies judicial procedures and improves access to legal information.',
      tags: [...sharedProjects.masarak.tags],
    },
  ],
  educationEyebrow: 'Study',
  educationTitle: 'Education',
  education: [
    {
      dates: '2023 – 2027',
      degree: 'Bachelor of Software Engineering',
      school: 'University of Hafr Al Batin, Saudi Arabia',
    },
    { dates: '2020 – 2021', degree: 'Diploma in nursing fundamentals', school: '' },
    { dates: '2020', degree: 'Secretarial diploma (computer)', school: '' },
    { dates: '2018 – 2021', degree: 'English language diploma', school: 'British Academic Institute' },
  ],
  certsEyebrow: 'Continuous development',
  certsTitle: 'Certificates and courses',
  certifications: [
    'Google Professional Project Management certificate',
    'Microsoft Professional Project Management certificate',
    'Full-stack web development',
    'React.js development',
    'DevOps fundamentals',
    'Java programming',
    'UI/UX design fundamentals',
    'Introduction to software development',
    'TOEFL English proficiency certificate',
  ],
  researchEyebrow: 'Publications',
  researchTitle: 'Research',
  researchName: 'Pulse Ring',
  researchBody:
    'An AI-powered wearable system for early detection and emergency response, using smart monitoring and computer vision.',
  languagesEyebrow: 'Communication',
  languagesTitle: 'Languages',
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Advanced — TOEFL certified' },
    { name: 'German', level: 'Beginner' },
  ],
  contactTitle: 'Let’s build something meaningful together',
  contactBody:
    'Open to jobs, collaboration, and partnerships in artificial intelligence, software development, and healthcare.',
  emailCta: 'Email me',
  email: 'malakallahalsadi6@gmail.com',
  phone: '0549255730',
  socials: [
    { label: 'YouTube', url: socialUrls.youtube, followers: '1.49K followers' },
    { label: 'TikTok', url: socialUrls.tiktok, followers: '1.56K followers' },
    { label: 'Snapchat', url: socialUrls.snapchat, followers: '98 followers' },
    { label: 'Instagram', url: socialUrls.instagram, followers: '4.68K followers' },
    { label: 'LinkedIn', url: socialUrls.linkedin, followers: '4.35K followers' },
    { label: 'Facebook', url: socialUrls.facebook, followers: '29.58K followers' },
    { label: 'GitHub', url: socialUrls.github, followers: '1 follower' },
  ],
  heroSocialLabels: ['Facebook', 'LinkedIn', 'Instagram'],
  copyright: '© 2026 Malak Allah Alsadi',
}

export const portfolioContent: Record<PortfolioLang, PortfolioContent> = { ar, en }

export const resumeUrl = '/portfolio/Resum13.7.pdf'
export const portraitUrl = '/portfolio/malak-photo.png'

export function getPortfolio(language: string): PortfolioContent {
  return language === 'en' ? en : ar
}
