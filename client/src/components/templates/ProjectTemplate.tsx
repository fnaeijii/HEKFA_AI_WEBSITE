import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  CTAButtonPayload,
  ProjectInfoItem,
  OverviewDetails,
  VideoConfig,
  FeatureItem,
  ArchitectureInfo,
  ChallengeItem,
  PerformanceComparison,
  ResultMetric,
  UseCaseItem,
  TestimonialItem,
  CTASection,
} from '@/types/project';

const renderIcon = (icon?: string, className?: string) => {
  if (!icon) return null;
  const LucideIcon = (LucideIcons as Record<string, React.ComponentType<any> | undefined>)[icon];
  if (LucideIcon) {
    return <LucideIcon className={className} />;
  }
  return (
    <span className={className}>
      {icon}
    </span>
  );
};

const AnimatedCounter = ({ value, suffix = '' }: { value: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));

  useEffect(() => {
    if (!isInView || Number.isNaN(numericValue)) return;
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  if (Number.isNaN(numericValue)) {
    return (
      <span ref={ref}>
        {value}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref}>
      {isInView ? count.toFixed(value.includes('.') ? 1 : 0) : '0'}
      {suffix}
    </span>
  );
};

const resolveLinkWrapper = (href: string) => {
  const isInternal = href.startsWith('/') || href.startsWith('#');
  if (isInternal) {
    return { component: Link, props: { to: href } };
  }
  return {
    component: 'a',
    props: { href, target: '_blank', rel: 'noopener noreferrer' },
  };
};

interface ProjectTemplateProps {
  category: string;
  categoryIcon?: string;
  title: string;
  subtitle: string;
  heroButtons?: CTAButtonPayload[];
  heroBackground?: ReactNode;
  projectInfo?: ProjectInfoItem[];
  overview?: OverviewDetails;
  video?: VideoConfig;
  features?: FeatureItem[];
  architecture?: ArchitectureInfo;
  challenges?: ChallengeItem[];
  performance?: PerformanceComparison;
  results?: ResultMetric[];
  useCases?: UseCaseItem[];
  testimonials?: TestimonialItem[];
  ctaSection?: CTASection;
  breadcrumbs?: { label: string; href: string }[];
  mainImageUrl?: string;
  fallbackVideoUrl?: string;
}

export const ProjectTemplate = ({
  category,
  categoryIcon,
  title,
  subtitle,
  heroButtons = [],
  heroBackground,
  projectInfo = [],
  overview,
  video,
  features = [],
  architecture,
  challenges = [],
  performance,
  results = [],
  useCases = [],
  testimonials = [],
  ctaSection,
  breadcrumbs,
  mainImageUrl,
  fallbackVideoUrl,
}: ProjectTemplateProps) => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);

  const hasOverview = overview && (overview.description?.length || overview.goals?.length || overview.challenge);
  const hasMedia = Boolean(
    (video && (video.type !== 'placeholder' ? video.url : video.thumbnail)) || fallbackVideoUrl || mainImageUrl
  );
  const hasArchitecture = Boolean(architecture && (architecture.description || architecture.image));
  const hasPerformance =
    Boolean(performance?.before && performance.before.length) || Boolean(performance?.after && performance.after.length);

  const renderMediaContent = () => {
    if (video && video.type && video.type !== 'placeholder' && video.url) {
      if (video.type === 'upload') {
        return (
          <video
            src={video.url}
            className="w-full h-full object-cover"
            controls
            autoPlay
            muted
            loop
          >
            Your browser does not support the video tag.
          </video>
        );
      }
      return (
        <iframe
          src={video.url}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
    if (fallbackVideoUrl) {
      return (
        <video src={fallbackVideoUrl} className="w-full h-full object-cover" controls>
          Your browser does not support the video tag.
        </video>
      );
    }
    if (video?.thumbnail) {
      return <img src={video.thumbnail} alt="Demo thumbnail" className="w-full h-full object-cover" />;
    }
    if (mainImageUrl) {
      return <img src={mainImageUrl} alt={title} className="w-full h-full object-cover" />;
    }
    return (
      <div className="relative z-10 text-center">
        <p className="text-muted-foreground">{t('projectTemplate.labels.demoPlaceholder')}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative">
      {heroBackground}

      <div className="relative z-10">
        <div className="w-full">
            <section id="hero" ref={heroRef} className="h-screen w-full relative overflow-hidden flex items-center justify-center">
              {breadcrumbs && (
                <div className="absolute top-8 left-0 right-0 z-20">
                  <div className="container mx-auto px-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center space-x-2 text-sm text-muted-foreground"
                    >
                      {breadcrumbs.map((crumb, index) => (
                        <div key={crumb.href} className="flex items-center space-x-2">
                          <Link to={crumb.href} className="hover:text-primary transition-colors">
                            {crumb.label}
                          </Link>
                          {index < breadcrumbs.length - 1 && <span>/</span>}
                        </div>
                      ))}
                      <span>/</span>
                      <span className="text-foreground">{title}</span>
                    </motion.div>
                  </div>
                </div>
              )}
              <div className="container mx-auto px-6 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center max-w-4xl mx-auto"
                >
                  <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 px-4 py-2">
                    {renderIcon(categoryIcon, 'h-4 w-4 mr-2 inline-flex items-center justify-center')}
                    {category}
                  </Badge>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">{title}</h1>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{subtitle}</p>
                  {heroButtons.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="flex flex-wrap justify-center gap-4"
                    >
                      {heroButtons.map((btn, index) => {
                        const ButtonIcon = btn.icon;
                        const { component: Wrapper, props } = resolveLinkWrapper(btn.href);
                        return (
                          <Button
                            key={`hero-button-${index}`}
                            variant={btn.variant || 'default'}
                            className={btn.variant === 'default' ? 'btn-glow' : ''}
                            asChild
                          >
                            <Wrapper {...props}>
                              {btn.label}
                              {ButtonIcon && renderIcon(ButtonIcon, 'ml-2 h-4 w-4 inline-block')}
                            </Wrapper>
                          </Button>
                        );
                      })}
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </section>

            {projectInfo.length > 0 && (
              <section id="info" className="py-24 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center glow-text-secondary">
                      {t('projectTemplate.sections.summary')}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                      {projectInfo.map((info, index) => (
                        <motion.div
                          key={`${info.label}-${index}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card className="neural-card text-center p-4 h-full">
                            <CardContent className="p-0">
                              {renderIcon(info.icon, 'h-6 w-6 mx-auto mb-2 text-primary')}
                              <div className="text-xs text-muted-foreground mb-1">{info.label}</div>
                              <div className="text-sm font-bold">{info.value}</div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>
            )}

            {hasOverview && overview && (
              <section id="overview" className="py-24 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                  >
                    <Card className="glass-card p-8 md:p-12 border-primary/10">
                      <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text-secondary">
                        {t('projectTemplate.sections.overview')}
                      </h2>
                      <div className="space-y-4 text-muted-foreground leading-relaxed">
                        {overview.description?.map((paragraph, index) => (
                          <p key={`paragraph-${index}`}>{paragraph}</p>
                        ))}
                      </div>
                      {overview.goals && overview.goals.length > 0 && (
                        <div className="mt-8">
                          <h3 className="text-xl font-bold mb-4 text-secondary">{t('projectTemplate.labels.goals')}</h3>
                          <ul className="space-y-2">
                            {overview.goals.map((goal, index) => (
                              <li key={`goal-${index}`} className="flex items-start space-x-2">
                                <span className="text-primary mt-1">•</span>
                                <span className="text-muted-foreground">{goal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {overview.challenge && (
                        <div className="mt-8">
                          <h3 className="text-xl font-bold mb-4 text-accent">{t('projectTemplate.labels.challenge')}</h3>
                          <p className="text-muted-foreground leading-relaxed">{overview.challenge}</p>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                </div>
              </section>
            )}

            {hasMedia && (
              <section id="demo" className="py-24 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center glow-text-secondary">
                      {t('projectTemplate.sections.systemInAction')}
                    </h2>
                    <Card className="neural-card overflow-hidden group border-primary/30">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center relative">
                        {renderMediaContent()}
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </section>
            )}

            {features.length > 0 && (
              <section id="features" className="py-24 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center glow-text-secondary">
                      {t('projectTemplate.sections.features')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {features.map((feature, index) => (
                        <motion.div
                          key={`feature-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <Card className="neural-card h-full group">
                            <CardContent className="p-6">
                              <div className="mb-4 p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors w-fit">
                                {renderIcon(feature.icon, 'h-8 w-8 text-primary')}
                              </div>
                              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>
            )}

            {hasArchitecture && architecture && (
              <section id="architecture" className="py-24 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center glow-text-secondary">
                      {t('projectTemplate.sections.architecture')}
                    </h2>
                    <Card className="glass-card overflow-hidden">
                      <CardContent className="p-8">
                        {architecture.image ? (
                          <img src={architecture.image} alt="System Architecture" className="w-full rounded-lg" />
                        ) : (
                          <div className="aspect-video bg-gradient-to-br from-primary/10 via-background to-secondary/10 rounded-lg flex items-center justify-center border border-primary/20">
                            <p className="text-muted-foreground">{t('projectTemplate.labels.architecturePlaceholder')}</p>
                          </div>
                        )}
                        {architecture.description && (
                          <p className="text-muted-foreground mt-6 leading-relaxed">
                            {architecture.description}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </section>
            )}

            {challenges.length > 0 && (
              <section id="challenges" className="py-24 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center glow-text-secondary">
                      {t('projectTemplate.sections.challenges')}
                    </h2>
                    <div className="space-y-6">
                      {challenges.map((challenge, index) => (
                        <motion.div
                          key={`challenge-${index}`}
                          initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <Card className="glass-card overflow-hidden">
                            <CardContent className="p-8">
                              <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                  <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 rounded-lg bg-destructive/10">
                                      {renderIcon(challenge.icon, 'h-5 w-5 text-destructive')}
                                    </div>
                                    <h3 className="text-xl font-bold text-destructive">{t('projectTemplate.labels.challengeTitle')}</h3>
                                  </div>
                                  <p className="text-muted-foreground leading-relaxed">{challenge.problem}</p>
                                </div>
                                <div>
                                  <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 rounded-lg bg-secondary/10">
                                      {renderIcon(challenge.icon, 'h-5 w-5 text-secondary')}
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary">{t('projectTemplate.labels.solutionTitle')}</h3>
                                  </div>
                                  <p className="text-muted-foreground leading-relaxed">{challenge.solution}</p>
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

            {hasPerformance && performance && (
              <section id="performance" className="py-24 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center glow-text-secondary">
                      {t('projectTemplate.sections.performance')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      {['before', 'after'].map((phase) => {
                        const items = phase === 'before' ? performance.before : performance.after;
                        if (!items || items.length === 0) return null;
                        return (
                          <Card
                            key={phase}
                            className={`glass-card ${phase === 'before' ? 'border-destructive/30' : 'border-secondary/30'}`}
                          >
                            <CardHeader>
                              <CardTitle className={phase === 'before' ? 'text-destructive' : 'text-secondary'}>
                                {phase === 'before' ? t('projectTemplate.labels.before') : t('projectTemplate.labels.after')}
                              </CardTitle>
                              <CardDescription>
                                {phase === 'before' ? t('projectTemplate.labels.initialState') : t('projectTemplate.labels.optimizedState')}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-3">
                                {items.map((item, index) => (
                                  <li key={`${phase}-${index}`} className="flex justify-between items-center">
                                    <span className="text-muted-foreground">{item.label}</span>
                                    <span className="font-mono font-bold">
                                      {item.value}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              </section>
            )}

            {results.length > 0 && (
              <section id="results" className="py-24 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center glow-text-secondary">
                      {t('projectTemplate.sections.results')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {results.map((metric, index) => (
                        <motion.div
                          key={`metric-${index}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <Card className="neural-card text-center p-6 h-full group hover:shadow-glow-primary">
                            <CardContent className="p-0">
                              <div className="mb-4 p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors w-fit mx-auto">
                                {renderIcon(metric.icon, 'h-8 w-8 text-primary')}
                              </div>
                              <div className="text-4xl font-bold mb-2 glow-text">
                                <AnimatedCounter value={metric.value} suffix={metric.suffix || ''} />
                              </div>
                              <div className="text-sm text-muted-foreground">{metric.label}</div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>
            )}

            {useCases.length > 0 && (
              <section id="usecases" className="py-24 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center glow-text-secondary">
                      {t('projectTemplate.sections.useCases')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {useCases.map((useCase, index) => (
                        <motion.div
                          key={`usecase-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <Card className="glass-card h-full group hover:border-primary/50 transition-all">
                            <CardContent className="p-6">
                              <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                                  {renderIcon(useCase.icon, 'h-6 w-6 text-accent')}
                                </div>
                                <div className="flex-1">
                                  {useCase.industry && (
                                    <Badge variant="outline" className="mb-2 text-xs">
                                      {useCase.industry}
                                    </Badge>
                                  )}
                                  <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {useCase.description}
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

            {testimonials.length > 0 && (
              <section id="testimonials" className="py-24 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center glow-text-secondary">
                      {t('projectTemplate.sections.testimonials')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {testimonials.map((testimonial, index) => (
                        <motion.div
                          key={`testimonial-${index}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <Card className="neural-card h-full">
                            <CardContent className="p-6">
                              <p className="text-muted-foreground italic mb-6 leading-relaxed">
                                “{testimonial.quote}”
                              </p>
                              <div className="flex items-center space-x-3">
                                {testimonial.avatar && (
                                  <img
                                    src={testimonial.avatar}
                                    alt={testimonial.author}
                                    className="w-12 h-12 rounded-full object-cover"
                                  />
                                )}
                                <div>
                                  <div className="font-bold">{testimonial.author}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {testimonial.role}
                                    {testimonial.company && ` • ${testimonial.company}`}
                                  </div>
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

            {ctaSection && (
              <section id="cta" className="py-24 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center"
                  >
                    <Card className="glass-card border-primary/30 p-12 md:p-16">
                      <h2 className="text-3xl md:text-5xl font-bold mb-6 glow-text">
                        {ctaSection.title}
                      </h2>
                      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        {ctaSection.description}
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        {ctaSection.buttons.map((btn, index) => {
                          const ButtonIcon = btn.icon;
                          const { component: Wrapper, props } = resolveLinkWrapper(btn.href);
                          return (
                            <Button
                              key={`cta-button-${index}`}
                              variant={btn.variant || 'default'}
                              size="lg"
                              className={btn.variant === 'default' ? 'btn-glow' : ''}
                              asChild
                            >
                              <Wrapper {...props}>
                                {btn.label}
                                {ButtonIcon && renderIcon(ButtonIcon, 'ml-2 h-4 w-4')}
                              </Wrapper>
                            </Button>
                          );
                        })}
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
  );
};