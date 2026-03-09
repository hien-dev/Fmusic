import { Ionicons } from "@expo/vector-icons";
import { spacing } from "@shared/themes";
import { Text } from "@shared/ui";
import { BlurView } from "expo-blur";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

type MiniPlayerVideo = {
  title: string;
  author: string;
  thumbnailURL: string;
};

type MiniPlayerProps = {
  video: MiniPlayerVideo;
  isPlaying: boolean;
  bottomInset: number;
  colors: any;
  animatedStyle: any;
  onTogglePlayPause: () => void;
  onPress: () => void;
};

export function MiniPlayer({
  video,
  isPlaying,
  bottomInset,
  colors,
  animatedStyle,
  onTogglePlayPause,
  onPress,
}: MiniPlayerProps) {
  return (
    <Animated.View
      style={[
        styles.miniPlayerWrap,
        animatedStyle,
        {
          bottom: bottomInset,
          borderColor: colors.border,
        },
      ]}
    >
      <BlurView
        intensity={65}
        tint={colors.background === "#0D0D0D" ? "dark" : "light"}
        style={styles.miniPlayerBlur}
      >
        <Pressable onPress={onPress} style={styles.miniPlayer}>
          <Image
            source={{ uri: video.thumbnailURL }}
            style={styles.miniThumbnail}
            resizeMode="stretch"
          />

          <View style={styles.miniInfo}>
            <Text variant="h4" numberOfLines={1} align="left">
              {video.title}
            </Text>
            <Text variant="r5" color="placeholder" numberOfLines={1} align="left">
              {video.author}
            </Text>
          </View>

          <Pressable onPress={onTogglePlayPause} style={styles.miniPlayBtn} hitSlop={15}>
            <Ionicons name={isPlaying ? "pause" : "play"} size={28} color={colors.text} />
          </Pressable>
        </Pressable>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  miniPlayerWrap: {
    position: "absolute",
    left: spacing.sm,
    right: spacing.sm,
    height: 64,
    borderRadius: 64,
    overflow: "hidden",
    borderWidth: 1,
  },
  miniPlayerBlur: {
    flex: 1,
    borderRadius: spacing.lg,
    overflow: "hidden",
  },
  miniPlayer: {
    flex: 1,
    borderRadius: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: spacing.sm,
    paddingLeft: spacing.xs,
    paddingVertical: spacing.xs,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0, 0, 0, 0.4)",
  },
  miniThumbnail: {
    width: 56,
    height: 56,
    borderRadius: 56,
  },
  miniInfo: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.sm,
    justifyContent: "center",
  },
  miniPlayBtn: {
    padding: spacing.xs,
    marginRight: spacing.sm,
  },
});
