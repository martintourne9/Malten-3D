import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrintCost 3D",
  description: "Costos claros y precios rentables para impresión 3D.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "PrintCost 3D" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#0f6b4f" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
