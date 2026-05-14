import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { preloadImages } from "./lib/preloadImages";

createRoot(document.getElementById("root")!).render(<App />);

// Warm the image cache so slide assets are ready before the presenter advances.
preloadImages();
