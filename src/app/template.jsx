"use client";

import { m, LazyMotion, domAnimation } from "framer-motion";

export default function Template({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "tween",
          ease: [0.76, 0, 0.24, 1],
          duration: 0.8
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}