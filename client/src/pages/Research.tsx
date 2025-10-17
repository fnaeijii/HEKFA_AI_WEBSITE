import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Calendar, User, Download, ExternalLink, Brain, FileText, Award } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingParticles from "@/components/effects/FloatingParticles";

const Research = () => {
  const researchStats = [
    { label: "Research Papers", value: "50+", icon: FileText },
    { label: "Citations", value: "2,500+", icon: Award },
    { label: "Conferences", value: "25+", icon: Brain },
    { label: "Collaborations", value: "15+", icon: User },
  ];

  const featuredPapers = [
    {
      title: "Neural Architecture Search for Efficient Computer Vision Models",
      authors: ["Dr. Sarah Chen", "Marcus Rodriguez", "Dr. Aisha Patel"],
      journal: "Nature Machine Intelligence",
      date: "2024-01-15",
      category: "Computer Vision",
      abstract: "We present a novel approach to neural architecture search that reduces computational requirements while maintaining state-of-the-art performance in computer vision tasks.",
      citations: 127,
      downloadUrl: "#",
      status: "Published",
    },
    {
      title: "Retrieval-Augmented Generation for Domain-Specific Applications",
      authors: ["Dr. Aisha Patel", "James Thompson"],
      journal: "ICML 2024",
      date: "2024-02-28",
      category: "NLP",
      abstract: "An investigation into optimizing RAG systems for specialized domains, demonstrating significant improvements in accuracy and relevance.",
      citations: 89,
      downloadUrl: "#",
      status: "Published",
    },
    {
      title: "Real-time Edge Computing for Autonomous Vehicle Vision",
      authors: ["Marcus Rodriguez", "Dr. Sarah Chen"],
      journal: "IEEE Transactions on Pattern Analysis",
      date: "2024-03-10",
      category: "Edge AI",
      abstract: "A comprehensive study on deploying computer vision models on edge devices for autonomous vehicle applications with sub-millisecond latency.",
      citations: 156,
      downloadUrl: "#",
      status: "Published",
    },
    {
      title: "Ethical AI Framework for Healthcare Applications",
      authors: ["Dr. Sarah Chen", "Dr. Aisha Patel", "James Thompson"],
      journal: "AI Ethics Journal",
      date: "2024-04-05",
      category: "AI Ethics",
      abstract: "Proposing a comprehensive framework for ensuring ethical AI deployment in healthcare, with focus on bias detection and mitigation.",
      citations: 203,
      downloadUrl: "#",
      status: "Under Review",
    },
  ];

  const caseStudies = [
    {
      title: "Smart City Traffic Optimization",
      client: "Metropolitan Transport Authority",
      description: "Implementation of AI-powered traffic management system reducing congestion by 35%",
      technologies: ["Computer Vision", "IoT", "Machine Learning"],
      results: ["35% reduction in traffic congestion", "20% decrease in emissions", "15% faster emergency response"],
      image: "/api/placeholder/400/300",
    },
    {
      title: "Healthcare Diagnostic Assistant",
      client: "Regional Medical Center",
      description: "AI-powered diagnostic tool improving accuracy and speed of medical diagnoses",
      technologies: ["Deep Learning", "Medical Imaging", "NLP"],
      results: ["94% diagnostic accuracy", "50% faster diagnosis", "Reduced physician workload"],
      image: "/api/placeholder/400/300",
    },
    {
      title: "Financial Fraud Detection",
      client: "International Bank",
      description: "Real-time fraud detection system preventing millions in fraudulent transactions",
      technologies: ["Anomaly Detection", "Real-time Processing", "Risk Assessment"],
      results: ["99.7% fraud detection rate", "$10M+ prevented losses", "< 100ms response time"],
      image: "/api/placeholder/400/300",
    },
  ];

  const upcomingEvents = [
    {
      title: "AI for Climate Change Summit",
      date: "2024-06-15",
      location: "San Francisco, CA",
      type: "Conference",
      description: "Presenting our latest research on AI applications for environmental sustainability.",
    },
    {
      title: "Neural Networks Workshop",
      date: "2024-07-20",
      location: "MIT, Cambridge",
      type: "Workshop",
      description: "Hands-on workshop on advanced neural network architectures and optimization techniques.",
    },
    {
      title: "Computer Vision Symposium",
      date: "2024-08-10",
      location: "Stanford University",
      type: "Symposium",
      description: "Symposium on the latest advances in computer vision and their real-world applications.",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <FloatingParticles count={30} />
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge 
              variant="outline" 
              className="mb-6 border-primary/30 text-primary bg-primary/10 px-4 py-2"
            >
              <Brain className="h-4 w-4 mr-2" />
              Research & Innovation
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
              Advancing the Frontiers of{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AI Research
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our research division pushes the boundaries of artificial intelligence, 
              contributing groundbreaking discoveries that shape the future of technology 
              and solve humanity's greatest challenges.
            </p>
          </motion.div>

          {/* Research Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {researchStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="neural-card text-center p-6">
                  <CardContent className="p-0">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold glow-text mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search research papers, case studies, or topics..."
                className="pl-10 pr-4 py-3 text-base"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Research Papers */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text-secondary">
              Featured Research Papers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Our latest contributions to the global AI research community
            </p>
          </motion.div>

          <div className="space-y-8">
            {featuredPapers.map((paper, index) => (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="neural-card">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <Badge 
                            variant={paper.status === "Published" ? "default" : "secondary"}
                          >
                            {paper.status}
                          </Badge>
                          <Badge variant="outline">{paper.category}</Badge>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(paper.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer">
                          {paper.title}
                        </h3>
                        
                        <div className="flex items-center space-x-2 mb-4">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {paper.authors.join(", ")}
                          </span>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {paper.abstract}
                        </p>
                        
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <span>{paper.journal}</span>
                          <span>{paper.citations} citations</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-4 lg:mt-0 lg:ml-6">
                        <Button variant="outline" size="sm" className="btn-ghost-neural">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="btn-ghost-neural">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="btn-neural">
              View All Research Papers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 relative" id="case-studies">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text-secondary">
              Real-World Impact
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Case studies showcasing how our AI research translates into practical solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="neural-card h-full overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                    <p className="text-sm text-primary mb-3">{study.client}</p>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {study.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">Technologies:</div>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-sm font-medium mb-2">Key Results:</div>
                      <ul className="space-y-1">
                        {study.results.map((result, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button variant="outline" className="btn-ghost-neural w-full">
                      Read Full Case Study
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text-secondary">
              Upcoming Events
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join us at conferences, workshops, and symposiums around the world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="neural-card h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline">{event.type}</Badge>
                      <div className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                    <p className="text-sm text-primary mb-3">{event.location}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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