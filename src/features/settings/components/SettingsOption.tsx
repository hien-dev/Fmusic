import { View, Text, Switch } from "react-native";
import { useState } from "react";

export default function SettingsOption({ label }: { label: string }) {
  const [enabled, setEnabled] = useState(false);
  return (
    <View
      style={{
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 16 }}>{label}</Text>
      <Switch value={enabled} onValueChange={setEnabled} />
    </View>
  );
}
