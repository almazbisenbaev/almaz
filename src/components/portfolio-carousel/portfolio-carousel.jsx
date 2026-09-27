"use client";

import { Children, useId } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./portfolio-carousel.module.css";

export default function PortfolioCarousel({ children }) {
  const instructionsId = useId();
  const count = Children.count(children);
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
      case "ArrowRight":
        event.preventDefault();
        carousel.scrollNext(jump);
        break;
      case "ArrowLeft":
        event.preventDefault();
        carousel.scrollPrev(jump);
        break;
      case "Home":
        event.preventDefault();
        carousel.scrollTo(0, jump);
        break;
      case "End":
        event.preventDefault();
        carousel.scrollTo(carousel.scrollSnapList().length - 1, jump);
        break;
    }
  }

  return (
    <>
      <p id={instructionsId} className="sr-only">
        Перетаскивайте проекты влево или вправо. С клавиатуры используйте
        стрелки влево и вправо, Home и End. Tab переходит к ссылкам проектов.
      </p>
      <div
        ref={viewportRef}
        className={styles.viewport}
        role="region"
        aria-roledescription="карусель"
        aria-labelledby="projects-title"
        aria-describedby={instructionsId}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.track}>
          {Children.map(children, (child, index) => (
            <div
              className={styles.slide}
              role="group"
              aria-roledescription="слайд"
              aria-label={`Проект ${index + 1} из ${count}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
