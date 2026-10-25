'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MoveHorizontal, Play } from 'lucide-react';
import { projects } from '@/data/side-projects';
import s from './side-projects.module.css';

const motionQuery = '(prefers-reduced-motion: reduce)';
const subscribeMotion = (callback) => {
  const media = window.matchMedia(motionQuery);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};
const pad = (value) => String(value).padStart(2, '0');

function Artwork({ project }) {
  return <div className={s.artwork} style={{ '--tone': project.color }}>
    {project.image ? <Image src={project.image} alt={project.alt} fill draggable={false}
      sizes="(max-width: 767px) 85vw, (max-width: 1100px) 56vw, (max-width: 1535px) 680px, 810px" /> :
      <div className={s.youtubeArt}>
        <span className={s.orbitRing} /><span className={s.orbitRing} /><span className={s.orbitRing} />
        <div className={s.avatar}><Image src="/me.jpg" alt="Almaz" fill sizes="180px" draggable={false} /><span><Play size={19} fill="currentColor" aria-hidden="true" /></span></div>
        <span className={s.youtubeLabel}>a little webdev. a little everything.</span>
      </div>}
  </div>;
}

/** The approved Glide: centered inertia, image parallax, and unclipped slides. */
export default function SideProjects() {
  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia(motionQuery).matches, () => true);
  const [viewport, api] = useEmblaCarousel({ loop: true, align: 'center', duration: reduced ? 0 : 50 });
  const [selected, setSelected] = useState(0);
  const visuals = useRef([]);

  useEffect(() => {
    if (!api) return;
    const select = () => setSelected(api.selectedScrollSnap());
    const paint = () => {
      const engine = api.internalEngine();
      const progress = api.scrollProgress();
      api.scrollSnapList().forEach((snap, index) => {
        let distance = snap - progress;
        if (engine.options.loop) engine.slideLooper.loopPoints.forEach((point) => {
          if (point.index === index && point.target() !== 0) distance = snap + Math.sign(point.target()) - progress;
        });
        const offset = Math.max(-1.5, Math.min(1.5, distance * projects.length));
        if (visuals.current[index]) visuals.current[index].style.transform = reduced ? 'none' : `translate3d(${offset * -9}px, 0, 0) scale(1.045)`;
      });
    };
    const initialize = () => { select(); paint(); };
    initialize();
    api.on('select', select).on('scroll', paint).on('reInit', initialize);
    return () => { api.off('select', select).off('scroll', paint).off('reInit', initialize); };
  }, [api, reduced]);

  const go = (index) => api?.scrollTo(index, reduced);
  const previous = () => api?.scrollPrev(reduced);
  const next = () => api?.scrollNext(reduced);
  const handleKeys = (event) => {
    if (event.target !== event.currentTarget) return;
    const action = { ArrowLeft: previous, ArrowRight: next, Home: () => go(0), End: () => go(projects.length - 1) }[event.key];
    if (action) { event.preventDefault(); action(); }
  };

  return <section id="side-projects" className={`section ${s.section}`} aria-labelledby="side-projects-title">
    <div className="site-container">
      <header className={s.heading}><p>A few things I’ve made</p><h2 id="side-projects-title">Personal projects.</h2></header>
      <div ref={viewport} className={s.viewport} role="region" aria-roledescription="carousel" aria-label="Personal projects"
        tabIndex={0} aria-describedby="side-projects-instructions" onKeyDown={handleKeys}>
        <div className={s.track}>
          {projects.map((project, index) => <div key={project.id} className={s.slide} role="group" aria-roledescription="slide"
            aria-label={`${index + 1} of ${projects.length}: ${project.title}`} aria-hidden={selected !== index} inert={selected !== index}>
            <article className={s.card}>
              <div className={s.artWindow}><div className={s.artMotion} ref={(node) => { visuals.current[index] = node; }}><Artwork project={project} /></div></div>
              <div className={s.copy}>
                <p className={s.category}>{project.category}</p><h3>{project.title}</h3><p className={s.description}>{project.description}</p>
                <a className={s.projectLink} href={project.link} target="_blank" rel="noopener noreferrer" draggable={false}>{project.cta}<ArrowUpRight size={18} aria-hidden="true" /><span className={s.srOnly}> (opens in a new tab)</span></a>
              </div>
            </article>
          </div>)}
        </div>
      </div>
      <p className={s.srOnly} id="side-projects-instructions">Drag or swipe to explore, or use the project buttons. With the carousel focused, use the left and right arrow keys. Home and End jump to the first and last projects.</p>
      <div className={s.controls}>
        <div className={s.dots} aria-label="Choose a personal project">{projects.map((project, index) => <button type="button" key={project.id} aria-label={`Show ${project.title}`} aria-current={selected === index ? 'true' : undefined} onClick={() => go(index)}><span /></button>)}</div>
        <p className={s.dragHint}><MoveHorizontal size={17} aria-hidden="true" />Drag to explore</p>
        <div className={s.arrows}>
          <span className={s.counter} aria-live="polite" aria-atomic="true"><span className={s.srOnly}>{projects[selected].title}, project </span>{pad(selected + 1)}<span> / {pad(projects.length)}</span></span>
          <button type="button" onClick={previous} aria-label="Previous personal project"><ArrowLeft size={19} aria-hidden="true" /></button>
          <button type="button" onClick={next} aria-label="Next personal project"><ArrowRight size={19} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  </section>;
}
