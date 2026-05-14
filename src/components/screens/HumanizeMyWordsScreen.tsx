import { Sparkles, AlertTriangle, Mic, MessageSquareText, Heart, Languages } from "lucide-react";
import { SlideShell, SlideTitle, PullQuote } from "@/components/slide";
import { Card } from "@/components/ui/card";

const affordances = [
  { icon: MessageSquareText, label: "Offload executive tasks" },
  { icon: Heart,             label: "Emotional regulation" },
  { icon: Languages,         label: "Translate ND ↔ NT communication" },
  { icon: Mic,               label: "Validate autistic identity" },
];

const risks = [
  { label: "Reinforces delusional thinking" },
  { label: 'Replaces authentic identity with "automated masking"' },
  { label: "Conflicts with the autistic sense of justice" },
];

export const HumanizeMyWordsScreen = () => {
  return (
    <SlideShell tone="amber" ariaLabel="Humanize my words — masking as a service">
      <div className="space-y-10">
        <SlideTitle kicker='Ma et al. 2026 · 3,984 autistic posts analyzed'>
          "I use ChatGPT
          <br />
          <span className="text-primary">to humanize my words."</span>
        </SlideTitle>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 border-l-8 border-l-primary bg-card/80 space-y-5">
            <header className="flex items-center gap-3">
              <Sparkles className="h-9 w-9 text-primary" aria-hidden="true" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">What it gives them</h2>
            </header>
            <ul className="space-y-4">
              {affordances.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3 text-xl md:text-2xl text-foreground/90 leading-snug">
                  <Icon className="h-7 w-7 text-primary mt-1 shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8 border-l-8 border-l-destructive/70 bg-card/80 space-y-5">
            <header className="flex items-center gap-3">
              <AlertTriangle className="h-9 w-9 text-destructive" aria-hidden="true" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">What it costs them</h2>
            </header>
            <ul className="space-y-4">
              {risks.map(({ label }) => (
                <li key={label} className="flex items-start gap-3 text-xl md:text-2xl text-foreground/90 leading-snug">
                  <span className="mt-2 h-2 w-2 rounded-full bg-destructive shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <PullQuote variant="soft">
          The phrase itself is the indictment.
          <br />
          <span className="text-primary">"Humanize" — because their words were treated as less than human.</span>
        </PullQuote>
      </div>
    </SlideShell>
  );
};