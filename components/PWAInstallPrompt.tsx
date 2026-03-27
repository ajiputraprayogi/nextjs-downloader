"use client";

import { useEffect, useState } from "react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    const standalone = window.matchMedia('(display-mode: standalone)').matches || ('standalone' in navigator && (navigator as any).standalone === true);
    setIsStandalone(standalone);

    if (standalone) {
      return; // Stop if already installed
    }

    // Check if device is iOS
    const isIosDevice = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    
    // For iOS, beforeinstallprompt is not supported. Show a manual prompt reminder.
    if (isIosDevice) {
      const hasDismissed = localStorage.getItem('pwa-ios-dismissed');
      if (!hasDismissed) {
        setIsIOS(true);
        // Add a small delay so it doesn't pop up immediately on page load
        setTimeout(() => setShowPrompt(true), 2500);
      }
    }

    // For Android and Desktop Chrome
    const handler = (e: any) => {
      // Prevent the mini-info bar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      
      const hasDismissed = localStorage.getItem('pwa-prompt-dismissed');
      if (!hasDismissed) {
         // Show after a small delay
         setTimeout(() => setShowPrompt(true), 1500);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the native prompt
    deferredPrompt.prompt();
    
    // Wait for user choice
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User ${outcome} the install prompt`);
    
    // Clear prompt state
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    if (isIOS) {
       localStorage.setItem('pwa-ios-dismissed', 'true');
    } else {
       localStorage.setItem('pwa-prompt-dismissed', 'true');
    }
  };

  if (!showPrompt || isStandalone) return null;

  return (
    <div className="fixed bottom-6 w-[90%] max-w-sm mx-auto left-0 right-0 z-[100] animate-in slide-in-from-bottom-8 fade-in duration-700 ease-out">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-black/80 border border-zinc-200/60 dark:border-zinc-700/50 flex flex-col gap-3 backdrop-blur-xl">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 flex-shrink-0 bg-white dark:bg-black rounded-2xl flex items-center justify-center overflow-hidden p-2.5 shadow-sm ring-1 ring-zinc-100 dark:ring-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon-192x192.png" alt="App Icon" className="w-full h-full object-contain rounded-lg" />
          </div>
          <div className="flex-1 pt-1">
            <h3 className="font-bold text-zinc-900 dark:text-white text-[15px] leading-tight mb-1">Pasang Sosmedify</h3>
            <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-snug">
              {isIOS 
                ? "Ketuk ikon Share \u2191 di bawah lalu pilih 'Add to Home Screen' untuk memasang aplikasi." 
                : "Pasang di layar utama Anda untuk akses lebih cepat dan tanpa browser."}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 mt-2">
          <button 
            onClick={dismissPrompt} 
            className="flex-1 py-2.5 text-[13px] font-bold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors active:scale-95"
          >
            Nanti Saja
          </button>
          {!isIOS && (
            <button 
              onClick={handleInstallClick} 
              className="flex-[1.5] py-2.5 text-[13px] font-bold text-white bg-black dark:bg-white dark:text-black rounded-xl hover:opacity-90 transition-opacity active:scale-95 shadow-md"
            >
              Install Sekarang
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
