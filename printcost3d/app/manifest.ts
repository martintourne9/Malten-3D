import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PrintCost 3D",
    short_name: "PrintCost 3D",
    description: "Calculadora de costos y rentabilidad para impresión 3D.",
    start_url: "/app",
    display: "standalone",
    background_color: "#f5f7f6",
    theme_color: "#0f6b4f",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" }
    ]
  };
}
