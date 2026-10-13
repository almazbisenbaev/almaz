"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LandingMotion({ children }) {
  const root = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    let disposed = false;
    let refreshFrame;
    let resizeTimer;

    // Content is visible in the server HTML. Motion only enhances it, and is
    // completely reverted when the user requests reduced motion or leaves.
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.from("[data-hero-line]", { y: 38, opacity: 0, duration: 0.85, stagger: 0.1, clearProps: "all" })
        .from("[data-hero-intro]", { y: 15, opacity: 0, duration: 0.6, stagger: 0.06, clearProps: "all" }, 0.2);

      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 28, opacity: 0, duration: 0.7, ease: "power2.out", clearProps: "all",
          scrollTrigger: { trigger: element, start: "top 94%", once: true },
        });
      });

      gsap.fromTo("[data-process-line]", { scaleY: 0 }, {
        scaleY: 1, ease: "none", transformOrigin: "top",
        scrollTrigger: { trigger: ".wp-steps", start: "top 65%", end: "bottom 65%", scrub: true },
      });
      gsap.to(".wp-process-star", {
        rotation: 120, ease: "none",
        scrollTrigger: { trigger: ".wp-process", start: "top bottom", end: "bottom top", scrub: 0.8 },
      });
    }, root);

    const refresh = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => { if (!disposed) ScrollTrigger.refresh(); });
    };
    const element = root.current;
    // The shared FAQ animates its height. Refresh triggers after it settles,
    // including instant reduced-motion changes and responsive text wrapping.
    const faq = element.querySelector(".wp-faq");
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refresh, 120);
    });
    if (faq) observer.observe(faq);
    document.fonts.ready.then(refresh);
    return () => {
      disposed = true;
      cancelAnimationFrame(refreshFrame);
      clearTimeout(resizeTimer);
      observer.disconnect();
      media.revert();
    };
  }, []);

  return <div ref={root} className="wp-landing">{children}</div>;
}
