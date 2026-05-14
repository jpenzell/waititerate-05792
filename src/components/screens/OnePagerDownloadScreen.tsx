import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { SlideHero } from "@/components/slide";
import horizon from "@/assets/slides/horizon.jpg";

interface Props { sessionCode?: string }

export const OnePagerDownloadScreen = ({ sessionCode }: Props) => {
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}${sessionCode ? `/participate?code=${sessionCode}` : "/"}`
    : "https://ai4all.joshpenzell.com";
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(shareUrl)}`;

  return (
    <SlideHero
      image={horizon}
      alt="Soft pink and amber dawn over rolling hills"
      position="left"
      scrim="left"
      ariaLabel="Take it with you"
    >
      <div className="grid md:grid-cols-[1.6fr_1fr] gap-12 items-center w-full max-w-6xl">
        <div className="space-y-8">
          <p className="text-base md:text-xl uppercase tracking-[0.4em] text-white/70">
            Take it with you
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05]">
            One page.
            <br />
            <span className="text-accent">One Monday at a time.</span>
          </h1>
          <Button asChild size="lg" className="text-xl py-8 px-8">
            <a href="/downloads/ai-for-all-minds-faculty-onepager.pdf" download>
              <Download className="h-6 w-6 mr-3" /> Download the faculty one-pager
            </a>
          </Button>
          <p className="text-2xl md:text-3xl text-white/90 font-mono">
            josh@imaginationapplied.com
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <img
            src={qrSrc}
            alt="QR code to revisit the session"
            className="rounded-md bg-white p-3"
            width={260}
            height={260}
          />
          <p className="text-lg md:text-base font-mono uppercase tracking-[0.3em] text-white/70">
            Scan to revisit
          </p>
        </div>
      </div>
    </SlideHero>
  );
};