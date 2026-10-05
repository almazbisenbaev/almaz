'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const Sculpture = dynamic(() => import('./sculpture'), { ssr: false });
const contactUrl = 'https://t.me/almazbisenbaev';

function Arrow({ down = false }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={down ? 'c2-arrow is-down' : 'c2-arrow'}><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" /></svg>;
}
function SectionLabel({ number, children }) {
  return <div className="c2-section-label"><span className="c2-cross" aria-hidden="true">+</span><span>{children}</span><span className="c2-label-number">({number})</span></div>;
}

function Project({ number, title, category, year, href, theme, image, alt, description, agency }) {
  const linkRef = useRef(null);
  const tilt = (event) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.c2Paused === 'true') return;
    const link = linkRef.current;
    const rect = link.getBoundingClientRect();
    link.style.setProperty('--tilt-x', `${((event.clientY - rect.top) / rect.height - 0.5) * -5}deg`);
    link.style.setProperty('--tilt-y', `${((event.clientX - rect.left) / rect.width - 0.5) * 5}deg`);
  };
  const reset = () => {
    linkRef.current?.style.setProperty('--tilt-x', '0deg');
    linkRef.current?.style.setProperty('--tilt-y', '0deg');
  };
  return (
    <article className={`c2-project c2-project-${theme}`} data-reveal>
      <a ref={linkRef} href={href} target="_blank" rel="noreferrer" onPointerMove={tilt} onPointerLeave={reset} className="c2-project-link" aria-label={`Visit ${title} (opens in a new tab)`}>
        <div className="c2-project-art">
          <div className="c2-project-topline"><span>SELECTED PROJECT / {number}</span><span>{year}</span></div>
          <div className="c2-project-wordmark" aria-hidden="true">{theme === 'coffee' ? 'SILVERSKIN®' : 'FUNKY\nRAMEN.'}</div>
          <div className="c2-browser-frame">
            <div className="c2-browser-bar"><span><i /><i /><i /></span><span>{theme === 'coffee' ? 'silverskincoffee.ie' : 'funky-ramen.de'}</span><span>↗</span></div>
            <div className="c2-project-screen"><Image src={image} alt={alt} fill sizes="(max-width: 720px) 88vw, 70vw" /></div>
          </div>
          <span className="c2-project-open"><Arrow /></span>
          <span className="c2-project-art-note">BUILT WITH INTENTION.</span>
        </div>
        <div className="c2-project-caption"><h3>{title}</h3><span>{category}</span><Arrow /></div>
      </a>
      <p className="c2-project-description">{description}{agency && <> <span>With <a href="https://mindlind.de" target="_blank" rel="noreferrer">Mindlind ↗</a>.</span></>}</p>
    </article>
  );
}

export default function ConceptExperience() {
  const rootRef = useRef(null);
  const [finish, setFinish] = useState('chrome');
  const [paused, setPaused] = useState(false);
  const [depth, setDepth] = useState(55);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = rootRef.current;
    let frame = 0;
    const animations = new Set();
    const reveal = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (!media.matches && document.documentElement.dataset.c2Paused !== 'true') {
          const animation = entry.target.animate(
            [{ opacity: 0, transform: 'translateY(36px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 850, easing: 'cubic-bezier(.16,1,.3,1)' },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
        reveal.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    root.querySelectorAll('[data-reveal]').forEach((element) => reveal.observe(element));
    const drawScroll = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty('--page-progress', max > 0 ? window.scrollY / max : 0);
      const still = media.matches || document.documentElement.dataset.c2Paused === 'true';
      root.style.setProperty('--hero-drift', `${still ? 0 : Math.min(window.scrollY * 0.17, 130)}px`);
      const statement = root.querySelector('.c2-statement');
      const rect = statement.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight * 0.9)));
      statement.style.setProperty('--statement-progress', still ? 1 : progress);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(drawScroll); };
    const stopAnimations = () => {
      if (media.matches || document.documentElement.dataset.c2Paused === 'true') animations.forEach((animation) => animation.finish());
      drawScroll();
    };
    const pauseObserver = new MutationObserver(stopAnimations);
    pauseObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-c2-paused'] });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    media.addEventListener('change', stopAnimations);
    drawScroll();
    return () => {
      reveal.disconnect();
      pauseObserver.disconnect();
      animations.forEach((animation) => animation.cancel());
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      media.removeEventListener('change', stopAnimations);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.c2Paused = String(paused);
    return () => { delete document.documentElement.dataset.c2Paused; };
  }, [paused]);

  return (
    <div className="c2" ref={rootRef}>
      <a className="c2-skip" href="#main">Skip to content</a>
      <div className="c2-progress" aria-hidden="true" />
      <header className="c2-header">
        <a className="c2-wordmark" href="#top" aria-label="Almaz, back to top">almaz<span>®</span></a>
        <span className="c2-header-note">INDEPENDENT DEVELOPER<br />A CREATIVE POINT OF VIEW.</span>
        <nav aria-label="Main navigation"><a href="#work">Work <span>02</span></a><a href="#about">Approach</a><a href="#play">Play</a></nav>
        <a href="#contact" className="c2-nav-contact">Let’s talk <Arrow /></a>
      </header>

      <main id="main">
        <section className="c2-hero" id="top" aria-labelledby="hero-title">
          <div className="c2-hero-eyebrow"><span><i /> OPEN FOR COLLABORATIONS</span><span>DESIGN × TECHNOLOGY</span></div>
          <div className="c2-hero-grid">
            <div className="c2-hero-copy">
              <h1 id="hero-title"><span>A little</span><span>out of the</span><span><em>ordinary.</em><b className="c2-title-dot" aria-hidden="true">●</b></span></h1>
              <div className="c2-hero-description"><span className="c2-tiny-star" aria-hidden="true">✳</span><p>I’m Almaz. I turn ambitious ideas into<br className="c2-desktop-break" /> digital experiences with a little more soul.</p></div>
              <a className="c2-pill c2-pill-dark" href="#work">Explore my work <Arrow down /></a>
            </div>
            <div className="c2-object-stage">
              <div className="c2-object-grid" aria-hidden="true"><i /><i /><i /><i /><span>+</span><span>+</span><span>+</span><span>+</span></div>
              <div className="c2-object-drift"><Sculpture finish={finish} paused={paused} /></div>
              <div className="c2-object-shadow" aria-hidden="true" />
              <div className="c2-object-meta"><span>FIG. 01 — CONTINUOUS CURIOSITY</span><span>LIVE / 3D</span></div>
              <div className="c2-finish-controls" role="group" aria-label="Sculpture material"><button type="button" aria-pressed={finish === 'chrome'} onClick={() => setFinish('chrome')}><i className="c2-swatch-chrome" />Chrome</button><button type="button" aria-pressed={finish === 'acid'} onClick={() => setFinish('acid')}><i className="c2-swatch-acid" />Acid</button></div>
            </div>
          </div>
          <div className="c2-hero-foot"><span>GOOD DESIGN. SOLID CODE. A FEELING.</span><a href="#work">SCROLL TO DISCOVER <span>↓</span></a><span>BASED IN KAZAKHSTAN · WORKING EVERYWHERE</span></div>
        </section>

        <section id="work" className="c2-work c2-section" aria-labelledby="work-title">
          <SectionLabel number="01">SELECTED WORK</SectionLabel>
          <div className="c2-section-intro" data-reveal><h2 id="work-title">Less expected.<br /><em>More remembered.</em></h2><p>A few things I’ve helped bring to life.<br />Different businesses. The same care<br />for what makes each one special.</p></div>
          <Project number="01" title="Silverskin Coffee" category="E-COMMERCE / DEVELOPMENT" year="2024" href="https://silverskincoffee.ie" theme="coffee" image="/images/silverskin-1.webp" alt="The Silverskin Coffee e-commerce website, showing its coffee collection and Dublin roastery" description="An independent Dublin roaster. An online store with as much character as the coffee." />
          <Project number="02" title="Funky Ramen" category="WEB EXPERIENCE / DEVELOPMENT" year="2026" href="https://funky-ramen.de" theme="ramen" image="/images/portfolio/funky-ramen-1.jpg" alt="Funky Ramen’s Japanese-inspired restaurant website" description="Japanese soul, anime energy. A restaurant experience that starts before the first bowl." agency />
          <div className="c2-work-bottom"><span>GOOD COMPANY. GOOD COLLABORATIONS.</span><a href="https://www.upwork.com/freelancers/~01fc6ec6fb228858ff" target="_blank" rel="noreferrer">More work & client stories <Arrow /></a></div>
        </section>

        <section id="about" className="c2-about c2-section" aria-labelledby="about-title">
          <SectionLabel number="02">THE WAY I SEE IT</SectionLabel>
          <h2 id="about-title" className="c2-statement">The best websites<br />don’t just <span>look good.</span><br />They <em>feel right.</em></h2>
          <div className="c2-about-bottom" data-reveal><div className="c2-about-signature"><span className="c2-asterisk" aria-hidden="true">✳</span><span>A DEVELOPER’S MIND.<br />A DESIGNER’S EYE.</span></div><div><p>I work where thoughtful design meets thoughtful code. From the first interaction to the smallest detail, I build websites that feel effortless to use and distinctly yours.</p><p>One person to talk to. A hands-on partner from the first idea to the final launch.</p></div></div>
          <div className="c2-services" data-reveal>{[
            ['01', 'Digital experiences', 'Distinctive websites, intuitive interfaces, and a clear point of view.', 'DESIGN / INTERACTION'],
            ['02', 'Creative development', 'Responsive builds with movement, depth, and attention to the details.', 'REACT / NEXT.JS / WEBGL'],
            ['03', 'Commerce & beyond', 'Stores and content platforms built around the people who use them.', 'WORDPRESS / WOOCOMMERCE'],
          ].map(([num, title, copy, tech]) => <div className="c2-service" key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p><span>{tech}</span></div>)}</div>
        </section>

        <section id="play" className="c2-play c2-section" aria-labelledby="play-title">
          <SectionLabel number="03">ROOM TO EXPERIMENT</SectionLabel>
          <div className="c2-play-grid"><div className="c2-play-copy" data-reveal><span className="c2-live-label"><i /> A SMALL INTERACTIVE EXPERIMENT</span><h2 id="play-title">Serious about<br /><em>play.</em></h2><p>A little curiosity goes a long way.<br />Move the slider. Change the perspective.<br />See what a little depth can do.</p><div className="c2-depth-control"><label htmlFor="depth">MAKE SOME ROOM <output htmlFor="depth">{String(depth).padStart(2, '0')}%</output></label><input id="depth" type="range" min="0" max="100" value={depth} onChange={(event) => setDepth(Number(event.target.value))} /><div><span>LESS</span><span>MORE</span></div></div></div><div className="c2-experiment" style={{ '--depth': depth }} role="img" aria-label={`An animated lime sculpture made of twelve nested frames, depth ${depth} percent`}><div className="c2-tunnel">{Array.from({ length: 12 }, (_, index) => <div key={index} className="c2-tunnel-ring" style={{ '--i': index }} />)}</div><span className="c2-experiment-coord">X / Y / Z</span><span className="c2-experiment-caption">EXPERIMENT 002<br />A NEW DIMENSION</span></div></div>
          <div className="c2-play-foot"><span>BECAUSE THE INTERNET CAN STILL BE A FUN PLACE.</span><button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}><span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>{paused ? 'Resume motion' : 'Pause motion'}</button></div>
        </section>

        <footer id="contact" className="c2-contact c2-section">
          <SectionLabel number="04">YOUR NEXT GOOD IDEA</SectionLabel>
          <div className="c2-contact-intro"><span>HAVE SOMETHING IN MIND?</span><p>I’m always up for an interesting conversation.<br />Let’s make something worth putting out there.</p></div>
          <a className="c2-contact-link" href={contactUrl} target="_blank" rel="noreferrer"><span>Let’s make<br /><em>it happen.</em></span><span className="c2-contact-arrow"><Arrow /></span></a>
          <div className="c2-contact-links"><span>START A CONVERSATION <Arrow /></span><a href={contactUrl} target="_blank" rel="noreferrer">Telegram ↗</a><a href="https://linkedin.com/in/almazbisenbaev" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.youtube.com/@webdevandstuff" target="_blank" rel="noreferrer">YouTube ↗</a></div>
          <div className="c2-colophon"><a className="c2-wordmark" href="#top" aria-label="Almaz, back to top">almaz<span>®</span></a><span>© {new Date().getFullYear()} ALMAZ BISENBAEV</span><span>MADE WITH INTENTION. AND A LITTLE PLAY.</span><a href="#top">BACK TO TOP ↑</a></div>
        </footer>
      </main>
    </div>
  );
}
