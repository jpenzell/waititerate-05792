import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AIPatternsScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
}

export const AIPatternsScreen = ({ isFacilitator = false, sessionId }: AIPatternsScreenProps) => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [aiPatterns, setAiPatterns] = useState<any[]>([]);

  useEffect(() => {
    if (!sessionId) {
      setPhotos([]);
      setAiPatterns([]);
      return;
    }

    loadPhotos();
    loadAIPatterns();

    // Trigger analysis if not done yet (facilitator only)
    if (isFacilitator) {
      checkAndTriggerAnalysis();
    }

    const channel = supabase
      .channel(`photo-exercise-phase-ai:${sessionId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'photo_exercise_phase', filter: `session_id=eq.${sessionId}` }, () => {
        loadAIPatterns();
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
      .select('ai_patterns')
      .eq('session_id', sessionId)
      .maybeSingle();

    // If no analysis exists, check if there are photos and trigger analysis
    if (!phaseData?.ai_patterns) {
      const { data: photos } = await supabase
        .from('photo_submissions')
        .select('*')
        .eq('session_id', sessionId);

      if (photos && photos.length > 0) {
        console.log('No analysis found, triggering now...');
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

    console.log('Triggering AI pattern analysis for', photos.length, 'photos');
    const photoUrls = photos.map(p => p.photo_url || p.photo_data);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-photo-patterns', {
        body: { sessionId, photos: photoUrls, analysisType: 'patterns' }
      });
      if (error) {
        console.error('Pattern analysis error:', error);
      } else if (data) {
        console.log('Pattern analysis complete');
        const { data: updated } = await supabase
          .from('photo_exercise_phase')
          .update({ ai_patterns: JSON.stringify(data.results) })
          .eq('session_id', sessionId)
          .select('id');
        if (!updated || updated.length === 0) {
          await supabase
            .from('photo_exercise_phase')
            .insert({ session_id: sessionId, ai_patterns: JSON.stringify(data.results) });
        }
      }
    } catch (e) {
      console.error('Pattern analysis exception:', e);
    }
  };

  const loadPhotos = async () => {
    if (!sessionId) return;
    
    const { data } = await supabase
      .from('photo_submissions')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false });
    
    if (data) setPhotos(data);
  };

  const loadAIPatterns = async () => {
    if (!sessionId) return;
    
    const { data } = await supabase
      .from('photo_exercise_phase')
      .select('ai_patterns')
      .eq('session_id', sessionId)
      .maybeSingle();
    
    if (data?.ai_patterns) {
      const parsed = JSON.parse(data.ai_patterns);
      setAiPatterns(parsed);
    }
  };

  // Facilitator View
  if (isFacilitator) {
    return (
      <div className="h-screen flex flex-col py-6 animate-fade-in overflow-hidden">
        <div className="text-center mb-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Now Let AI Look
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Here's what AI detected across all your photos
          </p>
          <Badge variant="outline" className="text-lg px-6 py-3">
            ✨ Step 3: AI Pattern Analysis
          </Badge>
        </div>

        <div className="flex-1 overflow-y-auto max-w-6xl mx-auto w-full">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Here's what AI found across all your photos
            </h2>
            <p className="text-lg text-muted-foreground">
              Compare: What did we see vs what AI detected
            </p>
          </div>
          {aiPatterns.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
              <h3 className="text-xl font-semibold mb-2">AI is Analyzing Photos...</h3>
              <p className="text-muted-foreground">
                This will take just a few seconds
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {aiPatterns.map((pattern: any, index) => (
                <Card key={index} className="p-5 bg-primary/5 border-primary/20 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-start gap-3 mb-3">
                    <Sparkles className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-lg font-bold text-foreground">{pattern.pattern}</h4>
                        <Badge variant="secondary" className="ml-2">
                          {pattern.photoIndices?.length || 0} photos
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{pattern.description}</p>
                    </div>
                  </div>
                  {pattern.photoIndices && pattern.photoIndices.length > 0 && (
                    <div className="flex gap-1 flex-wrap mt-2">
                      {pattern.photoIndices.slice(0, 6).map((photoIndex: number) => (
                        photos[photoIndex] && (
                           <img
                            key={photoIndex}
                            src={photos[photoIndex].photo_url || photos[photoIndex].photo_data}
                            alt={`Match ${photoIndex}`}
                            className="w-12 h-12 object-cover rounded border border-primary/30"
                          />
                        )
                      ))}
                      {pattern.photoIndices.length > 6 && (
                        <div className="w-12 h-12 flex items-center justify-center bg-muted rounded text-xs font-semibold">
                          +{pattern.photoIndices.length - 6}
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Participant View
  return (
    <div className="h-screen flex items-center justify-center p-6 animate-fade-in">
      <Card className="max-w-2xl w-full p-8 bg-background/90 backdrop-blur-xl text-center">
        <Badge variant="outline" className="mb-4">Step 3 of 5</Badge>
        <Sparkles className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h2 className="text-3xl font-bold text-foreground mb-3">
          AI Pattern Analysis
        </h2>
        <p className="text-muted-foreground text-lg">
          Watch the main screen to see what patterns AI discovered across all the photos
        </p>
        {aiPatterns.length > 0 && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm font-semibold text-primary">
              AI found {aiPatterns.length} distinct patterns
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};
