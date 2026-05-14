import { SlideShell, SlideTitle, PullQuote } from "@/components/slide";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

export const WilliamsIdentityScreen = () => {
  return (
    <SlideShell tone="rose" ariaLabel="Donna Williams identity quote">
      <div className="space-y-10">
        <SlideTitle kicker="Identity-first language · why it matters">
          "I'm not a person
          <br />
          <span className="text-primary">with Autism.</span>
          <br />
          I'm just Autistic."
        </SlideTitle>

        <Card className="p-8 md:p-10 bg-card/80 border-l-8 border-l-primary/60 flex gap-5">
          <Quote className="h-10 w-10 text-primary shrink-0" aria-hidden="true" />
          <div className="space-y-4 text-xl md:text-2xl text-foreground/90 leading-snug">
            <p>
              Person-first language ("person with autism") was built to humanise — but many
              autistic adults reject it. It treats the neurology as something <em>added on</em>,
              something to be separated from the self.
            </p>
            <p className="text-foreground">
              Identity-first language ("autistic person") treats the brain as
              <span className="text-primary font-bold"> who they are</span>, not what they have.
            </p>
          </div>
        </Card>

        <PullQuote variant="soft" attribution="Donna Williams, Nobody Nowhere · echoed in ASAN, Autistica, NeurodiVerse policy">
          Ask the student which they prefer.
          <br />
          <span className="text-primary">Then use that.</span>
        </PullQuote>
      </div>
    </SlideShell>
  );
};