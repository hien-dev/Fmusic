import { Ionicons } from "@expo/vector-icons";
import { useDesignSystem } from "@shared/provider";
import { BottomBar } from "@shared/ui";
import { Tabs } from "expo-router";
export default function TabsLayout() {
  const { typography,colors } = useDesignSystem();
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
