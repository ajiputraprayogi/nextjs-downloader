"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-white/50 dark:bg-zinc-800/50 animate-pulse border border-zinc-200 dark:border-zinc-700 backdrop-blur-md" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2.5 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-700/50 shadow-sm hover:shadow-md hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all active:scale-95 flex items-center justify-center text-zinc-600 dark:text-zinc-300"
      aria-label="Toggle dark mode"
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
          className={`absolute transition-all duration-500 ease-in-out ${isDark ? "translate-y-8 opacity-0 scale-50" : "translate-y-0 opacity-100 scale-100"}`}
        >
          <circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
          className={`absolute transition-all duration-500 ease-in-out ${isDark ? "translate-y-0 opacity-100 scale-100" : "-translate-y-8 opacity-0 scale-50"}`}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      </div>
    </button>
  );
}
