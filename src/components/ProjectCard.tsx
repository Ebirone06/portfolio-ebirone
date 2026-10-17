import { ArrowUpRight, BookOpen, Layers3, ShieldCheck, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { Reveal } from './Reveal';

export function ProjectCard({ project, index = 0, total = 1 }: { project: Project; index?: number; total?: number }) {
  return (
    <Reveal delay={index * 90} className="project-reveal">
      <article className={`project-card ${project.status === 'placeholder' ? 'project-placeholder' : ''} ${project.slug === 'mi-secure' ? 'project-card-mi-secure' : ''}`}>
        <div className={`project-art project-art-${index + 1} ${project.slug === 'kings-mat' ? 'project-art-kings-mat' : ''}`} aria-hidden="true">
          <div className="art-grid" />
          {project.slug === 'kings-mat' ? <div className="kings-mat-art-device"><Smartphone size={82} strokeWidth={1} /><span><BookOpen size={24} /></span></div> : project.slug === 'mi-secure' ? <div className="mi-secure-art-icon"><ShieldCheck size={62} strokeWidth={1} /></div> : index % 3 === 0 ? <div className="art-orbit"><span /><span /><span /></div> : index % 3 === 1 ? <div className="art-window"><div className="window-dots"><i /><i /><i /></div><div className="window-line long" /><div className="window-line" /><div className="window-blocks"><span /><span /><span /></div></div> : <div className="art-stack"><span /><span /><span /><span /></div>}
          <span className="art-index">{project.number} / {String(total).padStart(2, '0')}</span>
        </div>
        <div className="project-copy">
          <div className="project-eyebrow"><span>{project.category}</span><span className="project-state"><i /> {project.status === 'placeholder' ? 'Template' : project.status === 'implemented' ? 'Implemented' : project.status === 'built' ? 'Built' : 'Featured'}</span></div>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <div className="project-footer">
            <span className="project-stack"><Layers3 size={14} /> {project.status === 'placeholder' ? 'Add technologies' : project.stack.slice(0, 2).join(' · ')}</span>
            <Link to={`/projects/${project.slug}`} className="icon-link" aria-label={`View ${project.title}`}><ArrowUpRight size={18} /></Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
