import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Zap, User } from "lucide-react";
import { z } from "zod";

const nameSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Name can only contain letters, spaces, hyphens, and apostrophes" }),
});

export default function Auth() {
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ displayName?: string }>({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // Support both 'code' (from QR codes) and 'session' parameters
  const sessionCode = searchParams.get("code") || searchParams.get("session");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        if (sessionCode) {
          navigate(`/participate?code=${sessionCode}`);
        } else {
          navigate("/");
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        if (sessionCode) {
          navigate(`/participate?code=${sessionCode}`);
        } else {
          navigate("/");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, sessionCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      // Validate input
      const validation = nameSchema.safeParse({ displayName });
      if (!validation.success) {
        const fieldErrors: { displayName?: string } = {};
        validation.error.errors.forEach((error) => {
          if (error.path[0] === "displayName") {
            fieldErrors.displayName = error.message;
          }
        });
        setErrors(fieldErrors);
        setLoading(false);
        return;
      }

      // Sign in anonymously
      const { data, error } = await supabase.auth.signInAnonymously({
        options: {
          data: {
            display_name: validation.data.displayName,
          },
        },
      });

      if (error) throw error;

      toast.success(`Welcome, ${validation.data.displayName}!`);
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-background/95 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      
      <Card className="w-full max-w-md mx-4 p-8 bg-background/80 backdrop-blur-xl border-primary/20 shadow-glow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        
        <div className="relative">
          <div className="flex items-center justify-center mb-8">
            <div className="p-3 rounded-2xl bg-gradient-primary shadow-glow-primary">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-3xl font-display font-bold text-center mb-2 gradient-text">
            Join Session
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            {sessionCode 
              ? `Joining session: ${sessionCode}`
              : "Enter your name to participate"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-foreground/90">
                Your Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className={`pl-10 bg-background/50 border-primary/20 focus:border-primary/40 ${
                    errors.displayName ? "border-destructive" : ""
                  }`}
                  placeholder="Enter your name"
                  required
                  maxLength={50}
                />
              </div>
              {errors.displayName && (
                <p className="text-sm text-destructive">{errors.displayName}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all"
            >
              {loading ? "Joining..." : "Join Session"}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
