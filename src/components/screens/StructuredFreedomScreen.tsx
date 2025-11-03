import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Target, Unlock, Shield, Zap } from "lucide-react";
import { PollWidget } from "@/components/PollWidget";

interface StructuredFreedomScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
  userId?: string;
}

export const StructuredFreedomScreen = ({ 
  isFacilitator = false, 
  sessionId, 
  userId 
}: StructuredFreedomScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Design Philosophy
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Structured Freedom
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            How clear constraints enable creativity, experimentation, and cognitive accessibility
          </p>
        </div>

        {/* Visual Metaphor */}
        <Card className="p-12 mb-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 animate-scale-in">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">The Trellis & Vine</h2>
              <p className="text-lg text-muted-foreground">
                A vine without a trellis sprawls chaotically—unable to grow upward, vulnerable to wind. But with a strong structure, the vine thrives, reaching sunlight while maintaining its unique shape.
              </p>
              <p className="text-base text-foreground/80">
                <strong>The structure doesn't dictate the vine's growth—it enables it.</strong>
              </p>
              <div className="pt-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Structure = Support, Not Control
                </Badge>
              </div>
            </div>

            {/* Trellis Visual */}
            <div className="relative h-96 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg border-2 border-border flex items-center justify-center">
              <svg viewBox="0 0 200 300" className="w-full h-full p-8">
                {/* Trellis structure */}
                <line x1="50" y1="0" x2="50" y2="300" stroke="currentColor" strokeWidth="3" className="text-border" />
                <line x1="100" y1="0" x2="100" y2="300" stroke="currentColor" strokeWidth="3" className="text-border" />
                <line x1="150" y1="0" x2="150" y2="300" stroke="currentColor" strokeWidth="3" className="text-border" />
                <line x1="0" y1="75" x2="200" y2="75" stroke="currentColor" strokeWidth="2" className="text-border" />
                <line x1="0" y1="150" x2="200" y2="150" stroke="currentColor" strokeWidth="2" className="text-border" />
                <line x1="0" y1="225" x2="200" y2="225" stroke="currentColor" strokeWidth="2" className="text-border" />
                
                {/* Vine growing organically */}
                <path 
                  d="M 50,250 Q 75,225 100,200 Q 125,175 150,150 Q 125,125 100,100 Q 85,85 70,70 Q 60,50 55,30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-primary"
                />
                
                {/* Leaves */}
                <ellipse cx="55" cy="30" rx="8" ry="12" fill="currentColor" className="text-accent opacity-80" />
                <ellipse cx="70" cy="70" rx="10" ry="14" fill="currentColor" className="text-accent opacity-80" />
                <ellipse cx="100" cy="100" rx="12" ry="16" fill="currentColor" className="text-accent opacity-80" />
                <ellipse cx="150" cy="150" rx="10" ry="14" fill="currentColor" className="text-accent opacity-80" />
                <ellipse cx="100" cy="200" rx="8" ry="12" fill="currentColor" className="text-accent opacity-80" />
              </svg>
            </div>
          </div>
        </Card>

        {/* Framework Grid - Optimized for Screenshare */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">The Four Dimensions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-primary/5 border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-7 w-7 text-primary" />
                <h3 className="text-2xl font-bold text-primary">Cognitive</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-lg text-foreground mb-2">Structure:</p>
                  <ul className="space-y-2 text-base text-muted-foreground">
                    <li>• Clear learning objectives</li>
                    <li>• Scaffolding & chunking</li>
                    <li>• Predictable pacing</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-lg text-accent mb-2">Freedom:</p>
                  <ul className="space-y-2 text-base text-muted-foreground">
                    <li>• Self-directed exploration</li>
                    <li>• Multiple learning paths</li>
                    <li>• Choice in format</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-accent/5 border-2 border-accent/20">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-7 w-7 text-accent" />
                <h3 className="text-2xl font-bold text-accent">Emotional</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-lg text-foreground mb-2">Structure:</p>
                  <ul className="space-y-2 text-base text-muted-foreground">
                    <li>• Predictable rhythm</li>
                    <li>• Clear expectations</li>
                    <li>• Safe-to-fail environment</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-lg text-accent mb-2">Freedom:</p>
                  <ul className="space-y-2 text-base text-muted-foreground">
                    <li>• Space for divergence</li>
                    <li>• Celebrate perspectives</li>
                    <li>• Psychological safety</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Unlock className="h-7 w-7 text-primary" />
                <h3 className="text-2xl font-bold text-primary">Environmental</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-lg text-foreground mb-2">Structure:</p>
                  <ul className="space-y-2 text-base text-muted-foreground">
                    <li>• Sensory-safe defaults</li>
                    <li>• Accessible platforms</li>
                    <li>• Consistent navigation</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-lg text-accent mb-2">Freedom:</p>
                  <ul className="space-y-2 text-base text-muted-foreground">
                    <li>• Flexible modes (visual/audio)</li>
                    <li>• Control over pace</li>
                    <li>• Multiple participation options</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-accent/5 border-2 border-accent/20">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-7 w-7 text-accent" />
                <h3 className="text-2xl font-bold text-accent">AI Collaboration</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-lg text-foreground mb-2">Structure:</p>
                  <ul className="space-y-2 text-base text-muted-foreground">
                    <li>• Guardrails & constraints</li>
                    <li>• Prompt templates</li>
                    <li>• Quality criteria</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-lg text-accent mb-2">Freedom:</p>
                  <ul className="space-y-2 text-base text-muted-foreground">
                    <li>• Adaptive co-creation</li>
                    <li>• Personalized pathways</li>
                    <li>• Learner-driven iteration</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Real-World Examples */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Structured Freedom in Action
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-8 hover:shadow-lg transition-all border-2 border-primary/20">
              <h4 className="text-2xl font-bold text-primary mb-4">LEGO</h4>
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                <strong className="text-foreground text-lg">Structure:</strong> Step-by-step instructions
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                <strong className="text-foreground text-lg">Freedom:</strong> Free play after completion
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all border-2 border-primary/20">
              <h4 className="text-2xl font-bold text-primary mb-4">Khan Academy</h4>
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                <strong className="text-foreground text-lg">Structure:</strong> Mastery-based progression (80%)
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                <strong className="text-foreground text-lg">Freedom:</strong> Self-paced learning
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all border-2 border-primary/20">
              <h4 className="text-2xl font-bold text-primary mb-4">Duolingo</h4>
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                <strong className="text-foreground text-lg">Structure:</strong> Gamified daily goals
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                <strong className="text-foreground text-lg">Freedom:</strong> Pick your own topics
              </p>
            </Card>
          </div>
        </div>

        {/* Poll */}
        {isFacilitator && sessionId && userId && (
          <div className="max-w-4xl mx-auto">
            <PollWidget
              sessionId={sessionId}
              slideId="LD5.5"
              userId={userId}
              isPresenter={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};