import Images from "@assets/images";
import { useDesignSystem } from "@shared/provider";
import { sizes, spacing } from "@shared/themes";
import { Screen } from "@shared/ui";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";

interface Props {
  onNext: () => void;
}

export default function OnboardingScreen({ onNext }: Props) {
  const { isDark, colors } = useDesignSystem();

  useEffect(() => {
    onNext();
  }, []);

  return (
    <Screen style={styles.container}>
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
    flex: 1,
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
