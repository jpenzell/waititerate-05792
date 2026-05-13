import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Coffee } from "lucide-react";
import { toast } from "sonner";

const prompts = [
  {
    title: "Rewrite my learning outcomes for accessibility",
    body: `Here are my course learning outcomes:\n[paste outcomes]\n\nRewrite each one so it:\n1. Uses concrete, observable verbs (Bloom's taxonomy)\n2. Names how a student could DEMONSTRATE it in three different ways (written, oral, applied)\n3. Removes jargon a first-generation college student wouldn't recognize\n4. Adds one sentence explaining why this outcome matters in the real world.`,
    use: "Syllabus week, course redesign",
  },
  {
    title: "Generate misconception-targeted quiz questions",
    body: `Topic: [paste topic]\nMy students consistently misunderstand: [paste 1-2 misconceptions]\n\nWrite 5 multiple-choice questions where:\n- Each WRONG answer reflects a real student misconception (not a random distractor)\n- Each correct answer requires applying the concept, not just recalling it\n- Include a one-sentence explanation for each answer I can show students after.`,
    use: "Low-stakes formative assessment",
  },
  {
    title: "Make this assignment AI-resistant (and better)",
    body: `Here is my current assignment:\n[paste assignment]\n\nRedesign it so:\n1. The PROCESS is graded, not just the final product (drafts, reflections, peer feedback)\n2. Students must defend their reasoning verbally OR in a 60-second video\n3. It connects to a local context (Cabarrus / Rowan County, their workplace, current events)\n4. A student using AI to do the whole thing would actually fail — but a student using AI as a tutor would thrive.`,
    use: "Assignment redesign, end of unit",
  },
  {
    title: "Be my struggling student",
    body: `Act as a first-generation community college student in my [course] class. You haven't taken this subject before, English is your second language, and you work 30 hours a week.\n\nI'm about to teach: [paste lesson concept]\n\nAsk me the THREE questions you'd most likely get stuck on, in the order you'd ask them. Then tell me which part of how I'd probably explain it would lose you.`,
    use: "Lesson prep, the night before",
  },
];

export const MondayPromptsScreen = () => {
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Prompt copied — paste into ChatGPT, Claude, or Copilot");
  };

  return (
    <main className="min-h-screen px-8 py-10 animate-fade-in">
      <section className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <Coffee className="h-14 w-14 text-accent" />
            <h1 className="text-5xl md:text-7xl font-bold text-foreground">
              Monday-morning prompts
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-muted-foreground">
            Four prompts. Copy. Paste. Done.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {prompts.map((p, i) => (
            <Card key={i} className="p-8 flex flex-col gap-4 border-l-8 border-l-primary/60">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-6xl font-bold text-primary/30 leading-none">{i + 1}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-2 leading-tight">{p.title}</h3>
                  <p className="text-base uppercase tracking-wider text-accent font-mono mt-2">
                    {p.use}
                  </p>
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => copy(p.body)}
                  aria-label={`Copy prompt: ${p.title}`}
                  className="text-lg"
                >
                  <Copy className="h-5 w-5 mr-2" /> Copy
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-primary/20 text-center">
          <p className="text-3xl md:text-4xl font-bold text-foreground">
            Pick <span className="text-primary">one</span>. Try it Monday.
          </p>
        </Card>
      </section>
    </main>
  );
};