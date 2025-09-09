import { useTheme } from "@shared/hooks/useTheme";
import { createTypography, sizes, spacing } from "@shared/themes";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

type DesignSystem = {
  mode: "light" | "dark";
  isDark: boolean;
  colors: ReturnType<typeof useTheme>["colors"];
  typography: ReturnType<typeof createTypography>;
  spacing: typeof spacing;
  sizes: typeof sizes;
};

const DesignSystemContext = createContext<DesignSystem | null>(null);

export function DesignSystemProvider({ children }: PropsWithChildren) {
  const { colors, isDark, mode } = useTheme();

  const typography = useMemo(() => createTypography(colors), [colors]);

  const value = useMemo<DesignSystem>(
    () => ({
      mode,
      isDark,
      colors,
      typography,
      spacing,
      sizes,
    }),
    [mode, isDark, colors, typography]
  );

  return <DesignSystemContext.Provider value={value}>{children}</DesignSystemContext.Provider>;
}

export function useDesignSystem() {
  const ctx = useContext(DesignSystemContext);
  if (!ctx) throw new Error("useDesignSystem must be used inside <DesignSystemProvider>");
  return ctx;
}
