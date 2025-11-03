// client/src/pages/ProjectDetailPage.tsx
import React, { useEffect, useState, ReactElement } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '@/lib/axiosConfig';
import { useLayout } from '@/contexts/LayoutContext'; // <<-- هوک Context
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft } from 'lucide-react';

// --- انیمیشن‌های پس‌زمینه خود را وارد کنید ---
import NeuralBackground from '@/components/effects/NeuralBackground'; // پیش‌فرض
import FloatingParticles from '@/components/effects/FloatingParticles'; // مثال برای NLP
import ThreeNeuralBackground from '@/components/effects/ThreeNeuralBackground'; // مثال برای Computer Vision
// ... انیمیشن‌های دیگر
// import GlobeBackground from '@/components/effects/Globe'; // مثال

// (این Interface باید با Model بک‌اند شما مطابقت داشته باشد)
interface Project {
  _id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  status: string;
  technologies: string[];
  mainImageUrl?: string;
  videoUrl?: string;
  demoUrl?: string;
}

// تابع کمکی برای انتخاب بک‌گراند بر اساس دسته‌بندی
const getBackgroundComponent = (category: string): ReactElement => {
  switch (category) {
   case 'NLP':
      // شما می‌توانید props ها را هم تنظیم کنید
      return <FloatingParticles count={50} />; 
    case 'Computer Vision':
      return <ThreeNeuralBackground />;
    case 'Data Analysis':
      // مثال: استفاده از یک انیمیشن دیگر
      // return <GlobeBackground />; 
      return <NeuralBackground />; // فعلا پیش‌فرض
    default:
      return <NeuralBackground />;
  }
};

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setBackground } = useLayout(); // تابع تغییر بک‌گراند

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // --- فچ کردن داده‌های پروژه ---
    const fetchProject = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const response = await api.get(`/projects/${slug}`);
        setProject(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch project details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  useEffect(() => {
    // --- مدیریت بک‌گراند ---
    if (project) {
      // 1. بک‌گراند جدید را بر اساس دسته‌بندی تنظیم کن
      const backgroundComp = getBackgroundComponent(project.category);
      setBackground(backgroundComp);
    }

    // --- تابع پاکسازی (Cleanup) ---
    // 2. وقتی کاربر از این صفحه خارج می‌شود (کامپوننت unmount می‌شود)
    // بک‌گراند را به حالت پیش‌فرض (NeuralBackground) برگردان
    return () => {
      setBackground(<NeuralBackground />);
    };
  }, [project, setBackground]); // این افکت به project و setBackground وابسته است

  // --- رندر لودینگ ---
  if (loading) {
    return (
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <Skeleton className="h-12 w-3/4 mb-6" />
        <Skeleton className="h-6 w-1/4 mb-12" />
        <Skeleton className="h-[450px] w-full mb-8 rounded-lg" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  // --- رندر خطا ---
  if (error || !project) {
    return (
      <div className="container mx-auto px-6 pt-40 pb-20 text-center relative z-10">
        <h2 className="text-2xl text-red-500 mb-6">{error || 'Project not found.'}</h2>
        <Button asChild variant="outline">
          <Link to="/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
      </div>
    );
  }

  // --- رندر نهایی صفحه ---
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      // z-10 برای قرار گرفتن محتوا روی انیمیشن بک‌گراند
      className="container mx-auto px-6 pt-32 pb-20 relative z-10" 
    >
      <header className="max-w-4xl mx-auto text-center mb-16">
        <Button asChild variant="link" className="mb-6 text-primary">
          <Link to="/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            All Projects
          </Link>
        </Button>
        <Badge variant="secondary" className="mb-4 text-base px-4 py-1">
          {project.category}
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold glow-text mb-6">{project.title}</h1>
        <div className="flex justify-center gap-4">
          <Badge variant="outline">{project.status}</Badge>
          {project.technologies.map(tech => (
            <Badge key={tech} variant="default">{tech}</Badge>
          ))}
        </div>
      </header>

      {/* بخش دمو / ویدیو */}
      <section className="mb-16">
        {project.videoUrl ? (
          <div className="aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden border border-primary/20 shadow-lg">
            <iframe
              src={project.videoUrl} // (مطمئن شوید لینک Embed است)
              title={`${project.title} Video Demo`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        ) : project.mainImageUrl ? (
          <img 
            src={project.mainImageUrl} 
            alt={project.title} 
            className="w-full max-w-4xl mx-auto h-auto max-h-[500px] object-cover rounded-lg shadow-lg border border-primary/20" 
          />
        ) : (
          <div className="h-64 w-full max-w-4xl mx-auto bg-muted rounded-lg flex items-center justify-center border border-dashed">
            <p className="text-muted-foreground">No media available</p>
          </div>
        )}
      </section>
    
      {/* بخش توضیحات متن و لینک دمو */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">About the Project</h2>
        <div 
          className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed"
        >
          {/* اگر description شما متن ساده با خطوط جدید است */}
          {project.description.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          {/* اگر description شما HTML است، از این استفاده کنید: */}
          {/* <div dangerouslySetInnerHTML={{ __html: project.description }} /> */}
        </div>

        {project.demoUrl && (
          <Button asChild className="mt-10 btn-neural">
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              View Live Demo
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        )}
      </section>
    </motion.div>
  );
};

export default ProjectDetailPage;