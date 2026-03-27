import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Video Downloader | Unduh Video Bebas Watermark',
    short_name: 'VD Downloader',
    description: 'Platform unduh konten video dan foto favorit Anda dari TikTok, Instagram, X, Facebook dengan aman, gratis, dan cepat.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#18181b', // matching the dark zinc-900 theme
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
