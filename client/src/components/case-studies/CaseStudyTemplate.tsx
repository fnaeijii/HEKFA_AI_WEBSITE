import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import VisionBackground from "@/components/effects/VisionBackground";
import NLPBackground from "@/components/effects/NLPBackground";
import SpeechBackground from "@/components/effects/SpeechBackground";
import IOTBackground from "@/components/effects/IOTBackground";
import GenerativeBackground from "@/components/effects/GenerativeBackground";
import FloatingParticles from "@/components/effects/FloatingParticles";

export type CaseStudyDomain =
  | "Computer Vision"
  | "NLP"
  | "Generative AI"
  | "Audio AI"
  | "IoT + AI";

interface MediaBlock {
  type: "image" | "video" | "iframe";
  src: string;
  alt?: string;
}

interface KPI {
  label: string;
  value: string;
  accent?: string;
}

interface CaseStudyTemplateProps {
  title: string;
  subtitle: string;
  domain: CaseStudyDomain;
  heroMedia?: MediaBlock;
  summary: string;
  summaryPoints?: string[];
  problemTitle: string;
  problemDescription: string;
  problemPoints?: string[];
  solutionTitle: string;
  solutionSteps: string[];
  solutionMedia?: MediaBlock;
  technologies: string[];
  demo?: MediaBlock;
  results?: {
    kpis?: KPI[];
    highlights?: string[];
  };
  testimonial?: {
    quote: string;
    author: string;
    role?: string;
  };
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

const domainThemes: Record<CaseStudyDomain, {
  gradient: string;
  accent: string;
  badge: string;
  glow: string;
  background: JSX.Element;
}> = {
  "Computer Vision": {
    gradient: "from-cyan-500/20 via-blue-500/10 to-violet-600/20",
    accent: "text-cyan-300",
    badge: "border-cyan-400/60 bg-cyan-500/10 text-cyan-100",
    glow: "shadow-[0_0_35px_rgba(34,211,238,0.35)]",
    background: <VisionBackground />
  },
  "NLP": {
    gradient: "from-purple-500/25 via-indigo-500/10 to-blue-500/20",
    accent: "text-purple-200",
    badge: "border-purple-400/60 bg-purple-500/10 text-purple-100",
    glow: "shadow-[0_0_35px_rgba(168,85,247,0.35)]",
    background: <NLPBackground />
  },
  "Generative AI": {
    gradient: "from-fuchsia-500/20 via-cyan-500/10 to-indigo-500/20",
    accent: "text-pink-200",
    badge: "border-pink-400/60 bg-pink-500/10 text-pink-100",
    glow: "shadow-[0_0_35px_rgba(236,72,153,0.35)]",
    background: <GenerativeBackground />
  },
  "Audio AI": {
    gradient: "from-blue-500/20 via-cyan-500/15 to-emerald-500/20",
    accent: "text-blue-200",
    badge: "border-blue-400/60 bg-blue-500/10 text-blue-100",
    glow: "shadow-[0_0_35px_rgba(59,130,246,0.35)]",
    background: <SpeechBackground />
  },
  "IoT + AI": {
    gradient: "from-emerald-500/20 via-cyan-500/10 to-sky-500/20",
    accent: "text-emerald-200",
    badge: "border-emerald-400/60 bg-emerald-500/10 text-emerald-100",
    glow: "shadow-[0_0_35px_rgba(16,185,129,0.35)]",
    background: <IOTBackground />
  }
};

const stagger = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const CaseStudyTemplate = (props: CaseStudyTemplateProps) => {
  const theme = domainThemes[props.domain] ?? domainThemes["Computer Vision"];

  const renderMedia = (media?: MediaBlock) => {
    if (!media) return null;

    const baseClasses = "rounded-2xl overflow-hidden border border-white/10 shadow-xl";

    if (media.type === "image") {
      return (
        <img
          src={media.src}
          alt={media.alt || props.title}
          className={`${baseClasses} w-full h-full object-cover hover:scale-[1.01] transition-transform duration-500`}
        />
      );
    }

    if (media.type === "video") {
      return (
        <video
          src={media.src}
          className={`${baseClasses} w-full h-full object-cover`}
          autoPlay
          loop
          muted
          playsInline
        />
      );
    }

    return (
      <iframe
        src={media.src}
        title={media.alt || props.title}
        className={`${baseClasses} w-full h-full min-h-[320px] bg-black/60`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  };

  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      {theme.background}
      <FloatingParticles count={30} />

      <div className="relative container mx-auto px-6 md:px-10 py-20 space-y-20">
        <motion.section
          className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center pt-12"
          initial="initial"
          whileInView="whileInView"
          viewport={stagger.viewport}
          transition={stagger.transition}
        >
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br backdrop-blur-xl border border-white/10" style={{
            backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.4)), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 35%), radial-gradient(circle at 80% 30%, rgba(0,255,255,0.08), transparent 35%)`
          }} />
          <motion.div className="space-y-6" variants={stagger}>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm uppercase tracking-[0.2em] text-white/70">Case Study Template</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {props.title}
              </h1>
              <span className={`text-xs md:text-sm px-4 py-2 rounded-full border ${theme.badge} font-semibold tracking-wide uppercase`}>
                {props.domain}
              </span>
            </div>
            <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
              {props.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              {props.ctaPrimary && (
                <Link to={props.ctaPrimary.href} className="btn-glow inline-flex items-center gap-2">
                  {props.ctaPrimary.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {props.ctaSecondary && (
                <Link
                  to={props.ctaSecondary.href}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur-lg hover:border-white/40 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" /> {props.ctaSecondary.label}
                </Link>
              )}
            </div>
            {props.summaryPoints && props.summaryPoints.length > 0 && (
              <div className="grid gap-3 md:grid-cols-2">
                {props.summaryPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className={`glass-card flex items-start gap-3 p-4 border-white/10 ${theme.glow}`}
                  >
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            className="relative h-full min-h-[320px] rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl"
            variants={stagger}
          >
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${theme.gradient}`} />
            <div className="relative p-3 lg:p-5 h-full flex items-center justify-center">
              {renderMedia(props.heroMedia) || (
                <div className="w-full h-full min-h-[280px] rounded-2xl border border-dashed border-white/20 bg-black/40 flex items-center justify-center text-white/60">
                  Add hero image, video, or 3D render here.
                </div>
              )}
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]"
          initial="initial"
          whileInView="whileInView"
          viewport={stagger.viewport}
          transition={stagger.transition}
        >
          <motion.div className="space-y-6" variants={stagger}>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <span className={`h-10 w-1 rounded-full bg-gradient-to-b ${theme.gradient.replace(/\/10/g, "/60")}`} />
              Executive Summary
            </h2>
            <p className="text-white/80 leading-relaxed text-lg">{props.summary}</p>
            {props.summaryPoints && props.summaryPoints.length > 0 && (
              <div className="grid gap-3 md:grid-cols-2">
                {props.summaryPoints.map((point, idx) => (
                  <motion.div
                    key={idx}
                    className="glass-card p-4 border-white/10"
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                      <p className="text-sm text-white/80 leading-relaxed">{point}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div className="space-y-8" variants={stagger}>
            <div className="glass-card p-6 border-white/10 space-y-4">
              <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                <span className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  01
                </span>
                {props.problemTitle}
              </h3>
              <p className="text-white/70 leading-relaxed">{props.problemDescription}</p>
              {props.problemPoints && (
                <ul className="space-y-2 text-white/70">
                  {props.problemPoints.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="mt-2 h-1.5 w-4 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="glass-card p-6 border-white/10 space-y-4">
              <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                <span className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  02
                </span>
                {props.solutionTitle}
              </h3>
              <div className="space-y-3">
                {props.solutionSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white/80">
                      {idx + 1}
                    </div>
                    <p className="text-white/80 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
              {props.solutionMedia && (
                <div className="pt-4">
                  {renderMedia(props.solutionMedia)}
                </div>
              )}
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          className="space-y-8"
          initial="initial"
          whileInView="whileInView"
          viewport={stagger.viewport}
          transition={stagger.transition}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">Technologies Used</h2>
            <div className={`px-4 py-2 rounded-full border text-sm ${theme.badge}`}>Glowing tech stack badges</div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {props.technologies.map((tech) => (
              <motion.div
                key={tech}
                className="neural-card p-4 border-white/10 bg-white/5"
                whileHover={{ scale: 1.03, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-white/90">{tech}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">AI Ready</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]"
          initial="initial"
          whileInView="whileInView"
          viewport={stagger.viewport}
          transition={stagger.transition}
        >
          <motion.div className="space-y-6" variants={stagger}>
            <h2 className="text-2xl md:text-3xl font-bold">Demo Preview</h2>
            <div className="glass-card border-white/10 p-4 md:p-6">
              {renderMedia(props.demo) || (
                <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-white/20 bg-black/40 text-white/60">
                  Drop in a video, image gallery, or live iframe demo.
                </div>
              )}
            </div>
          </motion.div>

          <motion.div className="space-y-6" variants={stagger}>
            <div className="grid gap-4 sm:grid-cols-2">
              {(props.results?.kpis ?? []).map((kpi, idx) => (
                <motion.div
                  key={idx}
                  className="glass-card p-5 border-white/10 relative overflow-hidden"
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                  <div className="relative space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">{kpi.label}</p>
                    <p className={`text-3xl font-black ${kpi.accent || theme.accent}`}>{kpi.value}</p>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <p className="text-xs text-white/60">Animated KPI card</p>
                  </div>
                </motion.div>
              ))}
              {(props.results?.kpis?.length ?? 0) === 0 && (
                <div className="glass-card p-5 border border-dashed border-white/20 text-white/60 text-sm text-center">
                  Add KPI cards here to spotlight measurable impact.
                </div>
              )}
            </div>

            {props.results?.highlights && (
              <div className="glass-card p-5 border-white/10 space-y-3">
                <h3 className="text-lg font-semibold">Impact Highlights</h3>
                <ul className="space-y-2 text-white/75">
                  {props.results.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </motion.section>

        {props.testimonial && (
          <motion.section
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl"
            initial="initial"
            whileInView="whileInView"
            viewport={stagger.viewport}
            transition={stagger.transition}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />
            <div className="absolute inset-0 bg-grid-white/5 bg-[size:24px_24px] opacity-20" />
            <div className="relative space-y-4">
              <p className="text-lg text-white/80 leading-relaxed max-w-4xl">“{props.testimonial.quote}”</p>
              <div className="flex items-center gap-3 text-white/70">
                <span className="h-10 w-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center">💠</span>
                <div>
                  <p className="font-semibold text-white">{props.testimonial.author}</p>
                  {props.testimonial.role && <p className="text-sm text-white/70">{props.testimonial.role}</p>}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        <motion.section
          className="flex flex-col gap-4 items-center justify-center text-center py-10"
          initial="initial"
          whileInView="whileInView"
          viewport={stagger.viewport}
          transition={stagger.transition}
        >
          <p className="text-white/70">Ready to build your next intelligent product?</p>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {props.ctaPrimary && (
              <Link to={props.ctaPrimary.href} className="btn-glow inline-flex items-center gap-2">
                {props.ctaPrimary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            {props.ctaSecondary && (
              <Link
                to={props.ctaSecondary.href}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur-lg hover:border-white/40 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" /> {props.ctaSecondary.label}
              </Link>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default CaseStudyTemplate;
