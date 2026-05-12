import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Lightbulb, ArrowRight } from "lucide-react";

export const AcademicIntegrityScreen = () => {
  return (
    <main className="min-h-screen px-8 py-10 animate-fade-in">
      <section className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="text-sm">Let's name the elephant</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            "But isn't this just cheating?"
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Every faculty AI conversation eventually lands here. Let's reframe before we go further.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 border-l-4 border-l-destructive/60 space-y-4">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-7 w-7 text-destructive" />
              <h3 className="text-2xl font-bold">The fear</h3>
            </div>
            <ul className="space-y-3 text-base text-foreground/90">
              <li>• Students will use AI to skip the thinking</li>
              <li>• I can't tell what's theirs anymore</li>
              <li>• Detectors don't work — and punish ESL students</li>
              <li>• My assignments feel obsolete overnight</li>
            </ul>
          </Card>

          <Card className="p-8 border-l-4 border-l-primary space-y-4">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-7 w-7 text-primary" />
              <h3 className="text-2xl font-bold">The reframe</h3>
            </div>
            <ul className="space-y-3 text-base text-foreground/90">
              <li>• Calculators didn't end math — they raised the floor</li>
              <li>• Design assignments AI <em>can't</em> shortcut: process, defense, in-class</li>
              <li>• Teach <strong>with</strong> AI, not against it — make thinking visible</li>
              <li>• Use AI yourself for the boring 80% so you can teach the human 20%</li>
            </ul>
          </Card>
        </div>

        <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/5 border-2 border-primary/30">
          <div className="flex items-start gap-4">
            <ArrowRight className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed">
                The next exercise flips the usual question.
              </p>
              <p className="text-base md:text-lg text-muted-foreground mt-2 leading-relaxed">
                Instead of asking "did the student use AI?" — we'll ask <em>the student to teach the AI</em>.
                If they can teach it well enough to pass the quiz, they understand the material.
                That's the Feynman Technique, with a 21st-century partner.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
};