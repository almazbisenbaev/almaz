import React from "react";
import { ExternalLink } from "lucide-react";
import Button from "@/components/Button/Button";

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

      {/* <div>Main screenshot or video</div>
      <div>Tech stack</div>
      <div>Screenshots (or carousel)</div>

      <div>Offer (work with me if you want this and htis)</div> */}
    </>
  );
}