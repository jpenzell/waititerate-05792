import { Card } from "@/components/ui/card";
import { Eye, MessageCircle, Clock, Volume2 } from "lucide-react";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";
import { SlideShell, SlideTitle } from "@/components/slide";

const items = [
  { icon: Eye,           finding: "Aphantasia",       classroom: "Pair every visual with an image." },
  { icon: MessageCircle, finding: "Silent readers",   classroom: "Silent ≠ disengaged." },
  { icon: Clock,         finding: "Time blindness",   classroom: "Add interim checkpoints." },
  { icon: Volume2,       finding: "Sensory overload", classroom: "Offer written participation." },
];

export const FacultyTranslationScreen = () => {
  useRegisterReveals(4);
  return (
    <SlideShell tone="indigo" ariaLabel="What it means for your students">
      <div className="space-y-12">
        <SlideTitle kicker="Translation to teaching">
          It's in your classroom too.
        </SlideTitle>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((it, i) => (
            <Reveal key={i} step={i + 1}>
              <Card className="p-8 space-y-4 border-l-8 border-l-primary/70 h-full bg-card/80">
                <div className="flex items-center gap-4">
                  <it.icon className="h-10 w-10 text-primary flex-shrink-0" aria-hidden="true" />
                  <p className="text-3xl md:text-4xl font-bold text-foreground">{it.finding}</p>
                </div>
                <p className="text-2xl text-foreground/85 leading-snug">{it.classroom}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideShell>
  );
};