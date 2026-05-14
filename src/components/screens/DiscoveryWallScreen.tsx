import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props { sessionId?: string }

interface Row { id: string; response: string; created_at: string }

const PROMPT = "Until today, I assumed everyone…";

export const DiscoveryWallScreen = ({ sessionId }: Props) => {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);

  const sid = sessionId || "demo";

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      const { data } = await supabase
        .from("discovery_wall_responses")
        .select("id, response, created_at")
        .eq("session_id", sid)
        .order("created_at", { ascending: false })
        .limit(60);
      if (!ignore && data) setRows(data as Row[]);
    };
    load();

    const channel = supabase
      .channel(`discovery-wall-${sid}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "discovery_wall_responses",
        filter: `session_id=eq.${sid}`,
      }, (payload) => {
        setRows(prev => [payload.new as Row, ...prev].slice(0, 60));
      })
      .subscribe();
    return () => { ignore = true; supabase.removeChannel(channel); };
  }, [sid]);

  const submit = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (trimmed.length > 280) {
      toast.error("Keep it under 280 characters");
      return;
    }
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) { toast.error("Sign in first"); return; }
    const { error } = await supabase.from("discovery_wall_responses").insert({
      session_id: sid, user_id: auth.user.id, response: trimmed,
    });
    if (error) { toast.error(error.message); return; }
    setSubmitted(true); setText("");
    toast.success("Added to the wall");
  };

  return (
    <main className="min-h-screen px-8 py-10 animate-fade-in">
      <section className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="text-lg">Discovery Wall</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Until today, I assumed everyone…
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            One sentence. What did you just discover about your own mind — or
            about the assumption you'd been carrying?
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
          <Card className="p-6 space-y-4 border-l-4 border-l-accent h-fit sticky top-4">
            <p className="text-lg uppercase tracking-wider text-accent font-mono">Your turn</p>
            <p className="text-lg font-semibold text-foreground">{PROMPT}</p>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="…could form mental pictures."
              maxLength={280}
              rows={3}
              aria-label="Your discovery"
            />
            <div className="flex items-center justify-between text-base text-muted-foreground">
              <span>{text.length}/280</span>
              {submitted && <span className="text-primary">Submitted ✓</span>}
            </div>
            <Button onClick={submit} disabled={!text.trim()} className="w-full">
              <Send className="h-4 w-4 mr-2" /> Add to the wall
            </Button>
          </Card>

          <div>
            <div className="flex items-center gap-2 mb-3 text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-lg font-mono">{rows.length} discoveries · live</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {rows.map((r) => (
                <Card key={r.id} className="p-4 text-lg leading-relaxed bg-card/60 border-border/60 animate-fade-in">
                  <span className="text-muted-foreground italic">{PROMPT}</span>{" "}
                  <span className="text-foreground">{r.response}</span>
                </Card>
              ))}
              {rows.length === 0 && (
                <p className="text-lg text-muted-foreground italic col-span-full">
                  Be the first to add a discovery.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};