import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ParkingCircle, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props { sessionId?: string }
interface Row { id: string; question: string }

export const ParkingLotIntroScreen = ({ sessionId }: Props) => {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const sid = sessionId || "demo";

  useEffect(() => {
    const load = async () => {
      const { count: c } = await supabase
        .from("parking_lot_questions")
        .select("id", { count: "exact", head: true })
        .eq("session_id", sid);
      setCount(c ?? 0);
    };
    load();
    const channel = supabase
      .channel(`parking-lot-intro-${sid}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "parking_lot_questions", filter: `session_id=eq.${sid}` },
        () => setCount(c => c + 1))
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [sid]);

  const submit = async () => {
    const t = text.trim();
    if (!t) return;
    if (t.length > 500) { toast.error("Keep it under 500 characters"); return; }
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) { toast.error("Sign in first"); return; }
    const { error } = await supabase.from("parking_lot_questions").insert({
      session_id: sid, user_id: auth.user.id, question: t,
    });
    if (error) { toast.error(error.message); return; }
    setText("");
    toast.success("In the parking lot");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-8 animate-fade-in">
      <section className="max-w-3xl w-full text-center space-y-8">
        <Badge variant="secondary" className="mx-auto">Before we start</Badge>
        <ParkingCircle className="h-16 w-16 mx-auto text-accent" />
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          What's your biggest AI question?
        </h1>
        <p className="text-lg text-muted-foreground">
          One sentence. Anonymous to the room. We'll come back to as many as
          we can near the end of the session.
        </p>

        <Card className="p-6 space-y-4 text-left border-l-4 border-l-accent">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., How do I tell if a student used AI to write their essay?"
            maxLength={500}
            onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
            aria-label="Your question"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{count} questions in the lot · {text.length}/500</span>
            <Button onClick={submit} disabled={!text.trim()}>
              <Send className="h-4 w-4 mr-2" /> Drop it in
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
};