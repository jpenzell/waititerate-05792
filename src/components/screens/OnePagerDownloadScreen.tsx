import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Share2, QrCode } from "lucide-react";

interface Props { sessionCode?: string }

export const OnePagerDownloadScreen = ({ sessionCode }: Props) => {
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}${sessionCode ? `/participate?code=${sessionCode}` : "/"}`
    : "https://ai4all.joshpenzell.com";
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(shareUrl)}`;

  return (
    <main className="min-h-screen flex items-center justify-center px-8 py-10 animate-fade-in">
      <section className="max-w-5xl w-full space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="mx-auto">Take it with you</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Don't let this stay in the room
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 space-y-4 border-l-4 border-l-primary text-center">
            <Download className="h-12 w-12 mx-auto text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Faculty One-Pager</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The curb-cut principle, three lenses for redesign, four Monday-morning
              prompts, and AI accommodation use-cases — on one printable page.
            </p>
            <Button asChild size="lg" className="w-full">
              <a href="/downloads/ai-for-all-minds-faculty-onepager.pdf" download>
                <Download className="h-5 w-5 mr-2" /> Download PDF
              </a>
            </Button>
          </Card>

          <Card className="p-8 space-y-4 border-l-4 border-l-accent text-center">
            <Share2 className="h-12 w-12 mx-auto text-accent" />
            <h2 className="text-2xl font-bold text-foreground">Share with a colleague</h2>
            <p className="text-sm text-muted-foreground">
              Send them this live session URL — they can review every slide and
              interactive on their own time.
            </p>
            <div className="flex flex-col items-center gap-2">
              <img src={qrSrc} alt="QR code to share session" className="rounded-md bg-white p-2" width={180} height={180} />
              <code className="text-xs font-mono text-muted-foreground break-all">{shareUrl}</code>
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/5 border-2 border-primary/30 text-center">
          <p className="text-lg md:text-xl text-foreground leading-relaxed">
            Continue the conversation: <strong className="text-primary">josh@imaginationapplied.com</strong>
          </p>
        </Card>
      </section>
    </main>
  );
};