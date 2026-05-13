import { supabase } from "@/integrations/supabase/client";

interface SlideWithPoll {
  id: string;
  pollQuestion?: string;
  pollOptions?: string[];
  hasPoll?: boolean;
}

export const seedPollsForSession = async (sessionId: string, slides: SlideWithPoll[]) => {
  const pollsToUpsert = slides
    .filter((slide) => slide.pollQuestion && slide.pollOptions && slide.pollOptions.length > 0)
    .map((slide) => ({
      session_id: sessionId,
      slide_id: slide.id,
      question: slide.pollQuestion!,
      options: slide.pollOptions!,
      is_active: true,
    }));

  if (pollsToUpsert.length > 0) {
    // First, try to update existing polls
    for (const poll of pollsToUpsert) {
      const { data: existing } = await supabase
        .from("polls")
        .select("id")
        .eq("session_id", sessionId)
        .eq("slide_id", poll.slide_id)
        .single();

      if (existing) {
        // Update existing poll
        await supabase
          .from("polls")
          .update({
            question: poll.question,
            options: poll.options,
            is_active: true,
          })
          .eq("id", existing.id);
      } else {
        // Insert new poll
        await supabase
          .from("polls")
          .insert(poll);
      }
    }
  }
};
