import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, GraduationCap, DollarSign, Award } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: "+30%", label: "Higher course completion when content is chunked & multi-modal" },
  { icon: GraduationCap, value: "+18%", label: "Retention lift in dev-ed courses redesigned with UDL principles" },
  { icon: DollarSign, value: "$$$", label: "Title III, Title V, and Perkins grants reward inclusive course redesign" },
  { icon: Award, value: "SACSCOC", label: "Cognitive-diverse design strengthens accreditation evidence for student success" },
];

export const RetentionEquityScreen = () => {
  return (
    <main className="min-h-screen px-8 py-10 animate-fade-in">
      <section className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="text-sm">Bring this to your dean</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            This is a retention strategy.
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Every cognitive-diverse design choice is also a completion lever, an
            equity lever, and an accreditation lever. Department chairs care about all three.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Card key={i} className="p-6 text-center space-y-3 border-l-4 border-l-accent">
              <s.icon className="h-8 w-8 mx-auto text-accent" />
              <p className="text-3xl font-bold text-foreground">{s.value}</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{s.label}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
          <p className="text-base md:text-lg text-foreground/90 text-center leading-relaxed">
            <strong className="text-primary">The pitch to your chair:</strong>{" "}
            "I want to redesign one course this fall using these principles.
            Track completion and DFW rates against my prior section. Worst case,
            we learn. Best case, we have a SACSCOC story."
          </p>
        </Card>
        <p className="text-xs text-muted-foreground text-center italic">
          Figures are illustrative; tie to your own institutional data when presenting upward.
        </p>
      </section>
    </main>
  );
};