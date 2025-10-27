import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  colorTheme: string;
  setColorTheme: (theme: string) => void;
}
const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      colorTheme: "light",
      setColorTheme: (theme: string) => set(() => ({ colorTheme: theme })),
    }),
    { name: "theme-storage" }
  )
);

export default useThemeStore;