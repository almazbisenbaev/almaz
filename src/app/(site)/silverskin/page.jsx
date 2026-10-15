import Link from "next/link";
import { ArrowUpRight, House } from "lucide-react";

import { findWork } from "@/data/works";
import { OPEN_GRAPH_IMAGE, PROFILES, TWITTER_IMAGE } from "@/lib/site";
import { ProjectImage, ProjectVideo } from "./project-media";
import styles from "./case-study.module.css";

const project = findWork("Silverskin Coffee");
const liveUrl = `https://${project.title}/`;
const title = "Silverskin Coffee — Case Study";
const description = "A closer look at the WordPress and WooCommerce development for Silverskin Coffee Roasters, from the storefront to coffee subscriptions.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/silverskin" },
  openGraph: {
    title,
    description,
    url: "/silverskin",
    type: "website",
    images: [{ ...OPEN_GRAPH_IMAGE, alt: "Almaz Bisenbaev — Web Developer" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [TWITTER_IMAGE] },
};

function Story({ id, title, children }) {
  return (
    <div className={styles.story}>
      <h2 id={id}>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

export default function PageSilverskin() {
  return (
    <article className={`site-container ${styles.page}`} aria-labelledby="project-title">
      <header className={styles.intro}>
        <p className={styles.eyebrow}>{project.year} <span>·</span> E-commerce <span>·</span> Development</p>
        <h1 id="project-title">Silverskin Coffee Roasters</h1>
        <p className={styles.description}>
          A WordPress and WooCommerce website for a Dublin coffee roastery.
          Specialty coffee, subscriptions, and the story behind every roast.
        </p>
        <dl className={styles.facts}>
          <div><dt>My role</dt><dd>{project.category}</dd></div>
          <div><dt>Built with</dt><dd>{project.skills.join(" · ")}</dd></div>
        </dl>
      </header>

      <section aria-labelledby="overview-title">
        <div className={styles.overview}>
          <h2 id="overview-title">Overview</h2>
          <p>
            I developed an online home for Silverskin that brings its coffee,
            character, and commerce together. A custom storefront built on
            WordPress, with WooCommerce powering the shopping experience.
          </p>
        </div>
        <ProjectVideo
          src="/videos/silverskin-home.webm"
          poster="/images/silverskin-1.webp"
          label="Silverskin homepage walkthrough"
          caption="The storefront in motion — from the first impression to the coffee collection."
          width={1920}
          height={1080}
          priority
        />
      </section>

      <section className={styles.section} aria-labelledby="shop-title">
        <Story id="shop-title" title="Shopping for coffee">
          The coffee takes the lead. A spacious catalogue pairs product imagery
          with origins and tasting notes, while categories help visitors explore
          the range. Product pages bring the details, grind selection, and
          add-to-basket controls together in one place.
        </Story>
        <ProjectImage
          src="/images/silverskin-3.webp"
          alt="Silverskin coffee catalogue with category filters, coffee tins, and boxed specialty coffees"
          width={2880}
          height={7084}
          caption="The coffee catalogue. Open the image to explore the full page."
          variant="catalogue"
        />
      </section>

      <section className={styles.section} aria-labelledby="subscriptions-title">
        <Story id="subscriptions-title" title="Make it a coffee ritual">
          One bag or a regular delivery. Alongside individual products, the
          subscription page lets customers choose their coffee, roast, grind,
          number of deliveries, and frequency. Both journeys share the same
          stripped-back visual language.
        </Story>
        <div className={styles.pair}>
          <ProjectImage
            src="/images/silverskin-4.webp"
            alt="Silverskin product page with a coffee tin, grind selector, quantity controls, and a subscription banner"
            width={2880}
            height={4594}
            caption="A closer look at the coffee."
            variant="portrait"
          />
          <ProjectImage
            src="/images/silverskin-5.webp"
            alt="Silverskin subscription page with coffee, roast, grind, delivery count, and frequency selectors"
            width={2880}
            height={4968}
            caption="A delivery tailored to the daily routine."
            variant="portrait"
          />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="story-title">
        <Story id="story-title" title="More than a shop">
          The roastery has a story of its own. Photography and editorial
          sections introduce the people, the roasting process, and the growers
          behind the coffee. The website gives that story room alongside the
          products.
        </Story>
        <ProjectImage
          src="/images/silverskin-2.webp"
          alt="Silverskin Our Story page, with a roaster at work beneath the headline Dublin Born Since 2012"
          width={2880}
          height={7628}
          caption="A dedicated space for the roastery and its worldwide coffee partners."
          variant="story"
        />
      </section>

      <section className={styles.section} aria-labelledby="details-title">
        <Story id="details-title" title="The connecting details">
          A full-screen menu brings the different parts of the site together.
          Even the empty cart keeps the brand present, with a playful espresso
          machine and clear routes back to coffee, products, and subscriptions.
        </Story>
        <ProjectVideo
          src="/videos/silverskin-hamburger.webm"
          poster="/images/silverskin-1.webp"
          label="Silverskin full-screen navigation walkthrough"
          caption="The full-screen navigation in action."
          width={3420}
          height={1942}
        />
        <div className={styles.detailImage}>
          <ProjectImage
            src="/images/silverskin-6.webp"
            alt="Silverskin empty cart with an iridescent espresso machine and links back to the shop"
            width={2880}
            height={2724}
            caption="An empty cart with somewhere to go next."
            variant="empty"
          />
        </div>
      </section>

      <footer className={styles.projectFooter}>
        <div className={styles.footerSummary}>
          <span className={styles.eyebrow}>Silverskin Coffee · {project.year}</span>
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
            Visit the live website <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className={styles.contact}>
          <p>Have a project in mind?</p>
          <a href={PROFILES.telegram} target="_blank" rel="noopener noreferrer">
            Let’s talk <ArrowUpRight size={22} aria-hidden="true" />
          </a>
        </div>
      </footer>

      <nav className={styles.dock} aria-label="Case study navigation">
        <Link href="/" aria-label="Back to portfolio"><House size={17} aria-hidden="true" /><span>Portfolio</span></Link>
        <span className={styles.dockDivider} aria-hidden="true" />
        <a href={liveUrl} target="_blank" rel="noopener noreferrer"><span>Live site</span><ArrowUpRight size={16} aria-hidden="true" /></a>
      </nav>
    </article>
  );
}
