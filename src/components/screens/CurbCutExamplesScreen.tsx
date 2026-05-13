import { Card } from "@/components/ui/card";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";

const examples = [
  { tag: "Captions", forWho: "Deaf / HoH", stat: "71%", note: "of viewers use them" },
  { tag: "Chunked", forWho: "ADHD", stat: "+30%", note: "completion" },
  { tag: "Multi-format", forWho: "Dyslexia", stat: "80%+", note: "prefer them" },
];

export const CurbCutExamplesScreen = () => {
  useRegisterReveals(4);
  return (
    <main className="min-h-screen flex items-center px-8 py-10 animate-fade-in">
      <section className="max-w-7xl mx-auto w-full space-y-12">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-center leading-tight">
          Curb cuts in your classroom
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {examples.map((e, i) => (
            <Reveal key={e.tag} step={i + 1}>
              <Card className="p-10 text-center border-2 border-primary/20 space-y-4">
                <p className="text-3xl md:text-4xl font-bold text-primary">{e.tag}</p>
                <p className="text-xl text-muted-foreground">Built for {e.forWho}</p>
                <p className="text-7xl font-bold text-accent">{e.stat}</p>
                <p className="text-xl text-foreground/85">{e.note}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal step={4}>
          <Card className="p-12 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 text-center">
            <p className="text-3xl md:text-5xl font-bold text-foreground leading-snug">
              Accommodation becomes <span className="text-accent">preferred practice</span>.
            </p>
          </Card>
        </Reveal>
      </section>
    </main>
  );
};
