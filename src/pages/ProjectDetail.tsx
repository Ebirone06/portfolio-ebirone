import { lazy, Suspense } from 'react';
import { ArrowLeft, ArrowUpRight, Check, ExternalLink, Github, Lightbulb, Wrench } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { Reveal } from '../components/Reveal';

const KingsMatCaseStudy = lazy(() => import('./KingsMatCaseStudy').then(({ KingsMatCaseStudy: Page }) => ({ default: Page })));
const MISecureCaseStudy = lazy(() => import('./MISecureCaseStudy').then(({ MISecureCaseStudy: Page }) => ({ default: Page })));

export function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <main className="not-found section-wrap"><p className="eyebrow">PROJECT / NOT FOUND</p><h1>This page hasn't<br />been built yet<span>.</span></h1><p>That project link may have changed, or the project hasn't been added to the portfolio.</p><Link className="button button-light" to="/#work"><ArrowLeft size={16} /> Back to selected work</Link></main>;
  }

  if (project.slug === 'mi-secure') return <Suspense fallback={<main className="project-detail section-wrap"><p className="eyebrow">LOADING CASE STUDY</p></main>}><MISecureCaseStudy project={project} /></Suspense>;
  if (project.slug === 'kings-mat') return <Suspense fallback={<main className="project-detail section-wrap"><p className="eyebrow">LOADING CASE STUDY</p></main>}><KingsMatCaseStudy project={project} /></Suspense>;

  const placeholder = project.status === 'placeholder';

  return (
    <main className="project-detail section-wrap">
      <div className="detail-top-nav"><Link to="/#work" className="back-link"><ArrowLeft size={15} /> Back to selected work</Link><span className="detail-index">CASE STUDY / {project.number}</span></div>
      <Reveal className="detail-hero">
        <p className="eyebrow"><span>{project.number}</span> / {project.category}</p>
        <h1>{placeholder ? 'Your next project.' : project.title}<span>.</span></h1>
        <p className="detail-lede">{placeholder ? 'This is your project case-study template. Replace the starter text with a real project, its purpose, and the decisions that made it work.' : project.summary}</p>
        <div className="detail-actions">{project.repositoryUrl ? <a className="button button-light" href={project.repositoryUrl} target="_blank" rel="noreferrer">View repository <Github size={16} /></a> : <span className="detail-link-placeholder"><Github size={15} /> Repository link to be added</span>}{project.demoUrl && <a className="text-link" href={project.demoUrl} target="_blank" rel="noreferrer">Live demo <ExternalLink size={15} /></a>}</div>
      </Reveal>
      <Reveal className="detail-art"><div className="detail-art-grid" /><div className="detail-art-orb"><div /></div><span className="detail-art-label">PROJECT VISUAL / TO BE REPLACED</span><span className="detail-art-number">{project.number}</span></Reveal>
      {placeholder && <div className="starter-notice"><Lightbulb size={18} /><div><strong>Starter template</strong><p>This route is ready for a real case study. No project outcome or experience is assumed.</p></div></div>}
      <div className="detail-meta-grid"><Reveal><p className="eyebrow">MY ROLE</p><p>{project.role}</p></Reveal><Reveal delay={70}><p className="eyebrow">TECH STACK</p><div className="detail-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></Reveal><Reveal delay={130}><p className="eyebrow">PROJECT STATUS</p><p>{placeholder ? 'Content pending confirmation' : 'Published case study'}</p></Reveal></div>
      <div className="detail-content-grid"><div className="detail-content-intro"><p className="eyebrow">THE THINKING</p><h2>From problem<br />to possibility.</h2></div><div className="detail-sections"><Reveal><section className="detail-content-item"><span className="detail-content-icon"><Lightbulb size={17} /></span><div><h3>The problem</h3><p>{project.problem}</p></div></section></Reveal><Reveal delay={80}><section className="detail-content-item"><span className="detail-content-icon"><Wrench size={17} /></span><div><h3>The approach</h3><p>{project.approach}</p></div></section></Reveal><Reveal delay={160}><section className="detail-content-item"><span className="detail-content-icon"><Check size={17} /></span><div><h3>What I learned</h3><p>{project.learnings}</p></div></section></Reveal></div></div>
      <div className="detail-next"><div><p className="eyebrow">NEXT UP</p><h2>More work, more learning.</h2></div><Link to="/#work" className="round-arrow" aria-label="Return to all projects"><ArrowUpRight size={23} /></Link></div>
    </main>
  );
}
