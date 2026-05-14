import { Heart, AlertTriangle, MessageSquareWarning } from "lucide-react";
import { SlideShell, StatBlock, PullQuote } from "@/components/slide";

export const FeedbackSensitivityScreen = () => {
  return (
    <SlideShell tone="rose" align="center" ariaLabel="Feedback sensitivity">
      <div className="space-y-10">
        <header className="text-center space-y-4">
          <p className="text-sm md:text-base font-mono uppercase tracking-[0.3em] text-muted-foreground">
            Chapter 04 · Inside the mind
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight">
            Feedback Sensitivity
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-snug">
            For many neurodivergent brains, criticism doesn't just sting — it floods the system.
            <br />Often called <strong className="text-foreground">Rejection Sensitive Dysphoria</strong> (RSD).
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <StatBlock
            value="~99%"
            label="of adults with ADHD"
            note="report emotional sensitivity to perceived rejection or criticism"
            icon={Heart}
            accent="destructive"
          />
          <StatBlock
            value="1 comment"
            label="can derail a week"
            note="A single edit note can spiral into shame, avoidance, and stalled work"
            icon={MessageSquareWarning}
            accent="primary"
          />
          <StatBlock
            value="Physical"
            label="not just emotional"
            note="Described as a stab, a punch, or a wave — felt in the body, not just the mind"
            icon={AlertTriangle}
            accent="accent"
          />
        </div>

        <PullQuote variant="soft">
          The student who "shut down" after your edit didn't quit.
          <br />
          <span className="text-primary">Their nervous system did.</span>
        </PullQuote>
      </div>
    </SlideShell>
  );
};