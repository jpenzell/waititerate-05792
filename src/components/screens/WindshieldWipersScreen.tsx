import { Card } from "@/components/ui/card";
import { PollWidget } from "@/components/PollWidget";
import { QRCodeSVG } from "qrcode.react";
import { useReveal, useRegisterReveals } from "@/contexts/RevealContext";

interface WindshieldWipersScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
  userId?: string;
  sessionCode?: string;
}

export const WindshieldWipersScreen = ({
  isFacilitator = false,
  sessionId,
  userId,
  sessionCode,
}: WindshieldWipersScreenProps) => {
  // Step 0: big "Join the room" QR. Step 1: question + poll + small QR.
  // Only register the reveal when there's actually a session — otherwise the
  // join-screen step is skipped and the arrow shouldn't be silently consumed.
  const hasSession = isFacilitator && !!sessionCode;
  useRegisterReveals(hasSession ? 1 : 0);
  const { step } = useReveal();

  const joinUrl = sessionCode
    ? `${window.location.origin}/participate?code=${sessionCode}`
    : "";

  // STEP 0 — Join first (facilitator only, AND only when a session is live).
  // Without an active session this slide is a verbal hand-raise question, so skip the join screen.
  if (step < 1 && isFacilitator && sessionCode) {
    return (
      <main
        className="h-full flex items-center justify-center p-8 animate-fade-in"
        role="main"
        aria-label="Join the session"
      >
        <section className="max-w-5xl w-full text-center space-y-10">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              First — join the room.
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground">
              Scan to vote on what's coming next.
            </p>
          </div>

          {sessionCode ? (
            <div className="flex flex-col items-center gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-2xl">
                <QRCodeSVG value={joinUrl} size={320} />
              </div>
              <div className="space-y-2">
                <p className="text-base uppercase tracking-widest text-muted-foreground">
                  Or go to ai4all.joshpenzell.com/participate
                </p>
                <p className="text-6xl font-mono font-bold text-primary tracking-widest">
                  {sessionCode}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xl text-muted-foreground">
              Start a session to show the join code.
            </p>
          )}

          <p className="text-lg text-muted-foreground italic pt-4">
            Press → when most folks are in.
          </p>
        </section>
      </main>
    );
  }

  // STEP 1 — Question + live poll, with QR code parked alongside for late joiners
  return (
    <main
      className="h-full flex items-center justify-center p-8 animate-fade-in"
      role="main"
      aria-label="Windshield wipers question"
    >
      <section className="max-w-6xl w-full">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-center leading-tight mb-12">
          Does a self-driving car need windshield wipers?
        </h1>

        <p className="text-2xl text-muted-foreground text-center italic">
          Take a moment. Think about it. Press → for the reveal.
        </p>
      </section>
    </main>
  );
};
