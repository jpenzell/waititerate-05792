import { Scale, Eye, Flame } from "lucide-react";
import { SlideShell, TwoColumnContrast, PullQuote } from "@/components/slide";

export const InjusticeSensitivityScreen = () => {
  return (
    <SlideShell tone="rose" align="center" ariaLabel="Injustice sensitivity">
      <div className="space-y-10">
        <header className="text-center space-y-4">
          <p className="text-sm md:text-base font-mono uppercase tracking-[0.3em] text-muted-foreground">
            Chapter 04 · Inside the mind
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight">
            Injustice Sensitivity
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-snug">
            A heightened, often physical response to perceived <strong className="text-foreground">unfairness</strong> —
            common across autistic and ADHD profiles.
          </p>
        </header>

        <TwoColumnContrast
          left={{
            label: "What it looks like",
            icon: Eye,
            tone: "negative",
            items: [
              "\"Overreacting\" to a grading dispute",
              "Refusing to budge on a policy that feels arbitrary",
              "Derailed by a teammate not pulling weight",
              "Walking out, withdrawing, or going silent",
            ],
          }}
          right={{
            label: "What's actually happening",
            icon: Scale,
            tone: "positive",
            items: [
              "A moral signal firing as loud as a fire alarm",
              "Brain refusing to file unfairness as \"fine\"",
              "Same wiring that fuels whistleblowers and reformers",
              "Not defiance — a values system asking to be heard",
            ],
          }}
        />

        <PullQuote variant="soft">
          When the rules feel unfair, learning stops.
          <br />
          <span className="text-primary">Transparency is an accommodation.</span>
        </PullQuote>
      </div>
    </SlideShell>
  );
};