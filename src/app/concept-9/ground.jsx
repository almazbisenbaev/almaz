"use client";

import { useRef, useState } from "react";
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

function animateGround(gsap) {
  gsap.from(".ground-hero-copy > *", {
    opacity: 0,
    y: 30,
    duration: 1.1,
    stagger: 0.14,
    ease: "power3.out",
  });
  gsap.from(".ground-contour-line", {
    opacity: 0,
    scale: 0.7,
    transformOrigin: "50% 50%",
    stagger: 0.025,
    duration: 1.6,
    ease: "power2.out",
  });
  gsap.to(".ground-contours", {
    rotation: 30,
    yPercent: -12,
    ease: "none",
    scrollTrigger: {
      trigger: ".ground-hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });
  gsap.utils
    .toArray(".ground-reveal")
    .forEach((item) =>
      gsap.from(item, {
        y: 45,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: item, start: "top 90%", once: true },
      }),
    );
  gsap.utils
    .toArray(".ground-project-visual img")
    .forEach((item) =>
      gsap.fromTo(
        item,
        { yPercent: 5, rotation: -2 },
        {
          yPercent: -5,
          rotation: 2,
          ease: "none",
          scrollTrigger: {
            trigger: item.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      ),
    );
  gsap.from(".ground-growing-line", {
    scaleY: 0,
    transformOrigin: "top",
    ease: "none",
    scrollTrigger: {
      trigger: ".ground-process",
      start: "top 70%",
      end: "bottom 60%",
      scrub: 0.7,
    },
  });
}

// Deterministic contours keep the server render and hydration identical.
function contourPath(index, terrain) {
  const points = Array.from({ length: 180 }, (_, point) => {
    const angle = (point / 180) * Math.PI * 2;
    const base = 28 + index * 7.8;
    const wave =
      Math.sin(angle * 3 + terrain * 0.8 + index * 0.035) * 0.15 +
      Math.cos(angle * 2 - terrain * 0.7) * 0.13 +
      Math.sin(angle * 5 + index * 0.065) * 0.035;
    const radius = base * (1 + wave);
    return `${(300 + Math.cos(angle) * radius).toFixed(2)},${(300 + Math.sin(angle) * radius * 1.07).toFixed(2)}`;
  });
  return `M${points.join("L")}Z`;
}

function Contours() {
  const [terrain, setTerrain] = useState(0);
  return (
    <div className="ground-map">
      <div className="ground-map-caption">
        <span>AN EXPLORATION IN FORM</span>
        <span aria-live="polite">FIG. 0{terrain + 1}</span>
      </div>
      <div className="ground-map-cross ground-cross-one" aria-hidden="true">
        +
      </div>
      <div className="ground-map-cross ground-cross-two" aria-hidden="true">
        +
      </div>
      <svg
        viewBox="0 0 600 600"
        className="ground-contours"
        role="img"
        aria-label={`Abstract topographic landscape, variation ${terrain + 1}`}
      >
        <g fill="none">
          {Array.from({ length: 28 }, (_, i) => (
            <path
              className="ground-contour-line"
              key={i}
              d={contourPath(i, terrain)}
              stroke={i % 5 === 0 ? "#dcf29b" : "#98bca2"}
              strokeOpacity={0.36 + i / 70}
              strokeWidth={i % 5 === 0 ? 1.5 : 0.8}
            />
          ))}
        </g>
      </svg>
      <div className="ground-map-point">
        <i />
        <span>
          ROOM FOR
          <br />
          SOMETHING GOOD.
        </span>
      </div>
      <div className="ground-map-bottom">
        <span>GOOD THINGS TAKE SHAPE.</span>
        <button
          type="button"
          onClick={() => setTerrain((n) => (n + 1) % 3)}
          aria-label="Change the contour landscape"
        >
          A new perspective <span aria-hidden="true">↻</span>
        </button>
      </div>
    </div>
  );
}

const steps = [
  {
    title: "Find the common ground.",
    tag: "01 / LISTEN",
    text: "What are you making? Who is it for? We start with the real questions, find the useful idea, and agree on what the website needs to do.",
  },
  {
    title: "Make room for character.",
    tag: "02 / MAKE",
    text: "A clear structure, carefully chosen type, and the right interactions. I bring design awareness and development together in a working website you can explore.",
  },
  {
    title: "Sweat the small things.",
    tag: "03 / REFINE",
    text: "The mobile view. The loading state. The checkout. The handover. We work through the details that make a website feel easy, even when a lot is happening underneath.",
  },
];

export default function Ground() {
  const root = useRef(null);
  const [step, setStep] = useState(0);
  const motion = useConceptMotion(root, animateGround);
  return (
    <div
      className="ground"
      ref={root}
      data-motion={motion.active ? "on" : "off"}
    >
      <a className="cx-skip" href="#ground-main">
        Skip to content
      </a>
      <header className="ground-header" id="ground-top">
        <a href="#ground-top" className="ground-brand">
          <span className="ground-brand-symbol" aria-hidden="true">
            a.
          </span>
          <span>
            Common Ground<small>THE DIGITAL PRACTICE OF ALMAZ</small>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#ground-work">Selected work</a>
          <a href="#ground-process">The process</a>
          <a href={PROFILES.telegram}>
            Say hello <Arrow />
          </a>
        </nav>
      </header>
      <main id="ground-main">
        <section className="ground-hero" aria-labelledby="ground-title">
          <div className="ground-hero-copy">
            <span className="ground-eyebrow">
              <i /> INDEPENDENT DEVELOPER, HUMAN FIRST.
            </span>
            <h1 id="ground-title">
              A little
              <br />
              more <em>human.</em>
            </h1>
            <p>
              Thoughtful websites for people
              <br />
              with something good to put into the world.
            </p>
            <a href="#ground-work" className="ground-pill">
              Find your way around <Arrow direction="down" />
            </a>
            <div className="ground-hero-signoff">
              <span>
                ROOTED IN KAZAKHSTAN.
                <br />
                CONNECTED EVERYWHERE.
              </span>
              <svg
                viewBox="0 0 90 40"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M2 32C25-12 10 65 39 12s-10 30 13 7 7 14 24-5M25 32l57-12"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
          <Contours />
          <div className="ground-hero-bottom">
            <span>DEVELOPMENT / DESIGN SENSIBILITY / A LITTLE CURIOSITY</span>
            <MotionControl motion={motion} />
            <a href="#ground-intro">A NOTE FROM ME ↓</a>
          </div>
        </section>

        <section className="ground-intro ground-reveal" id="ground-intro">
          <div className="ground-person">
            <Image
              src="/me.jpg"
              width={72}
              height={72}
              sizes="72px"
              alt="Almaz Bisenbaev"
            />
            <span>
              Hi, I’m Almaz.<small>Nice to meet you.</small>
            </span>
          </div>
          <p>
            I’m a full-stack web developer with an eye for design. I help people
            turn ideas into useful, expressive websites.{" "}
            <span>The sort that feel right, from the first hello.</span>
          </p>
          <span className="ground-intro-flower" aria-hidden="true">
            ✳
          </span>
        </section>

        <section
          className="ground-work"
          id="ground-work"
          aria-labelledby="ground-work-title"
        >
          <div className="ground-section-heading ground-reveal">
            <span className="ground-eyebrow">01 / SELECTED WORK</span>
            <h2 id="ground-work-title">
              Different worlds.
              <br />
              <em>The same care.</em>
            </h2>
            <p>
              A few things I’ve helped
              <br />
              bring to life on the web.
            </p>
          </div>
          <div className="ground-projects">
            {[conceptProjects[1], conceptProjects[0], conceptProjects[2]].map(
              (project, index) => (
                <article
                  className={`ground-project ground-project-${index} ground-reveal`}
                  key={project.name}
                >
                  <a href={project.url} className="ground-project-visual">
                    <span className="ground-project-label">
                      FIELDWORK / 0{index + 1}
                    </span>
                    <div className="ground-project-frame">
                      <ProjectImage
                        project={project}
                        sizes="(max-width: 700px) 90vw, 50vw"
                      />
                    </div>
                    <span className="ground-project-stamp" aria-hidden="true">
                      MADE
                      <br />
                      WITH
                      <br />
                      <em>care.</em>
                    </span>
                    <span className="ground-project-open">
                      <Arrow />
                    </span>
                  </a>
                  <div className="ground-project-caption">
                    <div>
                      <h3>
                        <a href={project.url}>{project.name}</a>
                      </h3>
                      <p>{project.short}</p>
                      {project.client && (
                        <span className="cx-credit">
                          In collaboration with{" "}
                          <a href={project.clientUrl}>{project.client}</a>
                        </span>
                      )}
                    </div>
                    <span>
                      {project.year}
                      <br />
                      {project.skills.slice(0, 2).join(" / ")}
                    </span>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="ground-process" id="ground-process">
          <div className="ground-process-heading ground-reveal">
            <span className="ground-eyebrow">02 / HOW GOOD THINGS HAPPEN</span>
            <h2>
              A shared idea.
              <br />A considered
              <br />
              <em>way forward.</em>
            </h2>
            <p>
              Good work starts with a conversation.
              <br />
              Then we make it happen, together.
            </p>
            <div className="ground-process-mark" aria-hidden="true">
              <div />
              <div />
              <div />
            </div>
          </div>
          <div className="ground-steps">
            <span className="ground-growing-line" aria-hidden="true" />
            {steps.map((item, i) => (
              <article
                className={`ground-step ${i === step ? "is-open" : ""}`}
                key={item.tag}
              >
                <h3>
                  <button
                    onClick={() => setStep(step === i ? null : i)}
                    aria-expanded={step === i}
                    aria-controls={`ground-step-${i}`}
                  >
                    <small>{item.tag}</small>
                    <span>{item.title}</span>
                    <b aria-hidden="true">{i === step ? "−" : "+"}</b>
                  </button>
                </h3>
                <div id={`ground-step-${i}`} hidden={step !== i}>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
            <a href={PROFILES.telegram} className="ground-process-cta">
              Let’s find our starting point <Arrow />
            </a>
          </div>
        </section>

        <section className="ground-notes">
          <div className="ground-notes-heading ground-reveal">
            <span className="ground-eyebrow">
              03 / NOTES FROM THE WORKBENCH
            </span>
            <h2>
              Curiosity has
              <br />
              <em>side projects.</em>
            </h2>
            <p>
              Things I make, explore, and share
              <br />
              when the brief is my own.
            </p>
          </div>
          <a
            className="ground-note ground-reveal"
            href="https://polyglossa-beta.vercel.app"
          >
            <div className="ground-note-art ground-note-language">
              <span>hola.</span>
              <span>сәлем.</span>
              <span>hello.</span>
              <i>β</i>
            </div>
            <span className="ground-eyebrow">A LITTLE PRACTICE, EVERY DAY</span>
            <h3>
              Polyglossa <Arrow />
            </h3>
            <p>Language practice through conversations with AI friends.</p>
          </a>
          <a
            className="ground-note ground-reveal"
            href="https://www.figma.com/community/file/1452663046127877131/glowy-icons-v1-0"
          >
            <div className="ground-note-art">
              <Image
                src="/images/project-glowy.jpg"
                alt="A selection of colourful Glowy Icons"
                width={800}
                height={600}
                sizes="(max-width: 700px) 90vw, 30vw"
              />
            </div>
            <span className="ground-eyebrow">SMALL THINGS, BRIGHT IDEAS</span>
            <h3>
              Glowy Icons <Arrow />
            </h3>
            <p>
              Colourful vector icons for a friendlier corner of the internet.
            </p>
          </a>
        </section>

        <section className="ground-quote ground-reveal">
          <span className="ground-eyebrow">A KIND WORD GOES A LONG WAY.</span>
          <span className="ground-quote-mark" aria-hidden="true">
            “
          </span>
          <blockquote>{reviews[5].quote}</blockquote>
          <a href={PROFILES.upwork}>
            A client, via Upwork <Arrow />
          </a>
        </section>
      </main>
      <footer className="ground-footer" id="ground-contact">
        <div className="ground-footer-invite">
          <span className="ground-eyebrow">
            EVERY GOOD THING STARTS SOMEWHERE.
          </span>
          <h2>
            Shall we make
            <br />
            <em>something good?</em>
          </h2>
          <a className="ground-pill" href={PROFILES.telegram}>
            I’d love to hear about it <Arrow />
          </a>
          <span className="ground-footer-flower" aria-hidden="true">
            ✳
          </span>
        </div>
        <div className="ground-footer-bottom">
          <span>
            Almaz Bisenbaev © {new Date().getFullYear()}
            <small>Built with care. A little off the beaten path.</small>
          </span>
          <div>
            <a href={PROFILES.linkedin}>LinkedIn ↗</a>
            <a href={PROFILES.youtube}>YouTube ↗</a>
            <a href="#ground-top">Back to the top ↑</a>
          </div>
        </div>
        <ConceptLinks current={9} />
      </footer>
    </div>
  );
}
