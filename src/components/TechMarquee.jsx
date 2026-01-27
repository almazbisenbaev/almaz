"use client";

import React from 'react';
import './TechMarquee.css';

import IconWp from '@/assets/images/icon-wp.svg';
import IconReact from '@/assets/images/icon-react.svg';
import IconNext from '@/assets/images/icon-next.svg';
import IconNode from '@/assets/images/icon-node.svg';
import IconFigma from '@/assets/images/icon-figma.svg';
import IconJs from '@/assets/images/icon-js.svg';
import IconPhp from '@/assets/images/icon-php.svg';
import IconSupabase from '@/assets/images/icon-supabase.svg';

const items = [
  { name: 'WordPress', icon: IconWp, color: '#0671BE22', textColor: '#207196' },
  { name: 'JavaScript', icon: IconJs, color: '#EFD81C33', textColor: '#000' },
  { name: 'React', icon: IconReact, color: '#5ED3F333', textColor: '#087A9F' },
  { name: 'Next.js', icon: IconNext, color: '#00000011', textColor: '#000' },
  { name: 'Supabase', icon: IconSupabase, color: '#3CC88B33', textColor: '#2BA26C' },
  // { name: 'PHP', icon: IconPhp, color: '#777BB3', textColor: '#fff' },
  // { name: 'Node.js', icon: IconNode, color: '#339933', textColor: '#fff' },
  { name: 'Figma', icon: IconFigma, color: '#EB4C1C33', textColor: '#000' },
];

export default function TechMarquee() {
  return (
    <div className="tech-marquee-wrapper">
      <div className="tech-marquee">
        <div className="tech-marquee__group">
          {items.map((item, index) => (
            <div 
                key={`item-${index}`} 
                className="tech-marquee-item"
                style={{ backgroundColor: item.color, color: item.textColor || '#000' }}
            >
              <item.icon className="tech-icon" width={48} height={48} />
              <span>{item.name}</span>
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
              <item.icon className="tech-icon size-1" />
              <div className='pb-0.5'>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
