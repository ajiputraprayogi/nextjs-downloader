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
  metadataBase: new URL("https://sosmedify.com"),
  title: "Sosmedify | Download Video TikTok, IG, FB Tanpa Watermark",
  description: "Platform terpercaya untuk unduh konten video favorit Anda dari TikTok, Instagram Reels, X (Twitter), dan Facebook secara gratis, cepat, kualitas HD, tanpa watermark. Dipersembahkan oleh Sosmedify.com",
  keywords: [
    "sosmedify", 
    "video downloader", 
    "tiktok downloader", 
    "instagram reel downloader", 
    "twitter video downloader", 
    "download video fb", 
    "unduh video tanpa watermark", 
    "download video tiktok",
    "snaptik alternative"
  ],
  authors: [{ name: "Sosmedify Team", url: "https://sosmedify.com" }],
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Sosmedify - Video Downloader Tanpa Watermark",
    description: "Unduh video TikTok, Instagram, X/Twitter, dan Facebook tanpa repot di Sosmedify.com. Akses gratis sepuasnya!",
    type: "website",
    url: "https://sosmedify.com",
    siteName: "Sosmedify",
    locale: "id_ID"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sosmedify | Spesialis Download Video",
    description: "Download video dari TikTok, IG, FB, dan X dengan kualitas tinggi secara gratis.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Sosmedify",
    "url": "https://sosmedify.com",
    "description": "Platform gratis terpercaya untuk download video TikTok tanpa watermark, Instagram Reels, foto, video Facebook, dan X.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
