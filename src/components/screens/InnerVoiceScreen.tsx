import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, VolumeX, Brain, Sparkles, MessageSquare } from "lucide-react";
import { SlideHeader } from "@/components/SlideHeader";

interface InnerVoiceScreenProps {
  isFacilitator?: boolean;
}

export const InnerVoiceScreen = ({ isFacilitator = false }: InnerVoiceScreenProps) => {
  const [step, setStep] = useState<"intro" | "test" | "results">("intro");
  const [hasInnerVoice, setHasInnerVoice] = useState<boolean | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/10 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <SlideHeader slideNumber={4} totalSlides={14} estimatedMinutes={6} title="Inner Voice Discovery" />

        {/* Intro */}
        {step === "intro" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="mb-2">
                <MessageSquare className="h-4 w-4 mr-2" />
                Cognitive Difference #2
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                Do You Hear a Voice<br/>When You Read?
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Some people hear every word narrated in their head. Others read in <strong>complete silence.</strong>
              </p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/20">
              <div className="space-y-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-foreground font-semibold mb-4">
                    Read this paragraph silently:
                  </p>
                  <div className="p-6 bg-background rounded-lg border border-border">
                    <p className="text-base text-foreground leading-relaxed">
                      The cat stretched lazily in the afternoon sun, its orange fur glowing like embers. Somewhere in the distance, a dog barked twice. The cat yawned, showing tiny white teeth, then curled back into a perfect circle of contentment.
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-6 space-y-4">
                  <p className="text-lg text-foreground font-semibold">
                    Now ask yourself:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>Did you <strong>hear</strong> the words as if someone was reading them aloud?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>Did it sound like <strong>your</strong> voice, or someone else's?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>Or did you just <strong>absorb the meaning</strong> without any sound at all?</span>
                    </li>
                  </ul>
                </div>

                <Button 
                  onClick={() => setStep("test")} 
                  size="lg" 
                  className="w-full md:w-auto"
                >
                  Answer the Question
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>

            {/* Research Note */}
            <Card className="p-4 bg-background/50 border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Research:</strong> Alderson-Day, B. & Fernyhough, C. (2015). "Inner speech: Development, cognitive functions, phenomenology, and neurobiology." <em>Psychological Bulletin, 141</em>(5), 931-965.
              </p>
            </Card>
          </div>
        )}

        {/* Test */}
        {step === "test" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-foreground">What Did You Experience?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the option that best describes your reading experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card 
                className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 hover:border-primary/40 transition-all cursor-pointer group"
                onClick={() => {
                  setHasInnerVoice(true);
                  setStep("results");
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Volume2 className="h-12 w-12 text-primary" />
                    <h3 className="text-2xl font-bold text-foreground">Yes, I Hear a Voice</h3>
                  </div>
                  <p className="text-muted-foreground">
                    I heard the words narrated in my head—like an audiobook or internal monologue. It might have been my voice, or a neutral narrator, but there was definitely <strong>sound</strong>.
                  </p>
                  <div className="pt-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      Inner Speech / Verbal Thinking
                    </Badge>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-8 bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/20 hover:border-accent/40 transition-all cursor-pointer group"
                onClick={() => {
                  setHasInnerVoice(false);
                  setStep("results");
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <VolumeX className="h-12 w-12 text-accent" />
                    <h3 className="text-2xl font-bold text-foreground">No, Silent Reading</h3>
                  </div>
                  <p className="text-muted-foreground">
                    I just <strong>understood</strong> the meaning directly—no narration, no voice. The words went straight from the page to comprehension, like <strong>absorbing data</strong>.
                  </p>
                  <div className="pt-4">
                    <Badge className="bg-accent/10 text-accent border-accent/20">
                      Non-Verbal / Direct Processing
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground italic">
                There's no "right" answer—both are valid ways brains process text.
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {step === "results" && hasInnerVoice !== null && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="mb-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Your Reading Style
              </Badge>
              <h2 className="text-5xl font-bold text-foreground">
                You Have: <span className={hasInnerVoice ? "text-primary" : "text-accent"}>
                  {hasInnerVoice ? "Inner Speech" : "Silent Reading"}
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {hasInnerVoice 
                  ? "You process text through auditory channels—hearing words in your mind as you read."
                  : "You process text directly as meaning—bypassing the auditory step entirely."
                }
              </p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Brain className="h-6 w-6 text-primary" />
                    How You Process Information
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    {hasInnerVoice ? (
                      <>
                        <p>
                          <strong>Auditory Processing:</strong> You engage the language centers of your brain that handle speech production and comprehension.
                        </p>
                        <p>
                          <strong>Working Memory:</strong> Your inner voice serves as a "phonological loop" that helps you remember and manipulate information.
                        </p>
                        <p>
                          <strong>Self-Regulation:</strong> Inner speech helps with planning, problem-solving, and emotional regulation ("talk yourself through" tasks).
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          <strong>Direct Semantic Processing:</strong> You bypass phonological encoding and go straight to meaning.
                        </p>
                        <p>
                          <strong>Speed Advantage:</strong> Silent readers often read faster because they skip the "vocalization" step.
                        </p>
                        <p>
                          <strong>Different Working Memory:</strong> You rely more on visual-spatial or conceptual memory rather than verbal rehearsal.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-accent" />
                    Learning Design Implications
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    {hasInnerVoice ? (
                      <>
                        <p>
                          <strong>You Benefit From:</strong> Read-aloud features, podcasts, verbal explanations, talking through problems.
                        </p>
                        <p>
                          <strong>Challenge:</strong> Dense text without narration or audio support may feel cognitively draining.
                        </p>
                        <p>
                          <strong>Strength:</strong> Excellent at verbal reasoning, language-based tasks, and auditory memory.
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          <strong>You Benefit From:</strong> Diagrams, outlines, bullet points, visual hierarchies, skimmable text.
                        </p>
                        <p>
                          <strong>Challenge:</strong> Purely audio-based instruction without visual support may not stick.
                        </p>
                        <p>
                          <strong>Strength:</strong> Fast processing of written material, strong visual-spatial reasoning.
                        </p>
                      </>
                    )}
                    <p className="pt-2 border-t border-border">
                      <strong>UDL Principle:</strong> Provide content in BOTH formats—text with audio narration option. Let learners choose their pathway.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* The Wow Moment */}
            <Card className="p-8 bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/30">
              <div className="text-center space-y-4">
                <h3 className="text-3xl font-bold text-foreground">The Surprise</h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Many people go their entire lives not realizing others read differently. Someone with inner speech might think <strong>everyone</strong> hears a voice when reading. Someone without it might think "inner voice" is just a metaphor.
                </p>
                <p className="text-base text-foreground/80 italic max-w-2xl mx-auto">
                  This is why asking "Did you visualize it?" or "Did you talk yourself through it?" can fail spectacularly—<strong>because not everyone's brain works that way.</strong>
                </p>
                <div className="pt-4 grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm font-semibold text-primary mb-2">With Inner Voice</p>
                    <p className="text-xs text-muted-foreground">
                      ~60-70% of people — use verbal rehearsal for memory and reasoning
                    </p>
                  </div>
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <p className="text-sm font-semibold text-accent mb-2">Silent Readers</p>
                    <p className="text-xs text-muted-foreground">
                      ~30-40% of people — process meaning directly without vocalization
                    </p>
                  </div>
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
