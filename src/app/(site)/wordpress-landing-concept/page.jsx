import Image from "next/image";
import { ArrowDown, ArrowUpRight, Wrench, ShoppingBag, Blocks, PanelsTopLeft, Paintbrush, RefreshCw } from "lucide-react";
import Button from "@/components/button/button";
import FaqAccordion from "@/components/faq-accordion/faq-accordion";
import PortfolioSpotlight from "@/components/portfolio-spotlight/portfolio-spotlight";
import { ReviewCard } from "@/components/reviews-section/reviews-section";
import ExternalArrow from "@/components/icons/arrow-up-right";
import { Separator } from "@/components/ui/separator";
import { findWork } from "@/data/works";
import { PROFILES } from "@/lib/site";
import LandingMotion from "./landing-motion";
import "./landing.css";

export const metadata = {
  title: "WordPress & WooCommerce Developer | Fix, Improve, Build",
  description: "I fix, improve, and build WordPress websites. WooCommerce, custom features, performance improvements, and ongoing development with Almaz Bisenbaev.",
  alternates: { canonical: "/wordpress-landing-concept" },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

// Client-facing concept. Prices, availability, response SLAs, and a fixed support
// window have not been confirmed, so the copy explains how terms are agreed.
const services = [
  { icon: Wrench, title: "WordPress fixes & speed", description: "Fix slow pages, broken forms, and plugin conflicts. I find the cause, make the fix, and test it." },
  { icon: ShoppingBag, title: "WooCommerce & checkout", description: "Fix checkout errors, add product options or payments, or build a complete WooCommerce store." },
  { icon: Blocks, title: "Custom features & integrations", description: "Connect tools, import data, and automate multilingual content updates when existing plugins aren't enough." },
  { icon: PanelsTopLeft, title: "New WordPress websites", description: "Turn Figma designs or a brief into a mobile-friendly site with text and images you can edit." },
  { icon: Paintbrush, title: "Elementor & site improvements", description: "Rework pages, fix mobile layouts, or implement a new design in Elementor without a full rebuild." },
  { icon: RefreshCw, title: "Maintenance & ongoing work", description: "Keep WordPress updated, add features, migrate hosts, or take over an unfinished project." },
];

const projects = [
  { ...findWork("Silverskin Coffee"), id: "work-silverskin", result: "Choose coffee by grind and weight, then buy through a WooCommerce cart and checkout." },
  { ...findWork("Monitask"), id: "work-monitask", result: "Hundreds of multilingual WordPress pages, generated and updated automatically." },
  { ...findWork("Funky Ramen"), id: "work-funky", result: "A café's menu and story in a custom WordPress site that works on mobile." },
  { ...findWork("Muafaktur"), id: "work-muafaktur", result: "Beauty products and training courses in one WooCommerce site, with dedicated product and course pages." },
];

// Verbatim excerpts from src/data/reviews.js. No client names were supplied.
const testimonials = [
  { topic: "Progress updates & results", quote: "Communication was smooth, and he always kept me updated on progress. The site now looks more professional and works perfectly." },
  { topic: "A repeat client", quote: "This is a second time dealing with him, both times he delivered the job well." },
  { topic: "A helpful handover", quote: "He was so communicative and even made me a guide on maintaining what he had completed to make sure I was able to utilize all of the things he set in place." },
];

const steps = [
  { title: "Describe the job.", text: "Send your site or designs and what you need to change." },
  { title: "Agree on scope & price.", text: "You'll know what's included, how we'll test it, and the cost and timing before work starts." },
  { title: "Review a preview.", text: "Try the pages or features and give feedback before they go live." },
  { title: "Launch & hand over.", text: "We test the relevant layouts, forms, or checkout. You get the agreed access and guidance for using the site." },
];

const faqs = [
  { question: "Do I need finished designs?", answer: "No. A brief and a few examples are enough to start. Design and planning can be included if needed." },
  { question: "What's your time zone?", answer: "Kazakhstan, UTC+5. I work remotely; we agree on overlap hours and calls for your project." },
  { question: "How do payments, contracts, and NDAs work?", answer: "We agree on payment method, currency, milestones, and contract or NDA requirements before starting. Mention any requirements in your first message." },
  { question: "Can I edit the site myself?", answer: "For new builds, we plan the text, images, and products you'll manage. For existing sites, I check what your theme or builder supports." },
  { question: "Who owns the code and files?", answer: "We agree on ownership, files, and account access before starting. Third-party themes, plugins, and other assets keep their own license terms." },
  { question: "What if something breaks after launch?", answer: "Send the affected page and what happened. The project scope defines the support period and covered fixes; other work is quoted separately." },
];

function Arrow({ className = "", size = 21 }) {
  return <ArrowUpRight size={size} strokeWidth={1.7} aria-hidden="true" className={className} />;
}

function Label({ children }) {
  return <p className="block-header-title wp-label">{children}</p>;
}

function Asterisk({ className = "" }) {
  return <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M50 5v90M11 27.5l78 45M11 72.5l78-45" stroke="currentColor" strokeWidth="16" /></svg>;
}

export default function WordPressLandingConceptPage() {
  return (
    <LandingMotion>
      <div className="container px-5">
        <section className="wp-hero" id="hero" aria-labelledby="wp-hero-title">
          <div className="wp-hero-intro" data-hero-intro>
            <span className="wp-eyebrow">WordPress & WooCommerce development</span>
            <span className="wp-hero-location">Based in Kazakhstan. Working worldwide.</span>
          </div>
          <div className="wp-hero-copy">
            <h1 id="wp-hero-title"><span data-hero-line>I fix, improve, and build </span><span className="wp-blue" data-hero-line>WordPress websites.</span></h1>
            <p className="wp-hero-description" data-hero-intro>I troubleshoot bugs, fix slow pages and WooCommerce checkout issues, and build the features your site is missing.</p>
            <div className="wp-hero-actions" data-hero-intro>
              <Button variant="black" href="#contact" className="max-sm:w-full max-sm:px-4!">Tell me what you need <Arrow /></Button>
              <Button variant="secondary" href="#work" className="max-sm:w-full max-sm:px-4!">Explore my work <ArrowDown size={18} aria-hidden="true" /></Button>
            </div>
            <div className="wp-person" data-hero-intro>
              <Image src="/me.jpg" alt="" width={44} height={44} sizes="44px" />
              <p><strong>Hi, I'm Almaz.</strong><span>You'll work directly with me.</span></p>
            </div>
          </div>
        </section>

        <Separator />

        <section className="wp-services wp-section" id="services" aria-labelledby="wp-services-title">
          <div className="wp-section-heading" data-reveal>
            <div><Label>What you can hire me for</Label><h2 id="wp-services-title">Fix a problem. <br />Add a feature. <br /><span className="wp-muted-heading">Build a website.</span></h2></div>
            <p>For site owners, online stores, and agencies. Bring one issue or a full build.</p>
          </div>
          <div className="wp-services-grid">
            {services.map(({ icon: Icon, title, description }, index) => (
              <article className="wp-service" key={title} data-reveal>
                <div className="wp-service-top"><Icon size={27} strokeWidth={1.5} aria-hidden="true" /><span>0{index + 1}</span></div>
                <h3>{title}</h3><p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="wp-work wp-section" id="work" aria-labelledby="wp-work-title">
          <div className="wp-section-heading" data-reveal><div><Label>Portfolio</Label><h2 id="wp-work-title">What I've built.</h2></div></div>
          <div data-reveal>
            <PortfolioSpotlight items={projects} embedded labelledBy="wp-work-title" />
          </div>
        </section>

        <section className="wp-feedback" aria-labelledby="wp-feedback-title">
          <div className="wp-feedback-heading" data-reveal><Label>Client feedback</Label><h2 id="wp-feedback-title">Updates during the work. <br />Guidance after handover.</h2></div>
          <div className="wp-quotes">
            {testimonials.map((review) => <ReviewCard key={review.topic} quote={review.quote} topic={review.topic} data-reveal />)}
          </div>
        </section>

        <section className="wp-process wp-section" id="process" aria-labelledby="wp-process-title">
          <div className="wp-process-intro" data-reveal><Label>How we'll work</Label><h2 id="wp-process-title">Know what <br />happens next.</h2><Asterisk className="wp-process-star" /></div>
          <div className="wp-steps"><div className="wp-process-track" aria-hidden="true"><span data-process-line /></div>{steps.map((step, index) => <article className="wp-step" key={step.title} data-reveal><span className="wp-step-number">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div>
        </section>

        <section className="wp-pricing wp-section" id="pricing" aria-labelledby="wp-pricing-title">
          <div className="wp-section-heading" data-reveal><div><Label>Scope & pricing</Label><h2 id="wp-pricing-title">How I price <br /><span className="wp-blue">your project.</span></h2></div><p>Cost depends on the work and your existing setup. Every quote includes the scope and estimated schedule.</p></div>
          <div className="wp-engagements">
            <article data-reveal><h3>Fix or add</h3><p>Quoted per task. Any paid investigation is agreed before it starts.</p></article>
            <article data-reveal><h3>Build or redesign</h3><p>Quoted by pages, features, integrations, and any design or content work needed.</p></article>
            <article data-reveal><h3>Ongoing help</h3><p>Priced by the development or maintenance time you need.</p></article>
          </div>
          <p className="wp-pricing-note">Hosting, domains, and paid licenses cost extra. Scope changes are priced for your approval before they're added.</p>
        </section>

        <section className="wp-about wp-section" aria-labelledby="wp-about-title">
          <div className="wp-about-photo" data-reveal><Image src="/me.jpg" alt="Almaz Bisenbaev" width={600} height={600} sizes="(max-width: 767px) 80vw, 380px" /><span>Almaz / your developer</span></div>
          <div className="wp-about-copy" data-reveal>
            <Label>Why work with me</Label>
            <h2 id="wp-about-title">Hi, I'm Almaz. <br />You'll work <br /><span className="wp-blue">directly with me.</span></h2>
            <ul className="wp-reasons">
              <li><strong>Custom development experience.</strong> WooCommerce product options and hundreds of automatically updated multilingual pages.</li>
              <li><strong>Direct collaboration.</strong> I handle the work and your feedback, with experience alongside agency teams such as Mindlind.</li>
              <li><strong>Useful handover.</strong> Clients highlight progress updates and maintenance guidance in their reviews.</li>
            </ul>
            <div className="wp-about-links"><a className="extlink" href={PROFILES.linkedin}><ExternalArrow />More about me</a><a className="extlink" href={PROFILES.youtube}><ExternalArrow />Web dev on YouTube</a></div>
          </div>
        </section>

        <section className="wp-faq wp-section" id="faq" aria-labelledby="wp-faq-title">
          <div data-reveal><Label>A few useful answers</Label><h2 id="wp-faq-title">Before you <br />say hello.</h2><p className="wp-muted">Something else on your mind? <br /><a className="extlink" href={PROFILES.telegram}><ExternalArrow />Just ask me</a></p></div>
          <FaqAccordion items={faqs} />
        </section>

        <section className="wp-contact" id="contact" aria-labelledby="wp-contact-title">
          <div className="wp-contact-copy" data-reveal><Label>Tell me about the job</Label><h2 id="wp-contact-title">What needs fixing <br />or building?</h2><p>Send your site or idea, what needs to change, and any budget or deadline.</p><Button variant="white" href={PROFILES.telegram} className="max-sm:w-full max-sm:px-4!">Message me on Telegram <Arrow /></Button><div className="wp-contact-alternatives">Or use <a className="extlink" href={PROFILES.upwork}><ExternalArrow />Upwork</a><span aria-hidden="true">/</span><a className="extlink" href={PROFILES.linkedin}><ExternalArrow />LinkedIn</a></div></div>
          <div className="wp-contact-next" data-reveal><Asterisk className="wp-contact-star" /><h3>What happens next?</h3><p>I'll confirm whether I can help, ask for missing details, then estimate the work once the scope is clear.</p></div>
        </section>
      </div>
    </LandingMotion>
  );
}
