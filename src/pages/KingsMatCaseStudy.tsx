import {
  ArrowLeft, ArrowUpRight, BookOpen, Check, CircleAlert, Cloud,
  FileCheck2, FileUp, GraduationCap, KeyRound, LockKeyhole,
  Smartphone, UsersRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { Reveal } from '../components/Reveal';

const unknownAuth = [
  'Identity provider and account verification method',
  'How staff authorization is granted and enforced',
  'Registration fields and validation rules',
  'Password recovery method, expiry, and resend behavior',
];

const resourceSteps = [
  { title: 'Staff access', copy: 'A staff member enters the staff access workflow.' },
  { title: 'Choose a resource', copy: 'Staff select an academic file for distribution.' },
  { title: 'Add resource details', copy: 'Titles, descriptions, and academic categories depend on the implemented fields.' },
  { title: 'Upload and publish', copy: 'The application sends the resource through its configured storage flow; provider and validation rules need source review.' },
  { title: 'Student access', copy: 'Students use the student experience to access available study materials.' },
];

const reviewTopics = [
  'Trusted staff-role enforcement for protected actions',
  'Account recovery and verification-code handling',
  'File type, size, and content validation',
  'Storage access rules and private resource handling',
  'Upload and retrieval failure feedback',
  'Protection of student and staff account information',
];

export function KingsMatCaseStudy({ project }: { project: Project }) {
  return (
    <main className="project-detail section-wrap kings-mat-detail">
      <div className="detail-top-nav"><Link to="/#work" className="back-link"><ArrowLeft size={15} /> Back to selected work</Link><span className="detail-index">CASE STUDY / {project.number}</span></div>

      <Reveal className="kings-mat-hero">
        <div className="kings-mat-hero-copy">
          <p className="eyebrow">ANDROID APPLICATION / EDUCATION TECHNOLOGY</p>
          <h1>Kings Mat <span>[KEC]</span><b>.</b></h1>
          <p className="kings-mat-subtitle">College Study Materials Platform</p>
          <p className="detail-lede">Building a centralized mobile experience for academic resource distribution, with dedicated student and staff workflows that connect staff-managed study materials to student access.</p>
          <div className="kings-mat-meta"><span><small>TYPE</small>Android application</span><span><small>LANGUAGE</small>Kotlin</span><span><small>PLATFORM</small>Firebase</span><span><small>CORE FOCUS</small>Secure access · academic resources</span></div>
          <div className="kings-mat-status"><Check size={14} /> Built application · release and deployment details to confirm</div>
        </div>
        <div className="kings-mat-visual" role="img" aria-label="Concept illustration of a mobile study materials application, not an application screenshot">
          <div className="kings-mat-visual-grid" /><div className="kings-phone"><div className="kings-phone-camera" /><div className="kings-phone-brand"><GraduationCap size={17} /><span>KINGS MAT</span></div><div className="kings-phone-title">Study materials</div><div className="kings-phone-row"><i /><span /><b /></div><div className="kings-phone-row"><i /><span /><b /></div><div className="kings-phone-row"><i /><span /><b /></div><div className="kings-phone-nav"><span /><span /><span /></div></div>
          <span className="kings-visual-caption">CONCEPT ILLUSTRATION · NOT AN APPLICATION SCREENSHOT</span>
        </div>
      </Reveal>

      <section className="kings-case-section kings-problem-section">
        <Reveal className="kings-section-heading"><p className="eyebrow"><span>01</span> / THE PROBLEM</p><h2>Learning resources<br /><span>spread across channels.</span></h2></Reveal>
        <Reveal className="kings-problem-copy"><p>When academic materials are shared through different communication channels, students can have difficulty finding the latest resources, while staff have to manage distribution across disconnected workflows.</p><p>Kings Mat brings the student access and staff-managed distribution experience into a college-focused Android application. Its aim is to make the path from publishing a resource to finding it more direct.</p></Reveal>
      </section>

      <section className="kings-case-section kings-experiences-section">
        <Reveal className="kings-section-heading kings-experiences-heading"><div><p className="eyebrow"><span>02</span> / TWO CONNECTED EXPERIENCES</p><h2>For students.<br /><span>For staff.</span></h2></div><p>Specific screens and available actions should be confirmed against the application source.</p></Reveal>
        <div className="kings-experience-grid">
          <Reveal><article className="kings-experience-card"><div className="kings-experience-icon"><GraduationCap size={20} /></div><p className="eyebrow">STUDENT EXPERIENCE</p><h3>Access learning materials.</h3><p>Students use a dedicated access workflow and account management to reach academic materials made available through the app.</p><div className="kings-feature-chips"><span>Student access</span><span>Account management</span><span>Study materials</span></div></article></Reveal>
          <Reveal delay={80}><article className="kings-experience-card"><div className="kings-experience-icon"><UsersRound size={20} /></div><p className="eyebrow">STAFF EXPERIENCE</p><h3>Manage resource distribution.</h3><p>Staff have a separate access workflow and a staff-managed resource distribution experience for sharing study materials with students.</p><div className="kings-feature-chips"><span>Staff access</span><span>Resource upload</span><span>Distribution workflow</span></div></article></Reveal>
        </div>
      </section>

      <section className="kings-case-section kings-auth-section">
        <Reveal className="kings-section-heading"><p className="eyebrow"><span>03</span> / ACCOUNTS & ACCESS</p><h2>Separate entry points.<br /><span>Permissions to verify.</span></h2></Reveal>
        <Reveal className="kings-auth-content">
          <div className="kings-flow-card"><div className="kings-flow-step"><span>01</span><strong>Open Kings Mat</strong><small>Android application</small></div><div className="kings-flow-branches"><div><UsersRound size={17} /><strong>Student access</strong></div><div><UsersRound size={17} /><strong>Staff access</strong></div></div><div className="kings-flow-step"><span>02</span><strong>Authenticate account</strong><small>Provider and validation method need source review</small></div><div className="kings-flow-step kings-flow-destination"><span>03</span><strong>Open the relevant experience</strong><small>Staff privilege enforcement method needs verification</small></div></div>
          <div className="kings-verification-panel"><div><KeyRound size={17} /><strong>Account details to confirm</strong></div><ul>{unknownAuth.map((item) => <li key={item}>{item}</li>)}</ul><p>No OTP provider, account fields, or college-identity check is claimed here.</p></div>
        </Reveal>
      </section>

      <section className="kings-case-section kings-resource-section">
        <Reveal className="kings-section-heading"><p className="eyebrow"><span>04</span> / RESOURCE LIFECYCLE</p><h2>From staff upload<br /><span>to student access.</span></h2></Reveal>
        <Reveal className="kings-resource-content"><p className="kings-diagram-note"><FileUp size={15} /> Workflow based on the project description; storage and metadata details are unverified.</p><div className="kings-resource-timeline">{resourceSteps.map((step, index) => <div className="kings-resource-step" key={step.title}><span className="kings-step-number">0{index + 1}</span><span className="kings-step-icon">{index === 0 ? <LockKeyhole size={17} /> : index === 1 ? <FileUp size={17} /> : index === 2 ? <FileCheck2 size={17} /> : index === 3 ? <Cloud size={17} /> : <BookOpen size={17} />}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></div>)}</div></Reveal>
      </section>

      <section className="kings-case-section kings-architecture-section">
        <Reveal className="kings-section-heading"><p className="eyebrow"><span>05</span> / TECHNICAL ARCHITECTURE</p><h2>Android at the edge.<br /><span>Services to confirm.</span></h2></Reveal>
        <Reveal className="kings-architecture-card">
          <div className="kings-architecture-flow"><div><Smartphone size={19} /><strong>Android application</strong><small>Student + staff workflows</small></div><span aria-hidden="true" /><div><LockKeyhole size={19} /><strong>Authentication & access</strong><small>Provider and role rules unverified</small></div><span aria-hidden="true" /><div><Cloud size={19} /><strong>Resource services</strong><small>Metadata and file storage unverified</small></div></div>
          <div className="kings-architecture-return"><ArrowUpRight size={14} /><span>Study resources returned to the student experience</span></div>
          <div className="kings-architecture-note"><CircleAlert size={15} /> No specific Firebase product, email service, API, database, or storage provider is asserted without source evidence.</div>
        </Reveal>
      </section>

      <section className="kings-case-section kings-security-section">
        <Reveal className="kings-section-heading"><p className="eyebrow"><span>06</span> / SECURITY & RELIABILITY</p><h2>Trust depends on<br /><span>the details underneath.</span></h2></Reveal>
        <Reveal className="kings-security-card"><div className="kings-security-intro"><CircleAlert size={18} /><div><strong>Review areas</strong><p>These are engineering concerns to verify in the implementation, not a claim that each has been solved.</p></div></div><ul>{reviewTopics.map((item) => <li key={item}><span />{item}</li>)}</ul><p>Staff access should be protected by trusted authorization logic. The current enforcement and storage rules have not been reviewed in this portfolio workspace.</p></Reveal>
      </section>

      <section className="kings-case-section kings-contribution-section">
        <Reveal className="kings-section-heading"><p className="eyebrow"><span>07</span> / MY CONTRIBUTION</p><h2>Built by<br /><span>Ebirone Michael.</span></h2></Reveal>
        <Reveal className="kings-contribution-copy"><p>I built Kings Mat as an Android application using Kotlin and Firebase. I personally implemented secure login, app security, and academic-material uploads.</p><p>The exact Firebase services, authorization rules, and file-handling details still need verification. I don’t have a repository, screenshots, demo, or APK link to share yet.</p><div className="kings-stack-note"><Smartphone size={16} /><span>Confirmed: Android · Kotlin · Firebase</span><span>Firebase service details: not documented yet</span></div></Reveal>
      </section>

      <section className="kings-case-section kings-development-section">
        <Reveal className="kings-section-heading"><p className="eyebrow"><span>08</span> / DEVELOPMENT NOTES</p><h2>Technical decisions<br /><span>to capture from source.</span></h2></Reveal>
        <Reveal className="kings-development-copy"><p>Resource upload validation, account and role navigation, email verification, metadata synchronization, and network error handling are relevant areas for this project. The available portfolio files do not show which of these were implementation challenges or how they were addressed.</p><p>Once the source is available, these notes can be replaced with concrete decisions and lessons from the actual build.</p></Reveal>
      </section>

      <section className="kings-case-section kings-future-section">
        <Reveal className="kings-section-heading"><p className="eyebrow"><span>09</span> / FUTURE IMPROVEMENTS</p><h2>Next steps after<br /><span>reviewing what exists.</span></h2></Reveal>
        <Reveal className="kings-future-copy"><p>Potential improvements can be selected after checking the current feature set. Areas to evaluate include resource discovery, file previews, upload retries, connectivity behavior, and automated tests for account permissions.</p><p>These are possibilities, not a statement that the app lacks those features.</p></Reveal>
      </section>

      <div className="kings-links-note"><span className="kings-experience-icon"><CircleAlert size={17} /></span><p>Project links and screenshots are not available yet. A repository, demo, or APK can be added here when ready to share.</p></div>
      <div className="detail-next"><div><p className="eyebrow">NEXT UP</p><h2>More work, more learning.</h2></div><Link to="/#work" className="round-arrow" aria-label="Return to all projects"><ArrowUpRight size={23} /></Link></div>
    </main>
  );
}
