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
};

export type ContactLink = {
  label: string;
  href: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
};

export const siteConfig = {
  name: "Michael Grier",
  role: "Software Developer",
  headline: "I build sharp, resilient web products with full-stack care.",
  shortIntro:
    "A portfolio for recent software projects, resume details, and practical ways to get in touch.",
  location: "Canada",
  availability: "Open to software development opportunities",
};

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

export const featuredProjects: Project[] = [
  {
    title: "Project Alpha",
    summary:
      "A full-stack product interface focused on fast workflows, clear information hierarchy, and dependable interactions.",
    year: "2026",
    stack: ["Next.js", "React", "TypeScript"],
    status: "Case study",
  },
  {
    title: "Project Beacon",
    summary:
      "A developer-facing tool with polished dashboard surfaces, typed data flows, and deployment-ready architecture.",
    year: "2026",
    stack: ["Node.js", "PostgreSQL", "Tailwind"],
    status: "In progress",
  },
  {
    title: "Project Current",
    summary:
      "A responsive web experience combining media-rich project storytelling with pragmatic engineering details.",
    year: "2025",
    stack: ["React", "Motion", "Vercel"],
    status: "Live",
  },
];
