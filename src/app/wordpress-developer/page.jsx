import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

import TechMarquee from "@/components/tech-marquee/tech-marquee";
import ReviewsSection from "@/components/reviews-section/reviews-section";
import PortfolioSection from "@/components/portfolio-section/portfolio-section";
import Button from "@/components/button/button";
import { works } from "@/lib/data";

export const metadata = {
  title: "Freelance WordPress & WooCommerce Developer",
  description:
    "Freelance WordPress developer building fast, custom WordPress and WooCommerce websites for businesses. Custom themes, plugins, e-commerce, speed optimization and ongoing support.",
  alternates: {
    canonical: "/wordpress-developer",
  },
  keywords: [
    "WordPress Developer",
    "WordPress Freelancer",
    "Freelance WordPress Developer",
    "WooCommerce Developer",
    "Custom WordPress Theme",
    "WordPress Speed Optimization",
    "Hire WordPress Developer",
  ],
  openGraph: {
    title: "Freelance WordPress & WooCommerce Developer | Almaz Bisenbaev",
    description:
      "Freelance WordPress developer building fast, custom WordPress and WooCommerce websites for businesses.",
    url: "https://helloalmaz.com/wordpress-developer",
  },
};

const heroFacts = [
  { label: "Status", value: "Open for projects" },
  { label: "Focus", value: "WordPress · WooCommerce" },
  { label: "Engagement", value: "Freelance · Contract" },
  { label: "Working", value: "Remote, worldwide" },
];

const services = [
  {
    title: "Custom theme development",
    description:
      "Pixel-perfect, hand-coded themes built from your design — not bloated page builders. Clean, maintainable code that loads fast.",
  },
  {
    title: "WooCommerce & online stores",
    description:
      "Full e-commerce stores with product management, payments, and a smooth checkout — from coffee beans to B2B catalogs.",
  },
  {
    title: "Speed & performance",
    description:
      "Slow WordPress site? I optimize load times, Core Web Vitals, and PageSpeed scores so your site feels instant.",
  },
  {
    title: "Custom plugins & APIs",
    description:
      "Need functionality WordPress doesn't have out of the box? I build custom plugins and connect third-party APIs.",
  },
  {
    title: "Multilingual & automation",
    description:
      "Multilingual WordPress sites with hundreds of pages generated and kept up to date automatically.",
  },
  {
    title: "Redesigns & maintenance",
    description:
      "Theme changes, migrations, fixes, and ongoing support — with clear communication and a maintenance guide when you need one.",
  },
];

const stats = [
  { value: "6+", label: "Years with WordPress" },
  { value: "30+", label: "Sites shipped" },
  { value: "99%", label: "PageSpeed scores" },
  { value: "5.0", label: "Upwork rating" },
];

// The curated set shown on the home page — all WordPress / WooCommerce work.
const portfolioItems = works.filter((work) => work.homepage);

export default function WordPressDeveloperPage() {
  return (
    <div className="wordpress-developer-page">

      {/* Hero — asymmetric: big statement on the left, spec rail on the right */}
      <div className="intro-wrapper">
        <div className="container px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-20 pb-12 md:pt-28 md:pb-20">

            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-8">
                <Image
                  src="/me.jpg"
                  width={48}
                  height={48}
                  alt="Almaz Bisenbaev"
                  className="rounded-full h-12 w-12 object-cover"
                />
                <div className="leading-tight">
                  <div className="font-semibold">Almaz Bisenbaev</div>
                  <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                    Available for freelance work
                  </div>
                </div>
              </div>

              <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-[0.98]">
                Freelance <span className="text-[#00f]">WordPress</span> &amp;
                WooCommerce developer.
              </h1>

              <p className="mt-8 text-lg md:text-2xl text-neutral-600 leading-snug max-w-2xl">
                I'm Almaz — I build fast, custom WordPress & WooCommerce websites
                for businesses. Custom themes, online stores, plugins, speed
                optimization, and ongoing support.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="//t.me/almazbisenbaev" variant="black" className="h-12 px-6">
                  Start a project
                  <ExternalLink size={18} />
                </Button>
                <Button href="#work" variant="secondary" className="h-12 px-6">
                  See my WordPress work
                </Button>
              </div>
            </div>

            {/* Spec rail */}
            <div className="lg:col-span-4 lg:pt-4">
              <dl className="border-t border-black/10">
                {heroFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4 py-4 border-b border-black/10"
                  >
                    <dt className="text-sm text-neutral-400">{fact.label}</dt>
                    <dd className="text-sm font-semibold text-right">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

          </div>
        </div>
      </div>

      <div className="pb-6 sm:py-16">
        <TechMarquee />
      </div>

      {/* Stats band — horizontal rhythm with hairline dividers */}
      <div className="container px-5 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 border-y border-black/10">
          {stats.map((stat, index) => {
            // Per-cell edges: vertical dividers between columns (2-up on
            // mobile, 4-up on desktop) plus a horizontal divider for the
            // second mobile row only.
            const edges = [
              "",
              "border-l",
              "md:border-l border-t md:border-t-0",
              "border-l border-t md:border-t-0",
            ][index];

            return (
              <div
                key={stat.label}
                className={`py-8 md:py-10 px-2 md:px-8 border-black/10 ${edges}`}
              >
                <div className="text-4xl md:text-6xl font-extrabold tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-500 mt-2">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Services — numbered capabilities index */}
      <div className="container px-5 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

          <div className="lg:col-span-4 lg:sticky lg:top-10 lg:self-start">
            <div className="block-header !mb-4">
              <h2 className="block-header-title">What I can build for you</h2>
            </div>
            <p className="text-neutral-500 leading-snug max-w-sm">
              Everything a modern WordPress site needs — designed, coded, and
              maintained by one person you can talk to directly.
            </p>
          </div>

          <div className="lg:col-span-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="flex flex-col gap-2 md:grid md:grid-cols-12 md:gap-4 py-6 md:py-8 border-t border-black/10 last:border-b"
              >
                <div className="flex items-baseline gap-3 md:contents">
                  <span className="text-sm text-neutral-400 tabular-nums md:col-span-1 md:pt-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight md:col-span-4">
                    {service.title}
                  </h3>
                </div>
                <p className="text-neutral-600 leading-snug md:col-span-7">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Work — shared portfolio section (same component as the home page) */}
      <PortfolioSection
        id="work"
        title="Recent WordPress projects"
        items={portfolioItems}
      />

      {/* Reviews (shared component) */}
      <ReviewsSection />

      {/* Final CTA — asymmetric */}
      <div className="container px-5 py-16 md:py-24">
        <div className="section bg-black text-white px-8 py-16 md:p-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-end">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Need a WordPress developer you can rely on?
          </h2>
          <div className="md:justify-self-end w-full md:max-w-sm">
            <p className="text-lg text-white/70 mb-8">
              Tell me about your project and I'll get back to you with the
              fastest way to make it happen.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="//t.me/almazbisenbaev" variant="white" className="h-12 px-6">
                Message me on Telegram
                <ExternalLink size={18} />
              </Button>
              <Button
                href="https://www.upwork.com/freelancers/~01fc6ec6fb228858ff"
                variant="outline-white"
                className="h-12 px-6"
              >
                Hire me on Upwork
                <ExternalLink size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
