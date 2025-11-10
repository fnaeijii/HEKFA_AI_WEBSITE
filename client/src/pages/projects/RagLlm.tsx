import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Brain, CheckCircle2, Zap, Database, Search } from "lucide-react";
import { Link } from "react-router-dom";
import RagLlmBackground from "@/components/effects/NLPBackground";

const RagLlm = () => {
  const technologies = [
    { name: "Transformers", icon: "🤖" },
    { name: "FAISS", icon: "🔍" },
    { name: "LangChain", icon: "🔗" },
    { name: "GPT", icon: "💬" },
    { name: "Vector DB", icon: "🗄️" },
    { name: "Python", icon: "🐍" },
  ];

  const keyFeatures = [
    {
      icon: CheckCircle2,
      title: "94.2% Accuracy",
      description: "Highly accurate responses grounded in domain-specific knowledge",
    },
    {
      icon: Database,
      title: "10K+ Contexts",
      description: "Massive knowledge base with efficient retrieval mechanisms",
    },
    {
      icon: Search,
      title: "Semantic Search",
      description: "Advanced embedding-based retrieval for relevant context",
    },
    {
      icon: Zap,
      title: "< 2s Latency",
      description: "Fast response times with optimized vector search",
    },
  ];

  return (
    <div className="min-h-screen pt-20 relative">
      <RagLlmBackground />
      
      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 pt-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 text-sm text-muted-foreground mb-8"
          >
            <Link to="/projects" className="hover:text-primary transition-colors">
              Projects
            </Link>
            <span>/</span>
            <span className="text-foreground">RAG for LLMs</span>
          </motion.div>
        </div>

        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge 
                variant="outline" 
                className="mb-6 border-accent/30 text-accent bg-accent/10 px-4 py-2"
              >
                <Brain className="h-4 w-4 mr-2" />
                Natural Language Processing
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
                RAG for LLMs
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Retrieval-Augmented Generation systems that enhance language models with 
                domain-specific knowledge, reducing hallucinations and improving accuracy.
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Button className="btn-glow group">
                  View Live Demo
                  <Zap className="ml-2 h-4 w-4 group-hover:animate-pulse" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="glass-card p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text-secondary">
                  Project Overview
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Our RAG (Retrieval-Augmented Generation) system addresses one of the biggest 
                    challenges in large language models: the tendency to hallucinate or provide 
                    outdated information. By combining powerful LLMs with dynamic knowledge retrieval, 
                    we create AI systems that are both intelligent and grounded in truth.
                  </p>
                  <p>
                    The system works by converting documents into high-dimensional vector embeddings 
                    stored in specialized vector databases. When a user asks a question, we perform 
                    semantic search to find the most relevant context, then inject this information 
                    into the LLM's prompt, ensuring responses are accurate and verifiable.
                  </p>
                  <p>
                    Key innovations include multi-stage retrieval strategies, context compression 
                    techniques, and intelligent re-ranking algorithms. The result is a system that 
                    can answer complex questions with 94.2% accuracy while maintaining sub-2-second 
                    response times.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center glow-text-secondary">
                System in Action
              </h2>
              <div className="neural-card overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-accent/20 via-background to-primary/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="h-32 w-32 text-accent/30 animate-pulse" />
                  </div>
                  <div className="relative z-10 text-center">
                    <p className="text-muted-foreground">Demo Video / Interactive Preview</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technologies Used */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center glow-text-secondary">
                Technologies Used
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <Card className="glass-card text-center p-6 h-full border-accent/20 hover:border-accent/50 transition-colors">
                      <CardContent className="p-0">
                        <div className="text-4xl mb-3">{tech.icon}</div>
                        <div className="text-sm font-medium">{tech.name}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center glow-text-secondary">
                Key Features & Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {keyFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="neural-card h-full group">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                            <feature.icon className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Back to Projects */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Button asChild className="btn-glow group">
                <Link to="/projects">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Back to All Projects
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RagLlm;
