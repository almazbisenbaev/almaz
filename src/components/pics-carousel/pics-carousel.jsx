'use client';

import { useState, useRef, useEffect, useId } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

// Mirrors the `.pics-carousel-slide .pics-media` heights in globals.css — keep
// the two in sync. On phones the widest image fits with a peek of its
// neighbour; portrait shots stay narrower.
const SLIDE_HEIGHTS = [
  { minWidth: 992, height: 440 },
  { minWidth: 768, height: 360 },
  { minWidth: 640, height: 240 },
  { minWidth: 0, height: 240 },
];

/**
 * A `sizes` attribute derived from the slide heights above: at each breakpoint
 * the rendered width is the fixed height times the media's aspect ratio, so
 * next/image can pick the right source instead of assuming full viewport width.
 */
const slideSizes = (width, height, maxAspect) => {
  const ratio = width / height;
  return SLIDE_HEIGHTS.map(({ minWidth, height: slideHeight }) => {
    const rendered = `${Math.ceil(slideHeight * ratio)}px`;
    return minWidth
      ? `(min-width: ${minWidth}px) ${rendered}`
      : `min(${rendered}, calc((100vw - 5rem) * ${ratio / maxAspect}))`;
  }).join(', ');
};

/**
 * Reserves the media's exact box up front: the inline `aspect-ratio` pairs with
 * the fixed height in CSS, so the placeholder and the loaded media occupy an
 * identical rectangle and nothing shifts when it arrives.
 */
const MediaFrame = ({ width, height, showPlaceholder, children }) => (
  <div
    className="pics-media relative bg-[#EFEAE5] border border-black/10 rounded-lg overflow-hidden"
    style={{ aspectRatio: `${width} / ${height}` }}
  >
    {showPlaceholder && <div className="absolute inset-0 bg-[#EFEAE5] animate-pulse" />}
    {children}
  </div>
);

const LazyImage = ({ src, alt = '', width, height, sizes }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <MediaFrame width={width} height={height} showPlaceholder={isLoading}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
        draggable={false}
        onLoad={() => setIsLoading(false)}
      />
    </MediaFrame>
  );
};

/**
 * `poster` is optional but strongly recommended: it shows a still frame
 * instantly while the deferred video streams in, and makes the pulse
 * placeholder unnecessary. Clips without one fall back to the pulse.
 */
const LazyVideo = ({ src, alt, width, height, poster }) => {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // With preload="none" the download doesn't start until play() is
          // called, so nothing is fetched until the slide nears the viewport.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      // Start a little before the slide is on-screen so playback is ready.
      { threshold: 0.25, rootMargin: '200px' }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  const isHidden = isLoading && !poster;

  return (
    <MediaFrame width={width} height={height} showPlaceholder={isHidden}>
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
        className={`object-cover transition-opacity duration-300 ${isHidden ? 'opacity-0' : 'opacity-100'}`}
        onCanPlay={() => setIsLoading(false)}
      />
    </MediaFrame>
  );
};

const renderMedia = (item, sizes) =>
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

/**
 * Drag-and-keyboard gallery of a project's screenshots and screen recordings.
 *
 * @param {Object} props
 * @param {Array} props.images - `media` entries from `@/data/works`.
 * @param {string} [props.label="Project"] - Names the region for screen readers.
 */
export default function PicsCarousel({ images, label = 'Project' }) {
  const maxAspect = Math.max(1, ...images.map(({ width, height }) => width / height));
  const viewportId = useId();
  const instructionsId = `${viewportId}-instructions`;
  const progressRef = useRef(null);
  const reducedMotionRef = useRef(false);
  const [navigation, setNavigation] = useState({ selected: 0, total: 0 });
  // Hooks must run in the same order on every render, so the carousel hook is
  // called unconditionally and its ref is simply left unattached in the
  // single-item layout below (which is a plain block, not a scroller).
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: false,
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    align: 'start',
    duration: 36,
    breakpoints: {
      '(prefers-reduced-motion: reduce)': { duration: 0 },
    },
  });

  useEffect(() => {
    if (!emblaApi) return undefined;

    const viewport = emblaApi.rootNode();
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let slides = [];
    let viewportWidth = 0;
    let scrollDistance = 0;
    let thumbWidth = 100;

    const updateNavigation = () => {
      viewport.dataset.scrollable = String(emblaApi.canScrollPrev() || emblaApi.canScrollNext());
      setNavigation({
        selected: emblaApi.selectedScrollSnap(),
        total: emblaApi.scrollSnapList().length,
      });
    };

    // Embla already calls `scroll` in its animation loop. Cache geometry on
    // init/resize, then write only transforms here, without React renders.
    const updateMotion = () => {
      const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
      if (progressRef.current) {
        progressRef.current.style.transform = `translateX(${progress * (100 - thumbWidth) / thumbWidth * 100}%)`;
      }

      slides.forEach(({ media, center, amplitude }) => {
        const distance = (center - progress * scrollDistance - viewportWidth / 2) / viewportWidth;
        const offset = reducedMotionRef.current ? 0 : Math.max(-1, Math.min(1, distance)) * -amplitude;
        media.style.setProperty('--pics-parallax', `${offset.toFixed(2)}px`);
      });
    };

    const measure = () => {
      viewportWidth = viewport.clientWidth || 1;
      slides = emblaApi.slideNodes().map((slide) => ({
        media: slide.querySelector('.pics-media'),
        center: slide.offsetLeft + slide.offsetWidth / 2,
        // The 1.025 media scale leaves enough overscan even on narrow images.
        amplitude: Math.min(12, slide.offsetWidth * 0.01),
      }));
      const contentWidth = emblaApi.containerNode().scrollWidth;
      scrollDistance = Math.max(0, contentWidth - viewportWidth);
      thumbWidth = Math.min(100, viewportWidth / Math.max(1, contentWidth) * 100);
      if (progressRef.current) progressRef.current.style.width = `${thumbWidth}%`;
      viewport.dataset.dragging = 'false';
      updateNavigation();
      updateMotion();
    };

    const syncMotionPreference = () => {
      reducedMotionRef.current = motionQuery.matches;
      if (motionQuery.matches) emblaApi.scrollTo(emblaApi.selectedScrollSnap(), true);
      updateMotion();
    };
    const onPointerDown = () => { viewport.dataset.dragging = 'true'; };
    const onPointerUp = () => {
      viewport.dataset.dragging = 'false';
      // Embla's duration option does not affect drag release physics.
      if (reducedMotionRef.current) emblaApi.scrollTo(emblaApi.selectedScrollSnap(), true);
    };

    reducedMotionRef.current = motionQuery.matches;
    measure();
    emblaApi.on('reInit', measure).on('select', updateNavigation)
      .on('scroll', updateMotion).on('settle', updateMotion)
      .on('pointerDown', onPointerDown).on('pointerUp', onPointerUp);
    motionQuery.addEventListener('change', syncMotionPreference);

    return () => {
      emblaApi.off('reInit', measure).off('select', updateNavigation)
        .off('scroll', updateMotion).off('settle', updateMotion)
        .off('pointerDown', onPointerDown).off('pointerUp', onPointerUp);
      motionQuery.removeEventListener('change', syncMotionPreference);
    };
  }, [emblaApi]);

  // Only when the viewport itself has focus: a focused link inside a slide
  // keeps its own arrow-key behaviour.
  function handleKeyDown(event) {
    if (!emblaApi || event.target !== event.currentTarget) return;
    const jump = reducedMotionRef.current;
    switch (event.key) {
      case 'ArrowLeft': emblaApi.scrollPrev(jump); break;
      case 'ArrowRight': emblaApi.scrollNext(jump); break;
      case 'Home': emblaApi.scrollTo(0, jump); break;
      case 'End': emblaApi.scrollTo(emblaApi.scrollSnapList().length - 1, jump); break;
      default: return;
    }
    event.preventDefault();
  }

  if (images.length === 1) {
    return (
      <div className="pics-carousel pics-carousel--single">
        {/* Single item is width-constrained by the page container, not height. */}
        {renderMedia(images[0], '100vw')}
      </div>
    );
  }

  return (
    <div
      className="pics-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${label} gallery`}
      style={{ '--pics-max-aspect': maxAspect }}
    >
      <p id={instructionsId} className="sr-only">
        When the gallery is focused, use the left and right arrow keys, Home, or End.
      </p>
      <div
        id={viewportId}
        className="pics-carousel-viewport"
        ref={emblaRef}
        tabIndex={navigation.total > 1 ? 0 : -1}
        aria-label={`${label} images`}
        aria-describedby={instructionsId}
        onKeyDown={handleKeyDown}
      >
        <div className="embla__container pics-carousel-track flex gap-4 sm:gap-8">
          {images.map((item, index) => (
            <div
              key={item.src}
              className="embla__slide pics-carousel-slide flex-shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${images.length}`}
            >
              {renderMedia(item, slideSizes(item.width, item.height, maxAspect))}
            </div>
          ))}
        </div>
      </div>
      <div className="pics-carousel-controls" hidden={navigation.total < 2}>
        <div className="pics-carousel-progress" aria-hidden="true"><span ref={progressRef} /></div>
        <span className="pics-carousel-count" aria-hidden="true">
          {String(navigation.selected + 1).padStart(2, '0')}
          <span> / {String(navigation.total).padStart(2, '0')}</span>
        </span>
        <span className="sr-only" role="status" aria-atomic="true">
          Gallery position {navigation.selected + 1} of {navigation.total}
        </span>
      </div>
    </div>
  );
}
