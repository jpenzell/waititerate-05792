import { Card } from "@/components/ui/card";
import { PollWidget } from "@/components/PollWidget";
import { QRCodeSVG } from "qrcode.react";
import { useReveal, useRegisterReveals } from "@/contexts/RevealContext";
import duckRabbitImage from "@/assets/duck-rabbit.png";

interface PatternRecognitionScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
  userId?: string;
  sessionCode?: string;
}

export const PatternRecognitionScreen = ({
  isFacilitator = false,
  sessionId,
  userId,
  sessionCode,
}: PatternRecognitionScreenProps) => {
  // Step 0: Join via QR. Step 1: Image + poll. Step 2: Explanation.
  useRegisterReveals(2);
  const { step } = useReveal();

  const joinUrl = sessionCode
    ? `${window.location.origin}/participate?code=${sessionCode}`
    : "";

  // Always render the image off-screen so the browser fully decodes it before reveal.
  const Preloader = (
    <img
      src={duckRabbitImage}
      alt=""
      aria-hidden="true"
      className="absolute -left-[9999px] top-0 w-px h-px opacity-0 pointer-events-none"
      decoding="async"
    />
  );

  // STEP 2 — Explanation
  if (step >= 2) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 md:p-8 animate-fade-in" role="main">
        {Preloader}
        <section className="max-w-6xl w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              This Is Cognitive Diversity in Action
            </h1>
            <p className="text-xl text-muted-foreground">
              Different brains notice different patterns first
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-accent/10 border-2 border-accent space-y-4">
              <h2 className="text-2xl font-bold text-foreground">The Science</h2>
              <div className="space-y-3 text-lg">
                <div className="p-4 bg-background rounded border border-primary/20">
                  <p className="font-semibold text-primary mb-1">Autistic Processing</p>
                  <p className="text-sm text-muted-foreground">
                    Bottom-up: Notice details first, build to big picture
                  </p>
                </div>
                <div className="p-4 bg-background rounded border border-accent/20">
                  <p className="font-semibold text-accent mb-1">Neurotypical Processing</p>
                  <p className="text-sm text-muted-foreground">
                    Top-down: See overall pattern first
                  </p>
                </div>
                <p className="text-base text-muted-foreground italic pt-2">
                  Neither is "better"—they're complementary strengths
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-primary/10 border-2 border-primary/30 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Why This Matters</h2>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-2xl">→</span>
                  <span><strong>QA Testing:</strong> Detail-focused minds catch edge cases</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-2xl">→</span>
                  <span><strong>Innovation:</strong> Different perspectives = creative solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-2xl">→</span>
                  <span><strong>Risk Management:</strong> Diverse viewpoints spot blind spots</span>
                </li>
              </ul>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
            <div className="text-center space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                Design Learning for Cognitive Diversity
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                When you respect different processing styles—detail-focused <em>and</em> big-picture thinkers—everyone can contribute their unique strengths.
              </p>
              <p className="text-lg text-primary font-semibold">
                That's not just inclusion. That's innovation.
              </p>
            </div>
          </Card>
        </section>
      </main>
    );
  }

  // STEP 0 — Join first (facilitator view). Big QR + code, no image yet.
  if (step < 1 && isFacilitator) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 animate-fade-in" role="main">
        {Preloader}
        <section className="max-w-5xl w-full text-center space-y-10">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              First — join the room.
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground">
              Scan to vote on the next question.
            </p>
          </div>

          {sessionCode ? (
            <div className="flex flex-col items-center gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-2xl">
                <QRCodeSVG value={joinUrl} size={320} />
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Or go to ai4all.joshpenzell.com/participate
                </p>
                <p className="text-6xl font-mono font-bold text-primary tracking-widest">
                  {sessionCode}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xl text-muted-foreground">Start a session to show the join code.</p>
          )}

          <p className="text-lg text-muted-foreground italic pt-4">
            Press → when most folks are in.
          </p>
        </section>
      </main>
    );
  }

  // STEP 1 — Image + live poll
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 animate-fade-in" role="main">
      <section className="max-w-6xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Pattern Recognition & Perspective
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            What do you see first?
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-background border-2 border-primary/20">
            <img
              src={duckRabbitImage}
              alt="Duck-rabbit optical illusion - ambiguous figure that can be seen as either a duck or rabbit"
              className="w-full h-auto"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </Card>
        </div>

        {isFacilitator && sessionId && userId ? (
          <div className="max-w-2xl mx-auto">
            <PollWidget
              sessionId={sessionId}
              slideId="LD2.0"
              userId={userId}
              isPresenter={true}
            />
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl text-muted-foreground">📱 Vote on your device</p>
          </div>
        )}
      </section>
    </main>
  );
};
