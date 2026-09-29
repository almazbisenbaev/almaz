import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

import ReviewsSection from "@/components/reviews-section/reviews-section";
import PortfolioSection from "@/components/portfolio-section/portfolio-section";
import Button from "@/components/button/button";
import { works } from "@/lib/data";

export const metadata = {
  title: "Freelance WordPress & WooCommerce Developer",
  description:
    "Hire a freelance WordPress developer for custom websites, WooCommerce stores, speed improvements and ongoing support. Working with businesses and agencies worldwide.",
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

// Owner-requested draft: prices, timelines, 30-day bug-fix support, payment
// schedule and working hours below are suggested business terms, not verified
// policies. Keep the related FAQ and pricing copy in sync when revising them.
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
      "Turn your Figma designs into a custom WordPress theme with responsive layouts and an editing experience built around your content. Update pages, images and text without touching code.",
  },
  {
    title: "WooCommerce & online stores",
    description:
      "WooCommerce stores with product pages, product variations, payment and shipping setup, and a checkout that works on mobile. I help with new stores and improvements to existing shops.",
  },
  {
    title: "Speed & performance",
    description:
      "Find what is slowing your WordPress site down, then address the bottlenecks: images, scripts, caching, plugins or theme code. You get before-and-after measurements and a clear explanation of the changes.",
  },
  {
    title: "Custom plugins & APIs",
    description:
      "Custom plugins and API integrations for the way your business works: forms, external data, content imports and automated tasks. I document the setup so it is easier to maintain.",
  },
  {
    title: "Multilingual & automation",
    description:
      "Make your site easier to manage across languages and larger content libraries. I set up multilingual pages, reusable templates and content workflows that reduce repetitive editing.",
  },
  {
    title: "Redesigns & maintenance",
    description:
      "Refresh an existing site, move it to a new host or fix the issues that keep getting in your way. Ongoing maintenance can cover updates, backups, monitoring and an agreed allowance for small changes.",
  },
];

const process = [
  {
    title: "Tell me about your project",
    description:
      "Send your current website or designs, what you want to achieve, and any budget or deadline you have in mind. A short message is enough to start; I will help you work out the details.",
  },
  {
    title: "Agree on scope and price",
    description:
      "You receive a written scope, fixed quote and estimated schedule before work begins. We agree on the pages, features and revision rounds, with any later additions quoted separately.",
  },
  {
    title: "I build, you stay updated",
    description:
      "I build on a private preview site and share progress as each stage is ready. You can review the work, leave feedback and try the editing experience before launch.",
  },
  {
    title: "Launch, then support",
    description:
      "I check the agreed layouts, forms and store flows, help launch the site, and hand over access with an editing guide. Bug fixes for the work I deliver are included for 30 days after launch.",
  },
];

const faqs = [
  {
    question: "Do you use page builders like Elementor or Divi?",
    answer:
      "For a new custom site, I usually build a theme from your designs and use the WordPress editor for the content you need to manage. I can also work on an existing Elementor or Divi site. I review the setup first and recommend whether to keep it or change it based on your goals, budget and maintenance needs.",
  },
  {
    question: "Will I be able to edit the site myself after launch?",
    answer:
      "Yes. I set up editable sections for the content you manage most often, such as text, images, pages and products. At handover, you receive a guide for your site and a walkthrough of the main editing tasks.",
  },
  {
    question: "What happens if something breaks after launch?",
    answer:
      "I include 30 days of bug-fix support for the work delivered in the agreed scope. New features, changes made by others and issues caused by third-party services are assessed separately. After that, you can book individual fixes or arrange ongoing maintenance.",
  },
  {
    question: "Do you handle hosting and domains?",
    answer:
      "I can help you choose hosting, connect your domain and SSL, and move an existing WordPress site. The accounts stay in your name, and you pay the providers directly. We agree on any setup or migration work in the project scope before starting.",
  },
  {
    question: "Who owns the code and the design when the project is done?",
    answer:
      "Once the project is paid in full, I hand over the custom code and design work created for your project, along with the agreed files and administrator access. You can maintain the site yourself or work with another developer. Third-party plugins, fonts, images and other licensed assets remain subject to their own licenses, which we identify during planning.",
  },
  {
    question: "Can you work with my existing site, or do you rebuild from scratch?",
    answer:
      "Both. I start by reviewing your theme, plugins, content and the problems you want to solve. If the foundation is sound, targeted improvements may be enough. If the setup makes changes fragile or costly, I explain the trade-offs and quote a rebuild so you can compare the options.",
  },
  {
    question: "What time zone are you in, and when are you reachable?",
    answer:
      "I work on Kazakhstan time, UTC+5, usually from 10:00 to 19:00 Monday to Friday. That gives us overlap with European working hours, and calls with US clients can be arranged in advance. I aim to reply to project messages within one business day.",
  },
  {
    question: "How long does a WordPress project take?",
    answer:
      "As a starting estimate, a custom business website takes around 2–4 weeks and a WooCommerce store around 4–6 weeks once the scope, designs and content are ready. Smaller fixes may take a few working days. Integrations, content preparation and feedback can affect the schedule; your quote includes an estimate for your specific project.",
  },
  {
    question: "Do I need a finished design before we start?",
    answer:
      "A finished Figma design is helpful, but you can also come with a brief, a rough page list and a few reference sites. We can agree on a separate design stage before development. If an agency or designer is already working on the project, I can join them for the WordPress build.",
  },
  {
    question: "How do payments work?",
    answer:
      "For most fixed-price projects, I ask for 50% to book the work and 50% after you approve the preview, before launch and handover. Larger projects can use agreed milestones. Hosting, domains and paid licenses are separate costs, and any work outside the original scope is quoted for approval first.",
  },
];

// Suggested USD budgets; revise alongside the scope and payment answers above.
const pricing = [
  { service: "Custom theme", price: "$1,200–$3,000" },
  { service: "WooCommerce store", price: "$2,000–$5,000" },
  { service: "Speed optimization", price: "from $250" },
  { service: "Plugin & API work", price: "from $400" },
  { service: "Ongoing maintenance", price: "from $150 / month" },
];

// Existing profile figures; add project outcome metrics only with real evidence.
const stats = [
  { value: "6+", label: "Years with WordPress" },
  { value: "30+", label: "Sites shipped" },
  { value: "5.0", label: "Upwork rating" },
];

// The curated set shown on the home page — all WordPress / WooCommerce work.
const portfolioItems = works.filter((work) => work.homepage);

const PAGE_URL = "https://helloalmaz.com/wordpress-developer";

// Keep structured FAQ answers identical to the visible page copy. There is no
// aggregateRating because a verified review count has not been supplied.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${PAGE_URL}#service`,
      name: "Freelance WordPress & WooCommerce Development",
      url: PAGE_URL,
      description: metadata.description,
      serviceType: "WordPress and WooCommerce development",
      areaServed: { "@type": "Place", name: "Worldwide" },
      provider: {
        "@type": "Person",
        name: "Almaz Bisenbaev",
        url: "https://helloalmaz.com",
        jobTitle: "Full-Stack Web Developer",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "WordPress services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://helloalmaz.com" },
        { "@type": "ListItem", position: 2, name: "WordPress Developer", item: PAGE_URL },
      ],
    },
  ],
};

export default function WordPressDeveloperPage() {
  return (
    <div className="wordpress-developer-page">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />


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
                I'm Almaz, a freelance WordPress developer working with businesses
                and agencies worldwide. I build custom websites and WooCommerce
                stores, improve existing sites, and help you keep them running
                after launch.
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
              From a new business website to an existing store that needs
              attention, I help you plan, build and maintain the WordPress
              setup that fits your work.
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
              You work directly with me from the first conversation to handover,
              with a clear scope and regular chances to review the work.
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
                Typical development budgets in USD, based on an agreed design
                and scope. Your project gets a fixed quote before work begins.
              </p>

              <dl className="mt-8 border-t border-black/10">
                {pricing.map((item) => (
                  <div
                    key={item.service}
                    className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 py-4 border-b border-black/10"
                  >
                    <dt className="text-neutral-600">{item.service}</dt>
                    <dd className="font-semibold tabular-nums sm:text-right whitespace-nowrap">
                      {item.price}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 text-sm text-neutral-500 leading-snug">
                Design, copywriting, hosting and paid licenses are quoted
                separately where needed. Maintenance covers an agreed scope;
                larger changes get their own estimate.
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
        description="WordPress and WooCommerce work for cafés, retailers and service businesses. Several projects were delivered with Mindlind; others were direct client engagements. Explore the designs, store interfaces and content layouts below."
        items={portfolioItems}
      />

      <ReviewsSection />


      <div className="container px-5 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

          <div className="lg:col-span-4 lg:sticky lg:top-10 lg:self-start">
            <div className="block-header !mb-4">
              <h2 className="block-header-title">Questions people ask</h2>
            </div>
            <p className="text-neutral-500 leading-snug max-w-sm">
              Practical details about scope, timing, ownership and support.
              Send me a message if you want to talk through your situation.
            </p>
          </div>

          <div className="lg:col-span-8">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-t border-black/10 last:border-b"
              >
                <summary className="flex items-start justify-between gap-6 py-6 md:py-7 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg md:text-xl font-bold tracking-tight">
                    {faq.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-2xl leading-none text-neutral-400 transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 md:pb-7 pr-10 text-neutral-600 leading-snug max-w-2xl">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

        </div>
      </div>


      <div className="container px-5 py-16 md:py-24">
        <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-black text-white border border-white/10 p-8 sm:p-12 lg:p-20">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">Need a WordPress developer you can rely on?</h2>

              <p className="mt-6 text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl">
                Send me your website or designs, what you need help with, and
                your ideal launch date. I'll review the details and suggest a
                practical next step.
              </p>

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
