"use client";
import { useTransition, useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { useAuthStore } from "@/store/useAuthStore";
import { signOut } from "next-auth/react";
import { UserIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [isPending, startTransition] = useTransition();
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const { user, token, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      logout();
      await signOut({ redirect: false });
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

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
     document.cookie = `theme=${next}; path=/; max-age=31536000`;
     document.body.dataset.theme = next;
      setTheme(next as "light" | "dark");
   };
  return (
    <header
      className="sticky top-0 z-30 p-4 flex justify-between items-center
               backdrop-blur-sm border-b border-border
               bg-[color-mix(in_oklab,var(--color-background)_90%,transparent)]"
    >
      <Link
        href={"/"}
        className="text-sm md:text-xl font-semibold text-foreground"
      >
        Movie App
      </Link>
      <div className="hidden md:block"><SearchBar /></div>
      <div className="flex gap-2 items-center">
        <div className="block md:hidden"><SearchBar /></div>
        {token ? (
          <>
            <span className="hidden md:block text-sm text-foreground/70">
              {user?.username ?? "User"}
            </span>
            <Link
              href="/profile"
              className="p-2 rounded-full hover:bg-accent/10 transition"
            >
              <UserIcon className="w-6 h-6 text-foreground" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs px-3 py-1 rounded-md border border-border hover:bg-accent/10 transition"
            >
              Exit
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="p-2 rounded-full hover:bg-accent/10 transition"
          >
            <UserIcon className="w-6 h-6 text-foreground" />
          </Link>
        )}

        <button
          disabled={isPending}
          onClick={() => startTransition(toggleTheme)}
          className="p-1 rounded-full border border-border
                   bg-card hover:bg-accent/10 
                   transition-all duration-300 shadow-sm cursor-pointer"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}