import { VideoDTO } from "@shared/model";
import { useDS } from "@shared/provider/DSProvider";
import { spacing } from "@shared/themes/global-styles";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Pressable as Button, Image, StyleSheet, View } from "react-native";
import Text from "./Text";

interface Props {
  data: VideoDTO[];
}

export function Playlist({ data }: Props) {
  const {colors} = useDS();
  const renderItem: ListRenderItem<VideoDTO> = ({ item }) => (
    <Button style={[styles.item, {borderColor: colors.border}]}>
      <Image source={{ uri: item.thumbnailURL }} resizeMode="stretch" style={styles.image} />
      <View style={{flex: 1}}>
        <Text numberOfLines={2} align="left" style={{ flex: 2 }}>
          {item.title}
        </Text>
        <Text variant="caption" align="left" style={{ flex: 1 }}>
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
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    height: 70,
    gap: 10,
    marginHorizontal: spacing.lg,
    borderBottomWidth: 1,
  },
  image: {
    width: 75,
    height: 55,
    borderRadius: 5
  },
});
