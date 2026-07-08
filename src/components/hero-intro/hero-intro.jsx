"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import useScrollSkew from '@/lib/use-scroll-skew';
import RotatingSphere from '@/components/rotating-sphere/rotating-sphere';

export default function HeroIntro() {
  const sphereOverscan = 12;
  const skewRef = useScrollSkew({ maxSkew: 3, velocityDivisor: 500 });
  const containerRef = useRef(null);
  const pressTimeoutRef = useRef(null);
  const toggleTimeoutRef = useRef(null);
  const [isSphereVisible, setIsSphereVisible] = useState(false);
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
              <div
                className="absolute z-10"
                style={{
                  width: `${sphereBounds.width}px`,
                  height: `${sphereBounds.height}px`,
                  left: `${sphereBounds.left}px`,
                  top: `${sphereBounds.top}px`,
                  opacity: isSphereVisible ? 1 : 0,
                  transform: isSphereVisible ? 'scale(1)' : 'scale(0.5)',
                  transition: 'opacity 300ms ease-out, transform 500ms cubic-bezier(0.175, 0.885, 0.32, 1.5)',
                  pointerEvents: isSphereVisible ? 'auto' : 'none',
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  runPressAction(() => setIsSphereVisible(false));
                }}
              >
                <RotatingSphere width={sphereBounds.width} height={sphereBounds.height} />
              </div>
            </div>
            <span> a&nbsp;Full-Stack Web Developer</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
