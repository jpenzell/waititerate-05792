import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Users, Copy, Check, Play, StopCircle, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { seedPollsForSession } from "@/utils/pollSeeder";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SessionControlProps {
  onSessionChange: (sessionId: string | null, sessionCode: string | null, isPresenter: boolean) => void;
  userId: string;
  userRole: "presenter" | "participant";
  slides: any[];
}

export const SessionControl = ({ onSessionChange, userId, userRole, slides }: SessionControlProps) => {
  const [sessionCode, setSessionCode] = useState("");
  const [activeSession, setActiveSession] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (userRole === "presenter") {
      checkActiveSession();
    }
  }, [userRole, userId]);

  const checkActiveSession = async () => {
    const { data } = await supabase
      .from("presentation_sessions")
      .select("*")
      .eq("presenter_id", userId)
      .eq("is_active", true)
      .single();

    if (data) {
      setActiveSession(data);
      onSessionChange(data.id, data.session_code, true);
    }
  };

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const startSession = async () => {
    const code = generateCode();
    
    const { data, error } = await supabase
      .from("presentation_sessions")
      .insert({
        presenter_id: userId,
        session_code: code,
        current_slide_id: "LD0.0",
      })
      .select()
      .single();

    if (error) {
      toast.error("Failed to start session");
      return;
    }

    // Seed polls for the session
    try {
      await seedPollsForSession(data.id, slides);
    } catch (error) {
      console.error("Failed to seed polls:", error);
    }

    setActiveSession(data);
    onSessionChange(data.id, code, true);
    toast.success("Session started!");
  };

  const endSession = async () => {
    if (!activeSession) return;

    await supabase
      .from("presentation_sessions")
      .update({ is_active: false })
      .eq("id", activeSession.id);

    setActiveSession(null);
    onSessionChange(null, null, false);
    toast.success("Session ended");
  };

  const joinSession = async () => {
    const { data, error } = await supabase
      .from("presentation_sessions")
      .select("*")
      .eq("session_code", sessionCode.toUpperCase())
      .eq("is_active", true)
      .single();

    if (error || !data) {
      toast.error("Session not found");
      return;
    }

    onSessionChange(data.id, data.session_code, false);
    toast.success("Joined session!");
  };

  const copyCode = () => {
    if (activeSession?.session_code) {
      navigator.clipboard.writeText(activeSession.session_code);
      setCopied(true);
      toast.success("Code copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getJoinUrl = () => {
    if (!activeSession?.session_code) return "";
    return `${window.location.origin}/auth?session=${activeSession.session_code}`;
  };

  if (userRole === "presenter") {
    return (
      <Card className="p-6 bg-background backdrop-blur-xl border-primary/20 shadow-lg z-50">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-display font-bold">Session Control</h3>
        </div>
        
        {activeSession ? (
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <Label className="text-sm text-muted-foreground mb-2 block">Session Code</Label>
              <div className="flex items-center gap-2 mb-3">
                <code className="text-2xl font-mono font-bold text-primary flex-1">
                  {activeSession.session_code}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyCode}
                  className="border-primary/20"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-primary/20"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Show QR Code
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-background/95 backdrop-blur-xl border-primary/20">
                  <DialogHeader>
                    <DialogTitle className="text-center gradient-text">
                      Scan to Join Session
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center gap-4 p-6">
                    <div className="bg-white p-4 rounded-lg">
                      <QRCodeSVG
                        value={getJoinUrl()}
                        size={256}
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Session Code</p>
                      <code className="text-xl font-mono font-bold text-primary">
                        {activeSession.session_code}
                      </code>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Button
              onClick={endSession}
              variant="destructive"
              className="w-full"
            >
              <StopCircle className="w-4 h-4 mr-2" />
              End Session
            </Button>
          </div>
        ) : (
          <Button
            onClick={startSession}
            className="w-full bg-gradient-primary"
          >
            <Play className="w-4 h-4 mr-2" />
            Start New Session
          </Button>
        )}
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-background backdrop-blur-xl border-primary/20 shadow-lg z-50">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-display font-bold">Join Session</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="code">Enter Session Code</Label>
          <Input
            id="code"
            value={sessionCode}
            onChange={(e) => setSessionCode(e.target.value)}
            placeholder="ABC123"
            className="mt-2 font-mono uppercase"
          />
        </div>
        <Button
          onClick={joinSession}
          disabled={sessionCode.length < 6}
          className="w-full bg-gradient-primary"
        >
          Join Session
        </Button>
      </div>
    </Card>
  );
};
