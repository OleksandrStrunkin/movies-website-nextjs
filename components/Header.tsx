import useThemeStore from "@/store/themeStore";

export default function Header() {
  const { isDark, toggleTheme } = useThemeStore();
  return (
    <header
      className="w-full fixed z-30 p-4 flex justify-between items-center
               backdrop-blur-sm border-b border-border
               bg-[color-mix(in_oklab,var(--color-background)_90%,transparent)]"
    >
      <h1 className="text-xl font-semibold text-foreground">
        Movie App
      </h1>
      <button
        onClick={toggleTheme}
        className="p-1 rounded-full border border-border
                 bg-card
                 hover:bg-accent/10 
                 transition-all duration-300 shadow-sm cursor-pointer"
      >
        {isDark ? "☀️" : "🌙"}
      </button>
    </header>
  );
}