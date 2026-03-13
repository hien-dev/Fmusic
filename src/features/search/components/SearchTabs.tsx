import { ContentTabs } from "@shared/api/config";
import { tr } from "@shared/locales/i18n";
import { useDesignSystem } from "@shared/provider";
import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const TAB_GAP = 4;

type Props = {
  activeTab: ContentTabs;
  onChangeTab: (tab: ContentTabs) => void;
};

export function SearchTabs({ activeTab, onChangeTab }: Props) {
  const { colors } = useDesignSystem();
  const [tabLayouts, setTabLayouts] = useState<{ x: number; width: number }[]>([]);
  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  const tabs = [
    { key: ContentTabs.all, label: tr("search.tabs.all") },
    { key: ContentTabs.videos, label: tr("search.tabs.videos") },
    // { key: ContentTabs.live, label: tr("search.tabs.live") },
    { key: ContentTabs.artists, label: tr("search.tabs.artists") },
    { key: ContentTabs.albums, label: tr("search.tabs.albums") },
  ] as const;

  const activeIndex = tabs.findIndex((t) => t.key === activeTab);
  const handleTabLayout =
    (index: number) =>
    (e: LayoutChangeEvent): void => {
      const { x, width } = e.nativeEvent.layout;
      setTabLayouts((prev) => {
        const next = [...prev];
        next[index] = { x, width };
        return next;
      });
    };

  useEffect(() => {
    if (activeIndex < 0) return;
    const layout = tabLayouts[activeIndex];
    if (!layout) return;

    indicatorWidth.value = withTiming(layout.width + 4, { duration: 220 });
    indicatorX.value = withTiming(layout.x - 2, { duration: 220 });
  }, [activeIndex, tabLayouts, indicatorWidth, indicatorX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    width: indicatorWidth.value,
    transform: [{ translateX: indicatorX.value }],
  }));

  return (
    <View style={styles.tabsOuter}>
      <BlurView
        intensity={50}
        tint={colors.background === "#0D0D0D" ? "dark" : "light"}
        style={[styles.tabsBlur, { borderColor: colors.border }]}
      >
        <View style={styles.tabsContainer}>
          <Animated.View style={[styles.tabIndicator, indicatorStyle]} />
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.key;
            return (
              <Pressable
                key={tab.key}
                onLayout={handleTabLayout(index)}
                style={({ pressed }) => [styles.tabItem, pressed && styles.tabItemPressed]}
                onPress={() => onChangeTab(tab.key)}
              >
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsOuter: {
    paddingHorizontal: 12,
    paddingTop: 4,
  },
  tabsBlur: {
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingVertical: 2,
    columnGap: TAB_GAP,
  },
  tabIndicator: {
    position: "absolute",
    top: 2,
    bottom: 2,
    left: 0,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  tabItemPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.8,
  },
  tabLabel: {
    fontSize: 12,
    color: "#999",
  },
  tabLabelActive: {
    color: "#fff",
    fontWeight: "600",
  },
});
