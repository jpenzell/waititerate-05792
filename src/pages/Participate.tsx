import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PresentationLayout } from "@/components/PresentationLayout";
import { SlideRenderer } from "@/components/SlideRenderer";
import { useSlideConfig } from "@/hooks/useSlideConfig";
import { useAuth } from "@/hooks/useAuth";
import { useRealtimeSession } from "@/hooks/useRealtimeSession";
import { screens } from "@/config/screens";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { AccessibilityControls } from "@/components/AccessibilityControls";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Participate() {
  const navigate = useNavigate();
  const { user, loading, displayName, signOut } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionCode, setSessionCode] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const [hideParticles, setHideParticles] = useState(false);
  const isMobile = useIsMobile();

  const urlSessionCode = searchParams.get("code") || searchParams.get("session");
  const { currentSlideId } = useRealtimeSession(sessionCode || undefined);

  const { config } = useSlideConfig(screens);

  const visibleScreens = useMemo(() => {
    const sortedConfig = [...config].sort((a, b) => a.order - b.order);
    return sortedConfig
      .filter((c) => c.visible)
      .map((c) => screens.find((s) => s.id === c.id))
      .filter(Boolean) as typeof screens;
  }, [config]);

  useEffect(() => {
    if (!loading && !user) {
      const redirectPath = urlSessionCode ? `/auth?code=${urlSessionCode}` : "/auth";
      navigate(redirectPath);
    }
  }, [user, loading, navigate, urlSessionCode]);

  // Auto-join session if URL has session code
  useEffect(() => {
    if (urlSessionCode && !sessionCode && user) {
      const joinSessionAuto = async () => {
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
      };
      joinSessionAuto();
    }
  }, [urlSessionCode, sessionCode, user, navigate]);

  // Sync to presenter's current slide
  useEffect(() => {
    if (currentSlideId && sessionCode) {
      const index = visibleScreens.findIndex((s) => s.id === currentSlideId);
      if (index !== -1 && index !== currentIndex) {
        setCurrentIndex(index);
        window.location.hash = currentSlideId;
      }
    }
  }, [currentSlideId, sessionCode, visibleScreens]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const currentScreen = visibleScreens[currentIndex];

  if (!currentScreen || !sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 bg-background/80 backdrop-blur-xl border-primary/20 text-center">
          <p className="text-xl text-muted-foreground mb-4">No active session</p>
          <Button onClick={() => navigate("/")} className="bg-gradient-primary">
            Return to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      {!hideParticles && !isMobile && <ParticleBackground />}

      {!isMobile && (
        <AccessibilityControls
          onSettingsChange={(settings) => {
            setHideParticles(settings.hideParticles);
          }}
        />
      )}

      {!isMobile && (
        <ProgressIndicator
          currentIndex={currentIndex}
          totalSlides={visibleScreens.length}
          currentTitle={currentScreen.title}
          estimatedTimeRemaining={visibleScreens
            .slice(currentIndex)
            .reduce((sum, s) => sum + (s.duration || 0), 0)}
        />
      )}

      <div className={`fixed ${isMobile ? "top-2 right-2" : "top-4 right-4"} z-50 space-y-2`}>
        {displayName && !isMobile && (
          <Card className="p-3 bg-background/80 backdrop-blur-xl border-primary/20">
            <p className="text-sm text-muted-foreground">Participating as</p>
            <p className="font-display font-bold text-primary">{displayName}</p>
          </Card>
        )}
        <Button
          onClick={handleSignOut}
          variant="outline"
          size={isMobile ? "icon" : "sm"}
          className={`border-primary/20 ${isMobile ? "" : "w-full"}`}
          title="Leave Session"
        >
          <LogOut className="w-4 h-4 mr-0" />
          {!isMobile && <span className="ml-2">Leave Session</span>}
        </Button>
      </div>

      <PresentationLayout
        currentScreen={currentScreen.id}
        totalScreens={visibleScreens.length}
        currentIndex={currentIndex}
        onNavigate={() => {}}
        title="AI for All Minds"
        duration={240}
        notes=""
        mode="participant"
        sessionCode={sessionCode || undefined}
        sessionId={sessionId || undefined}
      >
        <SlideRenderer
          screen={currentScreen}
          isFacilitator={false}
          sessionId={sessionId || undefined}
          userId={user.id}
          showPollWidget={true}
        />
      </PresentationLayout>
    </>
  );
}
