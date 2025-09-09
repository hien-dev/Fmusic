import { tr, type TranslateValues, type TxKey } from "@shared/locales/i18n";
import { useDesignSystem } from "@shared/provider";
import { Colors, Typography } from "@shared/themes";
import { Text as RNText, type TextProps, type TextStyle } from "react-native";

type ColorSemantic = keyof Colors;

export interface TProps extends Omit<TextProps, "style"> {
  tx?: TxKey;
  values?: TranslateValues;
  variant?: keyof Typography;
  color?: ColorSemantic;
  align?: TextStyle["textAlign"];
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
}

export function Text({
  tx,
  values,
  variant = "r4",
  color = "text",
  align = "center",
  style,
  children,
  ...rest
}: TProps) {
  const { typography: typo, colors } = useDesignSystem();

  const content = typeof tx === "string" ? tr(tx, values) : children;
  const colorStyle: TextStyle | undefined = color ? { color: colors[color] } : undefined;
  const alignStyle: TextStyle | undefined = align ? { textAlign: align } : undefined;

  return (
    <RNText {...rest} style={[typo[variant], colorStyle, alignStyle, style as any]}>
      {content}
    </RNText>
  );
}
