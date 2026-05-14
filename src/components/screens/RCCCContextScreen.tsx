import { Users, BookOpen, Briefcase, Heart } from "lucide-react";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";
import { SlideShell, SlideTitle, StatBlock, PullQuote } from "@/components/slide";

const stats = [
  {
    icon: Users,
    value: "36%",
    label: "First-generation students",
    note: "First in their family to attend college",
    cite: "AACC Fast Facts 2024",
  },
  {
    icon: Briefcase,
    value: "72%",
    label: "Working while enrolled",
    note: "62% part-time, juggling shifts with study",
    cite: "AACC 2024 · CCRC 2023",
  },
  {
    icon: BookOpen,
    value: "68%",
    label: "Take at least one dev-ed course",
    note: "Most arrive needing math, reading, or writing remediation",
    cite: "CAPR / Chen, NCES 2016",
  },
  {
    icon: Heart,
    value: "~36%",
    label: "Identify as neurodivergent",
    note: "Self-ID at intake — vs. ~6–7% registered with DSO",
    cite: "Purdue institutional study · Doyle 2020",
  },
];

export const RCCCContextScreen = () => {
  useRegisterReveals(5);
  return (
    <SlideShell tone="teal" align="top" ariaLabel="Who is in your RCCC classroom">
      <div className="space-y-8">
        <SlideTitle kicker="Rowan-Cabarrus · Right now">
          Who's in your <span className="text-primary">classroom.</span>
        </SlideTitle>

        <p className="text-xl md:text-2xl text-muted-foreground text-center max-w-4xl mx-auto leading-snug">
          Community-college classrooms aren't a sample of the general population —
          they concentrate exactly the students our system was never designed for.
        </p>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {stats.map((s, i) => (
            <Reveal key={i} step={i + 1}>
              <div className="h-full flex flex-col">
                <StatBlock
                  icon={s.icon}
                  value={s.value}
                  label={s.label}
                  note={s.note}
                  accent="accent"
                />
                <p className="mt-2 text-base font-mono uppercase tracking-widest text-muted-foreground/80 text-center">
                  {s.cite}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal step={5}>
          <PullQuote attribution="Synthesis: AACC, NCES, CAPR, Purdue, Doyle 2020">
            Designing for cognitive variation isn't optional here.
            <br />
            <span className="text-primary">It's the job.</span>
          </PullQuote>
        </Reveal>
      </div>
    </SlideShell>
  );
};