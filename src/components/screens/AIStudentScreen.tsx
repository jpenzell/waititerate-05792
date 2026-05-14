import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Brain, Send, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface AIStudentScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
  userId?: string;
  /** 1 = teach, 2 = redesign, 3 = iterate. Cosmetic — controls the badge label. */
  round?: 1 | 2 | 3;
}

export const AIStudentScreen = ({ 
  isFacilitator = false,
  round,
}: AIStudentScreenProps) => {
  const [teachingInput, setTeachingInput] = useState("");
  const [conversation, setConversation] = useState<Array<{role: 'teacher' | 'student', text: string}>>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizResults, setQuizResults] = useState<{correct: number, total: number, questions?: Array<{q: string; a: string; correct: boolean; explanation?: string}>} | null>(null);
  const [isReplying, setIsReplying] = useState(false);

  const handleTeach = async () => {
    const message = teachingInput.trim();
    if (!message || isReplying) return;
    const nextConvo = [...conversation, { role: 'teacher' as const, text: message }];
    setConversation(nextConvo);
    setTeachingInput("");
    setIsReplying(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-student', {
        body: { mode: 'teach', conversation, userMessage: message },
      });
      if (error) throw error;
      const reply = (data?.response as string)?.trim() || "Sorry, I lost my train of thought. Can you say that again?";
      setConversation((prev) => [...prev, { role: 'student', text: reply }]);
    } catch (err) {
      console.error('AI Student error', err);
      toast.error("AI student couldn't reply. Try again.");
    } finally {
      setIsReplying(false);
    }
  };

  const handleQuiz = async () => {
    setQuizStarted(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-student', {
        body: { mode: 'quiz', conversation },
      });
      if (error) throw error;
      const result = {
        correct: data?.correct ?? 0,
        total: data?.total ?? 0,
        questions: data?.questions ?? [],
      };
      setQuizResults(result);
      if (result.total === 0) {
        toast.error("AI student couldn't generate a quiz from that lesson — try teaching a bit more.");
      } else if (result.correct >= Math.ceil(result.total * 0.8)) {
        toast.success(`Your AI student passed (${result.correct}/${result.total})!`);
      } else {
        toast.info(`AI student got ${result.correct}/${result.total}. Teach more — they're close.`);
      }
    } catch (err) {
      console.error('AI Student quiz error', err);
      toast.error("Couldn't grade the quiz. Try again.");
      setQuizStarted(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-6 text-lg px-6 py-3">
            <Brain className="w-5 h-5 mr-2 inline" />
            {round
              ? `Round ${round} — ${round === 1 ? "Teach" : round === 2 ? "Redesign" : "Iterate"}`
              : "Flip the Script"}
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            You're the Teacher Now
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {isFacilitator 
              ? "Participants teach an AI student and see if it can pass the quiz" 
              : "Teach the AI student a concept, then quiz them to see if they learned"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Teaching Interface */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 animate-scale-in">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Brain className="w-6 h-6" />
              Teach Your AI Student
            </h3>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {conversation.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-lg ${
                    msg.role === 'teacher' 
                      ? 'bg-primary/10 ml-8' 
                      : 'bg-accent/20 mr-8'
                  }`}
                >
                  <div className="text-lg font-semibold mb-1">
                    {msg.role === 'teacher' ? 'You:' : 'AI Student:'}
                  </div>
                  <div className="text-foreground">{msg.text}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder="Explain a concept to your AI student..."
                value={teachingInput}
                onChange={(e) => setTeachingInput(e.target.value)}
                className="min-h-32"
                disabled={quizStarted}
              />
              <div className="flex gap-3">
                <Button 
                  onClick={handleTeach}
                  className="flex-1"
                  disabled={quizStarted || isReplying || !teachingInput.trim()}
                >
                  {isReplying ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                  {isReplying ? "Student thinking…" : "Teach"}
                </Button>
                <Button 
                  onClick={handleQuiz}
                  variant="secondary"
                  disabled={conversation.length < 2 || quizStarted}
                >
                  Quiz Time
                </Button>
              </div>
            </div>
          </Card>

          {/* Quiz Results */}
          <Card className="p-8 bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/20 animate-scale-in">
            <h3 className="text-2xl font-bold mb-6">Quiz Results</h3>
            
            {!quizStarted && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">Teach your AI student first, then give them a quiz!</p>
              </div>
            )}

            {quizStarted && !quizResults && (
              <div className="text-center py-12">
                <div className="animate-pulse space-y-4">
                  <Brain className="w-16 h-16 mx-auto text-primary" />
                  <p className="text-lg text-muted-foreground">AI student is taking the quiz...</p>
                </div>
              </div>
            )}

            {quizResults && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center py-6">
                  {quizResults.correct >= 4 ? (
                    <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-4" />
                  ) : (
                    <XCircle className="w-20 h-20 mx-auto text-orange-500 mb-4" />
                  )}
                  <div className="text-6xl font-bold mb-2">
                    {quizResults.correct}/{quizResults.total}
                  </div>
                  <p className="text-xl text-muted-foreground">
                    {quizResults.correct >= 4 ? "Passed!" : "Needs more teaching"}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Key Insight:</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Teaching forces you to understand deeply. When you explain concepts to an AI student, 
                    you must organize your thinking, identify gaps, and articulate clearly—the same skills 
                    that make effective learners.
                  </p>
                  <div className="p-4 bg-primary/5 rounded-lg mt-4">
                    <p className="text-lg font-semibold text-primary mb-2">Learning by Teaching</p>
                    <p className="text-lg text-muted-foreground">
                      This reverses the typical AI tutoring model. Instead of AI teaching humans, 
                      humans teach AI—creating a low-stakes space to practice explanation and build mastery.
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    setConversation([]);
                    setQuizStarted(false);
                    setQuizResults(null);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Try Again
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Bottom Insight */}
        {!quizStarted && (
          <Card className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/10 animate-fade-in">
            <div className="flex items-start gap-4">
              <Brain className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-semibold mb-2">Why Teach an AI?</h4>
                <p className="text-muted-foreground leading-relaxed">
                  The Feynman Technique: You only truly understand something when you can teach it simply. 
                  By teaching an AI student, learners must organize their knowledge, identify misconceptions, 
                  and practice clear communication—all without the social pressure of teaching peers.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
