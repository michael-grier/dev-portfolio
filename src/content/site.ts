export type NavItem = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  // One line under the title: what it is and the headline stack.
  tagline: string;
  repo: string;
  summary: string[];
  stack: string[];
  // Ink colour for the halftone placeholder until a screenshot exists.
  ink: 'blue' | 'pink' | 'ink';
  image?: { src: string; alt: string };
};

export type ContactLink = {
  label: string;
  href: string;
  value: string;
  // Links with an icon also appear in the footer.
  icon?: 'github' | 'linkedin';
};

export type ExperienceRole = {
  title: string;
  organization: string;
  period: string;
  summary: string;
  bullets: string[];
};

export const siteConfig = {
  name: 'Michael Grier',
  role: 'Software developer',
  url: 'https://michaelgrier.dev',
  hero: {
    greeting: "Hi, I'm Michael.",
    subtitle: 'Software developer in Calgary.',
    intro:
      'I build polished user interfaces and full-stack web applications, with a focus on usability, performance, and architecture that stays maintainable.',
  },
  location: 'Calgary',
  availability: 'Open to new roles',
};

export const heroHeadline = `${siteConfig.hero.greeting} ${siteConfig.hero.subtitle}`;

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];

export const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    href: 'mailto:hello@example.com',
    value: 'hello@example.com',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/michael-grier',
    value: 'github.com/michael-grier',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/example',
    value: 'linkedin.com/in/example',
    icon: 'linkedin',
  },
];

export const skillGroups = [
  {
    label: 'Frontend',
    skills: ['React', 'Next.js', 'Vite', 'TypeScript', 'Material UI', 'shadcn/ui'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'Bun', 'API design', 'full-stack architecture'],
  },
  {
    label: 'Data & auth',
    skills: ['PostgreSQL', 'Databricks', 'Clerk', 'Neon', 'Drizzle', 'Zod', 'Convex'],
  },
];

export const resumeSummary = [
  'Product-minded software developer focused on polished React interfaces, typed application architecture, and dependable delivery habits.',
  'Strong fit for teams that need someone comfortable moving between UI details, data flow, API contracts, and pragmatic shipping tradeoffs.',
];

export const experienceRoles: ExperienceRole[] = [
  {
    title: 'Software Developer',
    organization: 'Independent projects',
    period: '2025 - Present',
    summary:
      'Building portfolio-ready full-stack web projects with modern React, Next.js, typed APIs, and deployment-focused delivery practices.',
    bullets: [
      'Designed reusable interface patterns for dashboards, content-heavy pages, and workflow tools.',
      'Implemented responsive layouts, animation systems, and component states across mobile and desktop breakpoints.',
      'Documented technical decisions and project scope so future iterations stay easy to reason about.',
    ],
  },
  {
    title: 'Full-stack project work',
    organization: 'Recent builds',
    period: '2024 - 2025',
    summary:
      'Delivered practical application features across frontend, backend, data modeling, auth flows, and production-readiness checks.',
    bullets: [
      'Connected UI flows to typed data models and API boundaries with clear validation paths.',
      'Improved product usability through tighter hierarchy, loading states, empty states, and error handling.',
      'Used linting, build verification, and focused manual QA to reduce regressions before release.',
    ],
  },
];

export const educationItems = [
  {
    label: 'Core focus',
    value: 'Frontend systems, full-stack foundations, product engineering',
  },
  {
    label: 'Current stack',
    value: 'Next.js, React, TypeScript, Tailwind CSS, Node.js',
  },
  {
    label: 'Working habits',
    value: 'Small commits, clear scope, accessible interfaces, build verification',
  },
];

export const featuredProjects: Project[] = [
  {
    title: 'Fuckers HQ',
    tagline: 'Storefront for independently sold skate goods. Next.js, Postgres, Stripe.',
    repo: 'https://github.com/michael-grier/fuckers-hq',
    summary: [
      "A small shop that has to be trustworthy without a team behind it. Guest checkout runs through Stripe, but prices and stock are re-read from Postgres and reserved atomically before a payment session exists, so the store can never oversell. Orders are only created when Stripe's webhook confirms payment.",
      'Refunds, disputes, local delivery, and confirmation emails each have durable state that can be retried, and an admin surface for products, orders, and shipping rates keeps day-to-day running to a few screens.',
    ],
    stack: [
      'Next.js',
      'Neon Postgres',
      'Drizzle',
      'Stripe Checkout and Tax',
      'Clerk',
      'Cloudflare R2',
      'Resend',
      'Sentry',
    ],
    ink: 'blue',
  },
  {
    title: 'YYC Skate Spots',
    tagline: 'Street spot book for Calgary. iOS and Android.',
    repo: 'https://github.com/michael-grier/yyc-skate-spots',
    summary: [
      'A map of skate spots in the city, added by the people who skate them. Anyone can contribute a spot with photos and a location; new and edited spots wait for review before they appear publicly, and repeat problems lead to a contribution ban, so the map stays useful without a full-time moderator.',
      "Spots have share links that open the app when it's installed and fall back to a web page when it isn't. Distance filtering is a client-side haversine over one reactive query, which is all a one-city dataset needs.",
    ],
    stack: [
      'Expo',
      'React Native',
      'Expo Router',
      'Convex',
      'Clerk',
      'Google Maps',
      'EAS',
      'Cloudflare Pages',
    ],
    ink: 'pink',
  },
  {
    title: 'Code Trainer',
    tagline: 'Interview prep for full-stack TypeScript engineers, in the browser.',
    repo: 'https://github.com/michael-grier/code-trainer',
    summary: [
      'A track-based curriculum of short lessons with practice attached to every one: algorithms, runtime behaviour, the type system, React, backend TypeScript, and production readiness. Code runs and is graded in the browser, deterministically where that is honest and through structured self-review where it is not.',
      'Progress is kept in localStorage for guests and synced through Convex once you sign in, so the backend stays limited to auth and progress and the learning runtime stays client-side.',
    ],
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Monaco', 'Convex', 'Clerk'],
    ink: 'ink',
  },
];

export const aboutPrinciples = [
  {
    label: 'Product clarity',
    description:
      'Whether an interface helps someone make the next decision quickly, not just whether it looks finished.',
  },
  {
    label: 'Maintainable pace',
    description:
      'Small, verifiable changes with clear ownership over clever code that gets expensive to revisit.',
  },
  {
    label: 'Practical polish',
    description:
      'Motion, spacing, copy, and state design matter when they make a product easier to trust.',
  },
];

export const workingStyle = [
  'Clarify the user flow and success criteria before writing much code.',
  'Build the smallest useful version, then tighten edge cases and interaction quality.',
  'Keep implementation visible through readable code, typed contracts, and focused verification.',
  'Commit at meaningful checkpoints so the work stays reviewable.',
];
