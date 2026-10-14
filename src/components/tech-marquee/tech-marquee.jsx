"use client";

import { useEffect, useRef } from 'react';

import IconFigma from '@/assets/images/icon-figma.svg';
import IconFramer from '@/assets/images/icon-framer.svg';
import IconJs from '@/assets/images/icon-js.svg';
import IconNext from '@/assets/images/icon-next.svg';
import IconReact from '@/assets/images/icon-react.svg';
import IconSupabase from '@/assets/images/icon-supabase.svg';
import IconWebflow from '@/assets/images/icon-webflow.svg';
import IconWp from '@/assets/images/icon-wp.svg';
import useScrollSkew from '@/hooks/use-scroll-skew';

// Labels render at 20px/600 — below WCAG's "large text" bar, so each needs the
// full 4.5:1 against its chip composited over the page's #FFFAF5. Several brand
// colours do not reach that on their own and carry a darkened `textColor`
// instead (WordPress 4.84, React 5.17, Supabase 4.85, Webflow 5.51). Anything
// added here has to clear 4.5:1 the same way.
const TECHNOLOGIES = [
  { name: 'WordPress', icon: IconWp, chipColor: '#0671BE22', textColor: '#1E6A8C' },
  { name: 'JavaScript', icon: IconJs, chipColor: '#EFD81C33', textColor: '#000' },
  { name: 'React', icon: IconReact, chipColor: '#5ED3F333', textColor: '#056C89' },
  { name: 'Webflow', icon: IconWebflow, chipColor: '#146EF522', textColor: '#0F55BF' },
  { name: 'Next.js', icon: IconNext, chipColor: '#00000011', textColor: '#000' },
  { name: 'Supabase', icon: IconSupabase, chipColor: '#3CC88B33', textColor: '#167350' },
  { name: 'Figma', icon: IconFigma, chipColor: '#EB4C1C33', textColor: '#000' },
  { name: 'Framer', icon: IconFramer, chipColor: '#00000011', textColor: '#000' },
];

const MarqueeGroup = ({ isDuplicate = false }) => (
  <div className="tech-marquee__group" aria-hidden={isDuplicate || undefined}>
    {TECHNOLOGIES.map(({ name, icon: Icon, chipColor, textColor }) => (
      <div
        key={name}
        className="tech-marquee-item"
        style={{ backgroundColor: chipColor, color: textColor }}
      >
        <Icon className="tech-icon" />
        <div className="pb-0.5">{name}</div>
      </div>
    ))}
  </div>
);

export default function TechMarquee() {
  const skewRef = useScrollSkew({ maxSkew: 2.25, velocityDivisor: 540 });
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId;
    let playbackRate = 1;
    let isHovered = window.matchMedia('(hover: hover)').matches && marquee.matches(':hover');

    const changeSpeed = () => {
      window.cancelAnimationFrame(frameId);

      const animations = marquee.getAnimations({ subtree: true })
        .filter((animation) => animation.animationName === 'tech-scroll-x');
      const targetRate = isHovered && !reducedMotion.matches ? 0.2 : 1;

      // Adjust both groups together without changing their position in the loop.
      const setRate = (rate) => {
        playbackRate = rate;
        animations.forEach((animation) => animation.updatePlaybackRate(rate));
      };

      if (reducedMotion.matches) {
        setRate(1);
        return;
      }

      const initialRate = playbackRate;
      const startedAt = performance.now();
      const duration = isHovered ? 650 : 900;

      const tick = (timestamp) => {
        const progress = Math.min((timestamp - startedAt) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setRate(initialRate + (targetRate - initialRate) * eased);

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick);
        }
      };

      frameId = window.requestAnimationFrame(tick);
    };

    const handlePointerEnter = (event) => {
      if (event.pointerType === 'touch') return;
      isHovered = true;
      changeSpeed();
    };

    const handlePointerLeave = () => {
      isHovered = false;
      changeSpeed();
    };

    marquee.addEventListener('pointerenter', handlePointerEnter);
    marquee.addEventListener('pointerleave', handlePointerLeave);
    marquee.addEventListener('pointercancel', handlePointerLeave);
    reducedMotion.addEventListener('change', changeSpeed);
    if (isHovered) changeSpeed();

    return () => {
      window.cancelAnimationFrame(frameId);
      marquee.removeEventListener('pointerenter', handlePointerEnter);
      marquee.removeEventListener('pointerleave', handlePointerLeave);
      marquee.removeEventListener('pointercancel', handlePointerLeave);
      reducedMotion.removeEventListener('change', changeSpeed);
      marquee.getAnimations({ subtree: true })
        .filter((animation) => animation.animationName === 'tech-scroll-x')
        .forEach((animation) => animation.updatePlaybackRate(1));
    };
  }, []);

  return (
    <div ref={skewRef} className="tech-marquee-wrapper tech-marquee-skew">
      {/* Two identical groups scroll as one loop: when the first has travelled
          its full width the second sits exactly where it started, so the strip
          repeats without a visible seam. Only the first is announced. */}
      <div ref={marqueeRef} className="tech-marquee">
        <MarqueeGroup />
        <MarqueeGroup isDuplicate />
      </div>
    </div>
  );
}
