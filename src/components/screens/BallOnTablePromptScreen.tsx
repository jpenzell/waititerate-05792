import { Eye } from "lucide-react";
import { SlideShell } from "@/components/slide";
import { Card } from "@/components/ui/card";

/**
 * LD1.02 — Opener step 1. Facilitator describes a ball on a table; audience
 * closes eyes and tries to picture it. Big, calm prompt slide — no inputs.
 */
export const BallOnTablePromptScreen = () => {
  return (
    <SlideShell tone="indigo" align="center" ariaLabel="Picture a ball on a table">
      <div className="space-y-12 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 rounded-full mx-auto">
          <Eye className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="text-sm md:text-base font-mono uppercase tracking-[0.3em] text-primary">
            Close your eyes
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-foreground leading-tight">
          Picture a <span className="text-primary">ball</span>
          <br />
          on a <span className="text-accent">table.</span>
        </h1>

        <Card className="max-w-4xl mx-auto p-8 md:p-10 bg-card/70 border-2 border-primary/20">
          <p className="text-2xl md:text-3xl text-foreground leading-snug">
            What color is it? <span className="text-muted-foreground">How big?</span>
            <br />
            What's the table made of? <span className="text-muted-foreground">Where is the light?</span>
          </p>
          <p className="mt-6 text-xl md:text-2xl text-primary font-semibold">
            Can you actually <em>see</em> it?
          </p>
        </Card>
      </div>
    </SlideShell>
  );
};