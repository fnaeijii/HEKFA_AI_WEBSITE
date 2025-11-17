import CaseStudyTemplate, { CaseStudyDomain } from "@/components/case-studies/CaseStudyTemplate";

const sampleData = {
  title: "Autonomous Visual Inspection for Next-Gen Manufacturing",
  subtitle: "A reusable blueprint to showcase how Hekfa AI Division delivers measurable value across any AI domain.",
  domain: "Computer Vision" as CaseStudyDomain,
  heroMedia: {
    type: "image",
    src: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1400&q=80",
    alt: "Futuristic factory with holographic overlays"
  },
  summary: "This template is designed to be plug-and-play for every Hekfa case study. Swap content, media, KPIs, and domain-specific backgrounds without touching layout or animations.",
  summaryPoints: [
    "Modular sections with editable copy, bullets, and hero media.",
    "Dynamic neon background system that adapts by AI domain.",
    "Responsive grid with Framer Motion reveals and hover micro-interactions.",
    "Glowing tech badge grid ready for any stack combination."
  ],
  problemTitle: "Client Challenge",
  problemDescription: "Describe the business pain point, industry constraints, and what success looks like in one concise paragraph.",
  problemPoints: [
    "Highlight operational or accuracy bottlenecks.",
    "Call out data availability, latency, or compliance needs.",
    "Note constraints such as on-edge deployment or hybrid clouds."
  ],
  solutionTitle: "Hekfa's Solution Framework",
  solutionSteps: [
    "Discovery & design sprint to align AI success metrics with business OKRs.",
    "Model experimentation using curated datasets, synthetic augmentation, and responsible AI guardrails.",
    "Deployment via scalable microservices with continuous monitoring dashboards and human-in-the-loop tools."
  ],
  technologies: [
    "TensorFlow", "PyTorch", "YOLOv8", "OpenCV", "RAG Pipelines", "LangChain", "Whisper", "Edge TPU"
  ],
  demo: {
    type: "iframe",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    alt: "Demo walkthrough"
  },
  results: {
    kpis: [
      { label: "Accuracy Uplift", value: "+24%" },
      { label: "Latency Reduction", value: "-180ms", accent: "text-cyan-200" },
      { label: "Cost Efficiency", value: "-32%", accent: "text-emerald-200" },
      { label: "User Satisfaction", value: "4.8/5" }
    ],
    highlights: [
      "Animated KPI tiles emphasize outcomes and can be tailored per engagement.",
      "Use bullet highlights to narrate qualitative wins alongside metrics.",
      "Supports any number of KPIs by updating the props array."
    ]
  },
  testimonial: {
    quote: "Hekfa's reusable delivery framework let us ship AI capabilities in weeks instead of months.",
    author: "Avery Kim",
    role: "Director of Digital Transformation"
  },
  ctaPrimary: { label: "Work with Hekfa", href: "/contact" },
  ctaSecondary: { label: "Back to Case Studies", href: "/projects" }
};

const CaseStudyTemplatePage = () => {
  return <CaseStudyTemplate {...sampleData} />;
};

export default CaseStudyTemplatePage;
