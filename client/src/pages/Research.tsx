import { useState, useEffect } from 'react';
// import axios from 'axios';
import api from '@/lib/axiosConfig';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Search, Calendar, User, Download, ExternalLink, Brain, FileText, Award } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingParticles from "@/components/effects/FloatingParticles";

interface ResearchPost {
  _id: string;
  title: string;
  authors: string[];
  journal: string;
  publishedAt: string;
  category: string;
  summary: string;
  citations: number;
  downloadUrl?: string;
  status: 'published' | 'draft';
  slug: string;
}

interface ResearchStat {
  label: string;
  value: string;
  icon: string;
}

const iconMap: { [key: string]: React.ElementType } = {
  FileText,
  Award,
  Brain,
  User,
};

const Research = () => {
  const [posts, setPosts] = useState<ResearchPost[]>([]);
  const [stats, setStats] = useState<ResearchStat[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const postsPromise = api.get('/posts');
        // <<-- این خط را حذف کنید -->>
        // const caseStudiesPromise = api.get('/case-studies'); 
        const configPromise = api.get('/config');

        // <<-- caseStudiesPromise و caseStudiesResponse را از اینجا حذف کنید -->>
        const [postsResponse, configResponse] = await Promise.all([
          postsPromise,
          // caseStudiesPromise, // <-- حذف شد
          configPromise,
        ]);

        setPosts(postsResponse.data);
        // <<-- این خط را حذف کنید -->>
        // setCaseStudies(caseStudiesResponse.data); 
        setStats(configResponse.data.researchStats);
        setError(null);
      } catch (err) {
        // ...
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const filteredCaseStudies = caseStudies.filter(study =>
  //   study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   study.description.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <FloatingParticles count={30} />
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 px-4 py-2"><Brain className="h-4 w-4 mr-2" /> Research & Innovation</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
              Advancing the Frontiers of <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">AI Research</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our research division pushes the boundaries of artificial intelligence, contributing groundbreaking discoveries that shape the future of technology and solve humanity's greatest challenges.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <Card key={i} className="neural-card text-center p-6"><CardContent className="p-0"><Skeleton className="h-20 w-full" /></CardContent></Card>
              ))
            ) : (
              stats.map((stat, index) => {
                const IconComponent = iconMap[stat.icon];
                return (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }}>
                    <Card className="neural-card text-center p-6">
                      <CardContent className="p-0">
                        {IconComponent && <IconComponent className="h-8 w-8 text-primary mx-auto mb-4" />}
                        <div className="text-3xl font-bold glow-text mb-2">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search research papers, or topics..."
                className="pl-10 pr-4 py-3 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Research Papers */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text-secondary">Featured Research Papers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">Our latest contributions to the global AI research community</p>
          </motion.div>

          {loading && (
            <div className="space-y-8">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="neural-card"><CardContent className="p-8"><Skeleton className="h-32 w-full" /></CardContent></Card>
              ))}
            </div>
          )}

          {error && <p className="text-center text-red-500 text-lg">{error}</p>}
          
          {!loading && !error && (
            <>
              {filteredPosts.length > 0 ? (
                <div className="space-y-8">
                  {filteredPosts.map((paper, index) => (
                    <motion.div key={paper._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.1 }}>
                      <Card className="neural-card">
                        <CardContent className="p-8">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-4">
                                <Badge variant={paper.status === "published" ? "default" : "secondary"}>{paper.status}</Badge>
                                <Badge variant="outline">{paper.category}</Badge>
                                <div className="text-sm text-muted-foreground flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {new Date(paper.publishedAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                              </div>
                              <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer">{paper.title}</h3>
                              <div className="flex items-center space-x-2 mb-4">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{paper.authors.join(", ")}</span>
                              </div>
                              <p className="text-muted-foreground mb-4 leading-relaxed">{paper.summary}</p>
                              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                                <span>{paper.journal}</span>
                                <span>{paper.citations} citations</span>
                              </div>
                            </div>
                            <div className="flex space-x-2 mt-4 lg:mt-0 lg:ml-6">
                              <Button variant="outline" size="sm" className="btn-ghost-neural"><Download className="h-4 w-4 mr-2" /> Download</Button>
                              <Button variant="outline" size="sm" className="btn-ghost-neural"><ExternalLink className="h-4 w-4 mr-2" /> View</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground text-lg">
                  {posts.length > 0 ? "No research papers found matching your search." : "No research papers available at the moment."}
                </p>
              )}
            </>
          )}

          <div className="text-center mt-12">
            <Button className="btn-neural">View All Research Papers <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <FloatingParticles count={20} />
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text">
              Collaborate with Our Research Team
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Interested in collaborating on research projects or discussing 
              potential partnerships? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-neural">
                <Link to="/contact">
                  Contact Research Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="btn-ghost-neural">
                <Link to="/about">About Our Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Research;