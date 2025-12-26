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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, Leaf, MoreHorizontal, PlusCircle, Trash2 } from 'lucide-react';

interface EnergyEntry {
  _id: string;
  title: string;
  titleFa?: string;
  slug: string;
  excerpt?: string;
  excerptFa?: string;
  content: string;
  contentFa?: string;
  image: string;
  icon?: string;
  status: 'draft' | 'published';
  order?: number;
  publishedAt?: string;
}

interface LanguageValue {
  en: string;
  fa: string;
}

const emptyLang: LanguageValue = { en: '', fa: '' };
const STATUS_OPTIONS = ['draft', 'published'];

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

const fetchEnergyEntries = async (): Promise<EnergyEntry[]> => {
  const { data } = await api.get('/energy-blogs?all=true');
  return data;
};

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.url;
};

const ManageEnergyBlogPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<EnergyEntry | null>(null);
  const [title, setTitle] = useState<LanguageValue>(emptyLang);
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState<LanguageValue>(emptyLang);
  const [content, setContent] = useState<LanguageValue>(emptyLang);
  const [icon, setIcon] = useState('Leaf');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [order, setOrder] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState('');

  useEffect(() => {
    if (!editingEntry) {
      setSlug(createSlug(title.en));
    }
  }, [title.en, editingEntry]);

  const queryClient = useQueryClient();

  const { data: entries, isLoading, isError, error } = useQuery({
    queryKey: ['energyBlogs'],
    queryFn: fetchEnergyEntries,
  });

  const createEntryMutation = useMutation({
    mutationFn: (payload: any) => api.post('/energy-blogs', payload),
  });

  const updateEntryMutation = useMutation({
    mutationFn: ({ slug: slugValue, payload }: { slug: string; payload: any }) =>
      api.put(`/energy-blogs/${slugValue}`, payload),
  });

  const { mutate: removeEntry } = useMutation({
    mutationFn: async (slugValue: string) => api.delete(`/energy-blogs/${slugValue}`),
    onSuccess: () => {
      toast.success('Energy blog entry deleted.');
      queryClient.invalidateQueries({ queryKey: ['energyBlogs'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete entry.');
    },
  });

  const resetForm = () => {
    setTitle(emptyLang);
    setSlug('');
    setExcerpt(emptyLang);
    setContent(emptyLang);
    setIcon('Leaf');
    setStatus('draft');
    setOrder('');
    setPublishedAt('');
    setImageFile(null);
    setExistingImage('');
    setEditingEntry(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (entry: EnergyEntry) => {
    setEditingEntry(entry);
    setTitle({ en: entry.title || '', fa: entry.titleFa || '' });
    setSlug(entry.slug);
    setExcerpt({ en: entry.excerpt || '', fa: entry.excerptFa || '' });
    setContent({ en: entry.content || '', fa: entry.contentFa || '' });
    setIcon(entry.icon || 'Leaf');
    setStatus(entry.status);
    setOrder(entry.order?.toString() || '');
    setPublishedAt(entry.publishedAt ? entry.publishedAt.substring(0, 10) : '');
    setExistingImage(entry.image || '');
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const isSaving = createEntryMutation.isPending || updateEntryMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.en || !excerpt.en || !content.en) {
      toast.error('Please complete the required English fields.');
      return;
    }
    if (!slug) {
      toast.error('Slug is required.');
      return;
    }

    let imageUrl = existingImage;
    if (imageFile) {
      try {
        imageUrl = await uploadImage(imageFile);
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to upload image.');
        return;
      }
    }

    if (!imageUrl) {
      toast.error('Cover image is required.');
      return;
    }

    const payload = {
      title: title.en,
      titleFa: title.fa || undefined,
      slug,
      excerpt: excerpt.en,
      excerptFa: excerpt.fa || undefined,
      content: content.en,
      contentFa: content.fa || undefined,
      image: imageUrl,
      icon,
      status,
      order: order ? Number(order) : undefined,
      publishedAt: publishedAt || undefined,
    };

    try {
      if (editingEntry) {
        await updateEntryMutation.mutateAsync({ slug: editingEntry.slug, payload });
        toast.success('Energy blog entry updated.');
      } else {
        await createEntryMutation.mutateAsync(payload);
        toast.success('Energy blog entry created.');
      }
      queryClient.invalidateQueries({ queryKey: ['energyBlogs'] });
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
        <div className="flex items-center gap-3">
          <Leaf className="h-7 w-7 text-primary" />
          <h1 className="text-3xl font-bold">Manage Energy Blog</h1>
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
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEntry ? 'Edit Energy Blog Entry' : 'New Energy Blog Entry'}</DialogTitle>
              <DialogDescription>
                {editingEntry ? 'Update the bilingual copy and metadata.' : 'Provide bilingual copy and select status.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <BilingualField label="Title" value={title} onChange={setTitle} required />
              <InputWithLabel
                id="slug"
                label="Slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                description="Auto-generated from English title."
              />
              <BilingualField label="Excerpt" value={excerpt} onChange={setExcerpt} textarea required />
              <BilingualField label="Content" value={content} onChange={setContent} textarea required />
              <div className="grid gap-4 md:grid-cols-2">
                <InputWithLabel
                  id="icon"
                  label="Icon"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="Lucide icon name"
                />
                <SelectWithLabel label="Status" value={status} onValueChange={(val: 'draft' | 'published') => setStatus(val)} options={STATUS_OPTIONS} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <InputWithLabel
                  id="order"
                  label="Order"
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="0"
                />
                <InputWithLabel
                  id="publishedAt"
                  label="Publish Date"
                  type="date"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                />
              </div>
              <FileInput
                label="Cover Image"
                required={!editingEntry}
                helperText={
                  editingEntry && existingImage ? 'Current image will remain unless you upload a new one.' : undefined
                }
                onChange={(file) => setImageFile(file)}
              />
              <DialogFooter>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : editingEntry ? 'Save Changes' : 'Create Entry'}
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
              <TableHead>Status</TableHead>
              <TableHead>Order</TableHead>
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
            ) : entries && entries.length > 0 ? (
              entries.map((entry) => (
                <TableRow key={entry._id}>
                  <TableCell className="font-medium">{entry.title}</TableCell>
                  <TableCell className="text-muted-foreground capitalize">{entry.status}</TableCell>
                  <TableCell className="text-muted-foreground">{entry.order ?? 0}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(entry)}>Edit</DropdownMenuItem>
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
                          <AlertDialogTitle>Delete “{entry.title}”?</AlertDialogTitle>
                          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/90"
                            onClick={() => removeEntry(entry.slug)}
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
                  No energy blog entries yet.
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
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
}) => (
  <div className="grid gap-2">
    <Label htmlFor={id}>
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    <Input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} />
    {description && <p className="text-xs text-muted-foreground">{description}</p>}
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
  onValueChange: (val: any) => void;
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
  onChange,
  helperText,
}: {
  label: string;
  required?: boolean;
  onChange: (file: File | null) => void;
  helperText?: string;
}) => (
  <div className="grid gap-2">
    <Label>
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    <Input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0] || null;
        onChange(file);
      }}
    />
    {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
  </div>
);

export default ManageEnergyBlogPage;

