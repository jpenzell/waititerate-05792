import { Card } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";

const principles = [
  { title: "Progressive Disclosure", note: "Reveal as needed" },
  { title: "Chunking", note: "Small, digestible pieces" },
  { title: "Reduce Clutter", note: "Cut the noise" },
];

export const CognitiveLoadScreen = () => {
  useRegisterReveals(principles.length);
  return (
    <main className="min-h-screen flex items-center px-8 py-10 animate-fade-in">
      <section className="max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Working memory: <span className="text-primary">7±2 chunks</span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground">
            Design must respect the limit.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <Reveal key={p.title} step={i + 1}>
              <Card className="p-10 text-center border-2 border-primary/20 space-y-4 h-full">
                <Brain className="h-14 w-14 mx-auto text-primary" />
                <h3 className="text-3xl font-bold text-foreground">{p.title}</h3>
                <p className="text-xl text-foreground/85">{p.note}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
};