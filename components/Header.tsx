import { useTransition, useState, useEffect } from "react";

export default function Header() {
  const [isPending, startTransition] = useTransition();
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

   useEffect(() => {
     const cookieTheme = document.cookie
       .split("; ")
       .find((row) => row.startsWith("theme="))
       ?.split("=")[1] as "light" | "dark" | undefined;

     const current = cookieTheme || "light";
     document.body.dataset.theme = current;
     setTheme(current);
   }, []);
  
   const toggleTheme = async () => {
     const next = document.body.dataset.theme === "dark" ? "light" : "dark";
     document.cookie = `theme=${next}; path=/; max-age=31536000`; // зберігаємо на рік
     document.body.dataset.theme = next;
      setTheme(next as "light" | "dark");
   };
  return (
    <header
      className="sticky top-0 z-30 p-4 flex justify-between items-center
               backdrop-blur-sm border-b border-border
               bg-[color-mix(in_oklab,var(--color-background)_90%,transparent)]"
    >
      <h1 className="text-xl font-semibold text-foreground">Movie App</h1>
      <button
        disabled={isPending}
        onClick={() => startTransition(toggleTheme)}
        className="p-1 rounded-full border border-border
                 bg-card
                 hover:bg-accent/10 
                 transition-all duration-300 shadow-sm cursor-pointer"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </header>
  );
}