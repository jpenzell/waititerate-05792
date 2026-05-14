import { GraduationCap, Building2, DollarSign, Award } from "lucide-react";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";
import { SlideShell, SlideTitle, StatBlock, PullQuote } from "@/components/slide";

const stats = [
  { icon: GraduationCap, value: "58% vs 79%", label: "ND grad rate gap (UC Davis)" },
  { icon: Building2,     value: "9.5% vs 28%", label: "Two-year vs four-year accommodation provision (PLOS One, 2025)" },
  { icon: DollarSign,    value: "Title III/V", label: "Grant fit" },
  { icon: Award,         value: "SACSCOC",     label: "Accreditation" },
];

export const RetentionEquityScreen = () => {
  useRegisterReveals(stats.length + 1);
  return (
    <SlideShell tone="teal" ariaLabel="Retention strategy">
      <div className="space-y-12">
        <SlideTitle kicker="The grown-up framing">
          This is a <span className="text-primary">retention strategy</span>.
        </SlideTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Reveal key={i} step={i + 1}>
              <StatBlock icon={s.icon} value={s.value} label={s.label} accent="accent" />
            </Reveal>
          ))}
        </div>
        <Reveal step={stats.length + 1}>
          <PullQuote>
            "Redesign one course. Track DFW. Best case: a{" "}
            <span className="text-primary">SACSCOC story</span>."
          </PullQuote>
        </Reveal>
      </div>
    </SlideShell>
  );
};