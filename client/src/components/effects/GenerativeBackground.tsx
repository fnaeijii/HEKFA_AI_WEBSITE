import { motion } from "framer-motion";
import FloatingParticles from "./FloatingParticles";

const GenerativeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-slate-900/60" />
      <motion.div
        className="absolute -left-40 -top-20 h-[520px] w-[520px] rounded-full bg-gradient-to-r from-fuchsia-500/30 via-cyan-400/25 to-blue-500/30 blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] h-[520px] w-[520px] rounded-full bg-gradient-to-r from-indigo-500/25 via-purple-500/30 to-pink-500/25 blur-3xl"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(0,255,255,0.06),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(255,0,255,0.05),transparent_35%)]" />
      </motion.div>
      <div className="absolute inset-0 opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 300 Q360 260 720 320 T1440 280 L1440 900 L0 900 Z"
            fill="url(#waveGradient)"
            animate={{ d: [
              "M0 320 Q360 260 720 320 T1440 280 L1440 900 L0 900 Z",
              "M0 300 Q360 330 720 290 T1440 340 L1440 900 L0 900 Z",
              "M0 320 Q360 260 720 320 T1440 280 L1440 900 L0 900 Z"
            ] }}
            transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          />
        </svg>
      </div>
      <FloatingParticles count={50} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/50 to-background/80" />
    </div>
  );
};

export default GenerativeBackground;
