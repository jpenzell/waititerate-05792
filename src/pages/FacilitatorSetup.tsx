import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Zap, User, Lock } from "lucide-react";
import { z } from "zod";

const FACILITATOR_PASSWORD = "iterate2025"; // Change this to your preferred password

const nameSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Name can only contain letters, spaces, hyphens, and apostrophes" }),
});

export default function FacilitatorSetup() {
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ displayName?: string; password?: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const checkRoleAndRedirect = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      if (!userId) return;

      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();

      if (isMounted && data?.role === "presenter") {
        navigate("/facilitator");
      }
    };

    checkRoleAndRedirect();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) return;
      checkRoleAndRedirect();
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      // Validate password
      if (password !== FACILITATOR_PASSWORD) {
        setErrors({ password: "Incorrect facilitator password" });
        setLoading(false);
        return;
      }

      // Validate name
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

      // Determine current user or sign in anonymously
      const { data: sessionData } = await supabase.auth.getSession();
      let userId = sessionData.session?.user?.id || null;

      if (!userId) {
        const { data: anonData, error: anonError } = await supabase.auth.signInAnonymously({
          options: {
            data: {
              display_name: validation.data.displayName,
            },
          },
        });
        if (anonError) throw anonError;
        if (!anonData.user) throw new Error("No user returned");
        userId = anonData.user.id;
      } else {
        // Update display name for existing session if provided
        await supabase.auth.updateUser({
          data: { display_name: validation.data.displayName },
        });
      }

      // Try to update role; if no row exists, insert presenter role
      const { data: updated, error: roleError } = await supabase
        .from("user_roles")
        .update({ role: "presenter" })
        .eq("user_id", userId)
        .select();

      if (roleError) throw roleError;

      if (!updated || updated.length === 0) {
        const { error: insertError } = await supabase
          .from("user_roles")
          .insert({ user_id: userId, role: "presenter" });
        if (insertError) throw insertError;
      }

      toast.success(`Welcome, Facilitator ${validation.data.displayName}!`);
      navigate("/facilitator");
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
      
      <Card className="w-full max-w-md mx-4 p-8 bg-card/95 backdrop-blur-xl border-primary/30 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        
        <div className="relative">
          <div className="flex items-center justify-center mb-8">
            <div className="p-3 rounded-2xl bg-primary shadow-lg">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-3xl font-display font-bold text-center mb-2 gradient-text">
            Facilitator Setup
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Enter your details and facilitator password
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-card-foreground/90">
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

            <div className="space-y-2">
              <Label htmlFor="password" className="text-card-foreground/90">
                Facilitator Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 bg-background/50 border-primary/20 focus:border-primary/40 ${
                    errors.password ? "border-destructive" : ""
                  }`}
                  placeholder="Enter facilitator password"
                  required
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="default"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Setting up..." : "Continue as Facilitator"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Regular participant?{" "}
              <button
                type="button"
                onClick={() => navigate("/auth")}
                className="text-primary hover:underline"
              >
                Join session instead
              </button>
            </p>
          </form>
        </div>
      </Card>
    </div>
  );
}
