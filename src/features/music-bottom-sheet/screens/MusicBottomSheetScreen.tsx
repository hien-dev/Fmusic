import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useTheme } from "@shared/hooks/useTheme";
import { createVideoSource } from "@shared/model";
import { spacing } from "@shared/themes";
import { Playlists, Text } from "@shared/ui";
import { windowSize } from "@shared/utils/constants";
import { useEventListener } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useMusicBottomSheet } from "../hooks/useMusicBottomSheet";

interface Props {
  children?: React.ReactNode | undefined;
}

interface VideoSize {
  width: number;
  height: number;
}

export default function MusicBottomSheetScreen({ children }: Props) {
  const { colors } = useTheme();
  const { isShowBottomSheet, video, nextVideos, onChangeShowBottomSheet } = useMusicBottomSheet();

  const [videoSize, onChangeVideoSize] = useState<VideoSize>({
    width: windowSize.width,
    height: 300,
  });
  const bottomSheetRef = useRef<BottomSheet>(null);
  const currentTimeRef = useRef<number>(0);
  const snapPoints = useMemo(() => ["1%", "98%"], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === 0 && isShowBottomSheet) {
        onChangeShowBottomSheet(false);
      }
    },
    [isShowBottomSheet]
  );

  useEffect(() => {
    if (isShowBottomSheet) {
      bottomSheetRef.current?.expand();
      if (player.playing) {
        player.seekBy(currentTimeRef.current);
      }
    } else {
      bottomSheetRef.current?.collapse();
    }
  }, [isShowBottomSheet]);

  const videoSource = video && video.url ? createVideoSource(video) : undefined;
  const player = useVideoPlayer(videoSource as any, (player) => {
    player.loop = false;
    player.staysActiveInBackground = true;
    player.showNowPlayingNotification = true;
    player.play();
  });

  useEventListener(player, "videoTrackChange", (event) => {
    onChangeVideoSize(event.videoTrack.size);
  });

  useEventListener(player, "timeUpdate", (event) => {
    currentTimeRef.current = event.currentTime;
  });

  const videoContainerStyle = useMemo(() => {
    return {
      width: windowSize.width,
      height: videoSize.height * (windowSize.width / videoSize.width),
      marginTop: spacing.xl,
      marginBottom: spacing.md,
    } as ViewStyle;
  }, [videoSize]);

  return (
    <>
      <GestureHandlerRootView style={styles.root}>
        {children}
        <BottomSheet
          ref={bottomSheetRef}
          bottomInset={-10}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          onChange={handleSheetChanges}
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
              <Playlists
                data={nextVideos?.playlist || []}
                isLoading={false}
                onPress={(video) => {}}
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
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
    // paddingBottom: spacing[120],
  },
});
