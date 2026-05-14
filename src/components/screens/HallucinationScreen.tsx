import { AlertTriangle } from "lucide-react";
import { SlideShell, SlideTitle } from "@/components/slide";
import { Card } from "@/components/ui/card";

/**
 * AI hallucinates — by design. Sits in Act 4 right after the live elephant
 * estimate, before the Anthropic explainer. The point: even the best models,
 * even when they sound certain, are predicting — not retrieving truth.
 */
export const HallucinationScreen = () => (
  <SlideShell tone="amber" align="center" ariaLabel="AI always hallucinates">
    <div className="space-y-12">
      <SlideTitle kicker="The thing nobody can engineer away">
        AI <span className="text-accent">hallucinates.</span>
        <br />
        Every model. Every time.
      </SlideTitle>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-8 bg-card/70 border-l-8 border-l-accent/60 space-y-3">
          <AlertTriangle className="h-9 w-9 text-accent" aria-hidden="true" />
          <p className="text-2xl font-bold text-foreground leading-tight">
            It's not a bug.
          </p>
          <p className="text-lg text-muted-foreground leading-snug">
            LLMs predict the next likely token. Plausibility is the goal — not
            truth.
          </p>
        </Card>

        <Card className="p-8 bg-card/70 border-l-8 border-l-primary/60 space-y-3">
          <AlertTriangle className="h-9 w-9 text-primary" aria-hidden="true" />
          <p className="text-2xl font-bold text-foreground leading-tight">
            Confidence ≠ correctness.
          </p>
          <p className="text-lg text-muted-foreground leading-snug">
            The model sounds equally sure when it's right and when it's
            inventing a citation.
          </p>
        </Card>

        <Card className="p-8 bg-card/70 border-l-8 border-l-destructive/60 space-y-3">
          <AlertTriangle className="h-9 w-9 text-destructive" aria-hidden="true" />
          <p className="text-2xl font-bold text-foreground leading-tight">
            No model is exempt.
          </p>
          <p className="text-lg text-muted-foreground leading-snug">
            GPT-5, Gemini 3, Claude — all of them. Bigger models hallucinate
            more confidently, not less often.
          </p>
        </Card>
      </div>

      <Card className="p-8 md:p-10 bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent/30 max-w-5xl mx-auto">
        <p className="text-2xl md:text-3xl font-semibold text-foreground text-center leading-snug">
          Treat every AI output as a <span className="text-accent">draft to verify</span>,
          {" "}not a fact to trust.
        </p>
      </Card>
    </div>
  </SlideShell>
);
