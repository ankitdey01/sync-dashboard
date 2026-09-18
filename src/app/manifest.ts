import type { MetadataRoute } from "next";

// Web App Manifest: powers "Add to Home Screen" / install prompts on
// Android (Chrome reads icons + colors from here). Served at /manifest.webmanifest.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sync Music",
    short_name: "Sync",
    description:
      "Sync plays music right inside your Discord Server.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
