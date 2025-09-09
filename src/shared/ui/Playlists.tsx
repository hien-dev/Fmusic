import { VideoDTO } from "@shared/model";
import { useDesignSystem } from "@shared/provider";
import { spacing } from "@shared/themes";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Pressable as Button, Image, StyleSheet, View } from "react-native";
import { Loading } from "./Loading";
import { Text } from "./Text";

interface Props {
  data: VideoDTO[];
}

export function Playlists({ data }: Props) {
  const { colors } = useDesignSystem();

  const renderItem: ListRenderItem<VideoDTO> = ({ item }) => (
    <Button style={[styles.item, { borderColor: colors.border }]}>
      <Image source={{ uri: item.thumbnailURL }} resizeMode="stretch" style={styles.image} />
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
      estimatedItemSize={50}
      ListFooterComponent={<Loading size={"small"} />}
      ListFooterComponentStyle={{ alignItems: "center", marginTop: spacing.md }}
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
  },
});
