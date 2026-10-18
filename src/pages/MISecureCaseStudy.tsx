import {
  ArrowLeft, ArrowUpRight, Boxes, Check, CircleAlert, FileLock2,
  Fingerprint, LayoutDashboard, LockKeyhole, ScrollText, ShieldCheck, Usb,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { Reveal } from '../components/Reveal';

const modules = [
  { title: 'Application Locking', icon: LockKeyhole, copy: 'An application-protection workflow for exploring controlled access to selected desktop applications.' },
  { title: 'Face Recognition', icon: Fingerprint, copy: 'A biometric authentication module within the desktop access-control experience.' },
  { title: 'USB Device Alerts', icon: Usb, copy: 'Surfaces removable-device connection activity so users can review relevant events.' },
  { title: 'File Encryption', icon: FileLock2, copy: 'A local file-protection workflow for encrypting and accessing selected files.' },
  { title: 'Security Event Logs', icon: ScrollText, copy: 'Collects security-related application activity in one place for review.' },
  { title: 'Security Dashboard', icon: LayoutDashboard, copy: 'Brings module access and recent security activity into a unified desktop view.' },
];

const considerations = [
  'Linux permissions and process isolation',
  'Authentication failure and recovery paths',
  'Privacy and handling of biometric data',
  'Encryption key management and interrupted operations',
  'USB event reliability and clear user feedback',
  'Sensitive data exposure in local event logs',
];

const nextSteps = [
  'Document module boundaries and implementation decisions.',
  'Review permission handling across supported Linux environments.',
  'Add integration checks for cross-module workflows.',
  'Improve event filtering, history, and accessibility as needed.',
];

export function MISecureCaseStudy({ project }: { project: Project }) {
  return (
    <main className="project-detail section-wrap mi-secure-detail">
      <div className="detail-top-nav"><Link to="/#work" className="back-link"><ArrowLeft size={15} /> Back to selected work</Link><span className="detail-index">CASE STUDY / {project.number}</span></div>

      <Reveal className="mi-secure-hero">
        <div className="mi-secure-hero-copy">
          <p className="eyebrow"><span>{project.number}</span> / DESKTOP SECURITY SOFTWARE</p>
          <h1>MI Secure<span>.</span></h1>
          <p className="mi-secure-subtitle">Local Linux Desktop Security Suite</p>
          <p className="detail-lede">Exploring how desktop software can bring local security utilities, device monitoring, authentication workflows, and file protection into one cohesive interface.</p>
          <div className="mi-secure-meta">
            <span><small>TYPE</small>Desktop application</span><span><small>LANGUAGE</small>Python</span><span><small>INTERFACE</small>PyQt6</span><span><small>PLATFORM</small>Linux</span>
          </div>
          <div className="mi-secure-status"><Check size={14} /> All six modules reported implemented by the developer</div>
        </div>
        <div className="mi-secure-visual" role="img" aria-label="Concept illustration of a shield representing the MI Secure desktop security project">
          <div className="mi-visual-grid" /><div className="mi-visual-ring mi-visual-ring-one" /><div className="mi-visual-ring mi-visual-ring-two" />
          <ShieldCheck className="mi-visual-shield" size={112} strokeWidth={0.8} />
          <span className="mi-visual-caption">CONCEPT VISUAL · NOT AN APPLICATION SCREENSHOT</span>
        </div>
      </Reveal>

      <section className="mi-case-section mi-problem-section">
        <Reveal className="mi-section-heading"><p className="eyebrow"><span>01</span> / THE PROBLEM</p><h2>Security work can feel<br /><span>scattered across tools.</span></h2></Reveal>
        <Reveal className="mi-problem-copy"><p>Computer users may handle application access, removable-device activity, file protection, and event review through separate applications or manual workflows.</p><p>MI Secure explores a unified local interface for these tasks, with the goal of making related controls and activity easier to find. It is intended to complement operating-system security controls, not replace them.</p></Reveal>
      </section>

      <section className="mi-case-section mi-modules-section">
        <Reveal className="mi-section-heading mi-modules-heading"><div><p className="eyebrow"><span>02</span> / PROJECT MODULES</p><h2>Six workflows.<br /><span>One desktop interface.</span></h2></div><p>Module descriptions summarize the project scope. They do not imply a security audit or independently validated protection.</p></Reveal>
        <div className="mi-module-grid">
          {modules.map(({ title, icon: Icon, copy }, index) => <Reveal key={title} delay={index * 65}>
            <article className="mi-module-card"><div className="mi-module-top"><span className="mi-module-icon"><Icon size={18} /></span><span className="mi-module-number">0{index + 1}</span></div><h3>{title}</h3><p>{copy}</p><span className="mi-module-state"><i /> Implemented · developer confirmed</span></article>
          </Reveal>)}
        </div>
      </section>

      <section className="mi-case-section mi-architecture-section">
        <Reveal className="mi-section-heading"><p className="eyebrow"><span>03</span> / CONCEPTUAL ARCHITECTURE</p><h2>A local path from<br /><span>interface to activity.</span></h2></Reveal>
        <Reveal className="mi-architecture-card">
          <div className="mi-architecture-flow">
            <div className="mi-architecture-node"><span><Boxes size={18} /></span><strong>Linux desktop user</strong><small>Local interaction</small></div>
            <div className="mi-flow-line" aria-hidden="true" />
            <div className="mi-architecture-node"><span><LayoutDashboard size={18} /></span><strong>PyQt6 interface</strong><small>Desktop experience</small></div>
            <div className="mi-flow-line" aria-hidden="true" />
            <div className="mi-architecture-node"><span><ShieldCheck size={18} /></span><strong>Python application</strong><small>Security workflows</small></div>
          </div>
          <div className="mi-architecture-modules">{modules.map(({ title }) => <span key={title}>{title}</span>)}</div>
          <div className="mi-architecture-foot"><span>Linux interfaces · local files · event history</span><span>CONCEPTUAL OVERVIEW · SOURCE STRUCTURE NOT REVIEWED</span></div>
        </Reveal>
      </section>

      <section className="mi-case-section mi-considerations-section">
        <Reveal className="mi-section-heading"><p className="eyebrow"><span>04</span> / SECURITY ENGINEERING</p><h2>Thoughtful controls<br /><span>need careful trade-offs.</span></h2></Reveal>
        <Reveal className="mi-considerations-card"><div className="mi-considerations-intro"><CircleAlert size={19} /><div><strong>Engineering considerations</strong><p>These are areas to design for and validate; they are not claims that each concern is fully solved.</p></div></div><ul>{considerations.map((item) => <li key={item}><span /><span>{item}</span></li>)}</ul><p className="mi-security-footnote">No independent security audit or certification is claimed.</p></Reveal>
      </section>

      <section className="mi-case-section mi-progress-section">
        <Reveal className="mi-progress-card"><div><p className="eyebrow"><span>05</span> / CURRENT PROGRESS</p><h2>Six modules,<br /><span>developer confirmed.</span></h2><p>The developer reports that application locking, face recognition, USB alerts, file encryption, event logs, and the dashboard are implemented. The portfolio does not include MI Secure’s source code, so implementation details, tests, and security behavior have not been independently reviewed here.</p></div><div className="mi-progress-checklist">{modules.map(({ title }) => <div key={title}><Check size={14} /><span>{title}</span><small>Developer confirmed</small></div>)}</div></Reveal>
      </section>

      <section className="mi-case-section mi-next-section">
        <Reveal className="mi-section-heading"><p className="eyebrow"><span>06</span> / POSSIBLE NEXT STEPS</p><h2>Make the implementation<br /><span>easier to evaluate.</span></h2></Reveal>
        <Reveal className="mi-next-list">{nextSteps.map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p><ArrowUpRight size={15} /></div>)}</Reveal>
      </section>

      <div className="mi-links-note"><span className="mi-module-icon"><CircleAlert size={17} /></span><p>Repository, demo, screenshots, and download instructions will be added when a project-specific public link or genuine capture is available.</p></div>

      <div className="detail-next"><div><p className="eyebrow">NEXT UP</p><h2>More work, more learning.</h2></div><Link to="/#work" className="round-arrow" aria-label="Return to all projects"><ArrowUpRight size={23} /></Link></div>
    </main>
  );
}
