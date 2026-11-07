'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, Plus, FlaskConical } from 'lucide-react';
import Button from '@/components/button/button';
import { projects } from '@/data/side-projects';
import s from './concepts.module.css';

const bentoProjects = [
  ...projects.filter(project => project.id === 'youtube').map(project => ({ ...project, title: 'My YouTube Channel' })),
  ...projects.filter(project => project.id !== 'youtube'),
];

const extras = [
  { id: 'next-app', title: 'The next little app', category: 'App · Placeholder', description: 'A home for the next useful thing. Sample content to explore a larger collection.', color: '#e9eee3', accent: '#56704b', sample: true, glyph: '↗' },
  { id: 'next-game', title: 'Something playful', category: 'Game · Placeholder', description: 'A small experiment with a playful side. Sample content for this preview.', color: '#f6e6d6', accent: '#aa663c', sample: true, glyph: '✳' },
  { id: 'next-tool', title: 'A tiny useful tool', category: 'Tool · Placeholder', description: 'One small idea, made useful. Sample content for this preview.', color: '#e5ebf2', accent: '#4d6a87', sample: true, glyph: '⌘' },
];
function Art({ project }) {
  return <div className={s.art} style={{ '--ink': project.accent }}>
    {project.image ? <Image src={project.image} alt={project.alt} fill sizes="(max-width: 700px) 90vw, 600px" /> : project.sample ? <span className={s.glyph} aria-hidden="true">{project.glyph}</span> : <div className={s.videoArt}><Image src="/me.jpg" alt="Almaz" width={240} height={240} /><span><Play size={20} fill="currentColor" aria-hidden="true" /></span><p>webdev & a little everything.</p></div>}
  </div>;
}
function ProjectLink({ project }) {
  return project.sample ? <span className={s.placeholder}><FlaskConical size={13} aria-hidden="true" /> Preview placeholder</span> : <Button variant="black" className={s.projectButton} href={project.link}>{project.cta}<span className={s.srOnly}> (opens in a new tab)</span></Button>;
}
function Card({ project, featured = false }) {
  return <article className={`${s.card} ${featured ? s.featured : ''}`}><Art project={project} /><div className={s.cardCopy}><p className={s.category}>{project.category}</p><h3>{project.title}</h3><p className={s.description}>{project.description}</p><ProjectLink project={project} /></div></article>;
}

export default function Concepts() {
  const [expanded, setExpanded] = useState(true);
  const all = expanded ? [...bentoProjects, ...extras] : bentoProjects;
  return <div className={`site-container ${s.page}`}>
    <div className={s.previewTools}><a href="/">← Back to portfolio</a><span>Temporary bento preview</span></div>
    <section className={s.section} aria-labelledby="concept-heading">
      <header className={s.heading}>
        <div><p>A few things I’ve made</p><h1 id="concept-heading">Personal projects.</h1></div>
        <button className={s.countToggle} type="button" aria-pressed={expanded} onClick={() => setExpanded(!expanded)}><Plus size={15} aria-hidden="true" />{expanded ? '6 projects · with samples' : '3 projects · current'}</button>
      </header>
      <div className={s.bento}>{all.map((project, index) => <Card key={project.id} project={project} featured={index === 0} />)}</div>
    </section>
    <p className={s.previewNote}>The three additional projects are layout placeholders. Switch the project count to see only your current work.</p>
  </div>;
}
