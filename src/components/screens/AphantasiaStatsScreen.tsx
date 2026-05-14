import { EyeOff, Eye, Brain } from "lucide-react";
import { SlideShell, StatBlock, PullQuote } from "@/components/slide";

/**
 * LD1.04 — Opener step 3. The statistics. ~4% aphantasia, ~3%
 * hyperphantasia. The take-home: people thought differently from each
 * other and didn't know it about themselves OR each other.
 */
export const AphantasiaStatsScreen = () => {
  return (
    <SlideShell tone="indigo" align="center" ariaLabel="How many people experience this differently">
      <div className="space-y-10">
        <header className="text-center space-y-4">
          <p className="text-sm md:text-base font-mono uppercase tracking-[0.3em] text-muted-foreground">
            And most of them never knew.
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
            We can't see inside <span className="text-primary">each other's minds.</span>
          </h1>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <StatBlock
            value="~4%"
            label="have aphantasia"
            note="No mind's eye at all. The ball was just the words 'ball on a table.'"
            icon={EyeOff}
            accent="primary"
          />
          <StatBlock
            value="~3%"
            label="have hyperphantasia"
            note="Mental images as vivid — or more vivid — than real seeing."
            icon={Eye}
            accent="accent"
          />
          <StatBlock
            value="Most"
            label="never realized"
            note="People assume their inner experience is the default — until a moment like this one."
            icon={Brain}
            accent="destructive"
          />
        </div>

        <PullQuote variant="primary" attribution="Aphantasia Network · Zeman et al. 2015 · Hollis Robbins">
          "For 39 years I couldn't see a red apple when I closed my eyes.
          <br />
          <span className="text-primary">Then ChatGPT could draw it.</span>"
        </PullQuote>
      </div>
    </SlideShell>
  );
};