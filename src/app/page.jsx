"use client";

import React from "react";
import Image from "next/image";

// import FaceBall from "@/components/face-model"

import IconWp from '@/assets/images/icon-wp.svg'; 
import IconReact from '@/assets/images/icon-react.svg'; 
import IconNext from '@/assets/images/icon-next.svg'; 
import IconNode from '@/assets/images/icon-node.svg'; 
import IconFigma from '@/assets/images/icon-figma.svg'; 

// import EmblaCarousel from '@/components/SideProjectsCarousel';
import LinkCard from '@/components/LinkCard';
import ReviewsSection from '@/components/ReviewsSection';

import { ChevronRight } from 'lucide-react';

export default function Home() {

  // const OPTIONS = {}
  // const SLIDE_COUNT = 5
  // const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <div className="home-page">
      <div>

        <div className="intro-wrapper">
          <div className="container mx-auto px-6">
              <div className="intro">
                <div className="intro-text">
                  <span>Hi, I’m Almaz,</span>
                  {/* The picture must animate somehow as you scroll, or maybe just fade out */}
                  <Image
                    className="intro-pic"
                    src="/me.jpg"
                    width={150}
                    height={150}
                    alt=""
                  />
                  <span> a&nbsp;Full-Stack Web Developer</span>
                </div>

                <div className="intro-logos">
                  <IconWp />
                  <IconReact />
                  <IconNext />
                  <IconNode />
                  <IconFigma />
                  {/* 
                  Express
                  MongoDB
                  JavaScript
                  Git
                  GitHub
                  PostgreSQL
                  Javascript
                  Typescript
                  Python
                  C++
                  React.js
                  Next.js
                  React Native
                  Express.js
                  MongoDB
                  Postgres
                  Prisma
                  Tailwind
                  Docker
                  AWS
                  OpenAI, Gemini, Claude, Prompt Engineering */}

                </div>

              </div>
          </div>
        </div>

        <div className="section">
          <div className="container mx-auto px-6">

            <div className="section-header">
              <h2 className="section-header-title">Recent works</h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-2">

              <div className="">
                <LinkCard 
                  title="silverskincoffee.ie"
                  url="//silverskincoffee.ie"
                  year="2024"
                  description="E-Commerce website that sells coffee beans. WordPress, Woocommerce."
                  category="Development"
                />
              </div>

              <div className="">
                <LinkCard 
                  title="autosl.de"
                  url="//autosl.de"
                  year="2024"
                  description="A company that sells expensive cars. Wordpress, a custom plugin for API intergration."
                  category="UX Design, Development"
                  client="Mindlind"
                  clientUrl="//mindlind.de"
                />
              </div>

              <div className="">
                <LinkCard 
                  title="muafaktur.de"
                  url="//muafaktur.de"
                  year="2023"
                  description="WooCommerce website for a company offering beauty products and training courses"
                  category="UX Design, Development"
                  client="Mindlind"
                  clientUrl="//mindlind.de"
                />
              </div>

              <div className="">
                <LinkCard 
                  title="monitask.com"
                  url="//monitask.com"
                  year="2021"
                  description="Multilingual WordPress website with hundreds of pages all generated and updated automatically"
                  category="Development"
                  client="Mindlind"
                  clientUrl="//mindlind.de"
                />
              </div>
              
            </div>

          </div>
        </div>


        {/* <div className="section">
          <div className="container mx-auto">

            <div className="section-header">
              <h2 className="section-header-title">Client reviews</h2>
            </div>

          </div>
        </div> */}



        <div className="section">
          <div className="container mx-auto px-6">

            <div className="section-header">
              <h2 className="section-header-title">Personal projects</h2>
            </div>

            {/* <div className="projects-grid">

              <div className="project-card">

                <div className="project-card-content">
                  <h4 className="project-card-title">Glowy Icons</h4>
                  <div className="project-card-text">Colorful and bright vector icons with slight shadows</div>
                  <div className="project-card-footer">
                    <a className="button button-secondary" 
                      target="_blank" 
                      href="https://www.figma.com/community/file/1452663046127877131/glowy-icons-v1-0"
                    >
                        <span>Figma Link</span>
                        <ChevronRight color="black" size={18} />
                    </a>
                  </div>
                </div>

                <div className="project-card-pic">
                  <Image
                    className=""
                    src="/images/project-glowy.jpg"
                    alt="Glowy Icons"
                    width={800}
                    height={800}
                  />
                </div>

              </div>

              <div className="project-card">

                <div className="project-card-content">
                  <h4 className="project-card-title">Watch me on YouTube</h4>
                  <div className="project-card-text">I talk about webdev & stuff</div>
                  <div className="project-card-footer">
                    <a className="button button-secondary" 
                      target="_blank" 
                      href="https://www.youtube.com/@webdevandstuff"
                    >
                        <span>YouTube</span>
                        <ChevronRight color="black" size={18} />
                    </a>
                  </div>
                </div>

                <div className="project-card-pic">
                  <Image
                    className=""
                    src="/images/project-glowy.jpg"
                    alt="Glowy Icons"
                    width={800}
                    height={800}
                  />
                </div>

              </div>

            </div> */}

            <div className="grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-2">

              <div className="flex flex-col bg-white rounded-4xl overflow-hidden">
                <Image
                  className=""
                  src="/images/project-glowy.jpg"
                  alt="Glowy Icons"
                  width={800}
                  height={800}
                />
                <div className="p-8 md:p-12 pt-2 w-full">
                  <h4 className="font-semibold ff-display text-xl md:text-3xl">Glowy Icons</h4>
                  <div className="text-md text-slate-800 mt-2">Colorful and bright vector icons with slight shadows</div>
                  <div className="mt-8">
                    <a className="button button-secondary" 
                      target="_blank" 
                      href="https://www.figma.com/community/file/1452663046127877131/glowy-icons-v1-0"
                    >
                        <span>Figma Link</span>
                        <ChevronRight color="black" size={18} />
                    </a>
                  </div>
                </div>
              </div>
{/* bg-[#FF163B] */}
              <div className="flex flex-col justify-between bg-gradient-to-b from-indigo-500 to-[#FF163B] text-white rounded-4xl overflow-hidden">
                <div className="p-12 flex-1 flex items-center justify-center">
                  <div className="custom-rings relative">
                    <Image
                      className="rounded-full  "
                      src="/me.jpg"
                      width={150}
                      height={150}
                      alt=""
                    />
                  </div>
                </div>
                <div className="p-8 md:p-12 pt-2 w-full">
                  <h4 className="font-semibold ff-display text-xl md:text-3xl">Watch me on YouTube</h4>
                  <div className="text-md mt-2">I talk about webdev & stuff</div>
                  <div className="mt-8">
                    <a className="button button-outline-white" 
                      target="_blank" 
                      href="https://www.youtube.com/@webdevandstuff"
                    >
                        <span>YouTube Channel</span>
                        <ChevronRight color="white" size={18} />
                    </a>
                  </div>
                </div>
              </div>

            </div>


            {/* <div>
                <div>
                  <a target="_blank" href="https://mindmaker.vercel.app">Mindmaker</a>
                  <div>NextJS, Supabase</div>
                </div>
                <div>
                  <a target="_blank" href="https://planets-and-stars.vercel.app">Planets and Stars</a>
                  <div>ReactJS</div>
                </div>
                <div>
                  <a target="_blank" href="https://almazbisenbaev.gumroad.com/l/glowy-icons">Glowy Icons</a>
                  <div>Figma</div>
                </div>
                <div>
                  <a target="_blank" href="https://github.com/almazbisenbaev/wp-powertools">WP Power Tools</a>
                  <div>WordPress, PHP</div>
                </div>
                <div>
                  <a target="_blank" href="https://kartuli-abc.vercel.app">Kartuli ABC</a>
                  <div>ReactJS</div>
                </div>
            </div> */}

          </div>
        </div>


        <ReviewsSection />


        <div className="section">
          <div className="container mx-auto px-6 relative">

            <div className="text-lg flex flex-col sm:flex-row gap-3 mb-18">
                <div>I also talk about web dev here:</div>

                <div className="flex gap-3">
                  <a target="_blank" href="https://www.threads.com/@almazbisenbaev" className="extlink">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z" fill="#000"></path></svg>
                    Threads
                  </a>
                  <a target="_blank" href="https://x.com/almazbisenbaev" className="extlink">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z" fill="#000"></path></svg>
                    Twitter
                  </a>
                </div>

            </div>

            <div className="flex flex-col gap-3 sm:gap-6">
                <div className="text-3xl sm:text-6xl ff-display font-bold tracking-tight opacity-50">Telegram:</div>
                <div>
                  <a className="text-3xl sm:text-6xl ff-display font-bold tracking-tight" href="//t.me/almazbisenbaev">@almazbisenbaev</a>
                </div>
            </div>

            {/* <FaceBall 
              width={250} 
              height={250} 
              imageUrl="/face.jpg"
              className="absolute bottom-0 right-0" 
            /> */}

          </div>
        </div>


        {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} /> */}

      </div>
    </div>
  );
}
