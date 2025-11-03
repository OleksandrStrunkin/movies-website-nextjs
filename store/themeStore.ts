import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  isDark: null | boolean;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: null,
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
