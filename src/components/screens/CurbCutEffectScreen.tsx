import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Accessibility, CheckCircle2 } from "lucide-react";
import { PollWidget } from "@/components/PollWidget";

interface CurbCutEffectScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
  userId?: string;
}

export const CurbCutEffectScreen = ({ 
  isFacilitator = false, 
  sessionId, 
  userId 
}: CurbCutEffectScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4 text-base px-4 py-2">
            Universal Design Principle
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            The Curb-Cut Effect
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Designing for neurodivergent learners improves outcomes for <strong className="text-foreground">everyone</strong>
          </p>
        </div>

        {/* ROI Impact Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 text-center">
            <div className="text-5xl font-bold text-primary mb-3">80%+</div>
            <p className="text-lg text-foreground font-semibold mb-2">Universal Adoption</p>
            <p className="text-base text-muted-foreground">
              Features designed for 15-20% become preferred by the majority
            </p>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent/30 text-center">
            <div className="text-5xl font-bold text-accent mb-3">71%</div>
            <p className="text-lg text-foreground font-semibold mb-2">Use Captions</p>
            <p className="text-base text-muted-foreground">
              Of all viewers use closed captions, not just deaf/hard-of-hearing
            </p>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 text-center">
            <div className="text-5xl font-bold text-primary mb-3">30%</div>
            <p className="text-lg text-foreground font-semibold mb-2">Performance Boost</p>
            <p className="text-base text-muted-foreground">
              Cognitive load reduction improves completion rates for all learners
            </p>
          </Card>
        </div>

        {/* Origin Story - Streamlined */}
        <Card className="p-10 mb-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 animate-scale-in">
          <div className="flex items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Accessibility className="h-10 w-10 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">The Original Curb Cut (1970s)</h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Activists fought for sloped curbs to help wheelchair users. City planners called it a "special accommodation."
              </p>
              <p className="text-xl text-foreground leading-relaxed">
                <strong className="text-2xl">What happened?</strong> Everyone benefited: parents with strollers, travelers with luggage, 
                delivery workers, cyclists, elderly pedestrians—and yes, wheelchair users.
              </p>
            </div>
          </div>
        </Card>

        {/* Key Principle */}
        <Card className="p-12 mb-12 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
          <div className="text-center space-y-6">
            <h3 className="text-4xl font-bold text-foreground">The Principle</h3>
            <div className="flex items-center justify-center gap-6 text-3xl font-semibold flex-wrap">
              <span className="text-primary">Design for the Margins</span>
              <ArrowRight className="h-10 w-10 text-accent" />
              <span className="text-accent">Improve the Center</span>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              When you solve for cognitive diversity, you create better learning for everyone.
            </p>
          </div>
        </Card>

        {/* Poll */}
        {isFacilitator && sessionId && userId && (
          <div className="max-w-4xl mx-auto">
            <PollWidget
              sessionId={sessionId}
              slideId="LD1.0"
              userId={userId}
              isPresenter={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};