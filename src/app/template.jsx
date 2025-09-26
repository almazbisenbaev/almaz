"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{
          type: "tween",
          ease: [0.76, 0, 0.24, 1], // easeOutExpo - starts fast, ends very smoothly
          duration: 1
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}