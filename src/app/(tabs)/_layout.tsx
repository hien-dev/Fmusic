import { Ionicons } from "@expo/vector-icons";
import { useColorState } from "@shared/hooks/useTheme";
import { tr, useLocale } from "@shared/locales/i18n";
import { useDesignSystem } from "@shared/provider";
import { BottomBar } from "@shared/ui";
import { Tabs } from "expo-router";
import { useCallback } from "react";

export default function TabsLayout() {
  const { colors } = useDesignSystem();
  const themePref = useColorState((s) => s.theme);
  const locale = useLocale();

  const renderBottomBar = useCallback((props: any) => <BottomBar {...props} />, []);

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
