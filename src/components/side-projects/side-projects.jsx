import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import Button from '@/components/button/button';
import { projects } from '@/data/side-projects';
import s from './side-projects.module.css';

function Art({ project }) {
  return <div className={`${s.art} ${project.image ? s.imageArt : ''}`} style={{ '--ink': project.accent }}>
    {project.image ? <Image src={project.image} alt={project.alt} fill sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 45vw, (max-width: 1535px) 596px, 724px" /> : <div className={s.videoArt}><Image src="/me.jpg" alt="Almaz" width={240} height={240} /><span className={s.youtubeBadge}><svg className={s.youtubeIcon} viewBox="0 0 24 24" role="img" aria-label="Play"><path d="M6 6.7C6 4.9 7.6 4 9.1 4.9L18.7 10.5C20.2 11.4 20.2 12.6 18.7 13.5L9.1 19.1C7.6 20 6 19.1 6 17.3Z" fill="#ff0000" /></svg></span></div>}
  </div>;
}
function ProjectLink({ project }) {
  return <Button variant="black" className={s.projectButton} href={project.link}>{project.cta}<ChevronRight size={18} aria-hidden="true" /><span className={s.srOnly}> (opens in a new tab)</span></Button>;
}
function Card({ project }) {
  return <article className={`${s.card} ${project.image ? s.imageCard : ''}`}><Art project={project} /><div className={s.cardCopy}><h3>{project.title}</h3><p className={s.description}>{project.description}</p><ProjectLink project={project} /></div></article>;
}

export default function SideProjects() {
  return <section id="side-projects" className={`section ${s.section}`} aria-labelledby="side-projects-title">
    <div className="site-container">
      <header className={s.heading}>
        <div><p>A few things I’ve made</p><h2 id="side-projects-title">Personal projects.</h2></div>
      </header>
      <div className={s.bento}>{projects.map(project => <Card key={project.id} project={project} />)}</div>
    </div>
  </section>;
}
