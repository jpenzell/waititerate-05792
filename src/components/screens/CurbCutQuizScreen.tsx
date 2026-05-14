import { PollWidget } from "@/components/PollWidget";
import { SlideShell } from "@/components/slide";
import { screens } from "@/config/screens";
import { useReveal, useRegisterReveals } from "@/contexts/RevealContext";
import { Sparkles } from "lucide-react";

interface CurbCutQuizScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
  userId?: string;
  slideId?: string;
}

// Correct answer + the curb-cut takeaway for each quiz slide.
// Press → after asking the question to reveal.
const ANSWER_KEY: Record<string, { answer: string; takeaway: string; source: string }> = {
  "LD5.1": {
    answer: "71%",
    takeaway: "Built for deaf viewers. Used by everyone — on the train, in bed, in noisy classrooms.",
    source: "Verizon Media / Publicis Media, 2019",
  },
  "LD5.2": {
    answer: "30%",
    takeaway: "Chunked content was built for cognitive load. It lifts completion for every learner.",
    source: "Mayer, Multimedia Learning, 2009 · eLearning Industry meta-analyses",
  },
  "LD5.3": {
    answer: "80%+",
    takeaway: "Multiple formats started as an accessibility mandate. It's now what most learners prefer.",
    source: "EDUCAUSE Student Tech Survey · UDL on Campus",
  },
};

export const CurbCutQuizScreen = ({
  isFacilitator = false,
  sessionId,
  userId,
  slideId,
}: CurbCutQuizScreenProps) => {
  const id = slideId || (typeof window !== "undefined" ? window.location.hash.replace("#", "") : "");
  const def = screens.find((s) => s.id === id);
  const question = def?.pollQuestion ?? "Guess the statistic";
  const qNum = id?.replace("LD5.", "Q");
  const reveal = ANSWER_KEY[id];

  // One reveal step: press → after asking the question to show the answer.
  useRegisterReveals(reveal ? 1 : 0);
  const { step } = useReveal();
  const showAnswer = step >= 1;

  return (
    <SlideShell tone="teal" ariaLabel={`Curb-cut quiz ${qNum}`}>
      <div className="space-y-10">
        <header className="text-center space-y-4">
          <p className="text-lg md:text-xl font-mono uppercase tracking-[0.4em] text-accent">
            Test the principle · {qNum}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.1] max-w-5xl mx-auto">
            {question}
          </h1>
        </header>

        {showAnswer && reveal ? (
          <div
            className="rounded-xl border-2 border-accent/40 bg-gradient-to-br from-accent/10 to-primary/10 p-10 md:p-14 text-center animate-scale-in"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center justify-center gap-3 text-accent mb-4">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
              <p className="text-lg md:text-xl font-mono uppercase tracking-[0.3em]">
                The answer
              </p>
            </div>
            <p className="text-8xl md:text-9xl font-black text-accent leading-none">
              {reveal.answer}
            </p>
            <p className="text-2xl md:text-3xl text-foreground font-semibold mt-6 max-w-4xl mx-auto leading-snug">
              {reveal.takeaway}
            </p>
            <p className="text-lg md:text-xl text-muted-foreground italic mt-4">
              {reveal.source}
            </p>
          </div>
        ) : sessionId && userId ? (
          <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 md:p-10 animate-scale-in">
            <PollWidget
              sessionId={sessionId}
              slideId={id}
              userId={userId}
              isPresenter={isFacilitator}
            />
          </div>
        ) : (
          <p className="text-center text-xl text-muted-foreground italic">
            Take a guess — show of hands. Press <kbd className="px-2 py-1 mx-1 rounded bg-muted text-foreground font-mono">→</kbd> to reveal.
          </p>
        )}
      </div>
    </SlideShell>
  );
};
