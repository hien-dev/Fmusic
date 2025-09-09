import { useDesignSystem } from "@shared/provider";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Screen = ({ children, style }: Props) => {
  const { colors } = useDesignSystem();
  return (
    <SafeAreaView edges={["top"]} style={[{ backgroundColor: colors.background }, style]}>{children}</SafeAreaView>
  );
};
