import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Shuffle, Scale } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            Core Framework
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Structured Freedom
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Balance between guidance and autonomy reduces cognitive load while respecting learner agency
          </p>
        </div>

        {/* Three-Column Comparison */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Too Rigid */}
          <Card className="p-8 bg-destructive/5 border-destructive/20 hover:shadow-lg transition-all animate-scale-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
                <Lock className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Too Rigid</h3>
              <p className="text-sm text-muted-foreground italic">All Structure, No Freedom</p>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-destructive">✗</span>
                <span>One path for everyone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">✗</span>
                <span>No learner choice</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">✗</span>
                <span>Fixed pace for all</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">✗</span>
                <span>Can't skip ahead</span>
              </li>
            </ul>
            <div className="mt-6 p-3 bg-muted rounded text-xs">
              <strong>Problem:</strong> Overwhelms neurodivergent learners who need flexibility
            </div>
          </Card>

          {/* Too Chaotic */}
          <Card className="p-8 bg-destructive/5 border-destructive/20 hover:shadow-lg transition-all animate-scale-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
                <Shuffle className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Too Chaotic</h3>
              <p className="text-sm text-muted-foreground italic">All Freedom, No Structure</p>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-destructive">✗</span>
                <span>No clear objectives</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">✗</span>
                <span>Infinite options</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">✗</span>
                <span>No guidance or scaffolding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">✗</span>
                <span>Unclear success criteria</span>
              </li>
            </ul>
            <div className="mt-6 p-3 bg-muted rounded text-xs">
              <strong>Problem:</strong> Creates high cognitive load—too many decisions to make
            </div>
          </Card>

          {/* Structured Freedom */}
          <Card className="p-8 bg-primary/5 border-primary/20 hover:shadow-xl transition-all animate-scale-in border-2">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Scale className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Structured Freedom</h3>
              <p className="text-sm text-muted-foreground italic">Balanced Design</p>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong>Clear boundaries</strong> (mastery goals)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong>Meaningful choices</strong> (path to mastery)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong>Adaptive pacing</strong> (self-directed)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong>Scaffolded support</strong> (just enough help)</span>
              </li>
            </ul>
            <div className="mt-6 p-3 bg-primary/10 rounded text-xs">
              <strong>Result:</strong> Works for neurotypical AND neurodivergent learners
            </div>
          </Card>
        </div>

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