import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Zap, XCircle } from "lucide-react";

const RehearsalNotPerformanceScreen = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 p-8 flex flex-col items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      
      <div className="relative w-full max-w-6xl space-y-8 animate-fade-in">
        {/* Title */}
        <div className="text-center space-y-4">
          <Badge variant="outline" className="text-lg px-4 py-2 font-mono border-primary/30">
            05 / 12
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text">
            Rehearsal, Not Performance
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-mono text-sm tracking-wide">
            // In the old world, every launch felt like opening night<br/>
            // In the AI world, everything is rehearsal
          </p>
        </div>

        {/* Three-Column Comparison */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {/* Theater Rehearsal */}
          <div>
            <Card className="h-full glass-effect border-primary/20 hover:border-primary/40 hover:glow-primary transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Theater Rehearsal</h3>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-bold font-mono">01</span>
                    <p>Practice safely</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-bold font-mono">02</span>
                    <p>Get notes from director</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-bold font-mono">03</span>
                    <p>Try again tomorrow</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-bold font-mono">04</span>
                    <p className="text-foreground font-semibold">Opening night ready</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Training Design Rehearsal */}
          <div>
            <Card className="h-full glass-effect border-accent/20 hover:border-accent/40 hover:glow-accent transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold">Training Design Rehearsal</h3>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="text-accent font-bold font-mono">01</span>
                    <p>Launch imperfect</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent font-bold font-mono">02</span>
                    <p>AI measures everything</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent font-bold font-mono">03</span>
                    <p>Fix fast based on data</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent font-bold font-mono">04</span>
                    <p className="text-foreground font-semibold">Better every week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Old World Performance */}
          <div>
            <Card className="h-full glass-effect border-destructive/20 hover:border-destructive/40 transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-destructive/10 border border-destructive/20">
                    <XCircle className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold">Old World "Performance"</h3>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="text-destructive font-bold font-mono">01</span>
                    <p>Plan for months</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-destructive font-bold font-mono">02</span>
                    <p>Launch "finished" product</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-destructive font-bold font-mono">03</span>
                    <p>Hope it works</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-destructive font-bold font-mono">04</span>
                    <p className="text-foreground font-semibold">Too late to fix</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Insight */}
        <div className="text-center mt-12">
          <Card className="glass-effect border-primary/30 glow-primary">
            <CardContent className="p-8">
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                <span className="font-mono text-muted-foreground text-sm">[FORMULA]</span><br/>
                Permission to be imperfect <span className="text-accent">+</span> Data to improve <span className="text-accent">=</span> <span className="gradient-text">Rehearsal mindset</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RehearsalNotPerformanceScreen;
