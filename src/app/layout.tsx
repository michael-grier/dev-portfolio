import type { Metadata } from "next";
import { Familjen_Grotesk } from "next/font/google";

import { SiteNavigation } from "@/components/site/site-navigation";
import { SiteFooter } from "@/components/site/site-footer";
import { siteConfig } from "@/content/site";
import "./globals.css";

const familjen = Familjen_Grotesk({
  variable: "--font-familjen",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "A software developer portfolio featuring selected projects, resume details, and contact information.",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  keywords: [
    "Michael Grier",
    "software developer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "portfolio",
  ],
  openGraph: {
    type: "website",
    url: "/",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description:
      "Selected projects, resume details, and contact information for software developer Michael Grier.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description:
      "Selected projects, resume details, and contact information for software developer Michael Grier.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${familjen.variable} h-full antialiased`}>
      <body className="min-h-full overflow-x-hidden bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[100] bg-ink px-4 py-2 text-sm font-medium text-paper outline-none focus:not-sr-only focus:ring-2 focus:ring-blue"
        >
          Skip to content
        </a>
        <SiteNavigation />
        <main
          id="main-content"
          tabIndex={-1}
          className="relative flex min-h-screen flex-col outline-none"
        >
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
