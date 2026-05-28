"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

export default function ImageMasonryGallery({ images }) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!activeImage) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
        {images.map((image, index) => (
          <button
            key={image.src ?? index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="mb-4 block w-full break-inside-avoid cursor-zoom-in overflow-hidden rounded-sm border border-black/10 bg-white text-left"
            aria-label={`Open ${image.alt}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.015]"
            />
          </button>
        ))}
      </div>

      {isMounted
        ? createPortal(
            <AnimatePresence>
              {activeImage ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.24 }}
                  className="fixed inset-0 z-100 bg-black/75 backdrop-blur-md"
                  onClick={() => setActiveIndex(null)}
                  role="dialog"
                  aria-modal="true"
                  aria-label={activeImage.alt}
                >
                  <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-10">
                    <motion.div
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
                      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
                      }
                      className="relative w-full max-w-[min(92vw,1500px)]"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveIndex(null)}
                        className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white transition-colors duration-200 hover:bg-black/75"
                        aria-label="Close lightbox"
                      >
                        <X size={20} />
                      </button>

                      <div className="overflow-hidden rounded-sm bg-white/5 shadow-2xl">
                        <img
                          src={activeImage.src}
                          alt={activeImage.alt}
                          className="block max-h-[88vh] w-full object-contain"
                        />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  );
}