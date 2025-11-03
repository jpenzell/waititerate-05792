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
      <div className="h-screen flex flex-col p-8 animate-fade-in">
        <div className="max-w-6xl w-full mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-12 text-center">
            Does a self-driving vehicle need windshield wipers?
          </h1>
          
          {isFacilitator && sessionId && userId ? (
            <div className="grid md:grid-cols-2 gap-6 items-start">
              {/* Left: Poll Visualization */}
              <div>
                <PollWidget
                  sessionId={sessionId}
                  slideId="LD0.1"
                  userId={userId}
                  isPresenter={true}
                />
                <Button 
                  onClick={() => setShowExplanation(true)}
                  size="lg"
                  className="mt-6 w-full"
                >
                  Show Answer & Explanation
                </Button>
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
                Vote on your screen
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center p-8 animate-fade-in overflow-y-auto">
      <div className="max-w-5xl w-full py-8">
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
          <div className="space-y-6">
          <div className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden mb-6">
            <img 
              src={zooxVehicle} 
              alt="Zoox autonomous vehicle - a teal colored bidirectional self-driving car"
              className="w-full h-auto"
            />
          </div>
          
          <div className="space-y-4">
            <p className="text-xl text-foreground">
              <span className="font-bold text-primary">Yes!</span> This is a <span className="font-bold text-primary">Zoox vehicle</span> - running autonomously today in Las Vegas. 
              When Zoox built this, they started with <span className="font-bold">first principles</span>:
            </p>
            
            <div className="bg-accent/20 p-5 rounded-xl border-2 border-accent">
              <p className="text-xl font-bold text-foreground mb-3">They asked: "Why are we building vehicles for drivers?"</p>
              <ul className="space-y-2 text-lg text-foreground/90">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold text-xl">→</span>
                  <span>No front or back needed (lights just change direction)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold text-xl">→</span>
                  <span>Passengers face each other instead of forward</span>
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

            <div className="bg-primary/10 p-5 rounded-xl border border-primary/30">
              <p className="text-xl font-bold text-primary mb-3">
                They didn't just put AI into an existing car—they reimagined everything
              </p>
              <p className="text-lg text-foreground/80">
                New problems emerged: <span className="italic">Who does a pedestrian look at when crossing?</span> 
                (They experimented with directional sound.)
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 rounded-xl border-2 border-primary/40">
              <p className="text-2xl font-bold text-foreground mb-3 text-center">
                The Challenge for L&D Today:
              </p>
              <p className="text-xl text-center">
                How can we <span className="font-bold text-primary">reimagine</span> the value we bring to learners?
              </p>
              <p className="text-lg text-muted-foreground text-center mt-2 italic">
                Not just take AI and put it into existing work. Not just to make things quicker. 
                But to <span className="font-semibold text-foreground">fundamentally rethink</span> how we design learning.
              </p>
            </div>
          </div>
        </div>
        </Card>
      </div>
    </div>
  );
};
