import React from "react";
import { ExternalLink } from "lucide-react";
import Button from "@/components/button/button";

export default function PageSilverskin() {
  return (
    <>
      <div className="container py-24">
        <h1 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight text-neutral-900">Silverskin Coffee Roasters</h1>

        <div className="mb-12">
          <a 
            target="_blank" 
            href="https://silverskincoffee.ie/" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button className="flex items-center gap-2 h-12 px-6">
              Visit Live Website
              <ExternalLink size={18} />
            </Button>
          </a>
        </div>

        <div className="text-2xl md:text-3xl text-neutral-600 mb-6 font-light leading-tight max-w-3xl">
          WordPress website development for Silverskin Coffee Roasters
        </div>
        
        <div className="text-lg text-neutral-500">
          <span className="font-semibold text-neutral-800">Skills:</span> HTML, CSS, JavaScript, PHP, WordPress, WooCommerce
        </div>
      </div>

      {/* <div>Main screenshot or video</div>
      <div>Tech stack</div>
      <div>Screenshots (or carousel)</div>

      <div>Offer (work with me if you want this and htis)</div> */}
    </>
  );
}