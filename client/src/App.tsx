import { Toaster } from "@/components/ui/toaster";

import { Toaster as Sonner } from "@/components/ui/sonner";

import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./i18n";



// Layout

import SiteLayout from "./components/layout/SiteLayout";



// Public Pages

import Home from "./pages/Home";

import About from "./pages/About";

import Projects from "./pages/Projects";

import Research from "./pages/Research";

import Contact from "./pages/Contact";

import NotFound from "./pages/NotFound";



// --- Admin Imports ---

import LoginPage from './admin/pages/LoginPage';

import AdminLayout from './admin/layouts/AdminLayout';

import DashboardPage from './admin/pages/DashboardPage';

import ProtectedRoute from './admin/components/ProtectedRoute';

import ManageTeamPage from './admin/pages/ManageTeamPage';

import ManageProjectsPage from './admin/pages/ManageProjectsPage';

import ManageResearchPage from './admin/pages/ManageResearchPage';

import ManageCaseStudiesPage from './admin/pages/ManageCaseStudiesPage';

import ManageEventsPage from './admin/pages/ManageEventsPage';

import ManageSettingsPage from './admin/pages/ManageSettingsPage';



const queryClient = new QueryClient();



const App = () => (

  <QueryClientProvider client={queryClient}>

    <TooltipProvider>

      <Toaster />

      <Sonner richColors />

      <BrowserRouter>

        <Routes>

          {/* Public Site Routes */}

          <Route path="/" element={<SiteLayout />}>

            <Route index element={<Home />} />

            <Route path="about" element={<About />} />

            <Route path="projects" element={<Projects />} />

            <Route path="research" element={<Research />} />

            <Route path="contact" element={<Contact />} />

          </Route>



          {/* Admin Routes */}

          <Route path="/admin/login" element={<LoginPage />} />



          <Route path="/admin" element={<ProtectedRoute />}>

            <Route element={<AdminLayout />}>

              <Route index element={<DashboardPage />} />

              {/* --- ثبت مسیرهای جدید --- */}

              <Route path="team" element={<ManageTeamPage />} />

              <Route path="projects" element={<ManageProjectsPage />} />

              <Route path="research" element={<ManageResearchPage />} />

              <Route path="case-studies" element={<ManageCaseStudiesPage />} />

              <Route path="events" element={<ManageEventsPage />} />

              <Route path="settings" element={<ManageSettingsPage />} />

            </Route>

          </Route>



          {/* Fallback 404 Route */}

          <Route path="*" element={<NotFound />} />

        </Routes>

      </BrowserRouter>

    </TooltipProvider>

  </QueryClientProvider>

);



export default App;
