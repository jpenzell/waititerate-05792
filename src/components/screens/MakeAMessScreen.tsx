import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2, XCircle } from "lucide-react";

export const MakeAMessScreen = () => {
  const [revealedPrinciples, setRevealedPrinciples] = useState<number[]>([]);

  const principles = [
    {
      myth: "Perfect is the goal",
      reality: "Done is better than perfect",
      explanation: "When measurement is free, launch fast and let data guide refinement"
    },
    {
      myth: "Mistakes are expensive",
      reality: "Not learning is expensive",
      explanation: "AI catches issues immediately—failed experiments are cheap learning"
    },
    {
      myth: "Plan everything upfront",
      reality: "Plan the first step, measure the rest",
      explanation: "You can't predict what learners need—but you can measure what they struggle with"
    },
    {
      myth: "Stakeholders want polish",
      reality: "Stakeholders want impact",
      explanation: "Show improving metrics, not perfect content. Data beats decoration."
    }
  ];

  const togglePrinciple = (index: number) => {
    if (revealedPrinciples.includes(index)) {
      setRevealedPrinciples(revealedPrinciples.filter(i => i !== index));
    } else {
      setRevealedPrinciples([...revealedPrinciples, index]);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-12">
        <Badge className="mb-4">Philosophy Shift</Badge>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          Make a Mess (On Purpose)
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto">
          Permission to ship imperfect training—because you'll fix it tomorrow
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-4">
        {principles.map((principle, index) => (
          <Card 
            key={index}
            className={`transition-all duration-300 cursor-pointer ${
              revealedPrinciples.includes(index)
                ? 'border-2 border-primary shadow-xl'
                : 'border border-border hover:border-primary/50'
            }`}
            onClick={() => togglePrinciple(index)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 flex-1">
                  {!revealedPrinciples.includes(index) ? (
                    <>
                      <XCircle className="h-6 w-6 text-destructive flex-shrink-0" />
                      <p className="text-lg font-semibold text-destructive line-through">
                        {principle.myth}
                      </p>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                      <p className="text-lg font-semibold text-primary">
                        {principle.reality}
                      </p>
                    </>
                  )}
                </div>
                <Button 
                  variant={revealedPrinciples.includes(index) ? "default" : "outline"}
                  size="sm"
                >
                  {revealedPrinciples.includes(index) ? "Hide" : "Reveal"}
                </Button>
              </div>
              
              {revealedPrinciples.includes(index) && (
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border-l-4 border-primary animate-fade-in">
                  <p className="text-foreground/80 leading-relaxed">
                    {principle.explanation}
                  </p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary">
        <div className="flex items-start gap-4">
          <Sparkles className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              The Permission Slip
            </h3>
            <p className="text-lg text-foreground/80 leading-relaxed mb-4">
              In the old world, launching something imperfect was career suicide.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-4">
              In the AI world, <strong>not launching fast enough</strong> is career suicide.
            </p>
            <p className="text-xl font-semibold text-primary italic">
              "Your competitors aren't waiting for perfection. Neither should you."
            </p>
          </div>
        </div>
      </Card>

      <div className="text-center">
        <Button 
          size="lg"
          onClick={() => setRevealedPrinciples(
            revealedPrinciples.length === principles.length 
              ? [] 
              : principles.map((_, i) => i)
          )}
          className="text-lg px-8"
        >
          {revealedPrinciples.length === principles.length 
            ? "Hide All" 
            : "Reveal All Principles"}
        </Button>
      </div>
    </div>
  );
};