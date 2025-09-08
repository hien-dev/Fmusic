import { spacing } from "@shared/themes/global-styles";
import Input from "@shared/ui/Input";
import { StyleSheet, View } from "react-native";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.flex}>
        <Input
          placeholder="Search..."
          autoCorrect={false}
          autoCapitalize="characters"
          value={value}
          onChangeText={onChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: spacing.md,
  },
  flex: {
    flex: 1,
  },
});
