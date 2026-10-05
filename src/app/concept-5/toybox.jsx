'use client';
import { useEffect, useRef, useState } from 'react';
const palette = ['#f6d85a', '#f2613f', '#a7bce6', '#83b99a', '#f7f0df', '#eea7be'];
const words = ['WHAT IF?', 'MAKE IT.', 'HELLO!', 'NICE.', 'PLAY.', 'WHY NOT?'];
export default function Toybox() {
  const canvasRef = useRef(null);
  const actions = useRef({});
  const options = useRef({ floating: false, paused: false });
  const [floating, setFloating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [count, setCount] = useState(6);
  useEffect(() => { options.current = { floating, paused }; actions.current.wake?.(); }, [floating, paused]);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, frame = 0, last = 0, tickCount = 0;
    let bodies = [], grabbed = null, active = true;
    const create = (i, y) => ({ x: width * (.16 + (i % 3) * .32), y: y ?? height * (.23 + Math.floor(i / 3) * .35), vx: Math.sin(i * 7) * 1.3, vy: 0, r: Math.min(width * .13, 66) + (i % 2) * 6, angle: (i % 3 - 1) * .25, color: palette[i % 6], word: words[i % 6], type: i % 3 });
    const drawBody = body => {
      ctx.save(); ctx.translate(body.x, body.y); ctx.rotate(body.angle);
      ctx.shadowColor = '#241d3b35'; ctx.shadowBlur = 0; ctx.shadowOffsetX = 5; ctx.shadowOffsetY = 7;
      const r = body.r;
      const gradient = ctx.createLinearGradient(-r, -r, r, r); gradient.addColorStop(0, body.color); gradient.addColorStop(1, body.color);
      ctx.fillStyle = gradient; ctx.strokeStyle = '#28251f'; ctx.lineWidth = 1.6;
      ctx.beginPath();
      if (body.type === 0) ctx.arc(0, 0, r, 0, Math.PI * 2);
      else if (body.type === 1) ctx.roundRect(-r, -r * .73, r * 2, r * 1.46, r * .25);
      else { for (let p = 0; p < 24; p++) { const angle = p / 24 * Math.PI * 2; const radius = p % 2 ? r * .8 : r; const x = Math.cos(angle) * radius, y = Math.sin(angle) * radius; if (p === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); } ctx.closePath(); }
      ctx.fill(); ctx.shadowColor = 'transparent'; ctx.stroke();
      ctx.fillStyle = '#28251f';
      if (body.type === 0) {
        ctx.beginPath(); ctx.ellipse(-r * .25, -r * .2, r * .07, r * .14, 0, 0, Math.PI * 2); ctx.ellipse(r * .25, -r * .2, r * .07, r * .14, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(0, -r * .02, r * .42, .15, Math.PI - .15); ctx.stroke();
      } else { ctx.font = `800 ${Math.max(11, r * .25)}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(body.word, 0, 0); }
      ctx.beginPath(); ctx.strokeStyle = '#ffffff77'; ctx.lineWidth = 3; ctx.arc(0, 0, r * .8, 3.7, 4.6); ctx.stroke(); ctx.restore();
    };
    const draw = () => { ctx.clearRect(0, 0, width, height); bodies.forEach(drawBody); };
    const step = dt => {
      tickCount += dt;
      bodies.forEach((b, i) => {
        if (b === grabbed) return;
        b.vy += options.current.floating ? Math.sin(tickCount * .018 + i) * .035 * dt : .2 * dt;
        if (options.current.floating) b.vx += Math.cos(tickCount * .014 + i) * .028 * dt;
        b.vx *= .994; b.vy *= .994; b.x += b.vx * dt; b.y += b.vy * dt; b.angle += b.vx * .003 * dt;
        if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx) * .74; }
        if (b.x > width - b.r) { b.x = width - b.r; b.vx = -Math.abs(b.vx) * .74; }
        if (b.y > height - b.r - 10) { b.y = height - b.r - 10; b.vy = -Math.abs(b.vy) * .68; }
        if (b.y < b.r) { b.y = b.r; b.vy = Math.abs(b.vy) * .6; }
      });
      for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
        const a = bodies[i], b = bodies[j], dx = b.x - a.x, dy = b.y - a.y;
        const distance = Math.hypot(dx, dy) || .1, minimum = (a.r + b.r) * .88;
        if (distance >= minimum) continue;
        const nx = dx / distance, ny = dy / distance, overlap = (minimum - distance) * .5;
        if (a !== grabbed) { a.x -= nx * overlap; a.y -= ny * overlap; }
        if (b !== grabbed) { b.x += nx * overlap; b.y += ny * overlap; }
        const speed = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
        if (speed < 0) { const impulse = speed * .72; if (a !== grabbed) { a.vx += impulse * nx; a.vy += impulse * ny; } if (b !== grabbed) { b.vx -= impulse * nx; b.vy -= impulse * ny; } }
      }
    };
    const tick = now => {
      frame = 0;
      if (!active || document.hidden) { last = 0; return; }
      const elapsed = last ? now - last : 33;
      if (elapsed >= 30) { if (!options.current.paused && !reduced.matches) step(Math.min(elapsed / 16.67, 2.5)); draw(); last = now; }
      if (!options.current.paused && !reduced.matches) frame = requestAnimationFrame(tick);
    };
    const wake = () => { draw(); if (active && !document.hidden && !frame && !reduced.matches && !options.current.paused) frame = requestAnimationFrame(tick); };
    const reset = () => { bodies = Array.from({ length: 6 }, (_, i) => create(i)); setCount(6); wake(); };
    const resize = () => {
      const oldWidth = width, oldHeight = height; width = canvas.clientWidth; height = canvas.clientHeight;
      const dpr = Math.min(devicePixelRatio, 1.5); canvas.width = width * dpr; canvas.height = height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!bodies.length) bodies = Array.from({ length: 6 }, (_, i) => create(i));
      else bodies.forEach(b => { b.x *= width / oldWidth; b.y *= height / oldHeight; b.r = Math.min(width * .13, 66); });
      wake();
    };
    actions.current = { wake, reset, add: () => { if (bodies.length >= 12) return; bodies.push(create(bodies.length, height * .22)); setCount(bodies.length); wake(); }, nudge: () => { bodies.forEach((b, i) => { if (reduced.matches || options.current.paused) { b.x = width * (.18 + (i % 3) * .32); b.y = height * (.2 + Math.floor(i / 3) * .18); } else { b.vy = -7 - i * .25; b.vx = Math.sin(i * 2) * 6; } }); wake(); } };
    const point = e => { const rect = canvas.getBoundingClientRect(); return { x: (e.clientX - rect.left) * width / rect.width, y: (e.clientY - rect.top) * height / rect.height }; };
    const down = e => { if (e.pointerType !== 'mouse') return; const p = point(e); grabbed = [...bodies].reverse().find(b => Math.hypot(p.x - b.x, p.y - b.y) <= b.r); if (grabbed) { canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing'; } };
    const move = e => { if (!grabbed) return; const p = point(e); grabbed.vx = Math.max(-10, Math.min(10, (p.x - grabbed.x) * .25)); grabbed.vy = Math.max(-10, Math.min(10, (p.y - grabbed.y) * .25)); grabbed.x = Math.max(grabbed.r, Math.min(width - grabbed.r, p.x)); grabbed.y = Math.max(grabbed.r, Math.min(height - grabbed.r, p.y)); draw(); };
    const up = () => { grabbed = null; canvas.style.cursor = 'grab'; wake(); };
    const sizeObserver = new ResizeObserver(resize); sizeObserver.observe(canvas);
    const observer = new IntersectionObserver(([entry]) => { active = entry.isIntersecting; wake(); }); observer.observe(canvas);
    canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up); canvas.addEventListener('lostpointercapture', up);
    document.addEventListener('visibilitychange', wake); reduced.addEventListener('change', wake); resize();
    return () => { cancelAnimationFrame(frame); sizeObserver.disconnect(); observer.disconnect(); actions.current = {}; canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerup', up); canvas.removeEventListener('pointercancel', up); canvas.removeEventListener('lostpointercapture', up); document.removeEventListener('visibilitychange', wake); reduced.removeEventListener('change', wake); };
  }, []);
  return <section className="play-toybox"><div className="play-toybox-copy"><span className="play-number">A PERFECTLY GOOD REASON TO PLAY</span><h2>Ideas don’t<br />have to<br /><em>sit still.</em></h2><p>Give them a nudge. Change the rules.<br />A little play can lead somewhere good.</p><div className="play-toybox-commands"><button type="button" onClick={() => actions.current.nudge?.()}>Give them a nudge ↗</button><button type="button" onClick={() => actions.current.add?.()} disabled={count >= 12}>Add an idea +</button></div><span className="play-toybox-count" aria-live="polite">{count} good ideas. Endless possibilities.</span></div><div className="play-toybox-stage"><span className="play-toybox-watermark" aria-hidden="true">WHAT<br />IF?</span><canvas ref={canvasRef} aria-label="Colorful shapes that bounce, collide, and can be dragged with a mouse. Use the buttons to rearrange them with a keyboard." role="img" /><div className="play-toybox-toolbar"><button type="button" aria-pressed={floating} onClick={() => setFloating(!floating)}>{floating ? 'Gravity: off' : 'Gravity: on'}</button><button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Resume' : 'Pause'}</button><button type="button" onClick={() => actions.current.reset?.()}>Reset ↻</button></div></div></section>;
}
