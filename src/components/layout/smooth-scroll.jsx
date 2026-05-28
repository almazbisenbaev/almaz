"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';

const defaultEasing = (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time));

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let frameId = 0;
    let lenisInstance = null;

    const syncLenisLockState = () => {
      if (!lenisInstance) {
        return;
      }

      if (document.documentElement.dataset.scrollLocked === 'true') {
        lenisInstance.stop();
        return;
      }

      lenisInstance.start();
    };

    const destroyLenis = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }

      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      }
    };

    const startLenis = () => {
      if (reducedMotionQuery.matches || lenisInstance) {
        return;
      }

      lenisInstance = new Lenis({
        duration: 1.1,
        easing: defaultEasing,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 0.95,
        touchMultiplier: 1,
        anchors: true,
      });

      const raf = (time) => {
        lenisInstance?.raf(time);
        frameId = window.requestAnimationFrame(raf);
      };

      frameId = window.requestAnimationFrame(raf);
      syncLenisLockState();
    };

    const handleScrollLockChange = () => {
      syncLenisLockState();
    };

    const handlePreferenceChange = (event) => {
      if (event.matches) {
        destroyLenis();
        return;
      }

      startLenis();
    };

    startLenis();
    window.addEventListener('app-scroll-lock-change', handleScrollLockChange);
    reducedMotionQuery.addEventListener('change', handlePreferenceChange);

    return () => {
      window.removeEventListener('app-scroll-lock-change', handleScrollLockChange);
      reducedMotionQuery.removeEventListener('change', handlePreferenceChange);
      destroyLenis();
    };
  }, []);

  return null;
}