import { useState, useEffect } from 'react';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, Edit, MoreHorizontal, PlusCircle, Trash2 } from 'lucide-react';

interface CaseStudyResult {
  metric: string;
  metricFa?: string;
  value: string;
  valueFa?: string;
  description: string;
  descriptionFa?: string;
}

interface CaseStudySection {
  id?: string;
  title: string;
  titleFa?: string;
  content: string;
  contentFa?: string;
}

interface CaseStudy {
  _id: string;
  title: string;
  titleFa?: string;
  slug: string;
  subtitle?: string;
  subtitleFa?: string;
  client: string;
  clientFa?: string;
  duration?: string;
  industry?: string;
  industryFa?: string;
  description: string;
  descriptionFa?: string;
  technologies: string[];
  tags?: string[];
  results?: CaseStudyResult[];
  sections?: CaseStudySection[];
  legacyResults?: string[];
  imageUrl: string;
  heroImage?: string;
  pdfUrl?: string;
}

interface LanguageValue {
  en: string;
  fa: string;
}

interface ResultValue {
  metric: LanguageValue;
  value: LanguageValue;
  description: LanguageValue;
}

interface SectionValue {
  id?: string;
  title: LanguageValue;
  content: LanguageValue;
}

const emptyLang = { en: '', fa: '' };

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

const fetchCaseStudies = async (): Promise<CaseStudy[]> => {
  const { data } = await api.get('/case-studies?all=true');
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

const ManageCaseStudiesPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const [title, setTitle] = useState<LanguageValue>(emptyLang);
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState<LanguageValue>(emptyLang);
  const [client, setClient] = useState<LanguageValue>(emptyLang);
  const [duration, setDuration] = useState('');
  const [industry, setIndustry] = useState<LanguageValue>(emptyLang);
  const [description, setDescription] = useState<LanguageValue>(emptyLang);
  const [tagsInput, setTagsInput] = useState('');
  const [technologies, setTechnologies] = useState<string[]>(['']);
  const [results, setResults] = useState<ResultValue[]>([
    { metric: emptyLang, value: emptyLang, description: emptyLang },
  ]);
  const [sections, setSections] = useState<SectionValue[]>([
    { title: emptyLang, content: emptyLang },
  ]);
  const [legacyResults, setLegacyResults] = useState('');
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [existingHeroImage, setExistingHeroImage] = useState('');
  const [existingCoverImage, setExistingCoverImage] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

useEffect(() => {
  if (!editingCaseStudy) {
    setSlug(createSlug(title.en));
  }
}, [title.en, editingCaseStudy]);

  const queryClient = useQueryClient();

  const { data: caseStudies, isLoading, isError, error } = useQuery({
    queryKey: ['caseStudies'],
    queryFn: fetchCaseStudies,
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => api.post('/case-studies', payload),
    onSuccess: () => {
      toast.success('Case study created successfully.');
      queryClient.invalidateQueries({ queryKey: ['caseStudies'] });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || err.message || 'Failed to create case study.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ slug: slugValue, payload }: { slug: string; payload: any }) =>
      api.put(`/case-studies/${slugValue}`, payload),
    onSuccess: () => {
      toast.success('Case study updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['caseStudies'] });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || err.message || 'Failed to update case study.');
    },
  });

  const { mutate: removeCaseStudy } = useMutation({
    mutationFn: async (slugValue: string) => api.delete(`/case-studies/${slugValue}`),
    onSuccess: () => {
      toast.success('Case study deleted.');
      queryClient.invalidateQueries({ queryKey: ['caseStudies'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete case study.');
    },
  });

  const resetForm = () => {
    setTitle(emptyLang);
    setSlug('');
    setSubtitle(emptyLang);
    setClient(emptyLang);
    setDuration('');
    setIndustry(emptyLang);
    setDescription(emptyLang);
    setTagsInput('');
    setTechnologies(['']);
    setResults([{ metric: emptyLang, value: emptyLang, description: emptyLang }]);
    setSections([{ title: emptyLang, content: emptyLang }]);
    setLegacyResults('');
    setHeroImageFile(null);
    setCoverImageFile(null);
    setExistingHeroImage('');
    setExistingCoverImage('');
    setPdfUrl('');
    setEditingCaseStudy(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.en || !subtitle.en || !client.en || !description.en) {
      toast.error('Please complete the required English fields.');
      return;
    }

    let coverImageUrl = existingCoverImage;
    if (coverImageFile) {
      try {
        coverImageUrl = await uploadImage(coverImageFile);
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to upload cover image.');
        return;
      }
    }

    if (!coverImageUrl) {
      toast.error('Cover image is required.');
      return;
    }

    let heroImageUrl = existingHeroImage;
    if (heroImageFile) {
      try {
        heroImageUrl = await uploadImage(heroImageFile);
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to upload hero image.');
        return;
      }
    }

    const sectionsPayload = sections
      .filter((section) => section.title.en && section.content.en)
      .map((section, index) => ({
        id: section.id || `${createSlug(section.title.en || `section-${index + 1}`)}-${index + 1}`,
        title: section.title.en,
        titleFa: section.title.fa || undefined,
        content: section.content.en,
        contentFa: section.content.fa || undefined,
      }));

    const resultsPayload = results
      .filter((result) => result.metric.en && result.value.en && result.description.en)
      .map((result) => ({
        metric: result.metric.en,
        metricFa: result.metric.fa || undefined,
        value: result.value.en,
        valueFa: result.value.fa || undefined,
        description: result.description.en,
        descriptionFa: result.description.fa || undefined,
      }));

    const payload = {
      title: title.en,
      titleFa: title.fa || undefined,
      slug,
      subtitle: subtitle.en,
      subtitleFa: subtitle.fa || undefined,
      client: client.en,
      clientFa: client.fa || undefined,
      duration: duration || undefined,
      industry: industry.en || undefined,
      industryFa: industry.fa || undefined,
      description: description.en,
      descriptionFa: description.fa || undefined,
      tags: tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      technologies: technologies.filter(Boolean),
      results: resultsPayload,
      legacyResults: legacyResults
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
      sections: sectionsPayload,
      imageUrl: coverImageUrl,
      heroImage: heroImageUrl || undefined,
      pdfUrl: pdfUrl || undefined,
    };

    if (editingCaseStudy) {
      updateMutation.mutate({ slug, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const renderSkeletons = () =>
    [...Array(3)].map((_, idx) => (
      <TableRow key={idx}>
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
        <h1 className="text-3xl font-bold">Manage Case Studies</h1>
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
            <Button
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Case Study
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCaseStudy ? 'Edit Case Study' : 'New Case Study'}</DialogTitle>
              <DialogDescription>Capture the bilingual content, metrics, and sections.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <BilingualField label="Title" value={title} onChange={setTitle} required />
              <InputWithLabel
                id="slug"
                label="Slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                description="Auto-generated from the English title."
                disabled={Boolean(editingCaseStudy)}
              />
              <BilingualField label="Subtitle" value={subtitle} onChange={setSubtitle} required />
              <BilingualField label="Client" value={client} onChange={setClient} required />
              <InputWithLabel
                id="duration"
                label="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="8 months"
              />
              <BilingualField label="Industry" value={industry} onChange={setIndustry} />
              <BilingualField label="Overview" value={description} onChange={setDescription} textarea required />
              <InputWithLabel
                id="tags"
                label="Tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="AI, Computer Vision"
                description="Comma-separated"
              />
              <SectionCard title="Technologies">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Input
                      value={tech}
                      onChange={(e) =>
                        setTechnologies((prev) => prev.map((val, i) => (i === index ? e.target.value : val)))
                      }
                      placeholder="React"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setTechnologies((prev) => prev.filter((_, i) => i !== index))}
                      disabled={technologies.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="secondary" onClick={() => setTechnologies((prev) => [...prev, ''])}>
                  Add Technology
                </Button>
              </SectionCard>

              <SectionCard title="Results">
                {results.map((result, index) => (
                  <div key={index} className="space-y-3">
                    <BilingualField
                      label="Metric"
                      value={result.metric}
                      onChange={(val) =>
                        setResults((prev) => prev.map((item, i) => (i === index ? { ...item, metric: val } : item)))
                      }
                    />
                    <BilingualField
                      label="Value"
                      value={result.value}
                      onChange={(val) =>
                        setResults((prev) => prev.map((item, i) => (i === index ? { ...item, value: val } : item)))
                      }
                    />
                    <BilingualField
                      label="Description"
                      value={result.description}
                      onChange={(val) =>
                        setResults((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, description: val } : item))
                        )
                      }
                      textarea
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setResults((prev) => prev.filter((_, i) => i !== index))}
                      disabled={results.length === 1}
                    >
                      Remove Result
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    setResults((prev) => [...prev, { metric: emptyLang, value: emptyLang, description: emptyLang }])
                  }
                >
                  Add Result
                </Button>
              </SectionCard>

              <SectionCard title="Sections">
                {sections.map((section, index) => (
                  <div key={index} className="space-y-3">
                    <BilingualField
                      label="Section Title"
                      value={section.title}
                      onChange={(val) =>
                        setSections((prev) => prev.map((item, i) => (i === index ? { ...item, title: val } : item)))
                      }
                      required
                    />
                    <BilingualField
                      label="Section Content"
                      value={section.content}
                      onChange={(val) =>
                        setSections((prev) => prev.map((item, i) => (i === index ? { ...item, content: val } : item)))
                      }
                      textarea
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setSections((prev) => prev.filter((_, i) => i !== index))}
                      disabled={sections.length === 1}
                    >
                      Remove Section
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setSections((prev) => [...prev, { title: emptyLang, content: emptyLang }])}
                >
                  Add Section
                </Button>
              </SectionCard>

              <TextareaWithLabel
                id="legacyResults"
                label="Legacy Results (one per line)"
                value={legacyResults}
                onChange={(e) => setLegacyResults(e.target.value)}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FileInput
                  label="Hero Image"
                  onChange={(file) => setHeroImageFile(file)}
                  helperText={
                    editingCaseStudy && existingHeroImage
                      ? 'Current hero image will remain unless replaced.'
                      : undefined
                  }
                />
                <FileInput
                  label="Cover Image"
                  required={!editingCaseStudy}
                  onChange={(file) => setCoverImageFile(file)}
                  helperText={
                    editingCaseStudy && existingCoverImage
                      ? 'Current cover image will remain unless replaced.'
                      : undefined
                  }
                />
              </div>
              <InputWithLabel
                id="pdfUrl"
                label="PDF URL"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                placeholder="https://example.com/case-study.pdf"
              />

              <DialogFooter>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {createMutation.isPending || updateMutation.isPending
                    ? 'Saving...'
                    : editingCaseStudy
                    ? 'Save Changes'
                    : 'Create Case Study'}
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
              <TableHead>Client</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              renderSkeletons()
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={3} className="py-10 text-center text-destructive">
                  <div className="flex items-center justify-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Error: {error?.message}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : caseStudies && caseStudies.length > 0 ? (
              caseStudies.map((study) => (
                <TableRow key={study._id}>
                  <TableCell className="font-medium">{study.title}</TableCell>
                  <TableCell className="text-muted-foreground">{study.client}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingCaseStudy(study);
                              setTitle({ en: study.title, fa: study.titleFa || '' });
                              setSlug(study.slug);
                              setSubtitle({ en: study.subtitle || '', fa: study.subtitleFa || '' });
                              setClient({ en: study.client, fa: study.clientFa || '' });
                              setDuration(study.duration || '');
                              setIndustry({ en: study.industry || '', fa: study.industryFa || '' });
                              setDescription({ en: study.description, fa: study.descriptionFa || '' });
                              setTagsInput((study.tags || []).join(', '));
                              setTechnologies(study.technologies?.length ? [...study.technologies] : ['']);
                              setResults(
                                study.results && study.results.length
                                  ? study.results.map((result) => ({
                                      metric: { en: result.metric, fa: result.metricFa || '' },
                                      value: { en: result.value, fa: result.valueFa || '' },
                                      description: { en: result.description, fa: result.descriptionFa || '' },
                                    }))
                                  : [{ metric: emptyLang, value: emptyLang, description: emptyLang }]
                              );
                              setLegacyResults((study.legacyResults || []).join('\n'));
                              setSections(
                                study.sections && study.sections.length
                                  ? study.sections.map((section) => ({
                                      id: section.id,
                                      title: { en: section.title, fa: section.titleFa || '' },
                                      content: { en: section.content, fa: section.contentFa || '' },
                                    }))
                                  : [{ title: emptyLang, content: emptyLang }]
                              );
                              setExistingHeroImage(study.heroImage || '');
                              setExistingCoverImage(study.imageUrl || '');
                              setHeroImageFile(null);
                              setCoverImageFile(null);
                              setPdfUrl(study.pdfUrl || '');
                              setIsDialogOpen(true);
                            }}
                          >
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
                          <AlertDialogTitle>Delete case study?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete “{study.title}”.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/90"
                            onClick={() => removeCaseStudy(study.slug)}
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
                <TableCell colSpan={3} className="py-10 text-center text-muted-foreground">
                  No case studies found.
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
  placeholder,
  description,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
}) => (
  <div className="grid gap-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} />
    {description && <p className="text-xs text-muted-foreground">{description}</p>}
  </div>
);

const TextareaWithLabel = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}) => (
  <div className="grid gap-2">
    <Label htmlFor={id}>{label}</Label>
    <Textarea id={id} value={value} onChange={onChange} />
  </div>
);

const FileInput = ({
  label,
  required,
  helperText,
  onChange,
}: {
  label: string;
  required?: boolean;
  helperText?: string;
  onChange: (file: File | null) => void;
}) => (
  <div className="grid gap-2">
    <Label>
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    <Input
      type="file"
      onChange={(e) => {
        const file = e.target.files?.[0] || null;
        onChange(file);
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

export default ManageCaseStudiesPage;
