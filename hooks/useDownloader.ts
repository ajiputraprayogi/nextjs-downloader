"use client";

import { useState, useEffect } from "react";
import { PlatformConfig, PLATFORMS } from "@/config/platforms";
import { MediaResponse } from "@/types/downloader";
import { detectPlatformFromUrl } from "@/utils/downloader";

export function useDownloader() {
  const [activePlatform, setActivePlatform] = useState<PlatformConfig>(PLATFORMS[0]);
  const [isMounted, setIsMounted] = useState(false);
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState<MediaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("preferredAppPlatform");
    if (saved) {
      const found = PLATFORMS.find((p) => p.id === saved);
      if (found) {
        setActivePlatform(found);
      }
    }
  }, []);

  const changePlatform = (platform: PlatformConfig) => {
    setActivePlatform(platform);
    localStorage.setItem("preferredAppPlatform", platform.id);
    setVideo(null); // Reset hasil saat ganti tab
  };

  const handleDownload = async () => {
    if (!url) return;

    // Deteksi otomatis platform dari URL untuk auto-switch Tab
    const detected = detectPlatformFromUrl(url);
    let currentPlatform = activePlatform;

    if (detected && detected !== activePlatform.id) {
      const found = PLATFORMS.find((p) => p.id === detected);
      if (found) {
        currentPlatform = found;
        setActivePlatform(found);
        localStorage.setItem("preferredAppPlatform", found.id);
      }
    }

    setLoading(true);
    setVideo(null);
    setError(null);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8081";
    const endpoint = `${API_BASE_URL}/download`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      console.log("RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.error || "Gagal menghubungi server");
      }

      if (data && data.options) {
        setVideo(data);
      } else {
        throw new Error(`Gagal mengambil video dari ${currentPlatform.name}`);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error fetch backend");
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = (link: string, type: string, key: string) => {
    if (!link) {
      setError("Format tidak tersedia");
      return;
    }

    setDownloading(key);
    setDownloadSuccess(null);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8081";
    const endpoint = `${API_BASE_URL}/download-file?url=${encodeURIComponent(link)}&dl=1`;

    // Menggunakan window.location.href sesuai panduan integrasi proxy cors backend
    window.location.href = endpoint;

    setTimeout(() => {
      setDownloading(null);
      setDownloadSuccess(key);
      setTimeout(() => setDownloadSuccess(null), 3000);
    }, 1500);
  };

  const resetTarget = () => {
    setUrl("");
    setVideo(null);
    setError(null);
  };

  return {
    isMounted,
    activePlatform,
    url,
    setUrl,
    video,
    loading,
    error,
    downloading,
    downloadSuccess,
    changePlatform,
    handleDownload,
    downloadFile,
    resetTarget,
  };
}
