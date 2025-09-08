import Images from "@assets/images";
import { useDS } from "@shared/provider/DSProvider";
import { sizes, spacing } from "@shared/themes/global-styles";
import Screen from "@shared/ui/Screen";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";

interface Props {
  onNext: () => void;
}

export default function OnboardingScreen({ onNext }: Props) {
  const { isDark, ui, colors } = useDS();

  useEffect(() => {
    onNext();
  }, []);

  return (
    <Screen style={[ui.flex, styles.container]}>
      <Image
        source={isDark ? Images.logoDark : Images.logoLight}
        resizeMode="contain"
        style={styles.img}
      />
      <ActivityIndicator size="small" color={colors.icon} style={styles.loading} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: sizes.iconXXL,
    height: sizes.iconXXL,
  },
  loading: {
    position: "absolute",
    bottom: spacing["3xl"],
  },
});
