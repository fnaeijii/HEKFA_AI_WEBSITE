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

// --- Interface to match the PostModel in the backend ---
interface Post {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // Keep content for the edit form later
  authors: string[];
  journal: string;
  publishedAt: string;
  citations?: number;
  downloadUrl?: string;
}

// Helper function to create a slug from a title
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

// --- API Functions for Posts ---
const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await api.get('/posts');
  return data;
};

const addPost = async (newPost: Omit<Post, '_id' | 'content'>): Promise<Post> => {
  // Assuming content is not mandatory for initial list view, but required for creation
  const postData = { ...newPost, content: newPost.summary }; // Default content to summary for now
  const { data } = await api.post('/posts', postData); 
  return data;
};

const deletePost = async (slug: string): Promise<void> => {
  await api.delete(`/posts/${slug}`);
};

// --- Component ---
const ManageResearchPage = () => {
  // --- State Management ---
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [authors, setAuthors] = useState('');
  const [journal, setJournal] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [citations, setCitations] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  
  // Auto-generate slug from title
  useEffect(() => {
    setSlug(createSlug(title));
  }, [title]);


  // --- React Query ---
  const queryClient = useQueryClient();

  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const { mutate: createPost, isPending: isCreating } = useMutation({
    mutationFn: (newPost: Omit<Post, '_id' | 'content'>) => addPost(newPost),
    onSuccess: () => {
      toast.success('Post added successfully!');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setIsDialogOpen(false);
      // Reset form
      setTitle(''); setSlug(''); setSummary(''); setAuthors(''); setJournal('');
      setPublishedAt(''); setCitations(''); setDownloadUrl('');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add post.');
    },
  });
  
  const { mutate: removePost } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success('Post deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete post.');
    },
  });

  // --- Handlers ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !summary || !authors || !journal || !publishedAt) {
      toast.error('Please fill all required fields.');
      return;
    }
    const authorsArray = authors.split(',').map(author => author.trim());
    
    createPost({
      title, slug, summary, authors: authorsArray, journal, publishedAt,
      citations: Number(citations) || 0,
      downloadUrl,
    });
  };

  const renderSkeletons = () => (
    [...Array(4)].map((_, i) => (
      <TableRow key={i}>
        <TableCell><Skeleton className="h-4 w-full" /></TableCell>
        <TableCell><Skeleton className="h-4 w-3/4" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
      </TableRow>
    ))
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Research Papers (Posts)</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Add New Post</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Add New Research Post</DialogTitle>
              <DialogDescription>Fill in the details to add a new publication.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <InputWithLabel id="title" label="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                <InputWithLabel id="slug" label="Slug" value={slug} onChange={e => setSlug(e.target.value)} required description="Auto-generated from title, but can be changed."/>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="summary" className="text-right mt-2">Summary <span className="text-red-500">*</span></Label>
                  <Textarea id="summary" value={summary} onChange={e => setSummary(e.target.value)} className="col-span-3" />
                </div>
                <InputWithLabel id="authors" label="Authors" value={authors} onChange={e => setAuthors(e.target.value)} required placeholder="John Doe, Jane Smith" />
                <InputWithLabel id="journal" label="Journal" value={journal} onChange={e => setJournal(e.target.value)} required />
                <InputWithLabel id="publishedAt" label="Pub. Date" type="date" value={publishedAt} onChange={e => setPublishedAt(e.target.value)} required />
                <InputWithLabel id="citations" label="Citations" type="number" value={citations} onChange={e => setCitations(e.target.value)} />
                <InputWithLabel id="downloadUrl" label="Download URL" value={downloadUrl} onChange={e => setDownloadUrl(e.target.value)} required />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isCreating}>{isCreating ? 'Adding...' : 'Add Post'}</Button>
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
              <TableHead>Authors</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? ( renderSkeletons() ) : 
             isError ? ( <TableRow><TableCell colSpan={3} className="text-center text-destructive py-10"><div className='flex justify-center items-center gap-2'><AlertTriangle className="h-5 w-5" /><span>Error: {error.message}</span></div></TableCell></TableRow> ) : 
             posts && posts.length > 0 ? (
              posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell className="font-medium text-card-foreground">{post.title}</TableCell>
                  <TableCell className="text-muted-foreground">{post.authors.join(', ')}</TableCell>
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
                        <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the post titled "{post.title}".</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => removePost(post.slug)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground py-10">No posts found. Start by adding one.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Helper component for cleaner form
const InputWithLabel = ({ id, label, value, onChange, type = "text", required = false, placeholder = "", description = "" }) => (
  <div className="grid grid-cols-4 items-center gap-4">
    <Label htmlFor={id} className="text-right">{label} {required && <span className="text-red-500">*</span>}</Label>
    <div className="col-span-3">
        <Input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} />
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </div>
  </div>
);


export default ManageResearchPage;