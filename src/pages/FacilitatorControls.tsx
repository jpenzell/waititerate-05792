import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useRealtimeSession } from "@/hooks/useRealtimeSession";
import { useSlideConfig } from "@/hooks/useSlideConfig";
import { useCrossWindowSync } from "@/hooks/useCrossWindowSync";
import { SessionControl } from "@/components/SessionControl";
import { SlideManager } from "@/components/SlideManager";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { LogOut, BarChart, Clock, Activity } from "lucide-react";
import { toast } from "sonner";

const screens = [
  { id: "LD0.0", title: "Title - Don't Wait, Iterate", duration: 2, notes: "Set the stage for the L&D measurement session. Opening energy." },
  { id: "LD0.5", title: "Live Exercise: One Photo, Infinite Data", duration: 10, notes: "LIVE INTERACTIVE OPENER: 1) Everyone takes photo 2) Human pattern spotting 3) AI reveals patterns 4) Data brainstorm 5) AI shows measurement abundance." },
  { id: "LD1.0", title: "The Paradigm Shift", duration: 4, notes: "Now that they've experienced it, show the theory: scarcity era vs abundance era comparison.", hasPoll: true },
  { id: "LD2.0", title: "Old World - Waterfall", duration: 4, notes: "Animated timeline showing the 8-12 month traditional process. Emphasize why measurement scarcity bred risk aversion." },
  { id: "LD3.0", title: "New World - Iteration", duration: 5, notes: "Interactive timeline showing 5 iterations in 5 weeks. Let audience control the pace and see improvements compound." },
  { id: "LD4.5", title: "Rehearsal, Not Performance", duration: 5, notes: "Reframe iteration as safe rehearsal rather than risky performance. Theater metaphor showing the mindset shift." },
  { id: "LD4.0", title: "Make a Mess (On Purpose)", duration: 4, notes: "Challenge old beliefs. Click to reveal each principle. Give permission to ship imperfect work." },
  { id: "LD5.5", title: "Measure the Mess (Because You Can)", duration: 7, notes: "Showcase real AI measurement tools: xAPI/LRS, AI tutors, adaptive systems. Key stat: xAPI increases data points from 5-10 to 50-100+ per learner.", hasPoll: true },
  { id: "LD5.0", title: "Interactive Cycle Demo", duration: 6, notes: "Hands-on simulation. Walk through launch → measure → fix → repeat. Show live metrics improving." },
  { id: "LD6.5", title: "The Freedom to Try Anything", duration: 6, notes: "Real examples: Duolingo ran 2,000+ experiments over 3 years. Coursera tests course imagery impact. Dutch retail company achieved 400% ROI." },
  { id: "LD6.0", title: "The Trick: Acting On Data", duration: 4, notes: "Critical distinction: measurement abundance doesn't mean you know what to do—it means you can learn faster." },
  { id: "LD6.7", title: "Live Rehearsal Exercise", duration: 10, notes: "Hands-on activity: participants choose from 3 scenarios and apply the messy → measure → fix cycle. Includes discussion prompts and share-out.", hasPoll: true },
  { id: "LD7.0", title: "Your New Design Process", duration: 4, notes: "Four actionable shifts. Bridge to next session. End with Q&A prompt." },
];

export default function FacilitatorControls() {
  const navigate = useNavigate();
  const { user, loading, userRole, displayName, signOut } = useAuth();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionCode, setSessionCode] = useState<string | null>(null);
  const [participantCount, setParticipantCount] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [activities, setActivities] = useState<Array<{id: string, type: string, timestamp: string}>>([]);

  const { currentSlideId } = useRealtimeSession(sessionCode || undefined);
  
  const { state, updateState } = useCrossWindowSync({
    currentSlideId: screens[0].id,
    presentationMode: false,
    sessionId,
    sessionCode,
  });

  // Sync session state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("facilitator-state");
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.sessionId) setSessionId(parsed.sessionId);
        if (parsed.sessionCode) setSessionCode(parsed.sessionCode);
      } catch (e) {
        console.error("Failed to parse saved state:", e);
      }
    }
  }, []);

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

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    } else if (!loading && user && userRole === "participant") {
      toast.error("Facilitator access only");
      navigate("/participate");
    }
  }, [user, loading, userRole, navigate]);

  // Track current slide from realtime
  useEffect(() => {
    if (currentSlideId) {
      const index = visibleScreens.findIndex((s) => s.id === currentSlideId);
      if (index !== -1) {
        setCurrentSlideIndex(index);
        updateState({ currentSlideId });
      }
    }
  }, [currentSlideId, visibleScreens]);

  // Count participants
  useEffect(() => {
    if (!sessionId) return;

    const countParticipants = async () => {
      const { count } = await supabase
        .from("poll_responses")
        .select("user_id", { count: "exact", head: true })
        .eq("poll_id", sessionId);
      
      setParticipantCount(count || 0);
    };

    countParticipants();
    const interval = setInterval(countParticipants, 10000);
    return () => clearInterval(interval);
  }, [sessionId]);

  // Track elapsed time
  useEffect(() => {
    if (!sessionCode) return;
    
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [sessionCode]);

  // Monitor recent activities (poll responses, photo uploads)
  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel(`activities:${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "poll_responses",
          filter: `poll_id=eq.${sessionId}`,
        },
        (payload) => {
          setActivities(prev => [
            { id: payload.new.id, type: "poll_response", timestamp: new Date().toISOString() },
            ...prev.slice(0, 9),
          ]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "photo_uploads",
        },
        (payload) => {
          setActivities(prev => [
            { id: payload.new.id, type: "photo_upload", timestamp: new Date().toISOString() },
            ...prev.slice(0, 9),
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const handleSessionChange = (newSessionId: string | null, newSessionCode: string | null) => {
    setSessionId(newSessionId);
    setSessionCode(newSessionCode);
    updateState({ sessionId: newSessionId, sessionCode: newSessionCode });
    if (newSessionCode) {
      setElapsedTime(0);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentScreen = visibleScreens[currentSlideIndex];
  const totalDuration = visibleScreens.reduce((sum, screen) => sum + screen.duration, 0) * 60;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user || !userRole) return null;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <Card className="p-4 bg-background/80 backdrop-blur-xl border-primary/20">
          <h1 className="text-xl font-display font-bold text-primary mb-1">
            Facilitator Controls
          </h1>
          {displayName && (
            <p className="text-sm text-muted-foreground">{displayName}</p>
          )}
        </Card>

        {/* Session Control */}
        <SessionControl
          onSessionChange={handleSessionChange}
          userId={user.id}
          userRole={userRole}
          slides={screens}
        />

        {sessionCode && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-background/80 backdrop-blur-xl border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Participants</span>
                </div>
                <p className="text-2xl font-display font-bold text-primary">
                  {participantCount}
                </p>
              </Card>

              <Card className="p-4 bg-background/80 backdrop-blur-xl border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Time</span>
                </div>
                <p className="text-2xl font-display font-bold text-primary">
                  {formatTime(elapsedTime)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  / {formatTime(totalDuration)} planned
                </p>
              </Card>
            </div>

            {/* Current Slide Info */}
            {currentScreen && (
              <Card className="p-4 bg-background/80 backdrop-blur-xl border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Current Slide</span>
                  <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                    {currentScreen.id}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">
                  {currentScreen.title}
                </h3>
                <Separator className="my-3" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Speaker Notes:</p>
                  <ScrollArea className="h-24">
                    <p className="text-sm">{currentScreen.notes}</p>
                  </ScrollArea>
                </div>
                {currentScreen.hasPoll && (
                  <div className="mt-3 p-2 bg-primary/10 rounded text-sm text-primary">
                    📊 Poll active on this slide
                  </div>
                )}
              </Card>
            )}

            {/* Recent Activity */}
            <Card className="p-4 bg-background/80 backdrop-blur-xl border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-primary" />
                <h3 className="font-display font-bold">Recent Activity</h3>
              </div>
              <ScrollArea className="h-32">
                {activities.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No activity yet</p>
                ) : (
                  <div className="space-y-2">
                    {activities.map((activity) => (
                      <div key={activity.id} className="text-xs flex items-center justify-between">
                        <span>
                          {activity.type === "poll_response" ? "📊 Poll response" : "📸 Photo uploaded"}
                        </span>
                        <span className="text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </Card>

            {/* Slide Manager */}
            <SlideManager
              slides={screens}
              config={config}
              onToggleVisibility={toggleVisibility}
              onMoveSlide={moveSlide}
              onResetToDefaults={resetToDefaults}
              onShowAll={showAll}
              onHideAll={hideAll}
            />
          </>
        )}

        {/* Sign Out */}
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="w-full border-primary/20"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
