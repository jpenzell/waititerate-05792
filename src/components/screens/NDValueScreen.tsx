import { SlideShell, SlideTitle } from "@/components/slide";

/**
 * The Value of Neurodivergent Talent — under-employed, over-performing.
 * Sits right before the YouGov 1-in-5 self-ID slide to frame the stakes.
 */
export const NDValueScreen = () => (
  <SlideShell tone="indigo" align="center" ariaLabel="The value of neurodivergent talent">
    <div className="space-y-12 max-w-6xl mx-auto">
      <SlideTitle kicker="The Value of Neurodivergent Talent">
        Under-employed. <span className="text-primary">Over-performing.</span>
      </SlideTitle>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border/40 bg-card/40 p-10 space-y-4">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-accent">
            Locked out
          </p>
          <p className="text-7xl md:text-8xl font-black text-primary leading-none">
            ~85%
          </p>
          <p className="text-2xl md:text-3xl text-foreground leading-snug">
            of autistic adults are un- or under-employed.
          </p>
          <p className="text-base text-muted-foreground">
            Across the broader ND population, unemployment runs 30–40% — three to
            eight times the neurotypical rate. (NAS 2023 · Deloitte 2022)
          </p>
        </div>

        <div className="rounded-2xl border border-border/40 bg-card/40 p-10 space-y-4">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-accent">
            When the system fits
          </p>
          <p className="text-7xl md:text-8xl font-black text-primary leading-none">
            90–140%
          </p>
          <p className="text-2xl md:text-3xl text-foreground leading-snug">
            more productive than neurotypical peers in the right roles.
          </p>
          <p className="text-base text-muted-foreground">
            JPMorgan Autism at Work · SAP · EY · Microsoft programs report
            higher accuracy, retention, and pattern-recognition output.
          </p>
        </div>
      </div>

      <p className="text-2xl md:text-3xl text-foreground/90 max-w-4xl mx-auto text-center leading-snug">
        The gap isn't talent. It's the{" "}
        <span className="text-primary font-black">system around the talent.</span>
      </p>
    </div>
  </SlideShell>
);