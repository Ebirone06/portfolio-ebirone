import { useState, type FormEvent } from 'react';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Code2, Download, FileText, Mail, Send, Sparkles, Terminal, UserRound, Workflow } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';

const focusAreas = [
  { number: '01', title: 'Software development', copy: 'Turning a clear problem into a useful, maintainable tool.', icon: Code2 },
  { number: '02', title: 'AI & intelligent systems', copy: 'Exploring how intelligent software can support real workflows.', icon: Sparkles },
  { number: '03', title: 'Full-stack thinking', copy: 'Connecting interfaces, application logic, and the user experience.', icon: Workflow },
];

type ContactState = 'idle' | 'sending' | 'success' | 'error' | 'not-configured';

function ContactForm() {
  const [state, setState] = useState<ContactState>('idle');
  const [statusText, setStatusText] = useState('');
  const [values, setValues] = useState({ name: '', email: '', subject: 'Internship / job opportunity', message: '', website: '' });

  const update = (field: keyof typeof values, value: string) => setValues((old) => ({ ...old, [field]: value }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    setStatusText('Sending your message…');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = await response.json().catch(() => null) as { ok?: boolean; message?: string; configured?: boolean } | null;
      if (!response.ok || result?.ok !== true) {
        setState(result?.configured === false ? 'not-configured' : 'error');
        setStatusText(result?.message ?? 'That message could not be sent. Please try again.');
        return;
      }
      setState('success');
      setStatusText(result.message ?? 'Message sent. Thank you for reaching out.');
      setValues({ name: '', email: '', subject: 'Internship / job opportunity', message: '', website: '' });
    } catch {
      setState('error');
      setStatusText('The contact service is not reachable right now. Please try again later.');
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Your name<input required name="name" autoComplete="name" maxLength={100} value={values.name} onChange={(e) => update('name', e.target.value)} placeholder="How should I address you?" /></label>
        <label>Email address<input required name="email" type="email" autoComplete="email" maxLength={254} value={values.email} onChange={(e) => update('email', e.target.value)} placeholder="you@company.com" /></label>
      </div>
      <label>Subject
        <select name="subject" value={values.subject} onChange={(e) => update('subject', e.target.value)}>
          <option>Internship / job opportunity</option><option>Collaboration</option><option>Project discussion</option><option>Something else</option>
        </select>
      </label>
      <label>Message<textarea required name="message" rows={4} maxLength={5000} value={values.message} onChange={(e) => update('message', e.target.value)} placeholder="A little context goes a long way…" /></label>
      <div className="honeypot" aria-hidden="true"><label>Leave this empty<input tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => update('website', e.target.value)} /></label></div>
      <div className="form-submit-row">
        <p className={`form-status ${state}`} role="status" aria-live="polite">{statusText}</p>
        <button className="button button-light" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send message'} <Send size={15} /></button>
      </div>
      {state === 'not-configured' && <p className="form-help">The contact email service is not configured yet. You can <a href="https://www.linkedin.com/in/ebironemichael/" target="_blank" rel="noreferrer">reach me on LinkedIn</a>.</p>}
      {state === 'error' && <p className="form-help">Your message is still here. Please try again, or <a href="https://www.linkedin.com/in/ebironemichael/" target="_blank" rel="noreferrer">contact me on LinkedIn</a>.</p>}
    </form>
  );
}

export function Home() {
  return (
    <main>
      <section className="hero section-wrap" id="top">
        <div className="hero-content">
          <Reveal className="hero-kicker"><span className="kicker-line" /><span>PERSONAL PORTFOLIO <b>·</b> 2026</span></Reveal>
          <Reveal delay={90}>
            <h1>Hi, I'm<br /><span className="hero-name">Ebirone Michael<span className="name-period">.</span></span></h1>
          </Reveal>
          <Reveal delay={170}><p className="hero-role">Student Developer <span className="role-dot">/</span> Future-focused builder</p></Reveal>
          <Reveal delay={240}><p className="hero-summary">I’m exploring how thoughtful software, AI, and clean engineering can turn real-world problems into useful experiences.</p></Reveal>
          <Reveal delay={310} className="hero-actions">
            <a className="button button-light" href="#contact">Let's connect <ArrowUpRight size={16} /></a>
            <a className="text-link" href="#work">Explore selected work <ArrowDownRight size={17} /></a>
          </Reveal>
          <Reveal delay={380} className="hero-footnote"><span className="tiny-mark">✳</span><span>Curious by default. Building one idea at a time.</span></Reveal>
        </div>
        <Reveal delay={190} className="hero-visual">
          <div className="visual-topline"><span>DEVELOPER / PROFILE 001</span><span className="live-indicator"><i /> STUDENT DEVELOPER</span></div>
          <div className="visual-portrait-wrap"><img className="visual-portrait" src="/ebirone-michael-portrait.webp" alt="Portrait of Ebirone Michael" /></div>
          <div className="visual-caption"><span>MAKE IT USEFUL.</span><span>MAKE IT MATTER.</span></div>
          <div className="visual-bottomline"><span>PYTHON · AI · WEB</span><span>CHENNAI, INDIA</span></div>
        </Reveal>
        <a className="scroll-cue" href="#about" aria-label="Scroll to about section"><ArrowDown size={15} /><span>SCROLL TO EXPLORE</span></a>
        <span className="hero-index" aria-hidden="true">01 — 04</span>
      </section>

      <section className="section-wrap about-section" id="about">
        <Reveal className="section-heading"><p className="eyebrow"><span>01</span> / A LITTLE ABOUT ME</p><h2>Learning by building.<br /><span>Growing through the work.</span></h2></Reveal>
        <div className="about-grid">
          <Reveal className="about-intro"><div className="about-icon"><UserRound size={20} /></div><p>I’m a student developer who enjoys building things with code and figuring out how they work. Most of what I learn comes from working on my own projects, trying new ideas, and solving problems along the way. I’m currently exploring Python, AI, and full-stack development, with the goal of turning what I learn into useful software.</p><div className="about-education"><span className="eyebrow-small">EDUCATION</span><p>B.Tech in Artificial Intelligence and Data Science</p></div><a href="#contact" className="inline-arrow">Start a conversation <ArrowUpRight size={15} /></a></Reveal>
          <div className="focus-list">
            {focusAreas.map((item, index) => {
              const Icon = item.icon;
              return <Reveal key={item.number} delay={index * 90}><div className="focus-item"><span className="focus-number">{item.number}</span><div className="focus-icon"><Icon size={17} /></div><div className="focus-copy"><h3>{item.title}</h3><p>{item.copy}</p></div><ArrowUpRight className="focus-arrow" size={16} /></div></Reveal>;
            })}
          </div>
        </div>
      </section>

      <section className="section-wrap work-section" id="work">
        <Reveal className="section-heading work-heading"><div><p className="eyebrow"><span>02</span> / SELECTED WORK</p><h2>Made with intent<span>.</span></h2></div><p className="section-side-note">Every project starts with a question.<br />The details will tell the rest of the story.</p></Reveal>
        <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} total={projects.length} />)}</div>
        <Reveal className="project-note"><span className="note-symbol"><Code2 size={16} /></span><p>A new project is in development. I’ll share its details here when it’s ready.</p><span className="note-tail">MORE WORK IN PROGRESS</span></Reveal>
      </section>

      <section className="section-wrap approach-section">
        <Reveal className="approach-panel"><div className="approach-left"><p className="eyebrow"><span>03</span> / HOW I APPROACH IT</p><h2>Good work starts<br />with <span>good questions.</span></h2><p className="approach-description">I value clarity over complexity, steady improvement over shortcuts, and building something useful over building something just to look impressive.</p><a href="#contact" className="inline-arrow">Have a problem to solve? <ArrowUpRight size={15} /></a></div><div className="approach-code" aria-label="Illustrative code card"><div className="code-top"><div className="window-dots"><i /><i /><i /></div><span>working-principles.txt</span><Terminal size={14} /></div><div className="code-body"><p><span className="code-muted">01</span> <span className="code-key">understand</span>(problem)</p><p><span className="code-muted">02</span> <span className="code-key">design</span>(simple_solution)</p><p><span className="code-muted">03</span> <span className="code-key">build</span>(small, useful)</p><p><span className="code-muted">04</span> <span className="code-key">test</span>(learn, improve)</p><p className="code-comment"><span className="code-muted">05</span> # repeat with intention</p><div className="code-cursor" /></div><div className="code-bottom"><span>PROCESS: ITERATIVE</span><span className="code-status"><i /> READY TO LEARN</span></div></div></Reveal>
      </section>

      <section className="section-wrap contact-section" id="contact">
        <Reveal className="contact-header"><p className="eyebrow"><span>04</span> / CONTACT</p><h2>Let's build something<br /><span>worth talking about.</span></h2><p className="contact-subtitle">Open to a thoughtful conversation about internships, opportunities, and building useful things together.</p></Reveal>
        <Reveal className="resume-feature" delay={80}><div className="resume-feature-icon"><FileText size={21} /></div><div className="resume-feature-copy"><span className="eyebrow-small">FOR RECRUITERS</span><h3>Review my resume</h3><p>One-page resume · PDF</p></div><div className="resume-feature-actions"><a className="button button-light" href="/resume.pdf" target="_blank" rel="noreferrer">View resume <ArrowUpRight size={15} /></a><a className="resume-download" href="/resume.pdf" download="Ebirone-Michael-Resume.pdf">Download PDF <Download size={14} /></a></div></Reveal>
        <div className="contact-grid"><Reveal className="contact-aside"><div className="contact-aside-top"><span className="contact-icon"><Mail size={20} /></span><p>THE BEST THINGS<br />START WITH A HELLO.</p></div><div className="contact-direct"><span className="eyebrow-small">PREFER EMAIL?</span><a className="placeholder-contact" href="mailto:ebirone4@gmail.com">ebirone4@gmail.com</a><span className="contact-availability"><i /> Ready for the next conversation</span></div><div className="social-links"><span className="eyebrow-small">FIND ME ONLINE</span><a href="https://github.com/Ebirone06" target="_blank" rel="noreferrer" aria-label="Ebirone06 on GitHub">GitHub <ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/ebironemichael/" target="_blank" rel="noreferrer" aria-label="Ebirone Michael on LinkedIn">LinkedIn <ArrowUpRight size={14} /></a></div></Reveal><Reveal delay={100} className="contact-form-wrap"><div className="form-title"><h3>Send a message</h3><span>Usually the start of something good.</span></div><ContactForm /></Reveal></div>
      </section>

      <footer className="site-footer"><div className="footer-main"><a href="#top" className="footer-brand">EM<span>.</span></a><p>Curiosity into code.<br />Ideas into progress.</p><a className="back-top" href="#top">Back to top <ArrowUpRight size={15} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Ebirone Michael</span><span>DESIGNED TO GROW WITH THE WORK.</span><span>MADE WITH INTENTION <span className="footer-heart">✳</span></span></div></footer>
    </main>
  );
}
