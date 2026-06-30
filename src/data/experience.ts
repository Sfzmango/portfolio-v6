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
    role: 'Senior Software Engineer / Founding Engineer',
    company: 'Stealth Startup',
    location: 'Remote',
    dateRange: 'May 2026 — Present',
    note: 'Fintech · P2P SaaS',
    bullets: [
      'Architect and a founding engineer building a multi-tenant procure-to-pay platform from an empty repository to production — 30+ Rails 8 models and a Stripe Custom Connect payments engine spanning multi-tenancy, default-deny RBAC, vendor management, purchase orders, invoice automation, chart of accounts, and double-entry journals, across 40+ reviewed, CI-gated pull requests.',
      'Built the core backend hands-on: a database-driven, default-deny authorization layer (Pundit); tokenized vendor onboarding, funding methods, virtual cards, and webhook reconciliation; and reusable primitives for gap-free document numbering, soft-deletes, and audit logging — with strict cross-organization data isolation and encrypted sensitive records.',
      'Delivered the platform end-to-end through a self-designed multi-agent AI workflow on Claude Code — 13 archetyped agents carry each feature from concept through planning, implementation, and pull-request review, with fresh-context reviewers adversarially grading every plan and PR against a fixed rubric behind human-gated approval on commits and risky database migrations.',
      'Released a project-agnostic version of that wcan orkflow as the open-source "Maung\'s Agentic Toolbelt" — 16 agents and 9 skills that take work from a raw idea to a security-reviewed, merge-ready pull request, with strict planner/implementer separation and MCP integrations for GitHub and Playwright.',
      'Enforced zero-regression quality gates on AI-generated code: a 2,200+-example RSpec suite at a ~2:1 test-to-code ratio, plus linting and build, run on every commit and push and mirrored exactly in CI.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Corpay (NYSE: CPAY)',
    location: 'San Mateo, CA',
    dateRange: 'Apr 2023 — Feb 2026',
    note: 'Promoted from QA Analyst',
    bullets: [
      'Took full ownership of the file-integration system — the platform\'s most critical pipeline — on a SaaS processing millions of dollars in payments daily for clients up to enterprise scale; delivered 1,670+ commits, 250+ tickets, and 27,000+ lines across Rails, AngularJS, React, and Cypress.',
      'Scaled the bulk invoice-ingestion pipeline from 5,000 to 300,000 records per batch — parallel Sidekiq workers parse and de-duplicate rows, build invoices, and link them to a single source-document payment, tuned with database indexing, uniqueness constraints, and job-level concurrency controls.',
      'Built and maintained the Corpay/NVP payment-processor integration (125+ changes via REST and SOAP): posting approved payments, reconciling both systems through webhook-driven polling, and issuing vendor virtual cards via Comdata — instrumented end to end with Honeybadger, Datadog, and CloudWatch.',
      'Resolved a SEV-1 payment-routing incident in an all-hands response — a batch had routed a customer\'s full ~$500K to a single vendor; traced it through CloudWatch and voided every transaction before funds left the originating account, then hardened multi-vendor chunking with pre-production verification.',
      'Reviewed ~400 pull requests as a primary reviewer, mentored new engineering hires on architecture and payment workflows, and partnered with product owners and stakeholders to translate business requirements into technical solutions.',
    ],
  },
  {
    role: 'Pit Crew Operator',
    company: 'Cruise',
    location: 'San Francisco, CA',
    dateRange: 'Feb 2023 — Apr 2023',
    note: 'Autonomous Vehicles',
    bullets: [
      'Ran daily readiness inspections on autonomous vehicles ahead of self-driving reliability testing, keeping the test fleet operational and on schedule.',
      'Synced each vehicle\'s onboard software to the correct development branch before AV runs and proactively surfaced issues that could disrupt testing.',
    ],
  },
  {
    role: 'Solar Test Technician',
    company: 'PV Evolution Labs (PVEL)',
    location: 'Berkeley, CA',
    dateRange: 'Jun 2019 — Jul 2020',
    note: 'Night-Shift Lead',
    bullets: [
      'Night-shift lead for a reliability-testing team — ran performance and durability tests on solar equipment, validated measurement data, logged it to a structured database, and re-ran tests when results fell outside tolerance.',
      'Trained junior technicians on test procedures and result logging, and co-built a sorting system that streamlined intake, organization, and export of solar panels and equipment.',
    ],
  },
  {
    role: 'Electro-Optical Ordnance Repairer',
    company: 'United States Marine Corps',
    location: '',
    dateRange: 'Jun 2018 — Jun 2023',
    veteran: true,
    bullets: [
      'Held a U.S. Government Secret security clearance (since expired) and trained military personnel on confidential electro-optical systems — thermals, night vision, and laser rangefinders valued from thousands to hundreds of thousands of dollars.',
      'Tested and repaired thermal and laser optics with military test equipment and technical manuals, replacing components to return equipment to optimal performance.',
    ],
  },
];
