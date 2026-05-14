import { Users, ShieldAlert, GitBranch, Layers } from "lucide-react";
import { SlideShell, StatBlock, PullQuote } from "@/components/slide";
import { Card } from "@/components/ui/card";

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

        <Card className="p-6 md:p-8 bg-card/70 border-l-8 border-l-primary/60 grid md:grid-cols-2 gap-6 items-center">
          <div className="flex items-start gap-4">
            <Layers className="h-10 w-10 text-primary shrink-0" aria-hidden="true" />
            <div>
              <p className="text-3xl md:text-4xl font-black text-foreground leading-none">21% → 43%</p>
              <p className="text-base md:text-lg text-muted-foreground mt-2 leading-snug">
                NCES says 21% of US undergrads report a disability. When the National Disability Center asked about <em>disabling conditions</em> instead of formal registration: <strong className="text-foreground">43%</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <GitBranch className="h-10 w-10 text-accent shrink-0" aria-hidden="true" />
            <div>
              <p className="text-3xl md:text-4xl font-black text-foreground leading-none">&gt; 50%</p>
              <p className="text-base md:text-lg text-muted-foreground mt-2 leading-snug">
                of disabled college students report <strong className="text-foreground">more than one</strong> disability. Real students don't fit a single-condition model.
              </p>
            </div>
          </div>
        </Card>

        <PullQuote variant="primary" attribution="Purdue · NCES 2019–20 · National Disability Center 2025 · Doyle 2020">
          AI is the accommodation
          <br />
          <span className="text-primary">they never asked for.</span>
        </PullQuote>
      </div>
    </SlideShell>
  );
};