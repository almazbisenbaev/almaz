"use client";

import { motion } from "framer-motion";

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "tween",
        ease: [0.76, 0, 0.24, 1],
        duration: 0.8
      }}
    >
      {children}
    </motion.div>
  );
}