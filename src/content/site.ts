import type { StaticImageData } from 'next/image';

import homepage from '@/assets/projects/fuckers-hq/homepage.webp';
import shop from '@/assets/projects/fuckers-hq/shop.webp';
import cart from '@/assets/projects/fuckers-hq/cart.webp';
import products from '@/assets/projects/fuckers-hq/products.webp';
import editor from '@/assets/projects/fuckers-hq/editor.webp';
import checkout from '@/assets/projects/fuckers-hq/checkout.webp';
import order from '@/assets/projects/fuckers-hq/order.webp';
import spotMap from '@/assets/projects/yyc-skate-spots/map.webp';
import spotDetails from '@/assets/projects/yyc-skate-spots/spot-details.webp';
import spotFilters from '@/assets/projects/yyc-skate-spots/filters.webp';
import addSpot from '@/assets/projects/yyc-skate-spots/add-spot.webp';
import pendingReview from '@/assets/projects/yyc-skate-spots/pending-review.webp';
import profile from '@/assets/projects/yyc-skate-spots/profile.webp';
import signIn from '@/assets/projects/yyc-skate-spots/sign-in.webp';
import curriculum from '@/assets/projects/code-trainer/curriculum.webp';
import lesson from '@/assets/projects/code-trainer/lesson.webp';
import codeProblem from '@/assets/projects/code-trainer/code-problem.webp';
import refactorChecks from '@/assets/projects/code-trainer/refactor-checks.webp';
import writtenReview from '@/assets/projects/code-trainer/written-review.webp';
import trainerSignIn from '@/assets/projects/code-trainer/sign-in.webp';

// Types

export type ProjectImage = {
  src: StaticImageData;
  alt: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  // One line under the title: what it is and the headline stack.
  tagline: string;
  repo: string;
  // Each entry is one labelled row of the case study, in reading order.
  summary: { label: string; body: string }[];
  stack: string[];
  // Ink colour for the halftone placeholder until a screenshot exists.
  ink: 'blue' | 'pink' | 'ink';
  images?: ProjectImage[];
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
      {
        label: 'Context',
        body: "An e-commerce site for a small local skateboard brand with nobody on staff to manage it full-time. Correctness and reliability have to be built into the design rather than ensured by human oversight.",
      },
      {
        label: 'Checkout',
        body: "Guest checkout runs through Stripe, but prices and stock are re-read from Postgres and reserved under row locks before a payment session exists, so the store can never oversell. Every checkout carries an idempotency key, so a retried request converges on the same reservation, and a cron worker recovers reservations whose Stripe session creation failed mid-flight.",
      },
      {
        label: 'Orders and admin',
        body: "Orders exist only once Stripe's webhook confirms payment. Webhook events are stored exactly once and refund and dispute state is derived from them, so late or out-of-order events converge on the right answer. Confirmation emails go through a retrying outbox. An admin surface for products, orders, local delivery, and shipping rates keeps day-to-day running to a few screens.",
      },
      {
        label: 'Verified',
        body: 'Tested with over 400 cases, including concurrency suites that run against a real Postgres instance and Playwright flows against test-mode Stripe and Clerk. CI runs audit, lint, typecheck, tests, and a full build on every PR, and production deploys only after migrations succeed against a verified database.',
      },
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
    images: [
      { src: homepage, alt: 'Fuckers Skateboards homepage with a skate video hero and links to the shop and videos.' },
      { src: shop, alt: 'Shop catalog with product photos, prices, search, sorting, and filters.' },
      { src: cart, alt: 'Shopping cart drawer with size selections, quantity controls, and shipping or local delivery options.' },
      { src: checkout, alt: 'Stripe Checkout for a two-item order, with shipping details, tax, and card or Link payment.' },
      { src: order, alt: 'Order detail in the admin with a refunded status, shipping record, totals, and the confirmation email log.' },
      { src: products, alt: 'Product admin showing the catalog, publishing status, and stock warnings.' },
      { src: editor, alt: 'Product editor with details, publishing controls, inventory totals, and photo management.' },
    ],
  },
  {
    title: 'YYC Skate Spots',
    tagline: 'Street spot book for Calgary. iOS app (coming soon to Android).',
    repo: 'https://github.com/michael-grier/yyc-skate-spots',
    summary: [
      {
        label: 'Context',
        body: "A mobile app designed to help the Calgary skateboarding community find and share street spots.",
      },
      {
        label: 'Moderation',
        body: "New and edited spots wait for review before they appear publicly. Review state lives apart from the spot itself so a contributor's edit can't overwrite a moderator's decision, removals accumulate strikes, and repeat problems lead to a contribution ban that keeps sign-in intact. Every moderation action is authorized server-side against a role claim, never trusted from the client.",
      },
      {
        label: 'Photos and sharing',
        body: "Photos are downscaled on-device before an authenticated upload records who owns them. Share links open the app when it's installed and fall back to a static web page when it isn't. Distance filtering is a client-side haversine over one reactive query, which is all a one-city dataset needs.",
      },
      {
        label: 'Shipped',
        body: 'Shipped to the App Store with a hand-authored privacy manifest, Sign in with Apple, and retry-safe account deletion. CI typechecks, lints, runs 177 backend and component tests, and verifies the iOS release configuration before every export.',
      },
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
    images: [
      { src: spotMap, alt: 'Calgary skate spot map with location pins, search, filters, and a selected spot preview.' },
      { src: spotDetails, alt: 'Chinatown 12 Stair details with a spot photo, skating features, sharing, and directions.' },
      { src: spotFilters, alt: 'Map filters for distance, spot type, and bust factor, showing 14 matching spots.' },
      { src: profile, alt: 'Profile screen with the moderation review queue, favourites, and the spots you have added.' },
      { src: pendingReview, alt: 'The Bridge DIY spot submission with a photo and a waiting for review status.' },
      { src: addSpot, alt: 'Adding a skate spot by placing its location on the map after uploading photos.' },
      { src: signIn, alt: 'Sign-in screen with Continue with Apple, Continue with Google, and email options.' },
    ],
  },
  {
    title: 'Code Trainer',
    tagline: 'Interview prep for full-stack TypeScript developers, in the browser.',
    repo: 'https://github.com/michael-grier/code-trainer',
    summary: [
      {
        label: 'Context',
        body: "60 lessons and over 240 problems across algorithms, runtime behaviour, the type system, React, backend TypeScript, and testing and production readiness.",
      },
      {
        label: 'Runtime and grading',
        body: "Code runs in a sandboxed iframe with no same-origin access, one Web Worker per run, and hard timeouts, so a runaway loop dies with its worker instead of hanging the page. Grading is deterministic where that is honest, including running the real TypeScript compiler in a worker for type problems and driving React components through scripted interactions, and structured self-review where it is not.",
      },
      {
        label: 'Progress and verification',
        body: "Progress is kept in localStorage for guests and merged per-field into Convex once you sign in, so the backend stays limited to auth and progress and the learning runtime stays client-side. Every lesson ships with a test that runs its reference solution against its own cases, so the curriculum can't drift from the grader. Nearly 400 tests in total, with Playwright covering the sandbox across three browsers.",
      },
    ],
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Monaco', 'Convex', 'Better Auth'],
    ink: 'ink',
    images: [
      { src: curriculum, alt: 'Dashboard with the next lesson queued, the curriculum listed by track, and progress synced to a GitHub account.' },
      { src: lesson, alt: 'A lesson on narrowing, unions, and discriminated unions, with a worked example, compiler output, and its practice problems.' },
      { src: codeProblem, alt: 'A coding problem with the prompt, sample input and output, the solution editor, and a results panel.' },
      { src: refactorChecks, alt: 'A refactor problem with failing static checks, the refactor goals, and the code to change.' },
      { src: writtenReview, alt: 'A written problem with an answer box, a hidden reference answer, and a rubric to review against.' },
      { src: trainerSignIn, alt: 'Sign-in dialog offering to connect GitHub so progress follows you, or to keep learning locally.' },
    ],
  },
];

// About page, in the order the chapters appear

export const aboutIntro =
  'Five years building production web applications, a first career as an educator, and a lifetime in Calgary\'s skateboard scene.';

export const aboutPhoto = {
  alt: 'Michael doing a back smith grind on a concrete ledge under a bridge in Calgary',
  caption: 'Back smith under the bridge in Sunnyside.',
};

export const aboutChapters = [
  {
    title: 'Work',
    body: 'I\'m a full-stack developer in Calgary. I spent five years at TransAlta, most of it as one of two developers on a Next.js data visualization platform that the wind, hydro, solar, and gas teams use to monitor how their plants are running. I wrote the majority of the code and had a lot of latitude in how it was architected, working from requirements set by a senior engineer and our manager.',
  },
  {
    title: 'Before that',
    body: 'Before software, I was a school teacher, teaching everything from early education to high school English. A Bachelor of Education is an unusual way into this work, but it\'s where I learned to explain things plainly, notice when someone is lost, and design for the person who wasn\'t in the room when a decision was made. That shows up in how I design user interfaces, write documentation, and handle error states.',
  },
  {
    title: 'Outside work',
    body: 'Outside work I build for the communities that I\'m part of: a storefront for a local skateboard brand, a map for skaters to document and share skate spots, and a training app for TypeScript developers (like me). The storefront and the map are live, with real users and no team behind them, so most of the engineering went into making them dependable without relying on my constant oversight. The training app is a work in progress, with every lesson written and the runtime built.',
  },
];

export const aboutPrinciples = [
  {
    label: 'Correct by design',
    description:
      'Stock reserved before a payment session exists, orders that appear only once the webhook confirms, review state a contributor cannot overwrite. If it only works when someone is there to manage it, it doesn\'t work properly.',
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
  'Clarify the user flow and success criteria before building.',
  'Build the smallest useful version, then tighten edge cases and interaction quality.',
  'Test at real boundaries: a real database for concurrency, a real browser for checkout, a verified config before release.',
  'Ship small, reviewable changes, with CI running the whole suite on every pull request.',
];

export const aboutPersonal =
  'I\'ve skated Calgary\'s streets and parks for most of my life, and I still get out most weeks. The rest of my time is spent with my wife and two young children, who continue to inspire me in everything I do.';

// Contact page

export const contactCopy = {
  intro: 'If something on this site resonates, I\'d love to hear from you.',
  looking:
    "I'm looking for a frontend or full-stack developer role, in Calgary or remote, on a team that is motivated and passionate about the product that they are building, and about the people that they are building it with.",
  expect:
    "Email is the fastest way to reach me, and I will strive to respond to every email within a day or two. If you're hiring and think I would be a good fit, please feel free to reach out. If you just want to talk shop (or catch a skate session), that would be awesome too!",
};
