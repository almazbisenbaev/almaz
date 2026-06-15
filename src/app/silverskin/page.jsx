import React from "react";
import { ExternalLink } from "lucide-react";
import Button from "@/components/button/button";
import ImageCarousel from "@/components/image-carousel/image-carousel";
import ImageMasonryGallery from "@/components/image-masonry-gallery/image-masonry-gallery";

const screenshots = [
  {
    src: "/images/silverskin-1.webp",
    alt: "Screenshot",
  },
  {
    src: "/images/silverskin-2.webp",
    alt: "Screenshot",
  },
  {
    src: "/images/silverskin-3.webp",
    alt: "Screenshot",
  },
  {
    src: "/images/silverskin-4.webp",
    alt: "Screenshot",
  },
  {
    src: "/images/silverskin-5.webp",
    alt: "Screenshot",
  },
  {
    src: "/images/silverskin-6.webp",
    alt: "Screenshot",
  },
];

export default function PageSilverskin() {
  return (
    <>

      <div className="container px-5 py-12 md:pt-24">

        <div className="overflow-hidden border border-black/10 rounded-sm mb-24">
          <video 
            src="/videos/silverskin-home.webm" 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-auto block"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 lg:gap-24">

          <div>
            <h1 className="text-5xl font-bold mb-10 tracking-tight text-neutral-900">Silverskin Coffee Roasters</h1>
            <div className="text-lg text-neutral-600 mb-6 leading-tight">WordPress website for Silverskin Coffee Roasters</div>
            <div className="text-lg text-neutral-500 leading-tight">
              <span className="font-semibold">Skills:</span> HTML, CSS, JavaScript, PHP, WordPress, WooCommerce
            </div>
            <div className="mt-12">
              <Button 
                href="https://silverskincoffee.ie/" 
                variant="black"
                className="flex items-center gap-2 h-12 px-6"
              >
                Visit Live Website
                <ExternalLink size={18} />
              </Button>
            </div>
          </div>

          <div>

            {/* <div className="container pb-24">
              <ImageCarousel images={screenshots} />
            </div> */}

            <section className="">
              <ImageMasonryGallery images={screenshots} />
            </section>

            {/* 
              <div>Main screenshot or video</div>
              <div>Tech stack</div>
              <div>Offer (work with me if you want this and htis)</div> 
            */}

          </div>

        </div>

      </div>

    </>
  );
}