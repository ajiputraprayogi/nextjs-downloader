"use client";

import { useDownloader } from "@/hooks/useDownloader";
import PlatformTabs from "./PlatformTabs";
import URLInputSection from "./URLInputSection";
import ResultDisplay from "./ResultDisplay";

export default function DownloaderForm() {
  const {
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
  } = useDownloader();

  // Mencegah "glitch" atau flash UI saat mencocokkan LocalStorage (Client) vs Server HTML
  if (!isMounted) {
    return (
      <div className="w-full max-w-xl bg-white/40 dark:bg-zinc-800/40 rounded-[2rem] h-[600px] animate-pulse backdrop-blur-xl border border-gray-100 dark:border-zinc-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"></div>
    );
  }

  return (
    <div className="w-full max-w-xl bg-white dark:bg-zinc-800/80 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-black/40 backdrop-blur-xl overflow-hidden transition-all border border-gray-100 dark:border-zinc-700/50">
      <div className="p-8 sm:p-10">

        {/* HEADER SECTION */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr ${activePlatform.theme.gradient} mb-6 shadow-lg shadow-black/5 transition-all duration-500`}>
            <div className="text-white scale-125">
              {activePlatform.icon}
            </div>
          </div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 transition-colors duration-300 ${activePlatform.theme.text}`}>
            {activePlatform.name} Downloader
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base font-medium">
            Unduh konten dari platform favorit Anda tanpa repot
          </p>
        </div>

        {/* PLATFORM TABS */}
        <PlatformTabs 
          activePlatform={activePlatform} 
          changePlatform={changePlatform} 
        />

        {/* URL INPUT SECTION */}
        <URLInputSection 
          url={url} 
          setUrl={setUrl} 
          activePlatform={activePlatform} 
          loading={loading} 
          handleDownload={handleDownload} 
          resetTarget={resetTarget}
        />

        {/* ERROR SECTION */}
        {error && !loading && (
          <div className="mt-8 p-5 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-2 bg-red-100 dark:bg-red-500/20 rounded-full text-red-600 dark:text-red-400 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
            </div>
            <div className="flex-1">
              <h3 className="text-red-800 dark:text-red-400 font-bold text-sm sm:text-base mb-1">Terjadi Kesalahan</h3>
              <p className="text-red-600/90 dark:text-red-400/80 text-sm leading-relaxed">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* RESULTS DEFINITION */}
        {video && !loading && !error && (
          <ResultDisplay 
            video={video} 
            activePlatform={activePlatform} 
            downloading={downloading} 
            downloadSuccess={downloadSuccess} 
            downloadFile={downloadFile} 
          />
        )}
      </div>
    </div>
  );
}
