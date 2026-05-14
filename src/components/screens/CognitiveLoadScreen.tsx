import { Card } from "@/components/ui/card";
import { Reveal, useRegisterReveals } from "@/contexts/RevealContext";
import { SlideShell, SlideTitle } from "@/components/slide";

const principles = [
  { title: "Progressive disclosure", note: "Reveal as needed" },
  { title: "Chunking",               note: "Small, digestible pieces" },
  { title: "Reduce clutter",         note: "Cut the noise" },
];

export const CognitiveLoadScreen = () => {
  useRegisterReveals(principles.length);
  return (
    <SlideShell tone="indigo" ariaLabel="Cognitive load principles">
      <div className="space-y-12">
        <header className="text-center space-y-4">
          <p className="text-xs md:text-sm font-mono uppercase tracking-[0.4em] text-accent">
            Working memory · Sweller
          </p>
          <h1 className="text-5xl md:text-8xl font-bold text-foreground leading-[1.05]">
            <span className="text-primary">7 ± 2</span> chunks. That's it.
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground">
            Design must respect the limit.
          </p>
        </header>
        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <Reveal key={p.title} step={i + 1}>
              <Card className="p-10 text-center border-l-8 border-l-primary h-full space-y-3 bg-card/80">
                <p className="font-mono text-sm uppercase tracking-[0.3em] text-primary">{`0${i + 1}`}</p>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">{p.title}</h3>
                <p className="text-xl text-foreground/80">{p.note}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideShell>
  );
};