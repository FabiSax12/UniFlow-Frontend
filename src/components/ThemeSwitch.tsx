import { useTheme } from "@/lib/theme-provider";
import { Moon, Sun } from "lucide-react";


export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  return <button
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    className="p-2 bg-transparent border-none cursor-pointer z-50"
    aria-label="Toggle theme"
  >
    <div className="relative w-[1.5rem] h-[1.5rem]">
      <Sun
        className={`absolute h-full w-full transition-all duration-450  ${theme === "dark" ? "scale-0 rotate-90" : "scale-100 rotate-0"
          }`}
      />
      <Moon
        className={`absolute h-full w-full transition-all duration-450  ${theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"
          }`}
      />
    </div>
  </button>
}