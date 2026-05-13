import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";

interface Props { sessionCode?: string }

export const OnePagerDownloadScreen = ({ sessionCode }: Props) => {
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}${sessionCode ? `/participate?code=${sessionCode}` : "/"}`
    : "https://ai4all.joshpenzell.com";
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(shareUrl)}`;

  return (
    <main className="min-h-screen flex items-center justify-center px-8 py-10 animate-fade-in">
      <section className="max-w-6xl w-full space-y-10">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-center leading-tight">
          Take it with you
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-10 space-y-5 border-l-8 border-l-primary text-center">
            <Download className="h-20 w-20 mx-auto text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Faculty One-Pager</h2>
            <Button asChild size="lg" className="w-full text-xl py-8">
              <a href="/downloads/ai-for-all-minds-faculty-onepager.pdf" download>
                <Download className="h-6 w-6 mr-3" /> Download PDF
              </a>
            </Button>
          </Card>

          <Card className="p-10 space-y-5 border-l-8 border-l-accent text-center">
            <Share2 className="h-20 w-20 mx-auto text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Share the session</h2>
            <div className="flex flex-col items-center gap-3">
              <img src={qrSrc} alt="QR code to share session" className="rounded-md bg-white p-2" width={200} height={200} />
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/5 border-2 border-primary/30 text-center">
          <p className="text-2xl md:text-3xl text-foreground">
            <strong className="text-primary">josh@imaginationapplied.com</strong>
          </p>
        </Card>
      </section>
    </main>
  );
};