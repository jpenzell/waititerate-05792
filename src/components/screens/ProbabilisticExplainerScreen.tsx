import { Brain } from "lucide-react";
import { SlideShell } from "@/components/slide";
import { Card } from "@/components/ui/card";

/**
 * LD1.95 — Anthropic explainer video. "LLMs predict, they don't know."
 * Embedded YouTube; this deck is screenshare-only so we always show the
 * iframe (no participant fallback).
 */
export const ProbabilisticExplainerScreen = () => {
  return (
    <SlideShell tone="indigo" align="center" ariaLabel="LLMs predict, they don't know — Anthropic explainer">
      <div className="space-y-8">
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <Brain className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="text-sm md:text-base font-mono uppercase tracking-[0.25em] text-primary">
              Core concept · Anthropic
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
            LLMs predict. <span className="text-primary">They don't know.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-snug">
            Probability engines, not knowledge databases.
          </p>
        </header>

        <div className="max-w-5xl mx-auto aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/Bj9BD2D3DzA"
            title="Understanding Probabilistic AI — Anthropic"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <Card className="max-w-5xl mx-auto p-6 md:p-8 bg-card/70 border-l-8 border-l-primary/60">
          <p className="text-xl md:text-2xl text-foreground leading-snug">
            LLMs predict likely tokens based on statistical patterns — not certain truth.
            Extraordinarily fluent pattern-matchers, not fact databases.
          </p>
          <p className="mt-3 text-lg md:text-xl text-primary font-bold">
            → Treat all outputs as drafts to coach, not finished truth.
          </p>
        </Card>
      </div>
    </SlideShell>
  );
};