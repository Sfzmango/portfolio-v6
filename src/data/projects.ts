// Single source of truth for project cards. Deferred URLs are one-line edits here.
//
// LINK GUARD (uniform rule): a card renders an <a href> for a URL field ONLY when
// that field is a non-empty string. An empty/absent demo URL renders the repo-only
// or a non-link "demo coming" state — never a dead/empty href. Applies to every
// record so no project can ship href="".

export type ProjectStatus = 'live' | 'in-dev' | 'coming-soon' | 'beta';

export interface ProjectLink {
  label: string;
  /** Empty string = not wired yet; the link guard suppresses the anchor. */
  url: string;
}

export interface Project {
  id: string;
  title: string;
  /** Optional secondary line under the title (e.g. a repo alias / shorthand). */
  subtitle?: string;
  /** One-to-two line description. */
  blurb: string;
  /** Longer teaser copy for featured/parallax cards (optional). */
  detail?: string;
  status: ProjectStatus;
  /** Grouped tech chips. Featured cards may split into front/back groups. */
  chips: string[];
  chipGroups?: { label: string; chips: string[] }[];
  /** Primary demo/live URL — empty string until confirmed (link guard suppresses). */
  demoUrl: string;
  /** Custom label for the demo button per project state. */
  demoLabel?: string;
  /** Repo links — rendered only when url is non-empty. */
  repos: ProjectLink[];
  /** Screenshot path under public/ (base-prefixed at render); empty = placeholder card. */
  screenshot: string;
  /** Short alt text for the screenshot. */
  screenshotAlt?: string;
}

// ---- Featured work (two equal-weight cards he wants up top; #1 leads) ----

export const featured: Project[] = [
  {
    id: 'tafl',
    title: 'TAFL',
    blurb:
      'A web implementation of the ancient Norse strategy game Tafl (hnefatafl) — two-player couch play on a single shared device.',
    detail:
      'A full-stack hnefatafl game for local two-player couch play — two people share one device and alternate turns on the same board. A React 19 + TypeScript client (Zustand for game state) calls a Rails 7 JSON API that validates moves and stores games in PostgreSQL.',
    status: 'live',
    chips: [],
    chipGroups: [
      {
        label: 'Frontend',
        chips: [
          'React 19',
          'Vite',
          'TypeScript',
          'Zustand',
          'Emotion',
        ],
      },
      {
        label: 'Backend',
        chips: [
          'Rails 7.1',
          'PostgreSQL',
          'Puma',
          'rack-cors',
        ],
      },
    ],
    // Live as of 2026-06-17 — demo button wired, screenshot captured.
    demoUrl: 'https://sfzmango.github.io/tafl-frontend/',
    demoLabel: 'Live demo',
    repos: [
      { label: 'Frontend', url: 'https://github.com/Sfzmango/tafl-frontend' },
      { label: 'Backend', url: 'https://github.com/Sfzmango/tafl-backend' },
    ],
    screenshot: '/screenshots/tafl.jpg',
    screenshotAlt: 'TAFL real-time multiplayer hnefatafl board',
  },
  {
    id: 'ai-orchestration',
    title: 'AI Orchestration Workflow',
    // Public open-source repo alias (shown as a card subtitle).
    subtitle: "Maung's Agentic Toolbelt",
    blurb:
      'A project-agnostic, human-gated Claude Code toolbelt — 16 agents and 9 skills that carry work from a raw idea to a security-reviewed, merge-ready pull request, and keep a codebase\'s docs current on their own.',
    detail:
      'A standalone, open-source release: dedicated agents and skills for planning, implementation, review, security review, bug diagnosis, chores, handoffs, and a self-maintaining wiki — with zero-context "fresh-eyes" reviewers, rubric-scored verdicts, always-on guardrail hooks, and MCP integrations for GitHub and Playwright. It auto-detects each host project\'s conventions and installs as a Claude Code plugin, generalizing the workflow used to deliver a multi-tenant procure-to-pay platform end-to-end.',
    // Public, in-development open-source repo (verified public 2026-06-17).
    status: 'beta',
    chips: [
      'Claude Code',
      'MCP',
      'Adversarial evals',
      'Playwright',
      'RSpec / RuboCop CI',
      'Agent handoffs',
    ],
    // No hosted demo — the deliverable is the repo itself; the link guard
    // renders the repo button now that the URL is non-empty.
    demoUrl: '',
    demoLabel: '',
    repos: [
      { label: 'Source', url: 'https://github.com/Sfzmango/Maungs-agentic-toolbelt' },
    ],
    // Crisp vector spark mark (redwood, centered on the card's forest-night surface);
    // SVG so it stays sharp at any DPR. Rendered contained (not cropped) by the card.
    screenshot: '/screenshots/claude-logo.svg',
    screenshotAlt: 'Claude radial spark mark',
  },
];

// ---- Selected work (regular showcase grid, in priority order) ----

export const selectedWork: Project[] = [
  {
    id: 'mhrk-wedding',
    title: 'Maung & Rose Wedding',
    blurb:
      'A wedding website with a vintage visual design and all of the components to ensure that guests will be able to RSVP and also have all the information they need for the event. Feel free to RSVP but the event is long over though...',
    status: 'live',
    chips: ['Next.js 14', 'React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Headless UI'],
    demoUrl: 'https://kilgorewedding.online',
    demoLabel: 'Live demo',
    repos: [],
    screenshot: '/screenshots/wedding.jpg',
    screenshotAlt: 'MHRK Wedding website home page',
  },
  {
    id: 'timesheet-manager',
    title: 'Timesheet Manager',
    blurb:
      'A full-stack timesheet and line-item tracker: account creation, CRUD on timesheets and line items, and auto-summed minutes and cost with JWT auth.',
    // Live as of 2026-06-17 — redeployed on Heroku, demo button wired. Repo renamed to
    // a neutral slug (timesheet-manager). Consistent with TAFL/Memory Lane live wiring.
    status: 'live',
    chips: ['MongoDB', 'Express', 'React', 'Node.js', 'Apollo / GraphQL', 'JWT', 'Bcrypt', 'Bootstrap'],
    demoUrl: 'https://timesheet-manager-c3269f1db048.herokuapp.com/',
    demoLabel: 'Live demo',
    repos: [
      { label: 'Repo', url: 'https://github.com/Sfzmango/timesheet-manager' },
    ],
    // Optimized animated WebP (lazy) replacing the raw 1.4MB demo GIF.
    screenshot: '/screenshots/timesheet-manager.webp',
    screenshotAlt: 'Timesheet Manager dashboard demo',
  },
  {
    id: 'memory-lane',
    title: 'Memory Lane',
    blurb:
      'A timeline generator for building clean, shareable personal timelines — sign up, create timelines, and add chronologically-ordered "moments" with images and dates.',
    status: 'live',
    chips: ['MongoDB', 'Express', 'React', 'Node.js', 'Apollo / GraphQL', 'JWT', 'React Router', 'Tailwind'],
    demoUrl: 'https://the-memory-lane.herokuapp.com/',
    demoLabel: 'Live demo',
    repos: [{ label: 'Repo', url: 'https://github.com/Sfzmango/memory-lane' }],
    // Optimized animated WebP (lazy) replacing the raw 12MB demo GIF.
    screenshot: '/screenshots/memory-lane.webp',
    screenshotAlt: 'Memory Lane home page with seeded demo timelines',
  },
];

// ---- Up next (dedicated parallax band) ----

export const upNext: Project = {
  id: 'odyssa',
  title: 'Odyssa',
  blurb:
    'A 1-bit pixel-horror descent into the sealed catacombs beneath a city that has known too much war.',
  detail:
    'In development. Live today is a teaser landing and concept board.',
  status: 'coming-soon',
  chips: ['GODOT'],
  demoUrl: 'https://odyssa-catacombs.com',
  demoLabel: 'View teaser',
  repos: [],
  screenshot: '/screenshots/odyssa.webp',
  screenshotAlt: 'Odyssa Catacombs teaser — 1-bit pixel-horror artwork',
};
