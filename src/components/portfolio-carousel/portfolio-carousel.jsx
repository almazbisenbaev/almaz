"use client";

import { Children, useId } from "react";
import useEmblaCarousel from "embla-carousel-react";

import styles from "./portfolio-carousel.module.css";

/**
 * Free-dragging horizontal rail of project cards.
 *
 * Every announced string is a prop because the only page using this is the
 * Russian landing page; the defaults keep it usable from an English page too.
 *
 * @param {Object} props
 * @param {string} props.labelledBy - id of the heading that names the rail.
 * @param {Object} [props.labels] - Localized announcements: `instructions`,
 *   the `carousel` and `slide` role descriptions, and `slideLabel`, whose
 *   `{index}` and `{count}` placeholders are filled per slide. These cross the
 *   server/client boundary, so they are plain strings rather than functions.
 */
const DEFAULT_LABELS = {
  instructions:
    "Drag the projects left or right. With a keyboard, use the left and right arrow keys, Home and End. Tab moves to the project links.",
  carousel: "carousel",
  slide: "slide",
  slideLabel: "Project {index} of {count}",
};

const fillSlideLabel = (template, index, count) =>
  template.replace("{index}", index).replace("{count}", count);

export default function PortfolioCarousel({ children, labelledBy, labels }) {
  const instructionsId = useId();
  const count = Children.count(children);
  const copy = { ...DEFAULT_LABELS, ...labels };
  const [viewportRef, carousel] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  function handleKeyDown(event) {
    // Links keep their normal keyboard behavior. Embla also brings their
    // slide into view automatically when navigating through them with Tab.
    if (!carousel || event.target !== event.currentTarget) return;

    const jump = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    switch (event.key) {
      case "ArrowRight": carousel.scrollNext(jump); break;
      case "ArrowLeft": carousel.scrollPrev(jump); break;
      case "Home": carousel.scrollTo(0, jump); break;
      case "End": carousel.scrollTo(carousel.scrollSnapList().length - 1, jump); break;
      default: return;
    }
    event.preventDefault();
  }

  return (
    <>
      <p id={instructionsId} className="sr-only">
        {copy.instructions}
      </p>
      <div
        ref={viewportRef}
        className={styles.viewport}
        role="region"
        aria-roledescription={copy.carousel}
        aria-labelledby={labelledBy}
        aria-describedby={instructionsId}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.track}>
          {Children.map(children, (child, index) => (
            <div
              className={styles.slide}
              role="group"
              aria-roledescription={copy.slide}
              aria-label={fillSlideLabel(copy.slideLabel, index + 1, count)}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
