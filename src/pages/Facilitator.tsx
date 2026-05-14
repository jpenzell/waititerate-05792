import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PresentationLayout } from "@/components/PresentationLayout";
import { SlideManager } from "@/components/SlideManager";
import { SessionControl } from "@/components/SessionControl";
import { useSlideConfig } from "@/hooks/useSlideConfig";
import { useAuth } from "@/hooks/useAuth";
import { useRealtimeSession } from "@/hooks/useRealtimeSession";
import { screens } from "@/config/screens";
import { SlideRenderer } from "@/components/SlideRenderer";
import { ParticleBackground } from "@/components/ParticleBackground";
import { AccessibilityControls } from "@/components/AccessibilityControls";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { Button } from "@/components/ui/button";
import { PresentationModeToggle } from "@/components/PresentationModeToggle";
import { ExternalLink, Users } from "lucide-react";
import { toast } from "sonner";
import { seedPollsForSession } from "@/utils/pollSeeder";


export default function Facilitator() {
  const navigate = useNavigate();
  const { user, loading, userRole, displayName, signOut } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (typeof window === "undefined") return 0;
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return 0;
    const idx = screens.findIndex((s) => s.id === id);
    return idx >= 0 ? idx : 0;
  });
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionCode, setSessionCode] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [backgroundAnalysisTriggered, setBackgroundAnalysisTriggered] = useState(false);
  const [keyboardHintsVisible, setKeyboardHintsVisible] = useState(true);
  const [hideParticles, setHideParticles] = useState(false);
  const [pollsSeededSessionId, setPollsSeededSessionId] = useState<string | null>(null);

  const { updateSlide } = useRealtimeSession(sessionCode || undefined);

  const {
    config,
    toggleVisibility,
    moveSlide,
    resetToDefaults,
    showAll,
    hideAll,
  } = useSlideConfig(screens);

  const visibleScreens = useMemo(() => {
    const sortedConfig = [...config].sort((a, b) => a.order - b.order);
    return sortedConfig
      .filter(c => c.visible)
      .map(c => screens.find(s => s.id === c.id))
      .filter(Boolean) as typeof screens;
  }, [config]);

  // Restore session from localStorage or check for active session
  useEffect(() => {
    if (!loading && user) {
      // Try to restore from localStorage first
      const savedState = localStorage.getItem("facilitator-state");
      if (savedState) {
        try {
          const { sessionId: savedSessionId, sessionCode: savedSessionCode } = JSON.parse(savedState);
          if (savedSessionId && savedSessionCode) {
            console.log('Restoring session from localStorage:', savedSessionCode);
            setSessionId(savedSessionId);
            setSessionCode(savedSessionCode);
            return;
          }
        } catch (e) {
          console.error('Error parsing saved facilitator state:', e);
        }
      }

      // If no saved state, check for active presenter sessions in DB
      const checkActiveSession = async () => {
        const { data } = await supabase
          .from("presentation_sessions")
          .select("id, session_code")
          .eq("presenter_id", user.id)
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (data) {
          console.log('Found active session:', data.session_code);
          setSessionId(data.id);
          setSessionCode(data.session_code);
        }
      };
      
      checkActiveSession();
    }
  }, [user, loading]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    } else if (!loading && user && userRole === "participant") {
      toast.error("Facilitator access only");
      navigate("/participate");
    }
  }, [user, loading, userRole, navigate]);

  // Update session when slide changes
  useEffect(() => {
    if (sessionCode && visibleScreens[currentIndex]) {
      console.log('Facilitator updating to slide:', visibleScreens[currentIndex].id);
      updateSlide(visibleScreens[currentIndex].id);
    }
  }, [currentIndex, sessionCode]);


  useEffect(() => {
    if (visibleScreens[currentIndex]) {
      window.location.hash = visibleScreens[currentIndex].id;
    }
  }, [currentIndex, visibleScreens]);

  // Hash → slide deep-linking. Read hash on mount and on hashchange so URLs
  // like /facilitator#LD4.3 jump to that slide.
  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      const idx = visibleScreens.findIndex((s) => s.id === id);
      if (idx >= 0 && idx !== currentIndex) setCurrentIndex(idx);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [visibleScreens]); // eslint-disable-line react-hooks/exhaustive-deps

  // Ensure polls exist for active sessions (handles restored/previous sessions)
  useEffect(() => {
    const runSeeding = async () => {
      if (!sessionId) return;
      if (pollsSeededSessionId === sessionId) return; // seed once per session
      try {
        await seedPollsForSession(sessionId, visibleScreens);
      } catch (e) {
        console.error('Error seeding polls for existing session:', e);
      } finally {
        setPollsSeededSessionId(sessionId);
      }
    };
    runSeeding();
  }, [sessionId, visibleScreens, pollsSeededSessionId]);
  const handleSessionChange = (newSessionId: string | null, newSessionCode: string | null, isPresenter: boolean) => {
    setSessionId(newSessionId);
    setSessionCode(newSessionCode);
    
    // Save to localStorage for control panel window
    if (newSessionId && newSessionCode) {
      localStorage.setItem("facilitator-state", JSON.stringify({
        sessionId: newSessionId,
        sessionCode: newSessionCode,
        currentSlideId: visibleScreens[currentIndex]?.id || screens[0].id,
      }));
    }
  };

  const openControlPanel = () => {
    const width = 450;
    const height = 900;
    const left = window.screen.width - width - 50;
    const top = 50;
    
    window.open(
      "/facilitator-controls",
      "facilitator-controls",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
    toast.success("Control panel opened");
  };

  // Trigger background AI analysis immediately when photos are submitted
  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel(`photo-analysis-trigger:${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'photo_submissions',
          filter: `session_id=eq.${sessionId}`,
        },
        async () => {
          console.log('Photo submitted, triggering analysis...');
          // Small delay to batch multiple photos
          setTimeout(() => {
            triggerBackgroundAnalysis();
          }, 3000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const triggerBackgroundAnalysis = async () => {
    if (!sessionId) return;
    
    // Load photos
    const { data: photos } = await supabase
      .from('photo_submissions')
      .select('*')
      .eq('session_id', sessionId);
    
    if (!photos || photos.length === 0) return;
    
    console.log('Triggering background AI analysis for', photos.length, 'photos...');
    
    // Use photo URLs for analysis (fallback to photo_data for backwards compatibility)
    const photoUrls = photos.map(p => p.photo_url || p.photo_data);
    
    // Trigger pattern analysis
    try {
      const { data, error } = await supabase.functions.invoke('analyze-photo-patterns', {
        body: { sessionId, photos: photoUrls, analysisType: 'patterns' }
      });
      if (error) {
        console.error('Pattern analysis error:', error);
      } else if (data) {
        console.log('Pattern analysis complete');
        console.log('Attempting to save patterns for session:', sessionId);
        const { data: updated, error: updateError } = await supabase
          .from('photo_exercise_phase')
          .update({ ai_patterns: JSON.stringify(data.results) })
          .eq('session_id', sessionId)
          .select('id');
        
        console.log('Update result:', updated, 'Error:', updateError);
        
        if (!updated || updated.length === 0) {
          console.log('No row found, inserting new row');
          const { data: inserted, error: insertError } = await supabase
            .from('photo_exercise_phase')
            .insert({ session_id: sessionId, ai_patterns: JSON.stringify(data.results) })
            .select('id');
          console.log('Insert result:', inserted, 'Error:', insertError);
        }
      }
    } catch (e) {
      console.error('Pattern analysis exception:', e);
    }
    
    // Trigger datapoint analysis
    try {
      const { data, error } = await supabase.functions.invoke('analyze-photo-patterns', {
        body: { sessionId, photos: photoUrls, analysisType: 'datapoints' }
      });
      if (error) {
        console.error('Datapoint analysis error:', error);
      } else if (data) {
        console.log('Datapoint analysis complete');
        console.log('Attempting to save datapoints for session:', sessionId);
        const counts = data.results.map((r: any) => r.dataPointCount);
        const maxCount = Math.max(...counts);
        const avgCount = Math.round(counts.reduce((a: number, b: number) => a + b, 0) / counts.length);
        
        const { data: updated, error: updateError } = await supabase
          .from('photo_exercise_phase')
          .update({ 
            ai_datapoint_count: maxCount,
            ai_datapoint_details: JSON.stringify({ counts, max: maxCount, avg: avgCount })
          })
          .eq('session_id', sessionId)
          .select('id');
        
        console.log('Update result:', updated, 'Error:', updateError);
        
        if (!updated || updated.length === 0) {
          console.log('No row found, inserting new row');
          const { data: inserted, error: insertError } = await supabase
            .from('photo_exercise_phase')
            .insert({ 
              session_id: sessionId,
              ai_datapoint_count: maxCount,
              ai_datapoint_details: JSON.stringify({ counts, max: maxCount, avg: avgCount })
            })
            .select('id');
          console.log('Insert result:', inserted, 'Error:', insertError);
        }
      }
    } catch (e) {
      console.error('Datapoint analysis exception:', e);
    }
  };

  const handleNavigation = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user || !userRole) return null;

  const currentScreen = visibleScreens[currentIndex];

  return (
    <>
      {!hideParticles && <ParticleBackground />}
      
      {/* Accessibility Controls */}
      <AccessibilityControls 
        onSettingsChange={(settings) => {
          setKeyboardHintsVisible(settings.keyboardHintsVisible);
          setHideParticles(settings.hideParticles);
        }}
      />
      
      {/* Keyboard Shortcuts */}
      <KeyboardShortcuts 
        visible={keyboardHintsVisible}
        onNavigate={(direction) => {
          if (direction === "next" && currentIndex < visibleScreens.length - 1) {
            handleNavigation(currentIndex + 1);
          } else if (direction === "prev" && currentIndex > 0) {
            handleNavigation(currentIndex - 1);
          }
        }}
        onToggleFullscreen={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }}
      />
      
      {/* Always-visible control toggle button */}
      {!showControls && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={() => setShowControls(true)}
            size="sm"
            className="bg-primary/90 hover:bg-primary border-primary/20 backdrop-blur-xl shadow-lg"
          >
            <Users className="w-4 h-4 mr-2" />
            Show Session Controls
          </Button>
        </div>
      )}
      
      {/* Minimal Controls Toggle */}
      {showControls && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          <SessionControl
            onSessionChange={handleSessionChange}
            userId={user.id}
            userRole={userRole}
            slides={visibleScreens}
          />
          
          <Button
            onClick={openControlPanel}
            variant="outline"
            size="sm"
            className="border-primary/20 bg-background/80 backdrop-blur-xl"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Controls
          </Button>
          
          <PresentationModeToggle onToggle={(isFullscreen) => setShowControls(!isFullscreen)} />
        </div>
      )}

      <PresentationLayout
        currentScreen={currentScreen.id}
        totalScreens={visibleScreens.length}
        currentIndex={currentIndex}
        onNavigate={handleNavigation}
        title="AI for All Minds"
        duration={240}
        notes={currentScreen.notes || ""}
        mode="presenter"
        sessionCode={sessionCode || undefined}
        sessionId={sessionId || undefined}
        slideManager={
          <SlideManager
            slides={screens}
            config={config}
            onToggleVisibility={toggleVisibility}
            onMoveSlide={moveSlide}
            onResetToDefaults={resetToDefaults}
            onShowAll={showAll}
            onHideAll={hideAll}
          />
        }
      >
        <SlideRenderer
          screen={currentScreen}
          isFacilitator={true}
          sessionId={sessionId || undefined}
          userId={user?.id}
          showPollWidget={true}
        />
      </PresentationLayout>
    </>
  );
}
