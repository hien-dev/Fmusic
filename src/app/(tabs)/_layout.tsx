import { Ionicons } from "@expo/vector-icons";
import { useDesignSystem } from "@shared/provider";
import { BottomBar } from "@shared/ui";
import { iPhone } from "@shared/utils/constants";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
  const { colors } = useDesignSystem();

  if (iPhone) {
    return (
      <NativeTabs iconColor={colors.accent}>
        <NativeTabs.Trigger name="search/index">
          <Icon sf={"magnifyingglass"} />
          <Label>Search</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="favorite/index" options={{ title: "Favorite" }}>
          <Icon sf={"heart"} />
          <Label>Favorite</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="settings/index" options={{ title: "Settings" }}>
          <Icon sf={"gear"} />
          <Label>Settings</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { display: "none" },
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
      }}
      tabBar={(props) => <BottomBar {...props} />}
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
