import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Accessibility } from "lucide-react";
import { PollWidget } from "@/components/PollWidget";

interface CurbCutEffectScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
  userId?: string;
}

export const CurbCutEffectScreen = ({ 
  isFacilitator = false, 
  sessionId, 
  userId 
}: CurbCutEffectScreenProps) => {
  const [showReveal, setShowReveal] = useState(false);

  const quizQuestions = [
    {
      question: "What percentage of ALL viewers use closed captions (not just deaf/hard-of-hearing)?",
      answer: "71%",
      context: "Designed for deaf/hard-of-hearing, but ESL learners, people in noisy environments, and those with auditory processing differences also benefit"
    },
    {
      question: "How much does chunked content improve completion rates for everyone?",
      answer: "30%",
      context: "Designed for ADHD and working memory differences, but reduces cognitive load for all learners"
    },
    {
      question: "What percentage of learners prefer multiple format options (text + audio + visual)?",
      answer: "80%+",
      context: "Designed for dyslexia and visual processing differences, but benefits all learning styles"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4 text-base px-4 py-2">
            Universal Design Principle
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            The Curb-Cut Effect
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Designing for neurodivergent learners improves outcomes for <strong className="text-foreground">everyone</strong>
          </p>
        </div>

        {/* Origin Story - Streamlined */}
        <Card className="p-10 mb-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 animate-scale-in">
          <div className="flex items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Accessibility className="h-10 w-10 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">The Original Curb Cut (1970s)</h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Activists fought for sloped curbs to help wheelchair users. City planners called it a "special accommodation."
              </p>
              <p className="text-xl text-foreground leading-relaxed">
                <strong className="text-2xl">What happened?</strong> Everyone benefited: parents with strollers, travelers with luggage, 
                delivery workers, cyclists, elderly pedestrians—and yes, wheelchair users.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        {!showReveal ? (
          <Card className="p-10 mb-12 bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/20">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Let's Test This Principle
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                On your phone: Guess the statistics about accessibility features
              </p>
            </div>

            <div className="space-y-6">
              {quizQuestions.map((q, idx) => (
                <Card key={idx} className="p-8 bg-background border-2 border-border">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{idx + 1}</span>
                    </div>
                    <div>
                      <p className="text-xl text-foreground font-semibold leading-relaxed">
                        {q.question}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {isFacilitator && (
              <div className="text-center mt-8">
                <Button 
                  onClick={() => setShowReveal(true)}
                  size="lg"
                  className="text-xl px-12 py-6"
                >
                  Reveal Answers
                </Button>
              </div>
            )}
          </Card>
        ) : (
          <div className="space-y-8 mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-center text-foreground mb-8">
              The Reality: Designed for 15-20%, Used by 80%+
            </h2>
            
            {quizQuestions.map((q, idx) => (
              <Card key={idx} className="p-10 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-3xl font-bold text-primary">{idx + 1}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{q.question}</h3>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {q.context}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-7xl font-bold text-primary mb-4">{q.answer}</div>
                    <Badge className="bg-accent/20 text-accent border-accent/30 text-lg px-4 py-2">
                      Actual Data
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Key Principle */}
        <Card className="p-12 mb-12 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
          <div className="text-center space-y-6">
            <h3 className="text-4xl font-bold text-foreground">The Principle</h3>
            <div className="flex items-center justify-center gap-6 text-3xl font-semibold flex-wrap">
              <span className="text-primary">Design for the Margins</span>
              <ArrowRight className="h-10 w-10 text-accent" />
              <span className="text-accent">Improve the Center</span>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              When you solve for cognitive diversity, you create better learning for everyone.
            </p>
          </div>
        </Card>

        {/* Poll */}
        {isFacilitator && sessionId && userId && (
          <div className="max-w-4xl mx-auto">
            <PollWidget
              sessionId={sessionId}
              slideId="LD1.0"
              userId={userId}
              isPresenter={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};
