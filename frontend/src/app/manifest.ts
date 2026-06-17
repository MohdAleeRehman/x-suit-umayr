import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "X Suite",
    short_name: "X Suite",
    description: "Single-superadmin real estate operations workspace",
    start_url: "/login",
    display: "standalone",
    background_color: "#f4f7fb",
    theme_color: "#db0011",
    lang: "en",
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
