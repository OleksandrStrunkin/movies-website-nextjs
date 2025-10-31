import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: false,
      toggleTheme: () => {
        const next = !get().isDark;
        set({ isDark: next });
        const root = document.documentElement;
        if (next) root.classList.add("dark");
        else root.classList.remove("dark");
      },
    }),
    { name: "theme-storage" }
  )
);

export default useThemeStore;