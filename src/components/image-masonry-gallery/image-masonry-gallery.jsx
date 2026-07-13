"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Eye, X } from "lucide-react";
import { createPortal } from "react-dom";

// Hydration guard: false during SSR/hydration, true once mounted on the client
const subscribeNoop = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(subscribeNoop, () => true, () => false);

function MasonryImageTile({ image, index, onOpen, onHoverChange }) {
  const handlePointerEnter = (event) => {
    if (event.pointerType !== "mouse") {
      return;
    }

    onHoverChange({ isVisible: true, x: event.clientX, y: event.clientY });
  };

  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse") {
      return;
    }

    onHoverChange({ isVisible: true, x: event.clientX, y: event.clientY });
  };

  const handlePointerLeave = () => {
    onHoverChange((previousState) => ({ ...previousState, isVisible: false }));
  };

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      className="mb-12 block w-full break-inside-avoid overflow-hidden rounded-sm border border-black/10 bg-white text-left cursor-none"
      aria-label={`Open ${image.alt}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
    </button>
  );
}

export default function ImageMasonryGallery({ images }) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(null);
  const isMounted = useIsMounted();
  const [hoverCursor, setHoverCursor] = useState({ isVisible: false, x: 0, y: 0 });
  const activeImage = activeIndex === null ? null : images[activeIndex];

  const handleOpen = (index) => {
    setHoverCursor((previousState) => ({ ...previousState, isVisible: false }));
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!activeImage) {
      return undefined;
    }

    const rootElement = document.documentElement;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = rootElement.style.overflow;
    const previousScrollLockState = rootElement.dataset.scrollLocked;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    rootElement.dataset.scrollLocked = "true";
    rootElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("app-scroll-lock-change"));
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (previousScrollLockState === undefined) {
        delete rootElement.dataset.scrollLocked;
      } else {
        rootElement.dataset.scrollLocked = previousScrollLockState;
      }

      rootElement.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousOverflow;
      window.dispatchEvent(new CustomEvent("app-scroll-lock-change"));
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  return (
    <>
      <div className="columns-1 gap-12 md:columns-2">
        {images.map((image, index) => (
          <MasonryImageTile
            key={image.src ?? index}
            image={image}
            index={index}
            onOpen={handleOpen}
            onHoverChange={setHoverCursor}
          />
        ))}
      </div>

      {isMounted
        ? createPortal(
            <>
              <motion.span
                initial={false}
                animate={{
                  x: hoverCursor.x,
                  y: hoverCursor.y,
                  scale: hoverCursor.isVisible ? 1 : 0,
                  opacity: hoverCursor.isVisible ? 1 : 0,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        x: { type: "spring", stiffness: 420, damping: 32, mass: 0.2 },
                        y: { type: "spring", stiffness: 420, damping: 32, mass: 0.2 },
                        scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.32 },
                      }
                }
                className="pointer-events-none fixed left-0 top-0 z-50 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white"
                aria-hidden="true"
              >
                <Eye size={18} strokeWidth={1.5} />
              </motion.span>

              <AnimatePresence>
                {activeImage ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.24 }}
                    data-lenis-prevent=""
                    className="fixed inset-0 z-100 overflow-y-auto overscroll-contain bg-black/75 backdrop-blur-md"
                    onClick={() => setActiveIndex(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={activeImage.alt}
                  >
                    <div className="flex min-h-screen items-start justify-center p-4 sm:p-6 md:p-10">
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
                            className="block h-auto w-full max-w-full"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </>,
            document.body
          )
        : null}
    </>
  );
}