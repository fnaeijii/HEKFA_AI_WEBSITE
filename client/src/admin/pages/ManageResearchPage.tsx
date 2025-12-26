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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, Edit, MoreHorizontal, PlusCircle, Trash2 } from 'lucide-react';

interface PostSection {
  id?: string;
  title: string;
  content: string;
  subsections?: { id?: string; title: string; content: string }[];
}

interface Post {
  _id: string;
  title: string;
  titleFa?: string;
  slug: string;
  authors: string[];
  journal?: string;
  status: string;
  category: string;
  summary?: string;
  summaryFa?: string;
  content?: string;
  contentFa?: string;
  publishedAt?: string;
  citations?: number;
  downloadUrl?: string;
  pdfUrl?: string;
  doi?: string;
  readTimeMinutes?: number;
  tags?: string[];
  references?: string[];
  mainImageUrl?: string;
  heroImage?: string;
  coverImage?: string;
  sections?: PostSection[];
}

interface SectionValue {
  title: string;
  content: string;
}

interface LanguageValue {
  en: string;
  fa: string;
}

const emptyLang = { en: '', fa: '' };
const CATEGORIES = ['Computer Vision', 'NLP', 'Generative AI', 'Robotics'];
const STATUS_OPTIONS = ['draft', 'published'];

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await api.get('/posts?all=true');
  return data;
};

const ManageResearchPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [title, setTitle] = useState<LanguageValue>(emptyLang);
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState<LanguageValue>(emptyLang);
  const [content, setContent] = useState<LanguageValue>(emptyLang);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [authorsInput, setAuthorsInput] = useState('');
  const [journal, setJournal] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [citations, setCitations] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [doi, setDoi] = useState('');
  const [readTime, setReadTime] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [referencesInput, setReferencesInput] = useState('');
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [sections, setSections] = useState<SectionValue[]>([{ title: '', content: '' }]);

useEffect(() => {
  if (!editingPost) {
    setSlug(createSlug(title.en));
  }
}, [title.en, editingPost]);

  const queryClient = useQueryClient();

  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => api.post('/posts', payload),
    onSuccess: () => {
      toast.success('Research post created.');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || err.message || 'Failed to create post.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ slug: slugValue, payload }: { slug: string; payload: any }) => api.put(`/posts/${slugValue}`, payload),
    onSuccess: () => {
      toast.success('Research post updated.');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || err.message || 'Failed to update post.');
    },
  });

  const { mutate: removePost } = useMutation({
    mutationFn: async (slugValue: string) => api.delete(`/posts/${slugValue}`),
    onSuccess: () => {
      toast.success('Research post deleted.');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete post.');
    },
  });

  const resetForm = () => {
    setTitle(emptyLang);
    setSlug('');
    setSummary(emptyLang);
    setContent(emptyLang);
    setCategory(CATEGORIES[0]);
    setStatus(STATUS_OPTIONS[0]);
    setAuthorsInput('');
    setJournal('');
    setPublishedAt('');
    setCitations('');
    setDownloadUrl('');
    setPdfUrl('');
    setDoi('');
    setReadTime('');
    setTagsInput('');
    setReferencesInput('');
    setMainImageUrl('');
    setHeroImage('');
    setCoverImage('');
    setSections([{ title: '', content: '' }]);
    setEditingPost(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.en || !summary.en || !content.en) {
      toast.error('Please fill in the required English fields.');
      return;
    }

    const authors = authorsInput
      .split(',')
      .map((author) => author.trim())
      .filter(Boolean);

    if (!authors.length) {
      toast.error('Authors are required.');
      return;
    }

    const payload = {
      title: title.en,
      titleFa: title.fa || undefined,
      slug,
      summary: summary.en,
      summaryFa: summary.fa || undefined,
      content: content.en,
      contentFa: content.fa || undefined,
      category,
      status,
      authors,
      journal,
      publishedAt: publishedAt || undefined,
      citations: citations ? Number(citations) : undefined,
      downloadUrl: downloadUrl || undefined,
      pdfUrl: pdfUrl || undefined,
      doi: doi || undefined,
      readTimeMinutes: readTime ? Number(readTime) : undefined,
      tags: tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      references: referencesInput
        .split('\n')
        .map((ref) => ref.trim())
        .filter(Boolean),
      mainImageUrl: mainImageUrl || undefined,
      heroImage: heroImage || undefined,
      coverImage: coverImage || undefined,
      sections: sections
        .filter((section) => section.title && section.content)
        .map((section, index) => ({
          id: section.title ? `${createSlug(section.title)}-${index + 1}` : `section-${index + 1}`,
          title: section.title,
          content: section.content,
          subsections: [],
        })),
    };

    if (editingPost) {
      updateMutation.mutate({ slug: editingPost.slug, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const renderSkeletons = () =>
    [...Array(4)].map((_, idx) => (
      <TableRow key={idx}>
        <TableCell>
          <Skeleton className="h-4 w-1/2" />
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
        <h1 className="text-3xl font-bold">Manage Research Posts</h1>
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
              Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? 'Edit Research Post' : 'New Research Post'}</DialogTitle>
              <DialogDescription>Provide bilingual copy and metadata for the publication.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <BilingualField label="Title" value={title} onChange={setTitle} required />
              <InputWithLabel
                id="slug"
                label="Slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                description="Auto-generated from the English title."
                disabled={Boolean(editingPost)}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <SelectWithLabel
                  label="Category"
                  value={category}
                  onValueChange={setCategory}
                  options={CATEGORIES}
                />
                <SelectWithLabel
                  label="Status"
                  value={status}
                  onValueChange={setStatus}
                  options={STATUS_OPTIONS}
                />
              </div>
              <BilingualField label="Summary" value={summary} onChange={setSummary} textarea required />
              <BilingualField label="Content" value={content} onChange={setContent} textarea required />
              <InputWithLabel
                id="authors"
                label="Authors"
                value={authorsInput}
                onChange={(e) => setAuthorsInput(e.target.value)}
                placeholder="John Doe, Jane Smith"
                required
              />
              <div className="grid gap-4 md:grid-cols-2">
                <InputWithLabel id="journal" label="Journal / Venue" value={journal} onChange={(e) => setJournal(e.target.value)} />
                <InputWithLabel id="publishedAt" label="Publication Date" type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <InputWithLabel id="citations" label="Citations" type="number" value={citations} onChange={(e) => setCitations(e.target.value)} />
                <InputWithLabel id="readTime" label="Read Time (minutes)" type="number" value={readTime} onChange={(e) => setReadTime(e.target.value)} />
                <InputWithLabel id="doi" label="DOI" value={doi} onChange={(e) => setDoi(e.target.value)} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <InputWithLabel id="downloadUrl" label="Download URL" value={downloadUrl} onChange={(e) => setDownloadUrl(e.target.value)} />
                <InputWithLabel id="pdfUrl" label="PDF URL" value={pdfUrl} onChange={(e) => setPdfUrl(e.target.value)} />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <InputWithLabel id="mainImageUrl" label="Main Image URL" value={mainImageUrl} onChange={(e) => setMainImageUrl(e.target.value)} />
                <InputWithLabel id="heroImage" label="Hero Image URL" value={heroImage} onChange={(e) => setHeroImage(e.target.value)} />
                <InputWithLabel id="coverImage" label="Cover Image URL" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
              </div>
              <InputWithLabel
                id="tags"
                label="Tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="LLM, Retrieval, Finance"
                description="Comma-separated"
              />
              <TextareaWithLabel
                id="references"
                label="References (one per line)"
                value={referencesInput}
                onChange={(e) => setReferencesInput(e.target.value)}
              />

              <SectionCard title="Sections">
                {sections.map((section, index) => (
                  <div key={index} className="space-y-3">
                    <Input
                      placeholder="Section Title"
                      value={section.title}
                      onChange={(e) =>
                        setSections((prev) => prev.map((item, i) => (i === index ? { ...item, title: e.target.value } : item)))
                      }
                    />
                    <Textarea
                      placeholder="Section Content"
                      value={section.content}
                      onChange={(e) =>
                        setSections((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, content: e.target.value } : item))
                        )
                      }
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
                  onClick={() => setSections((prev) => [...prev, { title: '', content: '' }])}
                >
                  Add Section
                </Button>
              </SectionCard>

              <DialogFooter>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {createMutation.isPending || updateMutation.isPending
                    ? 'Saving...'
                    : editingPost
                    ? 'Save Changes'
                    : 'Create Post'}
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
            ) : posts && posts.length > 0 ? (
              posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="text-muted-foreground">{post.category}</TableCell>
                  <TableCell className="text-muted-foreground capitalize">{post.status}</TableCell>
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
                              setEditingPost(post);
                              setTitle({ en: post.title, fa: post.titleFa || '' });
                              setSlug(post.slug);
                              setSummary({ en: post.summary || '', fa: post.summaryFa || '' });
                              setContent({ en: post.content || '', fa: post.contentFa || '' });
                              setCategory(post.category);
                              setStatus(post.status);
                              setAuthorsInput(post.authors?.join(', ') || '');
                              setJournal(post.journal || '');
                              setPublishedAt(post.publishedAt ? post.publishedAt.slice(0, 10) : '');
                              setCitations(post.citations?.toString() || '');
                              setDownloadUrl(post.downloadUrl || '');
                              setPdfUrl(post.pdfUrl || '');
                              setDoi(post.doi || '');
                              setReadTime(post.readTimeMinutes?.toString() || '');
                              setTagsInput((post.tags || []).join(', '));
                              setReferencesInput((post.references || []).join('\n'));
                              setMainImageUrl(post.mainImageUrl || '');
                              setHeroImage(post.heroImage || '');
                              setCoverImage(post.coverImage || '');
                              setSections(
                                post.sections && post.sections.length
                                  ? post.sections.map((section) => ({
                                      title: section.title,
                                      content: section.content,
                                    }))
                                  : [{ title: '', content: '' }]
                              );
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
                          <AlertDialogTitle>Delete research post?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete “{post.title}”.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/90"
                            onClick={() => removePost(post.slug)}
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
                  No research posts yet.
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
  type = 'text',
  placeholder,
  description,
  required,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
}) => (
  <div className="grid gap-2">
    <Label htmlFor={id}>
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    <Input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} />
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

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4 rounded-lg border p-4">
    <h3 className="text-base font-semibold">{title}</h3>
    {children}
  </div>
);

export default ManageResearchPage;