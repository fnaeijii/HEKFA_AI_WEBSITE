import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Brain, Menu, X, Globe, ChevronDown } from "lucide-react";
import { useLayout } from '@/contexts/LayoutContext'; // <-- ایمپورت هوک

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isProjectsIndexPage = location.pathname === '/projects';
  const { isHeroVisible } = useLayout(); // <-- استفاده از Context
  const navigationItems = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.about'), path: "/about" },
    { name: t('nav.projects'), path: "/projects" },
    { name: t('nav.research'), path: "/research" },
    { name: t('nav.energy'), path: "/energy-blog" },
    { name: t('nav.creativity'), path: "/creativity" },
    { name: t('nav.contact'), path: "/contact" },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavClassName = () => {
    const isProjectsIndexPage = location.pathname === '/projects';
    
    // سناریوی ۱: اگر در صفحه اصلی پروژه‌ها هستیم
    if (isProjectsIndexPage) {
      // اگر در بخش سینمایی هستیم (isHeroVisible از Context می‌آید) -> شفاف
      // اگر به Case Studies رسیدیم -> کدر و شیشه‌ای
      return isHeroVisible
        ? 'bg-transparent' // <-- استایل شفاف برای بخش سینمایی
        : 'fixed top-0 left-0 right-0 z-50 transition-all duration-300';
    }
    
    // سناریوی ۲: برای تمام صفحات دیگر
    return scrolled
      ? 'bg-background/90 backdrop-blur-md border-b border-border/50'
      : 'bg-transparent';
  };

  return (
    // <nav
    //   className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    //     scrolled
    //       ? "bg-background/90 backdrop-blur-md border-b border-border/50"
    //       : "bg-transparent"
    //   }`}
    // >
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavClassName()}`}
    >
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* تگ Brain با تگ img جایگزین شده است */}
              <img
                src="/images/CBRN-LOGO-SAIT-2-1024x414.png" // <-- مسیر عکس شرکت خود را اینجا قرار دهید
                alt="Hekfa Logo" // <-- یک متن جایگزین مناسب بنویسید
                className="h-8 w-8 object-contain" // <-- کلاس‌های اندازه (h-8 w-8) حفظ شده‌اند
              />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold glow-text">Hekfa</span>
              <span className="text-xs text-muted-foreground font-mono">
                AI Division
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-5 text-sm font-semibold uppercase tracking-wide">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-1.5 rounded-lg transition-all duration-300 whitespace-nowrap ${
                  location.pathname === item.path
                    ? "text-primary glow-text"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Language Selector & CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground px-2">
                  <Globe className="h-4 w-4 mr-2" />
                  {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={`cursor-pointer ${
                      i18n.language === lang.code ? 'bg-primary/10' : ''
                    }`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/contact">
              <Button size="sm" className="btn-neural px-4 whitespace-nowrap">{t('nav.getStarted')}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-4 border-t border-border/50"
            >
              <div className="flex flex-col space-y-2 mt-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg transition-all duration-300 ${
                      location.pathname === item.path
                        ? "text-primary bg-primary/10 border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Globe className="h-4 w-4 mr-2" />
                        {currentLanguage.name}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-40">
                      {languages.map((lang) => (
                        <DropdownMenuItem
                          key={lang.code}
                          onClick={() => i18n.changeLanguage(lang.code)}
                          className="cursor-pointer"
                        >
                          <span className="mr-2">{lang.flag}</span>
                          {lang.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                    <Button className="btn-neural w-full mt-3">{t('nav.getStarted')}</Button>
                  </Link>                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;