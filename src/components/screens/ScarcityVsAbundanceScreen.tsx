import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, AlertTriangle } from "lucide-react";
import { DataBite } from "@/components/blocks/DataBite";
import { supabase } from "@/integrations/supabase/client";

interface ScarcityVsAbundanceScreenProps {
  sessionId?: string;
}

export const ScarcityVsAbundanceScreen = ({ sessionId }: ScarcityVsAbundanceScreenProps) => {
  const [hoveredSide, setHoveredSide] = useState<'old' | 'new' | null>(null);
  const [estimateRange, setEstimateRange] = useState<{ min: number; max: number; avg: number } | null>(null);
  const [aiDatapoints, setAiDatapoints] = useState<{ max: number; avg: number } | null>(null);

  useEffect(() => {
    if (sessionId) {
      loadEstimates();
      loadAIDatapoints();
    }
  }, [sessionId]);

  const loadEstimates = async () => {
    const { data } = await supabase
      .from('numeric_estimates')
      .select('estimate')
      .eq('session_id', sessionId);

    if (data && data.length > 0) {
      const estimates = data.map(d => d.estimate);
      const min = Math.min(...estimates);
      const max = Math.max(...estimates);
      const avg = Math.round(estimates.reduce((a, b) => a + b, 0) / estimates.length);
      setEstimateRange({ min, max, avg });
    }
  };

  const loadAIDatapoints = async () => {
    const { data } = await supabase
      .from('photo_exercise_phase')
      .select('ai_datapoint_count, ai_datapoint_details')
      .eq('session_id', sessionId)
      .single();

    if (data) {
      const details = data.ai_datapoint_details ? JSON.parse(data.ai_datapoint_details) : null;
      setAiDatapoints({
        max: data.ai_datapoint_count || 0,
        avg: details?.avg || 0
      });
    }
  };

  return (
    <div className="h-screen flex flex-col py-6 animate-fade-in overflow-hidden">
      {/* Bridge from previous exercise */}
      {estimateRange && aiDatapoints && (
        <div className="max-w-5xl mx-auto mb-4">
          <Card className="p-4 bg-gradient-to-r from-accent/20 via-primary/20 to-secondary/20 border-2 border-primary/40">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground mb-2">
                You just estimated <span className="text-accent">~{estimateRange.min}-{estimateRange.max} data points</span> per photo
              </p>
              <p className="text-xl font-bold text-primary mb-2">
                AI actually extracted <span className="text-accent text-2xl">{aiDatapoints.max}+</span> measurements
              </p>
              <p className="text-base text-muted-foreground">
                This isn't a cute demo—this is the new reality. <span className="font-semibold text-foreground">When measurement becomes this abundant,</span>
              </p>
              <p className="text-lg font-bold text-primary mt-1">
                everything about how we work must change ↓
              </p>
            </div>
          </Card>
        </div>
      )}

      <div className="text-center mb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
          The Paradigm Shift
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-light">
          This isn't about AI technology—it's about changing how we think and act
        </p>
      </div>

      {/* Photography Analogy - Redesigned for Impact */}
      <div className="max-w-6xl mx-auto mb-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-foreground">
          Remember when photography changed everything?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Film Era */}
          <Card className="relative overflow-hidden border-2 border-destructive/30 bg-gradient-to-br from-destructive/5 to-background">
            <div className="absolute top-0 left-0 right-0 h-1 bg-destructive"></div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-7xl">📷</div>
                <div>
                  <Badge variant="destructive" className="mb-2">1990s</Badge>
                  <h3 className="text-2xl font-bold text-foreground">Film Camera</h3>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-destructive/10 p-4 rounded-lg border-l-4 border-destructive">
                  <p className="text-xl font-bold text-destructive mb-2">24 shots per roll</p>
                  <p className="text-base text-foreground/80">$15 to develop. Days to see results.</p>
                </div>
                
                <div className="text-center py-6 bg-background/50 rounded-lg">
                  <p className="text-2xl font-bold text-foreground mb-2">
                    "Make sure everyone's<br/>smiling... this counts!"
                  </p>
                  <p className="text-sm text-muted-foreground italic">Every shot was precious</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Smartphone Era */}
          <Card className="relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-background">
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-7xl">📱</div>
                <div>
                  <Badge className="mb-2">Today</Badge>
                  <h3 className="text-2xl font-bold text-foreground">Smartphone</h3>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg border-l-4 border-primary">
                  <p className="text-xl font-bold text-primary mb-2">Unlimited shots</p>
                  <p className="text-base text-foreground/80">Free. Instant. Delete the bad ones.</p>
                </div>
                
                <div className="text-center py-6 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-2xl font-bold text-foreground mb-2">
                    "Take 10 and pick<br/>the best later!"
                  </p>
                  <p className="text-sm text-muted-foreground italic">Experiment freely</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Key Insight */}
        <Card className="p-8 bg-gradient-to-r from-accent/30 via-primary/30 to-secondary/30 border-2 border-accent text-center">
          <p className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Technology didn't just change<br/>
            <span className="text-primary text-3xl md:text-4xl">what was possible</span>
          </p>
          <p className="text-xl md:text-2xl text-foreground">
            It changed <span className="text-accent font-bold">how we behave</span>
          </p>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto mb-4">
        <DataBite 
          stat="5-10 → 50-100+"
          description="xAPI + LRS technology increases measurable data points per learner by 10x, transforming L&D from data-scarce to data-rich"
          source="Learning Record Store implementations"
        />
      </div>

      <div className="text-center mb-3">
        <p className="text-xl font-bold text-primary mb-1">
          The same behavioral shift is happening in L&D ↓
        </p>
        <p className="text-sm text-muted-foreground">
          Not because of AI itself, but because measurement is now abundant
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto flex-1 min-h-0 overflow-hidden">
        {/* OLD WORLD - Scarcity */}
        <Card 
          className={`p-4 transition-all duration-300 border-2 overflow-y-auto ${
            hoveredSide === 'old' 
              ? 'border-destructive shadow-xl scale-105' 
              : hoveredSide === 'new'
              ? 'opacity-50'
              : 'border-border'
          }`}
          onMouseEnter={() => setHoveredSide('old')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <Badge variant="destructive" className="text-xs">Scarcity Era</Badge>
              <h3 className="text-xl font-bold text-foreground">
                Old L&D World
              </h3>
            </div>
          </div>

          <div className="space-y-3 text-foreground/80 text-sm">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="font-semibold mb-1 text-xs">Measurement was:</p>
              <ul className="space-y-1 ml-3">
                <li className="flex items-start gap-1">
                  <span className="text-destructive font-bold">•</span>
                  <span>Expensive, slow, limited</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-destructive font-bold">•</span>
                  <span><span className="font-mono">5-10 data points</span>/learner</span>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-destructive/5 rounded-lg border border-destructive/20">
              <p className="font-bold text-destructive mb-1 text-xs">So our behavior was:</p>
              <ul className="space-y-1 ml-3">
                <li className="flex items-start gap-1">
                  <span className="text-destructive font-bold">→</span>
                  <span>Plan everything upfront</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-destructive font-bold">→</span>
                  <span>Avoid mistakes at all costs</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-destructive font-bold">→</span>
                  <span>Resist experimentation</span>
                </li>
              </ul>
            </div>

            <p className="text-center font-semibold text-destructive pt-2 italic text-sm">
              "We can't afford to be wrong—<br/>every 'exposure' counts"
            </p>
          </div>
        </Card>

        {/* NEW WORLD - Abundance */}
        <Card 
          className={`p-4 transition-all duration-300 border-2 overflow-y-auto ${
            hoveredSide === 'new' 
              ? 'border-primary shadow-xl scale-105' 
              : hoveredSide === 'old'
              ? 'opacity-50'
              : 'border-border'
          }`}
          onMouseEnter={() => setHoveredSide('new')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <Badge className="text-xs">Abundance Era</Badge>
              <h3 className="text-xl font-bold text-foreground">
                AI-Powered L&D
              </h3>
            </div>
          </div>

          <div className="space-y-3 text-foreground/80 text-sm">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="font-semibold mb-1 text-xs">Measurement is now:</p>
              <ul className="space-y-1 ml-3">
                <li className="flex items-start gap-1">
                  <span className="text-primary font-bold">•</span>
                  <span>Cheap, instant, automatic</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-primary font-bold">•</span>
                  <span><span className="font-mono text-accent">50-100+</span> data points/learner</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-primary font-bold">•</span>
                  <span>AI extracts what humans can't see</span>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="font-bold text-primary mb-1 text-xs">So our behavior becomes:</p>
              <ul className="space-y-1 ml-3">
                <li className="flex items-start gap-1">
                  <span className="text-primary font-bold">→</span>
                  <span>Launch imperfectly</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-primary font-bold">→</span>
                  <span>Measure without thinking</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-primary font-bold">→</span>
                  <span>Iterate fearlessly</span>
                </li>
              </ul>
            </div>

            <p className="text-center font-semibold text-primary pt-2 italic text-sm">
              "Try 10 versions and<br/>pick what works"
            </p>
          </div>
        </Card>
      </div>

      <div className="text-center pt-3 max-w-4xl mx-auto">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30">
          <p className="text-base font-bold text-foreground mb-2">
            Just like smartphones changed <em>how we photograph</em>—
          </p>
          <p className="text-lg font-bold text-primary">
            AI changes <em>how we design learning</em>
          </p>
          <p className="text-sm text-muted-foreground mt-3 italic">
            It's not about the AI. It's about no longer treasuring every "shot"—<br/>
            you can finally experiment without fear.
          </p>
        </Card>
      </div>
    </div>
  );
};