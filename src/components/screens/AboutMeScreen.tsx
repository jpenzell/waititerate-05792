import { useState, useRef } from "react";
import { Sparkles } from "lucide-react";
import { SlideShell } from "@/components/slide";
import joshHeadshot from "@/assets/josh-headshot.jpeg";
import logoAmazon from "@/assets/logo-amazon.jpeg";
import logoAlexa from "@/assets/logo-alexa.png";
import logoSkillsoft from "@/assets/logo-skillsoft.jpg";
import logoSdc from "@/assets/logo-sdc.webp";
import logoZillow from "@/assets/logo-zillow.png";
import logoZoox from "@/assets/logo-zoox.avif";
import logoOffBroadway from "@/assets/logo-offbroadway.png";
import logoNorthwestern from "@/assets/logo-northwestern.png";
import logoBrooklyn from "@/assets/logo-brooklyn.png";
import logoUIUC from "@/assets/logo-uiuc.webp";

interface DraggableLogoProps {
  src: string;
  alt: string;
  initialX: number;
  initialY: number;
  height: string;
  zIndex?: number;
}

const DraggableLogo = ({ src, alt, initialX, initialY, height, zIndex = 1 }: DraggableLogoProps) => {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [dragging, setDragging] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const drag = useRef<{ sx: number; sy: number; ix: number; iy: number } | null>(null);

  const start = (cx: number, cy: number) => {
    setDragging(true);
    drag.current = { sx: cx, sy: cy, ix: pos.x, iy: pos.y };
  };
  const move = (cx: number, cy: number) => {
    if (!dragging || !drag.current) return;
    setPos({ x: drag.current.ix + (cx - drag.current.sx), y: drag.current.iy + (cy - drag.current.sy) });
  };
  const end = () => {
    setDragging(false);
    drag.current = null;
    setWiggle(true);
    setTimeout(() => setWiggle(false), 400);
  };

  return (
    <div
      className={`absolute flex items-center justify-center px-3 py-2 rounded-xl bg-white border border-border/50 shadow-md cursor-grab active:cursor-grabbing select-none transition-transform ${dragging ? "scale-110 shadow-xl" : ""} ${wiggle ? "animate-pulse" : ""}`}
      style={{
        left: pos.x,
        top: pos.y,
        zIndex: dragging ? 100 : zIndex,
        transform: `translate(-50%, -50%) ${dragging ? "rotate(2deg)" : ""}`,
      }}
      onMouseDown={(e) => { e.preventDefault(); start(e.clientX, e.clientY); }}
      onMouseMove={(e) => move(e.clientX, e.clientY)}
      onMouseUp={end}
      onMouseLeave={() => dragging && end()}
      onTouchStart={(e) => { const t = e.touches[0]; start(t.clientX, t.clientY); }}
      onTouchMove={(e) => { const t = e.touches[0]; move(t.clientX, t.clientY); }}
      onTouchEnd={end}
    >
      <img src={src} alt={alt} className={`${height} w-auto object-contain pointer-events-none`} />
    </div>
  );
};

/** LD1.5 — About Me. Josh intro with draggable career logos. */
export const AboutMeScreen = () => (
  <SlideShell tone="indigo" align="center" ariaLabel="About Josh Penzell">
    <div className="relative z-10 w-full max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10 items-center">
        {/* Left: Photo + name */}
        <div className="flex-shrink-0 flex flex-col items-center gap-5">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 border border-primary/30 rounded-full">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-primary font-semibold tracking-wide text-sm uppercase">
              Your guide today
            </span>
          </div>
          <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-primary/30 shadow-2xl">
            <img src={joshHeadshot} alt="Josh Penzell" className="w-full h-full object-cover" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black text-foreground">Josh Penzell</h1>
            <p className="text-lg text-muted-foreground mt-1">
              MBA + MFA · Strategy meets creativity
            </p>
            <p className="text-base text-muted-foreground/80 italic mt-2 max-w-sm">
              Aphantasic, autistic, ADHD — and an AI advisor who thinks the next decade belongs to ND minds.
            </p>
          </div>
        </div>

        {/* Right: Draggable career logos */}
        <div className="relative h-[360px] md:h-[420px] flex-1 w-full min-w-[320px]">
          <p className="absolute top-0 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground/70 font-mono">
            Drag the logos around
          </p>
          {/* Center quote card — logos arranged around it */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] max-w-[340px] w-[80%] bg-card/90 backdrop-blur border border-border/60 rounded-2xl shadow-xl p-5 space-y-2 pointer-events-none">
            <p className="text-sm md:text-base text-foreground/90 italic leading-snug border-l-2 border-primary/50 pl-3">
              "…you over-index on big thinking…"
            </p>
            <p className="text-sm md:text-base text-foreground/90 italic leading-snug border-l-2 border-accent/50 pl-3">
              "…you're on a jet ski and the rest of the team is on a barge…"
            </p>
            <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/70 pl-3 pt-1">
              — actual feedback I've gotten
            </p>
          </div>
          {/* Logos arranged around (not under) the centered quote card */}
          {/* Top row */}
          <DraggableLogo src={logoNorthwestern} alt="Northwestern"     initialX={110} initialY={55}  height="h-11" />
          <DraggableLogo src={logoBrooklyn}    alt="Brooklyn College"  initialX={290} initialY={45}  height="h-11" />
          <DraggableLogo src={logoUIUC}        alt="UIUC"              initialX={470} initialY={55}  height="h-11" />
          {/* Left side */}
          <DraggableLogo src={logoAmazon}      alt="Amazon"            initialX={55}  initialY={170} height="h-10" />
          <DraggableLogo src={logoSkillsoft}   alt="Skillsoft"         initialX={55}  initialY={260} height="h-10" />
          {/* Right side */}
          <DraggableLogo src={logoZillow}      alt="Zillow"            initialX={530} initialY={170} height="h-10" />
          <DraggableLogo src={logoAlexa}       alt="Alexa"             initialX={530} initialY={260} height="h-10" />
          {/* Bottom row */}
          <DraggableLogo src={logoSdc}         alt="SDC"               initialX={140} initialY={375} height="h-10" />
          <DraggableLogo src={logoOffBroadway} alt="Off-Broadway"      initialX={300} initialY={385} height="h-10" />
          <DraggableLogo src={logoZoox}        alt="Zoox"              initialX={460} initialY={375} height="h-10" />
        </div>
      </div>
    </div>
  </SlideShell>
);