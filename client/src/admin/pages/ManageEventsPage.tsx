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
import { AlertTriangle, CalendarDays, Edit, MoreHorizontal, PlusCircle, Trash2 } from 'lucide-react';

interface EventItem {
  _id: string;
  title: string;
  titleFa?: string;
  location: string;
  locationFa?: string;
  description: string;
  descriptionFa?: string;
  date: string;
  boothNumber?: string;
  registrationUrl?: string;
  isActive?: boolean;
  imageUrl?: string;
}

interface LanguageValue {
  en: string;
  fa: string;
}

const emptyLang: LanguageValue = { en: '', fa: '' };

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.url;
};

const fetchEvents = async (): Promise<EventItem[]> => {
  const { data } = await api.get('/events?all=true');
  return data;
};

const ManageEventsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [title, setTitle] = useState<LanguageValue>(emptyLang);
  const [location, setLocation] = useState<LanguageValue>(emptyLang);
  const [description, setDescription] = useState<LanguageValue>(emptyLang);
  const [date, setDate] = useState('');
  const [boothNumber, setBoothNumber] = useState('');
  const [registrationUrl, setRegistrationUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  const queryClient = useQueryClient();

  const { data: events, isLoading, isError, error } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const { mutateAsync: createEvent, isPending: isCreating } = useMutation({
    mutationFn: (payload: any) => api.post('/events', payload),
  });

  const { mutateAsync: updateEvent, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => api.put(`/events/${id}`, payload),
  });

  const { mutate: removeEvent } = useMutation({
    mutationFn: (id: string) => api.delete(`/events/${id}`),
    onSuccess: () => {
      toast.success('Event deleted.');
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete event.');
    },
  });

  const resetForm = () => {
    setTitle(emptyLang);
    setLocation(emptyLang);
    setDescription(emptyLang);
    setDate('');
    setBoothNumber('');
    setRegistrationUrl('');
    setIsActive(true);
    setImageFile(null);
    setImageUrl('');
    setEditingEvent(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (event: EventItem) => {
    setEditingEvent(event);
    setTitle({ en: event.title, fa: event.titleFa || '' });
    setLocation({ en: event.location, fa: event.locationFa || '' });
    setDescription({ en: event.description, fa: event.descriptionFa || '' });
    setDate(event.date ? event.date.substring(0, 10) : '');
    setBoothNumber(event.boothNumber || '');
    setRegistrationUrl(event.registrationUrl || '');
    setIsActive(event.isActive ?? true);
    setImageUrl(event.imageUrl || '');
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.en || !location.en || !description.en || !date) {
      toast.error('Please complete the required English fields.');
      return;
    }

    let finalImageUrl = imageUrl;
    if (imageFile) {
      try {
        finalImageUrl = await uploadImage(imageFile);
      } catch (uploadError: any) {
        toast.error(uploadError.response?.data?.message || 'Failed to upload image.');
        return;
      }
    }

    if (!finalImageUrl) {
      toast.error('Please upload an image or provide an image URL.');
      return;
    }

    const payload = {
      title: title.en,
      titleFa: title.fa || undefined,
      location: location.en,
      locationFa: location.fa || undefined,
      description: description.en,
      descriptionFa: description.fa || undefined,
      date,
      boothNumber: boothNumber || undefined,
      registrationUrl: registrationUrl || undefined,
      isActive,
      imageUrl: finalImageUrl,
    };

    try {
      if (editingEvent) {
        await updateEvent({ id: editingEvent._id, payload });
        toast.success('Event updated.');
      } else {
        await createEvent(payload);
        toast.success('Event created.');
      }
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setIsDialogOpen(false);
      resetForm();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save event.');
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
          <CalendarDays className="h-7 w-7 text-primary" />
          <h1 className="text-3xl font-bold">Manage Events</h1>
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
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEvent ? 'Edit Event' : 'New Event'}</DialogTitle>
              <DialogDescription>Provide bilingual content for the event.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <BilingualField label="Title" value={title} onChange={setTitle} required />
              <BilingualField label="Location" value={location} onChange={setLocation} required />
              <BilingualField label="Description" value={description} onChange={setDescription} textarea required />
              <div className="grid gap-4 md:grid-cols-2">
                <InputWithLabel id="date" label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <div className="flex items-center gap-3 pt-6">
                  <Label className="text-sm font-medium">Active</Label>
                  <Switch checked={isActive} onCheckedChange={setIsActive} />
                </div>
              </div>
              <InputWithLabel id="booth" label="Booth Number" value={boothNumber} onChange={(e) => setBoothNumber(e.target.value)} />
              <InputWithLabel
                id="registration"
                label="Registration URL"
                value={registrationUrl}
                onChange={(e) => setRegistrationUrl(e.target.value)}
                placeholder="https://example.com/event"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Event Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setImageFile(file);
                      if (file) setImageUrl('');
                    }}
                  />
                </div>
                <InputWithLabel
                  id="imageUrl"
                  label="Image URL"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    if (e.target.value) setImageFile(null);
                  }}
                  placeholder="https://..."
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isCreating || isUpdating}>
                  {isCreating || isUpdating ? 'Saving...' : editingEvent ? 'Save Changes' : 'Create Event'}
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
              <TableHead>Date</TableHead>
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
            ) : events && events.length > 0 ? (
              events.map((event) => (
                <TableRow key={event._id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {event.date ? new Date(event.date).toLocaleDateString() : '—'}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{event.isActive ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(event)}>
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
                          <AlertDialogTitle>Delete “{event.title}”?</AlertDialogTitle>
                          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/90"
                            onClick={() => removeEvent(event._id)}
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
                  No events yet.
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
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) => (
  <div className="grid gap-2">
    <Label htmlFor={id}>
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    <Input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} />
  </div>
);

export default ManageEventsPage;
