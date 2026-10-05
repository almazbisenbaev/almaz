"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  Arrow,
  ConceptLinks,
  MotionControl,
  ProjectImage,
  conceptProjects,
  useConceptMotion,
} from "@/components/concepts/concept-kit";
import { PROFILES } from "@/lib/site";
import { reviews } from "@/data/reviews";

function animateRedline(gsap, ScrollTrigger, root) {
  gsap.from(".red-title-line > span", {
    yPercent: 110,
    rotate: 3,
    stagger: 0.12,
    duration: 1.05,
    ease: "power4.out",
  });
  gsap.from(".red-hero-bottom > *", {
    y: 25,
    opacity: 0,
    stagger: 0.12,
    duration: 0.7,
    delay: 0.5,
  });
  gsap.to(".red-asterisk", {
    rotation: 150,
    ease: "none",
    scrollTrigger: {
      trigger: ".red-hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
  gsap.to(".red-marquee-track", {
    xPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".red-manifesto",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
  gsap.utils
    .toArray(".red-reveal")
    .forEach((item) =>
      gsap.from(item, {
        y: 55,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 90%", once: true },
      }),
    );

  const media = gsap.matchMedia();
  media.add("(min-width: 900px)", () => {
    root.dataset.gallery = "scroll";
    const track = root.querySelector(".red-work-track");
    const viewport = root.querySelector(".red-work-viewport");
    const distance = () =>
      Math.max(0, track.scrollWidth - viewport.clientWidth);
    const animation = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: ".red-work",
        pin: true,
        anticipatePin: 1,
        start: "top top",
        end: () => `+=${distance()}`,
        scrub: 0.7,
        invalidateOnRefresh: true,
      },
    });
    // Bring keyboard-focused projects into view along the pinned scroll path.
    const onFocus = (event) => {
      const card = event.target.closest(".red-project");
      if (!card) return;
      const trigger = animation.scrollTrigger;
      window.scrollTo({
        top: trigger.start + Math.min(card.offsetLeft, distance()),
        behavior: "instant",
      });
    };
    track.addEventListener("focusin", onFocus);
    return () => {
      track.removeEventListener("focusin", onFocus);
      delete root.dataset.gallery;
    };
  });
  return () => media.revert();
}

function Asterisk() {
  return (
    <svg
      className="red-asterisk"
      viewBox="0 0 240 240"
      fill="currentColor"
      aria-hidden="true"
    >
      {Array.from({ length: 6 }, (_, i) => (
        <rect
          key={i}
          x="108"
          y="4"
          width="24"
          height="232"
          transform={`rotate(${i * 30} 120 120)`}
        />
      ))}
      <circle cx="120" cy="120" r="32" fill="#f0442d" />
    </svg>
  );
}

export default function Redline() {
  const root = useRef(null);
  const motion = useConceptMotion(root, animateRedline);
  return (
    <div className="red" ref={root} data-motion={motion.active ? "on" : "off"}>
      <a className="cx-skip" href="#red-main">
        Skip to content
      </a>
      <header className="red-header" id="red-top">
        <a href="#red-top" className="red-logo">
          AB<span>®</span>
        </a>
        <span className="red-header-note">
          ALMAZ BISENBAEV
          <br />
          INDEPENDENT WEB DEVELOPER
        </span>
        <nav aria-label="Main navigation">
          <a href="#red-work">
            Selected work <sup>03</sup>
          </a>
          <a href="#red-about">The approach</a>
          <a href={PROFILES.telegram} className="red-header-contact">
            Let’s talk <Arrow />
          </a>
        </nav>
      </header>
      <main id="red-main">
        <section className="red-hero" aria-labelledby="red-title">
          <div className="red-hero-kicker">
            <span>DESIGN-MINDED. DETAIL-OBSESSED.</span>
            <span>BASED IN KAZAKHSTAN / WORKING EVERYWHERE</span>
          </div>
          <h1 id="red-title">
            <span className="red-title-line">
              <span>GOOD WEBSITES.</span>
            </span>
            <span className="red-title-line red-title-second">
              <span>ZERO BORING.</span>
            </span>
          </h1>
          <div className="red-hero-bottom">
            <p>
              I turn good ideas into websites
              <br />
              with a point of view. Thoughtful builds.
              <br />
              Unexpected details. All the way through.
            </p>
            <div className="red-hero-stamp">
              <Asterisk />
              <span>
                GOOD DESIGN
                <br />
                MEETS GOOD CODE
              </span>
            </div>
            <a href="#red-work" className="red-explore">
              <span>
                SCROLL TO
                <br />
                SEE WHAT I MEAN
              </span>
              <Arrow direction="down" />
            </a>
          </div>
          <div className="red-hero-foot">
            <span>CREATIVE DEVELOPMENT & WORDPRESS</span>
            <MotionControl motion={motion} />
            <span>VOL. 08 / SELECTED WORK</span>
          </div>
        </section>

        <section
          className="red-work"
          id="red-work"
          aria-labelledby="red-work-title"
        >
          <div className="red-work-heading">
            <h2 id="red-work-title">PROOF, NOT PROMISES.</h2>
            <span>
              THREE PROJECTS. THREE DIFFERENT WORLDS.{" "}
              <span aria-hidden="true">↘</span>
            </span>
          </div>
          <div className="red-work-viewport">
            <div className="red-work-track">
              {conceptProjects.map((project, i) => (
                <article className="red-project" key={project.name}>
                  <div className="red-project-heading">
                    <span>
                      0{i + 1} / {project.year}
                    </span>
                    <span>{project.type}</span>
                  </div>
                  <a
                    className="red-project-visual"
                    href={project.url}
                    style={{ background: project.tone }}
                  >
                    <div className="red-project-browser">
                      <div>
                        <i />
                        <i />
                        <i />
                        <span>{project.title}</span>
                      </div>
                      <ProjectImage project={project} />
                    </div>
                    <span className="red-view">
                      EXPLORE PROJECT <Arrow />
                    </span>
                    <span className="red-project-big-number" aria-hidden="true">
                      0{i + 1}
                    </span>
                  </a>
                  <div className="red-project-caption">
                    <div>
                      <h3>
                        <a href={project.url}>{project.name}</a>
                      </h3>
                      <p>{project.short}</p>
                      {project.client && (
                        <span className="cx-credit">
                          Built with{" "}
                          <a href={project.clientUrl}>{project.client}</a>
                        </span>
                      )}
                    </div>
                    <a
                      href={project.url}
                      aria-label={`Explore ${project.name}`}
                    >
                      <Arrow />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="red-work-bottom">
            <span>BUILT TO LOOK GOOD. BUILT TO WORK.</span>
            <span className="red-scroll-hint">KEEP SCROLLING TO EXPLORE →</span>
          </div>
        </section>

        <section className="red-manifesto" id="red-about">
          <div className="red-marquee" aria-hidden="true">
            <div className="red-marquee-track">
              SMALL DETAILS. BIG DIFFERENCE. SMALL DETAILS. BIG DIFFERENCE.
            </div>
          </div>
          <div className="red-about-grid">
            <div className="red-about-label">
              <span>
                THE PERSON
                <br />
                BEHIND THE PIXELS.
              </span>
              <Image
                src="/me.jpg"
                alt="Almaz Bisenbaev"
                width={112}
                height={112}
                sizes="112px"
              />
            </div>
            <div className="red-about-copy red-reveal">
              <h2>
                A developer’s brain.
                <br />A designer’s eye.
                <br />
                <span>Your next collaborator.</span>
              </h2>
              <p>
                Hey, I’m Almaz. I build websites that bring the whole idea
                together: the way it looks, the way it feels, and the way it
                works. From a custom WordPress site to a shop with a little more
                soul.
              </p>
              <a href={PROFILES.linkedin}>
                A little more about me <Arrow />
              </a>
            </div>
          </div>
          <div className="red-services">
            {[
              {
                n: "01",
                name: "Websites with character",
                text: "Custom WordPress builds, thoughtful interfaces, and motion that makes sense.",
              },
              {
                n: "02",
                name: "Commerce that flows",
                text: "WooCommerce experiences that make finding, choosing, and buying feel simple.",
              },
              {
                n: "03",
                name: "Ideas made real",
                text: "From a rough sketch to an interactive prototype, useful tool, or your next digital product.",
              },
            ].map((service) => (
              <div className="red-service red-reveal" key={service.n}>
                <span>{service.n}</span>
                <h3>{service.name}</h3>
                <p>{service.text}</p>
                <Arrow />
              </div>
            ))}
          </div>
        </section>

        <section className="red-lab">
          <div className="red-lab-heading red-reveal">
            <span>OFF THE CLOCK, STILL MAKING.</span>
            <h2>
              THE SIDE
              <br />
              QUESTS.
            </h2>
            <p>
              Small experiments.
              <br />
              Very real curiosity.
            </p>
          </div>
          <div className="red-lab-projects">
            <a
              href="https://polyglossa-beta.vercel.app"
              className="red-lab-item red-reveal"
            >
              <Image
                src="/images/project-polyglossa.jpg"
                alt="Polyglossa language practice app"
                width={800}
                height={600}
                sizes="(max-width: 700px) 90vw, 40vw"
              />
              <div>
                <h3>
                  Polyglossa <sup>β</sup>
                </h3>
                <p>Language practice, one conversation at a time.</p>
                <Arrow />
              </div>
            </a>
            <a
              href="https://www.figma.com/community/file/1452663046127877131/glowy-icons-v1-0"
              className="red-lab-item red-reveal"
            >
              <Image
                src="/images/project-glowy.jpg"
                alt="Glowy Icons colourful vector icon collection"
                width={800}
                height={600}
                sizes="(max-width: 700px) 90vw, 40vw"
              />
              <div>
                <h3>Glowy Icons</h3>
                <p>A small dose of colour for your next interface.</p>
                <Arrow />
              </div>
            </a>
          </div>
        </section>
        <section className="red-quote red-reveal">
          <span>A WORD FROM THE OTHER SIDE.</span>
          <blockquote>“{reviews[4].quote}”</blockquote>
          <a href={PROFILES.upwork}>
            Client feedback on Upwork <Arrow />
          </a>
        </section>
      </main>
      <footer className="red-footer" id="red-contact">
        <div className="red-footer-top">
          <span>GOT SOMETHING IN MIND?</span>
          <span>LET’S GIVE IT SOME CHARACTER.</span>
        </div>
        <a className="red-footer-cta" href={PROFILES.telegram}>
          LET’S TALK.
          <Arrow />
        </a>
        <div className="red-footer-bottom">
          <span>© {new Date().getFullYear()} ALMAZ BISENBAEV</span>
          <div>
            <a href={PROFILES.linkedin}>LINKEDIN ↗</a>
            <a href={PROFILES.youtube}>YOUTUBE ↗</a>
          </div>
          <a href="#red-top">BACK TO TOP ↑</a>
        </div>
        <ConceptLinks current={8} />
      </footer>
    </div>
  );
}
