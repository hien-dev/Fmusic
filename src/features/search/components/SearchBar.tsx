import { useTheme } from "@shared/hooks/useTheme";
import { tr } from "@shared/locales/i18n";
import { spacing } from "@shared/themes";
import { Input } from "@shared/ui";
import { useEffect, useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

export default function SearchBar({
  isShow,
  value,
  onChange,
  onSubmit,
}: {
  isShow: boolean;
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
}) {
  const { colors } = useTheme();
  const inputRef = useRef<TextInput | null>(null);
  const show = useSharedValue(0);

  useEffect(() => {
    show.value = isShow ? 1 : 0;
    if (inputRef.current) {
      isShow ? inputRef.current.focus() : inputRef.current.blur();
    }
  }, [isShow]);

  const animationStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(show.value, { duration: 300 }),
      transform: [{ translateY: withSpring(show.value ? 0 : -56, { duration: 800 }) }],
      height: withSpring(show.value ? 56 : 0, { duration: isShow ? 500 : 700 }),
    };
  });

  return (
    <Animated.View style={[styles.row, animationStyle]}>
      <View style={styles.flex}>
        <Input
          ref={inputRef}
          placeholder={tr("search.placeholder")}
          autoCorrect={false}
          autoCapitalize="none"
          value={value}
          enterKeyHint="search"
          onChangeText={onChange}
          onSubmitEditing={onSubmit}
          style={{ color: colors.text }}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginHorizontal: spacing.md,
  },
  flex: {
    flex: 1,
  },
});
