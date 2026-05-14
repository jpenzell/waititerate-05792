import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, Square, RotateCcw } from "lucide-react";
import { useReveal, useRegisterReveals } from "@/contexts/RevealContext";

/**
 * LD3.6 — Time Perception (screenshare-only)
 *
 * Facilitator script:
 *   1. Tell the audience: "Close your eyes. When you think 10 seconds have
 *      passed, raise your hand (or unmute and say 'now')."
 *   2. Press SPACE / click START. Hidden timer runs.
 *   3. Press SPACE / click STOP on the first hand or the average of the room.
 *   4. The actual elapsed time is revealed alongside the 10s target.
 *   5. Press → for the research-grounded framing.
 */
export const TimePerceptionScreen = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [stoppedAt, setStoppedAt] = useState<number | null>(null);
  const startRef = useRef<number | null>(null);
  const targetTime = 10;
  useRegisterReveals(1);
  const { step: revealStep } = useReveal();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && startRef.current) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - (startRef.current ?? Date.now()));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const start = () => {
    startRef.current = Date.now();
    setStoppedAt(null);
    setElapsedTime(0);
    setIsRunning(true);
  };

  const stop = () => {
    if (!isRunning || !startRef.current) return;
    const final = Date.now() - startRef.current;
    setStoppedAt(final);
    setIsRunning(false);
    setElapsedTime(final);
  };

  const reset = () => {
    startRef.current = null;
    setStoppedAt(null);
    setElapsedTime(0);
    setIsRunning(false);
  };

  // SPACE = start/stop, R = reset. Don't fight global arrow nav.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        if (isRunning) stop();
        else if (stoppedAt === null) start();
      } else if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        reset();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isRunning, stoppedAt]);

  const seconds = elapsedTime / 1000;
  const diff = stoppedAt !== null ? Math.abs(seconds - targetTime) : 0;

  return (
    <div className="h-screen flex flex-col py-6 px-6 animate-fade-in">
      <div className="text-center mb-6">
        <Badge className="mb-3">
          <Clock className="h-4 w-4 mr-2" />
          Time Perception
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-2">
          How Long Is 10 Seconds?
        </h1>
        <p className="text-xl text-muted-foreground">
          Close your eyes. When you think 10 seconds have passed, raise your
          hand or say "now."
        </p>
      </div>

      <Card className="flex-1 p-10 bg-gradient-to-br from-primary/5 to-accent/5 flex flex-col items-center justify-center gap-8">
        {/* Hidden timer while running so the audience can't peek */}
        {stoppedAt === null ? (
          <div className="text-[12rem] leading-none font-bold tabular-nums text-primary">
            {isRunning ? "•" : "—"}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="text-[10rem] leading-none font-bold tabular-nums text-primary">
              {seconds.toFixed(1)}<span className="text-5xl text-muted-foreground">s</span>
            </div>
            <div className="text-2xl text-muted-foreground">
              Target was <span className="font-bold text-foreground">10.0s</span> ·
              {" "}off by <span className="font-bold text-accent">{diff.toFixed(1)}s</span>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          {!isRunning && stoppedAt === null && (
            <Button onClick={start} size="lg" className="text-xl px-10 py-7">
              <Play className="mr-2 h-6 w-6" /> Start (Space)
            </Button>
          )}
          {isRunning && (
            <Button onClick={stop} size="lg" variant="destructive" className="text-xl px-10 py-7">
              <Square className="mr-2 h-6 w-6" /> Stop (Space)
            </Button>
          )}
          {stoppedAt !== null && (
            <Button onClick={reset} size="lg" variant="outline" className="text-xl px-10 py-7">
              <RotateCcw className="mr-2 h-6 w-6" /> Run Again (R)
            </Button>
          )}
        </div>
      </Card>

      {revealStep < 1 ? (
        <Card className="mt-4 p-8 bg-gradient-to-br from-primary/5 to-accent/5 flex flex-col items-center justify-center gap-2">
          <p className="text-2xl md:text-3xl font-semibold text-foreground text-center leading-snug">
            Time perception is wildly variable.
            {" "}
            <span className="text-primary">Build checkpoints, not just deadlines.</span>
          </p>
          <p className="text-base text-muted-foreground italic">Press → for what students told us.</p>
        </Card>
      ) : (
        <Card className="mt-4 p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 flex flex-col items-center justify-center gap-3 animate-fade-in">
          <p className="text-2xl md:text-3xl font-semibold text-foreground text-center italic leading-snug max-w-4xl">
            "The challenge isn't <span className="text-primary">making</span> the plan.
            {" "}It's <span className="text-primary">sticking to it</span>."
          </p>
          <p className="text-base md:text-lg text-muted-foreground text-center leading-snug max-w-3xl">
            ADHD students in the Atcheson CHI 2025 study repeatedly named follow-through — not planning — as the real executive-function gap.
          </p>
          <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
            Atcheson, Khan, Siemann, Jain &amp; Karahalios · CHI 2025
          </p>
        </Card>
      )}
    </div>
  );
};