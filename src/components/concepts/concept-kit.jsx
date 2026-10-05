"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { findWork } from "@/data/works";

// Presentation choices only. Names, links, dates, and credits stay in works.js.
export const conceptProjects = [
  {
    ...findWork("Funky Ramen"),
    image: "/images/portfolio/funky-ramen-1.jpg",
    alt: "Funky Ramen restaurant homepage",
    tone: "#b0b9ed",
    short: "A little louder. A lot more flavour.",
    type: "Restaurant / WordPress",
  },
  {
    ...findWork("Silverskin Coffee"),
    image: "/images/silverskin-1.webp",
    alt: "Silverskin Coffee online shop",
    tone: "#e2e9a3",
    short: "Good coffee, from first click to last sip.",
    type: "Commerce / WooCommerce",
  },
  {
    ...findWork("Muafaktur"),
    image: "/portfolio/mua-1.jpg",
    alt: "Muafaktur beauty and training storefront",
    tone: "#edcbbc",
    short: "A considered home for beauty and craft.",
    type: "Beauty / Design & development",
  },
];

const subscribe = (callback) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const getSnapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getServerSnapshot = () => false;

export function useConceptMotion(root, setup) {
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const active = !paused && !reduced;

  useEffect(() => {
    if (!active) return;
    gsap.registerPlugin(ScrollTrigger);
    let disposed = false;
    const context = gsap.context(
      () => setup(gsap, ScrollTrigger, root.current),
      root,
    );
    // Re-measure pinned distances after the self-hosted fonts have settled.
    document.fonts.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });
    return () => {
      disposed = true;
      context.revert();
    };
  }, [active, root, setup]);

  return { active, reduced, toggle: () => setPaused((value) => !value) };
}

export function MotionControl({ motion }) {
  return (
    <button
      className="cx-motion"
      type="button"
      onClick={motion.toggle}
      aria-pressed={motion.active}
      disabled={motion.reduced}
      aria-label={
        motion.reduced
          ? "Motion disabled by system preference"
          : motion.active
            ? "Pause animations"
            : "Enable animations"
      }
    >
      <span aria-hidden="true">{motion.active ? "Ⅱ" : "▷"}</span>{" "}
      {motion.reduced
        ? "Reduced motion"
        : motion.active
          ? "Motion on"
          : "Motion off"}
    </button>
  );
}

export function ConceptLinks({ current }) {
  return (
    <nav className="cx-concepts" aria-label="Explore homepage concepts">
      <Link href="/">Original</Link>
      <span aria-hidden="true">/</span>
      {Array.from({ length: 9 }, (_, i) => i + 2).map((n) => (
        <a
          key={n}
          href={`/concept-${n}`}
          aria-current={current === n ? "page" : undefined}
        >
          {String(n).padStart(2, "0")}
        </a>
      ))}
    </nav>
  );
}

export function ProjectImage({
  project,
  priority = false,
  sizes = "(max-width: 760px) 90vw, 60vw",
  className = "",
}) {
  return (
    <Image
      className={className}
      src={project.image}
      alt={project.alt}
      width={1200}
      height={750}
      sizes={sizes}
      priority={priority}
    />
  );
}

export function Arrow({ direction = "up", ...props }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      style={direction === "down" ? { transform: "rotate(90deg)" } : undefined}
      {...props}
    >
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}
