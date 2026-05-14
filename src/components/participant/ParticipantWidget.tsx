import { Card } from "@/components/ui/card";
import { PollWidget } from "@/components/PollWidget";
import { screens } from "@/config/screens";

import { NeurodiversityDataQuizScreen } from "@/components/screens/NeurodiversityDataQuizScreen";
import { PhotoCollectionScreen } from "@/components/screens/PhotoCollectionScreen";
import { NumericEstimateScreen } from "@/components/screens/NumericEstimateScreen";
import { MentalImageryScreen } from "@/components/screens/MentalImageryScreen";
import { InnerVoiceScreen } from "@/components/screens/InnerVoiceScreen";
import { TimePerceptionScreen } from "@/components/screens/TimePerceptionScreen";
import { SensoryProcessingScreen } from "@/components/screens/SensoryProcessingScreen";
import { CognitiveReflectionScreen } from "@/components/screens/CognitiveReflectionScreen";
import { DiscoveryWallScreen } from "@/components/screens/DiscoveryWallScreen";
import { RedesignWorkshopScreen } from "@/components/screens/RedesignWorkshopScreen";
import { AIStudentScreen } from "@/components/screens/AIStudentScreen";
import { ProbabilityWordsWidget } from "@/components/participant/widgets/ProbabilityWordsWidget";

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
 * If a slide is in INTERACTIVE_SLIDE_IDS but not registered here, the
 * participant sees the standby ("eyes on the shared screen") view.
 */
const widgets: Record<
  string,
  (p: Props) => JSX.Element
> = {
  // 1.x
  "LD1.1": ({ sessionId, userId }) => (
    <PollSection slideId="LD1.1" sessionId={sessionId} userId={userId} />
  ),

  // 2.x
  "LD2.0": ({ sessionId, userId }) => (
    <PollSection slideId="LD2.0" sessionId={sessionId} userId={userId} />
  ),
  "LD2.1": ({ sessionId }) => (
    <NeurodiversityDataQuizScreen isFacilitator={false} sessionId={sessionId} />
  ),
  "LD2.2": ({ sessionId, userId }) => (
    <ProbabilityWordsWidget sessionId={sessionId} userId={userId} />
  ),

  // 3.x — only collection + estimate ask the audience for input
  "LD3.0": ({ sessionId }) => (
    <PhotoCollectionScreen isFacilitator={false} sessionId={sessionId} />
  ),
  "LD3.4": ({ sessionId }) => (
    <NumericEstimateScreen isFacilitator={false} sessionId={sessionId} />
  ),

  // 4.x — discoveries
  "LD4.0": ({ sessionId }) => (
    <MentalImageryScreen isFacilitator={false} sessionId={sessionId} />
  ),
  "LD4.1": ({ sessionId }) => (
    <InnerVoiceScreen isFacilitator={false} sessionId={sessionId} />
  ),
  "LD4.2": ({ sessionId }) => (
    <TimePerceptionScreen isFacilitator={false} sessionId={sessionId} />
  ),
  "LD4.3": ({ sessionId }) => (
    <SensoryProcessingScreen isFacilitator={false} sessionId={sessionId} />
  ),
  "LD4.4": ({ sessionId }) => (
    <CognitiveReflectionScreen isFacilitator={false} sessionId={sessionId} />
  ),
  "LD4.6": ({ sessionId }) => <DiscoveryWallScreen sessionId={sessionId} />,

  // 5.x — curb-cut quiz
  "LD5.1": ({ sessionId, userId }) => (
    <PollSection slideId="LD5.1" sessionId={sessionId} userId={userId} />
  ),
  "LD5.2": ({ sessionId, userId }) => (
    <PollSection slideId="LD5.2" sessionId={sessionId} userId={userId} />
  ),
  "LD5.3": ({ sessionId, userId }) => (
    <PollSection slideId="LD5.3" sessionId={sessionId} userId={userId} />
  ),

  // 6.x
  "LD6.1": ({ sessionId, userId }) => (
    <PollSection slideId="LD6.1" sessionId={sessionId} userId={userId} />
  ),

  // 7.x — workshop interactions
  "LD7.0": () => <RedesignWorkshopScreen />,
  "LD7.3": ({ sessionId, userId }) => (
    <AIStudentScreen isFacilitator={false} sessionId={sessionId} userId={userId} />
  ),

  // Display-only interactive slides (LD3.1, LD3.2, LD3.3, LD3.5, LD3.6, LD8.2)
  // are intentionally NOT registered — participants see the standby view.
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