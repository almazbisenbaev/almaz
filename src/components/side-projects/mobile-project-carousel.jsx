'use client';

import { useId, useSyncExternalStore } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import s from './side-projects.module.css';

const mobileQuery = '(max-width: 767px)';

function subscribeMobile(callback) {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

export default function MobileProjectCarousel({ children }) {
  const instructionsId = useId();
  const isMobile = useSyncExternalStore(subscribeMobile, () => window.matchMedia(mobileQuery).matches, () => false);
  const [viewportRef, carousel] = useEmblaCarousel({
    active: isMobile,
    align: 'start',
    containScroll: 'trimSnaps',
    breakpoints: { '(prefers-reduced-motion: reduce)': { duration: 0 } },
  });

  function handleKeyDown(event) {
    if (!isMobile || !carousel || event.target !== event.currentTarget) return;

    const jump = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    switch (event.key) {
      case 'ArrowRight': carousel.scrollNext(jump); break;
      case 'ArrowLeft': carousel.scrollPrev(jump); break;
      case 'Home': carousel.scrollTo(0, jump); break;
      case 'End': carousel.scrollTo(carousel.scrollSnapList().length - 1, jump); break;
      default: return;
    }
    event.preventDefault();
  }

  return <>
    <p id={instructionsId} className={s.srOnly} hidden={!isMobile}>
      Swipe or drag to explore the projects. Use the left and right arrow keys, Home and End with a keyboard. Tab moves to project links.
    </p>
    <div
      ref={viewportRef}
      className={s.viewport}
      role={isMobile ? 'region' : undefined}
      aria-roledescription={isMobile ? 'carousel' : undefined}
      aria-labelledby={isMobile ? 'side-projects-title' : undefined}
      aria-describedby={isMobile ? instructionsId : undefined}
      tabIndex={isMobile ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      <div className={s.bento}>{children}</div>
    </div>
  </>;
}
