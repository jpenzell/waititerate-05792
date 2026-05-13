import { Card } from "@/components/ui/card";
import { TrendingUp, GraduationCap, DollarSign, Award } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: "+30%", label: "Completion" },
  { icon: GraduationCap, value: "+18%", label: "Dev-ed retention" },
  { icon: DollarSign, value: "Title III/V", label: "Grant fit" },
  { icon: Award, value: "SACSCOC", label: "Accreditation" },
];

export const RetentionEquityScreen = () => {
  return (
    <main className="min-h-screen flex items-center px-8 py-10 animate-fade-in">
      <section className="max-w-7xl mx-auto w-full space-y-12">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-center leading-tight">
          This is a <span className="text-primary">retention strategy</span>.
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Card key={i} className="p-8 text-center space-y-3 border-l-8 border-l-accent">
              <s.icon className="h-12 w-12 mx-auto text-accent" />
              <p className="text-5xl font-bold text-foreground">{s.value}</p>
              <p className="text-xl text-foreground/85">{s.label}</p>
            </Card>
          ))}
        </div>

        <Card className="p-10 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 text-center">
          <p className="text-3xl md:text-4xl text-foreground leading-snug font-semibold">
            "Redesign one course. Track DFW. Best case: a <span className="text-primary">SACSCOC story</span>."
          </p>
        </Card>
      </section>
    </main>
  );
};