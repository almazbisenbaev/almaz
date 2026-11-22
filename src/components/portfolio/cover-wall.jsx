'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import LazyVideo from '@/components/lazy-video/lazy-video';
import ProjectCredit from './project-credit';
import styles from './cover-wall.module.css';

const imageSizes = '(max-width: 767px) 100vw, (max-width: 1535px) 58vw, 870px';

function Cover({ project, active, setActive }) {
  const { name, image, url, media = [] } = project;
  const alternate = media.find((item) => item.type === 'video')
    ?? media.find((item) => item.src !== image && item.width >= item.height)
    ?? media.find((item) => item.src !== image);
  const external = url.startsWith('//') || url.startsWith('https://') || url.startsWith('http://');
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const layer = useRef(null);
  const [mediaMounted, setMediaMounted] = useState(false);

  // On exit, keep the decoded frame until its actual CSS transition finishes.
  // Re-entering the same tile reverses that transition on the same media node.
  useEffect(() => {
    if (active || !mediaMounted || !layer.current) return;
    let cancelled = false;
    const transitions = layer.current.getAnimations();
    Promise.allSettled(transitions.map((animation) => animation.finished)).then(() => {
      if (!cancelled) setMediaMounted(false);
    });
    return () => { cancelled = true; };
  }, [active, mediaMounted]);

  function showPreview() {
    // Reduced-motion visitors can still start a recording explicitly.
    if (alternate?.type === 'video' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (alternate) setMediaMounted(true);
    setActive(name);
  }

  function hidePreview() {
    setActive((current) => current === name ? null : current);
  }

  return (
    <li className={styles.tile}
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') showPreview(); }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse' && !event.currentTarget.querySelector(':focus-visible')) hidePreview();
      }}
      onFocus={(event) => { if (event.target.matches(':focus-visible')) showPreview(); }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) hidePreview(); }}>
      <button type="button" className={styles.stage}
        aria-label={`Preview ${name}`} aria-pressed={active}
        onClick={() => {
          if (alternate) setMediaMounted(true);
          setActive((current) => current === name ? null : name);
        }}>
        <Image src={image} width={project.width} height={project.height} sizes={imageSizes}
          className={styles.cover} data-detail={active && !alternate} alt="" />
        {mediaMounted && alternate && (
          <span ref={layer} className={styles.layer} data-active={active} aria-hidden={!active}
            onPlayingCapture={(event) => { event.currentTarget.dataset.ready = 'true'; }}>
            {alternate.type === 'video' ? (
              <LazyVideo src={alternate.src} label={alternate.alt} className={styles.recording} />
            ) : (
              <Image src={alternate.src} width={alternate.width} height={alternate.height} sizes={imageSizes}
                className={styles.still} alt={alternate.alt}
                onLoad={(event) => { event.currentTarget.parentElement.dataset.ready = 'true'; }} />
            )}
          </span>
        )}
      </button>
      <div className={styles.caption}>
        <a className={styles.link} href={url} aria-label={`${project.buttonText} — ${name}`}
          target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.arrow}><Arrow size={20} aria-hidden="true" /></span>
        </a>
        <p className={styles.stack}>{project.skills.join(' · ')}</p>
        <div className={styles.metadata}>
          <ProjectCredit project={project} />
          <time dateTime={project.year}>{project.year}</time>
        </div>
      </div>
    </li>
  );
}

export default function CoverWall({ projects }) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (active === null) return;
    const dismiss = (event) => { if (event.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [active]);
  return (
    <ul className={styles.wall} aria-label="Project covers">
      {projects.map((project) => (
        <Cover key={project.name} project={project} active={active === project.name} setActive={setActive} />
      ))}
    </ul>
  );
}
