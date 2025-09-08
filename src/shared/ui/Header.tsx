import Images from "@assets/images";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDS } from "@shared/provider/DSProvider";
import { sizes, spacing } from "@shared/themes/global-styles";
import { Image, StyleSheet, View } from "react-native";
import Text from "./Text";

interface Props {
  onPressRight?: () => void;
}

export default function Header({ onPressRight }: Props) {
  const { isDark, colors } = useDS();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={isDark ? Images.logoDark : Images.logoLight}
          resizeMode="contain"
          style={{ width: sizes.avatarMd, height: sizes.avatarMd }}
        />
        <Text tx="app.title" variant="h2" />
      </View>
      {onPressRight && (
        <Ionicons.Button
          name="search"
          size={24}
          color={colors.icon}
          onPress={onPressRight}
          backgroundColor={colors.background}
          iconStyle={{ marginRight: 0 }}
          borderRadius={24}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg
  },
  row: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
