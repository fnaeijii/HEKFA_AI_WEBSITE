import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, Brain, Edit, MoreHorizontal, PlusCircle, Trash2 } from 'lucide-react';

interface IntelligenceItem {
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
  order?: number;
  isFeatured?: boolean;
  whatItIs?: {
    title?: string;
    titleFa?: string;
    content?: string;
    contentFa?: string;
  };
  howItWorks?: {
    title?: string;
    titleFa?: string;
    content?: string;
    contentFa?: string;
    steps?: {
      number?: number;
      title?: string;
      titleFa?: string;
      description?: string;
      descriptionFa?: string;
    }[];
  };
  whyItMatters?: {
    title?: string;
    titleFa?: string;
    content?: string;
    contentFa?: string;
    benefits?: {
      icon: string;
      title?: string;
      titleFa?: string;
      description?: string;
      descriptionFa?: string;
    }[];
  };
  comparison?: {
    title?: string;
    titleFa?: string;
    subtitle?: string;
    subtitleFa?: string;
    rows?: {
      feature?: string;
      featureFa?: string;
      traditional?: string;
      traditionalFa?: string;
      withAI?: string;
      withAIFa?: string;
    }[];
  };
  useCases?: {
    title?: string;
    titleFa?: string;
    subtitle?: string;
    subtitleFa?: string;
    cases?: {
      icon: string;
      title?: string;
      titleFa?: string;
      description?: string;
      descriptionFa?: string;
    }[];
  };
  cta?: {
    title?: string;
    titleFa?: string;
    description?: string;
    descriptionFa?: string;
    buttonText?: string;
    buttonTextFa?: string;
    buttonLink?: string;
  };
}

interface LanguageValue {
  en: string;
  fa: string;
}

interface StepValue {
  number?: number;
  title: LanguageValue;
  description: LanguageValue;
}

interface BenefitValue {
  icon: string;
  title: LanguageValue;
  description: LanguageValue;
}

interface ComparisonRowValue {
  feature: LanguageValue;
  traditional: LanguageValue;
  withAI: LanguageValue;
}

interface UseCaseValue {
  icon: string;
  title: LanguageValue;
  description: LanguageValue;
}

const emptyLang: LanguageValue = { en: '', fa: '' };

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

const fetchIntelligenceItems = async (): Promise<IntelligenceItem[]> => {
  const { data } = await api.get('/intelligence');
  return data;
};

const ManageIntelligencePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IntelligenceItem | null>(null);
  const [title, setTitle] = useState<LanguageValue>(emptyLang);
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState<LanguageValue>(emptyLang);
  const [heroDescription, setHeroDescription] = useState<LanguageValue>(emptyLang);
  const [animationData, setAnimationData] = useState('');
  const [gradient, setGradient] = useState('');
  const [order, setOrder] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  const [whatItIs, setWhatItIs] = useState({
    title: emptyLang,
    content: emptyLang,
  });
  const [howItWorks, setHowItWorks] = useState({
    title: emptyLang,
    content: emptyLang,
    steps: [
      { number: 1, title: emptyLang, description: emptyLang },
      { number: 2, title: emptyLang, description: emptyLang },
    ] as StepValue[],
  });
  const [whyItMatters, setWhyItMatters] = useState({
    title: emptyLang,
    content: emptyLang,
    benefits: [{ icon: '', title: emptyLang, description: emptyLang }] as BenefitValue[],
  });
  const [comparison, setComparison] = useState({
    title: emptyLang,
    subtitle: emptyLang,
    rows: [{ feature: emptyLang, traditional: emptyLang, withAI: emptyLang }] as ComparisonRowValue[],
  });
  const [useCases, setUseCases] = useState({
    title: emptyLang,
    subtitle: emptyLang,
    cases: [{ icon: '', title: emptyLang, description: emptyLang }] as UseCaseValue[],
  });
  const [cta, setCta] = useState({
    title: emptyLang,
    description: emptyLang,
    buttonText: emptyLang,
    buttonLink: '',
  });

  const toLangValue = (en?: string, fa?: string): LanguageValue => ({ en: en || '', fa: fa || '' });

  useEffect(() => {
    if (!editingItem) {
      setSlug(createSlug(title.en));
    }
  }, [title.en, editingItem]);

  const queryClient = useQueryClient();

  const { data: intelligenceItems, isLoading, isError, error } = useQuery({
    queryKey: ['intelligence'],
    queryFn: fetchIntelligenceItems,
  });

  const createIntelligenceMutation = useMutation({
    mutationFn: (payload: any) => api.post('/intelligence', payload),
  });

  const updateIntelligenceMutation = useMutation({
    mutationFn: ({ slug: slugValue, payload }: { slug: string; payload: any }) =>
      api.put(`/intelligence/${slugValue}`, payload),
  });

  const { mutate: removeIntelligence } = useMutation({
    mutationFn: async (slugValue: string) => api.delete(`/intelligence/${slugValue}`),
    onSuccess: () => {
      toast.success('Intelligence entry deleted.');
      queryClient.invalidateQueries({ queryKey: ['intelligence'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete entry.');
    },
  });

  const resetForm = () => {
    setTitle(emptyLang);
    setSlug('');
    setSubtitle(emptyLang);
    setHeroDescription(emptyLang);
    setAnimationData('');
    setGradient('');
    setOrder('');
    setIsFeatured(false);
    setWhatItIs({ title: emptyLang, content: emptyLang });
    setHowItWorks({
      title: emptyLang,
      content: emptyLang,
      steps: [
        { number: 1, title: emptyLang, description: emptyLang },
        { number: 2, title: emptyLang, description: emptyLang },
      ],
    });
    setWhyItMatters({
      title: emptyLang,
      content: emptyLang,
      benefits: [{ icon: '', title: emptyLang, description: emptyLang }],
    });
    setComparison({
      title: emptyLang,
      subtitle: emptyLang,
      rows: [{ feature: emptyLang, traditional: emptyLang, withAI: emptyLang }],
    });
    setUseCases({
      title: emptyLang,
      subtitle: emptyLang,
      cases: [{ icon: '', title: emptyLang, description: emptyLang }],
    });
    setCta({
      title: emptyLang,
      description: emptyLang,
      buttonText: emptyLang,
      buttonLink: '',
    });
    setEditingItem(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: IntelligenceItem) => {
    setEditingItem(item);
    setTitle(toLangValue(item.title, item.titleFa));
    setSlug(item.slug);
    setSubtitle(toLangValue(item.subtitle, item.subtitleFa));
    setHeroDescription(toLangValue(item.heroDescription, item.heroDescriptionFa));
    setAnimationData(item.animationData || '');
    setGradient(item.gradient || '');
    setOrder(item.order?.toString() || '');
    setIsFeatured(Boolean(item.isFeatured));

    setWhatItIs({
      title: toLangValue(item.whatItIs?.title, item.whatItIs?.titleFa),
      content: toLangValue(item.whatItIs?.content, item.whatItIs?.contentFa),
    });

    const mappedSteps =
      item.howItWorks?.steps && item.howItWorks.steps.length
        ? item.howItWorks.steps.map((step, index) => ({
            number: step.number ?? index + 1,
            title: toLangValue(step.title, step.titleFa),
            description: toLangValue(step.description, step.descriptionFa),
          }))
        : [
            { number: 1, title: emptyLang, description: emptyLang },
            { number: 2, title: emptyLang, description: emptyLang },
          ];

    setHowItWorks({
      title: toLangValue(item.howItWorks?.title, item.howItWorks?.titleFa),
      content: toLangValue(item.howItWorks?.content, item.howItWorks?.contentFa),
      steps: mappedSteps,
    });

    const mappedBenefits =
      item.whyItMatters?.benefits && item.whyItMatters.benefits.length
        ? item.whyItMatters.benefits.map((benefit) => ({
            icon: benefit.icon,
            title: toLangValue(benefit.title, benefit.titleFa),
            description: toLangValue(benefit.description, benefit.descriptionFa),
          }))
        : [{ icon: '', title: emptyLang, description: emptyLang }];

    setWhyItMatters({
      title: toLangValue(item.whyItMatters?.title, item.whyItMatters?.titleFa),
      content: toLangValue(item.whyItMatters?.content, item.whyItMatters?.contentFa),
      benefits: mappedBenefits,
    });

    const mappedRows =
      item.comparison?.rows && item.comparison.rows.length
        ? item.comparison.rows.map((row) => ({
            feature: toLangValue(row.feature, row.featureFa),
            traditional: toLangValue(row.traditional, row.traditionalFa),
            withAI: toLangValue(row.withAI, row.withAIFa),
          }))
        : [{ feature: emptyLang, traditional: emptyLang, withAI: emptyLang }];

    setComparison({
      title: toLangValue(item.comparison?.title, item.comparison?.titleFa),
      subtitle: toLangValue(item.comparison?.subtitle, item.comparison?.subtitleFa),
      rows: mappedRows,
    });

    const mappedCases =
      item.useCases?.cases && item.useCases.cases.length
        ? item.useCases.cases.map((useCase) => ({
            icon: useCase.icon,
            title: toLangValue(useCase.title, useCase.titleFa),
            description: toLangValue(useCase.description, useCase.descriptionFa),
          }))
        : [{ icon: '', title: emptyLang, description: emptyLang }];

    setUseCases({
      title: toLangValue(item.useCases?.title, item.useCases?.titleFa),
      subtitle: toLangValue(item.useCases?.subtitle, item.useCases?.subtitleFa),
      cases: mappedCases,
    });

    setCta({
      title: toLangValue(item.cta?.title, item.cta?.titleFa),
      description: toLangValue(item.cta?.description, item.cta?.descriptionFa),
      buttonText: toLangValue(item.cta?.buttonText, item.cta?.buttonTextFa),
      buttonLink: item.cta?.buttonLink || '',
    });

    setIsDialogOpen(true);
  };

  const buildPayload = () => ({
    title: title.en,
    titleFa: title.fa || undefined,
    slug,
    subtitle: subtitle.en,
    subtitleFa: subtitle.fa || undefined,
    heroDescription: heroDescription.en,
    heroDescriptionFa: heroDescription.fa || undefined,
    animationData: animationData || undefined,
    gradient: gradient || undefined,
    order: order ? Number(order) : undefined,
    isFeatured,
    whatItIs: {
      title: whatItIs.title.en,
      titleFa: whatItIs.title.fa || undefined,
      content: whatItIs.content.en,
      contentFa: whatItIs.content.fa || undefined,
    },
    howItWorks: {
      title: howItWorks.title.en,
      titleFa: howItWorks.title.fa || undefined,
      content: howItWorks.content.en,
      contentFa: howItWorks.content.fa || undefined,
      steps: howItWorks.steps
        .filter((step) => step.title.en && step.description.en)
        .map((step, index) => ({
          number: step.number || index + 1,
          title: step.title.en,
          titleFa: step.title.fa || undefined,
          description: step.description.en,
          descriptionFa: step.description.fa || undefined,
        })),
    },
    whyItMatters: {
      title: whyItMatters.title.en,
      titleFa: whyItMatters.title.fa || undefined,
      content: whyItMatters.content.en,
      contentFa: whyItMatters.content.fa || undefined,
      benefits: whyItMatters.benefits
        .filter((benefit) => benefit.icon && benefit.title.en && benefit.description.en)
        .map((benefit) => ({
          icon: benefit.icon,
          title: benefit.title.en,
          titleFa: benefit.title.fa || undefined,
          description: benefit.description.en,
          descriptionFa: benefit.description.fa || undefined,
        })),
    },
    comparison: {
      title: comparison.title.en,
      titleFa: comparison.title.fa || undefined,
      subtitle: comparison.subtitle.en || undefined,
      subtitleFa: comparison.subtitle.fa || undefined,
      rows: comparison.rows
        .filter((row) => row.feature.en && row.traditional.en && row.withAI.en)
        .map((row) => ({
          feature: row.feature.en,
          featureFa: row.feature.fa || undefined,
          traditional: row.traditional.en,
          traditionalFa: row.traditional.fa || undefined,
          withAI: row.withAI.en,
          withAIFa: row.withAI.fa || undefined,
        })),
    },
    useCases: {
      title: useCases.title.en,
      titleFa: useCases.title.fa || undefined,
      subtitle: useCases.subtitle.en || undefined,
      subtitleFa: useCases.subtitle.fa || undefined,
      cases: useCases.cases
        .filter((useCase) => useCase.icon && useCase.title.en && useCase.description.en)
        .map((useCase) => ({
          icon: useCase.icon,
          title: useCase.title.en,
          titleFa: useCase.title.fa || undefined,
          description: useCase.description.en,
          descriptionFa: useCase.description.fa || undefined,
        })),
    },
    cta: {
      title: cta.title.en,
      titleFa: cta.title.fa || undefined,
      description: cta.description.en,
      descriptionFa: cta.description.fa || undefined,
      buttonText: cta.buttonText.en,
      buttonTextFa: cta.buttonText.fa || undefined,
      buttonLink: cta.buttonLink || '/contact',
    },
  });

  const isSaving = createIntelligenceMutation.isPending || updateIntelligenceMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.en || !subtitle.en || !heroDescription.en) {
      toast.error('Please complete the required English fields.');
      return;
    }
    if (!slug) {
      toast.error('Slug is required.');
      return;
    }

    const payload = buildPayload();

    try {
      if (editingItem) {
        await updateIntelligenceMutation.mutateAsync({ slug: editingItem.slug, payload });
        toast.success('Intelligence entry updated.');
      } else {
        await createIntelligenceMutation.mutateAsync(payload);
        toast.success('Intelligence entry created.');
      }
      queryClient.invalidateQueries({ queryKey: ['intelligence'] });
      resetForm();
      setIsDialogOpen(false);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Failed to save entry.';
      toast.error(message);
    }
  };

  const renderSkeletons = () =>
    [...Array(3)].map((_, idx) => (
      <TableRow key={idx}>
        <TableCell>
          <Skeleton className="h-4 w-1/3" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-1/4" />
        </TableCell>
        <TableCell className="text-right">
          <Skeleton className="h-8 w-8 ml-auto" />
        </TableCell>
      </TableRow>
    ));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Brain className="h-7 w-7 text-primary" />
          <h1 className="text-3xl font-bold">Manage Intelligence Entries</h1>
        </div>
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
              Add Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Intelligence Entry' : 'New Intelligence Entry'}</DialogTitle>
              <DialogDescription>
                {editingItem
                  ? 'Update the bilingual structure for this intelligence solution.'
                  : 'Provide bilingual copy for every section.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <BilingualField label="Title" value={title} onChange={setTitle} required />
              <InputWithLabel
                id="slug"
                label="Slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                description="Auto-generated from the English title."
              />
              <BilingualField label="Subtitle" value={subtitle} onChange={setSubtitle} required />
              <BilingualField
                label="Hero Description"
                value={heroDescription}
                onChange={setHeroDescription}
                textarea
                required
              />
              <div className="grid gap-4 md:grid-cols-2">
                <InputWithLabel
                  id="animation"
                  label="Animation Data Key"
                  value={animationData}
                  onChange={(e) => setAnimationData(e.target.value)}
                  placeholder="e.g., eye-blinking"
                />
                <InputWithLabel
                  id="gradient"
                  label="Gradient Classes"
                  value={gradient}
                  onChange={(e) => setGradient(e.target.value)}
                  placeholder="from-blue-500 to-cyan-500"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <InputWithLabel
                  id="order"
                  label="Order"
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                />
                <div className="flex items-center gap-3">
                  <Label className="text-sm font-medium">Featured</Label>
                  <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
                </div>
              </div>

              <SectionCard title="What Is It?">
                <BilingualField label="Section Title" value={whatItIs.title} onChange={(val) => setWhatItIs((prev) => ({ ...prev, title: val }))} required />
                <BilingualField
                  label="Section Content"
                  value={whatItIs.content}
                  onChange={(val) => setWhatItIs((prev) => ({ ...prev, content: val }))}
                  textarea
                  required
                />
              </SectionCard>

              <SectionCard title="How It Works">
                <BilingualField label="Section Title" value={howItWorks.title} onChange={(val) => setHowItWorks((prev) => ({ ...prev, title: val }))} required />
                <BilingualField
                  label="Intro Content"
                  value={howItWorks.content}
                  onChange={(val) => setHowItWorks((prev) => ({ ...prev, content: val }))}
                  textarea
                  required
                />
                {howItWorks.steps.map((step, index) => (
                  <div key={index} className="space-y-3 rounded-lg border p-3">
                    <div className="grid gap-3 md:grid-cols-3">
                      <InputWithLabel
                        id={`step-number-${index}`}
                        label="Step Number"
                        type="number"
                        value={step.number?.toString() || String(index + 1)}
                        onChange={(e) =>
                          setHowItWorks((prev) => ({
                            ...prev,
                            steps: prev.steps.map((item, i) =>
                              i === index ? { ...item, number: Number(e.target.value) } : item
                            ),
                          }))
                        }
                      />
                    </div>
                    <BilingualField
                      label="Step Title"
                      value={step.title}
                      onChange={(val) =>
                        setHowItWorks((prev) => ({
                          ...prev,
                          steps: prev.steps.map((item, i) => (i === index ? { ...item, title: val } : item)),
                        }))
                      }
                    />
                    <BilingualField
                      label="Step Description"
                      value={step.description}
                      textarea
                      onChange={(val) =>
                        setHowItWorks((prev) => ({
                          ...prev,
                          steps: prev.steps.map((item, i) => (i === index ? { ...item, description: val } : item)),
                        }))
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        setHowItWorks((prev) => ({
                          ...prev,
                          steps: prev.steps.filter((_, i) => i !== index),
                        }))
                      }
                      disabled={howItWorks.steps.length === 1}
                    >
                      Remove Step
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    setHowItWorks((prev) => ({
                      ...prev,
                      steps: [...prev.steps, { number: prev.steps.length + 1, title: emptyLang, description: emptyLang }],
                    }))
                  }
                >
                  Add Step
                </Button>
              </SectionCard>

              <SectionCard title="Why It Matters">
                <BilingualField
                  label="Section Title"
                  value={whyItMatters.title}
                  onChange={(val) => setWhyItMatters((prev) => ({ ...prev, title: val }))}
                  required
                />
                <BilingualField
                  label="Overview Content"
                  value={whyItMatters.content}
                  onChange={(val) => setWhyItMatters((prev) => ({ ...prev, content: val }))}
                  textarea
                  required
                />
                {whyItMatters.benefits.map((benefit, index) => (
                  <div key={index} className="space-y-3 rounded-lg border p-3">
                    <InputWithLabel
                      id={`benefit-icon-${index}`}
                      label="Icon"
                      value={benefit.icon}
                      onChange={(e) =>
                        setWhyItMatters((prev) => ({
                          ...prev,
                          benefits: prev.benefits.map((item, i) =>
                            i === index ? { ...item, icon: e.target.value } : item
                          ),
                        }))
                      }
                      placeholder="Lucide icon name"
                    />
                    <BilingualField
                      label="Benefit Title"
                      value={benefit.title}
                      onChange={(val) =>
                        setWhyItMatters((prev) => ({
                          ...prev,
                          benefits: prev.benefits.map((item, i) =>
                            i === index ? { ...item, title: val } : item
                          ),
                        }))
                      }
                    />
                    <BilingualField
                      label="Benefit Description"
                      value={benefit.description}
                      textarea
                      onChange={(val) =>
                        setWhyItMatters((prev) => ({
                          ...prev,
                          benefits: prev.benefits.map((item, i) =>
                            i === index ? { ...item, description: val } : item
                          ),
                        }))
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        setWhyItMatters((prev) => ({
                          ...prev,
                          benefits: prev.benefits.filter((_, i) => i !== index),
                        }))
                      }
                      disabled={whyItMatters.benefits.length === 1}
                    >
                      Remove Benefit
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    setWhyItMatters((prev) => ({
                      ...prev,
                      benefits: [...prev.benefits, { icon: '', title: emptyLang, description: emptyLang }],
                    }))
                  }
                >
                  Add Benefit
                </Button>
              </SectionCard>

              <SectionCard title="Comparison">
                <BilingualField
                  label="Table Title"
                  value={comparison.title}
                  onChange={(val) => setComparison((prev) => ({ ...prev, title: val }))}
                  required
                />
                <BilingualField
                  label="Table Subtitle"
                  value={comparison.subtitle}
                  onChange={(val) => setComparison((prev) => ({ ...prev, subtitle: val }))}
                />
                {comparison.rows.map((row, index) => (
                  <div key={index} className="space-y-3 rounded-lg border p-3">
                    <BilingualField
                      label="Feature"
                      value={row.feature}
                      onChange={(val) =>
                        setComparison((prev) => ({
                          ...prev,
                          rows: prev.rows.map((item, i) => (i === index ? { ...item, feature: val } : item)),
                        }))
                      }
                    />
                    <BilingualField
                      label="Traditional Approach"
                      value={row.traditional}
                      onChange={(val) =>
                        setComparison((prev) => ({
                          ...prev,
                          rows: prev.rows.map((item, i) => (i === index ? { ...item, traditional: val } : item)),
                        }))
                      }
                      textarea
                    />
                    <BilingualField
                      label="With AI"
                      value={row.withAI}
                      onChange={(val) =>
                        setComparison((prev) => ({
                          ...prev,
                          rows: prev.rows.map((item, i) => (i === index ? { ...item, withAI: val } : item)),
                        }))
                      }
                      textarea
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        setComparison((prev) => ({
                          ...prev,
                          rows: prev.rows.filter((_, i) => i !== index),
                        }))
                      }
                      disabled={comparison.rows.length === 1}
                    >
                      Remove Row
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    setComparison((prev) => ({
                      ...prev,
                      rows: [...prev.rows, { feature: emptyLang, traditional: emptyLang, withAI: emptyLang }],
                    }))
                  }
                >
                  Add Row
                </Button>
              </SectionCard>

              <SectionCard title="Use Cases">
                <BilingualField
                  label="Section Title"
                  value={useCases.title}
                  onChange={(val) => setUseCases((prev) => ({ ...prev, title: val }))}
                  required
                />
                <BilingualField
                  label="Section Subtitle"
                  value={useCases.subtitle}
                  onChange={(val) => setUseCases((prev) => ({ ...prev, subtitle: val }))}
                />
                {useCases.cases.map((useCase, index) => (
                  <div key={index} className="space-y-3 rounded-lg border p-3">
                    <InputWithLabel
                      id={`usecase-icon-${index}`}
                      label="Icon"
                      value={useCase.icon}
                      onChange={(e) =>
                        setUseCases((prev) => ({
                          ...prev,
                          cases: prev.cases.map((item, i) => (i === index ? { ...item, icon: e.target.value } : item)),
                        }))
                      }
                      placeholder="Lucide icon name"
                    />
                    <BilingualField
                      label="Use Case Title"
                      value={useCase.title}
                      onChange={(val) =>
                        setUseCases((prev) => ({
                          ...prev,
                          cases: prev.cases.map((item, i) => (i === index ? { ...item, title: val } : item)),
                        }))
                      }
                    />
                    <BilingualField
                      label="Use Case Description"
                      value={useCase.description}
                      textarea
                      onChange={(val) =>
                        setUseCases((prev) => ({
                          ...prev,
                          cases: prev.cases.map((item, i) => (i === index ? { ...item, description: val } : item)),
                        }))
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        setUseCases((prev) => ({
                          ...prev,
                          cases: prev.cases.filter((_, i) => i !== index),
                        }))
                      }
                      disabled={useCases.cases.length === 1}
                    >
                      Remove Use Case
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    setUseCases((prev) => ({
                      ...prev,
                      cases: [...prev.cases, { icon: '', title: emptyLang, description: emptyLang }],
                    }))
                  }
                >
                  Add Use Case
                </Button>
              </SectionCard>

              <SectionCard title="Call to Action">
                <BilingualField label="CTA Title" value={cta.title} onChange={(val) => setCta((prev) => ({ ...prev, title: val }))} required />
                <BilingualField
                  label="CTA Description"
                  value={cta.description}
                  onChange={(val) => setCta((prev) => ({ ...prev, description: val }))}
                  textarea
                  required
                />
                <BilingualField
                  label="Button Text"
                  value={cta.buttonText}
                  onChange={(val) => setCta((prev) => ({ ...prev, buttonText: val }))}
                  required
                />
                <InputWithLabel
                  id="cta-link"
                  label="Button Link"
                  value={cta.buttonLink}
                  onChange={(e) => setCta((prev) => ({ ...prev, buttonLink: e.target.value }))}
                  placeholder="/contact"
                />
              </SectionCard>

              <DialogFooter>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : editingItem ? 'Save Changes' : 'Create Entry'}
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
              <TableHead>Order</TableHead>
              <TableHead>Featured</TableHead>
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
            ) : intelligenceItems && intelligenceItems.length > 0 ? (
              intelligenceItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="text-muted-foreground">{item.order ?? 0}</TableCell>
                  <TableCell className="text-muted-foreground">{item.isFeatured ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(item)}>
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
                          <AlertDialogTitle>Delete “{item.title}”?</AlertDialogTitle>
                          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/90"
                            onClick={() => removeIntelligence(item.slug)}
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
                  No intelligence entries yet.
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
  onChange: (val: LanguageValue) => void;
  textarea?: boolean;
  required?: boolean;
}) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium">
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    <Tabs defaultValue="en">
      <TabsList>
        <TabsTrigger value="en">English</TabsTrigger>
        <TabsTrigger value="fa">فارسی</TabsTrigger>
      </TabsList>
      <TabsContent value="en" className="mt-2">
        {textarea ? (
          <Textarea value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} />
        ) : (
          <Input value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} />
        )}
      </TabsContent>
      <TabsContent value="fa" className="mt-2">
        {textarea ? (
          <Textarea dir="rtl" value={value.fa} onChange={(e) => onChange({ ...value, fa: e.target.value })} />
        ) : (
          <Input dir="rtl" value={value.fa} onChange={(e) => onChange({ ...value, fa: e.target.value })} />
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
  type = 'text',
  placeholder,
  description,
}: {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  placeholder?: string;
  description?: string;
}) => (
  <div className="grid gap-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} />
    {description && <p className="text-xs text-muted-foreground">{description}</p>}
  </div>
);

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4 rounded-lg border p-4">
    <h3 className="text-base font-semibold">{title}</h3>
    {children}
  </div>
);

export default ManageIntelligencePage;

