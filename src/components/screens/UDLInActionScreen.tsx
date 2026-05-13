import { Card } from "@/components/ui/card";
import { Eye, Zap, Hand } from "lucide-react";

const pillars = [
  { icon: Eye, title: "Representation", q: "WHAT", ask: "≥ 2 formats?" },
  { icon: Zap, title: "Engagement", q: "WHY", ask: "Real choices?" },
  { icon: Hand, title: "Expression", q: "HOW", ask: "Multiple ways to show it?" },
];

export const UDLInActionScreen = () => {
  return (
    <main className="min-h-screen flex items-center px-8 py-10 animate-fade-in">
      <section className="max-w-7xl mx-auto w-full space-y-12">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-center leading-tight">
          UDL in action
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <Card key={p.title} className="p-10 text-center border-2 border-primary/20 space-y-4">
              <p.icon className="h-16 w-16 mx-auto text-primary" />
              <p className="text-sm font-mono uppercase tracking-widest text-accent">{p.q}</p>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">{p.title}</h3>
              <p className="text-2xl text-foreground/85">{p.ask}</p>
            </Card>
          ))}
        </div>

        <Card className="p-10 bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/30 text-center">
          <p className="text-3xl md:text-4xl font-bold text-foreground leading-snug">
            Add <span className="text-primary">one</span> option this week.
          </p>
        </Card>
      </section>
    </main>
  );
};