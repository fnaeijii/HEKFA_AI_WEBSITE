import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import FloatingParticles from "@/components/effects/FloatingParticles";
import {
  Calendar,
  User,
  Download,
  ExternalLink,
  Menu,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/lib/axiosConfig";
import { useTranslation } from "react-i18next";
import { selectLocalized } from "@/lib/utils";

interface ResearchSubsection {
  id: string;
  title: string;
  titleFa?: string;
  content?: string;
  contentFa?: string;
}

interface ResearchSection {
  id: string;
  title: string;
  titleFa?: string;
  content: string;
  contentFa?: string;
  subsections?: ResearchSubsection[];
}

interface ResearchPost {
  _id: string;
  title: string;
  titleFa?: string;
  authors: string[];
  journal: string;
  publishedAt: string;
  category: string;
  summary: string;
  summaryFa?: string;
  content?: string;
  contentFa?: string;
  citations: number;
  downloadUrl?: string;
  pdfUrl?: string;
  doi?: string;
  sections?: ResearchSection[];
  references?: string[];
  readTimeMinutes?: number;
  status: "published" | "draft";
  slug: string;
}

const ResearchDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<ResearchPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("abstract");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError(t("researchDetail.invalidSlug", "Invalid research slug."));
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data } = await api.get(`/posts/${encodeURIComponent(slug)}`);
        setPost(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(t("researchDetail.fetchError", "Failed to fetch research paper. Please try again later."));
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, t]);

  const renderSkeleton = () => (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-10 pt-24">
        <div className="flex gap-8 lg:gap-12">
          <div className="hidden lg:block w-64">
            <Skeleton className="h-6 w-32 mb-4" />
            {[...Array(5)].map((_, idx) => (
              <Skeleton key={idx} className="h-10 w-full mb-2" />
            ))}
          </div>
          <div className="flex-1 max-w-3xl space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            {[...Array(3)].map((_, idx) => (
              <Skeleton key={idx} className="h-40 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const formattedDate = useMemo(
    () =>
      post
        ? new Date(post.publishedAt).toLocaleDateString(
            i18n.language === "fa" ? "fa-IR" : "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )
        : "",
    [post, i18n.language]
  );

  const readingTime = useMemo(() => {
    if (!post) return "";
    const mins = post.readTimeMinutes || Math.max(4, Math.round(post.summary.split(" ").length / 200));
    return i18n.language === "fa" 
      ? `${mins.toLocaleString("fa-IR")} دقیقه مطالعه`
      : `${mins} min read`;
  }, [post, i18n.language]);

  const localizedTitle = useMemo(
    () => selectLocalized(post as any, "title", i18n.language) ?? post?.title ?? "",
    [post, i18n.language]
  );

  const localizedSummary = useMemo(
    () => selectLocalized(post as any, "summary", i18n.language) ?? post?.summary ?? "",
    [post, i18n.language]
  );

  const contentSections = useMemo<ResearchSection[]>(() => {
    if (!post) return [];
    if (post.sections && post.sections.length > 0) {
      // Return sections with localized title/content
      return post.sections.map((section) => ({
        ...section,
        title: selectLocalized(section as any, "title", i18n.language) ?? section.title,
        content: selectLocalized(section as any, "content", i18n.language) ?? section.content,
        subsections: section.subsections?.map((sub) => ({
          ...sub,
          title: selectLocalized(sub as any, "title", i18n.language) ?? sub.title,
          content: selectLocalized(sub as any, "content", i18n.language) ?? sub.content,
        })),
      }));
    }
    // Fallback sections with translations
    return [
      {
        id: "abstract",
        title: t("researchDetail.sections.abstract", "Abstract"),
        content: localizedSummary,
      },
      {
        id: "introduction",
        title: t("researchDetail.sections.introduction", "Introduction"),
        content: t("researchDetail.sections.introductionContent", "{{title}} explores emerging advances in {{category}}. Expand this section with research motivation, the problem framing, and high-level objectives tailored to your study.")
          .replace("{{title}}", localizedTitle)
          .replace("{{category}}", post.category),
      },
      {
        id: "methodology",
        title: t("researchDetail.sections.methodology", "Methodology"),
        content: t("researchDetail.sections.methodologyContent", "Detail experimental design choices, datasets, tooling, and evaluation metrics. Reference {{journal}} or related benchmarks for reproducibility.")
          .replace("{{journal}}", post.journal),
      },
      {
        id: "results",
        title: t("researchDetail.sections.results", "Results & Discussion"),
        content: t("researchDetail.sections.resultsContent", "Summarize key findings, performance improvements, limitations, and future directions. Mention how the current {{citations}} citations reflect ongoing adoption.")
          .replace("{{citations}}", String(post.citations)),
      },
    ];
  }, [post, i18n.language, t, localizedTitle, localizedSummary]);

  const references = useMemo(() => {
    if (post?.references && post.references.length > 0) {
      return post.references;
    }
    if (!post) return [];
    return [
      `${post.title}. ${post.journal}, ${formattedDate}.`,
      post.downloadUrl ? `Supplementary PDF: ${post.downloadUrl}` : "Supplementary materials available on request.",
    ];
  }, [post, formattedDate]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsSidebarOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  const handleShare = async () => {
    if (!post) return;
    const shareData = {
      title: post.title,
      text: post.summary,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const sectionIds = useMemo(() => {
    const ids: string[] = [];
    contentSections.forEach((section) => {
      ids.push(section.id);
      section.subsections?.forEach((sub) => ids.push(sub.id));
    });
    if (references.length > 0) {
      ids.push("references");
    }
    return ids;
  }, [contentSections, references]);

  useEffect(() => {
    if (sectionIds.length === 0) return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  const TableOfContents = () => (
    <div className="space-y-1">
      <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
        {t("researchDetail.contents", "Contents")}
      </h2>
      {contentSections.map((section) => (
        <div key={section.id}>
          <button
            onClick={() => scrollToSection(section.id)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
              activeSection === section.id
                ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {section.title}
          </button>
          {section.subsections && section.subsections.length > 0 && (
            <div className="ml-4 mt-1 space-y-1">
              {section.subsections.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => scrollToSection(sub.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-all ${
                    activeSection === sub.id ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {sub.title}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
      {references.length > 0 && (
        <button
          onClick={() => scrollToSection("references")}
          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
            activeSection === "references"
              ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          {t("researchDetail.references", "References")}
        </button>
      )}
    </div>
  );

  if (loading) return renderSkeleton();

  if (error || !post) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center text-center px-6">
        <p className="text-lg text-red-500 mb-4">{error || t("researchDetail.notFound", "Research paper not found.")}</p>
        <Button asChild className="btn-neural">
          <Link to="/research">{t("researchDetail.backToResearch", "Back to Research")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <ScrollArea className="h-full p-6">
            <TableOfContents />
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <div className="container px-4 py-8 pt-24">
        <div className="flex gap-8 lg:gap-12">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <ScrollArea className="h-[calc(100vh-8rem)] pr-2">
                <TableOfContents />
              </ScrollArea>
            </div>
          </aside>

          <main className="flex-1 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 pb-8 border-b border-border"
            >
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-3">
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="lg:hidden">
                          <Menu className="h-5 w-5" />
                        </Button>
                      </SheetTrigger>
                    </Sheet>
                    <Button variant="ghost" size="icon" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    {(post.pdfUrl || post.downloadUrl) && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={post.pdfUrl || post.downloadUrl} download>
                          <Download className="mr-2 h-4 w-4" />
                          <span className="hidden sm:inline">PDF</span>
                        </a>
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/research">{t("researchDetail.back", "Back")}</Link>
                    </Button>
                  </div>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">{localizedTitle}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{t("researchDetail.authors", "Authors")}:</span>
                    <span>{post.authors.join(", ")}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{t("researchDetail.published", "Published")}:</span> {formattedDate}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{t("researchDetail.readTime", "Read time")}:</span> {readingTime}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{t("researchDetail.journal", "Journal")}:</span> {post.journal}
                  </div>
                  {post.doi && (
                    <div>
                      <span className="font-medium text-foreground">{t("researchDetail.doi", "DOI")}:</span>{" "}
                      <a href={`https://doi.org/${post.doi}`} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                        {post.doi}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {contentSections.map((section, index) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.05 }}
                className="scroll-mt-24 mb-12"
              >
                <h2 className="text-2xl font-bold mb-4 text-primary">{section.title}</h2>
                <div className="space-y-6">
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    {section.content.split("\n").map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                  {section.subsections?.map((sub) => (
                    <div key={sub.id} id={sub.id} className="space-y-2 scroll-mt-24">
                      <h3 className="text-lg font-semibold">{sub.title}</h3>
                      {sub.content && (
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{sub.content}</p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            ))}

            {references.length > 0 && (
              <motion.section
                id="references"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 pt-8 border-t border-border scroll-mt-24"
              >
                <h2 className="text-2xl font-bold mb-6">{t("researchDetail.references", "References")}</h2>
                <ol className="space-y-3 text-sm">
                  {references.map((ref, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-muted-foreground font-mono">[{index + 1}]</span>
                      <span className="text-muted-foreground">{ref}</span>
                    </li>
                  ))}
                </ol>
              </motion.section>
            )}

            <div className="flex justify-between items-center mt-16 pt-8 border-t border-border">
              <Button variant="ghost" className="group">
                <ChevronLeft className={`h-4 w-4 transition-transform group-hover:-translate-x-1 ${i18n.language === 'fa' ? 'ml-2' : 'mr-2'}`} />
                {t("researchDetail.previousArticle", "Previous Article")}
              </Button>
              <Button variant="ghost" className="group">
                {t("researchDetail.nextArticle", "Next Article")}
                <ChevronRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${i18n.language === 'fa' ? 'mr-2' : 'ml-2'}`} />
              </Button>
            </div>
          </main>
        </div>
      </div>

      {/* Bottom fade into site footer */}
      <div className="relative h-40 mt-8 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,23,42,0) 0%, rgba(15,23,42,0.08) 35%, rgba(15,23,42,0.3) 60%, rgba(15,23,42,0.7) 85%, rgba(15,23,42,1) 100%)",
          }}
        />
      </div>
    </div>
  );
};

export default ResearchDetail;

