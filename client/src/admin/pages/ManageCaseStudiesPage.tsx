import { useState, useEffect } from 'react';
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

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  client: string;
  description: string;
  technologies: string[];
  results: string[];
  imageUrl: string;
}

// Helper function to create a slug from a title
const createSlug = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

// --- API Functions for Case Studies ---
const fetchCaseStudies = async (): Promise<CaseStudy[]> => {
  const { data } = await api.get('/case-studies');
  return data;
};

const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await api.post(`/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return data.url; 
};

const addCaseStudy = async (newCaseStudy: Omit<CaseStudy, '_id'>): Promise<CaseStudy> => {
  const { data } = await api.post('/case-studies', newCaseStudy);
  return data;
};

const deleteCaseStudy = async (slug: string): Promise<void> => {
  await api.delete(`/case-studies/${slug}`);
};

// --- Component ---
const ManageCaseStudiesPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [client, setClient] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState(''); // Comma-separated
  const [results, setResults] = useState(''); // Comma-separated
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    setSlug(createSlug(title));
  }, [title]);

  const queryClient = useQueryClient();

  const { data: caseStudies, isLoading, isError, error } = useQuery({
    queryKey: ['caseStudies'],
    queryFn: fetchCaseStudies,
  });

  const { mutate: createCaseStudy, isPending: isCreating } = useMutation({
    mutationFn: async (): Promise<CaseStudy> => {
      if (!imageFile) throw new Error("Please select an image.");
      const imageUrl = await uploadImage(imageFile);
      const technologiesArray = technologies.split(',').map(tech => tech.trim());
      const resultsArray = results.split(',').map(res => res.trim());
      
      return addCaseStudy({ 
        title, slug, client, description, imageUrl,
        technologies: technologiesArray,
        results: resultsArray
      });
    },
    onSuccess: () => {
      toast.success('Case study added successfully!');
      queryClient.invalidateQueries({ queryKey: ['caseStudies'] });
      setIsDialogOpen(false);
      // Reset form
      setTitle(''); setSlug(''); setClient(''); setDescription(''); 
      setTechnologies(''); setResults(''); setImageFile(null);
    },
    onError: (err: any) => {
      console.error("Backend Error Response:", err.response?.data);
      toast.error(err.response?.data?.message || 'Failed to add case study.');
    },
  });
  
  const { mutate: removeCaseStudy } = useMutation({
    mutationFn: deleteCaseStudy,
    onSuccess: () => {
      toast.success('Case study deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['caseStudies'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete case study.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !client || !description || !technologies || !results || !imageFile) {
      toast.error('All required fields (*) must be filled.');
      return;
    }
    createCaseStudy();
  };

  const renderSkeletons = () => (
    [...Array(3)].map((_, i) => (
      <TableRow key={i}><TableCell><Skeleton className="h-4 w-1/3" /></TableCell><TableCell><Skeleton className="h-4 w-1/4" /></TableCell><TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell></TableRow>
    ))
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Case Studies</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" /> Add New Case Study</Button></DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Add New Case Study</DialogTitle>
              <DialogDescription>Fill in the details for the new case study.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <InputWithLabel id="title" label="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                <InputWithLabel id="slug" label="Slug" value={slug} onChange={e => setSlug(e.target.value)} required description="Auto-generated from title." />
                <InputWithLabel id="client" label="Client" value={client} onChange={e => setClient(e.target.value)} required placeholder="e.g., Global Tech Inc." />
                <TextareaWithLabel id="description" label="Description" value={description} onChange={e => setDescription(e.target.value)} required />
                <InputWithLabel id="technologies" label="Technologies" value={technologies} onChange={e => setTechnologies(e.target.value)} required placeholder="React, Python, AWS" />
                <TextareaWithLabel id="results" label="Results" value={results} onChange={e => setResults(e.target.value)} required description="Enter each result on a new line. We will format it." />
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="picture" className="text-right">Image <span className="text-red-500">*</span></Label>
                    <Input id="picture" type="file" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} className="col-span-3" />
                  </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isCreating}>{isCreating ? 'Adding...' : 'Add Case Study'}</Button>
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
            {isLoading ? ( renderSkeletons() ) : 
             isError ? ( <TableRow><TableCell colSpan={3} className="text-center text-destructive py-10"><div className='flex items-center justify-center gap-2'><AlertTriangle className="h-5 w-5" /><span>Error: {error.message}</span></div></TableCell></TableRow> ) : 
             caseStudies && caseStudies.length > 0 ? (
              caseStudies.map((study) => (
                <TableRow key={study._id}>
                  <TableCell className="font-medium text-card-foreground">{study.title}</TableCell>
                  <TableCell className="text-muted-foreground">{study.client}</TableCell>
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
                        <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the case study: "{study.title}".</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => removeCaseStudy(study.slug)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground py-10">No case studies found. Start by adding one.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Helper components for cleaner forms
const InputWithLabel = ({ id, label, value, onChange, type = "text", required = false, placeholder = "", description = "" }) => (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">{label} {required && <span className="text-red-500">*</span>}</Label>
      <div className='col-span-3'>
        <Input id={id} type={type} value={value} onChange={onChange} className="w-full" placeholder={placeholder} />
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </div>
    </div>
);

const TextareaWithLabel = ({ id, label, value, onChange, required = false, description = "" }) => (
    <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor={id} className="text-right mt-2">{label} {required && <span className="text-red-500">*</span>}</Label>
        <div className='col-span-3'>
          <Textarea id={id} value={value} onChange={onChange} />
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
    </div>
);


export default ManageCaseStudiesPage;