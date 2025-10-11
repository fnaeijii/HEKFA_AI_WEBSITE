import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Eye, Cpu, Mic, Car, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingParticles from "@/components/effects/FloatingParticles";

const Projects = () => {
  const featuredProjects = [
    {
      id: "face-recognition",
      title: "Face Recognition System",
      description: "Advanced facial recognition technology for security and identity verification with real-time processing capabilities.",
      category: "Computer Vision",
      status: "Production",
      technologies: ["Deep Learning", "CNN", "OpenCV", "Python", "TensorFlow"],
      metrics: {
        accuracy: "99.7%",
        speed: "< 100ms",
        users: "1M+",
      },
      icon: Eye,
      gradient: "from-primary to-secondary",
      link: "/projects/face-recognition",
    },
    {
      id: "smart-parking",
      title: "Smart Parking Solution",
      description: "AI-powered vehicle detection and license plate recognition system for intelligent parking management.",
      category: "IoT + AI",
      status: "Production",
      technologies: ["YOLO", "OCR", "Edge Computing", "IoT", "React"],
      metrics: {
        accuracy: "98.5%",
        coverage: "24/7",
        efficiency: "+45%",
      },
      icon: Car,
      gradient: "from-secondary to-accent",
      link: "/projects/smart-parking",
    },
    {
      id: "rag-llms",
      title: "RAG for LLMs",
      description: "Retrieval-Augmented Generation systems for enhanced language models with domain-specific knowledge.",
      category: "NLP",
      status: "Research",
      technologies: ["Transformers", "Vector DB", "LangChain", "FAISS", "GPT"],
      metrics: {
        accuracy: "94.2%",
        latency: "< 2s",
        contexts: "10K+",
      },
      icon: Brain,
      gradient: "from-accent to-primary",
      link: "/projects/rag-llms",
    },
    {
      id: "ai-animation",
      title: "AI Animation Generator",
      description: "Text-to-animation AI system that creates high-quality animated content from natural language descriptions.",
      category: "Generative AI",
      status: "Beta",
      technologies: ["Diffusion Models", "GAN", "3D Rendering", "WebGL"],
      metrics: {
        quality: "HD 1080p",
        speed: "30 FPS",
        styles: "50+",
      },
      icon: FileText,
      gradient: "from-primary to-accent",
      link: "/projects/ai-animation",
    },
    {
      id: "speech-to-text",
      title: "Speech-to-Text Engine",
      description: "Real-time speech recognition system with multi-language support and noise cancellation technology.",
      category: "Audio AI",
      status: "Production",
      technologies: ["ASR", "Transformer", "WebRTC", "Python", "FastAPI"],
      metrics: {
        accuracy: "96.8%",
        languages: "25+",
        latency: "< 500ms",
      },
      icon: Mic,
      gradient: "from-secondary to-primary",
      link: "/projects/speech-to-text",
    },
  ];

  const categories = [
    { name: "All Projects", count: featuredProjects.length, active: true },
    { name: "Computer Vision", count: 2, active: false },
    { name: "NLP", count: 2, active: false },
    { name: "Generative AI", count: 1, active: false },
    { name: "Audio AI", count: 1, active: false },
    { name: "IoT + AI", count: 1, active: false },
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
              AI Projects Portfolio
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
              Transforming Industries with{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AI Innovation
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our cutting-edge AI projects that are revolutionizing how businesses 
              operate across industries, from computer vision to natural language processing.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={category.active ? "default" : "outline"}
                className={category.active ? "btn-neural" : "btn-ghost-neural"}
                size="sm"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Link to={project.link}>
                  <Card className="neural-card group cursor-pointer h-full overflow-hidden">
                    <div className={`p-8 bg-gradient-to-br ${project.gradient} relative`}>
                      <div className="absolute inset-0 bg-background/90" />
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                          <div className="p-3 rounded-lg bg-primary/10 backdrop-blur-sm">
                            <project.icon className="h-8 w-8 text-primary" />
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant={project.status === "Production" ? "default" : "secondary"}
                              className="mb-2"
                            >
                              {project.status}
                            </Badge>
                            <div className="text-sm text-muted-foreground">
                              {project.category}
                            </div>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Metrics */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {Object.entries(project.metrics).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-lg font-bold text-primary">{value}</div>
                              <div className="text-xs text-muted-foreground capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Technologies */}
                        <div className="mb-6">
                          <div className="text-sm text-muted-foreground mb-2">Technologies:</div>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{project.technologies.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Projects Teaser */}
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
              Exploring Next-Generation AI
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our research division is constantly pushing the boundaries of what's possible 
              with artificial intelligence. Discover our latest research and publications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-neural">
                <Link to="/research">
                  View Research Papers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="btn-ghost-neural">
                <Link to="/contact">Discuss Collaboration</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;