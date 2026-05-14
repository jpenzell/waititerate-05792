import { Users, Handshake, Lightbulb } from "lucide-react";
import { SlideShell, SlideTitle, PullQuote } from "@/components/slide";
import { Card } from "@/components/ui/card";

const principles = [
  {
    icon: Users,
    title: "Nothing about us without us",
    body: "ND students are the experts on their own cognition. Bring them into the design loop, not just the feedback loop.",
  },
  {
    icon: Handshake,
    title: "Co-design > consultation",
    body: "A 30-minute focus group is consultation. Sharing authorship of the rubric is co-design.",
  },
  {
    icon: Lightbulb,
    title: "Pilot small, ship loud",
    body: "Special Olympics built its athlete-leader model by piloting in two states for a decade. Then everything changed.",
  },
];

export const CoDesignScreen = () => {
  return (
    <SlideShell tone="emerald" ariaLabel="Co-design with neurodivergent students">
      <div className="space-y-10">
        <SlideTitle kicker="The Special Olympics model · applied to your syllabus">
          Stop designing
          <span className="text-primary"> for </span>
          ND students.
          <br />
          Start designing
          <span className="text-primary"> with </span>
          them.
        </SlideTitle>

        <div className="grid md:grid-cols-3 gap-6">
          {principles.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="p-6 bg-card/80 border-l-8 border-l-primary/60 space-y-3">
              <Icon className="h-9 w-9 text-primary" aria-hidden="true" />
              <h3 className="text-2xl font-bold text-foreground">{title}</h3>
              <p className="text-base text-muted-foreground leading-snug">{body}</p>
            </Card>
          ))}
        </div>

        <PullQuote variant="primary" attribution="Adapted from Special Olympics Athlete Leadership Programs · 2018 evaluation">
          The students you'd never put on the design team
          <br />
          <span className="text-primary">are the ones who'll fix the design.</span>
        </PullQuote>
      </div>
    </SlideShell>
  );
};