import { findWork } from "@/data/works";
import { AUTHOR_NAME, PROFILES } from "@/lib/site";

export const metadata = {
  title: "WordPress Landing Concept | Content Outline",
  description: "A working content outline for Almaz's WordPress landing page.",
  alternates: { canonical: "/wordpress-landing-concept" },
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

// These describe delivered functionality documented in the existing portfolio,
// not unverified changes to a client's revenue, traffic, or conversion rate.
const selectedWork = [
  {
    name: "Silverskin Coffee",
    id: "work-silverskin-coffee",
    result:
      "A WooCommerce store for selling coffee beans, with product options, a cart, and checkout.",
  },
  {
    name: "Monitask",
    id: "work-monitask",
    result:
      "A multilingual WordPress site with hundreds of pages generated and updated automatically.",
  },
  {
    name: "Muafaktur",
    id: "work-muafaktur",
    result:
      "A WooCommerce website presenting beauty products and training courses in one place.",
  },
  {
    name: "Funky Ramen",
    id: "work-funky-ramen",
    result:
      "A WordPress website where visitors can explore the café, read its menu, and view it on mobile.",
  },
];

const services = [
  {
    title: "New WordPress websites",
    detail:
      "Turn your design or agreed brief into a WordPress website with pages your team can edit. Help visitors find your services, understand your business, and take the next step.",
    proof: {
      href: "#work-funky-ramen",
      name: "Funky Ramen",
      detail: "a café website with a menu, business information, and mobile layouts",
    },
  },
  {
    title: "WooCommerce stores & checkout",
    detail:
      "Build or extend a store, fix checkout problems, and improve product, payment, and shipping functionality.",
    proof: {
      href: "#work-silverskin-coffee",
      name: "Silverskin Coffee",
      detail: "a coffee store with product options, a cart, and checkout",
    },
  },
  {
    title: "Website improvements & redesigns",
    detail:
      "Update existing pages, work with Elementor, and fix mobile layouts so visitors can use the site comfortably.",
  },
  {
    title: "Custom functionality & integrations",
    detail:
      "Connect external services, build features beyond standard plugins, and automate multilingual content workflows.",
    proof: {
      href: "#work-monitask",
      name: "Monitask",
      detail: "hundreds of multilingual pages generated and updated automatically",
    },
  },
  {
    title: "WordPress fixes & performance",
    detail:
      "Diagnose bugs and plugin conflicts, address slow loading, and explain what changed with before-and-after checks.",
  },
  {
    title: "Ongoing development, maintenance & migrations",
    detail:
      "Continue improving an existing site, maintain its agreed setup, or move it to a new host. [Confirm the maintenance tasks and support terms offered.]",
  },
];

// Verbatim excerpts from src/data/reviews.js. Names are not supplied there.
const testimonialCandidates = [
  {
    focus: "WordPress improvements",
    quote:
      "Almaz did an excellent job developing my WordPress portfolio website. He handled the theme change and improvements with great skill and attention to detail.",
  },
  {
    focus: "Communication",
    quote:
      "Almaz was great at setting up our website and very responsive with communications. Highly recommend if you need Wordpress assistance.",
  },
  {
    focus: "Handover",
    quote:
      "He was so communicative and even made me a guide on maintaining what he had completed to make sure I was able to utilize all of the things he set in place.",
  },
];

const faqs = [
  {
    question: "Can you improve my existing site or take over an unfinished project?",
    direction: "Explain the initial review and how we decide between fixes and a rebuild.",
  },
  {
    question: "Can you work with my designer, developer, or agency?",
    direction: "Cover Figma handoffs and collaboration. [Confirm white-label arrangements and availability.]",
  },
  {
    question: "What do you need before we start?",
    direction: "Start with your website URL or project idea, what needs to change, and a screenshot or example if useful. Include a budget or deadline if known. A finished brief is not required for the first message; arrange secure access after agreeing on the next step.",
  },
  {
    question: "Where are you based, and when can we talk?",
    direction: "Kazakhstan, UTC+5. [Confirm working hours, overlap, and response time.]",
  },
  {
    question: "Do you use contracts, and can you sign an NDA?",
    direction: "[Confirm contract and NDA process before writing the answer.]",
  },
  {
    question: "How do international payments and invoices work?",
    direction: "[Confirm currencies, payment methods, invoicing, deposit, and milestones.]",
  },
  {
    question: "Who owns the code, accounts, and finished website?",
    direction: "[Confirm handover and ownership terms; distinguish custom work from third-party licenses.]",
  },
  {
    question: "How long will the project take?",
    direction: "Explain scope, content readiness, integrations, and feedback dependencies. [Add realistic ranges once agreed.]",
  },
  {
    question: "How do revisions and requests outside the scope work?",
    direction: "[Confirm included review rounds and how extra work is estimated and approved.]",
  },
  {
    question: "Will I be able to edit the site, and do you help with hosting?",
    direction: "Describe editable content, handover guidance, hosting setup, migrations, and separate provider costs. [Confirm responsibilities.]",
  },
  {
    question: "What happens if something breaks after launch?",
    direction: "[Define the bug-fix window, what it covers, and how to request help.]",
  },
  {
    question: "Can we keep working together after launch?",
    direction: "Explain ongoing improvements and maintenance. [Confirm packages, availability, and response commitments.]",
  },
];

export default function WordPressLandingConceptPage() {
  return (
    <div className="container px-5 py-12 sm:py-20">
      <div className="article max-w-3xl mx-auto [&_a]:underline [&_a]:underline-offset-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol>li]:mb-3 [&_dl>div]:mb-4 [&_blockquote]:pl-5">
      <header>
        <h1 className="text-3xl sm:text-5xl mt-0! leading-tight">WordPress landing page: content outline</h1>
        <p>Working draft for content review. Section order, sample copy, and open decisions.</p>
        <ul>
          <li><strong>Focus:</strong> WordPress and WooCommerce.</li>
          <li><strong>Primary audience:</strong> WordPress site owners and teams planning a new website or store.</li>
          <li><strong>Secondary audience:</strong> agencies looking for a development partner.</li>
          <li><strong>Conversion:</strong> start a conversation about a specific project.</li>
        </ul>
        <p>
          These are proposed positioning choices. Text in [square brackets] needs
          confirmation. Examples below draw on the existing website; business
          terms are still open for review.
        </p>
      </header>

      <section aria-labelledby="hero">
        <h2 id="hero">1. Hero</h2>
        <ul>
          <li><strong>Headline:</strong> I fix, improve, and build WordPress websites.</li>
          <li><strong>Supporting line:</strong> I troubleshoot bugs, fix slow pages and WooCommerce checkout issues, and build the features your site is missing.</li>
          <li><strong>Working together:</strong> You work directly with me, from the first discussion through development and handover.</li>
          <li><strong>Availability:</strong> [Add current availability or next start date.]</li>
          <li><strong>Primary CTA:</strong> <a href="#contact">Start a project</a></li>
        </ul>
      </section>

      <section aria-labelledby="credibility">
        <h2 id="credibility">2. Credibility bar</h2>
        <p>Place directly below the hero, within the first screen in the future design.</p>
        <ul>
          <li>Existing site figures: 6+ years with WordPress · 30+ sites shipped · 5.0 Upwork rating. [Reconfirm before publishing.]</li>
          <li>Project names available from the portfolio: Silverskin Coffee, Monitask, Muafaktur.</li>
          <li>Agency relationship: projects delivered with Mindlind. Preserve that attribution.</li>
        </ul>
      </section>

      <section aria-labelledby="fit">
        <h2 id="fit">3. Who this is for</h2>
        <p><strong>Does any of this sound familiar?</strong></p>
        <ul>
          <li>Your WordPress site works, but every small change turns into a bigger problem.</li>
          <li>Your WooCommerce checkout needs fixing, or your store needs functionality the current plugins cannot provide.</li>
          <li>Your team copies information between systems or repeats the same content updates by hand.</li>
          <li>You have a design ready and need someone to build it properly in WordPress, for your business or an agency client.</li>
          <li>You need someone to take over an existing site and keep improving it after the initial work is done.</li>
        </ul>
        <p>
          <strong>Suggested boundaries:</strong> projects that need an immediate
          launch without time for testing, or unlimited revisions without an
          agreed scope, are probably not a fit. [Confirm these boundaries and
          whether to state a minimum budget.]
        </p>
      </section>

      <section aria-labelledby="services">
        <h2 id="services">4. What I do</h2>
        <p>Six service groups, with relevant project examples where available.</p>
        <ul>
          {services.map((service) => (
            <li key={service.title}>
              <strong>{service.title}:</strong> {service.detail}
              {service.proof && (
                <p>
                  <strong>Related work:</strong>{" "}
                  <a href={service.proof.href}>{service.proof.name}</a>,{" "}
                  {service.proof.detail}.
                </p>
              )}
            </li>
          ))}
        </ul>
        <h3>Ways to work together</h3>
        <ul>
          <li><strong>A specific fix or improvement:</strong> resolve a defined issue, improve a page, or add a feature. Start by sharing the problem and your website.</li>
          <li><strong>A complete build or larger update:</strong> agree on the deliverables, milestones, and review stages for a new website, store, or substantial redesign.</li>
          <li><strong>Ongoing development:</strong> continue improving the site as your needs change. [Confirm how time is booked, how work is billed, and what maintenance includes.]</li>
        </ul>
      </section>

      <section aria-labelledby="work">
        <h2 id="work">5. Selected work</h2>
        <p>
          Start with these four projects. Each future entry needs the client's
          problem, my contribution, a result, and one relevant image or link.
          These result lines describe delivered functionality; add business
          metrics only where there is evidence.
        </p>
        {selectedWork.map(({ name, id, result }) => {
          const project = findWork(name);

          return (
            <article key={name} id={id}>
              <h3><a href={project.url}>{name}</a></h3>
              <ul>
                <li><strong>Contribution:</strong> {project.category}{project.client ? `, delivered with ${project.client}` : ""}.</li>
                <li><strong>Result:</strong> {result}</li>
                <li><strong>To add:</strong> [Original problem, exact scope, and any verified outcome or client feedback.]</li>
              </ul>
            </article>
          );
        })}
      </section>

      <section aria-labelledby="testimonials">
        <h2 id="testimonials">6. Client feedback</h2>
        <p>
          Three existing testimonial excerpts, immediately after the work.
          Source: reviews already on the website, attributed there to the{" "}
          <a href={PROFILES.upwork}>Upwork profile</a>.
        </p>
        {testimonialCandidates.map((testimonial) => (
          <article key={testimonial.focus}>
            <h3>{testimonial.focus}</h3>
            <blockquote><p>“{testimonial.quote}”</p></blockquote>
            <p>[Client name · role/company · confirm attribution and permission.]</p>
          </article>
        ))}
        <p>Keep only quotes that can be properly attributed; do not invent names.</p>
      </section>

      <section aria-labelledby="process">
        <h2 id="process">7. How it works</h2>
        <p>Proposed process copy:</p>
        <ol>
          <li><strong>Tell me what you need.</strong> Share your website or designs, what you want to build or fix, and your budget and timing.</li>
          <li><strong>Agree on the scope.</strong> I review the setup, ask questions, and outline the work, price, and schedule before we start.</li>
          <li><strong>Build and review.</strong> I develop in agreed stages, share progress, and collect your feedback on a preview.</li>
          <li><strong>Launch and continue.</strong> Test the agreed functionality, launch, and hand over access and guidance. [Define included post-launch support and options for ongoing work.]</li>
        </ol>
        <h3>What's included</h3>
        <p>Proposed commitments to confirm and adapt to the agreed scope:</p>
        <ul>
          <li><strong>Responsive layouts:</strong> check the pages I build or change on desktop and mobile.</li>
          <li><strong>Functional testing:</strong> test the agreed forms, navigation, and store flows before delivery.</li>
          <li><strong>Editable content:</strong> set up the text, images, pages, or products your team needs to manage.</li>
          <li><strong>Handover:</strong> provide the agreed files and access, plus guidance for using what I deliver. [Confirm documentation and walkthrough format.]</li>
          <li><strong>Post-launch support:</strong> a defined window for issues with the delivered work. [Confirm duration, coverage, and response expectations.]</li>
        </ul>
      </section>

      <section aria-labelledby="pricing">
        <h2 id="pricing">8. What it costs</h2>
        <p>
          Proposed format: starting prices or typical ranges for improvements,
          WooCommerce work, custom functionality, and a full website.
          [Set amounts, currency, and minimum engagement; add the billing model
          for ongoing development.]
        </p>
        <p><strong>Until prices are agreed, explain how the quote is built:</strong></p>
        <ul>
          <li>Scope: pages, features, integrations, and what already exists.</li>
          <li>Preparation: whether designs, content, and translations are ready.</li>
          <li>Delivery: testing, migration, deadline, and support requirements.</li>
          <li>Separate costs: hosting, domains, paid plugins, and other licenses.</li>
        </ul>
        <p>
          <strong>Sample copy:</strong> Send me your website or brief and the changes
          you need. After reviewing the scope, I'll send a written estimate with
          deliverables, timing, and costs before work begins. [Confirm whether
          initial investigation is free or paid.]
        </p>
      </section>

      <section aria-labelledby="about">
        <h2 id="about">9. Who you'll be working with</h2>
        <p>
          <strong>Sample copy:</strong> I'm {AUTHOR_NAME}, a web developer working
          with WordPress, WooCommerce, and modern frontend development. My
          portfolio includes online stores, business websites, and multilingual
          content automation, with projects for direct clients and through Mindlind.
        </p>
        <ul>
          <li>Photo: [Use the existing portrait when we move to design.]</li>
          <li>Reasons to work together: direct communication with the developer, frontend experience, and custom development beyond standard site setup.</li>
          <li>Keep this to a short introduction supported by the work and feedback above.</li>
        </ul>
      </section>

      <section aria-labelledby="faq">
        <h2 id="faq">10. FAQ</h2>
        <p>Questions to answer, with notes for the next writing pass:</p>
        <dl>
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt><strong>{faq.question}</strong></dt>
              <dd>{faq.direction}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="contact">
        <h2 id="contact">11. Closing CTA / Contact</h2>
        <p><strong>Headline:</strong> What do you need to build, fix, or improve?</p>
        <p>
          <strong>Sample copy:</strong> Send me your website and what you want to
          build, fix, or improve. I'll review it, ask any missing questions, and
          explain the next step. If you don't have a website yet, a short
          description of the project is enough to start.
        </p>
        <p>
          <strong>Helpful to include:</strong> a link, screenshot, or example of
          the problem, plus any budget or deadline you already have in mind.
          You don't need a finished brief to send the first message.
        </p>
        <ul>
          <li><strong>Primary CTA:</strong> <a href={PROFILES.telegram}>Start a project on Telegram</a>.</li>
          <li><strong>Prefer email?</strong> [Add your preferred project enquiry email address.]</li>
          <li><strong>Other existing options:</strong> <a href={PROFILES.upwork}>Upwork</a> or <a href={PROFILES.linkedin}>LinkedIn</a>.</li>
          <li><strong>Optional brief form:</strong> name, email, website URL if available, and what you need help with. Budget and deadline can be optional.</li>
          <li><strong>What you receive next:</strong> questions to clarify the scope, followed by a written estimate of deliverables, timing, and cost. If the site needs investigation first, agree on that step and any cost before it begins.</li>
          <li><strong>Set expectations:</strong> [Reply within X business days; estimate within Y days after the scope is clear.]</li>
        </ul>
      </section>

      <aside aria-labelledby="optional">
        <h2 id="optional">Optional content to consider</h2>
        <p>Planning notes, outside the core eleven-section outline:</p>
        <ul>
          <li><strong>Writing and videos:</strong> an optional small link block near the end for <a href={PROFILES.youtube}>YouTube</a> and <a href={PROFILES.threads}>Threads</a>.</li>
          <li><strong>Technical compatibility:</strong> WordPress, WooCommerce, JavaScript, React, and Next.js are represented on the existing site. Include a compact list only if agencies or technical buyers need it.</li>
          <li><strong>Current capacity:</strong> use the hero availability line; add a specific slot count only if it is accurate.</li>
          <li><strong>Free audit:</strong> leave out unless you want to offer it and can define its limits.</li>
          <li><strong>Freelancer / agency comparison:</strong> leave out for now; revisit only with a clear positioning and price comparison.</li>
        </ul>
        <p>
          <strong>For review:</strong> confirm the audience, service priorities,
          project outcomes, testimonial attribution, pricing approach, included
          work, support terms, enquiry email, and response time before turning
          this outline into final copy and design.
        </p>
      </aside>
      </div>
    </div>
  );
}
