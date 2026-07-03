import {
  BriefcaseBusiness,
  Code2,
  FileText,
  Home,
  Mail,
  MessageCircle,
  Network,
  UserRound,
} from "lucide-react";
import type { ComponentType } from "react";

export type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export type Project = {
  title: string;
  summary: string;
  year: string;
  stack: string[];
  status: "Live" | "Case study" | "In progress";
  role: string;
  problem: string;
  contribution: string;
  result: string;
  media: "interface" | "systems" | "delivery";
};

export type ContactLink = {
  label: string;
  href: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
};

export type ExperienceRole = {
  title: string;
  organization: string;
  period: string;
  summary: string;
  bullets: string[];
};

export const siteConfig = {
  name: "Michael Grier",
  role: "Software Developer",
  url: "https://michaelgrier.dev",
  headline: "I build sharp, resilient web products with full-stack care.",
  shortIntro:
    "A portfolio for recent software projects, resume details, and practical ways to get in touch.",
  location: "Canada",
  availability: "Open to software development opportunities",
};

export const heroLines = [
  "I build sharp,",
  "resilient web products",
  "with full-stack care.",
];

export const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Resume", href: "/resume", icon: FileText },
  { label: "Projects", href: "/projects", icon: BriefcaseBusiness },
  { label: "About", href: "/about", icon: UserRound },
  { label: "Contact", href: "/contact", icon: MessageCircle },
];

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:hello@example.com",
    value: "hello@example.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    href: "https://github.com/michael-grier",
    value: "github.com/michael-grier",
    icon: Code2,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/example",
    value: "linkedin.com/in/example",
    icon: Network,
  },
];

export const skillGroups = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "API design", "Databases", "Auth"],
  },
  {
    label: "Delivery",
    skills: ["Testing", "Accessibility", "Performance", "Product thinking"],
  },
];

export const resumeSummary = [
  "Product-minded software developer focused on polished React interfaces, typed application architecture, and dependable delivery habits.",
  "Strong fit for teams that need someone comfortable moving between UI details, data flow, API contracts, and pragmatic shipping tradeoffs.",
];

export const resumeHighlights = [
  "Builds responsive product surfaces with attention to accessibility, information hierarchy, and motion that supports the workflow.",
  "Uses TypeScript, component boundaries, and clear data contracts to keep fast-moving codebases maintainable.",
  "Turns ambiguous feature requests into scoped implementation plans, testable milestones, and useful shipped increments.",
];

export const experienceRoles: ExperienceRole[] = [
  {
    title: "Software Developer",
    organization: "Independent projects",
    period: "2025 - Present",
    summary:
      "Building portfolio-ready full-stack web projects with modern React, Next.js, typed APIs, and deployment-focused delivery practices.",
    bullets: [
      "Designed reusable interface patterns for dashboards, content-heavy pages, and workflow tools.",
      "Implemented responsive layouts, animation systems, and component states across mobile and desktop breakpoints.",
      "Documented technical decisions and project scope so future iterations stay easy to reason about.",
    ],
  },
  {
    title: "Full-stack project work",
    organization: "Recent builds",
    period: "2024 - 2025",
    summary:
      "Delivered practical application features across frontend, backend, data modeling, auth flows, and production-readiness checks.",
    bullets: [
      "Connected UI flows to typed data models and API boundaries with clear validation paths.",
      "Improved product usability through tighter hierarchy, loading states, empty states, and error handling.",
      "Used linting, build verification, and focused manual QA to reduce regressions before release.",
    ],
  },
];

export const educationItems = [
  {
    label: "Core focus",
    value: "Frontend systems, full-stack foundations, product engineering",
  },
  {
    label: "Current stack",
    value: "Next.js, React, TypeScript, Tailwind CSS, Node.js",
  },
  {
    label: "Working habits",
    value: "Small commits, clear scope, accessible interfaces, build verification",
  },
];

export const featuredProjects: Project[] = [
  {
    title: "Project Alpha",
    summary:
      "A full-stack product interface focused on fast workflows, clear information hierarchy, and dependable interactions.",
    year: "2026",
    stack: ["Next.js", "React", "TypeScript"],
    status: "Case study",
    role: "Product UI / frontend architecture",
    problem:
      "Operational workflows needed a calmer interface that made status, priority, and next actions easier to scan.",
    contribution:
      "Designed the page structure, reusable components, responsive states, and typed data boundaries for the primary user flow.",
    result:
      "A faster-feeling product surface with clearer hierarchy, fewer ambiguous states, and room for future workflow depth.",
    media: "interface",
  },
  {
    title: "Project Beacon",
    summary:
      "A developer-facing tool with polished dashboard surfaces, typed data flows, and deployment-ready architecture.",
    year: "2026",
    stack: ["Node.js", "PostgreSQL", "Tailwind"],
    status: "In progress",
    role: "Full-stack implementation",
    problem:
      "Developers needed a compact view of system health, integration status, and follow-up work without noisy dashboard chrome.",
    contribution:
      "Modeled the data flow, shaped the dashboard UI, and mapped the interaction states for empty, loading, and review moments.",
    result:
      "A focused technical tool direction with practical implementation boundaries and a cleaner path to production hardening.",
    media: "systems",
  },
  {
    title: "Project Current",
    summary:
      "A responsive web experience combining media-rich project storytelling with pragmatic engineering details.",
    year: "2025",
    stack: ["React", "Motion", "Vercel"],
    status: "Live",
    role: "Interface engineering / motion",
    problem:
      "Project work needed to feel inspectable and credible while still carrying enough visual energy to be memorable.",
    contribution:
      "Built responsive media sections, restrained motion, content structure, and reusable presentation patterns.",
    result:
      "A portfolio-ready project page pattern that balances visual polish with concrete implementation context.",
    media: "delivery",
  },
];

export const aboutPrinciples = [
  {
    label: "Product clarity",
    description:
      "I care about whether an interface helps someone make the next decision quickly, not just whether it looks finished.",
  },
  {
    label: "Maintainable pace",
    description:
      "I prefer small, verifiable changes with clear ownership boundaries over clever code that becomes expensive to revisit.",
  },
  {
    label: "Practical polish",
    description:
      "Motion, spacing, copy, and state design all matter when they make the product easier to trust and easier to use.",
  },
];

export const workingStyle = [
  "Clarify the user flow and success criteria before writing much code.",
  "Build the smallest useful version, then tighten edge cases and interaction quality.",
  "Keep implementation details visible through readable code, typed contracts, and focused verification.",
  "Commit regularly at meaningful checkpoints so the work stays reviewable.",
];
