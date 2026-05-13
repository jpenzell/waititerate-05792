import { Card } from "@/components/ui/card";
import { Eye, MessageCircle, Clock, Volume2 } from "lucide-react";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";

const items = [
  { icon: Eye, finding: "Aphantasia", classroom: "Pair every visual with an image." },
  { icon: MessageCircle, finding: "Silent readers", classroom: "Silent ≠ disengaged." },
  { icon: Clock, finding: "Time blindness", classroom: "Add interim checkpoints." },
  { icon: Volume2, finding: "Sensory overload", classroom: "Offer written participation." },
];

export const FacultyTranslationScreen = () => {
  useRegisterReveals(4);
  return (
    <main className="min-h-screen flex items-center px-8 py-10 animate-fade-in">
      <section className="max-w-7xl mx-auto w-full space-y-10">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-center leading-tight">
          It's in your classroom too.
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((it, i) => (
            <Reveal key={i} step={i + 1}>
              <Card className="p-8 space-y-4 border-l-8 border-l-primary/60 h-full">
                <div className="flex items-center gap-4">
                  <it.icon className="h-12 w-12 text-primary flex-shrink-0" />
                  <p className="text-3xl md:text-4xl font-bold text-foreground">{it.finding}</p>
                </div>
                <p className="text-2xl text-foreground/85 leading-snug">{it.classroom}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
};