import type { TextStyle } from "react-native";
import type { Colors } from "./color-styles";

export const fonts = {
  regular: "regular",
  bold: "bold",
  italic: "italic",
} as const;

export const createTypography = (colors: Colors) => {
  const base: TextStyle = {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 22,
    color: colors.text,
  };

  return {
    h1: { ...base, fontFamily: fonts.bold, fontSize: 28, lineHeight: 34 } as TextStyle,
    h2: { ...base, fontFamily: fonts.bold, fontSize: 22, lineHeight: 28 } as TextStyle,
    h3: { ...base, fontFamily: fonts.bold, fontSize: 18, lineHeight: 24 } as TextStyle,

    body: { ...base } as TextStyle,
    bodyBold: { ...base, fontFamily: fonts.bold } as TextStyle,
    bodyItalic: { ...base, fontFamily: fonts.italic } as TextStyle,

    caption: { ...base, fontSize: 12, lineHeight: 16 } as TextStyle,
    captionItalic: { ...base, fontFamily: fonts.italic, fontSize: 12, lineHeight: 16 } as TextStyle,
  } as const;
};
