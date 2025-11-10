import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axiosConfig';
import { toast } from 'sonner';

// UI Components
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, PlusCircle, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

// --- Interface to match the Event backend model ---
interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  boothNumber?: string;
  registrationUrl?: string;
}

// --- API Functions for Events ---
const fetchEvents = async (): Promise<Event[]> => {
  const { data } = await api.get('/events');
  return data;
};

const addEvent = async (newEvent: Omit<Event, '_id'>): Promise<Event> => {
  const { data } = await api.post('/events', newEvent);
  return data;
};

const deleteEvent = async (id: string): Promise<void> => {
  await api.delete(`/events/${id}`);
};

// --- Component ---
const ManageEventsPage = () => {
  // --- State Management ---
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Form state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [boothNumber, setBoothNumber] = useState('');
  const [registrationUrl, setRegistrationUrl] = useState('');
  
  // --- React Query ---
  const queryClient = useQueryClient();

  const { data: events, isLoading, isError, error } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const { mutate: createEvent, isPending: isCreating } = useMutation({
    mutationFn: (newEvent: Omit<Event, '_id'>) => addEvent(newEvent),
    onSuccess: () => {
      toast.success('Event added successfully!');
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setIsDialogOpen(false);
      // Reset form
      setTitle(''); setDate(''); setLocation(''); setDescription('');
      setBoothNumber(''); setRegistrationUrl('');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add event.');
    },
  });
  
  const { mutate: removeEvent } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      toast.success('Event deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete event.');
    },
  });

  // --- Handlers ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting with values:", {
        title,
        date,
        location,
        description,
    });

    if (!title || !date || !location || !description) {
      toast.error('Please fill all required fields.');
      return;
    }
    
    createEvent({
      title, date, location, description, boothNumber, registrationUrl
    });
  };

  const renderSkeletons = () => (
    [...Array(3)].map((_, i) => (
      <TableRow key={i}>
        <TableCell><Skeleton className="h-4 w-2/3" /></TableCell>
        <TableCell><Skeleton className="h-4 w-1/2" /></TableCell>
        <TableCell><Skeleton className="h-4 w-1/3" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
      </TableRow>
    ))
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Events</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Add New Event</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>Fill in the details for the new event.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <InputWithLabel id="title" label="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                <InputWithLabel id="date" label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
                <InputWithLabel id="location" label="Location" value={location} onChange={e => setLocation(e.target.value)} required />
                <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right mt-2">Description <span className="text-red-500">*</span></Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
                </div>
                <InputWithLabel id="boothNumber" label="Booth #" value={boothNumber} onChange={e => setBoothNumber(e.target.value)} />
                <InputWithLabel id="registrationUrl" label="Reg. URL" value={registrationUrl} onChange={e => setRegistrationUrl(e.target.value)} />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isCreating}>{isCreating ? 'Adding...' : 'Add Event'}</Button>
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
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? ( renderSkeletons() ) : 
             isError ? ( <TableRow><TableCell colSpan={4} className="text-center text-destructive py-10"><div className='flex justify-center items-center gap-2'><AlertTriangle className="h-5 w-5" /><span>Error: {error.message}</span></div></TableCell></TableRow> ) : 
             events && events.length > 0 ? (
              events.map((event) => (
                <TableRow key={event._id}>
                  <TableCell className="font-medium text-card-foreground">{event.title}</TableCell>
                  <TableCell className="text-muted-foreground">{event.location}</TableCell>
                  <TableCell className="text-muted-foreground">{new Date(event.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info('Edit functionality coming soon!')}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialogTrigger asChild>
                             <DropdownMenuItem className="text-destructive focus:text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                          </AlertDialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the event: "{event.title}".</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => removeEvent(event._id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-10">No events found. Start by adding one.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Helper component for cleaner form
const InputWithLabel = ({ id, label, value, onChange, type = "text", required = false }) => (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">{label} {required && <span className="text-red-500">*</span>}</Label>
      <Input id={id} type={type} value={value} onChange={onChange} className="col-span-3" />
    </div>
);

export default ManageEventsPage;