import { Card } from "@/components/ui/card";

/**
 * Cognitive Diversity in Action — payoff slide for the duck/rabbit image
 * on the previous slide. Bottom-up vs top-down processing, why it matters.
 */
export const CognitiveDiversityScreen = () => (
  <main
    className="min-h-screen flex items-center justify-center p-4 md:p-8 animate-fade-in"
    role="main"
  >
    <section className="max-w-6xl w-full space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          This Is Cognitive Diversity in Action
        </h1>
        <p className="text-xl text-muted-foreground">
          Different brains notice different patterns first
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-accent/10 border-2 border-accent space-y-4">
          <h2 className="text-2xl font-bold text-foreground">The Science</h2>
          <div className="space-y-3 text-lg">
            <div className="p-4 bg-background rounded border border-primary/20">
              <p className="font-semibold text-primary mb-1">Autistic Processing</p>
              <p className="text-sm text-muted-foreground">
                Bottom-up: Notice details first, build to big picture
              </p>
            </div>
            <div className="p-4 bg-background rounded border border-accent/20">
              <p className="font-semibold text-accent mb-1">Neurotypical Processing</p>
              <p className="text-sm text-muted-foreground">
                Top-down: See overall pattern first
              </p>
            </div>
            <p className="text-base text-muted-foreground italic pt-2">
              Neither is "better"—they're complementary strengths
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-primary/10 border-2 border-primary/30 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Why This Matters</h2>
          <ul className="space-y-3 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold text-2xl">→</span>
              <span><strong>QA Testing:</strong> Detail-focused minds catch edge cases</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold text-2xl">→</span>
              <span><strong>Innovation:</strong> Different perspectives = creative solutions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold text-2xl">→</span>
              <span><strong>Risk Management:</strong> Diverse viewpoints spot blind spots</span>
            </li>
          </ul>
        </Card>
      </div>

      <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
        <div className="text-center space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">
            Design Learning for Cognitive Diversity
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            When you respect different processing styles—detail-focused <em>and</em>{" "}
            big-picture thinkers—everyone can contribute their unique strengths.
          </p>
          <p className="text-lg text-primary font-semibold">
            That's not just inclusion. That's innovation.
          </p>
        </div>
      </Card>
    </section>
  </main>
);