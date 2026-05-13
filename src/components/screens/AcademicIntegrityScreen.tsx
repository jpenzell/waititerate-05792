import { Card } from "@/components/ui/card";
import { ShieldAlert, Lightbulb } from "lucide-react";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";

const fears = [
  "Students skip the thinking",
  "I can't tell what's theirs",
  "Detectors punish ESL students",
];
const reframes = [
  "Calculators raised math's floor",
  "Design what AI can't shortcut",
  "Teach WITH AI, not against it",
];

export const AcademicIntegrityScreen = () => {
  useRegisterReveals(2);
  return (
    <main className="min-h-screen flex items-center px-8 py-10 animate-fade-in">
      <section className="max-w-7xl mx-auto w-full space-y-10">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-center">
          "Isn't this just cheating?"
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Reveal step={1}>
          <Card className="p-10 border-l-8 border-l-destructive/60 space-y-6 h-full">
            <div className="flex items-center gap-4">
              <ShieldAlert className="h-12 w-12 text-destructive" />
              <h3 className="text-3xl md:text-4xl font-bold">The fear</h3>
            </div>
            <ul className="space-y-4 text-2xl md:text-3xl text-foreground/90 leading-snug">
              {fears.map((f, i) => <li key={i}>• {f}</li>)}
            </ul>
          </Card>
          </Reveal>

          <Reveal step={2}>
          <Card className="p-10 border-l-8 border-l-primary space-y-6 h-full">
            <div className="flex items-center gap-4">
              <Lightbulb className="h-12 w-12 text-primary" />
              <h3 className="text-3xl md:text-4xl font-bold">The reframe</h3>
            </div>
            <ul className="space-y-4 text-2xl md:text-3xl text-foreground/90 leading-snug">
              {reframes.map((r, i) => <li key={i}>• {r}</li>)}
            </ul>
          </Card>
          </Reveal>
        </div>
      </section>
    </main>
  );
};