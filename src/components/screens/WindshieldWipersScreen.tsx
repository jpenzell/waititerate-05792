import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import zooxVehicle from "@/assets/zoox-vehicle.jpg";
import { PollWidget } from "@/components/PollWidget";
import { QRCodeSVG } from "qrcode.react";

interface WindshieldWipersScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
  userId?: string;
  sessionCode?: string;
}

export const WindshieldWipersScreen = ({ isFacilitator = false, sessionId, userId, sessionCode }: WindshieldWipersScreenProps) => {
  const [showExplanation, setShowExplanation] = useState(false);
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
                  slideId="LD0.05"
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
          
          <div className="text-center mt-8">
            <Button 
              onClick={() => setShowExplanation(true)}
              size="lg"
              className="px-12"
              aria-label="Reveal the answer to the windshield wipers question"
            >
              Reveal the Answer
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="h-screen flex items-center justify-center p-8 animate-fade-in overflow-y-auto" role="main" aria-label="Windshield wipers answer reveal">
      <section className="max-w-5xl w-full py-8">
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20" role="article">
          <div className="space-y-6">
          <figure className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden mb-6">
            <img 
              src={zooxVehicle} 
              alt="Zoox autonomous self-driving vehicle with teal colored body, no visible windshield, bidirectional design where passengers face each other instead of forward"
              className="w-full h-auto"
            />
            <figcaption className="sr-only">Zoox vehicle demonstrating first-principles design without windshields</figcaption>
          </figure>
          
          <div className="space-y-4">
            <div className="bg-primary/10 p-6 rounded-xl border-2 border-primary/30 mb-6">
              <p className="text-2xl font-bold text-primary mb-3 text-center">
                The Answer: It depends on your assumptions
              </p>
              <p className="text-xl text-center text-foreground">
                If there's no driver... do you even need a windshield?
              </p>
            </div>

            <p className="text-xl text-foreground">
              <span className="font-bold text-primary">This is a Zoox vehicle</span> - running autonomously today in Las Vegas. 
              When Zoox built this, they started with <span className="font-bold">first principles thinking</span>:
            </p>
            
            <div className="bg-accent/20 p-5 rounded-xl border-2 border-accent">
              <p className="text-xl font-bold text-foreground mb-3">They asked: "Why are we building vehicles for drivers?"</p>
              <ul className="space-y-2 text-lg text-foreground/90">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold text-xl">→</span>
                  <span>No windshield needed—passengers face each other</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold text-xl">→</span>
                  <span>No front or back (lights just change direction)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold text-xl">→</span>
                  <span>Built for ridesharing, not ownership</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold text-xl">→</span>
                  <span>Can even "crabwalk" sideways</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-6 rounded-xl border-2 border-purple-500/40">
              <p className="text-xl font-bold text-foreground mb-3">
                🧠 This is neurodivergent thinking in action
              </p>
              <p className="text-lg text-foreground/90">
                Questioning assumptions that seem "obvious" to everyone else. 
                Seeing patterns others miss. Reimagining from scratch instead of iterating on what exists.
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 rounded-xl border-2 border-primary/40">
              <p className="text-2xl font-bold text-foreground mb-3 text-center">
                The Challenge for L&D Today:
              </p>
              <p className="text-xl text-center">
                What if we designed learning experiences from <span className="font-bold text-primary">first principles</span>?
              </p>
              <p className="text-lg text-muted-foreground text-center mt-2 italic">
                Not just "add AI to our existing courses." But ask: <span className="font-semibold text-foreground">"What if we didn't assume learners all process information the same way?"</span>
              </p>
            </div>
          </div>
          </div>
        </Card>
      </section>
    </main>
  );
};
