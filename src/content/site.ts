// Types

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

// Site-wide: identity, navigation, and the links the footer and contact page share

export const siteConfig = {
  name: 'Michael Grier',
  role: 'Software developer',
  url: 'https://michaelgrier.dev',
  hero: {
    greeting: "Hi, I'm Michael.",
    subtitle: 'A software developer in Calgary.',
    intro:
      'I build polished user interfaces and full-stack applications, with a focus on usability, performance, maintainable architecture, and modern toolsets.',
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
    href: 'mailto:michael.c.grier@gmail.com',
    value: 'michael.c.grier@gmail.com',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/michael-grier',
    value: 'github.com/michael-grier',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/michael-c-grier/',
    value: 'linkedin.com/in/michael-c-grier',
    icon: 'linkedin',
  },
];

// Projects page

export const featuredProjects: Project[] = [
  {
    title: 'Fuckers Skateboards',
    tagline: 'Storefront for a local, independent skateboard brand. Next.js, Postgres, Stripe.',
    repo: 'https://github.com/michael-grier/fuckers-hq',
    summary: [
      "An e-commerce site for a small local skateboard brand with nobody on staff to manage it full-time, so correctness had to come from the design rather than from someone watching.",
      "Guest checkout runs through Stripe, but prices and stock are re-read from Postgres and reserved under row locks before a payment session exists, so the store can never oversell. Every checkout carries an idempotency key, so a retried request converges on the same reservation, and a cron worker recovers reservations whose Stripe session creation failed mid-flight.",
      "Orders exist only once Stripe's webhook confirms payment. Webhook events are stored exactly once and refund and dispute state is derived from them, so late or out-of-order events converge on the right answer. Confirmation emails go through a retrying outbox. An admin surface for products, orders, local delivery, and shipping rates keeps day-to-day running to a few screens.",
      'Tested with over 400 cases, including concurrency suites that run against a real Postgres instance and Playwright flows against test-mode Stripe and Clerk. CI runs audit, lint, typecheck, tests, and a full build on every PR, and production deploys only after migrations succeed against a verified database.',
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
      "A mobile app designed to help the Calgary skateboarding community find and share street spots.",
      "New and edited spots wait for review before they appear publicly. Review state lives apart from the spot itself so a contributor's edit can't overwrite a moderator's decision, removals accumulate strikes, and repeat problems lead to a contribution ban that keeps sign-in intact. Every moderation action is authorized server-side against a role claim, never trusted from the client.",
      "Photos are downscaled on-device before an authenticated upload records who owns them. Share links open the app when it's installed and fall back to a static web page when it isn't. Distance filtering is a client-side haversine over one reactive query, which is all a one-city dataset needs.",
      'Shipped to the App Store with a hand-authored privacy manifest, Sign in with Apple, and retry-safe account deletion. CI typechecks, lints, runs 177 backend and component tests, and verifies the iOS release configuration before every export.',
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
    tagline: 'Interview prep for full-stack TypeScript developers, in the browser.',
    repo: 'https://github.com/michael-grier/code-trainer',
    summary: [
      "60 lessons and over 240 problems across algorithms, runtime behaviour, the type system, React, backend TypeScript, and testing and production readiness.",
      "Code runs in a sandboxed iframe with no same-origin access, one Web Worker per run, and hard timeouts, so a runaway loop dies with its worker instead of hanging the page. Grading is deterministic where that is honest, including running the real TypeScript compiler in a worker for type problems and driving React components through scripted interactions, and structured self-review where it is not.",
      "Progress is kept in localStorage for guests and merged per-field into Convex once you sign in, so the backend stays limited to auth and progress and the learning runtime stays client-side. Every lesson ships with a test that runs its reference solution against its own cases, so the curriculum can't drift from the grader. Nearly 400 tests in total, with Playwright covering the sandbox across three browsers.",
    ],
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Monaco', 'Convex', 'Better Auth'],
    ink: 'ink',
  },
];

// About page, in the order the chapters appear

export const aboutIntro =
  'Five years of energy software, a teaching degree before that, and a skate scene that keeps handing me things to build.';

export const aboutPhoto = {
  alt: 'Michael doing a back smith grind on a concrete ledge under a bridge in Calgary',
  caption: 'Back smith, under a bridge somewhere in Calgary.',
};

export const aboutChapters = [
  {
    title: 'Work',
    body: 'I\'m a full-stack developer in Calgary. I spent five years at TransAlta, most of it co-leading a Next.js reporting platform that wind, hydro, solar, and gas teams use to see how their plants are running. That work ran the whole stack: dashboards analysts could build themselves, a review workflow for the data catalogue, single sign-on, and the Terraform and GitHub Actions pipelines that carried each release to production.',
  },
  {
    title: 'Before that',
    body: 'Before software, I taught. A Bachelor of Education is an unusual way into this work, but it\'s where I learned to explain things plainly, notice when someone is lost, and design for the person who wasn\'t in the room when a decision was made. That shows up in how I write interfaces, error states, and documentation.',
  },
  {
    title: 'Outside work',
    body: 'Outside work I build for the skate scene I\'m part of: a storefront for a local board brand, a spot map for the city, and a training app for the interviews I was preparing for. They\'re small products with real users, and each one has to run without a team behind it. Most of the engineering went into making the design hold up when nobody is watching.',
  },
];

export const aboutPrinciples = [
  {
    label: 'Correct by design',
    description:
      'Stock reserved before a payment session exists, orders that appear only once the webhook confirms, review state a contributor cannot overwrite. When nobody is watching, the design has to do the watching.',
  },
  {
    label: 'Sized to the problem',
    description:
      'A one-city map gets a client-side distance filter, not a geospatial service. The right amount of infrastructure is the least that keeps the product dependable.',
  },
  {
    label: 'Clear for the next person',
    description:
      'Comments explain why, docs explain how to run it, and the interface explains what to do next. The next reader is usually me in six months.',
  },
];

export const workingStyle = [
  'Clarify the user flow and success criteria before writing much code.',
  'Build the smallest useful version, then tighten edge cases and interaction quality.',
  'Test at real boundaries: a real database for concurrency, a real browser for checkout, a verified config before release.',
  'Ship small, reviewable changes, with CI running the whole suite on every pull request.',
];

// First draft, take another pass at it.
export const aboutPersonal =
  'I\'ve skated Calgary\'s streets and parks for most of my life, and I still get out most weeks. At home it\'s my wife and our kids, which is where the rest of the time goes.';

// Contact page

export const contactCopy = {
  intro: 'Direct lines, no forms.',
  looking:
    "I'm looking for a frontend or full-stack developer role, in Calgary or remote, on a team that ships and cares about what it ships. I do my best work on a dedicated team, with a real product, and enough ownership to get the details right.",
  expect:
    "Email is the fastest way to reach me and I reply within a day or two. If you're hiring, a link to the role and a line about the team is plenty to start. If you just want to talk shop, or you skate, that's welcome too.",
};
