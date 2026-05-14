import { PollWidget } from "@/components/PollWidget";
import { SlideShell } from "@/components/slide";
import { screens } from "@/config/screens";

interface CurbCutQuizScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
  userId?: string;
  slideId?: string;
}

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

  return (
    <SlideShell tone="teal" ariaLabel={`Curb-cut quiz ${qNum}`}>
      <div className="space-y-10">
        <header className="text-center space-y-4">
          <p className="text-sm md:text-base font-mono uppercase tracking-[0.4em] text-accent">
            Test the principle · {qNum}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.1] max-w-5xl mx-auto">
            {question}
          </h1>
        </header>

        {sessionId && userId ? (
          <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 md:p-10 animate-scale-in">
            <PollWidget
              sessionId={sessionId}
              slideId={id}
              userId={userId}
              isPresenter={isFacilitator}
            />
          </div>
        ) : (
          <p className="text-center text-xl text-muted-foreground">
            Join a live session to participate.
          </p>
        )}
      </div>
    </SlideShell>
  );
};
