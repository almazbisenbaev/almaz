"use client";

import { useEffect, useRef } from 'react';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function useScrollSkew({
  maxSkew = 7,
  velocityDivisor = 300,
  resetDelay = 140,
} = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || typeof window === 'undefined') {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.style.setProperty('--scroll-skew', '0deg');
      return undefined;
    }

    let frameId = null;
    let resetTimer = null;
    let lastScrollY = window.scrollY;
    let lastTimestamp = performance.now();

    const setSkew = (value) => {
      element.style.setProperty('--scroll-skew', `${value.toFixed(3)}deg`);
    };

    const updateSkew = () => {
      const currentScrollY = window.scrollY;
      const currentTimestamp = performance.now();
      const deltaY = currentScrollY - lastScrollY;
      const deltaTime = Math.max(currentTimestamp - lastTimestamp, 16);
      const pixelsPerSecond = (deltaY / deltaTime) * 1000;
      const nextSkew = clamp(pixelsPerSecond / velocityDivisor, -maxSkew, maxSkew);

      setSkew(nextSkew);

      lastScrollY = currentScrollY;
      lastTimestamp = currentTimestamp;
      frameId = null;

      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        setSkew(0);
      }, resetDelay);
    };

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateSkew);
    };

    setSkew(0);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.clearTimeout(resetTimer);
      element.style.setProperty('--scroll-skew', '0deg');
    };
  }, [maxSkew, resetDelay, velocityDivisor]);

  return elementRef;
}