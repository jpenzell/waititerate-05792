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
          <Badge variant="secondary" className="mb-4">
            Universal Design Principle
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            The Curb-Cut Effect
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Designing for neurodivergent learners improves outcomes for <strong>everyone</strong>
          </p>
        </div>

        {/* Origin Story */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 animate-scale-in">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Accessibility className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">The Original Curb Cut</h2>
              <p className="text-lg text-muted-foreground mb-4">
                In the 1970s, activists fought for sloped curbs to help wheelchair users navigate sidewalks. 
                City planners were reluctant—it seemed like a "special accommodation."
              </p>
              <p className="text-lg text-foreground">
                <strong>What happened?</strong> Everyone benefited: parents with strollers, travelers with luggage, 
                delivery workers, cyclists, elderly pedestrians, and yes—wheelchair users.
              </p>
            </div>
          </div>
        </Card>

        {/* The L&D Parallel */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Learning Design "Curb Cuts"
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Closed Captions */}
            <Card className="p-8 hover:shadow-lg transition-all border-2 border-primary/20">
              <div className="mb-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 text-base px-4 py-2">
                  Closed Captions
                </Badge>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-lg mb-1">Designed for:</p>
                    <p className="text-base text-muted-foreground">Deaf/hard-of-hearing learners</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-lg mb-1">Also helps:</p>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      ESL learners, noisy environments, auditory processing differences
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Chunked Content */}
            <Card className="p-8 hover:shadow-lg transition-all border-2 border-primary/20">
              <div className="mb-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 text-base px-4 py-2">
                  Chunked Content
                </Badge>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-lg mb-1">Designed for:</p>
                    <p className="text-base text-muted-foreground">ADHD, working memory differences</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-lg mb-1">Also helps:</p>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Everyone's cognitive load, mobile learners
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Multiple Representations */}
            <Card className="p-8 hover:shadow-lg transition-all border-2 border-primary/20">
              <div className="mb-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 text-base px-4 py-2">
                  Multiple Formats
                </Badge>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-lg mb-1">Designed for:</p>
                    <p className="text-base text-muted-foreground">Dyslexia, visual processing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-lg mb-1">Also helps:</p>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      All learning styles, reinforcement
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Key Insight */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-foreground">The Principle</h3>
            <div className="flex items-center justify-center gap-4 text-2xl font-semibold flex-wrap">
              <span className="text-primary">Design for the Margins</span>
              <ArrowRight className="h-8 w-8 text-accent" />
              <span className="text-accent">Improve the Center</span>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Accessibility features designed for 15-20% of learners often become 
              <strong className="text-foreground"> preferred by 80%+</strong> of all users
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