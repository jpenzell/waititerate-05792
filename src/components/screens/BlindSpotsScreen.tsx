import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Eye, EyeOff, Brain, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BlindSpotsScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
}

export const BlindSpotsScreen = ({ isFacilitator = false, sessionId }: BlindSpotsScreenProps) => {
  const [patterns, setPatterns] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const [blindSpots, setBlindSpots] = useState<any[]>([]);
  const [showBlindSpots, setShowBlindSpots] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    loadData();

    // Auto-trigger analysis if facilitator and not done yet
    if (isFacilitator) {
      checkAndTriggerAnalysis();
    }

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`blind-spot-analysis:${sessionId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'blind_spot_analysis', 
        filter: `session_id=eq.${sessionId}` 
      }, () => {
        loadData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, isFacilitator]);

  const loadData = async () => {
    if (!sessionId) return;

    // Load photos
    const { data: photoData } = await supabase
      .from('photo_submissions')
      .select('*')
      .eq('session_id', sessionId);
    
    if (photoData) setPhotos(photoData);

    // Load patterns
    const { data: patternData } = await supabase
      .from('pattern_submissions')
      .select('*')
      .eq('session_id', sessionId);
    
    if (patternData) setPatterns(patternData);

    // Load existing blind spot analysis
    const { data: blindSpotData } = await supabase
      .from('blind_spot_analysis')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });
    
    if (blindSpotData && blindSpotData.length > 0) {
      setBlindSpots(blindSpotData);
    }
  };

  const checkAndTriggerAnalysis = async () => {
    if (!sessionId) return;

    // Check if analysis has already been done
    const { data: existingAnalysis } = await supabase
      .from('blind_spot_analysis')
      .select('id')
      .eq('session_id', sessionId)
      .limit(1);

    // If no analysis exists, trigger it automatically
    if (!existingAnalysis || existingAnalysis.length === 0) {
      console.log('No blind spot analysis found, triggering now...');
      analyzeBlindSpots();
    }
  };

  const analyzeBlindSpots = async () => {
    if (!sessionId || isAnalyzing) return;

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-blind-spots', {
        body: { sessionId }
      });

      if (error) throw error;

      console.log('Blind spots analysis complete:', data);
      await loadData(); // Reload to get the new blind spots
      setShowBlindSpots(true);
    } catch (error) {
      console.error('Error analyzing blind spots:', error);
      toast.error('Failed to analyze blind spots. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // FACILITATOR VIEW
  if (isFacilitator) {
    return (
      <div className="h-screen flex flex-col py-6 animate-fade-in overflow-hidden">
        <div className="text-center mb-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            What Are We Missing?
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            AI is analyzing what patterns and insights we overlooked
          </p>
          <Badge variant="outline" className="text-lg px-6 py-3">
            🧠 Step 4: Blind Spot Detection
          </Badge>
        </div>

        <div className="flex-1 overflow-y-auto max-w-6xl mx-auto w-full px-4">
          {blindSpots.length === 0 ? (
            <div className="text-center py-12">
              <Brain className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
              <h3 className="text-xl font-semibold mb-2">AI is Analyzing Blind Spots...</h3>
              <p className="text-muted-foreground">
                Looking at {photos.length} photos and {patterns.length} patterns to find what we're missing
              </p>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  What Did We Miss?
                </h2>
                <p className="text-lg text-muted-foreground">
                  AI uncovered patterns and insights humans <span className="font-bold text-amber-500">overlooked</span>
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {blindSpots.map((spot, index) => (
                  <Card 
                    key={spot.id} 
                    className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30 hover:border-amber-500/50 transition-all animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-5xl" role="img" aria-label={spot.category}>{spot.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2">{spot.category}</h3>
                        <p className="text-sm text-amber-600 dark:text-amber-400 font-semibold italic mb-2">
                          "{spot.missed_perspective}"
                        </p>
                        <p className="text-sm text-muted-foreground">{spot.detail}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-8 bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/40 mt-6">
                <div className="flex items-start gap-4">
                  <Lightbulb className="h-12 w-12 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">The Key Insight</h3>
                    <p className="text-lg text-foreground/90 mb-3">
                      Human pattern recognition is powerful, but we naturally focus on what's <span className="font-bold">visible</span>, <span className="font-bold">familiar</span>, and <span className="font-bold">obvious</span>.
                    </p>
                    <p className="text-lg text-primary font-semibold">
                      AI helps us see what we're missing—the overlooked patterns, hidden connections, and less obvious insights that improve learning design.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  }

  // PARTICIPANT VIEW
  return (
    <main className="max-w-2xl mx-auto py-8 px-4" role="main" aria-label="Blind spots reflection">
      <div className="space-y-6 animate-fade-in">
        <header className="text-center space-y-4">
          <Badge variant="secondary" className="mb-2">
            <EyeOff className="h-4 w-4 mr-2" aria-hidden="true" />
            Step 4: Reflection
          </Badge>
          <h1 className="text-4xl font-bold text-foreground">
            What Are We Missing?
          </h1>
          <p className="text-lg text-muted-foreground">
            AI is finding patterns and insights that we missed
          </p>
        </header>

        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Brain className="h-8 w-8 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">What Might We Be Missing?</h3>
                <p className="text-muted-foreground mb-3">
                  We identified patterns in the photos. But humans naturally overlook certain things...
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">→</span>
                    <span>Patterns that exist ACROSS multiple photos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">→</span>
                    <span>Learning preferences that aren't visible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">→</span>
                    <span>Counter-intuitive or unexpected insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">→</span>
                    <span>Environmental, social, or temporal factors</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
          <p className="text-center text-lg text-foreground">
            <span className="font-bold text-amber-500">AI can help us see beyond our natural blind spots.</span><br/>
            <span className="text-sm text-muted-foreground italic">
              Watch the main screen to discover what patterns and insights we overlooked.
            </span>
          </p>
        </Card>
      </div>
    </main>
  );
};
