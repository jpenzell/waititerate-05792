import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Sparkles, Lightbulb, Users, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CognitiveReflectionScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
}

export const CognitiveReflectionScreen = ({ isFacilitator = false, sessionId }: CognitiveReflectionScreenProps) => {
  const [responses, setResponses] = useState({
    surprise: "",
    designing: "",
    aiSupport: ""
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [allResponses, setAllResponses] = useState<any[]>([]);

  useEffect(() => {
    if (!sessionId) return;

    loadResponses();

    const channel = supabase
      .channel(`cognitive-reflection:${sessionId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'cognitive_reflection_responses',
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
      .from('cognitive_reflection_responses')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false });
    
    if (data) {
      setAllResponses(data);
    }
  };

  const prompts = [
    {
      id: "surprise",
      icon: Brain,
      question: "What surprised you about how others think differently?",
      placeholder: "e.g., 'I had no idea some people don't see mental images...'"
    },
    {
      id: "designing",
      icon: Lightbulb,
      question: "Where might you be unintentionally designing for your own brain?",
      placeholder: "e.g., 'I always use visual diagrams because that's how I think...'"
    },
    {
      id: "aiSupport",
      icon: Sparkles,
      question: "How could AI help balance or complement your cognitive strengths?",
      placeholder: "e.g., 'AI could generate text descriptions of my visual concepts...'"
    }
  ];

  const handleSubmit = async () => {
    if (!sessionId) {
      toast.error('No session found');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('cognitive_reflection_responses').insert({
        session_id: sessionId,
        user_id: user.id,
        surprise_response: responses.surprise,
        designing_response: responses.designing,
        ai_support_response: responses.aiSupport,
      });

      if (error) throw error;
      setHasSubmitted(true);
      toast.success('Reflections submitted!');
    } catch (error) {
      console.error('Error submitting reflections:', error);
      toast.error('Failed to submit reflections');
    }
  };

  // FACILITATOR VIEW
  if (isFacilitator) {
    return (
      <div className="h-screen flex flex-col py-6 px-4 animate-fade-in overflow-y-auto">
        <div className="text-center mb-6">
          <Badge className="mb-4">
            <Users className="h-4 w-4 mr-2" />
            Cognitive Reflection Responses
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Making It Personal
          </h1>
          <p className="text-lg text-muted-foreground">
            Responses: <span className="font-bold text-primary">{allResponses.length}</span>
          </p>
        </div>

        {allResponses.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Waiting for participant reflections...</p>
          </Card>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {allResponses.map((response, idx) => (
              <Card key={response.id} className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">Response {idx + 1}</Badge>
                </div>
                <div className="space-y-6">
                  {response.surprise_response && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <p className="text-sm font-semibold text-foreground">What surprised you about how others think differently?</p>
                      </div>
                      <div className="pl-7">
                        <p className="text-muted-foreground italic bg-background/50 p-4 rounded-lg">
                          "{response.surprise_response}"
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {response.designing_response && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-primary" />
                        <p className="text-sm font-semibold text-foreground">Where might you be unintentionally designing for your own brain?</p>
                      </div>
                      <div className="pl-7">
                        <p className="text-muted-foreground italic bg-background/50 p-4 rounded-lg">
                          "{response.designing_response}"
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {response.ai_support_response && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <p className="text-sm font-semibold text-foreground">How could AI help balance or complement your cognitive strengths?</p>
                      </div>
                      <div className="pl-7">
                        <p className="text-muted-foreground italic bg-background/50 p-4 rounded-lg">
                          "{response.ai_support_response}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // PARTICIPANT VIEW
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/10 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {!hasSubmitted ? (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="mb-2">
                <Users className="h-4 w-4 mr-2" />
                Personal Reflection
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                Making It Personal
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Now that you've experienced cognitive diversity firsthand, let's reflect on what it means for <strong>your learning design practice.</strong>
              </p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="space-y-8">
                {prompts.map((prompt) => {
                  const Icon = prompt.icon;
                  return (
                    <div key={prompt.id} className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground mb-3">
                            {prompt.question}
                          </h3>
                          <Textarea
                            placeholder={prompt.placeholder}
                            value={responses[prompt.id as keyof typeof responses]}
                            onChange={(e) => setResponses(prev => ({
                              ...prev,
                              [prompt.id]: e.target.value
                            }))}
                            className="min-h-32 bg-background/50"
                          />
                        </div>
                      </div>
                      {prompt.id !== "aiSupport" && (
                        <div className="border-t border-border" />
                      )}
                    </div>
                  );
                })}

                <Button 
                  onClick={handleSubmit}
                  size="lg" 
                  className="w-full"
                  disabled={!responses.surprise && !responses.designing && !responses.aiSupport}
                >
                  Save Reflections
                  <CheckCircle2 className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-background/50 border border-border">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Optional: Share with Breakout Groups</p>
                <p className="text-sm text-muted-foreground">
                  If you're in a live session, your facilitator may invite you to discuss your reflections in small groups. This deepens learning by exposing you to even more cognitive perspectives.
                </p>
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="mb-2">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Reflection Complete
              </Badge>
              <h2 className="text-5xl font-bold text-foreground">
                Thank You for Reflecting
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your insights reveal how <strong>invisible cognitive diversity</strong> shapes everything we design.
              </p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground text-center mb-6">Your Reflections</h3>
                
                {prompts.map((prompt) => {
                  const Icon = prompt.icon;
                  const response = responses[prompt.id as keyof typeof responses];
                  if (!response) return null;
                  
                  return (
                    <div key={prompt.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <p className="text-sm font-semibold text-foreground">{prompt.question}</p>
                      </div>
                      <div className="pl-7">
                        <p className="text-muted-foreground italic bg-background/50 p-4 rounded-lg">
                          "{response}"
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/30">
              <div className="text-center space-y-4">
                <h3 className="text-3xl font-bold text-foreground">The Universal Design Insight</h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  <strong>We can't see inside each other's minds.</strong> The only way to design inclusively is to assume radical variation and provide <strong>multiple means of representation, engagement, and expression.</strong>
                </p>
                <p className="text-base text-foreground/80 italic max-w-2xl mx-auto">
                  This is why UDL isn't optional—it's essential for equity in learning.
                </p>
                <div className="pt-4">
                  <p className="text-xs text-muted-foreground">
                    Framework: CAST — Universal Design for Learning Guidelines v3.0 (2024, AI-aware)
                  </p>
                </div>
              </div>
            </Card>

            {isFacilitator && (
              <div className="text-center">
                <Button onClick={() => {
                  setHasSubmitted(false);
                  setResponses({ surprise: "", designing: "", aiSupport: "" });
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
