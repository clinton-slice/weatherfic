import { useTheme } from "@contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1 text-base sm:text-xl font-medium text-zinc-900 dark:text-white">
        {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </span>

      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
          isDark ? "bg-zinc-600" : "bg-zinc-300"
        }`}
      >
        <span className="absolute left-2 text-base">{isDark && "☀️"}</span>
        <span className="absolute right-2 text-base">{!isDark && "🌙"}</span>

        <span
          className={`inline-block h-6 w-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            isDark ? "translate-x-8" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
