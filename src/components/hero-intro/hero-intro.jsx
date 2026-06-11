"use client";

import Image from 'next/image';

import useScrollSkew from '@/lib/use-scroll-skew';

export default function HeroIntro() {
  const skewRef = useScrollSkew({ maxSkew: 3, velocityDivisor: 500 });

  return (
    <div className="intro-wrapper">
      <div className="container px-5">
        <div ref={skewRef} className="intro intro-scroll-skew">
          <h1 className="intro-text">
            <span>Hi, I’m Almaz,</span>
            <Image
              className="intro-pic"
              src="/me.jpg"
              width={150}
              height={150}
              alt="Almaz Bisenbaev"
              priority
            />
            <span> a&nbsp;Full-Stack Web Developer</span>
          </h1>
        </div>
      </div>
    </div>
  );
}