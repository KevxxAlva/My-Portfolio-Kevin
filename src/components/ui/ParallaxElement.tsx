import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxElementProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
  direction?: "up" | "down";
}

export const ParallaxElement = ({ 
  children, 
  offset = 50, 
  className = "",
  direction = "up"
}: ParallaxElementProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yRange = direction === "up" ? [offset, -offset] : [-offset, offset];
  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};
