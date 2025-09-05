import { useDS } from "@shared/provider/DSProvider";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Screen = ({ children, style }: Props) => {
  const { t: typo, colors } = useDS();
  return (
    <SafeAreaView style={[{ backgroundColor: colors.background }, style]}>{children}</SafeAreaView>
  );
};

export default Screen;
