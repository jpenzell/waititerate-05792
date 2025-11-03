import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Target, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AIDatapointsScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
}

export const AIDatapointsScreen = ({ isFacilitator = false, sessionId }: AIDatapointsScreenProps) => {
  const [numericEstimates, setNumericEstimates] = useState<any[]>([]);
  const [aiDatapointCounts, setAiDatapointCounts] = useState<number[]>([]);

  useEffect(() => {
    if (!sessionId) {
      setNumericEstimates([]);
      setAiDatapointCounts([]);
      return;
    }

    loadNumericEstimates();
    loadAIDatapoints();

    // Trigger analysis if not done yet (facilitator only)
    if (isFacilitator) {
      checkAndTriggerAnalysis();
    }

    const channel = supabase
      .channel(`photo-exercise-datapoints:${sessionId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'photo_exercise_phase', filter: `session_id=eq.${sessionId}` }, () => {
        loadAIDatapoints();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, isFacilitator]);

  const checkAndTriggerAnalysis = async () => {
    if (!sessionId) return;

    // Check if analysis has already been done
    const { data: phaseData } = await supabase
      .from('photo_exercise_phase')
      .select('ai_datapoint_details')
      .eq('session_id', sessionId)
      .maybeSingle();

    // If no analysis exists, check if there are photos and trigger analysis
    if (!phaseData?.ai_datapoint_details) {
      const { data: photos } = await supabase
        .from('photo_submissions')
        .select('*')
        .eq('session_id', sessionId);

      if (photos && photos.length > 0) {
        console.log('No datapoint analysis found, triggering now...');
        triggerAnalysis();
      }
    }
  };

  const triggerAnalysis = async () => {
    if (!sessionId) return;

    const { data: photos } = await supabase
      .from('photo_submissions')
      .select('*')
      .eq('session_id', sessionId);

    if (!photos || photos.length === 0) return;

    console.log('Triggering AI datapoint analysis for', photos.length, 'photos');
    const photoUrls = photos.map(p => p.photo_url || p.photo_data);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-photo-patterns', {
        body: { sessionId, photos: photoUrls, analysisType: 'datapoints' }
      });
      if (error) {
        console.error('Datapoint analysis error:', error);
      } else if (data) {
        console.log('Datapoint analysis complete');
        const counts = data.results.map((r: any) => r.dataPointCount);
        const maxCount = Math.max(...counts);
        const avgCount = Math.round(counts.reduce((a: number, b: number) => a + b, 0) / counts.length);

        const { data: updated } = await supabase
          .from('photo_exercise_phase')
          .update({
            ai_datapoint_count: maxCount,
            ai_datapoint_details: JSON.stringify({ counts, max: maxCount, avg: avgCount })
          })
          .eq('session_id', sessionId)
          .select('id');
        if (!updated || updated.length === 0) {
          await supabase
            .from('photo_exercise_phase')
            .insert({
              session_id: sessionId,
              ai_datapoint_count: maxCount,
              ai_datapoint_details: JSON.stringify({ counts, max: maxCount, avg: avgCount })
            });
        }
      }
    } catch (e) {
      console.error('Datapoint analysis exception:', e);
    }
  };

  const loadNumericEstimates = async () => {
    const { data } = await supabase
      .from('numeric_estimates')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false });
    
    if (data) setNumericEstimates(data);
  };

  const loadAIDatapoints = async () => {
    if (!sessionId) return;
    
    const { data } = await supabase
      .from('photo_exercise_phase')
      .select('ai_datapoint_details')
      .eq('session_id', sessionId)
      .maybeSingle();
    
    if (data?.ai_datapoint_details) {
      const parsed = JSON.parse(data.ai_datapoint_details);
      setAiDatapointCounts(parsed.counts || []);
    }
  };

  // Facilitator View
  if (isFacilitator) {
    return (
      <div className="h-screen flex flex-col py-6 animate-fade-in overflow-hidden">
        <div className="text-center mb-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            The Reality of Measurement Abundance
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Here's what AI actually extracted from your photos
          </p>
          <Badge variant="outline" className="text-lg px-6 py-3">
            🚀 Step 5: AI Datapoint Analysis
          </Badge>
        </div>

        <div className="flex-1 overflow-y-auto max-w-6xl mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              The Abundance Reveal
            </h2>
            
            {/* Comparison: Human Estimates vs AI Reality */}
            {numericEstimates.length > 0 && aiDatapointCounts.length > 0 ? (
              <div className="max-w-5xl mx-auto mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Human Estimates */}
                  <Card className="p-6 bg-muted/50">
                    <h3 className="text-xl font-bold mb-4 text-center">Your Estimates (Step 4)</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">Lowest</div>
                        <div className="text-2xl font-bold text-foreground">
                          {Math.min(...numericEstimates.map(e => e.estimate))}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">Average</div>
                        <div className="text-2xl font-bold text-foreground">
                          {Math.round(numericEstimates.reduce((sum, e) => sum + e.estimate, 0) / numericEstimates.length)}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">Highest</div>
                        <div className="text-2xl font-bold text-foreground">
                          {Math.max(...numericEstimates.map(e => e.estimate))}
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  {/* AI Reality */}
                  <Card className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/40">
                    <h3 className="text-xl font-bold mb-4 text-center">AI Reality (Per Photo)</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">Maximum</div>
                        <div className="text-4xl font-bold text-primary">
                          {Math.max(...aiDatapointCounts)}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">Average</div>
                        <div className="text-4xl font-bold text-accent">
                          {Math.round(aiDatapointCounts.reduce((a, b) => a + b, 0) / aiDatapointCounts.length)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-primary/20 text-center">
                      <p className="text-sm text-muted-foreground">
                        Analyzed {aiDatapointCounts.length} photo{aiDatapointCounts.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Sparkles className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
                <h3 className="text-xl font-semibold mb-2">AI is Analyzing All Photos...</h3>
                <p className="text-muted-foreground">
                  Extracting every possible data point
                </p>
              </div>
            )}
            
            {aiDatapointCounts.length > 0 && (
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                This is measurement abundance. And here's the kicker: taking a photo costs almost nothing.
                No survey fatigue. No completion rates. No 8-week data collection cycle.
              </p>
            )}
          </div>
          
          {aiDatapointCounts.length > 0 && (
            <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
              <h3 className="text-2xl font-bold text-center mb-6">The Abundance Shift</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Target className="h-6 w-6 text-destructive shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Old World (Scarcity)</h4>
                      <p className="text-sm text-muted-foreground">
                        5-10 data points per survey. Each data point required planning, cost, and time.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-6 w-6 text-yellow-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Scarcity Mindset</h4>
                      <p className="text-sm text-muted-foreground">
                        "We can't measure that." "Too expensive." "Takes too long."
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-foreground mb-1">New World (Abundance)</h4>
                      <p className="text-sm text-muted-foreground">
                        {Math.max(...aiDatapointCounts)}+ data points from one photo. Instant. Automatic. Free.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-6 w-6 text-accent shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Abundance Mindset</h4>
                      <p className="text-sm text-muted-foreground">
                        "What else can we measure?" "Let's try it." "We'll know tomorrow."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // Participant View
  return (
    <div className="h-screen flex items-center justify-center p-6 animate-fade-in">
      <Card className="max-w-2xl w-full p-8 bg-background/90 backdrop-blur-xl text-center">
        <Badge variant="outline" className="mb-4">Step 5 of 5</Badge>
        <Sparkles className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
        <h2 className="text-3xl font-bold text-foreground mb-3">
          The Abundance Reveal
        </h2>
        <p className="text-muted-foreground text-lg">
          Watch the main screen to see how many data points AI can extract from a single photo
        </p>
        {aiDatapointCounts.length > 0 && (
          <div className="mt-6 p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg border border-primary/40">
            <div className="text-5xl font-bold text-primary mb-2">
              {Math.max(...aiDatapointCounts)}
            </div>
            <p className="text-sm font-semibold text-foreground">
              Maximum data points from one photo
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};
