import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, Target, TrendingUp } from "lucide-react";

export const LDTakeawaysScreen = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-12">
        <Badge className="mb-4">Session Wrap</Badge>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          Your New Design Process
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light">
          Four shifts to make starting today
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Shift 1 */}
        <Card className="p-8 border-l-4 border-l-primary hover:shadow-xl transition-all">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                1. Ship Faster
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Stop waiting for perfection. Get a "good enough" version live in <strong>days</strong>, not months.
              </p>
              <div className="p-3 bg-muted rounded text-sm">
                <strong>Action:</strong> Identify one project stuck in "refinement." Ship it this week.
              </div>
            </div>
          </div>
        </Card>

        {/* Shift 2 */}
        <Card className="p-8 border-l-4 border-l-secondary hover:shadow-xl transition-all">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-secondary/10">
              <TrendingUp className="h-8 w-8 text-secondary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                2. Measure Everything
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Use AI to track engagement, comprehension, drop-offs, and performance automatically.
              </p>
              <div className="p-3 bg-muted rounded text-sm">
                <strong>Action:</strong> Set up one AI measurement tool for your next pilot (xAPI/LRS, ChatGPT feedback, video analytics, or A/B testing).
              </div>
            </div>
          </div>
        </Card>

        {/* Shift 3 */}
        <Card className="p-8 border-l-4 border-l-primary hover:shadow-xl transition-all">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                3. Fix One Thing
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Don't boil the ocean. Each cycle, test <strong>one hypothesis</strong>. Change one variable. Measure the impact.
              </p>
              <div className="p-3 bg-muted rounded text-sm">
                <strong>Action:</strong> Pick your worst-performing module. Make one targeted fix this week based on data.
              </div>
            </div>
          </div>
        </Card>

        {/* Shift 4 */}
        <Card className="p-8 border-l-4 border-l-secondary hover:shadow-xl transition-all">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-secondary/10">
              <CheckCircle2 className="h-8 w-8 text-secondary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                4. Repeat Weekly
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Make iteration a <strong>habit</strong>. Every Friday: review metrics, identify one fix, deploy it Monday.
              </p>
              <div className="p-3 bg-muted rounded text-sm">
                <strong>Action:</strong> Block 30 minutes every Friday for "iteration planning."
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* The Formula */}
      <Card className="max-w-4xl mx-auto p-10 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            The Formula
          </h2>
          <div className="text-4xl font-bold text-primary">
            Messy Launch → AI Measurement → Data-Driven Fix → Repeat
          </div>
          <p className="text-xl text-foreground/80 leading-relaxed">
            When you can measure anything, you're free to try anything—
            <br/>
            <span className="text-primary font-semibold">as long as you're willing to iterate.</span>
          </p>
        </div>
      </Card>

      {/* Bridge to Next Session */}
      <Card className="max-w-4xl mx-auto p-8 border-2 border-secondary">
        <h3 className="text-2xl font-bold text-secondary mb-4 text-center">
          Next Up: Human-AI Collaboration for Insight Generation
        </h3>
        <p className="text-lg text-foreground/80 text-center leading-relaxed">
          You've seen how to iterate fast. Now Megan will show you how to partner with AI to turn data into <em>actionable insights</em>—not just metrics.
        </p>
      </Card>

      {/* Final CTA */}
      <div className="text-center pt-8">
        <p className="text-2xl font-bold text-foreground mb-4">
          Questions? Thoughts? Let's discuss.
        </p>
        <p className="text-lg text-muted-foreground">
          Josh Penzell • josh@imaginationapplied.com
        </p>
      </div>
    </div>
  );
};