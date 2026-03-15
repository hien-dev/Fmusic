import { useTheme } from "@shared/hooks/useTheme";
import { createVideoSource } from "@shared/model";
import { spacing } from "@shared/themes";
import { windowSize } from "@shared/utils/constants";
import { useEventListener } from "expo";
import { useVideoPlayer } from "expo-video";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MiniPlayer } from "../components/MiniPlayer";
import { MusicBottomSheetContent } from "../components/MusicBottomSheetContent.ios";
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
  const { bottom } = useSafeAreaInsets();
  const { isShowBottomSheet, video, nextVideos, onChangeShowBottomSheet, fetchMusicById } =
    useMusicBottomSheet();

  const [videoSize, onChangeVideoSize] = useState<VideoSize>({
    width: windowSize.width,
    height: 300,
  });
  const bottomSheetRef = useRef<any>(null);
  const currentTimeRef = useRef<number>(0);
  const snapPoints = useMemo(() => ["98%"], []);

  const animatedIndex = useSharedValue(-1);
  const sheetOpenForMini = useSharedValue(0);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    sheetOpenForMini.value = isShowBottomSheet ? 1 : 0;
  }, [isShowBottomSheet]);

  const videoSource = video && video.url ? createVideoSource(video) : undefined;
  const player = useVideoPlayer(videoSource as any, (player) => {
    player.loop = false;
    player.staysActiveInBackground = true;
    player.showNowPlayingNotification = true;
    player.play();
  });

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1 && isShowBottomSheet) {
        onChangeShowBottomSheet(false);
      }
    },
    [isShowBottomSheet, onChangeShowBottomSheet]
  );

  useEffect(() => {
    if (isShowBottomSheet) {
      bottomSheetRef.current?.expand();
      if (player.playing) {
        player.seekBy(currentTimeRef.current);
      }
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isShowBottomSheet, player]);

  useEventListener(player, "playingChange", (event) => {
    setIsPlaying(event.isPlaying);
  });

  useEventListener(player, "videoTrackChange", (event) => {
    if (event.videoTrack?.size) {
      onChangeVideoSize(event.videoTrack.size);
    }
  });

  useEventListener(player, "timeUpdate", (event) => {
    currentTimeRef.current = event.currentTime;
  });

  const togglePlayPause = useCallback(() => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  }, [player]);

  const videoContainerStyle = useMemo(() => {
    return {
      width: windowSize.width,
      height: videoSize.height * (windowSize.width / videoSize.width),
      marginTop: spacing.xl,
      marginBottom: spacing.md,
    } as ViewStyle;
  }, [videoSize]);

  const miniPlayerStyle = useAnimatedStyle(() => {
    const sheetOpen = sheetOpenForMini.value === 1;
    const opacityByIndex = interpolate(
      animatedIndex.value,
      [-1, -0.8, 0],
      [1, 0, 0],
      Extrapolation.CLAMP
    );
    const opacity = sheetOpen ? 0 : opacityByIndex;
    const translateY = interpolate(animatedIndex.value, [-1, 0], [0, 50], Extrapolation.CLAMP);

    return {
      opacity,
      transform: [{ translateY }],
      zIndex: 99,
    };
  });

  return (
    <>
      <GestureHandlerRootView style={styles.root}>
        {children}
        <MusicBottomSheetContent
          bottomSheetRef={bottomSheetRef}
          snapPoints={snapPoints}
          colors={colors}
          video={video}
          nextVideos={nextVideos}
          player={player}
          videoContainerStyle={videoContainerStyle}
          animatedIndex={animatedIndex}
          onChange={handleSheetChanges}
          fetchMusicById={fetchMusicById}
        />

        {video && (
          <MiniPlayer
            video={video}
            isPlaying={isPlaying}
            bottomInset={bottom + 88}
            colors={colors}
            animatedStyle={miniPlayerStyle}
            onTogglePlayPause={togglePlayPause}
            onPress={() => onChangeShowBottomSheet(true)}
          />
        )}
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
