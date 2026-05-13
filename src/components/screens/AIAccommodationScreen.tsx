import { Card } from "@/components/ui/card";
import { Ear, Brain, Languages, Focus, Eye, MessageSquare } from "lucide-react";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";

const cases = [
  { icon: Ear, who: "Audio processing", use: "Live transcript + summary" },
  { icon: Brain, who: "Executive function", use: "Planning coach" },
  { icon: Languages, who: "ESL", use: "Translator + glossary" },
  { icon: Focus, who: "ADHD", use: "Focus partner / quiz" },
  { icon: Eye, who: "Dyslexia", use: "Reformatter" },
  { icon: MessageSquare, who: "Social cues", use: "Social interpreter" },
];

export const AIAccommodationScreen = () => {
  useRegisterReveals(cases.length);
  return (
    <main className="min-h-screen flex items-center px-8 py-10 animate-fade-in">
      <section className="max-w-7xl mx-auto w-full space-y-10">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-center leading-tight">
          Not productivity tool.
          <br />
          <span className="text-primary">Prosthetic.</span>
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <Reveal key={i} step={i + 1}>
              <Card className="p-8 space-y-3 border-l-8 border-l-accent/60">
                <div className="flex items-center gap-4">
                  <c.icon className="h-12 w-12 text-accent flex-shrink-0" />
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{c.who}</p>
                </div>
                <p className="text-xl md:text-2xl text-foreground/85 leading-snug">{c.use}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
};