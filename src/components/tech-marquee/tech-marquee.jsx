"use client";

import React from 'react';

import IconWp from '@/assets/images/icon-wp.svg';
import IconReact from '@/assets/images/icon-react.svg';
import IconNext from '@/assets/images/icon-next.svg';
import IconNode from '@/assets/images/icon-node.svg';
import IconFigma from '@/assets/images/icon-figma.svg';
import IconJs from '@/assets/images/icon-js.svg';
import IconPhp from '@/assets/images/icon-php.svg';
import IconSupabase from '@/assets/images/icon-supabase.svg';
import useScrollSkew from '@/lib/use-scroll-skew';

// The labels render at 20px/600 — below WCAG's "large text" bar, so they need
// the full 4.5:1 against the chip's `color` composited over the page's #FFFAF5.
// Three of these sat under that and have been darkened the minimum needed:
// WordPress 4.36 -> 4.84, React 4.23 -> 5.17, Supabase 2.69 -> 4.85.
const items = [
  { name: 'WordPress', icon: IconWp, color: '#0671BE22', textColor: '#1E6A8C' },
  { name: 'JavaScript', icon: IconJs, color: '#EFD81C33', textColor: '#000' },
  { name: 'React', icon: IconReact, color: '#5ED3F333', textColor: '#056C89' },
  { name: 'Next.js', icon: IconNext, color: '#00000011', textColor: '#000' },
  { name: 'Supabase', icon: IconSupabase, color: '#3CC88B33', textColor: '#167350' },
  // Heads up if these are re-enabled: white on these backgrounds is 3.99:1
  // (PHP) and 3.66:1 (Node.js) — both under AA. Darken the chip colour first.
  // { name: 'PHP', icon: IconPhp, color: '#777BB3', textColor: '#fff' },
  // { name: 'Node.js', icon: IconNode, color: '#339933', textColor: '#fff' },
  { name: 'Figma', icon: IconFigma, color: '#EB4C1C33', textColor: '#000' },
];

export default function TechMarquee() {
  const skewRef = useScrollSkew({ maxSkew: 2.25, velocityDivisor: 540 });

  return (
    <div ref={skewRef} className="tech-marquee-wrapper tech-marquee-skew">
      <div className="tech-marquee">

        <div className="tech-marquee__group">
          {items.map((item, index) => (
            <div 
                key={`item-${index}`} 
                className="tech-marquee-item"
                style={{ backgroundColor: item.color, color: item.textColor || '#000' }}
            >
              <item.icon className="tech-icon" />
              <div className='pb-0.5'>{item.name}</div>
            </div>
          ))}
        </div>

        <div aria-hidden="true" className="tech-marquee__group">
          {items.map((item, index) => (
            <div 
                key={`item-dup-${index}`} 
                className="tech-marquee-item"
                style={{ backgroundColor: item.color, color: item.textColor || '#000' }}
            >
              <item.icon className="tech-icon" />
              <div className='pb-0.5'>{item.name}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
