'use client';
import { useEffect, useRef, useState } from 'react';
import Field from './field';
import FlightGallery from './flight';

const frequencies = ['Electric blue', 'Ultraviolet', 'Solar flare'];
const offerings = [
  { title: 'Presence', label: 'A WEBSITE THAT FEELS LIKE YOU', text: 'A distinctive home for your business. Built around your story, your audience, and what you want to make happen.', details: 'Brand websites · Portfolios · Landing pages' },
  { title: 'Momentum', label: 'AN IDEA PEOPLE CAN USE', text: 'Take the product out of your head and put it into people’s hands. Thoughtful interfaces connected to a capable foundation.', details: 'Web applications · React · Next.js' },
  { title: 'Connection', label: 'A BETTER WAY TO DO BUSINESS', text: 'Make discovery feel natural, shopping feel easy, and your content feel connected. Every interaction has a reason to be there.', details: 'E-commerce · WordPress · WooCommerce' },
];
export default function Signal() {
  const [frequency, setFrequency] = useState(0);
  const [paused, setPaused] = useState(false);
  const [offering, setOffering] = useState(0);
  const rootRef = useRef(null);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set();
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (!media.matches) {
        const animation = entry.target.animate([{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }], { duration: 800, easing: 'cubic-bezier(.2,.8,.2,1)' });
        animations.add(animation); animation.onfinish = () => animations.delete(animation);
      }
      observer.unobserve(entry.target);
    }), { threshold: .1 });
    rootRef.current.querySelectorAll('[data-signal-reveal]').forEach((element) => observer.observe(element));
    const stop = () => { if (media.matches) animations.forEach((animation) => animation.finish()); };
    media.addEventListener('change', stop);
    return () => { observer.disconnect(); animations.forEach((animation) => animation.cancel()); media.removeEventListener('change', stop); };
  }, []);
  return <div className={`signal signal-frequency-${frequency}`} ref={rootRef}>
    <a className="signal-skip" href="#signal-main">Skip to content</a>
    <header className="signal-header"><a className="signal-logo" href="#signal-top" aria-label="Almaz, back to top">a<span>{'//'}</span></a><span className="signal-header-label">ALMAZ BISENBAEV<br />INDEPENDENT DEVELOPER</span><nav aria-label="Main navigation"><a href="#signal-work">Selected transmissions</a><a href="#signal-contact">Get in touch <span aria-hidden="true">↗</span></a></nav></header>
    <main id="signal-main">
      <section className="signal-hero" id="signal-top" aria-labelledby="signal-title"><Field frequency={frequency} paused={paused} /><div className="signal-hero-content"><div className="signal-eyebrow"><i /> TRANSMITTING FROM KAZAKHSTAN</div><h1 id="signal-title">A different<br /><span>frequency.</span></h1><p>Digital experiences with atmosphere.<br />Made to move people, not just pixels.</p><a className="signal-cta" href="#signal-work">Enter the work <span>↓</span></a></div><div className="signal-orbit-note" aria-hidden="true"><span>FORM / FLOW / FEELING</span><i /><span>IN CONSTANT EXPLORATION</span></div><div className="signal-hero-console"><span>01 — THE SIGNAL</span><div className="signal-spectrum"><span>SPECTRUM</span><button type="button" onClick={() => setFrequency((frequency + 1) % 3)} aria-label={`Change spectrum, current: ${frequencies[frequency]}`}><i />{frequencies[frequency]} <span>↻</span></button></div><button className="signal-motion" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? '▶ Resume field' : 'Ⅱ Pause field'}</button><a href="#signal-work">EXPLORE BELOW ↓</a></div></section>
      <section id="signal-work" className="signal-work signal-section" aria-labelledby="signal-work-title"><div className="signal-section-label"><span>02 / SELECTED TRANSMISSIONS</span><span>REAL PROJECTS. REAL PEOPLE.</span></div><div className="signal-work-heading" data-signal-reveal><h2 id="signal-work-title">Ideas, brought<br /><span>into focus.</span></h2><p>From an expressive restaurant to a growing software business. Different worlds, connected by thoughtful development.</p></div></section>
      <FlightGallery /><section className="signal-practice signal-section" aria-labelledby="signal-practice-title"><div className="signal-section-label"><span>03 / FIND YOUR FREQUENCY</span><span>ONE PARTNER. MANY POSSIBILITIES.</span></div><div className="signal-practice-grid"><h2 id="signal-practice-title">What do you<br />want to <span>set<br /> in motion?</span></h2><div className="signal-offerings"><div className="signal-tabs" role="tablist" aria-label="Ways to work together">{offerings.map((item, index) => <button type="button" role="tab" id={`signal-tab-${index}`} key={item.title} aria-selected={offering === index} aria-controls="signal-offering-panel" tabIndex={offering === index ? 0 : -1} onClick={() => setOffering(index)} onKeyDown={(event) => { let next; if (event.key === 'ArrowRight') next = (index + 1) % 3; if (event.key === 'ArrowLeft') next = (index + 2) % 3; if (event.key === 'Home') next = 0; if (event.key === 'End') next = 2; if (next !== undefined) { event.preventDefault(); setOffering(next); document.getElementById(`signal-tab-${next}`).focus(); } }}>{item.title}</button>)}</div><div className="signal-offering-panel" role="tabpanel" id="signal-offering-panel" aria-labelledby={`signal-tab-${offering}`} tabIndex={0}><span>{offerings[offering].label}</span><p>{offerings[offering].text}</p><small>{offerings[offering].details}</small><a href="https://t.me/almazbisenbaev" target="_blank" rel="noreferrer">Let’s talk about it ↗</a></div></div></div></section>
      <section className="signal-manifesto" data-signal-reveal><span className="signal-manifesto-star" aria-hidden="true">✳</span><p>Technology is the medium.<br /><strong>The feeling is the point.</strong></p><span>DESIGN AWARENESS.<br />DEVELOPMENT DISCIPLINE.</span></section>
    </main>
    <footer id="signal-contact" className="signal-contact signal-section"><div className="signal-section-label"><span>04 / OPEN A CHANNEL</span><span>LET’S FIND OUT WHAT’S POSSIBLE.</span></div><a className="signal-contact-main" href="https://t.me/almazbisenbaev" target="_blank" rel="noreferrer">Let’s make<br /><span>waves.</span><span className="signal-contact-arrow" aria-hidden="true">↗</span></a><div className="signal-footer-bottom"><span>ALMAZ BISENBAEV © {new Date().getFullYear()}</span><a href="https://linkedin.com/in/almazbisenbaev" target="_blank" rel="noreferrer">LINKEDIN ↗</a><nav aria-label="Explore concepts"><span>OTHER FREQUENCIES</span><a href="/concept-2">02</a><a href="/concept-3">03</a><a href="/concept-5">05</a><a href="/concept-6">06</a><a href="/concept-7">07</a></nav><a href="#signal-top">BACK TO TOP ↑</a></div></footer>
  </div>;
}
