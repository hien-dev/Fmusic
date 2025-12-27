import { DesignSystemProvider, FontProvider, useDesignSystem } from "@shared/provider";
import { Stack } from "expo-router";
import { Platform, StatusBar, UIManager } from "react-native";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function StatusBarByTheme() {
  const { isDark } = useDesignSystem();
  return <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />;
}

export default function RootLayout() {
  return (
    <FontProvider>
      <DesignSystemProvider>
        <StatusBarByTheme />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(tabs)" />
        </Stack>
        
      </DesignSystemProvider>
    </FontProvider>
  );
}
