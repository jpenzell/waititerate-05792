import { TrendingUp, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useReveal, useRegisterReveals } from "@/contexts/RevealContext";
import {
  ProbabilityWordsWidget,
  PROBABILITY_WORDS,
} from "@/components/participant/widgets/ProbabilityWordsWidget";

interface Props {
  isFacilitator?: boolean;
  sessionId?: string;
  userId?: string;
}

const STUDY_DATA: Record<
  string,
  { humanAvg: number; humanRange: string; chatgpt: number; gemini: number; highlight?: boolean }
> = {
  "Slam dunk":           { humanAvg: 90, humanRange: "50-100", chatgpt: 85,  gemini: 85 },
  "Always":              { humanAvg: 91, humanRange: "50-100", chatgpt: 100, gemini: 100 },
  "Serious possibility": { humanAvg: 58, humanRange: "30-80",  chatgpt: 70,  gemini: 50, highlight: true },
  "Rarely":              { humanAvg: 16, humanRange: "5-50",   chatgpt: 15,  gemini: 5,  highlight: true },
  "Never":               { humanAvg: 9,  humanRange: "0-50",   chatgpt: 0,   gemini: 0 },
};

export const AnnieDukeStudyScreen = ({ isFacilitator = false, sessionId, userId }: Props) => {
  // Participant view (phone) → just the slider widget
  if (!isFacilitator && sessionId && userId) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <ProbabilityWordsWidget sessionId={sessionId} userId={userId} />
      </div>
    );
  }

  // No active session → render the study + AI table statically (no room columns,
  // no reveal gating). This is what the user sees during a screenshare-only run.
  if (!sessionId) {
    return (
      <div className="flex-1 flex flex-col animate-fade-in min-h-0 overflow-hidden p-6">
        <div className="text-center mb-3">
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-foreground">
              Same Words, Different Meanings
            </h1>
          </div>
          <p className="text-base text-muted-foreground font-light">
            Sherman Kent / Annie Duke study — humans vs AI on the same probability words
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 min-h-0 overflow-hidden">
          <div className="max-w-5xl mx-auto w-full space-y-3 flex flex-col min-h-0">
            <div className="bg-primary/15 border-2 border-primary rounded-2xl px-5 py-3 shadow-lg max-w-3xl mx-auto">
              <p className="text-base text-foreground font-medium text-center">
                <strong className="text-primary">Even AI models disagree.</strong>{" "}
                "Serious possibility": ChatGPT says <span className="font-bold">70%</span>, Gemini says <span className="font-bold">50%</span>.
              </p>
            </div>

            <div className="bg-card/80 border-2 border-border rounded-2xl overflow-hidden shadow-lg">
              <Table>
                <TableHeader className="bg-primary/20">
                  <TableRow>
                    <TableHead className="text-foreground font-bold text-base py-2">Word</TableHead>
                    <TableHead className="text-center text-foreground font-bold text-base py-2">Human Avg</TableHead>
                    <TableHead className="text-center text-foreground font-bold text-base py-2">Human Range</TableHead>
                    <TableHead className="text-center text-foreground font-bold text-base py-2">ChatGPT</TableHead>
                    <TableHead className="text-center text-foreground font-bold text-base py-2">Gemini</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PROBABILITY_WORDS.map((word) => {
                    const study = STUDY_DATA[word];
                    return (
                      <TableRow key={word} className={study.highlight ? "bg-primary/20" : ""}>
                        <TableCell className="font-semibold text-foreground text-base py-2">{word}</TableCell>
                        <TableCell className="text-center text-foreground text-base py-2 tabular-nums">{study.humanAvg}%</TableCell>
                        <TableCell className="text-center text-foreground text-base py-2 tabular-nums">{study.humanRange}</TableCell>
                        <TableCell className={`text-center text-base py-2 tabular-nums ${study.highlight ? "font-bold text-lg text-primary" : "text-foreground"}`}>{study.chatgpt}%</TableCell>
                        <TableCell className={`text-center text-base py-2 tabular-nums ${study.highlight ? "font-bold text-lg text-primary" : "text-foreground"}`}>{study.gemini}%</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <p className="text-xs text-center text-muted-foreground tracking-widest uppercase pt-2">
              Sherman Kent (CIA, 1964) · Mauboussin / Annie Duke replication
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Facilitator view: 4 reveal steps after the initial "live participant averages" view
  // step 0: only participant averages
  // step 1: + human study averages & range
  // step 2: + ChatGPT / Gemini columns
  // step 3: highlight insight rows
  useRegisterReveals(3);
  const { step } = useReveal();

  const [responses, setResponses] = useState<Array<{ word: string; percentage: number; user_id: string }>>([]);

  useEffect(() => {
    if (!sessionId) return;
    const load = async () => {
      const { data } = await supabase
        .from("probability_word_responses")
        .select("word, percentage, user_id")
        .eq("session_id", sessionId);
      if (data) setResponses(data as any);
    };
    load();
    const channel = supabase
      .channel(`probability-words:${sessionId}`)
      .on("postgres_changes", {
        event: "*", schema: "public",
        table: "probability_word_responses",
        filter: `session_id=eq.${sessionId}`,
      }, load)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [sessionId]);

  const participantAverages: Record<string, { avg: number | null; n: number; min: number; max: number }> = {};
  PROBABILITY_WORDS.forEach((w) => {
    const vals = responses.filter((r) => r.word === w).map((r) => r.percentage);
    if (vals.length === 0) {
      participantAverages[w] = { avg: null, n: 0, min: 0, max: 0 };
    } else {
      const sum = vals.reduce((a, b) => a + b, 0);
      participantAverages[w] = {
        avg: Math.round(sum / vals.length),
        n: vals.length,
        min: Math.min(...vals),
        max: Math.max(...vals),
      };
    }
  });

  const totalParticipants = new Set(responses.map((r) => r.user_id)).size;

  return (
    <div className="flex-1 flex flex-col animate-fade-in min-h-0 overflow-hidden p-6">
      <div className="text-center mb-3">
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-foreground">
            Same Words, Different Meanings
          </h1>
        </div>
        <p className="text-base text-muted-foreground font-light">
          {step === 0 && (
            <span className="inline-flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Live answers from this room — {totalParticipants} {totalParticipants === 1 ? "person" : "people"} so far
            </span>
          )}
          {step === 1 && "Now compare to the Sherman Kent / Annie Duke study"}
          {step === 2 && "And here's how AI models interpret the same words"}
          {step === 3 && "Even AI models disagree with each other"}
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 min-h-0 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full space-y-3 flex flex-col min-h-0">
          <div className="flex items-center justify-center min-h-[72px]">
            {step === 0 && totalParticipants === 0 && (
              <div className="bg-muted/40 border-2 border-border rounded-2xl px-5 py-3 max-w-3xl">
                <p className="text-base text-muted-foreground text-center">
                  Waiting for folks to submit their sliders on their phones…
                </p>
              </div>
            )}
            {step === 0 && totalParticipants > 0 && (
              <div className="bg-primary/15 border-2 border-primary rounded-2xl px-5 py-3 animate-fade-in shadow-lg max-w-3xl">
                <p className="text-base text-foreground font-medium text-center">
                  <strong className="text-primary">Notice the spread.</strong>{" "}
                  Same words, very different numbers in the same room.
                </p>
              </div>
            )}
            {step === 1 && (
              <div className="bg-primary/15 border-2 border-primary rounded-2xl px-5 py-3 animate-fade-in shadow-lg max-w-3xl">
                <p className="text-base text-foreground font-medium text-center">
                  <strong className="text-primary">Humans vary wildly.</strong>{" "}
                  Sherman Kent (CIA, 1964) found "serious possibility" ranged from 30% to 80%.
                </p>
              </div>
            )}
            {step === 2 && (
              <div className="bg-accent/15 border-2 border-accent rounded-2xl px-5 py-3 animate-fade-in shadow-lg max-w-3xl">
                <p className="text-base text-foreground font-medium text-center">
                  <strong className="text-accent-foreground">AI is more precise.</strong>{" "}
                  Humans average 91% for "always," but AI says <span className="font-bold">100%</span>.
                </p>
              </div>
            )}
            {step === 3 && (
              <div className="bg-primary/15 border-2 border-primary rounded-2xl px-5 py-3 animate-fade-in shadow-lg max-w-3xl">
                <p className="text-base text-foreground font-medium text-center">
                  <strong className="text-primary">Even AI models disagree.</strong>{" "}
                  "Serious possibility": ChatGPT says <span className="font-bold">70%</span>, Gemini says <span className="font-bold">50%</span>.
                </p>
              </div>
            )}
          </div>

          <div className="bg-card/80 border-2 border-border rounded-2xl overflow-hidden shadow-lg">
            <Table>
              <TableHeader className="bg-primary/20">
                <TableRow>
                  <TableHead className="text-foreground font-bold text-base py-2">Word</TableHead>
                  <TableHead className="text-center text-primary font-bold text-base py-2">This Room (avg)</TableHead>
                  <TableHead className="text-center text-primary font-bold text-base py-2">Room Range</TableHead>
                  <TableHead className={`text-center font-bold text-base py-2 ${step >= 1 ? "text-foreground" : "text-muted-foreground/30"}`}>Study Avg</TableHead>
                  <TableHead className={`text-center font-bold text-base py-2 ${step >= 1 ? "text-foreground" : "text-muted-foreground/30"}`}>Study Range</TableHead>
                  <TableHead className={`text-center font-bold text-base py-2 ${step >= 2 ? "text-foreground" : "text-muted-foreground/30"}`}>ChatGPT</TableHead>
                  <TableHead className={`text-center font-bold text-base py-2 ${step >= 2 ? "text-foreground" : "text-muted-foreground/30"}`}>Gemini</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PROBABILITY_WORDS.map((word) => {
                  const study = STUDY_DATA[word];
                  const room = participantAverages[word];
                  const highlightRow = step >= 3 && study.highlight;
                  return (
                    <TableRow key={word} className={highlightRow ? "bg-primary/20" : ""}>
                      <TableCell className="font-semibold text-foreground text-base py-2">{word}</TableCell>
                      <TableCell className="text-center text-primary font-bold text-lg py-2 tabular-nums">
                        {room.avg === null ? "—" : `${room.avg}%`}
                      </TableCell>
                      <TableCell className="text-center text-primary text-base py-2 tabular-nums">
                        {room.n === 0 ? "—" : `${room.min}–${room.max}`}
                      </TableCell>
                      <TableCell className={`text-center text-base py-2 ${step >= 1 ? "text-foreground" : "text-muted-foreground/30"}`}>{study.humanAvg}%</TableCell>
                      <TableCell className={`text-center text-base py-2 ${step >= 1 ? "text-foreground" : "text-muted-foreground/30"}`}>{study.humanRange}</TableCell>
                      <TableCell className={`text-center text-base py-2 ${step >= 2 ? (highlightRow ? "font-bold text-lg text-primary" : "text-foreground") : "text-muted-foreground/30"}`}>{study.chatgpt}%</TableCell>
                      <TableCell className={`text-center text-base py-2 ${step >= 2 ? (highlightRow ? "font-bold text-lg text-primary" : "text-foreground") : "text-muted-foreground/30"}`}>{study.gemini}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <p className="text-xs text-center text-muted-foreground tracking-widest uppercase pt-2">
            Sherman Kent (CIA, 1964) · Mauboussin / Annie Duke replication
          </p>

          <div className="flex justify-center gap-2 mt-2">
            {[0, 1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-2 h-2 rounded-full transition-all ${
                  s === step ? "bg-primary scale-125" : s < step ? "bg-primary/50" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
