import { ContentTabs } from "@shared/api/config";
import { VideoDTO } from "@shared/model";
import { useDesignSystem } from "@shared/provider";
import { spacing } from "@shared/themes";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Pressable as Button, Image, StyleSheet, View } from "react-native";
import { Loading } from "./Loading";
import { Text } from "./Text";

interface Props {
  data: VideoDTO[];
  activeTab?: ContentTabs;
  isLoading: boolean;
  scrollEnabled?: boolean;
  onPress: (video: VideoDTO) => void;
  onLoadMore?: () => void;
}

export function Playlists({
  data,
  activeTab,
  isLoading,
  scrollEnabled = true,
  onPress,
  onLoadMore,
}: Props) {
  const { colors } = useDesignSystem();
  const isCircle = activeTab === ContentTabs.artists;

  const renderItem: ListRenderItem<VideoDTO> = ({ item }) => (
    <Button style={[styles.item, { borderColor: colors.border }]} onPress={() => onPress(item)}>
      <Image
        source={{ uri: item.thumbnailURL }}
        resizeMode={"cover"}
        style={[styles.image, { width: isCircle ? 60 : 75, borderRadius: isCircle ? 999 : 5 }]}
      />
      <View style={styles.flex}>
        <Text variant="h5" numberOfLines={2} align="left">
          {item.title}
        </Text>
        <Text variant="r5" align="left">
          {item.author}
        </Text>
      </View>
    </Button>
  );

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, idx) => item.id + idx.toString()}
      onEndReachedThreshold={0.1}
      onEndReached={onLoadMore}
      scrollEnabled={scrollEnabled}
      ListFooterComponent={<Loading size={"small"} />}
      ListFooterComponentStyle={[styles.listFooterComponentStyle, { opacity: isLoading ? 1 : 0 }]}
    />
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    maxWidth: "100%",
    height: 70,
    gap: 10,
    marginHorizontal: spacing.md,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  image: {
    width: 75,
    height: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
  },
  listFooterComponentStyle: {
    alignItems: "center",
    paddingTop: spacing.md,
    paddingBottom: spacing["120"],
  },
});
