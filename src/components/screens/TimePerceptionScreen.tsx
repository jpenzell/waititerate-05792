import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, Square, AlertCircle, Sparkles } from "lucide-react";
import { SlideHeader } from "@/components/SlideHeader";

interface TimePerceptionScreenProps {
  isFacilitator?: boolean;
}

export const TimePerceptionScreen = ({ isFacilitator = false }: TimePerceptionScreenProps) => {
  const [step, setStep] = useState<"intro" | "test" | "results">("intro");
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [userGuess, setUserGuess] = useState<number | null>(null);
  const targetTime = 10; // 10 seconds

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const startTest = () => {
    setStartTime(Date.now());
    setIsRunning(true);
  };

  const stopTest = () => {
    setIsRunning(false);
    setUserGuess(elapsedTime / 1000);
    setStep("results");
  };

  const difference = userGuess ? Math.abs(targetTime - userGuess) : 0;
  const accuracy = userGuess ? Math.max(0, 100 - (difference / targetTime) * 100) : 0;

  const getCategory = (diff: number) => {
    if (diff < 1) return { label: "Excellent Time Sense", color: "text-primary", description: "You have exceptional time perception accuracy." };
    if (diff < 2) return { label: "Good Time Sense", color: "text-accent", description: "Your internal clock is well-calibrated." };
    if (diff < 4) return { label: "Moderate Variation", color: "text-foreground", description: "Your time perception varies—common for many people." };
    return { label: "Time Blindness", color: "text-muted-foreground", description: "You may experience 'time blindness'—a common trait in ADHD and autism." };
  };

  const category = getCategory(difference);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/10 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <SlideHeader slideNumber={4} totalSlides={14} estimatedMinutes={5} title="Time Perception Challenge" />

        {step === "intro" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="mb-2">
                <Clock className="h-4 w-4 mr-2" />
                Neurodiversity Discovery
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                How Long Is 10 Seconds?
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                You're about to discover something surprising: <strong>not everyone experiences time the same way.</strong>
              </p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">The Challenge</h3>
                    <p className="text-muted-foreground mb-4">
                      You'll press START, then—without counting or looking at a clock—press STOP when you think exactly 10 seconds have passed.
                    </p>
                    <p className="text-muted-foreground">
                      No tricks. Just your internal sense of time.
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={() => setStep("test")} 
                  size="lg" 
                  className="w-full md:w-auto"
                >
                  Start Challenge
                  <Play className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-background/50 border border-border">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-accent mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Why This Matters for Learning Design</p>
                  <p className="text-sm text-muted-foreground">
                    "Time blindness" affects up to 80% of people with ADHD. If your course says "this should take 15 minutes," some students genuinely cannot estimate whether they're on track. They need <strong>progress bars, time remaining indicators, and checkpoint notifications.</strong>
                  </p>
                  <p className="text-xs text-muted-foreground italic mt-2">
                    Research: Barkley, R.A. (2010) — "Attention-Deficit Hyperactivity Disorder: A Handbook"
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {step === "test" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground">Count to 10 Seconds... Internally</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Press STOP when you think exactly 10 seconds have passed.
              </p>
            </div>

            <Card className="p-16 bg-gradient-to-br from-background to-primary/10 text-center">
              {!isRunning ? (
                <div className="space-y-8">
                  <div className="h-32 w-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="h-16 w-16 text-primary" />
                  </div>
                  <Button onClick={startTest} size="lg" className="text-xl px-12 py-6">
                    <Play className="mr-3 h-6 w-6" />
                    START
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="text-8xl font-bold text-primary animate-pulse">
                    ...
                  </div>
                  <p className="text-xl text-muted-foreground">
                    Counting in your head? Stop when you reach 10 seconds.
                  </p>
                  <Button onClick={stopTest} size="lg" variant="destructive" className="text-xl px-12 py-6">
                    <Square className="mr-3 h-6 w-6" />
                    STOP
                  </Button>
                  {isFacilitator && (
                    <p className="text-sm text-muted-foreground italic">
                      Actual elapsed: {(elapsedTime / 1000).toFixed(1)}s
                    </p>
                  )}
                </div>
              )}
            </Card>
          </div>
        )}

        {step === "results" && userGuess !== null && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="mb-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Your Time Perception
              </Badge>
              <h2 className="text-5xl font-bold text-foreground">
                You Stopped at: <span className="text-primary">{userGuess.toFixed(1)}s</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Target: 10.0 seconds | Difference: {difference.toFixed(1)} seconds
              </p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold mb-4" style={{ color: `hsl(var(--${accuracy > 70 ? 'primary' : 'accent'}))` }}>
                  {accuracy.toFixed(0)}% Accurate
                </div>
                <h3 className={`text-2xl font-bold ${category.color}`}>
                  {category.label}
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/30">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">The Science</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong>Time Blindness:</strong> People with ADHD or autism often struggle with "prospective timing"—estimating how long a task will take or has taken.
                    </p>
                    <p>
                      <strong>Hyperfocus:</strong> During intense focus, time can disappear entirely. Hours feel like minutes.
                    </p>
                    <p>
                      <strong>Variability:</strong> Time perception varies by stress, interest, dopamine levels, and context.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">UDL Design Implications</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      ✓ <strong>Show progress:</strong> Visual progress bars, "X minutes remaining" indicators
                    </p>
                    <p>
                      ✓ <strong>Chunked pacing:</strong> Break tasks into 5-10 minute segments with checkpoints
                    </p>
                    <p>
                      ✓ <strong>Time scaffolds:</strong> Timers, alarms, and calendar integrations
                    </p>
                    <p>
                      ✓ <strong>Flexible deadlines:</strong> Allow self-pacing where possible
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {isFacilitator && (
              <div className="text-center">
                <Button onClick={() => {
                  setStep("intro");
                  setUserGuess(null);
                  setElapsedTime(0);
                  setStartTime(null);
                }} variant="outline">
                  Reset Exercise
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
