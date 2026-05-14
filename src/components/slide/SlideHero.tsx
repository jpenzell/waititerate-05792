import { ReactNode } from "react";

interface Props {
  image: string;
  alt: string;
  /** Where the foreground content lives. Defaults to bottom-left, Zoox-style. */
  position?: "bottom" | "center" | "right" | "left";
  /** Scrim direction. */
  scrim?: "bottom" | "left" | "right" | "full";
  children: ReactNode;
  ariaLabel?: string;
}

/**
 * Full-bleed hero image with gradient scrim and foreground content slot.
 * Generalises the Zoox slide pattern. Image paints synchronously (eager,
 * fetchpriority=high, decoding=sync) so there is no load flash.
 */
export const SlideHero = ({
  image,
  alt,
  position = "bottom",
  scrim = "bottom",
  children,
  ariaLabel,
}: Props) => {
  const scrimClass = {
    bottom: "inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/60 to-transparent",
    left:   "inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/90 via-black/55 to-transparent",
    right:  "inset-y-0 right-0 w-2/3 bg-gradient-to-l from-black/90 via-black/55 to-transparent",
    full:   "inset-0 bg-black/55",
  }[scrim];

  const contentClass = {
    bottom: "absolute inset-x-0 bottom-0 p-10 md:p-16",
    center: "absolute inset-0 flex items-center justify-center p-10 md:p-16 text-center",
    right:  "absolute inset-y-0 right-0 w-3/5 flex items-center p-10 md:p-16",
    left:   "absolute inset-y-0 left-0 w-3/5 flex items-center p-10 md:p-16",
  }[position];

  return (
    <main
      className="h-full w-full relative overflow-hidden bg-black animate-fade-in"
      role="main"
      aria-label={ariaLabel}
    >
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        // @ts-expect-error - non-standard attribute supported by Chromium
        fetchpriority="high"
        decoding="sync"
        draggable={false}
      />
      <div className={`absolute pointer-events-none ${scrimClass}`} aria-hidden="true" />
      <div className={`${contentClass} text-white`}>{children}</div>
    </main>
  );
};