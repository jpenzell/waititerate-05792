import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface NumericEstimateScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
}

export const NumericEstimateScreen = ({ isFacilitator = false, sessionId }: NumericEstimateScreenProps) => {
  const [numericEstimates, setNumericEstimates] = useState<any[]>([]);
  const [numericGuess, setNumericGuess] = useState("");
  const [submittedEstimate, setSubmittedEstimate] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      console.log('No sessionId provided to NumericEstimateScreen');
      setNumericEstimates([]);
      return;
    }

    console.log('Setting up realtime for session:', sessionId);
    loadNumericEstimates();

    const channel = supabase
      .channel(`numeric-estimates:${sessionId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'numeric_estimates'
      }, (payload) => {
        const newRow = (payload as any).new;
        if (newRow?.session_id === sessionId) {
          console.log('Numeric estimate INSERT for this session:', newRow);
          loadNumericEstimates();
        }
      })
      .subscribe((status) => {
        console.log('Numeric estimates subscription status:', status);
      });

    return () => {
      console.log('Cleaning up numeric estimates channel');
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const loadNumericEstimates = async () => {
    if (!sessionId) return;
    
    const { data } = await supabase
      .from('numeric_estimates')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false });
    
    if (data) {
      console.log('Loaded numeric estimates:', data.length);
      setNumericEstimates(data);
    }
  };

  const submitNumericEstimate = async () => {
    const estimate = parseInt(numericGuess);
    if (isNaN(estimate) || estimate <= 0) {
      toast.error('Please enter a valid number');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('numeric_estimates').insert({
        session_id: sessionId,
        user_id: user.id,
        estimate: estimate,
      });

      if (error) throw error;
      setNumericGuess("");
      setSubmittedEstimate(true);
      toast.success('Estimate submitted!');
    } catch (error) {
      console.error('Error submitting estimate:', error);
      toast.error('Failed to submit estimate');
    }
  };

  // Facilitator View
  if (isFacilitator) {
    return (
      <div className="h-screen flex flex-col py-6 animate-fade-in overflow-hidden">
        <div className="text-center mb-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Quick Question
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            How many measurable data points are in ONE of these photos?
          </p>
          <Badge variant="outline" className="text-lg px-6 py-3">
            🔢 Step 4: Your Estimate
          </Badge>
        </div>

        <div className="flex-1 overflow-y-auto max-w-6xl mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Quick question: How many data points can we get from ONE photo?
            </h2>
            <p className="text-xl text-muted-foreground">
              Make your best guess!
            </p>
          </div>
          
          {/* Visualization of guesses */}
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

            {/* Stats */}
            {numericEstimates.length > 0 && (
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
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
          </div>
        </div>
      </div>
    );
  }

  // Participant View
  return (
    <div className="h-screen flex items-center justify-center p-6 animate-fade-in">
      <Card className="max-w-2xl w-full p-8 bg-background/90 backdrop-blur-xl">
        <div className="text-center mb-6">
          <Badge variant="outline" className="mb-4">Step 4 of 5</Badge>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            <TrendingUp className="inline-block mr-2 h-8 w-8 text-primary" />
            How Many Data Points?
          </h2>
          <p className="text-muted-foreground">
            From ONE photo, how many unique data points do you think we could extract?
          </p>
        </div>

        {!submittedEstimate ? (
          <div className="space-y-4">
            <Input
              type="number"
              value={numericGuess}
              onChange={(e) => setNumericGuess(e.target.value)}
              placeholder="Enter your estimate..."
              className="text-center text-2xl h-20"
              min="1"
            />
            <Button onClick={submitNumericEstimate} size="lg" className="w-full" disabled={!numericGuess}>
              Submit Estimate
            </Button>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-primary">Estimate Submitted!</h3>
            <p className="text-muted-foreground">
              Get ready for the reveal on the next screen...
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};
