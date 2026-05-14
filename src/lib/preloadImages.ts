/**
 * Warm the browser's image cache at app boot.
 *
 * Three layers of preloading:
 *  1. import.meta.glob with eager:true ensures Vite bundles the assets and
 *     emits hashed URLs before any component renders.
 *  2. <link rel="preload" as="image"> injected in <head> tells the browser
 *     to fetch every slide image at high priority during initial paint.
 *  3. new Image() + img.decode() forces the bytes to be downloaded AND
 *     fully decoded into a bitmap, so a later CSS background-image or <img>
 *     paints on the very first frame.
 */
const modules = import.meta.glob(
  "/src/assets/*.{jpg,jpeg,png,webp,avif,svg}",
  { eager: true, import: "default" }
);

const decoded = new Map<string, HTMLImageElement>();

export const preloadImages = () => {
  if (typeof window === "undefined") return;

  for (const url of Object.values(modules) as string[]) {
    // 2. <link rel="preload"> for high-priority browser fetch
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);

    // 3. Decode and keep a reference so the bitmap stays in memory
    const img = new Image();
    img.src = url;
    decoded.set(url, img);
    if (typeof img.decode === "function") {
      img.decode().catch(() => {
        /* decode is best-effort; ignore failures */
      });
    }
  }
};

export const getPreloadedImage = (url: string) => decoded.get(url);
