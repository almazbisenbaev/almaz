"use client";

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

  return (
    <div ref={skewRef} className="tech-marquee-wrapper tech-marquee-skew">
      {/* Two identical groups scroll as one loop: when the first has travelled
          its full width the second sits exactly where it started, so the strip
          repeats without a visible seam. Only the first is announced. */}
      <div className="tech-marquee">
        <MarqueeGroup />
        <MarqueeGroup isDuplicate />
      </div>
    </div>
  );
}
