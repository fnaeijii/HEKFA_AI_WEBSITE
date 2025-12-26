import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sparkles,
  Palette,
  Star,
  Zap,
  Image as ImageIcon,
  Play,
  Cloud,
  Pencil,
  Rocket,
  Compass,
  MapPin,
  Globe, // Replaced custom Planet SVG
  Music, // Replaced custom MusicNote SVG
} from "lucide-react";
import api from "@/lib/axiosConfig";
import { useTranslation } from "react-i18next";
import { selectLocalized } from "@/lib/utils";

interface CreativityMedia {
  type: "image" | "video";
  url: string;
}

interface CreativityEntry {
  _id?: string;
  childName?: string;
  childNameFa?: string;
  idea?: string;
  ideaFa?: string;
  photo?: string;
  position?: { x?: number; y?: number };
  rotation?: number;
  color?: string;
  media?: CreativityMedia;
  order?: number;
  side?: "left" | "right";
}

interface DisplayEntry {
  id: string | number;
  childName: string;
  idea: string;
  side: "left" | "right";
  rotation: number;
  color: string;
  media?: CreativityMedia;
}

type IconProps = React.ComponentType<{ className?: string }>;

const colorPalette = [
  "bg-[#ECF4D6]",
  "bg-[#9AD0C2]",
  "bg-[#2D9596]/90 text-white",
  "bg-[#265073]/90 text-white",
];

const FloatingIcon = ({
  Icon,
  delay,
  x,
  y,
  scale = 1,
}: {
  Icon: IconProps;
  delay: number;
  x: string;
  y: string;
  scale?: number;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{
      y: [0, -25, 0],
      opacity: [0.3, 0.7, 0.3],
      rotate: [0, 10, -10, 0],
      scale: [scale, scale * 1.1, scale],
    }}
    transition={{
      duration: 6 + delay,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute pointer-events-none z-0"
    style={{ left: x, top: y }}
  >
    <Icon className="w-8 h-8 md:w-12 md:h-12 text-[#ECF4D6]/40" />
  </motion.div>
);

const CreativityPage = () => {
  const { t, i18n } = useTranslation();
  const [entries, setEntries] = useState<CreativityEntry[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<DisplayEntry | null>(
    null
  );

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const { data } = await api.get("/creativity");
        setEntries(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load creativity entries", error);
      }
    };

    fetchEntries();
  }, []);

  const displayEntries = useMemo<DisplayEntry[]>(() => {
    // If no entries, return empty array immediately (Removes Fallback)
    if (!entries || entries.length === 0) {
      return [];
    }

    // Process real entries
    const source = entries.map((entry, index) => ({
        id: entry._id ?? index,
        childName:
          selectLocalized(entry, "childName", i18n.language) ??
          entry.childName ??
          `Creator ${index + 1}`,
        idea:
          selectLocalized(entry, "idea", i18n.language) ??
          entry.idea ??
          "",
        side:
          entry.side ??
          (entry.position?.x !== undefined
            ? entry.position.x < 50
              ? "left"
              : "right"
            : index % 2 === 0
            ? "left"
            : "right"),
        rotation:
          typeof entry.rotation === "number"
            ? entry.rotation
            : index % 2 === 0
            ? -3
            : 3,
        color:
          entry.color && entry.color.length > 0
            ? entry.color
            : colorPalette[index % colorPalette.length],
        media:
          entry.media ??
          (entry.photo
            ? { type: "image" as const, url: entry.photo }
            : undefined),
      }))

      return source.map((item, index) => ({
        ...item,
        side: item.side ?? (index % 2 === 0 ? "left" : "right"),
        rotation: typeof item.rotation === "number" ? item.rotation : (index % 2 === 0 ? -3 : 3),
        color: item.color ?? colorPalette[index % colorPalette.length],
      }));
    }, [entries, i18n.language]); // Added i18n.language dependency for updates

  const pathData = useMemo(() => {
    if (!displayEntries.length) return "";
    const cardHeightStep = 50;
    let path = "";

    displayEntries.forEach((item, index) => {
      const currentY = 50 + index * cardHeightStep;
      const currentX = item.side === "left" ? 25 : 75;

      if (index === 0) {
        path = `M ${currentX} ${currentY - 10} L ${currentX} ${currentY}`;
      } else {
        const prevY = 50 + (index - 1) * cardHeightStep;
        const prevX = displayEntries[index - 1].side === "left" ? 25 : 75;
        const midY = (prevY + currentY) / 2;
        path += ` C ${prevX} ${midY + 10}, ${currentX} ${midY - 10}, ${currentX} ${currentY}`;
      }
    });

    const lastY = 50 + (displayEntries.length - 1) * cardHeightStep;
    const lastX =
      displayEntries[displayEntries.length - 1].side === "left" ? 25 : 75;
    path += ` L ${lastX} ${lastY + 40}`;

    return path;
  }, [displayEntries]);

  return (
    <div>
    <div className="min-h-screen relative overflow-hidden bg-[#265073] pt-20 font-sans text-[#ECF4D6]">
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#1a3b57] via-[#2D9596] to-[#1a3b57] -z-10" />

      <FloatingIcon Icon={Star} delay={0} x="5%" y="10%" />
      <FloatingIcon Icon={Sparkles} delay={1} x="90%" y="15%" />
      <FloatingIcon Icon={Rocket} delay={2} x="10%" y="40%" scale={1.5} />
      <FloatingIcon Icon={Cloud} delay={3} x="85%" y="60%" scale={1.8} />
      <FloatingIcon Icon={Compass} delay={4} x="8%" y="75%" scale={1.2} />
      <FloatingIcon Icon={Palette} delay={2.5} x="80%" y="30%" />
      <FloatingIcon Icon={Pencil} delay={1.5} x="15%" y="90%" />
      <FloatingIcon Icon={Globe} delay={2.8} x="60%" y="20%" />
      <FloatingIcon Icon={Music} delay={1.2} x="35%" y="85%" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-16 text-center relative z-10"
      >
        <div className="inline-block p-2 px-4 rounded-full bg-[#ECF4D6]/10 border border-[#ECF4D6]/30 mb-4 backdrop-blur-md text-sm md:text-base">
          {t("creativity.hero.badge")}
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-xl">
          {t("creativity.hero.title")}
        </h1>
        <p className="text-xl text-[#9AD0C2] max-w-2xl mx-auto">
          {t("creativity.hero.subtitle")}
        </p>
      </motion.div>

      <div className="relative w-full max-w-5xl mx-auto pb-32">
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <svg
            className="w-full h-full"
            viewBox={`0 0 100 ${50 + displayEntries.length * 50 + 50}`}
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="glowPath">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ECF4D6" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#F4D03F" stopOpacity="1" />
                <stop offset="100%" stopColor="#ECF4D6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d={pathData}
              stroke="rgba(0,0,0,0.3)"
              strokeWidth="1.5"
              fill="none"
            />
            <motion.path
              d={pathData}
              stroke="url(#pathGrad)"
              strokeWidth="0.8"
              strokeDasharray="3 3"
              strokeLinecap="round"
              fill="none"
              filter="url(#glowPath)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />
            <motion.g>
              <circle r="1.5" fill="#FF6B6B" filter="url(#glowPath)" />
              <animateMotion
                dur="15s"
                repeatCount="indefinite"
                path={pathData}
                rotate="auto"
              />
            </motion.g>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col gap-12 md:gap-24 pt-12 px-4">
          {displayEntries.map((item) => (
            <div
              key={item.id}
              className={`flex w-full ${
                item.side === "left"
                  ? "justify-start md:pl-16 lg:pl-32"
                  : "justify-end md:pr-16 lg:pr-32"
              }`}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  x: item.side === "left" ? -50 : 50,
                }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, type: "spring" }}
                className="relative group"
              >
                <div
                  className={`absolute top-0 -translate-y-1/2 hidden md:flex flex-col items-center z-20 ${
                    item.side === "left"
                      ? "left-1/2 md:right-[-40px] md:left-auto"
                      : "left-1/2 md:left-[-40px]"
                  }`}
                >
                  <MapPin className="w-8 h-8 text-[#F4D03F] drop-shadow-lg fill-[#265073]" />
                </div>

                <Card
                  onClick={() => item.media && setSelectedMedia(item)}
                  className={`w-full max-w-[340px] md:max-w-[400px] p-6 rounded-3xl cursor-pointer border-4 border-dashed border-[#265073]/20 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.4)] hover:scale-105 hover:rotate-0 hover:shadow-2xl hover:border-[#265073]/50 transition-all duration-300 ${item.color}`}
                  style={{ transform: `rotate(${item.rotation}deg)` }}
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/30 backdrop-blur-sm rotate-[-2deg] shadow-sm" />

                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 shrink-0 rounded-full bg-white/90 flex items-center justify-center text-xl font-bold text-[#265073] shadow-inner border border-[#265073]/20">
                      {item.childName.charAt(0)}
                    </div>
                    <div>
                      <h3
                        className={`font-bold text-lg leading-tight ${
                          item.color.includes("text-white")
                            ? "text-white"
                            : "text-[#265073]"
                        }`}
                      >
                        {item.childName}
                      </h3>
                      <div className="flex mt-1 opacity-70 text-[#265073]">
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                      </div>
                    </div>
                  </div>

                  <p
                    className={`text-lg font-medium leading-relaxed mb-4 min-h-[60px] ${
                      item.color.includes("text-white")
                        ? "text-white/90"
                        : "text-[#265073]/90"
                    }`}
                  >
                    "{item.idea}"
                  </p>

                  {item.media && (
                    <div className="flex justify-end">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-black/10 rounded-full text-xs font-bold backdrop-blur-sm hover:bg-black/20 transition-colors">
                        {item.media.type === "image" ? (
                          <ImageIcon className="w-3 h-3" />
                        ) : (
                          <Play className="w-3 h-3" />
                        )}
                        {t("creativity.viewCreation")}
                      </span>
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-24">
          <div className="relative">
            <div className="absolute inset-0 bg-[#F4D03F] blur-xl opacity-20 animate-pulse" />
            <div className="bg-[#265073] border-2 border-[#F4D03F] text-[#F4D03F] px-8 py-3 rounded-full font-bold text-lg relative z-10 shadow-xl">
              {t("creativity.cta.text")}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedMedia && (
          <Dialog
            open={!!selectedMedia}
            onOpenChange={() => setSelectedMedia(null)}
          >
            <DialogContent className="bg-[#ECF4D6] border-4 border-[#265073] max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl text-[#265073]">
                  {selectedMedia.childName}
                </DialogTitle>
              </DialogHeader>
              <div className="rounded-xl overflow-hidden border-2 border-[#265073]/20 shadow-inner bg-black/5 aspect-video mt-2">
                {selectedMedia.media?.type === "image" ? (
                  <img
                    src={selectedMedia.media.url}
                    alt={selectedMedia.childName}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={selectedMedia.media?.url}
                    className="w-full h-full"
                    allowFullScreen
                    title={selectedMedia.childName}
                  />
                )}
              </div>
              <p className="mt-4 text-lg text-[#265073] font-medium px-2">
                {selectedMedia.idea}
              </p>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
    {/* Bottom fade into site footer */}
    <div 
    className="relative h-80 pointer-events-none"
    style={{
      background: `linear-gradient(180deg, 
        hsl(207, 51%, 30%) 10%,           /* سرمه‌ای پررنگ در بالا */
        hsl(207, 49%, 31%) 30%,          /* کمی کمرنگ‌تر */
        hsla(207, 47%, 32%, 0.8) 45%,    /* شروع کاهش opacity */
        hsla(207, 45%, 33%, 0.5) 60%,     /* opacity متوسط */
        hsla(207, 44%, 34%, 0.25) 75%,    /* تقریباً شفاف */
        hsla(207, 40%, 35%, 0.1) 90%,     /* خیلی شفاف */
        transparent 100%                  /* کاملاً محو */
      )`
    }}
    >
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

export default CreativityPage;