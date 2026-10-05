'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export function PaperInstallation() {
  const [twist, setTwist] = useState(6);
  return <div className="quiet-installation"><div className="quiet-paper-scene" aria-hidden="true"><div className="quiet-paper-stack" style={{ '--paper-twist': twist }}>{Array.from({ length: 32 }, (_, i) => <i key={i} style={{ '--sheet': i }} />)}</div><div className="quiet-paper-shadow" /></div><div className="quiet-installation-caption"><span>Study 001 — Form, without excess.</span><span>32 layers. One idea.</span></div><label className="quiet-twist">A different perspective<input aria-label="Sculpture twist" type="range" min="0" max="12" step=".1" value={twist} onChange={e => setTwist(Number(e.target.value))} /><span aria-hidden="true">↔</span></label></div>;
}
export function ExpandingGallery() {
  const ref = useRef(null);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    const draw = () => {
      frame = 0;
      const rect = ref.current.getBoundingClientRect();
      const progress = reduced.matches ? 1 : Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - innerHeight)));
      ref.current.style.setProperty('--quiet-open', progress);
    };
    const update = () => { if (!frame) frame = requestAnimationFrame(draw); };
    window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update); reduced.addEventListener('change', update); draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); reduced.removeEventListener('change', update); };
  }, []);
  return <section className="quiet-expansion" ref={ref} aria-label="A closer look at Silverskin Coffee"><div className="quiet-expansion-stage"><div className="quiet-expansion-overline"><span>A little space.</span><span>A different point of view.</span></div><a href="https://silverskincoffee.ie" target="_blank" rel="noreferrer" className="quiet-expansion-window"><div className="quiet-expansion-screen"><Image src="/images/silverskin-1.webp" alt="Silverskin Coffee, an e-commerce website for an independent Dublin roaster" fill sizes="100vw" /></div><div className="quiet-expansion-text"><span>SELECTED IMPRESSION / 01</span><h2>Nothing<br />unnecessary.</h2><span>Silverskin Coffee ↗</span></div></a><span className="quiet-expansion-foot">DESIGN IS ALSO WHAT YOU LEAVE OUT.</span></div></section>;
}
