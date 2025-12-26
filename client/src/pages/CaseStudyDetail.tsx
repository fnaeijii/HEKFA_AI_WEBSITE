import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, ArrowRight, Check, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/axiosConfig";
import FloatingParticles from "@/components/effects/FloatingParticles";
import { useTranslation } from "react-i18next";
import { selectLocalized } from "@/lib/utils";

interface CaseStudySection {
  id: string;
  title: string;
  titleFa?: string;
  content: string;
  contentFa?: string;
}

interface CaseStudyResult {
  metric: string;
  metricFa?: string;
  value: string;
  valueFa?: string;
  description: string;
  descriptionFa?: string;
}

interface CaseStudy {
  _id: string;
  title: string;
  titleFa?: string;
  slug: string;
  subtitle: string;
  subtitleFa?: string;
  tags: string[];
  client: string;
  clientFa?: string;
  duration?: string;
  industry?: string;
  industryFa?: string;
  description: string;
  descriptionFa?: string;
  heroImage?: string;
  imageUrl: string;
  sections: CaseStudySection[];
  results?: CaseStudyResult[];
  technologies: string[];
  pdfUrl?: string;
}

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!slug) {
        setError("Invalid case study slug.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data } = await api.get(`/case-studies/${encodeURIComponent(slug)}`);
        setCaseStudy(data);
        setActiveSection(data.sections?.[0]?.id || "");
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch case study. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      if (!caseStudy?.sections) return;

      const sections = caseStudy.sections.map((s) => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(caseStudy.sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [caseStudy]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsSidebarOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  const renderSkeleton = () => (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-10 pt-24">
        <div className="flex gap-8 lg:gap-12">
          <div className="hidden lg:block w-64">
            <Skeleton className="h-6 w-32 mb-4" />
            {[...Array(4)].map((_, idx) => (
              <Skeleton key={idx} className="h-10 w-full mb-2" />
            ))}
          </div>
          <div className="flex-1 max-w-4xl space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-32 w-full" />
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-24 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return renderSkeleton();

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">
            {error || "Case study not found"}
          </h2>
          <Button asChild>
            <Link to="/projects">
              <ArrowRight className="mr-2 h-4 w-4" />
              {t("caseStudy.backToProjects")}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const { title, subtitle, tags, client, duration, industry, sections, results, technologies, pdfUrl, heroImage } = caseStudy;
  const displayTitle =
    selectLocalized(caseStudy as any, "title", i18n.language) ?? title;
  const displaySubtitle =
    selectLocalized(caseStudy as any, "subtitle", i18n.language) ?? subtitle;
  const displayClient =
    selectLocalized(caseStudy as any, "client", i18n.language) ?? client;
  const displayIndustry =
    industry &&
    (selectLocalized(caseStudy as any, "industry", i18n.language) ?? industry);

  return (
    <div className="min-h-screen"
    // style={{
    //   background: `linear-gradient(180deg, 
    //     hsl(10, 50%, 50%) 0%,           /* سرمه‌ای پررنگ در بالا */
    //     hsl(10, 50%, 50%) 20%,          /* کمی کمرنگ‌تر */
    //     hsla(10, 50%, 50%, 0.8) 40%,    /* شروع کاهش opacity */
    //     hsla(10, 50%, 50%, 0.5) 60%,     /* opacity متوسط */
    //     hsla(10, 50%, 50%, 0.25) 80%,    /* تقریباً شفاف */
    //     hsla(10, 50%, 50%, 0.1) 90%,     /* خیلی شفاف */
    //     transparent 100%                  /* کاملاً محو */
    //   )`
    // }}
    >
      <div className="bg-background">
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <ScrollArea className="h-full p-6">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                {t("caseStudy.contents")}
              </h3>
              {sections?.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                    activeSection === section.id
                      ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {selectLocalized(section as any, "title", i18n.language) ?? section.title}
                </button>
              ))}
              {pdfUrl && (
                <Button className="w-full mt-6" variant="outline" asChild>
                  <a href={pdfUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    {t("caseStudy.downloadPdf")}
                  </a>
                </Button>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_50%)]" />
        
        {heroImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage: `url(${heroImage.startsWith('http') ? heroImage : `${import.meta.env.VITE_API_URL}${heroImage}`})`
            }}
          />
        )}
        
        <div className="container relative z-10 px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              {displayTitle}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {displaySubtitle}
            </p>

            <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
              <div>
                <span className="text-foreground font-semibold">{t("caseStudy.client")}:</span>{" "}
                {displayClient}
              </div>
              {duration && (
                <div>
                  <span className="text-foreground font-semibold">{t("caseStudy.duration")}:</span> {duration}
                </div>
              )}
              {industry && (
                <div>
                  <span className="text-foreground font-semibold">{t("caseStudy.industry")}:</span>{" "}
                  {displayIndustry}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container px-6 py-12">
        <div className="flex gap-8 lg:gap-12">
          {/* Sticky Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                {t("caseStudy.contents")}
              </h3>
              
              {sections?.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                    activeSection === section.id
                      ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {selectLocalized(section as any, "title", i18n.language) ?? section.title}
                </button>
              ))}

              {pdfUrl && (
                <Button className="w-full mt-6" variant="outline" asChild>
                  <a href={pdfUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    {t("caseStudy.downloadPdf")}
                  </a>
                </Button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            {/* Mobile Menu Button */}
            <div className="lg:hidden mb-6">
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Menu className="mr-2 h-4 w-4" />
                    {t("caseStudy.tableOfContents")}
                  </Button>
                </SheetTrigger>
              </Sheet>
            </div>

            {/* Results Section */}
            {results && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-8 text-center">{t("caseStudy.keyResults")}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {results.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="text-center"
                        >
                          <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                            {selectLocalized(
                              result as any,
                              "value",
                              i18n.language
                            ) ?? result.value}
                          </div>
                          <div className="text-sm font-semibold text-foreground mb-1">
                            {selectLocalized(
                              result as any,
                              "metric",
                              i18n.language
                            ) ?? result.metric}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {selectLocalized(
                              result as any,
                              "description",
                              i18n.language
                            ) ?? result.description}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Content Sections */}
            {sections && sections.length > 0 && (
              <div className="space-y-12">
                {sections.map((section, index) => (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1 }}
                    className="scroll-mt-24"
                  >
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                    {selectLocalized(
                      section as any,
                      "title",
                      i18n.language
                    ) ?? section.title}
                  </h2>
                  <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                    {selectLocalized(
                      section as any,
                      "content",
                      i18n.language
                    ) ?? section.content}
                  </div>
                  </motion.section>
                ))}
              </div>
            )}

            {/* Technologies Used */}
            {technologies && technologies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12"
              >
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-6">{t("caseStudy.technologiesUsed")}</h3>
                    <div className="flex flex-wrap gap-3">
                      {technologies.map((tech) => (
                        <div
                          key={tech}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 text-secondary-foreground border border-border"
                        >
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </main>
        </div>
      </div>
      
      
      
      </div>

      {/* CTA Section */}
      <section 
      className="py-32 relative bg-gradient-to-br from-primary/5 to-secondary/5"
      style={{
        background: `linear-gradient(180deg, 
          hsl(224, 57%, 9%) 0%,           /* سرمه‌ای پررنگ در بالا */
          hsl(215, 63%, 11%) 40%,          /* کمی کمرنگ‌تر */
          hsla(208, 62%, 9%, 0.8) 55%,    /* شروع کاهش opacity */
          hsla(208, 62%, 9%, 0.5) 65%,     /* opacity متوسط */
          hsla(208, 62%, 9%, 0.25) 85%,    /* تقریباً شفاف */
          hsla(208, 62%, 9%, 0.1) 95%,     /* خیلی شفاف */
          transparent 100%                  /* کاملاً محو */
        )`,
        paddingTop: 140,
        paddingBottom: 50
      }}
      >
        <FloatingParticles count={60} />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" /> */}
        <div className="container px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("caseStudy.cta.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t("caseStudy.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="group">
                <Link to="/contact">
                  {t("caseStudy.cta.primary")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/projects">{t("caseStudy.cta.secondary")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Bottom fade into site footer */}
      {/* <div className="relative h-40 pointer-events-none">
        <div
          className="absolute inset-0"
          
        />
      </div> */}
    </div>
  );
};

export default CaseStudyDetail;


