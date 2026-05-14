import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, VolumeX, MessageSquare, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useReveal, useRegisterReveals } from "@/contexts/RevealContext";

interface InnerVoiceScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
}

export const InnerVoiceScreen = ({ isFacilitator = false, sessionId }: InnerVoiceScreenProps) => {
  const [responses, setResponses] = useState<any[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [step, setStep] = useState<"intro" | "test">("intro");
  // Facilitator reveal: 0 = distribution, 1 = research framing
  // Reveal step shows poll results — only meaningful with an active session.
  useRegisterReveals(sessionId ? 1 : 0);
  const { step: revealStep } = useReveal();

  useEffect(() => {
    if (!sessionId) return;

    loadResponses();

    const channel = supabase
      .channel(`inner-voice:${sessionId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'inner_voice_responses',
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
      .from('inner_voice_responses')
      .select('*')
      .eq('session_id', sessionId);
    
    if (data) {
      setResponses(data);
    }
  };

  const submitResponse = async (hasInnerVoice: boolean) => {
    if (!sessionId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('inner_voice_responses').insert({
        session_id: sessionId,
        user_id: user.id,
        has_inner_voice: hasInnerVoice,
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
    const withVoice = responses.filter(r => r.has_inner_voice).length;
    const withoutVoice = responses.filter(r => !r.has_inner_voice).length;
    const total = responses.length || 1;

    return { withVoice, withoutVoice, total };
  };

  // FACILITATOR VIEW
  if (isFacilitator) {
    const dist = getDistribution();
    
    return (
      <div className="h-screen flex flex-col py-6 px-4 animate-fade-in">
        <div className="text-center mb-6">
          <Badge className="mb-4">
            <MessageSquare className="h-4 w-4 mr-2" />
            Inner Voice Discovery
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Do You Hear a Voice When You Read?
          </h1>
          <p className="text-lg text-muted-foreground">
            Responses: <span className="font-bold text-primary">{responses.length}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/5">
            <div className="text-center">
              <Volume2 className="h-16 w-16 text-primary mx-auto mb-4" />
              <div className="text-5xl font-bold text-primary mb-2">{((dist.withVoice / dist.total) * 100).toFixed(0)}%</div>
              <div className="text-lg font-semibold text-foreground mb-2">With Inner Voice</div>
              <div className="text-lg text-muted-foreground">{dist.withVoice} people hear narration</div>
            </div>
          </Card>
          <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/5">
            <div className="text-center">
              <VolumeX className="h-16 w-16 text-accent mx-auto mb-4" />
              <div className="text-5xl font-bold text-accent mb-2">{((dist.withoutVoice / dist.total) * 100).toFixed(0)}%</div>
              <div className="text-lg font-semibold text-foreground mb-2">Silent Reading</div>
              <div className="text-lg text-muted-foreground">{dist.withoutVoice} people read silently</div>
            </div>
          </Card>
        </div>

        {revealStep < 1 ? (
          <Card className="p-10 flex-1 bg-gradient-to-br from-primary/5 to-accent/5 flex flex-col items-center justify-center gap-3">
            <p className="text-3xl md:text-4xl font-semibold text-foreground text-center leading-snug w-full">
              Same words. Different brains.
            </p>
            <p className="text-lg text-muted-foreground italic">Press → for the implication.</p>
          </Card>
        ) : (
          <Card className="p-10 flex-1 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 flex flex-col items-center justify-center gap-4 animate-fade-in">
            <p className="text-2xl md:text-3xl font-semibold text-foreground text-center leading-snug max-w-4xl">
              Many of your students experience reading <span className="text-primary">without inner narration</span> at all
              — and many experience it <span className="text-primary">narrated word-for-word</span>.
            </p>
            <p className="text-xl md:text-2xl text-foreground/85 text-center leading-snug max-w-4xl italic">
              The same lecture lands as text, voice, image, or silence.
              <br />Pair every spoken cue with a written one.
            </p>
            <p className="text-base font-mono uppercase tracking-widest text-muted-foreground">
              Inner-speech variation · Hurlburt et al., descriptive experience sampling
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
              <MessageSquare className="h-4 w-4 mr-2" />
              Reading Style Test
            </Badge>
            <h1 className="text-4xl font-bold text-foreground">
              Do You Hear a Voice<br/>When You Read?
            </h1>
            <p className="text-lg text-muted-foreground">
              Some hear every word. Others read in silence.
            </p>
          </div>

          <Card className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/20">
            <div className="space-y-4">
              <p className="text-lg text-foreground font-semibold">
                Read this paragraph silently:
              </p>
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="text-base text-foreground leading-relaxed">
                  The cat stretched lazily in the afternoon sun, its orange fur glowing like embers. Somewhere in the distance, a dog barked twice. The cat yawned, showing tiny white teeth, then curled back into a perfect circle of contentment.
                </p>
              </div>
              
              <Button 
                onClick={() => setStep("test")} 
                size="lg" 
                className="w-full"
              >
                Answer the Question
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {step === "test" && !hasSubmitted && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">What Did You Experience?</h2>
            <p className="text-muted-foreground">
              Choose what best describes your reading experience.
            </p>
          </div>

          <div className="space-y-4">
            <Card 
              className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
              onClick={() => submitResponse(true)}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Volume2 className="h-10 w-10 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Yes, I Hear a Voice</h3>
                </div>
                <p className="text-muted-foreground text-lg">
                  I heard the words narrated in my head—like an audiobook. There was definitely <strong>sound</strong>.
                </p>
              </div>
            </Card>

            <Card 
              className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/20 hover:border-accent/40 transition-all cursor-pointer"
              onClick={() => submitResponse(false)}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <VolumeX className="h-10 w-10 text-accent" />
                  <h3 className="text-xl font-bold text-foreground">No, Silent Reading</h3>
                </div>
                <p className="text-muted-foreground text-lg">
                  I just <strong>understood</strong> the meaning directly—no narration, no voice.
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {hasSubmitted && (
        <Card className="p-8 text-center bg-gradient-to-br from-primary/10 to-accent/10 animate-fade-in">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Response Submitted!</h3>
          <p className="text-muted-foreground">
            The facilitator will reveal the results shortly.
          </p>
        </Card>
      )}
    </div>
  );
};