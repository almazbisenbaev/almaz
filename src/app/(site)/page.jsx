import Image from "next/image";
import { ArrowUpRight, ChevronRight } from 'lucide-react';

import TechMarquee from '@/components/tech-marquee/tech-marquee';
import HeroIntro from '@/components/hero-intro/hero-intro';
import Button from '@/components/button/button';
import ReviewsSection from '@/components/reviews-section/reviews-section';
import PortfolioSection from '@/components/portfolio-section/portfolio-section';
import { homepageWorks } from "@/data/works";
import { PROFILES } from "@/lib/site";

/**
 * One card in the "Personal projects" grid. The visual is passed in because it
 * varies — two cards lead with a screenshot, the YouTube card with an avatar.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.visual - Media shown above the text block.
 * @param {string} [props.className] - Card background and text colour.
 * @param {'black' | 'white'} props.ctaVariant - Also picks the chevron colour.
 */
function ProjectCard({ visual, className = '', title, description, descriptionClassName, ctaLabel, ctaHref, ctaVariant }) {
  return (
    <div className={`flex flex-col justify-between rounded-4xl overflow-hidden ${className}`}>
      {visual}
      <div className="p-8 md:p-12 pt-2 w-full">
        <h3 className="font-semibold text-xl md:text-3xl">{title}</h3>
        <div className={descriptionClassName}>{description}</div>
        <div className="mt-8">
          <Button variant={ctaVariant} href={ctaHref}>
            <span>{ctaLabel}</span>
            <ChevronRight color={ctaVariant === 'white' ? 'black' : 'white'} size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}

const ProjectScreenshot = ({ src, alt }) => (
  <Image src={src} alt={alt} width={800} height={600} sizes="(max-width: 768px) 100vw, 33vw" />
);

export default function Home() {
  return (
    <div className="home-page">

      <HeroIntro />

      <div className="pb-6 sm:py-20">
        <TechMarquee />
      </div>

      <PortfolioSection items={homepageWorks} />

      <div className="container px-5">
        <section
          aria-labelledby="wordpress-cta-title"
          className="flex flex-col items-start gap-8 rounded-4xl bg-white p-6 shadow-[0_12px_48px_-24px_rgba(0,0,0,0.16)] sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-14"
        >
          <div className="max-w-2xl">
            <h2 id="wordpress-cta-title" className="max-w-xl text-3xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-4xl xl:text-5xl">
              Let’s build your next website.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600">
              A new WordPress site, a WooCommerce store, or a better version of
              what you have. I can help.
            </p>
          </div>
          <Button href="/wordpress-developer" variant="black" className="shrink-0 whitespace-nowrap max-sm:w-full max-sm:px-4!">
            <span>Explore services</span>
            <ArrowUpRight aria-hidden="true" size={20} className="shrink-0" />
          </Button>
        </section>
      </div>

      <div className="section">
        <div className="container px-5">

          <div className="block-header">
            <h2 className="block-header-title">Personal projects</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-3">

            <ProjectCard
              className="bg-white"
              visual={<ProjectScreenshot src="/images/project-glowy.jpg" alt="Glowy Icons" />}
              title="Glowy Icons"
              description="Colorful and bright vector icons with slight shadows"
              descriptionClassName="text-lg font-medium text-slate-700 mt-2"
              ctaLabel="Figma Link"
              ctaHref="https://www.figma.com/community/file/1452663046127877131/glowy-icons-v1-0"
              ctaVariant="black"
            />

            <ProjectCard
              className="bg-white"
              visual={<ProjectScreenshot src="/images/project-polyglossa.jpg" alt="Polyglossa" />}
              title={<>Polyglossa<sup className="text-gray-500 font-normal">β</sup></>}
              description="A messaging app where you talk to AI-friends to practice a language"
              descriptionClassName="text-lg font-medium text-slate-700 mt-2"
              ctaLabel="Visit website"
              ctaHref="https://polyglossa-beta.vercel.app"
              ctaVariant="black"
            />

            <ProjectCard
              className="bg-linear-to-b from-indigo-500 to-[#FF163B] text-white"
              visual={
                <div className="px-6 md:px-12 py-12 md:py-24 flex-1 flex items-center justify-center">
                  {/* `custom-rings` draws the two pulsing halos around the avatar. */}
                  <div className="custom-rings relative youtube-banner-image">
                    <Image
                      className="rounded-full"
                      src="/me.jpg"
                      width={150}
                      height={150}
                      alt=""
                      sizes="150px"
                    />
                  </div>
                </div>
              }
              title="Watch me on YouTube"
              description="I talk about webdev & stuff"
              descriptionClassName="font-medium text-md mt-2"
              ctaLabel="YouTube Channel"
              ctaHref={PROFILES.youtube}
              ctaVariant="white"
            />

          </div>
        </div>
      </div>

      <ReviewsSection />
    </div>
  );
}
