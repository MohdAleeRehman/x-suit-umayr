import type { Metadata, Viewport } from "next";
import { Source_Sans_3, JetBrains_Mono } from "next/font/google";
import "admin-lte/dist/css/adminlte.min.css";
import "./globals.css";
import { PWARegister } from "@/components/pwa/PWARegister";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const jetMono = JetBrains_Mono({
  variable: "--font-jet-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "X Suite | Superadmin",
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
    <html
      lang="en"
      className={`${sourceSans.variable} ${jetMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
