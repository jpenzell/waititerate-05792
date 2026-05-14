import { useEffect } from "react";
import { RevealProvider, tryRevealNext, tryRevealPrev } from "@/contexts/RevealContext";
import { TimePerceptionScreen } from "@/components/screens/TimePerceptionScreen";

/**
 * Standalone, shareable version of LD3.6 — anyone with the link can take
 * the "How long is 10 seconds?" exercise themselves. No facilitator, no
 * session. Arrow keys advance the reveal (research framing).
 */
const TimePerception = () => {
  useEffect(() => {
    document.title = "How Long Is 10 Seconds? — AI for All Minds";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Take the time perception exercise from AI for All Minds. Close your eyes, count 10 seconds in your head, and see how close you got.",
    );

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") {
        if (tryRevealNext()) e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        if (tryRevealPrev()) e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main>
      <RevealProvider slideId="LD3.6-public">
        <TimePerceptionScreen />
      </RevealProvider>
    </main>
  );
};

export default TimePerception;
