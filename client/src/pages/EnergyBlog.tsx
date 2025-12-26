import { useEffect, useMemo, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Leaf,
  Wind,
  Sun,
  Droplets,
  Play,
  Sparkles,
  Waves,
  CloudSun,
} from "lucide-react";
import api from "@/lib/axiosConfig";
import FloatingParticles from "@/components/effects/FloatingParticles";
import { useTranslation } from "react-i18next";
import { selectLocalized } from "@/lib/utils";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface EnergyBlogEntry {
  _id: string;
  title: string;
  titleFa?: string;
  slug: string;
  excerpt?: string;
  excerptFa?: string;
  content: string;
  contentFa?: string;
  image: string;
  icon?: string;
  order?: number;
}

const iconMap: Record<string, IconComponent> = {
  Leaf,
  Wind,
  Sun,
  Droplets,
  Sparkles,
  Waves,
  CloudSun,
};

const EnergyBlogPage = () => {
  const [entries, setEntries] = useState<EnergyBlogEntry[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/energy-blogs");
        setEntries(data);
        if (data.length) {
          setActiveSection(data[0].slug);
        }
        setError(null);
      } catch (err) {
        setError("Unable to load energy blog content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  useEffect(() => {
    const updateViewport = () => {
      if (typeof window !== "undefined") {
        setViewport({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (!entries.length) return;

    const handleScroll = () => {
      const sections = entries.map((entry) => {
        const element = document.getElementById(entry.slug);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: entry.slug,
            top: Math.abs(rect.top),
          };
        }
        return { id: entry.slug, top: Number.POSITIVE_INFINITY };
      });

      const closest = sections.reduce((prev, curr) =>
        curr.top < prev.top ? curr : prev
      );
      setActiveSection(closest.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [entries]);

  const scrollToSection = (slug: string) => {
    const element = document.getElementById(slug);
    if (!element) return;

    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const particles = useMemo(
    () =>
      [...Array(20)].map((_, i) => ({
        id: i,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
        startX: Math.random() * viewport.width,
        endX: Math.random() * viewport.width,
      })),
    [viewport]
  );

  const renderIcon = (iconName?: string) => {
    const IconComponent = (iconName && iconMap[iconName]) || Leaf;
    return <IconComponent className="w-4 h-4 shrink-0" />;
  };

  return (
    <div>
    <div className="min-h-screen relative bg-background pt-20">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-teal-500/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              initial={{ x: particle.startX, y: -20 }}
              animate={{
                y: viewport.height + 20,
                x: particle.endX,
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6 py-12"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/30 mb-6"
              >
                <Leaf className="w-5 h-5 text-green-500 animate-pulse" />
                <span className="text-green-500 font-medium">
                  {t("energy.hero.badge")}
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
                {t("energy.hero.title")}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                {t("energy.hero.subtitle")}
              </p>
            </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-16"
        >
              <Card className="overflow-hidden bg-card/50 backdrop-blur-md border-2 border-primary/30">
            <div className="aspect-video bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200')] bg-cover bg-center opacity-50" />
              <Button size="lg" className="relative z-10 group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 mr-2" />
                {t("energy.video.watch")}
              </Button>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-6 pb-20">
        <div className="flex gap-8 relative">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block w-64 shrink-0"
          >
            <div className="sticky top-24">
                <Card className="p-6 bg-card/50 backdrop-blur-md border border-border/50">
                <h3 className="font-bold text-lg mb-4 text-foreground">
                  {t("energy.toc.title")}
                </h3>
                <ScrollArea className="h-[400px]">
                  <nav className="space-y-2">
                    {entries.map((entry) => (
                      <button
                        key={entry.slug}
                        onClick={() => scrollToSection(entry.slug)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                          activeSection === entry.slug
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                      >
                        {renderIcon(entry.icon)}
                        <span className="text-sm font-medium">
                          {selectLocalized(
                            entry as any,
                            "title",
                            i18n.language
                          ) ?? entry.title}
                        </span>
                      </button>
                    ))}
                    {!loading && !entries.length && (
                      <p className="text-muted-foreground text-sm">
                        {t("energy.state.empty")}
                      </p>
                    )}
                  </nav>
                </ScrollArea>
              </Card>
            </div>
          </motion.aside>

          <div className="flex-1 space-y-16">
            {loading && (
              <div className="space-y-6">
                {[...Array(3)].map((_, idx) => (
                  <Card
                    key={idx}
                    className="h-64 animate-pulse bg-card/40 border border-border/40"
                  />
                ))}
              </div>
            )}

            {error && !loading && (
              <Card className="p-6 border border-destructive/30 bg-destructive/10 text-destructive">
                {t("energy.state.error")}
              </Card>
            )}

            {!loading &&
              !error &&
              entries.map((entry, index) => {
                const IconComponent =
                  (entry.icon && iconMap[entry.icon]) || Leaf;
                const isImageRight = index % 2 === 0;

                return (
                  <motion.article
                    key={entry.slug}
                    id={entry.slug}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="scroll-mt-24"
                  >
                    <Card className="overflow-hidden bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                      <div
                        className={`flex flex-col ${
                          isImageRight ? "lg:flex-row" : "lg:flex-row-reverse"
                        } gap-6 p-6 lg:p-8`}
                      >
                        <div className="lg:w-1/2">
                          <div className="relative aspect-video rounded-xl overflow-hidden group">
                            <img
                              src={entry.image}
                              alt={entry.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>

                        <div className="lg:w-1/2 flex flex-col justify-center space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                              <IconComponent className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-sm font-medium text-primary">
                              {t("energy.article.label")} {index + 1}
                            </span>
                          </div>

                          <h2 className="text-3xl font-bold text-foreground">
                            {selectLocalized(
                              entry as any,
                              "title",
                              i18n.language
                            ) ?? entry.title}
                          </h2>

                          <p className="text-muted-foreground leading-relaxed">
                            {selectLocalized(
                              entry as any,
                              "content",
                              i18n.language
                            ) ?? entry.content}
                          </p>

                          {/* <Button variant="outline" className="w-fit mt-4">
                            Read Full Article
                          </Button> */}
                        </div>
                      </div>
                    </Card>
                  </motion.article>
                );
              })}
          </div>
        </div>
      </div>
    </div>
    {/* Bottom fade into site footer */}
    <div 
    className="relative h-80 pointer-events-none"
    style={{
      background: `linear-gradient(180deg, 
        hsl(224, 57%, 9%) 0%,           /* سرمه‌ای پررنگ در بالا */
        hsl(224, 55%, 8%) 30%,          /* کمی کمرنگ‌تر */
        hsla(224, 53%, 7%, 0.8) 45%,    /* شروع کاهش opacity */
        hsla(224, 50%, 6%, 0.5) 60%,     /* opacity متوسط */
        hsla(224, 47%, 5%, 0.25) 75%,    /* تقریباً شفاف */
        hsla(224, 43%, 4%, 0.1) 90%,     /* خیلی شفاف */
        transparent 100%                  /* کاملاً محو */
      )`
    }}
    >
      <FloatingParticles count={40} />
        {/* <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,23,42,0) 0%, rgba(15,23,42,0.08) 35%, rgba(15,23,42,0.3) 60%, rgba(15,23,42,0.7) 85%, rgba(15,23,42,1) 100%)",
          }}
        /> */}
      </div>
    </div>
  );
};

export default EnergyBlogPage;

