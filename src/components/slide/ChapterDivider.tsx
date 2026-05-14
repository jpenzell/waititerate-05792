import { SlideHero } from "./SlideHero";

interface Props {
  number: string;        // e.g. "02"
  kicker?: string;       // e.g. "WHY DIFFERENCE MATTERS"
  title: string;         // e.g. "Same data, different minds."
  image: string;
  alt: string;
}

/**
 * Cinematic chapter marker — large chapter number, theme line, hero image.
 * Designed to give the room a beat between sections.
 */
export const ChapterDivider = ({ number, kicker, title, image, alt }: Props) => {
  return (
    <SlideHero image={image} alt={alt} position="left" scrim="left" ariaLabel={`Chapter ${number}: ${title}`}>
      <div className="space-y-8 max-w-3xl">
        <div className="flex items-baseline gap-6">
          <span className="font-mono text-7xl md:text-9xl font-black text-white/90 leading-none">
            {number}
          </span>
          {kicker && (
            <span className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-white/70 pb-3">
              {kicker}
            </span>
          )}
        </div>
        <div className="h-[3px] w-32 bg-white/80 rounded-full" />
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] text-white">
          {title}
        </h1>
      </div>
    </SlideHero>
  );
};