import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Users, Presentation, Sparkles } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <ParticleBackground />
      <main className="min-h-screen flex items-center justify-center p-6 relative">
        <Card className="max-w-2xl w-full p-10 bg-card/95 backdrop-blur-xl border-primary/30 shadow-2xl text-center space-y-8">
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 text-primary">
              <Sparkles className="w-5 h-5" aria-hidden="true" />
              <span className="text-sm font-semibold uppercase tracking-wider">Live Session</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-card-foreground">
              AI for All Minds
            </h1>
            <p className="text-lg text-muted-foreground">
              Designing learning for every kind of brain. Join the live session or sign in as facilitator.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 gap-4">
            <Button
              onClick={() => navigate("/participate")}
              size="lg"
              className="w-full h-auto py-6 flex-col gap-2"
            >
              <Users className="w-6 h-6" aria-hidden="true" />
              <span className="text-base font-semibold">Join &amp; Participate</span>
            </Button>
            <Button
              onClick={() => navigate("/facilitator-setup")}
              size="lg"
              variant="outline"
              className="w-full h-auto py-6 flex-col gap-2"
            >
              <Presentation className="w-6 h-6" aria-hidden="true" />
              <span className="text-base font-semibold">Facilitator Login</span>
            </Button>
          </div>
        </Card>
      </main>
    </>
  );
}
