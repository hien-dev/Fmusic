import { useTheme } from "@shared/hooks/useTheme";
import { createTypography } from "@shared/themes/font-styles";
import { createUI, sizes, spacing } from "@shared/themes/global-styles";
import React, { createContext, PropsWithChildren, useContext, useMemo } from "react";

type DS = {
  mode: "light" | "dark";
  isDark: boolean;
  colors: ReturnType<typeof useTheme>["colors"];
  t: ReturnType<typeof createTypography>;
  ui: ReturnType<typeof createUI>;
  s: typeof spacing;
  sz: typeof sizes;
};

const DSContext = createContext<DS | null>(null);

export function DSProvider({ children }: PropsWithChildren) {
  const { colors, isDark, mode } = useTheme();

  const t = useMemo(() => createTypography(colors), [colors]);
  const ui = useMemo(() => createUI(colors, isDark), [colors, isDark]);

  const value = useMemo<DS>(
    () => ({ mode, isDark, colors, t, ui, s: spacing, sz: sizes }),
    [mode, isDark, colors, t, ui]
  );

  return <DSContext.Provider value={value}>{children}</DSContext.Provider>;
}

export function useDS() {
  const ctx = useContext(DSContext);
  if (!ctx) throw new Error("useDS must be used inside <DSProvider>");
  return ctx;
}
