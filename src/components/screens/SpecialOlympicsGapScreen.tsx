import { Users, Lightbulb, AlertTriangle } from "lucide-react";
import { SlideShell, StatBlock, PullQuote } from "@/components/slide";

/**
 * LD6.75 — Special Olympics / Stratalys 2024 survey. Pairs naturally with
 * the Co-Design slide before it. Closes with Tim Shriver / Nathan Cook.
 */
export const SpecialOlympicsGapScreen = () => {
  return (
    <SlideShell tone="emerald" align="center" ariaLabel="Special Olympics — the inclusion gap in AI">
      <div className="space-y-10">
        <header className="text-center space-y-4">
          <p className="text-lg md:text-xl font-mono uppercase tracking-[0.3em] text-muted-foreground">
            Stratalys × Special Olympics 2024 · 500 parents · 200 K-12 educators
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
            They believe in it. <span className="text-primary">They don't believe it's being built for them.</span>
          </h1>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <StatBlock
            value="77%"
            label="parents see AI as a mechanism for inclusion"
            note="Parents of children with intellectual and developmental disabilities."
            icon={Lightbulb}
            accent="accent"
          />
          <StatBlock
            value="64%"
            label="educators agree"
            note="K-12 teachers working with students with IDD."
            icon={Users}
            accent="primary"
          />
          <StatBlock
            value="35%"
            label="believe developers actually account for IDD students"
            note="The gap between belief in the promise and belief in the product."
            icon={AlertTriangle}
            accent="destructive"
          />
        </div>

        <PullQuote variant="primary" attribution="Tim Shriver · Nathan Cook (SOI CIO) · Special Olympics Inclusion Academy">
          "AI has an ableism problem."
          <br />
          <span className="text-primary">Nothing about us, without us.</span>
        </PullQuote>
      </div>
    </SlideShell>
  );
};