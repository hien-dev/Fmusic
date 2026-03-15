import BottomSheet, {
  BottomSheetFlatList
} from "@gorhom/bottom-sheet";
import { VideoDTO } from "@shared/model";
import { useDesignSystem } from "@shared/provider";
import { spacing } from "@shared/themes";
import { Text } from "@shared/ui";
import { VideoView } from "expo-video";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import type { MusicBottomSheetContentProps } from "./MusicBottomSheetContent.types";

export function MusicBottomSheetContent({
  bottomSheetRef,
  snapPoints,
  colors,
  video,
  nextVideos,
  fetchMusicById,
  player,
  videoContainerStyle,
  animatedIndex,
  onChange,
}: MusicBottomSheetContentProps) {
  const { colors: themeColors } = useDesignSystem();
  const data = nextVideos?.playlist ?? [];
  const windowWidth = Dimensions.get("window").width;
  const videoHeight = videoContainerStyle?.height ?? 300;
  const minHeaderHeight = typeof videoHeight === "number" ? videoHeight + 80 : 380;

  const renderItem: ListRenderItem<VideoDTO> = ({ item }) => (
    <Pressable
      style={[styles.item, { borderColor: themeColors.border, backgroundColor: colors.background }]}
      onPress={() => {
        if (item.videoId) fetchMusicById(item.videoId);
      }}
    >
      <View style={styles.itemContent}>
        <Image
          source={{ uri: item.thumbnailURL }}
          resizeMode="center"
          style={styles.image}
        />
        <View style={styles.itemText}>
          <Text variant="h5" numberOfLines={2} align="left">
            {item.title}
          </Text>
          <Text variant="r5" align="left">
            {item.author}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      bottomInset={0}
      enablePanDownToClose
      index={-1}
      snapPoints={snapPoints}
      animatedIndex={animatedIndex}
      enableDynamicSizing={false}
      onChange={onChange}
      enableContentPanningGesture
      handleStyle={{ ...styles.handleStyle, backgroundColor: colors.background }}
      handleIndicatorStyle={{ backgroundColor: colors.icon }}
      backgroundStyle={{ backgroundColor: colors.background }}
    >
      <View
        style={[
          styles.stickyHeader,
          { backgroundColor: colors.background, minHeight: minHeaderHeight },
        ]}
      >
        <View
          style={[
            styles.videoWrapper,
            {
              width: windowWidth,
              height: videoHeight,
              marginBottom: spacing.md,
            },
          ]}
        >
          <View style={styles.videoLoading}>
            <ActivityIndicator size="small" color={colors.icon} />
          </View>
          {player ? (
            <VideoView
              style={StyleSheet.absoluteFill}
              player={player}
              nativeControls={false}
            />
          ) : null}
        </View>
        <View style={styles.content}>
          <Text variant="h4" align="left">
            {video?.title}
          </Text>
          <Text tx="music.next" variant="h4" align="left" />
        </View>
      </View>
      <BottomSheetFlatList<VideoDTO>
        data={data}
        keyExtractor={(item, idx) => item.id + idx.toString()}
        renderItem={renderItem}
        contentContainerStyle={[styles.listContent, { backgroundColor: colors.background }]}
        style={[styles.list, { backgroundColor: colors.background }]}
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  stickyHeader: {
    flex: 0,
    paddingHorizontal: 0,
  },
  videoWrapper: {
    width: "100%",
  },
  content: {
    gap: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  handleStyle: {
    borderTopRightRadius: spacing.lg,
    borderTopLeftRadius: spacing.lg,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  videoLoading: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingTop: spacing.xs,
    paddingBottom: spacing["120"],
    flexGrow: 1,
  },
  item: {
    flexDirection: "row",
    maxWidth: "100%",
    minHeight: 70,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  itemContent: {
    flexDirection: "row",
    flex: 1,
    gap: 10,
    marginHorizontal: spacing.md,
    alignItems: "center",
  },
  image: {
    width: 75,
    height: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
  },
  itemText: {
    flex: 1,
  },
});
