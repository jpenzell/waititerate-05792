import { Brain } from "lucide-react";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";

export const CognitiveTransitionScreen = () => {
  useRegisterReveals(2);
  return (
    <main className="min-h-screen flex items-center justify-center px-8 animate-fade-in">
      <section className="max-w-6xl text-center space-y-12">
        <Brain className="h-20 w-20 mx-auto text-primary" />
        <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-tight">
          AI sees the data.
        </h1>
        <Reveal step={1}>
          <h2 className="text-5xl md:text-7xl font-bold text-primary leading-tight">
            But every mind reads it differently.
          </h2>
        </Reveal>
        <Reveal step={2}>
          <p className="text-2xl md:text-3xl text-muted-foreground italic max-w-4xl mx-auto">
            Let's discover how.
          </p>
        </Reveal>
      </section>
    </main>
  );
};
