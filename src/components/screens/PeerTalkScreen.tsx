import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  prompt?: string;
  subPrompt?: string;
  seconds?: number;
}

export const PeerTalkScreen = ({
  prompt = "Turn to your neighbor.",
  subPrompt,
  seconds = 90,
}: Props) => {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (remaining <= 0) { setRunning(false); return; }
    const t = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [running, remaining]);

  const m = Math.floor(remaining / 60);
  const s = (remaining % 60).toString().padStart(2, "0");

  return (
    <main className="min-h-screen flex items-center justify-center px-8 animate-fade-in">
      <section className="max-w-5xl w-full space-y-8 text-center">
        <Badge variant="secondary" className="mx-auto">Turn to your neighbor</Badge>
        <Users className="h-16 w-16 mx-auto text-accent" />
        <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
          {prompt}
        </h1>
        {subPrompt && (
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {subPrompt}
          </p>
        )}

        <Card className="p-8 inline-block bg-gradient-to-br from-accent/10 to-primary/5 border-2 border-accent/30">
          <div className="flex items-center gap-4">
            <Clock className="h-10 w-10 text-accent" />
            <div className="font-mono text-6xl md:text-7xl font-bold text-foreground tabular-nums">
              {m}:{s}
            </div>
          </div>
          <button
            onClick={() => { setRemaining(seconds); setRunning(r => !r); }}
            className="mt-4 text-sm uppercase tracking-widest font-mono text-muted-foreground hover:text-foreground transition"
          >
            {running ? "Stop" : "Start timer"}
          </button>
        </Card>
      </section>
    </main>
  );
};