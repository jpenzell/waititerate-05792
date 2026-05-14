import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sparkles, TrendingUp, Users, Briefcase } from "lucide-react";
import { useReveal, useRegisterReveals } from "@/contexts/RevealContext";
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
  // Reveal arrow (→) flips facilitator view from guesses to actuals.
  useRegisterReveals(1);
  const { step: revealStep } = useReveal();

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
    const showResults = revealStep >= 1;

    return (
      <main className="h-full w-full overflow-y-auto py-6 px-6 animate-fade-in" role="main" aria-label="Neurodiversity data quiz results">
       <div className="max-w-7xl mx-auto w-full">
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            The data might surprise you
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Responses: <span className="font-bold text-primary">{responses.length}</span>
          </p>
        </header>

        {!showResults ? (
          <>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="p-5 bg-gradient-to-br from-primary/10 to-accent/5 text-center">
                <Briefcase className="h-10 w-10 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Avg. Guess · Unemployment</p>
                <div className="text-5xl font-bold text-primary">{averages.unemployment}%</div>
              </Card>
              <Card className="p-5 bg-gradient-to-br from-accent/10 to-primary/5 text-center">
                <TrendingUp className="h-10 w-10 text-accent mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Avg. Guess · Productivity</p>
                <div className="text-5xl font-bold text-accent">{averages.productivity}%</div>
              </Card>
              <Card className="p-5 bg-gradient-to-br from-foreground/10 to-foreground/5 text-center">
                <Users className="h-10 w-10 text-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Avg. Guess · Population %</p>
                <div className="text-5xl font-bold text-foreground">{averages.population}%</div>
              </Card>
            </div>

            <p className="text-center text-sm text-muted-foreground italic">
              Press → to reveal the actual numbers.
            </p>
          </>
        ) : (
          <div className="space-y-4 animate-fade-in max-w-7xl mx-auto w-full">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Unemployment */}
              <Card className="p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/30 text-center space-y-2">
                <Briefcase className="h-10 w-10 text-red-500 mx-auto" />
                <p className="text-xs text-muted-foreground">Unemployed despite degrees</p>
                <div className="text-xs text-muted-foreground">
                  guess <span className="line-through">{averages.unemployment}%</span>
                </div>
                <div className="text-6xl font-bold text-red-500">{actualUnemployment}%</div>
                <p className="text-xs text-muted-foreground italic">Autistic adults w/ degrees</p>
              </Card>
              {/* Productivity */}
              <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 text-center space-y-2">
                <TrendingUp className="h-10 w-10 text-green-500 mx-auto" />
                <p className="text-xs text-muted-foreground">More productive, right role</p>
                <div className="text-xs text-muted-foreground">
                  guess <span className="line-through">{averages.productivity}%</span>
                </div>
                <div className="text-6xl font-bold text-green-500">{actualProductivity}%+</div>
                <p className="text-xs text-muted-foreground italic">JPMorgan Autism at Work</p>
              </Card>
              {/* Population */}
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 text-center space-y-2">
                <Users className="h-10 w-10 text-primary mx-auto" />
                <p className="text-xs text-muted-foreground">Are neurodivergent</p>
                <div className="text-xs text-muted-foreground">
                  guess <span className="line-through">{averages.population}%</span>
                </div>
                <div className="text-6xl font-bold text-primary">{actualPopulation}%</div>
                <p className="text-xs text-muted-foreground italic">1 in 5 people</p>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-to-r from-accent/20 to-primary/20 border-2 border-accent/40 text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                The problem isn't talent. <span className="text-primary">The problem is our systems.</span>
              </p>
            </Card>
          </div>
        )}
       </div>
      </main>
    );
  }

  const [currentQuestion, setCurrentQuestion] = useState(1);

  const canProceed = () => {
    if (currentQuestion === 1) return unemploymentGuess !== "";
    if (currentQuestion === 2) return productivityGuess !== "";
    if (currentQuestion === 3) return populationGuess !== "";
    return false;
  };

  const handleNext = () => {
    if (currentQuestion < 3) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // PARTICIPANT VIEW
  return (
    <main className="max-w-2xl mx-auto py-8 px-4" role="main" aria-label="Neurodiversity data quiz">
      {!hasSubmitted ? (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="mb-2">
              <Users className="h-4 w-4 mr-2" />
              Neurodiversity Data Quiz
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              What Do You Think?
            </h1>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestion} of 3
            </p>
          </div>

          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <div className="space-y-6">
              {/* Question 1 */}
              {currentQuestion === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        What % of autistic adults with college degrees are unemployed or underemployed?
                      </h3>
                      <div className="flex items-center gap-3">
                        <label htmlFor="unemployment-guess" className="sr-only">Unemployment percentage guess</label>
                        <Input
                          id="unemployment-guess"
                          type="number"
                          min="0"
                          max="100"
                          value={unemploymentGuess}
                          onChange={(e) => setUnemploymentGuess(e.target.value)}
                          placeholder="Enter %"
                          className="text-3xl font-bold text-center h-16"
                          aria-label="Enter your guess for unemployment percentage of autistic adults with college degrees"
                        />
                        <span className="text-3xl font-bold text-muted-foreground" aria-hidden="true">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Question 2 */}
              {currentQuestion === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        How much MORE productive are neurodivergent employees in the right roles?
                      </h3>
                      <div className="flex items-center gap-3">
                        <label htmlFor="productivity-guess" className="sr-only">Productivity increase percentage guess</label>
                        <Input
                          id="productivity-guess"
                          type="number"
                          min="0"
                          max="100"
                          value={productivityGuess}
                          onChange={(e) => setProductivityGuess(e.target.value)}
                          placeholder="Enter %"
                          className="text-3xl font-bold text-center h-16"
                          aria-label="Enter your guess for how much more productive neurodivergent employees are in the right roles"
                        />
                        <span className="text-3xl font-bold text-muted-foreground" aria-hidden="true">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Question 3 */}
              {currentQuestion === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-start gap-3">
                    <Users className="h-8 w-8 text-foreground mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        What % of the global population is neurodivergent?
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        (Including ADHD, autism, dyslexia, etc.)
                      </p>
                      <div className="flex items-center gap-3">
                        <label htmlFor="population-guess" className="sr-only">Neurodivergent population percentage guess</label>
                        <Input
                          id="population-guess"
                          type="number"
                          min="0"
                          max="100"
                          value={populationGuess}
                          onChange={(e) => setPopulationGuess(e.target.value)}
                          placeholder="Enter %"
                          className="text-3xl font-bold text-center h-16"
                          aria-label="Enter your guess for what percentage of the global population is neurodivergent"
                        />
                        <span className="text-3xl font-bold text-muted-foreground" aria-hidden="true">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {currentQuestion > 1 && (
                  <Button 
                    onClick={handleBack}
                    variant="outline"
                    size="lg" 
                    className="flex-1"
                    aria-label="Go back to previous question"
                  >
                    Back
                  </Button>
                )}
                
                {currentQuestion < 3 ? (
                  <Button 
                    onClick={handleNext}
                    size="lg" 
                    className="flex-1"
                    disabled={!canProceed()}
                    aria-label="Proceed to next question"
                  >
                    Next Question
                  </Button>
                ) : (
                  <Button 
                    onClick={submitResponse}
                    size="lg" 
                    className="flex-1"
                    disabled={!canProceed()}
                    aria-label="Submit all your guesses"
                  >
                    Submit All Guesses
                  </Button>
                )}
              </div>
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
    </main>
  );
};