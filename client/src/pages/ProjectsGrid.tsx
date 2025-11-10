// src/pages/Projects.tsx - FINAL FIX for Image URL Pathing

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion'; // --- CHANGE 1: New imports
import api from '@/lib/axiosConfig';
// import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // <-- ۱. وارد کردن Link

interface Project {
  _id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  mainImageUrl?: string;
}

interface CaseStudy {
  _id: string;
  slug: string;
  title: string;
  client: string;
  description: string;
  technologies: string[];
  imageUrl: string;
}

const CinematicSection = ({ project, index }: { project: Project; index: number; }) => {
  const fullImageUrl = project.mainImageUrl ? `${import.meta.env.VITE_API_URL}${project.mainImageUrl}` : null;
  const sectionRef = useRef<HTMLDivElement>(null);
  const isFirstSection = index === 0;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start start"] });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scrollY = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <section
      ref={sectionRef}
      // <-- ۳. کلاس‌های group و cursor-pointer برای افکت هاور اضافه شد
      className="h-screen sticky top-0 flex items-center justify-center overflow-hidden bg-cover bg-center group cursor-pointer"
      style={{
        backgroundImage: fullImageUrl ? `url(${fullImageUrl})` : 'none',
        backgroundColor: !fullImageUrl ? `hsl(220, 50%, ${15 + index * 10}%)` : 'transparent'
      }}
    >
      {/* افکت زوم شدن پس‌زمینه در زمان هاور */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
        style={{ backgroundImage: fullImageUrl ? `url(${fullImageUrl})` : 'none' }}
      />

      {/* لایه تیره کننده که در زمان هاور کمی روشن‌تر می‌شود */}
      <div className="absolute inset-0 bg-black/60 z-0 transition-colors duration-300 group-hover:bg-black/50"></div>
      
      <motion.div
        className="text-center z-10 p-4"
        initial={isFirstSection ? { opacity: 0, y: 50 } : {}}
        animate={isFirstSection ? { opacity: 1, y: 0 } : {}}
        transition={isFirstSection ? { duration: 0.8, delay: 0.5, ease: "easeOut" } : {}}
        style={!isFirstSection ? { opacity: scrollOpacity, y: scrollY } : {}}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">{project.title}</h1>
        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">{project.description}</p>
        
        {/* <-- ۴. راهنمای بصری برای کلیک کردن که در زمان هاور ظاهر می‌شود */}
        <motion.div 
          className="mt-8 flex items-center justify-center gap-2 text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
             <Badge variant="outline" className="backdrop-blur-sm bg-white/10 border-white/20">
                View Project <ArrowRight className="ml-2 h-4 w-4" />
             </Badge>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// (The CaseStudyCard, CaseStudyCardSkeleton, and CaseStudiesSection components remain unchanged)
const CaseStudyCard = ({ study, index }: { study: CaseStudy, index: number }) => {
  const imageUrl = study.imageUrl.startsWith('http') 
    ? study.imageUrl 
    : `${import.meta.env.VITE_API_URL}${study.imageUrl}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="neural-card overflow-hidden h-full flex flex-col group cursor-pointer">
        <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
          <img src={imageUrl} alt={study.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Badge variant="secondary">Case Study</Badge>
          </div>
        </div>
        <CardContent className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{study.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">Client: <span className="font-medium text-foreground">{study.client}</span></p>
          <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{study.description.slice(0, 150)}...</p>
          <div className="mt-auto pt-4">
            <Button variant="outline" className="btn-ghost-neural w-full">Read More <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const CaseStudyCardSkeleton = () => (
    <div className="flex flex-col space-y-3">
        <Skeleton className="h-[250px] w-full rounded-xl" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
        </div>
    </div>
);

const CaseStudiesSection = ({ caseStudies, loading }: { caseStudies: CaseStudy[], loading: boolean }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse movement for floating effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  if (!loading && caseStudies.length === 0) return null;
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, 
          hsl(220, 50%, 15%) 0%,           /* سرمه‌ای پررنگ در بالا */
          hsl(220, 45%, 13%) 20%,          /* کمی کمرنگ‌تر */
          hsla(220, 40%, 11%, 0.8) 40%,    /* شروع کاهش opacity */
          hsla(220, 35%, 9%, 0.5) 60%,     /* opacity متوسط */
          hsla(220, 30%, 7%, 0.25) 80%,    /* تقریباً شفاف */
          hsla(220, 25%, 5%, 0.1) 90%,     /* خیلی شفاف */
          transparent 100%                  /* کاملاً محو */
        )`
      }}
    >
      {/* Animated floating orbs - more active at bottom */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top orb - less movement */}
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(220, 80%, 60%, 0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
            left: '20%',
            top: '10%',
          }}
          animate={{
            x: mousePosition.x * 30 - 15,  // حرکت کمتر در بالا
            y: mousePosition.y * 20 - 10,
          }}
          transition={{ type: "spring", damping: 35, stiffness: 150 }}
        />
        
        {/* Middle orb - moderate movement */}
        <motion.div
          className="absolute w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(280, 70%, 55%, 0.06) 0%, transparent 70%)',
            filter: 'blur(50px)',
            right: '30%',
            top: '40%',
          }}
          animate={{
            x: -mousePosition.x * 50 + 25,  // حرکت متوسط در وسط
            y: mousePosition.y * 40 - 20,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 180 }}
        />
        
        {/* Bottom orb - more movement and stronger effect */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(200, 75%, 50%, 0.12) 0%, transparent 60%)',
            filter: 'blur(60px)',
            left: '40%',
            bottom: '-10%',  // نزدیک پایین
          }}
          animate={{
            x: mousePosition.x * 120 - 60,  // حرکت بیشتر در پایین
            y: -mousePosition.y * 80 + 40,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        />
        
        {/* Extra bottom floating element for more dynamics */}
        <motion.div
          className="absolute w-72 h-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(260, 65%, 45%, 0.1) 0%, transparent 65%)',
            filter: 'blur(45px)',
            right: '15%',
            bottom: '5%',
          }}
          animate={{
            x: [-30, 40, -30],
            y: [-20, 30, -20],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Enhanced gradient overlay for bottom fade */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, 
            transparent 0%, 
            transparent 50%, 
            hsla(var(--background), 0.2) 70%,
            hsla(var(--background), 0.5) 85%,
            hsla(var(--background), 0.8) 95%,
            hsl(var(--background)) 100%
          )`
        }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5 }} 
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text-secondary">
            Case Studies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-world examples of how we've solved complex challenges.
          </p>
        </motion.div>
        
        <div className="relative w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto">
          <Carousel opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent className="-ml-4">
              {loading
                ? [...Array(3)].map((_, i) => (
                    <CarouselItem key={i} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <CaseStudyCardSkeleton />
                    </CarouselItem>
                  ))
                : caseStudies.map((study, index) => (
                    <CarouselItem key={study._id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <CaseStudyCard study={study} index={index} />
                    </CarouselItem>
                  ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/60 p-0 text-foreground backdrop-blur-sm transition-colors hover:bg-background/80 sm:left-[-50px]" />
            <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/60 p-0 text-foreground backdrop-blur-sm transition-colors hover:bg-background/80 sm:right-[-50px]" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

const ProjectsPage = () => {
  const [cinematicProjects, setCinematicProjects] = useState<Project[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ... fetchData logic remains exactly the same ...
    const fetchData = async () => { try { setLoading(true); const [projectsResponse, caseStudiesResponse] = await Promise.all([api.get('/projects'), api.get('/case-studies')]); setCinematicProjects(projectsResponse.data); setCaseStudies(caseStudiesResponse.data); setError(null); } catch (err) { setError('Failed to fetch data. Please check server and database configuration.'); console.error(err); } finally { setLoading(false); } };
    fetchData();
  }, []);

  if (error) { return <div className="h-screen flex items-center justify-center bg-background text-red-500"><p>{error}</p></div>; }
  
  return (
    <div>
      {/* The container for the sections no longer needs a ref */}
      <div className="relative">
        {!loading && cinematicProjects.length > 0 && (
          <>
            {cinematicProjects.map((project, index) => (
              // --- CHANGE 2: The component is now simpler, no need to pass scroll props ---
               <Link key={project._id} to={`/projects/${project.slug}`}>
                <CinematicSection
                  project={project}
                  index={index}
                />
              </Link>
            ))}
          </>
        )}
      </div>

      {/* Case Studies Section */}
      <CaseStudiesSection caseStudies={caseStudies} loading={loading} />
    </div>
  );
};


export default ProjectsPage;