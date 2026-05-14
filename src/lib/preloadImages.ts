/**
 * Warm the browser's image cache at app boot. Vite eagerly bundles all
 * matched assets, so referencing them here also ensures they're hashed and
 * downloaded before any slide tries to render them.
 */
const modules = import.meta.glob("/src/assets/*.{jpg,jpeg,png,webp,avif,svg}", {
  eager: true,
  import: "default",
});

export const preloadImages = () => {
  if (typeof window === "undefined") return;
  for (const url of Object.values(modules) as string[]) {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
  }
};