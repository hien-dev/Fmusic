import Screen from "@shared/ui/Screen";
import { FlatList, Text, View } from "react-native";
import SearchBar from "../components/SearchBar";
import { useSearch } from "../hooks/useSearch";

export default function SearchScreen() {
  const { query, setQuery, results, loading } = useSearch();

  return (
    <Screen style={{ flex: 1, padding: 12 }}>
      <SearchBar value={query} onChange={setQuery} loading={loading} />
      <FlatList
        data={results}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: "#eee" }}>
            <Text style={{ fontWeight: "600" }}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={!loading ? <Text>No results</Text> : null}
      />
    </Screen>
  );
}
