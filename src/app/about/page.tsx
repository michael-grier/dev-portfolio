import { PageShell } from "@/components/site/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/content/site";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="A pragmatic builder with product instincts"
      description="Background, working style, technical interests, and the kinds of problems that are a strong fit."
    >
      <Card className="max-w-3xl border-white/10 bg-white/[0.06] text-white backdrop-blur-xl">
        <CardContent className="grid gap-5 p-6 text-base leading-8 text-white/64">
          <p>
            {siteConfig.name} builds web software with attention to UX,
            maintainability, and the details that make tools feel dependable.
          </p>
          <p>
            The best work happens where product judgment and engineering
            quality meet: clear interfaces, measured tradeoffs, and systems
            that can keep improving after launch.
          </p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
