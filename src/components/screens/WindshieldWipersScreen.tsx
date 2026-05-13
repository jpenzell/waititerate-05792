import { Card } from "@/components/ui/card";
import zooxVehicle from "@/assets/zoox-vehicle.jpg";
import { PollWidget } from "@/components/PollWidget";
import { QRCodeSVG } from "qrcode.react";
import { useReveal, useRegisterReveals } from "@/contexts/RevealContext";

interface WindshieldWipersScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
  userId?: string;
  sessionCode?: string;
}

export const WindshieldWipersScreen = ({ isFacilitator = false, sessionId, userId, sessionCode }: WindshieldWipersScreenProps) => {
  useRegisterReveals(1);
  const { step } = useReveal();
  const showExplanation = step >= 1;
  const joinUrl = sessionCode ? `${window.location.origin}/participate?code=${sessionCode}` : "";

  if (!showExplanation) {
    return (
      <main className="h-screen flex flex-col p-8 animate-fade-in" role="main" aria-label="Windshield wipers question">
        <section className="max-w-6xl w-full mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-8 text-center">
            Thinking From First Principles
          </h1>
          
          <div className="space-y-4 text-center mb-12">
            <p className="text-3xl font-bold text-primary">
              Does a self-driving car need windshield wipers?
            </p>
            <p className="text-xl text-muted-foreground italic">
              This is how neurodivergent minds often think differently—<br/>
              questioning assumptions others take for granted
            </p>
          </div>
          
          {isFacilitator && sessionId && userId ? (
            <div className="grid md:grid-cols-2 gap-6 items-start">
              {/* Left: Poll Visualization */}
              <div>
                <PollWidget
                  sessionId={sessionId}
                  slideId="LD1.1"
                  userId={userId}
                  isPresenter={true}
                />
              </div>
              
              {/* Right: Session Info */}
              {sessionCode && (
                <Card className="p-6 bg-card/50 backdrop-blur">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Session Code:</p>
                      <p className="text-4xl font-bold text-primary mb-1">{sessionCode}</p>
                      <p className="text-sm text-muted-foreground">{window.location.origin}/participate</p>
                    </div>
                    {joinUrl && (
                      <div className="flex justify-center pt-4">
                        <div className="bg-white p-4 rounded-lg">
                          <QRCodeSVG value={joinUrl} size={160} />
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xl text-muted-foreground mb-8">
                📱 Answer on your device
              </p>
            </div>
          )}

          <p className="text-center mt-8 text-sm text-muted-foreground">Press → to reveal the answer</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 animate-fade-in" role="main" aria-label="Windshield wipers answer reveal">
      <section className="max-w-7xl w-full space-y-8">
        {/* Hero Answer */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-primary">
            The Answer: It depends on your assumptions
          </h2>
          <p className="text-xl md:text-2xl text-foreground">
            If there's no driver... do you even need a windshield?
          </p>
        </div>

        {/* Zoox Vehicle Image - Full width, prominent */}
        <figure className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/30">
          <img 
            src={zooxVehicle} 
            alt="Zoox autonomous self-driving vehicle with teal colored body, no visible windshield, bidirectional design where passengers face each other instead of forward"
            className="w-full h-auto object-cover"
          />
          <figcaption className="sr-only">Zoox vehicle demonstrating first-principles design without windshields</figcaption>
        </figure>

        {/* Key Points Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: What Makes Zoox Different */}
          <Card className="p-6 bg-accent/10 border-2 border-accent space-y-4">
            <h3 className="text-2xl font-bold text-foreground">
              First Principles: Zoox Vehicle
            </h3>
            <p className="text-lg text-foreground/90">
              Running autonomously in Las Vegas today
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold text-2xl">→</span>
                <span>No windshield—passengers face each other</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold text-2xl">→</span>
                <span>No front or back</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold text-2xl">→</span>
                <span>Built for ridesharing from scratch</span>
              </li>
            </ul>
          </Card>

          {/* Right: The L&D Connection */}
          <Card className="p-6 bg-primary/10 border-2 border-primary/30 space-y-4">
            <h3 className="text-2xl font-bold text-foreground">
              🧠 Neurodivergent Thinking
            </h3>
            <p className="text-lg text-foreground/90">
              Questioning assumptions others take for granted. Reimagining from scratch.
            </p>
            <div className="pt-4 border-t border-primary/20">
              <p className="text-xl font-bold text-primary mb-2">
                The L&D Challenge:
              </p>
              <p className="text-lg">
                What if we designed learning from first principles—not assuming all learners process information the same way?
              </p>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
};
