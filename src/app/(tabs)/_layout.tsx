import { Ionicons } from "@expo/vector-icons";
import { useDesignSystem } from "@shared/provider";
import { Tabs } from "expo-router";
export default function TabsLayout() {
  const { colors } = useDesignSystem();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.placeholder,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
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
