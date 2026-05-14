import { useState, useEffect, useCallback } from "react";
import { Brain, Sparkles, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SlideShell } from "@/components/slide";

interface WordPrediction {
  word: string;
  probability: number;
  isChosen: boolean;
}

interface StepData {
  context: string;
  predictions: WordPrediction[];
  chosenWord: string;
}

const storySteps: StepData[] = [
  {
    context: "The",
    predictions: [
      { word: "sun", probability: 32, isChosen: true },
      { word: "old", probability: 18, isChosen: false },
      { word: "small", probability: 15, isChosen: false },
      { word: "dark", probability: 12, isChosen: false },
    ],
    chosenWord: "sun",
  },
  {
    context: "The sun",
    predictions: [
      { word: "set", probability: 28, isChosen: true },
      { word: "rose", probability: 24, isChosen: false },
      { word: "shone", probability: 19, isChosen: false },
      { word: "blazed", probability: 11, isChosen: false },
    ],
    chosenWord: "set",
  },
  {
    context: "The sun set",
    predictions: [
      { word: "over", probability: 41, isChosen: true },
      { word: "behind", probability: 22, isChosen: false },
      { word: "slowly", probability: 14, isChosen: false },
      { word: "on", probability: 9, isChosen: false },
    ],
    chosenWord: "over",
  },
  {
    context: "The sun set over",
    predictions: [
      { word: "the", probability: 52, isChosen: true },
      { word: "rolling", probability: 18, isChosen: false },
      { word: "distant", probability: 12, isChosen: false },
      { word: "golden", probability: 8, isChosen: false },
    ],
    chosenWord: "the",
  },
  {
    context: "The sun set over the",
    predictions: [
      { word: "vineyard", probability: 35, isChosen: true },
      { word: "hills", probability: 22, isChosen: false },
      { word: "horizon", probability: 18, isChosen: false },
      { word: "valley", probability: 14, isChosen: false },
    ],
    chosenWord: "vineyard",
  },
];

const AUTO_ADVANCE_DELAY = 2500;
const PAUSE_AT_END_DELAY = 3500;

/**
 * LD1.92 — How AI generates: probabilistic next-word prediction. Auto-plays
 * through "The sun set over the vineyard…", showing the top-4 candidates and
 * which one was chosen at each step. Press P to pause/play.
 */
export const LLMExplainerScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const step = storySteps[currentStep];
  const builtSentence = storySteps
    .slice(0, currentStep + 1)
    .map((s) => s.chosenWord)
    .join(" ");

  useEffect(() => {
    if (isPaused) return;
    const delay = currentStep === storySteps.length - 1 ? PAUSE_AT_END_DELAY : AUTO_ADVANCE_DELAY;
    const timer = setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => {
        if (currentStep >= storySteps.length - 1) {
          setCurrentStep(0);
        } else {
          setCurrentStep((prev) => prev + 1);
        }
        setIsAnimating(false);
      }, 300);
    }, delay);
    return () => clearTimeout(timer);
  }, [currentStep, isPaused]);

  const togglePause = useCallback(() => setIsPaused((p) => !p), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        togglePause();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePause]);

  return (
    <SlideShell tone="indigo" align="center" ariaLabel="How AI predicts the next word">
      <div className="space-y-6">
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <Brain className="w-5 h-5 text-primary" aria-hidden="true" />
            <span className="text-sm md:text-base font-mono uppercase tracking-[0.25em] text-primary">How AI writes</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
            This is exactly how <span className="text-primary">"generative AI"</span> works.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-snug">
            LLMs predict the <strong>next word</strong> based on probabilities — one word at a time,
            just like the story exercise.
          </p>
        </header>

        <div className="bg-card border-2 border-border rounded-3xl p-6 md:p-8 shadow-lg relative">
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePause}
              className="gap-2 text-muted-foreground hover:text-foreground"
              aria-label={isPaused ? "Resume animation" : "Pause animation"}
            >
              {isPaused ? (
                <><Play className="w-4 h-4" /><span className="text-xs">Paused</span></>
              ) : (
                <><Pause className="w-4 h-4" /><span className="text-xs">Auto-playing</span></>
              )}
            </Button>
          </div>

          <div className="mb-6">
            <div className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Context so far
            </div>
            <div className="text-2xl md:text-3xl font-semibold text-foreground bg-muted/50 rounded-xl p-4 min-h-[60px] flex items-center">
              <span>{step.context}</span>
              <span className="ml-2 w-3 h-8 bg-primary animate-pulse rounded" aria-hidden="true" />
            </div>
          </div>

          <div className="mb-6">
            <div className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              AI calculates probability for each possible next word
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {step.predictions.map((pred) => (
                <div
                  key={pred.word}
                  className={`relative rounded-xl p-4 border-2 transition-all duration-300 ${
                    pred.isChosen
                      ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                      : "border-border bg-card"
                  } ${isAnimating && pred.isChosen ? "animate-scale-in" : ""}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xl font-bold ${pred.isChosen ? "text-primary" : "text-foreground"}`}>
                      "{pred.word}"
                    </span>
                    <span className={`text-lg font-semibold ${pred.isChosen ? "text-primary" : "text-muted-foreground"}`}>
                      {pred.probability}%
                    </span>
                  </div>
                  <Progress
                    value={pred.probability}
                    className={`h-3 ${pred.isChosen ? "[&>div]:bg-primary" : "[&>div]:bg-muted-foreground/40"}`}
                  />
                  {pred.isChosen && (
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                      CHOSEN
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
            <div className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-accent mb-2">
              Generated text
            </div>
            <div className="text-xl md:text-2xl font-medium text-foreground">
              "The {builtSentence}..."
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 px-4">
            {storySteps.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? "bg-primary scale-125"
                    : idx < currentStep
                    ? "bg-primary/40"
                    : "bg-muted"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            Press <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">P</kbd> to pause/play
          </span>
        </div>
      </div>
    </SlideShell>
  );
};