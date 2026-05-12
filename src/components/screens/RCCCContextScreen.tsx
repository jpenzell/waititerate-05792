import { Users, BookOpen, Briefcase, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const RCCCContextScreen = () => {
  const stats = [
    { icon: Users, label: "First-generation students", value: "~45%", note: "First in their family to attend college" },
    { icon: Briefcase, label: "Working while enrolled", value: "70%+", note: "Balancing jobs, childcare, caregiving" },
    { icon: BookOpen, label: "Take dev-ed coursework", value: "1 in 3", note: "Math, English, or reading remediation" },
    { icon: Heart, label: "Identify as neurodivergent", value: "20%+", note: "ADHD, autism, dyslexia, anxiety, more" },
  ];

  return (
    <main className="min-h-screen px-8 py-10 animate-fade-in">
      <section className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="text-sm">Who's actually in your classroom</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            The Community College Classroom
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Dual-enrolled high schoolers. Returning adults. Veterans. Parents.
            ESL learners. First-gen. The widest cognitive range in higher ed —
            sitting in one room.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Card key={i} className="p-6 text-center border-l-4 border-l-accent/60">
              <s.icon className="h-8 w-8 mx-auto text-accent mb-3" />
              <div className="text-3xl font-bold text-foreground">{s.value}</div>
              <div className="text-sm font-semibold text-foreground/90 mt-1">{s.label}</div>
              <div className="text-xs text-muted-foreground mt-2">{s.note}</div>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 text-center">
          <p className="text-xl md:text-2xl text-foreground leading-relaxed">
            Designing for cognitive variation isn't a "nice to have" at a community college.
            <br />
            <span className="text-primary font-semibold">It's the job.</span>
          </p>
          <p className="text-sm text-muted-foreground mt-4 italic">
            Approximate national community-college figures; RCCC's own mix varies by program.
          </p>
        </Card>
      </section>
    </main>
  );
};