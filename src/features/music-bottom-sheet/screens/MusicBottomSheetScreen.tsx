import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useTheme } from "@shared/hooks/useTheme";
import { spacing } from "@shared/themes";
import { Log } from "@shared/utils/function";
import { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface Props {
  children?: React.ReactNode | undefined;
}

export default function MusicBottomSheetScreen({ children }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { colors } = useTheme();
  const snapPoints = useMemo(() => ["1%", "98%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    Log.log("handleSheetChanges", index);
  }, []);

  return (
    <>
      <GestureHandlerRootView style={styles.root}>
        {children}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleStyle={{ ...styles.handleStyle, backgroundColor: colors.background }}
          handleIndicatorStyle={{ backgroundColor: colors.icon }}
          backgroundStyle={{ backgroundColor: colors.background }}
        >
          <BottomSheetView style={{ ...styles.container, backgroundColor: colors.background }}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    height: "100%",
  },
  handleStyle: {
    borderTopRightRadius: spacing.lg,
    borderTopLeftRadius: spacing.lg,
  },
});
