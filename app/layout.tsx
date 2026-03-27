import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#18181b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Video Downloader | Unduh Video Bebas Watermark",
  description: "Platform unduh konten video dan foto favorit Anda dari TikTok, Instagram, X, Facebook dengan aman, gratis, dan cepat.",
  keywords: ["video downloader", "tiktok downloader", "instagram reel downloader", "twitter video downloader", "no watermark"],
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Video Downloader Tanpa Watermark",
    description: "Unduh video TikTok, Instagram, X/Twitter, dan Facebook tanpa repot.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
