import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "@adminlte/react/css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "quill/dist/quill.snow.css";
import "flatpickr/dist/flatpickr.min.css";
import "tom-select/dist/css/tom-select.bootstrap5.css";
import "jsvectormap/dist/jsvectormap.min.css";
import "./globals.css";
import { PWARegister } from "@/components/pwa/PWARegister";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "X Suite Real Estate Dashboard",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/icon-192.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "X Suite",
  },
};

export const viewport: Viewport = {
  themeColor: "#db0011",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.css"
        />
      </head>
      <body>
        <PWARegister />
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
