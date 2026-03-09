import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { spacing } from "@shared/themes";
import { Playlists, Text } from "@shared/ui";
import { VideoView } from "expo-video";
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native";

type MusicBottomSheetContentProps = {
  bottomSheetRef: React.RefObject<BottomSheet>;
  snapPoints: string[];
  colors: any;
  video: any;
  nextVideos: any;
  player: any;
  videoContainerStyle: ViewStyle;
  animatedIndex: any;
  onChange: (index: number) => void;
};

export function MusicBottomSheetContent({
  bottomSheetRef,
  snapPoints,
  colors,
  video,
  nextVideos,
  player,
  videoContainerStyle,
  animatedIndex,
  onChange,
}: MusicBottomSheetContentProps) {
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
      handleStyle={{ ...styles.handleStyle, backgroundColor: colors.background }}
      handleIndicatorStyle={{ backgroundColor: colors.icon }}
      backgroundStyle={{ backgroundColor: colors.background }}
    >
      <BottomSheetView style={{ ...styles.container, backgroundColor: colors.background }}>
        <View style={videoContainerStyle}>
          <View style={styles.videoLoading}>
            <ActivityIndicator size="small" color={colors.icon} />
          </View>
          {player ? <VideoView style={styles.video} player={player} /> : null}
        </View>
        <View style={styles.content}>
          <Text variant="h4" align="left">
            {video?.title}
          </Text>
          <Text tx="music.next" variant="h4" align="left" />
        </View>
        <View style={styles.nextVideos}>
          <Playlists data={nextVideos?.playlist || []} isLoading={false} onPress={() => {}} />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
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
  nextVideos: {
    flex: 1,
    marginTop: spacing.xs,
  },
});

