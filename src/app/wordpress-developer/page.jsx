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

const process = [
  {
    title: "Tell me about your project",
    description:
      "Send me your site and what you need — a rebuild, a store, a plugin, or just \"it's slow.\" I'll ask a few questions to pin down the scope.",
  },
  {
    title: "A fixed quote, not an open meter",
    description:
      "You get the scope and a fixed price in writing before anything starts. Timelines depend on what's involved, so yours comes with the quote.",
  },
  {
    title: "I build, you stay updated",
    description:
      "Regular progress updates without having to chase me, and you can see the site come together as I go.",
  },
  {
    title: "Launch, then support",
    description:
      "I hand over the site with a maintenance guide so you can edit it yourself — and I'm still around afterwards if something breaks.",
  },
];

// TODO (pricing): these are placeholders — replace every $X / $Y with your real
// numbers before this goes live. A client will hold you to whatever is on this
// page, so pick figures you're happy to honour as a starting point.
const pricing = [
  { service: "Custom theme", price: "$X–$Y" },
  { service: "WooCommerce store", price: "$X–$Y" },
  { service: "Speed optimization", price: "from $X" },
  { service: "Plugin & API work", price: "from $X" },
  { service: "Ongoing maintenance", price: "$X / month" },
];

// TODO (content): this page has no outcome evidence anywhere — every claim is a
// deliverable ("I build themes"), never a result. The only two outcome claims
// that existed are commented out: the "99% PageSpeed" stat below and the trust
// highlights block in the CTA further down. That leaves "Speed & performance"
// advertised as a service with zero speed evidence on the page, and "5.0" with
// no review count behind it.
// Worth revisiting: one real before/after PageSpeed number from a client, and
// "5.0 · N reviews" instead of a bare 5.0.
const stats = [
  { value: "6+", label: "Years with WordPress" },
  { value: "30+", label: "Sites shipped" },
  // { value: "99%", label: "PageSpeed scores" },
  { value: "5.0", label: "Upwork rating" },
];

// The curated set shown on the home page — all WordPress / WooCommerce work.
const portfolioItems = works.filter((work) => work.homepage);

export default function WordPressDeveloperPage() {
  return (
    <div className="wordpress-developer-page">


      <div className="intro-wrapper">
        <div className="container px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 pt-20 pb-12 md:pt-28 md:pb-20">

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

              <h1 className="text-5xl sm:text-7xl md:text-7xl font-extrabold tracking-tight leading-[0.98]">
                Freelance <span className="text-[#30f]">WordPress</span> <br /> &amp; WooCommerce developer
              </h1>

              <p className="mt-8 text-lg md:text-2xl text-neutral-600 leading-snug max-w-2xl">
                I'm Almaz. I build custom WordPress sites and online stores that load fast and don't fall apart after launch. Themes, plugins, speed fixes, ongoing support, whatever keeps your site running.
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


      <div className="container px-5 py-10">
        <div className="grid grid-cols-3 md:grid-cols-3 border-y border-black/10">
          {stats.map((stat, index) => {
            const edges = [
              "",
              "border-l",
              "border-l",
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


      <div className="container px-5 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

          <div className="lg:col-span-4 lg:sticky lg:top-10 lg:self-start">
            <div className="block-header !mb-4">
              <h2 className="block-header-title">How it works</h2>
            </div>
            <p className="text-neutral-500 leading-snug max-w-sm">
              No agency layers, no account manager, no ticket queue. You talk
              directly to the person writing the code.
            </p>
          </div>

          <div className="lg:col-span-8">
            {process.map((step, index) => (
              <div
                key={step.title}
                className="flex flex-col gap-2 md:grid md:grid-cols-12 md:gap-4 py-6 md:py-8 border-t border-black/10 last:border-b"
              >
                <div className="flex items-baseline gap-3 md:contents">
                  <span className="text-sm text-[#30f] tabular-nums md:col-span-1 md:pt-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight md:col-span-4">
                    {step.title}
                  </h3>
                </div>
                <p className="text-neutral-600 leading-snug md:col-span-7">
                  {step.description}
                </p>
              </div>
            ))}

            <div className="mt-12 md:mt-16 bg-white rounded-3xl p-8 md:p-10">
              <h3 className="text-xl font-bold tracking-tight">
                What it costs
              </h3>
              <p className="mt-2 text-neutral-500 leading-snug max-w-md">
                Starting ranges so you can budget before we talk. Every project
                gets its own fixed quote once I know the scope.
              </p>

              <dl className="mt-8 border-t border-black/10">
                {pricing.map((item) => (
                  <div
                    key={item.service}
                    className="flex items-baseline justify-between gap-4 py-4 border-b border-black/10"
                  >
                    <dt className="text-neutral-600">{item.service}</dt>
                    <dd className="font-semibold tabular-nums text-right whitespace-nowrap">
                      {item.price}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 text-sm text-neutral-500 leading-snug">
                Not sure which one you need? Describe the problem and I'll tell
                you — even if the answer is that you don't need me.
              </p>

              <div className="mt-8">
                <Button href="//t.me/almazbisenbaev" variant="black" className="h-12 px-6">
                  Get a quote
                  <ExternalLink size={18} />
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>


      <PortfolioSection
        id="work"
        title="Recent WordPress projects"
        items={portfolioItems}
      />

      <ReviewsSection />


      <div className="container px-5 py-16 md:py-24">
        <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-black text-white border border-white/10 p-8 sm:p-12 lg:p-20">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">Need a WordPress developer you can rely on?</h2>

              <p className="mt-6 text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl">
                Whether you need a custom theme, WooCommerce store, speed optimization, or plugin fixes - tell me about your project and let's get it done right.
              </p>

              {/* Key Trust Highlights */}
              {/* <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-neutral-300">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-white text-xs font-bold">✓</div>
                  <span>Pixel-perfect custom code</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-white text-xs font-bold">✓</div>
                  <span>99+ PageSpeed score target</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-white text-xs font-bold">✓</div>
                  <span>Clear communication & support</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-white text-xs font-bold">✓</div>
                  <span>Flexible freelance terms</span>
                </div>
              </div> */}

              {/* Action Buttons */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
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

            {/* Right Photo Column */}
            <div className="lg:col-span-5 relative group">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] w-full rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-900">
                <Image
                  src="/images/cta.jpg"
                  alt="Almaz Bisenbaev - WordPress Developer Setup"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>

          </div>
        </div>
      </div>


    </div>
  );
}
