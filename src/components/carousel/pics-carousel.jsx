'use client';

import { useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

import "./pics-carousel.css";

const carouselImages = [
  { src: "/images/portfolio/funky-ramen-1.jpg", width: 960, height: 540 },
  { src: "/images/portfolio/funky-ramen-2.jpg", width: 960, height: 540 },
  { src: "/images/portfolio/funky-ramen-3.jpg", width: 960, height: 540 },
  { src: "/images/portfolio/funky-ramen-4.jpg", width: 258, height: 540 },
];

const LazyImage = ({ src, width, height, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative bg-gray-200 border border-black/10 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

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
        {carouselImages.map((image, index) => (
          <div key={index} className="embla__slide pics-carousel-slide flex-shrink-0">
            <LazyImage
              src={image.src}
              width={image.width}
              height={image.height}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
