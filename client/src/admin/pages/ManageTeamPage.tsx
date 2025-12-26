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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { AlertTriangle, Edit, MoreHorizontal, PlusCircle, Trash2, Users } from 'lucide-react';

interface TeamMember {
  _id: string;
  name: string;
  nameFa?: string;
  role: string;
  roleFa?: string;
  specialty?: string;
  specialtyFa?: string;
  bio: string;
  bioFa?: string;
  imageUrl: string;
  linkedinUrl?: string;
  order?: number;
}

interface LanguageValue {
  en: string;
  fa: string;
}

const emptyLang: LanguageValue = { en: '', fa: '' };

const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  const { data } = await api.get('/team');
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

const ManageTeamPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [name, setName] = useState<LanguageValue>(emptyLang);
  const [role, setRole] = useState<LanguageValue>(emptyLang);
  const [specialty, setSpecialty] = useState<LanguageValue>(emptyLang);
  const [bio, setBio] = useState<LanguageValue>(emptyLang);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [order, setOrder] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  const queryClient = useQueryClient();

  const { data: members, isLoading, isError, error } = useQuery({
    queryKey: ['teamMembers'],
    queryFn: fetchTeamMembers,
  });

  const { mutateAsync: createMember, isPending: isCreating } = useMutation({
    mutationFn: (payload: any) => api.post('/team', payload),
  });

  const { mutateAsync: updateMember, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => api.put(`/team/${id}`, payload),
  });

  const { mutate: removeMember } = useMutation({
    mutationFn: (id: string) => api.delete(`/team/${id}`),
    onSuccess: () => {
      toast.success('Team member deleted.');
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete member.');
    },
  });

  const resetForm = () => {
    setName(emptyLang);
    setRole(emptyLang);
    setSpecialty(emptyLang);
    setBio(emptyLang);
    setLinkedinUrl('');
    setOrder('');
    setImageFile(null);
    setImageUrl('');
    setEditingMember(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (member: TeamMember) => {
    setEditingMember(member);
    setName({ en: member.name, fa: member.nameFa || '' });
    setRole({ en: member.role, fa: member.roleFa || '' });
    setSpecialty({ en: member.specialty || '', fa: member.specialtyFa || '' });
    setBio({ en: member.bio, fa: member.bioFa || '' });
    setLinkedinUrl(member.linkedinUrl || '');
    setOrder(member.order?.toString() || '');
    setImageUrl(member.imageUrl);
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.en || !role.en || !bio.en) {
      toast.error('Please fill in the required English fields.');
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
      toast.error('Please upload an image.');
      return;
    }

    const payload = {
      name: name.en,
      nameFa: name.fa || undefined,
      role: role.en,
      roleFa: role.fa || undefined,
      specialty: specialty.en || undefined,
      specialtyFa: specialty.fa || undefined,
      bio: bio.en,
      bioFa: bio.fa || undefined,
      linkedinUrl: linkedinUrl || undefined,
      imageUrl: finalImageUrl,
      order: order ? Number(order) : undefined,
    };

    try {
      if (editingMember) {
        await updateMember({ id: editingMember._id, payload });
        toast.success('Team member updated.');
      } else {
        await createMember(payload);
        toast.success('Team member added.');
      }
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
      setIsDialogOpen(false);
      resetForm();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save member.');
    }
  };

  const renderSkeletons = () =>
    [...Array(3)].map((_, idx) => (
      <TableRow key={idx}>
        <TableCell>
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-24" />
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
          <Users className="h-7 w-7 text-primary" />
          <h1 className="text-3xl font-bold">Manage Team Members</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingMember ? 'Edit Team Member' : 'New Team Member'}</DialogTitle>
              <DialogDescription>Provide bilingual details for this teammate.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <BilingualField label="Name" value={name} onChange={setName} required />
                <BilingualField label="Role" value={role} onChange={setRole} required />
              </div>
              <BilingualField label="Specialty" value={specialty} onChange={setSpecialty} />
              <BilingualField label="Bio" value={bio} onChange={setBio} textarea required />
              <div className="grid gap-4 md:grid-cols-2">
                <InputWithLabel
                  id="linkedin"
                  label="LinkedIn URL"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                />
                <InputWithLabel
                  id="order"
                  label="Order"
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Profile Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setImageFile(file);
                      if (file) {
                        setImageUrl('');
                      }
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
                  {isCreating || isUpdating ? 'Saving...' : editingMember ? 'Save Changes' : 'Add Member'}
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
            ) : members && members.length > 0 ? (
              members.map((member) => (
                <TableRow key={member._id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={`${import.meta.env.VITE_API_URL}${member.imageUrl}`} alt={member.name} />
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{member.role}</TableCell>
                  <TableCell className="text-muted-foreground">{member.order ?? 0}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(member)}>
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
                          <AlertDialogTitle>Delete “{member.name}”?</AlertDialogTitle>
                          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive hover:bg-destructive/90"
                            onClick={() => removeMember(member._id)}
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
                  No team members yet.
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
}: {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  placeholder?: string;
}) => (
  <div className="grid gap-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} />
  </div>
);

export default ManageTeamPage;
