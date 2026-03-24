/* eslint-disable @next/next/no-img-element */
import { PlatformConfig } from "@/config/platforms";
import { MediaResponse } from "@/types/downloader";
import { getDynamicOptionConfig } from "@/utils/downloader";

interface ResultDisplayProps {
  video: MediaResponse;
  activePlatform: PlatformConfig;
  downloading: string | null;
  downloadSuccess: string | null;
  downloadFile: (link: string, type: string, key: string) => void;
}

export default function ResultDisplay({
  video, activePlatform, downloading, downloadSuccess, downloadFile
}: ResultDisplayProps) {
  const authorName = typeof video.author === 'string' 
    ? video.author 
    : (video.author as any)?.name || (video.author as any)?.unique_id;

  return (
    <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-700/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
          <span className={`scale-110 ${activePlatform.theme.text}`}>
            {activePlatform.icon}
          </span>
        </div>
        <div className="flex flex-col">
          <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white line-clamp-2 leading-snug">
            {video.title || "Hasil Pencarian"}
          </h3>
          {authorName && (
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
              @{authorName.replace('@', '')}
            </p>
          )}
        </div>
      </div>

      {video.images && video.images.length > 0 ? (
        <div className={`grid gap-3 ${video.images.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-2 sm:grid-cols-3'}`}>
          {video.images.map((img: string, idx: number) => {
            const isDownloading = downloading === `img-${idx}`;
            const isSuccess = downloadSuccess === `img-${idx}`;
            
            return (
              <div key={idx} className="relative group flex flex-col rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 ring-1 ring-black/5 dark:ring-white/5 shadow-sm">
                <div className="relative aspect-square w-full">
                  <img 
                    src={img} 
                    alt={`Media ${idx + 1}`} 
                    className="w-full h-full object-cover bg-zinc-200 dark:bg-zinc-700" 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const proxyUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8081"}/stream-file?url=${encodeURIComponent(img)}&t=${Date.now()}`;
                      if (target.src !== proxyUrl && !target.src.includes('t=')) {
                        target.src = proxyUrl;
                      }
                    }}
                  />
                </div>
                <div className="p-2 border-t border-black/5 dark:border-white/5 bg-white dark:bg-zinc-800/80">
                  <button 
                    onClick={() => downloadFile(img, 'jpg', `img-${idx}`)}
                    disabled={isDownloading}
                    className={`w-full py-2.5 px-3 flex items-center justify-center gap-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                      isSuccess 
                        ? 'bg-green-500 text-white' 
                        : isDownloading 
                          ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-500 cursor-not-allowed'
                          : 'bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.98]'
                    }`}
                  >
                    {isDownloading ? (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : isSuccess ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        Selesai
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Download
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          {(video.options?.nowm || video.options?.hd) && (
            <div className="relative rounded-2xl overflow-hidden bg-black/5 dark:bg-black/40 pb-[177%] w-full max-w-sm mx-auto shadow-inner ring-1 ring-black/5 dark:ring-white/5 mb-8">
              <video
                src={`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8081"}/stream-file?url=${encodeURIComponent(video.options?.nowm || video.options?.hd || "")}`}
                controls
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                playsInline
                className="absolute inset-0 w-full h-full object-contain"
                poster={video.cover}
              />
            </div>
          )}

          <div className="flex flex-col gap-3">
            {video.options &&
              Object.keys(video.options).filter(k => ["nowm", "hd", "mp3", "sd", "wm"].includes(k)).map((key) => {
                const link = video.options![key];
                if (!link) return null;

                const config = getDynamicOptionConfig(key, activePlatform);
                const isDownloading = downloading === key;
                const isSuccess = downloadSuccess === key;

                return (
                  <button
                    key={key}
                    onClick={() => downloadFile(link, config.type, key)}
                    disabled={downloading !== null}
                    className={`${config.className} relative overflow-hidden transition-all duration-300 ${
                      isDownloading ? "animate-shimmer scale-[0.98] opacity-90" : ""
                    } ${isSuccess ? "animate-success border-green-500/50" : ""}`}
                  >
                    {isDownloading && (
                      <div className="absolute inset-0 bg-white/10 dark:bg-black/10 animate-pulse"></div>
                    )}

                    <span className="flex items-center gap-3 relative z-10">
                      <span className={`text-xl transition-transform duration-300 ${isDownloading ? "animate-icon-bounce" : ""}`}>
                        {isSuccess ? "✅" : config.icon}
                      </span>
                      <span>{isSuccess ? "Berhasil Diunduh!" : config.label}</span>
                    </span>

                    {isSuccess ? (
                      <svg className="w-6 h-6 text-green-500 dark:text-green-400 animate-in zoom-in duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    ) : (
                      <svg
                        className={`w-5 h-5 transition-all duration-300 ${isDownloading ? "translate-y-1 opacity-50" : "group-hover:-translate-y-1 group-hover:opacity-80"}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                    )}
                  </button>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}
