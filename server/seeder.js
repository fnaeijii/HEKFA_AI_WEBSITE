const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load env vars
dotenv.config();

// Load models
const Project = require('./src/models/ProjectModel.js');
const TeamMember = require('./src/models/TeamMemberModel.js');
const CaseStudy = require('./src/models/CaseStudyModel.js');
const Post = require('./src/models/PostModel.js');       // <<-- اضافه شد
const User = require('./src/models/UserModel.js');       // <<-- اضافه شد
const Event = require('./src/models/EventModel.js'); // <<-- 1. مدل Event را وارد کنید
const SiteConfig = require('./src/models/SiteConfigModel.js'); // <<-- 1. مدل جدید را وارد کنید
const Intelligence = require('./src/models/IntelligenceModel.js'); // <<-- Intelligence model
const EnergyBlog = require('./src/models/EnergyBlogModel.js');
const CreativityEntry = require('./src/models/CreativityModel.js');
// const Creativity = require('./src/models/CreativityModel.js');
// const Creativity = require('./src/models/CreativityModel.js');

// --- داده‌های اولیه ---


const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: '123456', // <--- رمز عبور جدید و مشخص شما
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456',
    isAdmin: false,
  }
];

const siteConfig = {
  companyStats: [
    { value: "500+", label: "AI Projects Completed", valueFa: "۵۰۰+", labelFa: "پروژه‌های هوش مصنوعی تکمیل‌شده" },
    { value: "150+", label: "Expert Team Members", valueFa: "۱۵۰+", labelFa: "اعضای تیم متخصص" },
    { value: "99%", label: "Client Satisfaction", valueFa: "۹۹٪", labelFa: "رضایت مشتریان" },
    { value: "50+", label: "Research Papers", valueFa: "۵۰+", labelFa: "مقالات پژوهشی" },
  ],

  researchStats: [
    { label: "Research Papers", value: "50+", icon: "BookOpen", labelFa: "مقالات پژوهشی", valueFa: "۵۰+" },
    { label: "Citations", value: "2,500+", icon: "GraduationCap", labelFa: "ارجاعات علمی", valueFa: "۲٬۵۰۰+" },
    { label: "Conferences", value: "25+", icon: "Mic", labelFa: "کنفرانس‌ها", valueFa: "۲۵+" },
    { label: "Collaborations", value: "15+", icon: "Handshake", labelFa: "همکاری‌ها", valueFa: "۱۵+" },
  ],
  contactInfo: [
    {
      title: "Email Us",
      description: "Get in touch via email",
      value: "contact@hekfa.ai",
      icon: "Mail",
      titleFa: "ایمیل",
      descriptionFa: "از طریق ایمیل با ما در ارتباط باشید",
      valueFa: "contact@hekfa.ai",
    },
    {
      title: "Call Us",
      description: "Speak with our team",
      value: "+1 (555) 123-4567",
      icon: "Phone",
      titleFa: "تماس تلفنی",
      descriptionFa: "با تیم ما مستقیماً صحبت کنید",
      valueFa: "+1 (555) 123-4567",
    },
    {
      title: "Visit Us",
      description: "Our headquarters",
      value: "San Francisco, CA",
      icon: "MapPin",
      titleFa: "ملاقات حضوری",
      descriptionFa: "دفتر مرکزی هکفا",
      valueFa: "سان‌فرانسیسکو، آمریکا",
    },
    {
      title: "Business Hours",
      description: "Monday - Friday",
      value: "9:00 AM - 6:00 PM PST",
      icon: "Clock",
      titleFa: "ساعات کاری",
      descriptionFa: "دوشنبه تا جمعه",
      valueFa: "۹:۰۰ تا ۱۸:۰۰ به وقت PST",
    },
  ],
  globalOffices: [
    {
      city: "San Francisco",
      country: "United States",
      address: "123 Innovation Drive, CA 94105",
      phone: "+1 (555) 123-4567",
      type: "Headquarters",
      cityFa: "سان‌فرانسیسکو",
      countryFa: "ایالات متحده آمریکا",
      addressFa: "خیابان نوآوری ۱۲۳، کالیفرنیا ۹۴۱۰۵",
      typeFa: "دفتر مرکزی",
    },
    {
      city: "London",
      country: "United Kingdom",
      address: "45 Tech Square, London EC2A 3LT",
      phone: "+44 20 7123 4567",
      type: "European Office",
      cityFa: "لندن",
      countryFa: "بریتانیا",
      addressFa: "میدان تکنولوژی ۴۵، لندن EC2A 3LT",
      typeFa: "دفتر اروپا",
    },
    {
      city: "Singapore",
      country: "Singapore",
      address: "78 AI Hub, Singapore 018956",
      phone: "+65 6123 4567",
      type: "Asia Pacific Office",
      cityFa: "سنگاپور",
      countryFa: "سنگاپور",
      addressFa: "۷۸ مرکز هوش مصنوعی، سنگاپور ۰۱۸۹۵۶",
      typeFa: "دفتر آسیا-اقیانوسیه",
    },
  ],
};

const teamMembers = [
    {
      name: 'Dr. Arash Kamangar',
      role: 'Chief AI Scientist',
      specialty: 'Deep Learning & NLP',
      bio: 'Pioneering research in generative models and leading our core AI innovation.',
      nameFa: 'دکتر آرش کمانگر',
      roleFa: 'مدیر ارشد علمی هوش مصنوعی',
      specialtyFa: 'یادگیری عمیق و پردازش زبان طبیعی',
      bioFa: 'پیشگام پژوهش در مدل‌های مولد و رهبر نوآوری‌های اصلی هوش مصنوعی در هکفا.',
      imageUrl: '/uploads/team-arash.jpg',
      linkedinUrl: 'https://linkedin.com/in/arash-kamangar-fake',
      order: 1
    },
    {
      name: 'Sara Mohammadi',
      role: 'Lead Computer Vision Engineer',
      specialty: 'Image Recognition & Analysis',
      bio: 'Expert in real-time object detection and segmentation for industrial applications.',
      nameFa: 'سارا محمدی',
      roleFa: 'رهبر تیم بینایی کامپیوتر',
      specialtyFa: 'تشخیص و تحلیل تصویر',
      bioFa: 'متخصص تشخیص بلادرنگ اشیا و قطعه‌بندی برای کاربردهای صنعتی.',
      imageUrl: '/uploads/team-sara.jpg',
      linkedinUrl: 'https://linkedin.com/in/sara-mohammadi-fake',
      order: 2
    },
    {
      name: 'Reza Alavi',
      role: 'Senior ML Ops Engineer',
      specialty: 'Deployment & Scaling',
      bio: 'Ensuring our AI models run efficiently and reliably at scale for millions of users.',
      nameFa: 'رضا علوی',
      roleFa: 'مهندس ارشد ML Ops',
      specialtyFa: 'استقرار و مقیاس‌پذیری سامانه‌ها',
      bioFa: 'تضمین عملکرد پایدار و مقیاس‌پذیر مدل‌های هوش مصنوعی برای میلیون‌ها کاربر.',
      imageUrl: '/uploads/team-reza.jpg',
      linkedinUrl: 'https://linkedin.com/in/reza-alavi-fake',
      order: 3
    }
];

const projects = [
  {
    title: 'Face Recognition System',
    titleFa: 'سامانه تشخیص چهره',
    slug: 'face-recognition-system',
    description: 'Advanced facial recognition with 99.7% accuracy and sub-100ms inference for enterprise-grade deployments.',
    descriptionFa: 'تشخیص چهره پیشرفته با دقت ۹۹.۷٪ و زمان پاسخ زیر ۱۰۰ میلی‌ثانیه برای سازمان‌ها.',
    overview:
      'Our Face Recognition System represents a breakthrough in biometric authentication technology, combining state-of-the-art deep learning models with optimized inference pipelines to deliver unmatched accuracy and speed in real-world scenarios.\n\nBuilt on TensorFlow, PyTorch, and CUDA-accelerated pipelines, the platform processes recognition requests in under 100ms, scales across cloud and edge environments, and delivers GDPR-compliant privacy safeguards for sensitive environments.',
    overviewFa:
      'سامانه تشخیص چهره ما نسل جدیدی از احراز هویت بیومتریک است که با ترکیب مدل‌های یادگیری عمیق و پایپلاین‌های بهینه، دقت و سرعت بی‌نظیری را در شرایط واقعی ارائه می‌دهد.\n\nبر پایه TensorFlow، PyTorch و شتاب‌دهی CUDA، درخواست‌های تشخیص زیر ۱۰۰ میلی‌ثانیه پردازش شده و سامانه هم در فضای ابری و هم در لبه با رعایت استانداردهای حریم خصوصی GDPR مقیاس‌پذیر است.',
    overviewDetails: {
      description: [
        'Our Face Recognition System represents a breakthrough in biometric authentication technology, combining state-of-the-art deep learning models with optimized inference pipelines to deliver unmatched accuracy and speed in real-world scenarios.',
        'The system was designed to address the growing need for secure, contactless authentication across multiple sectors including banking, healthcare, enterprise security, and access control. By leveraging advanced CNNs and robust computer vision techniques, we achieved an industry-leading 99.7% accuracy rate across diverse demographic groups and challenging environmental conditions.',
        'Built on a foundation of TensorFlow, PyTorch, and OpenCV, the system processes facial recognition requests in under 100ms, making it suitable for high-throughput applications. The architecture supports both cloud deployment and edge computing scenarios, with specialized optimizations for CUDA-enabled hardware acceleration.'
      ],
      descriptionFa: [
        'سامانه تشخیص چهره ما یک پیشرفت بزرگ در فناوری احراز هویت بیومتریک است که با ترکیب مدل‌های یادگیری عمیق پیشرفته و پایپلاین‌های بهینه‌شده، دقت و سرعت بی‌نظیری را در شرایط واقعی ارائه می‌دهد.',
        'این سیستم برای پاسخگویی به نیاز فزاینده به احراز هویت امن و بدون تماس در بخش‌های مختلف از جمله بانکداری، مراقبت‌های بهداشتی، امنیت سازمانی و کنترل دسترسی طراحی شده است. با استفاده از شبکه‌های عصبی پیشرفته و تکنیک‌های قوی بینایی کامپیوتر، به نرخ دقت ۹۹.۷٪ در گروه‌های جمعیتی متنوع و شرایط محیطی چالش‌برانگیز دست یافتیم.',
        'بر پایه TensorFlow، PyTorch و OpenCV، سیستم درخواست‌های تشخیص چهره را در کمتر از ۱۰۰ میلی‌ثانیه پردازش می‌کند و برای برنامه‌های با حجم بالا مناسب است. معماری از استقرار ابری و محاسبات لبه پشتیبانی می‌کند و بهینه‌سازی‌های تخصصی برای شتاب‌دهی سخت‌افزاری CUDA دارد.'
      ],
      goals: [
        'Achieve >99% accuracy across diverse demographic datasets',
        'Process recognition requests in under 100ms for real-time applications',
        'Ensure GDPR and privacy compliance with end-to-end encryption',
        'Support both cloud and edge deployment scenarios',
        'Handle challenging conditions: varying lighting, partial occlusions, angles',
        'Scale to millions of faces in the database with sub-second search'
      ],
      goalsFa: [
        'دستیابی به دقت بالای ۹۹٪ در مجموعه داده‌های جمعیتی متنوع',
        'پردازش درخواست‌های تشخیص در کمتر از ۱۰۰ میلی‌ثانیه برای برنامه‌های بلادرنگ',
        'اطمینان از رعایت GDPR و حریم خصوصی با رمزگذاری سرتاسر',
        'پشتیبانی از هر دو سناریوی استقرار ابری و لبه',
        'مدیریت شرایط چالش‌برانگیز: نور متغیر، انسداد جزئی، زوایا',
        'مقیاس‌پذیری تا میلیون‌ها چهره در پایگاه داده با جستجوی زیر ثانیه'
      ],
      challenge:
        'Traditional facial recognition systems struggled with accuracy, suffered from demographic biases, and could not meet sub-100ms latency requirements for enterprise applications while maintaining privacy compliance.',
      challengeFa:
        'سیستم‌های سنتی تشخیص چهره با دقت مشکل داشتند، از تعصبات جمعیتی رنج می‌بردند و نمی‌توانستند نیازهای تأخیر زیر ۱۰۰ میلی‌ثانیه برای برنامه‌های سازمانی را در حالی که رعایت حریم خصوصی را حفظ می‌کنند، برآورده کنند.'
    },
    category: 'Computer Vision',
    categoryIcon: 'Eye',
    status: 'Production',
    isFeatured: true,
    mainImageUrl: '/uploads/project-parking.jpg',
    slideshowImages: [
      { url: '/uploads/project-parking.jpg', altText: 'Face recognition dashboard', order: 1 },
      { url: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80', altText: 'Edge deployment racks', order: 2 },
      { url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80', altText: 'Security operations center', order: 3 }
    ],
    video: {
      type: 'placeholder'
    },
    heroButtons: [
      { label: 'View Live Demo', labelFa: 'مشاهده دمو زنده', href: '#demo', variant: 'default', icon: 'Zap' },
      { label: 'GitHub Repository', labelFa: 'مخزن GitHub', href: 'https://github.com/hekfa/face-recognition', variant: 'outline', icon: 'FileText' },
      { label: 'Contact Us', labelFa: 'تماس با ما', href: '/contact', variant: 'ghost', icon: 'MessageSquare' }
    ],
    projectInfo: [
      { label: 'Client', labelFa: 'مشتری', value: 'Enterprise', valueFa: 'سازمانی', icon: 'Users' },
      { label: 'Duration', labelFa: 'مدت زمان', value: '8 Months', valueFa: '۸ ماه', icon: 'Clock' },
      { label: 'Industry', labelFa: 'صنعت', value: 'Security', valueFa: 'امنیت', icon: 'Building2' },
      { label: 'Team Size', labelFa: 'اندازه تیم', value: '6 Members', valueFa: '۶ نفر', icon: 'Briefcase' },
      { label: 'Technologies', labelFa: 'فناوری‌ها', value: '8+ Tools', valueFa: '۸+ ابزار', icon: 'Wrench' },
      { label: 'Type', labelFa: 'نوع', value: 'AI R&D', valueFa: 'پژوهش و توسعه هوش مصنوعی', icon: 'Brain' }
    ],
    features: [
      { icon: 'CheckCircle2', title: '99.7% Accuracy', titleFa: 'دقت ۹۹.۷٪', description: 'Validated against diverse global datasets with audited benchmarks.', descriptionFa: 'اعتبارسنجی شده در برابر مجموعه داده‌های متنوع جهانی با معیارهای ممیزی شده.' },
      { icon: 'Zap', title: 'Real-Time Processing', titleFa: 'پردازش بلادرنگ', description: 'Optimized inference pipeline delivers responses in under 100ms.', descriptionFa: 'پایپلاین استنتاج بهینه‌شده پاسخ‌ها را در کمتر از ۱۰۰ میلی‌ثانیه ارائه می‌دهد.' },
      { icon: 'Shield', title: 'Privacy First Design', titleFa: 'طراحی اولویت حریم خصوصی', description: 'End-to-end encryption with GDPR-compliant template storage.', descriptionFa: 'رمزگذاری سرتاسر با ذخیره‌سازی الگو مطابق با GDPR.' },
      { icon: 'Cpu', title: 'Edge Computing Ready', titleFa: 'آماده محاسبات لبه', description: 'Runs on Jetson, Coral, and x86 edge appliances with minimal tuning.', descriptionFa: 'با تنظیمات حداقلی روی دستگاه‌های لبه Jetson، Coral و x86 اجرا می‌شود.' },
      { icon: 'Layers', title: 'Multi-Stage Pipeline', titleFa: 'پایپلاین چندمرحله‌ای', description: 'Detection, alignment, embedding, and matching with explainable scoring.', descriptionFa: 'تشخیص، ترازبندی، جاسازی و تطبیق با امتیازدهی قابل توضیح.' },
      { icon: 'Target', title: 'High Scalability', titleFa: 'مقیاس‌پذیری بالا', description: 'Indexes millions of faces with distributed ANN search and caching.', descriptionFa: 'میلیون‌ها چهره را با جستجوی ANN توزیع شده و کش‌گذاری فهرست‌بندی می‌کند.' }
    ],
    architecture: {
      description:
        'The system employs a multi-stage pipeline: MTCNN for detection, landmark alignment, ResNet-based embeddings, and cosine similarity search. It supports synchronous APIs and async batch jobs with Redis caching for hot embeddings.',
      descriptionFa:
        'سیستم از یک پایپلاین چندمرحله‌ای استفاده می‌کند: MTCNN برای تشخیص، ترازبندی نقاط کلیدی، جاسازی‌های مبتنی بر ResNet و جستجوی شباهت کسینوس. از APIهای همزمان و کارهای دسته‌ای ناهمزمان با کش Redis برای جاسازی‌های داغ پشتیبانی می‌کند.'
    },
    challenges: [
      {
        icon: 'AlertTriangle',
        problem: 'Varying lighting conditions and extreme angles degraded accuracy in outdoor deployments.',
        problemFa: 'شرایط نوری متغیر و زوایای شدید دقت را در استقرارهای فضای باز کاهش می‌داد.',
        solution: 'Introduced illumination normalization, HDR preprocessing, and adaptive multi-scale detection thresholds.',
        solutionFa: 'نرمال‌سازی روشنایی، پیش‌پردازش HDR و آستانه‌های تشخیص چندمقیاسه تطبیقی معرفی شد.'
      },
      {
        icon: 'Lightbulb',
        problem: 'Partial occlusions from masks and accessories caused false negatives in security checkpoints.',
        problemFa: 'انسدادهای جزئی از ماسک و لوازم جانبی باعث منفی‌های کاذب در ایستگاه‌های امنیتی می‌شد.',
        solution: 'Trained occlusion-aware models with attention over visible regions and implemented confidence scoring.',
        solutionFa: 'مدل‌های آگاه از انسداد با توجه به مناطق قابل مشاهده آموزش داده شد و امتیازدهی اعتماد پیاده‌سازی شد.'
      },
      {
        icon: 'Gauge',
        problem: 'Meeting sub-100ms latency while searching millions of embeddings was challenging.',
        problemFa: 'برآورده کردن تأخیر زیر ۱۰۰ میلی‌ثانیه در حالی که میلیون‌ها جاسازی جستجو می‌شد چالش‌برانگیز بود.',
        solution: 'Applied quantization, distillation, GPU batching, ANN indexing, and tiered caching for <85ms p95 latency.',
        solutionFa: 'کوانتیزاسیون، تقطیر، دسته‌بندی GPU، فهرست‌بندی ANN و کش چندسطحی برای تأخیر p95 کمتر از ۸۵ میلی‌ثانیه اعمال شد.'
      },
      {
        icon: 'Lock',
        problem: 'Enterprises required GDPR compliance without sacrificing usability.',
        problemFa: 'سازمان‌ها نیاز به رعایت GDPR بدون قربانی کردن قابلیت استفاده داشتند.',
        solution: 'Added encrypted templates, secure enclaves for processing, consent auditing, and privacy-preserving formats.',
        solutionFa: 'الگوهای رمزگذاری شده، محفظه‌های امن برای پردازش، ممیزی رضایت و فرمت‌های حفظ حریم خصوصی اضافه شد.'
      }
    ],
    performance: {
      before: [
        { label: 'Accuracy', labelFa: 'دقت', value: '94.2%' },
        { label: 'Processing Time', labelFa: 'زمان پردازش', value: '450ms' },
        { label: 'False Positive Rate', labelFa: 'نرخ مثبت کاذب', value: '3.8%' },
        { label: 'Edge Support', labelFa: 'پشتیبانی لبه', value: 'Limited' }
      ],
      after: [
        { label: 'Accuracy', labelFa: 'دقت', value: '99.7%' },
        { label: 'Processing Time', labelFa: 'زمان پردازش', value: '85ms' },
        { label: 'False Positive Rate', labelFa: 'نرخ مثبت کاذب', value: '0.1%' },
        { label: 'Edge Support', labelFa: 'پشتیبانی لبه', value: 'Full' }
      ]
    },
    results: [
      { label: 'Recognition Accuracy', labelFa: 'دقت تشخیص', value: '99.7', suffix: '%', icon: 'Target' },
      { label: 'Processing Speed', labelFa: 'سرعت پردازش', value: '85', suffix: 'ms', icon: 'Zap' },
      { label: 'False Positive Rate', labelFa: 'نرخ مثبت کاذب', value: '0.1', suffix: '%', icon: 'ShieldCheck' },
      { label: 'Scalability', labelFa: 'مقیاس‌پذیری', value: '10M', suffix: '+', icon: 'TrendingUp' },
      { label: 'Uptime Reliability', labelFa: 'قابلیت اطمینان', value: '99.9', suffix: '%', icon: 'Sparkles' },
      { label: 'Privacy Compliance', labelFa: 'رعایت حریم خصوصی', value: '100', suffix: '%', icon: 'Lock' },
      { label: 'Edge Performance', labelFa: 'عملکرد لبه', value: '95', suffix: '%', icon: 'Cpu' },
      { label: 'Customer Satisfaction', labelFa: 'رضایت مشتری', value: '4.9', suffix: '/5', icon: 'CheckCircle2' }
    ],
    useCases: [
      { icon: 'Building', title: 'Enterprise Access Control', titleFa: 'کنترل دسترسی سازمانی', description: 'Touchless entry with audit trails and visitor management.', descriptionFa: 'ورود بدون تماس با ردیابی ممیزی و مدیریت بازدیدکنندگان.', industry: 'Corporate Security', industryFa: 'امنیت شرکتی' },
      { icon: 'Landmark', title: 'Banking & Finance', titleFa: 'بانکداری و مالی', description: 'Secure authentication for ATMs, branches, and high-value transactions.', descriptionFa: 'احراز هویت امن برای خودپردازها، شعب و تراکنش‌های با ارزش بالا.', industry: 'Finance', industryFa: 'مالی' },
      { icon: 'Hospital', title: 'Healthcare & Patient ID', titleFa: 'مراقبت‌های بهداشتی و شناسایی بیمار', description: 'Accurate patient identification and secure medical record access.', descriptionFa: 'شناسایی دقیق بیمار و دسترسی امن به سوابق پزشکی.', industry: 'Healthcare', industryFa: 'مراقبت‌های بهداشتی' },
      { icon: 'ShieldCheck', title: 'Law Enforcement & Security', titleFa: 'اجرای قانون و امنیت', description: 'Real-time suspect identification with privacy controls.', descriptionFa: 'شناسایی مظنون بلادرنگ با کنترل‌های حریم خصوصی.', industry: 'Public Safety', industryFa: 'امنیت عمومی' },
      { icon: 'Building2', title: 'Smart Buildings', titleFa: 'ساختمان‌های هوشمند', description: 'Automated access, attendance, and personalized experiences.', descriptionFa: 'دسترسی خودکار، حضور و غیاب و تجربیات شخصی‌سازی شده.', industry: 'Real Estate', industryFa: 'املاک و مستغلات' },
      { icon: 'Briefcase', title: 'Retail Analytics', titleFa: 'تحلیل خرده‌فروشی', description: 'VIP recognition, loss prevention, and compliant analytics.', descriptionFa: 'شناسایی VIP، پیشگیری از ضرر و تحلیل‌های مطابق.', industry: 'Retail', industryFa: 'خرده‌فروشی' }
    ],
    testimonials: [
      { quote: '60% reduction in unauthorized access attempts with drastically improved employee experience.', quoteFa: 'کاهش ۶۰٪ در تلاش‌های دسترسی غیرمجاز با بهبود چشمگیر تجربه کارکنان.', author: 'Sarah Johnson', role: 'Chief Security Officer', roleFa: 'مدیر ارشد امنیت', company: 'TechCorp Global', companyFa: 'TechCorp Global' },
      { quote: 'Privacy-first design aligned perfectly with GDPR needs and edge deployment was a game changer.', quoteFa: 'طراحی اولویت حریم خصوصی کاملاً با نیازهای GDPR همسو بود و استقرار لبه یک تغییردهنده بازی بود.', author: 'Michael Chen', role: 'Head of Digital Transformation', roleFa: 'رئیس تحول دیجیتال', company: 'SecureBank International', companyFa: 'SecureBank International' },
      { quote: 'Outstanding performance even in low light—patient check-in is now seamless and secure.', quoteFa: 'عملکرد برجسته حتی در نور کم—ثبت‌نام بیمار اکنون بی‌درز و امن است.', author: 'Dr. Emily Rodriguez', role: 'CTO', roleFa: 'مدیر ارشد فناوری', company: 'MedHealth Systems', companyFa: 'MedHealth Systems' },
      { quote: 'Fast deployment, measurable ROI in 6 months, and superb scalability for smart buildings.', quoteFa: 'استقرار سریع، ROI قابل اندازه‌گیری در ۶ ماه و مقیاس‌پذیری عالی برای ساختمان‌های هوشمند.', author: 'David Kim', role: 'VP of Operations', roleFa: 'معاون عملیات', company: 'Urban Properties Inc', companyFa: 'Urban Properties Inc' }
    ],
    ctaSection: {
      title: 'Ready to Transform Your Security?',
      titleFa: 'آماده تحول امنیت خود هستید؟',
      description: 'Let\'s discuss how advanced face recognition can enhance security, streamline operations, and elevate user experience.',
      descriptionFa: 'بیایید در مورد اینکه چگونه تشخیص چهره پیشرفته می‌تواند امنیت را افزایش دهد، عملیات را ساده‌سازی کند و تجربه کاربری را ارتقا دهد، بحث کنیم.',
      buttons: [
        { label: 'Start a Project', labelFa: 'شروع یک پروژه', href: '/contact', variant: 'default', icon: 'ArrowRight' },
        { label: 'Explore More Projects', labelFa: 'کاوش پروژه‌های بیشتر', href: '/projects', variant: 'outline', icon: 'Layers' },
        { label: 'Schedule Demo', labelFa: 'زمان‌بندی دمو', href: '#demo', variant: 'ghost', icon: 'Eye' }
      ]
    },
    demoUrl: 'https://demo.hekfa.ai/face-recognition',
    videoUrl: '/uploads/videos/Firefighter_RAG_Project_Video_Ad.mp4'
  },
  {
    title: 'RAG for Enterprise LLMs',
    titleFa: 'سامانه RAG برای سازمان‌ها',
    slug: 'rag-for-enterprise-llms',
    description: 'Retrieval-Augmented Generation platform delivering grounded answers from private knowledge bases.',
    descriptionFa: 'پلتفرم RAG که پاسخ‌های دقیق را از پایگاه دانش خصوصی استخراج و تولید می‌کند.',
    overview:
      'This initiative focuses on building scalable and accurate RAG pipelines that leverage internal knowledge bases to provide context-aware answers. The platform unifies ingestion, chunking, embedding, retrieval, and generation into an auditable flow that security teams can trust.\n\nWith vector databases, LangChain orchestration, and observability baked in, enterprises can deploy AI assistants that cite their sources, respect access controls, and scale on Kubernetes clusters.',
    overviewFa:
      'این پروژه بر ساخت پایپلاین‌های RAG مقیاس‌پذیر و دقیق تمرکز دارد که با تکیه بر پایگاه‌های دانش داخلی پاسخ‌های آگاه از زمینه ارائه می‌کنند.\n\nبا استفاده از دیتابیس‌های برداری، LangChain و کانتینرسازی، سازمان‌ها می‌توانند دستیارهای هوشمندی ارائه کنند که منبع پاسخ را ذکر کرده و کنترل دسترسی را رعایت می‌کنند.',
    overviewDetails: {
      description: [
        'We designed a full-stack RAG platform that ingests heterogeneous documents, normalizes metadata, and exposes reliable AI answers to enterprise teams.',
        'Multi-stage retrieval, relevance feedback, and dynamic prompt engineering keep hallucinations low while preserving traceability.',
        'Observability dashboards surface latency, citation coverage, and guard-rail triggers for compliance teams.'
      ],
      descriptionFa: [
        'ما یک پلتفرم RAG تمام‌پشته طراحی کردیم که اسناد ناهمگن را دریافت می‌کند، متادیتا را نرمال‌سازی می‌کند و پاسخ‌های قابل اعتماد AI را برای تیم‌های سازمانی ارائه می‌دهد.',
        'بازیابی چندمرحله‌ای، بازخورد ارتباط و مهندسی پویای پرامپت، توهمات را پایین نگه می‌دارد در حالی که قابلیت ردیابی را حفظ می‌کند.',
        'داشبوردهای مشاهده‌پذیری تأخیر، پوشش استناد و محرک‌های محافظ را برای تیم‌های انطباق نمایش می‌دهند.'
      ],
      goals: [
        'Ground every answer with verified sources',
        'Provide real-time audit trails for compliance',
        'Scale to millions of documents with predictable latency',
        'Offer guardrails for PHI/PII redaction'
      ],
      goalsFa: [
        'پایه‌گذاری هر پاسخ با منابع تأیید شده',
        'ارائه ردیابی ممیزی بلادرنگ برای انطباق',
        'مقیاس‌پذیری تا میلیون‌ها سند با تأخیر قابل پیش‌بینی',
        'ارائه محافظ برای حذف اطلاعات حساس'
      ],
      challenge:
        'Traditional chatbots hallucinate and cannot cite secure knowledge bases. Enterprises needed an explainable alternative.',
      challengeFa:
        'چت‌بات‌های سنتی توهم دارند و نمی‌توانند از پایگاه‌های دانش امن استناد کنند. سازمان‌ها به یک جایگزین قابل توضیح نیاز داشتند.'
    },
    category: 'NLP',
    categoryIcon: 'Bot',
    status: 'Research',
    isFeatured: true,
    mainImageUrl: '/uploads/project-rag.jpg',
    slideshowImages: [
      { url: '/uploads/project-rag.jpg', altText: 'RAG pipeline visualization', order: 1 },
      { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', altText: 'Knowledge graph', order: 2 },
      { url: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80', altText: 'LLM assistants', order: 3 }
    ],
    video: { type: 'placeholder' },
    heroButtons: [
      { label: 'See Architecture', labelFa: 'مشاهده معماری', href: '#architecture', variant: 'default', icon: 'Layers' },
      { label: 'Request Pilot', labelFa: 'درخواست پایلوت', href: '/contact', variant: 'outline', icon: 'MessageSquare' }
    ],
    projectInfo: [
      { label: 'Client', labelFa: 'مشتری', value: 'Global Bank', valueFa: 'بانک جهانی', icon: 'Building' },
      { label: 'Duration', labelFa: 'مدت زمان', value: '6 Months', valueFa: '۶ ماه', icon: 'Clock' },
      { label: 'Industry', labelFa: 'صنعت', value: 'Finance', valueFa: 'مالی', icon: 'Landmark' },
      { label: 'Documents', labelFa: 'اسناد', value: '5M+', valueFa: '۵ میلیون+', icon: 'FileText' },
      { label: 'Latency', labelFa: 'تأخیر', value: '<1.2s', valueFa: '<۱.۲ ثانیه', icon: 'Timer' },
      { label: 'Team', labelFa: 'تیم', value: '5 Engineers', valueFa: '۵ مهندس', icon: 'Users' }
    ],
    features: [
      { icon: 'BookOpen', title: 'Source Citation', titleFa: 'استناد به منبع', description: 'Every response links back to the originating document.', descriptionFa: 'هر پاسخ به سند اصلی لینک می‌شود.' },
      { icon: 'ShieldCheck', title: 'Access Controls', titleFa: 'کنترل دسترسی', description: 'Honors document-level permissions through the retrieval layer.', descriptionFa: 'مجوزهای سطح سند را از طریق لایه بازیابی رعایت می‌کند.' },
      { icon: 'Gauge', title: 'Performance Guardrails', titleFa: 'محافظ عملکرد', description: 'Automatic fallbacks when latency or confidence drops.', descriptionFa: 'بازگشت خودکار زمانی که تأخیر یا اعتماد کاهش می‌یابد.' },
      { icon: 'ServerCog', title: 'Modular Pipelines', titleFa: 'پایپلاین‌های ماژولار', description: 'Pluggable chunkers, embedders, and generators for experimentation.', descriptionFa: 'تکه‌کننده‌ها، جاسازها و تولیدکننده‌های قابل اتصال برای آزمایش.' }
    ],
    architecture: {
      description:
        'Document ingestion with workers, enrichment with metadata services, vector persistence on pgvector, retrieval via hybrid search, LangChain orchestration, and observability via OpenTelemetry.',
      descriptionFa:
        'دریافت سند با کارگران، غنی‌سازی با سرویس‌های متادیتا، ماندگاری بردار در pgvector، بازیابی از طریق جستجوی ترکیبی، هماهنگی LangChain و مشاهده‌پذیری از طریق OpenTelemetry.'
    },
    challenges: [
      {
        icon: 'AlertTriangle',
        problem: 'Hallucinations eroded user trust.',
        problemFa: 'توهمات اعتماد کاربر را از بین برد.',
        solution: 'Dual-stage retrieval with confidence scoring and automatic citation enforcement.',
        solutionFa: 'بازیابی دو مرحله‌ای با امتیازدهی اعتماد و اعمال خودکار استناد.'
      },
      {
        icon: 'Lock',
        problem: 'Complex access control requirements.',
        problemFa: 'نیازهای پیچیده کنترل دسترسی.',
        solution: 'Attribute-based filtering applied before embedding retrieval and prompt construction.',
        solutionFa: 'فیلتر کردن مبتنی بر ویژگی قبل از بازیابی جاسازی و ساخت پرامپت اعمال شد.'
      }
    ],
    performance: {
      before: [
        { label: 'Latency', labelFa: 'تأخیر', value: '2.8s' },
        { label: 'Cited Answers', labelFa: 'پاسخ‌های استناد شده', value: '35%' }
      ],
      after: [
        { label: 'Latency', labelFa: 'تأخیر', value: '1.1s' },
        { label: 'Cited Answers', labelFa: 'پاسخ‌های استناد شده', value: '96%' }
      ]
    },
    results: [
      { label: 'Knowledge Sources', labelFa: 'منابع دانش', value: '120', suffix: '+', icon: 'Layers' },
      { label: 'Citation Coverage', labelFa: 'پوشش استناد', value: '96', suffix: '%', icon: 'CheckCircle2' },
      { label: 'User Satisfaction', labelFa: 'رضایت کاربر', value: '4.7', suffix: '/5', icon: 'Smile' }
    ],
    useCases: [
      { icon: 'Briefcase', title: 'Internal Support', titleFa: 'پشتیبانی داخلی', description: 'Employees self-serve policies and procedures with cited answers.', descriptionFa: 'کارکنان با پاسخ‌های استناد شده، سیاست‌ها و رویه‌ها را خودخدمت می‌کنند.', industry: 'Enterprise', industryFa: 'سازمانی' },
      { icon: 'Scale', title: 'Regulatory Compliance', titleFa: 'انطباق مقرراتی', description: 'Auditors receive explainable responses with traceable lineage.', descriptionFa: 'ممیزی‌گران پاسخ‌های قابل توضیح با ردیابی قابل ردیابی دریافت می‌کنند.', industry: 'Compliance', industryFa: 'انطباق' }
    ],
    testimonials: [
      { quote: 'Our teams finally trust AI answers because every response links back to our documents.', quoteFa: 'تیم‌های ما بالاخره به پاسخ‌های AI اعتماد دارند چون هر پاسخ به اسناد ما لینک می‌شود.', author: 'Linda Park', role: 'Ops Director', roleFa: 'مدیر عملیات', company: 'FinServe Co.', companyFa: 'FinServe Co.' }
    ],
    ctaSection: {
      title: 'Ground Your LLM With Real Knowledge',
      titleFa: 'LLM خود را با دانش واقعی پایه‌گذاری کنید',
      description: 'Launch a retrieval-augmented assistant that cites, complies, and scales with your business.',
      descriptionFa: 'یک دستیار تقویت شده با بازیابی راه‌اندازی کنید که استناد می‌کند، انطباق دارد و با کسب‌وکار شما مقیاس می‌شود.',
      buttons: [
        { label: 'Book a Pilot', labelFa: 'رزرو پایلوت', href: '/contact', variant: 'default', icon: 'Rocket' },
        { label: 'Download Whitepaper', labelFa: 'دانلود وایت‌پیپر', href: '/assets/rag-playbook.pdf', variant: 'outline', icon: 'FileText' }
      ]
    },
    demoUrl: 'https://demo.hekfa.ai/rag',
    videoUrl: '/uploads/videos/Firefighter_RAG_Project_Video_Ad.mp4'
  }
];

const energyBlogEntries = [
  {
    title: "The Future of Renewable Energy",
    titleFa: "آینده انرژی‌های تجدیدپذیر",
    slug: "renewable-energy",
    excerpt: "Renewable energy is rapidly transforming our world with intelligent distribution and consumption.",
    excerptFa:
      "انرژی‌های تجدیدپذیر با توزیع و مصرف هوشمندانه، به‌سرعت در حال دگرگون کردن جهان ما هستند.",
    content:
      "Renewable energy is rapidly transforming our world. Solar, wind, and hydroelectric power are no longer alternative sources—they're becoming the primary means of energy production in forward-thinking nations. The integration of AI and machine learning in energy management systems has revolutionized how we distribute and consume power. Smart grids now predict energy demands with unprecedented accuracy, reducing waste and optimizing resource allocation. As we advance into this new era, the combination of renewable sources with intelligent systems promises a sustainable future where clean energy is both accessible and efficient.",
    contentFa:
      "انرژی‌های تجدیدپذیر به‌سرعت جهان ما را متحول کرده‌اند. خورشید، باد و نیروگاه‌های آبی دیگر منابع جایگزین نیستند؛ بلکه در کشورهای پیشرو به منابع اصلی تولید انرژی تبدیل شده‌اند. ترکیب هوش مصنوعی و یادگیری ماشین در سامانه‌های مدیریت انرژی، نحوه توزیع و مصرف برق را دگرگون کرده است. شبکه‌های هوشمند اکنون با دقت بالا تقاضای انرژی را پیش‌بینی می‌کنند، اتلاف را کاهش می‌دهند و تخصیص منابع را بهینه می‌کنند. با ورود به این عصر جدید، پیوند منابع تجدیدپذیر با سامانه‌های هوشمند، آینده‌ای پایدار با انرژی پاک، در دسترس و کارآمد نوید می‌دهد.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
    icon: "Sun",
    order: 1,
  },
  {
    title: "Climate Action Through Technology",
    titleFa: "مقابله با تغییرات اقلیمی با تکیه بر فناوری",
    slug: "climate-action",
    excerpt: "Cutting-edge technology is our most powerful ally in the fight against climate change.",
    excerptFa:
      "فناوری‌های پیشرفته قدرتمندترین متحد ما در مبارزه با تغییرات اقلیمی هستند.",
    content:
      "Technology stands as our most powerful ally in the fight against climate change. From carbon capture systems to atmospheric monitoring satellites, we're deploying sophisticated tools to understand and mitigate environmental damage. Machine learning algorithms analyze vast amounts of climate data, identifying patterns and predicting future changes with remarkable precision. IoT sensors distributed across ecosystems provide real-time environmental monitoring, alerting us to changes before they become critical. The marriage of environmental science and cutting-edge technology creates pathways to solutions we never thought possible, offering hope for a restored planet.",
    contentFa:
      "فناوری‌های نوین به قدرتمندترین ابزار ما در مبارزه با تغییرات اقلیمی تبدیل شده‌اند. از سامانه‌های جذب و ذخیره‌سازی کربن گرفته تا ماهواره‌های پایش جوّ زمین، ابزارهای پیشرفته‌ای به‌کار گرفته‌ایم تا آسیب‌های زیست‌محیطی را بهتر درک و کنترل کنیم. الگوریتم‌های یادگیری ماشین حجم عظیمی از داده‌های اقلیمی را تحلیل کرده و الگوها را شناسایی و تغییرات آینده را با دقت بالا پیش‌بینی می‌کنند. حسگرهای اینترنت اشیا که در سراسر اکوسیستم‌ها توزیع شده‌اند، پایش لحظه‌ای محیط را فراهم کرده و پیش از بحرانی شدن شرایط، هشدار می‌دهند. پیوند علم محیط‌زیست با فناوری‌های پیشرفته، مسیرهایی تازه برای مقابله با بحران اقلیمی و امیدی برای سیاره‌ای متعادل‌تر فراهم می‌کند.",
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800",
    icon: "Leaf",
    order: 2,
  },
  {
    title: "Building Sustainable Smart Cities",
    titleFa: "ساخت شهرهای هوشمند پایدار",
    slug: "sustainable-cities",
    excerpt: "Tomorrow's cities are being built today with sustainability at their core.",
    excerptFa:
      "شهرهای فردا امروز با محوریت پایداری و هوشمندی در حال ساخته شدن هستند.",
    content:
      "The cities of tomorrow are being built today, with sustainability at their core. Smart city infrastructure integrates renewable energy systems, intelligent transportation networks, and green building technologies. Vertical gardens and urban forests combat air pollution while providing natural cooling. AI-powered traffic management reduces emissions by optimizing vehicle flow and promoting public transportation. Water recycling systems and smart waste management minimize resource consumption. These interconnected systems create urban environments that are not just livable, but regenerative—giving back more to the environment than they take.",
    contentFa:
      "شهرهای آینده همین امروز و با محوریت پایداری در حال طراحی و پیاده‌سازی هستند. زیرساخت‌های شهر هوشمند، سامانه‌های انرژی تجدیدپذیر، شبکه‌های هوشمند حمل‌ونقل و ساختمان‌های سبز را در هم ادغام می‌کند. باغ‌های عمودی و فضاهای سبز شهری با کاهش آلودگی هوا، سرمایش طبیعی را نیز فراهم می‌کنند. مدیریت ترافیک مبتنی بر هوش مصنوعی، با بهینه‌سازی جریان خودروها و تقویت حمل‌ونقل عمومی، انتشار آلاینده‌ها را کاهش می‌دهد. سامانه‌های بازیافت آب و مدیریت هوشمند پسماند، مصرف منابع را به حداقل می‌رسانند. این اجزای به‌هم‌پیوسته، شهرهایی می‌سازند که نه‌تنها قابل‌زندگی، بلکه احیاگر محیط‌زیست هستند.",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
    icon: "Wind",
    order: 3,
  },
  {
    title: "Water Conservation and AI",
    titleFa: "حفاظت از منابع آب با کمک هوش مصنوعی",
    slug: "water-conservation",
    excerpt: "AI-powered systems are redefining how we preserve the world's most precious resource.",
    excerptFa:
      "سامانه‌های هوش مصنوعی در حال بازتعریف شیوه‌های حفاظت از حیاتی‌ترین منبع جهان، یعنی آب، هستند.",
    content:
      "Water scarcity affects billions globally, but artificial intelligence offers innovative solutions. Smart irrigation systems use weather predictions and soil sensors to optimize water usage in agriculture, reducing waste by up to 50%. AI-powered leak detection in municipal water systems identifies and locates problems before they become critical, saving millions of gallons annually. Predictive models help water treatment facilities adjust operations based on demand forecasts and quality requirements. Desalination plants optimized by machine learning consume less energy while producing more fresh water. These technologies are essential for ensuring water security in an increasingly resource-constrained world.",
    contentFa:
      "کمبود آب زندگی میلیاردها نفر را در سراسر جهان تحت‌تأثیر قرار داده است، اما هوش مصنوعی راه‌حل‌های خلاقانه‌ای ارائه می‌دهد. سامانه‌های آبیاری هوشمند با استفاده از پیش‌بینی هوا و حسگرهای رطوبت خاک، مصرف آب در کشاورزی را بهینه کرده و اتلاف را تا ۵۰٪ کاهش می‌دهند. سیستم‌های هوشمند تشخیص نشتی در شبکه‌های آب شهری، محل و شدت نشتی را پیش از بحرانی شدن شناسایی کرده و سالانه میلیون‌ها لیتر آب را حفظ می‌کنند. مدل‌های پیش‌بینی به تصفیه‌خانه‌ها کمک می‌کنند تا بر اساس الگوهای تقاضا و کیفیت، عملیات خود را تنظیم کنند. واحدهای شیرین‌سازی آب که با یادگیری ماشین بهینه شده‌اند، با انرژی کمتر، آب آشامیدنی بیشتری تولید می‌کنند. این فناوری‌ها برای تأمین امنیت آبی در دنیایی با منابع محدود حیاتی هستند.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800",
    icon: "Droplets",
    order: 4,
  },
];

const creativityEntries = [
  {
    childName: "Sara Johnson",
    childNameFa: "سارا جانسون",
    idea: "A robot that can paint pictures by reading people's emotions",
    ideaFa: "رباتی که با خواندن احساسات انسان‌ها نقاشی می‌کشد",
    position: { x: 18, y: 14 },
    rotation: -2,
    color:
      "bg-gradient-to-br from-cyan-100/80 via-blue-100/70 to-white/60 dark:from-primary/20 dark:via-primary/10 dark:to-background/60",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=800",
    },
    order: 1,
  },
  {
    childName: "Ahmed Al-Rashid",
    childNameFa: "احمد الرشید",
    idea: "Flying bicycles powered by solar panels and dreams",
    ideaFa: "دوچرخه‌های پرنده‌ای که با پنل خورشیدی و رویاها حرکت می‌کنند",
    position: { x: 68, y: 24 },
    rotation: 3,
    color:
      "bg-gradient-to-br from-rose-100/80 via-pink-100/70 to-white/60 dark:from-secondary/20 dark:via-primary/10 dark:to-background/60",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    order: 2,
  },
  {
    childName: "Maria Garcia",
    childNameFa: "ماریا گارسیا",
    idea: "A musical instrument that creates colors in the air when you play it",
    ideaFa: "ساز موسیقی‌ای که هنگام نواختن، رنگ‌ها را در هوا به‌وجود می‌آورد",
    position: { x: 38, y: 36 },
    rotation: -3,
    color:
      "bg-gradient-to-br from-indigo-100/80 via-sky-100/70 to-white/60 dark:from-primary/15 dark:to-background/60",
    order: 3,
  },
  {
    childName: "Li Wei",
    childNameFa: "لی وی",
    idea: "Smart shoes that remember where you've been and create a story map",
    ideaFa:
      "کفش‌های هوشمندی که مسیرهای شما را به خاطر می‌سپارند و یک نقشه داستانی می‌سازند",
    position: { x: 20, y: 50 },
    rotation: 2,
    color:
      "bg-gradient-to-br from-emerald-100/80 via-teal-100/70 to-white/60 dark:from-emerald-300/10 dark:to-background/60",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800",
    },
    order: 4,
  },
  {
    childName: "Emma Wilson",
    childNameFa: "اما ویلسون",
    idea: "A book where the characters come alive based on how you draw them",
    ideaFa: "کتابی که شخصیت‌هایش بر اساس نحوه نقاشی شما زنده می‌شوند",
    position: { x: 78, y: 54 },
    rotation: -2,
    color:
      "bg-gradient-to-br from-purple-100/80 via-fuchsia-100/70 to-white/60 dark:from-fuchsia-300/15 dark:to-background/60",
    order: 5,
  },
  {
    childName: "Omar Hassan",
    childNameFa: "عمر حسن",
    idea: "Invisible ink that only appears when you're happy",
    ideaFa: "جوهر نامرئی که فقط زمانی ظاهر می‌شود که خوشحال باشید",
    position: { x: 55, y: 66 },
    rotation: 4,
    color:
      "bg-gradient-to-br from-amber-100/80 via-orange-100/70 to-white/60 dark:from-amber-300/15 dark:to-background/60",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    order: 6,
  },
  {
    childName: "Yuki Tanaka",
    childNameFa: "یوکی تاناکا",
    idea: "Clouds you can bounce on like trampolines",
    ideaFa: "ابرهایی که می‌توان روی آن‌ها مانند ترامپولین پرید",
    position: { x: 32, y: 78 },
    rotation: -4,
    color:
      "bg-gradient-to-br from-cyan-100/80 via-slate-100/70 to-white/60 dark:from-cyan-300/15 dark:to-background/60",
    order: 7,
  },
  {
    childName: "Sofia Rodriguez",
    childNameFa: "سوفیا رودریگز",
    idea: "A camera that captures memories as 3D holograms you can walk through",
    ideaFa:
      "دوربینی که خاطرات را به شکل هولوگرام‌های سه‌بعدی ذخیره می‌کند و می‌توانید در میان آن‌ها قدم بزنید",
    position: { x: 82, y: 84 },
    rotation: 3,
    color:
      "bg-gradient-to-br from-rose-100/80 via-amber-100/70 to-white/60 dark:from-rose-300/15 dark:to-background/60",
    order: 8,
  },
];

const caseStudies = [
  {
    title: "Optimizing Logistics for PetroCorp",
    titleFa: "بهینه‌سازی لجستیک برای پتروکورپ",
    slug: "optimizing-logistics-petrocorp",
    subtitle: "AI-Powered Route Optimization Transforms Supply Chain Efficiency",
    subtitleFa: "بهینه‌سازی مسیر مبتنی بر هوش مصنوعی، بهره‌وری زنجیره تأمین را متحول می‌کند",
    tags: ["Logistics", "AI Optimization", "Supply Chain"],
    client: "PetroCorp Inc.",
    clientFa: "شرکت پتروکورپ",
    duration: "8 months",
    industry: "Oil & Gas",
    industryFa: "نفت و گاز",
    description: "Developed a route optimization AI that reduced fuel consumption by 22% and improved delivery times by 15% across PetroCorp's entire logistics network.",
    descriptionFa: "توسعه هوش مصنوعی بهینه‌سازی مسیر که مصرف سوخت را ۲۲٪ کاهش داد و زمان تحویل را در کل شبکه لجستیک پتروکورپ ۱۵٪ بهبود بخشید.",
    heroImage: "/uploads/case-study-logistics-hero.jpg",
    imageUrl: "/uploads/case-study-logistics.jpg",
    technologies: ["Reinforcement Learning", "GIS", "Python", "TensorFlow", "PostgreSQL"],
    results: [
      {
        metric: "Fuel Cost Reduction",
        metricFa: "کاهش هزینه سوخت",
        value: "22%",
        valueFa: "۲۲٪",
        description: "Annual savings of $2.4M through optimized routes",
        descriptionFa: "صرفه‌جویی سالانه ۲.۴ میلیون دلار از طریق مسیرهای بهینه"
      },
      {
        metric: "Delivery Speed",
        metricFa: "سرعت تحویل",
        value: "15%",
        valueFa: "۱۵٪",
        description: "Faster average delivery times across all routes",
        descriptionFa: "میانگین زمان تحویل سریع‌تر در تمام مسیرها"
      },
      {
        metric: "Carbon Emissions",
        metricFa: "انتشار کربن",
        value: "18%",
        valueFa: "۱۸٪",
        description: "Reduction in environmental impact",
        descriptionFa: "کاهش اثرات زیست‌محیطی"
      }
    ],
    legacyResults: ["22% reduction in fuel costs", "15% faster delivery"],
    sections: [
      {
        id: "challenge",
        title: "The Challenge",
        titleFa: "چالش",
        content: "PetroCorp Inc., a major oil and gas distributor, faced significant challenges in managing their logistics operations across 15 states. With over 500 delivery vehicles operating daily, route inefficiencies were costing the company millions annually.\n\nKey pain points included:\n- Inefficient route planning leading to excessive fuel consumption\n- Lack of real-time optimization capabilities\n- Manual scheduling processes prone to human error\n- Growing pressure to reduce carbon emissions\n- Increasing customer expectations for faster deliveries",
        contentFa: "شرکت پتروکورپ، یکی از توزیع‌کنندگان بزرگ نفت و گاز، با چالش‌های قابل‌توجهی در مدیریت عملیات لجستیک خود در ۱۵ ایالت مواجه بود. با بیش از ۵۰۰ خودرو تحویل فعال روزانه، ناکارآمدی مسیرها سالانه میلیون‌ها دلار هزینه داشت.\n\nنقاط درد کلیدی شامل:\n- برنامه‌ریزی ناکارآمد مسیر منجر به مصرف بیش از حد سوخت\n- فقدان قابلیت بهینه‌سازی بلادرنگ\n- فرآیندهای زمان‌بندی دستی مستعد خطای انسانی\n- فشار فزاینده برای کاهش انتشار کربن\n- انتظارات رو به رشد مشتریان برای تحویل سریع‌تر"
      },
      {
        id: "solution",
        title: "Our Solution",
        titleFa: "راه‌حل ما",
        content: "We developed a comprehensive AI-powered route optimization system leveraging reinforcement learning algorithms to dynamically plan and adjust delivery routes in real-time.\n\nThe solution integrated:\n- **Advanced Reinforcement Learning Models**: Trained on historical delivery data to learn optimal routing patterns\n- **Real-Time Traffic Integration**: Live traffic data feeds to adjust routes on-the-fly\n- **Multi-Objective Optimization**: Balancing fuel efficiency, delivery speed, and customer satisfaction\n- **Predictive Analytics**: Forecasting demand patterns to proactively optimize fleet allocation\n- **Intuitive Dashboard**: Web-based interface for dispatchers to monitor and manage operations\n\nThe system processes thousands of variables including vehicle capacity, traffic conditions, weather, driver schedules, and customer time windows to generate optimal routes within seconds.",
        contentFa: "ما یک سامانه جامع بهینه‌سازی مسیر مبتنی بر هوش مصنوعی توسعه دادیم که از الگوریتم‌های یادگیری تقویتی برای برنامه‌ریزی و تنظیم پویای مسیرهای تحویل به‌صورت بلادرنگ استفاده می‌کند.\n\nراه‌حل شامل موارد زیر بود:\n- **مدل‌های پیشرفته یادگیری تقویتی**: آموزش‌دیده روی داده‌های تحویل تاریخی برای یادگیری الگوهای مسیریابی بهینه\n- **یکپارچه‌سازی ترافیک بلادرنگ**: فیدهای داده ترافیک زنده برای تنظیم مسیرها در لحظه\n- **بهینه‌سازی چندهدفه**: تعادل بین بهره‌وری سوخت، سرعت تحویل و رضایت مشتری\n- **تحلیل پیش‌بینانه**: پیش‌بینی الگوهای تقاضا برای بهینه‌سازی پیشگیرانه تخصیص ناوگان\n- **داشبورد کاربرپسند**: رابط کاربری وب‌محور برای مدیران توزیع"
      },
      {
        id: "implementation",
        title: "Implementation Process",
        titleFa: "فرآیند پیاده‌سازی",
        content: "The implementation followed a phased approach over 8 months:\n\n**Phase 1 (Months 1-2): Data Collection & Analysis**\n- Collected 2 years of historical delivery data\n- Analyzed route patterns, delivery times, and fuel consumption\n- Identified key optimization opportunities\n\n**Phase 2 (Months 3-5): Model Development**\n- Developed and trained reinforcement learning models\n- Built real-time data integration pipelines\n- Created optimization algorithms for multi-objective routing\n\n**Phase 3 (Months 6-7): Integration & Testing**\n- Integrated with PetroCorp's existing fleet management systems\n- Conducted extensive testing with 50 vehicles in pilot program\n- Refined models based on real-world feedback\n\n**Phase 4 (Month 8): Full Deployment**\n- Rolled out to entire fleet of 500+ vehicles\n- Provided comprehensive training to operations team\n- Established monitoring and continuous improvement processes",
        contentFa: "پیاده‌سازی در طی ۸ ماه به‌صورت مرحله‌ای انجام شد:\n\n**فاز ۱ (ماه‌های ۱-۲): جمع‌آوری و تحلیل داده**\n- جمع‌آوری ۲ سال داده تاریخی تحویل\n- تحلیل الگوهای مسیر، زمان‌های تحویل و مصرف سوخت\n- شناسایی فرصت‌های کلیدی بهینه‌سازی\n\n**فاز ۲ (ماه‌های ۳-۵): توسعه مدل**\n- توسعه و آموزش مدل‌های یادگیری تقویتی\n- ساخت پایپلاین‌های یکپارچه‌سازی داده بلادرنگ\n\n**فاز ۳ (ماه‌های ۶-۷): یکپارچه‌سازی و آزمایش**\n- یکپارچه‌سازی با سامانه‌های مدیریت ناوگان موجود پتروکورپ\n- آزمایش گسترده با ۵۰ خودرو در برنامه آزمایشی\n\n**فاز ۴ (ماه ۸): استقرار کامل**\n- راه‌اندازی در کل ناوگان بیش از ۵۰۰ خودرو"
      },
      {
        id: "results",
        title: "Results & Impact",
        titleFa: "نتایج و تأثیر",
        content: "The AI-powered route optimization system delivered transformative results:\n\n**Quantitative Impact:**\n- 22% reduction in fuel costs, saving $2.4M annually\n- 15% improvement in average delivery times\n- 18% reduction in carbon emissions\n- 99.2% on-time delivery rate (up from 87%)\n- 35% reduction in driver overtime hours\n\n**Operational Improvements:**\n- Dispatchers can now optimize routes in minutes instead of hours\n- Real-time adjustments reduce delays caused by traffic or emergencies\n- Better resource utilization across the entire fleet\n- Improved driver satisfaction due to more efficient schedules\n\n**Strategic Benefits:**\n- Enhanced competitive advantage through faster, more reliable service\n- Stronger environmental credentials supporting sustainability goals\n- Scalable solution that grows with the business\n- Foundation for future AI-driven logistics innovations\n\nThe solution has become a core part of PetroCorp's operations and serves as a model for other logistics companies in the industry.",
        contentFa: "سامانه بهینه‌سازی مسیر مبتنی بر هوش مصنوعی نتایج تحول‌آفرینی ارائه داد:\n\n**تأثیر کمّی:**\n- ۲۲٪ کاهش در هزینه‌های سوخت، صرفه‌جویی سالانه ۲.۴ میلیون دلار\n- ۱۵٪ بهبود در میانگین زمان تحویل\n- ۱۸٪ کاهش در انتشار کربن\n- ۹۹.۲٪ نرخ تحویل به‌موقع (افزایش از ۸۷٪)\n- ۳۵٪ کاهش در ساعات اضافه‌کاری رانندگان\n\n**بهبودهای عملیاتی:**\n- مدیران توزیع اکنون می‌توانند مسیرها را در عرض دقایق بهینه کنند\n- تنظیمات بلادرنگ تأخیرات ناشی از ترافیک یا شرایط اضطراری را کاهش می‌دهد\n\nاین راه‌حل به بخش اصلی عملیات پتروکورپ تبدیل شده است."
      }
    ],
    pdfUrl: "/uploads/case-studies/petrocorp-logistics-optimization.pdf"
  },
  {
    title: "Automated Quality Control at PharmaGood",
    titleFa: "کنترل کیفیت خودکار در فارماگود",
    slug: "automated-quality-control-pharmagood",
    subtitle: "Computer Vision System Achieves 99.99% Defect Detection Accuracy",
    subtitleFa: "سامانه بینایی کامپیوتر با دقت ۹۹.۹۹٪ در تشخیص عیوب",
    tags: ["Computer Vision", "Manufacturing", "Quality Control"],
    client: "PharmaGood",
    clientFa: "فارماگود",
    duration: "6 months",
    industry: "Pharmaceutical Manufacturing",
    industryFa: "تولید دارویی",
    description: "Implemented a high-speed computer vision system that achieved 99.99% defect detection accuracy and increased inspection speed by 300%.",
    descriptionFa: "پیاده‌سازی سامانه بینایی کامپیوتر پرسرعت که به دقت ۹۹.۹۹٪ در تشخیص عیوب دست یافت و سرعت بازرسی را ۳۰۰٪ افزایش داد.",
    heroImage: "/uploads/case-study-pharma-hero.jpg",
    imageUrl: "/uploads/case-study-pharma.jpg",
    technologies: ["Computer Vision", "CNN", "Deep Learning", "Python", "PyTorch", "TensorRT"],
    results: [
      {
        metric: "Detection Accuracy",
        metricFa: "دقت تشخیص",
        value: "99.99%",
        valueFa: "۹۹.۹۹٪",
        description: "Near-perfect defect identification rate",
        descriptionFa: "نرخ شناسایی عیب تقریباً کامل"
      },
      {
        metric: "Inspection Speed",
        metricFa: "سرعت بازرسی",
        value: "300%",
        valueFa: "۳۰۰٪",
        description: "Increase in items processed per hour",
        descriptionFa: "افزایش تعداد اقلام پردازش‌شده در ساعت"
      },
      {
        metric: "False Positives",
        metricFa: "مثبت کاذب",
        value: "0.01%",
        valueFa: "۰.۰۱٪",
        description: "Minimal waste from incorrect rejections",
        descriptionFa: "حداقل ضایعات از رد‌های نادرست"
      }
    ],
    legacyResults: ["99.99% defect detection accuracy", "300% increase in inspection speed"],
    sections: [
      {
        id: "challenge",
        title: "The Challenge",
        content: "PharmaGood, a leading pharmaceutical manufacturer, needed to enhance their quality control processes for packaging inspection. With strict regulatory requirements and growing production volumes, manual inspection was becoming a bottleneck.\n\nCritical challenges included:\n- Human inspectors unable to keep pace with production volumes\n- Inconsistent detection rates across different inspectors\n- High cost of manual quality control operations\n- Regulatory compliance requiring 100% inspection coverage\n- Need to detect microscopic defects in packaging materials\n- Pressure to reduce waste from false rejections"
      },
      {
        id: "solution",
        title: "Our Solution",
        content: "We developed a state-of-the-art computer vision system powered by deep convolutional neural networks (CNNs) specifically trained for pharmaceutical packaging defect detection.\n\nKey components of the solution:\n- **High-Resolution Imaging System**: Multi-camera setup capturing images from multiple angles\n- **Custom CNN Architecture**: Deep learning model trained on 500,000+ labeled images of defects\n- **Real-Time Processing Pipeline**: Optimized inference using TensorRT for sub-second processing\n- **Defect Classification**: Categorizes defects by type, severity, and location\n- **Integration with Production Lines**: Seamless integration with existing manufacturing equipment\n- **Analytics Dashboard**: Real-time monitoring and reporting of quality metrics\n\nThe system can detect various defect types including:\n- Packaging tears and punctures\n- Label misalignment and damage\n- Contamination and foreign objects\n- Barcode readability issues\n- Seal integrity problems"
      },
      {
        id: "implementation",
        title: "Implementation Process",
        content: "The project was executed in phases over 6 months:\n\n**Phase 1 (Months 1-2): Requirements & Design**\n- Analyzed current quality control processes and pain points\n- Defined defect categories and acceptance criteria\n- Designed imaging system architecture\n- Selected hardware components for optimal performance\n\n**Phase 2 (Months 3-4): Model Development**\n- Collected and labeled training dataset of 500,000+ images\n- Developed and trained custom CNN architecture\n- Achieved high accuracy through transfer learning and data augmentation\n- Optimized model for real-time inference requirements\n\n**Phase 3 (Month 5): Integration & Testing**\n- Installed imaging hardware on production line\n- Integrated with PharmaGood's MES (Manufacturing Execution System)\n- Conducted extensive testing with real production batches\n- Fine-tuned models based on production data feedback\n\n**Phase 4 (Month 6): Deployment & Training**\n- Deployed to full production line\n- Trained quality control staff on system operation\n- Established continuous monitoring and model update procedures\n- Documented processes for regulatory compliance"
      },
      {
        id: "results",
        title: "Results & Impact",
        content: "The automated quality control system delivered exceptional results:\n\n**Quantitative Achievements:**\n- 99.99% defect detection accuracy, exceeding manual inspection rates\n- 300% increase in inspection throughput\n- 0.01% false positive rate, minimizing waste\n- 100% inspection coverage of all products\n- 70% reduction in quality control labor costs\n- Real-time processing at production line speeds\n\n**Quality Improvements:**\n- Consistent, objective defect detection across all shifts\n- Detection of defects too small for human inspectors\n- Complete traceability with timestamped images of every item\n- Reduced human error and variability\n- Faster identification and resolution of quality issues\n\n**Business Impact:**\n- Enhanced regulatory compliance with automated documentation\n- Improved customer satisfaction through higher quality products\n- Scalable solution that can handle increased production volumes\n- Foundation for predictive quality analytics\n- Strong ROI through cost savings and improved efficiency\n\nThe system has become integral to PharmaGood's quality assurance program and serves as a best-practice example in pharmaceutical manufacturing."
      }
    ],
    pdfUrl: "/uploads/case-studies/pharmagood-quality-control.pdf"
  },
  {
    title: "Fraud Detection System for GlobalBank",
    titleFa: "سامانه تشخیص تقلب برای گلوبال‌بانک",
    slug: "fraud-detection-globalbank",
    subtitle: "Real-Time AI System Prevents $50M+ in Annual Fraud Losses",
    subtitleFa: "سامانه هوش مصنوعی بلادرنگ از بیش از ۵۰ میلیون دلار ضرر سالانه ناشی از تقلب جلوگیری می‌کند",
    tags: ["Machine Learning", "Financial Services", "Fraud Detection"],
    client: "GlobalBank International",
    clientFa: "گلوبال‌بانک بین‌المللی",
    duration: "10 months",
    industry: "Banking & Financial Services",
    industryFa: "بانکداری و خدمات مالی",
    description: "Deployed an advanced machine learning system that detects fraudulent transactions in real-time, preventing over $50M in annual losses while maintaining a false positive rate under 0.1%.",
    descriptionFa: "استقرار یک سامانه پیشرفته یادگیری ماشین که تراکنش‌های تقلبی را به‌صورت بلادرنگ تشخیص می‌دهد و از بیش از ۵۰ میلیون دلار ضرر سالانه جلوگیری می‌کند در حالی که نرخ مثبت کاذب را زیر ۰.۱٪ حفظ می‌کند.",
    heroImage: "/uploads/case-study-banking-hero.jpg",
    imageUrl: "/uploads/case-study-banking.jpg",
    technologies: ["Machine Learning", "Neural Networks", "Real-Time Processing", "Python", "Apache Kafka", "PostgreSQL", "Redis"],
    results: [
      {
        metric: "Fraud Prevention",
        metricFa: "پیشگیری از تقلب",
        value: "$50M+",
        valueFa: "بیش از ۵۰ میلیون دلار",
        description: "Annual fraud losses prevented",
        descriptionFa: "جلوگیری از ضررهای سالانه ناشی از تقلب"
      },
      {
        metric: "Detection Time",
        metricFa: "زمان تشخیص",
        value: "<50ms",
        valueFa: "کمتر از ۵۰ میلی‌ثانیه",
        description: "Average time to detect fraud",
        descriptionFa: "میانگین زمان تشخیص تقلب"
      },
      {
        metric: "False Positives",
        metricFa: "مثبت کاذب",
        value: "0.08%",
        valueFa: "۰.۰۸٪",
        description: "Industry-leading accuracy rate",
        descriptionFa: "نرخ دقت پیشرو در صنعت"
      }
    ],
    legacyResults: ["$50M+ in fraud prevented annually", "<50ms detection time", "0.08% false positive rate"],
    sections: [
      {
        id: "challenge",
        title: "The Challenge",
        content: "GlobalBank International, one of the world's largest financial institutions, faced a growing threat from sophisticated fraud schemes. With millions of transactions processed daily across 40+ countries, detecting fraud in real-time was becoming increasingly difficult.\n\nCritical challenges included:\n- Sophisticated fraudsters using advanced techniques to evade detection\n- Legacy systems unable to process transactions fast enough for real-time analysis\n- High false positive rates disrupting legitimate customer transactions\n- Need to balance security with customer experience\n- Regulatory requirements for fraud detection and reporting\n- Increasing transaction volumes requiring scalable solutions"
      },
      {
        id: "solution",
        title: "Our Solution",
        content: "We developed a cutting-edge real-time fraud detection system powered by ensemble machine learning models that analyze transaction patterns, user behavior, and contextual signals within milliseconds.\n\nKey components of the solution:\n- **Ensemble ML Models**: Combining gradient boosting, neural networks, and rule-based systems for maximum accuracy\n- **Real-Time Streaming Architecture**: Apache Kafka pipeline processing millions of transactions per second\n- **Behavioral Analytics**: User profiling and anomaly detection based on transaction history and patterns\n- **Graph Neural Networks**: Analyzing relationships between accounts, merchants, and transactions\n- **Adaptive Learning**: Models continuously retrain on new fraud patterns to stay ahead of threats\n- **Risk Scoring Engine**: Dynamic risk assessment with configurable thresholds per transaction type\n\nThe system analyzes 200+ features per transaction including:\n- Transaction amount, location, and timing patterns\n- Device fingerprinting and biometric signals\n- Merchant history and risk profiles\n- Account behavior patterns and velocity checks\n- Network analysis of connected accounts and entities"
      },
      {
        id: "implementation",
        title: "Implementation Process",
        content: "The project was executed over 10 months with careful attention to security and compliance:\n\n**Phase 1 (Months 1-3): Requirements & Design**\n- Analyzed historical fraud data and patterns\n- Designed real-time streaming architecture\n- Established security and compliance requirements\n- Created data pipeline and feature engineering framework\n\n**Phase 2 (Months 4-6): Model Development**\n- Built training dataset from 5 years of transaction history\n- Developed and trained ensemble ML models\n- Optimized models for sub-50ms inference time\n- Implemented adaptive learning and retraining pipelines\n\n**Phase 3 (Months 7-8): Integration & Testing**\n- Integrated with GlobalBank's core banking systems\n- Conducted extensive testing in production-like environment\n- Validated fraud detection accuracy and false positive rates\n- Performed security audits and penetration testing\n\n**Phase 4 (Months 9-10): Deployment & Rollout**\n- Phased rollout starting with low-risk regions\n- Monitored performance and fine-tuned models\n- Trained fraud operations team on new system\n- Established 24/7 monitoring and alerting procedures"
      },
      {
        id: "results",
        title: "Results & Impact",
        content: "The fraud detection system delivered exceptional results:\n\n**Quantitative Achievements:**\n- Prevented over $50M in fraud losses annually\n- Sub-50ms average detection time, enabling real-time blocking\n- 0.08% false positive rate, dramatically improving customer experience\n- 99.7% fraud detection accuracy across all transaction types\n- Processed 5M+ transactions per day with zero downtime\n- 85% reduction in manual fraud review workload\n\n**Operational Improvements:**\n- Real-time fraud blocking prevents losses before they occur\n- Automated risk assessment reduces manual review time by 85%\n- Advanced analytics provide insights into fraud patterns\n- Faster response times improve customer trust and satisfaction\n- Scalable architecture handles growing transaction volumes\n\n**Business Impact:**\n- Enhanced security protecting customer assets and bank reputation\n- Improved customer experience with fewer false positives\n- Regulatory compliance with automated fraud reporting\n- Cost savings through reduced manual operations\n- Competitive advantage through superior fraud prevention\n\n**Strategic Benefits:**\n- Foundation for future AI-driven security initiatives\n- Actionable insights into emerging fraud trends\n- Adaptable system that evolves with changing threats\n- Model for other business units and regional offices\n\nThe system has become critical infrastructure at GlobalBank and serves as a benchmark for fraud detection in the financial services industry."
      }
    ],
    pdfUrl: "/uploads/case-studies/globalbank-fraud-detection.pdf"
  },
  {
    title: "Personalized Shopping Experience for ShopMax",
    titleFa: "تجربه خرید شخصی‌سازی‌شده برای شاپ‌مکس",
    slug: "personalized-shopping-shopmax",
    subtitle: "AI Recommendation Engine Increases Revenue by 34%",
    subtitleFa: "موتور توصیه‌گر هوش مصنوعی درآمد را ۳۴٪ افزایش می‌دهد",
    tags: ["Machine Learning", "E-Commerce", "Personalization"],
    client: "ShopMax Retail",
    clientFa: "خرده‌فروشی شاپ‌مکس",
    duration: "7 months",
    industry: "Retail & E-Commerce",
    industryFa: "خرده‌فروشی و تجارت الکترونیک",
    description: "Built a sophisticated recommendation system that personalizes product suggestions for millions of customers, resulting in a 34% increase in revenue and 45% improvement in customer engagement.",
    descriptionFa: "ساخت یک سامانه توصیه‌گر پیشرفته که پیشنهادات محصول را برای میلیون‌ها مشتری شخصی‌سازی می‌کند، که منجر به ۳۴٪ افزایش درآمد و ۴۵٪ بهبود در تعامل مشتری شد.",
    heroImage: "/uploads/case-study-retail-hero.jpg",
    imageUrl: "/uploads/case-study-retail.jpg",
    technologies: ["Machine Learning", "Recommendation Systems", "NLP", "Python", "TensorFlow", "MongoDB", "Redis", "Elasticsearch"],
    results: [
      {
        metric: "Revenue Increase",
        metricFa: "افزایش درآمد",
        value: "34%",
        valueFa: "۳۴٪",
        description: "Boost in overall revenue from recommendations",
        descriptionFa: "افزایش درآمد کلی از توصیه‌ها"
      },
      {
        metric: "Click-Through Rate",
        metricFa: "نرخ کلیک",
        value: "45%",
        valueFa: "۴۵٪",
        description: "Improvement in recommendation engagement",
        descriptionFa: "بهبود در تعامل با توصیه‌ها"
      },
      {
        metric: "Customer Satisfaction",
        metricFa: "رضایت مشتری",
        value: "4.8/5",
        valueFa: "۴.۸ از ۵",
        description: "Average rating for personalized experience",
        descriptionFa: "میانگین امتیاز برای تجربه شخصی‌سازی‌شده"
      }
    ],
    legacyResults: ["34% revenue increase", "45% improvement in engagement", "4.8/5 customer satisfaction"],
    sections: [
      {
        id: "challenge",
        title: "The Challenge",
        content: "ShopMax Retail, a major e-commerce platform with over 50 million active users, needed to improve their product recommendation capabilities to compete with industry leaders. Their existing system was showing generic recommendations that didn't resonate with individual customers.\n\nKey challenges included:\n- Generic recommendations failing to engage customers\n- Low conversion rates on recommended products\n- Millions of products making it difficult to surface relevant items\n- Need to understand customer preferences across diverse product categories\n- Real-time personalization at scale for millions of concurrent users\n- Balancing exploration of new products with exploitation of known preferences"
      },
      {
        id: "solution",
        title: "Our Solution",
        content: "We developed a state-of-the-art hybrid recommendation system combining collaborative filtering, content-based filtering, and deep learning models to deliver highly personalized product suggestions.\n\nKey components of the solution:\n- **Hybrid Recommendation Engine**: Combining multiple algorithms for optimal performance\n- **Deep Learning Models**: Neural collaborative filtering using user-item interactions\n- **Content-Based Filtering**: NLP models analyzing product descriptions and reviews\n- **Real-Time Personalization**: Sub-100ms latency for dynamic recommendations\n- **Multi-Armed Bandit Algorithms**: Balancing exploration and exploitation\n- **A/B Testing Framework**: Continuously optimizing recommendation strategies\n\nThe system uses various signals to personalize recommendations:\n- Purchase history and browsing behavior\n- Product ratings and reviews sentiment\n- Similar customer preferences (collaborative filtering)\n- Product attributes and category relationships\n- Time-based patterns and seasonal trends\n- Cross-category preferences and complementary products"
      },
      {
        id: "implementation",
        title: "Implementation Process",
        content: "The project was delivered in phases over 7 months:\n\n**Phase 1 (Months 1-2): Data Analysis & Modeling**\n- Analyzed 2 years of customer interaction data\n- Built feature engineering pipelines\n- Developed recommendation algorithms\n- Created evaluation metrics and testing framework\n\n**Phase 2 (Months 3-4): Model Development**\n- Trained deep learning models on user-item interaction data\n- Implemented hybrid recommendation system\n- Optimized models for real-time inference\n- Developed A/B testing infrastructure\n\n**Phase 3 (Months 5-6): Integration & Testing**\n- Integrated with ShopMax's e-commerce platform\n- Conducted extensive A/B testing with live traffic\n- Refined models based on user feedback\n- Optimized performance for high-traffic scenarios\n\n**Phase 4 (Month 7): Deployment & Optimization**\n- Phased rollout to all user segments\n- Monitored performance metrics and user engagement\n- Continuously optimized recommendation algorithms\n- Established ongoing model retraining procedures"
      },
      {
        id: "results",
        title: "Results & Impact",
        content: "The personalized recommendation system delivered outstanding results:\n\n**Quantitative Achievements:**\n- 34% increase in overall revenue driven by recommendations\n- 45% improvement in click-through rates on recommended products\n- 4.8/5 average customer satisfaction rating for personalized experience\n- 28% increase in average order value\n- 22% reduction in cart abandonment rate\n- Sub-100ms recommendation generation time\n\n**User Experience Improvements:**\n- Highly relevant product suggestions matching customer interests\n- Discovery of new products aligned with preferences\n- Seamless integration across homepage, product pages, and checkout\n- Improved search results with personalized ranking\n- Enhanced mobile shopping experience\n\n**Business Impact:**\n- Significant revenue growth through improved conversion rates\n- Higher customer lifetime value from better engagement\n- Competitive advantage in personalized shopping experience\n- Reduced bounce rate and increased session duration\n- Foundation for future personalization initiatives\n\n**Strategic Benefits:**\n- Actionable insights into customer preferences and trends\n- Scalable platform supporting business growth\n- Continuous improvement through A/B testing\n- Model for other personalization use cases (marketing, pricing)\n- Enhanced brand loyalty through better customer experience\n\nThe recommendation system has become a core competitive advantage for ShopMax and serves as a benchmark for e-commerce personalization."
      }
    ],
    pdfUrl: "/uploads/case-studies/shopmax-personalization.pdf"
  },
  {
    title: "AI-Powered Diagnostic Assistant for MedCare",
    titleFa: "دستیار تشخیصی مبتنی بر هوش مصنوعی برای مدکِر",
    slug: "ai-diagnostic-assistant-medcare",
    subtitle: "Medical AI System Improves Diagnostic Accuracy by 23%",
    subtitleFa: "سامانه هوش مصنوعی پزشکی دقت تشخیص را ۲۳٪ بهبود می‌بخشد",
    tags: ["Computer Vision", "Healthcare", "Medical AI"],
    client: "MedCare Hospital Network",
    clientFa: "شبکه بیمارستان‌های مدکِر",
    duration: "12 months",
    industry: "Healthcare",
    industryFa: "بهداشت و درمان",
    description: "Developed an AI-powered diagnostic assistant that analyzes medical imaging and patient data to assist radiologists, improving diagnostic accuracy by 23% and reducing interpretation time by 40%.",
    descriptionFa: "توسعه دستیار تشخیصی مبتنی بر هوش مصنوعی که تصاویر پزشکی و داده‌های بیمار را تحلیل می‌کند تا به رادیولوژیست‌ها کمک کند، دقت تشخیص را ۲۳٪ بهبود بخشید و زمان تفسیر را ۴۰٪ کاهش داد.",
    heroImage: "/uploads/case-study-healthcare-hero.jpg",
    imageUrl: "/uploads/case-study-healthcare.jpg",
    technologies: ["Deep Learning", "Computer Vision", "Medical Imaging", "Python", "PyTorch", "DICOM", "TensorRT", "PACS Integration"],
    results: [
      {
        metric: "Diagnostic Accuracy",
        metricFa: "دقت تشخیص",
        value: "+23%",
        valueFa: "+۲۳٪",
        description: "Improvement in detection accuracy",
        descriptionFa: "بهبود در دقت تشخیص"
      },
      {
        metric: "Interpretation Time",
        metricFa: "زمان تفسیر",
        value: "-40%",
        valueFa: "-۴۰٪",
        description: "Reduction in radiology reading time",
        descriptionFa: "کاهش در زمان خواندن رادیولوژی"
      },
      {
        metric: "Early Detection",
        metricFa: "تشخیص زودهنگام",
        value: "89%",
        valueFa: "۸۹٪",
        description: "Early-stage condition detection rate",
        descriptionFa: "نرخ تشخیص شرایط در مراحل اولیه"
      }
    ],
    legacyResults: ["23% improvement in diagnostic accuracy", "40% reduction in interpretation time", "89% early-stage detection rate"],
    sections: [
      {
        id: "challenge",
        title: "The Challenge",
        content: "MedCare Hospital Network, a large healthcare provider serving over 2 million patients, faced increasing pressure on their radiology department. With growing patient volumes and shortage of radiologists, maintaining high-quality diagnostic standards was becoming challenging.\n\nCritical challenges included:\n- Radiologist workload increasing faster than staffing could keep up\n- Need for faster turnaround times on imaging studies\n- Risk of missed diagnoses due to fatigue or oversight\n- Difficulty detecting subtle abnormalities in early-stage conditions\n- Lack of standardized interpretation protocols across different radiologists\n- Growing backlog of imaging studies awaiting interpretation"
      },
      {
        id: "solution",
        title: "Our Solution",
        content: "We developed an AI-powered diagnostic assistant that analyzes medical imaging studies (X-rays, CT scans, MRIs) and patient data to help radiologists detect abnormalities, prioritize cases, and reduce interpretation time.\n\nKey components of the solution:\n- **Multi-Modal AI Models**: Specialized deep learning models for different imaging modalities\n- **Anomaly Detection**: Identifies potential abnormalities and highlights regions of interest\n- **Severity Scoring**: Quantifies the likelihood and severity of detected conditions\n- **Prioritization Engine**: Automatically triages cases based on urgency\n- **DICOM Integration**: Seamless integration with existing PACS (Picture Archiving and Communication System)\n- **Explainable AI**: Provides visual explanations of AI findings for radiologist review\n\nThe system analyzes various types of medical imaging:\n- Chest X-rays for pneumonia, lung nodules, and other conditions\n- CT scans for detecting tumors, fractures, and vascular issues\n- MRI studies for brain abnormalities and soft tissue analysis\n- Mammography for early breast cancer detection\n- Integration with patient history and lab results for context"
      },
      {
        id: "implementation",
        title: "Implementation Process",
        content: "The project was executed over 12 months with careful attention to regulatory compliance and clinical validation:\n\n**Phase 1 (Months 1-3): Requirements & Regulatory**\n- Conducted clinical workflow analysis\n- Defined diagnostic use cases and success criteria\n- Established FDA compliance and validation protocols\n- Designed integration with existing PACS and EHR systems\n\n**Phase 2 (Months 4-7): Model Development**\n- Collected and curated anonymized medical imaging datasets\n- Developed specialized models for each imaging modality\n- Conducted extensive training and validation with expert radiologists\n- Achieved high accuracy through transfer learning and data augmentation\n\n**Phase 3 (Months 8-10): Clinical Validation**\n- Deployed to pilot sites within MedCare network\n- Conducted retrospective studies comparing AI-assisted vs. standard readings\n- Validated diagnostic accuracy and clinical impact\n- Refined models based on radiologist feedback\n\n**Phase 4 (Months 11-12): Deployment & Training**\n- Rolled out to all MedCare hospital locations\n- Trained radiologists on AI assistant usage and interpretation\n- Established ongoing monitoring and model update procedures\n- Documented workflows for regulatory compliance"
      },
      {
        id: "results",
        title: "Results & Impact",
        content: "The AI diagnostic assistant delivered significant clinical and operational improvements:\n\n**Clinical Achievements:**\n- 23% improvement in overall diagnostic accuracy\n- 40% reduction in average interpretation time per study\n- 89% early-stage condition detection rate, up from 72%\n- 15% reduction in missed diagnoses\n- Enhanced detection of subtle abnormalities\n- More consistent interpretations across different radiologists\n\n**Operational Improvements:**\n- Faster turnaround times on imaging studies\n- Reduced radiologist workload and burnout\n- Better prioritization of urgent cases\n- Automated generation of preliminary reports\n- Integration with existing clinical workflows\n\n**Patient Impact:**\n- Earlier detection leading to better treatment outcomes\n- Faster diagnosis reducing patient anxiety\n- More consistent quality of care across all facilities\n- Improved access to timely radiology services\n- Enhanced patient safety through reduced errors\n\n**Business Impact:**\n- Increased radiology department capacity without additional staffing\n- Reduced liability risk from missed diagnoses\n- Improved hospital reputation and patient satisfaction\n- Foundation for future AI-driven clinical tools\n- Competitive advantage in healthcare innovation\n\nThe AI diagnostic assistant has become an integral tool in MedCare's radiology practice and serves as a model for AI adoption in clinical settings."
      }
    ],
    pdfUrl: "/uploads/case-studies/medcare-diagnostic-assistant.pdf"
  },
  {
    title: "Smart City Traffic Management for MetroCity",
    titleFa: "مدیریت ترافیک شهر هوشمند برای متروسیتی",
    slug: "smart-city-traffic-metrocity",
    subtitle: "IoT and AI System Reduces Traffic Congestion by 32%",
    subtitleFa: "سامانه اینترنت اشیا و هوش مصنوعی ازدحام ترافیک را ۳۲٪ کاهش می‌دهد",
    tags: ["IoT", "Smart Cities", "Traffic Management", "Computer Vision"],
    client: "MetroCity Municipal Government",
    clientFa: "شهرداری متروسیتی",
    duration: "9 months",
    industry: "Smart Cities & Government",
    industryFa: "شهرهای هوشمند و دولت",
    description: "Implemented an intelligent traffic management system using IoT sensors and AI that reduced average commute times by 32% and improved overall traffic flow across the city.",
    descriptionFa: "پیاده‌سازی یک سامانه مدیریت ترافیک هوشمند با استفاده از حسگرهای اینترنت اشیا و هوش مصنوعی که میانگین زمان رفت‌وآمد را ۳۲٪ کاهش داد و جریان ترافیک کلی در سراسر شهر را بهبود بخشید.",
    heroImage: "/uploads/case-study-smartcity-hero.jpg",
    imageUrl: "/uploads/case-study-smartcity.jpg",
    technologies: ["IoT", "Computer Vision", "Edge Computing", "Machine Learning", "Python", "TensorFlow Lite", "MQTT", "Cloud Computing"],
    results: [
      {
        metric: "Traffic Reduction",
        metricFa: "کاهش ترافیک",
        value: "32%",
        valueFa: "۳۲٪",
        description: "Decrease in average commute times",
        descriptionFa: "کاهش در میانگین زمان رفت‌وآمد"
      },
      {
        metric: "Carbon Emissions",
        metricFa: "انتشار کربن",
        value: "28%",
        valueFa: "۲۸٪",
        description: "Reduction in vehicle emissions",
        descriptionFa: "کاهش در انتشارات خودروها"
      },
      {
        metric: "System Uptime",
        metricFa: "آپتایم سامانه",
        value: "99.9%",
        valueFa: "۹۹.۹٪",
        description: "Reliability of traffic management system",
        descriptionFa: "قابلیت اطمینان سامانه مدیریت ترافیک"
      }
    ],
    legacyResults: ["32% reduction in traffic congestion", "28% reduction in carbon emissions", "99.9% system uptime"],
    sections: [
      {
        id: "challenge",
        title: "The Challenge",
        content: "MetroCity, a rapidly growing metropolitan area with 3 million residents, was experiencing severe traffic congestion that was impacting quality of life, economic productivity, and environmental sustainability. Traditional traffic management approaches were insufficient for the city's complex transportation network.\n\nKey challenges included:\n- Increasing vehicle volumes outpacing road infrastructure capacity\n- Inefficient traffic signal timing causing unnecessary delays\n- Lack of real-time visibility into traffic conditions\n- Inability to respond dynamically to traffic incidents\n- High carbon emissions from idling vehicles\n- Growing public frustration with commute times\n- Limited budget for infrastructure expansion"
      },
      {
        id: "solution",
        title: "Our Solution",
        content: "We developed a comprehensive smart traffic management system combining IoT sensors, computer vision, and AI optimization to dynamically manage traffic flow in real-time across the entire city.\n\nKey components of the solution:\n- **IoT Sensor Network**: Deployed thousands of cameras and sensors across major intersections\n- **Computer Vision System**: Real-time vehicle detection, counting, and speed monitoring\n- **AI Traffic Optimization**: Machine learning models optimizing signal timing in real-time\n- **Edge Computing**: Local processing at intersections for low-latency decisions\n- **Predictive Analytics**: Forecasting traffic patterns based on historical data and events\n- **Centralized Dashboard**: City-wide traffic monitoring and management platform\n\nThe system monitors and optimizes:\n- Traffic volume and flow rates at intersections\n- Vehicle queue lengths and waiting times\n- Real-time incident detection and response\n- Emergency vehicle priority routing\n- Pedestrian and cyclist safety considerations\n- Public transportation integration\n- Adaptive signal timing based on current conditions"
      },
      {
        id: "implementation",
        title: "Implementation Process",
        content: "The project was executed in phases over 9 months:\n\n**Phase 1 (Months 1-3): Infrastructure & Hardware**\n- Installed IoT sensors and cameras at 500+ intersections\n- Deployed edge computing devices at key locations\n- Established network connectivity and data pipelines\n- Set up cloud infrastructure for centralized processing\n\n**Phase 2 (Months 4-6): AI Development & Training**\n- Collected 6 months of traffic data for model training\n- Developed computer vision models for vehicle detection\n- Built traffic optimization algorithms\n- Created predictive models for traffic forecasting\n\n**Phase 3 (Months 7-8): Integration & Testing**\n- Integrated with existing traffic management systems\n- Conducted extensive testing in controlled environments\n- Validated optimization algorithms with real traffic data\n- Performed safety and reliability testing\n\n**Phase 4 (Month 9): Deployment & Optimization**\n- Phased rollout starting with high-traffic corridors\n- Monitored performance and fine-tuned algorithms\n- Trained traffic operations staff on new system\n- Established 24/7 monitoring and maintenance procedures"
      },
      {
        id: "results",
        title: "Results & Impact",
        content: "The smart traffic management system delivered transformative results:\n\n**Traffic Improvements:**\n- 32% reduction in average commute times\n- 28% decrease in traffic congestion during peak hours\n- 45% reduction in time spent idling at intersections\n- 22% improvement in overall traffic flow efficiency\n- Faster response to incidents and emergencies\n\n**Environmental Impact:**\n- 28% reduction in vehicle carbon emissions\n- 35% decrease in fuel consumption\n- Improved air quality in high-traffic areas\n- Support for sustainability goals\n\n**Economic Benefits:**\n- Reduced economic losses from traffic delays\n- Improved productivity from shorter commute times\n- Lower infrastructure costs through optimized existing assets\n- Foundation for future smart city initiatives\n\n**Public Benefits:**\n- Improved quality of life for residents\n- Enhanced public safety with better incident response\n- Better accessibility for pedestrians and cyclists\n- Real-time traffic information for commuters\n- Higher satisfaction with city services\n\n**Operational Excellence:**\n- 99.9% system uptime ensuring reliable service\n- Centralized monitoring enabling proactive management\n- Data-driven insights for future infrastructure planning\n- Scalable platform supporting city growth\n- Model for other smart city applications\n\nThe smart traffic management system has become a cornerstone of MetroCity's smart city initiative and serves as a best-practice example for urban traffic optimization."
      }
    ],
    pdfUrl: "/uploads/case-studies/metrocity-traffic-management.pdf"
  }
];

// <<-- داده‌های جدید برای مقالات تحقیقاتی
const researchPosts = [
  {
    title: "Neural Architecture Search for Efficient Computer Vision Models",
    titleFa: "جستجوی معماری عصبی برای مدل‌های کارآمد بینایی کامپیوتر",
    slug: "neural-architecture-search-efficient-cv",
    summary:
      "We present a novel approach to neural architecture search that reduces compute while maintaining state-of-the-art performance in computer vision tasks.",
    summaryFa:
      "ما یک رویکرد نوین برای جستجوی معماری عصبی ارائه می‌دهیم که محاسبات را کاهش می‌دهد در حالی که عملکرد پیشرفته را در وظایف بینایی کامپیوتر حفظ می‌کند.",
    content:
      "Detailed manuscript content for Neural Architecture Search for Efficient Computer Vision Models. This content can hold the full paper exported from the CMS.",
    contentFa:
      "محتوای کامل مقاله برای جستجوی معماری عصبی برای مدل‌های کارآمد بینایی کامپیوتر. این محتوا می‌تواند مقاله کامل صادر شده از CMS را شامل شود.",
    authors: ["Dr. Sarah Chen", "Marcus Rodriguez", "Dr. Aisha Patel"],
    journal: "Nature Machine Intelligence",
    publishedAt: new Date("2024-01-15"),
    citations: 127,
    category: "Computer Vision",
    tags: ["NAS", "Optimization", "CNN"],
    status: "published",
    mainImageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1400&q=80",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    readTimeMinutes: 12,
    downloadUrl: "https://example.com/papers/nas-efficient-cv.pdf",
    pdfUrl: "https://example.com/papers/nas-efficient-cv.pdf",
    doi: "10.1234/hekfa.2024.001",
    sections: [
      {
        id: "abstract",
        title: "Abstract",
        content:
          "Our NAS pipeline introduces a latency-aware controller that trims FLOPs by 38% while preserving accuracy across ImageNet, COCO, and ADE20K benchmarks. The method is hardware-aware and deploys comfortably on edge GPUs.",
        subsections: [],
      },
      {
        id: "introduction",
        title: "Introduction",
        content:
          "Edge deployments demand compact architectures. We motivate a constrained search space paired with a differentiable evaluator that understands hardware budgets.",
        subsections: [
          { id: "motivation", title: "Motivation", content: "Discusses the sustainability and deployment constraints that shaped the search strategy." },
          { id: "contributions", title: "Key Contributions", content: "Highlights controller design, search efficiency, and transferability of discovered cells." },
        ],
      },
      {
        id: "methodology",
        title: "Methodology",
        content:
          "We combine a Gumbel-softmax controller with meta-learning warm starts. Latency tables are captured from Jetson Orin hardware.",
        subsections: [
          { id: "search-space", title: "Search Space", content: "Multi-branch cell definitions with depthwise separable ops and squeeze-excite units." },
          { id: "objective", title: "Multi-Objective Loss", content: "Balanced between accuracy, latency, and energy cost." },
        ],
      },
      {
        id: "results",
        title: "Results & Discussion",
        content:
          "Across three public datasets we achieve up to 42% faster inference while retaining >99% baseline accuracy.",
        subsections: [
          { id: "benchmarks", title: "Benchmarks", content: "ImageNet, COCO detection, ADE20K segmentation." },
          { id: "ablation", title: "Ablation Studies", content: "Controller stability, search steps, and transfer learning." },
        ],
      },
    ],
    references: [
      "Elsken, T. et al. Neural Architecture Search: A Survey. JMLR, 2019.",
      "Tan, M. & Le, Q. EfficientNet: Rethinking Model Scaling. ICML, 2019.",
    ],
  },
  {
    title: "Retrieval-Augmented Generation for Domain-Specific Applications",
    titleFa: "تولید تقویت‌شده با بازیابی برای کاربردهای حوزه‌محور",
    slug: "rag-for-domain-specific-apps",
    summary:
      "Optimizing RAG systems for specialized domains, demonstrating significant gains in factual accuracy and grounding.",
    summaryFa:
      "بهینه‌سازی سامانه‌های RAG برای حوزه‌های تخصصی، نشان‌دهنده پیشرفت‌های قابل‌توجه در دقت واقعی و پایه‌گذاری.",
    content:
      "Full manuscript for Retrieval-Augmented Generation for Domain-Specific Applications. Includes architectural diagrams, datasets, and evaluation plan.",
    contentFa:
      "متن کامل مقاله برای تولید تقویت‌شده با بازیابی برای کاربردهای حوزه‌محور. شامل نمودارهای معماری، مجموعه‌داده‌ها و برنامه ارزیابی.",
    authors: ["Dr. Aisha Patel", "James Thompson"],
    journal: "ICML 2024",
    publishedAt: new Date("2024-02-28"),
    citations: 89,
    category: "NLP",
    tags: ["RAG", "LLM", "Enterprise AI"],
    status: "published",
    mainImageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    coverImage: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
    readTimeMinutes: 10,
    downloadUrl: "https://example.com/papers/rag-domain-apps.pdf",
    pdfUrl: "https://example.com/papers/rag-domain-apps.pdf",
    doi: "10.1234/hekfa.2024.002",
    sections: [
      {
        id: "abstract",
        title: "Abstract",
        content:
          "We benchmark domain-adapted RAG pipelines on finance and healthcare corpora, achieving 21% higher factual accuracy compared to baseline GPT-4 retrieval approaches.",
        subsections: [],
      },
      {
        id: "introduction",
        title: "Introduction",
        content:
          "Domain-specific corpora introduce terminology drift. We motivate retrieval tuning, query rewriting, and answer calibration strategies.",
        subsections: [
          { id: "problem", title: "Problem Statement", content: "Highlight hallucination impact on regulated industries." },
        ],
      },
      {
        id: "methodology",
        title: "Methodology",
        content:
          "Pipeline includes adaptive retrievers, rerankers, and prompt orchestration modules.",
        subsections: [
          { id: "retriever", title: "Retriever Training", content: "Dense passage retriever fine-tuned with hard negatives." },
          { id: "prompting", title: "Prompt Orchestration", content: "Instruction templates with compliance guardrails." },
        ],
      },
      {
        id: "evaluation",
        title: "Evaluation",
        content:
          "We introduce the Regulatory Q&A dataset and use human raters to judge compliance.",
        subsections: [{ id: "metrics", title: "Metrics", content: "Faithfulness, grounding score, response latency." }],
      },
    ],
    references: [
      "Lewis, P. et al. Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. NeurIPS, 2020.",
      "Shuster, K. et al. Retrieval-Augmented Multimodal Generation. arXiv, 2023.",
    ],
  },
  {
    title: "Immersive AI Research Showcase for Digital Experience Teams",
    titleFa: "نمایشگاه تحقیقاتی غوطه‌ور هوش مصنوعی برای تیم‌های تجربه دیجیتال",
    slug: "immersive-ai-research-showcase",
    summary:
      "A case study on building neural research hubs that blend narrative storytelling with interactive data visualization for enterprise design teams.",
    summaryFa:
      "یک مطالعه موردی درباره ساخت مراکز تحقیقاتی عصبی که داستان‌گویی روایی را با تجسم داده تعاملی برای تیم‌های طراحی سازمانی ترکیب می‌کنند.",
    content:
      "Comprehensive walkthrough of the Immersive AI Research Showcase initiative, tailored for showcasing R&D to enterprise stakeholders.",
    contentFa:
      "راهنمای جامع ابتکار نمایشگاه تحقیقاتی غوطه‌ور هوش مصنوعی، طراحی‌شده برای نمایش تحقیق و توسعه به ذینفعان سازمانی.",
    authors: ["Leila Farahani", "Dr. David Miller"],
    journal: "Design Systems Quarterly",
    publishedAt: new Date("2024-05-30"),
    citations: 34,
    category: "Generative AI",
    tags: ["Research Communication", "WebGL", "Data Storytelling"],
    status: "published",
    mainImageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    readTimeMinutes: 8,
    downloadUrl: "https://example.com/papers/immersive-ai-showcase.pdf",
    pdfUrl: "https://example.com/papers/immersive-ai-showcase.pdf",
    doi: "10.1234/hekfa.2024.003",
    sections: [
      {
        id: "abstract",
        title: "Abstract",
        content:
          "We describe a modular content system that lets R&D teams publish interactive showcases with synchronized design assets and research copy.",
        subsections: [],
      },
      {
        id: "storytelling",
        title: "Narrative Storytelling System",
        content:
          "Describes the article reader template, scroll-driven narratives, and integration with CMS components.",
        subsections: [
          {
            id: "layout-system",
            title: "Layout Foundations",
            content: "Two-column layout, sticky navigation, and dynamic TOC logic.",
          },
        ],
      },
      {
        id: "implementation",
        title: "Implementation",
        content:
          "Details the React + Tailwind architecture, shared templates, and backend schema required to power the experience.",
        subsections: [
          {
            id: "data-modeling",
            title: "Data Modeling",
            content: "Sections, subsections, and references stored per article for dynamic rendering.",
          },
          {
            id: "seeding",
            title: "Sample Data",
            content: "Seeder entries ensure showcases work end-to-end during design reviews.",
          },
        ],
      },
    ],
    references: [
      "Henderson, M. et al. Communicating AI Research to Enterprise Teams. DSConf, 2023.",
      "Patel, A. & Miller, D. Immersive Documentation Systems. SIGDOC, 2022.",
    ],
  },
  {
    title: "Continual Learning Pipelines for Streaming Sensor Data",
    titleFa: "پایپلاین‌های یادگیری مستمر برای داده‌های جریانی حسگر",
    slug: "continual-learning-streaming-sensors",
    summary:
      "We describe an architecture for updating models on streaming IoT and industrial telemetry without catastrophic forgetting.",
    summaryFa:
      "ما معماری‌ای برای به‌روزرسانی مدل‌ها روی داده‌های جریانی اینترنت اشیا و تله‌متری صنعتی بدون فراموشی فاجعه‌بار توصیف می‌کنیم.",
    content:
      "Full manuscript outlining the data ingestion, replay buffers, and evaluation benchmarks used for continual learning in production.",
    contentFa:
      "متن کامل مقاله شامل شرح جذب داده، بافرهای بازپخش و معیارهای ارزیابی مورد استفاده برای یادگیری مستمر در تولید.",
    authors: ["Nima Hosseini", "Dr. Carla Nguyen"],
    journal: "NeurIPS 2024 Workshop on Lifelong Learning",
    publishedAt: new Date("2024-03-10"),
    citations: 41,
    category: "Robotics",
    tags: ["Continual Learning", "IoT", "Streaming"],
    status: "published",
    mainImageUrl: "https://images.unsplash.com/photo-1512428209984-5e0afcfc2bb3?auto=format&fit=crop&w=1400&q=80",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    coverImage: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=900&q=80",
    readTimeMinutes: 11,
    downloadUrl: "https://example.com/papers/continual-learning-streaming.pdf",
    pdfUrl: "https://example.com/papers/continual-learning-streaming.pdf",
    doi: "10.1234/hekfa.2024.004",
    sections: [],
    references: [],
  },
  {
    title: "Latency-Aware Speech Models for Edge Devices",
    titleFa: "مدل‌های گفتار آگاه از تأخیر برای دستگاه‌های لبه",
    slug: "latency-aware-speech-models-edge",
    summary:
      "Deploying streaming ASR with sub-150ms latency budgets on low-power hardware.",
    summaryFa:
      "استقرار ASR جریانی با بودجه تأخیر کمتر از ۱۵۰ میلی‌ثانیه روی سخت‌افزار کم‌مصرف.",
    content:
      "Technical report covering model compression, quantization, and streaming inference for speech models.",
    contentFa:
      "گزارش فنی شامل فشرده‌سازی مدل، کوانتیزاسیون و استنتاج جریانی برای مدل‌های گفتار.",
    authors: ["Dr. Reza Alavi", "Maria Gonzalez"],
    journal: "Interspeech 2024",
    publishedAt: new Date("2024-04-22"),
    citations: 23,
    category: "Computer Vision",
    tags: ["ASR", "Edge AI", "Optimization"],
    status: "published",
    mainImageUrl: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?auto=format&fit=crop&w=1400&q=80",
    heroImage: "https://images.unsplash.com/photo-1516747773445-e2c2c737af64?auto=format&fit=crop&w=1400&q=80",
    coverImage: "https://images.unsplash.com/photo-1512427691650-1e0c2f9a81b3?auto=format&fit=crop&w=900&q=80",
    readTimeMinutes: 9,
    downloadUrl: "https://example.com/papers/latency-aware-speech.pdf",
    pdfUrl: "https://example.com/papers/latency-aware-speech.pdf",
    doi: "10.1234/hekfa.2024.005",
    sections: [],
    references: [],
  },
  {
    title: "Graph Neural Networks for Fraud Detection at Scale",
    titleFa: "شبکه‌های عصبی گراف برای تشخیص تقلب در مقیاس",
    slug: "gnn-fraud-detection-scale",
    summary:
      "A production deployment of GNN-based fraud detection for a global payments network.",
    summaryFa:
      "استقرار تولیدی تشخیص تقلب مبتنی بر GNN برای یک شبکه پرداخت جهانی.",
    content:
      "System design and experimental results for using heterogeneous GNNs on transaction graphs.",
    contentFa:
      "طراحی سامانه و نتایج آزمایشی برای استفاده از GNN‌های ناهمگن روی گراف‌های تراکنش.",
    authors: ["Michael Lee", "Dr. Farah Omidi"],
    journal: "KDD 2024",
    publishedAt: new Date("2024-05-05"),
    citations: 64,
    category: "NLP",
    tags: ["GNN", "Fraud Detection", "Fintech"],
    status: "published",
    mainImageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=1400&q=80",
    heroImage: "https://images.unsplash.com/photo-1523287562758-66c7fc58967a?auto=format&fit=crop&w=1400&q=80",
    coverImage: "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&w=900&q=80",
    readTimeMinutes: 13,
    downloadUrl: "https://example.com/papers/gnn-fraud-detection.pdf",
    pdfUrl: "https://example.com/papers/gnn-fraud-detection.pdf",
    doi: "10.1234/hekfa.2024.006",
    sections: [],
    references: [],
  },
  {
    title: "Multi-Modal Foundation Models for Industrial Inspection",
    titleFa: "مدل‌های پایه چندوجهی برای بازرسی صنعتی",
    slug: "multimodal-foundation-models-inspection",
    summary:
      "Combining vision and telemetry signals for zero-shot defect classification.",
    summaryFa:
      "ترکیب سیگنال‌های بینایی و تله‌متری برای طبقه‌بندی عیب بدون نمونه.",
    content:
      "Pretraining strategy, model architecture, and downstream evaluation for industrial inspection.",
    contentFa:
      "استراتژی پیش‌آموزش، معماری مدل و ارزیابی پایین‌دستی برای بازرسی صنعتی.",
    authors: ["Sara Mohammadi", "Dr. Jonas Richter"],
    journal: "CVPR 2024 Workshop",
    publishedAt: new Date("2024-06-18"),
    citations: 18,
    category: "Generative AI",
    tags: ["Foundation Models", "Industry 4.0"],
    status: "published",
    mainImageUrl: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1400&q=80",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    coverImage: "https://images.unsplash.com/photo-1517245444553-4d8368a62fe0?auto=format&fit=crop&w=900&q=80",
    readTimeMinutes: 14,
    downloadUrl: "https://example.com/papers/multimodal-inspection.pdf",
    pdfUrl: "https://example.com/papers/multimodal-inspection.pdf",
    doi: "10.1234/hekfa.2024.007",
    sections: [],
    references: [],
  },
  {
    title: "Safety Guardrails for Generative AI in Regulated Industries",
    titleFa: "حفاظ‌های ایمنی برای هوش مصنوعی مولد در صنایع تنظیم‌شده",
    slug: "safety-guardrails-generative-ai",
    summary:
      "Policy, tooling, and evaluation frameworks for deploying generative AI safely in finance and healthcare.",
    summaryFa:
      "سیاست‌ها، ابزارها و چارچوب‌های ارزیابی برای استقرار ایمن هوش مصنوعی مولد در مالی و بهداشت.",
    content:
      "Blueprint for guardrail layers including prompt filtering, output classifiers, and human-in-the-loop review.",
    contentFa:
      "نقشه راه برای لایه‌های حفاظ شامل فیلتر کردن اعلان، طبقه‌بندی‌کننده‌های خروجی و بازبینی انسان در حلقه.",
    authors: ["Dr. Arash Kamangar", "Emily Carter"],
    journal: "AAAI 2024",
    publishedAt: new Date("2024-07-02"),
    citations: 52,
    category: "Robotics",
    tags: ["Safety", "Governance", "Generative AI"],
    status: "published",
    mainImageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80",
    heroImage: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80",
    coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    readTimeMinutes: 15,
    downloadUrl: "https://example.com/papers/safety-guardrails-genai.pdf",
    pdfUrl: "https://example.com/papers/safety-guardrails-genai.pdf",
    doi: "10.1234/hekfa.2024.008",
    sections: [],
    references: [],
  },
  {
    title: "Energy-Efficient LLM Serving with Dynamic Batching",
    titleFa: "سرویس‌دهی کم‌مصرف LLM با دسته‌بندی پویا",
    slug: "energy-efficient-llm-serving-dynamic-batching",
    summary:
      "A production study on reducing energy costs of LLM inference with dynamic batching and adaptive routing.",
    summaryFa:
      "یک مطالعه تولیدی درباره کاهش هزینه‌های انرژی استنتاج LLM با دسته‌بندی پویا و مسیریابی تطبیقی.",
    content:
      "Engineering report describing scheduler design, GPU utilization, and latency trade-offs.",
    contentFa:
      "گزارش مهندسی شامل شرح طراحی زمان‌بند، بهره‌وری GPU و معاوضه‌های تأخیر.",
    authors: ["Reza Alavi", "Dr. Lauren Scott"],
    journal: "Systems for ML 2024",
    publishedAt: new Date("2024-08-11"),
    citations: 15,
    category: "Computer Vision",
    tags: ["LLM", "Serving", "Efficiency"],
    status: "published",
    mainImageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    readTimeMinutes: 10,
    downloadUrl: "https://example.com/papers/energy-efficient-llm-serving.pdf",
    pdfUrl: "https://example.com/papers/energy-efficient-llm-serving.pdf",
    doi: "10.1234/hekfa.2024.009",
    sections: [],
    references: [],
  },
  {
    title: "Explainable Anomaly Detection for Industrial Time Series",
    titleFa: "تشخیص ناهنجاری تفسیرپذیر برای سری‌های زمانی صنعتی",
    slug: "xai-anomaly-detection-industrial-timeseries",
    summary:
      "Interpretable anomaly detection models that help operators understand root causes in sensor networks.",
    summaryFa:
      "مدل‌های تشخیص ناهنجاری تفسیرپذیر که به اپراتورها کمک می‌کنند علل ریشه‌ای را در شبکه‌های حسگر درک کنند.",
    content:
      "Describes SHAP-based explanations, visual dashboards, and integration into operator workflows.",
    contentFa:
      "شرح توضیحات مبتنی بر SHAP، داشبوردهای بصری و یکپارچه‌سازی در گردش کار اپراتور.",
    authors: ["Dr. Laleh Rahimi", "Omar Haddad"],
    journal: "Time Series Workshop 2024",
    publishedAt: new Date("2024-09-05"),
    citations: 19,
    category: "NLP",
    tags: ["Anomaly Detection", "Explainability"],
    status: "published",
    mainImageUrl: "https://images.unsplash.com/photo-1505740106531-4243f3831c78?auto=format&fit=crop&w=1400&q=80",
    heroImage: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80",
    coverImage: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
    readTimeMinutes: 9,
    downloadUrl: "https://example.com/papers/xai-anomaly-detection.pdf",
    pdfUrl: "https://example.com/papers/xai-anomaly-detection.pdf",
    doi: "10.1234/hekfa.2024.010",
    sections: [],
    references: [],
  },
];

const events = [
  {
    title: 'Global AI Summit 2025',
    titleFa: 'همایش جهانی هوش مصنوعی ۲۰۲۵',
    date: new Date('2025-11-20'),
    location: 'San Francisco, USA',
    locationFa: 'سان‌فرانسیسکو، ایالات متحده آمریکا',
    description:
      'Join us at the largest AI conference of the year. Visit our booth to see live demos of our latest innovations.',
    descriptionFa:
      'در بزرگ‌ترین کنفرانس هوش مصنوعی سال شرکت کنید. به غرفه ما سر بزنید و نسخه‌های نمایشی زنده آخرین نوآوری‌های ما را ببینید.',
    boothNumber: 'A-42',
    registrationUrl: 'https://example.com/glais2025'
  },
  {
    title: 'Tech Innovate Europe',
    titleFa: 'تِک اینوِیت اروپا',
    date: new Date('2026-02-10'),
    location: 'Berlin, Germany',
    locationFa: 'برلین، آلمان',
    description:
      'Hekfa AI will be showcasing its new computer vision platform. We are looking forward to connecting with European partners.',
    descriptionFa:
      'هکفا AI پلتفرم جدید بینایی کامپیوتر خود را معرفی خواهد کرد. مشتاق دیدار و همکاری با شرکای اروپایی هستیم.',
    boothNumber: 'Hall 3, Booth 118',
    registrationUrl: 'https://example.com/tie2026'
  }
];

// Intelligence/Solutions data for "Powered by Intelligence" section
const intelligenceItems = [
  {
    title: "Computer Vision",
    titleFa: "بینایی کامپیوتر",
    slug: "computer-vision",
    subtitle: "AI Solutions",
    subtitleFa: "راه‌حل‌های هوش مصنوعی",
    heroDescription: "Advanced image recognition and video analytics for security, automation, and quality control.",
    heroDescriptionFa: "تشخیص پیشرفته تصویر و تحلیل ویدیو برای امنیت، خودکارسازی و کنترل کیفیت.",
    animationData: "eye-blinking",
    gradient: "from-blue-500 to-cyan-500",
    whatItIs: {
      title: "What Is Computer Vision?",
      titleFa: "بینایی کامپیوتر چیست؟",
      content: "Computer Vision is a field of artificial intelligence that enables machines to interpret and understand visual information from the world around us. By processing images and videos through deep learning algorithms, computer vision systems can identify objects, recognize patterns, track movement, and extract meaningful insights from visual data.\n\nOur computer vision solutions leverage state-of-the-art convolutional neural networks (CNNs) and transformer architectures to achieve human-level or superior accuracy in visual recognition tasks. Whether it's detecting faces in security systems, identifying defects in manufacturing, or analyzing medical imagery, our computer vision technology transforms raw pixels into actionable intelligence.",
      contentFa: "بینایی کامپیوتر شاخه‌ای از هوش مصنوعی است که به ماشین‌ها امکان می‌دهد اطلاعات بصری دنیای اطراف را درک و تفسیر کنند. با پردازش تصاویر و ویدیوها به کمک الگوریتم‌های یادگیری عمیق، سامانه‌های بینایی کامپیوتر می‌توانند اشیا را شناسایی کنند، الگوها را تشخیص دهند، حرکت را ردیابی کرده و بینش‌های معناداری از داده‌های بصری استخراج کنند.\n\nراه‌حل‌های بینایی کامپیوتر هکفا با تکیه بر شبکه‌های عصبی کانولوشنی (CNN) و معماری‌های ترنسفورمر، دقتی در سطح یا فراتر از انسان در وظایف تشخیص بصری ارائه می‌دهند. چه در تشخیص چهره در سامانه‌های امنیتی، چه در شناسایی عیوب در تولید، و چه در تحلیل تصاویر پزشکی، فناوری ما پیکسل‌های خام را به بینشی عملی تبدیل می‌کند."
    },
    howItWorks: {
      title: "How It Works",
      titleFa: "نحوه کار",
      content: "Our computer vision systems follow a sophisticated multi-stage pipeline that converts visual data into actionable insights.",
      contentFa: "سامانه‌های بینایی کامپیوتر ما از یک پایپلاین چندمرحله‌ای پیشرفته پیروی می‌کنند که داده‌های بصری را به بینش‌های قابل‌اقدام تبدیل می‌کند.",
      steps: [
        {
          number: 1,
          title: "Image Acquisition & Preprocessing",
          titleFa: "دریافت و پیش‌پردازش تصویر",
          description: "High-resolution images or video streams are captured using cameras or imaging sensors. Raw data is preprocessed to normalize lighting, reduce noise, and optimize contrast for optimal analysis.",
          descriptionFa: "تصاویر یا ویدیوهای باکیفیت توسط دوربین‌ها و حسگرهای تصویری ثبت می‌شوند. داده خام برای یکنواخت‌سازی نور، کاهش نویز و بهینه‌سازی کنتراست پیش‌پردازش می‌شود تا برای تحلیل آماده گردد."
        },
        {
          number: 2,
          title: "Feature Extraction",
          titleFa: "استخراج ویژگی‌ها",
          description: "Deep neural networks analyze the preprocessed images to extract hierarchical features—from low-level edges and textures to high-level semantic objects and relationships.",
          descriptionFa: "شبکه‌های عصبی عمیق تصاویر پیش‌پردازش‌شده را تحلیل می‌کنند تا ویژگی‌های سلسله‌مراتبی را استخراج کنند؛ از لبه‌ها و بافت‌های سطح پایین تا اشیا و روابط معنایی سطح بالا."
        },
        {
          number: 3,
          title: "Object Detection & Classification",
          titleFa: "شناسایی و طبقه‌بندی اشیا",
          description: "Advanced detection algorithms identify and localize objects of interest within the image, then classify them into predefined categories with confidence scores.",
          descriptionFa: "الگوریتم‌های پیشرفته، اشیای موردنظر را در تصویر شناسایی و مکان‌یابی کرده و آن‌ها را با امتیاز اطمینان در دسته‌های ازپیش‌تعریف‌شده طبقه‌بندی می‌کنند."
        },
        {
          number: 4,
          title: "Intelligence & Decision Making",
          titleFa: "هوشمندی و تصمیم‌گیری",
          description: "The extracted visual information is combined with business logic to trigger automated actions, generate alerts, or provide insights for human decision-makers.",
          descriptionFa: "اطلاعات بصری استخراج‌شده با منطق کسب‌وکار ترکیب می‌شود تا اقدام‌های خودکار، هشدارها و بینش‌های موردنیاز تصمیم‌گیران انسانی را فراهم کند."
        }
      ]
    },
    whyItMatters: {
      title: "Why Computer Vision Matters",
      titleFa: "چرا بینایی کامپیوتر اهمیت دارد",
      content: "Computer vision technology is revolutionizing industries by enabling automated visual inspection, enhanced security, and data-driven decision making at unprecedented speed and scale.",
      contentFa: "فناوری بینایی کامپیوتر با فراهم کردن بازرسی خودکار بصری، افزایش امنیت و تصمیم‌گیری داده‌محور با سرعت و مقیاسی بی‌سابقه، صنایع را متحول کرده است.",
      benefits: [
        {
          icon: "Eye",
          title: "99.7% Accuracy",
          titleFa: "دقت ۹۹.۷٪",
          description: "Our state-of-the-art models achieve human-level or superior accuracy in visual recognition tasks, reducing false positives and improving reliability.",
          descriptionFa: "مدل‌های پیشرفته ما در وظایف تشخیص بصری به دقتی در سطح یا فراتر از انسان دست می‌یابند و با کاهش خطاهای مثبت کاذب، قابلیت اطمینان را افزایش می‌دهند."
        },
        {
          icon: "Zap",
          title: "Real-Time Processing",
          titleFa: "پردازش بلادرنگ",
          description: "Process thousands of images per second with optimized inference pipelines, enabling real-time monitoring and immediate response to visual events.",
          descriptionFa: "پردازش هزاران تصویر در ثانیه با پایپلاین‌های استنتاج بهینه‌شده، امکان پایش بلادرنگ و واکنش فوری به رویدادهای بصری را فراهم می‌کند."
        },
        {
          icon: "TrendingUp",
          title: "Scalable Automation",
          titleFa: "خودکارسازی مقیاس‌پذیر",
          description: "Replace manual inspection with automated systems that work 24/7 without fatigue, dramatically reducing operational costs and increasing throughput.",
          descriptionFa: "جایگزینی بازرسی دستی با سامانه‌های خودکاری که ۲۴ ساعته و بدون خستگی کار می‌کنند، هزینه‌های عملیاتی را به‌طور چشمگیری کاهش داده و بهره‌وری را افزایش می‌دهد."
        },
        {
          icon: "Shield",
          title: "Enhanced Security",
          titleFa: "امنیت تقویت‌شده",
          description: "Advanced facial recognition and anomaly detection capabilities strengthen security infrastructure and protect critical assets.",
          descriptionFa: "قابلیت‌های پیشرفته تشخیص چهره و کشف ناهنجاری‌ها، زیرساخت‌های امنیتی را تقویت کرده و از دارایی‌های حیاتی محافظت می‌کنند."
        }
      ]
    },
    comparison: {
      title: "Traditional vs AI-Powered Computer Vision",
      titleFa: "مقایسه روش‌های سنتی و بینایی کامپیوتر مبتنی بر هوش مصنوعی",
      subtitle: "See how AI transforms visual analysis capabilities",
      subtitleFa: "ببینید هوش مصنوعی چگونه توان تحلیل بصری را متحول می‌کند",
      rows: [
        {
          feature: "Accuracy",
          featureFa: "دقت",
          traditional: "70-85% (human inspection)",
          traditionalFa: "۷۰–۸۵٪ (بازرسی انسانی)",
          withAI: "99.7% (AI-powered detection)",
          withAIFa: "۹۹.۷٪ (تشخیص مبتنی بر هوش مصنوعی)"
        },
        {
          feature: "Processing Speed",
          featureFa: "سرعت پردازش",
          traditional: "Minutes per image",
          traditionalFa: "دقایقی برای هر تصویر",
          withAI: "Milliseconds per image",
          withAIFa: "میلی‌ثانیه برای هر تصویر"
        },
        {
          feature: "Scale",
          featureFa: "مقیاس",
          traditional: "Limited by human capacity",
          traditionalFa: "محدود به توان نیروی انسانی",
          withAI: "Unlimited parallel processing",
          withAIFa: "پردازش موازی نامحدود"
        },
        {
          feature: "Consistency",
          featureFa: "ثبات عملکرد",
          traditional: "Variable (affected by fatigue)",
          traditionalFa: "متغیر (متأثر از خستگی نیروی انسانی)",
          withAI: "100% consistent 24/7",
          withAIFa: "ثبات ۱۰۰٪ در تمام ساعات شبانه‌روز"
        },
        {
          feature: "Cost",
          featureFa: "هزینه",
          traditional: "High (labor-intensive)",
          traditionalFa: "زیاد (نیازمند نیروی انسانی)",
          withAI: "Low (automated systems)",
          withAIFa: "کم (سامانه‌های خودکار)"
        }
      ]
    },
    useCases: {
      title: "Real-World Applications",
      titleFa: "کاربردهای دنیای واقعی",
      subtitle: "Computer vision technology is transforming industries worldwide",
      subtitleFa: "فناوری بینایی کامپیوتر در حال دگرگون کردن صنایع در سراسر جهان است",
      cases: [
        {
          icon: "Camera",
          title: "Security & Surveillance",
          titleFa: "امنیت و نظارت",
          description: "Automated threat detection, facial recognition for access control, and real-time monitoring of sensitive areas.",
          descriptionFa: "تشخیص خودکار تهدیدها، شناسایی چهره برای کنترل دسترسی و پایش بلادرنگ فضاهای حساس."
        },
        {
          icon: "Factory",
          title: "Quality Control",
          titleFa: "کنترل کیفیت",
          description: "Automated defect detection in manufacturing, ensuring product quality and reducing waste.",
          descriptionFa: "تشخیص خودکار عیوب در خطوط تولید برای تضمین کیفیت محصول و کاهش ضایعات."
        },
        {
          icon: "HeartPulse",
          title: "Medical Imaging",
          titleFa: "تصویربرداری پزشکی",
          description: "Assisting radiologists in detecting anomalies, analyzing X-rays, MRIs, and CT scans with high precision.",
          descriptionFa: "کمک به رادیولوژیست‌ها در شناسایی ناهنجاری‌ها و تحلیل دقیق تصاویر X-Ray، MRI و CT."
        },
        {
          icon: "Car",
          title: "Autonomous Vehicles",
          titleFa: "خودروهای خودران",
          description: "Object detection, lane tracking, and obstacle avoidance systems for self-driving cars.",
          descriptionFa: "تشخیص اشیا، ردیابی خطوط و اجتناب از موانع برای سامانه‌های خودروی خودران."
        }
      ]
    },
    cta: {
      title: "Ready to Transform Your Visual Data?",
      titleFa: "آماده تحول در داده‌های بصری خود هستید؟",
      description: "Discover how our computer vision solutions can automate your processes, enhance security, and drive innovation in your industry.",
      descriptionFa: "ببینید چگونه راه‌حل‌های بینایی کامپیوتر ما می‌تواند فرآیندهای شما را خودکار کند، امنیت را ارتقا دهد و نوآوری را در صنعت شما به پیش براند.",
      buttonText: "Explore Computer Vision Solutions",
      buttonTextFa: "کاوش راه‌حل‌های بینایی کامپیوتر",
      buttonLink: "/projects"
    },
    order: 1,
    isFeatured: true
  },
  {
    title: "Neural Networks",
    titleFa: "شبکه‌های عصبی",
    slug: "neural-networks",
    subtitle: "AI Solutions",
    subtitleFa: "راه‌حل‌های هوش مصنوعی",
    heroDescription: "Deep learning models that adapt and evolve to solve your most complex business problems.",
    heroDescriptionFa: "مدل‌های یادگیری عمیق که خود را تطبیق داده و برای حل پیچیده‌ترین مسائل کسب‌وکار شما تکامل می‌یابند.",
    animationData: "network",
    gradient: "from-violet-500 to-purple-500",
    whatItIs: {
      title: "What Are Neural Networks?",
      titleFa: "شبکه‌های عصبی چیستند؟",
      content: "Neural Networks are computing systems inspired by biological neural networks that constitute animal brains. These interconnected nodes (neurons) process information through weighted connections, learning patterns and relationships from data through training.\n\nOur neural network solutions leverage deep learning architectures—including feedforward networks, convolutional neural networks (CNNs), recurrent neural networks (RNNs), and transformers—to solve complex problems in pattern recognition, prediction, natural language understanding, and decision-making. These models can learn intricate patterns from large datasets, adapt to new information, and generalize their knowledge to make predictions on unseen data.",
      contentFa: "شبکه‌های عصبی سامانه‌های محاسباتی هستند که از شبکه‌های عصبی بیولوژیکی مغز جانوران الهام گرفته‌اند. این گره‌های به‌هم‌پیوسته (نورون‌ها) اطلاعات را از طریق اتصالات وزن‌دار پردازش کرده و الگوها و روابط را از داده‌ها می‌آموزند.\n\nراه‌حل‌های شبکه عصبی ما از معماری‌های یادگیری عمیق شامل شبکه‌های پیش‌خور، شبکه‌های عصبی کانولوشنی (CNN)، شبکه‌های عصبی بازگشتی (RNN) و ترنسفورمرها بهره می‌برند تا مسائل پیچیده در شناسایی الگو، پیش‌بینی، درک زبان طبیعی و تصمیم‌گیری را حل کنند."
    },
    howItWorks: {
      title: "How It Works",
      titleFa: "نحوه کار",
      content: "Neural networks learn from data through an iterative process that mimics how the human brain processes information.",
      contentFa: "شبکه‌های عصبی از طریق یک فرآیند تکراری که نحوه پردازش اطلاعات مغز انسان را تقلید می‌کند، از داده‌ها یاد می‌گیرند.",
      steps: [
        {
          number: 1,
          title: "Data Input & Processing",
          titleFa: "ورودی و پردازش داده",
          description: "Raw data is transformed into numerical representations that neural networks can process. Features are extracted and normalized to optimize learning.",
          descriptionFa: "داده‌های خام به نمایش‌های عددی تبدیل می‌شوند که شبکه‌های عصبی قادر به پردازش آن‌ها باشند. ویژگی‌ها استخراج و نرمال‌سازی می‌شوند."
        },
        {
          number: 2,
          title: "Forward Propagation",
          titleFa: "انتشار رو به جلو",
          description: "Input data flows through multiple layers of interconnected neurons. Each layer applies transformations, learning increasingly abstract patterns and features.",
          descriptionFa: "داده‌های ورودی از میان لایه‌های متعدد نورون‌های به‌هم‌پیوسته عبور می‌کنند. هر لایه تبدیلاتی را اعمال کرده و الگوهای انتزاعی‌تری را یاد می‌گیرد."
        },
        {
          number: 3,
          title: "Learning & Optimization",
          titleFa: "یادگیری و بهینه‌سازی",
          description: "The network compares its predictions with actual outcomes, calculates errors, and adjusts connection weights through backpropagation to minimize mistakes.",
          descriptionFa: "شبکه پیش‌بینی‌های خود را با نتایج واقعی مقایسه کرده، خطاها را محاسبه و وزن‌های اتصال را از طریق پس‌انتشار برای کمینه کردن اشتباهات تنظیم می‌کند."
        },
        {
          number: 4,
          title: "Model Deployment",
          titleFa: "استقرار مدل",
          description: "Once trained, the optimized model is deployed to production, where it can make accurate predictions on new, real-world data in real-time.",
          descriptionFa: "پس از آموزش، مدل بهینه‌شده در محیط تولید مستقر می‌شود تا بتواند پیش‌بینی‌های دقیقی روی داده‌های جدید و واقعی به‌صورت بلادرنگ ارائه دهد."
        }
      ]
    },
    whyItMatters: {
      title: "Why Neural Networks Matter",
      titleFa: "چرا شبکه‌های عصبی مهم هستند",
      content: "Neural networks enable machines to learn complex patterns, make intelligent decisions, and adapt to changing conditions—capabilities that were once exclusive to human intelligence.",
      contentFa: "شبکه‌های عصبی به ماشین‌ها امکان می‌دهند الگوهای پیچیده را یاد بگیرند، تصمیمات هوشمندانه بگیرند و با شرایط متغیر سازگار شوند—توانایی‌هایی که زمانی منحصر به هوش انسانی بودند.",
      benefits: [
        {
          icon: "Brain",
          title: "Pattern Recognition",
          titleFa: "تشخیص الگو",
          description: "Identify subtle patterns and relationships in data that traditional algorithms cannot detect, uncovering insights hidden in complex datasets.",
          descriptionFa: "شناسایی الگوها و روابط ظریفی در داده‌ها که الگوریتم‌های سنتی قادر به تشخیص آن‌ها نیستند و کشف بینش‌های پنهان در مجموعه‌داده‌های پیچیده."
        },
        {
          icon: "Target",
          title: "Predictive Accuracy",
          titleFa: "دقت پیش‌بینی",
          description: "Achieve superior prediction accuracy by learning non-linear relationships and adapting to data distributions automatically.",
          descriptionFa: "دستیابی به دقت پیش‌بینی برتر با یادگیری روابط غیرخطی و تطبیق خودکار با توزیع داده‌ها."
        },
        {
          icon: "Repeat",
          title: "Continuous Learning",
          titleFa: "یادگیری مستمر",
          description: "Models can be fine-tuned and retrained as new data becomes available, ensuring they remain accurate and relevant over time.",
          descriptionFa: "مدل‌ها با در دسترس قرار گرفتن داده‌های جدید قابل تنظیم دقیق و بازآموزی هستند تا دقت و به‌روز بودن خود را حفظ کنند."
        },
        {
          icon: "Layers",
          title: "Versatile Applications",
          titleFa: "کاربردهای متنوع",
          description: "Single architecture can be adapted for diverse tasks—from image recognition to language translation to predictive analytics.",
          descriptionFa: "یک معماری واحد را می‌توان برای وظایف متنوع تطبیق داد—از تشخیص تصویر تا ترجمه زبان تا تحلیل پیش‌بینانه."
        }
      ]
    },
    comparison: {
      title: "Traditional Algorithms vs Neural Networks",
      titleFa: "الگوریتم‌های سنتی در مقابل شبکه‌های عصبی",
      subtitle: "Discover the power of deep learning",
      subtitleFa: "قدرت یادگیری عمیق را کشف کنید",
      rows: [
        {
          feature: "Pattern Complexity",
          featureFa: "پیچیدگی الگو",
          traditional: "Limited to linear patterns",
          traditionalFa: "محدود به الگوهای خطی",
          withAI: "Learns non-linear, complex patterns",
          withAIFa: "یادگیری الگوهای غیرخطی و پیچیده"
        },
        {
          feature: "Feature Engineering",
          featureFa: "مهندسی ویژگی",
          traditional: "Requires manual feature design",
          traditionalFa: "نیاز به طراحی دستی ویژگی‌ها",
          withAI: "Automatic feature learning",
          withAIFa: "یادگیری خودکار ویژگی‌ها"
        },
        {
          feature: "Scalability",
          featureFa: "مقیاس‌پذیری",
          traditional: "Performance degrades with data size",
          traditionalFa: "عملکرد با افزایش حجم داده کاهش می‌یابد",
          withAI: "Performance improves with more data",
          withAIFa: "عملکرد با داده بیشتر بهبود می‌یابد"
        },
        {
          feature: "Adaptability",
          featureFa: "سازگاری",
          traditional: "Fixed rules, no learning",
          traditionalFa: "قوانین ثابت، بدون یادگیری",
          withAI: "Continuous learning and adaptation",
          withAIFa: "یادگیری و سازگاری مستمر"
        }
      ]
    },
    useCases: {
      title: "Real-World Applications",
      titleFa: "کاربردهای دنیای واقعی",
      subtitle: "Neural networks power intelligent systems across industries",
      subtitleFa: "شبکه‌های عصبی سامانه‌های هوشمند را در صنایع مختلف توانمند می‌کنند",
      cases: [
        {
          icon: "BarChart",
          title: "Financial Forecasting",
          titleFa: "پیش‌بینی مالی",
          description: "Predict market trends, detect fraud, and optimize trading strategies with deep learning models.",
          descriptionFa: "پیش‌بینی روندهای بازار، تشخیص تقلب و بهینه‌سازی استراتژی‌های معاملاتی با مدل‌های یادگیری عمیق."
        },
        {
          icon: "MessageSquare",
          title: "Natural Language Processing",
          titleFa: "پردازش زبان طبیعی",
          description: "Build chatbots, sentiment analysis tools, and language translation systems powered by transformer networks.",
          descriptionFa: "ساخت چت‌بات‌ها، ابزارهای تحلیل احساسات و سامانه‌های ترجمه زبان مبتنی بر شبکه‌های ترنسفورمر."
        },
        {
          icon: "ShoppingCart",
          title: "Recommendation Systems",
          titleFa: "سامانه‌های توصیه‌گر",
          description: "Personalize user experiences with intelligent product and content recommendations that learn from user behavior.",
          descriptionFa: "شخصی‌سازی تجربه کاربر با توصیه‌های هوشمند محصول و محتوا که از رفتار کاربر یاد می‌گیرند."
        },
        {
          icon: "Activity",
          title: "Predictive Maintenance",
          titleFa: "نگهداری پیش‌بینانه",
          description: "Predict equipment failures before they occur, reducing downtime and maintenance costs in industrial settings.",
          descriptionFa: "پیش‌بینی خرابی تجهیزات قبل از وقوع، کاهش زمان توقف و هزینه‌های نگهداری در محیط‌های صنعتی."
        }
      ]
    },
    cta: {
      title: "Ready to Harness the Power of Neural Networks?",
      titleFa: "آماده بهره‌برداری از قدرت شبکه‌های عصبی هستید؟",
      description: "Let our deep learning experts help you build intelligent systems that learn, adapt, and deliver results.",
      descriptionFa: "بگذارید متخصصان یادگیری عمیق ما به شما در ساخت سامانه‌های هوشمندی که یاد می‌گیرند، سازگار می‌شوند و نتیجه می‌دهند، کمک کنند.",
      buttonText: "Explore Neural Network Solutions",
      buttonTextFa: "کاوش راه‌حل‌های شبکه عصبی",
      buttonLink: "/projects"
    },
    order: 2,
    isFeatured: true
  },
  {
    title: "Machine Learning",
    titleFa: "یادگیری ماشین",
    slug: "machine-learning",
    subtitle: "AI Solutions",
    subtitleFa: "راه‌حل‌های هوش مصنوعی",
    heroDescription: "Predictive analytics and intelligent automation that optimize operations and drive growth.",
    heroDescriptionFa: "تحلیل پیش‌بینانه و خودکارسازی هوشمند که عملیات را بهینه کرده و رشد را پیش می‌برد.",
    animationData: "face-recognition",
    gradient: "from-teal-500 to-emerald-500",
    whatItIs: {
      title: "What Is Machine Learning?",
      titleFa: "یادگیری ماشین چیست؟",
      content: "Machine Learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. By analyzing historical data, machine learning algorithms identify patterns, build models, and make predictions or decisions on new data.\n\nOur machine learning solutions span supervised learning (classification and regression), unsupervised learning (clustering and dimensionality reduction), and reinforcement learning (decision-making and optimization). Whether you need to predict customer behavior, optimize supply chains, or automate decision-making processes, our ML models deliver actionable insights that drive business value.",
      contentFa: "یادگیری ماشین زیرشاخه‌ای از هوش مصنوعی است که به سامانه‌ها امکان می‌دهد بدون برنامه‌ریزی صریح، از تجربه یاد گرفته و بهبود یابند. با تحلیل داده‌های تاریخی، الگوریتم‌های یادگیری ماشین الگوها را شناسایی، مدل‌ها را می‌سازند و روی داده‌های جدید پیش‌بینی یا تصمیم‌گیری می‌کنند.\n\nراه‌حل‌های یادگیری ماشین ما شامل یادگیری نظارت‌شده (طبقه‌بندی و رگرسیون)، یادگیری بدون نظارت (خوشه‌بندی و کاهش بعد) و یادگیری تقویتی (تصمیم‌گیری و بهینه‌سازی) می‌شود."
    },
    howItWorks: {
      title: "How It Works",
      titleFa: "نحوه کار",
      content: "Machine learning systems transform data into intelligent predictions through a systematic learning process.",
      contentFa: "سامانه‌های یادگیری ماشین از طریق یک فرآیند یادگیری منظم، داده‌ها را به پیش‌بینی‌های هوشمند تبدیل می‌کنند.",
      steps: [
        {
          number: 1,
          title: "Data Collection & Preparation",
          titleFa: "جمع‌آوری و آماده‌سازی داده",
          description: "Gather relevant historical data from various sources. Clean, normalize, and preprocess the data to ensure quality and consistency for training.",
          descriptionFa: "جمع‌آوری داده‌های تاریخی مرتبط از منابع مختلف. پاک‌سازی، نرمال‌سازی و پیش‌پردازش داده‌ها برای اطمینان از کیفیت و سازگاری برای آموزش."
        },
        {
          number: 2,
          title: "Model Training",
          titleFa: "آموزش مدل",
          description: "Selected algorithms learn patterns from training data by adjusting internal parameters. The model iteratively improves its predictions through optimization.",
          descriptionFa: "الگوریتم‌های انتخاب‌شده با تنظیم پارامترهای داخلی، الگوها را از داده‌های آموزشی یاد می‌گیرند. مدل به‌طور تکراری پیش‌بینی‌های خود را از طریق بهینه‌سازی بهبود می‌بخشد."
        },
        {
          number: 3,
          title: "Validation & Testing",
          titleFa: "اعتبارسنجی و آزمایش",
          description: "Trained models are evaluated on validation datasets to assess performance and prevent overfitting. Best-performing models are selected for deployment.",
          descriptionFa: "مدل‌های آموزش‌دیده روی مجموعه‌داده‌های اعتبارسنجی ارزیابی می‌شوند تا عملکرد سنجیده شود و از بیش‌برازش جلوگیری شود. مدل‌های با بهترین عملکرد برای استقرار انتخاب می‌شوند."
        },
        {
          number: 4,
          title: "Deployment & Monitoring",
          titleFa: "استقرار و پایش",
          description: "Models are integrated into production systems where they make real-time predictions. Performance is continuously monitored and models are retrained as needed.",
          descriptionFa: "مدل‌ها در سامانه‌های تولید ادغام می‌شوند تا پیش‌بینی‌های بلادرنگ انجام دهند. عملکرد به‌طور مستمر پایش شده و مدل‌ها در صورت نیاز بازآموزی می‌شوند."
        }
      ]
    },
    whyItMatters: {
      title: "Why Machine Learning Matters",
      titleFa: "چرا یادگیری ماشین مهم است",
      content: "Machine learning transforms businesses by enabling data-driven decision-making, automating complex processes, and uncovering insights that drive competitive advantage.",
      contentFa: "یادگیری ماشین با فراهم کردن تصمیم‌گیری داده‌محور، خودکارسازی فرآیندهای پیچیده و کشف بینش‌هایی که مزیت رقابتی ایجاد می‌کنند، کسب‌وکارها را متحول می‌کند.",
      benefits: [
        {
          icon: "TrendingUp",
          title: "Data-Driven Decisions",
          titleFa: "تصمیم‌گیری داده‌محور",
          description: "Make informed decisions based on patterns discovered in your data, reducing guesswork and improving outcomes.",
          descriptionFa: "تصمیم‌گیری آگاهانه بر اساس الگوهای کشف‌شده در داده‌های شما، کاهش حدس و گمان و بهبود نتایج."
        },
        {
          icon: "Rocket",
          title: "Process Automation",
          titleFa: "خودکارسازی فرآیندها",
          description: "Automate repetitive tasks and complex decision-making processes, freeing human resources for strategic initiatives.",
          descriptionFa: "خودکارسازی وظایف تکراری و فرآیندهای تصمیم‌گیری پیچیده، آزادسازی منابع انسانی برای ابتکارات استراتژیک."
        },
        {
          icon: "PiggyBank",
          title: "Cost Optimization",
          titleFa: "بهینه‌سازی هزینه",
          description: "Identify inefficiencies, optimize resource allocation, and reduce operational costs through intelligent automation.",
          descriptionFa: "شناسایی ناکارآمدی‌ها، بهینه‌سازی تخصیص منابع و کاهش هزینه‌های عملیاتی از طریق خودکارسازی هوشمند."
        },
        {
          icon: "Users",
          title: "Personalization",
          titleFa: "شخصی‌سازی",
          description: "Deliver personalized experiences to customers by learning from their preferences, behavior, and interactions.",
          descriptionFa: "ارائه تجربه‌های شخصی‌سازی‌شده به مشتریان با یادگیری از ترجیحات، رفتار و تعاملات آن‌ها."
        }
      ]
    },
    comparison: {
      title: "Rule-Based Systems vs Machine Learning",
      titleFa: "سامانه‌های مبتنی بر قانون در مقابل یادگیری ماشین",
      subtitle: "Experience the advantages of intelligent automation",
      subtitleFa: "مزایای خودکارسازی هوشمند را تجربه کنید",
      rows: [
        {
          feature: "Adaptability",
          featureFa: "سازگاری",
          traditional: "Fixed rules, manual updates",
          traditionalFa: "قوانین ثابت، به‌روزرسانی دستی",
          withAI: "Automatic learning from new data",
          withAIFa: "یادگیری خودکار از داده‌های جدید"
        },
        {
          feature: "Complexity Handling",
          featureFa: "مدیریت پیچیدگی",
          traditional: "Limited to simple, explicit rules",
          traditionalFa: "محدود به قوانین ساده و صریح",
          withAI: "Handles complex, non-linear patterns",
          withAIFa: "مدیریت الگوهای پیچیده و غیرخطی"
        },
        {
          feature: "Maintenance",
          featureFa: "نگهداری",
          traditional: "High (manual rule updates)",
          traditionalFa: "زیاد (به‌روزرسانی دستی قوانین)",
          withAI: "Low (automatic model retraining)",
          withAIFa: "کم (بازآموزی خودکار مدل)"
        },
        {
          feature: "Accuracy",
          featureFa: "دقت",
          traditional: "Stagnant over time",
          traditionalFa: "راکد در طول زمان",
          withAI: "Improves with more data",
          withAIFa: "با داده بیشتر بهبود می‌یابد"
        }
      ]
    },
    useCases: {
      title: "Real-World Applications",
      titleFa: "کاربردهای دنیای واقعی",
      subtitle: "Machine learning drives innovation across every industry",
      subtitleFa: "یادگیری ماشین نوآوری را در همه صنایع پیش می‌برد",
      cases: [
        {
          icon: "ShoppingBag",
          title: "E-Commerce Personalization",
          titleFa: "شخصی‌سازی تجارت الکترونیک",
          description: "Recommend products, optimize pricing, and personalize shopping experiences based on customer behavior.",
          descriptionFa: "توصیه محصولات، بهینه‌سازی قیمت‌گذاری و شخصی‌سازی تجربه خرید بر اساس رفتار مشتری."
        },
        {
          icon: "Building",
          title: "Supply Chain Optimization",
          titleFa: "بهینه‌سازی زنجیره تأمین",
          description: "Forecast demand, optimize inventory levels, and streamline logistics operations with predictive models.",
          descriptionFa: "پیش‌بینی تقاضا، بهینه‌سازی سطوح موجودی و ساده‌سازی عملیات لجستیک با مدل‌های پیش‌بینانه."
        },
        {
          icon: "CreditCard",
          title: "Risk Assessment",
          titleFa: "ارزیابی ریسک",
          description: "Evaluate credit risk, detect fraudulent transactions, and assess insurance claims with ML-powered models.",
          descriptionFa: "ارزیابی ریسک اعتباری، تشخیص تراکنش‌های تقلبی و ارزیابی ادعاهای بیمه‌ای با مدل‌های مبتنی بر یادگیری ماشین."
        },
        {
          icon: "Briefcase",
          title: "HR & Talent Management",
          titleFa: "مدیریت منابع انسانی و استعداد",
          description: "Optimize recruitment processes, predict employee turnover, and identify top talent using ML algorithms.",
          descriptionFa: "بهینه‌سازی فرآیندهای استخدام، پیش‌بینی ترک خدمت کارکنان و شناسایی استعدادهای برتر با الگوریتم‌های یادگیری ماشین."
        }
      ]
    },
    cta: {
      title: "Ready to Transform Your Business with Machine Learning?",
      titleFa: "آماده تحول کسب‌وکار خود با یادگیری ماشین هستید؟",
      description: "Discover how our ML solutions can automate processes, optimize operations, and unlock value from your data.",
      descriptionFa: "ببینید چگونه راه‌حل‌های یادگیری ماشین ما می‌تواند فرآیندها را خودکار کند، عملیات را بهینه کند و ارزش داده‌های شما را آزاد سازد.",
      buttonText: "Explore Machine Learning Solutions",
      buttonTextFa: "کاوش راه‌حل‌های یادگیری ماشین",
      buttonLink: "/projects"
    },
    order: 3,
    isFeatured: true
  },
  {
    title: "Natural Language AI",
    titleFa: "هوش مصنوعی زبان طبیعی",
    slug: "natural-language-ai",
    subtitle: "AI Solutions",
    subtitleFa: "راه‌حل‌های هوش مصنوعی",
    heroDescription: "Conversational AI and language understanding that enhances customer experiences.",
    heroDescriptionFa: "هوش مصنوعی مکالماتی و درک زبان که تجربه مشتریان را ارتقا می‌دهد.",
    animationData: "chatbot-typing",
    gradient: "from-pink-500 to-rose-500",
    whatItIs: {
      title: "What Is Natural Language AI?",
      titleFa: "هوش مصنوعی زبان طبیعی چیست؟",
      content: "Natural Language AI (NLAI) encompasses technologies that enable machines to understand, interpret, and generate human language in a way that is both meaningful and contextually relevant. This includes natural language understanding (NLU), natural language generation (NLG), and conversational AI systems.\n\nOur Natural Language AI solutions leverage state-of-the-art transformer models, including large language models (LLMs) and fine-tuned specialized models, to power chatbots, virtual assistants, sentiment analysis systems, document summarization tools, and multilingual translation services. These systems understand context, detect sentiment, extract information, and generate human-like responses that enhance user experiences.",
      contentFa: "هوش مصنوعی زبان طبیعی (NLAI) شامل فناوری‌هایی است که به ماشین‌ها امکان می‌دهد زبان انسانی را به شیوه‌ای معنادار و مرتبط با زمینه درک، تفسیر و تولید کنند. این شامل درک زبان طبیعی (NLU)، تولید زبان طبیعی (NLG) و سامانه‌های هوش مصنوعی مکالماتی می‌شود.\n\nراه‌حل‌های NLAI ما از مدل‌های ترنسفورمر پیشرفته، از جمله مدل‌های زبانی بزرگ (LLM) و مدل‌های تخصصی تنظیم‌شده، برای توانمندسازی چت‌بات‌ها، دستیاران مجازی، سامانه‌های تحلیل احساسات، ابزارهای خلاصه‌سازی اسناد و سرویس‌های ترجمه چندزبانه بهره می‌برند."
    },
    howItWorks: {
      title: "How It Works",
      titleFa: "نحوه کار",
      content: "Natural Language AI systems process and generate human language through sophisticated linguistic understanding and generation pipelines.",
      contentFa: "سامانه‌های هوش مصنوعی زبان طبیعی از طریق پایپلاین‌های پیشرفته درک و تولید زبانی، زبان انسانی را پردازش و تولید می‌کنند.",
      steps: [
        {
          number: 1,
          title: "Text Processing & Tokenization",
          titleFa: "پردازش متن و توکن‌سازی",
          description: "Raw text input is broken down into tokens (words or subwords) and preprocessed to normalize format, handle special characters, and prepare for analysis.",
          descriptionFa: "ورودی متن خام به توکن‌ها (کلمات یا زیرکلمات) تقسیم شده و برای یکنواخت‌سازی قالب، مدیریت کاراکترهای خاص و آماده‌سازی برای تحلیل، پیش‌پردازش می‌شود."
        },
        {
          number: 2,
          title: "Semantic Understanding",
          titleFa: "درک معنایی",
          description: "Language models analyze tokens to understand meaning, context, intent, and sentiment. Advanced models capture nuance, ambiguity, and implicit meaning.",
          descriptionFa: "مدل‌های زبانی توکن‌ها را تحلیل می‌کنند تا معنا، زمینه، قصد و احساس را درک کنند. مدل‌های پیشرفته ظرافت‌ها، ابهامات و معانی ضمنی را نیز درک می‌کنند."
        },
        {
          number: 3,
          title: "Intent Recognition & Extraction",
          titleFa: "تشخیص قصد و استخراج",
          description: "Systems identify user intent, extract key entities (names, dates, locations), and map queries to appropriate actions or information sources.",
          descriptionFa: "سامانه‌ها قصد کاربر را شناسایی کرده، موجودیت‌های کلیدی (نام‌ها، تاریخ‌ها، مکان‌ها) را استخراج می‌کنند و پرسش‌ها را به اقدامات یا منابع اطلاعاتی مناسب نگاشت می‌کنند."
        },
        {
          number: 4,
          title: "Response Generation",
          titleFa: "تولید پاسخ",
          description: "AI models generate contextually appropriate responses, whether providing information, answering questions, or engaging in conversational dialogue.",
          descriptionFa: "مدل‌های هوش مصنوعی پاسخ‌های متناسب با زمینه تولید می‌کنند، چه برای ارائه اطلاعات، پاسخ به سؤالات یا مشارکت در گفت‌وگوی مکالماتی."
        }
      ]
    },
    whyItMatters: {
      title: "Why Natural Language AI Matters",
      titleFa: "چرا هوش مصنوعی زبان طبیعی مهم است",
      content: "Natural Language AI bridges the gap between human communication and digital systems, enabling seamless interactions that feel natural and intuitive.",
      contentFa: "هوش مصنوعی زبان طبیعی شکاف بین ارتباط انسانی و سامانه‌های دیجیتال را پر می‌کند و تعاملات یکپارچه‌ای را فراهم می‌کند که طبیعی و شهودی به نظر می‌رسند.",
      benefits: [
        {
          icon: "MessageCircle",
          title: "24/7 Customer Support",
          titleFa: "پشتیبانی ۲۴ ساعته",
          description: "Provide instant, accurate responses to customer inquiries around the clock, improving satisfaction while reducing support costs.",
          descriptionFa: "ارائه پاسخ‌های فوری و دقیق به درخواست‌های مشتریان در تمام ساعات شبانه‌روز، بهبود رضایت همراه با کاهش هزینه‌های پشتیبانی."
        },
        {
          icon: "Languages",
          title: "Multilingual Capabilities",
          titleFa: "قابلیت‌های چندزبانه",
          description: "Break down language barriers with real-time translation and multilingual understanding, enabling global communication.",
          descriptionFa: "شکستن موانع زبانی با ترجمه بلادرنگ و درک چندزبانه، فراهم کردن ارتباط جهانی."
        },
        {
          icon: "FileText",
          title: "Content Automation",
          titleFa: "خودکارسازی محتوا",
          description: "Automatically generate summaries, extract insights from documents, and create content at scale with NLG capabilities.",
          descriptionFa: "تولید خودکار خلاصه‌ها، استخراج بینش از اسناد و ایجاد محتوا در مقیاس با قابلیت‌های تولید زبان طبیعی."
        },
        {
          icon: "Heart",
          title: "Sentiment Analysis",
          titleFa: "تحلیل احساسات",
          description: "Understand customer emotions and opinions from text data, enabling proactive engagement and improved customer experience.",
          descriptionFa: "درک احساسات و نظرات مشتریان از داده‌های متنی، امکان تعامل فعالانه و بهبود تجربه مشتری."
        }
      ]
    },
    comparison: {
      title: "Traditional Chatbots vs Natural Language AI",
      titleFa: "چت‌بات‌های سنتی در مقابل هوش مصنوعی زبان طبیعی",
      subtitle: "Experience the evolution of conversational technology",
      subtitleFa: "تکامل فناوری مکالماتی را تجربه کنید",
      rows: [
        {
          feature: "Understanding",
          featureFa: "درک",
          traditional: "Keyword matching, rigid",
          traditionalFa: "تطبیق کلمات کلیدی، سخت و انعطاف‌ناپذیر",
          withAI: "Context-aware, natural understanding",
          withAIFa: "آگاه به زمینه، درک طبیعی"
        },
        {
          feature: "Conversation Flow",
          featureFa: "جریان مکالمه",
          traditional: "Scripted, linear",
          traditionalFa: "اسکریپت‌شده، خطی",
          withAI: "Dynamic, contextual dialogues",
          withAIFa: "گفت‌وگوهای پویا و مبتنی بر زمینه"
        },
        {
          feature: "Language Support",
          featureFa: "پشتیبانی زبان",
          traditional: "Limited languages",
          traditionalFa: "زبان‌های محدود",
          withAI: "100+ languages supported",
          withAIFa: "پشتیبانی از بیش از ۱۰۰ زبان"
        },
        {
          feature: "Learning",
          featureFa: "یادگیری",
          traditional: "Manual rule updates",
          traditionalFa: "به‌روزرسانی دستی قوانین",
          withAI: "Continuous learning from interactions",
          withAIFa: "یادگیری مستمر از تعاملات"
        }
      ]
    },
    useCases: {
      title: "Real-World Applications",
      titleFa: "کاربردهای دنیای واقعی",
      subtitle: "Natural Language AI enhances communication and automation across industries",
      subtitleFa: "هوش مصنوعی زبان طبیعی ارتباطات و خودکارسازی را در صنایع مختلف ارتقا می‌دهد",
      cases: [
        {
          icon: "Headphones",
          title: "Virtual Assistants",
          titleFa: "دستیاران مجازی",
          description: "Build intelligent assistants that understand voice and text commands, schedule appointments, and answer questions naturally.",
          descriptionFa: "ساخت دستیاران هوشمندی که دستورات صوتی و متنی را درک می‌کنند، قرار ملاقات‌ها را برنامه‌ریزی کرده و به سؤالات به‌طور طبیعی پاسخ می‌دهند."
        },
        {
          icon: "FileSearch",
          title: "Document Intelligence",
          titleFa: "هوش سندی",
          description: "Automatically extract information, summarize documents, and answer questions from large document repositories.",
          descriptionFa: "استخراج خودکار اطلاعات، خلاصه‌سازی اسناد و پاسخ به سؤالات از مخازن بزرگ اسناد."
        },
        {
          icon: "Globe",
          title: "Content Localization",
          titleFa: "بومی‌سازی محتوا",
          description: "Translate and adapt content for global audiences while preserving meaning and cultural context.",
          descriptionFa: "ترجمه و تطبیق محتوا برای مخاطبان جهانی با حفظ معنا و زمینه فرهنگی."
        },
        {
          icon: "Mail",
          title: "Email Automation",
          titleFa: "خودکارسازی ایمیل",
          description: "Categorize emails, generate responses, and prioritize communications based on content and sentiment analysis.",
          descriptionFa: "دسته‌بندی ایمیل‌ها، تولید پاسخ‌ها و اولویت‌بندی ارتباطات بر اساس تحلیل محتوا و احساسات."
        }
      ]
    },
    cta: {
      title: "Ready to Enhance Your Communication with Natural Language AI?",
      titleFa: "آماده ارتقای ارتباطات خود با هوش مصنوعی زبان طبیعی هستید؟",
      description: "Discover how our language AI solutions can transform customer interactions, automate content generation, and break down language barriers.",
      descriptionFa: "ببینید چگونه راه‌حل‌های هوش مصنوعی زبان ما می‌تواند تعاملات مشتری را متحول کند، تولید محتوا را خودکار کند و موانع زبانی را بشکند.",
      buttonText: "Explore Natural Language AI Solutions",
      buttonTextFa: "کاوش راه‌حل‌های هوش مصنوعی زبان طبیعی",
      buttonLink: "/projects"
    },
    order: 4,
    isFeatured: true
  }
];

// const creativityEntries = [
//   {
//     childName: "Sara Johnson",
//     idea: "A robot that can paint pictures by reading people's emotions",
//     photo: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80",
//     color: "bg-yellow-100/90",
//     position: { x: 12, y: 18 },
//     rotation: -2,
//     media: {
//       type: "image",
//       url: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=1200"
//     }
//   },
//   {
//     childName: "Ahmed Al-Rashid",
//     idea: "Flying bicycles powered by solar panels and dreams",
//     color: "bg-pink-100/90",
//     position: { x: 68, y: 12 },
//     rotation: 3,
//     media: {
//       type: "video",
//       url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
//     }
//   },
//   {
//     childName: "Maria Garcia",
//     idea: "A musical instrument that creates colors in the air when you play it",
//     color: "bg-blue-100/90",
//     position: { x: 42, y: 38 },
//     rotation: -3
//   },
//   {
//     childName: "Li Wei",
//     idea: "Smart shoes that remember where you've been and create a story map",
//     color: "bg-green-100/90",
//     position: { x: 22, y: 62 },
//     rotation: 2,
//     media: {
//       type: "image",
//       url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800"
//     }
//   },
//   {
//     childName: "Emma Wilson",
//     idea: "A book where the characters come alive based on how you draw them",
//     color: "bg-purple-100/90",
//     position: { x: 75, y: 58 },
//     rotation: -2
//   },
//   {
//     childName: "Omar Hassan",
//     idea: "Invisible ink that only appears when you're happy",
//     color: "bg-orange-100/90",
//     position: { x: 52, y: 25 },
//     rotation: 4,
//     media: {
//       type: "video",
//       url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
//     }
//   },
//   {
//     childName: "Yuki Tanaka",
//     idea: "Clouds you can bounce on like trampolines",
//     color: "bg-cyan-100/90",
//     position: { x: 32, y: 72 },
//     rotation: -4
//   },
//   {
//     childName: "Sofia Rodriguez",
//     idea: "A camera that captures memories as 3D holograms you can walk through",
//     color: "bg-rose-100/90",
//     position: { x: 85, y: 35 },
//     rotation: 3
//   }
// ];


// --- توابع اصلی ---

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for Seeding...'.cyan.bold);
    } catch (err) {
        console.error(`Error: ${err.message}`.red.bold);
        process.exit(1);
    }
};

const importData = async () => {
    await connectDB();
    try {
        // 1. پاکسازی داده‌های قبلی
        await Project.deleteMany();
        await TeamMember.deleteMany();
        await CaseStudy.deleteMany();
        await Post.deleteMany();
        await Event.deleteMany();
        await SiteConfig.deleteMany();
        await Intelligence.deleteMany();
        await EnergyBlog.deleteMany();
        await CreativityEntry.deleteMany();
        // await Creativity.deleteMany();
        await User.deleteMany();

        console.log('Previous data cleared...'.yellow);

        // 2. وارد کردن کاربران جدید
        const createdUsers = await User.create(users);
        const adminUser = createdUsers.find(user => user.isAdmin);
        console.log('Users Imported!'.green);

        if (!adminUser) {
            console.error('Error: Admin user could not be created.'.red.bold);
            process.exit(1);
        }

        // 3. اضافه کردن authorId به تمام پست‌ها
        const postsWithAuthor = researchPosts.map(post => ({
            ...post,
            author: adminUser._id,
        }));

        // 4. وارد کردن بقیه داده‌ها
        await TeamMember.create(teamMembers);
        console.log('Team Members Imported!'.green);
        await Project.create(projects);
        console.log('Projects Imported!'.green);
        await CaseStudy.create(caseStudies);
        console.log('Case Studies Imported!'.green);
        await Post.create(postsWithAuthor);
        console.log('Research Posts Imported!'.green);
        await Event.create(events);
        console.log('Events Imported!'.green);
        await SiteConfig.create(siteConfig);
        console.log('Site Config Imported!'.cyan);
        await Intelligence.create(intelligenceItems);
        console.log('Intelligence Items Imported!'.green);
        await EnergyBlog.create(energyBlogEntries);
        console.log('Energy Blog Entries Imported!'.green);
        await CreativityEntry.create(creativityEntries);
        console.log('Creativity Entries Imported!'.green);
        // await Creativity.create(creativityEntries);
        // console.log('Creativity Entries Imported!'.green);
        // await Creativity.create(creativityEntries);
        // console.log('Creativity Entries Imported!'.green);
        
        console.log('Data Imported Successfully!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`Error importing data: ${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    await connectDB();
    try {
        await Project.deleteMany();
        await TeamMember.deleteMany();
        await CaseStudy.deleteMany();
        await Post.deleteMany();
        await Event.deleteMany();
        await SiteConfig.deleteMany();
        await Intelligence.deleteMany();
        await EnergyBlog.deleteMany();
        await CreativityEntry.deleteMany();
        // await Creativity.deleteMany();
        // await Creativity.deleteMany();
        await User.deleteMany(); // +++ کاربران را هم در destroy پاک می‌کنیم +++
        
        console.log('Data Destroyed Successfully!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`Error destroying data: ${error}`.red.inverse);
        process.exit(1);
    }
};

// --- اجرای اسکریپت ---
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}