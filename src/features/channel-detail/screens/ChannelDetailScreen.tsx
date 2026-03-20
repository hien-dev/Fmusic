import { useMusicBottomSheet } from "@features/music-bottom-sheet";
import { useDesignSystem } from "@shared/provider";
import { Playlists, Screen, Text } from "@shared/ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { spacing } from "@shared/themes";
import { useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import ChannelHeader from "../components/ChannelHeader";
import { useChannelDetail } from "../hooks/useChannelDetail";

export default function ChannelDetailScreen() {
  const { channel, isLoading, error } = useChannelDetail();
  const { fetchMusicById } = useMusicBottomSheet();
  const router = useRouter();
  const { colors } = useDesignSystem();

  const title = channel?.meta.title ?? "";

  return (
    <Screen style={styles.container}>
      <View style={[styles.topBar, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text variant="h3" align="left" numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <View style={styles.rightSpacer} />
      </View>
      {isLoading && !channel ? (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text>{error}</Text>
        </View>
      ) : !channel ? (
        <View style={styles.center}>
          <Text tx="channelDetail.notFound" />
        </View>
      ) : (
        <>
          <ChannelHeader channel={channel} />
          <Playlists
            data={channel.videos}
            isLoading={isLoading}
            onPress={(video) => {
              if (video.videoId) {
                fetchMusicById(video.videoId);
              }
            }}
          />
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  title: {
    flex: 1,
  },
  rightSpacer: {
    width: 36,
    height: 36,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
