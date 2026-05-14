import { Card } from "@/components/ui/card";
import { PollWidget } from "@/components/PollWidget";
import { QRCodeSVG } from "qrcode.react";

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
  const joinUrl = sessionCode
    ? `${window.location.origin}/participate?code=${sessionCode}`
    : "";

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

        {isFacilitator && sessionId && userId ? (
          <div className="grid md:grid-cols-[3fr_2fr] gap-8 items-center">
            <PollWidget
              sessionId={sessionId}
              slideId="LD1.1"
              userId={userId}
              isPresenter={true}
            />

            {sessionCode && (
              <Card className="p-6 bg-card/60 backdrop-blur flex flex-col items-center gap-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Join to vote
                </p>
                <p className="text-3xl font-mono font-bold text-primary">
                  {sessionCode}
                </p>
                {joinUrl && (
                  <div className="bg-white p-3 rounded-lg">
                    <QRCodeSVG value={joinUrl} size={150} />
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  ai4all.joshpenzell.com/participate
                </p>
              </Card>
            )}
          </div>
        ) : (
          <p className="text-xl text-muted-foreground text-center">
            Answer on your device
          </p>
        )}
      </section>
    </main>
  );
};
