import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ParkingCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Props { sessionId?: string }
interface Row { id: string; question: string; created_at: string }

export const ParkingLotDisplayScreen = ({ sessionId }: Props) => {
  const [rows, setRows] = useState<Row[]>([]);
  const sid = sessionId || "demo";

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("parking_lot_questions")
        .select("id, question, created_at")
        .eq("session_id", sid)
        .order("created_at", { ascending: true })
        .limit(40);
      if (data) setRows(data as Row[]);
    };
    load();
    const channel = supabase
      .channel(`parking-lot-display-${sid}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "parking_lot_questions", filter: `session_id=eq.${sid}` },
        (payload) => setRows(p => [...p, payload.new as Row]))
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [sid]);

  return (
    <main className="min-h-screen px-8 py-10 animate-fade-in">
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="mx-auto">The Parking Lot</Badge>
          <div className="flex items-center justify-center gap-3">
            <ParkingCircle className="h-10 w-10 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Your questions</h1>
          </div>
          <p className="text-base text-muted-foreground">
            Captured at the start. Let's tackle a few before we close.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {rows.map((r, i) => (
            <Card key={r.id} className="p-4 flex gap-3 items-start border-l-4 border-l-primary/50 animate-fade-in">
              <span className="text-2xl font-bold font-mono text-accent/70 leading-none">{i + 1}</span>
              <p className="text-base text-foreground/90 leading-relaxed">{r.question}</p>
            </Card>
          ))}
          {rows.length === 0 && (
            <p className="text-sm text-muted-foreground italic col-span-full text-center py-8">
              No questions yet. (Did anyone visit the join screen at the start?)
            </p>
          )}
        </div>
      </section>
    </main>
  );
};