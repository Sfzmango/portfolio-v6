export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  dateRange: string;
  /** Optional note rendered next to the role (e.g. promotion). */
  note?: string;
  bullets: string[];
  /** Marks the USMC veteran entry for a tasteful badge. */
  veteran?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Senior Software Engineer / Architect',
    company: 'Stealth Startup',
    location: 'Remote',
    dateRange: 'May 2026 — Present',
    bullets: [
      'Architected a multi-tenant procure-to-pay platform rebuild, delivered end-to-end through a purpose-built multi-agent AI workflow.',
      'Designed a multi-agent orchestration system on Claude Code, released as the open-source "Maung\'s Agentic Toolbelt": a project-agnostic, human-gated pipeline routing planning, implementation, review, and resolution across dedicated agents, with strict planner/implementer separation and MCP integrations for GitHub and Playwright.',
      'Engineered adversarial evaluation loops for LLM-generated plans and code — zero-context reviewer agents, rubric-scored verdicts, and a bounded diagnose-vs-refute debate that blocks unconfirmed bug diagnoses.',
      'Enforced zero-regression quality gates on AI-generated code: RuboCop, Vite, and a 790+-example RSpec suite in pre-commit hooks and CI; authored 10 Playwright browser-automation playbooks.',
      'Shipped to production: 23 CI-gated PRs and 50+ commits in the first 3 weeks — a 22-model Rails 8 domain (vendors, purchase orders, default-deny RBAC) with a ~2:1 spec-to-code ratio.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Corpay (NYSE: CPAY)',
    location: 'San Mateo, CA',
    dateRange: 'Apr 2023 — Feb 2026',
    note: 'Promoted from QA Analyst',
    bullets: [
      'Built and shipped web application features end-to-end with React, AngularJS, and Ruby on Rails on a SaaS platform processing millions of dollars in daily payments — 1,670+ commits and 27,000+ lines of code.',
      'Designed RESTful and SOAP integrations for the Corpay/NVP payment pipeline (125+ modifications): virtual card data polling, transaction status synchronization, and settlement workflows via Comdata APIs.',
      'Scaled invoice ingestion from 5,000 to 300,000 records per batch with an SFTP-based upsert pipeline — Sidekiq background jobs, PostgreSQL indexing, duplicate detection, and concurrency controls.',
      'Instrumented critical payment paths with Honeybadger, Datadog, and CloudWatch; resolved production hotfixes with rapid turnaround and mentored new engineering hires on architecture and payment workflows.',
    ],
  },
  {
    role: 'Full-Stack Developer (Intern)',
    company: 'HCDL',
    location: 'San Francisco, CA (Remote)',
    dateRange: 'Oct 2022 — Jan 2023',
    bullets: [
      'Built a full-stack web app with React, Node.js/Express, and MySQL: Bcrypt/JWT authentication, AWS RDS persistence, and RESTful API integrations including the Geisinger API.',
    ],
  },
  {
    role: 'Electro-Optical Ordnance Repairer',
    company: 'United States Marine Corps',
    location: '',
    dateRange: 'Jun 2018 — Jun 2023',
    veteran: true,
    bullets: [
      'Held U.S. Government Secret security clearance; trained personnel on confidential electro-optical systems.',
    ],
  },
];
