import { useState, useEffect } from "react";
import { Users, Timer } from "lucide-react";

const DURATION = 90;

/**
 * Warm-up: "What hairstyle are you today?" 90-second timer.
 * Take 5–8 responses. Land it: one word produces 30+ mental pictures.
 * That's not a comms problem — that's how language works.
 */
export const HairstyleScreen = () => {
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((DURATION - timeLeft) / DURATION) * 100;

  return (
    <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
      <div className="max-w-4xl mx-auto w-full text-center space-y-8 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/30 rounded-full">
          <Users className="h-4 w-4 text-secondary" aria-hidden="true" />
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Warm-up
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
          What hairstyle are you today?
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          90 seconds. One word, one phrase. Don't think too hard.
        </p>

        <div className="pt-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="inline-flex flex-col items-center gap-2 group cursor-pointer"
            aria-label={isRunning ? "Pause timer" : "Start timer"}
          >
            <div className="relative w-44 h-44 rounded-full border-4 border-secondary/30 flex items-center justify-center group-hover:border-secondary/60 transition-colors">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 176 176" aria-hidden="true">
                <circle
                  cx="88" cy="88" r="82"
                  fill="none"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 82}`}
                  strokeDashoffset={`${2 * Math.PI * 82 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="text-center px-2">
                <span className="text-3xl font-mono font-bold text-foreground tabular-nums whitespace-nowrap">
                  {minutes}:{seconds.toString().padStart(2, "0")}
                </span>
              </div>
            </div>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Timer className="h-3 w-3" aria-hidden="true" />
              {isRunning ? "tap to pause" : timeLeft === DURATION ? "tap to start" : "tap to resume"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};