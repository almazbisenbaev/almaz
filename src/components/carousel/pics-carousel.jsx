'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

// Slide media is height-constrained by CSS (`.pics-media` in app/globals.css), so the
// rendered width is simply that height × the image's aspect ratio. Spelling
// that out in `sizes` stops next/image from defaulting to the full `width`
// prop (and its 2x variant), which was shipping ~1200px files into ~120px
// boxes. Purely a srcset-selection change — layout is unaffected.
const SLIDE_HEIGHTS = [
  { minWidth: 992, height: 440 },
  { minWidth: 768, height: 360 },
  { minWidth: 0, height: 240 },
];

const slideSizes = (width, height) => {
  const ratio = width / height;
  return SLIDE_HEIGHTS.map(({ minWidth, height: h }) => {
    const rendered = `${Math.ceil(h * ratio)}px`;
    return minWidth ? `(min-width: ${minWidth}px) ${rendered}` : rendered;
  }).join(', ');
};

const LazyImage = ({ src, alt = '', width, height, className, sizes }) => {
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
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
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
const LazyVideo = ({ src, alt, width, height, className, poster }) => {
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
        // These clips are silent, decoration-free screen recordings of the
        // project. Without a label a screen reader announces only "video", so
        // give it the same descriptive text an <img alt> would carry.
        aria-label={alt || undefined}
        role={alt ? 'img' : undefined}
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
  // Hooks must run in the same order on every render, so the carousel hook is
  // called unconditionally and its ref is simply left unattached in the
  // single-item layout below (which is a plain block, not a scroller).
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
    slidesToScroll: 'auto',
    align: 'start',
  });

  const renderItem = (item, sizes) =>
    item.type === 'video' ? (
      <LazyVideo
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        poster={item.poster}
      />
    ) : (
      <LazyImage
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes={sizes}
      />
    );

  if (images.length === 1) {
    return (
      <div className="pics-carousel pics-carousel--single">
        {/* Single item is width-constrained by the page container, not height. */}
        {renderItem(images[0], '100vw')}
      </div>
    );
  }

  return (
    <div className="embla pics-carousel" ref={emblaRef}>
      <div className="embla__container flex gap-4 sm:gap-8">
        {images.map((item, index) => (
          <div key={index} className="embla__slide pics-carousel-slide flex-shrink-0">
            {renderItem(item, slideSizes(item.width, item.height))}
          </div>
        ))}
      </div>
    </div>
  );
}
