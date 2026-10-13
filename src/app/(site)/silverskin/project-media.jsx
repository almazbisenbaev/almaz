"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Expand, Pause, Play, X } from "lucide-react";
import styles from "./case-study.module.css";

export function ProjectImage({ src, alt, width, height, caption, variant }) {
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousLock = root.dataset.scrollLocked;
    const previousOverflow = root.style.overflow;
    root.dataset.scrollLocked = "true";
    root.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("app-scroll-lock-change"));

    return () => {
      if (previousLock === undefined) delete root.dataset.scrollLocked;
      else root.dataset.scrollLocked = previousLock;
      root.style.overflow = previousOverflow;
      window.dispatchEvent(new CustomEvent("app-scroll-lock-change"));
    };
  }, [open]);

  function enlarge(event) {
    // Keep the original image link usable before hydration and for new tabs.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setOpen(true);
    dialogRef.current.showModal();
  }

  return (
    <figure className={styles.figure}>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        onClick={enlarge}
        className={`${styles.imageFrame} ${styles[variant] || ""}`}
        aria-label={`Enlarge: ${alt}`}
        aria-haspopup="dialog"
      >
        <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 960px" />
        <span className={styles.expand} aria-hidden="true"><Expand size={15} /> View full page</span>
      </a>
      <figcaption>{caption}</figcaption>
      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        aria-label={alt}
        data-lenis-prevent=""
        onClose={() => setOpen(false)}
        onKeyDown={(event) => {
          // The close button is the viewer's only interactive control.
          if (event.key === "Tab") {
            event.preventDefault();
            dialogRef.current.querySelector("button").focus();
          }
        }}
        onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}
      >
        <div className={styles.lightboxContent}>
          <div className={styles.lightboxToolbar}>
            <span>Silverskin Coffee <span> / Full page</span></span>
            <button type="button" autoFocus onClick={() => dialogRef.current.close()} aria-label="Close full-size image"><X size={22} /></button>
          </div>
          {open && <Image src={src} alt={alt} width={width} height={height} sizes="95vw" unoptimized />}
        </div>
      </dialog>
    </figure>
  );
}

export function ProjectVideo({ src, poster, label, caption, width, height, priority = false }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const userPaused = useRef(false);
  const inView = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (!inView.current || document.hidden || reducedMotion.matches || userPaused.current) video.pause();
      else video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.15 });
    observer.observe(video);
    reducedMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  }

  return (
    <figure className={styles.figure}>
      <div className={styles.videoFrame} style={{ aspectRatio: `${width} / ${height}` }}>
        {!started && <Image src={poster} alt="Silverskin Coffee homepage preview" fill sizes="(max-width: 1024px) 94vw, 960px" preload={priority} className={styles.videoPoster} />}
        <video
          ref={videoRef}
          src={src}
          aria-label={label}
          muted
          loop
          playsInline
          preload="none"
          width={width}
          height={height}
          onPlaying={() => { setPlaying(true); setStarted(true); }}
          onPause={() => setPlaying(false)}
        />
        <button type="button" className={styles.playback} onClick={togglePlayback} aria-label={`${playing ? "Pause" : "Play"} ${label}`}>
          {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          <span>{playing ? "Pause" : "Play"}</span>
        </button>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
