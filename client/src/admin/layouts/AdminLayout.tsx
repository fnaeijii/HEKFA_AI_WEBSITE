import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LayoutDashboard, Users, Briefcase, FileText, BookOpenCheck, Calendar, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useMemo } from 'react';

const NavItem = ({ to, icon: Icon, children }: { to: string, icon: React.ElementType, children: React.ReactNode }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white' // Sidebar is intentionally dark
      }`
    }
  >
    <Icon className="w-5 h-5 mr-3" />
    {children}
  </NavLink>
);

const AdminLayout = () => {
  const navigate = useNavigate();
  
  const userInfo = useMemo(() => {
    const storedUser = localStorage.getItem('userInfo');
    return storedUser ? JSON.parse(storedUser) : null;
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/team', icon: Users, label: 'Team Members' },
    { to: '/admin/projects', icon: Briefcase, label: 'Projects' },
    { to: '/admin/research', icon: FileText, label: 'Research' },
    { to: '/admin/case-studies', icon: BookOpenCheck, label: 'Case Studies' },
    { to: '/admin/events', icon: Calendar, label: 'Events' },
    { to: '/admin/settings', icon: Settings, label: 'Site Settings' },
  ];

  return (
    // <<-- تغییر: استفاده از bg-background برای سازگاری با تم -->>
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar (intentional dark theme) */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <div className="text-2xl font-bold mb-8 px-4">Hekfa AI Panel</div>
        <nav className="flex flex-col space-y-2">
          {navItems.map(item => (
            <NavItem key={item.to} to={item.to} icon={item.icon}>{item.label}</NavItem>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* <<-- تغییر: استفاده از bg-card و border برای هدر -->> */}
        <header className="flex justify-end items-center h-16 bg-card border-b px-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative">
                  {userInfo?.name || 'Admin'}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer focus:text-red-500 focus:bg-red-500/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;