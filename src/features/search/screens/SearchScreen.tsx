import { useChannelDetail } from "@features/channel-detail";
import { useMusicBottomSheet } from "@features/music-bottom-sheet";
import { Header, Playlists, Screen } from "@shared/ui";
import { router, type Href } from "expo-router";
import { StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import { SearchTabs } from "../components/SearchTabs";
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
    contentTab,
    onChangeTab,
  } = useSearch();

  const { fetchMusicById, toggleBottomSheet } = useMusicBottomSheet();
  const { load: loadChannel, clear: clearChannel } = useChannelDetail();

  return (
    <Screen style={styles.container}>
      <Header onPressLogo={toggleBottomSheet} onPressRight={onToggleShowSearch} />
      <SearchTabs activeTab={contentTab} onChangeTab={onChangeTab} />
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
          activeTab={contentTab}
          isLoading={isLoading}
          onLoadMore={onLoadMore}
          onPress={(video) => {
            if (video.videoId) {
              fetchMusicById(video.videoId);
            } else if (video.browseId) {
              clearChannel();
              loadChannel(video.browseId).finally(() => {
                router.push("/channel-detail" as Href);
              });
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
