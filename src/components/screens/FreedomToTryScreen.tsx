import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LockKeyhole, Unlock, FlaskConical, BarChart3, TrendingUp } from "lucide-react";

// Collection of real case studies with data insights
const caseStudies = [
  {
    id: "duolingo",
    title: "Duolingo: \"Test Everything\"",
    icon: FlaskConical,
    scale: "Over 3 years, ran 2,000+ experiments with 750+ tests per quarter",
    result: "Automated experiment management system, nightly reports, data-driven decisions at massive scale. Even failed experiments considered valuable learning.",
  },
  {
    id: "coursera",
    title: "Coursera: Testing Inclusivity",
    icon: BarChart3,
    experiment: "Tested female vs. male scientists in course imagery to measure impact on belonging and engagement",
    result: "Female imagery increased discussion participation from women learners. Tested with tens of thousands of learners, impossible without A/B infrastructure.",
  },
  {
    id: "dutch-retail",
    title: "Dutch Retail: Proving ROI",
    icon: TrendingUp,
    approach: "Split stores into A/B groups (training vs. no training) to rigorously measure business impact",
    result: "400% ROI in first year. Data proved value and enabled confident scale-up of training program.",
  },
  {
    id: "google",
    title: "Google: 41 Shades of Blue",
    icon: FlaskConical,
    experiment: "Tested 41 different shades of blue for ad links to optimize click-through rates",
    result: "$200M annual revenue increase. Proved that even tiny changes, when measured at scale, create massive value.",
  },
  {
    id: "amazon",
    title: "Amazon: Every Millisecond Counts",
    icon: TrendingUp,
    scale: "Tests thousands of features annually. Found every 100ms of latency costs 1% in sales",
    result: "Continuous experimentation culture. Teams empowered to test, learn, and iterate without executive approval for most changes.",
  },
  {
    id: "netflix",
    title: "Netflix: Personalization at Scale",
    icon: BarChart3,
    experiment: "Runs 250+ A/B tests simultaneously. Tests everything from thumbnails to recommendation algorithms",
    result: "75% of viewing comes from recommendations. Saved $1B annually by preventing customer churn through better personalization.",
  },
  {
    id: "booking",
    title: "Booking.com: 1,000 Tests Running",
    icon: FlaskConical,
    scale: "Runs over 1,000 concurrent experiments. Every team can test, anyone can propose experiments",
    result: "Democratized experimentation. Conversion rate improvements compound. Culture of \"test, learn, iterate\" embedded at every level.",
  },
  {
    id: "linkedin",
    title: "LinkedIn Learning: Micro-Improvements",
    icon: TrendingUp,
    experiment: "Tests course completion tactics: reminder timing, social proof, progress indicators, certification display",
    result: "15% increase in course completion. Small tests compound. Each insight fuels the next experiment.",
  },
  {
    id: "khan-academy",
    title: "Khan Academy: AI-Powered Tutoring",
    icon: BarChart3,
    scale: "Khanmigo AI tutor generates millions of data points per day on student struggle points and breakthrough moments",
    result: "Real-time intervention at scale. Measures not just completion but understanding depth, enabling personalized learning paths.",
  },
  {
    id: "udemy",
    title: "Udemy: Optimizing Learning Paths",
    icon: FlaskConical,
    experiment: "Tests course sequencing, chapter length, quiz placement, video speed controls, and mobile vs. desktop experience",
    result: "22% increase in course completion. Data showed shorter chapters and frequent quizzes improved retention significantly.",
  },
  {
    id: "salesforce",
    title: "Salesforce Trailhead: Gamification ROI",
    icon: TrendingUp,
    scale: "Measured badge completion, time-to-certification, and job performance correlation across 4M+ users",
    result: "Proved gamified learning increased skill retention by 40%. Led to $100M+ investment in platform expansion.",
  },
  {
    id: "walmart",
    title: "Walmart Academy: Store-Level Experiments",
    icon: BarChart3,
    approach: "Split 200 stores into training vs. control groups. Measured sales, turnover, customer satisfaction across 6 months",
    result: "10% reduction in employee turnover, 5% increase in customer satisfaction scores. Training program scaled to 5,000+ stores.",
  },
];

const FreedomToTryScreen = () => {
  // Select 3 case studies to display (you can change these IDs to show different examples)
  const displayedStudies = ["duolingo", "coursera", "dutch-retail"];
  const selectedStudies = caseStudies.filter(study => displayedStudies.includes(study.id));

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 p-8 flex flex-col items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      
      <div className="relative w-full max-w-6xl space-y-12 animate-fade-in">
        {/* Title */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
              <LockKeyhole className="h-14 w-14 text-destructive" />
            </div>
            <div className="text-5xl text-accent font-mono">→</div>
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 glow-accent">
              <Unlock className="h-14 w-14 text-accent" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold gradient-text">
            The Freedom to Try Anything
          </h1>
          <p className="text-4xl text-muted-foreground font-semibold">
            What would you design if <span className="text-accent">failure was free?</span>
          </p>
        </div>

        {/* Core Message */}
        <div>
          <Card className="glass-effect border-primary/30 glow-primary">
            <CardContent className="p-10 text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                <span className="font-mono text-muted-foreground text-base">[INSIGHT]</span><br/>
                Measurement doesn't constrain creativity—<span className="gradient-text">it enables it</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Display Selected Case Studies */}
        <div className="space-y-6">
          {selectedStudies.map((study, index) => {
            const IconComponent = study.icon;
            return (
              <div key={study.id}>
                <Card className="glass-effect border-primary/10 hover:border-primary/30 hover:glow-primary transition-all">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-bold">{study.title}</h3>
                          <Badge variant="outline" className="text-sm font-mono">REAL EXAMPLE</Badge>
                        </div>
                        <div className="space-y-3">
                          {study.scale && (
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 rounded bg-accent/10 flex-shrink-0 mt-1">
                                <BarChart3 className="h-5 w-5 text-accent" />
                              </div>
                              <p className="text-foreground font-medium text-lg">
                                <span className="font-mono text-sm text-accent">SCALE:</span> {study.scale}
                              </p>
                            </div>
                          )}
                          {study.experiment && (
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 rounded bg-accent/10 flex-shrink-0 mt-1">
                                <FlaskConical className="h-5 w-5 text-accent" />
                              </div>
                              <p className="text-foreground font-medium text-lg">
                                <span className="font-mono text-sm text-accent">EXPERIMENT:</span> {study.experiment}
                              </p>
                            </div>
                          )}
                          {study.approach && (
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 rounded bg-accent/10 flex-shrink-0 mt-1">
                                <FlaskConical className="h-5 w-5 text-accent" />
                              </div>
                              <p className="text-foreground font-medium text-lg">
                                <span className="font-mono text-sm text-accent">APPROACH:</span> {study.approach}
                              </p>
                            </div>
                          )}
                          <div className="flex items-start gap-3">
                            <div className="p-1.5 rounded bg-primary/10 flex-shrink-0 mt-1">
                              <TrendingUp className="h-5 w-5 text-primary" />
                            </div>
                            <p className="text-muted-foreground text-lg">
                              <span className="font-mono text-sm text-primary">RESULT:</span> {study.result}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Closing Quote */}
        <div className="text-center">
          <Card className="glass-effect border-accent/30 glow-accent">
            <CardContent className="p-12">
              <p className="text-4xl md:text-5xl font-bold text-foreground italic">
                <span className="font-mono text-muted-foreground text-base not-italic">[PROVEN PATTERN]</span><br/>
                "These organizations didn't wait for certainty—they <span className="text-accent">built to learn</span>, measuring their way to <span className="gradient-text">breakthrough results</span>."
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Available Case Studies Reference */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground font-mono">
            Showing {selectedStudies.length} of {caseStudies.length} available case studies
          </p>
          <details className="mt-4 text-left max-w-2xl mx-auto">
            <summary className="cursor-pointer text-sm text-accent hover:text-accent/80 font-mono">
              View all {caseStudies.length} available case studies
            </summary>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              {caseStudies.map(study => (
                <div key={study.id} className="flex items-center gap-2">
                  <span className="font-mono text-primary">•</span>
                  <span className="font-medium">{study.id}</span>
                  <span>—</span>
                  <span>{study.title}</span>
                </div>
              ))}
              <p className="mt-4 text-xs italic">
                To change which case studies appear, edit the displayedStudies array at the top of FreedomToTryScreen.tsx
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default FreedomToTryScreen;
