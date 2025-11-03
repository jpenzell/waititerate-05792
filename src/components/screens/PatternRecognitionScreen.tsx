import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Brain, TrendingUp } from "lucide-react";
import { PollWidget } from "@/components/PollWidget";

interface PatternRecognitionScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
  userId?: string;
}

export const PatternRecognitionScreen = ({ 
  isFacilitator = false, 
  sessionId, 
  userId 
}: PatternRecognitionScreenProps) => {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            Cognitive Diversity at Work
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Pattern Recognition & Perspective
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Different brains see different things—and that's a competitive advantage
          </p>
        </div>

        {/* Research Insight */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 animate-scale-in">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">The Science</h2>
              <p className="text-muted-foreground mb-4">
                Research shows autistic individuals often excel at <strong className="text-foreground">detail-oriented 
                pattern recognition</strong>, while neurotypical individuals tend toward <strong className="text-foreground">gestalt 
                (big-picture) processing</strong>.
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-background rounded border border-primary/20">
                  <p className="font-semibold text-primary mb-1">Autistic Processing</p>
                  <p className="text-sm text-muted-foreground">
                    Bottom-up: Notice small details first, then build to big picture
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-accent/20">
                  <p className="font-semibold text-accent mb-1">Neurotypical Processing</p>
                  <p className="text-sm text-muted-foreground">
                    Top-down: See overall pattern first, may miss subtle details
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-3 italic">
                "Neither approach is 'better'—they're complementary. Teams with both processing 
                styles catch more errors, spot more opportunities, and generate more innovative solutions."
              </p>
              <p className="text-xs text-muted-foreground">
                — Cognitive Neuroscience Research
              </p>
            </div>
          </div>
        </Card>

        {/* Interactive Demo */}
        {!showExplanation ? (
          <div className="mb-12">
            <Card className="p-12 bg-gradient-to-br from-background to-accent/5">
              <div className="text-center space-y-8">
                <h2 className="text-3xl font-bold text-foreground">
                  What Do You See First?
                </h2>
                
                {/* Duck-Rabbit Illusion */}
                <div className="max-w-md mx-auto">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center p-8 border-2 border-border">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Simple duck-rabbit silhouette */}
                      <path 
                        d="M 50,100 Q 60,60 100,60 Q 140,60 150,100 L 180,90 L 180,110 L 150,100 Q 140,140 100,140 Q 60,140 50,100 M 110,80 Q 115,75 120,80 Q 115,85 110,80" 
                        fill="currentColor"
                        className="text-foreground"
                      />
                      <circle cx="110" cy="80" r="4" fill="currentColor" className="text-foreground" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-lg text-muted-foreground">
                    Some people see a duck (facing right). Others see a rabbit (facing left). 
                    Some see both immediately. Some can't switch perspectives easily.
                  </p>
                  
                  {isFacilitator ? (
                    <Button 
                      onClick={() => setShowExplanation(true)}
                      size="lg"
                      className="text-lg"
                    >
                      Show Why This Matters
                    </Button>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      (Facilitator will reveal the insight when ready)
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="mb-12 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <h2 className="text-3xl font-bold text-center text-foreground mb-8">
                This Is Cognitive Diversity in Action
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                    <Brain className="h-7 w-7" />
                    Why Different Brains See Differently
                  </h3>
                  <ul className="space-y-4 text-base text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="text-primary text-2xl">•</span>
                      <span><strong className="text-foreground">Perceptual processing:</strong> Some brains prioritize local features, others global shapes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary text-2xl">•</span>
                      <span><strong className="text-foreground">Prior experience:</strong> Context shapes what you see first</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary text-2xl">•</span>
                      <span><strong className="text-foreground">Cognitive flexibility:</strong> Switching perspectives takes effort</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-accent mb-6 flex items-center gap-2">
                    <TrendingUp className="h-7 w-7" />
                    Why This Matters for Teams
                  </h3>
                  <ul className="space-y-4 text-base text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="text-accent text-2xl">•</span>
                      <span><strong className="text-foreground">QA Testing:</strong> Detail-focused testers catch edge cases</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent text-2xl">•</span>
                      <span><strong className="text-foreground">Innovation:</strong> Different perspectives = more creative solutions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent text-2xl">•</span>
                      <span><strong className="text-foreground">Risk Management:</strong> Diverse viewpoints identify blind spots</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Case Study Callback */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-lg transition-all border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-8 w-8 text-primary" />
                <h4 className="text-2xl font-bold text-foreground">SAP: 30% Faster QA</h4>
              </div>
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                Autistic QA testers complete repetitive testing tasks 30% faster with higher accuracy
              </p>
              <Badge className="bg-primary/10 text-primary border-primary/20 text-base px-3 py-1">
                Detail-Oriented Advantage
              </Badge>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="h-8 w-8 text-accent" />
                <h4 className="text-2xl font-bold text-foreground">Microsoft: 92% Success</h4>
              </div>
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                Skills-based hiring accommodates different cognitive styles
              </p>
              <Badge className="bg-accent/10 text-accent border-accent/20 text-base px-3 py-1">
                Process Redesign Impact
              </Badge>
            </Card>
          </div>

        {/* Key Takeaway */}
        <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-foreground">Build for Cognitive Diversity</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              When you design learning that respects different processing styles—<strong className="text-foreground">detail-focused 
              AND big-picture thinkers</strong>—you create environments where everyone can contribute their unique strengths.
            </p>
            <p className="text-base text-muted-foreground italic">
              That's not just good for inclusion. It's good for innovation.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};