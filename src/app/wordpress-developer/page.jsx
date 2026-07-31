import React from "react";
import Image from "next/image";
import { Check, ExternalLink } from "lucide-react";

import TechMarquee from "@/components/tech-marquee/tech-marquee";
import ReviewsSection from "@/components/reviews-section/reviews-section";
import Button from "@/components/button/button";
import { Separator } from "@/components/ui/separator";
import { works } from "@/lib/data";

export const metadata = {
  title: "WordPress Developer & Freelancer",
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
    title: "WordPress Developer & Freelancer | Almaz Bisenbaev",
    description:
      "Freelance WordPress developer building fast, custom WordPress and WooCommerce websites for businesses.",
    url: "https://helloalmaz.com/wordpress-developer",
  },
};

const services = [
  {
    title: "Custom WordPress Theme Development",
    description:
      "Pixel-perfect, hand-coded themes built from your design — not bloated page builders. Clean, maintainable code that loads fast.",
  },
  {
    title: "WooCommerce & Online Stores",
    description:
      "Full e-commerce stores with product management, payments, and a smooth checkout — from coffee beans to B2B catalogs.",
  },
  {
    title: "Speed & Performance Optimization",
    description:
      "Slow WordPress site? I optimize load times, Core Web Vitals, and PageSpeed scores so your site feels instant.",
  },
  {
    title: "Custom Plugins & API Integrations",
    description:
      "Need functionality WordPress doesn't have out of the box? I build custom plugins and connect third-party APIs.",
  },
  {
    title: "Multilingual Sites & Automation",
    description:
      "Multilingual WordPress sites with hundreds of pages generated and kept up to date automatically.",
  },
  {
    title: "Redesigns, Migrations & Maintenance",
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

// Only WordPress / WooCommerce work from the shared portfolio data.
const wordpressWorks = works.filter((work) =>
  work.skills?.some((skill) => skill === "WordPress" || skill === "WooCommerce")
);

export default function WordPressDeveloperPage() {
  return (
    <div className="wordpress-developer-page">

      {/* Hero */}
      <div className="intro-wrapper">
        <div className="container px-5">
          <div className="pt-24 pb-12 md:pt-32 md:pb-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-1.5 text-sm font-medium mb-8">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
              Available for freelance work
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] max-w-4xl">
              I'm Almaz, a freelance{" "}
              <span className="text-[#207196]">WordPress developer</span>.
            </h1>

            <p className="mt-8 text-lg md:text-2xl text-neutral-600 leading-snug max-w-2xl">
              I build fast, custom WordPress & WooCommerce websites for
              businesses — from custom themes and online stores to plugins,
              speed optimization, and ongoing support.
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
        </div>
      </div>

      <div className="pb-6 sm:py-16">
        <TechMarquee />
      </div>

      {/* Stats */}
      <div className="container px-5 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl md:text-5xl font-extrabold tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="container px-5 py-16 md:py-24">
        <div className="block-header">
          <div className="block-header-title">What I can build for you</div>
        </div>

        <Separator className="my-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service) => (
            <div key={service.title}>
              <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#0671BE22] text-[#207196] mb-4">
                <Check size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-neutral-600 leading-snug">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Work */}
      <div id="work" className="container px-5 py-16 md:py-24 scroll-mt-10">
        <div className="block-header">
          <div className="block-header-title">Recent WordPress projects</div>
        </div>

        <Separator className="my-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {wordpressWorks.map((work) => (
            <div
              key={work.title}
              className="flex flex-col justify-between bg-white rounded-3xl p-8"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <h3 className="text-2xl font-bold">{work.title}</h3>
                  <span className="text-xs text-neutral-400 shrink-0">{work.year}</span>
                </div>
                <p className="text-sm text-neutral-600 mb-4">{work.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {work.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-medium bg-black/5 rounded-full px-3 py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="-ml-1">
                <Button href={work.url}>
                  {work.buttonText}
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
            </div>
          ))}
        </div>
      </div>

      {/* Reviews (shared component) */}
      <ReviewsSection />

      {/* Final CTA */}
      <div className="container px-5 py-16 md:py-24">
        <div className="section bg-black text-white text-center px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto">
            Need a WordPress developer you can rely on?
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto">
            Tell me about your project and I'll get back to you with the fastest
            way to make it happen.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
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
  );
}
