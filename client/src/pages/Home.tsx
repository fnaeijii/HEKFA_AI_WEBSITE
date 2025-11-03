import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, Sparkles, ChevronRight, Quote, Users, TrendingUp, Heart
} from "lucide-react";
import { Link } from "react-router-dom";
import FloatingParticles from "@/components/effects/FloatingParticles";
// import ThreeNeuralBackground from "@/components/effects/ThreeNeuralBackground";
// import AIChatbot from "@/components/ui/AIChatbot";
import { LottieIcon } from "@/components/ui/LottieIcon";
import FeaturedSlider from "@/components/slider/FeaturedSlider";

// وارد کردن ابزارهای لازم برای اتصال به بک‌اند
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import api from '@/lib/axiosConfig';
import { Skeleton } from "@/components/ui/skeleton";

// وارد کردن انیمیشن‌ها (مانند قبل)
import eyeBlinkingAnimation from "@/assets/animations/eye-blinking.json";
import brainAnimation from "@/assets/animations/Brain.json";
import networkAnimation from "@/assets/animations/Network.json";
import chatAnimation from "@/assets/animations/Chatbot-typing.json";
import faceAnimation from "@/assets/animations/Face-Recognition.json";
import aiAnimation from "@/assets/animations/AI animation.json";
import aicoreAnimation from "@/assets/animations/ai core.json";
import IdeaBulbAnimation from "@/assets/animations/Inspiration.json";
import SecurityAnimation from "@/assets/animations/Security.json";
import lightingAnimation from "@/assets/animations/lighting.json";
import globeAnimation from "@/assets/animations/Globe.json";

// تعریف Interface برای نوع داده پروژه
interface Project {
  _id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  image?: string; // تصویر را اختیاری در نظر می‌گیریم
}

// تابع برای دریافت پروژه‌های ویژه از API
const fetchFeaturedProjects = async (): Promise<Project[]> => {
  const { data } = await api.get('/projects');
  // پروژه‌هایی که isFeatured هستند را فیلتر کرده و فقط ۴ تای اول را برمی‌گردانیم
  return data.filter((p: any) => p.isFeatured).slice(0, 4);
};


const Home = () => {
  const { t } = useTranslation();
  
  // استفاده از useQuery برای دریافت و مدیریت داده‌های پروژه‌های ویژه
  const { 
    data: featuredProjects, 
    isLoading: isLoadingProjects, 
    isError: isErrorProjects 
  } = useQuery({
    queryKey: ['featuredProjects'],
    queryFn: fetchFeaturedProjects,
  });

  // تبدیل داده‌های دریافت شده به فرمت مورد نیاز اسلایدر
  const featuredSlides = featuredProjects?.map((project, index) => ({
    // <<-- FIX IS HERE: Use the array index as a numeric ID
    id: index + 1,
    image: project.image || `https://picsum.photos/1200/600?random=${project._id}`,
    title: project.title,
    description: project.summary,
    category: project.category,
    buttonText: "View Project Details",
    buttonLink: `/projects/${project.slug}`
  }));

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.2 } },
    viewport: { once: true }
  };

  // About cards data
  const aboutCards = [
    {
      animationData:IdeaBulbAnimation,
      title: "Innovation First",
      description: "Pushing the boundaries of artificial intelligence to solve complex real-world challenges with cutting-edge research."
    },
    {
      animationData:SecurityAnimation,
      title: "Trust & Security",
      description: "Enterprise-grade security and ethical AI practices ensure your data and systems remain protected at all times."
    },
    {
      animationData:lightingAnimation,
      title: "Lightning Fast",
      description: "Optimized algorithms and scalable infrastructure deliver real-time AI insights without compromise."
    },
    {
      animationData:globeAnimation,
      title: "Global Impact",
      description: "Serving organizations across 50+ countries with AI solutions that transform industries worldwide."
    }
  ];

  // Products/Solutions data
  const solutions = [
    {
      animationData: eyeBlinkingAnimation,
      title: "Computer Vision",
      description: "Advanced image recognition and video analytics for security, automation, and quality control.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      animationData: networkAnimation,
      title: "Neural Networks",
      description: "Deep learning models that adapt and evolve to solve your most complex business problems.",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      animationData: faceAnimation,
      title: "Machine Learning",
      description: "Predictive analytics and intelligent automation that optimize operations and drive growth.",
      gradient: "from-teal-500 to-emerald-500"
    },
    {
      animationData: chatAnimation,
      title: "Natural Language AI",
      description: "Conversational AI and language understanding that enhances customer experiences.",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "Hekfa's AI solutions transformed our operations, increasing efficiency by 300% within the first quarter.",
      author: "Sarah Chen",
      role: "CTO, TechCorp International",
      image: "/api/placeholder/80/80"
    },
    {
      quote: "The computer vision system deployed by Hekfa has revolutionized our quality control process completely.",
      author: "Michael Rodriguez",
      role: "VP Operations, Manufacturing Inc",
      image: "/api/placeholder/80/80"
    },
    {
      quote: "Working with Hekfa has been transformative. Their expertise in AI is unmatched in the industry.",
      author: "Emma Thompson",
      role: "Director of Innovation, FinanceHub",
      image: "/api/placeholder/80/80"
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-transparent">
      {/* AI Chatbot with enhanced floating button */}
      {/* <AIChatbot /> */}
      
      {/* Hero Section - (بدون تغییر) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* <ThreeNeuralBackground /> */}
        <FloatingParticles count={80} />
        <motion.div
          className="absolute top-1/3 right-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
        >
          <LottieIcon 
            animationData={aicoreAnimation}
            size={1150}
          />
        </motion.div>

        <div className="container mx-auto px-6 py-32 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge 
                variant="outline" 
                className="mb-8 border-primary/30 bg-primary/5 px-6 py-3 backdrop-blur-sm text-sm text-glow-reveal"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Next-Generation Artificial Intelligence
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent text-glow-reveal">
              Transforming Ideas
              </span>
              <br />
              <motion.span 
                className="text-foreground text-glow-reveal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Into Intelligence
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Hekfa pioneers cutting-edge solutions in AI, LLMs, IOTs, Computer Vision, and Voice Processing. We turn tomorrow's possibilities into today's reality.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="relative"
            >
              <Button asChild className="btn-glow text-lg h-14 px-12">
                <Link to="/projects">
                  Explore Our AI Solutions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2 shadow-lg" style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
            <div className="w-1 h-2 bg-primary rounded-full animate-bounce" style={{ boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)' }} />
          </div>
        </motion.div>
      </section>

      {/* Featured Content Slider Section - DYNAMIC */}
      {isLoadingProjects && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <Skeleton className="w-full h-[500px] rounded-lg" />
          </div>
        </section>
      )}

      {isErrorProjects && (
        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <p className="text-red-500">Failed to load featured content. Please try again later.</p>
          </div>
        </section>
      )}

      {featuredSlides && featuredSlides.length > 0 && (
        <FeaturedSlider 
          slides={featuredSlides}
          autoPlay={true}
          autoPlayInterval={7000}
          showNavigation={true}
          showPagination={true}
          showPlayPause={true}
        />
      )}

      {/* About Section - (بدون تغییر) */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="text-center mb-20"
          >
            <Badge variant="outline" className="mb-4 border-secondary/30 text-secondary">
              Our Foundation
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Built on Innovation
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              At Hekfa, we believe artificial intelligence should amplify human potential, 
              not replace it. Our mission is to create AI that inspires trust and drives meaningful change.
            </p>
          </motion.div>

          <motion.div 
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {aboutCards.map((card, index) => (
              <motion.div key={card.title} {...fadeInUp}>
                <Card className="glass-card h-full group cursor-pointer">
                  <CardContent className="p-8">
                    <div className="mb-6 inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                      <LottieIcon 
                        animationData={card.animationData}
                        size={64}
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products/Solutions Section */}
      <section className="py-32 relative">
        <FloatingParticles count={30} />
        
        <div className="container mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="text-center mb-20"
          >
            <Badge variant="outline" className="mb-4 border-accent/30 text-accent">
              AI Solutions
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Powered by Intelligence
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive AI products designed to transform every aspect of your business operations.
            </p>
          </motion.div>

          <motion.div 
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {solutions.map((solution, index) => (
              <motion.div key={solution.title} {...fadeInUp}>
                <Card className="neural-card h-full group cursor-pointer overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <CardContent className="p-10 relative z-10">
                    <div className="flex items-start gap-6">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <LottieIcon 
                          animationData={solution.animationData}
                          size={80}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                          {solution.title}
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                          {solution.description}
                        </p>
                        <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                          Learn more <ChevronRight className="h-5 w-5 ml-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      
      {/* Final CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <FloatingParticles count={60} />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Ready to Experience the Future?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Join hundreds of forward-thinking organizations already transforming their 
              operations with Hekfa's AI solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild className="btn-glow text-lg h-14 px-12">
                <Link to="/contact">
                  Start Your AI Journey
                  <Sparkles className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10 text-lg h-14 px-12">
                <Link to="/projects">
                  View Case Studies
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-16 flex items-center justify-center gap-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span>500+ Clients Worldwide</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                <span>99.9% Uptime SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-accent" />
                <span>24/7 Expert Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;