import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Layout
import SiteLayout from "./components/layout/SiteLayout";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/ProjectsGrid"; // این همان صفحه لیست پروژه‌هاست
import Research from "./pages/Research";
import ResearchCategoryPage from "./pages/ResearchCategory";
import ResearchDetail from "./pages/ResearchDetail";
import Contact from "./pages/Contact";
import ProjectDetailPage from './pages/ProjectDetailPage'; // این صفحه جزئیات پروژه است
import IntelligenceDetail from './pages/IntelligenceDetail';
import CaseStudyDetail from './pages/CaseStudyDetail';
import EnergyBlogPage from "./pages/EnergyBlog";
import CreativityPage from "./pages/Creativity";
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
import ManageIntelligencePage from './admin/pages/ManageIntelligencePage';
import ManageEnergyBlogPage from './admin/pages/ManageEnergyBlogPage';
import ManageCreativityPage from './admin/pages/ManageCreativityPage';

const queryClient = new QueryClient();

// Small helper to keep document language + direction in sync with i18n
const LanguageDirection = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language || "en";
    const dir = lang === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [i18n.language]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner richColors />
      <BrowserRouter>
        <LanguageDirection />
        <ScrollToTop />
        <Routes>
          {/* Public Site Routes */}
          <Route path="/" element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            {/* Dynamic project details page */}
            <Route path="projects/:slug" element={<ProjectDetailPage />} />
            <Route path="research" element={<Research />} />
            <Route path="research/category/:categorySlug" element={<ResearchCategoryPage />} />
            <Route path="research/:slug" element={<ResearchDetail />} />
            <Route path="intelligence/:slug" element={<IntelligenceDetail />} />
            <Route path="case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="energy-blog" element={<EnergyBlogPage />} />
            <Route path="creativity" element={<CreativityPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="team" element={<ManageTeamPage />} />
              <Route path="projects" element={<ManageProjectsPage />} />
              <Route path="research" element={<ManageResearchPage />} />
              <Route path="case-studies" element={<ManageCaseStudiesPage />} />
              <Route path="intelligence" element={<ManageIntelligencePage />} />
              <Route path="energy-blog" element={<ManageEnergyBlogPage />} />
              <Route path="creativity" element={<ManageCreativityPage />} />
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