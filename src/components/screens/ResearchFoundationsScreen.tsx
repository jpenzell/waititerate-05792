import { Card } from "@/components/ui/card";
import { BookOpen, Users, Brain, Sparkles } from "lucide-react";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";
import { SlideShell, SlideTitle, PullQuote } from "@/components/slide";

export const ResearchFoundationsScreen = () => {
  useRegisterReveals(5);

  const researchAreas = [
    {
      icon: Brain,
      title: "Neurodiversity Research",
      finding: "Cognitive differences aren't deficits—they're natural human variation that drives innovation",
    },
    {
      icon: BookOpen,
      title: "Universal Design for Learning",
      finding: "Design for variation from the start—not retrofitted accommodations",
    },
    {
      icon: Users,
      title: "Cognitive Load & Accessibility",
      finding: "Working memory is limited—reduce cognitive barriers for everyone",
    },
    {
      icon: Sparkles,
      title: "AI & Learning Design",
      finding: "AI can personalize at scale—but only if we design for cognitive diversity first",
    }
  ];

  return (
    <SlideShell tone="indigo" ariaLabel="Research foundations">
      <div className="space-y-12">
        <SlideTitle kicker="Decades of peer-reviewed research">
          The science is settled.
        </SlideTitle>
        <div className="grid md:grid-cols-2 gap-6">
          {researchAreas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <Reveal key={area.title} step={idx + 1}>
                <Card className="p-8 border-l-8 border-l-primary h-full bg-card/80 space-y-4">
                  <div className="flex items-center gap-4">
                    <Icon className="h-10 w-10 text-primary flex-shrink-0" aria-hidden="true" />
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">{area.title}</h3>
                  </div>
                  <p className="text-xl md:text-2xl text-foreground/85 leading-snug">
                    {area.finding}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
        <Reveal step={5}>
          <PullQuote>
            Design for cognitive <span className="text-primary">diversity</span>,
            <br />
            not cognitive uniformity.
          </PullQuote>
        </Reveal>
        <p className="text-center text-sm md:text-base font-mono uppercase tracking-[0.3em] text-muted-foreground">
          Citations in the faculty one-pager
        </p>
      </div>
    </SlideShell>
  );
};
