import { SlideShell, SlideTitle } from "@/components/slide";

/**
 * CIA / Sherman Kent — words people use for probability vary by ~50 points
 * person to person. Lands right after the audience poll (LD3.615) and before
 * the AI-vs-humans reveal (LD1.96).
 */
const ROWS: { phrase: string; low: number; high: number; median: number }[] = [
  { phrase: "Almost certain",      low: 85, high: 99, median: 95 },
  { phrase: "Slam dunk",           low: 75, high: 99, median: 90 },
  { phrase: "Highly likely",       low: 70, high: 95, median: 85 },
  { phrase: "Probable",            low: 55, high: 90, median: 75 },
  { phrase: "Serious possibility", low: 25, high: 75, median: 60 },
  { phrase: "Chances about even",  low: 40, high: 60, median: 50 },
  { phrase: "Possible",            low: 20, high: 70, median: 40 },
  { phrase: "Unlikely",            low: 5,  high: 35, median: 15 },
  { phrase: "Rarely",              low: 2,  high: 30, median: 10 },
  { phrase: "Never",               low: 0,  high: 20, median: 2  },
];

export const CIASpreadScreen = () => (
  <SlideShell tone="indigo" align="center" ariaLabel="CIA Sherman Kent probability spread">
    <div className="space-y-8 max-w-6xl mx-auto w-full">
      <SlideTitle kicker="CIA · Sherman Kent · Words of Estimative Probability">
        Same words. <span className="text-primary">~50-point spread.</span>
      </SlideTitle>

      <p className="text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto text-center leading-snug">
        When intelligence analysts mapped these phrases to numeric probabilities,
        every phrase covered a 30–50 point range across people.
      </p>

      <div
        role="table"
        aria-label="Probability words and their numeric range"
        className="rounded-2xl border border-border/40 bg-card/40 overflow-hidden"
      >
        <div role="row" className="grid grid-cols-[1fr_2fr_auto] items-center gap-6 px-8 py-3 border-b border-border/40 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          <div role="columnheader">Phrase</div>
          <div role="columnheader">Range across people (0–100%)</div>
          <div role="columnheader" className="text-right">Median</div>
        </div>
        {ROWS.map((r) => {
          const left = r.low;
          const width = Math.max(r.high - r.low, 1);
          return (
            <div
              key={r.phrase}
              role="row"
              className="grid grid-cols-[1fr_2fr_auto] items-center gap-6 px-8 py-3 border-b border-border/20 last:border-b-0"
            >
              <div role="cell" className="text-xl md:text-2xl font-semibold text-foreground">
                {r.phrase}
              </div>
              <div role="cell" className="relative h-6">
                <div className="absolute inset-y-1/2 left-0 right-0 h-px bg-border/40" />
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-3 rounded-full bg-primary/70"
                  style={{ left: `${left}%`, width: `${width}%` }}
                  aria-label={`${r.low} to ${r.high} percent`}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-1 h-5 bg-accent rounded-full"
                  style={{ left: `calc(${r.median}% - 2px)` }}
                  aria-hidden="true"
                />
              </div>
              <div role="cell" className="text-lg md:text-xl font-mono text-primary text-right tabular-nums">
                {r.median}%
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto text-center leading-snug">
        Two people can both say <span className="text-primary font-black">"serious possibility"</span>
        {" "}and mean <span className="text-primary font-black">25%</span> vs <span className="text-primary font-black">75%</span>.
        Words are not numbers.
      </p>
    </div>
  </SlideShell>
);