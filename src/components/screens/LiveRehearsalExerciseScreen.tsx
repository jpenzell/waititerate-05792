import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap, Users2, ClipboardCheck, Timer, ChevronRight, Send, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Scenario {
  id: string;
  title: string;
  icon: any;
  currentState: string;
  messyLaunch: string;
  aiMeasures: string[];
  color: string;
}

const scenarios: Scenario[] = [
  {
    id: "onboarding",
    title: "Onboarding Module Redesign",
    icon: GraduationCap,
    currentState: "2-hour onboarding video with 45% completion rate",
    messyLaunch: "Break into 6x 20-min modules, add AI comprehension checks after each",
    aiMeasures: [
      "Completion rate by module",
      "Time spent per module",
      "Comprehension check scores",
      "Common questions/confusion points",
      "Drop-off patterns"
    ],
    color: "primary"
  },
  {
    id: "coaching",
    title: "Manager Coaching Skill Development",
    icon: Users2,
    currentState: "3-day workshop with no follow-up or measurement",
    messyLaunch: "Replace with 30-min weekly micro-coaching scenarios + AI feedback",
    aiMeasures: [
      "Response quality scores",
      "Decision pattern analysis",
      "Improvement trajectory over time",
      "Skill application in scenarios",
      "Peer comparison (anonymized)"
    ],
    color: "accent"
  },
  {
    id: "compliance",
    title: "Compliance Training Engagement",
    icon: ClipboardCheck,
    currentState: "Annual mandated course with 60% on-time completion",
    messyLaunch: "Gamified 15-min monthly refreshers with leaderboard + spot rewards",
    aiMeasures: [
      "Time-to-complete each module",
      "Repeat attempt patterns",
      "Knowledge retention over time",
      "Engagement with gamification",
      "Real-world application indicators"
    ],
    color: "primary"
  }
];

interface LiveRehearsalExerciseScreenProps {
  isFacilitator?: boolean;
}

const LiveRehearsalExerciseScreen = ({ isFacilitator = false }: LiveRehearsalExerciseScreenProps) => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [activityPhase, setActivityPhase] = useState<"choose" | "discuss" | "share">("choose");
  const [sessionId] = useState('iterate2025-rehearsal');
  
  // Participant state
  const [participantScenario, setParticipantScenario] = useState<string | null>(null);
  const [response1, setResponse1] = useState("");
  const [response2, setResponse2] = useState("");
  const [response3, setResponse3] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  // Facilitator state - all responses
  const [allResponses, setAllResponses] = useState<any[]>([]);

  const handleScenarioSelect = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setActivityPhase("discuss");
  };

  const selectedScenarioData = scenarios.find(s => s.id === selectedScenario);
  
  // Participant: Submit responses
  const submitResponses = async () => {
    if (!participantScenario || (!response1.trim() && !response2.trim() && !response3.trim())) {
      toast.error('Please select a scenario and answer at least one question');
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('Please sign in first');
      return;
    }

    const { error } = await supabase
      .from('poll_responses')
      .insert({
        poll_id: sessionId,
        user_id: user.id,
        answer: JSON.stringify({
          scenario: participantScenario,
          q1: response1,
          q2: response2,
          q3: response3
        })
      });

    if (error) {
      console.error('Failed to submit:', error);
      toast.error('Failed to submit responses');
      return;
    }

    setHasSubmitted(true);
    toast.success('Responses submitted!');
  };
  
  // Facilitator: Load all responses
  useEffect(() => {
    if (!isFacilitator) return;
    
    const loadResponses = async () => {
      const { data } = await supabase
        .from('poll_responses')
        .select('*')
        .eq('poll_id', sessionId)
        .order('created_at', { ascending: false });
      
      if (data) {
        setAllResponses(data.map(r => ({
          ...r,
          parsedAnswer: JSON.parse(r.answer)
        })));
      }
    };
    
    loadResponses();
    
    // Subscribe to new responses
    const channel = supabase
      .channel('rehearsal-responses')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'poll_responses',
        filter: `poll_id=eq.${sessionId}`
      }, () => {
        loadResponses();
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [isFacilitator, sessionId]);

  // Participant View - Clean prompts only
  if (!isFacilitator) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 animate-fade-in">
        {!hasSubmitted ? (
          <Card className="max-w-3xl w-full p-8">
            <div className="space-y-8">
              {/* Scenario Selection */}
              <div className="text-center mb-6">
                <Lightbulb className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h2 className="text-3xl font-bold mb-2">Your Rehearsal Exercise</h2>
                <p className="text-muted-foreground">Choose a scenario and answer the questions below</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Choose Your Scenario:</h3>
                <div className="grid gap-4">
                  {scenarios.map((scenario) => {
                    const Icon = scenario.icon;
                    return (
                      <Card
                        key={scenario.id}
                        className={`p-5 cursor-pointer transition-all ${
                          participantScenario === scenario.id
                            ? 'border-primary border-2 bg-primary/5 shadow-lg'
                            : 'hover:border-primary/50 hover:shadow-md'
                        }`}
                        onClick={() => setParticipantScenario(scenario.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg mb-2">{scenario.title}</h4>
                            <p className="text-sm text-muted-foreground">{scenario.currentState}</p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Questions */}
              {participantScenario && (
                <div className="space-y-6 border-t pt-8">
                  <h3 className="text-lg font-semibold">Answer These Questions:</h3>
                  
                  <div>
                    <label className="text-sm font-semibold mb-3 block">
                      <span className="text-primary font-mono text-base">01</span> What would you measure FIRST?
                    </label>
                    <Textarea
                      placeholder="Your answer..."
                      value={response1}
                      onChange={(e) => setResponse1(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-3 block">
                      <span className="text-primary font-mono text-base">02</span> What's your hypothesis for what the data will show?
                    </label>
                    <Textarea
                      placeholder="Your answer..."
                      value={response2}
                      onChange={(e) => setResponse2(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-3 block">
                      <span className="text-primary font-mono text-base">03</span> What "fix" would you try based on early data?
                    </label>
                    <Textarea
                      placeholder="Your answer..."
                      value={response3}
                      onChange={(e) => setResponse3(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button onClick={submitResponses} size="lg" className="w-full">
                    <Send className="mr-2 h-5 w-5" />
                    Submit My Responses
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ) : (
          <Card className="max-w-2xl w-full p-12 text-center">
            <Lightbulb className="h-20 w-20 mx-auto mb-6 text-primary animate-pulse" />
            <h3 className="text-2xl font-bold mb-3">Responses Submitted!</h3>
            <p className="text-lg text-muted-foreground">
              Watch the main screen for group discussion and insights
            </p>
          </Card>
        )}
      </div>
    );
  }

  // Facilitator View
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 p-8 flex flex-col items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      
      <div className="relative w-full max-w-7xl space-y-8 py-8 animate-fade-in">
        {/* Title */}
        <div className="text-center space-y-4">
          <Badge variant="outline" className="text-lg px-4 py-2 font-mono border-accent/30">
            11 / 12
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text">
            Live Rehearsal Exercise
          </h1>
          <p className="text-2xl text-muted-foreground font-mono">
            Pick Your Scenario <span className="text-accent">→</span> Apply the Cycle
          </p>
        </div>

        {/* Activity Timer */}
        <div className="flex justify-center">
          <Card className="glass-effect border-accent/30">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                <Timer className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold font-mono">ACTIVITY TIME: 10 minutes</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {activityPhase === "choose" && "// Choose scenario (1 min)"}
                  {activityPhase === "discuss" && "// Small group discussion (3 min)"}
                  {activityPhase === "share" && "// Quick share-out (3 min)"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scenario Selection or Detail View */}
        {activityPhase === "choose" && (
          <div className="grid md:grid-cols-3 gap-6">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              return (
                <div key={scenario.id}>
                  <Card 
                    className="h-full glass-effect border-primary/10 hover:border-primary/30 hover:glow-primary transition-all cursor-pointer"
                    onClick={() => handleScenarioSelect(scenario.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="outline" className="text-xs font-mono">{scenario.id.toUpperCase()}</Badge>
                      </div>
                      <CardTitle className="text-xl">{scenario.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-xs font-mono text-muted-foreground mb-2">[CURRENT STATE]</p>
                        <p className="text-sm">{scenario.currentState}</p>
                      </div>
                      <Button className="w-full group" variant="outline">
                        Select Scenario
                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        )}

        {/* Selected Scenario Detail */}
        {activityPhase === "discuss" && selectedScenarioData && (
          <div className="space-y-6">
            <Card className="glass-effect border-primary/30 glow-primary">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = selectedScenarioData.icon;
                    return (
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    );
                  })()}
                  <div>
                    <Badge variant="outline" className="text-xs font-mono mb-2">[SELECTED]</Badge>
                    <CardTitle className="text-3xl">{selectedScenarioData.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-mono text-destructive mb-2">[CURRENT STATE]</h3>
                  <p className="text-lg">{selectedScenarioData.currentState}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-mono text-accent mb-2">[MESSY LAUNCH]</h3>
                  <p className="text-lg">{selectedScenarioData.messyLaunch}</p>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-primary mb-3">[WHAT AI CAN MEASURE]</h3>
                  <ul className="space-y-2">
                    {selectedScenarioData.aiMeasures.map((measure, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-accent font-mono text-sm">0{index + 1}</span>
                        <span>{measure}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Discussion Prompts */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-effect border-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl font-mono">[DISCUSSION QUESTIONS]</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="font-semibold"><span className="font-mono text-primary">01</span> What would you measure FIRST?</p>
                  <p className="font-semibold"><span className="font-mono text-primary">02</span> What's your hypothesis for what the data will show?</p>
                  <p className="font-semibold"><span className="font-mono text-primary">03</span> What "fix" would you try based on early data?</p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-accent/10">
                <CardHeader>
                  <CardTitle className="text-xl font-mono">[EXPECTED OUTCOMES]</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground font-mono text-sm">Discuss with your group:</p>
                  <p><span className="text-accent">→</span> What success looks like in Week 1</p>
                  <p><span className="text-accent">→</span> What might go wrong (and how you'd know)</p>
                  <p><span className="text-accent">→</span> When you'd decide to iterate vs. kill</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => { setSelectedScenario(null); setActivityPhase("choose"); }} variant="outline">
                Choose Different Scenario
              </Button>
              <Button onClick={() => setActivityPhase("share")} size="lg" className="group">
                Ready to Share Out
                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        )}

        {/* Share Phase - Show All Participant Responses */}
        {activityPhase === "share" && (
          <div className="space-y-6">
            <Card className="glass-effect border-accent/30 glow-accent">
              <CardContent className="p-10 text-center space-y-4">
                <h2 className="text-4xl font-bold font-mono">[PARTICIPANT RESPONSES]</h2>
                <p className="text-xl text-muted-foreground">
                  {allResponses.length} response{allResponses.length !== 1 ? 's' : ''} submitted
                </p>
              </CardContent>
            </Card>

            {/* Group responses by scenario */}
            {scenarios.map((scenario) => {
              const scenarioResponses = allResponses.filter(
                r => r.parsedAnswer.scenario === scenario.id
              );
              
              if (scenarioResponses.length === 0) return null;
              
              const Icon = scenario.icon;
              return (
                <Card key={scenario.id} className="glass-effect border-primary/10">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{scenario.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {scenarioResponses.length} participant{scenarioResponses.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {scenarioResponses.map((response, idx) => (
                      <Card key={response.id} className="p-4 bg-muted/30">
                        <div className="space-y-3">
                          {response.parsedAnswer.q1 && (
                            <div>
                              <p className="text-xs font-mono text-primary mb-1">Q1: What to measure first?</p>
                              <p className="text-sm">{response.parsedAnswer.q1}</p>
                            </div>
                          )}
                          {response.parsedAnswer.q2 && (
                            <div>
                              <p className="text-xs font-mono text-primary mb-1">Q2: Hypothesis?</p>
                              <p className="text-sm">{response.parsedAnswer.q2}</p>
                            </div>
                          )}
                          {response.parsedAnswer.q3 && (
                            <div>
                              <p className="text-xs font-mono text-primary mb-1">Q3: What fix to try?</p>
                              <p className="text-sm">{response.parsedAnswer.q3}</p>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              );
            })}

            {allResponses.length === 0 && (
              <Card className="glass-effect p-10 text-center">
                <p className="text-muted-foreground">Waiting for participant responses...</p>
              </Card>
            )}

            <div className="flex justify-center">
              <Button onClick={() => { setSelectedScenario(null); setActivityPhase("choose"); }} variant="outline" size="lg">
                Back to Scenarios
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveRehearsalExerciseScreen;
