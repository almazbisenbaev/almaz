'use client';

import useEmblaCarousel from 'embla-carousel-react';

import "./pics-carousel.css";

export default function PicsCarousel() {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: false,
    slidesToScroll: 'auto',
    align: 'start',
  });

  return (
    <div className="embla pics-carousel" ref={emblaRef}>
      <div className="embla__container flex gap-4 sm:gap-8">

        <div className="embla__slide pics-carousel-slide flex-shrink-0">
          <img 
            src="/images/portfolio/funky-ramen-1.jpg"
            width={960}
            height={540}
            alt=""
            className="border border-black/10 rounded-lg"
          />
        </div>

        <div className="embla__slide pics-carousel-slide flex-shrink-0">
          <img 
            src="/images/portfolio/funky-ramen-2.jpg"
            width={960}
            height={540}
            alt=""
            className="border border-black/10 rounded-lg"
          />
        </div>

        <div className="embla__slide pics-carousel-slide flex-shrink-0">
          <img 
            src="/images/portfolio/funky-ramen-3.jpg"
            width={960}
            height={540}
            alt=""
            className="border border-black/10 rounded-lg"
          />
        </div>

        <div className="embla__slide pics-carousel-slide flex-shrink-0">
          <img 
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
