import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { BarChart3, CheckCircle2 } from "lucide-react";
import { RealtimeChannel } from "@supabase/supabase-js";

interface Poll {
  id: string;
  question: string;
  options: string[];
  is_active: boolean;
}

interface PollResponse {
  answer: string;
  user_id: string;
}

interface PollWidgetProps {
  sessionId: string;
  slideId: string;
  userId: string;
  isPresenter: boolean;
}

export const PollWidget = ({ sessionId, slideId, userId, isPresenter }: PollWidgetProps) => {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [responses, setResponses] = useState<PollResponse[]>([]);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    fetchPoll();
    
    const newChannel = supabase
      .channel(`poll:${slideId}:${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "poll_responses",
        },
        (payload) => {
          console.log('Poll response change detected:', payload);
          fetchResponses();
        }
      )
      .subscribe();

    setChannel(newChannel);

    return () => {
      if (newChannel) {
        supabase.removeChannel(newChannel);
      }
    };
  }, [sessionId, slideId]);

  const fetchPoll = async () => {
    console.log('Fetching poll for session:', sessionId, 'slide:', slideId);
    const { data, error } = await supabase
      .from("polls")
      .select("*")
      .eq("session_id", sessionId)
      .eq("slide_id", slideId)
      .eq("is_active", true)
      .single();

    console.log('Poll fetch result:', data, error);
    
    if (data) {
      const pollData = {
        ...data,
        options: data.options as string[],
      };
      setPoll(pollData);
      await fetchResponses(data.id);
      checkUserResponse(data.id);
    }
  };

  const fetchResponses = async (pollId?: string) => {
    const targetPollId = pollId || poll?.id;
    if (!targetPollId) return;
    
    console.log('Fetching responses for poll:', targetPollId);
    const { data } = await supabase
      .from("poll_responses")
      .select("*")
      .eq("poll_id", targetPollId);

    console.log('Poll responses:', data);
    if (data) {
      setResponses(data);
    }
  };

  const checkUserResponse = async (pollId: string) => {
    const { data } = await supabase
      .from("poll_responses")
      .select("answer")
      .eq("poll_id", pollId)
      .eq("user_id", userId)
      .single();

    if (data) {
      setUserAnswer(data.answer);
    }
  };

  const submitAnswer = async (answer: string) => {
    if (!poll || userAnswer) return;

    const { error } = await supabase
      .from("poll_responses")
      .insert({
        poll_id: poll.id,
        user_id: userId,
        answer,
      });

    if (error) {
      toast.error("Failed to submit answer");
      return;
    }

    setUserAnswer(answer);
    toast.success("Answer submitted!");
  };

  const getResponseCount = (option: string) => {
    return responses.filter((r) => r.answer === option).length;
  };

  const getResponsePercentage = (option: string) => {
    if (responses.length === 0) return 0;
    return (getResponseCount(option) / responses.length) * 100;
  };

  if (!poll) return null;

  return (
    <Card className="p-6 bg-background/80 backdrop-blur-xl border-primary/20 animate-slide-in">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-display font-bold">Poll</h3>
      </div>

      <p className="text-foreground mb-6">{poll.question}</p>

      <div className="space-y-3">
        {poll.options.map((option) => {
          const count = getResponseCount(option);
          const percentage = getResponsePercentage(option);
          const isSelected = userAnswer === option;

          return (
            <div key={option} className="relative">
              {(isPresenter || userAnswer) && (
                <div
                  className="absolute inset-0 bg-primary/20 rounded-lg transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              )}
              
              <Button
                onClick={() => submitAnswer(option)}
                disabled={!!userAnswer || isPresenter}
                variant={isSelected ? "default" : "outline"}
                className={`w-full justify-between relative ${
                  isSelected ? "bg-gradient-primary" : ""
                }`}
              >
                <span className="flex items-center gap-2">
                  {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  {option}
                </span>
                {(isPresenter || userAnswer) && (
                  <span className="text-sm font-mono">
                    {count} ({percentage.toFixed(0)}%)
                  </span>
                )}
              </Button>
            </div>
          );
        })}
      </div>

      {isPresenter && (
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Total responses: {responses.length}
        </p>
      )}
    </Card>
  );
};
