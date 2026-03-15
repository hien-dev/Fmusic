import { MusicBottomSheetScreen } from "@features/music-bottom-sheet";
import { DesignSystemProvider, FontProvider, useDesignSystem } from "@shared/provider";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform, StatusBar, UIManager } from "react-native";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function StatusBarByTheme() {
  const { isDark, colors } = useDesignSystem();

  useEffect(() => {
    if (Platform.OS !== "android") return;
    try {
      const NavigationBar = require("expo-navigation-bar");
      NavigationBar.setBackgroundColorAsync(colors.background).catch(() => {});
    } catch {
      // expo-navigation-bar not installed
    }
  }, [colors.background]);

  return (
    <StatusBar
      barStyle={isDark ? "light-content" : "dark-content"}
      {...(Platform.OS === "android" && { backgroundColor: colors.background })}
    />
  );
}

export default function RootLayout() {
  return (
    <FontProvider>
      <DesignSystemProvider>
        <MusicBottomSheetScreen>
          <StatusBarByTheme />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "fade",
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </MusicBottomSheetScreen>
      </DesignSystemProvider>
    </FontProvider>
  );
}
