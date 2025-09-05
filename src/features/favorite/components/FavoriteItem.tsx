import { View, Text } from "react-native";
export default function FavoriteItem({ item }: { item: { id: string; name: string } }) {
  return (
    <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: "#eee" }}>
      <Text style={{ fontWeight: "600" }}>{item.name}</Text>
    </View>
  );
}
