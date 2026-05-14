import { Scale, Flame, ShieldAlert } from "lucide-react";
import { SlideShell, StatBlock, PullQuote } from "@/components/slide";

export const InjusticeSensitivityScreen = () => {
  return (
    <SlideShell tone="amber" align="center" ariaLabel="Injustice sensitivity">
      <div className="space-y-10">
        <header className="text-center space-y-4">
          <p className="text-lg md:text-xl font-mono uppercase tracking-[0.3em] text-muted-foreground">
            Chapter 04 · Inside the mind
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight">
            Injustice Sensitivity
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-snug">
            Many neurodivergent brains register unfairness like a fire alarm —
            for themselves <em>and</em> for everyone else in the room.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <StatBlock
            value="Elevated"
            label="in autistic adults"
            note="Autistic adults score significantly higher on injustice-sensitivity scales than non-autistic peers (Schiltz et al., 2021)."
            icon={Scale}
            accent="primary"
          />
          <StatBlock
            value="Other-focused"
            label="not just self-focused"
            note="Often triggered by unfairness done to someone else — a classmate, a colleague, a stranger online."
            icon={ShieldAlert}
            accent="accent"
          />
          <StatBlock
            value="Whole-body"
            label="response, not a debate"
            note="Shows up as heat, urgency, refusal to let it go — easily mislabeled as 'difficult' or 'inflexible.'"
            icon={Flame}
            accent="destructive"
          />
        </div>

        <PullQuote variant="soft">
          The student who wouldn't drop the point about your grading rubric isn't being defiant.
          <br />
          <span className="text-primary">Their alarm is going off.</span>
        </PullQuote>
      </div>
    </SlideShell>
  );
};