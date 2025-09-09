import { useDesignSystem } from "@shared/provider";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

interface Props extends ActivityIndicatorProps {}

export function Loading(props: Props) {
  const { colors } = useDesignSystem();
  return <ActivityIndicator {...props} color={colors.icon} />;
}
