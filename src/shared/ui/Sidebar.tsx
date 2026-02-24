import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useDesignSystem } from "@shared/provider";
import { useUIStore } from "@shared/store/ui-store";
import { sizes, spacing, Typography } from "@shared/themes";
import { getSidebarExpandedWidth, SIDEBAR_COLLAPSED_WIDTH } from "@shared/utils/constants";
import * as React from "react";
import { Pressable as RNButton, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Sidebar({ state, navigation }: BottomTabBarProps) {
  const { top, bottom } = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const { typography, colors } = useDesignSystem();
  const { sidebarExpanded, toggleSidebar } = useUIStore();

  const SIDEBAR_EXPANDED_WIDTH = getSidebarExpandedWidth(screenWidth);
  const width = useSharedValue(sidebarExpanded ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH);

  React.useEffect(() => {
    width.value = withSpring(sidebarExpanded ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH, {
      damping: 20,
      stiffness: 100,
    });
  }, [sidebarExpanded, SIDEBAR_EXPANDED_WIDTH]);

  const sidebarStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  const onPressTab = (index: number) => {
    const route = state.routes[index];
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });
    if (state.index !== index && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const iconFor = (name: string) => {
    if (name.startsWith("search")) return "search";
    if (name.startsWith("favorite")) return "heart";
    return "settings-outline";
  };

  const labelFor = (name: string) => {
    if (name.startsWith("search")) return "Search";
    if (name.startsWith("favorite")) return "Favorite";
    return "Settings";
  };

  return (
    <Animated.View
      style={[
        styles.container,
        sidebarStyle,
        {
          backgroundColor: colors.background,
          paddingTop: top + spacing.xl,
          paddingBottom: bottom + spacing.md,
          borderRightWidth: 1,
          borderRightColor: colors.border,
        },
      ]}
    >
      <View style={styles.menu}>
        {state.routes.map((r, i) => {
          const focused = state.index === i;
          return (
            <SidebarItem
              key={r.key}
              focused={focused}
              expanded={sidebarExpanded}
              label={labelFor(r.name)}
              icon={iconFor(r.name)}
              onPress={() => onPressTab(i)}
              typography={typography}
              colors={colors}
            />
          );
        })}
      </View>

      <View style={styles.footer}>
        <RNButton
          onPress={toggleSidebar}
          style={[styles.toggleBtn, { backgroundColor: colors.accent + "15" }]}
        >
          <Ionicons
            name={sidebarExpanded ? "chevron-back" : "chevron-forward"}
            size={24}
            color={colors.accent}
          />
        </RNButton>
      </View>
    </Animated.View>
  );
}

function SidebarItem({
  focused,
  expanded,
  label,
  icon,
  onPress,
  colors,
  typography,
}: {
  focused: boolean;
  expanded: boolean;
  label: string;
  icon: string;
  onPress: () => void;
  colors: any;
  typography: Typography;
}) {
  const progress = useSharedValue(focused ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(focused ? 1 : 0, { duration: 250 });
  }, [focused]);

  const containerStyle = useAnimatedStyle(() => {
    const bg = interpolateColor(progress.value, [0, 1], [colors.transparent, colors.accent + "15"]);
    return {
      backgroundColor: bg,
    };
  });

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(focused ? 1.1 : 1, { damping: 12 }) }],
  }));

  const activeIndicatorStyle = useAnimatedStyle(() => ({
    height: withSpring(focused ? 24 : 0, { damping: 12 }),
    opacity: withTiming(focused ? 1 : 0),
  }));

  return (
    <RNButton onPress={onPress} style={styles.itemPress}>
      <Animated.View
        style={[styles.itemContent, !expanded && styles.itemContentCollapsed, containerStyle]}
      >
        <Animated.View style={iconStyle}>
          <Ionicons
            name={icon as any}
            size={sizes.iconLg}
            color={focused ? colors.accent : colors.icon}
          />
        </Animated.View>
        {expanded && (
          <Text
            style={[
              typography.h4,
              {
                marginLeft: spacing.md,
                color: focused ? colors.accent : colors.text,
              },
            ]}
            numberOfLines={1}
          >
            {label}
          </Text>
        )}
        <Animated.View
          style={[styles.activeIndicator, { backgroundColor: colors.accent }, activeIndicatorStyle]}
        />
      </Animated.View>
    </RNButton>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
  },
  header: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl * 2,
    height: 40,
    justifyContent: "center",
  },
  headerCollapsed: {
    paddingHorizontal: 0,
    alignItems: "center",
  },
  menu: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  itemPress: {
    borderRadius: spacing.md,
    overflow: "hidden",
    marginBottom: spacing.xs,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.md,
    position: "relative",
  },
  itemContentCollapsed: {
    justifyContent: "center",
    paddingHorizontal: 0,
  },
  activeIndicator: {
    position: "absolute",
    left: 0,
    width: 4,
    borderRadius: 2,
  },
  footer: {
    padding: spacing.md,
    alignItems: "center",
  },
  toggleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
