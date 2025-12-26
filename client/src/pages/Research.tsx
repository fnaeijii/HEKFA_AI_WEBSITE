import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/axiosConfig';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Search, Brain, FileText, Award, BookOpen, GraduationCap, Mic, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingParticles from "@/components/effects/FloatingParticles";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useTranslation } from "react-i18next";
import { selectLocalized } from "@/lib/utils";

interface ResearchPost {
  _id: string;
  title: string;
  titleFa?: string;
  authors: string[];
  journal: string;
  publishedAt: string;
  category: string;
  summary: string;
  summaryFa?: string;
  citations: number;
  downloadUrl?: string;
  status: 'published' | 'draft';
  slug: string;
  coverImage?: string;
  heroImage?: string;
}

interface ResearchStat {
  label: string;
  labelFa?: string;
  value: string;
  valueFa?: string;
  icon: string;
}

const iconMap: { [key: string]: React.ElementType } = {
  FileText,
  Award,
  Brain,
  BookOpen,
  GraduationCap,
  Mic,
  Handshake,
};

const gradientStops = [
  'rgba(4,7,29,0)',
  'rgba(4,7,29,0.1)',
  'rgba(4,7,29,0.4)',
  'rgba(4,7,29,0.7)',
  'rgba(4,7,29,0.95)'
];

interface GroupedSection {
  category: string;
  items: ResearchPost[];
}

const MAIN_CATEGORIES = ['Computer Vision', 'NLP', 'Generative AI', 'Robotics'];

export const categoryToSlug = (category: string) =>
  category.toLowerCase().replace(/\s+/g, '-');

const Research = () => {
  const [sections, setSections] = useState<GroupedSection[]>([]);
  const [stats, setStats] = useState<ResearchStat[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsResponse, configResponse] = await Promise.all([
          api.get('/posts/grouped'),
          api.get('/config'),
        ]);

        setSections(postsResponse.data);
        setStats(configResponse.data.researchStats);
        setError(null);
      } catch (err) {
        setError('Unable to load research content. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const allPostsFlat = useMemo(
    () => sections.flatMap((section) => section.items),
    [sections]
  );

  const filteredPosts = useMemo(
    () =>
      allPostsFlat.filter((post) => {
        const localizedTitle =
          selectLocalized(post as any, "title", i18n.language) ?? post.title;
        const localizedSummary =
          selectLocalized(post as any, "summary", i18n.language) ??
          post.summary;
        const haystack = (
          (post.title || "") +
          " " +
          (post.summary || "") +
          " " +
          localizedTitle +
          " " +
          localizedSummary
        ).toLowerCase();
        return haystack.includes(searchQuery.toLowerCase());
      }),
    [allPostsFlat, searchQuery, i18n.language]
  );

  const filteredSections = useMemo(() => {
    if (!searchQuery) return sections;

    // When searching, filter items per section but keep category order
    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter((post) =>
          filteredPosts.some((p) => p._id === post._id)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [sections, filteredPosts, searchQuery]);

  const categoryLabels: Record<string, { en: string; fa: string }> = {
    'Computer Vision': { en: 'Computer Vision', fa: 'بینایی کامپیوتر' },
    'NLP': { en: 'NLP', fa: 'پردازش زبان طبیعی' },
    'Generative AI': { en: 'Generative AI', fa: 'هوش مصنوعی مولد' },
    'Robotics': { en: 'Robotics', fa: 'رباتیک' },
  };

  const sliderSections: { label: string; subtitle: string; items: ResearchPost[] }[] =
    useMemo(() => {
      // اگر سکشنی وجود نداشت، آرایه خالی برگردان (دیگر خبری از فال‌بک نیست)
      if (!filteredSections.length) {
        return [];
      }

      // منطق اصلی دسته‌بندی
      const byCategory: Record<string, ResearchPost[]> = {};
      filteredSections.forEach((section) => {
        byCategory[section.category] = section.items as ResearchPost[];
      });

      return MAIN_CATEGORIES.filter((cat) => byCategory[cat]?.length).map(
        (cat) => ({
          label: categoryLabels[cat]?.[i18n.language === 'fa' ? 'en' : 'en'] ?? cat,
          subtitle: i18n.language === 'fa' 
            ? `کارهای پرطرفدار در ${categoryLabels[cat]?.fa ?? cat}` 
            : `Trending work in ${cat}`,
          items: byCategory[cat],
        })
      );
    }, [filteredSections, i18n.language]);

  const resolvePosterImage = (paper: ResearchPost, index: number) => {
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    if (paper.coverImage) return paper.coverImage;
    if (paper.heroImage) {
      return paper.heroImage.startsWith('http')
        ? paper.heroImage
        : `${apiBaseUrl}${paper.heroImage}`;
    }

    return `https://images.unsplash.com/collection/190727/${(index % 10) + 1}?auto=format&fit=crop&w=1200&q=80`;
  };

  const showEmptyState =
    !loading && !error && allPostsFlat.length > 0 && filteredPosts.length === 0;

  return (
    <div className="min-h-screen pt-10">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <FloatingParticles count={40} />
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 px-4 py-2">
              <Brain className="h-4 w-4 mr-2" />
              {t("research.hero.badge", "Research & Innovation")}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("research.hero.title", "AI Research")}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t(
                "research.hero.subtitle",
                "Browse our latest discoveries the way you discover shows—curated rows, cinematic posters, and a depth-filled experience built on Swiper’s coverflow engine."
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <Card key={i} className="neural-card text-center p-6">
                  <CardContent className="p-0">
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : (
              stats.map((stat, index) => {
                const IconComponent = iconMap[stat.icon];
                const displayValue =
                  selectLocalized(stat as any, "value", i18n.language) ??
                  stat.value;
                const displayLabel =
                  selectLocalized(stat as any, "label", i18n.language) ??
                  stat.label;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <Card className="neural-card text-center p-6">
                      <CardContent className="p-0">
                        {IconComponent && (
                          <IconComponent className="h-8 w-8 text-primary mx-auto mb-4" />
                        )}
                        <div className="text-3xl font-bold glow-text mb-2">
                          {displayValue}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {displayLabel}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t(
                  "research.search.placeholder",
                  "Search research papers, tutorials, or case studies..."
                )}
                className="pl-10 pr-4 py-3 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {showEmptyState && (
              <p className="text-center text-muted-foreground text-sm mt-4">
                {t(
                  "research.search.empty",
                  'No matches found for "{{query}}". Try another keyword.'
                ).replace("{{query}}", searchQuery)}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Immersive Coverflow Sections */}
      <section className="py-12 md:py-20 relative">
        <div className="container mx-auto px-6 space-y-16">
          {loading && (
            <div className="space-y-8">
              {[...Array(2)].map((_, idx) => (
                <Card key={idx} className="neural-card">
                  <CardContent className="p-8 space-y-4">
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-48 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && error && (
            <p className="text-center text-red-500 text-lg">{error}</p>
          )}

          {!loading && !error && sliderSections.map((section, idx) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-primary/70 mb-2">
                    {String(idx + 1).padStart(2, "0")} · {section.label}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold glow-text-secondary">
                    {section.subtitle}
                  </h2>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  className="justify-start md:justify-end gap-2 text-muted-foreground hover:text-primary"
                >
                  <Link to={`/research/category/${categoryToSlug(section.label)}`}>
                    {t(
                      "research.section.viewAll",
                      "View all {{label}}"
                    ).replace("{{label}}", section.label)}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <Swiper
                modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
                effect="coverflow"
                grabCursor
                centeredSlides
                loop={section.items.length > 3}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 7000, disableOnInteraction: true }}
                breakpoints={{
                  0: { slidesPerView: 1.15, spaceBetween: 24 },
                  640: { slidesPerView: 1.5, spaceBetween: 32 },
                  1024: { slidesPerView: 2.4, spaceBetween: 48 },
                }}
                coverflowEffect={{
                  rotate: 32,
                  stretch: 0,
                  depth: 220,
                  modifier: 1,
                  slideShadows: false,
                }}
                className="pb-12"
              >
                {section.items.map((paper, slideIndex) => (
                  <SwiperSlide key={paper._id} className="max-w-[280px] sm:max-w-[360px] lg:max-w-[420px]">
                    <Link to={`/research/${paper.slug}`} className="block">
                      <article className="relative h-[420px] sm:h-[460px] rounded-[28px] overflow-hidden shadow-2xl group">
                        <img
                          src={resolvePosterImage(paper, slideIndex)}
                          alt={paper.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(180deg, ${gradientStops.join(', ')})`
                          }}
                        />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                          <Badge variant="outline" className="mb-3 bg-white/10 text-white border-white/20 backdrop-blur">
                            {paper.category}
                          </Badge>
                          <h3 className="text-2xl font-semibold text-white leading-tight mb-2 line-clamp-2">
                            {selectLocalized(
                              paper as any,
                              "title",
                              i18n.language
                            ) ?? paper.title}
                          </h3>
                          <p className="text-sm text-white/80 line-clamp-2">
                            {selectLocalized(
                              paper as any,
                              "summary",
                              i18n.language
                            ) ?? paper.summary}
                          </p>
                        </div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute inset-3 rounded-[24px] border border-white/20"></div>
                        </div>
                      </article>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <FloatingParticles count={25} />
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text">
              {t("research.cta.title")}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("research.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-neural">
                <Link to="/contact">
                  {t("research.cta.primary")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="btn-ghost-neural">
                <Link to="/about">{t("research.cta.secondary")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Research;