import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, Square, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useReveal, useRegisterReveals } from "@/contexts/RevealContext";

interface TimePerceptionScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
}

export const TimePerceptionScreen = ({ isFacilitator = false, sessionId }: TimePerceptionScreenProps) => {
  const [responses, setResponses] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [step, setStep] = useState<"intro" | "test">("intro");
  const targetTime = 10;
  // Facilitator reveal: 0 = distribution, 1 = research-grounded framing
  useRegisterReveals(1);
  const { step: revealStep } = useReveal();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  useEffect(() => {
    if (!sessionId) return;

    loadResponses();

    const channel = supabase
      .channel(`time-perception:${sessionId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'time_perception_responses',
        filter: `session_id=eq.${sessionId}`
      }, () => {
        loadResponses();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const loadResponses = async () => {
    if (!sessionId) return;
    
    const { data } = await supabase
      .from('time_perception_responses')
      .select('*')
      .eq('session_id', sessionId);
    
    if (data) {
      setResponses(data);
    }
  };

  const submitResponse = async () => {
    if (!sessionId) return;

    const actualSeconds = elapsedTime / 1000;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('time_perception_responses').insert({
        session_id: sessionId,
        user_id: user.id,
        actual_seconds: actualSeconds,
        target_seconds: targetTime,
      });

      if (error) throw error;
      setHasSubmitted(true);
      toast.success('Response submitted!');
    } catch (error) {
      console.error('Error submitting response:', error);
      toast.error('Failed to submit response');
    }
  };

  const stopTest = () => {
    setIsRunning(false);
    submitResponse();
  };

  const getDistribution = () => {
    const excellent = responses.filter(r => Math.abs(r.actual_seconds - r.target_seconds) < 1).length;
    const good = responses.filter(r => {
      const diff = Math.abs(r.actual_seconds - r.target_seconds);
      return diff >= 1 && diff < 2;
    }).length;
    const moderate = responses.filter(r => {
      const diff = Math.abs(r.actual_seconds - r.target_seconds);
      return diff >= 2 && diff < 4;
    }).length;
    const timeBlind = responses.filter(r => Math.abs(r.actual_seconds - r.target_seconds) >= 4).length;
    const total = responses.length || 1;
    const avgDiff = responses.length > 0 
      ? responses.reduce((sum, r) => sum + Math.abs(r.actual_seconds - r.target_seconds), 0) / responses.length 
      : 0;

    return { excellent, good, moderate, timeBlind, total, avgDiff };
  };

  // FACILITATOR VIEW
  if (isFacilitator) {
    const dist = getDistribution();
    
    return (
      <div className="h-screen flex flex-col py-6 px-4 animate-fade-in">
        <div className="text-center mb-6">
          <Badge className="mb-4">
            <Clock className="h-4 w-4 mr-2" />
            Time Perception Challenge
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            How Long Is 10 Seconds?
          </h1>
          <p className="text-lg text-muted-foreground">
            Responses: <span className="font-bold text-primary">{responses.length}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{((dist.excellent / dist.total) * 100).toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground mt-2">Excellent</div>
              <div className="text-xs text-muted-foreground">&lt;1s difference</div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">{((dist.good / dist.total) * 100).toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground mt-2">Good</div>
              <div className="text-xs text-muted-foreground">1-2s difference</div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-foreground/10 to-foreground/5">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">{((dist.moderate / dist.total) * 100).toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground mt-2">Moderate</div>
              <div className="text-xs text-muted-foreground">2-4s difference</div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-muted/20 to-muted/10">
            <div className="text-center">
              <div className="text-4xl font-bold text-muted-foreground">{((dist.timeBlind / dist.total) * 100).toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground mt-2">Time Blindness</div>
              <div className="text-xs text-muted-foreground">&gt;4s difference</div>
            </div>
          </Card>
        </div>

        <Card className="p-8 mb-4 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Average Difference</p>
            <p className="text-5xl font-bold text-primary">{dist.avgDiff.toFixed(1)}s</p>
          </div>
        </Card>

        {revealStep < 1 ? (
          <Card className="p-10 flex-1 bg-gradient-to-br from-primary/5 to-accent/5 flex flex-col items-center justify-center gap-3">
            <p className="text-3xl md:text-4xl font-semibold text-foreground text-center leading-snug w-full">
              Time perception is wildly variable.
              <br />
              <span className="text-primary">Build checkpoints, not just deadlines.</span>
            </p>
            <p className="text-sm text-muted-foreground italic">Press → for what students told us.</p>
          </Card>
        ) : (
          <Card className="p-10 flex-1 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 flex flex-col items-center justify-center gap-4 animate-fade-in">
            <p className="text-2xl md:text-3xl font-semibold text-foreground text-center italic leading-snug max-w-4xl">
              "The challenge isn't <span className="text-primary">making</span> the plan.
              <br />It's <span className="text-primary">sticking to it</span>."
            </p>
            <p className="text-base md:text-lg text-muted-foreground text-center leading-snug max-w-3xl">
              ADHD students in the Atcheson CHI 2025 study repeatedly named follow-through — not planning — as the real executive-function gap.
            </p>
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Atcheson, Khan, Siemann, Jain &amp; Karahalios · CHI 2025
            </p>
          </Card>
        )}
      </div>
    );
  }

  // PARTICIPANT VIEW
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {step === "intro" && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="mb-2">
              <Clock className="h-4 w-4 mr-2" />
              Time Perception Test
            </Badge>
            <h1 className="text-4xl font-bold text-foreground">
              How Long Is 10 Seconds?
            </h1>
            <p className="text-lg text-muted-foreground">
              Not everyone experiences time the same way
            </p>
          </div>

          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Clock className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">The Challenge</h3>
                  <p className="text-muted-foreground mb-3">
                    Press START, then—without counting—press STOP when you think exactly 10 seconds have passed.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    No tricks. Just your internal sense of time.
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={() => setStep("test")} 
                size="lg" 
                className="w-full"
              >
                Start Challenge
                <Play className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {step === "test" && !hasSubmitted && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Count to 10 Seconds... Internally</h2>
            <p className="text-muted-foreground">
              Press STOP when you think exactly 10 seconds have passed
            </p>
          </div>

          <Card className="p-12 bg-gradient-to-br from-background to-primary/10 text-center">
            {!isRunning ? (
              <div className="space-y-6">
                <div className="h-24 w-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="h-12 w-12 text-primary" />
                </div>
                <Button onClick={() => {
                  setStartTime(Date.now());
                  setIsRunning(true);
                }} size="lg" className="text-lg px-8 py-6">
                  <Play className="mr-2 h-5 w-5" />
                  START
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-6xl font-bold text-primary animate-pulse">
                  ...
                </div>
                <p className="text-lg text-muted-foreground">
                  Stop when you reach 10 seconds
                </p>
                <Button onClick={stopTest} size="lg" variant="destructive" className="text-lg px-8 py-6">
                  <Square className="mr-2 h-5 w-5" />
                  STOP
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}

      {hasSubmitted && (
        <Card className="p-8 text-center bg-gradient-to-br from-primary/10 to-accent/10 animate-fade-in">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Response Submitted!</h3>
          <p className="text-muted-foreground mb-4">
            You stopped at: <span className="font-bold text-primary">{(elapsedTime / 1000).toFixed(1)}s</span>
          </p>
          <p className="text-muted-foreground text-sm">
            The facilitator will reveal the results shortly.
          </p>
        </Card>
      )}
    </div>
  );
};