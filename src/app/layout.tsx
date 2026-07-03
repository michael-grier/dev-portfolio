import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteNavigation } from "@/components/site/site-navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Michael Grier | Software Developer",
    template: "%s | Michael Grier",
  },
  description:
    "A software developer portfolio featuring selected projects, resume details, and contact information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-background text-foreground">
        <SiteNavigation />
        <main className="relative flex min-h-screen flex-col">{children}</main>
      </body>
    </html>
  );
}
