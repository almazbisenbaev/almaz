'use client';

import useEmblaCarousel from 'embla-carousel-react';

export default function Carousel() {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: false,
    slidesToScroll: 'auto',
    align: 'start',
  });

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container flex gap-10">
        <div className="embla__slide bg-gray-200 rounded-xl h-[400px] w-64 flex-shrink-0"></div>
        <div className="embla__slide bg-gray-200 rounded-xl h-[400px] w-[1000px] flex-shrink-0"></div>
        <div className="embla__slide bg-gray-200 rounded-xl h-[400px] w-[500px] flex-shrink-0"></div>
      </div>
    </div>
  );
}
