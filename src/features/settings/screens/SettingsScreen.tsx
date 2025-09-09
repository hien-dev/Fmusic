import { Screen } from "@shared/ui";
import { Text } from "react-native";
import SettingsOption from "../components/SettingsOption";

export default function SettingsScreen() {
  return (
    <Screen style={{ flex: 1, padding: 12, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Settings</Text>
      <SettingsOption label="Dark Mode" />
    </Screen>
  );
}
