import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeartHandshake } from "lucide-react";

export const FacultyAreNeurodivergentScreen = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-8 animate-fade-in">
      <section className="max-w-4xl w-full text-center space-y-8">
        <Badge variant="secondary" className="mx-auto">A quiet truth</Badge>
        <HeartHandshake className="h-16 w-16 mx-auto text-accent" />
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          This room probably contains
        </h1>

        <div className="grid sm:grid-cols-3 gap-4 text-left">
          <Card className="p-6 border-l-4 border-l-primary/60 space-y-2">
            <p className="text-3xl font-bold text-primary">5–10%</p>
            <p className="text-sm text-foreground/90">faculty with ADHD</p>
          </Card>
          <Card className="p-6 border-l-4 border-l-primary/60 space-y-2">
            <p className="text-3xl font-bold text-primary">10–15%</p>
            <p className="text-sm text-foreground/90">faculty with dyslexia or related processing differences</p>
          </Card>
          <Card className="p-6 border-l-4 border-l-primary/60 space-y-2">
            <p className="text-3xl font-bold text-primary">2–4%</p>
            <p className="text-sm text-foreground/90">faculty on the autism spectrum (often diagnosed late, or never)</p>
          </Card>
        </div>

        <Card className="p-8 bg-gradient-to-br from-accent/5 to-primary/5 border border-primary/20">
          <p className="text-xl md:text-2xl text-foreground leading-relaxed">
            The students you teach differently
            <br />
            include the colleague sitting next to you.
          </p>
          <p className="text-sm text-muted-foreground mt-4 italic">
            Josh was diagnosed with autism and ADD at 39. Many in higher ed are still undiagnosed.
          </p>
        </Card>
      </section>
    </main>
  );
};