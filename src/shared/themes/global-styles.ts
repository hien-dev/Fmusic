import { Platform } from "react-native";

/** Scale factor for Android so UI is slightly smaller (fixes "too big" feel on many devices) */
export const ANDROID_UI_SCALE = 0.92;

export function getScale(): number {
  return Platform.OS === "android" ? ANDROID_UI_SCALE : 1;
}

function scaleValues<T extends Record<string, number>>(obj: T, scale: number): T {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k,
      k === "radiusFull" || k === "line" ? v : Math.round(v * scale),
    ])
  ) as T;
}

const spacingBase = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 40,
  "3xl": 48,
  "4xl": 56,
  "100": 100,
  "120": 120,
} as const;

const sizesBase = {
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

const scale = getScale();
export const spacing = scale === 1 ? spacingBase : scaleValues(spacingBase, scale);
export const sizes = scale === 1 ? sizesBase : scaleValues(sizesBase, scale);
