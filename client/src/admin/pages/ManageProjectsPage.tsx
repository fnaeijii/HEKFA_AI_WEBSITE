import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axiosConfig';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, Edit, MoreHorizontal, PlusCircle, Trash2 } from 'lucide-react';
import type {
  ProjectRecord,
  CTAButtonPayload,
  ProjectInfoItem,
  OverviewDetails,
  VideoConfig,
  FeatureItem,
  ArchitectureInfo,
  ChallengeItem,
  PerformanceComparison,
  PerformanceStat,
  ResultMetric,
  UseCaseItem,
  TestimonialItem,
  CTASection,
} from '@/types/project';

interface LanguageValue {
  en: string;
  fa: string;
}

const emptyLang: LanguageValue = { en: '', fa: '' };
const CATEGORY_OPTIONS = ['Computer Vision', 'Computer Vision & AI', 'NLP', 'Speech', 'IoT', 'Other'];
const STATUS_OPTIONS = ['Production', 'Beta', 'Research', 'Completed'];
const CTA_VARIANTS: CTAButtonPayload['variant'][] = ['default', 'outline', 'ghost'];

const createSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

const createHeroButton = (): CTAButtonPayload => ({ label: '', href: '', variant: 'default', icon: '' });
const createProjectInfo = (): ProjectInfoItem => ({ label: '', value: '', icon: '' });
const createFeature = (): FeatureItem => ({ icon: '', title: '', description: '' });
const createChallenge = (): ChallengeItem => ({ icon: '', problem: '', solution: '' });
const createPerformanceItem = (): PerformanceStat => ({ label: '', value: '' });
const createResultMetric = (): ResultMetric => ({ label: '', value: '', suffix: '', icon: '', color: '' });
const createUseCase = (): UseCaseItem => ({ title: '', description: '', icon: '', industry: '' });
const createTestimonial = (): TestimonialItem => ({ quote: '', author: '', role: '', company: '', avatar: '' });
const createCTASection = (): CTASection => ({
  title: '',
  description: '',
  buttons: [createHeroButton()],
});

const fetchProjects = async (): Promise<ProjectRecord[]> => {
  const { data } = await api.get('/projects?all=true');
  return data;
};

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await api.post(`/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.url;
};

const uploadMultipleImages = async (files: File[]): Promise<{ url: string; order: number }[]> => {
  const uploads: { url: string; order: number }[] = [];
  for (let i = 0; i < files.length; i += 1) {
    const url = await uploadImage(files[i]);
    uploads.push({ url, order: i + 1 });
  }
  return uploads;
};

const ManageProjectsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(null);
  const [title, setTitle] = useState<LanguageValue>(emptyLang);
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState<LanguageValue>(emptyLang);
  const [overview, setOverview] = useState<LanguageValue>(emptyLang);
  const [overviewDetails, setOverviewDetails] = useState<OverviewDetails>({
    description: [''],
    goals: [''],
    challenge: '',
  });
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [categoryIcon, setCategoryIcon] = useState('');
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [heroButtons, setHeroButtons] = useState<CTAButtonPayload[]>([createHeroButton()]);
  const [projectInfoItems, setProjectInfoItems] = useState<ProjectInfoItem[]>([createProjectInfo()]);
  const [videoConfig, setVideoConfig] = useState<VideoConfig>({ type: 'placeholder', url: '', thumbnail: '' });
  const [features, setFeatures] = useState<FeatureItem[]>([createFeature()]);
  const [architecture, setArchitecture] = useState<ArchitectureInfo>({ image: '', description: '' });
  const [architectureEnabled, setArchitectureEnabled] = useState(false);
  const [challenges, setChallenges] = useState<ChallengeItem[]>([createChallenge()]);
  const [performance, setPerformance] = useState<PerformanceComparison>({
    before: [createPerformanceItem()],
    after: [createPerformanceItem()],
  });
  const [results, setResults] = useState<ResultMetric[]>([createResultMetric()]);
  const [useCases, setUseCases] = useState<UseCaseItem[]>([createUseCase()]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([createTestimonial()]);
  const [ctaSection, setCtaSection] = useState<CTASection>(createCTASection());
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [slideshowFiles, setSlideshowFiles] = useState<File[]>([]);
  const [existingMainImageUrl, setExistingMainImageUrl] = useState('');
  const [existingSlideshowImages, setExistingSlideshowImages] = useState<{ url: string; order?: number }[]>([]);
  const [demoUrl, setDemoUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (!editingProject) {
      setSlug(createSlug(title.en));
    }
  }, [title.en, editingProject]);

  const queryClient = useQueryClient();

  const { data: projects, isLoading, isError, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const { mutate: removeProject } = useMutation({
    mutationFn: async (slugValue: string) => api.delete(`/projects/${slugValue}`),
    onSuccess: () => {
      toast.success('Project deleted.');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete project.');
    },
  });

  const resetForm = () => {
    setTitle(emptyLang);
    setSlug('');
    setDescription(emptyLang);
    setOverview(emptyLang);
    setOverviewDetails({ description: [''], goals: [''], challenge: '' });
    setCategory(CATEGORY_OPTIONS[0]);
    setCategoryIcon('');
    setStatus(STATUS_OPTIONS[0]);
    setIsFeatured(false);
    setHeroButtons([createHeroButton()]);
    setProjectInfoItems([createProjectInfo()]);
    setVideoConfig({ type: 'placeholder', url: '', thumbnail: '' });
    setFeatures([createFeature()]);
    setArchitecture({ image: '', description: '' });
    setArchitectureEnabled(false);
    setChallenges([createChallenge()]);
    setPerformance({ before: [createPerformanceItem()], after: [createPerformanceItem()] });
    setResults([createResultMetric()]);
    setUseCases([createUseCase()]);
    setTestimonials([createTestimonial()]);
    setCtaSection(createCTASection());
    setMainImageFile(null);
    setSlideshowFiles([]);
    setExistingMainImageUrl('');
    setExistingSlideshowImages([]);
    setDemoUrl('');
    setVideoUrl('');
    setEditingProject(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.en || !description.en) {
      toast.error('Please complete the required fields.');
      return;
    }

    let mainImageUrlToUse = existingMainImageUrl;
    if (mainImageFile) {
      try {
        mainImageUrlToUse = await uploadImage(mainImageFile);
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to upload main image.');
        return;
      }
    }

    if (!mainImageUrlToUse) {
      toast.error('Please upload a hero image.');
      return;
    }

    let slideshowPayload = existingSlideshowImages;
    if (slideshowFiles.length) {
      try {
        slideshowPayload = await uploadMultipleImages(slideshowFiles);
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to upload slideshow images.');
        return;
      }
    }

    const trimmedOverviewDetails: OverviewDetails | undefined = (() => {
      const descriptionEntries = (overviewDetails.description || [])
        .map((p) => p.trim())
        .filter(Boolean);
      const goalEntries = (overviewDetails.goals || []).map((g) => g.trim()).filter(Boolean);
      const challengeEntry = overviewDetails.challenge?.trim();
      if (!descriptionEntries.length && !goalEntries.length && !challengeEntry) return undefined;
      return {
        description: descriptionEntries,
        ...(goalEntries.length ? { goals: goalEntries } : {}),
        ...(challengeEntry ? { challenge: challengeEntry } : {}),
      };
    })();

    const overviewText = overview.en || trimmedOverviewDetails?.description?.join('\n\n') || '';
    if (!overviewText) {
      toast.error('Please provide a project overview.');
      return;
    }

    const payload = {
      title: title.en,
      titleFa: title.fa || undefined,
      slug,
      category,
      categoryIcon: categoryIcon || undefined,
      description: description.en,
      descriptionFa: description.fa || undefined,
      overview: overviewText,
      overviewFa: overview.fa || undefined,
      overviewDetails: trimmedOverviewDetails,
      status,
      isFeatured,
      heroButtons: heroButtons.filter((btn) => btn.label && btn.href),
      projectInfo: projectInfoItems.filter((item) => item.label && item.value),
      video:
        videoConfig.type !== 'placeholder' || videoConfig.url || videoConfig.thumbnail
          ? {
              type: videoConfig.type || 'placeholder',
              url: videoConfig.url || undefined,
              thumbnail: videoConfig.thumbnail || undefined,
            }
          : undefined,
      features: features.filter((feature) => feature.title && feature.description),
      architecture:
        architectureEnabled && (architecture.description?.trim() || architecture.image?.trim())
          ? {
              image: architecture.image || undefined,
              description: architecture.description || undefined,
            }
          : undefined,
      challenges: challenges.filter((challenge) => challenge.problem && challenge.solution),
      performance: (() => {
        const before = (performance.before || []).filter((item) => item.label && item.value);
        const after = (performance.after || []).filter((item) => item.label && item.value);
        if (!before.length && !after.length) return undefined;
        return { before, after };
      })(),
      results: results.filter((metric) => metric.label && metric.value),
      useCases: useCases.filter((useCase) => useCase.title && useCase.description),
      testimonials: testimonials.filter((testimonial) => testimonial.quote && testimonial.author && testimonial.role),
      ctaSection:
        ctaSection.title?.trim() && ctaSection.description?.trim()
          ? {
              title: ctaSection.title,
              description: ctaSection.description,
              buttons: (ctaSection.buttons || []).filter((btn) => btn.label && btn.href),
            }
          : undefined,
      mainImageUrl: mainImageUrlToUse,
      slideshowImages: slideshowPayload,
      demoUrl: demoUrl || undefined,
      videoUrl: videoUrl || undefined,
    };

    if (editingProject) {
      updateProjectMutation.mutate({ slug: editingProject.slug, payload });
    } else {
      createProjectMutation.mutate(payload);
    }
  };

  const createProjectMutation = useMutation({
    mutationFn: (payload: any) => api.post('/projects', payload),
    onSuccess: () => {
      toast.success('Project created successfully.');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || err.message || 'Failed to create project.');
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ slug, payload }: { slug: string; payload: any }) => api.put(`/projects/${slug}`, payload),
    onSuccess: () => {
      toast.success('Project updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || err.message || 'Failed to update project.');
    },
  });

  const isSaving = createProjectMutation.isPending || updateProjectMutation.isPending;

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (project: ProjectRecord) => {
    setEditingProject(project);
    setTitle({ en: project.title || '', fa: project.titleFa || '' });
    setSlug(project.slug);
    setCategory(project.category);
    setCategoryIcon(project.categoryIcon || '');
    setDescription({ en: project.description || '', fa: project.descriptionFa || '' });
    setOverview({ en: project.overview || '', fa: project.overviewFa || '' });
    setOverviewDetails(
      project.overviewDetails || {
        description: project.overview?.split('\n').filter(Boolean) || [''],
        goals: [''],
        challenge: '',
      }
    );
    setStatus(project.status || STATUS_OPTIONS[0]);
    setIsFeatured(Boolean(project.isFeatured));
    setHeroButtons(project.heroButtons && project.heroButtons.length ? project.heroButtons : [createHeroButton()]);
    setProjectInfoItems(
      project.projectInfo && project.projectInfo.length ? project.projectInfo : [createProjectInfo()]
    );
    setVideoConfig(project.video || { type: 'placeholder', url: '', thumbnail: '' });
    setFeatures(project.features && project.features.length ? project.features : [createFeature()]);
    setArchitecture(project.architecture || { image: '', description: '' });
    setArchitectureEnabled(Boolean(project.architecture && (project.architecture.image || project.architecture.description)));
    setChallenges(project.challenges && project.challenges.length ? project.challenges : [createChallenge()]);
    setPerformance({
      before: project.performance?.before && project.performance.before.length ? project.performance.before : [createPerformanceItem()],
      after: project.performance?.after && project.performance.after.length ? project.performance.after : [createPerformanceItem()],
    });
    setResults(project.results && project.results.length ? project.results : [createResultMetric()]);
    setUseCases(project.useCases && project.useCases.length ? project.useCases : [createUseCase()]);
    setTestimonials(project.testimonials && project.testimonials.length ? project.testimonials : [createTestimonial()]);
    setCtaSection(
      project.ctaSection || {
        title: '',
        description: '',
        buttons: [createHeroButton()],
      }
    );
    setExistingMainImageUrl(project.mainImageUrl || '');
    setExistingSlideshowImages(project.slideshowImages || []);
    setMainImageFile(null);
    setSlideshowFiles([]);
    setDemoUrl(project.demoUrl || '');
    setVideoUrl(project.videoUrl || '');
    setIsDialogOpen(true);
  };

  const renderSkeletons = () =>
    [...Array(3)].map((_, i) => (
      <TableRow key={i}>
        <TableCell>
          <Skeleton className="h-4 w-1/3" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-1/3" />
        </TableCell>
        <TableCell className="text-right">
          <Skeleton className="h-8 w-8 ml-auto" />
        </TableCell>
      </TableRow>
    ));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              resetForm();
            }
            setIsDialogOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Edit Project' : 'New Project'}</DialogTitle>
              <DialogDescription>Provide bilingual copy and media for the project.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4">
                <BilingualField label="Title" value={title} onChange={setTitle} required />
                <InputWithLabel
                  id="slug"
                  label="Slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  description="Auto-generated from the English title."
                  required
                  disabled={Boolean(editingProject)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <SelectWithLabel label="Category" value={category} onValueChange={setCategory} options={CATEGORY_OPTIONS} />
                  <SelectWithLabel label="Status" value={status} onValueChange={setStatus} options={STATUS_OPTIONS} />
                </div>
                <InputWithLabel
                  id="categoryIcon"
                  label="Category Icon (Lucide or emoji)"
                  value={categoryIcon}
                  onChange={(e) => setCategoryIcon(e.target.value)}
                  description="Example: Eye, Cpu, or 😎"
                />
                <BilingualField label="Short Description" value={description} onChange={setDescription} textarea required />
                <BilingualField label="Overview Summary" value={overview} onChange={setOverview} textarea required />
                <SectionCard title="Detailed Overview">
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Paragraphs</Label>
                    {(overviewDetails.description || []).map((paragraph, index) => (
                      <div key={`overview-${index}`} className="flex gap-3">
                        <Textarea
                          value={paragraph}
                          onChange={(e) =>
                            setOverviewDetails((prev) => {
                              const next = [...(prev.description || [])];
                              next[index] = e.target.value;
                              return { ...prev, description: next };
                            })
                          }
                          placeholder="Add a paragraph..."
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() =>
                            setOverviewDetails((prev) => ({
                              ...prev,
                              description: (prev.description || []).filter((_, i) => i !== index),
                            }))
                          }
                          disabled={(overviewDetails.description || []).length === 1}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        setOverviewDetails((prev) => ({
                          ...prev,
                          description: [...(prev.description || []), ''],
                        }))
                      }
                    >
                      Add Paragraph
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Goals</Label>
                    {(overviewDetails.goals || []).map((goal, index) => (
                      <div key={`goal-${index}`} className="flex gap-3">
                        <Input
                          value={goal}
                          onChange={(e) =>
                            setOverviewDetails((prev) => {
                              const next = [...(prev.goals || [])];
                              next[index] = e.target.value;
                              return { ...prev, goals: next };
                            })
                          }
                          placeholder="Goal description"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() =>
                            setOverviewDetails((prev) => ({
                              ...prev,
                              goals: (prev.goals || []).filter((_, i) => i !== index),
                            }))
                          }
                          disabled={(overviewDetails.goals || []).length === 1}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        setOverviewDetails((prev) => ({
                          ...prev,
                          goals: [...(prev.goals || []), ''],
                        }))
                      }
                    >
                      Add Goal
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Challenge</Label>
                    <Textarea
                      value={overviewDetails.challenge || ''}
                      onChange={(e) =>
                        setOverviewDetails((prev) => ({
                          ...prev,
                          challenge: e.target.value,
                        }))
                      }
                      placeholder="Summarize the core challenge the project addresses."
                    />
                  </div>
                </SectionCard>
                <div className="flex items-center gap-3">
                  <Label className="text-sm font-medium">Featured</Label>
                  <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
                </div>
                <FileInput
                  label="Hero / Main Image"
                  required={!editingProject}
                  onChange={(file) => setMainImageFile(file)}
                  helperText={
                    editingProject && existingMainImageUrl
                      ? 'Current image will remain unless you upload a new one.'
                      : undefined
                  }
                />
                <FileInput label="Slideshow Images" multiple onChange={(_, files) => setSlideshowFiles(files)} />
                <div className="grid gap-2">
                  <Label className="text-sm font-medium">Demo URL</Label>
                  <Input value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} placeholder="https://..." />
                </div>
                <div className="grid gap-2">
                  <Label className="text-sm font-medium">Fallback Video URL</Label>
                  <Input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://..." />
                </div>
              </div>

              <SectionCard title="Hero Buttons">
                {heroButtons.map((btn, index) => (
                  <div key={`hero-btn-${index}`} className="grid gap-3 md:grid-cols-5">
                    <Input
                      placeholder="Label"
                      value={btn.label}
                      onChange={(e) =>
                        setHeroButtons((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, label: e.target.value } : item))
                        )
                      }
                    />
                    <Input
                      placeholder="Href (/contact or https://)"
                      value={btn.href}
                      onChange={(e) =>
                        setHeroButtons((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, href: e.target.value } : item))
                        )
                      }
                    />
                    <Select value={btn.variant || 'default'} onValueChange={(val) =>
                      setHeroButtons((prev) =>
                        prev.map((item, i) => (i === index ? { ...item, variant: val as CTAButtonPayload['variant'] } : item))
                      )
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Variant" />
                      </SelectTrigger>
                      <SelectContent>
                        {CTA_VARIANTS.map((variant) => (
                          <SelectItem key={variant} value={variant}>
                            {variant}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Icon (Lucide name)"
                      value={btn.icon || ''}
                      onChange={(e) =>
                        setHeroButtons((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, icon: e.target.value } : item))
                        )
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setHeroButtons((prev) => prev.filter((_, i) => i !== index))}
                      disabled={heroButtons.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="secondary" onClick={() => setHeroButtons((prev) => [...prev, createHeroButton()])}>
                  Add Hero Button
                </Button>
              </SectionCard>

              <SectionCard title="Project Info Items">
                {projectInfoItems.map((info, index) => (
                  <div key={`info-${index}`} className="grid gap-3 md:grid-cols-4">
                    <Input
                      placeholder="Label"
                      value={info.label}
                      onChange={(e) =>
                        setProjectInfoItems((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, label: e.target.value } : item))
                        )
                      }
                    />
                    <Input
                      placeholder="Value"
                      value={info.value}
                      onChange={(e) =>
                        setProjectInfoItems((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, value: e.target.value } : item))
                        )
                      }
                    />
                    <Input
                      placeholder="Icon (Lucide or emoji)"
                      value={info.icon || ''}
                      onChange={(e) =>
                        setProjectInfoItems((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, icon: e.target.value } : item))
                        )
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setProjectInfoItems((prev) => prev.filter((_, i) => i !== index))}
                      disabled={projectInfoItems.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="secondary" onClick={() => setProjectInfoItems((prev) => [...prev, createProjectInfo()])}>
                  Add Info Item
                </Button>
              </SectionCard>

              <SectionCard title="Video / Demo">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label>Video Type</Label>
                    <Select
                      value={videoConfig.type || 'placeholder'}
                      onValueChange={(val) => setVideoConfig((prev) => ({ ...prev, type: val as VideoConfig['type'] }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="placeholder">Placeholder</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="vimeo">Vimeo</SelectItem>
                        <SelectItem value="upload">Self Hosted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <InputWithLabel
                    id="videoUrlConfig"
                    label="Video URL"
                    value={videoConfig.url || ''}
                    onChange={(e) => setVideoConfig((prev) => ({ ...prev, url: e.target.value }))}
                  />
                  <InputWithLabel
                    id="videoThumbConfig"
                    label="Thumbnail URL"
                    value={videoConfig.thumbnail || ''}
                    onChange={(e) => setVideoConfig((prev) => ({ ...prev, thumbnail: e.target.value }))}
                  />
                </div>
              </SectionCard>

              <SectionCard title="Key Features">
                {features.map((feature, index) => (
                  <div key={`feature-${index}`} className="grid gap-3">
                    <div className="grid grid-cols-3 gap-3">
                      <Input
                        placeholder="Icon"
                        value={feature.icon || ''}
                        onChange={(e) =>
                          setFeatures((prev) =>
                            prev.map((item, i) => (i === index ? { ...item, icon: e.target.value } : item))
                          )
                        }
                      />
                      <Input
                        placeholder="Title"
                        value={feature.title}
                        onChange={(e) =>
                          setFeatures((prev) =>
                            prev.map((item, i) => (i === index ? { ...item, title: e.target.value } : item))
                          )
                        }
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setFeatures((prev) => prev.filter((_, i) => i !== index))}
                        disabled={features.length === 1}
                      >
                        Remove
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Description"
                      value={feature.description}
                      onChange={(e) =>
                        setFeatures((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, description: e.target.value } : item))
                        )
                      }
                    />
                  </div>
                ))}
                <Button type="button" variant="secondary" onClick={() => setFeatures((prev) => [...prev, createFeature()])}>
                  Add Feature
                </Button>
              </SectionCard>

              <SectionCard title="Architecture">
                <div className="flex items-center gap-3">
                  <Label>Show Architecture Section</Label>
                  <Switch checked={architectureEnabled} onCheckedChange={setArchitectureEnabled} />
                </div>
                {architectureEnabled && (
                  <div className="grid gap-3 md:grid-cols-2">
                    <InputWithLabel
                      id="architectureImage"
                      label="Architecture Image URL"
                      value={architecture.image || ''}
                      onChange={(e) => setArchitecture((prev) => ({ ...prev, image: e.target.value }))}
                    />
                    <div className="md:col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        value={architecture.description || ''}
                        onChange={(e) => setArchitecture((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Explain the architecture or upload diagram reference."
                      />
                    </div>
                  </div>
                )}
              </SectionCard>

              <SectionCard title="Challenges & Solutions">
                {challenges.map((challenge, index) => (
                  <div key={`challenge-${index}`} className="grid gap-3 md:grid-cols-3">
                    <Input
                      placeholder="Icon"
                      value={challenge.icon || ''}
                      onChange={(e) =>
                        setChallenges((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, icon: e.target.value } : item))
                        )
                      }
                    />
                    <Textarea
                      placeholder="Problem"
                      value={challenge.problem}
                      onChange={(e) =>
                        setChallenges((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, problem: e.target.value } : item))
                        )
                      }
                    />
                    <Textarea
                      placeholder="Solution"
                      value={challenge.solution}
                      onChange={(e) =>
                        setChallenges((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, solution: e.target.value } : item))
                        )
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="md:col-span-3"
                      onClick={() => setChallenges((prev) => prev.filter((_, i) => i !== index))}
                      disabled={challenges.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="secondary" onClick={() => setChallenges((prev) => [...prev, createChallenge()])}>
                  Add Challenge
                </Button>
              </SectionCard>

              <SectionCard title="Performance Comparison">
                <div className="grid md:grid-cols-2 gap-4">
                  {(['before', 'after'] as const).map((phase) => (
                    <div key={phase} className="space-y-3">
                      <Label className="font-semibold capitalize">{phase}</Label>
                      {(performance[phase] || []).map((item, index) => (
                        <div key={`${phase}-${index}`} className="flex gap-3">
                          <Input
                            placeholder="Label"
                            value={item.label}
                            onChange={(e) =>
                              setPerformance((prev) => ({
                                ...prev,
                                [phase]: (prev[phase] || []).map((stat, i) =>
                                  i === index ? { ...stat, label: e.target.value } : stat
                                ),
                              }))
                            }
                          />
                          <Input
                            placeholder="Value"
                            value={item.value}
                            onChange={(e) =>
                              setPerformance((prev) => ({
                                ...prev,
                                [phase]: (prev[phase] || []).map((stat, i) =>
                                  i === index ? { ...stat, value: e.target.value } : stat
                                ),
                              }))
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() =>
                              setPerformance((prev) => ({
                                ...prev,
                                [phase]: (prev[phase] || []).filter((_, i) => i !== index),
                              }))
                            }
                            disabled={(performance[phase] || []).length === 1}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                          setPerformance((prev) => ({
                            ...prev,
                            [phase]: [...(prev[phase] || []), createPerformanceItem()],
                          }))
                        }
                      >
                        Add {phase === 'before' ? 'Baseline' : 'Improved'} Metric
                      </Button>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Results & Metrics">
                {results.map((metric, index) => (
                  <div key={`metric-${index}`} className="grid gap-3 md:grid-cols-5">
                    <Input
                      placeholder="Label"
                      value={metric.label}
                      onChange={(e) =>
                        setResults((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, label: e.target.value } : item))
                        )
                      }
                    />
                    <Input
                      placeholder="Value"
                      value={metric.value}
                      onChange={(e) =>
                        setResults((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, value: e.target.value } : item))
                        )
                      }
                    />
                    <Input
                      placeholder="Suffix (% / ms / +)"
                      value={metric.suffix || ''}
                      onChange={(e) =>
                        setResults((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, suffix: e.target.value } : item))
                        )
                      }
                    />
                    <Input
                      placeholder="Icon"
                      value={metric.icon || ''}
                      onChange={(e) =>
                        setResults((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, icon: e.target.value } : item))
                        )
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setResults((prev) => prev.filter((_, i) => i !== index))}
                      disabled={results.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="secondary" onClick={() => setResults((prev) => [...prev, createResultMetric()])}>
                  Add Metric
                </Button>
              </SectionCard>

              <SectionCard title="Use Cases">
                {useCases.map((useCase, index) => (
                  <div key={`usecase-${index}`} className="grid gap-3 md:grid-cols-4">
                    <Input
                      placeholder="Title"
                      value={useCase.title}
                      onChange={(e) =>
                        setUseCases((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, title: e.target.value } : item))
                        )
                      }
                    />
                    <Input
                      placeholder="Industry"
                      value={useCase.industry || ''}
                      onChange={(e) =>
                        setUseCases((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, industry: e.target.value } : item))
                        )
                      }
                    />
                    <Input
                      placeholder="Icon"
                      value={useCase.icon || ''}
                      onChange={(e) =>
                        setUseCases((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, icon: e.target.value } : item))
                        )
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setUseCases((prev) => prev.filter((_, i) => i !== index))}
                      disabled={useCases.length === 1}
                    >
                      Remove
                    </Button>
                    <div className="md:col-span-4">
                      <Textarea
                        placeholder="Description"
                        value={useCase.description}
                        onChange={(e) =>
                          setUseCases((prev) =>
                            prev.map((item, i) => (i === index ? { ...item, description: e.target.value } : item))
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" variant="secondary" onClick={() => setUseCases((prev) => [...prev, createUseCase()])}>
                  Add Use Case
                </Button>
              </SectionCard>

              <SectionCard title="Testimonials">
                {testimonials.map((testimonial, index) => (
                  <div key={`testimonial-${index}`} className="grid gap-3">
                    <div className="grid md:grid-cols-3 gap-3">
                      <Input
                        placeholder="Author"
                        value={testimonial.author}
                        onChange={(e) =>
                          setTestimonials((prev) =>
                            prev.map((item, i) => (i === index ? { ...item, author: e.target.value } : item))
                          )
                        }
                      />
                      <Input
                        placeholder="Role"
                        value={testimonial.role}
                        onChange={(e) =>
                          setTestimonials((prev) =>
                            prev.map((item, i) => (i === index ? { ...item, role: e.target.value } : item))
                          )
                        }
                      />
                      <Input
                        placeholder="Company"
                        value={testimonial.company || ''}
                        onChange={(e) =>
                          setTestimonials((prev) =>
                            prev.map((item, i) => (i === index ? { ...item, company: e.target.value } : item))
                          )
                        }
                      />
                    </div>
                    <Textarea
                      placeholder="Quote"
                      value={testimonial.quote}
                      onChange={(e) =>
                        setTestimonials((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, quote: e.target.value } : item))
                        )
                      }
                    />
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input
                        placeholder="Avatar URL"
                        value={testimonial.avatar || ''}
                        onChange={(e) =>
                          setTestimonials((prev) =>
                            prev.map((item, i) => (i === index ? { ...item, avatar: e.target.value } : item))
                          )
                        }
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setTestimonials((prev) => prev.filter((_, i) => i !== index))}
                        disabled={testimonials.length === 1}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="secondary" onClick={() => setTestimonials((prev) => [...prev, createTestimonial()])}>
                  Add Testimonial
                </Button>
              </SectionCard>

              <SectionCard title="CTA Section">
                <InputWithLabel
                  id="ctaTitle"
                  label="CTA Title"
                  value={ctaSection.title}
                  onChange={(e) => setCtaSection((prev) => ({ ...prev, title: e.target.value }))}
                />
                <div className="grid gap-2">
                  <Label>Description</Label>
                  <Textarea
                    value={ctaSection.description}
                    onChange={(e) => setCtaSection((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Call-to-action description"
                  />
                </div>
                <div className="space-y-3">
                  <Label>Buttons</Label>
                  {(ctaSection.buttons || []).map((btn, index) => (
                    <div key={`cta-btn-${index}`} className="grid md:grid-cols-4 gap-3">
                      <Input
                        placeholder="Label"
                        value={btn.label}
                        onChange={(e) =>
                          setCtaSection((prev) => ({
                            ...prev,
                            buttons: (prev.buttons || []).map((item, i) =>
                              i === index ? { ...item, label: e.target.value } : item
                            ),
                          }))
                        }
                      />
                      <Input
                        placeholder="Href"
                        value={btn.href}
                        onChange={(e) =>
                          setCtaSection((prev) => ({
                            ...prev,
                            buttons: (prev.buttons || []).map((item, i) =>
                              i === index ? { ...item, href: e.target.value } : item
                            ),
                          }))
                        }
                      />
                      <Select
                        value={btn.variant || 'default'}
                        onValueChange={(val) =>
                          setCtaSection((prev) => ({
                            ...prev,
                            buttons: (prev.buttons || []).map((item, i) =>
                              i === index ? { ...item, variant: val as CTAButtonPayload['variant'] } : item
                            ),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CTA_VARIANTS.map((variant) => (
                            <SelectItem key={variant} value={variant}>
                              {variant}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() =>
                          setCtaSection((prev) => ({
                            ...prev,
                            buttons: (prev.buttons || []).filter((_, i) => i !== index),
                          }))
                        }
                        disabled={(ctaSection.buttons || []).length === 1}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      setCtaSection((prev) => ({
                        ...prev,
                        buttons: [...(prev.buttons || []), createHeroButton()],
                      }))
                    }
                  >
                    Add CTA Button
                  </Button>
                </div>
              </SectionCard>

              <DialogFooter>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : editingProject ? 'Save Changes' : 'Create Project'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              renderSkeletons()
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-destructive">
                  <div className="flex items-center justify-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Error: {error?.message}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : projects && projects.length > 0 ? (
              projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell className="text-muted-foreground">{project.category}</TableCell>
                  <TableCell className="text-muted-foreground">{project.status}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(project)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete project?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete “{project.title}”.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => removeProject(project.slug)}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                  No projects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const BilingualField = ({
  label,
  value,
  onChange,
  textarea,
  required,
}: {
  label: string;
  value: LanguageValue;
  onChange: (next: LanguageValue) => void;
  textarea?: boolean;
  required?: boolean;
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
    </div>
    <Tabs defaultValue="en">
      <TabsList>
        <TabsTrigger value="en">English</TabsTrigger>
        <TabsTrigger value="fa">فارسی</TabsTrigger>
      </TabsList>
      <TabsContent value="en" className="mt-2">
        {textarea ? (
          <Textarea
            value={value.en}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
          />
        ) : (
          <Input value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} />
        )}
      </TabsContent>
      <TabsContent value="fa" className="mt-2">
        {textarea ? (
          <Textarea
            dir="rtl"
            value={value.fa}
            onChange={(e) => onChange({ ...value, fa: e.target.value })}
          />
        ) : (
          <Input
            dir="rtl"
            value={value.fa}
            onChange={(e) => onChange({ ...value, fa: e.target.value })}
          />
        )}
      </TabsContent>
    </Tabs>
  </div>
);

const InputWithLabel = ({
  id,
  label,
  value,
  onChange,
  description,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  description?: string;
  required?: boolean;
}) => (
  <div className="grid gap-2">
    <Label htmlFor={id}>
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    <Input id={id} value={value} onChange={onChange} />
    {description && <p className="text-xs text-muted-foreground">{description}</p>}
  </div>
);

const TextareaWithLabel = ({
  id,
  label,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  required?: boolean;
}) => (
  <div className="grid gap-2">
    <Label htmlFor={id}>
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    <Textarea id={id} value={value} onChange={onChange} />
  </div>
);

const SelectWithLabel = ({
  label,
  value,
  onValueChange,
  options,
}: {
  label: string;
  value: string;
  onValueChange: (val: string) => void;
  options: string[];
}) => (
  <div className="grid gap-2">
    <Label className="text-sm font-medium">{label}</Label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const FileInput = ({
  label,
  required,
  multiple,
  helperText,
  onChange,
}: {
  label: string;
  required?: boolean;
  multiple?: boolean;
  helperText?: string;
  onChange: (file: File | null, files: File[]) => void;
}) => (
  <div className="grid gap-2">
    <Label>
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    <Input
      type="file"
      multiple={multiple}
      onChange={(e) => {
        const fileList = Array.from(e.target.files || []);
        onChange(fileList[0] || null, fileList);
      }}
    />
    {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
  </div>
);

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4 rounded-lg border p-4">
    <h3 className="text-base font-semibold">{title}</h3>
    {children}
  </div>
);

export default ManageProjectsPage;