export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  status: 'placeholder' | 'published' | 'implemented' | 'built';
  role: string;
  problem: string;
  approach: string;
  learnings: string;
  stack: string[];
  repositoryUrl: string;
  demoUrl: string;
};

/**
 * Mark a project as a placeholder only when it is intentionally presented as unfinished.
 * Public repository and demo links are optional and should only be added when supplied.
 */
export const projects: Project[] = [
  {
    slug: 'kings-mat', number: '01', title: 'Kings Mat [KEC]',
    category: 'ANDROID APPLICATION',
    summary: 'A Kotlin and Firebase Android application for academic materials, with separate student and staff workflows, secure login, app security, and staff-managed uploads.',
    status: 'built',
    role: 'Android application developer · personally implemented secure login, app security, and academic-material uploads.',
    problem: 'Academic resources can be distributed across different communication channels, making it harder for students to find current materials and for staff to manage distribution consistently.',
    approach: 'Built with Kotlin and Firebase, Kings Mat provides separate student and staff workflows. Ebirone personally implemented secure login, app security, and academic-material uploads. Specific Firebase services and file-handling details still need source review.',
    learnings: 'Implementation details, technical decisions, and development challenges can be documented accurately after reviewing the Android project source.',
    stack: ['Kotlin', 'Firebase', 'Android', 'Education Technology'], repositoryUrl: '', demoUrl: '',
  },
  {
    slug: 'mi-secure', number: '02', title: 'MI Secure',
    category: 'DESKTOP SECURITY SOFTWARE',
    summary: 'A Python and PyQt6 desktop security application for Linux, bringing together application locking, face recognition, USB monitoring, file encryption, security event logs, and a centralized dashboard.',
    status: 'implemented',
    role: 'Student developer · project scope and implementation confirmed by the developer.',
    problem: 'Security-related tasks can be split across separate applications and manual workflows. MI Secure explores whether local controls and event activity can be brought together in a clearer desktop interface.',
    approach: 'The project brings six local security modules into a PyQt6 desktop interface. The developer confirms that all six modules are implemented; detailed implementation and validation information can be added as it is documented.',
    learnings: 'The project brings together a broad set of desktop security workflows. Detailed technical decisions, validation, and next steps can be added as they are documented.',
    stack: ['Python', 'PyQt6', 'Linux', 'Cybersecurity', 'Desktop Application', 'File Security'], repositoryUrl: '', demoUrl: '',
  },
];
