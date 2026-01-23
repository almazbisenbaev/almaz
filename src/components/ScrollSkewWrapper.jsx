'use client';

import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

export default function ScrollSkewWrapper({ children }) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Map scroll velocity to skew angle
  // Adjust range [-1000, 1000] (pixels/sec) to [-2, 2] degrees skew
  // You can increase the skew range for a more dramatic effect
  const skew = useTransform(smoothVelocity, [-2000, 2000], [-2, 2]);

  return (
    <motion.div 
      style={{ skewY: skew, transformOrigin: "center center", willChange: "transform" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
