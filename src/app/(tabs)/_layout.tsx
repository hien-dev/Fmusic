import { Ionicons } from "@expo/vector-icons";
import { useColorState } from "@shared/hooks/useTheme";
import { tr, useLocale } from "@shared/locales/i18n";
import { useDesignSystem } from "@shared/provider";
import { useUIStore } from "@shared/store/ui-store";
import { BottomBar, Sidebar } from "@shared/ui";
import {
  getSidebarExpandedWidth,
  iPhone,
  isTablet,
  SIDEBAR_COLLAPSED_WIDTH,
} from "@shared/utils/constants";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { useCallback } from "react";
import { useWindowDimensions } from "react-native";

export default function TabsLayout() {
  const { colors } = useDesignSystem();
  const themePref = useColorState((s) => s.theme);
  const locale = useLocale();

  const renderSidebar = useCallback((props: any) => <Sidebar {...props} />, []);
  const renderBottomBar = useCallback((props: any) => <BottomBar {...props} />, []);

  if (iPhone) {
    return (
      <NativeTabs key={themePref} iconColor={colors.accent}>
        <NativeTabs.Trigger name="search/index">
          <Icon sf={"magnifyingglass"} />
          <Label>{tr("bottomTabs.search")}</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger
          name="favorite/index"
          options={{ title: tr("bottomTabs.favorite") }}
        >
          <Icon sf={"heart"} />
          <Label>{tr("bottomTabs.favorite")}</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger
          name="settings/index"
          options={{ title: tr("bottomTabs.settings") }}
        >
          <Icon sf={"gear"} />
          <Label>{tr("bottomTabs.settings")}</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  if (isTablet) {
    const { sidebarExpanded } = useUIStore();
    const { width: screenWidth } = useWindowDimensions();
    const sidebarWidth = sidebarExpanded
      ? getSidebarExpandedWidth(screenWidth)
      : SIDEBAR_COLLAPSED_WIDTH;

    return (
      <Tabs
        key={themePref}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { display: "none" },
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
        tabBar={renderSidebar}
      >
        <Tabs.Screen
          name="search/index"
          options={{
            title: tr("bottomTabs.search"),
            tabBarIcon: (p) => <Ionicons name="search" {...p} />,
          }}
        />
        <Tabs.Screen
          name="favorite/index"
          options={{
            title: tr("bottomTabs.favorite"),
            tabBarIcon: (p) => <Ionicons name="heart" {...p} />,
          }}
        />
        <Tabs.Screen
          name="settings/index"
          options={{
            title: tr("bottomTabs.settings"),
            tabBarIcon: (p) => <Ionicons name="settings-outline" {...p} />,
          }}
        />
      </Tabs>
    );
  }

  return (
    <Tabs
      key={themePref}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { display: "none" },
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
      }}
      tabBar={renderBottomBar}
    >
      <Tabs.Screen
        name="search/index"
        options={{ title: "Search", tabBarIcon: (p) => <Ionicons name="search" {...p} /> }}
      />
      <Tabs.Screen
        name="favorite/index"
        options={{ title: "Favorite", tabBarIcon: (p) => <Ionicons name="heart" {...p} /> }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: "Settings",
          tabBarIcon: (p) => <Ionicons name="settings-outline" {...p} />,
        }}
      />
    </Tabs>
  );
}
