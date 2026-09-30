"use client";

import { useEffect, useRef } from "react";

/**
 * A silent screen recording that downloads only as it approaches the viewport
 * and pauses while scrolled out of view. `preload="none"` means nothing is
 * fetched until `play()` is called.
 *
 * @param {Object} props
 * @param {string} props.src
 * @param {string} [props.label] - Describes the recording the way an `<img>`
 *   `alt` would; without it a screen reader announces only "video".
 */
export default function LazyVideo({ src, className, label }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Rejected when the browser blocks autoplay; nothing to recover from.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      // Start a little early so playback is running by the time it is on screen.
      { rootMargin: "200px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      preload="none"
      muted
      loop
      playsInline
      className={className}
    />
  );
}
