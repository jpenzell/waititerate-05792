import { Brain, Sparkles, BookOpen, Activity } from "lucide-react";
import { SlideShell } from "@/components/slide";
import { Card } from "@/components/ui/card";

/**
 * LD3.85 — "Neurodivergent" is not one population. Differential effects of
 * AI by condition (ADHD, Autism, Dyslexia/SpLD, TBI). Synthesized from the
 * literature review.
 */
const rows = [
  {
    icon: Sparkles,
    label: "ADHD",
    sweet: "Task initiation, planning, brainstorming, structure",
    catch: "Strong at planning, weak at follow-through. The same prompt that breaks open a task can become a rabbit hole.",
    accent: "text-primary border-l-primary",
  },
  {
    icon: Brain,
    label: "Autism",
    sweet: "Predictable, low-judgment, asynchronous support: reading condensation, social rehearsal, communication prep",
    catch: "Risk of replacing authentic voice with automated masking. Justice-sensitivity friction with AI's 'functional unity' tone.",
    accent: "text-accent border-l-accent",
  },
  {
    icon: BookOpen,
    label: "Dyslexia / SpLD",
    sweet: "The strongest evidence base. Proofreading, explanation, simplification, TTS/OCR, drafting scaffolds.",
    catch: "Detector false-positives on formulaic writing. Free-tier models often weakest at reliable proofreading.",
    accent: "text-[hsl(38_85%_55%)] border-l-[hsl(38_85%_55%)]",
  },
  {
    icon: Activity,
    label: "TBI",
    sweet: "Support overlap is real: attention, memory, fatigue, executive function.",
    catch: "Direct higher-ed AI evidence is strikingly thin. Most 'neurodiversity' conversations skip this group entirely.",
    accent: "text-destructive border-l-destructive",
  },
];

export const DifferentialByConditionScreen = () => {
  return (
    <SlideShell tone="indigo" align="center" ariaLabel="AI helps each ND group differently">
      <div className="space-y-10">
        <header className="text-center space-y-4">
          <p className="text-lg md:text-xl font-mono uppercase tracking-[0.3em] text-muted-foreground">
            Chapter 03 · Feel it
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
            "Neurodivergent" is <span className="text-primary">not one population.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-snug">
            AI helps each group differently — and sometimes hurts in ways that look like help.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-5">
          {rows.map(({ icon: Icon, label, sweet, catch: caveat, accent }) => (
            <Card key={label} className={`p-5 md:p-6 bg-card/80 border-l-8 ${accent.split(" ")[1]}`}>
              <div className="flex items-center gap-3 mb-3">
                <Icon className={`h-8 w-8 ${accent.split(" ")[0]}`} aria-hidden="true" />
                <h2 className="text-2xl md:text-3xl font-black text-foreground">{label}</h2>
              </div>
              <p className="text-base md:text-lg text-foreground/90 leading-snug mb-3">
                <span className="font-mono uppercase tracking-[0.2em] text-xs text-muted-foreground block mb-1">Sweet spot</span>
                {sweet}
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-snug">
                <span className="font-mono uppercase tracking-[0.2em] text-xs text-muted-foreground block mb-1">Watch-out</span>
                {caveat}
              </p>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm md:text-base font-mono uppercase tracking-[0.25em] text-muted-foreground">
          Sources · Atcheson 2025 · Pierrès 2024 · Zhao 2025 · Ma 2026
        </p>
      </div>
    </SlideShell>
  );
};