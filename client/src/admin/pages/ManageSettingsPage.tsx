import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axiosConfig';
import { toast } from 'sonner';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, PlusCircle, Save } from 'lucide-react';

// --- Interfaces matching the updated SiteConfigModel ---
interface ResearchStat {
  label: string;
  value: string;
  icon: string;
}
interface CompanyStat {
  value: string;
  label: string;
} 
interface ContactItem {
  title: string;
  description?: string;
  value: string;
  icon: string;
}
interface Office {
  city: string;
  country: string;
  address: string;
  phone: string;
  type: string;
}
interface SiteConfig {
  _id: string;
  researchStats: ResearchStat[];
  companyStats: CompanyStat[];
  contactInfo: ContactItem[];
  globalOffices: Office[];
}

// --- API Functions ---
const fetchConfig = async (): Promise<SiteConfig> => {
  const { data } = await api.get('/config');
  return data;
};

const updateConfig = async (configData: Omit<SiteConfig, '_id'>): Promise<SiteConfig> => {
  const { data } = await api.put('/config', configData);
  return data;
};

const ManageSettingsPage = () => {
  const queryClient = useQueryClient();
  
  // --- Local state for form management ---
  const [researchStats, setResearchStats] = useState<ResearchStat[]>([]);
  const [companyStats, setCompanyStats] = useState<CompanyStat[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactItem[]>([]);
  const [globalOffices, setGlobalOffices] = useState<Office[]>([]);

  const { data: configData, isLoading } = useQuery({
    queryKey: ['siteConfig'],
    queryFn: fetchConfig,
  });

  // Sync react-query data with local state once it's loaded
  useEffect(() => {
    if (configData) {
      setResearchStats(configData.researchStats || []);
      setCompanyStats(configData.companyStats || []);
      setContactInfo(configData.contactInfo || []);
      setGlobalOffices(configData.globalOffices || []);
    }
  }, [configData]);

  const { mutate: saveConfig, isPending: isSaving } = useMutation({
    mutationFn: updateConfig,
    onSuccess: () => {
      toast.success('Settings saved successfully!');
      queryClient.invalidateQueries({ queryKey: ['siteConfig'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to save settings.');
    },
  });

  const handleSaveChanges = () => {
    saveConfig({ researchStats, companyStats, contactInfo, globalOffices });
  };

  // --- Generic handler for array state changes ---
  const handleItemChange = <T,>(
    index: number,
    field: keyof T,
    value: string,
    state: T[],
    setter: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    const newState = [...state];
    newState[index] = { ...newState[index], [field]: value };
    setter(newState);
  };
  
  const handleAddItem = <T,>(defaultItem: T, state: T[], setter: React.Dispatch<React.SetStateAction<T[]>>) => {
    setter([...state, defaultItem]);
  };

  const handleRemoveItem = <T,>(index: number, state: T[], setter: React.Dispatch<React.SetStateAction<T[]>>) => {
    setter(state.filter((_, i) => i !== index));
  };


  if (isLoading) {
    return (
        <div>
            <Skeleton className="h-10 w-1/4 mb-6" />
            <div className="space-y-8">
                <Card><CardHeader><Skeleton className="h-6 w-1/3" /></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>
                <Card><CardHeader><Skeleton className="h-6 w-1/3" /></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>
            </div>
        </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <Button onClick={handleSaveChanges} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      <div className="space-y-8">
        {/* Company Statistics Section (About Page) */}
        <Card>
          <CardHeader>
            <CardTitle>Company Statistics (About Page)</CardTitle>
            <CardDescription>Manage key numbers like projects completed, team size, etc.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {companyStats.map((stat, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-md">
                <BilingualInput
                  label="Value"
                  englishValue={stat.value}
                  persianValue={stat.valueFa || ''}
                  onChange={(lang, value) =>
                    handleItemChange(
                      index,
                      lang === 'en' ? 'value' : 'valueFa',
                      value,
                      companyStats,
                      setCompanyStats
                    )
                  }
                />
                <BilingualInput
                  label="Label"
                  englishValue={stat.label}
                  persianValue={stat.labelFa || ''}
                  onChange={(lang, value) =>
                    handleItemChange(
                      index,
                      lang === 'en' ? 'label' : 'labelFa',
                      value,
                      companyStats,
                      setCompanyStats
                    )
                  }
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveItem(index, companyStats, setCompanyStats)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                handleAddItem({ value: '', valueFa: '', label: '', labelFa: '' }, companyStats, setCompanyStats)
              }
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Company Stat
            </Button>
          </CardContent>
        </Card>

        {/* Research Stats Section */}
        <Card>
          <CardHeader>
            <CardTitle>Research Statistics</CardTitle>
            <CardDescription>Manage the stats shown on the home/research pages.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {researchStats.map((stat, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-md">
                <BilingualInput
                  label="Label"
                  englishValue={stat.label}
                  persianValue={stat.labelFa || ''}
                  onChange={(lang, value) =>
                    handleItemChange(
                      index,
                      lang === 'en' ? 'label' : 'labelFa',
                      value,
                      researchStats,
                      setResearchStats
                    )
                  }
                />
                <BilingualInput
                  label="Value"
                  englishValue={stat.value}
                  persianValue={stat.valueFa || ''}
                  onChange={(lang, value) =>
                    handleItemChange(
                      index,
                      lang === 'en' ? 'value' : 'valueFa',
                      value,
                      researchStats,
                      setResearchStats
                    )
                  }
                />
                <InputWithLabel
                  label="Icon Name"
                  value={stat.icon}
                  onChange={(e) => handleItemChange(index, 'icon', e.target.value, researchStats, setResearchStats)}
                />
                <Button variant="destructive" size="icon" onClick={() => handleRemoveItem(index, researchStats, setResearchStats)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                handleAddItem(
                  { label: '', labelFa: '', value: '', valueFa: '', icon: '' },
                  researchStats,
                  setResearchStats
                )
              }
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Stat
            </Button>
          </CardContent>
        </Card>

        {/* Contact Info Section */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Manage contact details for the contact page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contactInfo.map((item, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-md">
                <BilingualInput
                  label="Title"
                  englishValue={item.title}
                  persianValue={item.titleFa || ''}
                  onChange={(lang, value) =>
                    handleItemChange(
                      index,
                      lang === 'en' ? 'title' : 'titleFa',
                      value,
                      contactInfo,
                      setContactInfo
                    )
                  }
                />
                <BilingualInput
                  label="Description"
                  englishValue={item.description || ''}
                  persianValue={item.descriptionFa || ''}
                  onChange={(lang, value) =>
                    handleItemChange(
                      index,
                      lang === 'en' ? 'description' : 'descriptionFa',
                      value,
                      contactInfo,
                      setContactInfo
                    )
                  }
                />
                <InputWithLabel
                  label="Value"
                  value={item.value}
                  onChange={(e) => handleItemChange(index, 'value', e.target.value, contactInfo, setContactInfo)}
                />
                <InputWithLabel
                  label="Icon Name"
                  value={item.icon}
                  onChange={(e) => handleItemChange(index, 'icon', e.target.value, contactInfo, setContactInfo)}
                />
                <Button variant="destructive" size="icon" onClick={() => handleRemoveItem(index, contactInfo, setContactInfo)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                handleAddItem(
                  { title: '', titleFa: '', description: '', descriptionFa: '', value: '', icon: '' },
                  contactInfo,
                  setContactInfo
                )
              }
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Contact Item
            </Button>
          </CardContent>
        </Card>

        {/* Global Offices Section */}
        <Card>
          <CardHeader>
            <CardTitle>Global Offices</CardTitle>
            <CardDescription>Manage office locations displayed on the contact page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {globalOffices.map((office, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-md relative">
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={() => handleRemoveItem(index, globalOffices, setGlobalOffices)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <BilingualInput
                  label="City"
                  englishValue={office.city}
                  persianValue={office.cityFa || ''}
                  onChange={(lang, value) =>
                    handleItemChange(
                      index,
                      lang === 'en' ? 'city' : 'cityFa',
                      value,
                      globalOffices,
                      setGlobalOffices
                    )
                  }
                />
                <BilingualInput
                  label="Country"
                  englishValue={office.country}
                  persianValue={office.countryFa || ''}
                  onChange={(lang, value) =>
                    handleItemChange(
                      index,
                      lang === 'en' ? 'country' : 'countryFa',
                      value,
                      globalOffices,
                      setGlobalOffices
                    )
                  }
                />
                <BilingualInput
                  label="Address"
                  englishValue={office.address}
                  persianValue={office.addressFa || ''}
                  onChange={(lang, value) =>
                    handleItemChange(
                      index,
                      lang === 'en' ? 'address' : 'addressFa',
                      value,
                      globalOffices,
                      setGlobalOffices
                    )
                  }
                />
                <InputWithLabel
                  label="Phone"
                  value={office.phone}
                  onChange={(e) => handleItemChange(index, 'phone', e.target.value, globalOffices, setGlobalOffices)}
                  vertical
                />
                <BilingualInput
                  label="Type"
                  englishValue={office.type}
                  persianValue={office.typeFa || ''}
                  onChange={(lang, value) =>
                    handleItemChange(
                      index,
                      lang === 'en' ? 'type' : 'typeFa',
                      value,
                      globalOffices,
                      setGlobalOffices
                    )
                  }
                />
              </div>
            ))}
             <Button
               variant="outline"
               onClick={() =>
                 handleAddItem(
                   {
                     city: '',
                     cityFa: '',
                     country: '',
                     countryFa: '',
                     address: '',
                     addressFa: '',
                     phone: '',
                     type: 'Branch',
                     typeFa: '',
                   },
                   globalOffices,
                   setGlobalOffices
                 )
               }
             >
               <PlusCircle className="mr-2 h-4 w-4" /> Add Office
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper component
const InputWithLabel = ({
  label,
  value,
  onChange,
  vertical = false,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  vertical?: boolean;
}) => (
  <div className={`w-full ${vertical ? 'flex flex-col' : 'grid'}`}>
    <Label className="mb-2 text-sm font-medium">{label}</Label>
    <Input value={value} onChange={onChange} />
  </div>
);

const BilingualInput = ({
  label,
  englishValue,
  persianValue,
  onChange,
}: {
  label: string;
  englishValue: string;
  persianValue: string;
  onChange: (lang: 'en' | 'fa', value: string) => void;
}) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium">{label}</Label>
    <div className="grid gap-2 md:grid-cols-2">
      <Input
        placeholder="English"
        value={englishValue}
        onChange={(e) => onChange('en', e.target.value)}
      />
      <Input
        dir="rtl"
        placeholder="فارسی"
        value={persianValue}
        onChange={(e) => onChange('fa', e.target.value)}
      />
    </div>
  </div>
);

export default ManageSettingsPage;