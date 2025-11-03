import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Send, Users } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { WordCloudDisplay } from "@/components/WordCloudDisplay";

interface HumanPatternsScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
}

export const HumanPatternsScreen = ({ isFacilitator = false, sessionId }: HumanPatternsScreenProps) => {
  const [patterns, setPatterns] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setPatterns([]);
      return;
    }
    loadPatterns();

    const channel = supabase
      .channel(`pattern-submissions:${sessionId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pattern_submissions', filter: `session_id=eq.${sessionId}` }, loadPatterns)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const loadPatterns = async () => {
    if (!sessionId) {
      setPatterns([]);
      return;
    }
    const { data } = await supabase
      .from('pattern_submissions')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false });
    
    if (data) setPatterns(data);
  };

  const submitPattern = async () => {
    if (!inputText.trim() || isSubmitting || !sessionId) return;

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('pattern_submissions').insert({
        session_id: sessionId,
        user_id: user.id,
        pattern_text: inputText.trim(),
      });

      if (error) throw error;
      setInputText("");
      toast.success('Pattern submitted! Add another if you like.');
    } catch (error) {
      console.error('Error submitting pattern:', error);
      toast.error('Failed to submit pattern');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Facilitator View
  if (isFacilitator) {
    return (
      <div className="h-screen flex flex-col py-6 animate-fade-in overflow-hidden">
        <div className="text-center mb-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            What Patterns Do You See?
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Look across all the photos—what stands out to you?
          </p>
          <Badge variant="outline" className="text-lg px-6 py-3">
            👥 Step 2: Human Pattern Recognition
          </Badge>
        </div>

        <div className="flex-1 overflow-y-auto max-w-6xl mx-auto w-full">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              What patterns do you see across all these photos?
            </h2>
            <p className="text-lg text-muted-foreground">
              Common themes, objects, colors, feelings...
            </p>
          </div>
          <WordCloudDisplay words={patterns.map(p => p.pattern_text)} />
        </div>
      </div>
    );
  }

  // Participant View
  return (
    <div className="h-screen flex items-center justify-center p-6 animate-fade-in">
      <Card className="max-w-2xl w-full p-8 bg-background/90 backdrop-blur-xl">
        <div className="text-center mb-6">
          <Badge variant="outline" className="mb-4">Step 2 of 5</Badge>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            <Users className="inline-block mr-2 h-8 w-8 text-primary" />
            What Patterns Do You See?
          </h2>
          <p className="text-muted-foreground">
            Look at all the photos on the main screen. What themes, colors, objects, or feelings do you notice?
          </p>
        </div>

        <div className="space-y-4">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="I notice a pattern of..."
            className="min-h-[120px] text-lg"
            disabled={isSubmitting}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey && inputText.trim() && !isSubmitting) {
                submitPattern();
              }
            }}
          />
          <Button 
            onClick={submitPattern} 
            size="lg" 
            className="w-full" 
            disabled={!inputText.trim() || isSubmitting}
          >
            <Send className="mr-2 h-5 w-5" />
            {isSubmitting ? 'Submitting...' : 'Submit Pattern'}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Tip: Submit as many patterns as you see! Press Ctrl+Enter or click Submit.
          </p>
        </div>
      </Card>
    </div>
  );
};
