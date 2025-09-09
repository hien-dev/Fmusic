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

export const createTypography = (colors: Colors): Typography => {
  const base: TextStyle = {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 22,
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
    typography[`h${i}` as HeadingKey] = {
      ...base,
      fontFamily: fonts.bold,
      fontSize: sizes[i as keyof typeof sizes].fontSize,
      lineHeight: sizes[i as keyof typeof sizes].lineHeight,
    };
  }

  for (let i = 1; i <= 5; i++) {
    typography[`r${i}` as RegularKey] = {
      ...base,
      fontSize: sizes[i as keyof typeof sizes].fontSize,
      lineHeight: sizes[i as keyof typeof sizes].lineHeight,
    };
  }

  return typography as Typography;
};
