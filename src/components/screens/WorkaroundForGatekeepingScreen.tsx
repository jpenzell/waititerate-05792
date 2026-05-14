import { Quote } from "lucide-react";
import { SlideShell } from "@/components/slide";
import { Card } from "@/components/ui/card";

/**
 * LD4.25 — Atcheson et al. (CHI 2025): students using GenAI as the
 * accommodation the institution never granted. Two student quotes + the
 * 25-of-62 headline statistic.
 */
export const WorkaroundForGatekeepingScreen = () => {
  return (
    <SlideShell tone="indigo" align="center" ariaLabel="AI is the workaround for gatekeeping">
      <div className="space-y-10">
        <header className="text-center space-y-4">
          <p className="text-lg md:text-xl font-mono uppercase tracking-[0.3em] text-muted-foreground">
            Chapter 04 · The accommodation that already happened
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight">
            AI is the workaround <span className="text-primary">for gatekeeping.</span>
          </h1>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 md:p-8 bg-card/70 border-l-8 border-l-primary/60">
            <Quote className="h-8 w-8 text-primary mb-3" aria-hidden="true" />
            <p className="text-xl md:text-2xl text-foreground leading-snug italic">
              "The bureaucracy of it all, versus with AI, it's just right there. There's no limitations, you don't have to go through paperwork… AI doesn't require documentation of a disability."
            </p>
            <p className="mt-4 text-sm md:text-base font-mono uppercase tracking-[0.25em] text-muted-foreground">
              — P10, Atcheson et al. 2025
            </p>
          </Card>
          <Card className="p-6 md:p-8 bg-card/70 border-l-8 border-l-accent/60">
            <Quote className="h-8 w-8 text-accent mb-3" aria-hidden="true" />
            <p className="text-xl md:text-2xl text-foreground leading-snug italic">
              "I have used ChatGPT to help me get accommodations through the university, and to communicate more directly and assertively with professors about my accommodations and needs."
            </p>
            <p className="mt-4 text-sm md:text-base font-mono uppercase tracking-[0.25em] text-muted-foreground">
              — P31, Atcheson et al. 2025
            </p>
          </Card>
        </div>
      </div>
    </SlideShell>
  );
};