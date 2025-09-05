import Screen from "@shared/ui/Screen";
import { FlatList, Text } from "react-native";
import FavoriteItem from "../components/FavoriteItem";
import { useFavorite } from "../hooks/useFavorite";

export default function FavoriteScreen() {
  const { items } = useFavorite();

  return (
    <Screen style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => <FavoriteItem item={item} />}
        ListEmptyComponent={<Text>No favorites yet</Text>}
      />
    </Screen>
  );
}
