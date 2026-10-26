'use client';

import { useCallback, useEffect, useId, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import s from './portfolio-spotlight.module.css';

const motionQuery = '(prefers-reduced-motion: reduce)';
function subscribeMotion(callback) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
function useReducedMotion() {
  return useSyncExternalStore(subscribeMotion, () => window.matchMedia(motionQuery).matches, () => true);
}

function ProjectImage({ project, className = '' }) {
  return (
    <div className={`${s.image} ${className}`} style={{ '--project-tone': project.tone }}>
      <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 700px) 90vw, (max-width: 1500px) 55vw, 800px" draggable={false} />
    </div>
  );
}

function ProjectLink({ project, className = '', children }) {
  const external = !project.url.startsWith('/') || project.url.startsWith('//');
  return (
    <a className={`${s.projectLink} ${className}`} href={project.url}
      target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
      {children || <>{project.buttonText}<ArrowUpRight size={18} aria-hidden="true" /></>}
      <span className={s.srOnly}>{` — ${project.name}${external ? ' (opens in a new tab)' : ''}`}</span>
    </a>
  );
}

function Credit({ project }) {
  return <p className={s.credit}>{project.client && <>For <a href={project.clientUrl} target="_blank" rel="noopener noreferrer">{project.client}<span className={s.srOnly}> (opens in a new tab)</span></a> · </>}{project.year}</p>;
}

function Arrows({ previous, next, canPrevious = true, canNext = true, label }) {
  return <div className={s.arrows}>
    <button type="button" onClick={previous} disabled={!canPrevious} aria-label={`Previous project in ${label}`}><ArrowLeft size={20} aria-hidden="true" /></button>
    <button type="button" onClick={next} disabled={!canNext} aria-label={`Next project in ${label}`}><ArrowRight size={20} aria-hidden="true" /></button>
  </div>;
}

function useCarousel(loop = false) {
  const reducedMotion = useReducedMotion();
  const [ref, api] = useEmblaCarousel({ loop, align: 'start', containScroll: 'trimSnaps', duration: reducedMotion ? 0 : 48 });
  const [selected, setSelected] = useState(0);
  const [canPrevious, setCanPrevious] = useState(loop);
  const [canNext, setCanNext] = useState(true);
  useEffect(() => {
    if (!api) return;
    const update = () => {
      setSelected(api.selectedScrollSnap());
      setCanPrevious(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    update();
    api.on('select', update).on('reInit', update);
    return () => { api.off('select', update).off('reInit', update); };
  }, [api]);
  useEffect(() => {
    if (!api) return;
    let slides = api.slideNodes();
    const animate = () => {
      const engine = api.internalEngine();
      const width = engine.containerRect.width || 1;
      // Use Embla's cached geometry and rendered location, including loop
      // offsets. No layout reads or React renders in the animation loop.
      slides.forEach((slide, index) => {
        const loopPoint = engine.slideLooper.loopPoints.find((point) => point.index === index);
        const offset = engine.slideRects[index].left - engine.containerRect.left
          + engine.offsetLocation.get() + (loopPoint?.target() || 0);
        const progress = reducedMotion ? 0 : Math.max(-1, Math.min(1, offset / width));
        const distance = Math.abs(progress);
        slide.style.setProperty('--card-scale', String(1 - distance * 0.035));
        slide.style.setProperty('--image-shift', `${progress * -18}px`);
        slide.style.setProperty('--image-scale', String(1 - distance * 0.035));
      });
    };
    const reset = () => { slides = api.slideNodes(); animate(); };
    const release = () => {
      if (reducedMotion) api.scrollTo(api.selectedScrollSnap(), true);
    };
    animate();
    api.on('scroll', animate).on('reInit', reset).on('settle', animate).on('pointerUp', release);
    return () => {
      api.off('scroll', animate).off('reInit', reset).off('settle', animate).off('pointerUp', release);
      slides.forEach((slide) => {
        ['--card-scale', '--image-shift', '--image-scale'].forEach((name) => slide.style.removeProperty(name));
      });
    };
  }, [api, reducedMotion]);
  const go = useCallback((index) => api?.scrollTo(index, reducedMotion), [api, reducedMotion]);
  const previous = () => api?.scrollPrev(reducedMotion);
  const next = () => api?.scrollNext(reducedMotion);
  const onKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); next(); }
    if (event.key === 'Home') { event.preventDefault(); go(0); }
    if (event.key === 'End') { event.preventDefault(); go(api?.scrollSnapList().length - 1); }
  };
  return { ref, selected, previous, next, go, canPrevious, canNext, onKeyDown };
}

/**
 * One visual per project in the approved Spotlight layout.
 * Items use the `spotlight` cover metadata from @/data/works.
 * `embedded` lets a page supply its own heading and container; pair it with
 * `labelledBy`. The original gallery remains in components/portfolio-section.
 */
export default function PortfolioSpotlight({
  items,
  title = 'Recent projects',
  eyebrow = 'Portfolio',
  description,
  aside,
  id,
  embedded = false,
  labelledBy,
}) {
  const carousel = useCarousel(false);
  const instanceId = useId();
  const titleId = labelledBy || `${instanceId}-title`;
  const instructionsId = `${instanceId}-instructions`;
  const projects = items.map((project) => ({
    ...project,
    ...project.spotlight,
    imageAlt: project.spotlight.alt || `${project.name} website preview`,
  }));
  const Wrapper = embedded ? 'div' : 'section';
  if (!projects.length) return null;
  return (
    <Wrapper id={id} className={`${s.root} ${embedded ? '' : s.section}`} aria-labelledby={titleId}>
      <div className={embedded ? undefined : 'site-container'}>
        {!embedded && (
          <header className={s.header}>
            <div>
              <p className={s.eyebrow}>{eyebrow}</p>
              <h2 id={titleId}>{title}</h2>
              {description && <p className={s.description}>{description}</p>}
            </div>
            {aside && <div className={s.headerAside}><p>{aside}</p></div>}
          </header>
        )}
        <div className={s.spotlightViewport} ref={carousel.ref} tabIndex={0} onKeyDown={carousel.onKeyDown}
          role="region" aria-roledescription="carousel" aria-label="Spotlight projects" aria-describedby={projects.length > 1 ? instructionsId : undefined}>
          <div className={s.spotlightTrack}>
            {projects.map((project, index) => (
              <article className={s.spotlightSlide} key={project.name} id={project.id} aria-roledescription="slide"
                aria-label={`${index + 1} of ${projects.length}: ${project.name}`} aria-hidden={index !== carousel.selected}
                inert={index !== carousel.selected}>
                <div className={s.spotlightCard}>
                <div className={s.spotlightCopy}>
                  <h3>{project.name}</h3>
                  <p>{project.result || project.description}</p>
                  <div className={s.spotlightDetails}><Credit project={project} /></div>
                  <ProjectLink project={project} />
                </div>
                <ProjectImage project={project} className={s.spotlightImage} />
                </div>
              </article>
            ))}
          </div>
        </div>
        {projects.length > 1 && <div className={s.carouselFooter}>
          <div className={s.dots} aria-label="Choose a spotlight project">
            {projects.map((project, index) => <button key={project.name} type="button" aria-label={`Show ${project.name} in Spotlight`}
              aria-current={carousel.selected === index ? 'true' : undefined} onClick={() => carousel.go(index)}><span /></button>)}
          </div>
          <p id={instructionsId} className={s.srOnly}>Drag to explore or use the left and right arrow keys when the carousel is focused.</p>
          <Arrows {...carousel} label="Spotlight" />
        </div>}
      </div>
    </Wrapper>
  );
}

