import { TrendingUp } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const AnnieDukeStudyScreen = () => {
  const [stage, setStage] = useState(1);
  const maxStage = 3;

  const handleAdvance = useCallback((e: KeyboardEvent) => {
    if (e.key === " " || e.key === "ArrowRight") {
      if (stage < maxStage) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setStage((s) => s + 1);
      }
    } else if (e.key === "ArrowLeft") {
      if (stage > 1) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setStage((s) => s - 1);
      }
    }
  }, [stage]);

  useEffect(() => {
    window.addEventListener("keydown", handleAdvance, { capture: true });
    return () => window.removeEventListener("keydown", handleAdvance, { capture: true } as any);
  }, [handleAdvance]);

  const tableData = [
    { word: "Slam dunk", humanAvg: "90%", humanRange: "50-100", chatgpt: "85%", gemini: "85%" },
    { word: "Always", humanAvg: "91%", humanRange: "50-100", chatgpt: "100%", gemini: "100%" },
    { word: "Never", humanAvg: "9%", humanRange: "0-50", chatgpt: "0%", gemini: "0%" },
    { word: "Serious possibility", humanAvg: "58%", humanRange: "30-80", chatgpt: "70%", gemini: "50%", highlight: true },
    { word: "Rarely", humanAvg: "16%", humanRange: "5-50", chatgpt: "15%", gemini: "5%", highlight: true },
  ];

  return (
    <div className="flex-1 flex flex-col animate-fade-in min-h-0 overflow-hidden p-6">
      <div className="text-center mb-3">
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Same Words, Different Meanings
          </h1>
        </div>
        <p className="text-base text-muted-foreground font-light">
          {stage === 1 && "How do humans interpret probability words?"}
          {stage === 2 && "How do AI models compare to human averages?"}
          {stage === 3 && "Do AI models even agree with each other?"}
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 min-h-0 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full space-y-3 flex flex-col min-h-0">
          <div className="flex items-center justify-center min-h-[72px]">
            {stage === 1 && (
              <div className="bg-primary/15 border-2 border-primary rounded-2xl px-5 py-3 animate-fade-in shadow-lg max-w-3xl">
                <p className="text-base text-foreground font-medium text-center">
                  <strong className="text-primary">Humans vary wildly.</strong>{" "}
                  "Serious possibility" ranges from 30% to 80% — a <span className="text-primary font-bold">50-point spread</span> on the same words.
                </p>
              </div>
            )}
            {stage === 2 && (
              <div className="bg-accent/15 border-2 border-accent rounded-2xl px-5 py-3 animate-fade-in shadow-lg max-w-3xl">
                <p className="text-base text-foreground font-medium text-center">
                  <strong className="text-accent-foreground">AI is more precise.</strong>{" "}
                  Humans average 91% for "always," but AI says <span className="font-bold">100%</span>.
                </p>
              </div>
            )}
            {stage === 3 && (
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
                  <TableHead className="text-center text-foreground font-bold text-base py-2">Human Avg</TableHead>
                  <TableHead className="text-center text-primary font-bold text-base py-2">Human Range</TableHead>
                  <TableHead className={`text-center font-bold text-base py-2 ${stage >= 2 ? "text-foreground" : "text-muted-foreground/30"}`}>ChatGPT</TableHead>
                  <TableHead className={`text-center font-bold text-base py-2 ${stage >= 2 ? "text-foreground" : "text-muted-foreground/30"}`}>Gemini</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, idx) => (
                  <TableRow key={idx} className={stage === 3 && row.highlight ? "bg-primary/20" : ""}>
                    <TableCell className="font-semibold text-foreground text-base py-2">{row.word}</TableCell>
                    <TableCell className="text-center text-foreground text-base py-2">{row.humanAvg}</TableCell>
                    <TableCell className="text-center text-primary font-bold text-base py-2">{row.humanRange}</TableCell>
                    <TableCell className={`text-center text-base py-2 ${stage >= 2 ? (stage === 3 && row.highlight ? "font-bold text-lg text-primary" : "text-foreground") : "text-muted-foreground/30"}`}>{row.chatgpt}</TableCell>
                    <TableCell className={`text-center text-base py-2 ${stage >= 2 ? (stage === 3 && row.highlight ? "font-bold text-lg text-primary" : "text-foreground") : "text-muted-foreground/30"}`}>{row.gemini}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <p className="text-xs text-center text-muted-foreground tracking-widest uppercase pt-2">
            Sherman Kent (CIA, 1964) · Mauboussin/Duke replication
          </p>

          <div className="flex justify-center gap-2 mt-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`w-2 h-2 rounded-full transition-all ${s === stage ? "bg-primary scale-125" : s < stage ? "bg-primary/50" : "bg-muted-foreground/30"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};