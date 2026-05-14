import { Quote } from "lucide-react";
import { SlideShell, SlideTitle, StatBlock, PullQuote } from "@/components/slide";
import { Card } from "@/components/ui/card";
import { FileX, MessageCircle, GraduationCap } from "lucide-react";

export const ShadowAccommodationScreen = () => {
  return (
    <SlideShell tone="indigo" ariaLabel="AI as shadow accommodation">
      <div className="space-y-10">
        <SlideTitle kicker="Chapter 06 · AI as accommodation">
          The shadow accommodation.
        </SlideTitle>

        <div className="grid md:grid-cols-3 gap-6">
          <StatBlock
            value="25 / 62"
            label="disabled students"
            note='said GenAI supports them "in important ways the university does not"'
            icon={GraduationCap}
            accent="primary"
          />
          <StatBlock
            value="13 / 39"
            label="with formal accommodations"
            note="say GenAI changed how they use at least one of those accommodations"
            icon={FileX}
            accent="accent"
          />
          <StatBlock
            value="44 / 62"
            label="reported impact"
            note="GenAI had at least a slight disability-related impact on their studies"
            icon={MessageCircle}
            accent="primary"
          />
        </div>

        <Card className="p-10 md:p-12 border-2 border-primary/30 bg-card/80 space-y-4">
          <Quote className="h-10 w-10 text-primary" aria-hidden="true" />
          <p className="text-2xl md:text-4xl font-semibold text-foreground leading-snug italic">
            "The bureaucracy of it all, versus with AI, it's just right there.
            There's no limitations, you don't have to go through paperwork…
            And also AI doesn't require documentation of a disability."
          </p>
          <p className="text-base md:text-lg font-mono uppercase tracking-[0.3em] text-muted-foreground">
            — P10 · Atcheson et al., CHI 2025
          </p>
        </Card>

        <PullQuote variant="soft">
          Students aren't waiting for permission.
          <br />
          <span className="text-primary">They're already accommodating themselves.</span>
        </PullQuote>
      </div>
    </SlideShell>
  );
};