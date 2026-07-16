'use client';

import Image from 'next/image';
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

        <div className="embla__slide flex-shrink-0">
          <Image 
            src="/images/portfolio/funky-ramen-1.jpg"
            width={960}
            height={540}
            alt=""
            className="border border-black/10 rounded-lg"
          />
        </div>

        <div className="embla__slide flex-shrink-0">
          <Image 
            src="/images/portfolio/funky-ramen-2.jpg"
            width={960}
            height={540}
            alt=""
            className="border border-black/10 rounded-lg"
          />
        </div>

        <div className="embla__slide flex-shrink-0">
          <Image 
            src="/images/portfolio/funky-ramen-3.jpg"
            width={960}
            height={540}
            alt=""
            className="border border-black/10 rounded-lg"
          />
        </div>

        <div className="embla__slide flex-shrink-0">
          <Image 
            src="/images/portfolio/funky-ramen-4.jpg"
            width={258}
            height={540}
            alt=""
            className="border border-black/10 rounded-lg"
          />
        </div>

      </div>
    </div>
  );
}
