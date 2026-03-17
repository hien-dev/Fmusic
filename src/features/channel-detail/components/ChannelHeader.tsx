import { ChannelDTO } from "@shared/model";
import { useDesignSystem } from "@shared/provider";
import { Text } from "@shared/ui";
import { spacing } from "@shared/themes";
import { Image, StyleSheet, View } from "react-native";

interface Props {
  channel: ChannelDTO;
}

export default function ChannelHeader({ channel }: Props) {
  const { colors } = useDesignSystem();
  const { title, description, channelUrl, avatarUrl, subscriberText } = {
    title: channel.meta.title,
    description: channel.meta.description,
    channelUrl: channel.meta.channelUrl,
    avatarUrl: channel.meta.avatarUrl,
    subscriberText: channel.meta.subscriberText,
  };

  return (
    <View style={[styles.container, { borderBottomColor: colors.border }]}>
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} style={styles.avatar} resizeMode="cover" />
      ) : (
        <View style={[styles.avatar, styles.avatarPlaceholder, { backgroundColor: colors.border }]}>
          <Text variant="h3">{title.charAt(0).toUpperCase()}</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text variant="h3" align="left" numberOfLines={2}>
          {title}
        </Text>
        {subscriberText ? (
          <Text variant="r5" align="left" numberOfLines={1}>
            {subscriberText}
          </Text>
        ) : null}
        {channelUrl ? (
          <Text variant="r5" align="left" numberOfLines={1}>
            {channelUrl}
          </Text>
        ) : null}
        {description ? (
          <Text variant="r5" align="left" numberOfLines={3}>
            {description}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const AVATAR_SIZE = 72;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.md,
    borderBottomWidth: 1,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  avatarPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
});
