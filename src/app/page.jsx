import React from "react";
import Image from "next/image";

import TechMarquee from '@/components/tech-marquee/tech-marquee';
import HeroIntro from '@/components/hero-intro/hero-intro';
import Button from '@/components/button/button';
import ReviewsSection from '@/components/reviews-section/reviews-section';
import PicsCarousel from '@/components/carousel/pics-carousel';
import { ChevronRight } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const silverskinCoffeeImages = [
  { src: "/images/portfolio/funky-ramen-1.jpg", width: 960, height: 540 },
  { src: "/images/portfolio/funky-ramen-2.jpg", width: 960, height: 540 },
  { src: "/images/portfolio/funky-ramen-3.jpg", width: 960, height: 540 },
  { src: "/images/portfolio/funky-ramen-4.jpg", width: 258, height: 540 },
];

const muafakturImages = [
  { src: "/images/portfolio/funky-ramen-1.jpg", width: 960, height: 540 },
  { src: "/images/portfolio/funky-ramen-2.jpg", width: 960, height: 540 },
  { src: "/images/portfolio/funky-ramen-3.jpg", width: 960, height: 540 },
  { src: "/images/portfolio/funky-ramen-4.jpg", width: 258, height: 540 },
];

const monitaskImages = [
  { src: "/images/portfolio/funky-ramen-1.jpg", width: 960, height: 540 },
  { src: "/images/portfolio/funky-ramen-2.jpg", width: 960, height: 540 },
  { src: "/images/portfolio/funky-ramen-3.jpg", width: 960, height: 540 },
  { src: "/images/portfolio/funky-ramen-4.jpg", width: 258, height: 540 },
];

export default function Home() {

  return (
    <div className="home-page">

      <HeroIntro />

      <div className="pb-6 sm:py-20">
        <TechMarquee />
      </div>


      <div className="container px-5 py-20">

        <div className="block-header">
          <div className="block-header-title">Recent projects</div>
        </div>

        <Separator className="my-10" />

        <div>

          <PicsCarousel 
            className="mb-14"
            images={[
              { src: "/images/portfolio/funky-ramen-1.jpg", width: 960, height: 540 },
              { src: "/images/portfolio/funky-ramen-2.jpg", width: 960, height: 540 },
              { src: "/images/portfolio/funky-ramen-3.jpg", width: 960, height: 540 },
              { src: "/images/portfolio/funky-ramen-4.jpg", width: 258, height: 540 },
            ]} 
          />

          <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Funky Ramen</h3>
              <div className="flex gap-2">
                <div className="text-xs">2026</div>
                <div className="text-xs">•</div>
                <div className="text-xs">
                  For{" "}
                  <a target="_blank" rel="noopener noreferrer" href="//mindlind.de" className="hover:underline">
                    Mindlind
                  </a>
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 pt-2">
              <div className="text-sm mb-3">A WordPress website for a café for anime lovers. WordPress.</div>
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="text-xs font-medium">JavaScript</div>
                <div className="text-xs font-medium">GSAP</div>
                <div className="text-xs font-medium">WordPress</div>
              </div>
            </div>
          </div>

          <div className="-ml-1 mt-10">
            <Button href="https://funky-ramen.de">
              Visit Website
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </Button>
          </div>

          <Separator className="my-10" />

        </div>

        <div>


          <PicsCarousel 
            className="mb-14"
            images={[
              { src: "/portfolio/prince-food-1.mp4", width: 960, height: 540, type: 'video' },
              // { src: "/images/portfolio/prince-food-1.png", width: 960, height: 540 },
              // { src: "/images/portfolio/prince-food-2.png", width: 960, height: 540 },
            ]} 
          />

          <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Prince Food</h3>
              <div className="flex gap-2">
                <div className="text-xs">2025</div>
                <div className="text-xs">•</div>
                <div className="text-xs">
                  For{" "}
                  <a target="_blank" rel="noopener noreferrer" href="//mindlind.de" className="hover:underline">
                    Mindlind
                  </a>
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 pt-2">
              <div className="text-sm mb-3">B2B website that sells frozen fruits and vegetables. WordPress.</div>
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="text-xs font-medium">JavaScript</div>
                <div className="text-xs font-medium">GSAP</div>
                <div className="text-xs font-medium">WordPress</div>
              </div>
            </div>
          </div>

          <div className="-ml-1 mt-10">
            <Button href="https://prince-food.de">
              Visit Website
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </Button>
          </div>

          <Separator className="my-10" />

        </div>

        <div>

          <PicsCarousel 
            className="mb-14"
            images={[
              { src: "/portfolio/factorysl-1.mp4", type: 'video' },
              // { src: "/images/portfolio/prince-food-1.png", width: 960, height: 540 },
              // { src: "/images/portfolio/prince-food-2.png", width: 960, height: 540 },
            ]} 
          />

          <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Factory SL</h3>
              <div className="flex gap-2">
                <div className="text-xs">2025</div>
                <div className="text-xs">•</div>
                <div className="text-xs">
                  For{" "}
                  <a target="_blank" rel="noopener noreferrer" href="//mindlind.de" className="hover:underline">
                    Mindlind
                  </a>
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 pt-2">
              <div className="text-sm mb-3">An automotive workshop specializing in high-end vehicle detailing, maintenance, and performance tuning</div>
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="text-xs font-medium">WordPress</div>
                <div className="text-xs font-medium">Frontend</div>
              </div>
            </div>
          </div>

          <div className="-ml-1 mt-10">
            <Button href="https://factorysl.de/">
              Visit Website
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </Button>
          </div>

          <Separator className="my-10" />

        </div>

        {/* <div>

          <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Auto SL</h3>
              <div className="flex gap-2">
                <div className="text-xs">2024</div>
                <div className="text-xs">•</div>
                <div className="text-xs">
                  For{" "}
                  <a target="_blank" rel="noopener noreferrer" href="//mindlind.de" className="hover:underline">
                    Mindlind
                  </a>
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 pt-2">
              <div className="text-sm mb-3">A company that sells expensive cars. Wordpress, a custom plugin for API integration.</div>
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="text-xs font-medium">WordPress</div>
                <div className="text-xs font-medium">Custom Plugin</div>
                <div className="text-xs font-medium">API Integration</div>
              </div>
            </div>
          </div>

          <div className="-ml-1 mt-10">
            <Button href="//autosl.de">
              Visit Website
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </Button>
          </div>

          <Separator className="my-10" />

        </div> */}


        <div>

          {/* <PicsCarousel images={silverskinCoffeeImages} className="mb-14" /> */}

          <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Silverskin Coffee</h3>
              <div className="flex gap-2">
                <div className="text-xs">2024</div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 pt-2">
              <div className="text-sm mb-3">E-Commerce website that sells coffee beans. WordPress, Woocommerce.</div>
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="text-xs font-medium">WordPress</div>
                <div className="text-xs font-medium">WooCommerce</div>
              </div>
            </div>
          </div>

          <div className="-ml-1 mt-10">
            <Button href="/silverskin">
              View Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </Button>
          </div>

          <Separator className="my-10" />

        </div>

        <div>

          {/* <PicsCarousel images={muafakturImages} className="mb-14" /> */}

          <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Muafaktur</h3>
              <div className="flex gap-2">
                <div className="text-xs">2023</div>
                <div className="text-xs">•</div>
                <div className="text-xs">
                  For{" "}
                  <a target="_blank" rel="noopener noreferrer" href="//mindlind.de" className="hover:underline">
                    Mindlind
                  </a>
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 pt-2">
              <div className="text-sm mb-3">WooCommerce website for a company offering beauty products and training courses</div>
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="text-xs font-medium">WooCommerce</div>
                <div className="text-xs font-medium">UX Design</div>
              </div>
            </div>
          </div>

          <div className="-ml-1 mt-10">
            <Button href="//muafaktur.de">
              Visit Website
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </Button>
          </div>

          <Separator className="my-10" />

        </div>

        <div>

          {/* <PicsCarousel images={monitaskImages} className="mb-14" /> */}

          <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Monitask</h3>
              <div className="flex gap-2">
                <div className="text-xs">2021</div>
                <div className="text-xs">•</div>
                <div className="text-xs">
                  For{" "}
                  <a target="_blank" rel="noopener noreferrer" href="//mindlind.de" className="hover:underline">
                    Mindlind
                  </a>
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 pt-2">
              <div className="text-sm mb-3">Multilingual WordPress website with hundreds of pages all generated and updated automatically</div>
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="text-xs font-medium">WordPress</div>
                <div className="text-xs font-medium">Automation</div>
              </div>
            </div>
          </div>

          <div className="-ml-1 mt-10">
            <Button href="//monitask.com">
              Visit Website
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </Button>
          </div>

          <Separator className="my-10" />

        </div>

      </div>


      <div className="section">
        <div className="container px-5">

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
  );
}
