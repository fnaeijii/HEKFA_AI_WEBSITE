import Lottie from "lottie-react";
import { motion } from "framer-motion";

interface LottieIconProps {
  animationData: object;
  size?: number;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export const LottieIcon = ({ 
  animationData, 
  size = 80, 
  className = "",
  loop = true,
  autoplay = true
}: LottieIconProps) => {
  return (
    <motion.div 
      className={className}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <Lottie 
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
      />
    </motion.div>
  );
};
