import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";

interface PresentationSession {
  id: string;
  current_slide_id: string;
  session_code: string;
  is_active: boolean;
}

export const useRealtimeSession = (sessionCode?: string) => {
  const [currentSlideId, setCurrentSlideId] = useState<string | null>(null);
  const [session, setSession] = useState<PresentationSession | null>(null);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!sessionCode) return;

    const fetchSession = async () => {
      const { data, error } = await supabase
        .from("presentation_sessions")
        .select("*")
        .eq("session_code", sessionCode)
        .eq("is_active", true)
        .maybeSingle();

      if (data && !error) {
        setSession(data);
        setCurrentSlideId(data.current_slide_id);
      }
    };

    fetchSession();

    const newChannel = supabase
      .channel(`session:${sessionCode}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "presentation_sessions",
          filter: `session_code=eq.${sessionCode}`,
        },
        (payload) => {
          const updatedSession = payload.new as PresentationSession;
          setSession(updatedSession);
          setCurrentSlideId(updatedSession.current_slide_id);
        }
      )
      .subscribe();

    setChannel(newChannel);

    return () => {
      supabase.removeChannel(newChannel);
    };
  }, [sessionCode]);

  const updateSlide = async (slideId: string) => {
    if (!session) return;

    await supabase
      .from("presentation_sessions")
      .update({ current_slide_id: slideId })
      .eq("id", session.id);
  };

  return { currentSlideId, session, updateSlide };
};
