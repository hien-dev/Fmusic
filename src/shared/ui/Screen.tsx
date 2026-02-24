import { useDesignSystem } from "@shared/provider";
import { useUIStore } from "@shared/store/ui-store";
import {
  getSidebarExpandedWidth,
  isTablet,
  SIDEBAR_COLLAPSED_WIDTH,
} from "@shared/utils/constants";
import React from "react";
import { StyleProp, useWindowDimensions, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Screen = ({ children, style }: Props) => {
  const { colors } = useDesignSystem();
  const { sidebarExpanded } = useUIStore();
  const { width: screenWidth } = useWindowDimensions();

  const sidebarWidthExpanded = getSidebarExpandedWidth(screenWidth);
  const targetPadding = isTablet
    ? sidebarExpanded
      ? sidebarWidthExpanded
      : SIDEBAR_COLLAPSED_WIDTH
    : 0;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingLeft: withTiming(targetPadding, {
        duration: 300,
      }),
    };
  });

  return (
    <AnimatedSafeAreaView
      edges={["top"]}
      style={[
        { flex: 1, backgroundColor: colors.background, minHeight: "100%" },
        animatedStyle,
        style,
      ]}
    >
      {children}
    </AnimatedSafeAreaView>
  );
};
