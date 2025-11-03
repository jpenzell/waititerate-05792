import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Eye, EyeOff, Sparkles, Brain, AlertCircle } from "lucide-react";
import { SlideHeader } from "@/components/SlideHeader";

interface MentalImageryScreenProps {
  isFacilitator?: boolean;
}

export const MentalImageryScreen = ({ isFacilitator = false }: MentalImageryScreenProps) => {
  const [step, setStep] = useState<"intro" | "test" | "results">("intro");
  const [vividness, setVividness] = useState<number>(5);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const getCategory = (score: number): { label: string; description: string; percentage: string; color: string } => {
    if (score === 0 || score === 1) {
      return {
        label: "Aphantasia",
        description: "You have little to no mental imagery. You think in concepts, facts, or spatial relationships—not pictures.",
        percentage: "2-5%",
        color: "text-primary"
      };
    } else if (score >= 2 && score <= 4) {
      return {
        label: "Low Imagery",
        description: "Your mental images are dim or abstract. You can sense shapes or colors but not detailed scenes.",
        percentage: "15-20%",
        color: "text-accent"
      };
    } else if (score >= 5 && score <= 7) {
      return {
        label: "Typical Imagery",
        description: "You see moderately clear mental images—like a blurry photograph or sketch.",
        percentage: "60-70%",
        color: "text-foreground"
      };
    } else {
      return {
        label: "Hyperphantasia",
        description: "Your mental images are EXTREMELY vivid—more detailed than real photographs. You can 'see' textures, lighting, movement.",
        percentage: "2-5%",
        color: "text-accent"
      };
    }
  };

  const category = getCategory(vividness);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <SlideHeader slideNumber={3} totalSlides={14} estimatedMinutes={7} title="Mental Imagery Discovery" />

        {/* Intro */}
        {step === "intro" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="mb-2">
                <Brain className="h-4 w-4 mr-2" />
                Cognitive Difference Reveal
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                Can You See This?
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're about to discover something extraordinary: <strong>not everyone "sees" pictures in their mind the same way.</strong>
              </p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Eye className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">The Test</h3>
                    <p className="text-muted-foreground mb-4">
                      Close your eyes. Picture a red apple sitting on a white plate.
                    </p>
                    <p className="text-muted-foreground">
                      Try to "see" it in your mind: the shine on the apple's skin, the shadow it casts, maybe a stem or leaf.
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-lg text-foreground font-semibold mb-2">
                    How vivid was your mental image?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    On the next screen, you'll rate the clarity of what you "saw" (or didn't see).
                  </p>
                </div>

                <Button 
                  onClick={() => setStep("test")} 
                  size="lg" 
                  className="w-full md:w-auto"
                >
                  Take the Test
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>

            {/* Why This Matters */}
            <Card className="p-6 bg-background/50 border border-border">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-accent mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Why This Matters for Learning Design</p>
                  <p className="text-sm text-muted-foreground">
                    If 2-5% of your students have <strong>aphantasia</strong> (no mental imagery), instructions like "visualize the process" or "picture this scenario" are meaningless to them. They need <strong>diagrams, outlines, or spatial descriptions</strong> instead.
                  </p>
                  <p className="text-xs text-muted-foreground italic mt-2">
                    Research: Zeman et al. (2015), "Lives without imagery — Congenital aphantasia"
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Test */}
        {step === "test" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground">Rate Your Mental Image</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Move the slider to match how vivid your mental image of the apple was.
              </p>
            </div>

            <Card className="p-12 bg-gradient-to-br from-background to-accent/5">
              <div className="space-y-8">
                {/* Slider */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <EyeOff className="h-4 w-4" />
                      <span>No image at all</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Perfectly clear & vivid</span>
                      <Eye className="h-4 w-4" />
                    </div>
                  </div>

                  <Slider
                    value={[vividness]}
                    onValueChange={(vals) => setVividness(vals[0])}
                    min={0}
                    max={10}
                    step={1}
                    className="w-full"
                  />

                  <div className="text-center">
                    <div className="text-6xl font-bold text-primary mb-2">{vividness}</div>
                    <p className="text-sm text-muted-foreground">out of 10</p>
                  </div>
                </div>

                {/* Scale Reference */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="font-semibold text-primary mb-1">0-1: No Image</p>
                    <p className="text-muted-foreground text-xs">
                      Nothing. Just darkness or the concept of "apple" without any visual.
                    </p>
                  </div>
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <p className="font-semibold text-accent mb-1">5-7: Moderate</p>
                    <p className="text-muted-foreground text-xs">
                      Like a faded photograph or sketch—you can sense shapes and colors.
                    </p>
                  </div>
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <p className="font-semibold text-accent mb-1">9-10: Hyperphantasia</p>
                    <p className="text-muted-foreground text-xs">
                      MORE vivid than reality—you see every detail, texture, lighting.
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    setHasSubmitted(true);
                    setStep("results");
                  }}
                  size="lg" 
                  className="w-full"
                >
                  See My Results
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Results */}
        {step === "results" && hasSubmitted && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="mb-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Your Cognitive Profile
              </Badge>
              <h2 className="text-5xl font-bold text-foreground">
                You Have: <span className={category.color}>{category.label}</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Brain className="h-6 w-6 text-primary" />
                    The Science
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong>Prevalence:</strong> About {category.percentage} of people experience mental imagery like you do.
                    </p>
                    <p>
                      <strong>Discovery:</strong> Adam Zeman's 2015 research revealed that aphantasia (no mental imagery) and hyperphantasia (extremely vivid imagery) are real neurological variations.
                    </p>
                    <p>
                      <strong>Impact:</strong> Mental imagery affects how we remember, learn, dream, and process visual instructions.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-accent" />
                    What This Means for Learning
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    {vividness <= 1 ? (
                      <>
                        <p>
                          <strong>For You:</strong> "Visualize this" instructions don't work. You need concrete diagrams, written steps, or spatial descriptions.
                        </p>
                        <p>
                          <strong>Your Strength:</strong> You excel at abstract reasoning and factual recall without being distracted by irrelevant imagery.
                        </p>
                      </>
                    ) : vividness >= 8 ? (
                      <>
                        <p>
                          <strong>For You:</strong> You may find dry text boring—you crave rich visual descriptions, diagrams, videos.
                        </p>
                        <p>
                          <strong>Your Strength:</strong> Exceptional visual memory and ability to mentally manipulate 3D objects or scenes.
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          <strong>For You:</strong> You benefit from a mix of visual and verbal instruction—images reinforce text.
                        </p>
                        <p>
                          <strong>Your Strength:</strong> Flexible processing—you can switch between visual and conceptual thinking.
                        </p>
                      </>
                    )}
                    <p className="pt-2 border-t border-border">
                      <strong>UDL Principle:</strong> Provide multiple means of representation—text AND diagrams AND verbal explanations. Everyone benefits.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* The Reveal */}
            <Card className="p-8 bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/30">
              <div className="text-center space-y-4">
                <h3 className="text-3xl font-bold text-foreground">The Invisible Difference</h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Until Adam Zeman's research in 2015, <strong>most people with aphantasia didn't know other people could actually SEE mental images.</strong> They assumed "picture this" was just a figure of speech.
                </p>
                <p className="text-base text-foreground/80 italic max-w-2xl mx-auto">
                  This is why Universal Design for Learning matters: <strong>we can't see inside each other's minds.</strong> We must design for variation we can't perceive.
                </p>
                <div className="pt-4">
                  <p className="text-xs text-muted-foreground">
                    Research: Zeman, A., Dewar, M., & Della Sala, S. (2015). "Lives without imagery — Congenital aphantasia." <em>Cortex, 73</em>, 378-380.
                  </p>
                </div>
              </div>
            </Card>

            {isFacilitator && (
              <div className="text-center">
                <Button onClick={() => setStep("intro")} variant="outline">
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
