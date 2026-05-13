import { Card } from "@/components/ui/card";
import { Target, Activity, Rocket, RefreshCw } from "lucide-react";

const shifts = [
  { icon: Target, n: "1", title: "Audit for cognitive load" },
  { icon: Activity, n: "2", title: "Add one new format" },
  { icon: Rocket, n: "3", title: "Try structured freedom" },
  { icon: RefreshCw, n: "4", title: "Test with diverse learners" },
];

export const LDTakeawaysScreen = () => {
  return (
    <main className="min-h-screen flex items-center px-8 py-10 animate-fade-in">
      <section className="max-w-7xl mx-auto w-full space-y-12">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-center leading-tight">
          Your action plan
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {shifts.map((s) => (
            <Card key={s.n} className="p-10 border-l-8 border-l-primary flex items-center gap-6">
              <div className="text-7xl font-bold text-primary/40">{s.n}</div>
              <div className="flex-1">
                <s.icon className="h-12 w-12 text-primary mb-3" />
                <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">{s.title}</h3>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-10 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 text-center">
          <p className="text-3xl md:text-5xl font-bold italic text-foreground leading-snug">
            "Design the margins.<br />Improve the center."
          </p>
        </Card>
      </section>
    </main>
  );
};