import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Rewrite { label: string; why: string; content: string }

export const RedesignWorkshopScreen = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [rewrites, setRewrites] = useState<Rewrite[]>([]);

  const run = async () => {
    const trimmed = input.trim();
    if (trimmed.length < 20) { toast.error("Paste at least a sentence or two"); return; }
    if (trimmed.length > 4000) { toast.error("Keep it under 4000 characters"); return; }
    setLoading(true);
    setRewrites([]);
    try {
      const { data, error } = await supabase.functions.invoke("redesign-content", {
        body: { content: trimmed },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setRewrites(data?.rewrites ?? []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  return (
    <main className="min-h-screen px-8 py-10 animate-fade-in">
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="text-sm">Workshop · 10 minutes</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Redesign one of YOUR slides
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Paste a slide, handout paragraph, or assignment from a real course.
            AI will rewrite it three ways through different cognitive lenses.
            You decide which works.
          </p>
        </div>

        <Card className="p-5 space-y-3 border-l-4 border-l-accent">
          <label htmlFor="redesign-input" className="text-sm font-semibold text-foreground">
            Your content
          </label>
          <Textarea
            id="redesign-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste a paragraph from your syllabus, lecture slide, or assignment instructions…"
            rows={5}
            maxLength={4000}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{input.length}/4000</span>
            <Button onClick={run} disabled={loading || input.trim().length < 20}>
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Wand2 className="h-4 w-4 mr-2" />}
              {loading ? "Rewriting…" : "Show me 3 versions"}
            </Button>
          </div>
        </Card>

        {rewrites.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4">
            {rewrites.map((r, i) => (
              <Card key={i} className="p-5 flex flex-col gap-3 border-l-4 border-l-primary/70">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{r.label}</h3>
                  <p className="text-xs text-muted-foreground italic mt-1">{r.why}</p>
                </div>
                <div className="text-sm text-foreground/90 leading-relaxed bg-muted/30 rounded p-3 whitespace-pre-wrap min-h-[140px]">
                  {r.content}
                </div>
                <Button size="sm" variant="outline" onClick={() => copy(r.content)} className="self-start">
                  <Copy className="h-3.5 w-3.5 mr-2" /> Copy
                </Button>
              </Card>
            ))}
          </div>
        )}

        {rewrites.length === 0 && !loading && (
          <p className="text-center text-sm text-muted-foreground italic">
            Tip: try a learning outcome, an assignment description, or your hardest-to-explain paragraph.
          </p>
        )}
      </section>
    </main>
  );
};