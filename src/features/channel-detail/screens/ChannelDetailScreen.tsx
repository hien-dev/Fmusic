import { useMusicBottomSheet } from "@features/music-bottom-sheet";
import { Playlists, Screen, Text } from "@shared/ui";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import ChannelHeader from "../components/ChannelHeader";
import { useChannelDetail } from "../hooks/useChannelDetail";

export default function ChannelDetailScreen() {
  const { channel, isLoading, error } = useChannelDetail();
  const { fetchMusicById } = useMusicBottomSheet();

  return (
    <Screen style={styles.container}>
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
          <Text>Không tìm thấy thông tin kênh</Text>
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
