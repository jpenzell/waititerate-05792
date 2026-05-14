import { useEffect, useState, useCallback } from "react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SlideShell } from "@/components/slide";

const PHRASES = ["Slam dunk", "Serious possibility", "Rarely", "Never"];

/**
 * Probability Words Poll — one phrase at a time.
 * Sets up the Annie Duke / CIA Sherman Kent reveal that follows.
 */
export const ProbabilityWordsPollScreen = () => {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const phrase = PHRASES[phraseIdx];
  const isLast = phraseIdx === PHRASES.length - 1;

  const goNext = useCallback(() => {
    setPhraseIdx((i) => (i < PHRASES.length - 1 ? i + 1 : i));
  }, []);
  const goPrev = useCallback(() => {
    setPhraseIdx((i) => (i > 0 ? i - 1 : i));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      if (e.key === " " || e.key === "ArrowRight") {
        if (!isLast) {
          e.preventDefault();
          e.stopPropagation();
          goNext();
        }
      } else if (e.key === "ArrowLeft") {
        if (phraseIdx > 0) {
          e.preventDefault();
          e.stopPropagation();
          goPrev();
        }
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [isLast, phraseIdx, goNext, goPrev]);

  return (
    <SlideShell tone="indigo" align="center" ariaLabel="Probability words poll">
      <div className="w-full max-w-7xl mx-auto space-y-10 text-center">
        <div className="flex items-center justify-center gap-3 text-accent">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
          <span className="uppercase tracking-[0.3em] text-sm font-mono font-semibold">
            What does that even mean? · {phraseIdx + 1} of {PHRASES.length}
          </span>
        </div>

        <div key={phrase} className="space-y-6 animate-fade-in">
          <p className="text-2xl md:text-4xl text-muted-foreground">
            When someone says…
          </p>
          <h1 className="font-black leading-[1.05] text-foreground text-7xl md:text-9xl">
            <span className="text-primary italic">"{phrase}"</span>
          </h1>
          <p className="text-2xl md:text-4xl text-foreground/85 pt-4">
            …what % chance do they mean?
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-6 flex-wrap">
          <Button variant="outline" size="lg" onClick={goPrev} disabled={phraseIdx === 0}>
            <ChevronLeft className="h-5 w-5 mr-1" aria-hidden="true" />
            Prev
          </Button>
          {!isLast ? (
            <Button size="lg" onClick={goNext} className="px-8 font-bold">
              Next phrase
              <ChevronRight className="h-5 w-5 ml-1" aria-hidden="true" />
            </Button>
          ) : (
            <span className="text-sm text-muted-foreground italic px-4">
              Press → to continue
            </span>
          )}
        </div>
      </div>
    </SlideShell>
  );
};