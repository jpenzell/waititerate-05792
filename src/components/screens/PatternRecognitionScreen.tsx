import { Card } from "@/components/ui/card";
import { PollWidget } from "@/components/PollWidget";
import duckRabbitImage from "@/assets/duck-rabbit.png";

interface PatternRecognitionScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
  userId?: string;
  sessionCode?: string;
}

export const PatternRecognitionScreen = ({
  isFacilitator = false,
  sessionId,
  userId,
  sessionCode,
}: PatternRecognitionScreenProps) => {
  // Duck/rabbit image only — the cognitive diversity explanation lives on the next slide.
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 animate-fade-in" role="main">
      <section className="max-w-6xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Pattern Recognition & Perspective
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            What do you see first?
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-background border-2 border-primary/20">
            <img
              src={duckRabbitImage}
              alt="Duck-rabbit optical illusion - ambiguous figure that can be seen as either a duck or rabbit"
              className="w-full h-auto"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </Card>
        </div>

        {isFacilitator && sessionId && userId ? (
          <div className="max-w-2xl mx-auto">
            <PollWidget
              sessionId={sessionId}
              slideId="LD2.0"
              userId={userId}
              isPresenter={true}
            />
          </div>
        ) : sessionCode ? (
          <div className="text-center">
            <p className="text-xl text-muted-foreground">📱 Vote on your device</p>
          </div>
        ) : null}
      </section>
    </main>
  );
};
