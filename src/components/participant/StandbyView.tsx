import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Smartphone } from "lucide-react";
import { useRealtimeSession } from "@/hooks/useRealtimeSession";
import { INTERACTIVE_SLIDE_IDS, screens } from "@/config/screens";
import { ParticipantWidget } from "./ParticipantWidget";

interface StandbyViewProps {
  sessionCode: string;
  sessionId: string;
  userId: string;
  displayName?: string | null;
  onLeave: () => void;
}

export const StandbyView = ({
  sessionCode,
  sessionId,
  userId,
  displayName,
  onLeave,
}: StandbyViewProps) => {
  const { currentSlideId } = useRealtimeSession(sessionCode);
  const [activeSlideId, setActiveSlideId] = useState<string | null>(null);

  useEffect(() => {
    if (currentSlideId) setActiveSlideId(currentSlideId);
  }, [currentSlideId]);

  const slide = activeSlideId
    ? screens.find((s) => s.id === activeSlideId)
    : null;
  const isInteractive = !!slide && INTERACTIVE_SLIDE_IDS.has(slide.id);
  const hasParticipantUI = isInteractive && slide && hasWidget(slide.id);

  return (
    <main
      className="min-h-[100dvh] bg-background text-foreground flex flex-col"
      role="main"
      aria-label="Participant view"
    >
      {/* Top status bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border/40">
        <div className="text-xs text-muted-foreground">
          <span className="uppercase tracking-wider">Code </span>
          <span className="font-mono font-bold text-foreground ml-1">{sessionCode}</span>
        </div>
        {displayName && (
          <div className="text-xs text-muted-foreground truncate max-w-[40%]">
            {displayName}
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onLeave}
          aria-label="Leave session"
          className="text-muted-foreground"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </header>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {hasParticipantUI && slide ? (
          <ParticipantWidget
            slideId={slide.id}
            sessionId={sessionId}
            userId={userId}
            sessionCode={sessionCode}
          />
        ) : (
          <StandbyIdle slideTitle={slide?.title} />
        )}
      </div>
    </main>
  );
};

const StandbyIdle = ({ slideTitle }: { slideTitle?: string }) => (
  <section
    className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-6"
    aria-live="polite"
  >
    <div className="relative">
      <Smartphone className="h-14 w-14 text-muted-foreground" aria-hidden />
      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary animate-pulse" aria-hidden />
    </div>
    <h1 className="text-2xl font-semibold">Eyes on the shared screen</h1>
    <p className="text-base text-muted-foreground max-w-sm">
      Your phone will light up here when it's time to respond.
    </p>
    {slideTitle && (
      <p className="text-xs text-muted-foreground/70 italic mt-4">
        Now showing: {slideTitle}
      </p>
    )}
  </section>
);

// Local helper — kept in sync with the registry below.
const hasWidget = (slideId: string) =>
  ParticipantWidget.supports(slideId);