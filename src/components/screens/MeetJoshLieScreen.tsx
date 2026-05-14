import { Card } from "@/components/ui/card";
import { PollWidget } from "@/components/PollWidget";
import { Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { useReveal, useRegisterReveals } from "@/contexts/RevealContext";

interface Props {
  isFacilitator?: boolean;
  sessionId?: string;
  userId?: string;
  sessionCode?: string;
}

// EDIT ME — three statements about Josh. Mark the lie with isLie: true.
// Order here is the order shown to participants.
export const JOSH_STATEMENTS: { text: string; isLie: boolean; note?: string }[] = [
  {
    text: "I filed an accommodation request for an org chart.",
    isLie: false,
    note: "True. The flat list version of the org chart was unreadable for me.",
  },
  {
    text: "Placeholder truth #2 — replace me.",
    isLie: false,
  },
  {
    text: "Placeholder lie — replace me.",
    isLie: true,
    note: "This one's the lie.",
  },
];

export const MeetJoshLieScreen = ({
  isFacilitator = false,
  sessionId,
  userId,
  sessionCode,
}: Props) => {
  // Step 0: intro + statements + live poll. Step 1: reveal the lie.
  useRegisterReveals(1);
  const { step } = useReveal();

  const lieIndex = JOSH_STATEMENTS.findIndex((s) => s.isLie);

  return (
    <main
      className="h-full flex items-center justify-center p-8 animate-fade-in"
      role="main"
      aria-label="Meet Josh — spot the lie"
    >
      <section className="max-w-6xl w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 border border-primary/30 rounded-full">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">
              Meet Josh · Two Truths &amp; a Lie
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            {step < 1 ? "Which one is the lie?" : "Here's the lie."}
          </h1>
          {step < 1 && sessionCode && (
            <p className="text-xl md:text-2xl text-muted-foreground">
              Vote on your phone.
            </p>
          )}
          {step < 1 && !sessionCode && (
            <p className="text-xl md:text-2xl text-muted-foreground italic">
              Call out your guess.
            </p>
          )}
        </div>

        {/* Statements grid */}
        <ol className="grid md:grid-cols-3 gap-5" aria-label="Statements about Josh">
          {JOSH_STATEMENTS.map((s, i) => {
            const revealed = step >= 1;
            const isLie = s.isLie;
            const ringClass = revealed
              ? isLie
                ? "border-red-500 ring-4 ring-red-500/30 bg-red-500/10"
                : "border-green-500/60 bg-green-500/5"
              : "border-border bg-card";
            return (
              <li key={i} className={`rounded-2xl border-2 p-6 transition-all ${ringClass}`}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-mono text-muted-foreground">
                    #{i + 1}
                  </span>
                  {revealed && (
                    isLie
                      ? <span className="inline-flex items-center gap-1 text-red-500 text-sm font-bold uppercase tracking-wider"><XCircle className="h-4 w-4" /> Lie</span>
                      : <span className="inline-flex items-center gap-1 text-green-600 text-sm font-bold uppercase tracking-wider"><CheckCircle2 className="h-4 w-4" /> True</span>
                  )}
                </div>
                <p className="text-xl md:text-2xl font-semibold text-foreground leading-snug">
                  {s.text}
                </p>
                {revealed && s.note && (
                  <p className="mt-3 text-base text-muted-foreground italic">
                    {s.note}
                  </p>
                )}
              </li>
            );
          })}
        </ol>

        {/* Poll + QR for facilitator */}
        {isFacilitator && sessionId && userId && (
          <div className="grid md:grid-cols-[3fr_2fr] gap-6 items-center">
            <PollWidget
              sessionId={sessionId}
              slideId="LD1.2c"
              userId={userId}
              isPresenter={true}
            />

            {sessionCode && step < 1 && (
              <Card className="p-5 bg-card/60 backdrop-blur flex flex-col items-center gap-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Join code
                </p>
                <p className="text-3xl font-mono font-bold text-primary">{sessionCode}</p>
                <p className="text-xs text-muted-foreground">ai4all.joshpenzell.com/participate</p>
              </Card>
            )}
          </div>
        )}

        {step < 1 && (
          <p className="text-center text-sm text-muted-foreground italic">
            Press → to reveal the lie.
          </p>
        )}
        {step >= 1 && lieIndex >= 0 && (
          <p className="text-center text-2xl md:text-3xl text-foreground">
            Statement <span className="font-bold text-red-500">#{lieIndex + 1}</span> was the lie.
          </p>
        )}
      </section>
    </main>
  );
};
