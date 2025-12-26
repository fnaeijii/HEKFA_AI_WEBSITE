import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LottieIcon } from "@/components/ui/LottieIcon";
import api from "@/lib/axiosConfig";
import FloatingParticles from "@/components/effects/FloatingParticles";
import * as LucideIcons from "lucide-react";
import { useTranslation } from "react-i18next";
import { selectLocalized } from "@/lib/utils";

interface ComparisonRow {
  feature: string;
  featureFa?: string;
  traditional: string;
  traditionalFa?: string;
  withAI: string;
  withAIFa?: string;
}

interface UseCase {
  title: string;
  titleFa?: string;
  description: string;
  descriptionFa?: string;
  icon: string;
}

interface Benefit {
  icon: string;
  title: string;
  titleFa?: string;
  description: string;
  descriptionFa?: string;
}

interface HowItWorksStep {
  number: number;
  title: string;
  titleFa?: string;
  description: string;
  descriptionFa?: string;
}

interface Intelligence {
  _id: string;
  title: string;
  titleFa?: string;
  slug: string;
  subtitle: string;
  subtitleFa?: string;
  heroDescription: string;
  heroDescriptionFa?: string;
  animationData?: string;
  gradient?: string;
  whatItIs: {
    title: string;
    titleFa?: string;
    content: string;
    contentFa?: string;
  };
  howItWorks: {
    title: string;
    titleFa?: string;
    content: string;
    contentFa?: string;
    steps: HowItWorksStep[];
  };
  whyItMatters: {
    title: string;
    titleFa?: string;
    content: string;
    contentFa?: string;
    benefits: Benefit[];
  };
  comparison: {
    title: string;
    titleFa?: string;
    subtitle?: string;
    subtitleFa?: string;
    rows: ComparisonRow[];
  };
  useCases: {
    title: string;
    titleFa?: string;
    subtitle?: string;
    subtitleFa?: string;
    cases: UseCase[];
  };
  cta: {
    title: string;
    titleFa?: string;
    description: string;
    descriptionFa?: string;
    buttonText: string;
    buttonTextFa?: string;
    buttonLink: string;
  };
}

const IntelligenceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [intelligence, setIntelligence] = useState<Intelligence | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const fetchIntelligence = async () => {
      if (!slug) {
        setError("Invalid intelligence slug.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data } = await api.get(`/intelligence/${encodeURIComponent(slug)}`);
        setIntelligence(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch intelligence information. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIntelligence();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share && intelligence) {
      try {
        await navigator.share({
          title: intelligence.title,
          text: intelligence.heroDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const Icon = ({ name, ...props }: { name: string } & React.SVGProps<SVGSVGElement>) => {
    const LucideIcon = (LucideIcons as any)[name];
    if (!LucideIcon) {
      return <Check {...props} />;
    }
    return <LucideIcon {...props} />;
  };

  const renderSkeleton = () => (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-10 pt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-32 w-full" />
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="space-y-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-24 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) return renderSkeleton();

  if (error || !intelligence) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">
            {error || t("intelligenceDetail.notFound")}
          </h2>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("intelligenceDetail.backToHome")}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const {
    title,
    subtitle,
    heroDescription,
    whatItIs,
    howItWorks,
    whyItMatters,
    comparison,
    useCases,
    cta,
    animationData,
    gradient,
  } = intelligence;

  const displayTitle =
    selectLocalized(intelligence as any, "title", i18n.language) ||
    intelligence.title;
  const displaySubtitle =
    selectLocalized(intelligence as any, "subtitle", i18n.language) ||
    intelligence.subtitle;
  const displayHeroDescription =
    selectLocalized(intelligence as any, "heroDescription", i18n.language) ||
    intelligence.heroDescription;

  return (
    <div>
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 pt-32 overflow-hidden">
        <FloatingParticles count={30} />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("intelligenceDetail.backToHome")}
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {animationData && (
              <div className="flex justify-center mb-8">
                <div className="text-6xl">{animationData}</div>
              </div>
            )}

            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 px-4 py-2">
              {displaySubtitle}
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
              {displayTitle}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {displayHeroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What It Is Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="neural-card">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text-secondary">
                  {selectLocalized(
                    whatItIs as any,
                    "title",
                    i18n.language
                  ) ?? whatItIs.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {selectLocalized(
                    whatItIs as any,
                    "content",
                    i18n.language
                  ) ?? whatItIs.content}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative">
        <FloatingParticles count={20} />
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center glow-text-secondary">
              {selectLocalized(
                howItWorks as any,
                "title",
                i18n.language
              ) ?? howItWorks.title}
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {selectLocalized(
                howItWorks as any,
                "content",
                i18n.language
              ) ?? howItWorks.content}
            </p>

            <div className="space-y-8">
              {howItWorks.steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="neural-card">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                            {step.number}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-3">
                            {selectLocalized(
                              step as any,
                              "title",
                              i18n.language
                            ) ?? step.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {selectLocalized(
                              step as any,
                              "description",
                              i18n.language
                            ) ?? step.description}
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

      {/* Why It Matters Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center glow-text-secondary">
              {selectLocalized(
                whyItMatters as any,
                "title",
                i18n.language
              ) ?? whyItMatters.title}
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {selectLocalized(
                whyItMatters as any,
                "content",
                i18n.language
              ) ?? whyItMatters.content}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whyItMatters.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="neural-card h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon name={benefit.icon} className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            {selectLocalized(
                              benefit as any,
                              "title",
                              i18n.language
                            ) ?? benefit.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {selectLocalized(
                              benefit as any,
                              "description",
                              i18n.language
                            ) ?? benefit.description}
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

      {/* Comparison Table Section */}
      {comparison && comparison.rows && comparison.rows.length > 0 && (
        <section className="py-20 relative">
          <FloatingParticles count={20} />
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center glow-text-secondary">
                {selectLocalized(
                  comparison as any,
                  "title",
                  i18n.language
                ) ?? comparison.title}
              </h2>
              {comparison.subtitle && (
                <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                  {selectLocalized(
                    comparison as any,
                    "subtitle",
                    i18n.language
                  ) ?? comparison.subtitle}
                </p>
              )}

              <Card className="neural-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left p-4 font-semibold">{t("intelligenceDetail.comparison.feature")}</th>
                        <th className="text-left p-4 font-semibold">{t("intelligenceDetail.comparison.traditional")}</th>
                        <th className="text-left p-4 font-semibold text-primary">{t("intelligenceDetail.comparison.withAI")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.rows.map((row, index) => (
                        <tr
                          key={index}
                          className="border-b border-border/30 hover:bg-primary/5 transition-colors"
                        >
                          <td className="p-4 font-medium">
                            {selectLocalized(
                              row as any,
                              "feature",
                              i18n.language
                            ) ?? row.feature}
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {selectLocalized(
                              row as any,
                              "traditional",
                              i18n.language
                            ) ?? row.traditional}
                          </td>
                          <td className="p-4 text-primary font-medium">
                            {selectLocalized(
                              row as any,
                              "withAI",
                              i18n.language
                            ) ?? row.withAI}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Use Cases Section */}
      {useCases && useCases.cases && useCases.cases.length > 0 && (
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center glow-text-secondary">
                {selectLocalized(
                  useCases as any,
                  "title",
                  i18n.language
                ) ?? useCases.title}
              </h2>
              {useCases.subtitle && (
                <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                  {selectLocalized(
                    useCases as any,
                    "subtitle",
                    i18n.language
                  ) ?? useCases.subtitle}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {useCases.cases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="neural-card h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10">
                            <Icon name={useCase.icon} className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-2">
                              {selectLocalized(
                                useCase as any,
                                "title",
                                i18n.language
                              ) ?? useCase.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {selectLocalized(
                                useCase as any,
                                "description",
                                i18n.language
                              ) ?? useCase.description}
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
      )}

      {/* CTA Section */}
      {cta && (
        <section className="py-20 relative">
          <FloatingParticles count={40} />
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Card className="neural-card">
                <CardContent className="p-10 md:p-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text-secondary">
                    {selectLocalized(
                      cta as any,
                      "title",
                      i18n.language
                    ) ?? cta.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    {selectLocalized(
                      cta as any,
                      "description",
                      i18n.language
                    ) ?? cta.description}
                  </p>
                  <Button asChild className="btn-glow text-lg h-12 px-8">
                    <Link to={cta.buttonLink}>
                      {selectLocalized(
                        cta as any,
                        "buttonText",
                        i18n.language
                      ) ?? cta.buttonText}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

    </div>
    {/* Bottom fade into site footer */}
    <div 
    className="relative h-80 pointer-events-none"
    style={{
      background: `linear-gradient(180deg, 
        hsl(224, 57%, 9%) 0%,           /* سرمه‌ای پررنگ در بالا */
        hsl(224, 55%, 8%) 30%,          /* کمی کمرنگ‌تر */
        hsla(224, 53%, 7%, 0.8) 45%,    /* شروع کاهش opacity */
        hsla(224, 50%, 6%, 0.5) 60%,     /* opacity متوسط */
        hsla(224, 47%, 5%, 0.25) 75%,    /* تقریباً شفاف */
        hsla(224, 43%, 4%, 0.1) 90%,     /* خیلی شفاف */
        transparent 100%                  /* کاملاً محو */
      )`
    }}
    >
      <FloatingParticles count={40} />
        {/* <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,23,42,0) 0%, rgba(15,23,42,0.08) 35%, rgba(15,23,42,0.3) 60%, rgba(15,23,42,0.7) 85%, rgba(15,23,42,1) 100%)",
          }}
        /> */}
      </div>
    </div>
  );
};

export default IntelligenceDetail;

