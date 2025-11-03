import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PollWidget } from "@/components/PollWidget";

interface CurbCutQuizScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
  userId?: string;
}

export const CurbCutQuizScreen = ({ 
  isFacilitator = false,
  sessionId,
  userId 
}: CurbCutQuizScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-12 px-6 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-6 text-lg px-6 py-3">
            Test the Principle
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            Guess the Statistic
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {isFacilitator ? "Participants are answering on their phones" : "Select your answer on your phone"}
          </p>
        </div>

        {sessionId && userId && (
          <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 animate-scale-in">
            <PollWidget
              sessionId={sessionId}
              slideId={window.location.hash.replace('#', '')}
              userId={userId}
              isPresenter={isFacilitator}
            />
          </Card>
        )}

        {!sessionId && (
          <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <p className="text-xl text-center text-muted-foreground">
              Join a live session to participate in the quiz
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};
