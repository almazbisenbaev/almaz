"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Folder,
  UserRound,
  Terminal,
  Send,
  RotateCcw,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Command,
} from "lucide-react";
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

function animateOffscreen(gsap) {
  gsap.from(".desk-intro h1 > span", {
    opacity: 0,
    y: 35,
    stagger: 0.1,
    duration: 0.9,
    ease: "power3.out",
  });
  // Animate the inner shell; the outer window transform belongs to dragging.
  gsap.from(".desk-window-inner", {
    opacity: 0,
    y: 45,
    scale: 0.94,
    stagger: 0.17,
    delay: 0.2,
    duration: 1,
    ease: "power3.out",
    clearProps: "transform,opacity",
  });
  gsap.utils
    .toArray(".desk-reveal")
    .forEach((item) =>
      gsap.from(item, {
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 91%", once: true },
      }),
    );
  const media = gsap.matchMedia();
  media.add("(min-width: 900px)", () => {
    gsap.utils
      .toArray(".desk-case")
      .slice(0, -1)
      .forEach((item) =>
        gsap.to(item.querySelector(".desk-case-inner"), {
          scale: 0.95,
          rotation: -2,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top 85px",
            end: "bottom 85px",
            scrub: true,
          },
        }),
      );
  });
  return () => media.revert();
}

function DesktopWindow({
  id,
  title,
  icon: Icon,
  children,
  onClose,
  stage,
  front,
  onFront,
}) {
  const windowRef = useRef(null);
  const drag = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const reset = () => setPosition({ x: 0, y: 0 });
    window.addEventListener("resize", reset);
    return () => window.removeEventListener("resize", reset);
  }, []);

  const boundedPosition = (x, y) => {
    const outer = stage.current.getBoundingClientRect();
    const inner = windowRef.current.getBoundingClientRect();
    return {
      x: Math.min(
        position.x + outer.right - inner.right - 8,
        Math.max(position.x + outer.left - inner.left + 8, x),
      ),
      y: Math.min(
        position.y + outer.bottom - inner.bottom - 8,
        Math.max(position.y + outer.top - inner.top + 8, y),
      ),
    };
  };

  const onPointerDown = (event) => {
    if (!window.matchMedia("(min-width: 900px)").matches || event.button !== 0)
      return;
    onFront(id);
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      startX: position.x,
      startY: position.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event) => {
    if (!drag.current) return;
    const start = drag.current;
    setPosition(
      boundedPosition(
        start.startX + event.clientX - start.x,
        start.startY + event.clientY - start.y,
      ),
    );
  };
  const onKeyDown = (event) => {
    if (!window.matchMedia("(min-width: 900px)").matches) return;
    const move = {
      ArrowLeft: [-20, 0],
      ArrowRight: [20, 0],
      ArrowUp: [0, -20],
      ArrowDown: [0, 20],
    }[event.key];
    if (move) {
      event.preventDefault();
      onFront(id);
      setPosition(boundedPosition(position.x + move[0], position.y + move[1]));
    }
    if (event.key === "Home") {
      event.preventDefault();
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <section
      className={`desk-window desk-window-${id}`}
      id={`desk-window-${id}`}
      ref={windowRef}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: front === id ? 5 : 2,
      }}
      aria-labelledby={`desk-label-${id}`}
      onPointerDown={() => onFront(id)}
      onFocus={() => onFront(id)}
    >
      <div className="desk-window-inner">
        <div className="desk-window-bar">
          <button
            type="button"
            className="desk-window-close"
            aria-label={`Close ${title}`}
            onClick={() => onClose(id)}
          >
            <X size={10} />
          </button>
          <button
            type="button"
            className="desk-window-handle"
            id={`desk-label-${id}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={() => {
              drag.current = null;
            }}
            onPointerCancel={() => {
              drag.current = null;
            }}
            onLostPointerCapture={() => {
              drag.current = null;
            }}
            onKeyDown={onKeyDown}
            aria-describedby="desk-drag-help"
          >
            <Icon size={13} />
            {title}
            <span aria-hidden="true">⠿</span>
          </button>
        </div>
        {children}
      </div>
    </section>
  );
}

function Desktop({ motion }) {
  const stage = useRef(null);
  const dock = useRef(null);
  const [open, setOpen] = useState({
    projects: true,
    about: true,
    tools: false,
  });
  const [front, setFront] = useState("projects");
  const [projectIndex, setProjectIndex] = useState(0);
  const [generation, setGeneration] = useState(0);
  const project = conceptProjects[projectIndex];
  const close = (id) => {
    setOpen((current) => ({ ...current, [id]: false }));
    dock.current.querySelector(`[data-window="${id}"]`)?.focus();
  };
  const toggle = (id) => {
    setOpen((current) => ({ ...current, [id]: !current[id] }));
    setFront(id);
  };
  const windowProps = { stage, front, onFront: setFront, onClose: close };

  return (
    <section className="desk-desktop" aria-labelledby="desk-title">
      <div className="desk-stage" ref={stage}>
        <div className="desk-intro">
          <span className="desk-label">A SMALL DESKTOP FOR BIG IDEAS.</span>
          <h1 id="desk-title">
            <span>Ideas in.</span>
            <span>Good things out.</span>
          </h1>
          <p>
            Websites, experiments, and a few open tabs.
            <br />
            Welcome to my little corner of the internet.
          </p>
        </div>
        <div className="desk-wallpaper-star" aria-hidden="true">
          ✳
        </div>
        {open.projects && (
          <DesktopWindow
            key={`projects-${generation}`}
            id="projects"
            title="selected-work.folder"
            icon={Folder}
            {...windowProps}
          >
            <div className="desk-browser-toolbar">
              <span>
                home / work / <b>0{projectIndex + 1}</b>
              </span>
              <div>
                <button
                  type="button"
                  aria-label="Previous featured project"
                  onClick={() => setProjectIndex((i) => (i + 2) % 3)}
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  type="button"
                  aria-label="Next featured project"
                  onClick={() => setProjectIndex((i) => (i + 1) % 3)}
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
            <a
              className="desk-browser-preview"
              href={project.url}
              style={{ background: project.tone }}
            >
              <ProjectImage
                project={project}
                priority
                sizes="(max-width: 900px) 85vw, 48vw"
              />
              <span className="desk-browser-open">
                OPEN PROJECT <Arrow />
              </span>
            </a>
            <div className="desk-browser-caption" aria-live="polite">
              <div>
                <h2>{project.name}</h2>
                <span>{project.type}</span>
                {project.client && (
                  <span className="cx-credit">
                    With <a href={project.clientUrl}>{project.client}</a>
                  </span>
                )}
              </div>
              <div
                className="desk-project-dots"
                role="group"
                aria-label="Choose a featured project"
              >
                {conceptProjects.map((item, i) => (
                  <button
                    type="button"
                    key={item.name}
                    aria-label={`Show ${item.name}`}
                    aria-pressed={projectIndex === i}
                    onClick={() => setProjectIndex(i)}
                  />
                ))}
              </div>
            </div>
          </DesktopWindow>
        )}
        {open.about && (
          <DesktopWindow
            key={`about-${generation}`}
            id="about"
            title="hello.txt"
            icon={UserRound}
            {...windowProps}
          >
            <div className="desk-about-card">
              <div className="desk-avatar">
                <Image
                  src="/me.jpg"
                  width={66}
                  height={66}
                  alt="Almaz Bisenbaev"
                  sizes="66px"
                />
                <span aria-hidden="true">✳</span>
              </div>
              <h2>Oh, hi. I’m Almaz.</h2>
              <p>
                Full-stack developer.
                <br />
                Design enthusiast.
                <br />
                Habitual side-project starter.
              </p>
              <a href={PROFILES.linkedin}>
                More about the human <Arrow size={18} />
              </a>
              <span className="desk-about-location">
                <i /> KAZAKHSTAN → EVERYWHERE
              </span>
            </div>
          </DesktopWindow>
        )}
        {open.tools && (
          <DesktopWindow
            key={`tools-${generation}`}
            id="tools"
            title="toolbox.app"
            icon={Terminal}
            {...windowProps}
          >
            <div className="desk-tools">
              <span>~/almaz/stack</span>
              <h2>
                Good tools.
                <br />
                Better possibilities.
              </h2>
              <dl>
                <div>
                  <dt>Websites</dt>
                  <dd>WordPress · Next.js</dd>
                </div>
                <div>
                  <dt>Interfaces</dt>
                  <dd>React · JavaScript</dd>
                </div>
                <div>
                  <dt>Commerce</dt>
                  <dd>WooCommerce</dd>
                </div>
                <div>
                  <dt>Motion</dt>
                  <dd>GSAP · CSS</dd>
                </div>
                <div>
                  <dt>Design</dt>
                  <dd>Figma · Curiosity</dd>
                </div>
              </dl>
              <p>
                <span aria-hidden="true">▸</span> Ready for the next idea
                <span className="desk-caret" aria-hidden="true">
                  _
                </span>
              </p>
            </div>
          </DesktopWindow>
        )}
        <div className="desk-desktop-note">
          <span aria-hidden="true">↖</span>
          <p id="desk-drag-help">
            Make yourself at home.
            <small>
              Drag a title bar, or focus it and use arrow keys.
              <br />
              Home resets its position.
            </small>
          </p>
        </div>
        <span className="desk-desktop-version">
          PERSONAL OS
          <br />
          VERSION 10.0
        </span>
      </div>
      <div className="desk-dock-area">
        <MotionControl motion={motion} />
        <div
          className="desk-dock"
          ref={dock}
          role="group"
          aria-label="Desktop applications"
        >
          {[
            { id: "projects", label: "Projects", icon: Folder },
            { id: "about", label: "About", icon: UserRound },
            { id: "tools", label: "Toolbox", icon: Terminal },
          ].map(({ id, label, icon: Icon }) => (
            <button
              type="button"
              key={id}
              className={`desk-dock-item desk-dock-${id}`}
              data-window={id}
              onClick={() => toggle(id)}
              aria-pressed={open[id]}
              aria-controls={open[id] ? `desk-window-${id}` : undefined}
            >
              <span>
                <Icon size={24} strokeWidth={1.5} />
              </span>
              <small>{label}</small>
              <i />
            </button>
          ))}
          <span className="desk-dock-divider" />
          <a
            className="desk-dock-item desk-dock-contact"
            href={PROFILES.telegram}
          >
            <span>
              <Send size={24} strokeWidth={1.5} />
            </span>
            <small>Say hello</small>
          </a>
          <button
            type="button"
            className="desk-reset"
            aria-label="Reset desktop layout"
            onClick={() => {
              setOpen({ projects: true, about: true, tools: false });
              setFront("projects");
              setGeneration((i) => i + 1);
              setProjectIndex(0);
            }}
          >
            <RotateCcw size={17} />
          </button>
        </div>
        <a className="desk-scroll" href="#desk-work">
          THERE’S MORE BELOW <Arrow direction="down" />
        </a>
      </div>
    </section>
  );
}

export default function Offscreen() {
  const root = useRef(null);
  const motion = useConceptMotion(root, animateOffscreen);
  return (
    <div className="desk" ref={root} data-motion={motion.active ? "on" : "off"}>
      <a className="cx-skip" href="#desk-main">
        Skip to content
      </a>
      <header className="desk-menubar" id="desk-top">
        <a className="desk-wordmark" href="#desk-top">
          <Command size={18} /> almaz.os
        </a>
        <nav aria-label="Main navigation">
          <a href="#desk-work">Work</a>
          <a href="#desk-services">Capabilities</a>
          <a href="#desk-lab">Side quests</a>
        </nav>
        <span className="desk-system-status">
          <i /> A HUMAN ON THE OTHER SIDE.
        </span>
        <a href={PROFILES.telegram} className="desk-menu-contact">
          Let’s talk <Arrow />
        </a>
      </header>
      <main id="desk-main">
        <Desktop motion={motion} />
        <section
          className="desk-work"
          id="desk-work"
          aria-labelledby="desk-work-title"
        >
          <div className="desk-work-heading desk-reveal">
            <span className="desk-label">01 / SAVED TO THE GOOD FOLDER</span>
            <h2 id="desk-work-title">
              Less talk.
              <br />
              <span>More tabs open.</span>
            </h2>
            <p>
              A few projects from the archive.
              <br />
              Made for real people, out in the real world.
            </p>
            <Folder
              className="desk-heading-folder"
              size={100}
              strokeWidth={0.8}
              aria-hidden="true"
            />
          </div>
          <div className="desk-case-stack">
            {conceptProjects.map((project, i) => (
              <article
                className="desk-case"
                key={project.name}
                style={{
                  "--case-offset": `${i * 16}px`,
                  "--case-tone": project.tone,
                }}
              >
                <div className="desk-case-inner">
                  <div className="desk-case-bar">
                    <span>
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>
                      project_0{i + 1} / {project.title}
                    </span>
                    <span>{project.year}</span>
                  </div>
                  <div className="desk-case-content">
                    <div className="desk-case-info">
                      <span className="desk-label">{project.type}</span>
                      <h3>{project.name}</h3>
                      <p>{project.short}</p>
                      <div className="desk-case-tags">
                        {project.skills.map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))}
                      </div>
                      {project.client && (
                        <span className="cx-credit">
                          Built with{" "}
                          <a href={project.clientUrl}>{project.client}</a>
                        </span>
                      )}
                      <a className="desk-case-link" href={project.url}>
                        Explore project <Arrow />
                      </a>
                    </div>
                    <a className="desk-case-media" href={project.url}>
                      <ProjectImage
                        project={project}
                        sizes="(max-width: 900px) 85vw, 52vw"
                      />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="desk-services" id="desk-services">
          <div className="desk-services-title desk-reveal">
            <span className="desk-label">
              02 / ONE PERSON. THE WHOLE PICTURE.
            </span>
            <h2>
              From “what if”
              <br />
              to <span>“it’s live.”</span>
            </h2>
            <p>
              I connect the dots between a good idea and a website people enjoy
              using.
            </p>
            <div className="desk-service-symbol" aria-hidden="true">
              <Command size={100} strokeWidth={1} />
            </div>
          </div>
          <div className="desk-service-list">
            {[
              {
                n: "01",
                title: "A website that feels like you.",
                copy: "Custom WordPress development. Clear structure. A considered design. The details that make your corner of the internet your own.",
              },
              {
                n: "02",
                title: "A smoother way to shop.",
                copy: "WooCommerce builds with thoughtful browsing, clear product pages, and a checkout that gets out of the way.",
              },
              {
                n: "03",
                title: "An idea with a working prototype.",
                copy: "Useful tools, interactive experiences, and digital products. Let’s turn your sketch into something you can click, test, and build on.",
              },
            ].map((item) => (
              <article className="desk-service desk-reveal" key={item.n}>
                <span>{item.n}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <ArrowRight size={23} />
              </article>
            ))}
          </div>
        </section>

        <section className="desk-lab" id="desk-lab">
          <div className="desk-lab-heading desk-reveal">
            <span className="desk-label">03 / THE OTHER OPEN TABS</span>
            <h2>
              Still making things.
              <br />
              <span>Even after hours.</span>
            </h2>
            <Sparkles size={50} strokeWidth={1} aria-hidden="true" />
          </div>
          <div className="desk-lab-grid">
            <a
              className="desk-side-project desk-reveal"
              href="https://polyglossa-beta.vercel.app"
            >
              <div className="desk-small-bar">
                <span>polyglossa.app</span>
                <Arrow />
              </div>
              <Image
                src="/images/project-polyglossa.jpg"
                alt="Polyglossa language learning conversations"
                width={800}
                height={600}
                sizes="(max-width: 700px) 90vw, 40vw"
              />
              <div>
                <h3>New language. New friends.</h3>
                <p>
                  Meet Polyglossa, a language practice app built around
                  conversations with AI friends.
                </p>
                <span>OPEN THE BETA ↗</span>
              </div>
            </a>
            <a
              className="desk-side-project desk-reveal"
              href="https://www.figma.com/community/file/1452663046127877131/glowy-icons-v1-0"
            >
              <div className="desk-small-bar">
                <span>glowy-icons.fig</span>
                <Arrow />
              </div>
              <Image
                src="/images/project-glowy.jpg"
                alt="Glowy Icons vector icon set"
                width={800}
                height={600}
                sizes="(max-width: 700px) 90vw, 40vw"
              />
              <div>
                <h3>A brighter kind of pixel.</h3>
                <p>
                  Colourful, playful vector icons. A little collection of good
                  things for your next design.
                </p>
                <span>EXPLORE IN FIGMA ↗</span>
              </div>
            </a>
          </div>
          <a className="desk-youtube desk-reveal" href={PROFILES.youtube}>
            <span className="desk-play-icon" aria-hidden="true">
              ▶
            </span>
            <span>
              I also talk about webdev & stuff.
              <small>
                Experiments, ideas, and things I learn along the way.
              </small>
            </span>
            <span>
              FIND ME ON YOUTUBE <Arrow />
            </span>
          </a>
        </section>

        <section className="desk-testimonial desk-reveal">
          <div className="desk-small-bar">
            <span>nice-things-people-said.txt</span>
            <span aria-hidden="true">♡</span>
          </div>
          <div>
            <span className="desk-label">
              REAL WORDS, FROM THE OTHER SIDE OF THE SCREEN.
            </span>
            <blockquote>“{reviews[4].quote}”</blockquote>
            <a href={PROFILES.upwork}>
              Client feedback / Upwork <Arrow />
            </a>
          </div>
        </section>
      </main>
      <footer className="desk-footer">
        <div className="desk-footer-top">
          <span className="desk-label">
            NO TICKET SYSTEM. NO MIDDLEMAN. JUST ME.
          </span>
          <a href={PROFILES.telegram}>
            Your next idea.
            <br />
            <span>My next open tab.</span>
            <Arrow />
          </a>
        </div>
        <div className="desk-footer-bottom">
          <span>© {new Date().getFullYear()} Almaz Bisenbaev</span>
          <a href={PROFILES.linkedin}>LinkedIn ↗</a>
          <a href="#desk-top">Return to desktop ↑</a>
        </div>
        <ConceptLinks current={10} />
      </footer>
    </div>
  );
}
