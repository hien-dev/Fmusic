import { DSProvider, useDS } from "@shared/provider/DSProvider";
import FontProvider from "@shared/provider/FontProvider";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

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
