import { Users, ShieldAlert, GitBranch } from "lucide-react";
import { SlideShell, StatBlock, PullQuote } from "@/components/slide";

export const DisclosureGapScreen = () => {
  return (
    <SlideShell tone="indigo" align="center" ariaLabel="The disclosure gap">
      <div className="space-y-10">
        <header className="text-center space-y-4">
          <p className="text-sm md:text-base font-mono uppercase tracking-[0.3em] text-muted-foreground">
            Chapter 01 · The data gap
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight">
            The 5× <span className="text-primary">disclosure gap</span>.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-snug">
            Most neurodivergent students in your classroom never tell you — and never tell the institution.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <StatBlock
            value="~36%"
            label="identify as neurodivergent"
            note="Incoming students endorsing at least one ND identity (Purdue institutional study)"
            icon={Users}
            accent="primary"
          />
          <StatBlock
            value="6–7%"
            label="register with disability services"
            note="The fraction the institution actually sees on paper"
            icon={ShieldAlert}
            accent="destructive"
          />
          <StatBlock
            value="5×"
            label="the disclosure gap"
            note="For every student who registers, ~five more are coping silently"
            icon={GitBranch}
            accent="accent"
          />
        </div>

        <PullQuote variant="primary" attribution="Purdue institutional data · NCES 2019–20 · Doyle 2020">
          AI is the accommodation
          <br />
          <span className="text-primary">they never asked for.</span>
        </PullQuote>
      </div>
    </SlideShell>
  );
};