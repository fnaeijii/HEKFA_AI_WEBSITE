// src/pages/ProjectDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/lib/axiosConfig';
import { useTranslation } from "react-i18next";
import { selectLocalized } from "@/lib/utils";
import ProjectBackground from "@/components/effects/ProjectBackground";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectTemplate } from "@/components/templates/ProjectTemplate";
import type { ProjectRecord, CTAButtonPayload, OverviewDetails, ProjectInfoItem } from '@/types/project';

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        // اطمینان حاصل کنید که این آدرس با روت بک‌اند شما هماهنگ است
        const response = await api.get(`/projects/slug/${slug}`);
        setProject(response.data);
      } catch (err) {
        setError("Failed to load project details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) return <ProjectDetailSkeleton />;
  if (error || !project) return <div className="h-screen flex items-center justify-center text-red-500">{error || 'Project not found.'}</div>;

  const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
  const resolveMediaUrl = (path?: string) => {
    if (!path) return undefined;
    if (path.startsWith('http')) return path;
    return `${baseUrl}${path}`;
  };

  const displayTitle =
    selectLocalized(project as any, "title", i18n.language) ?? project.title;
  const displayDescription =
    selectLocalized(project as any, "description", i18n.language) ??
    project.description;
  const displayOverview =
    selectLocalized(project as any, "overview", i18n.language) ?? project.overview;

  // Helper to get localized value from nested objects
  const getLocalized = <T extends { [key: string]: any }>(obj: T, key: string, faKey: string): any => {
    return i18n.language === 'fa' && obj[faKey] ? obj[faKey] : obj[key];
  };

  // Process overviewDetails with bilingual support
  const overviewDetails: OverviewDetails | undefined = project.overviewDetails
    ? {
        description: getLocalized(project.overviewDetails, 'description', 'descriptionFa') || project.overviewDetails.description || [],
        goals: getLocalized(project.overviewDetails, 'goals', 'goalsFa') || project.overviewDetails.goals,
        challenge: getLocalized(project.overviewDetails, 'challenge', 'challengeFa') || project.overviewDetails.challenge,
      }
    : displayOverview
    ? {
        description: displayOverview.split('\n').filter(Boolean),
      }
    : undefined;

  // Process heroButtons with bilingual support
  const heroButtons: CTAButtonPayload[] = project.heroButtons && project.heroButtons.length
    ? project.heroButtons.map((btn) => ({
        ...btn,
        label: getLocalized(btn, 'label', 'labelFa') || btn.label,
      }))
    : [
        project.demoUrl
          ? {
              label: t("projectDetail.viewLiveDemo"),
              href: project.demoUrl,
              variant: 'default' as const,
              icon: 'Zap',
            }
          : null,
        {
          label: t("projectDetail.backToProjects"),
          href: '/projects',
          variant: 'outline' as const,
          icon: 'ArrowLeft',
        },
      ].filter(Boolean) as CTAButtonPayload[];

  // Process projectInfo with bilingual support
  const projectInfoItems: ProjectInfoItem[] = project.projectInfo && project.projectInfo.length
    ? project.projectInfo.map((info) => ({
        ...info,
        label: getLocalized(info, 'label', 'labelFa') || info.label,
        value: getLocalized(info, 'value', 'valueFa') || info.value,
      }))
    : [
        { label: 'Category', value: project.category, icon: 'Layers' },
        project.status ? { label: 'Status', value: project.status, icon: 'Gauge' } : null,
      ].filter(Boolean) as ProjectInfoItem[];

  // Process features with bilingual support
  const features = project.features?.map((feature) => ({
    ...feature,
    title: getLocalized(feature, 'title', 'titleFa') || feature.title,
    description: getLocalized(feature, 'description', 'descriptionFa') || feature.description,
  }));

  // Process architecture with bilingual support
  const architecture = project.architecture
    ? {
        ...project.architecture,
        description: getLocalized(project.architecture, 'description', 'descriptionFa') || project.architecture.description,
      }
    : undefined;

  // Process challenges with bilingual support
  const challenges = project.challenges?.map((challenge) => ({
    ...challenge,
    problem: getLocalized(challenge, 'problem', 'problemFa') || challenge.problem,
    solution: getLocalized(challenge, 'solution', 'solutionFa') || challenge.solution,
  }));

  // Process performance with bilingual support
  const performance = project.performance
    ? {
        before: project.performance.before?.map((item) => ({
          ...item,
          label: getLocalized(item, 'label', 'labelFa') || item.label,
        })),
        after: project.performance.after?.map((item) => ({
          ...item,
          label: getLocalized(item, 'label', 'labelFa') || item.label,
        })),
      }
    : undefined;

  // Process results with bilingual support
  const results = project.results?.map((result) => ({
    ...result,
    label: getLocalized(result, 'label', 'labelFa') || result.label,
  }));

  // Process useCases with bilingual support
  const useCases = project.useCases?.map((useCase) => ({
    ...useCase,
    title: getLocalized(useCase, 'title', 'titleFa') || useCase.title,
    description: getLocalized(useCase, 'description', 'descriptionFa') || useCase.description,
    industry: getLocalized(useCase, 'industry', 'industryFa') || useCase.industry,
  }));

  // Process testimonials with bilingual support
  const testimonials = project.testimonials?.map((testimonial) => ({
    ...testimonial,
    quote: getLocalized(testimonial, 'quote', 'quoteFa') || testimonial.quote,
    role: getLocalized(testimonial, 'role', 'roleFa') || testimonial.role,
    company: getLocalized(testimonial, 'company', 'companyFa') || testimonial.company,
  }));

  // Process ctaSection with bilingual support
  const ctaSection = project.ctaSection
    ? {
        ...project.ctaSection,
        title: getLocalized(project.ctaSection, 'title', 'titleFa') || project.ctaSection.title,
        description: getLocalized(project.ctaSection, 'description', 'descriptionFa') || project.ctaSection.description,
        buttons: project.ctaSection.buttons.map((btn) => ({
          ...btn,
          label: getLocalized(btn, 'label', 'labelFa') || btn.label,
        })),
      }
    : undefined;

  const normalizedVideo = project.video
    ? {
        ...project.video,
        url: project.video.type === 'upload' ? resolveMediaUrl(project.video.url) : project.video.url,
        thumbnail: resolveMediaUrl(project.video.thumbnail),
      }
    : undefined;

  return (
    <ProjectTemplate
      category={project.category}
      categoryIcon={project.categoryIcon}
      title={displayTitle}
      subtitle={displayDescription}
      heroButtons={heroButtons}
      heroBackground={<ProjectBackground category={project.category} />}
      projectInfo={projectInfoItems}
      overview={overviewDetails}
      video={normalizedVideo}
      features={features}
      architecture={architecture}
      challenges={challenges}
      performance={performance}
      results={results}
      useCases={useCases}
      testimonials={testimonials}
      ctaSection={ctaSection}
      breadcrumbs={[{ label: t("projectDetail.breadcrumbProjects"), href: "/projects" }]}
      mainImageUrl={resolveMediaUrl(project.mainImageUrl)}
      fallbackVideoUrl={resolveMediaUrl(project.videoUrl)}
    />
  );
};

// --- کامپوننت اسکلتون برای حالت لودینگ ---
const ProjectDetailSkeleton = () => (
  <div className="container mx-auto px-6 pt-28">
    <Skeleton className="h-4 w-48 mb-20" />
    <div className="text-center max-w-4xl mx-auto">
      <Skeleton className="h-6 w-32 mb-6 mx-auto" />
      <Skeleton className="h-16 w-full mb-6" />
      <Skeleton className="h-10 w-3/4 mb-8 mx-auto" />
      <Skeleton className="h-12 w-48 mx-auto" />
    </div>
    <div className="py-20 max-w-4xl mx-auto">
      <Skeleton className="h-[300px] w-full" />
    </div>
  </div>
);


export default ProjectDetailPage;