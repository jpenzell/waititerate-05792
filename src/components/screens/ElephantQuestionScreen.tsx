import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { RotateCcw, MessageSquare } from "lucide-react";

/**
 * Now answer a real question one word at a time. Same mechanic, harder constraint:
 * the room has to commit to a single answer together — no editing, no "yes, and."
 */
export const ElephantQuestionScreen = () => {
  const [words, setWords] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [words.length]);

  const lockWord = () => {
    const w = draft.trim();
    if (!w) return;
    setWords((prev) => [...prev, w]);
    setDraft("");
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Enter") e.stopPropagation();
    if (e.key === "Enter") {
      e.preventDefault();
      lockWord();
    }
    if (e.key === "Backspace" && draft === "" && words.length > 0) {
      e.preventDefault();
      setWords((prev) => prev.slice(0, -1));
    }
  };

  const reset = () => {
    setWords([]);
    setDraft("");
    inputRef.current?.focus();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-12 animate-fade-in">
      <div className="max-w-7xl w-full space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/30 rounded-full mb-4">
            <MessageSquare className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span className="text-accent font-semibold tracking-wide text-xs uppercase">
              Now Answer a Question Together
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
            How many <span className="text-primary italic">elephants</span> could fit inside the Charlotte Convention Center?
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Same rules: one word at a time. No taking it back.
          </p>
        </div>

        <div
          className="min-h-[320px] bg-card/60 border-2 border-border rounded-3xl p-10 shadow-xl flex flex-wrap items-center justify-center gap-x-5 gap-y-4"
          aria-live="polite"
        >
          {words.length === 0 && !draft && (
            <p className="text-3xl text-muted-foreground/50 italic">Start the answer…</p>
          )}
          {words.map((w, i) => (
            <span
              key={i}
              className="text-5xl md:text-6xl font-display text-foreground animate-fade-in"
            >
              {w}
            </span>
          ))}
          {draft && (
            <span className="text-5xl md:text-6xl font-display text-primary/60 italic">
              {draft}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKey}
            autoFocus
            aria-label="Type the next word of the answer"
            className="flex-1 text-3xl md:text-4xl px-6 py-5 rounded-2xl border-2 border-primary/40 bg-background text-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
          />
          <button
            onClick={reset}
            className="px-5 py-5 rounded-2xl border-2 border-border text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors"
            aria-label="Reset answer"
            title="Reset"
          >
            <RotateCcw className="w-7 h-7" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};