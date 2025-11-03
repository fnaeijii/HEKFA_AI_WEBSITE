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
    { value: "500+", label: "AI Projects Completed" },
    { value: "150+", label: "Expert Team Members" },
    { value: "99%", label: "Client Satisfaction" },
    { value: "50+", label: "Research Papers" },
  ],

  researchStats: [
    { label: "Research Papers", value: "50+", icon: "FileText" },
    { label: "Citations", value: "2,500+", icon: "Award" },
    { label: "Conferences", value: "25+", icon: "Brain" },
    { label: "Collaborations", value: "15+", icon: "User" },
  ],
  contactInfo: [
    { title: "Email Us", description: "Get in touch via email", value: "contact@hekfa.ai", icon: "Mail" },
    { title: "Call Us", description: "Speak with our team", value: "+1 (555) 123-4567", icon: "Phone" },
    { title: "Visit Us", description: "Our headquarters", value: "San Francisco, CA", icon: "MapPin" },
    { title: "Business Hours", description: "Monday - Friday", value: "9:00 AM - 6:00 PM PST", icon: "Clock" },
  ],
  globalOffices: [
    { city: "San Francisco", country: "United States", address: "123 Innovation Drive, CA 94105", phone: "+1 (555) 123-4567", type: "Headquarters" },
    { city: "London", country: "United Kingdom", address: "45 Tech Square, London EC2A 3LT", phone: "+44 20 7123 4567", type: "European Office" },
    { city: "Singapore", country: "Singapore", address: "78 AI Hub, Singapore 018956", phone: "+65 6123 4567", type: "Asia Pacific Office" },
  ],
};

const teamMembers = [
    // ... (داده‌های teamMembers شما بدون تغییر اینجا قرار می‌گیرد)
    { name: 'Dr. Arash Kamangar', role: 'Chief AI Scientist', specialty: 'Deep Learning & NLP', imageUrl: '/uploads/team-arash.jpg', bio: 'Pioneering research in generative models and leading our core AI innovation.', linkedinUrl: 'https://linkedin.com/in/arash-kamangar-fake', order: 1 },
    { name: 'Sara Mohammadi', role: 'Lead Computer Vision Engineer', specialty: 'Image Recognition & Analysis', imageUrl: '/uploads/team-sara.jpg', bio: 'Expert in real-time object detection and segmentation for industrial applications.', linkedinUrl: 'https://linkedin.com/in/sara-mohammadi-fake', order: 2 },
    { name: 'Reza Alavi', role: 'Senior ML Ops Engineer', specialty: 'Deployment & Scaling', imageUrl: '/uploads/team-reza.jpg', bio: 'Ensuring our AI models run efficiently and reliably at scale for millions of users.', linkedinUrl: 'https://linkedin.com/in/reza-alavi-fake', order: 3 }
];

const projects = [
    // ... (داده‌های projects شما بدون تغییر اینجا قرار می‌گیرد)
    { title: 'Smart Parking Solution', slug: 'smart-parking-solution', description: 'An end-to-end AI-powered system for monitoring parking spaces...', summary: 'AI-powered vehicle detection and license plate recognition...', category: 'Computer Vision', status: 'Production', technologies: ['YOLOv8', 'OCR', 'Edge Computing'], metrics: { accuracy: '98.5%', coverage: '24/7' }, isFeatured: true, mainImageUrl: '/uploads/project-parking.jpg' },
    { title: 'RAG for Enterprise LLMs', slug: 'rag-for-llms', description: 'Developing advanced Retrieval-Augmented Generation (RAG) systems...', summary: 'Retrieval-Augmented Generation systems for enhanced LLMs...', category: 'NLP', status: 'Research', technologies: ['Transformers', 'Vector DB', 'LangChain'], metrics: { accuracy: '94.2%', latency: '<2s' }, isFeatured: true, mainImageUrl: '/uploads/project-rag.jpg' },
    { title: 'AI Animation Generator', slug: 'ai-animation-generator', description: 'A text-to-animation AI system that creates high-quality...', summary: 'Text-to-animation AI system that creates high-quality animated content.', category: 'Generative AI', status: 'Beta', technologies: ['Diffusion Models', 'GAN', '3D Rendering'], metrics: { quality: 'HD 1080p', speed: '30 FPS' }, isFeatured: true, mainImageUrl: '/uploads/project-animation.jpg' },
    { title: 'Healthcare Diagnostic Assistant', slug: 'healthcare-diagnostic-assistant', description: 'AI-powered diagnostic tool improving accuracy and speed of medical diagnoses.', summary: 'AI tool improving accuracy and speed of medical diagnoses.', category: 'Healthcare AI', status: 'Production', technologies: ['Deep Learning', 'Medical Imaging', 'NLP'], metrics: { accuracy: '94%', speed: '+50%' }, isFeatured: true, mainImageUrl: '/uploads/project-healthcare.jpg' }
];

const caseStudies = [
    // ... (داده‌های caseStudies شما بدون تغییر اینجا قرار می‌گیرد)
    { title: "Optimizing Logistics for PetroCorp", slug: "optimizing-logistics-petrocorp", client: "PetroCorp Inc.", description: "Developed a route optimization AI that reduced fuel consumption by 22%...", technologies: ["Reinforcement Learning", "GIS"], results: ["22% reduction in fuel costs", "15% faster delivery"], imageUrl: "/uploads/case-study-logistics.jpg" },
    { title: "Automated Quality Control at PharmaGood", slug: "automated-quality-control-pharmagood", client: "PharmaGood", description: "Implemented a high-speed computer vision system...", technologies: ["Computer Vision", "CNN"], results: ["99.99% defect detection accuracy", "300% increase in inspection speed"], imageUrl: "/uploads/case-study-pharma.jpg" }
];

// <<-- داده‌های جدید برای مقالات تحقیقاتی
const researchPosts = [
  {
    title: "Neural Architecture Search for Efficient Computer Vision Models",
    slug: "neural-architecture-search-efficient-cv",
    summary: "We present a novel approach to neural architecture search that reduces computational requirements while maintaining state-of-the-art performance in computer vision tasks.",
    content: "Full content of the research paper about NAS...",
    authors: ["Dr. Sarah Chen", "Marcus Rodriguez", "Dr. Aisha Patel"],
    journal: "Nature Machine Intelligence",
    publishedAt: new Date("2024-01-15"),
    citations: 127,
    category: "Computer Vision",
    tags: ["NAS", "Optimization", "CNN"],
    status: "published",
    mainImageUrl: "/uploads/research-paper-1.jpg"
  },
  {
    title: "Retrieval-Augmented Generation for Domain-Specific Applications",
    slug: "rag-for-domain-specific-apps",
    summary: "An investigation into optimizing RAG systems for specialized domains, demonstrating significant improvements in accuracy and relevance.",
    content: "Full content of the research paper about RAG...",
    authors: ["Dr. Aisha Patel", "James Thompson"],
    journal: "ICML 2024",
    publishedAt: new Date("2024-02-28"),
    citations: 89,
    category: "NLP",
    tags: ["RAG", "LLM", "Enterprise AI"],
    status: "published",
    mainImageUrl: "/uploads/research-paper-2.jpg"
  }
];

const events = [
  {
    title: 'Global AI Summit 2025',
    date: new Date('2025-11-20'),
    location: 'San Francisco, USA',
    description: 'Join us at the largest AI conference of the year. Visit our booth to see live demos of our latest innovations.',
    boothNumber: 'A-42',
    registrationUrl: 'https://example.com/glais2025'
  },
  {
    title: 'Tech Innovate Europe',
    date: new Date('2026-02-10'),
    location: 'Berlin, Germany',
    description: 'Hekfa AI will be showcasing its new computer vision platform. We are looking forward to connecting with European partners.',
    boothNumber: 'Hall 3, Booth 118',
    registrationUrl: 'https://example.com/tie2026'
  }
];


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