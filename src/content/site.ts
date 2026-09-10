import type { StaticImageData } from 'next/image';

import homepage from '@/assets/projects/fuckers-hq/homepage.webp';
import shop from '@/assets/projects/fuckers-hq/shop.webp';
import cart from '@/assets/projects/fuckers-hq/cart.webp';
import products from '@/assets/projects/fuckers-hq/products.webp';
import editor from '@/assets/projects/fuckers-hq/editor.webp';
import spotMap from '@/assets/projects/yyc-skate-spots/map.webp';
import spotDetails from '@/assets/projects/yyc-skate-spots/spot-details.webp';
import spotFilters from '@/assets/projects/yyc-skate-spots/filters.webp';
import addSpot from '@/assets/projects/yyc-skate-spots/add-spot.webp';
import pendingReview from '@/assets/projects/yyc-skate-spots/pending-review.webp';

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
  summary: string[];
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

export const featuredProjects: Project[] = [
  {
    title: 'Fuckers Skateboards',
    tagline: 'Storefront for independently sold skateboard goods. Next.js, Postgres, Stripe.',
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
    images: [
      { src: homepage, alt: 'Fuckers Skateboards homepage with a skate video hero and links to the shop and videos.' },
      { src: shop, alt: 'Shop catalog with product photos, prices, search, sorting, and filters.' },
      { src: cart, alt: 'Shopping cart drawer with size selections, quantity controls, and shipping or local delivery options.' },
      { src: products, alt: 'Product admin showing the catalog, publishing status, and stock warnings.' },
      { src: editor, alt: 'Product editor with details, publishing controls, inventory totals, and photo management.' },
    ],
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
    images: [
      { src: spotMap, alt: 'Calgary skate spot map with location pins, search, filters, and a selected spot preview.' },
      { src: spotDetails, alt: 'Chinatown 12 Stair details with a spot photo, skating features, sharing, and directions.' },
      { src: spotFilters, alt: 'Map filters for distance, spot type, and bust factor, showing 14 matching spots.' },
      { src: addSpot, alt: 'Adding a skate spot by placing its location on the map after uploading photos.' },
      { src: pendingReview, alt: 'The Bridge DIY spot submission with a photo and a waiting for review status.' },
    ],
  },
  {
    title: 'Code Trainer',
    tagline: 'Interview prep for full-stack TypeScript engineers, in the browser.',
    repo: 'https://github.com/michael-grier/code-trainer',
    summary: [
      'A track-based curriculum of short lessons with practice attached to every one: algorithms, runtime behaviour, the type system, React, backend TypeScript, and production readiness. Code runs and is graded in the browser, deterministically where that is honest and through structured self-review where it is not.',
      'Progress is kept in localStorage for guests and synced through Convex once you sign in, so the backend stays limited to auth and progress and the learning runtime stays client-side.',
    ],
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Monaco', 'Convex', 'Better Auth'],
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
