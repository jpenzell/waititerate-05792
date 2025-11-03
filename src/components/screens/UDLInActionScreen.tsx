import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Zap, Hand, CheckCircle2 } from "lucide-react";
import { SlideHeader } from "@/components/SlideHeader";

export const UDLInActionScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <SlideHeader slideNumber={12} totalSlides={14} estimatedMinutes={6} title="Universal Design for Learning in Action" />
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            Universal Design for Learning
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            UDL in Action
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Remove barriers without lowering standards—three principles for inclusive design
          </p>
        </div>

        {/* Three UDL Principles */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Multiple Means of Representation */}
          <Card className="p-8 hover:shadow-xl transition-all border-2 border-primary/20">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Multiple Representations
              </h3>
              <p className="text-sm text-muted-foreground italic">
                The "What" of Learning
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-foreground mb-4">
                Present information in different formats so all learners can access it.
              </p>
              
              <div className="space-y-3">
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-foreground mb-1">Text + Audio</p>
                  <p className="text-xs text-muted-foreground">
                    Provide transcripts AND narration
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-foreground mb-1">Visual + Verbal</p>
                  <p className="text-xs text-muted-foreground">
                    Diagrams, infographics, videos alongside written explanations
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-foreground mb-1">Adjustable Display</p>
                  <p className="text-xs text-muted-foreground">
                    Font size, contrast, playback speed controls
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Multiple Means of Engagement */}
          <Card className="p-8 hover:shadow-xl transition-all border-2 border-accent/20">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Multiple Engagement Methods
              </h3>
              <p className="text-sm text-muted-foreground italic">
                The "Why" of Learning
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-foreground mb-4">
                Offer different ways to motivate and sustain learner interest.
              </p>
              
              <div className="space-y-3">
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-foreground mb-1">Choice & Autonomy</p>
                  <p className="text-xs text-muted-foreground">
                    "Pick 3 of 5 case studies to analyze"
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-foreground mb-1">Relevance</p>
                  <p className="text-xs text-muted-foreground">
                    Connect to learners' real-world context
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-foreground mb-1">Gamification</p>
                  <p className="text-xs text-muted-foreground">
                    Progress tracking, achievements, immediate feedback
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Multiple Means of Action & Expression */}
          <Card className="p-8 hover:shadow-xl transition-all border-2 border-primary/20">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Hand className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Multiple Expression Options
              </h3>
              <p className="text-sm text-muted-foreground italic">
                The "How" of Learning
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-foreground mb-4">
                Allow learners to demonstrate understanding in different ways.
              </p>
              
              <div className="space-y-3">
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-foreground mb-1">Format Choice</p>
                  <p className="text-xs text-muted-foreground">
                    Written report, video, presentation, or prototype
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-foreground mb-1">Tool Options</p>
                  <p className="text-xs text-muted-foreground">
                    Speech-to-text, mind mapping, collaborative docs
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border">
                  <p className="font-semibold text-foreground mb-1">Scaffolded Support</p>
                  <p className="text-xs text-muted-foreground">
                    Templates, checklists, worked examples available
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Real Example: Sesame Workshop */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Representation Matters
              </Badge>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Sesame Workshop: Julia the Muppet
              </h3>
              <p className="text-muted-foreground mb-4">
                In 2017, Sesame Workshop introduced Julia—an autistic Muppet character—to help 
                children understand autism and reduce stigma.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p>Julia demonstrates stimming behaviors (flapping hands when excited)</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p>She sometimes doesn't respond to her name immediately (common in autism)</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p>Her friends model patience and understanding—showing how to be inclusive</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-3 italic">
                "It's amazing how this little Muppet has created such a shift in culture. 
                Parents tell us Julia helped their child get diagnosed earlier, or helped 
                neurotypical kids understand their autistic classmates."
              </p>
              <p className="text-xs text-muted-foreground">
                — Sesame Workshop Research Team
              </p>
            </div>
          </div>
        </Card>

        {/* Facilitator Activity */}
        <Card className="p-8 bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/30">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-foreground">Your Turn: UDL Audit</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Pick one course module you've designed. Ask yourself:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-background rounded border border-border">
                <Eye className="h-6 w-6 text-primary mb-2 mx-auto" />
                <p className="font-semibold text-foreground mb-2">Representation</p>
                <p className="text-sm text-muted-foreground">
                  Do I offer at least 2 formats? (Text + audio? Visual + verbal?)
                </p>
              </div>
              <div className="p-4 bg-background rounded border border-border">
                <Zap className="h-6 w-6 text-accent mb-2 mx-auto" />
                <p className="font-semibold text-foreground mb-2">Engagement</p>
                <p className="text-sm text-muted-foreground">
                  Do learners have any choices in how they engage with this content?
                </p>
              </div>
              <div className="p-4 bg-background rounded border border-border">
                <Hand className="h-6 w-6 text-primary mb-2 mx-auto" />
                <p className="font-semibold text-foreground mb-2">Expression</p>
                <p className="text-sm text-muted-foreground">
                  Can learners demonstrate understanding in different ways?
                </p>
              </div>
            </div>
            <p className="text-base text-foreground pt-4">
              <strong>Challenge:</strong> Add ONE more option in any of these categories this week.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};