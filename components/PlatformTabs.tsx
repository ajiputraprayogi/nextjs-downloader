import { PlatformConfig, PLATFORMS } from "@/config/platforms";

interface PlatformTabsProps {
  activePlatform: PlatformConfig;
  changePlatform: (platform: PlatformConfig) => void;
}

export default function PlatformTabs({ activePlatform, changePlatform }: PlatformTabsProps) {
  return (
    <div className="flex bg-zinc-100 dark:bg-zinc-900/50 p-1.5 rounded-2xl mb-8 overflow-x-auto hide-scrollbar ring-1 ring-zinc-200 dark:ring-zinc-800">
      {PLATFORMS.map((platform) => {
        const isActive = activePlatform.id === platform.id;
        return (
          <button
            key={platform.id}
            onClick={() => changePlatform(platform)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap min-w-fit ${
              isActive
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm ring-1 ring-zinc-200/50 dark:ring-zinc-700/50"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <span className={`${isActive ? activePlatform.theme.text : ""}`}>
              {platform.icon}
            </span>
            <span className="hidden sm:inline-block">{platform.name}</span>
          </button>
        );
      })}
    </div>
  );
}
