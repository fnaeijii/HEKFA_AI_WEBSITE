export type CTAButtonVariant = 'default' | 'outline' | 'ghost';

export interface CTAButtonPayload {
  label: string;
  labelFa?: string;
  href: string;
  variant?: CTAButtonVariant;
  icon?: string;
}

export interface ProjectInfoItem {
  label: string;
  labelFa?: string;
  value: string;
  valueFa?: string;
  icon?: string;
}

export interface OverviewDetails {
  description: string[];
  descriptionFa?: string[];
  goals?: string[];
  goalsFa?: string[];
  challenge?: string;
  challengeFa?: string;
}

export interface VideoConfig {
  type?: 'youtube' | 'vimeo' | 'placeholder' | 'upload';
  url?: string;
  thumbnail?: string;
}

export interface FeatureItem {
  icon?: string;
  title: string;
  titleFa?: string;
  description: string;
  descriptionFa?: string;
}

export interface ArchitectureInfo {
  image?: string;
  description?: string;
  descriptionFa?: string;
}

export interface ChallengeItem {
  problem: string;
  problemFa?: string;
  solution: string;
  solutionFa?: string;
  icon?: string;
}

export interface PerformanceStat {
  label: string;
  labelFa?: string;
  value: string;
}

export interface PerformanceComparison {
  before?: PerformanceStat[];
  after?: PerformanceStat[];
}

export interface ResultMetric {
  label: string;
  labelFa?: string;
  value: string;
  suffix?: string;
  icon?: string;
  color?: string;
}

export interface UseCaseItem {
  title: string;
  titleFa?: string;
  description: string;
  descriptionFa?: string;
  icon?: string;
  industry?: string;
  industryFa?: string;
}

export interface TestimonialItem {
  quote: string;
  quoteFa?: string;
  author: string;
  role: string;
  roleFa?: string;
  company?: string;
  companyFa?: string;
  avatar?: string;
}

export interface CTASection {
  title: string;
  titleFa?: string;
  description: string;
  descriptionFa?: string;
  buttons: CTAButtonPayload[];
}

export interface ProjectRecord {
  _id: string;
  title: string;
  titleFa?: string;
  slug: string;
  category: string;
  categoryIcon?: string;
  description: string;
  descriptionFa?: string;
  overview: string;
  overviewFa?: string;
  overviewDetails?: OverviewDetails;
  status?: string;
  isFeatured?: boolean;
  heroButtons?: CTAButtonPayload[];
  projectInfo?: ProjectInfoItem[];
  video?: VideoConfig;
  features?: FeatureItem[];
  architecture?: ArchitectureInfo;
  challenges?: ChallengeItem[];
  performance?: PerformanceComparison;
  results?: ResultMetric[];
  useCases?: UseCaseItem[];
  testimonials?: TestimonialItem[];
  ctaSection?: CTASection;
  mainImageUrl?: string;
  slideshowImages?: { url: string; altText?: string; order?: number }[];
  demoUrl?: string;
  videoUrl?: string;
  metrics?: Record<string, unknown>;
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
}

