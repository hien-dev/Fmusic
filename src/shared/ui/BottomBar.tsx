import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { tr, useLocale } from "@shared/locales/i18n";
import { useDesignSystem } from "@shared/provider";
import { colorsDark, sizes, spacing, Typography } from "@shared/themes";
import { BlurView } from "expo-blur";
import * as React from "react";
import { LayoutChangeEvent, Platform, Pressable as RNButton, StyleSheet, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function BottomBar({ state, navigation }: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();
  const { typography, colors } = useDesignSystem();
  useLocale(); // subscribe to locale changes for re-render

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
    if (name.startsWith("search")) return tr("bottomTabs.search");
    if (name.startsWith("favorite")) return tr("bottomTabs.favorite");
    return tr("bottomTabs.settings");
  };

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <View
        pointerEvents="auto"
        style={[styles.barWrap, { paddingBottom: bottom > 0 ? bottom - 10 : 8 }]}
      >
        <View style={[styles.barOuter, { borderColor: colors.border }]}>
          <BlurView
            intensity={50}
            tint={colors.background === colorsDark.background ? "dark" : "light"}
            style={styles.barBlur}
            {...(Platform.OS === "android" && { experimentalBlurMethod: "dimezisBlurView" })}
          >
            <View
              style={[
                styles.barInner,
                {
                  backgroundColor: colors.overlay,
                  borderColor: colors.overlayBorder,
                },
              ]}
            >
              {state.routes.map((r, i) => {
                const focused = state.index === i;
                return (
                  <TabButton
                    key={r.key}
                    focused={focused}
                    label={labelFor(r.name)}
                    icon={iconFor(r.name)}
                    onPress={() => onPressTab(i)}
                    typography={typography}
                    colors={colors}
                  />
                );
              })}
            </View>
          </BlurView>
        </View>
      </View>
    </View>
  );
}

type TabBtnProps = {
  focused: boolean;
  label: string;
  icon: string;
  onPress: () => void;
  typography: Typography;
  colors: ReturnType<typeof useDesignSystem>["colors"];
};

function TabButton({ focused, label, icon, onPress, colors, typography }: TabBtnProps) {
  const progress = useSharedValue(focused ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(focused ? 1 : 0, { duration: 250 });
  }, [focused]);

  const flexStyle = useAnimatedStyle(() => ({
    flexGrow: withSpring(focused ? 1.4 : 0.8, {
      damping: 14,
      stiffness: 200,
      mass: 0.7,
    }),
  }));

  const chipStyle = useAnimatedStyle(() => {
    const bg = interpolateColor(progress.value, [0, 1], [colors.transparent, colors.accent]);
    return {
      backgroundColor: bg,
    };
  });

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(focused ? 1 : 0.9, { damping: 12 }) }],
  }));

  const [measuredW, setMeasuredW] = React.useState(0);
  const labelWidth = useSharedValue(focused ? measuredW : 0);
  const labelOpacity = useSharedValue(focused ? 1 : 0);
  const labelTranslate = useSharedValue(focused ? 0 : 10);

  React.useEffect(() => {
    labelWidth.value = withTiming(focused ? measuredW : 0, { duration: 220 });
    labelOpacity.value = withTiming(focused ? 1 : 0, { duration: 200 });
    labelTranslate.value = withTiming(focused ? 0 : 10, { duration: 200 });
  }, [focused, measuredW]);

  const onLabelLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w !== measuredW) setMeasuredW(w);
  };

  const animatedLabelStyle = useAnimatedStyle(() => ({
    width: labelWidth.value,
    opacity: labelOpacity.value,
    transform: [{ translateX: labelTranslate.value }],
  }));

  return (
    <Animated.View style={[flexStyle]}>
      <RNButton
        onPress={onPress}
        style={styles.pressArea}
        android_ripple={{ color: colors.placeholder, borderless: true }}
      >
        <Animated.View style={[styles.tabItem, chipStyle]}>
          <Animated.View style={iconStyle}>
            <Ionicons name={icon as any} size={sizes.iconLg} color={colors.icon} />
          </Animated.View>

          <View style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>
            <View onLayout={onLabelLayout}>
              <Animated.Text style={{ ...typography["h4"] }}>{label}</Animated.Text>
            </View>
          </View>

          <Animated.View style={[styles.labelClamp, animatedLabelStyle]}>
            <Animated.Text
              numberOfLines={1}
              style={{
                ...typography["h4"],
                color: colors.text,
              }}
            >
              {label}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </RNButton>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  barWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    paddingTop: spacing.xs,
  },
  barOuter: {
    width: "78%",
    maxWidth: 420,
    borderRadius: 40,
    overflow: "hidden",
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 6 },
    }),
  },
  barBlur: {
    flex: 1,
    borderRadius: 40,
    overflow: "hidden",
  },
  barInner: {
    flexDirection: "row",
    padding: spacing.sm,
    borderRadius: 40,
    gap: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  pressArea: {
    borderRadius: 999,
    overflow: "hidden",
  },
  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingVertical: 14,
    justifyContent: "center",
    overflow: "hidden",
  },
  labelClamp: {
    marginLeft: spacing.sm,
    overflow: "hidden",
  },
});
