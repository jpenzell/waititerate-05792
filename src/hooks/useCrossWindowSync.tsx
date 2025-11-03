import { useEffect, useState } from "react";

interface WindowSyncState {
  currentSlideId: string;
  presentationMode: boolean;
  sessionId: string | null;
  sessionCode: string | null;
}

export const useCrossWindowSync = (initialState: WindowSyncState) => {
  const [state, setState] = useState<WindowSyncState>(initialState);
  const [channel] = useState(() => new BroadcastChannel("facilitator-sync"));

  useEffect(() => {
    // Listen for messages from other windows
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "STATE_UPDATE") {
        setState(event.data.state);
      }
    };

    channel.addEventListener("message", handleMessage);

    return () => {
      channel.removeEventListener("message", handleMessage);
      channel.close();
    };
  }, [channel]);

  const updateState = (newState: Partial<WindowSyncState>) => {
    const updatedState = { ...state, ...newState };
    setState(updatedState);
    
    // Broadcast to other windows
    channel.postMessage({
      type: "STATE_UPDATE",
      state: updatedState,
    });

    // Also save to localStorage for persistence
    localStorage.setItem("facilitator-state", JSON.stringify(updatedState));
  };

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("facilitator-state");
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setState(parsed);
      } catch (e) {
        console.error("Failed to parse saved state:", e);
      }
    }
  }, []);

  return { state, updateState };
};
