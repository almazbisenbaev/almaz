"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Eye, X } from "lucide-react";
import { createPortal } from "react-dom";

// The portal target only exists in the browser, so rendering it has to wait
// until after hydration. This reads false during SSR and hydration, then true.
const subscribeNoop = () => () => {};
const useIsMounted = () => useSyncExternalStore(subscribeNoop, () => true, () => false);

const SPRING = { type: "spring", stiffness: 420, damping: 32, mass: 0.2 };
const EASE_OUT = [0.22, 1, 0.36, 1];

function MasonryImageTile({ image, index, onOpen, onHoverChange }) {
  // Touch and pen pointers have no hovering cursor to follow, and firing on
  // them would leave the badge stranded after a tap.
  const trackMouse = (event) => {
    if (event.pointerType !== "mouse") return;
    onHoverChange({ isVisible: true, x: event.clientX, y: event.clientY });
  };

  const hideCursor = () => {
    onHoverChange((previous) => ({ ...previous, isVisible: false }));
  };

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      onPointerEnter={trackMouse}
      onPointerMove={trackMouse}
      onPointerLeave={hideCursor}
      onPointerCancel={hideCursor}
      className="mb-12 block w-full break-inside-avoid overflow-hidden rounded-sm border border-black/10 bg-white text-left cursor-none"
      aria-label={`Open ${image.alt}`}
    >
      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="block h-auto w-full" />
    </button>
  );
}

/**
 * Masonry screenshot grid with a lightbox. The hover badge replaces the
 * pointer (`cursor-none` on the tiles) and the lightbox is portalled to
 * `<body>` so it escapes the page's transformed ancestors.
 *
 * @param {Object} props
 * @param {Array<{src: string, alt: string}>} props.images
 */
export default function ImageMasonryGallery({ images }) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverCursor, setHoverCursor] = useState({ isVisible: false, x: 0, y: 0 });
  const isMounted = useIsMounted();
  const activeImage = activeIndex === null ? null : images[activeIndex];

  const openLightbox = (index) => {
    // The pointer is about to be over the lightbox, not a tile.
    setHoverCursor((previous) => ({ ...previous, isVisible: false }));
    setActiveIndex(index);
  };

  const closeLightbox = () => setActiveIndex(null);

  // While the lightbox is open the page behind it must not scroll. The
  // `data-scroll-locked` flag is what tells Lenis to stop; the event wakes it
  // up, since it cannot observe the attribute on its own.
  useEffect(() => {
    if (!activeImage) return undefined;

    const root = document.documentElement;
    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = root.style.overflow;
    const previousLockState = root.dataset.scrollLocked;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
    };

    root.dataset.scrollLocked = "true";
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("app-scroll-lock-change"));
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (previousLockState === undefined) {
        delete root.dataset.scrollLocked;
      } else {
        root.dataset.scrollLocked = previousLockState;
      }

      root.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.dispatchEvent(new CustomEvent("app-scroll-lock-change"));
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  return (
    <>
      <div className="columns-1 gap-12 md:columns-2">
        {images.map((image, index) => (
          <MasonryImageTile
            key={image.src}
            image={image}
            index={index}
            onOpen={openLightbox}
            onHoverChange={setHoverCursor}
          />
        ))}
      </div>

      {isMounted &&
        createPortal(
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
                      x: SPRING,
                      y: SPRING,
                      scale: { duration: 0.45, ease: EASE_OUT },
                      opacity: { duration: 0.32 },
                    }
              }
              className="pointer-events-none fixed left-0 top-0 z-50 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white"
              aria-hidden="true"
            >
              <Eye size={18} strokeWidth={1.5} />
            </motion.span>

            <AnimatePresence>
              {activeImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.24 }}
                  // Lets the overlay scroll natively instead of through Lenis.
                  data-lenis-prevent=""
                  className="fixed inset-0 z-100 overflow-y-auto overscroll-contain bg-black/75 backdrop-blur-md"
                  onClick={closeLightbox}
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
                        prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: EASE_OUT }
                      }
                      className="relative w-full max-w-[min(92vw,1500px)]"
                      // Clicking the image must not reach the backdrop's close.
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={closeLightbox}
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
              )}
            </AnimatePresence>
          </>,
          document.body
        )}
    </>
  );
}
