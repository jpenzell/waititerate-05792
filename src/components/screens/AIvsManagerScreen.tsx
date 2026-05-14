import { Quote, ShieldCheck, MessageCircle } from "lucide-react";
import { SlideShell, SlideTitle, StatBlock, PullQuote } from "@/components/slide";
import { Card } from "@/components/ui/card";

export const AIvsManagerScreen = () => {
  return (
    <SlideShell tone="indigo" ariaLabel="AI is the safest person to ask">
      <div className="space-y-10">
        <SlideTitle kicker="Chapter 06 · AI as accommodation">
          AI is the safest person
          <br />
          <span className="text-primary">to ask.</span>
        </SlideTitle>

        <div className="grid md:grid-cols-2 gap-6">
          <StatBlock
            value="0"
            label="judgment, ego, or grade"
            note="No sigh. No frown. No memory of last week's mistake."
            icon={ShieldCheck}
            accent="primary"
          />
          <StatBlock
            value="24/7"
            label="answering the dumb question"
            note="The one a student would never raise their hand to ask"
            icon={MessageCircle}
            accent="accent"
          />
        </div>

        <Card className="p-10 md:p-12 border-2 border-primary/30 bg-card/80 space-y-4">
          <Quote className="h-10 w-10 text-primary" aria-hidden="true" />
          <p className="text-2xl md:text-4xl font-semibold text-foreground leading-snug italic">
            "I have used ChatGPT to help me get accommodations through the university,
            and also to help me communicate more directly and assertively with professors
            about my accommodations and needs."
          </p>
          <p className="text-base md:text-lg font-mono uppercase tracking-[0.3em] text-muted-foreground">
            — P31 · Atcheson et al., CHI 2025
          </p>
        </Card>

        <PullQuote variant="soft">
          For a brain wired for feedback &amp; injustice sensitivity,
          <br />
          <span className="text-primary">AI is the lowest-stakes tutor in the room.</span>
        </PullQuote>
      </div>
    </SlideShell>
  );
};