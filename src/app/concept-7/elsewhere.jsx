'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const chapters = [
  { title: 'Find the feeling.', label: '01 / DIRECTION', text: 'Before the layout, there is a feeling. Clear and confident? Warm and expressive? We start with what your world should feel like, then give it a shape.' },
  { title: 'Give it a world.', label: '02 / DESIGN & DEVELOPMENT', text: 'Type, space, image, and movement, built into a website that feels entirely yours. Every detail has a reason. Every interaction leads somewhere.' },
  { title: 'Make it effortless.', label: '03 / THE FINISHING TOUCHES', text: 'Beautiful should also be useful. I work through the smaller screens, the keyboard paths, and the quiet details that make the whole experience feel natural.' },
];

function PortalScene() {
  const [dusk, setDusk] = useState(false);
  const scene = useRef(null);

  useEffect(() => {
    const element = scene.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const draw = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const progress = reduced.matches ? 0 : Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)));
      element.style.setProperty('--portal-progress', progress);
    };
    const update = () => { if (!frame) frame = requestAnimationFrame(draw); };
    draw();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    reduced.addEventListener('change', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); reduced.removeEventListener('change', update); };
  }, []);

  return <section ref={scene} className={`elsewhere-portal ${dusk ? 'is-dusk' : ''}`} id="elsewhere-top" aria-labelledby="elsewhere-title">
    <div className="elsewhere-scene">
      <div className="elsewhere-landscape" aria-hidden="true"><Image src="/concepts/elsewhere-portal.webp" alt="" fill priority sizes="100vw" /><div className="elsewhere-dusk-wash" /></div>
      <div className="elsewhere-scene-shade" aria-hidden="true" />
      <header className="elsewhere-header"><a className="elsewhere-wordmark" href="#elsewhere-top">elsewhere<span>BY ALMAZ</span></a><span className="elsewhere-header-note">INDEPENDENT DEVELOPER.<br />A DIFFERENT KIND OF DIGITAL.</span><a className="elsewhere-contact-link" href="https://t.me/almazbisenbaev" target="_blank" rel="noreferrer">Let’s talk <span>↗</span></a></header>
      <div className="elsewhere-hero-copy"><p className="elsewhere-eyebrow">WEB EXPERIENCES WITH A SENSE OF PLACE</p><h1 id="elsewhere-title">Somewhere<br /><em>worth going.</em></h1><p>For ideas that deserve more<br />than another place on the internet.</p></div>
      <a className="elsewhere-enter" href="#elsewhere-introduction"><span>STEP<br />INSIDE</span><b aria-hidden="true">↘</b></a>
      <div className="elsewhere-horizon-note"><span>THOUGHTFULLY MADE.</span><p>Not just a destination.<br /><em>A feeling that stays.</em></p></div>
      <div className="elsewhere-scene-bottom"><a href="#elsewhere-introduction"><span className="elsewhere-scroll-line" aria-hidden="true" />SCROLL TO CROSS OVER</a><div role="group" aria-label="Landscape lighting"><span>CHANGE THE ATMOSPHERE</span><button type="button" aria-pressed={!dusk} onClick={() => setDusk(false)}>Dawn</button><button type="button" aria-pressed={dusk} onClick={() => setDusk(true)}>Dusk</button></div><span className="elsewhere-scene-number">01 — 07</span></div>
    </div>
  </section>;
}

export default function Elsewhere() {
  const [chapter, setChapter] = useState(0);
  const chapterTabs = useRef([]);
  return <div className="elsewhere">
    <a className="elsewhere-skip" href="#elsewhere-introduction">Skip to content</a>
    <main>
      <PortalScene />
      <section className="elsewhere-introduction" id="elsewhere-introduction"><p className="elsewhere-eyebrow">A NOTE FROM ALMAZ / THE DEVELOPER BEHIND THIS WORLD</p><h2>The internet should<br />feel like <em>a place.</em></h2><div className="elsewhere-intro-bottom"><span className="elsewhere-sun" aria-hidden="true">✳</span><p>Somewhere you want to explore.<br />Something you remember.</p><p>I build websites with that in mind. A little atmosphere. A thoughtful interaction. A strong idea, carried all the way through to the smallest detail.</p></div></section>
      <section className="elsewhere-work" aria-labelledby="elsewhere-work-title"><div className="elsewhere-section-heading"><span className="elsewhere-eyebrow">PLACES I’VE HELPED CREATE</span><h2 id="elsewhere-work-title">A few <em>destinations.</em></h2><span>SELECTED WORK / 01—02</span></div><div className="elsewhere-destinations">
        <a className="elsewhere-destination elsewhere-coffee" href="https://silverskincoffee.ie" target="_blank" rel="noreferrer"><div className="elsewhere-destination-art"><div className="elsewhere-arch-backdrop" /><div className="elsewhere-browser"><span>SILVERSKINCOFFEE.IE <b>↗</b></span><div><Image src="/images/silverskin-1.webp" alt="Silverskin Coffee online shop" fill sizes="(max-width: 700px) 75vw, 36vw" /></div></div><span className="elsewhere-destination-mark">01</span><span className="elsewhere-visit">VISIT THIS WORLD ↗</span></div><div className="elsewhere-destination-caption"><h3>Silverskin Coffee</h3><span>CRAFT COFFEE, DUBLIN<br />WORDPRESS & WOOCOMMERCE</span></div></a>
        <a className="elsewhere-destination elsewhere-ramen" href="https://funky-ramen.de" target="_blank" rel="noreferrer"><div className="elsewhere-destination-art"><div className="elsewhere-arch-backdrop" /><div className="elsewhere-browser"><span>FUNKY-RAMEN.DE <b>↗</b></span><div><Image src="/images/portfolio/funky-ramen-1.jpg" alt="Funky Ramen restaurant website" fill sizes="(max-width: 700px) 75vw, 36vw" /></div></div><span className="elsewhere-destination-mark">02</span><span className="elsewhere-visit">VISIT THIS WORLD ↗</span></div><div className="elsewhere-destination-caption"><h3>Funky Ramen</h3><span>JAPANESE FOOD & ANIME CULTURE<br />DEVELOPMENT WITH MINDLIND</span></div></a>
      </div></section>
      <section className="elsewhere-making" aria-labelledby="elsewhere-making-title"><div className="elsewhere-making-visual"><Image src="/concepts/elsewhere-portal.webp" alt="A sculptural arch opening toward a quiet sunrise" fill sizes="(max-width: 800px) 100vw, 50vw" /><span>AN OPENING.<br />A POSSIBILITY.</span><p>Every good place<br />starts with <em>an idea.</em></p></div><div className="elsewhere-making-copy"><p className="elsewhere-eyebrow">HOW WE GET THERE</p><h2 id="elsewhere-making-title">From a feeling<br />to <em>something real.</em></h2><div className="elsewhere-chapters" role="tablist" aria-label="The creative journey">{chapters.map((item, index) => <button type="button" key={item.title} id={`elsewhere-tab-${index}`} role="tab" aria-selected={chapter === index} aria-controls="elsewhere-chapter-panel" tabIndex={chapter === index ? 0 : -1} ref={node => { chapterTabs.current[index] = node; }} onClick={() => setChapter(index)} onKeyDown={event => { let next; if (event.key === 'ArrowRight') next = (index + 1) % chapters.length; if (event.key === 'ArrowLeft') next = (index - 1 + chapters.length) % chapters.length; if (event.key === 'Home') next = 0; if (event.key === 'End') next = chapters.length - 1; if (next !== undefined) { event.preventDefault(); setChapter(next); chapterTabs.current[next]?.focus(); } }}><span>0{index + 1}</span>{item.title}</button>)}</div><div id="elsewhere-chapter-panel" className="elsewhere-chapter-panel" role="tabpanel" aria-labelledby={`elsewhere-tab-${chapter}`} tabIndex={0}><span>{chapters[chapter].label}</span><p>{chapters[chapter].text}</p></div><a href="https://t.me/almazbisenbaev" target="_blank" rel="noreferrer" className="elsewhere-text-link">Tell me what you’re imagining <span>↗</span></a></div></section>
    </main>
    <footer className="elsewhere-footer"><span className="elsewhere-eyebrow">AN INVITATION TO MAKE SOMETHING DIFFERENT</span><a className="elsewhere-footer-title" href="https://t.me/almazbisenbaev" target="_blank" rel="noreferrer">Let’s go<br /><em>somewhere new.</em><span aria-hidden="true">↗</span></a><div className="elsewhere-footer-bottom"><a className="elsewhere-wordmark" href="#elsewhere-top">elsewhere<span>BY ALMAZ</span></a><span>BUILT WITH CARE. © {new Date().getFullYear()}</span><nav aria-label="Explore concepts">{[2,3,4,5,6].map(n => <a href={`/concept-${n}`} key={n}>0{n}</a>)}</nav><a href="#elsewhere-top">BACK TO THE BEGINNING ↑</a></div></footer>
  </div>;
}
