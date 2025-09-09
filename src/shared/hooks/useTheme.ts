import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorsDark, colorsLight } from "@shared/themes";
import { useColorScheme } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemePref = "light" | "dark" | "system";

export function useTheme() {
  const pref = useColorState((s) => s.theme);
  const scheme = useColorScheme();
  const mode = pref === "system" ? (scheme ?? "light") : pref;
  const isDark = mode === "dark";
  const colors = isDark ? colorsDark : colorsLight;

  return { mode, isDark, colors };
}

type ColorStateProps = {
  theme: ThemePref;
  setTheme: (t: ThemePref) => void;
};

export const useColorState = create<ColorStateProps>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (t) => set({ theme: t }),
    }),
    {
      name: "app_pref",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ theme: s.theme }),
    }
  )
);
