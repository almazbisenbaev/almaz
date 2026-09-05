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
  const badgeRef = useRef(null);
  const pressTimeoutRef = useRef(null);
  const toggleTimeoutRef = useRef(null);
  const hasWarmedRef = useRef(false);
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

  // Mounting the sphere pulls in the three.js chunk (~780 KB uncompressed),
  // spins up a WebGL context and builds a 64x64 displaced sphere geometry. That
  // used to happen on requestIdleCallback for *every* visitor, which is a large
  // main-thread bill for an easter egg most people never trigger.
  //
  // Instead, warm it on the first sign the visitor is heading for the avatar —
  // hovering it, tabbing to it, or touching it. On desktop the pointer arrives
  // well before the click, so the sphere is still ready in time; visitors who
  // never reach for it never pay for it at all.
  const warmSphere = () => {
    if (hasWarmedRef.current) return;
    hasWarmedRef.current = true;

    // Fetch the texture alongside the chunk so it is a cache hit by the time
    // the three.js TextureLoader asks for it.
    const preload = new window.Image();
    preload.src = '/images/texture.jpg';
    setIsSphereMounted(true);
  };

  // The badge opens by growing its width from a circle to the full pill, and
  // CSS cannot derive that end width from the text, so measure it into
  // --intro-badge-full. Layout offsets, not rects: the badge is mid-pop at
  // mount and a scale transform would skew every rect it reports.
  useEffect(() => {
    const measureBadge = () => {
      const badge = badgeRef.current;
      const label = badge?.querySelector('.intro-badge-label');
      if (!badge || !label) return;

      const paddingRight = parseFloat(getComputedStyle(badge).paddingRight);
      const full = label.offsetLeft + label.offsetWidth + paddingRight;
      badge.style.setProperty('--intro-badge-full', `${full}px`);
    };

    measureBadge();
    window.addEventListener('resize', measureBadge);
    // Webfont swap changes the label's width.
    document.fonts?.ready.then(measureBadge);

    return () => window.removeEventListener('resize', measureBadge);
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
              className="relative cursor-pointer intro-me"
              // The avatar toggles the sphere, so it is a control and has to be
              // reachable and operable without a mouse.
              role="button"
              tabIndex={0}
              aria-pressed={isSphereShown}
              aria-label={
                isSphereShown
                  ? 'Hide the rotating 3D version of the photo'
                  : 'Show a rotating 3D version of the photo'
              }
              style={{
                transform: isPressed ? 'scale(0.94)' : 'scale(1)',
                transition: 'transform 170ms cubic-bezier(0.22, 1, 0.36, 1)',
                transformOrigin: 'center center',
              }}
              // Intent signals: by the time a pointer has landed on the avatar
              // (or a keyboard user has tabbed to it) the chunk has a head start.
              onPointerEnter={warmSphere}
              onTouchStart={warmSphere}
              onFocus={warmSphere}
              onClick={() => {
                if (!isSphereVisible) {
                  // A click can still beat the warm-up (fast tap, no hover), so
                  // make sure the chunk and texture are requested either way.
                  warmSphere();
                  runPressAction(() => setIsSphereVisible(true));
                }
              }}
              onKeyDown={(event) => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                // Space would otherwise scroll the page.
                event.preventDefault();
                warmSphere();
                runPressAction(() => setIsSphereVisible((visible) => !visible));
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
              <span
                ref={badgeRef}
                className={`intro-badge${isSphereShown ? ' is-hidden' : ''}`}
                aria-hidden="true"
              >
                <span className="intro-badge-dot" />
                <span className="intro-badge-label">Available</span>
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
