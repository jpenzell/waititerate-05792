import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sparkles, TrendingUp, Users, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

interface NeurodiversityDataQuizScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
}

const responseSchema = z.object({
  unemployment_guess: z.number().min(0).max(100),
  productivity_guess: z.number().min(0).max(100),
  population_guess: z.number().min(0).max(100),
});

interface QuizResponse {
  id: string;
  session_id: string;
  user_id: string;
  unemployment_guess: number;
  productivity_guess: number;
  population_guess: number;
  created_at: string;
}

export const NeurodiversityDataQuizScreen = ({ isFacilitator = false, sessionId }: NeurodiversityDataQuizScreenProps) => {
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [unemploymentGuess, setUnemploymentGuess] = useState("");
  const [productivityGuess, setProductivityGuess] = useState("");
  const [populationGuess, setPopulationGuess] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    loadResponses();

    const channel = supabase
      .channel(`neurodiversity-quiz:${sessionId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'neurodiversity_quiz_responses',
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
      .from('neurodiversity_quiz_responses')
      .select('*')
      .eq('session_id', sessionId);
    
    if (data) {
      setResponses(data as QuizResponse[]);
    }
  };

  const submitResponse = async () => {
    if (!sessionId) return;

    try {
      const validated = responseSchema.parse({
        unemployment_guess: parseFloat(unemploymentGuess),
        productivity_guess: parseFloat(productivityGuess),
        population_guess: parseFloat(populationGuess),
      });

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('neurodiversity_quiz_responses').insert({
        session_id: sessionId,
        user_id: user.id,
        unemployment_guess: validated.unemployment_guess,
        productivity_guess: validated.productivity_guess,
        population_guess: validated.population_guess,
      });

      if (error) throw error;
      setHasSubmitted(true);
      toast.success('Guesses submitted!');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error('Please enter valid numbers between 0 and 100');
      } else {
        console.error('Error submitting response:', error);
        toast.error('Failed to submit response');
      }
    }
  };

  const getAverages = () => {
    if (responses.length === 0) return { unemployment: 0, productivity: 0, population: 0 };
    
    const sum = responses.reduce((acc, r) => ({
      unemployment: acc.unemployment + r.unemployment_guess,
      productivity: acc.productivity + r.productivity_guess,
      population: acc.population + r.population_guess,
    }), { unemployment: 0, productivity: 0, population: 0 });

    return {
      unemployment: Math.round(sum.unemployment / responses.length),
      productivity: Math.round(sum.productivity / responses.length),
      population: Math.round(sum.population / responses.length),
    };
  };

  // FACILITATOR VIEW
  if (isFacilitator) {
    const averages = getAverages();
    const actualUnemployment = 85;
    const actualProductivity = 30;
    const actualPopulation = 20;
    
    return (
      <div className="h-screen flex flex-col py-6 px-4 animate-fade-in overflow-y-auto">
        <div className="text-center mb-6">
          <Badge className="mb-4">
            <Users className="h-4 w-4 mr-2" />
            Why Neurodiversity Matters
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            The Data Might Surprise You
          </h1>
          <p className="text-lg text-muted-foreground">
            Responses: <span className="font-bold text-primary">{responses.length}</span>
          </p>
        </div>

        {!showResults ? (
          <>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/5">
                <div className="text-center">
                  <Briefcase className="h-12 w-12 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-2">Avg. Guess: Unemployment Rate</p>
                  <div className="text-5xl font-bold text-primary">{averages.unemployment}%</div>
                </div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/5">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-accent mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-2">Avg. Guess: Productivity Boost</p>
                  <div className="text-5xl font-bold text-accent">{averages.productivity}%</div>
                </div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-foreground/10 to-foreground/5">
                <div className="text-center">
                  <Users className="h-12 w-12 text-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-2">Avg. Guess: Population %</p>
                  <div className="text-5xl font-bold text-foreground">{averages.population}%</div>
                </div>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                onClick={() => setShowResults(true)}
                size="lg"
                className="px-12"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Reveal The Truth
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* Unemployment Rate */}
            <Card className="p-8 bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/30">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Briefcase className="h-16 w-16 text-red-500 mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Unemployment & Underemployment</h3>
                  <p className="text-muted-foreground mb-4">
                    Among autistic adults with college degrees:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm text-muted-foreground">Your guess:</span>
                      <span className="text-3xl font-bold text-muted-foreground line-through">{averages.unemployment}%</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm text-foreground font-semibold">Reality:</span>
                      <span className="text-6xl font-bold text-red-500">{actualUnemployment}%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-background rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground">
                      <strong>85% of autistic adults</strong> with college degrees are unemployed or significantly underemployed—not because they lack skills, but because traditional hiring processes, interviews, and workplace environments exclude them.
                    </p>
                  </div>
                  <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/20">
                    <p className="text-xs text-muted-foreground italic">
                      Source: National Autistic Society, 2016; Autism Speaks Employment Study
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Productivity Boost */}
            <Card className="p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <TrendingUp className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Productivity in the Right Role</h3>
                  <p className="text-muted-foreground mb-4">
                    When accommodations are made:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm text-muted-foreground">Your guess:</span>
                      <span className="text-3xl font-bold text-muted-foreground line-through">{averages.productivity}%</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm text-foreground font-semibold">Reality:</span>
                      <span className="text-6xl font-bold text-green-500">{actualProductivity}%+</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-background rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground">
                      <strong>JPMorgan Chase reports</strong> neurodivergent employees in their Autism at Work program are <strong>30% more productive</strong> than neurotypical peers in roles that match their strengths (data analysis, quality assurance, software testing).
                    </p>
                  </div>
                  <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                    <p className="text-xs text-muted-foreground italic">
                      Source: JPMorgan Chase Autism at Work Program, Harvard Business Review 2017
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Population Percentage */}
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Users className="h-16 w-16 text-primary mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Global Neurodivergent Population</h3>
                  <p className="text-muted-foreground mb-4">
                    Including ADHD, autism, dyslexia, etc.:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm text-muted-foreground">Your guess:</span>
                      <span className="text-3xl font-bold text-muted-foreground line-through">{averages.population}%</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm text-foreground font-semibold">Reality:</span>
                      <span className="text-6xl font-bold text-primary">{actualPopulation}%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-background rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground">
                      <strong>1 in 5 people</strong> are neurodivergent. That means <strong>in every meeting, every classroom, every course you design</strong>—at least 20% of your audience processes information fundamentally differently.
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-xs text-muted-foreground italic">
                      Source: CDC, ADHD Institute, British Dyslexia Association (combined estimates)
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* The Punchline */}
            <Card className="p-12 bg-gradient-to-r from-accent/20 to-primary/20 border-2 border-accent/40">
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-bold text-foreground">The Disconnect</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="p-6 bg-red-500/10 rounded-xl border-2 border-red-500/30">
                    <p className="text-2xl font-bold text-red-500 mb-3">85%</p>
                    <p className="text-foreground">Unemployed despite degrees</p>
                  </div>
                  <div className="p-6 bg-green-500/10 rounded-xl border-2 border-green-500/30">
                    <p className="text-2xl font-bold text-green-500 mb-3">30%+</p>
                    <p className="text-foreground">More productive in right roles</p>
                  </div>
                </div>
                <p className="text-2xl text-foreground max-w-3xl mx-auto">
                  The problem isn't talent. <span className="font-bold text-primary">The problem is our systems.</span>
                </p>
                <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
                  If we design learning experiences for the "average" brain, we're excluding 1 in 5 people—and wasting extraordinary potential.
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  }

  // PARTICIPANT VIEW
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {!hasSubmitted ? (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="mb-2">
              <Users className="h-4 w-4 mr-2" />
              Neurodiversity Data Quiz
            </Badge>
            <h1 className="text-4xl font-bold text-foreground">
              What Do You Think?
            </h1>
            <p className="text-lg text-muted-foreground">
              Guess these neurodiversity statistics
            </p>
          </div>

          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Briefcase className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      What % of autistic adults with college degrees are unemployed or underemployed?
                    </h3>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={unemploymentGuess}
                        onChange={(e) => setUnemploymentGuess(e.target.value)}
                        placeholder="Enter %"
                        className="text-2xl font-bold text-center"
                      />
                      <span className="text-2xl font-bold text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question 2 */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      How much MORE productive are neurodivergent employees in the right roles?
                    </h3>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={productivityGuess}
                        onChange={(e) => setProductivityGuess(e.target.value)}
                        placeholder="Enter %"
                        className="text-2xl font-bold text-center"
                      />
                      <span className="text-2xl font-bold text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question 3 */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-foreground mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      What % of the global population is neurodivergent?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      (Including ADHD, autism, dyslexia, etc.)
                    </p>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={populationGuess}
                        onChange={(e) => setPopulationGuess(e.target.value)}
                        placeholder="Enter %"
                        className="text-2xl font-bold text-center"
                      />
                      <span className="text-2xl font-bold text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={submitResponse}
                size="lg" 
                className="w-full"
                disabled={!unemploymentGuess || !productivityGuess || !populationGuess}
              >
                Submit My Guesses
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <Card className="p-8 text-center bg-gradient-to-br from-primary/10 to-accent/10 animate-fade-in">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Guesses Submitted!</h3>
          <p className="text-muted-foreground">
            The facilitator will reveal the actual statistics shortly.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Prepare to be surprised...
          </p>
        </Card>
      )}
    </div>
  );
};