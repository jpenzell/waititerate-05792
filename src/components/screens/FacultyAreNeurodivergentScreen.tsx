import { Card } from "@/components/ui/card";
import { HeartHandshake } from "lucide-react";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";

export const FacultyAreNeurodivergentScreen = () => {
  useRegisterReveals(4);
  return (
    <main className="min-h-screen flex items-center justify-center px-8 animate-fade-in">
      <section className="max-w-6xl w-full text-center space-y-10">
        <HeartHandshake className="h-20 w-20 mx-auto text-accent" />
        <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
          This room contains
        </h1>

        <div className="grid sm:grid-cols-3 gap-6">
          <Reveal step={1}>
            <Card className="p-8 border-l-8 border-l-primary/60 space-y-2 h-full">
              <p className="text-6xl md:text-7xl font-bold text-primary">5–10%</p>
              <p className="text-xl md:text-2xl text-foreground/90">ADHD</p>
            </Card>
          </Reveal>
          <Reveal step={2}>
            <Card className="p-8 border-l-8 border-l-primary/60 space-y-2 h-full">
              <p className="text-6xl md:text-7xl font-bold text-primary">10–15%</p>
              <p className="text-xl md:text-2xl text-foreground/90">Dyslexia</p>
            </Card>
          </Reveal>
          <Reveal step={3}>
            <Card className="p-8 border-l-8 border-l-primary/60 space-y-2 h-full">
              <p className="text-6xl md:text-7xl font-bold text-primary">2–4%</p>
              <p className="text-xl md:text-2xl text-foreground/90">Autism spectrum</p>
            </Card>
          </Reveal>
        </div>

        <Reveal step={4}>
          <Card className="p-10 bg-gradient-to-br from-accent/5 to-primary/5 border border-primary/20">
            <p className="text-3xl md:text-4xl text-foreground leading-snug font-semibold">
              The students you teach differently
              <br />
              include the colleague next to you.
            </p>
          </Card>
        </Reveal>
      </section>
    </main>
  );
};