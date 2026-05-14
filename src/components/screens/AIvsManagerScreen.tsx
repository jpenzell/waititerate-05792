import { Bot, UserX, ShieldCheck } from "lucide-react";
import { SlideShell, StatBlock, PullQuote } from "@/components/slide";

export const AIvsManagerScreen = () => {
  return (
    <SlideShell tone="indigo" align="center" ariaLabel="People prefer AI to their manager">
      <div className="space-y-10">
        <header className="text-center space-y-4">
          <p className="text-sm md:text-base font-mono uppercase tracking-[0.3em] text-muted-foreground">
            Chapter 06 · AI as accommodation
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight">
            People would rather talk to AI
            <br />
            <span className="text-primary">than their manager.</span>
          </h1>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <StatBlock
            value="82%"
            label="trust AI more"
            note="than their own manager for career advice"
            icon={Bot}
            accent="primary"
          />
          <StatBlock
            value="2 in 3"
            label="would rather ask a bot"
            note="than risk looking incompetent in front of a human"
            icon={UserX}
            accent="accent"
          />
          <StatBlock
            value="0"
            label="judgment, ego, or grade"
            note="AI doesn't sigh, frown, or remember last week's mistake"
            icon={ShieldCheck}
            accent="primary"
          />
        </div>

        <PullQuote variant="primary" attribution="Workplace Intelligence × Oracle, 2024">
          For a brain wired for feedback &amp; injustice sensitivity,
          <br />
          <span className="text-primary">AI is the safest tutor in the room.</span>
        </PullQuote>
      </div>
    </SlideShell>
  );
};