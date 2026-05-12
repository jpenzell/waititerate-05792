import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ear, Brain, Languages, Focus, Eye, MessageSquare } from "lucide-react";

const cases = [
  { icon: Ear, who: "For students who can't process audio lectures",
    use: "AI as live transcript + on-demand summary",
    example: "\"Summarize this lecture transcript in 5 bullet points at an 8th-grade reading level.\"" },
  { icon: Brain, who: "For students with executive-function challenges",
    use: "AI as planning coach",
    example: "\"Break this assignment into 4 sub-tasks I can do in 30-min sessions over the next week.\"" },
  { icon: Languages, who: "For ESL / multilingual students",
    use: "AI as translator + glossary",
    example: "\"Explain this passage in plain English. List the 5 hardest words and their meanings.\"" },
  { icon: Focus, who: "For ADHD students",
    use: "AI as focus partner",
    example: "\"Quiz me on this chapter. Ask one question, wait for my answer, then react before the next.\"" },
  { icon: Eye, who: "For dyslexic / low-vision students",
    use: "AI as reformatter",
    example: "\"Reformat this dense paragraph as a numbered list. Increase line spacing in your response.\"" },
  { icon: MessageSquare, who: "For autistic students or social-cue processing",
    use: "AI as social interpreter",
    example: "\"Here's an email from my professor. What is she actually asking? What tone is appropriate to reply?\"" },
];

export const AIAccommodationScreen = () => {
  return (
    <main className="min-h-screen px-8 py-10 animate-fade-in">
      <section className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="text-sm">AI as cognitive accommodation</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Not "productivity tool." <span className="text-primary">Prosthetic.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Glasses extend vision. Calculators extend arithmetic. AI extends the
            cognitive functions your students don't get equally — and you can teach them how.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <Card key={i} className="p-5 space-y-3 border-l-4 border-l-accent/60">
              <div className="flex items-start gap-3">
                <div className="bg-accent/10 p-2 rounded-md flex-shrink-0">
                  <c.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">{c.who}</p>
                  <p className="text-base font-bold text-foreground mt-1">{c.use}</p>
                </div>
              </div>
              <div className="text-xs text-foreground/80 italic bg-muted/30 rounded p-2 leading-relaxed">
                {c.example}
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/5 border-2 border-primary/30 text-center">
          <p className="text-lg md:text-xl text-foreground leading-relaxed">
            Teaching students <em>how</em> to use AI as accommodation is itself accessible teaching.
          </p>
        </Card>
      </section>
    </main>
  );
};