import React from "react";
import { ExternalLink } from "lucide-react";
import Button from "@/components/button/button";
import ImageMasonryGallery from "@/components/image-masonry-gallery/image-masonry-gallery";
import LazyVideo from "@/components/lazy-video/lazy-video";

const screenshots = [
  {
    src: "/images/silverskin-1.webp",
    alt: "Silverskin Coffee homepage with the hero banner and featured coffee beans",
  },
  {
    src: "/images/silverskin-2.webp",
    alt: "Silverskin Coffee WooCommerce shop page listing coffee bean products",
  },
  {
    src: "/images/silverskin-3.webp",
    alt: "Silverskin Coffee product detail page with grind and weight options",
  },
  {
    src: "/images/silverskin-4.webp",
    alt: "Silverskin Coffee cart and checkout step",
  },
  {
    src: "/images/silverskin-5.webp",
    alt: "Silverskin Coffee about page describing the roastery",
  },
  {
    src: "/images/silverskin-6.webp",
    alt: "Silverskin Coffee wholesale and contact section",
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
            role="img"
            aria-label="Screen recording of the Silverskin Coffee homepage scrolling through its coffee bean shop"
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

            <div className="overflow-hidden border border-black/10 rounded-sm mb-24">
              <LazyVideo
                src="/videos/silverskin-hamburger.webm"
                label="Screen recording of the Silverskin Coffee full-screen navigation menu opening"
                className="w-full h-auto block"
              />
            </div>

            <section className="">
              <ImageMasonryGallery images={screenshots} />
            </section>

          </div>

        </div>

      </div>

    </>
  );
}