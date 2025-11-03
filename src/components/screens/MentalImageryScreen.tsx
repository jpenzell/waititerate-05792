import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Eye, EyeOff, Sparkles, Brain } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface MentalImageryScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
}

export const MentalImageryScreen = ({ isFacilitator = false, sessionId }: MentalImageryScreenProps) => {
  const [responses, setResponses] = useState<any[]>([]);
  const [vividness, setVividness] = useState<number>(5);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [step, setStep] = useState<"intro" | "test">("intro");

  useEffect(() => {
    if (!sessionId) return;

    loadResponses();

    const channel = supabase
      .channel(`mental-imagery:${sessionId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'mental_imagery_responses',
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
      .from('mental_imagery_responses')
      .select('*')
      .eq('session_id', sessionId);
    
    if (data) {
      setResponses(data);
    }
  };

  const submitResponse = async () => {
    if (!sessionId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('mental_imagery_responses').insert({
        session_id: sessionId,
        user_id: user.id,
        vividness_score: vividness,
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
    const aphantasia = responses.filter(r => r.vividness_score <= 1).length;
    const low = responses.filter(r => r.vividness_score >= 2 && r.vividness_score <= 4).length;
    const typical = responses.filter(r => r.vividness_score >= 5 && r.vividness_score <= 7).length;
    const hyper = responses.filter(r => r.vividness_score >= 8).length;
    const total = responses.length || 1;

    return { aphantasia, low, typical, hyper, total };
  };

  // FACILITATOR VIEW
  if (isFacilitator) {
    const dist = getDistribution();
    
    return (
      <main className="h-screen flex flex-col py-6 px-4 animate-fade-in" role="main" aria-label="Mental imagery test results">
        <header className="text-center mb-6">
          <Badge className="mb-4">
            <Brain className="h-4 w-4 mr-2" />
            Mental Imagery Discovery
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Can You See This?
          </h1>
          <p className="text-lg text-muted-foreground">
            Responses: <span className="font-bold text-primary">{responses.length}</span>
          </p>
        </header>

        <section className="grid md:grid-cols-4 gap-4 mb-6" aria-label="Mental imagery distribution statistics">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{((dist.aphantasia / dist.total) * 100).toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground mt-2">Aphantasia (0-1)</div>
              <div className="text-xs text-muted-foreground">{dist.aphantasia} people</div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">{((dist.low / dist.total) * 100).toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground mt-2">Low Imagery (2-4)</div>
              <div className="text-xs text-muted-foreground">{dist.low} people</div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-foreground/10 to-foreground/5">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">{((dist.typical / dist.total) * 100).toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground mt-2">Typical (5-7)</div>
              <div className="text-xs text-muted-foreground">{dist.typical} people</div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/5">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">{((dist.hyper / dist.total) * 100).toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground mt-2">Hyperphantasia (8-10)</div>
              <div className="text-xs text-muted-foreground">{dist.hyper} people</div>
            </div>
          </Card>
        </section>

        <Card className="p-8 flex-1 bg-gradient-to-br from-primary/5 to-accent/5" role="article">
          <h3 className="text-2xl font-bold text-foreground mb-4">The Invisible Difference</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-muted-foreground mb-4">
                Until Adam Zeman's 2015 research, most people with <strong>aphantasia didn't know other people could actually SEE mental images.</strong> They assumed "picture this" was just a figure of speech.
              </p>
              <p className="text-muted-foreground">
                This reveals why Universal Design for Learning matters: <strong>we can't see inside each other's minds.</strong>
              </p>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="text-sm font-semibold text-foreground mb-2">Aphantasia (No Imagery)</p>
                <p className="text-xs text-muted-foreground">Need: Diagrams, written steps, spatial descriptions. "Visualize this" instructions fail.</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="text-sm font-semibold text-foreground mb-2">Hyperphantasia (Vivid Imagery)</p>
                <p className="text-xs text-muted-foreground">Need: Rich visual descriptions, videos. Dry text feels boring.</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    );
  }

  // PARTICIPANT VIEW
  return (
    <main className="max-w-2xl mx-auto py-8 px-4" role="main" aria-label="Mental imagery test">
      {step === "intro" && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="mb-2">
              <Brain className="h-4 w-4 mr-2" />
              Mental Imagery Test
            </Badge>
            <h1 className="text-4xl font-bold text-foreground">
              Can You See This?
            </h1>
            <p className="text-lg text-muted-foreground">
              We're about to discover something extraordinary
            </p>
          </div>

          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Eye className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">The Test</h3>
                  <p className="text-muted-foreground mb-3">
                    Close your eyes. Picture a red apple sitting on a white plate.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Try to "see" it: the shine, the shadow, maybe a stem.
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={() => setStep("test")} 
                size="lg" 
                className="w-full"
                aria-label="Start the mental imagery test"
              >
                Take the Test
                <Sparkles className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {step === "test" && !hasSubmitted && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Rate Your Mental Image</h2>
            <p className="text-muted-foreground">
              How vivid was your mental image of the apple?
            </p>
          </div>

          <Card className="p-8 bg-gradient-to-br from-background to-accent/5">
            <div className="space-y-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <EyeOff className="h-4 w-4" />
                  <span>No image</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Perfectly clear</span>
                  <Eye className="h-4 w-4" />
                </div>
              </div>

              <Slider
                value={[vividness]}
                onValueChange={(vals) => setVividness(vals[0])}
                min={0}
                max={10}
                step={1}
                className="w-full"
                aria-label="Rate the vividness of your mental image from 0 to 10"
              />

              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">{vividness}</div>
                <p className="text-sm text-muted-foreground">out of 10</p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-primary/5 rounded border border-primary/20">
                  <p className="font-semibold text-primary">0-1: No Image</p>
                  <p className="text-muted-foreground">Nothing at all</p>
                </div>
                <div className="p-3 bg-accent/5 rounded border border-accent/20">
                  <p className="font-semibold text-accent">5-7: Moderate</p>
                  <p className="text-muted-foreground">Like a sketch</p>
                </div>
                <div className="p-3 bg-accent/5 rounded border border-accent/20">
                  <p className="font-semibold text-accent">9-10: Hyper</p>
                  <p className="text-muted-foreground">More vivid than reality</p>
                </div>
              </div>

              <Button 
                onClick={submitResponse}
                size="lg" 
                className="w-full"
                aria-label="Submit your mental imagery response"
              >
                Submit Response
              </Button>
            </div>
          </Card>
        </div>
      )}

      {hasSubmitted && (
        <Card className="p-8 text-center bg-gradient-to-br from-primary/10 to-accent/10 animate-fade-in" role="status" aria-live="polite">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" aria-hidden="true" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Response Submitted!</h3>
          <p className="text-muted-foreground">
            The facilitator will reveal the results shortly.
          </p>
        </Card>
      )}
    </main>
  );
};