"use client";

import { useEffect, useRef } from 'react';
import ArrowUpRight from '@/components/icons/arrow-up-right';

export default function ReviewsMarquee({ children, sourceUrl }) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const togglePausedRef = useRef(null);
  const touchOriginRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = viewport.firstElementChild;
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    let animation;
    let frameId;
    let rate = 1;
    let manuallyPaused = false;
    let hovered = window.matchMedia('(hover: hover)').matches && viewport.matches(':hover');
    let reading = false;

    const changeSpeed = () => {
      window.cancelAnimationFrame(frameId);
      if (!animation) return;

      const target = hovered || manuallyPaused ? 0 : 1;
      const initial = rate;
      const startedAt = performance.now();
      const duration = target === 0 ? 750 : 1100;

      // Change velocity, never duration or position, so even a mid-ease reversal
      // keeps the two copies joined at exactly the same point in the loop.
      const tick = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = progress * progress * (3 - 2 * progress);
        rate = initial + (target - initial) * eased;
        animation.updatePlaybackRate(rate);
        if (progress < 1) frameId = window.requestAnimationFrame(tick);
      };
      frameId = window.requestAnimationFrame(tick);
    };

    const updateMotion = () => {
      window.cancelAnimationFrame(frameId);
      section.dataset.animated = String(motion.matches && !reading);
      viewport.scrollLeft = 0;
      animation = track.getAnimations().find((item) => item.animationName === 'reviews-drift');
      rate = hovered || manuallyPaused ? 0 : 1;
      animation?.updatePlaybackRate(rate);
    };

    const enter = (event) => {
      if (event.pointerType === 'touch') return;
      hovered = true;
      changeSpeed();
    };
    const leave = () => {
      hovered = false;
      changeSpeed();
    };
    const focus = (event) => {
      // Keyboard readers get the complete, native-scrollable set of quotes.
      if (reading || !event.target.matches(':focus-visible')) return;
      reading = true;
      updateMotion();
    };
    const blur = (event) => {
      if (!reading || viewport.contains(event.relatedTarget)) return;
      reading = false;
      updateMotion();
    };

    togglePausedRef.current = () => {
      manuallyPaused = !manuallyPaused;
      changeSpeed();
    };

    // Let the compositor do the steady movement; JS runs only while easing.
    // Suspend the animation when there is nothing on screen to animate.
    const observer = new IntersectionObserver(([entry]) => {
      section.dataset.visible = String(entry.isIntersecting);
    });
    const visibility = () => {
      section.dataset.background = String(document.hidden);
    };

    updateMotion();
    visibility();
    observer.observe(viewport);
    motion.addEventListener('change', updateMotion);
    viewport.addEventListener('pointerenter', enter);
    viewport.addEventListener('pointerleave', leave);
    viewport.addEventListener('pointercancel', leave);
    viewport.addEventListener('focusin', focus);
    viewport.addEventListener('focusout', blur);
    document.addEventListener('visibilitychange', visibility);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      motion.removeEventListener('change', updateMotion);
      viewport.removeEventListener('pointerenter', enter);
      viewport.removeEventListener('pointerleave', leave);
      viewport.removeEventListener('pointercancel', leave);
      viewport.removeEventListener('focusin', focus);
      viewport.removeEventListener('focusout', blur);
      document.removeEventListener('visibilitychange', visibility);
      togglePausedRef.current = null;
      delete section.dataset.animated;
    };
  }, []);

  const startTouch = (event) => {
    if (event.pointerType === 'touch') {
      touchOriginRef.current = event.target.closest('a') ? null : { x: event.clientX, y: event.clientY };
    }
  };

  const finishTouch = (event) => {
    const origin = touchOriginRef.current;
    touchOriginRef.current = null;
    if (event.pointerType !== 'touch' || !origin || sectionRef.current.dataset.animated !== 'true') return;
    // A deliberate tap toggles motion; vertical page scrolling stays native.
    if (Math.hypot(event.clientX - origin.x, event.clientY - origin.y) < 10) togglePausedRef.current?.();
  };

  return (
    <section ref={sectionRef} className="section reviews-section" aria-labelledby="reviews-title">
      <div className="container px-5">
        <div className="block-header reviews-header">
          <h2 id="reviews-title" className="block-header-title">What people say</h2>
          <a className="reviews-source-link" href={sourceUrl} target="_blank" rel="noopener noreferrer">
            All reviews <ArrowUpRight />
          </a>
        </div>
      </div>
      <div
        ref={viewportRef}
        id="reviews-marquee"
        className="reviews-marquee"
        tabIndex={0}
        role="region"
        aria-label="Client reviews"
        onPointerDown={startTouch}
        onPointerUp={finishTouch}
        onPointerCancel={() => { touchOriginRef.current = null; }}
      >
        <div className="reviews-marquee-track">{children}</div>
      </div>
    </section>
  );
}
