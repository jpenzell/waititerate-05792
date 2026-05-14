import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StandbyView } from "@/components/participant/StandbyView";

export default function Participate() {
  const navigate = useNavigate();
  const { user, loading, displayName, signOut } = useAuth();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionCode, setSessionCode] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const urlSessionCode = searchParams.get("code") || searchParams.get("session");

  useEffect(() => {
    if (!loading && !user) {
      const redirectPath = urlSessionCode ? `/auth?code=${urlSessionCode}` : "/auth";
      navigate(redirectPath);
    }
  }, [user, loading, navigate, urlSessionCode]);

  // Auto-join session if URL has session code
  useEffect(() => {
    if (urlSessionCode && !sessionCode && user) {
      (async () => {
        const { data, error } = await supabase
          .from("presentation_sessions")
          .select("*")
          .eq("session_code", urlSessionCode.toUpperCase())
          .eq("is_active", true)
          .single();

        if (data && !error) {
          setSessionId(data.id);
          setSessionCode(data.session_code);
          toast.success("Joined session!");
        } else {
          toast.error("Session not found or inactive");
          navigate("/");
        }
      })();
    }
  }, [urlSessionCode, sessionCode, user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading…</div>
      </div>
    );
  }

  if (!user) return null;

  if (!sessionId || !sessionCode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <Card className="p-8 text-center max-w-sm">
          <p className="text-lg mb-4">No active session</p>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <StandbyView
      sessionCode={sessionCode}
      sessionId={sessionId}
      userId={user.id}
      displayName={displayName}
      onLeave={handleSignOut}
    />
  );
}
