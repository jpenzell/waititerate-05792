import { Users2, TrendingUp, FileQuestion } from "lucide-react";
import { SlideShell, SlideTitle, StatBlock, PullQuote } from "@/components/slide";

export const YouGovSelfIDScreen = () => {
  return (
    <SlideShell tone="indigo" ariaLabel="YouGov self-identification data">
      <div className="space-y-10">
        <SlideTitle kicker="Chapter 01 · Outside the classroom">
          1 in 5 adults now says
          <br />
          <span className="text-primary">"I think differently."</span>
        </SlideTitle>

        <div className="grid md:grid-cols-3 gap-6">
          <StatBlock
            value="19%"
            label="of US adults self-identify as neurodivergent"
            note="YouGov national poll, 2023 — un-prompted, un-diagnosed"
            icon={Users2}
            accent="primary"
          />
          <StatBlock
            value="2×"
            label="growth in self-ID under 35"
            note="Younger cohorts identify at roughly double the rate of those over 55"
            icon={TrendingUp}
            accent="accent"
          />
          <StatBlock
            value="≠ Dx"
            label="self-identification ≠ diagnosis"
            note="Most will never get a clinical assessment. They still walk into your classroom."
            icon={FileQuestion}
            accent="destructive"
          />
        </div>

        <PullQuote variant="primary" attribution="YouGov 2023 · cross-referenced with Doyle 2020">
          The label is moving faster
          <br />
          <span className="text-primary">than the diagnosis system can.</span>
        </PullQuote>
      </div>
    </SlideShell>
  );
};