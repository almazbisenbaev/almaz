'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, MoveHorizontal, Play, Plus } from 'lucide-react';
import { projects, sampleProjects } from './projects';
import s from './side-projects-concepts.module.css';

const pad = (number) => String(number).padStart(2, '0');
const wrap = (number, length) => ((number % length) + length) % length;
const spring = { type: 'spring', stiffness: 150, damping: 26, mass: 1.1 };
const ease = [0.22, 1, 0.36, 1];
const query = '(prefers-reduced-motion: reduce)';
const subscribeMotion = (callback) => {
  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};
function useReducedMotion() {
  return useSyncExternalStore(subscribeMotion, () => window.matchMedia(query).matches, () => true);
}

function Artwork({ project, className = '', priority = false }) {
  return (
    <div className={`${s.artwork} ${className}`} style={{ '--tone': project.color, '--accent': project.accent }}>
      {project.image ? (
        <Image src={project.image} alt={project.alt} fill draggable={false} priority={priority}
          sizes="(max-width: 767px) 85vw, (max-width: 1536px) 45vw, 720px" />
      ) : project.id === 'youtube' ? (
        <div className={s.youtubeArt}>
          <span className={s.orbitRing} /><span className={s.orbitRing} /><span className={s.orbitRing} />
          <div className={s.avatar}><Image src="/me.jpg" alt="Almaz" fill sizes="180px" draggable={false} /><span><Play size={19} fill="currentColor" aria-hidden="true" /></span></div>
          <span className={s.youtubeLabel}>a little webdev. a little everything.</span>
        </div>
      ) : (
        <div className={`${s.sampleArt} ${s[project.shape]}`} aria-hidden="true">
          {Array.from({ length: project.shape === 'flower' ? 8 : 4 }, (_, i) => <span key={i} style={{ '--i': i }} />)}
          <small>ROOM FOR WHAT’S NEXT</small>
        </div>
      )}
    </div>
  );
}

function ProjectLink({ project, subtle = false }) {
  return project.sample ? (
    <span className={s.sampleLabel}><Plus size={15} aria-hidden="true" /> A future project lives here</span>
  ) : (
    <a className={`${s.projectLink} ${subtle ? s.subtleLink : ''}`} href={project.link} target="_blank" rel="noopener noreferrer" draggable={false}>
      {project.cta}<ArrowUpRight size={18} aria-hidden="true" /><span className={s.srOnly}> (opens in a new tab)</span>
    </a>
  );
}

function Controls({ label, selected, items, go, previous, next, hint = 'Drag to explore' }) {
  return (
    <div className={s.controls}>
      <div className={s.positionDots} aria-label={`Choose a project in ${label}`}>
        {items.map((project, index) => (
          <button type="button" key={project.id} aria-label={`Show ${project.title} in ${label}`} aria-current={selected === index ? 'true' : undefined}
            onClick={() => go(index)}><span /></button>
        ))}
      </div>
      <p className={s.dragHint}><MoveHorizontal size={17} aria-hidden="true" />{hint}</p>
      <div className={s.arrowGroup}>
        <span className={s.counter} aria-live="polite" aria-atomic="true"><span className={s.srOnly}>{items[selected].title}, project </span>{pad(selected + 1)}<span> / {pad(items.length)}</span></span>
        <button type="button" onClick={previous} aria-label={`Previous project in ${label}`}><ArrowLeft size={19} aria-hidden="true" /></button>
        <button type="button" onClick={next} aria-label={`Next project in ${label}`}><ArrowRight size={19} aria-hidden="true" /></button>
      </div>
    </div>
  );
}

function handleKeys(event, go, previous, next, count) {
  if (event.target !== event.currentTarget) return;
  const actions = { ArrowLeft: previous, ArrowRight: next, Home: () => go(0), End: () => go(count - 1) };
  if (actions[event.key]) { event.preventDefault(); actions[event.key](); }
}

function ConceptHeading({ number, name, description, tag }) {
  return (
    <header className={s.conceptHeading}>
      <div className={s.conceptName}><span className={s.conceptNumber}>{number}</span><h2>{name}</h2><span className={s.conceptTag}>{tag}</span></div>
      <p>{description}</p>
    </header>
  );
}

const concepts = [
  { id: 'gallery', name: 'The gallery', nav: 'Original', tag: 'Your pick', eyebrow: 'Built out of curiosity', title: <>Serious about<br />side projects.</>, description: 'A little curve. A little momentum. The original gallery, just as you liked it.', note: 'A collection, always in view', aside: 'The starting point for this round.' },
  { id: 'focus', name: 'Gallery / Focus', nav: 'Focus', tag: 'Gallery variation', eyebrow: 'A closer look', title: <>A little more<br />in the spotlight.</>, description: 'The middle card grows into focus. Its neighbors recede, and the artwork moves at its own pace.', note: 'Scale, depth & a soft landing', aside: 'A stronger focal point, with the same gallery feel.' },
  { id: 'elastic', name: 'Gallery / Elastic', nav: 'Elastic', tag: 'Gallery variation', eyebrow: 'Made to move', title: <>A collection with<br />a little give.</>, description: 'Pull slowly, then flick. The artwork stretches with the movement and springs gently back into shape.', note: 'Stretch that follows your hand', aside: 'Try a quick drag to feel the difference.' },
  { id: 'accordion', name: 'The accordion', nav: 'Accordion', tag: 'New direction', eyebrow: 'Make room for an idea', title: <>Curiosity expands.</>, description: 'Narrow glimpses unfold into a wide canvas. Each project makes room for the next.', note: 'A collection that opens up', aside: 'Tap a panel, swipe, or use the arrows.' },
  { id: 'portal', name: 'The portal', nav: 'Portal', tag: 'New direction', eyebrow: 'A different perspective', title: <>Open a little<br />window.</>, description: 'Tall capsules open into wide windows as they reach the center. The shape changes with every swipe.', note: 'From a glimpse to the whole picture', aside: 'A more sculptural way to browse.' },
  { id: 'glide', name: 'The glide', nav: 'Glide', tag: 'The simpler one', eyebrow: 'A few things I’ve made', title: <>Personal projects.</>, description: 'A clean row of cards. An easy drag, a long, soft settle, and just a hint of movement inside the images.', note: 'Less going on. Still lovely to use.', aside: 'The quietest version of the collection.' },
];

/** Shared inertia, keyboard support and looping; decoration never drives layout. */
function useRail(items, reduced, kind) {
  const [viewport, api] = useEmblaCarousel({ loop: true, align: 'center', duration: reduced ? 0 : kind === 'glide' ? 50 : 45 });
  const [selected, setSelected] = useState(0);
  const cards = useRef([]);
  const visuals = useRef([]);
  const masks = useRef([]);

  useEffect(() => {
    if (!api) return;
    let frame = 0;
    let lastFrame = 0;
    let lastScroll = 0;
    let target = 0;
    let lastLocation = api.internalEngine().offsetLocation.get();
    let previousScrollTime = 0;
    let deformation = 0;
    let velocity = 0;
    const select = () => setSelected(api.selectedScrollSnap());
    const paint = () => {
      const engine = api.internalEngine();
      const progress = api.scrollProgress();
      api.scrollSnapList().forEach((snap, index) => {
        let distance = snap - progress;
        if (engine.options.loop) engine.slideLooper.loopPoints.forEach((point) => {
          if (point.index === index && point.target() !== 0) distance = snap + Math.sign(point.target()) - progress;
        });
        const offset = Math.max(-1.5, Math.min(1.5, distance * items.length));
        const amount = Math.min(Math.abs(offset), 1);
        const card = cards.current[index];
        const visual = visuals.current[index];
        const mask = masks.current[index];
        if (!card) return;
        if (reduced) {
          card.style.transform = 'none';
          if (visual) visual.style.transform = 'none';
          if (mask) mask.style.clipPath = 'none';
          return;
        }
        if (kind === 'gallery') {
          card.style.transform = `translate3d(0, ${Math.abs(offset) * 25}px, 0) rotate(${offset * 4}deg) scale(${1 - amount * 0.055})`;
        } else if (kind === 'focus') {
          card.style.transform = `translate3d(0, ${amount * 40}px, 0) scale(${1 - amount * 0.18})`;
          if (visual) visual.style.transform = `translate3d(${offset * -20}px, 0, 0) scale(${1.06 + amount * 0.08})`;
        } else if (kind === 'elastic') {
          card.style.transform = `translate3d(0, ${amount * 15}px, 0) rotate(${offset * 2}deg) scale(${1 - amount * 0.035})`;
          // Deform only the artwork: descriptions and links remain readable.
          if (visual) visual.style.transform = `scale(${1 + Math.abs(deformation) * 0.18}, ${1 - Math.abs(deformation) * 0.095}) skewX(${deformation * -5}deg)`;
        } else if (kind === 'portal') {
          card.style.transform = `scale(${1 - amount * 0.12})`;
          if (mask) mask.style.clipPath = `inset(${amount * 5}% ${amount * 29}% round ${28 + amount * 220}px)`;
          if (visual) visual.style.transform = `translate3d(${offset * -24}px, 0, 0) scale(${1.04 + amount * 0.18})`;
        } else if (visual) {
          visual.style.transform = `translate3d(${offset * -9}px, 0, 0) scale(1.045)`;
        }
      });
    };
    const tick = (time) => {
      const dt = Math.min((time - (lastFrame || time - 16)) / 1000, 0.032);
      lastFrame = time;
      if (time - lastScroll > 50) target = 0;
      velocity += ((target - deformation) * 190 - velocity * 23) * dt;
      deformation += velocity * dt;
      paint();
      if (time - lastScroll < 70 || Math.abs(deformation) > 0.001 || Math.abs(velocity) > 0.001) {
        frame = requestAnimationFrame(tick);
      } else { frame = 0; lastFrame = 0; deformation = 0; paint(); }
    };
    const scroll = () => {
      if (kind !== 'elastic' || reduced) { paint(); return; }
      const now = performance.now();
      const engine = api.internalEngine();
      const location = engine.offsetLocation.get();
      let delta = location - lastLocation;
      // Embla rebases coordinates at the loop seam. Exclude that jump from speed.
      const length = engine.limit.length;
      if (engine.options.loop && Math.abs(delta) > length / 2) delta -= Math.sign(delta) * length;
      const elapsed = previousScrollTime ? Math.max(8, now - previousScrollTime) : 16.67;
      target = Math.max(-1, Math.min(1, (delta * 16.67 / elapsed) / 32));
      lastLocation = location;
      previousScrollTime = now;
      lastScroll = now;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const initialize = () => { select(); paint(); };
    initialize();
    api.on('select', select).on('scroll', scroll).on('reInit', initialize);
    return () => {
      cancelAnimationFrame(frame);
      api.off('select', select).off('scroll', scroll).off('reInit', initialize);
      cards.current.forEach((card) => { if (card) card.style.transform = ''; });
      visuals.current.forEach((visual) => { if (visual) visual.style.transform = ''; });
      masks.current.forEach((mask) => { if (mask) mask.style.clipPath = ''; });
    };
  }, [api, reduced, kind, items.length]);

  const go = (index) => api?.scrollTo(index, reduced);
  const previous = () => api?.scrollPrev(reduced);
  const next = () => api?.scrollNext(reduced);
  return { viewport, selected, cards, visuals, masks, go, previous, next };
}

function StageHeading({ concept }) {
  return <div className={s.stageHeading}>
    <p className={s.eyebrow}>{concept.eyebrow}</p><h3>{concept.title}</h3>
    {concept.id === 'gallery' && <span className={s.handwritten}>a few things I’ve made <ArrowDown size={22} aria-hidden="true" /></span>}
    {concept.id === 'elastic' && <span className={s.motionBadge}><MoveHorizontal size={16} aria-hidden="true" /> Slow pull. Quick flick.</span>}
    {concept.id === 'focus' && <span className={s.focusDecoration} aria-hidden="true"><i /><i /><i /></span>}
  </div>;
}

function ConceptFrame({ concept, children }) {
  const number = pad(concepts.indexOf(concept) + 1);
  return <section className={s.concept} id={concept.id} aria-label={`${concept.name} concept`}>
    <ConceptHeading number={number} name={concept.name} tag={concept.tag} description={concept.description} />
    {children}
    <div className={s.conceptNote}><span>{number} / {concept.note}</span><p>{concept.aside}</p></div>
  </section>;
}

function Instructions({ id }) {
  return <p id={`${id}-instructions`} className={s.srOnly}>Drag or swipe to explore, or use the project buttons. With the carousel focused, use the left and right arrow keys. Home and End jump to the first and last projects.</p>;
}

function ProjectCopy({ project }) {
  return <><p className={s.category}>{project.category}</p><h4>{project.title}</h4><p className={s.projectDescription}>{project.description}</p><ProjectLink project={project} subtle /></>;
}

function RailConcept({ concept, items, reduced }) {
  const rail = useRail(items, reduced, concept.id);
  const portal = concept.id === 'portal';
  return <ConceptFrame concept={concept}>
    <div className={`${s.galleryStage} ${s[`${concept.id}Stage`] || ''}`} data-expanded={items.length > 3 || undefined}>
      <StageHeading concept={concept} />
      <div ref={rail.viewport} className={s.galleryViewport} tabIndex={0} role="region" aria-roledescription="carousel" aria-label={concept.name}
        aria-describedby={`${concept.id}-instructions`} onKeyDown={(event) => handleKeys(event, rail.go, rail.previous, rail.next, items.length)}>
        <div className={s.galleryTrack}>
          {items.map((project, index) => <div key={project.id} className={s.gallerySlide} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${items.length}: ${project.title}`}
            aria-hidden={rail.selected !== index} inert={rail.selected !== index}>
            <article ref={(node) => { rail.cards.current[index] = node; }} className={s.galleryCard}>
              <div ref={(node) => { rail.masks.current[index] = node; }} className={s.artWindow}>
                <div ref={(node) => { rail.visuals.current[index] = node; }} className={s.artMotion}>
                  <Artwork project={project} priority={concept.id === 'gallery' && index === 0} />
                </div>
                {concept.id === 'focus' && <span className={s.projectOrdinal} aria-hidden="true">{pad(index + 1)}</span>}
              </div>
              {!portal && <div className={s.galleryCopy}><ProjectCopy project={project} /></div>}
            </article>
          </div>)}
        </div>
      </div>
      {portal && <div className={s.portalCaption}><AnimatedCaption project={items[rail.selected]} reduced={reduced} /></div>}
      <Instructions id={concept.id} />
      <Controls label={concept.name} items={items} {...rail} />
    </div>
  </ConceptFrame>;
}

function AnimatedCaption({ project, reduced }) {
  // The link follows the selection immediately, including during rapid browsing.
  return <div className={s.captionRow}>
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div key={project.id} className={s.captionText} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={reduced ? { duration: 0 } : { duration: 0.3, ease }}>
        <p className={s.category}>{project.category}</p><h4>{project.title}</h4><p className={s.projectDescription}>{project.description}</p>
      </motion.div>
    </AnimatePresence>
    <ProjectLink project={project} />
  </div>;
}

function Accordion({ concept, items, reduced }) {
  const [selected, setSelected] = useState(0);
  const start = useRef(null);
  const dragged = useRef(false);
  const go = (index) => setSelected(index);
  const previous = () => setSelected((index) => wrap(index - 1, items.length));
  const next = () => setSelected((index) => wrap(index + 1, items.length));
  return <ConceptFrame concept={concept}>
    <div className={s.accordionStage}>
      <StageHeading concept={concept} />
      <div className={s.accordionPanels} tabIndex={0} role="region" aria-roledescription="carousel" aria-label={concept.name} aria-describedby="accordion-instructions"
        onKeyDown={(event) => handleKeys(event, go, previous, next, items.length)}
        onPointerDown={(event) => { if (event.button !== 0) return; start.current = { x: event.clientX, y: event.clientY }; dragged.current = false; }}
        onPointerCancel={() => { start.current = null; }}
        onPointerUp={(event) => {
          const origin = start.current; start.current = null;
          if (!origin) return;
          const dx = event.clientX - origin.x;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(event.clientY - origin.y)) {
            dragged.current = true;
            if (dx < 0) next(); else previous();
          }
        }}>
        {items.map((project, index) => <motion.button type="button" key={project.id} className={s.accordionPanel} data-active={selected === index || undefined}
          aria-label={`Show ${project.title} in The accordion`} aria-pressed={selected === index}
          onClick={() => { if (!dragged.current) go(index); dragged.current = false; }}
          animate={{ flexGrow: selected === index ? 7 : 1 }} transition={reduced ? { duration: 0 } : spring}>
          <motion.div className={s.accordionImage} animate={{ scale: selected === index ? 1 : 1.22 }} transition={reduced ? { duration: 0 } : { duration: 0.85, ease }}><Artwork project={project} /></motion.div>
          <span className={s.panelNumber}>{pad(index + 1)}</span><span className={s.panelName} aria-hidden="true">{project.shortTitle}</span><span className={s.panelPlus} aria-hidden="true"><Plus size={19} /></span>
        </motion.button>)}
      </div>
      <div className={s.accordionCaption}><AnimatedCaption project={items[selected]} reduced={reduced} /></div>
      <Instructions id="accordion" />
      <Controls label={concept.name} items={items} selected={selected} go={go} previous={previous} next={next} hint="Pick a panel" />
    </div>
  </ConceptFrame>;
}

export default function SideProjectsConcepts() {
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();
  const items = expanded ? [...projects, ...sampleProjects] : projects;
  return <div className={s.page}><div className="site-container">
    <header className={s.pageHeader}>
      <div className={s.pageEyebrow}><Link href="/"><ArrowLeft size={15} aria-hidden="true" /> Back home</Link><span>Motion studies / Round 02</span></div>
      <div className={s.heroRow}><h1>Side projects,<br /><span>in motion.</span></h1><div className={s.heroAside}><span className={s.smallAsterisk} aria-hidden="true">✳</span><p>Your favorite.<br />Five fresh directions.</p><span>From quietly smooth to a little unexpected.</span></div></div>
      <div className={s.toolbar}><nav aria-label="Carousel concepts">{concepts.map((concept, index) => <a href={`#${concept.id}`} key={concept.id}><span>{pad(index + 1)}</span>{concept.nav}<ArrowDown size={13} aria-hidden="true" /></a>)}</nav>
        <fieldset className={s.previewSwitch}><legend className={s.srOnly}>Project collection size</legend><button type="button" aria-pressed={!expanded} onClick={() => setExpanded(false)}>Current 3</button><button type="button" aria-pressed={expanded} onClick={() => setExpanded(true)}><Plus size={13} aria-hidden="true" /> Preview 6</button></fieldset>
      </div>
      <p className={s.previewNote} aria-live="polite">{expanded ? 'Six-project preview includes three illustrative placeholders for future additions.' : 'Drag, flick, and compare. Preview six projects to see how each version grows.'}</p>
    </header>
    {concepts.map((concept) => concept.id === 'accordion'
      ? <Accordion key={`${concept.id}-${items.length}`} concept={concept} items={items} reduced={reduced} />
      : <RailConcept key={`${concept.id}-${items.length}`} concept={concept} items={items} reduced={reduced} />)}
    <footer className={s.pageFooter}><span>Six studies. One growing collection.</span><a href="#"><ArrowUpRight size={17} aria-hidden="true" /> Back to the top</a></footer>
  </div></div>;
}
