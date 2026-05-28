"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

export default function ImageCarousel({
  images,
  slideWidth = "70vw",
  bleedToViewport = true,
}) {
  const prefersReducedMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [activeHeight, setActiveHeight] = useState(0);
  const bleedStyles = bleedToViewport
    ? {
        marginInline: "calc((100% - 100vw) / 2)",
        paddingInline: "calc((100vw - 100%) / 2)",
      }
    : undefined;

  useEffect(() => {
    if (!emblaApi) {
      return undefined;
    }

    let frameId = 0;
    const slideNodes = emblaApi.slideNodes();

    const updateActiveHeight = () => {
      const visibleSlides = emblaApi.slidesInView();
      const fallbackIndex = emblaApi.selectedScrollSnap();
      const activeIndexes = visibleSlides.length ? visibleSlides : [fallbackIndex];
      const nextHeight = activeIndexes.reduce((largestHeight, index) => {
        const slideNode = slideNodes[index];

        if (!slideNode) {
          return largestHeight;
        }

        return Math.max(largestHeight, slideNode.offsetHeight);
      }, 0);

      if (nextHeight > 0) {
        setActiveHeight(nextHeight);
      }
    };

    const scheduleHeightUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateActiveHeight);
    };

    const resizeObserver = new ResizeObserver(scheduleHeightUpdate);
    slideNodes.forEach((slideNode) => resizeObserver.observe(slideNode));

    emblaApi.on("reInit", scheduleHeightUpdate);
    emblaApi.on("resize", scheduleHeightUpdate);
    emblaApi.on("select", scheduleHeightUpdate);
    emblaApi.on("slidesInView", scheduleHeightUpdate);
    emblaApi.on("settle", scheduleHeightUpdate);

    scheduleHeightUpdate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      emblaApi.off("reInit", scheduleHeightUpdate);
      emblaApi.off("resize", scheduleHeightUpdate);
      emblaApi.off("select", scheduleHeightUpdate);
      emblaApi.off("slidesInView", scheduleHeightUpdate);
      emblaApi.off("settle", scheduleHeightUpdate);
    };
  }, [emblaApi, images.length]);

  return (
    <div className="space-y-5">
      <motion.div
        initial={false}
        animate={{ height: activeHeight ? `${activeHeight}px` : "auto" }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
        className="overflow-hidden"
        style={bleedStyles}
      >
        <div
          ref={emblaRef}
          className="overflow-visible cursor-grab active:cursor-grabbing"
          style={{ touchAction: "pan-y pinch-zoom" }}
        >
          <div className="flex gap-4">
            {images.map((image, index) => (
              <div
                key={image.src ?? index}
                className="min-w-0 shrink-0 grow-0"
                style={{ flexBasis: slideWidth, maxWidth: slideWidth }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  className="block h-auto w-full select-none rounded-sm border border-black/10 bg-white"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}