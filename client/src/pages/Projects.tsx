// src/pages/Projects.tsx - FINAL & FIXED



import React, { useState, useEffect } from 'react';

// import axios from 'axios';

import api from '@/lib/axiosConfig';

import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import { Menu, Search, ArrowRight, Brain } from "lucide-react";

import { Link } from "react-router-dom";

import FloatingParticles from "@/components/effects/FloatingParticles";

import { Skeleton } from "@/components/ui/skeleton";



interface Project {

  _id: string;

  slug: string;

  title: string;

  summary: string; // <<-- استفاده از summary برای توضیحات کوتاه

  description: string;

  category: string;

  status: string;

  technologies: string[];

  metrics?: { [key: string]: string }; // <<-- متریک را اختیاری (optional) می‌کنیم

}



const Projects = () => {

  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("All Projects");

  const [searchQuery, setSearchQuery] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);



  useEffect(() => {

    const fetchProjects = async () => {

      try {

        setLoading(true);

        const response = await api.get('/projects');

        setProjects(response.data);

        setError(null);

      } catch (err) {

        setError('Failed to fetch projects. Please make sure the server is running.');

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

    fetchProjects();

  }, []);



  const categories = ["All Projects", ...Array.from(new Set(projects.map(p => p.category)))];



  const filteredProjects = projects.filter((project) => {

    const matchesCategory = selectedCategory === "All Projects" || project.category === selectedCategory;

    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;

  });



  // Helper component for loading state

  const LoadingSkeleton = () => (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

      {[...Array(4)].map((_, i) => (

        <div key={i} className="flex flex-col space-y-3">

          <Skeleton className="h-[125px] w-full rounded-xl" />

          <div className="space-y-2">

            <Skeleton className="h-4 w-[250px]" />

            <Skeleton className="h-4 w-[200px]" />

          </div>

        </div>

      ))}

    </div>

  );



  return (

    <div className="min-h-screen pt-20">

      {/* Hero Section ... (بدون تغییر) */}

      <section className="py-20 relative overflow-hidden">

        <FloatingParticles count={30} />

        <div className="container mx-auto px-6">

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">

            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 px-4 py-2">

              <Brain className="h-4 w-4 mr-2" /> AI Projects Portfolio

            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">

              Transforming Industries with <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">AI Innovation</span>

            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">

              Explore our cutting-edge AI projects that revolutionize industries — from computer vision to natural language processing.

            </p>

          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">

            <div className="relative w-full md:w-1/2">

              <Search className="absolute left-3 top-3 text-muted-foreground h-5 w-5" />

              <Input placeholder="Search projects..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

            </div>

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>

              <SheetTrigger asChild>

                <Button variant="outline" size="icon" className="rounded-full" aria-label="Filter Menu">

                  <Menu className="h-6 w-6" />

                </Button>

              </SheetTrigger>

              <SheetContent side="right" className="w-64 sm:w-80 p-6">

                <h3 className="text-xl font-bold mb-6">Filter by Category</h3>

                <div className="flex flex-col gap-3">

                  {categories.map((cat) => (

                    <Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} onClick={() => { setSelectedCategory(cat); setMenuOpen(false); }} className="justify-start">

                      {cat}

                    </Button>

                  ))}

                </div>

              </SheetContent>

            </Sheet>

          </div>

        </div>

      </section>



      {/* Projects Grid */}

      <section className="pb-20 relative">

        <div className="container mx-auto px-6">

          {loading && <LoadingSkeleton />}

          {error && <p className="text-center text-red-500 text-lg mt-20">{error}</p>}

          {!loading && !error && (

            <>

              {filteredProjects.length > 0 ? (

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                  {filteredProjects.map((project, index) => (

                    <motion.div key={project._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}>

                      <Link to={`/projects/${project.slug}`}>

                        <Card className="neural-card group cursor-pointer h-full overflow-hidden">

                          <div className={`p-8 bg-gradient-to-br from-primary to-secondary relative`}>

                            <div className="absolute inset-0 bg-background/90" />

                            <div className="relative z-10">

                              <div className="flex items-start justify-between mb-6">

                                <Badge variant="secondary">{project.category}</Badge>

                                <Badge variant="outline">{project.status}</Badge>

                              </div>

                              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>

                              <p className="text-muted-foreground mb-6 h-20 overflow-hidden">{project.description || project.summary}</p>

                              <div className="grid grid-cols-3 gap-4 mb-6 h-16">

                                {/* ** FIX IS HERE ** */}

                                {project.metrics && Object.entries(project.metrics).map(([key, value]) => (

                                  <div key={key} className="text-center">

                                    <div className="text-lg font-bold text-primary">{value}</div>

                                    <div className="text-xs text-muted-foreground capitalize">{key}</div>

                                  </div>

                                ))}

                              </div>

                              <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">

                                Learn More <ArrowRight className="ml-2 h-4 w-4" />

                              </div>

                            </div>

                          </div>

                        </Card>

                      </Link>

                    </motion.div>

                  ))}

                </div>

              ) : (

                <p className="text-center text-muted-foreground text-lg mt-20">No projects found matching your criteria.</p>

              )}

            </>

          )}

        </div>

      </section>

    </div>

  );

};



export default Projects;
