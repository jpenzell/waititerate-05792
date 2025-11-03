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

        {/* Framework Table */}
        <Card className="p-8 mb-12 bg-background border-2 border-border">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">The Four Dimensions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left p-4 text-foreground font-semibold">Dimension</th>
                  <th className="text-left p-4 text-primary font-semibold">Structure (The Trellis)</th>
                  <th className="text-left p-4 text-accent font-semibold">Freedom (The Vine)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-muted-foreground" />
                      <span className="font-semibold text-foreground">Cognitive</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <ul className="space-y-1 text-sm">
                      <li>• Clear learning objectives</li>
                      <li>• Scaffolding & chunking</li>
                      <li>• Predictable pacing</li>
                    </ul>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <ul className="space-y-1 text-sm">
                      <li>• Self-directed exploration</li>
                      <li>• Multiple learning paths</li>
                      <li>• Choice in assessment format</li>
                    </ul>
                  </td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <span className="font-semibold text-foreground">Emotional</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <ul className="space-y-1 text-sm">
                      <li>• Predictable rhythm</li>
                      <li>• Clear norms & expectations</li>
                      <li>• Safe-to-fail environment</li>
                    </ul>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <ul className="space-y-1 text-sm">
                      <li>• Space for divergence</li>
                      <li>• Celebrate unique perspectives</li>
                      <li>• Psychological safety</li>
                    </ul>
                  </td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Unlock className="h-5 w-5 text-muted-foreground" />
                      <span className="font-semibold text-foreground">Environmental</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <ul className="space-y-1 text-sm">
                      <li>• Sensory-safe defaults</li>
                      <li>• Accessible platforms (WCAG)</li>
                      <li>• Consistent navigation</li>
                    </ul>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <ul className="space-y-1 text-sm">
                      <li>• Flexible modes (visual, audio, text)</li>
                      <li>• Control over environment (pace, breaks)</li>
                      <li>• Multiple participation options</li>
                    </ul>
                  </td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-muted-foreground" />
                      <span className="font-semibold text-foreground">AI Collaboration</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <ul className="space-y-1 text-sm">
                      <li>• Guardrails (context, constraints)</li>
                      <li>• Prompt templates</li>
                      <li>• Quality criteria</li>
                    </ul>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <ul className="space-y-1 text-sm">
                      <li>• Adaptive co-creation</li>
                      <li>• Personalized pathways</li>
                      <li>• Learner-driven iteration</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Real-World Examples */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Structured Freedom in Action
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-all">
              <h4 className="text-lg font-bold text-primary mb-2">LEGO</h4>
              <p className="text-sm text-muted-foreground mb-3">
                <strong className="text-foreground">Structure:</strong> Step-by-step instructions
              </p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Freedom:</strong> Free play after completion
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <h4 className="text-lg font-bold text-primary mb-2">Khan Academy</h4>
              <p className="text-sm text-muted-foreground mb-3">
                <strong className="text-foreground">Structure:</strong> Mastery-based progression (80% to advance)
              </p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Freedom:</strong> Self-paced, can skip or repeat
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <h4 className="text-lg font-bold text-primary mb-2">Duolingo</h4>
              <p className="text-sm text-muted-foreground mb-3">
                <strong className="text-foreground">Structure:</strong> Gamified daily goals
              </p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Freedom:</strong> Adaptive placement test, pick topics
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