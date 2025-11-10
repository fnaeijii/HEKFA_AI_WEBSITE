import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axiosConfig'; 
import { toast } from 'sonner';

// UI Components
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, PlusCircle, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// --- Interfaces to match backend model ---
interface TeamMember {
  _id: string;
  name: string;
  role: string;
  imageUrl: string;
  specialty?: string;
  bio: string;
  linkedinUrl?: string;
}

interface NewTeamMemberData {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  specialty?: string;
  linkedinUrl?: string;
}

// --- API Functions ---
const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  const { data } = await api.get(`/team`);
  return data;
};

const addTeamMember = async (newMember: NewTeamMemberData): Promise<TeamMember> => {
  const { data } = await api.post(`/team`, newMember);
  return data;
};

const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await api.post(`/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return data.url; 
};


const ManageTeamPage = () => {
  // --- State Management ---
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  // --- React Query ---
  const queryClient = useQueryClient();

  const { data: members, isLoading, isError, error } = useQuery({
    queryKey: ['teamMembers'],
    queryFn: fetchTeamMembers,
  });

  const { mutate: createMember, isPending: isCreating } = useMutation({
    mutationFn: async (): Promise<TeamMember> => {
      if (!imageFile) throw new Error("Please select an image.");
      
      const imageUrl = await uploadImage(imageFile);
      
      return addTeamMember({ name, role, imageUrl, bio, specialty, linkedinUrl });
    },
    onSuccess: () => {
      toast.success('Team member added successfully!');
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
      setIsDialogOpen(false); 
      // Reset all form fields
      setName('');
      setRole('');
      setBio('');
      setSpecialty('');
      setLinkedinUrl('');
      setImageFile(null);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || "An unexpected error occurred.";
      console.error("Error creating team member:", error.response?.data || error);
      toast.error(errorMessage);
    },
  });

  // --- Handlers ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !bio || !imageFile) {
      toast.error("Please fill Name, Role, Bio, and select an image.");
      return;
    }
    createMember();
  };
  
  const renderSkeletons = () => (
    [...Array(3)].map((_, i) => (
      <TableRow key={i}>
        <TableCell>
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
        </TableCell>
        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
      </TableRow>
    ))
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Team Members</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>Fill in the details below to add a new member to your team.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name <span className="text-red-500">*</span></Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">Role <span className="text-red-500">*</span></Label>
                    <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="bio" className="text-right mt-2">Bio <span className="text-red-500">*</span></Label>
                    <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="col-span-3" placeholder="A short biography..." />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="specialty" className="text-right">Specialty</Label>
                    <Input id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="col-span-3" placeholder="e.g., AI Research" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="linkedinUrl" className="text-right">LinkedIn URL</Label>
                    <Input id="linkedinUrl" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} className="col-span-3" placeholder="https://linkedin.com/in/..." />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="picture" className="text-right">Picture <span className="text-red-500">*</span></Label>
                    <Input id="picture" type="file" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? 'Adding...' : 'Add Member'}
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
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              renderSkeletons()
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-destructive py-10">
                  <div className='flex justify-center items-center gap-2'> <AlertTriangle className="h-5 w-5" /> <span>Error: {error.message}</span></div>
                </TableCell>
              </TableRow>
            ) : members && members.length > 0 ? (
              members.map((member) => (
                <TableRow key={member._id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={`${import.meta.env.VITE_API_URL}${member.imageUrl}`} alt={member.name} />
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-card-foreground">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{member.role}</TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground py-10">No team members found. Start by adding one.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageTeamPage;