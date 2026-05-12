import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageCircle, Clock, Volume2 } from "lucide-react";

const items = [
  {
    icon: Eye,
    finding: "~3% of people have aphantasia (no mental imagery)",
    classroom: "When you say \"picture a triangle on the diagonal,\" some students hear words. Pair every visual description with an actual image.",
  },
  {
    icon: MessageCircle,
    finding: "Inner-voice readers vs. silent readers",
    classroom: "A student who reads silently isn't necessarily comprehending less — they may be processing faster. Don't equate sub-vocalizing with engagement.",
  },
  {
    icon: Clock,
    finding: "Time perception varies by hours, not minutes",
    classroom: "Your ADHD students aren't disrespecting deadlines. Build interim checkpoints, not just a final due date.",
  },
  {
    icon: Volume2,
    finding: "Sensory overload thresholds vary 10×",
    classroom: "The student who won't speak in class may not be \"shy\" — they may be at sensory capacity. Offer written-response alternatives for participation grades.",
  },
];

export const FacultyTranslationScreen = () => {
  return (
    <main className="min-h-screen px-8 py-10 animate-fade-in">
      <section className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="text-sm">Now do it for your students</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            What you just experienced is in your classroom too
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Every cognitive variation we just made visible — your students bring with them.
            Here's what changes when you teach as if that's true.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {items.map((it, i) => (
            <Card key={i} className="p-6 space-y-4 border-l-4 border-l-primary/60">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-md flex-shrink-0">
                  <it.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent font-mono mb-1">What we proved</p>
                  <p className="text-base font-semibold text-foreground">{it.finding}</p>
                </div>
              </div>
              <div className="border-t border-border/50 pt-3">
                <p className="text-xs uppercase tracking-wider text-primary font-mono mb-1">In your classroom</p>
                <p className="text-base text-foreground/90 leading-relaxed">{it.classroom}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};