import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Eye, EyeOff, Brain, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlindSpotsScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
}

export const BlindSpotsScreen = ({ isFacilitator = false, sessionId }: BlindSpotsScreenProps) => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [patterns, setPatterns] = useState<any[]>([]);
  const [showBlindSpots, setShowBlindSpots] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    loadPhotos();
    loadPatterns();
  }, [sessionId]);

  const loadPhotos = async () => {
    if (!sessionId) return;
    
    const { data } = await supabase
      .from('photo_submissions')
      .select('*')
      .eq('session_id', sessionId);
    
    if (data) {
      setPhotos(data);
    }
  };

  const loadPatterns = async () => {
    if (!sessionId) return;
    
    const { data } = await supabase
      .from('pattern_submissions')
      .select('*')
      .eq('session_id', sessionId);
    
    if (data) {
      setPatterns(data);
    }
  };

  // FACILITATOR VIEW
  if (isFacilitator) {
    const blindSpots = [
      {
        category: "Sensory Preferences",
        missed: "How do auditory learners process this content?",
        icon: "🎧",
        detail: "We focused on visual learning but didn't capture how people who learn best through listening or verbal processing might approach this differently."
      },
      {
        category: "Processing Speed",
        missed: "What about those who need more time to absorb information?",
        icon: "⏱️",
        detail: "Fast pattern recognition doesn't mean better learning. Some of the deepest insights come from slower, more deliberate processing."
      },
      {
        category: "Context Dependence",
        missed: "How does environment affect different cognitive styles?",
        icon: "🌍",
        detail: "Some brains thrive in chaotic environments, others need complete quiet. We didn't capture environmental preferences."
      },
      {
        category: "Abstract vs. Concrete",
        missed: "Where are the abstract thinkers?",
        icon: "🔮",
        detail: "Photos are concrete. But some learners think in pure concepts, relationships, and systems that can't be photographed."
      },
      {
        category: "Social Context",
        missed: "What about collaborative vs. solo learning preferences?",
        icon: "👥",
        detail: "Learning doesn't happen in isolation for everyone. Some need social interaction to process, others need solitude."
      },
      {
        category: "Motivation & Engagement",
        missed: "What drives different learners to engage?",
        icon: "⚡",
        detail: "Intrinsic vs. extrinsic motivation, curiosity-driven vs. goal-oriented, playful vs. serious approaches—all invisible in our data."
      }
    ];

    return (
      <main className="h-screen flex flex-col py-6 px-4 animate-fade-in overflow-y-auto" role="main" aria-label="Blind spots and missing perspectives">
        <header className="text-center mb-6">
          <Badge className="mb-4">
            <EyeOff className="h-4 w-4 mr-2" aria-hidden="true" />
            Step 4: What Are We Missing?
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            The Invisible Differences
          </h1>
          <p className="text-lg text-muted-foreground">
            What patterns did we <span className="font-bold text-primary">NOT</span> capture?
          </p>
        </header>

        {!showBlindSpots ? (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-8 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-12 w-12 text-amber-500 flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Here's What We Collected</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-lg">
                    <div className="p-4 bg-background rounded-lg border border-border">
                      <p className="font-semibold text-primary">{photos.length} Photos</p>
                      <p className="text-sm text-muted-foreground">Visual learning preferences</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg border border-border">
                      <p className="font-semibold text-accent">{patterns.length} Patterns</p>
                      <p className="text-sm text-muted-foreground">Human-identified themes</p>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground mt-4">
                    But photos only capture <span className="font-bold text-amber-500">visible, visual preferences</span>. 
                    What about the cognitive differences we <span className="italic">can't photograph</span>?
                  </p>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <Button 
                onClick={() => setShowBlindSpots(true)}
                size="lg"
                className="px-12"
                aria-label="Reveal the blind spots and missing perspectives"
              >
                <Eye className="mr-2 h-5 w-5" aria-hidden="true" />
                Reveal What We're Missing
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="h-8 w-8 text-primary" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-foreground">The Blind Spots</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-2">
                This is why designing for cognitive diversity is so hard—and so important:
              </p>
              <p className="text-base text-foreground italic">
                Most neurocognitive differences are <span className="font-bold text-primary">invisible</span>. 
                You can't see dyslexia, ADHD, autism, or processing speed differences by looking at someone.
              </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {blindSpots.map((spot, index) => (
                <Card 
                  key={index} 
                  className="p-6 bg-gradient-to-br from-background to-muted/20 border border-border hover:border-primary/40 transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-4xl" role="img" aria-label={spot.category}>{spot.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{spot.category}</h3>
                      <p className="text-sm text-muted-foreground italic mb-2">{spot.missed}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80">{spot.detail}</p>
                </Card>
              ))}
            </div>

            <Card className="p-8 bg-gradient-to-r from-accent/20 to-primary/20 border-2 border-accent/40">
              <div className="flex items-start gap-4">
                <Lightbulb className="h-12 w-12 text-accent flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">The UDL Lesson</h3>
                  <p className="text-lg text-foreground/90 mb-3">
                    If we design learning experiences based only on what we can <span className="font-bold">see</span> or what's <span className="font-bold">loudest</span>, 
                    we'll miss the majority of cognitive diversity.
                  </p>
                  <p className="text-lg text-primary font-semibold">
                    This is why Universal Design for Learning doesn't ask "What disabilities do learners have?" 
                    It asks: "What barriers might EXIST that we can't even see yet?"
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>
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
            Watch the main screen for important insights
          </p>
        </header>

        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Brain className="h-8 w-8 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Think About This:</h3>
                <p className="text-muted-foreground mb-3">
                  We just collected visual learning preferences through photos. 
                  But what about all the learning differences that <span className="font-semibold text-foreground">can't be photographed</span>?
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">→</span>
                    <span>How do auditory learners process differently?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">→</span>
                    <span>What about processing speed differences?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">→</span>
                    <span>How do abstract thinkers learn without concrete examples?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">→</span>
                    <span>What environmental factors affect different brains?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
          <p className="text-center text-lg text-foreground">
            <span className="font-bold text-amber-500">Most cognitive differences are invisible.</span><br/>
            <span className="text-sm text-muted-foreground italic">
              That's why designing for diversity requires intentional, systematic approaches—not assumptions.
            </span>
          </p>
        </Card>
      </div>
    </main>
  );
};
