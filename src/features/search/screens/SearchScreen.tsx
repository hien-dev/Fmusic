import { Header, Playlists, Screen } from "@shared/ui";
import { LayoutAnimation, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import { useSearch } from "../hooks/useSearch";

export default function SearchScreen() {
  const {
    isShowSearch,
    onChangeShowSearch,
    searching,
    onChangeSearching,
    playlists,
    isLoading,
    onLoadMore,
  } = useSearch();

  return (
    <Screen style={styles.container}>
      <Header
        onPressRight={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
          onChangeShowSearch(true);
        }}
      />
      {isShowSearch && <SearchBar value={searching} onChange={onChangeSearching} />}
      <Playlists data={playlists?.playlist || []} isLoading={isLoading} onLoadMore={onLoadMore} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
});
