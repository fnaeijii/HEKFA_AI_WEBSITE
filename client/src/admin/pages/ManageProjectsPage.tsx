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

interface Project {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  mainImageUrl: string;
  technologies: string[];
  projectUrl?: string;
  status?: string;
}

// Helper function to create a slug from a title
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

// --- API Functions for Projects ---
const fetchProjects = async (): Promise<Project[]> => {
  const { data } = await api.get('/projects');
  return data;
};

const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await api.post(`/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return data.url; 
};

const addProject = async (newProject: Omit<Project, '_id'>): Promise<Project> => {
  const { data } = await api.post('/projects', newProject);
  return data;
};

const deleteProject = async (slug: string): Promise<void> => {
  await api.delete(`/projects/${slug}`);
};

// --- Component ---
const ManageProjectsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    setSlug(createSlug(title));
  }, [title]);

  const queryClient = useQueryClient();

  const { data: projects, isLoading, isError, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const { mutate: createProject, isPending: isCreating } = useMutation({
    mutationFn: async (): Promise<Project> => {
      if (!imageFile) throw new Error("Please select an image.");
      const mainImageUrl = await uploadImage(imageFile);
      const technologiesArray = technologies.split(',').map(tech => tech.trim());
    
      return addProject({ 
        title, 
        slug,
        summary,
        description, 
        category,
        mainImageUrl, 
        technologies: technologiesArray, 
        projectUrl,
        status: 'Production',
      });
    },
    onSuccess: () => {
      toast.success('Project added successfully!');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsDialogOpen(false);
      // Reset form
      setTitle(''); setSlug(''); setSummary(''); setCategory(''); setDescription(''); 
      setTechnologies(''); setProjectUrl(''); setImageFile(null);
    },
    onError: (err: any) => {
      console.error("Backend Error Response:", err.response?.data);
      toast.error(err.response?.data?.message || 'Failed to add project.');
    },
  });
  
  const { mutate: removeProject } = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success('Project deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete project.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !summary || !category || !description || !technologies || !imageFile) {
      toast.error('All required fields (*) must be filled.');
      return;
    }
    createProject();
  };

  const renderSkeletons = () => (
    [...Array(3)].map((_, i) => (
      <TableRow key={i}>
        <TableCell><Skeleton className="h-4 w-1/3" /></TableCell>
        <TableCell><Skeleton className="h-4 w-2/3" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
      </TableRow>
    ))
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" /> Add New Project</Button></DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>Fill in the details for the new project.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <InputWithLabel id="title" label="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                <InputWithLabel id="slug" label="Slug" value={slug} onChange={e => setSlug(e.target.value)} required description="Auto-generated from title." />
                <InputWithLabel id="category" label="Category" value={category} onChange={e => setCategory(e.target.value)} required placeholder="e.g., Web Application" />
                <TextareaWithLabel id="summary" label="Summary" value={summary} onChange={e => setSummary(e.target.value)} required />
                <TextareaWithLabel id="description" label="Description" value={description} onChange={e => setDescription(e.target.value)} required />
                <InputWithLabel id="technologies" label="Technologies" value={technologies} onChange={e => setTechnologies(e.target.value)} required placeholder="React, Node.js, ..." />
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="picture" className="text-right">Image <span className="text-red-500">*</span></Label>
                    <Input id="picture" type="file" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} className="col-span-3" />
                  </div>
                 <InputWithLabel id="projectUrl" label="Project URL" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} placeholder="https://example.com" />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isCreating}>{isCreating ? 'Adding...' : 'Add Project'}</Button>
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
              <TableHead>Technologies</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? ( renderSkeletons() ) : 
             isError ? ( <TableRow><TableCell colSpan={3} className="text-center text-destructive py-10"><div className='flex justify-center items-center gap-2'><AlertTriangle className="h-5 w-5" /><span>Error: {error.message}</span></div></TableCell></TableRow> ) : 
            //  projects && projects.length > 0 ? ) : 
             projects && projects.length > 0 ? (
              projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell className="font-medium text-card-foreground">{project.title}</TableCell>
                  <TableCell className="text-muted-foreground">{project.category}</TableCell>
                  <TableCell className="text-muted-foreground">{project.technologies.join(', ')}</TableCell>
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
                        <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the project: "{project.title}".</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => removeProject(project.slug)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-10">No projects found.</TableCell></TableRow>
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

const TextareaWithLabel = ({ id, label, value, onChange, required = false }) => (
    <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor={id} className="text-right mt-2">{label} {required && <span className="text-red-500">*</span>}</Label>
        <Textarea id={id} value={value} onChange={onChange} className="col-span-3" />
    </div>
);


export default ManageProjectsPage;