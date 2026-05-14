import { BookOpen, Wrench, Sparkles, HeartHandshake } from "lucide-react";
import { SlideShell, SlideTitle, PullQuote } from "@/components/slide";
import { Card } from "@/components/ui/card";

type Layer = {
  step: string;
  title: string;
  body: string;
  icon: typeof BookOpen;
  tone: string;
  text: string;
};

const layers: Layer[] = [
  {
    step: "01",
    title: "Accessible curriculum",
    body: "Clear instructions, multiple formats, predictable structure. The foundation everything else stands on.",
    icon: BookOpen,
    tone: "border-l-primary bg-primary/5",
    text: "text-primary",
  },
  {
    step: "02",
    title: "Accommodations + assistive tech",
    body: "Captions, screen readers, extended time, note-capture. Established, evidence-backed, legally grounded.",
    icon: Wrench,
    tone: "border-l-accent bg-accent/5",
    text: "text-accent",
  },
  {
    step: "03",
    title: "AI as optional augmentation",
    body: "A flexible layer on top — not a replacement for accessible design. Students opt in; faculty don't mandate.",
    icon: Sparkles,
    tone: "border-l-emerald-500 bg-emerald-500/5",
    text: "text-emerald-500",
  },
  {
    step: "04",
    title: "Human judgement, always",
    body: "Faculty, advisors, disability services, and students stay in the loop. AI informs decisions; it never makes them.",
    icon: HeartHandshake,
    tone: "border-l-destructive bg-destructive/5",
    text: "text-destructive",
  },
];

export const InclusiveSupportStackScreen = () => {
  return (
    <SlideShell tone="indigo" align="top" ariaLabel="The inclusive support stack">
      <div className="space-y-8">
        <SlideTitle kicker="Chapter 08 · The mental model">
          The inclusive support <span className="text-primary">stack</span>.
        </SlideTitle>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl leading-snug">
          AI is not the foundation. It's the third layer — and it only works because the first two are solid.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {layers.map((l) => {
            const Icon = l.icon;
            return (
              <Card key={l.step} className={`p-6 md:p-7 border-l-8 ${l.tone} backdrop-blur`}>
                <div className="flex items-start gap-4">
                  <Icon className={`h-12 w-12 ${l.text} shrink-0`} aria-hidden="true" />
                  <div className="space-y-2">
                    <p className={`text-lg font-mono uppercase tracking-widest ${l.text}`}>Layer {l.step}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">{l.title}</h3>
                    <p className="text-base md:text-lg text-muted-foreground leading-snug">{l.body}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <PullQuote variant="primary" attribution="ChatGPT meta-review · WCAG · UDL">
          Accessibility doesn't begin with AI.
          <br />
          <span className="text-primary">It begins with accessible courses.</span>
        </PullQuote>
      </div>
    </SlideShell>
  );
};