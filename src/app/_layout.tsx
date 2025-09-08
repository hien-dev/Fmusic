import { DSProvider, useDS } from "@shared/provider/DSProvider";
import FontProvider from "@shared/provider/FontProvider";
import { Stack } from "expo-router";
import { Platform, StatusBar, UIManager } from "react-native";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function StatusBarByTheme() {
  const { isDark } = useDS();
  return <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />;
}

export default function RootLayout() {
  return (
    <FontProvider>
      <DSProvider>
        <StatusBarByTheme />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </DSProvider>
    </FontProvider>
  );
}
