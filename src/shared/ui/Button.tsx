import { Pressable, Text } from "react-native";
export default function Button({ title, onPress }: { title: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={{ backgroundColor: "#111", padding: 12, borderRadius: 10 }}>
      <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>{title}</Text>
    </Pressable>
  );
}
