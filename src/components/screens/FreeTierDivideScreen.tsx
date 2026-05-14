import { DollarSign, Wifi, Building2 } from "lucide-react";
import { SlideShell, SlideTitle, StatBlock, PullQuote } from "@/components/slide";

export const FreeTierDivideScreen = () => {
  return (
    <SlideShell tone="emerald" ariaLabel="The free-tier divide">
      <div className="space-y-10">
        <SlideTitle kicker="Chapter 07 · Equity & retention">
          The new digital divide
          <br />
          <span className="text-primary">runs through the paywall.</span>
        </SlideTitle>

        <div className="grid md:grid-cols-3 gap-6">
          <StatBlock
            value="91%"
            label="of disabled students"
            note="locked into free tiers of GenAI tools (Zhao et al., UK 2025)"
            icon={DollarSign}
            accent="destructive"
          />
          <StatBlock
            value="77%"
            label="already using GenAI"
            note="for summarizing readings, structuring ideas, overcoming blocks"
            icon={Wifi}
            accent="primary"
          />
          <StatBlock
            value="$240/yr"
            label="vs. institutional license"
            note="What a working community-college student pays for the same tier faculty get free"
            icon={Building2}
            accent="accent"
          />
        </div>

        <PullQuote variant="primary" attribution="Zhao, Cox & Chen · Internet & Higher Education, 2025">
          If AI is the accommodation,
          <br />
          <span className="text-primary">access is the equity issue.</span>
        </PullQuote>
      </div>
    </SlideShell>
  );
};