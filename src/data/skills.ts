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
  'Software engineer with nearly a decade of hands-on experience spanning hardware and software — from electro-optical systems and reliability testing into full-stack and backend engineering. Spent ~3 years shipping production Ruby on Rails on Corpay\'s (NYSE: CPAY) B2B payments platform moving millions of dollars daily; now an architect and a founding engineer building a multi-tenant procure-to-pay platform end-to-end through a self-designed multi-agent AI workflow on Claude Code.';

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
