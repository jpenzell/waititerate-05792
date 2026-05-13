import { Users, BookOpen, Briefcase, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

export const RCCCContextScreen = () => {
  const stats = [
    { icon: Users, label: "First-generation students", value: "~45%", note: "First in their family to attend college" },
    { icon: Briefcase, label: "Working while enrolled", value: "70%+", note: "Balancing jobs, childcare, caregiving" },
    { icon: BookOpen, label: "Take dev-ed coursework", value: "1 in 3", note: "Math, English, or reading remediation" },
    { icon: Heart, label: "Identify as neurodivergent", value: "20%+", note: "ADHD, autism, dyslexia, anxiety, more" },
  ];

  return (
    <main className="min-h-screen px-8 py-10 animate-fade-in flex items-center">
      <section className="max-w-7xl mx-auto w-full space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            Who's in your classroom
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Card key={i} className="p-8 text-center border-l-8 border-l-accent/60">
              <s.icon className="h-12 w-12 mx-auto text-accent mb-4" />
              <div className="text-6xl font-bold text-foreground">{s.value}</div>
              <div className="text-xl font-semibold text-foreground/90 mt-3">{s.label}</div>
            </Card>
          ))}
        </div>

        <Card className="p-10 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 text-center">
          <p className="text-3xl md:text-4xl text-foreground leading-snug">
            Designing for cognitive variation isn't optional here.
            <br />
            <span className="text-primary font-bold">It's the job.</span>
          </p>
        </Card>
      </section>
    </main>
  );
};