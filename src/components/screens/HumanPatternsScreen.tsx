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
  const [photos, setPhotos] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResponses, setShowResponses] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setPatterns([]);
      setPhotos([]);
      return;
    }
    loadPatterns();
    loadPhotos();

    const patternChannel = supabase
      .channel(`pattern-submissions:${sessionId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pattern_submissions', filter: `session_id=eq.${sessionId}` }, loadPatterns)
      .subscribe();

    return () => {
      supabase.removeChannel(patternChannel);
    };
  }, [sessionId]);

  const loadPhotos = async () => {
    if (!sessionId) return;
    
    const { data } = await supabase
      .from('photo_submissions')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false });
    
    if (data) setPhotos(data);
  };

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
    // Show responses view
    if (showResponses) {
      return (
        <main className="h-screen flex flex-col py-6 animate-fade-in overflow-hidden" role="main" aria-label="Pattern recognition responses">
          <header className="text-center mb-6">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              Human Pattern Recognition
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              What patterns did everyone see?
            </p>
            <Badge variant="outline" className="text-lg px-6 py-3">
              👥 Step 2: Responses ({patterns.length})
            </Badge>
          </header>

          <section className="flex-1 overflow-y-auto max-w-6xl mx-auto w-full" aria-label="Submitted patterns visualization">
            <WordCloudDisplay words={patterns.map(p => p.pattern_text)} />
          </section>

          <div className="text-center mt-4">
            <Button 
              onClick={() => setShowResponses(false)}
              variant="outline"
              size="lg"
              aria-label="Go back to photo display"
            >
              Back to Photos
            </Button>
          </div>
        </main>
      );
    }

    // Show photos while participants submit
    return (
      <main className="h-screen flex flex-col py-6 animate-fade-in overflow-hidden" role="main" aria-label="Photo display for pattern recognition">
        <header className="text-center mb-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            What Patterns Do You See?
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Participants: Look at these photos and submit patterns you notice
          </p>
          <Badge variant="outline" className="text-lg px-6 py-3">
            👥 Step 2: Pattern Recognition
          </Badge>
        </header>

        <section className="flex-1 overflow-y-auto max-w-6xl mx-auto w-full px-4" aria-label="Photo collection">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
            {photos.map((photo: any, index) => (
              <Card key={photo.id} className="p-2 animate-fade-in">
                <img 
                  src={photo.photo_url || photo.photo_data} 
                  alt={`Learning preference photo ${index + 1}`} 
                  className="w-full h-32 object-cover rounded mb-2" 
                />
              </Card>
            ))}
          </div>
        </section>

        <div className="text-center mt-4">
          <div className="mb-3">
            <Badge variant="secondary" className="text-base px-4 py-2">
              <Users className="h-4 w-4 mr-2" aria-hidden="true" />
              {patterns.length} patterns submitted so far
            </Badge>
          </div>
          <Button 
            onClick={() => setShowResponses(true)}
            size="lg"
            className="px-12"
            aria-label="View all pattern responses"
          >
            View Responses
          </Button>
        </div>
      </main>
    );
  }

  // Participant View
  return (
    <main className="h-screen flex flex-col p-6 animate-fade-in overflow-y-auto" role="main" aria-label="Pattern submission form">
      <header className="text-center mb-6">
        <Badge variant="outline" className="mb-4">Step 2 of 6</Badge>
        <h2 className="text-3xl font-bold text-foreground mb-3">
          <Users className="inline-block mr-2 h-8 w-8 text-primary" aria-hidden="true" />
          What Patterns Do You See?
        </h2>
        <p className="text-muted-foreground">
          Look at all the photos on the main screen. What themes, colors, objects, or feelings do you notice?
        </p>
      </header>

      {/* Photos preview for participants */}
      <section className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full mb-6" aria-label="Photo reference">
        <div className="grid grid-cols-3 gap-2 mb-6">
          {photos.slice(0, 9).map((photo: any, index) => (
            <div key={photo.id} className="relative aspect-square">
              <img 
                src={photo.photo_url || photo.photo_data} 
                alt={`Reference photo ${index + 1}`} 
                className="w-full h-full object-cover rounded" 
              />
            </div>
          ))}
        </div>
        {photos.length > 9 && (
          <p className="text-sm text-center text-muted-foreground mb-4">
            ...and {photos.length - 9} more photos on the main screen
          </p>
        )}
      </section>

      <Card className="max-w-2xl w-full mx-auto p-8 bg-background/90 backdrop-blur-xl">
        <div className="space-y-4">
          <label htmlFor="pattern-input" className="sr-only">Enter the patterns you notice</label>
          <Textarea
            id="pattern-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="I notice a pattern of..."
            className="min-h-[120px] text-lg"
            disabled={isSubmitting}
            aria-label="Enter patterns you observe in the photos"
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
            aria-label="Submit your pattern observation"
          >
            <Send className="mr-2 h-5 w-5" aria-hidden="true" />
            {isSubmitting ? 'Submitting...' : 'Submit Pattern'}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Tip: Submit as many patterns as you see! Press Ctrl+Enter or click Submit.
          </p>
        </div>
      </Card>
    </main>
  );
};
