"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import useScrollSkew from '@/lib/use-scroll-skew';

const RotatingSphere = dynamic(
  () => import('@/components/rotating-sphere/rotating-sphere'),
  { ssr: false }
);

export default function HeroIntro() {
  const sphereOverscan = 12;
  const skewRef = useScrollSkew({ maxSkew: 3, velocityDivisor: 500 });
  const containerRef = useRef(null);
  const pressTimeoutRef = useRef(null);
  const toggleTimeoutRef = useRef(null);
  const [isSphereVisible, setIsSphereVisible] = useState(false);
  const [isSphereMounted, setIsSphereMounted] = useState(false);
  const [isSphereReady, setIsSphereReady] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [sphereBounds, setSphereBounds] = useState({
    width: 150,
    height: 150,
    left: 0,
    top: 0,
  });

  const updateSphereBounds = () => {
    if (containerRef.current) {
      const imgElement = containerRef.current.querySelector('img');
      if (imgElement) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const imageRect = imgElement.getBoundingClientRect();

        setSphereBounds({
          width: imageRect.width + sphereOverscan * 2,
          height: imageRect.height + sphereOverscan * 2,
          left: imageRect.left - containerRect.left - sphereOverscan,
          top: imageRect.top - containerRect.top - sphereOverscan,
        });
      }
    }
  };

  const runPressAction = (action) => {
    window.clearTimeout(pressTimeoutRef.current);
    window.clearTimeout(toggleTimeoutRef.current);

    setIsPressed(true);
    toggleTimeoutRef.current = window.setTimeout(() => {
      action();
    }, 70);
    pressTimeoutRef.current = window.setTimeout(() => {
      setIsPressed(false);
    }, 170);
  };

  // Mount the sphere (and its three.js chunk) once the browser is idle after
  // page load, so it is already rendered and textured before the first click.
  useEffect(() => {
    const mountSphere = () => {
      // Warm the browser cache for the texture in parallel with the three.js
      // chunk download, so it is a cache hit by the time the loader requests it
      // and the sphere is ready well before the first click.
      const preload = new window.Image();
      preload.src = '/images/texture.jpg';
      setIsSphereMounted(true);
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(mountSphere, { timeout: 3000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(mountSphere, 1500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    updateSphereBounds();
    window.addEventListener('resize', updateSphereBounds);

    let resizeObserver;
    if (containerRef.current) {
      const imgElement = containerRef.current.querySelector('img');
      if (imgElement) {
        resizeObserver = new ResizeObserver(updateSphereBounds);
        resizeObserver.observe(imgElement);
      }
    }

    return () => {
      window.removeEventListener('resize', updateSphereBounds);
      resizeObserver?.disconnect();
      window.clearTimeout(pressTimeoutRef.current);
      window.clearTimeout(toggleTimeoutRef.current);
    };
  }, []);

  // Shown only when the user asked to see it AND a textured frame is ready.
  const isSphereShown = isSphereVisible && isSphereReady;

  return (
    <div className="intro-wrapper">
      <div className="container px-5">
        <div ref={skewRef} className="intro intro-scroll-skew">
          <h1 className="intro-text relative">
            <span>Hi, I'm Almaz,</span>
            <div
              ref={containerRef}
              className="relative inline-block cursor-pointer intro-me"
              style={{
                transform: isPressed ? 'scale(0.94)' : 'scale(1)',
                transition: 'transform 170ms cubic-bezier(0.22, 1, 0.36, 1)',
                transformOrigin: 'center center',
              }}
              onClick={() => {
                if (!isSphereVisible) {
                  // In case the click beats the idle mount, mount now so the
                  // texture starts loading immediately.
                  setIsSphereMounted(true);
                  runPressAction(() => setIsSphereVisible(true));
                }
              }}
            >
              <Image
                className="intro-me-picture"
                src="/me.jpg"
                width={150}
                height={150}
                alt="Almaz Bisenbaev"
                priority
                onLoad={updateSphereBounds}
              />
              <span className="intro-badge" aria-hidden="true">
                <span className="intro-badge-dot" />
                <span className="intro-badge-label">
                  <span>Available</span>
                </span>
              </span>
              <div
                className="absolute z-10"
                style={{
                  width: `${sphereBounds.width}px`,
                  height: `${sphereBounds.height}px`,
                  left: `${sphereBounds.left}px`,
                  top: `${sphereBounds.top}px`,
                  // Only reveal once the sphere has a real textured frame, so it
                  // never flashes black while the texture is still loading.
                  opacity: isSphereShown ? 1 : 0,
                  transform: isSphereShown ? 'scale(1)' : 'scale(0.5)',
                  transition: 'opacity 300ms ease-out, transform 500ms cubic-bezier(0.175, 0.885, 0.32, 1.5)',
                  pointerEvents: isSphereShown ? 'auto' : 'none',
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  runPressAction(() => setIsSphereVisible(false));
                }}
              >
                {isSphereMounted && (
                  <RotatingSphere
                    width={sphereBounds.width}
                    height={sphereBounds.height}
                    active={isSphereShown}
                    onReady={() => setIsSphereReady(true)}
                  />
                )}
              </div>
            </div>
            <span> a&nbsp;Full-Stack Web Developer</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
