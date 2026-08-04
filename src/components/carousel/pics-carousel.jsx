'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

import "./pics-carousel.css";

const LazyImage = ({ src, width, height, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    // The wrapper reserves the media's exact box up front via `aspect-ratio`
    // (paired with the fixed height in CSS), so the skeleton and the loaded
    // image occupy an identical rectangle — no layout shift when it loads.
    <div
      className="pics-media relative bg-[#EFEAE5] border border-black/10 rounded-lg overflow-hidden"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-[#EFEAE5] animate-pulse" />
      )}
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

// `poster` is optional but strongly recommended: it shows a still frame
// instantly while the (deferred) video streams in. Videos passed without a
// `poster` fall back to the grey pulse placeholder below.
const LazyVideo = ({ src, width, height, className, poster }) => {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // With preload="none" the download doesn't start until play() is
            // called, so nothing is fetched until the slide nears the viewport.
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      // Start a little before the slide is on-screen so playback is ready.
      { threshold: 0.25, rootMargin: "200px" }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  // Once a poster is present we don't need the pulse placeholder — the poster
  // itself is the instant visual. Keep the pulse only as the no-poster fallback.
  const showPulse = isLoading && !poster;

  return (
    // Same as LazyImage: `aspect-ratio` reserves the final box before the
    // video's metadata (and intrinsic size) has streamed in, so neither the
    // poster nor the pulse placeholder causes a reflow when playback starts.
    <div
      className="pics-media relative bg-[#EFEAE5] border border-black/10 rounded-lg overflow-hidden"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {showPulse && (
        <div className="absolute inset-0 bg-[#EFEAE5] animate-pulse" />
      )}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="none"
        muted
        loop
        playsInline
        className={`object-cover transition-opacity duration-300 ${isLoading && !poster ? 'opacity-0' : 'opacity-100'} ${className}`}
        onCanPlay={() => setIsLoading(false)}
      />
    </div>
  );
};

export default function PicsCarousel({ images }) {
  if (images.length === 1) {
    const item = images[0];
    return (
      <div className="pics-carousel pics-carousel--single">
        {item.type === 'video' ? (
          <LazyVideo
            src={item.src}
            width={item.width}
            height={item.height}
            poster={item.poster}
          />
        ) : (
          <LazyImage
            src={item.src}
            width={item.width}
            height={item.height}
          />
        )}
      </div>
    );
  }

  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
    slidesToScroll: 'auto',
    align: 'start',
  });

  return (
    <div className="embla pics-carousel" ref={emblaRef}>
      <div className="embla__container flex gap-4 sm:gap-8">
        {images.map((item, index) => (
          <div key={index} className="embla__slide pics-carousel-slide flex-shrink-0">
            {item.type === 'video' ? (
              <LazyVideo
                src={item.src}
                width={item.width}
                height={item.height}
                poster={item.poster}
              />
            ) : (
              <LazyImage
                src={item.src}
                width={item.width}
                height={item.height}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
