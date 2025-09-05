import type { TextStyle, ViewStyle } from "react-native";
import type { Colors } from "./color-styles";

export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
} as const;

export const sizes = {
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  iconXXL: 128,
  avatarSm: 24,
  avatarMd: 40,
  avatarLg: 64,
  buttonH: 44,
  inputH: 48,
  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 16,
  radiusFull: 999,
  line: 1,
} as const;

export const commonStyles = {
  flex: {
    flex: 1,
  } as ViewStyle,
  row: {
    flexDirection: "row"
  } as ViewStyle
}

// helpers (ví dụ)
type SpacingKey = keyof typeof spacing;
const val = (k?: number | SpacingKey) => (typeof k === "number" ? k : k ? spacing[k] : undefined);
export const px = (k: number | SpacingKey) => ({ paddingLeft: val(k), paddingRight: val(k) });
export const py = (k: number | SpacingKey) => ({ paddingTop: val(k), paddingBottom: val(k) });

export const shadow = (isDark: boolean) => ({
  sm: {
    shadowColor: "#000",
    shadowOpacity: isDark ? 0.3 : 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  } as ViewStyle,
  md: {
    shadowColor: "#000",
    shadowOpacity: isDark ? 0.35 : 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  } as ViewStyle,
});

export const createUI = (colors: Colors, isDark: boolean) => {
  const sh = shadow(isDark);

  const flex = {
    flex: 1,
    backgroundColor: colors.background
  } as ViewStyle;

  const card = {
    container: {
      backgroundColor: colors.card,
      borderRadius: sizes.radiusLg,
      borderWidth: sizes.line,
      borderColor: colors.border,
      ...px("lg"),
      ...py("lg"),
      ...sh.sm,
    } as ViewStyle,
    title: { color: colors.text, fontSize: 18, fontWeight: "600" } as TextStyle,
    subtitle: { color: colors.card, fontSize: 12 } as TextStyle,
  };

  const button = {
    base: {
      height: sizes.buttonH,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: sizes.radiusMd,
      ...px("lg"),
    } as ViewStyle,
    primary: { backgroundColor: colors.primary } as ViewStyle,
    textPrimary: { color: "#fff", fontWeight: "600", fontSize: 16 } as TextStyle,
  };

  return { flex, card, button };
};
