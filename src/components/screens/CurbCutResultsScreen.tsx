import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";

export const CurbCutResultsScreen = () => {
  useRegisterReveals(4);
  const results = [
    { answer: "71%", label: "use closed captions" },
    { answer: "30%", label: "better completion when chunked" },
    { answer: "80%+", label: "prefer multiple formats" },
  ];

  return (
    <main className="min-h-screen flex items-center px-8 py-10 animate-fade-in">
      <section className="max-w-7xl mx-auto w-full space-y-12">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-center leading-tight">
          Built for 15%.
          <br />
          <span className="text-primary">Used by 80%+.</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {results.map((r, idx) => (
            <Reveal key={idx} step={idx + 1}>
              <Card className="p-10 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 h-full">
                <div className="text-7xl md:text-8xl font-bold text-primary mb-4">{r.answer}</div>
                <p className="text-2xl text-foreground/90">{r.label}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal step={4}>
        <Card className="p-12 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
          <div className="flex items-center justify-center gap-6 text-3xl md:text-5xl font-bold flex-wrap">
            <span className="text-primary">Design the margins.</span>
            <ArrowRight className="h-12 w-12 text-accent" />
            <span className="text-accent">Improve the center.</span>
          </div>
        </Card>
        </Reveal>
      </section>
    </main>
  );
};
