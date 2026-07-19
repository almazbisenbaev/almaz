'use client';

import { useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

import "./pics-carousel.css";

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
      />
    </div>
  );
};

const LazyVideo = ({ src, width, height, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative bg-gray-200 border border-black/10 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        onCanPlay={() => setIsLoading(false)}
      />
    </div>
  );
};

export default function PicsCarousel({ images }) {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: false,
    slidesToScroll: 'auto',
    align: 'start',
  });

  return (
    <div className="embla pics-carousel" ref={emblaRef}>
      <div className="embla__container flex gap-4 sm:gap-8">
        {images.map((item, index) => (
          <div key={index} className="embla__slide pics-carousel-slide flex-shrink-0">
            {item.type === 'video' ? (
              <LazyVideo
                src={item.src}
                width={item.width}
                height={item.height}
              />
            ) : (
              <LazyImage
                src={item.src}
                width={item.width}
                height={item.height}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
