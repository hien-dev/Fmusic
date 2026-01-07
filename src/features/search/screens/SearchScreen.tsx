import { useMusicBottomSheet } from "@features/music-bottom-sheet";
import { Header, Playlists, Screen } from "@shared/ui";
import { StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
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
  } = useSearch();

  const { fetchMusicById, toggleBottomSheet } = useMusicBottomSheet();

  return (
    <Screen style={styles.container}>
      <Header onPressLogo={toggleBottomSheet} onPressRight={onToggleShowSearch} />
      <SearchBar isShow={isShowSearch} value={searching} onChange={onChangeSearching} />
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
});
