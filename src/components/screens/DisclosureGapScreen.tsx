import { Users, ShieldAlert, GitBranch, Layers } from "lucide-react";
import { SlideShell, StatBlock, PullQuote } from "@/components/slide";
import { Card } from "@/components/ui/card";

/**
 * LD1.3b — The 5× disclosure gap (headline + three stat blocks).
 * Split from a longer slide so each beat owns its own screen.
 */
export const DisclosureGapScreen = () => {
  return (
    <SlideShell tone="indigo" align="center" ariaLabel="The disclosure gap">
      <div className="space-y-12">
        <header className="text-center space-y-4">
          <p className="text-lg md:text-xl font-mono uppercase tracking-[0.3em] text-muted-foreground">
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

        <p className="text-center text-lg md:text-xl font-mono uppercase tracking-[0.25em] text-muted-foreground">
          Sources · Purdue institutional study · NCES 2019–20 · Doyle 2020
        </p>
      </div>
    </SlideShell>
  );
};

/**
 * LD1.3b-ii — Two co-occurrence stats: 21% → 43% (definition matters)
 * and >50% (real students have more than one disability).
 */
export const DisclosureGapDetailScreen = () => {
  return (
    <SlideShell tone="indigo" align="center" ariaLabel="Disclosure gap — what we miss">
      <div className="space-y-10">
        <header className="text-center space-y-4">
          <p className="text-lg md:text-xl font-mono uppercase tracking-[0.3em] text-muted-foreground">
            Chapter 01 · The data gap
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
            Change the question, <span className="text-primary">double the answer.</span>
          </h2>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 bg-card/70 border-l-8 border-l-primary/60 flex items-start gap-5">
            <Layers className="h-12 w-12 text-primary shrink-0" aria-hidden="true" />
            <div>
              <p className="text-5xl md:text-6xl font-black text-foreground leading-none">
                21% <span className="text-muted-foreground font-bold">→</span> 43%
              </p>
              <p className="text-lg md:text-xl text-muted-foreground mt-4 leading-snug">
                NCES says 21% of US undergrads report a disability. When the National Disability Center asked about <em>disabling conditions</em> instead of formal registration: <strong className="text-foreground">43%</strong>.
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-card/70 border-l-8 border-l-accent/60 flex items-start gap-5">
            <GitBranch className="h-12 w-12 text-accent shrink-0" aria-hidden="true" />
            <div>
              <p className="text-5xl md:text-6xl font-black text-foreground leading-none">&gt; 50%</p>
              <p className="text-lg md:text-xl text-muted-foreground mt-4 leading-snug">
                of disabled college students report <strong className="text-foreground">more than one</strong> disability. Real students don't fit a single-condition model.
              </p>
            </div>
          </Card>
        </div>

        <p className="text-center text-lg md:text-xl font-mono uppercase tracking-[0.25em] text-muted-foreground">
          Sources · NCES 2019–20 · National Disability Center 2025
        </p>
      </div>
    </SlideShell>
  );
};

/**
 * LD1.3b-iii — The takeaway pull quote that closes the disclosure-gap arc.
 */
export const DisclosureGapTakeawayScreen = () => {
  return (
    <SlideShell tone="indigo" align="center" ariaLabel="AI is the accommodation they never asked for">
      <PullQuote
        variant="primary"
        attribution="Purdue · NCES 2019–20 · National Disability Center 2025 · Doyle 2020"
      >
        AI is the accommodation
        <br />
        <span className="text-primary">they never asked for.</span>
      </PullQuote>
    </SlideShell>
  );
};