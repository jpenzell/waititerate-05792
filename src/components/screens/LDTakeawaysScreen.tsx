import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Activity, Rocket, RefreshCw } from "lucide-react";

export const LDTakeawaysScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            Design with Difference
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Your Action Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Four shifts to make learning work for all minds
          </p>
        </div>

        {/* Four Actionable Shifts */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-8 hover:shadow-lg transition-shadow duration-300 animate-scale-in border-l-4 border-l-primary">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  1. Audit for Cognitive Load
                </h3>
                <p className="text-muted-foreground mb-4">
                  Review one training module and identify where you can reduce extraneous load.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span>Remove unnecessary animations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span>Chunk dense text into bullets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span>Simplify visual clutter</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow duration-300 animate-scale-in border-l-4 border-l-accent">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-accent/10 p-3 rounded-lg">
                <Activity className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  2. Add One Representation
                </h3>
                <p className="text-muted-foreground mb-4">
                  Pick one text-only lesson and add an alternative format.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-accent" />
                    <span>Add audio narration or text-to-speech</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-accent" />
                    <span>Include visual diagrams or infographics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-accent" />
                    <span>Create an interactive demo or simulation</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow duration-300 animate-scale-in border-l-4 border-l-primary">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  3. Experiment with Structured Freedom
                </h3>
                <p className="text-muted-foreground mb-4">
                  Design one activity with clear boundaries AND meaningful choices.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span>"Pick 3 of 5 case studies to analyze"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span>"Choose your own learning path to mastery"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span>"Demonstrate understanding in any format"</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow duration-300 animate-scale-in border-l-4 border-l-accent">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-accent/10 p-3 rounded-lg">
                <RefreshCw className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  4. Test with Diverse Learners
                </h3>
                <p className="text-muted-foreground mb-4">
                  Recruit 2-3 neurodivergent beta testers for your next pilot.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-accent" />
                    <span>Ask: "What barriers did you encounter?"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-accent" />
                    <span>Observe where they struggle or disengage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-accent" />
                    <span>Fix one barrier, test again</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* The Core Insight */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 animate-fade-in">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Remember
            </h3>
            <p className="text-2xl md:text-3xl text-muted-foreground italic max-w-3xl mx-auto leading-relaxed">
              "When you design for the margins, you improve the experience for the center."
            </p>
            <p className="text-lg text-muted-foreground mt-4">
              — Josh Penzell
            </p>
          </div>
        </Card>

        {/* Contact Info */}
        <Card className="p-8 text-center animate-scale-in border-dashed border-2">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Continue the Conversation
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            Questions? Want to share your neurodiversity-informed design wins? Let's connect.
          </p>
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-semibold text-primary">josh@imaginationapplied.com</p>
            <p className="text-sm text-muted-foreground">Imagination Applied</p>
          </div>
        </Card>
      </div>
    </div>
  );
};