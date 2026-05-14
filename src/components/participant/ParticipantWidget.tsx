import { Card } from "@/components/ui/card";
import { PollWidget } from "@/components/PollWidget";
import { screens } from "@/config/screens";

import { InnerVoiceScreen } from "@/components/screens/InnerVoiceScreen";
import { RedesignWorkshopScreen } from "@/components/screens/RedesignWorkshopScreen";
import { AIStudentScreen } from "@/components/screens/AIStudentScreen";

interface Props {
  slideId: string;
  sessionId: string;
  userId: string;
  sessionCode: string;
}

/**
 * Per-slide participant inputs ONLY. Slides themselves are never rendered
 * full-screen on a participant device. Each entry returns just the input
 * widget; layout/headers/decoration come from StandbyView.
 *
 * IDs match the rebuilt 7-act outline (see config/screens.ts).
 */
const widgets: Record<string, (p: Props) => JSX.Element> = {
  // ─── Act 1
  "LD1.1": ({ sessionId, userId }) => (
    <PollSection slideId="LD1.1" sessionId={sessionId} userId={userId} />
  ),

  // ─── Act 3 — Feel It
  "LD3.5": ({ sessionId }) => (
    <InnerVoiceScreen isFacilitator={false} sessionId={sessionId} />
  ),

  // ─── Act 5 — Curb-cut quiz
  "LD5.2": ({ sessionId, userId }) => (
    <PollSection slideId="LD5.2" sessionId={sessionId} userId={userId} />
  ),
  "LD5.3": ({ sessionId, userId }) => (
    <PollSection slideId="LD5.3" sessionId={sessionId} userId={userId} />
  ),

  // ─── Act 6 — Workshop
  "LD6.1": () => <RedesignWorkshopScreen />,
  "LD6.4": ({ sessionId, userId }) => (
    <AIStudentScreen isFacilitator={false} sessionId={sessionId} userId={userId} />
  ),
  "LD6.5": ({ sessionId, userId }) => (
    <AIStudentScreen isFacilitator={false} sessionId={sessionId} userId={userId} />
  ),
  "LD6.6": ({ sessionId, userId }) => (
    <AIStudentScreen isFacilitator={false} sessionId={sessionId} userId={userId} />
  ),
};

const PollSection = ({
  slideId,
  sessionId,
  userId,
}: {
  slideId: string;
  sessionId: string;
  userId: string;
}) => {
  const slide = screens.find((s) => s.id === slideId);
  return (
    <section className="px-4 py-6 space-y-4">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-wider text-primary font-mono">Your turn</p>
        {slide?.pollQuestion && (
          <h2 className="text-xl font-semibold leading-snug">{slide.pollQuestion}</h2>
        )}
      </div>
      <Card className="p-4 border-l-4 border-l-primary">
        <PollWidget
          sessionId={sessionId}
          slideId={slideId}
          userId={userId}
          isPresenter={false}
        />
      </Card>
    </section>
  );
};

export const ParticipantWidget = (props: Props) => {
  const Widget = widgets[props.slideId];
  if (!Widget) return null;
  return (
    <div className="flex-1 overflow-y-auto">
      <Widget {...props} />
    </div>
  );
};

ParticipantWidget.supports = (slideId: string) => slideId in widgets;
