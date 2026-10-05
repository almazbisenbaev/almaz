'use client';
import { useEffect, useRef } from 'react';

const colors = [[73, 159, 255], [181, 108, 255], [255, 123, 75]];

export default function Field({ frequency, paused }) {
  const canvasRef = useRef(null);
  const controlRef = useRef({ frequency, paused });
  const updateRef = useRef(null);
  useEffect(() => {
    controlRef.current = { frequency, paused };
    updateRef.current?.();
  }, [frequency, paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const parent = canvas.parentElement;
    let width = 0, height = 0, time = 0, last = 0, frame = 0;
    let active = true;
    let pointerX = 0, pointerY = 0;
    const points = Array.from({ length: 1680 }, (_, index) => {
      const u = (index % 140) / 140 * Math.PI * 2;
      const v = Math.floor(index / 140) / 12 * Math.PI * 2;
      return { u, v, size: .45 + ((index * 13) % 17) / 17 };
    });
    const project = (u, v) => {
      const wave = .055 * Math.sin(u * 5 + time * .4);
      const r = 1.55 + (.5 + wave) * Math.cos(v);
      const x = r * Math.cos(u), y = r * Math.sin(u), z = .5 * Math.sin(v);
      const ax = 1.05 + pointerY * .14, ay = -.35 + pointerX * .2;
      const y1 = y * Math.cos(ax) - z * Math.sin(ax);
      const z1 = y * Math.sin(ax) + z * Math.cos(ax);
      const x2 = x * Math.cos(ay) + z1 * Math.sin(ay);
      const z2 = -x * Math.sin(ay) + z1 * Math.cos(ay);
      const rotation = -.5 + Math.sin(time * .09) * .2;
      const x3 = x2 * Math.cos(rotation) - y1 * Math.sin(rotation);
      const y3 = x2 * Math.sin(rotation) + y1 * Math.cos(rotation);
      const perspective = 4.4 / (4.4 - z2);
      const scale = Math.min(width * (width < 700 ? .25 : .205), height * .36);
      return { x: width * (width < 700 ? .55 : .69) + x3 * scale * perspective, y: height * (width < 700 ? .43 : .5) + y3 * scale * perspective, z: z2, p: perspective };
    };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      const [r, g, b] = colors[controlRef.current.frequency];
      const centerX = width * (width < 700 ? .55 : .69);
      const centerY = height * (width < 700 ? .43 : .5);
      const glow = context.createRadialGradient(centerX, centerY, 10, centerX, centerY, Math.min(width * .48, height * .6));
      glow.addColorStop(0, `rgba(${r},${g},${b},.18)`);
      glow.addColorStop(.6, `rgba(${r},${g},${b},.055)`);
      glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      for (let ring = 0; ring < 12; ring++) {
        context.beginPath();
        for (let step = 0; step <= 160; step++) {
          const point = project(step / 160 * Math.PI * 2 + time * .05, ring / 12 * Math.PI * 2);
          if (step === 0) context.moveTo(point.x, point.y); else context.lineTo(point.x, point.y);
        }
        context.strokeStyle = `rgba(${r},${g},${b},${ring % 3 === 0 ? .24 : .09})`;
        context.lineWidth = .7;
        context.stroke();
      }
      for (const point of points) {
        const p = project(point.u + time * .07, point.v + time * .08);
        const alpha = Math.max(.16, Math.min(.95, (p.z + 2.2) / 4));
        context.fillStyle = `rgba(${r + (255-r)*.5},${g + (255-g)*.5},${b + (255-b)*.5},${alpha})`;
        context.beginPath();
        context.arc(p.x, p.y, point.size * p.p, 0, Math.PI * 2);
        context.fill();
      }
    };
    const tick = (now) => {
      frame = 0;
      if (!active || document.hidden) { last = 0; return; }
      const delta = last ? Math.min(now - last, 50) : 0;
      if (!last || delta >= 30) {
        if (!reduced.matches && !controlRef.current.paused) time += delta / 1000;
        draw();
        last = now;
      }
      if (!reduced.matches && !controlRef.current.paused) frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (active && !document.hidden) {
        draw();
        if (!frame && !reduced.matches && !controlRef.current.paused) frame = requestAnimationFrame(tick);
      }
    };
    updateRef.current = start;
    const resize = () => {
      width = parent.clientWidth; height = parent.clientHeight;
      const dpr = Math.min(devicePixelRatio, 1.5);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      start();
    };
    const move = (event) => {
      if (reduced.matches || controlRef.current.paused) return;
      const bounds = canvas.getBoundingClientRect();
      pointerX = (event.clientX - bounds.left) / width - .5;
      pointerY = (event.clientY - bounds.top) / height - .5;
    };
    const leave = () => { pointerX = 0; pointerY = 0; };
    const resizeObserver = new ResizeObserver(resize);
    const observer = new IntersectionObserver(([entry]) => { active = entry.isIntersecting; start(); });
    resizeObserver.observe(parent); observer.observe(canvas);
    parent.addEventListener('pointermove', move);
    parent.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', start);
    reduced.addEventListener('change', start);
    resize();
    return () => {
      cancelAnimationFrame(frame); updateRef.current = null;
      resizeObserver.disconnect(); observer.disconnect();
      parent.removeEventListener('pointermove', move); parent.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', start); reduced.removeEventListener('change', start);
    };
  }, []);
  return <canvas ref={canvasRef} className="signal-field" aria-hidden="true" />;
}
