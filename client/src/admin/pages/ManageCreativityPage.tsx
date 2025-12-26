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
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, Sparkles, MoreHorizontal, PlusCircle, Trash2 } from 'lucide-react';

interface CreativityEntry {
  _id: string;
  childName: string;
  childNameFa?: string;
  idea: string;
  ideaFa?: string;
  order?: number;
  color?: string;
  rotation?: number;
  position?: { x?: number; y?: number };
  highlight?: boolean;
  photo?: string;
  media?: { type: 'image' | 'video'; url?: string };
}

interface LanguageValue {
  en: string;
  fa: string;
}

const emptyLang: LanguageValue = { en: '', fa: '' };
const MEDIA_TYPES = ['image', 'video'];

const fetchCreativityEntries = async (): Promise<CreativityEntry[]> => {
  const { data } = await api.get('/creativity');
  return data;
};

const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  return data.url;
};

const ManageCreativityPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<CreativityEntry | null>(null);
  const [childName, setChildName] = useState<LanguageValue>(emptyLang);
  const [idea, setIdea] = useState<LanguageValue>(emptyLang);
  const [color, setColor] = useState('bg-gradient-to-br from-cyan-100/80 via-blue-100/70 to-white/60');
  const [order, setOrder] = useState('');
  const [rotation, setRotation] = useState('');
  const [position, setPosition] = useState({ x: '50', y: '50' });
  const [highlight, setHighlight] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  const queryClient = useQueryClient();

  const { data: entries, isLoading, isError, error } = useQuery({
    queryKey: ['creativity'],
    queryFn: fetchCreativityEntries,
  });

  const createEntryMutation = useMutation({
    mutationFn: (payload: any) => api.post('/creativity', payload),
  });

  const updateEntryMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => api.put(`/creativity/${id}`, payload),
  });

  const { mutate: removeEntry } = useMutation({
    mutationFn: async (id: string) => api.delete(`/creativity/${id}`),
    onSuccess: () => {
      toast.success('Creativity entry deleted.');
      queryClient.invalidateQueries({ queryKey: ['creativity'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete entry.');
    },
  });

  const resetForm = () => {
    setChildName(emptyLang);
    setIdea(emptyLang);
    setColor('bg-gradient-to-br from-cyan-100/80 via-blue-100/70 to-white/60');
    setOrder('');
    setRotation('');
    setPosition({ x: '50', y: '50' });
    setHighlight(false);
    setPhotoFile(null);
    setPhotoUrl('');
    setMediaType('image');
    setMediaUrl('');
    setMediaFile(null);
    setEditingEntry(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (entry: CreativityEntry) => {
    setEditingEntry(entry);
    setChildName({ en: entry.childName || '', fa: entry.childNameFa || '' });
    setIdea({ en: entry.idea || '', fa: entry.ideaFa || '' });
    setColor(entry.color || 'bg-gradient-to-br from-cyan-100/80 via-blue-100/70 to-white/60');
    setOrder(entry.order?.toString() || '');
    setRotation(entry.rotation?.toString() || '');
    setPosition({
      x: (entry.position?.x ?? 50).toString(),
      y: (entry.position?.y ?? 50).toString(),
    });
    setHighlight(Boolean(entry.highlight));
    setPhotoFile(null);
    setPhotoUrl(entry.photo || '');

    const nextMediaType = entry.media?.type === 'video' ? 'video' : 'image';
    setMediaType(nextMediaType);
    setMediaFile(null);
    setMediaUrl(entry.media?.url || '');

    setIsDialogOpen(true);
  };

  const isSaving = createEntryMutation.isPending || updateEntryMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.en || !idea.en) {
      toast.error('Please fill in the required English fields.');
      return;
    }

    const payload: any = {
      childName: childName.en,
      childNameFa: childName.fa || undefined,
      idea: idea.en,
      ideaFa: idea.fa || undefined,
      color,
      rotation: rotation ? Number(rotation) : undefined,
      order: order ? Number(order) : undefined,
      position: {
        x: Number(position.x) || 50,
        y: Number(position.y) || 50,
      },
      highlight,
    };

    try {
      if (photoFile) {
        payload.photo = await uploadFile(photoFile);
      } else if (photoUrl) {
        payload.photo = photoUrl;
      }

      if (mediaType === 'image') {
        if (mediaFile) {
          payload.media = {
            type: 'image',
            url: await uploadFile(mediaFile),
          };
        }
      } else {
        if (!mediaUrl) {
          toast.error('Please provide a media URL for videos.');
          return;
        }
        payload.media = {
          type: 'video',
          url: mediaUrl,
        };
      }

      if (editingEntry) {
        await updateEntryMutation.mutateAsync({ id: editingEntry._id, payload });
        toast.success('Creativity entry updated.');
      } else {
        await createEntryMutation.mutateAsync(payload);
        toast.success('Creativity entry created.');
      }

      queryClient.invalidateQueries({ queryKey: ['creativity'] });
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
          <Sparkles className="h-7 w-7 text-primary" />
          <h1 className="text-3xl font-bold">Manage Creativity Entries</h1>
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
              <DialogTitle>{editingEntry ? 'Edit Creativity Entry' : 'New Creativity Entry'}</DialogTitle>
              <DialogDescription>
                {editingEntry ? 'Update the child’s idea across both languages.' : 'Capture the child’s idea in both languages.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <BilingualField label="Child Name" value={childName} onChange={setChildName} required />
              <BilingualField label="Idea" value={idea} onChange={setIdea} textarea required />
              <div className="grid gap-4 md:grid-cols-2">
                <InputWithLabel
                  id="color"
                  label="Card Color Classes"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <InputWithLabel
                  id="order"
                  label="Order"
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <InputWithLabel
                  id="pos-x"
                  label="Position X (%)"
                  type="number"
                  value={position.x}
                  onChange={(e) => setPosition((prev) => ({ ...prev, x: e.target.value }))}
                />
                <InputWithLabel
                  id="pos-y"
                  label="Position Y (%)"
                  type="number"
                  value={position.y}
                  onChange={(e) => setPosition((prev) => ({ ...prev, y: e.target.value }))}
                />
                <InputWithLabel
                  id="rotation"
                  label="Rotation (deg)"
                  type="number"
                  value={rotation}
                  onChange={(e) => setRotation(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                <Label className="text-sm font-medium">Highlight</Label>
                <Switch checked={highlight} onCheckedChange={setHighlight} />
              </div>
              <FileInput
                label="Photo"
                helperText={
                  editingEntry && editingEntry.photo ? 'Current photo will remain unless you upload a new one.' : undefined
                }
                onChange={(file) => {
                  setPhotoFile(file);
                  setPhotoUrl('');
                }}
              />
              <InputWithLabel
                id="photoUrl"
                label="Photo URL"
                value={photoUrl}
                onChange={(e) => {
                  setPhotoUrl(e.target.value);
                  if (e.target.value) setPhotoFile(null);
                }}
                placeholder="https://..."
              />

              <div className="grid gap-3 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label className="text-sm font-medium">Media Type</Label>
                  <Select
                    value={mediaType}
                    onValueChange={(val: 'image' | 'video') => {
                      setMediaType(val);
                      setMediaFile(null);
                      if (val === 'image') {
                        setMediaUrl('');
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MEDIA_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {mediaType === 'image' ? (
                  <FileInput
                    label="Media Image"
                    helperText={
                      editingEntry && editingEntry.media?.type === 'image'
                        ? 'Current media image will remain unless you upload a new one.'
                        : undefined
                    }
                    onChange={(file) => {
                      setMediaFile(file);
                      if (file) setMediaUrl('');
                    }}
                  />
                ) : (
                  <InputWithLabel
                    id="mediaUrl"
                    label="Media URL"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="https://www.youtube.com/embed/..."
                  />
                )}
              </div>
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
              <TableHead>Child</TableHead>
              <TableHead>Idea</TableHead>
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
                  <TableCell className="font-medium">{entry.childName}</TableCell>
                  <TableCell className="text-muted-foreground line-clamp-1">{entry.idea}</TableCell>
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
                          <AlertDialogTitle>Delete “{entry.childName}” entry?</AlertDialogTitle>
                          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/90"
                            onClick={() => removeEntry(entry._id)}
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
                  No creativity entries yet.
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

const FileInput = ({
  label,
  onChange,
  helperText,
}: {
  label: string;
  onChange: (file: File | null) => void;
  helperText?: string;
}) => (
  <div className="grid gap-2">
    <Label>{label}</Label>
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

export default ManageCreativityPage;

