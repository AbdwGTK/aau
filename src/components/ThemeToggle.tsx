import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      className="inline-flex items-center justify-center rounded-full p-2 border border-zinc-300 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/60 shadow transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      onClick={toggleTheme}
      type="button"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-300" />
      )}
    </button>
  );
}
