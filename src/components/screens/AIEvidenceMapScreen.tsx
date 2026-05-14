import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { SlideShell, SlideTitle, PullQuote } from "@/components/slide";
import { Card } from "@/components/ui/card";

type Row = {
  tier: "Strong" | "Mixed" | "Thin";
  icon: typeof CheckCircle2;
  accent: string;
  border: string;
  examples: string;
  detail: string;
};

const rows: Row[] = [
  {
    tier: "Strong",
    icon: CheckCircle2,
    accent: "text-emerald-500",
    border: "border-l-emerald-500",
    examples: "LLMs for reading, writing, brainstorming, structuring, proofreading, self-organization",
    detail: "Multiple HE studies of disabled students report real reductions in cognitive load and executive-function friction.",
  },
  {
    tier: "Mixed",
    icon: AlertTriangle,
    accent: "text-amber-500",
    border: "border-l-amber-500",
    examples: "Assistive tech, intelligent tutoring, support chatbots, captioning",
    detail: "Established evidence base, but ND-specific outcomes are uneven. Pilot in bounded courses; evaluate by subgroup.",
  },
  {
    tier: "Thin",
    icon: XCircle,
    accent: "text-destructive",
    border: "border-l-destructive",
    examples: "Predictive analytics, recommender systems, early-alert dashboards, “AI-enabled” student-success suites",
    detail: "Almost no evaluation by disability subgroup. Risk of misclassifying disabled students. Don't assume “AI = inclusive.”",
  },
];

export const AIEvidenceMapScreen = () => {
  return (
    <SlideShell tone="slate" align="top" ariaLabel="The AI evidence map for higher education">
      <div className="space-y-8">
        <SlideTitle kicker="Chapter 06 · Trust, but verify">
          Not all "AI for inclusion" is created equal.
        </SlideTitle>

        <div className="grid gap-4">
          {rows.map((r) => {
            const Icon = r.icon;
            return (
              <Card
                key={r.tier}
                className={`p-6 md:p-7 border-l-8 ${r.border} bg-card/80 grid md:grid-cols-[auto_1fr] gap-5 items-start`}
              >
                <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-1 md:w-44">
                  <Icon className={`h-10 w-10 ${r.accent}`} aria-hidden="true" />
                  <div>
                    <p className={`text-2xl md:text-3xl font-black ${r.accent} leading-none`}>{r.tier}</p>
                    <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground mt-1">evidence</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xl md:text-2xl font-semibold text-foreground leading-snug">{r.examples}</p>
                  <p className="text-base md:text-lg text-muted-foreground leading-snug">{r.detail}</p>
                </div>
              </Card>
            );
          })}
        </div>

        <PullQuote variant="soft" attribution="ChatGPT meta-review · Jisc · Every Learner Everywhere 2024">
          "AI-enabled" is a marketing label.
          <br />
          <span className="text-primary">"Evidence-based" is a procurement question.</span>
        </PullQuote>
      </div>
    </SlideShell>
  );
};