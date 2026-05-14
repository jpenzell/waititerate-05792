import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Eye, Volume2, Sun, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useReveal, useRegisterReveals } from "@/contexts/RevealContext";

interface SensoryProcessingScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
}

export const SensoryProcessingScreen = ({ isFacilitator = false, sessionId }: SensoryProcessingScreenProps) => {
  const [responses, setResponses] = useState<any[]>([]);
  const [visualIntensity, setVisualIntensity] = useState(5);
  const [soundLevel, setSoundLevel] = useState(5);
  const [brightness, setBrightness] = useState(5);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [step, setStep] = useState<"intro" | "test">("intro");
  // Facilitator reveal: 0 = distribution, 1 = research-grounded framing
  useRegisterReveals(1);
  const { step: revealStep } = useReveal();

  const totalLoad = visualIntensity + soundLevel + brightness;

  useEffect(() => {
    if (!sessionId) return;

    loadResponses();

    const channel = supabase
      .channel(`sensory-processing:${sessionId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'sensory_processing_responses',
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
      .from('sensory_processing_responses')
      .select('*')
      .eq('session_id', sessionId);
    
    if (data) {
      setResponses(data);
    }
  };

  const submitResponse = async (feltOverwhelming: boolean) => {
    if (!sessionId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('sensory_processing_responses').insert({
        session_id: sessionId,
        user_id: user.id,
        visual_intensity: visualIntensity,
        sound_level: soundLevel,
        brightness: brightness,
        felt_overwhelming: feltOverwhelming,
      });

      if (error) throw error;
      setHasSubmitted(true);
      toast.success('Response submitted!');
    } catch (error) {
      console.error('Error submitting response:', error);
      toast.error('Failed to submit response');
    }
  };

  const getDistribution = () => {
    const sensitive = responses.filter(r => r.felt_overwhelming).length;
    const tolerant = responses.filter(r => !r.felt_overwhelming).length;
    const total = responses.length || 1;
    const avgLoad = responses.length > 0 
      ? responses.reduce((sum, r) => sum + (r.visual_intensity + r.sound_level + r.brightness), 0) / responses.length 
      : 0;

    return { sensitive, tolerant, total, avgLoad };
  };

  // FACILITATOR VIEW
  if (isFacilitator) {
    const dist = getDistribution();
    
    return (
      <div className="h-screen flex flex-col py-6 px-4 animate-fade-in">
        <div className="text-center mb-6">
          <Badge className="mb-4">
            <Eye className="h-4 w-4 mr-2" />
            Sensory Processing Simulator
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            The Sensory Overload Experience
          </h1>
          <p className="text-lg text-muted-foreground">
            Responses: <span className="font-bold text-primary">{responses.length}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/5">
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-accent mx-auto mb-4" />
              <div className="text-5xl font-bold text-accent mb-2">{((dist.sensitive / dist.total) * 100).toFixed(0)}%</div>
              <div className="text-lg font-semibold text-foreground mb-2">Sensory Sensitive</div>
              <div className="text-sm text-muted-foreground">{dist.sensitive} found it overwhelming</div>
            </div>
          </Card>
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/5">
            <div className="text-center">
              <Sparkles className="h-16 w-16 text-primary mx-auto mb-4" />
              <div className="text-5xl font-bold text-primary mb-2">{((dist.tolerant / dist.total) * 100).toFixed(0)}%</div>
              <div className="text-lg font-semibold text-foreground mb-2">High Tolerance</div>
              <div className="text-sm text-muted-foreground">{dist.tolerant} could handle more</div>
            </div>
          </Card>
        </div>

        <Card className="p-8 mb-4 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Average Cognitive Load</p>
            <p className="text-5xl font-bold text-primary">{dist.avgLoad.toFixed(1)}/30</p>
          </div>
        </Card>

        {revealStep < 1 ? (
          <Card className="p-10 flex-1 bg-gradient-to-br from-primary/5 to-accent/5 flex flex-col items-center justify-center gap-3">
            <p className="text-3xl md:text-4xl font-semibold text-foreground text-center leading-snug w-full">
              Overwhelmed brains can't learn.
              <br />
              <span className="text-primary">Reduce clutter. Give control.</span>
            </p>
            <p className="text-sm text-muted-foreground italic">Press → for the AI angle.</p>
          </Card>
        ) : (
          <Card className="p-10 flex-1 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 flex flex-col items-center justify-center gap-4 animate-fade-in">
            <p className="text-2xl md:text-3xl font-semibold text-foreground text-center leading-snug max-w-4xl">
              AI emotion-recognition and "engagement" tools are
              <br /><span className="text-primary">poorly trained on autistic and sensory-different presentations</span>.
            </p>
            <p className="text-base md:text-lg text-muted-foreground text-center leading-snug max-w-3xl">
              The same accommodation that protects sensory-sensitive students — control, predictability, lower stimulus — should drive the procurement question for any "AI-enabled" classroom tool.
            </p>
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              ChatGPT meta-review · differential-impacts table · 2026
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
              <Eye className="h-4 w-4 mr-2" />
              Sensory Processing Test
            </Badge>
          <h1 className="text-4xl font-bold text-foreground">
              The Sensory Overload Simulator
            </h1>
            <p className="text-lg text-muted-foreground">
              Sensory thresholds vary widely across autism, ADHD, SPD, and TBI profiles.
            </p>
          </div>

          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Volume2 className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">The Experience</h3>
                  <p className="text-muted-foreground mb-3">
                    You'll control three sensory dimensions: visual complexity, sound, and brightness.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Turn them up slowly and notice when it feels uncomfortable—that's your <strong>cognitive load threshold.</strong>
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={() => setStep("test")} 
                size="lg" 
                className="w-full"
              >
                Start Simulation
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {step === "test" && !hasSubmitted && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Control the Sensory Load</h2>
            <p className="text-muted-foreground">
              Adjust until it feels uncomfortable
            </p>
          </div>

          <Card className="p-6 bg-gradient-to-br from-background to-accent/5">
            <div className="space-y-6">
              {/* Visual Complexity */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">Visual Complexity</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{visualIntensity}</span>
                </div>
                <Slider
                  value={[visualIntensity]}
                  onValueChange={(vals) => setVisualIntensity(vals[0])}
                  min={0}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Sound Level */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">Sound Intensity</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{soundLevel}</span>
                </div>
                <Slider
                  value={[soundLevel]}
                  onValueChange={(vals) => setSoundLevel(vals[0])}
                  min={0}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Brightness */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">Brightness</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{brightness}</span>
                </div>
                <Slider
                  value={[brightness]}
                  onValueChange={(vals) => setBrightness(vals[0])}
                  min={0}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="pt-4 border-t border-border">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Total Cognitive Load</p>
                  <div className="text-5xl font-bold text-primary">{totalLoad}/30</div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => submitResponse(true)}
                  variant="secondary"
                  className="w-full"
                >
                  This Feels Overwhelming
                </Button>
                <Button 
                  onClick={() => submitResponse(false)}
                  className="w-full"
                >
                  I Could Handle More
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {hasSubmitted && (
        <Card className="p-8 text-center bg-gradient-to-br from-primary/10 to-accent/10 animate-fade-in">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Response Submitted!</h3>
          <p className="text-muted-foreground mb-4">
            Your threshold: <span className="font-bold text-primary">{totalLoad}/30</span>
          </p>
          <p className="text-muted-foreground text-sm">
            The facilitator will reveal the results shortly.
          </p>
        </Card>
      )}
    </div>
  );
};