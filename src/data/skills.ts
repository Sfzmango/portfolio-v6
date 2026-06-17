export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'AI Engineering',
    skills: [
      'Agentic orchestration',
      'Multi-agent system design',
      'Claude Code (subagents, skills, pipelines)',
      'MCP (Model Context Protocol)',
      'Prompt & rubric engineering',
      'Adversarial evaluation loops',
      'Human-in-the-loop gating',
    ],
  },
  {
    label: 'AI Reliability & Evals',
    skills: [
      'Eval gates for AI-generated code',
      'Browser-automation verification (Playwright)',
      'Least-privilege agent tool scoping',
      'Token budgeting',
      'Structured agent handoffs',
    ],
  },
  {
    label: 'Languages & Frameworks',
    skills: [
      'JavaScript',
      'TypeScript',
      'Ruby',
      'SQL',
      'React',
      'AngularJS',
      'Node.js',
      'Express.js',
      'Ruby on Rails',
    ],
  },
  {
    label: 'Data & Infrastructure',
    skills: [
      'PostgreSQL',
      'MySQL',
      'Elasticsearch',
      'Redis',
      'AWS (S3, EC2, RDS, CloudWatch)',
      'Docker',
      'Sidekiq',
      'SFTP',
    ],
  },
  {
    label: 'Testing & Observability',
    skills: ['Cypress', 'TDD', 'Postman', 'Runscope', 'Honeybadger', 'Datadog'],
  },
  {
    label: 'APIs & Tools',
    skills: [
      'RESTful API design',
      'SOAP',
      'SAML SSO',
      'Comdata',
      'Corpay / NvoicePay',
      'Git & GitHub',
      'JIRA',
      'Agile / Scrum',
      'Figma',
    ],
  },
];

export interface SiteIdentity {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  phoneHref: string;
  linkedin: string;
  github: string;
}

export const identity: SiteIdentity = {
  name: 'Maung Htike',
  role: 'Payments Software Engineer → AI Platform Architect',
  tagline: 'Software Engineer · USMC veteran · San Bruno, CA',
  location: 'San Bruno, CA',
  email: 'maunghtikebusiness@gmail.com',
  phone: '(650) 278-9422',
  phoneHref: 'tel:+16502789422',
  linkedin: 'https://www.linkedin.com/in/maung-htike-482b4b143',
  github: 'https://github.com/Sfzmango',
};

export const professionalSummary =
  'Full-stack software engineer with nearly a decade of technical experience across fintech SaaS and AI-platform engineering. Built B2B payments infrastructure at Corpay (NYSE: CPAY), then designed a multi-agent AI orchestration system on Claude Code — adversarial evaluation loops, MCP tool integrations, zero-regression quality gates — to ship a production multi-tenant procure-to-pay platform end-to-end.';

export interface Education {
  title: string;
  org: string;
  year: string;
}

export const education: Education[] = [
  { title: 'Full Stack Development Bootcamp', org: 'UC Berkeley Extension', year: '2022' },
  { title: 'A.S.-T., Business Administration', org: 'Skyline College', year: '2022' },
  { title: 'Electro-Optics Ordnance Repairer (MOS 2171)', org: 'USMC Ordnance School', year: '2019' },
  {
    title: 'Software Developer to Architect · Workflow Automation with Generative AI · Scaling Generative AI',
    org: 'LinkedIn Learning',
    year: '2025',
  },
];
