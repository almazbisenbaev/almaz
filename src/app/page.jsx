import React from "react";
import Image from "next/image";

import TechMarquee from '@/components/tech-marquee/tech-marquee';
import HeroIntro from '@/components/hero-intro/hero-intro';
import Button from '@/components/button/button';
import ReviewsSection from '@/components/reviews-section/reviews-section';
import PortfolioAccordion from '@/components/portfolio-accordion/portfolio-accordion';
import { ChevronRight } from 'lucide-react';

export default function Home() {

  return (
    <div className="home-page">

        <HeroIntro />

        <div className="pb-6 sm:py-20">
          <TechMarquee />
        </div>

        <div className="px-0 md:px-2">
          <div className="section section-portfolio">
            <div className="container">

              <div className="block-header">
                <div className="block-header-title">Recent works</div>
              </div>

              <PortfolioAccordion />
            </div>
          </div>
        </div>

        <div className="section">
          <div className="container">

            <div className="block-header">
              <div className="block-header-title">Personal projects</div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-3">

              <div className="flex flex-col justify-between bg-white rounded-4xl overflow-hidden">
                <Image
                  className=""
                  src="/images/project-glowy.jpg"
                  alt="Glowy Icons"
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="p-8 md:p-12 pt-2 w-full">
                  <h4 className="font-semibold ff-display text-xl md:text-3xl">Glowy Icons</h4>
                  <div className="text-lg font-medium text-slate-700 mt-2">Colorful and bright vector icons with slight shadows</div>
                  <div className="mt-8">
                    <Button 
                      variant="black"
                      href="https://www.figma.com/community/file/1452663046127877131/glowy-icons-v1-0"
                    >
                        <span>Figma Link</span>
                        <ChevronRight color="white" size={18} />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between bg-white rounded-4xl overflow-hidden">
                <Image
                  className=""
                  src="/images/project-polyglossa.jpg"
                  alt="Polyglossa"
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="p-8 md:p-12 pt-2 w-full">
                  <h4 className="font-semibold ff-display text-xl md:text-3xl">Polyglossa<sup className="text-gray-500 font-normal">β</sup></h4>
                  <div className="text-lg font-medium text-slate-700 mt-2">A messaging app where you talk to AI-friends to practice a language</div>
                  <div className="mt-8">
                    <Button 
                      variant="black"
                      href="https://polyglossa-beta.vercel.app"
                    >
                        <span>Visit website</span>
                        <ChevronRight color="white" size={18} />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between bg-linear-to-b from-indigo-500 to-[#FF163B] text-white rounded-4xl overflow-hidden">
                <div className="px-6 md:px-12 py-12 md:py-24 flex-1 flex items-center justify-center">
                  <div className="custom-rings relative youtube-banner-image">
                    <Image
                      className="rounded-full  "
                      src="/me.jpg"
                      width={150}
                      height={150}
                      alt=""
                      sizes="150px"
                    />
                  </div>
                </div>
                <div className="p-8 md:p-12 pt-2 w-full">
                  <h4 className="font-semibold ff-display text-xl md:text-3xl">Watch me on YouTube</h4>
                  <div className="font-medium text-md mt-2">I talk about webdev & stuff</div>
                  <div className="mt-8">
                    <Button 
                      variant="white"
                      href="https://www.youtube.com/@webdevandstuff"
                    >
                        <span>YouTube Channel</span>
                        <ChevronRight color="black" size={18} />
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


        <ReviewsSection />
    </div>
  )
  ;
}
