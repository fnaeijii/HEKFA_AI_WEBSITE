import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '@/lib/axiosConfig';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, ArrowRight, Brain } from 'lucide-react';
import FloatingParticles from '@/components/effects/FloatingParticles';
import type { ResearchPost } from './Research';
import { categoryToSlug } from './Research';
import { useTranslation } from 'react-i18next';
import { selectLocalized } from '@/lib/utils';

interface GroupedSection {
  category: string;
  items: ResearchPost[];
}

const MAIN_CATEGORIES: { label: string; labelFa: string; description: string; descriptionFa: string }[] = [
  {
    label: 'Computer Vision',
    labelFa: 'بینایی کامپیوتر',
    description:
      'Detection, tracking, and visual understanding systems powering quality control, safety, and perception.',
    descriptionFa:
      'سامانه‌های تشخیص، ردیابی و درک بصری که کنترل کیفیت، ایمنی و ادراک را توانمند می‌سازند.',
  },
  {
    label: 'NLP',
    labelFa: 'پردازش زبان طبیعی',
    description:
      'Language models, retrieval, and reasoning systems that understand and generate domain-specific text.',
    descriptionFa:
      'مدل‌های زبانی، بازیابی و سامانه‌های استدلال که متن‌های تخصصی را درک و تولید می‌کنند.',
  },
  {
    label: 'Generative AI',
    labelFa: 'هوش مصنوعی مولد',
    description:
      'Diffusion, transformers, and multimodal models for content creation, simulation, and exploration.',
    descriptionFa:
      'مدل‌های انتشار، ترنسفورمر و چندوجهی برای تولید محتوا، شبیه‌سازی و کاوش.',
  },
  {
    label: 'Robotics',
    labelFa: 'رباتیک',
    description:
      'Embodied intelligence, motion planning, and real-world agents that sense, decide, and act.',
    descriptionFa:
      'هوش تجسم‌یافته، برنامه‌ریزی حرکت و عوامل دنیای واقعی که حس، تصمیم‌گیری و عمل می‌کنند.',
  },
];

const slugToCategory = (slug: string | undefined) => {
  if (!slug) return undefined;
  const match = MAIN_CATEGORIES.find(
    (cat) => categoryToSlug(cat.label) === slug.toLowerCase()
  );
  return match?.label;
};

const ResearchCategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const resolvedCategory = slugToCategory(categorySlug);
  const { t, i18n } = useTranslation();

  const [sections, setSections] = useState<GroupedSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await api.get<GroupedSection[]>('/posts/grouped');
        setSections(data);
        setError(null);
      } catch (err) {
        setError(t('researchCategory.error', 'Unable to load research articles. Please try again.'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [t]);

  const activeSection = useMemo(() => {
    if (!resolvedCategory) return undefined;
    return sections.find((s) => s.category === resolvedCategory);
  }, [sections, resolvedCategory]);

  const meta = MAIN_CATEGORIES.find((c) => c.label === resolvedCategory);
  const localizedCategoryLabel = meta ? (i18n.language === 'fa' ? meta.labelFa : meta.label) : resolvedCategory;
  const localizedCategoryDescription = meta ? (i18n.language === 'fa' ? meta.descriptionFa : meta.description) : '';

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <FloatingParticles count={30} />
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-6 flex items-center justify-between gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/research">
                  <ArrowLeft className={`h-4 w-4 ${i18n.language === 'fa' ? 'ml-1' : 'mr-1'}`} />
                  {t('researchCategory.backToHub', 'Back to Research Hub')}
                </Link>
              </Button>
              <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                <Brain className={`h-4 w-4 ${i18n.language === 'fa' ? 'ml-1' : 'mr-1'}`} />
                {t('researchCategory.badge', 'Articles by Category')}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4 glow-text">
              {resolvedCategory ? (
                <>
                  <span className="text-muted-foreground">{t('researchCategory.allArticlesIn', 'All articles in')}</span>{' '}
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    {localizedCategoryLabel}
                  </span>
                </>
              ) : (
                t('researchCategory.title', 'Research Category')
              )}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {localizedCategoryDescription ||
                t('researchCategory.defaultDescription', 'Explore all research articles in this stream, including foundational work, tutorials, and applied case studies.')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 relative">
        <div className="container mx-auto px-6">
          {loading && (
            <div className="grid gap-6 md:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="neural-card">
                  <CardContent className="p-6 space-y-3">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-4 w-1/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && (error || !resolvedCategory) && (
            <div className="text-center text-red-500 text-lg">
              {error || t('researchCategory.unknownCategory', 'Unknown category.')}
            </div>
          )}

          {!loading && !error && resolvedCategory && activeSection && (
            <div className="space-y-6">
              {activeSection.items.map((post) => {
                const localizedTitle = selectLocalized(post as any, 'title', i18n.language) ?? post.title;
                const localizedSummary = selectLocalized(post as any, 'summary', i18n.language) ?? post.summary;
                const formattedDate = new Date(post.publishedAt).toLocaleDateString(
                  i18n.language === 'fa' ? 'fa-IR' : 'en-US'
                );
                const citationsText = i18n.language === 'fa' 
                  ? `${post.citations.toLocaleString('fa-IR')} ارجاع`
                  : `${post.citations} citations`;

                return (
                  <Card key={post._id} className="neural-card overflow-hidden">
                    <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0 w-full md:w-64">
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border/40">
                          <img
                            src={
                              post.coverImage ||
                              post.heroImage ||
                              'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80'
                            }
                            alt={localizedTitle}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-muted-foreground mb-3">
                          <Badge variant="outline">{post.category}</Badge>
                          <span>{formattedDate}</span>
                          <span className="text-primary/80 font-semibold">
                            {citationsText}
                          </span>
                        </div>
                        <Link to={`/research/${post.slug}`}>
                          <h2 className="text-xl md:text-2xl font-semibold mb-2 hover:text-primary transition-colors">
                            {localizedTitle}
                          </h2>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-3">
                          {post.authors?.join(', ')}
                        </p>
                        <p className="text-muted-foreground leading-relaxed line-clamp-3">
                          {localizedSummary}
                        </p>
                        <Button asChild variant="ghost" className="mt-4 md:mt-6 w-full md:w-auto justify-between md:justify-start">
                          <Link to={`/research/${post.slug}`}>
                            {t('researchCategory.readArticle', 'Read article')}
                            <ArrowRight className={`h-4 w-4 ${i18n.language === 'fa' ? 'mr-2' : 'ml-2'}`} />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {activeSection.items.length === 0 && (
                <p className="text-center text-muted-foreground">
                  {t('researchCategory.noArticles', 'No articles available for this category yet.')}
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ResearchCategoryPage;


