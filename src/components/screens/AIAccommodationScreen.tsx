import { Card } from "@/components/ui/card";
import { Ear, Brain, Languages, Focus, Eye, MessageSquare } from "lucide-react";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";
import { SlideShell, SlideTitle } from "@/components/slide";

const cases = [
  { icon: Ear,          who: "Audio processing",    use: "Live transcript + summary" },
  { icon: Brain,        who: "Executive function",  use: "Planning coach" },
  { icon: Languages,    who: "ESL",                 use: "Translator + glossary" },
  { icon: Focus,        who: "ADHD",                use: "Focus partner / quiz" },
  { icon: Eye,          who: "Dyslexia",            use: "Reformatter" },
  { icon: MessageSquare,who: "Social cues",         use: "Social interpreter" },
];

export const AIAccommodationScreen = () => {
  useRegisterReveals(cases.length);
  return (
    <SlideShell tone="teal" ariaLabel="AI as cognitive accommodation">
      <div className="space-y-12">
        <SlideTitle kicker="Six everyday archetypes">
          Not productivity tool. <span className="text-primary">Prosthetic.</span>
        </SlideTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <Reveal key={i} step={i + 1}>
              <Card className="p-7 space-y-3 border-l-8 border-l-accent/70 h-full bg-card/80">
                <div className="flex items-center gap-4">
                  <c.icon className="h-10 w-10 text-accent flex-shrink-0" aria-hidden="true" />
                  <p className="text-2xl md:text-3xl font-bold text-foreground leading-tight">{c.who}</p>
                </div>
                <p className="text-xl md:text-2xl text-foreground/85 leading-snug">{c.use}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideShell>
  );
};