import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Target, Eye, Award, Users, Lightbulb, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingParticles from "@/components/effects/FloatingParticles";

const About = () => {
  const stats = [
    { label: "AI Projects Completed", value: "500+", icon: Brain },
    { label: "Expert Team Members", value: "150+", icon: Users },
    { label: "Client Satisfaction", value: "99%", icon: Award },
    { label: "Research Papers", value: "50+", icon: Lightbulb },
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We push the boundaries of what's possible with AI, always staying at the forefront of technological advancement.",
      icon: Lightbulb,
    },
    {
      title: "Ethical AI",
      description: "We develop AI solutions that are transparent, fair, and designed to augment human capabilities responsibly.",
      icon: Shield,
    },
    {
      title: "Global Impact",
      description: "Our solutions address real-world challenges and create positive impact across industries worldwide.",
      icon: Globe,
    },
    {
      title: "Excellence Driven",
      description: "We maintain the highest standards in research, development, and delivery of AI solutions.",
      icon: Award,
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief AI Scientist",
      specialty: "Deep Learning & Neural Architecture",
      image: "/api/placeholder/300/400",
      bio: "Leading expert in neural network architectures with 15+ years in AI research.",
    },
    {
      name: "Marcus Rodriguez",
      role: "VP of Computer Vision",
      specialty: "Image Processing & Recognition",
      image: "/api/placeholder/300/400",
      bio: "Pioneer in computer vision technologies with multiple patents in visual AI.",
    },
    {
      name: "Dr. Aisha Patel",
      role: "Director of Machine Learning",
      specialty: "Predictive Analytics & Optimization",
      image: "/api/placeholder/300/400",
      bio: "Expert in machine learning algorithms and statistical modeling for enterprise solutions.",
    },
    {
      name: "James Thompson",
      role: "Lead AI Engineer",
      specialty: "Neural Networks & Implementation",
      image: "/api/placeholder/300/400",
      bio: "Full-stack AI engineer specializing in production deployment of ML models.",
    },
  ];

  const expertise = [
    "Deep Neural Network Architectures",
    "Computer Vision & Image Processing",
    "Natural Language Processing",
    "Reinforcement Learning Systems",
    "Edge AI & Real-time Processing",
    "Ethical AI Development",
    "MLOps & Production Deployment",
    "Custom AI Solution Design",
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
              About Hekfa AI Division
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
              Pioneering the Future of{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We are Hekfa's specialized AI division, comprising visionary researchers, engineers, 
              and innovators dedicated to pushing the boundaries of artificial intelligence and 
              creating transformative solutions.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
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
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text-secondary">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At Hekfa AI, we believe that artificial intelligence should augment human capabilities, 
                not replace them. Our mission is to develop ethical, transparent, and powerful AI 
                solutions that solve real-world problems and create positive impact across industries.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                From healthcare diagnostics to autonomous systems, from financial analysis to creative 
                applications, we harness the power of neural networks, machine learning, and computer 
                vision to build the intelligent systems of tomorrow.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Our Expertise</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {expertise.map((skill) => (
                    <div key={skill} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3" />
                      <span className="text-muted-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button asChild className="btn-neural">
                <Link to="/projects">Explore Our Work</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <FloatingParticles count={15} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="h-32 w-32 text-primary/60" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our AI research and development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="neural-card text-center h-full">
                  <CardContent className="p-8">
                    <div className="p-4 rounded-lg bg-primary/10 w-fit mx-auto mb-6">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative" id="team">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text-secondary">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              World-class AI researchers and engineers driving innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="neural-card overflow-hidden">
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="secondary" className="mb-2">
                        {member.specialty}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary text-sm mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.bio}
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
              Join Us in Shaping the Future
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're looking to collaborate, join our team, or transform 
              your business with AI, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-neural">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" className="btn-ghost-neural">
                <Link to="/research">View Our Research</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;