import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  ArrowRight,
  Rss,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const primaryNavigation = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.projects"), path: "/projects" },
    { label: t("nav.research"), path: "/research" },
    { label: t("nav.energy"), path: "/energy-blog" },
    { label: t("nav.creativity"), path: "/creativity" },
    { label: t("nav.contact"), path: "/contact" },
  ];

  const solutionLinks = [
    { label: t("footer.links.solutions.computerVision"), path: "/intelligence/computer-vision" },
    { label: t("footer.links.solutions.naturalLanguage"), path: "/intelligence/natural-language-ai" },
    { label: t("footer.links.solutions.mLOps"), path: "/projects" },
    { label: t("footer.links.solutions.smartCities"), path: "/projects" },
    { label: t("footer.links.solutions.healthcareAI"), path: "/projects" },
  ];

  const resourceLinks = [
    { label: t("footer.links.resources.researchLibrary"), path: "/research" },
    { label: t("footer.links.resources.caseStudies"), path: "/projects#case-studies" },
    { label: t("footer.links.resources.events"), path: "/about#events" },
    { label: t("footer.links.resources.energy"), path: "/energy-blog" },
    { label: t("footer.links.resources.press"), path: "/about#press" },
  ];

  const supportLinks = [
    { label: t("footer.links.support.contactSales"), path: "/contact" },
    { label: t("footer.links.support.partnerProgram"), path: "/contact#partners" },
    { label: t("footer.links.support.customerSuccess"), path: "/contact#support" },
    { label: t("footer.links.support.status"), path: "/status" },
    { label: t("footer.links.support.admin"), path: "/admin/login" },
  ];

  const legalLinks = [
    { label: t("footer.links.legal.privacy"), path: "/privacy" },
    { label: t("footer.links.legal.terms"), path: "/terms" },
    { label: t("footer.links.legal.security"), path: "/security" },
    { label: t("footer.links.legal.compliance"), path: "/compliance" },
  ];

  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/hekfa" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/company/hekfa" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com/hekfa_ai" },
  ];

  const stats = [
    { label: t("footer.stats.projects"), value: "500+" },
    { label: t("footer.stats.papers"), value: "50+" },
    { label: t("footer.stats.partners"), value: "30+" },
  ];

  return (
    <footer className="relative mt-32 bg-slate-950 text-slate-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/70 to-slate-950" />

      <div className="relative container mx-auto px-6 py-20 space-y-16">
        {/* CTA */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-[0_20px_80px_-40px_rgba(14,165,233,0.6)]">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold uppercase tracking-wide">
              <Sparkles className="h-4 w-4" />
              {t("footer.cta.badge")}
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold leading-snug text-white">
              {t("footer.cta.title")}
            </h2>
            <p className="text-slate-200/80 max-w-2xl">
              {t("footer.cta.subtitle")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="btn-neural shadow-lg" asChild>
                <Link to="/contact">
                  {t("footer.cta.primary")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10" asChild>
                <Link to="/energy-blog">
                  {t("footer.cta.secondary")} <Rss className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border border-primary/20 rounded-2xl p-6 bg-slate-950/70">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center space-y-1">
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
                <p className="text-xs uppercase tracking-wide text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Link clusters */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src="/images/CBRN-LOGO-SAIT-2-1024x414.png"
                  alt="Hekfa Logo"
                  className="h-10 w-10 object-contain"
                />
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl group-hover:blur-[18px] transition-all duration-300" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-2xl font-bold text-white">Hekfa</span>
                <span className="text-xs tracking-[0.35em] text-slate-300">AI DIVISION</span>
              </div>
            </Link>

            <p className="text-slate-300/80 leading-relaxed">
              {t(
                "footer.description",
                "From neural interfaces to retrieval-augmented systems, we help governments, labs, and Fortune 100 teams operationalize AI responsibly."
              )}
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-300/90">
                <Mail className="h-4 w-4 text-primary" />
                contact@hekfa.ai
              </div>
              <div className="flex items-center gap-3 text-slate-300/90">
                <Phone className="h-4 w-4 text-primary" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-3 text-slate-300/90">
                <MapPin className="h-4 w-4 text-primary" />
                San Francisco · London · Singapore
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ name, icon: Icon, url }) => (
                <Button key={name} variant="ghost" size="icon" asChild className="border border-white/10 bg-white/5 hover:bg-primary/20">
                  <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
                    <Icon className="h-4 w-4 text-white" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation clusters */}
          <div>
            <h3 className="text-sm font-semibold tracking-[0.3em] uppercase text-slate-400 mb-4">
              {t("footer.headings.explore")}
            </h3>
            <ul className="space-y-3 text-sm">
              {primaryNavigation.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors">
                    <span className="h-px w-4 bg-primary/40" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-[0.3em] uppercase text-slate-400 mb-4">
              {t("footer.headings.solutionsResearch")}
            </h3>
            <ul className="space-y-3 text-sm">
              {solutionLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-slate-300 hover:text-primary transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-xs uppercase tracking-[0.35em] text-slate-500 mt-6 mb-2">
              {t("footer.headings.resources")}
            </h4>
            <ul className="space-y-2 text-sm">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-slate-400 hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold tracking-[0.3em] uppercase text-slate-400 mb-4">
                {t("footer.headings.supportLegal")}
              </h3>
              <ul className="space-y-2 text-sm">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-slate-300 hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Separator className="my-4 bg-white/10" />
              <ul className="space-y-2 text-sm">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-slate-400 hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
{/* 
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
              <p className="text-sm text-white font-semibold uppercase tracking-wide">
                Research Dispatch
              </p>
              <p className="text-xs text-slate-200/70">
                Monthly insights from our labs, including release notes, evaluation benchmarks, and invites.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="work.email@company.com"
                  className="bg-slate-900/80 border-white/10 text-sm placeholder:text-slate-500"
                />
                <Button className="btn-neural px-4">Join</Button>
              </div>
            </div> */}
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-slate-400 uppercase tracking-[0.3em]">
          <span>© {currentYear} {t("footer.bottom.tagline")}</span>
          <div className="flex flex-wrap gap-4">
            <span>{t("footer.bottom.trustLine")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;