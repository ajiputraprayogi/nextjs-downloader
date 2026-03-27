import DownloaderForm from "@/components/DownloaderForm";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 flex flex-col items-center justify-center p-4 sm:p-8 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-900 pb-24 transition-colors">
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50">
        <ThemeToggle />
      </div>

      <DownloaderForm />

      <div className="absolute bottom-6 left-0 right-0 text-center text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-medium">
        Dibuat tahun {new Date().getFullYear()} oleh <span className="text-zinc-800 dark:text-zinc-200 font-bold">D.Prayogi</span>
      </div>
    </div>
  );
}