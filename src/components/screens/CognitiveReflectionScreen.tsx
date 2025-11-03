import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Sparkles, Lightbulb, Users, CheckCircle2 } from "lucide-react";
import { SlideHeader } from "@/components/SlideHeader";

interface CognitiveReflectionScreenProps {
  isFacilitator?: boolean;
}

export const CognitiveReflectionScreen = ({ isFacilitator = false }: CognitiveReflectionScreenProps) => {
  const [responses, setResponses] = useState({
    surprise: "",
    designing: "",
    aiSupport: ""
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const prompts = [
    {
      id: "surprise",
      icon: Brain,
      question: "What surprised you about how others think differently?",
      placeholder: "e.g., 'I had no idea some people don't see mental images...'"
    },
    {
      id: "designing",
      icon: Lightbulb,
      question: "Where might you be unintentionally designing for your own brain?",
      placeholder: "e.g., 'I always use visual diagrams because that's how I think...'"
    },
    {
      id: "aiSupport",
      icon: Sparkles,
      question: "How could AI help balance or complement your cognitive strengths?",
      placeholder: "e.g., 'AI could generate text descriptions of my visual concepts...'"
    }
  ];

  const handleSubmit = () => {
    setHasSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/10 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <SlideHeader slideNumber={6} totalSlides={14} estimatedMinutes={8} title="Cognitive Reflection" />

        {!hasSubmitted ? (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="mb-2">
                <Users className="h-4 w-4 mr-2" />
                Personal Reflection
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                Making It Personal
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Now that you've experienced cognitive diversity firsthand, let's reflect on what it means for <strong>your learning design practice.</strong>
              </p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="space-y-8">
                {prompts.map((prompt) => {
                  const Icon = prompt.icon;
                  return (
                    <div key={prompt.id} className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground mb-3">
                            {prompt.question}
                          </h3>
                          <Textarea
                            placeholder={prompt.placeholder}
                            value={responses[prompt.id as keyof typeof responses]}
                            onChange={(e) => setResponses(prev => ({
                              ...prev,
                              [prompt.id]: e.target.value
                            }))}
                            className="min-h-32 bg-background/50"
                          />
                        </div>
                      </div>
                      {prompt.id !== "aiSupport" && (
                        <div className="border-t border-border" />
                      )}
                    </div>
                  );
                })}

                <Button 
                  onClick={handleSubmit}
                  size="lg" 
                  className="w-full"
                  disabled={!responses.surprise && !responses.designing && !responses.aiSupport}
                >
                  Save Reflections
                  <CheckCircle2 className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-background/50 border border-border">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Optional: Share with Breakout Groups</p>
                <p className="text-sm text-muted-foreground">
                  If you're in a live session, your facilitator may invite you to discuss your reflections in small groups. This deepens learning by exposing you to even more cognitive perspectives.
                </p>
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="mb-2">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Reflection Complete
              </Badge>
              <h2 className="text-5xl font-bold text-foreground">
                Thank You for Reflecting
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your insights reveal how <strong>invisible cognitive diversity</strong> shapes everything we design.
              </p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground text-center mb-6">Your Reflections</h3>
                
                {prompts.map((prompt) => {
                  const Icon = prompt.icon;
                  const response = responses[prompt.id as keyof typeof responses];
                  if (!response) return null;
                  
                  return (
                    <div key={prompt.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <p className="text-sm font-semibold text-foreground">{prompt.question}</p>
                      </div>
                      <div className="pl-7">
                        <p className="text-muted-foreground italic bg-background/50 p-4 rounded-lg">
                          "{response}"
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/30">
              <div className="text-center space-y-4">
                <h3 className="text-3xl font-bold text-foreground">The Universal Design Insight</h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  <strong>We can't see inside each other's minds.</strong> The only way to design inclusively is to assume radical variation and provide <strong>multiple means of representation, engagement, and expression.</strong>
                </p>
                <p className="text-base text-foreground/80 italic max-w-2xl mx-auto">
                  This is why UDL isn't optional—it's essential for equity in learning.
                </p>
                <div className="pt-4">
                  <p className="text-xs text-muted-foreground">
                    Framework: CAST (2018) — Universal Design for Learning Guidelines version 2.2
                  </p>
                </div>
              </div>
            </Card>

            {isFacilitator && (
              <div className="text-center">
                <Button onClick={() => {
                  setHasSubmitted(false);
                  setResponses({ surprise: "", designing: "", aiSupport: "" });
                }} variant="outline">
                  Reset Exercise
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
