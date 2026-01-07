import { useDesignSystem } from "@shared/provider";
import { spacing } from "@shared/themes";
import { Text } from "@shared/ui";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Pressable as Button, StyleSheet } from "react-native";

interface Props {
  data: string[];
  isLoading: boolean;
  onPress: (text: string) => void;
}

export default function SuggestionList({ data, isLoading, onPress }: Props) {
  const { colors } = useDesignSystem();

  const renderItem: ListRenderItem<string> = ({ item }) => (
    <Button style={[styles.item, { borderColor: colors.border }]} onPress={() => onPress(item)}>
      <Text variant="h5" numberOfLines={2} align="left">
        {item}
      </Text>
    </Button>
  );

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, idx) => item + idx.toString()}
      contentContainerStyle={styles.flex}
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
    height: 40,
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
  listFooterComponentStyle: {
    alignItems: "center",
    paddingTop: spacing.md,
    paddingBottom: spacing["120"] * 100,
  },
});
