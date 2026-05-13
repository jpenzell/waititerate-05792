import { Card } from "@/components/ui/card";
import { Brain, Glasses, Accessibility, ArrowRight } from "lucide-react";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";

export const AICognitiveProtheticScreen = () => {
  useRegisterReveals(2);
  return (
    <main className="min-h-screen flex items-center px-8 py-10 animate-fade-in">
      <section className="max-w-7xl mx-auto w-full space-y-12">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-center leading-tight">
          AI as <span className="text-primary">cognitive prosthetic</span>
        </h1>

        <Reveal step={1}>
        <div className="grid md:grid-cols-5 gap-4 items-center">
          <Card className="p-8 text-center border-2 border-primary/30 col-span-1 md:col-span-1">
            <Glasses className="h-16 w-16 mx-auto text-primary mb-3" />
            <p className="text-2xl font-bold">Glasses</p>
            <p className="text-lg text-muted-foreground">→ vision</p>
          </Card>
          <ArrowRight className="hidden md:block h-10 w-10 text-accent mx-auto" />
          <Card className="p-8 text-center border-2 border-primary/30">
            <Accessibility className="h-16 w-16 mx-auto text-primary mb-3" />
            <p className="text-2xl font-bold">Mobility aid</p>
            <p className="text-lg text-muted-foreground">→ movement</p>
          </Card>
          <ArrowRight className="hidden md:block h-10 w-10 text-accent mx-auto" />
          <Card className="p-10 text-center bg-gradient-to-br from-primary/15 to-accent/15 border-4 border-primary">
            <Brain className="h-20 w-20 mx-auto text-primary mb-3" />
            <p className="text-3xl font-bold">AI</p>
            <p className="text-xl text-foreground">→ cognition</p>
          </Card>
        </div>
        </Reveal>

        <Reveal step={2}>
        <Card className="p-12 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 text-center">
          <p className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Personalization at scale.
            <br />
            <span className="text-primary">For every learner.</span>
          </p>
        </Card>
        </Reveal>
      </section>
    </main>
  );
};