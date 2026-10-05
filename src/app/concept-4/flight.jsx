'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
const transmissions = [
  { title: 'Funky Ramen', image: '/images/portfolio/funky-ramen-1.jpg', line: 'Culture, with a digital pulse.', href: 'https://funky-ramen.de', tag: 'HOSPITALITY / WORDPRESS' },
  { title: 'Monitask', image: '/portfolio/monitask.jpg', line: 'A platform with room to grow.', href: 'https://monitask.com', tag: 'SOFTWARE / AUTOMATION' },
  { title: 'Polyglossa', image: '/images/project-polyglossa.jpg', line: 'A new language. A new connection.', href: 'https://polyglossa-beta.vercel.app', tag: 'PERSONAL PROJECT / PRODUCT' },
];
export default function FlightGallery() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  useEffect(() => {
    const section = sectionRef.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const cards = [...section.querySelectorAll('.signal-flight-card')];
    let frame = 0;
    const draw = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height - innerHeight)));
      section.style.setProperty('--flight', progress);
      const current = Math.round(progress * 2);
      if (current !== activeRef.current) { activeRef.current = current; setActive(current); }
      cards.forEach((card, i) => {
        const slot = i - progress * 2;
        card.style.setProperty('--slot', slot);
        card.style.setProperty('--distance', Math.abs(slot));
        card.inert = !reduced.matches && Math.abs(slot) > .6;
      });
    };
    const update = () => { if (!frame) frame = requestAnimationFrame(draw); };
    window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update); reduced.addEventListener('change', update); update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); reduced.removeEventListener('change', update); };
  }, []);
  const navigate = i => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sectionRef.current.querySelectorAll('.signal-flight-card')[i]?.scrollIntoView({ block: 'center', behavior: 'instant' });
      return;
    }
    const bounds = sectionRef.current.getBoundingClientRect();
    window.scrollTo({ top: scrollY + bounds.top + (bounds.height - innerHeight) * i / 2, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return <section className="signal-flight" ref={sectionRef} aria-label="Scroll through three project dimensions"><div className="signal-flight-stage"><div className="signal-flight-grid" aria-hidden="true" /><div className="signal-flight-hud"><span>PROJECT SPACE / ALMAZ</span><span>SCROLL TO TRAVEL ↓</span></div><div className="signal-flight-label" aria-hidden="true">TRANSMISSION<br /><b>0{active + 1}</b></div><div className="signal-flight-world">{transmissions.map((item, i) => <a className="signal-flight-card" href={item.href} target="_blank" rel="noreferrer" key={item.title} style={{ '--slot': i, '--distance': i }}><div className="signal-flight-card-head"><span>{item.tag}</span><span>0{i + 1} / 03</span></div><div className="signal-flight-image"><Image src={item.image} alt={`${item.title} website preview`} fill sizes="(max-width: 760px) 90vw, 65vw" /></div><div className="signal-flight-card-foot"><div><h3>{item.title}</h3><p>{item.line}</p></div><span>Explore ↗</span></div></a>)}</div><nav className="signal-flight-nav" aria-label="Jump to project">{transmissions.map((item, i) => <button type="button" key={item.title} aria-pressed={active === i} onClick={() => navigate(i)}><span>0{i + 1}</span>{item.title}</button>)}</nav><div className="signal-flight-progress" aria-hidden="true" /></div></section>;
}
