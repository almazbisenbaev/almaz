import React from "react";
import { ExternalLink } from "lucide-react";
import Button from "@/components/button/button";
import ImageCarousel from "@/components/image-carousel/image-carousel";
import ImageMasonryGallery from "@/components/image-masonry-gallery/image-masonry-gallery";

const screenshots = [
  {
    src: "/images/silverskin-1.png",
    alt: "Silverskin Coffee Roasters homepage screenshot",
  },
  {
    src: "/images/silverskin-2.png",
    alt: "Silverskin Coffee Roasters coffee product page screenshot",
  },
  {
    src: "/images/silverskin-3.png",
    alt: "Silverskin Coffee Roasters shop listing screenshot",
  },
  {
    src: "/images/silverskin-4.png",
    alt: "Silverskin Coffee Roasters product detail screenshot",
  },
  {
    src: "/images/silverskin-5.png",
    alt: "Silverskin Coffee Roasters content section screenshot",
  },
  {
    src: "/images/silverskin-6.png",
    alt: "Silverskin Coffee Roasters mobile layout screenshot",
  },
  {
    src: "/images/silverskin-7.png",
    alt: "Silverskin Coffee Roasters checkout flow screenshot",
  },
];

export default function PageSilverskin() {
  return (
    <>

      <div className="container py-24">

        <h1 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight text-neutral-900">Silverskin Coffee Roasters</h1>

        <div className="text-2xl md:text-3xl text-neutral-600 mb-6 leading-tight">
          WordPress website development for Silverskin Coffee Roasters
        </div>
        
        <div className="text-lg text-neutral-500">
          <span className="font-semibold text-neutral-800">Skills:</span> HTML, CSS, JavaScript, PHP, WordPress, WooCommerce
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

      <div className="container pb-24">
        <div className="overflow-hidden border border-black/10 rounded-sm">
          <video 
            src="/videos/silverskin-home.webm" 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-auto block"
          />
        </div>
      </div>

      <div className="container pb-24">
        <ImageCarousel images={screenshots} />
      </div>

      <section className="container pb-24">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-5xl">
            Masonry layout
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">
            The same screenshots in a masonry layout with a lightbox, so you can compare it directly against the drag carousel above.
          </p>
        </div>

        <ImageMasonryGallery images={screenshots} />
      </section>

      {/* <div>Main screenshot or video</div>
      <div>Tech stack</div>
      <div>Screenshots (or carousel)</div>

      <div>Offer (work with me if you want this and htis)</div> */}
    </>
  );
}