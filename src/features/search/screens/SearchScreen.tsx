import { useMusicBottomSheet } from "@features/music-bottom-sheet";
import { Header, Playlists, Screen } from "@shared/ui";
import { StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import SuggestionList from "../components/SuggestionList";
import { useSearch } from "../hooks/useSearch";

export default function SearchScreen() {
  const {
    isShowSearch,
    onToggleShowSearch,
    searching,
    onChangeSearching,
    playlists,
    isLoading,
    onLoadMore,
    suggestions,
    onSearching,
  } = useSearch();

  const { fetchMusicById, toggleBottomSheet } = useMusicBottomSheet();

  return (
    <Screen style={styles.container}>
      <Header onPressLogo={toggleBottomSheet} onPressRight={onToggleShowSearch} />
      <SearchBar
        isShow={isShowSearch}
        value={searching}
        onChange={onChangeSearching}
        onSubmit={() => {
          onSearching();
          onToggleShowSearch();
        }}
      />
      {suggestions.length > 0 && isShowSearch ? (
        <SuggestionList
          data={suggestions}
          isLoading={isLoading}
          onPress={(text) => {
            onSearching(text);
            onToggleShowSearch();
          }}
        />
      ) : (
        <Playlists
          data={playlists?.playlist || []}
          isLoading={isLoading}
          onLoadMore={onLoadMore}
          onPress={(video) => {
            if (video.videoId) {
              fetchMusicById(video.videoId);
            }
          }}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
});
