import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";

export const ActOnDataScreen = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-12">
        <Badge className="mb-4">Critical Skill</Badge>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          The Trick: Knowing How to Act
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto">
          When you can measure anything, the bottleneck shifts from data collection to data interpretation
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Bad Data Actions */}
        <Card className="p-8 border-l-4 border-l-destructive">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-destructive mb-4">
                Bad: Reacting Without Context
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-destructive/5 rounded-lg">
                  <p className="font-semibold mb-2">Scenario:</p>
                  <p className="text-foreground/80 mb-3">
                    "Engagement dropped 20% in Module 3"
                  </p>
                  <p className="font-semibold mb-2 text-destructive">❌ Knee-jerk reaction:</p>
                  <p className="text-foreground/80">
                    "Let's make Module 3 shorter and add more videos!"
                  </p>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  Problem: You're guessing. You don't know <em>why</em> engagement dropped. Maybe Module 3 is fine—learners are just getting interrupted by work demands at that time of day.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Good Data Actions */}
        <Card className="p-8 border-l-4 border-l-primary">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Good: Investigating Before Acting
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="font-semibold mb-2">Same Scenario:</p>
                  <p className="text-foreground/80 mb-3">
                    "Engagement dropped 20% in Module 3"
                  </p>
                  <p className="font-semibold mb-2 text-primary">✅ Thoughtful approach:</p>
                  <ol className="space-y-2 text-foreground/80 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">1.</span>
                      <span>Ask AI to segment: "Show me drop-off by role, time of day, device"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">2.</span>
                      <span>Check: Is this a content issue or a context issue?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">3.</span>
                      <span>Run A/B test: Keep Module 3, but offer it at different times</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">4.</span>
                      <span>Measure again: Did timing fix it? If not, <em>then</em> look at content</span>
                    </li>
                  </ol>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  Insight: You're testing hypotheses with data. Each cycle teaches you something, even if the fix doesn't work.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Framework */}
        <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary">
          <div className="flex items-start gap-4">
            <Lightbulb className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                The "Act On It" Framework
              </h3>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="font-bold text-primary">1. Segment</div>
                    <Badge variant="outline" className="text-xs">+ AI Clustering</Badge>
                  </div>
                  <p className="text-sm text-foreground/80">
                    Don't look at averages. Use LRS behavior data to segment by role, cohort, time, device. Let AI find patterns.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="font-bold text-secondary">2. Hypothesize</div>
                    <Badge variant="outline" className="text-xs">+ Predictive</Badge>
                  </div>
                  <p className="text-sm text-foreground/80">
                    Form a testable theory about <em>why</em> the metric moved. Use predictive analytics to flag at-risk learners <span className="font-bold text-accent">before</span> they fail.
                  </p>
                </div>
                <div>
                  <div className="font-bold text-primary mb-2">3. Test Small</div>
                  <p className="text-sm text-foreground/80">
                    Fix one variable. Measure again. If it works, scale. If not, try the next hypothesis. Continuous loop.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Key Takeaway */}
        <Card className="p-8 border-2 border-primary">
          <p className="text-2xl font-bold text-primary mb-4 text-center">
            Remember:
          </p>
          <p className="text-xl text-foreground text-center leading-relaxed">
            Abundant measurement doesn't mean you <em>know</em> what to do—
            <br/>
            it means you can <strong>learn</strong> what to do <em>faster</em>.
          </p>
        </Card>
      </div>
    </div>
  );
};