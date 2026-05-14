import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";
import { SlideShell, SlideTitle, StatBlock, PullQuote } from "@/components/slide";

const stats = [
  { value: "5–10%",  label: "ADHD" },
  { value: "10–15%", label: "Dyslexia" },
  { value: "2–4%",   label: "Autism spectrum" },
];

export const FacultyAreNeurodivergentScreen = () => {
  useRegisterReveals(4);
  return (
    <SlideShell tone="indigo" ariaLabel="Faculty are neurodivergent too">
      <div className="space-y-12">
        <SlideTitle kicker="This room — right now">
          The colleague next to you.
        </SlideTitle>
        <div className="grid sm:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <Reveal key={i} step={i + 1}>
              <StatBlock value={s.value} label={s.label} accent="primary" />
            </Reveal>
          ))}
        </div>
        <Reveal step={4}>
          <PullQuote>
            The students you teach differently
            <br />
            include <span className="text-primary">the colleague next to you</span>.
          </PullQuote>
        </Reveal>
      </div>
    </SlideShell>
  );
};