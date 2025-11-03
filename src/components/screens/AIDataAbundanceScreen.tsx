import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface AIDataAbundanceScreenProps {
  isFacilitator?: boolean;
}

export const AIDataAbundanceScreen = ({ isFacilitator = false }: AIDataAbundanceScreenProps) => {
  const [sessionId] = useState('iterate2025');
  const [numericEstimates, setNumericEstimates] = useState<any[]>([]);
  const [aiDatapointCount, setAiDatapointCount] = useState<number | null>(null);
  const [numericGuess, setNumericGuess] = useState("");
  const [photos, setPhotos] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    loadPhotos();
    loadNumericEstimates();
    loadAICount();
  }, [sessionId]);

  useEffect(() => {
    const channel = supabase
      .channel('estimates-abundance-channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'numeric_estimates',
        filter: `session_id=eq.${sessionId}`
      }, () => {
        loadNumericEstimates();
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'photo_exercise_phase',
        filter: `session_id=eq.${sessionId}`
      }, (payload: any) => {
        if (payload.new.ai_datapoint_count !== null) {
          setAiDatapointCount(payload.new.ai_datapoint_count);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const loadPhotos = async () => {
    const { data } = await supabase
      .from('photo_submissions')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });
    if (data) setPhotos(data);
  };

  const loadNumericEstimates = async () => {
    const { data } = await supabase
      .from('numeric_estimates')
      .select('*')
      .eq('session_id', sessionId);
    if (data) setNumericEstimates(data);
  };

  const loadAICount = async () => {
    const { data } = await supabase
      .from('photo_exercise_phase')
      .select('ai_datapoint_count')
      .eq('session_id', sessionId)
      .maybeSingle();
    
    if (data?.ai_datapoint_count) {
      setAiDatapointCount(data.ai_datapoint_count);
    }
  };

  const submitNumericEstimate = async () => {
    const estimate = parseInt(numericGuess);
    if (isNaN(estimate) || estimate < 1) {
      toast.error('Please enter a valid number');
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('Please sign in first');
      return;
    }

    const { error } = await supabase
      .from('numeric_estimates')
      .insert({
        session_id: sessionId,
        user_id: user.id,
        estimate
      });

    if (error) {
      console.error('Failed to submit estimate:', error);
      toast.error('Failed to submit estimate');
      return;
    }

    setNumericGuess('');
    toast.success('Estimate submitted!');
  };

  const runAIDatapointCount = async () => {
    if (photos.length === 0) {
      toast.error('No photos to analyze');
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-photo-patterns', {
        body: { photos: [photos[0].photo_data], analysisType: 'datapoints' }
      });

      if (error) throw error;

      const count = data.results.length;
      const { error: updateError } = await supabase
        .from('photo_exercise_phase')
        .update({ ai_datapoint_count: count })
        .eq('session_id', sessionId);

      if (updateError) throw updateError;

      setAiDatapointCount(count);
      setShowResults(true);
      toast.success(`AI found ${count} types of data points!`);
    } catch (error) {
      console.error('Error running AI analysis:', error);
      toast.error('AI analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Facilitator View
  if (isFacilitator) {
    return (
      <div className="h-screen flex flex-col py-6 animate-fade-in overflow-hidden">
        <div className="text-center mb-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            {!showResults ? 'How Much Data From ONE Photo?' : 'This Is Measurement Abundance'}
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            {!showResults ? 'Let\'s test AI measurement abundance' : 'The paradigm has shifted'}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto max-w-6xl mx-auto w-full">
          {!showResults ? (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Quick question: How many data points can we get from ONE photo?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Everyone make your best guess!
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {numericEstimates.length > 0 ? (
                    numericEstimates.map((est) => (
                      <Card key={est.id} className="p-4 text-center bg-primary/5">
                        <div className="text-3xl font-bold text-primary">{est.estimate}</div>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      Waiting for estimates...
                    </div>
                  )}
                </div>

                {numericEstimates.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                    <Card className="p-4 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Lowest</div>
                      <div className="text-2xl font-bold text-primary">
                        {Math.min(...numericEstimates.map(e => e.estimate))}
                      </div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Average</div>
                      <div className="text-2xl font-bold text-primary">
                        {Math.round(numericEstimates.reduce((sum, e) => sum + e.estimate, 0) / numericEstimates.length)}
                      </div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Highest</div>
                      <div className="text-2xl font-bold text-primary">
                        {Math.max(...numericEstimates.map(e => e.estimate))}
                      </div>
                    </Card>
                  </div>
                )}

                {aiDatapointCount === null && numericEstimates.length > 0 && (
                  <div className="text-center">
                    <Button onClick={runAIDatapointCount} size="lg" disabled={isAnalyzing}>
                      {isAnalyzing ? 'Analyzing...' : 'Reveal AI Count →'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-6xl font-bold text-foreground mb-4">
                  {aiDatapointCount !== null && (
                    <>AI found <span className="text-primary">{aiDatapointCount}</span> types of data</>
                  )}
                </h2>
                <p className="text-2xl text-primary font-semibold mb-4">
                  From just ONE photograph.
                </p>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  This is measurement abundance. And here's the kicker: taking a photo costs almost nothing.
                  No survey fatigue. No completion rates. No 8-week data collection cycle.
                </p>
              </div>
              
              <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
                <h3 className="text-2xl font-bold text-center mb-6">The Abundance Shift</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">📸</div>
                      <div>
                        <h4 className="font-bold mb-1">Zero-Cost Data Collection</h4>
                        <p className="text-sm text-muted-foreground">
                          Photos are free, instant, and require no special tools
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">🔄</div>
                      <div>
                        <h4 className="font-bold mb-1">Experiment Freely</h4>
                        <p className="text-sm text-muted-foreground">
                          When measurement costs nothing, you can try anything
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">⚡</div>
                      <div>
                        <h4 className="font-bold mb-1">Instant Feedback</h4>
                        <p className="text-sm text-muted-foreground">
                          Know what's working within hours, not months
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">🚀</div>
                      <div>
                        <h4 className="font-bold mb-1">Rapid Iteration</h4>
                        <p className="text-sm text-muted-foreground">
                          Ship, measure, learn, improve—all in the same week
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Participant View
  return (
    <div className="min-h-screen flex items-center justify-center p-6 animate-fade-in">
      <Card className="max-w-2xl w-full p-8">
        {!showResults ? (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <TrendingUp className="h-16 w-16 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">How Many Data Points?</h2>
              <p className="text-muted-foreground">
                From ONE photograph, how many different data points do you think AI can extract?
              </p>
            </div>
            <input
              type="number"
              placeholder="Enter your estimate..."
              value={numericGuess}
              onChange={(e) => setNumericGuess(e.target.value)}
              min="1"
              className="w-full text-center text-4xl font-bold p-6 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none"
            />
            <Button onClick={submitNumericEstimate} size="lg" className="w-full">
              <Send className="mr-2 h-5 w-5" />
              Submit Estimate
            </Button>
          </div>
        ) : (
          <div className="text-center py-12">
            <Sparkles className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
            <h3 className="text-xl font-semibold mb-2">Results Coming!</h3>
            <p className="text-muted-foreground">
              Watch the main screen to see how AI performed!
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};
