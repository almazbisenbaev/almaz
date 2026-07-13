"use client";

import { useEffect, useRef } from "react";

// Defers downloading the video until it approaches the viewport,
// and pauses playback while it is scrolled out of view.
export default function LazyVideo({ src, className }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      preload="none"
      muted
      loop
      playsInline
      className={className}
    />
  );
}
