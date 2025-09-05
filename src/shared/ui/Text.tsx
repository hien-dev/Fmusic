import { tr, type TranslateValues, type TxKey } from "@shared/locales/i18n";
import { useDS } from "@shared/provider/DSProvider";
import { Colors } from "@shared/themes/color-styles";
import React from "react";
import { Text as RNText, type TextProps, type TextStyle } from "react-native";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "bodyBold"
  | "bodyItalic"
  | "caption"
  | "captionItalic";

type ColorSemantic = keyof Colors 

export interface TProps extends Omit<TextProps, "style"> {
  tx?: TxKey;
  values?: TranslateValues;
  variant?: Variant;
  color?: ColorSemantic;
  align?: TextStyle["textAlign"];
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
}

export default function Text({
  tx,
  values,
  variant = "body",
  color = "text",
  align = "center",
  style,
  children,
  ...rest
}: TProps) {
  const { t: typo, colors } = useDS();

  const content = typeof tx === "string" ? tr(tx, values) : children;
  const colorStyle: TextStyle | undefined = color ? { color: colors[color] } : undefined;
  const alignStyle: TextStyle | undefined = align ? { textAlign: align } : undefined;

  return (
    <RNText {...rest} style={[typo[variant], colorStyle, alignStyle, style as any]}>
      {content}
    </RNText>
  );
}
