import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AVAILABLE_MODELS = [
  { value: "google/gemini-2.5-flash", label: "Gemini 2.5 Flash", short: "Gemini Flash" },
  { value: "google/gemini-2.5-flash-lite", label: "Gemini 2.5 Flash Lite", short: "Gemini Lite" },
  { value: "google/gemini-2.5-pro", label: "Gemini 2.5 Pro", short: "Gemini Pro" },
  { value: "openai/gpt-5-mini", label: "GPT-5 Mini", short: "GPT-5 Mini" },
  { value: "openai/gpt-5-nano", label: "GPT-5 Nano", short: "GPT-5 Nano" },
];

/**
 * "Now Let's See How AI Does It" — same prompt, watch the words appear.
 * Sets up the conversation about how generative AI predicts the next token.
 */
export const AIStoryDemoScreen = () => {
  const [aiStory, setAiStory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState("google/gemini-2.5-flash");
  const [usedModel, setUsedModel] = useState("");

  const generateStory = async () => {
    setIsGenerating(true);
    setAiStory("");
    try {
      const { data, error } = await supabase.functions.invoke("test-prompt", {
        body: {
          prompt: "Write me a story. Keep it very short — 2-3 sentences, under 40 words.",
          context:
            "You are a creative storyteller. Write engaging stories. Be creative and surprising. Start the story immediately, don't repeat the prompt.",
          model: selectedModel,
        },
      });
      if (error) throw error;
      setUsedModel(data?.model || selectedModel);
      const fullText: string = data?.response || "";
      let i = 0;
      const tick = setInterval(() => {
        if (i < fullText.length) {
          setAiStory(fullText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(tick);
          setIsGenerating(false);
        }
      }, 35);
    } catch (e) {
      console.error("Story generation failed", e);
      toast.error("Couldn't generate the story. Try again.");
      setIsGenerating(false);
    }
  };

  const reset = () => {
    setAiStory("");
    setUsedModel("");
  };

  const modelLabel = (v: string) => AVAILABLE_MODELS.find((m) => m.value === v)?.short || v;

  return (
    <div className="flex-1 flex items-center justify-center px-6 animate-fade-in">
      <div className="max-w-5xl mx-auto w-full">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
            Now Let's See How <span className="text-primary">AI</span> Does It
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light">
            Same prompt. Watch what happens.
          </p>
        </header>

        <div className="bg-secondary/10 border-2 border-secondary/30 rounded-2xl p-5 mb-6">
          <p className="text-xl text-center text-foreground">
            <span className="text-muted-foreground">Prompt:</span>{" "}
            <strong className="text-secondary">"Write me a story."</strong>
          </p>
        </div>

        <section
          className="bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/20 rounded-2xl p-8 shadow-lg min-h-[240px]"
          aria-labelledby="ai-story-heading"
          aria-live="polite"
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <h2 id="ai-story-heading" className="text-2xl font-bold text-accent">
                AI's Story
              </h2>
              {usedModel && !isGenerating && (
                <span className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                  {modelLabel(usedModel)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Select value={selectedModel} onValueChange={setSelectedModel} disabled={isGenerating}>
                <SelectTrigger className="w-[200px]" aria-label="Select AI model">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_MODELS.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={reset} variant="outline" disabled={isGenerating} className="gap-2">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Reset
              </Button>

              <Button onClick={generateStory} disabled={isGenerating} className="gap-2">
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Writing…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    {aiStory ? "Try Again" : "Generate Story"}
                  </>
                )}
              </Button>
            </div>
          </div>

          {aiStory ? (
            <p className="text-foreground text-2xl md:text-3xl leading-relaxed">
              {aiStory}
              {isGenerating && <span className="animate-pulse text-accent">▌</span>}
            </p>
          ) : (
            <p className="text-muted-foreground italic text-xl">
              Pick a model and click "Generate Story" to watch the words appear…
            </p>
          )}
        </section>

        {aiStory && !isGenerating && (
          <p className="text-center mt-6 text-lg text-muted-foreground animate-fade-in">
            Notice anything familiar about <em>how</em> the words appeared?
          </p>
        )}
      </div>
    </div>
  );
};