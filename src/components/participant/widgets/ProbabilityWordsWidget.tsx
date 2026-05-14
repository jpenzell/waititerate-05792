import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const PROBABILITY_WORDS = [
  "Slam dunk",
  "Always",
  "Serious possibility",
  "Rarely",
  "Never",
];

interface Props {
  sessionId: string;
  userId: string;
}

export const ProbabilityWordsWidget = ({ sessionId, userId }: Props) => {
  const [values, setValues] = useState<Record<string, number>>(
    () => Object.fromEntries(PROBABILITY_WORDS.map((w) => [w, 50]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("probability_word_responses")
        .select("word, percentage")
        .eq("session_id", sessionId)
        .eq("user_id", userId);
      if (data && data.length) {
        setValues((prev) => {
          const v = { ...prev };
          data.forEach((r: any) => { v[r.word] = r.percentage; });
          return v;
        });
        if (data.length === PROBABILITY_WORDS.length) setSubmitted(true);
      }
    })();
  }, [sessionId, userId]);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const rows = PROBABILITY_WORDS.map((word) => ({
        session_id: sessionId,
        user_id: userId,
        word,
        percentage: values[word],
      }));
      const { error } = await supabase
        .from("probability_word_responses")
        .upsert(rows, { onConflict: "session_id,user_id,word" });
      if (error) throw error;
      setSubmitted(true);
      toast.success("Submitted!");
    } catch (e) {
      console.error(e);
      toast.error("Couldn't submit. Try again.");
    } finally {
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <Card className="p-8 text-center space-y-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold">Submitted</h2>
        <p className="text-muted-foreground">
          Watch the shared screen — the facilitator will reveal the results.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Edit my answers
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">What % does each word mean to you?</h2>
        <p className="text-sm text-muted-foreground">
          Drag each slider. There are no wrong answers.
        </p>
      </div>

      <div className="space-y-5">
        {PROBABILITY_WORDS.map((word) => (
          <Card key={word} className="p-4 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-semibold">{word}</span>
              <span className="text-3xl font-bold text-primary tabular-nums">
                {values[word]}%
              </span>
            </div>
            <Slider
              value={[values[word]]}
              min={0}
              max={100}
              step={1}
              onValueChange={([v]) => setValues((prev) => ({ ...prev, [word]: v }))}
              aria-label={`Percentage for ${word}`}
            />
          </Card>
        ))}
      </div>

      <Button onClick={handleSubmit} disabled={saving} size="lg" className="w-full">
        {saving ? "Submitting…" : "Submit my answers"}
      </Button>
    </div>
  );
};
