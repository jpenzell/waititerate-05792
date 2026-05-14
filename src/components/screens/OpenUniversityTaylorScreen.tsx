import { MessageCircle, Users, Clock } from "lucide-react";
import { SlideShell, StatBlock } from "@/components/slide";
import { Card } from "@/components/ui/card";

/**
 * LD4.45 — Open University "Taylor" assistant. The proof-of-concept for
 * "AI at the front door of DSO, humans for the substantive judgment."
 */
export const OpenUniversityTaylorScreen = () => {
  return (
    <SlideShell tone="teal" align="center" ariaLabel="Open University Taylor — AI at the front door">
      <div className="space-y-10">
        <header className="text-center space-y-4">
          <p className="text-lg md:text-xl font-mono uppercase tracking-[0.3em] text-muted-foreground">
            Case study · Open University UK
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
            AI at the front door. <span className="text-accent">Humans for the judgment.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-snug">
            "Taylor" — a digital assistant co-designed <em>with</em> disabled students as an alternative to disclosure forms.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <StatBlock
            value="Co-design"
            label="built with disabled students"
            note="Participatory design — not 'for' the population, with it."
            icon={Users}
            accent="accent"
          />
          <StatBlock
            value="Text + voice"
            label="lower-friction intake"
            note="Students choose how they communicate. No paperwork as the gate."
            icon={MessageCircle}
            accent="primary"
          />
          <StatBlock
            value="Staff time → judgment"
            label="not data entry"
            note="Routine intake handled by the assistant. Humans do the work only humans can do."
            icon={Clock}
            accent="accent"
          />
        </div>

        <Card className="p-6 md:p-8 bg-card/70 border-l-8 border-l-accent/60 max-w-5xl mx-auto">
          <p className="text-xl md:text-2xl text-foreground leading-snug">
            The model your DSO can ship in <span className="text-accent font-bold">one semester</span>: AI handles the form, the FAQ, and the first conversation. Humans take over the moment a real decision needs a human.
          </p>
        </Card>
      </div>
    </SlideShell>
  );
};