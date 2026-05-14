import { Users, BookOpen, Briefcase, Heart } from "lucide-react";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";
import { SlideShell, SlideTitle, StatBlock, PullQuote } from "@/components/slide";

const stats = [
  { icon: Users,     value: "~45%",  label: "First-generation students" },
  { icon: Briefcase, value: "70%+",  label: "Working while enrolled" },
  { icon: BookOpen,  value: "1 in 3", label: "Take dev-ed coursework" },
  { icon: Heart,     value: "20%+",  label: "Identify as neurodivergent" },
];

export const RCCCContextScreen = () => {
  useRegisterReveals(5);
  return (
    <SlideShell tone="teal" ariaLabel="Who is in your RCCC classroom">
      <div className="space-y-10">
        <SlideTitle kicker="Rowan-Cabarrus · Right now">
          Who's in your classroom.
        </SlideTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Reveal key={i} step={i + 1}>
              <StatBlock icon={s.icon} value={s.value} label={s.label} accent="accent" />
            </Reveal>
          ))}
        </div>
        <Reveal step={5}>
          <PullQuote>
            Designing for cognitive variation isn't optional here.
            <br />
            <span className="text-primary">It's the job.</span>
          </PullQuote>
        </Reveal>
      </div>
    </SlideShell>
  );
};