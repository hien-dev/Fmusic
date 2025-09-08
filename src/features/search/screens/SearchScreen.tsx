import { useDS } from "@shared/provider/DSProvider";
import Header from "@shared/ui/Header";
import { Playlist } from "@shared/ui/Playlist";
import Screen from "@shared/ui/Screen";
import { LayoutAnimation, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import { useSearch } from "../hooks/useSearch";

export default function SearchScreen() {
  const { isShowSearch, onChangeShowSearch, searching, onChangeSearching, playlist } = useSearch();
  const { ui } = useDS();

  return (
    <Screen style={[ui.flex, styles.container]}>
      <Header
        onPressRight={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
          onChangeShowSearch(true);
        }}
      />
      {isShowSearch && <SearchBar value={searching} onChange={onChangeSearching} />}
      <Playlist data={playlist?.playlist || []} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
