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

import { useQuery } from "@tanstack/react-query";
import api from '@/lib/axiosConfig';
import { Skeleton } from "@/components/ui/skeleton";
import { selectLocalized } from "@/lib/utils";

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

interface Project {
  _id: string;
  slug: string;
  title: string;
  titleFa?: string;
  summary: string;
  summaryFa?: string;
  category: string;
  mainImageUrl?: string;
  randomSlideshowImage?: string | null;
}

const fetchFeaturedProjects = async (): Promise<Project[]> => {
  const { data } = await api.get('/projects', {
    params: { featured: true },
  });
  return data.slice(0, 4);
};


const Home = () => {
  const { t, i18n } = useTranslation();
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const resolveImageUrl = (imagePath?: string | null) => {
    if (!imagePath) return null;
    return imagePath.startsWith('http') ? imagePath : `${apiBaseUrl}${imagePath}`;
  };
  const { 
    data: featuredProjects, 
    isLoading: isLoadingProjects, 
    isError: isErrorProjects 
  } = useQuery({
    queryKey: ['featuredProjects'],
    queryFn: fetchFeaturedProjects,
  });

  const featuredSlides = featuredProjects?.map((project, index) => {
    const resolvedImage = resolveImageUrl(project.randomSlideshowImage || project.mainImageUrl);
    return {
      id: index + 1,
      image: resolvedImage || `https://picsum.photos/1200/600?random=${project._id}`,
      title: selectLocalized(project, "title", i18n.language) ?? project.title,
      description: selectLocalized(project, "summary", i18n.language) ?? project.summary,
      category: project.category,
      buttonText: t("hero.exploreBtn"),
      buttonLink: `/projects/${project.slug}`
    };
  });

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

  // Fetch intelligence/solutions data dynamically
  const { 
    data: solutions, 
    isLoading: isLoadingSolutions, 
    isError: isErrorSolutions 
  } = useQuery({
    queryKey: ['intelligenceItems'],
    queryFn: async () => {
      const { data } = await api.get('/intelligence?featured=true');
      return data;
    },
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-transparent">
      {/* AI Chatbot with enhanced floating button */}
      {/* <AIChatbot /> */}
      
      <section className="relative min-h-screen flex items-center justify-center overflow-visible">
        {/* <ThreeNeuralBackground /> */}
        <FloatingParticles count={80} />
        <motion.div
          className="absolute top-1/3 right-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
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
                {t("hero.badge")}
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent text-glow-reveal">
                {t("hero.title")}
              </span>
              <br />
              <motion.span 
                className="text-foreground text-glow-reveal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                {/* Second line already part of hero.title in translations, keep visual split */}
                {""}
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {t("hero.subtitle")}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="relative"
            >
              <Button asChild className="btn-glow text-lg h-14 px-12">
                <Link to="/projects">
                  {t("hero.exploreBtn")}
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

      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="text-center mb-20"
          >
            <Badge variant="outline" className="mb-4 border-secondary/30 text-secondary">
              {t("home.foundation.badge")}
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                {t("home.foundation.title")}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("home.foundation.subtitle")}
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
                      {t(`home.foundation.card${index + 1}Title` as const)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`home.foundation.card${index + 1}Description` as const)}
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
              {t("home.solutions.badge")}
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {t("home.solutions.title")}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("home.solutions.subtitle")}
            </p>
          </motion.div>

          {isLoadingSolutions && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-xl" />
              ))}
            </div>
          )}

          {isErrorSolutions && (
            <div className="text-center text-red-500">
              Failed to load intelligence items. Please try again later.
            </div>
          )}

          {solutions && solutions.length > 0 && (
            <motion.div 
              {...staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {solutions.map((solution: any, index: number) => {
                // Map animation data strings to actual animation objects
                const animationMap: { [key: string]: any } = {
                  'eye-blinking': eyeBlinkingAnimation,
                  'network': networkAnimation,
                  'face-recognition': faceAnimation,
                  'chatbot-typing': chatAnimation,
                };
                const animationData = solution.animationData 
                  ? animationMap[solution.animationData] || eyeBlinkingAnimation
                  : eyeBlinkingAnimation;

                const localizedTitle =
                  selectLocalized(solution as any, "title", i18n.language) ??
                  solution.title;
                const localizedDescription =
                  selectLocalized(
                    solution as any,
                    "heroDescription",
                    i18n.language
                  ) ??
                  selectLocalized(
                    solution as any,
                    "description",
                    i18n.language
                  ) ??
                  solution.heroDescription ??
                  solution.description;

                return (
                  <motion.div key={solution._id || solution.title} {...fadeInUp}>
                    <Card className="neural-card h-full group cursor-pointer overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient || 'from-blue-500 to-cyan-500'} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      <CardContent className="p-10 relative z-10">
                        <Link to={`/intelligence/${solution.slug}`} className="block">
                          <div className="flex items-start gap-6">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <LottieIcon 
                                animationData={animationData}
                                size={80}
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                                {localizedTitle}
                              </h3>
                              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                                {localizedDescription}
                              </p>
                              <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                                {t("home.solutions.learnMore")}
                                <ChevronRight className="h-5 w-5 ml-1" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
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
                {t("home.finalCta.title")}
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              {t("home.finalCta.subtitle")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild className="btn-glow text-lg h-14 px-12">
                <Link to="/contact">
                  {t("home.finalCta.primary")}
                  <Sparkles className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10 text-lg h-14 px-12">
                <Link to="/projects">
                  {t("home.finalCta.secondary")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-16 flex items-center justify-center gap-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span>{t("home.finalCta.stat1")}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                <span>{t("home.finalCta.stat2")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-accent" />
                <span>{t("home.finalCta.stat3")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;