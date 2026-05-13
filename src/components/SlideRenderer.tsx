import { ScreenDef, INTERACTIVE_SLIDE_IDS } from "@/config/screens";
import { PollWidget } from "@/components/PollWidget";

interface Props {
  screen: ScreenDef;
  isFacilitator: boolean;
  sessionId?: string;
  userId?: string;
  showPollWidget?: boolean; // participants render PollWidget; facilitator screen embeds polls in content
}

/**
 * Renders the current slide identically for facilitator and participants.
 * The only difference is the `isFacilitator` flag passed into interactive
 * slides — controls who can submit/start vs. view results.
 */
export const SlideRenderer = ({ screen, isFacilitator, sessionId, userId, showPollWidget }: Props) => {
  const Component: any = screen.component;
  const extraProps = screen.props || {};
  const isInteractive = INTERACTIVE_SLIDE_IDS.has(screen.id);

  // Curb-cut intro takes a sessionId
  const passSessionOnly = screen.id === "LD5.0";

  let body: JSX.Element;
  if (isInteractive) {
    body = (
      <Component
        isFacilitator={isFacilitator}
        sessionId={sessionId}
        userId={userId}
        slideId={screen.id}
        {...extraProps}
      />
    );
  } else if (passSessionOnly) {
    body = <Component sessionId={sessionId} {...extraProps} />;
  } else {
    body = <Component {...extraProps} />;
  }

  // Standalone poll slides (no embedded poll component) get a PollWidget
  const needsExternalPoll =
    showPollWidget &&
    !!screen.hasPoll &&
    !!sessionId &&
    !!userId &&
    !INTERACTIVE_SLIDE_IDS.has(screen.id) &&
    screen.id !== "LD5.0";

  if (needsExternalPoll) {
    return (
      <div className="space-y-6">
        {body}
        <div className="max-w-2xl mx-auto">
          <PollWidget
            sessionId={sessionId!}
            slideId={screen.id}
            userId={userId!}
            isPresenter={isFacilitator}
          />
        </div>
      </div>
    );
  }

  return body;
};
