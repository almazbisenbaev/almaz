"use client";

import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ y: 50, skewY: 6 }}
      whileInView={{ y: 0, skewY: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ transformOrigin: "top left" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
