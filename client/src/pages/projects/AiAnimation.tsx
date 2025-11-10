import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Wand2, CheckCircle2, Zap, Palette, Video } from "lucide-react";
import { Link } from "react-router-dom";
import AiAnimationBackground from "@/components/effects/AiAnimationBackground";

const AiAnimation = () => {
  const technologies = [
    { name: "Diffusion", icon: "✨" },
    { name: "GAN", icon: "🎨" },
    { name: "WebGL", icon: "🎮" },
    { name: "Three.js", icon: "🌟" },
    { name: "PyTorch", icon: "🔥" },
    { name: "CUDA", icon: "⚡" },
  ];

  const keyFeatures = [
    {
      icon: Video,
      title: "HD 1080p Quality",
      description: "Professional-grade animations with crisp, high-definition output",
    },
    {
      icon: Zap,
      title: "30 FPS Generation",
      description: "Smooth, real-time animation creation at cinematic frame rates",
    },
    {
      icon: Palette,
      title: "50+ Art Styles",
      description: "Diverse visual styles from anime to photorealistic rendering",
    },
    {
      icon: CheckCircle2,
      title: "Text-to-Animation",
      description: "Transform natural language descriptions into dynamic visuals",
    },
  ];

  return (
    <div className="min-h-screen pt-20 relative">
      <AiAnimationBackground />
      
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
            <span className="text-foreground">AI Animation</span>
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
                className="mb-6 border-primary/30 text-primary bg-primary/10 px-4 py-2"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Generative AI
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
                AI Animation Generator
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Revolutionary text-to-animation AI system that creates high-quality animated 
                content from natural language descriptions in multiple artistic styles.
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
                    The AI Animation Generator represents a breakthrough in creative AI technology, 
                    enabling artists, marketers, and content creators to generate professional-quality 
                    animations using simple text descriptions. This democratizes animation production, 
                    reducing costs and time while maintaining artistic quality.
                  </p>
                  <p>
                    Built on cutting-edge diffusion models and GANs, our system understands complex 
                    scene descriptions, character movements, and stylistic preferences. Users can 
                    specify everything from camera angles to lighting conditions, and the AI generates 
                    coherent, temporally-consistent animations that match the vision.
                  </p>
                  <p>
                    The system supports over 50 artistic styles, from anime and cartoon aesthetics to 
                    photorealistic rendering. Advanced motion synthesis ensures smooth transitions and 
                    natural character movements, while our proprietary style transfer algorithms 
                    maintain consistency across frames at 30 FPS in full HD resolution.
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
                <div className="aspect-video bg-gradient-to-br from-primary/20 via-background to-accent/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Wand2 className="h-32 w-32 text-primary/30 animate-pulse" />
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
                    <Card className="glass-card text-center p-6 h-full border-primary/20 hover:border-primary/50 transition-colors">
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
                          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <feature.icon className="h-6 w-6 text-primary" />
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

export default AiAnimation;
