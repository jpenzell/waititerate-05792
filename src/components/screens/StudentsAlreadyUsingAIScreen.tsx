import { GraduationCap, Sparkles, AlertCircle } from "lucide-react";
import { SlideShell, SlideTitle, StatBlock, PullQuote } from "@/components/slide";

export const StudentsAlreadyUsingAIScreen = () => {
  return (
    <SlideShell tone="teal" ariaLabel="Students already use AI">
      <div className="space-y-10">
        <SlideTitle kicker="HEPI Student Generative AI Survey · 2025">
          Your students already
          <br />
          <span className="text-primary">brought AI to class.</span>
        </SlideTitle>

        <div className="grid md:grid-cols-3 gap-6">
          <StatBlock
            value="92%"
            label="of UK undergraduates use GenAI"
            note="Up from 66% in 2024 — the fastest tech adoption in higher ed history"
            icon={GraduationCap}
            accent="primary"
          />
          <StatBlock
            value="88%"
            label="have used it for assessments"
            note="Summarising, structuring, drafting, editing — assignment-adjacent work"
            icon={Sparkles}
            accent="accent"
          />
          <StatBlock
            value="18%"
            label="have submitted AI text directly"
            note="The actual cheating rate is small. The usage rate is universal."
            icon={AlertCircle}
            accent="destructive"
          />
        </div>

        <PullQuote variant="primary" attribution="HEPI / Kortext Student Generative AI Survey, 2025 (n = 1,041)">
          The question isn't whether they use it.
          <br />
          <span className="text-primary">It's whether you teach them how.</span>
        </PullQuote>
      </div>
    </SlideShell>
  );
};