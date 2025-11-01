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
        document.body.dataset.theme = next ? "dark" : "light";
      },
    }),
    { name: "theme-storage" }
  )
);

export default useThemeStore;
