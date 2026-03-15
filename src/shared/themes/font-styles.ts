import type { TextStyle } from "react-native";
import type { Colors } from "./color-styles";

// Define available font families
export const fonts = {
  regular: "regular",
  bold: "bold",
} as const;

// Define style keys
type HeadingKey = `h${1 | 2 | 3 | 4 | 5}`;
type RegularKey = `r${1 | 2 | 3 | 4 | 5}`;
export type Typography = Record<HeadingKey | RegularKey, TextStyle>;

/** Scale factor for typography (e.g. 0.9 on Android for smaller UI) */
export const createTypography = (colors: Colors, scale = 1): Typography => {
  const s = (n: number) => Math.round(n * scale);

  const base: TextStyle = {
    fontFamily: fonts.regular,
    fontSize: s(16),
    lineHeight: s(22),
    color: colors.text,
  };

  const sizes = {
    1: { fontSize: 24, lineHeight: 32 },
    2: { fontSize: 20, lineHeight: 28 },
    3: { fontSize: 18, lineHeight: 24 },
    4: { fontSize: 16, lineHeight: 22 },
    5: { fontSize: 14, lineHeight: 20 },
  };

  const typography: Partial<Typography> = {};

  for (let i = 1; i <= 5; i++) {
    const { fontSize, lineHeight } = sizes[i as keyof typeof sizes];
    typography[`h${i}` as HeadingKey] = {
      ...base,
      fontFamily: fonts.bold,
      fontSize: s(fontSize),
      lineHeight: s(lineHeight),
    };
  }

  for (let i = 1; i <= 5; i++) {
    const { fontSize, lineHeight } = sizes[i as keyof typeof sizes];
    typography[`r${i}` as RegularKey] = {
      ...base,
      fontSize: s(fontSize),
      lineHeight: s(lineHeight),
    };
  }

  return typography as Typography;
};
