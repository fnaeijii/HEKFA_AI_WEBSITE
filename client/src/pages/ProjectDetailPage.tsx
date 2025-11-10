// src/pages/ProjectDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import api from '@/lib/axiosConfig';

// Components
import ProjectBackground from "@/components/effects/ProjectBackground"; // مسیر آپدیت شد
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Icons
import * as LucideIcons from "lucide-react";

// --- اینترفیس کامل پروژه ---
interface Project {
  _id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  overview: string;
  mainImageUrl?: string;
  videoUrl?: string;
  demoUrl?: string;
  technologies: { name: string; icon: string }[]; // آیکون می‌تواند ایموجی یا نام آیکون از Lucide باشد
  keyFeatures: { icon: string; title: string; description: string }[];
}

// --- آبجکت مپینگ برای آیکون‌ها ---
// این کار به ما اجازه می‌دهد نام آیکون را از API بگیریم و کامپوننت آن را رندر کنیم
const Icon = ({ name, ...props }: { name: string } & LucideIcons.LucideProps) => {
  const LucideIcon = (LucideIcons as any)[name];
  if (!LucideIcon) {
    return <LucideIcons.Cpu {...props} />; // آیکون پیش‌فرض
  }
  return <LucideIcon {...props} />;
};

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        // اطمینان حاصل کنید که این آدرس با روت بک‌اند شما هماهنگ است
        const response = await api.get(`/projects/slug/${slug}`);
        setProject(response.data);
      } catch (err) {
        setError("Failed to load project details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) return <ProjectDetailSkeleton />;
  // بهبود نمایش خطا با یک پیام پیش‌فرض
  if (error || !project) return <div className="h-screen flex items-center justify-center text-red-500">{error || 'Project not found.'}</div>;

  const { title, category, description, overview, technologies, keyFeatures, demoUrl, mainImageUrl } = project;

  return (
    <div className="min-h-screen pt-20 relative overflow-x-hidden">
      <ProjectBackground category={category} />
      
      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 pt-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-foreground">{title}</span>
          </motion.div>
        </div>

        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 px-4 py-2">
                <Icon name="Cpu" className="h-4 w-4 mr-2" /> {category}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">{title}</h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{description}</p>
              {demoUrl && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
                  <Button asChild className="btn-glow group"><a href={demoUrl} target="_blank" rel="noopener noreferrer">View Live Demo <LucideIcons.Zap className="ml-2 h-4 w-4 group-hover:animate-pulse" /></a></Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="container mx-auto px-6 max-w-4xl">
            <div className="glass-card p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text-secondary">Project Overview</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed whitespace-pre-line">{overview}</div>
            </div>
          </motion.div>
        </section>

        {/* System in Action Section */}
        {mainImageUrl && (
          <section className="py-20 relative">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="container mx-auto px-6 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center glow-text-secondary">System in Action</h2>
              <div className="neural-card overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center relative">
                  <img src={`${import.meta.env.VITE_API_URL}${mainImageUrl}`} alt={title} className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Technologies Used */}
        <section className="py-20 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center glow-text-secondary">Technologies Used</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {/* ▼▼▼ تغییر ۱: اضافه کردن شرط محافظ برای technologies ▼▼▼ */}
              {technologies && technologies.map((tech, index) => (
                <motion.div key={tech.name} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ scale: 1.1, y: -5 }}>
                  <Card className="glass-card text-center p-6 h-full border-primary/20 hover:border-primary/50 transition-colors">
                    <CardContent className="p-0 flex flex-col items-center justify-center">
                      <div className="text-4xl mb-3">{tech.icon && tech.icon.length > 2 ? <Icon name={tech.icon} /> : tech.icon}</div>
                      <div className="text-sm font-medium">{tech.name}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

         {/* Key Features */}
        <section className="py-20 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center glow-text-secondary">Key Features & Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ▼▼▼ تغییر ۲: اضافه کردن شرط محافظ برای keyFeatures ▼▼▼ */}
              {keyFeatures && keyFeatures.map((feature, index) => (
                <motion.div key={feature.title} initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                  <Card className="neural-card h-full group">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Icon name={feature.icon} className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Back to Projects */}
        <section className="py-20 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="container mx-auto px-6 text-center">
            <Button asChild className="btn-glow group">
              <Link to="/projects"><LucideIcons.ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to All Projects</Link>
            </Button>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

// --- کامپوننت اسکلتون برای حالت لودینگ ---
const ProjectDetailSkeleton = () => (
  <div className="container mx-auto px-6 pt-28">
    <Skeleton className="h-4 w-48 mb-20" />
    <div className="text-center max-w-4xl mx-auto">
      <Skeleton className="h-6 w-32 mb-6 mx-auto" />
      <Skeleton className="h-16 w-full mb-6" />
      <Skeleton className="h-10 w-3/4 mb-8 mx-auto" />
      <Skeleton className="h-12 w-48 mx-auto" />
    </div>
    <div className="py-20 max-w-4xl mx-auto">
      <Skeleton className="h-[300px] w-full" />
    </div>
  </div>
);


export default ProjectDetailPage;