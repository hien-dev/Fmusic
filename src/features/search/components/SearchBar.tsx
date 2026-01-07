import { useTheme } from "@shared/hooks/useTheme";
import { spacing } from "@shared/themes";
import { Input } from "@shared/ui";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function SearchBar({
  isShow,
  value,
  onChange,
}: {
  isShow: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const { colors } = useTheme();

  const [mounted, setMounted] = useState(isShow);
  const anim = useRef(new Animated.Value(isShow ? 1 : 0)).current;

  useEffect(() => {
    if (isShow) {
      setMounted(true);
      Animated.timing(anim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(anim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setMounted(false);
      });
    }
  }, [isShow, anim]);

  if (!mounted) return null;

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [-8, 0] });
  const opacity = anim;

  return (
    <Animated.View
      style={[styles.row, { opacity, transform: [{ translateY }] }]}
      pointerEvents={isShow ? "auto" : "none"}
    >
      <View style={styles.flex}>
        <Input
          placeholder="Search..."
          autoCorrect={false}
          autoCapitalize="words"
          value={value}
          onChangeText={onChange}
          style={{ color: colors.text }}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: spacing.md,
    marginHorizontal: spacing.md,
  },
  flex: {
    flex: 1,
  },
});
