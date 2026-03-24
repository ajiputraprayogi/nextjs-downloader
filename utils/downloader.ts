import { PlatformConfig } from "@/config/platforms";

export const getDynamicOptionConfig = (key: string, platform: PlatformConfig) => {
  const isTikTok = platform.id === "tiktok";
  // Default styling for fallback options natively matches platform theme
  let config = {
    label: `Download ${key.toUpperCase()}`,
    icon: "⬇️",
    className: `w-full bg-gradient-to-r ${platform.theme.gradient} text-white py-3.5 px-6 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-between group`,
    type: "mp4",
  };

  switch (key) {
    case "nowm":
    case "video":
      config.label = isTikTok ? "Tanpa Watermark" : "Download Video";
      config.icon = "🎥";
      config.className = `w-full bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-900 py-3.5 px-6 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-between group`;
      break;
    case "hd":
      config.label = isTikTok ? "Video HD Tanpa Watermark" : "Download Video HD";
      config.icon = "🎬";
      // This will use the default className which is the platform's gradient!
      break;
    case "sd":
      config.label = "Download Video Biasa";
      config.icon = "📱";
      config.className = `w-full bg-zinc-800 dark:bg-zinc-200 hover:bg-zinc-700 dark:hover:bg-white text-zinc-100 dark:text-zinc-900 py-3.5 px-6 rounded-2xl font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-between group`;
      break;
    case "watermark":
    case "wm":
      config.label = "Video dengan Watermark";
      config.icon = "🏷️";
      config.className = `w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 py-3.5 px-6 rounded-2xl font-bold transition-all shadow-sm active:scale-[0.98] flex items-center justify-between group`;
      break;
    case "mp3":
    case "audio":
      config.label = "Audio MP3";
      config.icon = "🎵";
      config.type = "mp3";
      config.className = `w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-600 py-3.5 px-6 rounded-2xl font-bold transition-all shadow-sm active:scale-[0.98] flex items-center justify-between group`;
      break;
  }
  return config;
};

export const detectPlatformFromUrl = (url: string): string | null => {
  try {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes("tiktok.com")) return "tiktok";
    if (lowerUrl.includes("instagram.com")) return "instagram";
    if (lowerUrl.includes("facebook.com") || lowerUrl.includes("fb.watch") || lowerUrl.includes("fb.com")) return "facebook";
    if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com")) return "x";
  } catch (e) {
    // abaikan jika bukan string valid
  }
  return null;
};
