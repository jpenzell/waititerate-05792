import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, ArrowRight } from "lucide-react";

interface CognitiveTransitionScreenProps {
  isFacilitator?: boolean;
}

export const CognitiveTransitionScreen = ({ isFacilitator = false }: CognitiveTransitionScreenProps) => {
  // Both facilitator and participant see the same content for this transition slide
  return (
    <div className="h-screen flex items-center justify-center p-6 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <Badge variant="outline" className="mb-4">
            <ArrowRight className="h-4 w-4 mr-2" />
            Transition
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            But Here's the Question...
          </h1>
        </div>

        <Card className="p-10 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30">
          <div className="flex items-start gap-6 mb-8">
            <Sparkles className="h-12 w-12 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">What We Just Discovered</h2>
              <p className="text-lg text-muted-foreground">
                AI can help us see patterns humans miss. It can extract hundreds of data points from a single photo. 
                That's <span className="font-semibold text-foreground">measurement abundance</span>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <Brain className="h-12 w-12 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">The Critical Question</h2>
              <p className="text-xl text-foreground font-semibold mb-3">
                What if the humans <span className="italic">receiving</span> that data process information in fundamentally <span className="text-amber-500">different</span> ways?
              </p>
              <p className="text-lg text-muted-foreground">
                All the data in the world won't help if we don't understand how different minds work.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30">
          <p className="text-center text-xl text-foreground">
            <span className="font-bold text-amber-500">Let's discover something profound</span> about how humans actually think...
          </p>
        </Card>
      </div>
    </div>
  );
};
